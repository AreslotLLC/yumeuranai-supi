import React from "react";
import { SafeImage } from "./SafeImage";

interface HeroProps {
    title: string | React.ReactNode;
    description?: string;
    image?: string;
    category?: string;
    publishedDate?: string;
    centered?: boolean;
}

/**
 * ガイドページ・一覧ページ共通のヒーローセクション
 */
export function Hero({
    title,
    description,
    image = "/images/guide/guide-index.png",
    category,
    publishedDate,
    centered = false,
}: HeroProps) {
    if (image) {
        // 画像あり: オーバーレイ表示
        return (
            <section className="relative w-full min-h-[320px] md:min-h-[500px] flex items-center overflow-hidden">
                {/* 背景画像 */}
                <SafeImage
                    src={image}
                    alt={typeof title === "string" ? title : "Hero Image"}
                    fill
                    priority
                    className="object-cover"
                />
                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/80" />

                <div className="container relative mx-auto px-4 z-10 py-12 md:py-16">
                    <div className={`max-w-4xl ${centered ? "mx-auto text-center" : ""}`}>
                        {category && (
                            <div className="inline-block px-4 py-1.5 bg-primary rounded-full text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 shadow-lg shadow-primary/20">
                                {category}
                            </div>
                        )}
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-[1.2] drop-shadow-sm">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-base sm:text-lg text-slate-100/90 leading-relaxed max-w-2xl drop-shadow">
                                {description}
                            </p>
                        )}
                        {publishedDate && (
                            <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                                <span className="w-6 sm:w-8 h-px bg-slate-500" />
                                <time dateTime={publishedDate}>
                                    {publishedDate.replace(/-/g, ".")} 公開
                                </time>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // 画像なし: シンプルな背景
    return (
        <section className="bg-primary/5 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className={`max-w-4xl mx-auto ${centered ? "text-center" : ""}`}>
                    {category && (
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                            {category}
                        </div>
                    )}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
