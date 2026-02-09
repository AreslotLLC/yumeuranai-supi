import { Metadata } from "next";
import Link from "next/link";
import { Compass, Grid, Sparkles, Moon, ArrowRight, PawPrint, Users, Star, Mountain, Utensils, Heart, Car, Home, Coins, Activity, Smile, Zap } from "lucide-react";
import { getCategories, getPopularKeywords } from "@/lib/airtable";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { SearchBar } from "@/components/home";
import { ItemListSchema, BreadcrumbSchema, DefinedTermSetSchema } from "@/components/seo";
import { uiStrings } from "@/constants/uiStrings";

export const metadata: Metadata = {
    title: `${uiStrings.dictionary.index.title} - ${siteConfig.topicKeyword}が教える運命のサイン | ${siteConfig.name}`,
    description: uiStrings.dictionary.search.ctaDescription,
};

export const revalidate = 3600;

export default async function ContentsIndexPage() {
    const categories = await getCategories();
    // 共通の関数を使用して人気キーワードを取得
    const popularContents = await getPopularKeywords(12);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ItemListSchema
                items={categories.map(cat => ({
                    name: cat.name,
                    url: `${siteConfig.baseUrl}/contents/${encodeURIComponent(cat.slug)}`
                }))}
            />
            <DefinedTermSetSchema
                name={`${siteConfig.name} 夢占い辞典`}
                description={siteConfig.description}
                url={`${siteConfig.baseUrl}/contents`}
                terms={popularContents.map(content => {
                    const cat = Array.isArray(content.category) ? content.category[0] : content.category;
                    const catSlug = cat || "uncategorized";
                    return {
                        name: content.title,
                        url: `${siteConfig.baseUrl}/contents/${encodeURIComponent(catSlug)}/${content.slug}`,
                        description: content.description || `${content.title}の夢占いの意味を詳しく解説しています。`
                    };
                })}
            />
            <BreadcrumbSchema
                items={[
                    { name: uiStrings.common.home, url: siteConfig.baseUrl },
                    { name: uiStrings.dictionary.index.title, url: `${siteConfig.baseUrl}/contents` },
                ]}
            />
            <Breadcrumbs
                items={[
                    { name: uiStrings.common.home, path: "/" },
                    { name: uiStrings.dictionary.index.title, path: "/contents" },
                ]}
            />

            {/* ヒーロー検索セクション */}
            <section className="relative py-24 md:py-36 overflow-hidden bg-slate-950">
                {/* 背景装飾 */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary blur-[150px] rounded-full opacity-50" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500 blur-[150px] rounded-full opacity-50" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold mb-8 text-accent">
                            <Compass className="w-5 h-5" />
                            {uiStrings.dictionary.index.heroTagline}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 font-serif tracking-tight">{uiStrings.dictionary.index.heroTitle}</h1>
                        <p className="text-xl md:text-2xl text-slate-300/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {uiStrings.dictionary.index.heroDescriptionLine1}<br className="hidden md:block" />
                            {uiStrings.dictionary.index.heroDescriptionLine2}
                        </p>

                        {/* 検索フォーム */}
                        <div className="max-w-2xl mx-auto">
                            <SearchBar
                                placeholder="例：蛇、空を飛ぶ、犬、好きな人..."
                                className="mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">

                    {/* 人気のキーワードセクション */}
                    <div className="mb-20 bg-white dark:bg-slate-900 rounded-[4rem] p-10 md:p-16 border border-indigo-50/50 dark:border-slate-800 shadow-2xl shadow-indigo-100/50 dark:shadow-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <Moon className="w-7 h-7" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold font-serif italic text-slate-900 dark:text-white">{uiStrings.dictionary.index.popularTitle}</h2>
                            </div>

                            <div className="pt-4">
                                <div className="flex flex-wrap gap-4">
                                    {popularContents.map((content) => {
                                        const cat = Array.isArray(content.category) ? content.category[0] : content.category;
                                        const catSlug = cat || "uncategorized";

                                        return (
                                            <Link
                                                key={content.id}
                                                href={`/contents/${encodeURIComponent(catSlug)}/${content.slug}`}
                                                className="px-8 py-4 bg-white dark:bg-slate-800 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:shadow-xl transition-all font-bold border border-slate-200 dark:border-slate-700"
                                            >
                                                #{content.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* カテゴリセクション */}
                    <div className="mb-28">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Grid className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white">{uiStrings.dictionary.index.categoryTitle}</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {categories.map((cat, idx) => {
                                const catName = cat.name;
                                const iconMap: Record<string, any> = {
                                    "動物": PawPrint,
                                    "人物": Users,
                                    "シチュエーション": Star,
                                    "自然・風景": Mountain,
                                    "食べ物": Utensils,
                                    "体・健康": Heart,
                                    "乗り物": Car,
                                    "建物・家": Home,
                                    "金運": Coins,
                                    "動作": Activity,
                                    "感情": Smile,
                                    "能力": Zap,
                                };
                                const Icon = iconMap[catName] || Sparkles;

                                return (
                                    <Link
                                        key={idx}
                                        href={`/contents/${encodeURIComponent(cat.slug)}`}
                                        className="group relative p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/50 shadow-sm hover:shadow-mystic min-h-[140px]"
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 bg-primary/5" />

                                        <span className="relative z-10 text-xl font-bold font-serif transition-colors text-slate-800 dark:text-slate-100 group-hover:text-primary">
                                            {catName}
                                        </span>

                                        <div className="relative z-10 mt-3 flex items-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors text-slate-400 group-hover:text-primary">
                                            Explore <ArrowRight className="w-3 h-3 ml-1" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 下部マガジン導線 */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="group bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-900 p-12 md:p-16 rounded-[4rem] border border-indigo-100/50 dark:border-slate-800 hover:shadow-2xl transition-all relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                            <h3 className="text-3xl font-black mb-6 font-serif italic relative z-10">{uiStrings.dictionary.index.basicsTitle}</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed relative z-10">
                                {uiStrings.dictionary.index.basicsDescription}
                            </p>
                            <Link href="/guide" className="inline-flex items-center gap-3 text-primary font-bold text-lg transition-all relative z-10 px-6 py-3 rounded-2xl group-hover:text-primary-foreground group-hover:bg-primary">
                                ガイド一覧へ <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="group bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-900 p-12 md:p-16 rounded-[4rem] border border-indigo-100/50 dark:border-slate-800 hover:shadow-2xl transition-all relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                            <h3 className="text-3xl font-black mb-6 font-serif italic relative z-10">{uiStrings.dictionary.index.luckyTitle}</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed relative z-10">
                                {uiStrings.dictionary.index.luckyDescription}
                            </p>
                            <Link href="/guide/lucky-dreams" className="inline-flex items-center gap-3 text-accent font-bold text-lg transition-all relative z-10 px-6 py-3 rounded-2xl group-hover:text-accent-foreground group-hover:bg-accent">
                                幸運の夢ガイド <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
