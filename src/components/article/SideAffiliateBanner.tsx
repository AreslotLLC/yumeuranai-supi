import Link from "next/link";
import { AffiliateLink } from "@/types";
import { ArrowRight, ShieldCheck, Zap, Clock, Phone, Sparkles } from "lucide-react";

interface SideAffiliateBannerProps {
    links: AffiliateLink[];
    linkUrl?: string;           // CTAボタンのURL（Airtableから）
    squareBannerHtml?: string;  // ほぼ四角のバナーHTML（Aタグ形式）
}

export function SideAffiliateBanner({ links, linkUrl, squareBannerHtml }: SideAffiliateBannerProps) {
    if (!links || links.length === 0) return null;

    const primaryLink = links.find(l => l.isPrimary) || links[0];
    const secondaryLinks = links.filter(l => l.id !== primaryLink.id);

    // linkUrlが指定されていればそれを使用、なければprimaryLinkのURLを使用
    const ctaUrl = linkUrl || primaryLink.url;

    return (
        <div className="sticky top-24 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden relative group">
                {/* 装飾用の背景 */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all group-hover:bg-primary/10" />

                <div className="relative">
                    {/* PR表記（ステマ規制対応） */}
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10">
                        PR
                    </span>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight font-serif italic">
                        プロの占い師に<br />個別に相談
                    </h3>

                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <span className="flex-shrink-0 w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary text-[8px]">✔</span>
                            </span>
                            夢のシンボルを深く解釈
                        </li>
                        <li className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <span className="flex-shrink-0 w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary text-[8px]">✔</span>
                            </span>
                            復縁・転職・運勢の悩みも
                        </li>
                        <li className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <span className="flex-shrink-0 w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary text-[8px]">✔</span>
                            </span>
                            初回無料特典でお試し
                        </li>
                    </ul>

                    <div className="space-y-3">
                        <Link
                            href={ctaUrl}
                            className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white py-3.5 px-3 rounded-2xl font-black text-base transition-all shadow-lg shadow-primary/20 active:scale-95 group/btn whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {primaryLink.label}
                        </Link>

                        <Link
                            href={ctaUrl}
                            className="flex items-center justify-center gap-2 w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 py-2.5 px-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            チャットで無料診断
                        </Link>

                        {secondaryLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.url}
                                className="flex items-center justify-center w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 py-2.5 px-3 rounded-2xl font-bold text-sm transition-all active:scale-95 whitespace-nowrap"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {primaryLink.description && (
                        <p className="text-[10px] text-slate-400 mt-4 text-center">
                            {primaryLink.description}
                        </p>
                    )}
                </div>
            </div>

            {/* ほぼ四角バナー表示エリア（柔軟なサイズ対応） */}
            {squareBannerHtml && (
                <div className="relative affiliate-banner overflow-hidden [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_a]:block shadow-sm">
                    {/* PR表記（ステマ規制対応） */}
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                        PR
                    </span>
                    <div dangerouslySetInnerHTML={{ __html: squareBannerHtml }} />
                </div>
            )}
        </div>
    );
}

