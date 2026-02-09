# 夢と占い.jp (yumetouranai.jp)

あなたの夢には意味があります。動物、人物、シチュエーションなど、夢の内容から深層心理や未来を読み解く日本最大級の夢占いポータルサイト。

## プロジェクト概要

このプロジェクトは、Next.js (App Router) をベースとした高機能な夢占い辞書・ガイドサイトです。コンテンツ管理には Airtable を使用し、動的でスケーラブルな情報提供を実現しています。

## 技術スタック

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content CMS**: [Airtable](https://airtable.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Radix UI / shadcn/ui base
- **Search**: Client-side & Filtered Airtable Queries

## 開発の進め方

### 1. 環境設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の情報を設定してください。

```bash
NEXT_PUBLIC_BASE_URL=https://yumetouranai.jp
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
```

### 2. 開発サーバーの起動

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開き、動作を確認します。

### 3. デプロイ

Vercel などのプラットフォームへのデプロイを推奨します。デプロイの際は、環境変数の設定を忘れないようにしてください。

## サイト構造

- `/`: ホームページ（検索・最新ガイド・カテゴリ）
- `/contents`: 夢占い辞典（カテゴリ別・五十音索引）
- `/guide`: 夢占い完全ガイド（トピッククラスター）
- `/about`: 運営者情報
- `/privacy-policy`: プライバシーポリシー
- `/disclaimer`: 免責事項

---

© 2026 夢と占い.jp / Areslot LLC.
