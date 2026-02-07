import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ArticleHeroSectionProps {
    title: string;
    description: string;
    categorySlug: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
    regionName?: string;
}

/**
 * 記事ヒーローセクション
 * - パンくずリスト（Semantic nav）
 * - H1タイトル
 * - カテゴリーバッジ、公開日/更新日
 */
export function ArticleHeroSection({
    title,
    description,
    categorySlug,
    categoryName,
    createdAt,
    updatedAt,
    regionName,
}: ArticleHeroSectionProps) {
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString("ja-JP");
    const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString("ja-JP");
    const showUpdatedAt = updatedAt !== createdAt;
    const heroImage = `/images/hero/${categorySlug}.png`;

    return (
        <section className="relative pt-4 pb-6 sm:pt-6 sm:pb-8 md:pt-10 md:pb-12 bg-gradient-to-br from-[#FDFCF0] to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
            {/* 装飾 */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* パンくずリスト */}
                    <nav
                        aria-label="パンくずリスト"
                        className="flex items-center flex-wrap gap-2 text-sm text-slate-500 font-medium mb-4 sm:mb-6"
                    >
                        <Link
                            href="/"
                            className="hover:text-primary transition-colors duration-200"
                        >
                            ホーム
                        </Link>
                        <span aria-hidden="true" className="text-slate-300">/</span>
                        <Link
                            href={`/category/${categorySlug}`}
                            className="hover:text-primary transition-colors duration-200"
                        >
                            {categoryName}
                        </Link>
                        <span aria-hidden="true" className="text-slate-300">/</span>
                        <span className="text-slate-900 dark:text-slate-100 font-bold truncate max-w-[200px] md:max-w-none">
                            {title}
                        </span>
                    </nav>

                    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="space-y-4">
                                {/* カテゴリー・地域バッジ */}
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant="outline"
                                        className="bg-white text-primary border-slate-200 shadow-sm px-3 py-1 font-bold rounded-full tracking-wide text-xs"
                                    >
                                        {categoryName}
                                    </Badge>
                                    {regionName && (
                                        <Badge
                                            variant="outline"
                                            className="bg-white text-accent border-accent/20 shadow-sm px-3 py-1 font-bold rounded-full tracking-wide text-xs"
                                        >
                                            {regionName}
                                        </Badge>
                                    )}
                                </div>

                                {/* H1タイトル */}
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.3] tracking-tight">
                                    {title}
                                </h1>

                                {/* 説明文 */}
                                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-medium line-clamp-2 md:line-clamp-none">
                                    {description}
                                </p>

                                {/* 広告利用についてのリンク */}
                                <Link
                                    href="/ad-disclosure"
                                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    当社の広告利用について
                                </Link>
                            </div>

                            {/* 日付情報 */}
                            <div className="flex items-center flex-wrap gap-4 text-xs text-slate-500 font-medium pt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400">公開日:</span>
                                    <time dateTime={createdAt} className="text-slate-900 dark:text-slate-200">{formattedCreatedAt}</time>
                                </div>
                                {showUpdatedAt && (
                                    <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
                                        <span className="text-slate-400">更新日:</span>
                                        <time dateTime={updatedAt} className="text-slate-900 dark:text-slate-200">{formattedUpdatedAt}</time>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-end">
                            <div className="relative w-full aspect-square max-w-[400px] rounded-3xl overflow-hidden shadow-xl shadow-primary/10 ring-4 ring-white/50 backdrop-blur-sm">
                                <img
                                    src={heroImage}
                                    alt={categoryName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

