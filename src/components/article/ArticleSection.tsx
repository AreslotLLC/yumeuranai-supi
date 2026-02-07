import { ReactNode } from "react";

interface ArticleSectionProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

/**
 * 拡張用セクションラッパー
 * 将来のFAQ、比較表、関連記事などを配置するための汎用コンポーネント
 */
export function ArticleSection({
    children,
    title,
    className = "",
}: ArticleSectionProps) {
    return (
        <section className={`py-8 md:py-12 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl lg:max-w-5xl mx-auto">
                    {title && (
                        <h2 className="text-2xl font-bold text-accent mb-6">
                            {title}
                        </h2>
                    )}
                    {children}
                </div>
            </div>
        </section>
    );
}
