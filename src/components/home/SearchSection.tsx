"use client";

import { SearchBar } from "./SearchBar";
import { Sparkles } from "lucide-react";

export interface SearchKeyword {
    title: string;
    slug: string;
    category: string;
}

interface SearchSectionProps {
    keywords?: SearchKeyword[];
}

export function SearchSection({ keywords }: SearchSectionProps) {
    const displayKeywords = keywords || [
        { title: "蛇", slug: "snake", category: "動物" },
        { title: "猫", slug: "cat", category: "動物" },
        { title: "元彼", slug: "ex-boyfriend", category: "人物" },
        { title: "逃げる", slug: "chased", category: "シチュエーション" },
        { title: "空を飛ぶ", slug: "flying", category: "シチュエーション" },
        { title: "忘れ物", slug: "forgotten", category: "シチュエーション" },
        { title: "宝くじ", slug: "lottery", category: "金運" }
    ];

    return (
        <section className="relative py-24 overflow-hidden bg-muted/20">
            {/* 動的な背景グラデーション（Mystic Aurora） */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-primary/5 to-transparent blur-3xl" />
            </div>

            {/* パーティクル（塵のような光） */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-primary/40 rounded-full blur-[1px]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
                }
            `}</style>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Quick Search</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 font-serif leading-tight">
                            夢のキーワードで<br className="sm:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                運命を読み解く
                            </span>
                        </h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                            昨夜見た象徴的な光景や言葉を教えてください。
                            5,000以上の辞書から、あなたの深層心理を探ります。
                        </p>
                    </div>

                    {/* ガラスモーフィズムの検索バーコンテナ */}
                    <div className="relative group max-w-3xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-card/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 p-4 sm:p-6 md:p-8 rounded-[3rem] shadow-2xl overflow-hidden">
                            <SearchBar
                                className="!max-w-none"
                                placeholder="例：白い蛇、空を飛ぶ、遅刻する..."
                            />
                        </div>
                    </div>

                    {/* クイックキーワード例 */}
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest w-full text-center mb-2">Popular Keywords</span>
                        {displayKeywords.map((keyword) => (
                            <a
                                key={keyword.slug}
                                href={`/contents/${encodeURIComponent(keyword.category)}/${keyword.slug}`}
                                className="px-4 py-2 bg-card/50 backdrop-blur-md border border-border/30 rounded-full text-sm font-medium text-foreground/80 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                            >
                                #{keyword.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

