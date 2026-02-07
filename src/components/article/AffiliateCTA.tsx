import Link from "next/link";
import { AffiliateLink } from "@/types";
import { Zap, Sparkles, Heart, ArrowRight, MessageSquare } from "lucide-react";

interface AffiliateCTAProps {
    links?: AffiliateLink[];
    variant?: "intro" | "mid" | "outro";
    ctaUrl?: string;              // CTAボタンのURL（Airtableから上書き用）
    horizontalBannerHtml?: string; // 横長バナーHTML（Aタグ形式）
}

// マイクロコピーの設定
const microCopyConfig = {
    intro: {
        badge: "公式・安心の鑑定サービス",
        heading: "夢の本当の意味を、プロの占い師に聞いてみませんか？",
        description: "何千もの夢を見てきた熟練の鑑定士が、あなたの夢に隠された真実を紐解きます。今の運勢や気を付けるべきことも詳しくアドバイス。",
        bullets: [],
    },
    mid: {
        badge: "最短60秒で予約完了",
        heading: "今の悩みや不安、夢のメッセージを直接相談",
        description: "",
        bullets: [
            { icon: Sparkles, text: "厳選された実力派の占い師が多数在籍" },
            { icon: MessageSquare, text: "チャットや通話で24時間いつでも相談可能" },
            { icon: Heart, text: "誰にも言えない悩みも親身に受け止めます" },
        ],
    },
    outro: {
        badge: "初回特典・無料鑑定あり",
        heading: "あなたの運命を変える「夢の一言」を今すぐ",
        description: "",
        bullets: [
            { icon: Zap, text: "驚くほど当たる！口コミで話題の鑑定士" },
            { icon: Sparkles, text: "恋愛、仕事、人間関係。あらゆる夢に対応" },
            { icon: Heart, text: "あなたの未来を明るく照らす具体的な助言" },
        ],
    },
};

/**
 * 収益化CTAコンポーネント
 */
export function AffiliateCTA({ links, variant = "mid", ctaUrl, horizontalBannerHtml }: AffiliateCTAProps) {
    if (!links || links.length === 0) {
        return null;
    }

    const config = microCopyConfig[variant];
    const isIntro = variant === "intro";
    const isMid = variant === "mid";
    const isOutro = variant === "outro";
    const primaryLink = links.find((link) => link.isPrimary) || links[0];

    // ctaUrlが指定されていればそれを使用、なければprimaryLinkのURLを使用
    const actualUrl = ctaUrl || primaryLink.url;

    // 自然な導入CTA (intro) 用の特別デザイン
    if (isIntro) {
        return (
            <div className="my-8 sm:my-12 px-0 md:px-0">
                <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 group shadow-xl transition-all hover:shadow-2xl">
                    {/* PR表記（ステマ規制対応） */}
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/50 rounded-full z-10">
                        PR
                    </span>
                    <div className="flex items-start gap-4 md:gap-8 w-full">
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 bg-primary text-white rounded-full">
                                    {config.badge}
                                </span>
                            </div>
                            <h4 className="text-xl md:text-2xl xl:text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight font-serif italic">
                                {config.heading}
                            </h4>
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mb-6 md:mb-0">
                                {config.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-auto shrink-0 flex flex-col gap-4">
                        <Link
                            href={actualUrl}
                            className="flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-primary/20 hover:shadow-2xl active:scale-95 whitespace-nowrap text-xl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Sparkles className="w-6 h-6" />
                            {primaryLink.label}
                        </Link>
                        <Link
                            href={actualUrl}
                            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageSquare className="w-5 h-5 text-primary" />
                            チャットで相談する
                        </Link>
                    </div>
                </div>
                {/* 横長バナー表示エリア */}
                {horizontalBannerHtml && (
                    <div className="mt-6 flex flex-col items-center">
                        <div className="relative w-full max-w-[468px] mx-auto overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                            <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                                PR
                            </span>
                            <div
                                className="affiliate-banner flex justify-center [&_img]:max-w-full [&_img]:h-auto [&_a]:block [&_a]:w-full"
                                dangerouslySetInnerHTML={{ __html: horizontalBannerHtml }}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // 標準のCTAデザイン (mid / outro)
    return (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isMid ? "my-12" : "my-16"}`}>
            <div className="max-w-4xl lg:max-w-5xl mx-auto relative">
                {/* PR表記（ステマ規制対応） */}
                <span className="absolute bottom-3 right-6 px-2 py-0.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/50 rounded-full z-20">
                    PR
                </span>
                <div
                    className={`rounded-[3rem] p-8 md:p-14 border-2 transition-all duration-500 ${isOutro
                        ? "bg-white dark:bg-slate-900 border-primary/20 shadow-2xl shadow-primary/5"
                        : "bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 shadow-xl"
                        }`}
                >
                    {/* ヘッダー */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
                        <div className="flex-1">
                            <span
                                className={`inline-block px-4 py-1.5 text-[11px] font-black rounded-full mb-5 shadow-sm uppercase tracking-widest ${isOutro
                                    ? "bg-accent text-white"
                                    : "bg-primary/10 text-primary"
                                    }`}
                            >
                                {config.badge}
                            </span>
                            <h3
                                className={`text-3xl sm:text-4xl font-black leading-tight tracking-tight font-serif italic ${isOutro ? "text-slate-900" : "text-slate-900 dark:text-white"
                                    }`}
                            >
                                {config.heading}
                            </h3>
                        </div>

                        {/* 特典・メリット */}
                        {config.bullets.length > 0 && (
                            <ul className="grid grid-cols-1 gap-4 shrink-0 md:min-w-[280px]">
                                {config.bullets.map((bullet, index) => {
                                    const Icon = bullet.icon;
                                    return (
                                        <li
                                            key={index}
                                            className={`flex items-center gap-3.5 text-base font-bold ${isOutro
                                                ? "text-slate-700"
                                                : "text-slate-700 dark:text-slate-200"
                                                }`}
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                                                <Icon className="text-primary w-4 h-4" />
                                            </div>
                                            {bullet.text}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* アクションエリア */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href={actualUrl}
                            className={`group flex items-center justify-center gap-3 w-full sm:w-auto py-5 px-12 rounded-[1.5rem] font-black text-2xl transition-all duration-300 shadow-xl ${isOutro ? "bg-accent hover:bg-accent/90 shadow-accent/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"} text-white whitespace-nowrap active:scale-95`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Sparkles className="w-7 h-7" />
                            {primaryLink.label}
                        </Link>

                        <Link
                            href={actualUrl}
                            className={`flex items-center justify-center gap-3 w-full sm:w-auto py-5 px-10 rounded-[1.5rem] font-bold text-xl transition-all duration-300 border-2 whitespace-nowrap active:scale-95 ${isOutro
                                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                                }`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageSquare className="w-6 h-6 text-primary" />
                            今すぐ相談してみる
                        </Link>
                    </div>

                    <p
                        className={`text-sm mt-10 text-center font-bold tracking-widest uppercase ${isOutro ? "text-slate-400" : "text-slate-400 dark:text-slate-500"
                            }`}
                    >
                        初回限定特典・無料鑑定キャンペーン実施中
                    </p>
                </div>

                {/* outroバリアントの場合、横長バナーをCTAの下に表示 */}
                {(isOutro || isMid) && horizontalBannerHtml && (
                    <div className="mt-8 flex flex-col items-center">
                        <div className="relative w-full max-w-[468px] mx-auto overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 shadow-lg">
                            {/* PR表記（ステマ規制対応） */}
                            <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                                PR
                            </span>
                            <div
                                className="affiliate-banner flex justify-center [&_img]:max-w-full [&_img]:h-auto [&_a]:block [&_a]:w-full"
                                dangerouslySetInnerHTML={{ __html: horizontalBannerHtml }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

