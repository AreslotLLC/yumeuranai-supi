import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GuideFooter } from "@/components/article/GuideFooter";
import { siteConfig } from "@/lib/siteConfig";
import { GuideArticle } from "@/components/article/GuideArticle";
import { FAQSchema } from "@/components/seo";

export const metadata: Metadata = {
    title: `「夢の色」が語る心理：夢を彩る七色の魔法 | 夢と占い.jp`,
    description: "夢の景色を鮮やかに彩る、七色の魔法。赤、青、金、白など、夢の中の印象的な「色」が伝えるあなたの深層心理と運気のメッセージを詳しく解説します。",
    alternates: {
        canonical: `${siteConfig.baseUrl}/guide/color-psychology`,
    },
    // @ts-ignore
    lastModified: new Date().toISOString(),
};

export default function ColorPsychologyPage() {
    const faqs = [
        {
            question: "夢の色が途中で変わった場合はどうすればいいですか？",
            answer: "状況や感情の変化を表しています。最初の色は「原因」や「現在の出発点」、後の色は「解決策」や「向かうべき方向」を暗示することが多いです。"
        },
        {
            question: "特定の色だけがモノクロの夢の中でカラーでした。",
            answer: "それは潜在意識からの非常に強いメッセージです。その色の象徴する意味が、今のあなたの人生において最も重要な鍵を握っています。"
        }
    ];

    return (
        <GuideArticle
            slug="color-psychology"
            title="「夢の色」が語る心理"
            fullTitle="夢の景色を鮮やかに彩る、七色の魔法。色が奏でる、あなたの心の物語"
            description="夢の中の風景や物が、鮮烈な色と共に記憶に残っていることはありませんか？色は、言葉よりも早く直感的に、あなたの魂の輝きを伝えてくれます。"
            image="/images/guide/color-psychology.png"
            category="万象が語る物語"
            publishedDate="2026-01-30"
        >
            <FAQSchema questions={faqs} />
            <div className="markdown-content">
                <section>
                    <blockquote className="text-center max-w-3xl mx-auto italic font-medium text-primary/80">
                        色は、魂が言葉を使わずに描く、情熱のパレット。夢の中の色をそっと読み解くことで、今のあなたが鏡を覗くように、本当の自分と出会えるはずです。
                    </blockquote>
                </section>

                <h2>物語の背景、静寂を彩る3つの色</h2>
                <div className="space-y-6 mb-12">
                    {[
                        {
                            bg: "bg-white",
                            borderColor: "!border-slate-300 dark:!border-slate-600",
                            colorName: "白",
                            meaning: "浄化と新しい可能性",
                            k: "【浄化】【成功】【リセット】",
                            d: <>心が浄化され、新しい始まりに向かうサイン。神聖なインスピレーションを意味します。<Link href="/contents/animal/snake" className="mx-1">白蛇の夢</Link>は強力な金運の吉兆です。</>,
                            note: "ポジティブな変化の準備が整っています。"
                        },
                        {
                            bg: "bg-slate-900",
                            borderColor: "!border-slate-950 dark:!border-white/20",
                            colorName: "黒",
                            meaning: "未知への不安と再生",
                            k: "【転換期】【秘密】【休息】",
                            d: <>単なる悪運ではなく、古い自分が終わり、新しい自分へ再生する前の「土台」を意味します。<Link href="/contents/animal/dog" className="mx-1">黒い犬の夢</Link>は周囲の変化を象徴します。</>,
                            note: "焦らず、エネルギーを蓄えるべき時期です。"
                        },
                        {
                            bg: "bg-slate-400",
                            borderColor: "!border-slate-400 dark:!border-slate-500",
                            colorName: "グレー",
                            meaning: "停滞と準備期間",
                            k: "【不透明】【現状維持】【模索】",
                            d: "物事がはっきりしない、宙ぶらりんな状態。無理に白黒つけようとせず、周囲の状況を冷静に観察する時期であることを示しています。",
                            note: "決断は急がず、情報の整理に努めましょう。"
                        }
                    ].map((item, i) => (
                        <div key={i} className={`guide-card relative overflow-hidden pl-12 !border-2 ${item.borderColor}`}>
                            <div className={`absolute left-0 top-0 bottom-0 w-3 ${item.bg} ${item.bg === 'bg-white' ? 'border-r border-slate-100 dark:border-slate-800' : ''}`} />
                            <div className="flex-1">
                                <div className="flex flex-wrap items-baseline gap-x-4 mb-4">
                                    <h3 className="m-0 border-none p-0 leading-tight">
                                        <span className="text-3xl font-black block mb-1">{item.colorName}</span>
                                        <span className="text-lg font-bold opacity-70">{item.meaning}</span>
                                    </h3>
                                    <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">{item.k}</span>
                                </div>
                                <p className="mb-6 text-base">{item.d}</p>
                                <div className="flex gap-2 items-center text-sm font-bold text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    {item.note}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>心の鼓動が奏でる、3つの旋律</h2>
                <div className="space-y-12 mb-12">
                    {[
                        {
                            colorName: "赤",
                            meaning: "情熱と活力を示す強烈なエナジー",
                            k: "生命力・情熱・怒り",
                            p: "生命力が高まり、何事にも意欲的に取り組める絶好調のサイン。情熱的な出会いや勝利を暗示します。",
                            n: "イライラやストレスの蓄積、もしくは「ストップ」の警告。冷静さを欠いている可能性も。",
                            cardStyle: "bg-rose-50/50 dark:bg-rose-950/20 !border-rose-400 dark:!border-rose-700/50",
                            accentColor: "text-rose-600 dark:text-rose-400",
                            badgeStyle: "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300"
                        },
                        {
                            colorName: "青",
                            meaning: "冷静な判断力と内なる静寂",
                            k: "知性・安らぎ・孤独",
                            p: "心が安定し、正しい判断ができる状態。特に美しい青い海や空は、願いが叶う直感が冴えている証拠です。",
                            n: "寂しさや孤立感。または完璧主義による息苦しさ。今は積極的に外部と関わるより、自分を癒やす時です。",
                            cardStyle: "bg-sky-50/50 dark:bg-sky-950/20 !border-sky-400 dark:!border-sky-700/50",
                            accentColor: "text-sky-600 dark:text-sky-400",
                            badgeStyle: "bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300"
                        },
                        {
                            colorName: "緑",
                            meaning: "心の調和と癒やしの訪れ",
                            k: "安定・成長・健康",
                            p: "人間関係が円滑になり、心身のバランスが整うサイン。豊かな緑の森は、これから訪れる安定と豊かさを象徴します。",
                            n: "現状への過度な安定志向による甘え。または成長が止まっていることへの無意識の焦り。",
                            cardStyle: "bg-emerald-50/50 dark:bg-emerald-950/20 !border-emerald-400 dark:!border-emerald-700/50",
                            accentColor: "text-emerald-600 dark:text-emerald-400",
                            badgeStyle: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                        }
                    ].map((item, i) => (
                        <div key={i} className={`guide-card ${item.cardStyle} px-6 py-10 md:p-14 relative overflow-hidden group !border-2`}>
                            {/* 背景の装飾的な色の塊 */}
                            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10 blur-3xl transition-transform group-hover:scale-110 ${item.badgeStyle.split(' ')[0]}`} />

                            <div className="flex flex-wrap items-end gap-4 mb-8 relative z-10">
                                <h3 className={`m-0 border-none p-0 leading-tight ${item.accentColor}`}>
                                    <span className="text-4xl font-black block mb-2">{item.colorName}</span>
                                    <span className="text-xl font-bold opacity-80">{item.meaning}</span>
                                </h3>
                                <div className="text-sm font-bold opacity-60 uppercase tracking-widest pb-1">{item.k}</div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-10 relative z-10">
                                <div className="space-y-4">
                                    <div className={`text-xs font-black px-3 py-1 rounded-full inline-block ${item.badgeStyle}`}>良い前兆</div>
                                    <p className="text-base leading-relaxed m-0">{item.p}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-xs font-black text-slate-400 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full inline-block">注意すべき点</div>
                                    <p className="text-slate-500 dark:text-slate-500 text-base leading-relaxed m-0">{item.n}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="my-12 guide-card guide-card-insight px-4 py-12 md:p-16">
                    <h2 className="text-3xl font-black mb-12 border-none p-0 mt-0 text-center text-amber-500">天からの贈り物、光り輝く3つの魔法</h2>
                    <p className="text-xl text-slate-500 text-center mb-16 max-w-2xl mx-auto">
                        これらの色が印象に残る夢は「魂の歓喜」とも言える最高潮の幸運期を告げています。
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { colorName: "金色", meaning: "名誉・名声・金運の絶頂", d: "あなたがこれまで積み重ねてきた努力が、最高の結果として結実する時です。自信を持って行動してください。", c: "text-amber-600 !border-amber-300 dark:!border-amber-700 bg-amber-50/50 dark:bg-amber-900/10" },
                            { colorName: "銀色", meaning: "洗練された知恵と心の満足", d: "物質的な豊かさ以上に、精神的な落ち着きと深い満足感を得られる暗示です。直感に従うのが吉。", c: "text-slate-600 !border-slate-300 dark:!border-slate-600 bg-slate-50/50 dark:bg-slate-800/20" },
                            { colorName: "虹色", meaning: "運命の好転、願望成就", d: "現在抱えている問題が消え去り、驚くような新しい展開が訪れる大吉夢です。奇跡を信じて待ちましょう。", c: "text-purple-600 !border-purple-300 dark:!border-purple-700 bg-purple-50/50 dark:bg-purple-900/10" },
                            { colorName: "桃色", meaning: "深い慈愛と心温まる幸福", d: "自分への肯定感が高まり、周囲からの愛に包まれる穏やかな時間を象徴します。恋愛運も上昇傾向にあります。", c: "text-rose-600 !border-rose-300 dark:!border-rose-700 bg-rose-50/50 dark:bg-rose-900/10" }
                        ].map((item, i) => (
                            <div key={i} className={`p-8 rounded-[2.5rem] !border-2 ${item.c}`}>
                                <h4 className="border-none p-0 m-0 leading-tight mb-4">
                                    <span className="text-2xl font-black block mb-1">{item.colorName}</span>
                                    <span className="text-base font-bold opacity-80">{item.meaning}</span>
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed m-0">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <h2>4. 色の組み合わせが伝える複雑なメッセージ</h2>
                <p>
                    夢の中で複数の色が印象に残る場合、それらの相互作用が重要な意味を持ちます。例えば、「黒の中に一点の赤」がある夢は、閉塞感の中に強い意志や希望が芽生えていることを示唆します。
                </p>
                <div className="grid gap-6 md:grid-cols-2 mb-12">
                    <div className="guide-card !border-2 border-indigo-300 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20">
                        <h4 className="font-bold mb-2 text-indigo-700 dark:text-indigo-300">コントラストが強い組み合わせ</h4>
                        <p className="text-sm m-0">白と黒、赤と青など正反対の色が混在する場合、心の中で二つの相反する感情が葛藤している、あるいは大きな転換点を迎えていることを意味します。</p>
                    </div>
                    <div className="guide-card !border-2 border-teal-300 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20">
                        <h4 className="font-bold mb-2 text-teal-700 dark:text-teal-300">調和のとれた組み合わせ</h4>
                        <p className="text-sm m-0">パステルカラー同士や同系色のグラデーションは、精神状態が非常に安定しており、周囲とのコミュニケーションも円滑であることを示しています。</p>
                    </div>
                </div>

                <h2>5. よくある質問（FAQ）</h2>
                <div className="space-y-6 mb-12">
                    <details className="guide-card group outline-none cursor-pointer !border-2 border-slate-300 dark:border-slate-700 hover:border-primary/40 transition-colors">
                        <summary className="font-bold list-none flex items-center justify-between">
                            夢の色が途中で変わった場合はどうすればいいですか？
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            状況や感情の変化を表しています。最初の色は「原因」や「現在の出発点」、後の色は「解決策」や「向かうべき方向」を暗示することが多いです。
                        </p>
                    </details>
                    <details className="guide-card group outline-none cursor-pointer border-2 border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-colors">
                        <summary className="font-bold list-none flex items-center justify-between">
                            特定の色だけがモノクロの夢の中でカラーでした。
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            それは潜在意識からの非常に強いメッセージです。その色の象徴する意味が、今のあなたの人生において最も重要な鍵を握っています。
                        </p>
                    </details>
                </div>
            </div>
            <GuideFooter
                title={<>その色のメッセージを<br />現実に活かすために</>}
                description="同じ色でも、あなたが「どう感じたか」が最後のパズルのピースになります。キーワードを調べ、その相乗効果を紐解いてみましょう。"
                buttonText="色のキーワードを調べる"
            />
        </GuideArticle>
    );
}
