"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AffiliateHtmlBannerProps {
    html?: string;
}

/**
 * Airtableから取得したHTMLバナー（aタグ）を目立つ形で表示するコンポーネント
 * マークダウン記事終了後に配置される
 */
export function AffiliateHtmlBanner({ html }: AffiliateHtmlBannerProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!html || !isMounted) return null;

    // HTMLからhrefを抽出（改善版: より堅牢な正規表現）
    const hrefMatch = html.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/i);
    const href = hrefMatch?.[1];

    // HTMLからテキストを抽出（aタグ内のテキスト）
    const textMatch = html.match(/<a[^>]*>([^<]+)<\/a>/i);
    const text = textMatch?.[1]?.trim() || "詳細はこちら";

    // HTML内に画像が含まれているかチェック
    const hasImage = html.includes("<img");

    // hrefが抽出できなかった場合、または画像が含まれている場合は元のHTMLをそのまま表示（デザイン崩れ防止）
    if (!href || hasImage) {
        return (
            <div className="my-6 md:my-8 text-center">
                <div className="relative inline-block overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                        PR
                    </span>
                    <div
                        className="promo-inner [&_a]:text-primary [&_a]:font-bold [&_a]:underline [&_a]:hover:opacity-80 p-4"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="my-6 md:my-8">
            {/* バナー本体 - 全体がクリック可能 */}
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
            >
                <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-accent p-6 sm:p-8 shadow-xl shadow-primary/20 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/30 rounded-3xl border border-slate-100 dark:border-slate-800/30">
                    {/* PR表記（ステマ規制対応） */}
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-white/50 bg-white/10 rounded z-20 pointer-events-none">
                        PR
                    </span>

                    {/* 装飾的な背景パターン */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
                    </div>

                    {/* コンテンツ */}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight font-serif italic">
                                {text}
                            </p>
                            <p className="text-sm text-white/80 mt-2 hidden sm:block">
                                あなたの夢に隠された真実を、今すぐ解き明かしましょう。
                            </p>
                        </div>
                        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center transition-transform">
                            <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
