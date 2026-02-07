import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig, guidePages, guideCategories } from "@/lib/siteConfig";
import { ItemListSchema } from "@/components/seo/JsonLd";

import { getGuides } from "@/lib/guides";
import { SafeImage } from "@/components/common/SafeImage";
import { Hero } from "@/components/common/Hero";
import { uiStrings } from "@/constants/uiStrings";

export const metadata: Metadata = {
    title: `${uiStrings.guide.index.title} | ${siteConfig.topicKeyword}が教える運命のサイン`,
    description: uiStrings.home.featuredGuides.description,
    alternates: {
        canonical: `${siteConfig.baseUrl}/guide`,
    },
};

export default async function GuideIndexPage() {
    const allGuidesData = await getGuides();

    const categories = [
        { ...guideCategories.basics, guides: allGuidesData.filter(g => g.category === guideCategories.basics.name) },
        { ...guideCategories.symbols, guides: allGuidesData.filter(g => g.category === guideCategories.symbols.name) },
        { ...guideCategories.psychology, guides: allGuidesData.filter(g => g.category === guideCategories.psychology.name) },
        { ...guideCategories.nightmare, guides: allGuidesData.filter(g => g.category === guideCategories.nightmare.name) },
    ];

    // 全ガイドをフラット化してItemList用のデータを作成
    const allGuideItems = categories.flatMap(category =>
        category.guides.map(guide => ({
            name: guide.title,
            url: `${siteConfig.baseUrl}/guide/${guide.slug}`
        }))
    );

    return (
        <>
            <ItemListSchema items={allGuideItems} />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Hero
                    title={
                        <>
                            {uiStrings.guide.index.heroTitle}
                            <br />
                            <span className="text-primary underline decoration-primary/20 underline-offset-8">{uiStrings.guide.index.heroSubtitle}</span>
                        </>
                    }
                    description={uiStrings.guide.index.heroDescription}
                    centered={true}
                />

                <Breadcrumbs
                    items={[
                        { name: uiStrings.common.home, path: "/" },
                        { name: uiStrings.guide.breadcrumbs.index, path: "/guide" },
                    ]}
                />

                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="max-w-6xl mx-auto space-y-12">
                        {categories.map((category, idx) => (
                            <section key={idx} className="relative">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
                                                {category.name}
                                            </h2>
                                            <Link
                                                href={`/guide/topic/${category.slug}`}
                                                className="inline-flex items-center text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
                                            >
                                                {uiStrings.guide.index.viewAll}
                                            </Link>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className="hidden md:block h-px flex-1 mx-8 bg-slate-200 dark:bg-slate-800" />
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {category.guides.map((guide, gIdx) => (
                                        <Link
                                            key={gIdx}
                                            href={`/guide/${guide.slug}`}
                                            className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 block h-full overflow-hidden"
                                        >
                                            {/* HERO画像 + タイトル */}
                                            <div className="relative w-full aspect-[16/9] overflow-hidden">
                                                <SafeImage
                                                    src={guide.image || "/images/no-image.png"}
                                                    alt={guide.fullTitle || guide.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                {/* タイトル（画像上に白文字） */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-lg line-clamp-2">
                                                        {guide.fullTitle}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* 説明エリア */}
                                            <div className="p-4">
                                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                                    {guide.description}
                                                </p>

                                                <div className="flex items-center text-sm font-bold text-primary mt-3">
                                                    <span>{uiStrings.common.readMore}</span>
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </main>

                {/* 下部CTA */}
                <section className="py-12 md:py-16 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-serif">{uiStrings.dictionary.search.ctaTitle}</h2>
                        <p className="text-indigo-100/60 mb-10 max-w-2xl mx-auto">
                            {uiStrings.dictionary.search.ctaDescription}
                        </p>
                        <Link
                            href="/contents"
                            className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-primary/20"
                        >
                            {uiStrings.dictionary.search.ctaButton}
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
