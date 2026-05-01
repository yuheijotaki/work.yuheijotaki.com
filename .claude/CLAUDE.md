# CLAUDE.md

このファイルは、本リポジトリで Claude Code (claude.ai/code) が作業する際のガイドである。

## コマンド

```bash
npm run dev         # Next.js dev server (http://localhost:3000)
npm run build       # 本番ビルド
npm run start       # 本番ビルドの起動
npm run lint        # ESLint（typescript-eslint strictTypeChecked）
npm run lint:fix    # ESLint --fix
npm run markuplint  # マークアップ lint — 下記の注意を参照
```

Node バージョンは `.node-version` で `24.14.1` に固定。

`npm run markuplint` は `./pages/**/*.{jsx,tsx}` を対象にしているが、本プロジェクトは App Router へ移行済みで、旧 `pages/` は `pages.backup/` に退避している（lint 対象外）。グロブを `./app/**/*.{jsx,tsx}` に書き換えるまで、現状はこのスクリプトで lint されるファイルが存在しない。

## 環境変数

`.env` に以下を定義する必要がある:

- `MICROCMS_SERVICE_ID`
- `MICROCMS_API_KEY`

どちらも `lib/microcms.ts` から読まれており、`getPosts` / `getPostBySlug` を呼ぶページ（実質ほぼ全ページ）で必須。未設定だと `next dev` でもレンダリングに失敗する。

## アーキテクチャ

Next.js 16 App Router で構築されたポートフォリオサイトで、コンテンツは microCMS から取得する。ルートは `/` と `/post/[slug]` の 2 つのみで、いずれも `revalidate = 60` の ISR。

### Server → Client のデータフロー

ページは async な Server Component が microCMS を 1 度フェッチし、その結果をインタラクティブな Client Component に渡す構成になっている。**この分離は意図的なので、ページを追加する際も同じパターンを踏襲すること**:

- `app/page.tsx`（server）が `getPosts()` を呼び、結果を `app/HomeClient.tsx`（`'use client'`）に渡す。カテゴリタブの状態は Client Component 側で保持。
- `app/post/[slug]/page.tsx`（server）は `getPostBySlug(slug)` と `getPosts()` の両方を呼ぶ（後者は関連 works 用）。`generateStaticParams` でビルド時に全 slug を pre-render する。

microCMS 呼び出しを Client Component に持ち込まないこと。SDK は `process.env.MICROCMS_API_KEY` を参照するため、必ず Server 側に置く。

### microCMS アクセス

microCMS と通信するのは `lib/microcms.ts` のみ。コンテンツタイプは `work` の 1 つだけで、`getPosts` は一覧用のフィールドサブセット、`getPostBySlug` は詳細レコード一式（`images[]` / `credit` / `colorText` / `archive` / `notAvailable` を含む）を返す。型は `types/post.ts`。

リモート画像は `images.microcms-assets.io` から配信され、これが `next.config.mjs` の `images.remotePatterns` で唯一許可されているホスト。新しい画像配信元を追加するには、このリストを更新する必要がある。

### カテゴリフィルタ

`components/posts.tsx` は `category[].title` でフィルタする。文字列 `'Front-end'` は「全件表示」として扱われる（`isShow = true` で短絡する）。`HomeClient` のタブは `'Front-end' | 'WordPress' | 'Web Design' | 'Tumblr'` を切り替えるが、**これらの文字列は microCMS のカテゴリタイトルと完全一致でマッチする**。CMS 側でカテゴリ名を変えるとサイレントにタブが壊れる点に注意。

### スタイリング

3 つのレイヤーを併用している:

1. **SCSS Modules**（`styles/components/*.module.scss`, `styles/page/*.module.scss`）— メインのスタイリング手段。`@/styles/...` 経由で import する。
2. **グローバル SCSS**（`styles/foundation/global.scss`）— `app/layout.tsx` で 1 度だけ import される。`sassOptions.includePaths` に `styles/` が設定されているので、`@use 'foundation/variables'` のように相対パス無しで参照できる。
3. **styled-components** — CMS データに応じた動的スタイル用（例: `app/post/[slug]/PostColorStyle.tsx` が記事ごとの文字色を注入する）。SSR は `lib/registry.tsx` の `StyledComponentsRegistry` 経由で配線されており、`app/layout.tsx` で children をラップしている必要がある。Next コンパイラは `styledComponents: true` を有効化済み。

CSS リセットの `ress` は `app/layout.tsx` で import している。型シムは `types/ress.d.ts`。

### パスエイリアス

`@/*` はプロジェクトルートにマップされる（`tsconfig.json` 参照）。内部 import はすべてこれを使う（例: `@/lib/microcms`, `@/components/posts`, `@/styles/...`, `@/types/post`）。

### 末尾スラッシュ

`next.config.mjs` で `trailingSlash: true` が設定されている。内部リンク / canonical URL はすべて `/` で終わらせる（記事 URL は `/post/[slug]/`）。メタデータにハードコードされている OG / canonical URL もこの規約に従う。

### サイトメタデータ

`next.config.mjs` の `env` で `siteUrl` / `siteName` / `ogImage` / `metaCard` が露出されており、Client Component からも `process.env.siteName` のように参照できる（`components/header.tsx` 参照）。これらはビルド時定数であって、ランタイム設定ではない。

### フォント

`app/layout.tsx` が `next/font/local` で `PostGrotesk-Book.woff` を読み込み、`<html>` に CSS 変数 `--postgrotesk-book` として露出する。フォントの追加・差し替えには `app/layout.tsx` と `public/fonts/` の両方の変更が必要。

## Lint 設定の注意点

`eslint.config.mjs` は `typescript-eslint` の `strictTypeChecked` + `stylisticTypeChecked` に `jsx-a11y/strict` と Next.js の core-web-vitals を重ねている。いくつかの strict ルールは意図的に `warn` に下げてある（`no-unsafe-call` は off、`restrict-plus-operands` / `restrict-template-expressions` / `no-unnecessary-condition` / `no-unused-vars` は warn）。理由なく `error` に戻さないこと。

## 規約とワークフロー

- **ブランチ運用**: コミットは `main` に直接ランディングする。本リポジトリに PR ワークフローは無い。
- **コミットメッセージ**: Conventional Commits + 英語（例: `chore(deps): bump 7 packages`, `fix(ui): restore arrow-key navigation on category tabs`）。過去履歴には `update:` / `add:` / `remove:` や `fix: styles` のような件名のみコミットなど非標準スタイルが混じっているが、**真似しない**。許可される type、推奨 scope（`app` / `microcms` / `ui` / `styles` / `seo` / `a11y` / `image` / `config` / `isr` / `font` / `deps` 等）、breaking change の扱いといった完全なルールは `.claude/skills/commit/SKILL.md` にある。ユーザーから「コミットして」と言われたらこのスキルを起動する。
- **依存パッケージ更新**: `.claude/skills/update-deps/SKILL.md` に patch+minor 一括 / major 個別承認 / `overrides` の追従 / lint・build 検証 / dev server 目視確認の流れが定義されている。「パッケージ更新」「依存を上げて」と言われたらこのスキルを起動する。
- **ステージしてはいけないファイル**: `.env`, `.DS_Store`, `.next/`, `tsconfig.tsbuildinfo`, `node_modules/` 配下。`git add` は常にファイル名指定で行い、`git add -A` / `git add .` は使わない。
- **peer 制約のあるパッケージ**: `next` / `react` / `react-dom` はセットで動かす。片方だけ major を上げてはいけない。`styled-components` の major は `lib/registry.tsx`（SSR レジストリ）の見直しが必要になる場合がある。
- **`.next/` キャッシュ**: リファクタやアップグレード後にビルド / dev 挙動が怪しくなったら、`node_modules` や lockfile に手を入れる前に `rm -rf .next` を試すのが安全な第一手。
