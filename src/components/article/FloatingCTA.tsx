"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Phone } from "lucide-react";
import { AffiliateLink } from "@/types";

interface FloatingCTAProps {
    link?: AffiliateLink;
    showAfterScroll?: number;
}

/**
 * モバイル固定フローティングCTA
 * 画面下部に固定表示、スクロールで表示/非表示
 */
export function FloatingCTA({
    link,
    showAfterScroll = 500,
}: FloatingCTAProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > showAfterScroll) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showAfterScroll]);

    if (!link || isDismissed || !isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white/90 via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950 md:hidden backdrop-blur-sm">
            <div className="relative bg-[#f4f7f5] dark:bg-slate-900 rounded-[2rem] p-5 shadow-2xl border border-slate-200/60">
                {/* PR表記（ステマ規制対応） */}
                <span className="absolute bottom-2 right-4 px-1.5 py-0.5 text-[8px] font-bold text-slate-400 bg-white/80 rounded border border-slate-100">
                    PR
                </span>
                {/* 閉じるボタン */}
                <button
                    onClick={() => setIsDismissed(true)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center shadow-lg active:scale-95"
                    aria-label="閉じる"
                >
                    <X className="w-4 h-4 text-white" />
                </button>

                <p className="text-[#3a5a40] text-[11px] font-bold tracking-tight text-center mb-3 flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#e65c00] rounded-full" />
                    あなたの夢を本格的に診断
                </p>

                {/* CTAボタン */}
                <div className="flex flex-col gap-2.5">
                    <Link
                        href={link.url}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#e65c00] text-white font-black rounded-xl hover:bg-[#ff6a00] transition-all shadow-lg shadow-orange-500/20 active:scale-95 text-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.label}
                    </Link>
                    <Link
                        href={link.url}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl active:bg-slate-50 transition-all"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Phone className="w-4 h-4 text-[#3a5a40]" />
                        今すぐ電話で相談
                    </Link>
                </div>

                {/* 補足情報 */}
                {link.description && (
                    <p className="text-white/80 text-xs text-center mt-2">
                        {link.description}
                    </p>
                )}
            </div>
        </div>
    );
}
