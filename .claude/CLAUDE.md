# CLAUDE.md

このファイルは、本リポジトリで Claude Code (claude.ai/code) が作業する際のガイドである。

## コマンド

```bash
npm run dev         # Next.js dev server (http://localhost:3000)
npm run build       # 本番ビルド
npm run start       # 本番ビルドの起動
npm run lint        # ESLint（typescript-eslint strictTypeChecked）
npm run lint:fix    # ESLint --fix
npm run markuplint  # マークアップ lint（./app/**/*.{jsx,tsx} 対象、設定は .markuplintrc）
```

Node バージョンは `.node-version` で固定（現在 `24.18.0`）。

## 環境変数

`.env` に以下を定義する必要がある:

- `MICROCMS_SERVICE_ID`
- `MICROCMS_API_KEY`

どちらも `lib/microcms.ts` から読まれており、`getPosts` / `getPostBySlug` を呼ぶページ（実質ほぼ全ページ）で必須。未設定だと `next dev` でもレンダリングに失敗する。

## アーキテクチャ

Next.js 16 App Router で構築されたポートフォリオサイトで、コンテンツは microCMS から取得する。ルートは `/` と `/post/[slug]` の 2 つのみで、いずれも `revalidate = 60` の ISR。

### Server → Client のデータフロー

ページは async な Server Component が microCMS をフェッチし、インタラクションが必要な部分だけ Client Component に切り出す構成になっている。**この分離は意図的なので、ページを追加する際も同じパターンを踏襲すること**:

- `app/page.tsx`（server）が `getPosts()` を呼び、結果を `app/HomeClient.tsx`（`'use client'`）に渡す。カテゴリタブの状態は Client Component 側で保持。
- `app/post/[slug]/page.tsx`（server）は `getPostBySlug(slug)` と `getPosts()` の両方を呼ぶ（後者は関連 works 用）。こちらは Client Component を持たず Server Component で完結する（`components/Header.tsx` のみ client）。`generateStaticParams` でビルド時に全 slug を pre-render する。

microCMS 呼び出しを Client Component に持ち込まないこと。SDK は `process.env.MICROCMS_API_KEY` を参照するため、必ず Server 側に置く。

### microCMS アクセス

microCMS と通信するのは `lib/microcms.ts` のみ。コンテンツタイプは `work` の 1 つだけで、`getPosts` は一覧用のフィールドサブセット（`LIST_FIELDS`）、`getPostBySlug` は詳細レコード一式（`DETAIL_FIELDS`: `images[]` / `credit` / `colorText` / `archive` / `notAvailable` を含む）を返す。型は `types/post.ts`。両関数とも React の `cache()` でメモ化されており、同一リクエスト内の重複フェッチは発生しない。`getPostBySlug` は該当 slug が無いとき `null` を返すので、呼び出し側で not-found 分岐が必要。

リモート画像は `images.microcms-assets.io` から配信され、これが `next.config.mjs` の `images.remotePatterns` で唯一許可されているホスト。新しい画像配信元を追加するには、このリストを更新する必要がある。

### カテゴリフィルタ

カテゴリの定義は `lib/categories.ts` に集約されている（`CATEGORIES` / `DEFAULT_CATEGORY` / `Category` / `CategoryFilter` 型）。タブの追加・変更はこのファイルを起点に行う。

`components/Posts.tsx` は `CategoryFilter`（`Category | 'all'`）を受け取り、`'all'` なら全件、それ以外は `category[].title` との完全一致でフィルタする。`HomeClient` はデフォルトタブ（`DEFAULT_CATEGORY` = `'Front-end'`）を `'all'` にマップして全件表示する。**残りのタブラベル（`'WordPress' | 'Web Design' | 'Tumblr'`）は microCMS のカテゴリタイトルと完全一致でマッチする**ため、CMS 側でカテゴリ名を変えるとサイレントにタブが壊れる点に注意。

### スタイリング

2 つのレイヤーを併用している:

1. **SCSS Modules**（`styles/components/*.module.scss`, `styles/page/*.module.scss`）— メインのスタイリング手段。`@/styles/...` 経由で import する。ファイル名は対応するコンポーネントに合わせて PascalCase（例: `Posts.module.scss`, `Home.module.scss`）。
2. **グローバル SCSS**（`styles/foundation/global.scss`）— `app/layout.tsx` で 1 度だけ import される。`sassOptions.includePaths` に `styles/` が設定されているので、`@use 'foundation/variables'` のように相対パス無しで参照できる。

CMS データに応じた動的スタイルは、inline style で CSS 変数を注入して SCSS 側で参照する方式を取る（例: `app/post/[slug]/page.tsx` が `--color-text` に `post.colorText` を設定する）。以前使っていた styled-components は廃止済みなので、新たに導入しないこと。

CSS リセットの `ress` は `app/layout.tsx` で import している。`ress` の型シムは `types/ress.d.ts`。

### パスエイリアス

`@/*` はプロジェクトルートにマップされる（`tsconfig.json` 参照）。内部 import はすべてこれを使う（例: `@/lib/microcms`, `@/components/Posts`, `@/styles/...`, `@/types/post`）。コンポーネントのファイル名は PascalCase に統一されている。

### 末尾スラッシュ

`next.config.mjs` で `trailingSlash: true` が設定されている。内部リンク / canonical URL はすべて `/` で終わらせる（記事 URL は `/post/[slug]/`）。メタデータにハードコードされている OG / canonical URL もこの規約に従う。

### サイトメタデータ

サイト共通の定数は `lib/site.ts` に定義されている（`SITE_URL` / `SITE_NAME` / `OG_IMAGE` / `TWITTER_CARD`）。Server / Client どちらのコンポーネントからも通常の import で参照する（例: `components/Header.tsx`, `app/page.tsx`）。以前の `next.config.mjs` の `env` 経由の露出（`process.env.siteName` など）は廃止済み。

### フォント

`app/layout.tsx` が `next/font/local` で `PostGrotesk-Book.woff` を読み込み、`<html>` に CSS 変数 `--postgrotesk-book` として露出する。フォントの追加・差し替えには `app/layout.tsx` と `public/fonts/` の両方の変更が必要。

## Lint 設定の注意点

`eslint.config.mjs` は `typescript-eslint` の `strictTypeChecked` + `stylisticTypeChecked` に `jsx-a11y/strict` と Next.js の core-web-vitals を重ねている。いくつかの strict ルールは意図的に緩めてある（`no-unsafe-call` / `triple-slash-reference` は off、`restrict-plus-operands` / `restrict-template-expressions` / `no-unnecessary-condition` / `no-unused-vars` / `no-empty-object-type` / `no-case-declarations` / `react-hooks/immutability` は warn）。理由なく `error` に戻さないこと。

## 規約とワークフロー

- **ブランチ運用**: コミットは `main` に直接ランディングする。本リポジトリに PR ワークフローは無い。
- **コミットメッセージ**: Conventional Commits + 英語（例: `chore(deps): bump 7 packages`, `fix(ui): restore arrow-key navigation on category tabs`）。過去履歴には `update:` / `add:` / `remove:` や `fix: styles` のような件名のみコミットなど非標準スタイルが混じっているが、**真似しない**。許可される type、推奨 scope（`app` / `microcms` / `ui` / `styles` / `seo` / `a11y` / `image` / `config` / `isr` / `font` / `deps` 等）、breaking change の扱いといった完全なルールは `.claude/skills/commit/SKILL.md` にある。ユーザーから「コミットして」と言われたらこのスキルを起動する。
- **依存パッケージ更新**: `.claude/skills/update-deps/SKILL.md` に patch+minor 一括 / major 個別承認 / `overrides` の追従 / lint・build 検証 / dev server 目視確認の流れが定義されている。「パッケージ更新」「依存を上げて」と言われたらこのスキルを起動する。
- **ステージしてはいけないファイル**: `.env`, `.DS_Store`, `.next/`, `tsconfig.tsbuildinfo`, `node_modules/` 配下。`git add` は常にファイル名指定で行い、`git add -A` / `git add .` は使わない。
- **peer 制約のあるパッケージ**: `next` / `react` / `react-dom` はセットで動かす。片方だけ major を上げてはいけない。
- **`.next/` キャッシュ**: リファクタやアップグレード後にビルド / dev 挙動が怪しくなったら、`node_modules` や lockfile に手を入れる前に `rm -rf .next` を試すのが安全な第一手。
