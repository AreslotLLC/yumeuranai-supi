import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Moon, Sun, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { getDreamContentBySlug, getDreamContentsByCategory, getDreamContents, resolveCategoryName, getAffiliateAd, getAffiliateAds, getTextAffiliateAds } from "@/lib/airtable";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { ArticleSchema, BreadcrumbSchema, DefinedTermSchema } from "@/components/seo";
import { SocialShare } from "@/components/common/SocialShare";
import { TableOfContents, TocItem } from "@/components/article/TableOfContents";
import { BannerSlot } from "@/components/article/BannerSlot";
import { MarkdownContent } from "@/components/MarkdownContent";
import { AffiliateTextButton } from "@/components/article/AffiliateTextButton";
import { uiStrings } from "@/constants/uiStrings";

interface ContentPageProps {
    params: Promise<{ category: string; slug: string }>;
}

export const revalidate = 3600;
export const dynamicParams = true; // ビルド時に生成されなかったパスもSSRで対応

/**
 * ビルド時にすべての記事詳細ページのパスを静的生成
 */
export async function generateStaticParams() {
    const contents = await getDreamContents();
    return contents.map((content) => {
        const primaryCategory = Array.isArray(content.category)
            ? content.category[0]
            : content.category;
        return {
            category: encodeURIComponent(primaryCategory || 'uncategorized'),
            slug: content.slug,
        };
    });
}

export async function generateMetadata({
    params,
}: ContentPageProps): Promise<Metadata> {
    const { category: rawCategory, slug: rawSlug } = await params;
    const category = decodeURIComponent(rawCategory);
    const slug = decodeURIComponent(rawSlug);

    // カテゴリIDかもしれないので解決を試みる
    const displayCategory = await resolveCategoryName(category);

    const content = await getDreamContentBySlug(slug);

    if (!content) return { title: "ページが見つかりません" };

    const mainKeyword = content.title;
    const title = content.metaTitle || uiStrings.dictionary.detail.metaTitle(content.title);
    const description = content.metaDescription || uiStrings.dictionary.detail.metaDescription(content.title, content.keywords);

    const encodedCategoryName = encodeURIComponent(displayCategory);
    const encodedSlug = encodeURIComponent(slug);

    return {
        title,
        description,
        alternates: {
            canonical: `${siteConfig.baseUrl}/contents/${encodedCategoryName}/${encodedSlug}`,
        },
    };
}

/**
 * マークダウンの太字と日本語句読点の競合を修正する前処理
 * 問題: 「」の直後に ** が来ると太字として認識されない
 * 解決: 句読点と ** の間にゼロ幅スペース（\u200B）を挿入
 */
function preprocessMarkdown(text: string): string {
    return text
        .replace(/([」』）\)。、！？])\*\*/g, '$1\u200B**')
        .replace(/\*\*([「『（\(])/g, '**\u200B$1');
}

export default async function ContentPage({ params }: ContentPageProps) {
    const { category: rawCategory, slug: rawSlug } = await params;
    const category = decodeURIComponent(rawCategory);
    const slug = decodeURIComponent(rawSlug);

    // カテゴリIDかもしれないので解決を試みる
    const displayCategory = await resolveCategoryName(category);

    const content = await getDreamContentBySlug(slug);

    if (!content) notFound();

    // 関連キーワードなどの取得 (最初のカテゴリを使って関連を取得)
    const primaryCategory = Array.isArray(content.category) ? content.category[0] : content.category;
    const relatedContents = primaryCategory
        ? (await getDreamContentsByCategory(primaryCategory)).filter(c => c.slug !== slug).slice(0, 6)
        : [];

    // アフィリエイト広告の取得（記事のタグに基づく）
    const tags = content.tags || [];
    const [squareAd, horizontalAd, sidebarAd1, sidebarAd2] = await getAffiliateAds({
        requirements: [
            { type: 'Square' },
            { type: 'Horizontal' },
            { type: 'Square' }, // サイドバー用1つ目
            { type: 'Square' }  // サイドバー用2つ目
        ],
        tags
    });

    const textAds = await getTextAffiliateAds(tags);

    const encodedCategoryName = encodeURIComponent(displayCategory);
    const encodedSlug = encodeURIComponent(slug);

    // 目次用見出しの抽出
    const tocItems: TocItem[] = [];
    const normalizedSymbolism = (content.symbolism || "").replace(/\\n/g, "\n");
    const normalizedArticle = (content.article || "").replace(/\\n/g, "\n");
    const fullArticle = `## ${uiStrings.dictionary.detail.symbolismTitle}\n\n${normalizedSymbolism}\n\n${normalizedArticle}`;

    // Markdownから見出しを抽出する正規表現
    const headingRegex = /^(##|###)\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(fullArticle)) !== null) {
        const level = match[1].length;
        const text = match[2].replace(/\*\*|__/g, "").trim();
        const id = `heading-${text.toLowerCase().replace(/[^\w\u4e00-\u9fa5ぁ-んァ-ンー]/g, "-")}`;
        tocItems.push({ id, text, level });
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ArticleSchema
                title={content.title}
                description={content.metaDescription || content.description || ""}
                url={`${siteConfig.baseUrl}/contents/${encodedCategoryName}/${encodedSlug}`}
                publishedTime={content.createdAt || new Date().toISOString().split('T')[0] + "T00:00:00Z"}
                modifiedTime={content.updatedAt}
                categoryName={displayCategory}
                aboutName={content.title}
            />
            <DefinedTermSchema
                name={content.title}
                description={content.metaDescription || content.description || `${content.title}の夢占いの意味を詳しく解説しています。`}
                url={`${siteConfig.baseUrl}/contents/${encodedCategoryName}/${encodedSlug}`}
                termSetUrl={`${siteConfig.baseUrl}/contents`}
                termSetName={`${siteConfig.name} 夢占い辞典`}
            />
            <BreadcrumbSchema
                items={[
                    { name: uiStrings.common.home, url: siteConfig.baseUrl },
                    { name: uiStrings.dictionary.index.title, url: `${siteConfig.baseUrl}/contents` },
                    { name: displayCategory, url: `${siteConfig.baseUrl}/contents/${encodedCategoryName}` },
                    { name: content.title, url: `${siteConfig.baseUrl}/contents/${encodedCategoryName}/${encodedSlug}` },
                ]}
            />
            <Breadcrumbs
                items={[
                    { name: uiStrings.common.home, path: "/" },
                    { name: uiStrings.dictionary.index.title, path: "/contents" },
                    { name: displayCategory, path: `/contents/${encodedCategoryName}` },
                    { name: content.title, path: `/contents/${encodedCategoryName}/${encodedSlug}` },
                ]}
            />

            {/* ヒーローセクション - 無駄を削ぎ落としたスタイリッシュなデザイン */}
            <section className="relative pt-10 pb-12 md:pt-14 md:pb-16 overflow-hidden bg-[#0a0f1d] text-white">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Link
                            href={`/contents/${encodedCategoryName}`}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold mb-5 text-accent tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
                        >
                            {displayCategory}
                        </Link>
                        <h1 className="text-2xl md:text-5xl lg:text-6xl font-black mb-5 font-serif tracking-tight leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto font-light">
                            {content.description || uiStrings.dictionary.detail.heroDescription(content.title)}
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
                    {/* 左サイドバー：目次（デスクトップ） */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-24">
                            <TableOfContents items={tocItems} />
                        </div>
                    </aside>

                    <div className="flex-1 max-w-4xl">
                        {/* モバイル用目次 */}
                        <div className="lg:hidden mb-12">
                            <TableOfContents items={tocItems} />
                        </div>

                        {/* 象徴セクション */}
                        <div id={`heading-${uiStrings.dictionary.detail.symbolismTitle}`} className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] px-4 py-10 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-12">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm shadow-primary/20">
                                    <Sparkles className="w-6 h-6 drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold font-serif">{uiStrings.dictionary.detail.symbolismTitle}</h2>
                            </div>
                            <div className="markdown-content">
                                <p className="text-lg md:text-xl leading-relaxed mb-8 font-medium text-slate-900 dark:text-white">
                                </p>

                                {/* 象徴（Symbolism）セクションの直後に1枚目のテキスト広告を固定表示 */}
                                {textAds.length > 0 && (
                                    <div className="mt-8">
                                        <AffiliateTextButton ad={textAds[0]} />
                                    </div>
                                )}

                                {content.article && (
                                    <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800">
                                        <MarkdownContent 
                                            content={content.article.replace(/\\n/g, "\n")} 
                                            textAds={textAds}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* シチュエーション別解説 */}
                        {content.situations && content.situations.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold mb-8 font-serif px-4">{uiStrings.dictionary.detail.situationTitle}</h3>
                                <div className="grid gap-6">
                                    {content.situations.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            <div className="flex items-start gap-5">
                                                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    <Moon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* アドバイスセクション */}
                        <div className="bg-gradient-to-br from-slate-900 to-primary text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent">
                                        <Sun className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-serif">{uiStrings.dictionary.detail.adviceTitle}</h2>
                                </div>
                                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                    {uiStrings.dictionary.detail.adviceDescription}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/guide/how-to-remember-dreams"
                                        className="px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2"
                                    >
                                        {uiStrings.dictionary.detail.adviceCta}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* SNSシェア */}
                        <div className="mb-16 flex justify-center">
                            <SocialShare
                                url={`${siteConfig.baseUrl}/contents/${encodedCategoryName}/${encodedSlug}`}
                                title={content.metaTitle || `${content.title}｜夢占いの意味と心理`}
                                description={content.metaDescription}
                            />
                        </div>

                        {/* 関連キーワード */}
                        {relatedContents.length > 0 && (
                            <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
                                <h2 className="text-2xl font-bold mb-8 font-serif flex items-center gap-3">
                                    <MessageCircle className="w-6 h-6 text-primary" />
                                    {uiStrings.dictionary.detail.relatedTitle}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {relatedContents.map((rel) => (
                                        <Link
                                            key={rel.id}
                                            href={`/contents/${encodedCategoryName}/${rel.slug}`}
                                            className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 text-center transition-all shadow-sm hover:shadow-xl"
                                        >
                                            <span className="font-bold text-slate-800 dark:text-slate-200">{rel.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* アフィリエイト広告バナー */}
                        <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800 space-y-8">
                            {horizontalAd && <BannerSlot ad={horizontalAd} />}
                            {squareAd && <BannerSlot ad={squareAd} />}
                        </div>
                    </div>

                    {/* 右サイドバー：バナー（デスクトップ） */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-24 space-y-8">
                            {sidebarAd1 && <BannerSlot ad={sidebarAd1} />}
                            {sidebarAd2 && <BannerSlot ad={sidebarAd2} />}
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
