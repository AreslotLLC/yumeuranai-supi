import Script from "next/script";

interface WebSiteSchemaProps {
    name: string;
    url: string;
    description: string;
    searchUrl?: string;
    alternateName?: string;
}

interface ArticleSchemaProps {
    title: string;
    description: string;
    url: string;
    publishedTime: string;
    modifiedTime?: string;
    authorName?: string;
    images?: string[];
    categoryName?: string;
    aboutName?: string;
    aboutSameAs?: string;
}

interface FAQSchemaProps {
    questions: { question: string; answer: string }[];
}

interface BreadcrumbSchemaProps {
    items: { name: string; url: string }[];
}

interface OrganizationSchemaProps {
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[];
}

interface SiteNavigationSchemaProps {
    items: { name: string; url: string }[];
}

interface DefinedTermSetSchemaProps {
    name: string;
    description: string;
    url: string;
    terms: { name: string; url: string; description: string }[];
}

interface DefinedTermSchemaProps {
    name: string;
    description: string;
    url: string;
    termSetUrl: string;
    termSetName: string;
}

/**
 * Organization 構造化データ（サイト運営者情報用）
 */
export function OrganizationSchema({
    name,
    url,
    logo,
    sameAs = [],
}: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${url}#organization`,
        name,
        url,
        ...(logo && {
            logo: {
                "@type": "ImageObject",
                url: logo,
                width: "112",
                height: "112"
            },
        }),
        ...(sameAs.length > 0 && { sameAs }),
    };

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * SiteNavigationElement 構造化データ（ナビゲーションメニュー用）
 */
export function SiteNavigationSchema({ items }: SiteNavigationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": items.map((item, index) => ({
            "@type": "SiteNavigationElement",
            "position": index + 1,
            "name": item.name,
            "url": item.url
        }))
    };

    return (
        <Script
            id="site-navigation-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * WebSite 構造化データ（サイトトップ用）
 */
export function WebSiteSchema({
    name,
    url,
    description,
    searchUrl,
    alternateName,
}: WebSiteSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        ...(alternateName && { alternateName }),
        url,
        description,
        inLanguage: "ja-JP",
        ...(searchUrl && {
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${searchUrl}?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
            },
        }),
    };

    return (
        <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * Article 構造化データ（記事ページ用）
 * - aboutプロパティで「夢占い」というトピックを明示
 */
export function ArticleSchema({
    title,
    description,
    url,
    publishedTime,
    modifiedTime,
    authorName = "夢と占い.jp 編集部",
    images = [],
    categoryName,
    aboutName,
    aboutSameAs,
}: ArticleSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yumetouranai.jp";
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: {
            "@type": "Person",
            name: authorName,
            url: `${baseUrl}/about`
        },
        publisher: {
            "@type": "Organization",
            name: "夢と占い.jp",
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
            },
        },
        about: [
            {
                "@type": "Thing",
                "name": "夢占い",
                "sameAs": "https://ja.wikipedia.org/wiki/%E5%A4%A2%E5%8D%A0%E3%81%84"
            },
            ...(categoryName ? [{
                "@type": "Thing",
                "name": categoryName
            }] : []),
            ...(aboutName ? [{
                "@type": "Thing",
                "name": aboutName,
                ...(aboutSameAs ? { "sameAs": aboutSameAs } : {})
            }] : [])
        ],
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url
        },
        inLanguage: "ja-JP",
        ...(images.length > 0 && { image: images }),
    };

    return (
        <Script
            id="article-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * FAQPage 構造化データ（FAQ用）
 */
export function FAQSchema({ questions }: FAQSchemaProps) {
    if (!questions || questions.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: q.answer,
            },
        })),
    };

    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * BreadcrumbList 構造化データ（パンくず用）
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    if (!items || items.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
interface HowToSchemaProps {
    name: string;
    description: string;
    steps: { name: string; text: string }[];
    totalTime?: string; // ISO 8601 duration
}

/**
 * HowTo 構造化データ（ハウツー手順用）
 */
export function HowToSchema({
    name,
    description,
    steps,
    totalTime,
}: HowToSchemaProps) {
    if (!steps || steps.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        totalTime,
        step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            itemListElement: [
                {
                    "@type": "HowToDirection",
                    text: step.text,
                },
            ],
        })),
    };

    return (
        <Script
            id="howto-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ItemListSchemaProps {
    items: { name: string; url: string }[];
}

/**
 * ItemList 構造化データ（一覧ページ用）
 */
export function ItemListSchema({ items }: ItemListSchemaProps) {
    if (!items || items.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.url,
        })),
    };

    return (
        <Script
            id="itemlist-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * DefinedTermSet 構造化データ（辞書全体用）
 */
export function DefinedTermSetSchema({ name, description, url, terms }: DefinedTermSetSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": url,
        name,
        description,
        url,
        hasDefinedTerm: terms.map((term) => ({
            "@type": "DefinedTerm",
            name: term.name,
            url: term.url,
            description: term.description,
        })),
    };

    return (
        <Script
            id="defined-term-set-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * DefinedTerm 構造化データ（個別用語用）
 */
export function DefinedTermSchema({ name, description, url, termSetUrl, termSetName }: DefinedTermSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "@id": url,
        name,
        description,
        url,
        inDefinedTermSet: {
            "@type": "DefinedTermSet",
            "@id": termSetUrl,
            name: termSetName,
            url: termSetUrl
        }
    };

    return (
        <Script
            id="defined-term-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
