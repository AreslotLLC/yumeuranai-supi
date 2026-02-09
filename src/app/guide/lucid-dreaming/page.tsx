import { GuideArticle } from "@/components/article/GuideArticle";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GuideFooter } from "@/components/article/GuideFooter";

export const metadata = {
    title: `「明晰夢」の旅：夢の国を自由に泳いで | 夢と占い.jp`,
    description: "夢の国を、思うままに自由に泳いで。意識を研ぎ澄まし、夢の主役になるための具体的なテクニックやトレーニング方法を徹底解説します。",
};

export default function LucidDreamingPage() {
    return (
        <GuideArticle
            slug="lucid-dreaming"
            title="「明晰夢」の旅"
            fullTitle="夢の国を、思うままに自由に泳いで。意識を研ぎ澄まし、夢の主役になる秘策"
            description="夢の中で「これは夢だ」と気づいたことはありますか？明晰夢は、単なる不思議な体験ではなく、あなたの創造性や心を自由に解き放つ鍵となります。"
            image="/images/guide/lucid.png"
            category="夢の扉を開く鍵"
            publishedDate="2026-01-30"
        >
            <div className="markdown-content">
                <section>
                    <blockquote className="text-center max-w-3xl mx-auto border-l-4 border-amber-400 py-4 px-8 bg-amber-400/5 rounded-r-3xl italic">
                        「夢」は、誰もが毎晩迷い込む、不思議な不思議な異世界。でも、そこを「自分の意志で探索」できるとしたら……。明晰夢（ルシッド・ドリーミング）は、あなたの意識が夢の国と響き合う、特別なスキルなのです。
                    </blockquote>
                </section>

                <section className="mt-16">
                    <h2 className="text-3xl font-black mb-10 border-none p-0 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-500 text-lg font-serif">01</span>
                        夢の仕組み：意識の光が灯る、神秘の科学
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="leading-relaxed">
                            <p className="mb-6">
                                明晰夢はかつてオカルト的な現象と思われていましたが、現在では睡眠医学の分野で確立された現象です。最大の特徴は、身体は「レム睡眠（身体が眠り、脳が動いている状態）」にありながら、意識の座である<strong>「前頭前野」が部分的に覚醒している</strong>ことにあります。
                            </p>
                            <p className="text-sm text-slate-500">
                                通常、レム睡眠中は前頭前野の機能が低下し、夢の不条理を批判的に捉えることができません。しかし明晰夢中はこの領域が活動し、「メタ認知（思考についての思考）」が働くようになります。
                            </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/20 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                            <h4 className="font-bold mb-4 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                                <ArrowRight className="w-4 h-4 flex-shrink-0" />
                                <span className="whitespace-nowrap">「覚醒」と「睡眠」のハイブリッド</span>
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
                                研究によれば、明晰夢中の脳波は通常の睡眠よりも「覚醒時」に近いパターンを示します。これにより、夢の中で論理的な思考ができ、「これは夢だ」という確信を持てるようになるのです。
                            </p>
                        </div>
                    </div>
                </section>

                <h2 className="text-3xl font-black mt-16 mb-10 border-none p-0 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-500 text-lg font-serif">02</span>
                    目覚めのトリガー、現実を問い直す魔法の儀式
                </h2>
                <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] mb-12 text-white shadow-2xl ring-1 ring-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                    <p className="text-lg text-slate-300 mb-12 leading-relaxed max-w-2xl">
                        「リアリティ・チェック（RC）」とは、夢の中で脳を覚醒させるための習慣です。日中から「今、これは夢ではないか？」と問い直す癖が、夢の中での気づきを生みます。
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { t: "手の透過を確認", d: "自分の掌を見つめ、指の数が正しく、透けていないか、あるいは壁を突き抜けないか試します。" },
                            { t: "文字の再読", d: "読んだ文字や時計から一度目を逸らし、もう一度見た時に内容が変わっていないか確認します。夢の中では文字が歪みます。" },
                            { t: "呼吸の矛盾", d: "鼻をつまんだ状態で息を吸ってみます。もし空気が通れば、それは夢の中にいる決定的証拠です。" },
                            { t: "重力の違和感", d: "軽くジャンプし、滞空時間が不自然に長くないか身体感覚に集中します。ふわりと浮けば成功です。" }
                        ].map((rc, i) => (
                            <div key={i} className="bg-white/10 p-8 rounded-[2.5rem] border border-white/20 hover:border-amber-400/50 transition-all group shadow-lg">
                                <h4 className="font-bold text-xl mb-3 text-amber-300 flex items-center gap-3 border-none p-0 m-0 leading-tight">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform text-amber-400" /> {rc.t}
                                </h4>
                                <p className="text-base text-slate-200 leading-relaxed m-0 opacity-80">{rc.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <section className="mt-16">
                    <h2 className="text-3xl font-black mb-10 border-none p-0 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-500 text-lg font-serif">03</span>
                        夢の世界へ入り込む、記憶のしおり
                    </h2>
                    <p className="mb-10 text-lg">
                        記憶力を利用して明晰夢を誘発する「MILD法（Mnemonic Induction of Lucid Dreams）」は、初心者でも成功率が高い手法です。
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", t: "夢の記憶を呼び起こす", d: "夜中に目覚めた際、直前の夢を鮮明に思い出します。" },
                            { step: "02", t: "「気づく自分」を強く暗示", d: "「夢を見ている時、私はこれが夢だと気づく」と確信を持って繰り返します。" },
                            { step: "03", t: "視覚化しながら再入眠", d: "夢の中で明晰化するシーンをイメージしつつ、再び眠りにつきます。" }
                        ].map((item, idx) => (
                            <div key={idx} className="guide-card p-10 border-t-4 border-t-amber-400/30 bg-white dark:bg-slate-800/50 shadow-md">
                                <div className="text-5xl font-black text-amber-400/20 italic leading-none mb-6">{item.step}</div>
                                <h4 className="text-xl font-bold mb-4 m-0 border-none p-0 text-slate-900 dark:text-white">{item.t}</h4>
                                <p className="text-base text-slate-600 dark:text-slate-400 m-0 leading-relaxed">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-3xl font-black mb-10 border-none p-0 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-500 text-lg font-serif">04</span>
                        覚醒のまま深淵へ、静かなる旅路
                    </h2>
                    <p className="mb-8 font-medium text-slate-700 dark:text-slate-300">
                        「WILD法（Wake-Initiated Lucid Dream）」は、意識を保ったまま直接夢へと移行する究極のテクニックです。
                    </p>
                    <div className="bg-indigo-950 text-white p-8 md:p-12 rounded-[3rem] relative overflow-hidden ring-1 ring-white/20 shadow-2xl">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -mb-32 -mr-32 blur-3xl" />
                        <div className="space-y-8 relative z-10">
                            <p className="text-lg leading-relaxed">
                                身体が眠りに落ちる際の「金縛り（睡眠麻痺）」を、恐怖ではなく<strong>夢への入り口</strong>として利用します。意識を一点（暗闇や小さな光、あるいは静かな音）に集中し続け、身体感覚が消えていくのと同時に、夢の景色が構築されるのを静かに待ちます。
                            </p>
                            <div className="flex gap-4 p-6 bg-white/10 rounded-2xl border border-white/20 italic text-sm text-slate-300 shadow-inner">
                                ※ 非常に強力な方法ですが、恐怖心を感じやすい方は、まずはMILD法から始めることをお勧めします。
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-10 grid md:grid-cols-2 gap-8">
                    <div className="guide-card !p-8 md:!p-10 border-amber-400/30 bg-amber-400/[0.05] dark:bg-amber-400/[0.02] relative shadow-lg text-left">
                        <h3 className="text-2xl font-black mb-6 border-none p-0 mt-0 flex items-center gap-2 justify-start">
                            <ArrowRight className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <span className="whitespace-nowrap">夢を安定させるコツ</span>
                        </h3>
                        <p className="mb-0 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            明晰夢に入ってもすぐに目が覚めてしまう場合、<strong>「感覚のハッキング」</strong>が有効です。夢の中の物体に触れ質感を感じたり、両手を激しくこすり合わせることで、意識を夢の中に固定できます。
                        </p>
                    </div>
                    <div className="guide-card !p-8 md:!p-10 border-emerald-400/30 bg-emerald-400/[0.05] dark:bg-emerald-400/[0.02] shadow-lg text-left">
                        <h3 className="text-2xl font-black mb-6 border-none p-0 mt-0 flex items-center gap-2 justify-start">
                            <ArrowRight className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span className="whitespace-nowrap">創造性への応用</span>
                        </h3>
                        <p className="mb-0 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            物理法則のない夢の世界は最高のシミュレーターです。スポーツのイメトレ、苦手な対話の練習、あるいは「空を飛ぶ」といった純粋な探究心など、その活用法は無限大です。
                        </p>
                    </div>
                </div>

                <section className="mb-12 bg-slate-100 dark:bg-slate-900/60 p-8 md:p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-inner">
                    <h2 className="text-3xl font-black mb-12 border-none p-0 mt-0">よくある質問 (FAQ)</h2>
                    <div className="space-y-12">
                        {[
                            { q: "誰でも体験できるようになりますか？", a: "はい。個人差はありますが、RC法を習慣化することで、数週間から数ヶ月で初めての明晰夢を体験する方が多いです。" },
                            { q: "明晰夢から覚められなくなることはありますか？", a: "医学的にそのような事例はありません。睡眠サイクル（レム睡眠）は一定時間で終わるため、必ず自然に目が覚めます。むしろ最初は「起きたくないのに起きてしまう」ことの方が多いでしょう。" },
                            { q: "現実と夢の区別がつかなくなりますか？", a: "RC法を正しく行えば、むしろ「今が現実である確信」が高まります。ただし、睡眠の質が落ちたと感じたら、一旦練習を休んでください。" }
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-8 last:border-0 last:pb-0">
                                <h4 className="text-lg font-black mb-4 flex gap-4 text-slate-900 dark:text-white items-start">
                                    <span className="text-amber-500 italic flex-shrink-0">Q.</span> 
                                    <span>{faq.q}</span>
                                </h4>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed pl-8 m-0">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="guide-card guide-card-warning !p-12 md:!p-16 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-400/5 rounded-full -mr-12 -mt-12 blur-2xl" />
                    <h2 className="text-3xl font-black mb-6 border-none p-0 m-0 leading-tight">執着を捨て、流れに身を任せる</h2>
                    <p className="text-xl leading-relaxed m-0 font-medium italic">
                        明晰夢は人生を豊かにする「スパイス」です。こだわりすぎると脳が本来の休息を行えなくなります。練習を義務だと思わず、無意識が紡ぐ自然な夢による癒やしも大切にしてください。
                    </p>
                </section>
            </div>
            <GuideFooter 
                title={<>夢の解像度を上げ、<br />内なる世界を自由に泳ぐ</>}
                description="明晰夢への近道は、自分がどんな夢を見やすいかを知ることから。印象に残ったシンボルの意味を、まずは調べてみましょう。"
                buttonText="夢辞典で調べる"
            />
        </GuideArticle>
    );
}
