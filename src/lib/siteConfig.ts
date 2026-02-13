/**
 * サイト全体の設定
 */
export const siteConfig = {
    name: "夢と占い.jp",
    siteName: "夢と占い.jp", // 互換性のため追加
    alternateName: "yumetouranai.jp", // 検索エンジン向けに追加
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://yumetouranai.jp",
    description: "あなたの夢には意味があります。動物、人物、シチュエーションなど、夢の内容から深層心理や未来を読み解く日本最大級の夢占いポータルサイト。",
    publisher: "夢と占い.jp 編集部",
    keywords: [
        "夢占い",
        "夢診断",
        "夢辞典",
        "夢の意味",
        "深層心理",
        "予知夢",
        "悪夢",
        "スピリチュアル",
        "心理テスト",
        "運勢",
        "開運",
    ],
    ogImage: "/og-image.svg", // PNGがないためSVGを指すように一旦修正
    logo: "/logo.png",
    // テンプレート化用
    topicName: "夢占い",
    topicKeyword: "夢",
};

export interface GuideCategory {
    slug: string;
    name: string;
    description: string;
    icon: string;
    heroImage?: string;
}

export interface GuidePage {
    path: string;
    title: string;
    fullTitle: string;
    description: string;
    image: string;
    publishedDate: string;
    category: string;
    metaTitle?: string;
    metaDescription?: string;
}

/**
 * ガイドカテゴリ（トピッククラスター）の設定
 */
export const guideCategories: Record<string, GuideCategory> = {
    basics: {
        slug: "basics",
        name: "夢の扉を開く鍵",
        description: "夢が持つ意味や、夢占いの基本的なやり方、読み解き方のコツを解説します。",
        icon: "BookOpenIcon",
        heroImage: "/images/guide/basics.png",
    },
    symbols: {
        slug: "symbols",
        name: "万象が語る物語",
        description: "動物、人物、場所など、夢に登場する象徴的なアイテムが示す深層心理。",
        icon: "SparklesIcon",
        heroImage: "/images/guide/symbols.png",
    },
    psychology: {
        slug: "psychology",
        name: "心の奥底への旅路",
        description: "追いかけられる、空を飛ぶなど、夢の中のシチュエーションと心の状態。",
        icon: "HeartIcon",
        heroImage: "/images/guide/psychology.png",
    },
    nightmare: {
        slug: "nightmare",
        name: "月影と予兆の調べ",
        description: "怖い夢を見た時の対処法や、特別な意味を持つ予知夢の聞き聞き分け方。",
        icon: "MoonIcon",
        heroImage: "/images/guide/nightmare.png",
    },
};

/**
 * ガイドページの設定
 */
export const guidePages: Record<string, GuidePage> = {
    basics: {
        path: "/guide/meaning-of-dreams",
        title: "夢占いとは？",
        fullTitle: "夢占いとは？夢が教える心理メッセージの基本",
        description: "なぜ私たちは夢を見るのか、夢占いで何がわかるのかを解説。",
        image: "/images/guide/basics.png",
        publishedDate: "2026-01-22",
        category: guideCategories.basics.name,
    },
    lucky: {
        path: "/guide/lucky-dreams",
        title: "金運・幸運の夢",
        fullTitle: "金運が上がる！？宝くじが当たる前兆と言われる夢5選",
        description: "もしこの夢を見たらチャンスかも？縁起の良い夢を紹介します。",
        image: "/images/guide/lucky.png",
        publishedDate: "2026-01-22",
        category: guideCategories.symbols.name,
    },
    remember: {
        path: "/guide/how-to-remember-dreams",
        title: "夢を覚える方法",
        fullTitle: "夢を忘れてしまう人へ。夢日記の付け方とコツ",
        description: "起きたら夢を忘れてしまう原因と、夢を記録するためのテクニック。",
        image: "/images/guide/remember.png",
        publishedDate: "2026-01-22",
        category: guideCategories.basics.name,
    },
    nightmare: {
        path: "/guide/nightmare-psychology",
        title: "悪夢と心理",
        fullTitle: "悪夢を見た時の正しい対処法とスピリチュアルな意味",
        description: "怖い夢を見て不安なあなたへ。その夢が警告するメッセージとは。",
        image: "/images/guide/nightmare.png",
        publishedDate: "2026-01-22",
        category: guideCategories.nightmare.name,
    },
    precognitive: {
        path: "/guide/precognitive-dreams",
        title: "予知夢と正夢",
        fullTitle: "その夢は未来の予兆？予知夢や正夢を見分けるポイント",
        description: "単なる偶然か、それとも未来の暗示か。予知夢の種類と見分け方。",
        image: "/images/guide/precognitive.png",
        publishedDate: "2026-01-22",
        category: guideCategories.nightmare.name,
    },
};

/**
 * ヘッダーナビゲーションリンク
 */
export const headerNavLinks = [
    { href: "/guide", label: "夢占いガイド" },
    { href: "/contents", label: "夢辞典" },
    { href: "/guide/meaning-of-dreams", label: "夢占いとは" },
];

/**
 * フッターナビゲーションリンク
 */
export const footerNavLinks = {
    guides: [
        { href: "/guide", label: "夢占いガイド一覧" },
        { href: "/guide/topic/basics", label: "夢占いの基礎" },
        { href: "/guide/topic/symbols", label: "象徴の意味" },
        { href: "/guide/topic/psychology", label: "深層心理" },
        { href: "/guide/topic/nightmare", label: "悪夢・予知夢" },
    ],
    legal: [
        { href: "/about", label: "運営者情報" },
        { href: "/privacy-policy", label: "プライバシーポリシー" },
        { href: "/disclaimer", label: "免責事項" },
    ],
};

/**
 * アフィリエイトリンク設定
 */
export const affiliateLinks = {
    default: {
        url: "#",
        label: "おすすめの占いサービス",
        description: "プロの占い師に相談してみたい方はこちら",
    },
};

/**
 * 法的ページの設定
 */
export const legalPages = {
    about: {
        path: "/about",
        title: "運営者情報",
    },
    privacyPolicy: {
        path: "/privacy-policy",
        title: "プライバシーポリシー",
    },
    disclaimer: {
        path: "/disclaimer",
        title: "免責事項",
    },
};

