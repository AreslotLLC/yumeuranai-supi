import Link from "next/link";
import { AffiliateAd } from "@/types";

interface AffiliateTextButtonProps {
    ad: AffiliateAd;
    className?: string;
}

/**
 * テキストアフィリエイト広告をボタン形式で表示するコンポーネント
 * - ピンク背景（bg-primary）と白文字（text-white）の構成
 * - 右下に控えめなサイズで「PR」と表示
 * - 1x1の計測用ピクセル画像を不可視状態で維持
 * - アイコンは使用しない
 */
export function AffiliateTextButton({ ad, className = "" }: AffiliateTextButtonProps) {
    if (!ad) return null;

    // bannerHtmlからリンク先URLと計測用ピクセルを抽出を試みる
    // 実例：<a href="URL" rel="nofollow">テキスト</a><img ... src="TRACKING_URL">
    
    // aタグのhrefを抽出
    const hrefMatch = ad.bannerHtml.match(/href="([^"]+)"/);
    const href = hrefMatch ? hrefMatch[1] : "#";

    // aタグのアンカーテキストを抽出
    const textMatch = ad.bannerHtml.match(/>([^<]+)<\/a>/);
    const label = textMatch ? textMatch[1] : ad.name;

    // imgタグ（計測ピクセル）を抽出
    const imgMatch = ad.bannerHtml.match(/<img[^>]+>/);
    const trackingPixel = imgMatch ? imgMatch[0] : "";

    return (
        <div className={`my-8 flex flex-col items-center ${className}`}>
            <div className="relative w-full max-w-2xl group">
                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 px-8 rounded-2xl text-center shadow-xl shadow-primary/20 transition-all active:scale-[0.98] leading-relaxed text-lg md:text-xl"
                >
                    {label}
                </Link>
                
                {/* PR表記 */}
                <span className="absolute bottom-2 right-4 text-[10px] font-bold text-white/60 pointer-events-none">
                    PR
                </span>

                {/* 計測用ピクセル（不可視状態で維持） */}
                {trackingPixel && (
                    <div 
                        className="absolute w-px h-px opacity-0 pointer-events-none"
                        dangerouslySetInnerHTML={{ __html: trackingPixel }}
                    />
                )}
            </div>
        </div>
    );
}
