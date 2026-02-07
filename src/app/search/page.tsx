import { searchDreamContents, getPopularKeywords } from "@/lib/airtable";
import { Search, Sparkles, ArrowRight, Moon } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { uiStrings } from "@/constants/uiStrings";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata = {
    title: `${uiStrings.dictionary.search.title} | ${siteConfig.siteName}`,
    description: uiStrings.dictionary.search.heroTitle,
    robots: {
        index: false,
        follow: false,
    },
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q } = await searchParams;
    const query = q ? decodeURIComponent(q) : "";

    const [dreamContents, popularKeywords] = await Promise.all([
        query ? searchDreamContents(query) : [],
        getPopularKeywords(12)
    ]);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 sm:py-20 lg:py-32">
            <BreadcrumbSchema
                items={[
                    { name: uiStrings.common.home, url: siteConfig.baseUrl },
                    { name: uiStrings.dictionary.search.title, url: `${siteConfig.baseUrl}/search${query ? `?q=${encodeURIComponent(query)}` : ""}` },
                ]}
            />
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                {/* Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-serif">
                        {uiStrings.dictionary.search.heroTitle}
                    </h1>
                    {query ? (
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            {uiStrings.dictionary.search.resultCount(query, dreamContents.length)}
                        </p>
                    ) : (
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            {uiStrings.dictionary.search.noQuery}
                        </p>
                    )}
                </header>

                {/* Results */}
                {dreamContents.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                        {dreamContents.map((content) => {
                            // カテゴリ表示のみ
                            const category = Array.isArray(content.category) ? content.category[0] : content.category;
                            const displayCategory = category || uiStrings.common.uncategorized;
                            const encodedCategory = encodeURIComponent(displayCategory);

                            return (
                                <Link
                                    key={content.id}
                                    href={`/contents/${encodedCategory}/${content.slug}`}
                                    className="group relative bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm hover:shadow-mystic flex flex-col items-center text-center overflow-hidden"
                                >
                                    {/* 装飾用バックグラウンド */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />


                                    <h2 className="relative z-10 font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors font-serif text-xl mb-3">
                                        {content.title}
                                    </h2>

                                    <p className="relative z-10 text-slate-500 text-xs font-bold mb-4 uppercase tracking-[0.1em]">
                                        {displayCategory}
                                    </p>

                                    <p className="relative z-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                        {content.description || content.symbolism || `${content.title}の${siteConfig.topicKeyword}が教える運命のサインを読み解きます。`}
                                    </p>

                                    <div className="relative z-10 flex items-center text-primary font-bold text-xs uppercase tracking-widest">
                                        <span>Read More</span>
                                        <ArrowRight className="w-3 h-3 ml-1" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {/* 見つからない場合のヒント */}
                        <div className="text-center py-16 sm:py-24 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative">
                            {/* 装飾 */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-slate-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
                                    {uiStrings.dictionary.search.noResults}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                                    {uiStrings.dictionary.search.noResultsDescription(query)}
                                </p>
                            </div>
                        </div>

                        {/* 人気のキーワード（救済案） */}
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-serif">
                                        {uiStrings.dictionary.search.popularTitle}
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                        {uiStrings.dictionary.search.popularSubtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {popularKeywords.map((kw) => {
                                    const category = Array.isArray(kw.category) ? kw.category[0] : (kw.category || uiStrings.common.uncategorized);
                                    return (
                                        <Link
                                            key={kw.id}
                                            href={`/contents/${encodeURIComponent(category)}/${kw.slug}`}
                                            className="px-6 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-full text-slate-700 dark:text-slate-200 font-bold transition-all border border-slate-100 dark:border-slate-700 hover:border-primary hover:-translate-y-1 shadow-sm"
                                        >
                                            {kw.title}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-12 text-center">
                                <Link
                                    href="/contents"
                                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                                >
                                    {uiStrings.dictionary.search.backToIndex} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
