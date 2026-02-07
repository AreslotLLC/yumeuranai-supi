# プロジェクト複製チェックリスト

このプロジェクトを新しいドメインやトピックで立ち上げる際の手順です。

## 1. 基本設定の変更

- [ ] `src/lib/siteConfig.ts` の修正
    - `name`, `siteName` を新しいサイト名に変更
    - `baseUrl` を新しいドメインに変更
    - `description`, `keywords` を更新
    - `topicName` (例: 夢占い), `topicKeyword` (例: 夢) を更新
    - `guideCategories` のラベルとスラッグを新しいトピックに合わせて変更
- [ ] `src/constants/uiStrings.ts` の微調整
    - 変数化されているため基本はそのままで動作しますが、言い回しを変えたい場合はここを修正します。

## 2. デザイン・ブランディング

- [ ] `src/app/globals.css` のカラー変数修正
    - `--primary`: メインカラー (OKLCH形式)
    - `--accent`: アクセントカラー
    - `--background`: 背景色
- [ ] 静的アセットの差し替え
    - `public/logo.png`: サイトロゴ
    - `public/og-image.svg`: OGP画像
    - `public/icon.svg`: ファビコン

## 3. 外部連携・環境変数

- [ ] `.env.local` の作成と設定
    - `AIRTABLE_API_KEY`: 新しいAirtableのAPIキー
    - `AIRTABLE_BASE_ID`: 新しいAirtableのベースID
    - `AIRTABLE_TABLE_DREAM_CONTENT`: テーブル名（必要に応じて）
    - `AIRTABLE_TABLE_KEYWORDS`: テーブル名（必要に応じて）
- [ ] Airtable側の準備
    - 既存の構造をコピーした新しいベースを作成
    - ステータスが `Published` のレコードを用意

## 4. 検証

- [ ] `npm install` で依存関係のインストール
- [ ] `npm run dev` でローカル起動し、表示を確認
- [ ] `npm run build` でビルドエラーがないか確認
