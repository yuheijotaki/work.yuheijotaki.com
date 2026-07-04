---
name: commit
description: 変更内容を Conventional Commits 形式でコミットする。diff を読んで type/scope を決め、件名と本文をドラフトし、ユーザー承認を得てから `main` に直接コミットする。「コミットして」「commit」「コミットメッセージ作って」と言われたときに使用。
---

# コミット作成ワークフロー

このプロジェクト（Next.js 16 App Router + microCMS + Vercel、`main` 直コミット運用）の変更を、Conventional Commits に則って安全にコミットする。
**必ず以下のステップを順番に実行し、各フェーズの終わりで報告して次に進むこと。**

開始時に各 Step を `TaskCreate` で登録し、`in_progress` / `completed` を都度更新すること（進捗を可視化するため）。

---

## 前提

- ブランチ運用: **`main` に直接コミット**
- 言語: **英語**（件名・本文とも）。小文字始まり・末尾ピリオドなし・件名 50 字以内目安・本文は 72 字で改行
- 末尾に `Co-Authored-By: Claude <noreply@anthropic.com>` を付与する（モデル名は含めず、この固定形とする）
- push は **しない**（ユーザーが明示的に頼まない限り）

> 参考: 過去のコミットには `update:` / `add:` / `remove:` / 件名のみの `fix: styles` など非標準スタイルが混在している。**今後は本スキルに従って Conventional Commits に統一する**。過去履歴は触らない。

---

## Step 0: 事前チェック

```bash
git status --porcelain   # 変更があるか
git rev-parse --abbrev-ref HEAD   # main か
git diff --stat          # ざっくりした変更規模
git log -n 5 --pretty=format:'%s'   # 直近のスタイル参照
```

- 変更が無い: 「コミット対象がありません」と報告して終了
- ブランチが `main` 以外: 「現在 `<branch>` にいます。`main` に切り替えますか / このまま進めますか」と質問
- 既にステージ済みの変更がある: そのステージ内容を尊重し、未ステージとは分けて扱う
- `.env` / `.env.local` 等が変更ファイルに含まれる: **絶対にステージしない**。ユーザーに「`.env` に変更があります。意図的でなければ除外します」と確認

---

## Step 1: 変更分類（type/scope を決める）

`git diff` と `git diff --staged` を読み、以下の意思決定フローで type を決める。

### 1-1. 許可される type の集合

**この 9 種のみ**。それ以外は使わない。

| type       | 用途                                                  |
| ---------- | ----------------------------------------------------- |
| `feat`     | 新機能、ユーザー可視の挙動追加                        |
| `fix`      | バグ修正                                              |
| `refactor` | 挙動を変えないコード再構成                            |
| `perf`     | パフォーマンス改善                                    |
| `style`    | フォーマット・空白・セミコロン等（コード意味は不変）  |
| `test`     | テストの追加・修正                                    |
| `docs`     | ドキュメント、コメント、CLAUDE.md、README             |
| `chore`    | ビルド・設定・依存・雑務（ユーザー可視挙動に影響なし） |
| `revert`   | 既存コミットの取り消し                                |

### 1-2. 過去使われていた非標準 type の振り分け

**過去のコミットには `add:` / `update:` / `remove:` / `delete:` があるが、これらは禁止。** 必ず以下のように振り分ける:

| 過去のタイプ                      | 振り分け先                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `add:`                            | 機能追加なら `feat:`、設定追加なら `chore(config):`、ドキュメントなら `docs:`      |
| `update:`                         | 挙動変更なら `feat:` / `fix:`、整理なら `refactor:`、依存更新なら `chore(deps):`   |
| `remove:` / `delete:`             | 機能削除なら `feat!:`（破壊的）、不要コード片付けなら `chore:` か `refactor:`      |
| 件名のみ `fix: styles` 等の曖昧形 | scope と本文で「どこを・なぜ」を補い、`fix(ui): adjust ...` のように具体化         |

### 1-3. scope（任意だが推奨）

`type(scope):` の形で粒度を上げる。このリポジトリで推奨する scope:

- `deps` — 依存パッケージ（`chore(deps): bump N package(s)`）
- `app` — App Router の page / layout（`app/page.tsx`, `app/post/[slug]/page.tsx`, `app/layout.tsx`）
- `microcms` — microCMS 連携（`lib/microcms.ts`、`types/post.ts`、API 呼び出しの追加・変更）
- `ui` — `components/` 配下と SCSS Modules のスタイル全般
- `styles` — `styles/foundation/`（global.scss / variables / mixin）の横断的変更
- `seo` — `metadata` / OG / Twitter Card / `metadataBase`
- `a11y` — アクセシビリティ（`jsx-a11y` 警告対応、ARIA、キーボード操作）
- `image` — `next/image` 設定、`next.config.mjs` の `images.remotePatterns`、画像最適化
- `config` — `next.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `.markuplintrc`, `.node-version` などの設定ファイル
- `isr` — `revalidate` / キャッシュ戦略の調整
- `font` — `next/font` の追加・差し替え

スコープを付けるか迷ったら付けない。**間違った scope は no scope より悪い**。

### 1-4. Breaking change

ユーザー可視の互換性を壊す変更（公開 URL の構造変更、microCMS スキーマ移行を伴う変更など）は `feat!:` のように `!` を付けるか、本文に `BREAKING CHANGE:` を書く。

---

## Step 2: 件名と本文のドラフト

### 2-1. 件名のルール

- `<type>(<scope>): <summary>` または `<type>: <summary>`
- 50 字以内目安、最大 72 字
- 英語、小文字始まり、末尾ピリオドなし
- 命令形（"add X" であって "added X" や "adds X" ではない）
- 「何を」ではなく「何のため」が伝わる動詞を選ぶ

良い例 / 悪い例:

| ✗ 悪い                                  | ✓ 良い                                                                |
| --------------------------------------- | --------------------------------------------------------------------- |
| `update:` （件名のみ・空）              | `feat(app): add related works rail to post page`                      |
| `fix:` （何を直したか不明）             | `fix(image): allow microcms-assets.io in remotePatterns`              |
| `fix: styles`                           | `fix(ui): align category tabs on narrow viewports`                    |
| `update: packages`                      | `chore(deps): bump 7 packages`                                        |
| `add: markuplint`                       | `chore(config): add markuplint with react-spec`                       |
| `fix: search component`                 | `fix(ui): restore arrow-key navigation on category tabs`              |
| `feat: SSG to SSR`                      | `refactor(app): switch home page to ISR with revalidate=60`           |

### 2-2. 本文のルール

- 件名と本文の間は空行 1 行
- 72 字で改行
- **「何を」ではなく「なぜ」を書く**。コードを読めば分かる事実は書かない
- 影響範囲、トレードオフ、関連 Issue/参照リンクがあれば書く
- 1 行で十分なら本文は省略してよい
- microCMS のスキーマ変更を伴う場合は、対応するフィールド名（例: `colorText`, `images[]`）を本文に明記する

### 2-3. 件名のみコミットの禁止

`fix: styles` だけ、`update:` だけのような **件名のみで内容ゼロ** のコミットは作らない。
件名 50 字に収まらない情報は本文で補う。

---

## Step 3: ユーザー承認

ドラフトを以下の形でユーザーに提示し、**承認を待つ**:

```
コミットメッセージ案:
---
<type>(<scope>): <summary>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>
---

ステージ対象:
- path/to/file1
- path/to/file2

この内容でコミットしてよいですか？
```

ユーザーから明示的な OK/GO が出るまでコミットしない。修正指示があれば反映してから再提示。

---

## Step 4: コミット実行

承認が出たら以下を順に実行する:

```bash
# 1. ステージ（必要なファイルだけを名指し）
git add path/to/file1 path/to/file2
# `git add -A` や `git add .` は使わない（.env / .DS_Store / .next/ 等の混入リスク）

# 2. HEREDOC でコミット
git commit -m "$(cat <<'EOF'
<type>(<scope>): <summary>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# 3. 結果確認
git status
git log -1 --stat
```

### pre-commit フック失敗時

- `--no-verify` で **回避しない**
- 失敗原因（lint, format 等）を読み、根本対応
- 再ステージ → **新しいコミット** を作る（`--amend` ではなく `git commit` を再実行）

---

## Step 5: 後始末

- push はしない（ユーザーが明示的に頼まない限り）
- 一時ファイルや stash を残さない
- ミニ報告: 「`<sha>` でコミットしました。次は何をしますか？」

---

## 複数コミットに分ける判断

1 つのコミットに複数の type が混ざりそうな場合は分ける:

- 「依存更新 + その追従修正」→ `chore(deps): ...` と `fix(...): adjust to <pkg> v2` の 2 コミット
- 「リファクタ + バグ修正」→ `refactor: ...` と `fix: ...` の 2 コミット
- 「機能追加 + 既存バグの fix」→ `feat: ...` と `fix: ...` の 2 コミット
- 「App Router 変更 + 関連スタイル調整」が論理的に不可分なら 1 コミット OK

ただし、変更が論理的に不可分なら 1 コミットでよい。**目安は「revert したくなったときに困らない単位」**。

---

## やってはいけないこと

- `add:` / `update:` / `remove:` / `delete:` 等の非標準 type を使う（過去の履歴に倣わない）
- 件名のみ・本文無し・内容ゼロのコミットを作る（`fix: styles` 等）
- `--no-verify` でフックをスキップする
- `git add -A` / `git add .` を使う（`.env` / `.DS_Store` / `.next/` / `tsconfig.tsbuildinfo` 等の混入リスク）
- `.env` をステージする
- ユーザーの「OK」なしに勝手にコミットする
- 過去のコミットを `--amend` する（特に既に push 済みの場合）
- 勝手に push する
- 日本語のコミットメッセージを書く（英語に統一）
- 一つのコミットに無関係な変更を詰め込む
