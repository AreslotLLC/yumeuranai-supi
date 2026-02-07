"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ScrollTriggeredModalProps {
    bannerHtml?: string;
    triggerPercent?: number; // デフォルト50%
}

/**
 * スクロールトリガーモーダルバナー
 * 記事の指定%スクロール時にモーダルでバナーを表示
 */
export function ScrollTriggeredModal({
    bannerHtml,
    triggerPercent = 50,
}: ScrollTriggeredModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // sessionStorageで1セッション1回のみ表示を制御
        const storageKey = "scrollModalShown";
        const alreadyShown = sessionStorage.getItem(storageKey);

        if (alreadyShown) {
            setHasShown(true);
            return;
        }

        const handleScroll = () => {
            if (hasShown) return;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            if (scrollPercent >= triggerPercent) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem(storageKey, "true");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [triggerPercent, hasShown]);

    const handleClose = () => {
        setIsVisible(false);
    };

    // バナーがない場合は何も表示しない
    if (!bannerHtml || !isVisible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={handleClose}
        >
            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* モーダル本体 */}
            <div
                className="relative bg-[#f4f7f5] dark:bg-slate-900 shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-300 rounded-[2rem] border border-slate-200/60 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* PR表記 */}
                <span className="absolute bottom-2 right-4 px-1.5 py-0.5 text-[8px] font-bold text-slate-400 bg-white/80 rounded border border-slate-100 z-10">
                    PR
                </span>

                {/* 閉じるボタン */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 w-8 h-8 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all z-20"
                    aria-label="閉じる"
                >
                    <X className="w-4 h-4 text-white" />
                </button>

                {/* バナーコンテンツ */}
                <div className="p-6 pt-12">
                    <div
                        className="affiliate-banner [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_a]:block rounded-xl overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: bannerHtml }}
                    />
                </div>
            </div>
        </div>
    );
}
