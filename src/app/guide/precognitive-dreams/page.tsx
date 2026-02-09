import React from "react";
import { GuideArticle } from "@/components/article/GuideArticle";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GuideFooter } from "@/components/article/GuideFooter";

export const metadata = {
    title: "「予知夢」の余韻：未来からの静かなメッセージ | 夢と占い.jp",
    description: "時を超えて届く、未来からの静かな余韻。デジャヴや予知夢はなぜ起きるのか？特別な意味を持つ夢の特徴と、科学的背景・心理学的な視点を交えて詳しく解説します。",
    alternates: {
        canonical: `${siteConfig.baseUrl}/guide/precognitive-dreams`,
    },
};

export default function Page() {
    return (
        <GuideArticle
            slug="precognitive-dreams"
            title="「予知夢」の余韻"
            fullTitle="時を超えて届く、未来からの静かな余韻。予知夢と正夢が告げる運命の予兆"
            description={metadata.description}
            image="/images/guide/precognitive.png"
            category="月影と予兆の調べ"
            publishedDate="2026-01-30"
        >
            <div className="markdown-content">
                <section className="mb-10">
                    <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium text-center max-w-3xl mx-auto border-l-4 border-primary/20 pl-8 italic">
                        夢と現実が、そっと手をつなぐ瞬間。<br />
                        それは、あなたの潜在意識が未来の可能性を優しく捉えた、静かな予兆のサインかもしれません。
                    </p>
                </section>

                <h2>未来からの余韻を捉える、3つの導るべ</h2>
                <div className="space-y-6 mb-12">
                    {[
                        { t: "異様に鮮明でリアル", d: "匂い、感触、温度まで記憶に残るハイビジョンな質感。起きた後も色が褪せません。" },
                        { t: "ストーリーの客観性", d: "魔法のような展開ではなく、現実の延長線上にある論理的な展開。自分を俯瞰で見ている感覚。" },
                        { t: "記憶が風化しない", d: "数日、数週間経っても細部まで鮮明に思い出せる。記憶が消えないこと自体が予知の証です。" }
                    ].map((item, idx) => (
                        <div key={idx} className="guide-card guide-card-insight guide-card-step">
                            <div className="guide-step-number">
                                0{idx + 1}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-black mb-3 text-slate-900 dark:text-white m-0 border-none p-0">{item.t}</h4>
                                <p className="m-0 text-base">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2 mb-12">
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-primary/10" />
                        <h4 className="decorated-title font-bold mb-2 m-0 p-0 border-none">体温とうつ伏せ寝</h4>
                        <p className="text-sm m-0 text-slate-600 dark:text-slate-400">室温が高すぎたり、うつ伏せで胸部を圧迫して寝たりすると、呼吸が苦しくなり、それが夢の中で「首を絞められる」「水に溺れる」といった悪夢として反映されることがあります。</p>
                    </div>
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-accent/10" />
                        <h4 className="decorated-title decorated-title-accent font-bold mb-2 m-0 p-0 border-none">脳のデトックス不足</h4>
                        <p className="text-sm m-0 text-slate-600 dark:text-slate-400">過度のアルコールや就寝直前の食事は、脳が正常なレム睡眠サイクルに入るのを妨げます。脳が情報を整理しきれない「ノイズ」が悪夢となって現れやすくなります。</p>
                    </div>
                </div>

                <div className="my-12 guide-card guide-card-insight !p-12 md:!p-16 relative overflow-hidden">
                    <div className="bg-deco-blob bg-primary/10" />
                    <h2 className="text-3xl font-black mb-10 border-none p-0 mt-0">予知に関する3つのタイプ</h2>
                    <div className="grid md:grid-cols-3 gap-6 relative z-10">
                        {[
                            { t: "正夢", d: "見た内容がそのまま実現。デジャヴの多くはこれと言われます。" },
                            { t: "象徴夢", d: "比喩的な表現。解読には夢占いの手法が必要です。" },
                            { t: "逆夢", d: "火事など、正反対の幸運が起きるタイプ。不安の解消です。" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 group overflow-hidden relative">
                                <div className="bg-deco-blob bg-primary/5 -top-5 -right-5 w-20 h-20" />
                                <h4 className="decorated-title font-black text-lg mb-4 text-primary m-0 border-none p-0">{item.t}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 m-0 leading-relaxed">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-12">
                    <h2 className="text-3xl font-black mb-10 border-none p-0 leading-tight">知性の奥底、脳が奏でる「高度な予測」という名の魔法</h2>
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] text-white">
                        <p className="text-xl leading-relaxed m-0 text-slate-300 font-medium italic">
                            脳は無意識のうちに膨大な情報を収集しています。睡眠中、そのデータを基に「このままいくとどうなるか」をシミュレーションした結果が予知夢です。それはあなたの<strong>「無意識の洞察力」</strong>が導き出した未来予想図なのです。
                        </p>
                    </div>
                </div>
            </div>
            <GuideFooter
                title={<>夢のヒントを、<br />現実に活かすために</>}
                description="不思議な夢を見たら、キーワードを紐解いてみましょう。あなたの直感力が、より輝きを放ち始めます。"
                buttonText="キーワードを探す"
            />
        </GuideArticle>
    );
}
