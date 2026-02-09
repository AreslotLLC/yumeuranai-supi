import React from "react";
import { GuideArticle } from "@/components/article/GuideArticle";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { GuideFooter } from "@/components/article/GuideFooter";

export const metadata = {
    title: "「夢を覚える」魔法：記憶の星屑を紡いで | 夢と占い.jp",
    description: "起きた瞬間に忘れてしまう夢を記憶に留めるための「夢日記」の正しい方法や、枕元での準備、心理的な注意点（夢酔い）について詳しく解説します。",
    alternates: {
        canonical: `${siteConfig.baseUrl}/guide/how-to-remember-dreams`,
    },
};

export default function Page() {
    return (
        <GuideArticle
            slug="how-to-remember-dreams"
            title="「夢を覚える」魔法"
            fullTitle="消えゆく記憶の星屑を紡いで。夢の物語を明日のあなたへ繋ぐ方法"
            description={metadata.description}
            image="/images/guide/remember.png"
            category="夢の扉を開く鍵"
            publishedDate="2026-01-30"
        >
            <div className="markdown-content">
                <section className="mb-10">
                    <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                        「すごく面白い夢を見た気がするのに、起きた瞬間に消えてしまった…」<br />
                        そんな経験はありませんか？
                    </p>
                    <div className="mt-12 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                        <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white mt-0 border-none p-0 leading-tight">夢が夜空へ還ってしまう理由</h3>
                        <p className="leading-relaxed m-0 text-slate-600 dark:text-slate-400">
                            脳は目覚めと同時に「現実」へとスイッチを切り替えます。夢は重要度の低い短期記憶としてすぐに消去される仕組みになっています。そのため、<strong>「この夢は大切だ」と脳に認識させること</strong>が、記憶に留めるための不可欠な第一歩です。
                        </p>
                    </div>
                </section>

                <h2>目覚めのしじま、記憶を止める魔法</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-primary/10" />
                        <h4 className="decorated-title text-2xl font-black mb-4 border-none p-0 m-0 leading-tight">体勢を変えない</h4>
                        <p className="leading-relaxed m-0 text-base text-slate-600 dark:text-slate-400">
                            体勢を変えると脳の血流が変化し、夢の記憶（レム睡眠時の記憶）が上書きされてしまいます。姿勢を変えず, 目も開けずに数秒間ぼーっとします。
                        </p>
                    </div>
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-accent/10" />
                        <h4 className="decorated-title decorated-title-accent text-2xl font-black mb-4 border-none p-0 m-0 leading-tight">時間を巻き戻す</h4>
                        <p className="leading-relaxed m-0 text-base text-slate-600 dark:text-slate-400">
                            最後に見たシーンから時間を逆回しにする感覚で連想を広げます。逆再生することが短期記憶を定着させるもっとも効果的な方法です。
                        </p>
                    </div>
                </div>

                <div className="my-12 guide-card guide-card-insight !p-12 md:!p-16">
                    <h2 className="text-3xl font-black mb-12 border-none p-0 mt-0">夢日記の正しい書き方</h2>
                    <div className="space-y-12">
                        {[
                            { t: "感情を優先して記録", d: "怖かった、楽しかったといった感覚は、深層心理を探る上で最も重要なデータです。キーワードを繋ぐ鍵になります。" },
                            { t: "箇条書きで断片を残す", d: "文章にする必要はありません。「白い犬」「駅」など、脳に浮かぶ断片をそのまま書き留めます。" },
                            { t: "日付と時間を記録", d: "生活リズムや悩みとリンクしていないか後で検証するための重要なデータになります。" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-lg">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="text-xl font-black mb-3 m-0 border-none p-0 leading-tight text-slate-900 dark:text-white">{item.t}</h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-base">
                                        {item.d}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <section className="guide-card guide-card-warning !p-12 md:!p-16 mb-12">
                    <h2 className="text-3xl font-black mb-6 border-none p-0 m-0 leading-tight">「夢酔い」にご用心</h2>
                    <p className="text-xl leading-relaxed m-0 font-medium italic">
                        夢日記を熱心に続けすぎると、現実と夢の区別がつきにくくなる「夢酔い」という感覚に陥ることがあります。体調が優れない時は休み、起きたらすぐに太陽の光を浴びたり、冷たい水で顔を洗うなどして現実にスイッチを入れることが大切です。
                    </p>
                </section>

                <h2>よくある質問（FAQ）</h2>
                <div className="space-y-6 mb-12">
                    <details className="guide-card group outline-none cursor-pointer">
                        <summary className="font-bold list-none flex items-center justify-between">
                            夢日記は毎日書かないといけませんか？
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            いいえ、義務にするとストレスになり逆効果です。印象に残った時や、時間に余裕がある時だけで十分です。週に数回書くだけでも、脳の「夢を覚える回路」は確実に強化されます。
                        </p>
                    </details>
                    <details className="guide-card group outline-none cursor-pointer">
                        <summary className="font-bold list-none flex items-center justify-between">
                            夢の内容がひどすぎて、書くのが辛いです。
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            無理に書く必要はありません。もし書くなら、その時の嫌な感情（「怖かった」など）だけをメモし、すぐに紙を破って捨てる「デトックス」として活用してください。
                        </p>
                    </details>
                </div>
            </div>
            <GuideFooter
                title={<>夢はあなたへの「ラブレター」</>}
                description="キーワードに隠された本当の意味を、日本最大級の夢辞典で詳しく調べてみませんか？"
                buttonText="夢辞典を開く"
            />
        </GuideArticle>
    );
}
