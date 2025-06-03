# DogeDigger Landing Page

犬も歩けばトークン掘れる - ロボット犬×AR×NFTで実現する新感覚の宝探し体験

## 🚀 デプロイ

### Vercelでのデプロイ

1. **環境変数の設定**

   Vercelのプロジェクト設定で以下の環境変数を設定してください：

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ```

2. **Supabaseプロジェクトの作成**

   - [Supabase](https://supabase.com)でプロジェクトを作成
   - `supabase/schema.sql`を実行してテーブルを作成
   - Settings > API > Project URLとAnon keyを取得

### ローカル開発

1. **依存関係のインストール**

   ```bash
   npm install
   ```

2. **環境変数の設定**

   ```bash
   cp .env.local.example .env.local
   # .env.localファイルを編集してSupabase情報を設定
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

## 📋 機能

- ✅ レスポンシブなランディングページ
- ✅ YouTube動画埋め込み
- ✅ ウェイトリスト機能（Supabase）
- ✅ インタラクティブな料金計算機
- ✅ 多言語対応基盤（日本語・英語）
- ✅ モダンなアニメーション
- ✅ Tailwind CSS + TypeScript

## 🛠 技術スタック

- **フレームワーク**: Next.js 15
- **UI**: Tailwind CSS + Framer Motion
- **データベース**: Supabase
- **言語**: TypeScript
- **デプロイ**: Vercel

## 📝 注意事項

- Supabaseの環境変数が設定されていない場合、デモモードで動作します
- 本番環境では必ずSupabaseの環境変数を設定してください
- 環境変数未設定時もビルドエラーにならないよう、フォールバック処理を実装済み

## 🎨 デザイン

洗練されたブルー・シアン・アンバーの配色を使用し、企業的で信頼感のあるデザインを採用しています。

## 📱 レスポンシブ対応

- デスクトップ
- タブレット
- モバイル

すべてのデバイスで最適な表示を提供します。

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
