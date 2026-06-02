# Password Generator

Next.js で作成したレスポンシブ対応のパスワード生成 Web アプリです。

## Features

- 文字数を指定したパスワード生成
- Lowercase / Uppercase / Numbers / Symbols の切り替え
- 全トグル OFF 時のランダム顔文字・絵文字生成
- パスワードのコピー
- パスワード履歴の表示
- 履歴のお気に入り登録・削除
- Light / Dark テーマ切り替え
- iPhone SE からデスクトップまでのレスポンシブレイアウト

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn / tw-animate-css
- Iconify
- next-themes
- Bun

## Getting Started

依存関係をインストールします。

```bash
bun install
```

開発サーバーを起動します。

```bash
bun run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開きます。

## Scripts

```bash
bun run dev
bun run lint
bun run build
bun run start
```

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  theme-provider.tsx
  ui/
features/
  password-generator/
    components/
    constants.ts
    password-generator-app.tsx
    password-utils.ts
    types.ts
    use-password-generator.ts
lib/
  utils.ts
```

## Notes

- テーマ色は `app/globals.css` の CSS 変数で管理しています。
- Light / Dark の切り替えは `next-themes` を使用しています。
- UI の色指定は `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground` などの Tailwind クラスを優先しています。
- パスワード生成ロジックは `features/password-generator/password-utils.ts` に集約しています。
