/**
 * 夢占いコンテンツ (Contents Table)
 * 夢のキーワードやカテゴリごとの情報を管理します。
 */
export interface DreamContent {
  id: string;
  slug: string; // "slug" column
  title: string; // "keyword" column
  keywords: string; // "keyword" column (same as title for now)
  tags: string[]; // "tag" column
  category?: string | string[]; // "カテゴリ" column
  reading: string; // "ひらがな" column
  initial: string; // Derived from "ひらがな"
  kanaIndex?: string; // "kana_index" column (あ, か, さ, etc.)
  status?: string; // "Status" column
  description?: string; // "description" column
  symbolism?: string; // "象徴" column
  article?: string; // "article" column
  metaTitle?: string;
  metaDescription?: string;
  situations?: {
    title: string;
    description: string;
  }[];
  relatedKeywords?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string; // Use URL-friendly name
  description?: string;
}

/**
 * サイト共通設定 (GlobalSettings Table)
 */
export interface GlobalSetting {
  id: string;
  key: string; // e.g. "default_banner"
  value: string;
}

/**
 * Airtable Record Types
 */
export interface AirtableContentRecord {
  id: string;
  fields: {
    title: string;
    keywords: string;
    tag: string[];
    article: string;
    スラッグ: string;
    読み: string;
    状態?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface AirtableGlobalSettingRecord {
  id: string;
  fields: {
    Key: string;
    Value: string;
  };
}

/**
 * アフィリエイト広告素材
 */
export interface AffiliateAd {
  id: string;
  name: string;
  bannerHtml: string;
  bannerType: 'Square' | 'Horizontal' | 'Vertical';
  targetTag?: string;
  status: string;

  isDefault: boolean;
}

/**
 * アフィリエイトリンク (互換性のために保持)
 */
export interface AffiliateLink {
  id: string;
  label: string;
  url: string;
  description?: string;
  isPrimary?: boolean;
}

/**
 * 記事表示用Props（View層の統一インターフェース）
 */
export interface ArticleProps {
  title: string;
  description: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  affiliateLinks?: AffiliateLink[];
  keywords?: string;
  category?: string;
  // CTA Props
  sidebarCta?: { url: string; html: string };
  introCta?: { url: string; html: string };
  outroCta?: { url: string; html: string };
}

/**
 * 夢占いガイド記事 (Guides Table)
 */
export interface Guide {
  id: string;
  slug: string;
  title: string;
  fullTitle?: string;
  description?: string;
  content?: string;
  image?: string;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedDate?: string;
}

export interface AirtableGuideRecord {
  id: string;
  fields: {
    slug: string;
    title: string;
    fullTitle?: string;
    description?: string;
    MainContent?: string;
    image?: string;
    category?: string;
    metaTitle?: string;
    metaDescription?: string;
    publishedDate?: string;
    Status: string;
  };
}
export interface AirtableAffiliateRecord {
  id: string;
  fields: {
    Name: string;
    BannerHtml: string;
    BannerType: 'Square' | 'Horizontal' | 'Vertical';
    TargetTag?: string;
    Status: string;

    IsDefault?: boolean;
  };
}
