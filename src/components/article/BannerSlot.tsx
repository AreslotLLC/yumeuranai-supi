"use client";

import { useEffect, useState } from "react";
import { AffiliateAd } from "@/types";
import { AffiliateHtmlBanner } from "./AffiliateHtmlBanner";

interface BannerSlotProps {
    ad: AffiliateAd | null;
    className?: string;
}

export function BannerSlot({ ad, className = "" }: BannerSlotProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!ad || !isMounted) return null;

    // 縦長バナー（サイドバー用）
    if (ad.bannerType === "Vertical") {
        return (
            <div className={`relative ${className}`}>
                <div className="relative overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                        PR
                    </span>
                    <div 
                        className="flex justify-center p-2 [&_img]:max-w-full [&_img]:h-auto"
                        dangerouslySetInnerHTML={{ __html: ad.bannerHtml }} 
                    />
                </div>
            </div>
        );
    }

    // 横長・正方形バナー
    // AffiliateHtmlBannerは多機能（テキスト解析など）なので、それを活用する
    // ただし、もし純粋な画像バナー（横長など）の場合は AffiliateHtmlBanner の fallback ロジックが働く
    return (
        <div className={className}>
            <AffiliateHtmlBanner html={ad.bannerHtml} />
        </div>
    );
}
