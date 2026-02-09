import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Library } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getGuides, getAffiliateAds, getTextAffiliateAds } from "@/lib/airtable";
import { BannerSlot } from "@/components/article/BannerSlot";
import { AffiliateTextButton } from "@/components/article/AffiliateTextButton";
import { SafeImage } from "@/components/common/SafeImage";
import { Hero } from "@/components/common/Hero";
import { guideCategories, siteConfig } from "@/lib/siteConfig";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo";
import { uiStrings } from "@/constants/uiStrings";

interface GuideArticleProps {
    slug: string;
    title: string;
    fullTitle?: string;
    description?: string;
    image?: string;
    category?: string;
    publishedDate?: string;
    children: React.ReactNode;
}

/**
 * ガイド記事の共通レイアウトコンポーネント
 */
export async function GuideArticle({
    slug,
    title,
    fullTitle,
    description,
    image,
    category,
    publishedDate,
    children,
}: GuideArticleProps) {
    const allGuides = await getGuides();
    const relatedGuides = allGuides
        .filter((g) => g.category === category && g.slug !== slug)
        .slice(0, 3);

    // 広告取得 (各タイプ)
    // カテゴリ名をタグとして使用
    const tags = category ? [category] : [];

    // getAffiliateAdsで一括取得
    const [squareAd, horizontalAd, sidebarAd1, sidebarAd2] = await getAffiliateAds({
        requirements: [
            { type: 'Square' },
            { type: 'Horizontal' },
            { type: 'Square' }, // サイドバー用1つ目
            { type: 'Square' }  // サイドバー用2つ目
        ],
        tags
    });

    // テキスト広告の取得
    const textAds = await getTextAffiliateAds(tags);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <ArticleSchema
                title={fullTitle || title}
                description={description || ""}
                url={`${siteConfig.baseUrl}/guide/${slug}`}
                publishedTime={publishedDate || new Date().toISOString()}
                categoryName={category}
                images={image ? [image] : []}
            />
            <BreadcrumbSchema
                items={[
                    { name: uiStrings.common.home, url: siteConfig.baseUrl },
                    { name: uiStrings.guide.breadcrumbs.index, url: `${siteConfig.baseUrl}/guide` },
                    { name: title, url: `${siteConfig.baseUrl}/guide/${slug}` },
                ]}
            />
            {/* パンくずリスト */}
            <div className="container mx-auto px-4 py-2 sm:py-4">
                <Breadcrumbs
                    items={[
                        { name: uiStrings.common.home, path: "/" },
                        { name: uiStrings.guide.breadcrumbs.index, path: "/guide" },
                        { name: title, path: `/guide/${slug}` },
                    ]}
                />
            </div>

            <Hero
                title={fullTitle || title}
                image={image || Object.values(guideCategories).find(c => c.name === category)?.heroImage}
                category={category}
                publishedDate={publishedDate}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* メインコンテンツ */}
                    <main className="flex-1 min-w-0">
                        {/* 記事本文 */}
                        <div className="bg-card/50 rounded-3xl md:rounded-[3rem] px-4 py-8 sm:p-8 md:p-10 lg:p-12 border border-border/40 mb-8">
                            {children}

                            {/* 記事下広告エリア */}
                            <div className="mt-12 space-y-8">
                                {/* テキストリンク1枚目を優先表示 */}
                                {textAds.length > 0 && (
                                    <AffiliateTextButton ad={textAds[0]} />
                                )}
                                {horizontalAd && <BannerSlot ad={horizontalAd} />}
                                {squareAd && <BannerSlot ad={squareAd} />}
                            </div>
                        </div>

                        {/* 関連記事 */}
                        {relatedGuides.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-xl transition-colors group-hover:bg-primary group-hover:text-white">
                                        <Library className="w-5 h-5" />
                                    </span>
                                    {uiStrings.guide.article.recommended}
                                </h3>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {relatedGuides.map((related, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/guide/${related.slug}`}
                                            className="group guide-card p-5 hover:border-primary/30 transition-all flex flex-col h-full"
                                        >
                                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                                                <SafeImage
                                                    src={related.image || "/images/no-image.png"}
                                                    alt={related.title}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <h4 className="font-bold text-foreground text-base line-clamp-2 group-hover:text-primary transition-colors">
                                                {related.fullTitle || related.title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>

                    {/* サイドバー (PCのみ) */}
                    <aside className="hidden lg:block w-80 shrink-0">
                        <div className="sticky top-24 space-y-8">
                            {/* 正方形バナー2つ */}
                            {sidebarAd1 && <BannerSlot ad={sidebarAd1} />}
                            {sidebarAd2 && <BannerSlot ad={sidebarAd2} />}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
