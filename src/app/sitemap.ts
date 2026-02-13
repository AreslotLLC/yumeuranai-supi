import { MetadataRoute } from "next";
import { getDreamContents } from "@/lib/airtable";
import { DreamContent, Guide } from "@/types";
import { siteConfig } from "@/lib/siteConfig";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.baseUrl;

    // 夢占いガイド記事の取得 (lib/airtable.tsのgetGuidesを使用)
    const guides = await (await import("@/lib/airtable")).getGuides();
    const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guide/${guide.slug}`,
        lastModified: guide.publishedDate ? new Date(guide.publishedDate) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // 夢占いキーワード情報の取得
    const dreamContents = await getDreamContents();

    // 静的ページ
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/guide`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contents`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0, // 辞書トップは最優先
        },
        {
            url: `${baseUrl}/keywords`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0, // 索引も最優先
        },
    ];

    // 法的ページ
    const legalPagesData: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/about`, lastModified: new Date("2026-01-09"), changeFrequency: "monthly", priority: 0.3 },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date("2026-01-09"), changeFrequency: "monthly", priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: new Date("2026-01-09"), changeFrequency: "monthly", priority: 0.3 },
    ];

    // ガイドカテゴリページ (トピック)
    const topicPages: MetadataRoute.Sitemap = Object.values(await import("@/lib/siteConfig").then(m => m.guideCategories)).map((cat) => ({
        url: `${baseUrl}/guide/topic/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // 夢キーワードカテゴリページ
    const categories = await (await import("@/lib/airtable")).getCategories();
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${baseUrl}/contents/${encodeURIComponent(cat.name)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // 夢キーワードページ (動的)
    const dreamContentPages: MetadataRoute.Sitemap = dreamContents
        .filter((content) => content.slug)
        .map((content: DreamContent) => {
            const category = (Array.isArray(content.category) ? content.category[0] : content.category) || "uncategorized";
            return {
                url: `${baseUrl}/contents/${encodeURIComponent(category)}/${content.slug}`,
                lastModified: content.updatedAt ? new Date(content.updatedAt) : new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.8,
            };
        });

    return [
        ...staticPages,
        ...guideEntries,
        ...topicPages,
        ...legalPagesData,
        ...categoryPages,
        ...dreamContentPages,
    ];
}
