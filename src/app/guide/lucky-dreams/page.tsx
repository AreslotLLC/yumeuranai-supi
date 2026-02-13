import React from "react";
import { GuideArticle } from "@/components/article/GuideArticle";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { GuideFooter } from "@/components/article/GuideFooter";
import { FAQSchema } from "@/components/seo";

export const metadata = {
    title: "「吉夢」のささやき：幸福のしずく、光への導き | 夢と占い.jp",
    description: "白蛇、火事、自分が死ぬ夢……。一見怖そうでも実は最強の大吉夢？金運や成功、人間関係の劇的好転を暗示する幸運のサインを詳しく解説します。",
    alternates: {
        canonical: `${siteConfig.baseUrl}/guide/lucky-dreams`,
    },
    lastModified: new Date().toISOString(),
};

export default function Page() {
    const faqs = [
        {
            question: "吉夢を見たのに、翌日に悪いことが起きました。",
            answer: "これは「好転反応」と呼ばれる現象かもしれません。大きな幸運が入ってくる前に、古いエネルギーが排出されるデトックス期間です。落ち込まず、前向きに構えていてください。"
        },
        {
            question: "同じ吉夢を何度も見たいのですが、方法はありますか？",
            answer: "就寝前にその夢のシーンを強く鮮明にイメージしながら眠りにつく「自己暗示」が有効です。また、そのシンボル（例えば白蛇の画像など）をスマートフォンなどの壁紙にするのも良い刺激になります。"
        }
    ];

    return (
        <GuideArticle
            slug="lucky-dreams"
            title="「吉夢」のささやき"
            fullTitle="運命がささやく幸福のしずく。光り輝く未来を呼び込む「吉夢」の調べ"
            description={metadata.description}
            image="/images/guide/lucky.png"
            category="万象が語る物語"
            publishedDate="2026-01-30"
        >
            <FAQSchema questions={faqs} />
            <div className="markdown-content">
                <section>
                    <blockquote className="text-center max-w-3xl mx-auto">
                        夢の世界には、幸福のしずくがこぼれ落ちる予兆があふれています。それらは「吉夢（きちむ）」と呼ばれ、あなたの人生が鮮やかに彩られる。そんな素敵な未来を静かにささやいているのです。
                    </blockquote>
                </section>

                <h2>光り輝く未来へ誘う、5つの輝石</h2>

                <div className="space-y-6 mb-12">
                    {[
                        {
                            num: "01",
                            title: "白蛇（しろへび）の出現",
                            link: "/contents/animal/snake",
                            desc: "白蛇は古来より「弁財天の使い」として崇められ、富の象徴とされてきました。夢に現れるだけで強力な金運上昇を意味します。特に「蛇に噛まれる」「蛇が懐に入る」といった接触を伴う夢は、棚からぼたもち式の臨時収入や、事業の急成長を予見する最高ランクの吉夢です。",
                            accent: "guide-card-lucky"
                        },
                        {
                            num: "02",
                            title: "自宅や街の大火事",
                            link: "/contents/situation/fire",
                            desc: "現実では悪夢そのものですが、夢占いでは「激しく燃え上がる炎」ほど運気が急上昇することを表す最強の「逆夢」です。これまでの古い問題が焼き尽くされ、新しいステージへと進む準備が整ったことを示唆します。爆発を伴うような大きな火事であるほど、得られる幸運も大きくなります。",
                            accent: "guide-card-warning"
                        },
                        {
                            num: "03",
                            title: "自分が死ぬ、または殺される",
                            desc: "自分が死ぬ夢は「再生」のシンボルです。心理学的にも、古い自分の価値観が崩壊し、より成長した新しい自分へと生まれ変わるプロセスを映し出しています。仕事での大抜擢、理想のパートナーとの出会い、あるいは病気からの回復など、人生の転換期に現れる代表的な吉夢です。",
                            accent: "guide-card-insight"
                        },
                        {
                            num: "04",
                            title: "排泄物（うんち）が体につく",
                            desc: "いわゆる「運がつく（便がつく）」とされる、直球の金運大吉夢です。汚ければ汚いほど、また体全体に付着するほど、手に入れる金額やチャンスが莫大になることを暗示しています。生理的な嫌悪感とは裏腹に、非常に強力なパワーを持つ夢です。",
                            accent: "guide-card-lucky"
                        },
                        {
                            num: "05",
                            title: "澄んだ水、美しい海",
                            desc: "水は「感情」と「財運」を司ります。透き通った水の中を泳いだり、美しい噴水を眺めたりする夢は、あなたの心が非常にクリアで、理想の未来を引き寄せやすい状態にあることを示しています。",
                            accent: "bg-blue-50/30 dark:bg-blue-950/10 border-blue-100/50 dark:border-blue-900/20"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className={`guide-card guide-card-step ${item.accent}`}>
                            <div className="guide-step-number italic text-slate-400">
                                {item.num}
                            </div>
                            <div className="flex-1">
                                {item.link ? (
                                    <h3 className="text-2xl font-black m-0 border-none p-0 leading-tight">
                                        <Link href={item.link} className="no-underline hover:text-primary transition-colors">
                                            {item.title}
                                        </Link>
                                    </h3>
                                ) : (
                                    <h3 className="text-2xl font-black m-0 border-none p-0 leading-tight">
                                        {item.title}
                                    </h3>
                                )}
                                <p className="mt-4 m-0 text-base">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-accent/20" />
                        <h3 className="decorated-title decorated-title-accent mt-0 border-none p-0">金運・成功の予兆</h3>
                        <p className="text-slate-600 dark:text-slate-400 m-0">
                            白蛇、豊かな実りの田畑、光り輝く宝飾品など、物質的・社会的な成功を暗示する象徴。
                        </p>
                    </div>
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-primary/10" />
                        <h3 className="decorated-title mt-0 border-none p-0">転換・好転の予兆</h3>
                        <p className="text-slate-600 dark:text-slate-400 m-0">
                            夜明け、日の出、火事、自分が死ぬ夢など、古い自分が終わり再生・好転が始まる象徴。
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] my-12 text-white">
                    <h2 className="text-3xl font-black mb-10 border-none p-0 mt-0 !text-white before:!hidden">特に見逃せない「色」と「数」</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { t: "金色・虹色", d: "最高級の繁栄と喜びを手にする予兆です。", c: "text-amber-400" },
                            { t: "8 (ハチ)", d: "「末広がり」の象徴。永遠に続く幸福の循環を意味します。", c: "text-purple-400" },
                            { t: "澄み切った青", d: "冷静な判断力が高まり、成功へと導かれる暗示。", c: "text-blue-400" },
                            { t: "鮮やかな緑", d: "心身の健康と、家庭内の平穏が訪れるサイン。", c: "text-emerald-400" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[2rem] border border-white/10 bg-white/5">
                                <h4 className={`text-xl font-black mb-3 border-none p-0 m-0 leading-tight ${item.c}`}>{item.t}</h4>
                                <p className="text-slate-100 text-sm leading-relaxed m-0">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <section>
                    <h2>吉夢を見た後に運気を定着させる</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { t: "「離す」のは厳禁", d: "良い夢は人に話すと運が逃げると言われます（話す＝放す）。叶うまでは自分の中だけで大切に温めておきましょう。" },
                            { t: "直感を信じて動く", d: "吉夢の後は潜在意識とのパイプが太くなり、直感力が冴えます。「これだ」と思ったことには迷わず行動を。" },
                            { t: "感謝を循環させる", d: "「自分は運が良い」とポジティブに捉え、周囲にも感謝を伝えることで、幸運がさらに大きな形となって返ってきます。" }
                        ].map((item, i) => (
                            <div key={i} className="guide-card p-8">
                                <h4 className="font-black text-lg mb-3 m-0 border-none p-0">{item.t}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed m-0">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <h2>よくある質問（FAQ）</h2>
                <div className="space-y-6 mb-12">
                    <details className="guide-card group outline-none cursor-pointer">
                        <summary className="font-bold list-none flex items-center justify-between">
                            吉夢を見たのに、翌日に悪いことが起きました。
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            これは「好転反応」と呼ばれる現象かもしれません。大きな幸運が入ってくる前に、古いエネルギーが排出されるデトックス期間です。落ち込まず、前向きに構えていてください。
                        </p>
                    </details>
                    <details className="guide-card group outline-none cursor-pointer">
                        <summary className="font-bold list-none flex items-center justify-between">
                            同じ吉夢を何度も見たいのですが、方法はありますか？
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            就寝前にその夢のシーンを強く鮮明にイメージしながら眠りにつく「自己暗示」が有効です。また、そのシンボル（例えば白蛇の画像など）をスマートフォンなどの壁紙にするのも良い刺激になります。
                        </p>
                    </details>
                </div>
            </div>
            <GuideFooter
                title={<>あなたの夢をもっと詳しく</>}
                description="個別キーワードの意味を紐解くことで、あなただけに向けられた特別なメッセージが明らかになります。"
                buttonText="夢辞典を開く"
            />
        </GuideArticle>
    );
}
