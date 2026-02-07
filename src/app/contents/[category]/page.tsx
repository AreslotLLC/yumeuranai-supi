import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Grid, Moon, ArrowRight } from "lucide-react";
import { getDreamContentsByCategory, getCategories, resolveCategoryName } from "@/lib/airtable";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { ItemListSchema, BreadcrumbSchema } from "@/components/seo";
import { uiStrings } from "@/constants/uiStrings";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export const revalidate = 3600;
export const dynamicParams = true; // ビルド時に生成されなかったパスもSSRで対応

/**
 * ビルド時にすべてのカテゴリパスを静的生成
 */
export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((cat) => ({
        category: encodeURIComponent(cat.name),
    }));
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const { category: rawCategory } = await params;
    const category = decodeURIComponent(rawCategory);
    const categories = await getCategories();
    // IDでもスラッグでも検索できるように
    const currentCategory = categories.find(c => c.slug === category || c.id === category);

    const catName = currentCategory ? currentCategory.name : category;

    return {
        title: uiStrings.dictionary.category.metaTitle(catName),
        description: uiStrings.dictionary.category.metaDescription(catName),
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category: rawCategory } = await params;
    const category = decodeURIComponent(rawCategory);
    const displayCategory = await resolveCategoryName(category);

    // カテゴリ名でコンテンツを取得
    const contents = await getDreamContentsByCategory(displayCategory);
    const catName = displayCategory;

    // カテゴリ一覧を取得（ナビゲーション用）
    const categories = await getCategories();
    // 表示用カテゴリに一致する情報を特定
    const currentCategory = categories.find(c => c.name === displayCategory);

    if (contents.length === 0 && displayCategory !== "未分類") {
        // キーワードが1つもない場合は404（任意）
        // notFound(); 
    }

    const encodedCategoryName = encodeURIComponent(catName);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ItemListSchema
                items={contents.map(item => ({
                    name: item.title,
                    url: `${siteConfig.baseUrl}/contents/${encodedCategoryName}/${item.slug}`
                }))}
            />
            <BreadcrumbSchema
                items={[
                    { name: uiStrings.common.home, url: siteConfig.baseUrl },
                    { name: uiStrings.dictionary.index.title, url: `${siteConfig.baseUrl}/contents` },
                    { name: displayCategory, url: `${siteConfig.baseUrl}/contents/${encodedCategoryName}` },
                ]}
            />
            <Breadcrumbs
                items={[
                    { name: uiStrings.common.home, path: "/" },
                    { name: uiStrings.dictionary.index.title, path: "/contents" },
                    { name: displayCategory, path: `/contents/${encodedCategoryName}` },
                ]}
            />

            {/* ヒーローセクション */}
            <section className="relative py-20 md:py-28 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary blur-[150px] rounded-full" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 font-serif tracking-tight">
                            {catName}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            {uiStrings.dictionary.category.heroDescriptionLine1(catName)}<br />
                            {uiStrings.dictionary.category.heroDescriptionLine2}
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Grid className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif">{uiStrings.dictionary.category.listTitle(catName)}</h2>
                        <span className="text-sm font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                            {contents.length}件
                        </span>
                    </div>

                    {contents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {contents.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/contents/${encodedCategoryName}/${item.slug}`}
                                    className="group bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-mystic flex flex-col items-center text-center"
                                >
                                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors mb-6">
                                        <Moon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                                        {uiStrings.common.readMore} <ArrowRight className="w-3 h-3 ml-2" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-20 text-center border border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-500 italic">{uiStrings.dictionary.category.noItems}</p>
                        </div>
                    )}

                    {/* 他のカテゴリへの導線 */}
                    <div className="mt-32 pt-20 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-2xl font-bold mb-10 font-serif text-center">{uiStrings.dictionary.category.otherCategories}</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.filter(c => c.name !== displayCategory).map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/contents/${encodeURIComponent(cat.name)}`}
                                    className="px-6 py-3 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary transition-all font-bold text-sm shadow-sm hover:shadow-mystic"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
