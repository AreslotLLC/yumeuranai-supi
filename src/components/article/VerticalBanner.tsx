/**
 * 縦長バナーコンポーネント
 * 左サイドバー用の縦長広告バナーを表示
 * 柔軟なサイズ対応で、どのような縦横比の広告でも表示可能
 */

interface VerticalBannerProps {
    bannerHtml?: string;
    className?: string;
}

export function VerticalBanner({ bannerHtml, className = "" }: VerticalBannerProps) {
    if (!bannerHtml) return null;

    return (
        <div className={`sticky top-24 ${className}`}>
            <div className="relative affiliate-banner overflow-hidden [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_a]:block shadow-sm hover:shadow-md transition-shadow">
                {/* PR表記（ステマ規制対応） */}
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                    PR
                </span>
                <div dangerouslySetInnerHTML={{ __html: bannerHtml }} />
            </div>
        </div>
    );
}
