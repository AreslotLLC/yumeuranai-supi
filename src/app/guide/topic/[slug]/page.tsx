import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { guideCategories, siteConfig } from "@/lib/siteConfig";
import { getGuides } from "@/lib/guides";
import { ItemListSchema } from "@/components/seo/JsonLd";
import { SafeImage } from "@/components/common/SafeImage";

import { Hero } from "@/components/common/Hero";

interface TopicPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.values(guideCategories).map((cat) => ({
        slug: cat.slug,
    }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = Object.values(guideCategories).find((cat) => cat.slug === slug);

    if (!category) return { title: "カテゴリが見つかりません" };

    return {
        title: `${category.name} | 夢と占い.jp`,
        description: category.description,
        alternates: {
            canonical: `${siteConfig.baseUrl}/guide/topic/${slug}`,
        },
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { slug } = await params;
    const category = Object.values(guideCategories).find((cat) => cat.slug === slug);

    if (!category) notFound();

    // このカテゴリに属するガイドを抽出
    const allGuides = await getGuides();
    const guides = allGuides.filter(
        (guide) => guide.category === category.name
    );

    const guideItems = guides.map(g => ({
        name: g.fullTitle || g.title,
        url: `${siteConfig.baseUrl}/guide/${g.slug}`
    }));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ItemListSchema items={guideItems} />
            <Hero
                title={category.name}
                description={category.description}
                image={category.heroImage}
                centered={true}
            />

            <Breadcrumbs
                items={[
                    { name: "ホーム", path: "/" },
                    { name: "夢占いガイド一覧", path: "/guide" },
                    { name: category.name, path: `/guide/topic/${slug}` },
                ]}
            />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {guides.map((guide, idx) => (
                            <Link
                                key={idx}
                                href={`/guide/${guide.slug}`}
                                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <SafeImage
                                        src={guide.image || "/images/no-image.png"}
                                        alt={guide.fullTitle || guide.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                        {guide.fullTitle}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                        {guide.description}
                                    </p>
                                    <div className="flex items-center text-primary font-bold text-sm">
                                        <span>詳しく読む</span>
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-20 p-8 md:p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full translate-y-1/2" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4 font-serif">夢のキーワードから探す</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                                特定の言葉や印象的なシーンが夢に出てきた時は、夢辞典で詳しく調べてみましょう。昨夜の夢に隠された真実が見つかるかもしれません。
                            </p>
                            <Link
                                href="/contents"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-primary/20"
                            >
                                夢辞典を引く
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
