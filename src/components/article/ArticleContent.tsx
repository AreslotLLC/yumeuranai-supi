import { MarkdownContent } from "@/components/MarkdownContent";

interface ArticleContentProps {
    content: string;
    className?: string;
    bannerHtml?: string;
}

/**
 * 記事本文コンポーネント
 * - 読了率重視の余白設定
 * - コンテンツ空の場合のフォールバック
 */
export function ArticleContent({ content, className = "", bannerHtml }: ArticleContentProps) {
    // コンテンツが空の場合のフォールバック
    if (!content || content.trim() === "") {
        return (
            <section className={`py-12 md:py-16 ${className}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl lg:max-w-5xl mx-auto">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 text-center">
                            <p className="text-slate-500 dark:text-slate-400">
                                記事の内容を準備中です。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-8 md:py-12 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl lg:max-w-5xl mx-auto">
                    {/* 読みやすさ重視のタイポグラフィ設定（ピラー一体型） */}
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-p:leading-loose prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-headings:tracking-tight prose-headings:font-bold prose-h2:text-2xl prose-h2:text-accent prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800 prose-h3:text-xl prose-h3:text-primary prose-h3:mt-8 prose-h3:mb-4 prose-li:text-slate-600 dark:prose-li:text-slate-300">
                        <MarkdownContent content={content} bannerHtml={bannerHtml} />
                    </div>
                </div>
            </div>
        </section>
    );
}

