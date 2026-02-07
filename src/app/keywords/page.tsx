import { Metadata } from "next";
import Link from "next/link";
import { getDreamContents } from "@/lib/airtable";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { BreadcrumbSchema, ItemListSchema } from "@/components/seo";
import { uiStrings } from "@/constants/uiStrings";
import { ArrowRight, Book } from "lucide-react";

export const metadata: Metadata = {
    title: `五十音索引 - 全キーワード一覧 | ${siteConfig.name}`,
    description: "夢占いキーワードを五十音順で検索できる索引ページです。あ行からわ行まで、すべてのキーワードを一覧で確認できます。",
    alternates: {
        canonical: `${siteConfig.baseUrl}/keywords`,
    },
};

export const revalidate = 3600; // 1時間キャッシュ

// 五十音の行定義
const KANA_ROWS = [
    { id: "あ", label: "あ行" },
    { id: "か", label: "か行" },
    { id: "さ", label: "さ行" },
    { id: "た", label: "た行" },
    { id: "な", label: "な行" },
    { id: "は", label: "は行" },
    { id: "ま", label: "ま行" },
    { id: "や", label: "や行" },
    { id: "ら", label: "ら行" },
    { id: "わ", label: "わ行" },
];

export default async function KeywordsIndexPage() {
    const allContents = await getDreamContents();

    // kanaIndexでグループ化
    const groupedContents = KANA_ROWS.map(row => ({
        ...row,
        contents: allContents
            .filter(content => content.kanaIndex === row.id)
            .sort((a, b) => a.reading.localeCompare(b.reading, "ja")),
    }));

    // ItemListSchema用のアイテム
    const allItems = allContents.map(content => {
        const category = Array.isArray(content.category) ? content.category[0] : content.category;
        return {
            name: content.title,
            url: `${siteConfig.baseUrl}/contents/${encodeURIComponent(category || "uncategorized")}/${content.slug}`,
        };
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ItemListSchema items={allItems} />
            <BreadcrumbSchema
                items={[
                    { name: uiStrings.common.home, url: siteConfig.baseUrl },
                    { name: "五十音索引", url: `${siteConfig.baseUrl}/keywords` },
                ]}
            />

            {/* ヒーローセクション */}
            <section className="relative py-16 md:py-24 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary blur-[150px] rounded-full opacity-50" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500 blur-[150px] rounded-full opacity-50" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold mb-8 text-accent">
                            <Book className="w-5 h-5" />
                            全キーワード一覧
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 font-serif tracking-tight">
                            五十音索引
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
                            夢占いキーワードをあ行からわ行まで<br className="hidden md:block" />
                            五十音順で探すことができます
                        </p>
                    </div>
                </div>
            </section>

            {/* パンくず */}
            <Breadcrumbs
                items={[
                    { name: uiStrings.common.home, path: "/" },
                    { name: "五十音索引", path: "/keywords" },
                ]}
            />

            {/* 五十音ナビゲーション */}
            <nav className="sticky top-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {KANA_ROWS.map(row => {
                            const hasContents = groupedContents.find(g => g.id === row.id)?.contents.length ?? 0;
                            return (
                                <a
                                    key={row.id}
                                    href={`#${row.id}`}
                                    className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                                        hasContents > 0
                                            ? "bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 hover:border-primary"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                                    }`}
                                >
                                    {row.id}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* メインコンテンツ */}
            <main className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-6xl mx-auto space-y-16">
                    {groupedContents.map(group => (
                        group.contents.length > 0 && (
                            <section key={group.id} id={group.id} className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-3xl font-black font-serif">
                                        {group.id}
                                    </span>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                            {group.label}
                                        </h2>
                                        <p className="text-slate-500 text-sm">
                                            {group.contents.length}件のキーワード
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                    {group.contents.map(content => {
                                        const category = Array.isArray(content.category) ? content.category[0] : content.category;
                                        const encodedCategory = encodeURIComponent(category || "uncategorized");

                                        return (
                                            <Link
                                                key={content.id}
                                                href={`/contents/${encodedCategory}/${content.slug}`}
                                                className="group relative bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm hover:shadow-lg overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
                                                <span className="relative z-10 font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors text-sm md:text-base line-clamp-2">
                                                    {content.title}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        )
                    ))}
                </div>

                {/* 下部CTA */}
                <div className="mt-20 text-center">
                    <Link
                        href="/contents"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                    >
                        カテゴリ別で探す <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
