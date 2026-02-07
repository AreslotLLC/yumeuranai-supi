import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GuideFooter } from "@/components/article/GuideFooter";
import { siteConfig } from "@/lib/siteConfig";
import { GuideArticle } from "@/components/article/GuideArticle";

export const metadata: Metadata = {
    title: `何度も同じ夢を見る理由：潜在意識からの重要な警告とメッセージ | ${siteConfig.name}`,
    description: "なぜ同じ場面、同じ展開の夢を繰り返し見るのでしょうか？心理学的な背景や、潜在意識が伝えようとしている「警告」とメッセージ、そこで運気を好転させるための対処法を詳しく解説します。",
};

export default function RepeatedDreamsPage() {
    return (
        <GuideArticle
            slug="repeated-dreams"
            title="同じ夢を見る理由"
            fullTitle="何度も同じ夢を見る理由：潜在意識からの重要な警告とメッセージ"
            description="「またあの夢だ……」と不思議に思ったことはありませんか？繰り返される夢には、あなたの人生を左右する重要なヒントが隠されています。"
            image="/images/guide/psychology.png"
            category="深層心理と感情"
            publishedDate="2026-01-29"
        >
            <div className="markdown-content">
                <section>
                    <blockquote className="text-center max-w-3xl mx-auto">
                        夢は脳が情報を整理する過程で見るとされていますが、同じ内容が繰り返される場合、それは単なる整理以上の意味を持ちます。
                    </blockquote>
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="guide-card relative overflow-hidden group">
                            <div className="bg-deco-blob bg-primary/10" />
                            <h3 className="decorated-title mt-0 border-none p-0">未完了の課題</h3>
                            <p className="m-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                                解決できていない悩みや、抑圧された感情が繰り返されます。脳が「これは重要だ」と判断している証拠です。
                            </p>
                        </div>
                        <div className="guide-card relative overflow-hidden group">
                            <div className="bg-deco-blob bg-accent/10" />
                            <h3 className="decorated-title decorated-title-accent mt-0 border-none p-0">トラウマの再現</h3>
                            <p className="m-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                                過去の強い衝撃やストレスが、フラッシュバックのように夢として再現されることがあります。
                            </p>
                        </div>
                    </div>
                </section>

                <h2>潜在意識が送る「3つの警告」</h2>
                <div className="space-y-6 mb-12">
                    {[
                        { step: "01", t: "極度のストレスと疲労", d: <>「追いかけられる夢」や「逃げ場がない」夢は、現実のプレッシャーが限界に近いサインです。<Link href="/contents/situation/chased" className="mx-1">追いかけられる夢の解説</Link></> },
                        { step: "02", t: "解決すべき過去の感情", d: <>「元彼・元カノ」の夢が続くのは、当時の課題が今の生活にも共通していることを示唆します。<Link href="/contents/person/ex-boyfriend" className="mx-1">元彼の夢の解説</Link></> },
                        { step: "03", t: "人生の転換点が近い予兆", d: "特定の人物や場所が何度も出るのは、これから人生に重要な影響を与える物事が近づいている可能性を示唆します。" }
                    ].map((item, idx) => (
                        <div key={idx} className="guide-card guide-card-insight guide-card-step">
                            <div className="guide-step-number">
                                {item.step}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-black mb-3 text-slate-900 dark:text-white m-0 border-none p-0">{item.t}</h4>
                                <p className="m-0 text-base">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="mb-12 bg-slate-900 px-6 py-10 md:p-12 lg:p-16 rounded-3xl md:rounded-[3rem] text-white">
                    <h2 className="text-3xl font-black mb-8 !text-amber-400 border-none p-0 m-0 leading-tight before:hidden">
                        夢からの卒業：見なくなった時に起きること
                    </h2>
                    <p className="text-xl text-slate-300 leading-relaxed mb-0 font-medium max-w-2xl">
                        ある日突然見なくなるのは、心の課題を「克服」したサイン。現実世界でも物事がスムーズに進み始め、新しい変化が訪れる前兆です。
                    </p>
                </section>

                <div className="my-12 guide-card guide-card-insight px-4 py-10 md:p-12">
                    <h2 className="text-3xl font-black mb-12 border-none p-0 mt-0">本質的な解決へのアクション</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { t: "解決のイメージ", d: "寝る前に「次はこうする」と成功展開を強くイメージする。" },
                            { t: "「未完了」を片付ける", d: "先延ばしにしている小さな用事や謝罪を済ませてみる。" },
                            { t: "脳の緊張を解く", d: "睡眠前のスマホを控え、深呼吸や香りで質を極める。" }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 bg-white/50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                                <h4 className="font-black text-lg text-slate-900 dark:text-white m-0 border-none p-0 mb-3">{item.t}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 m-0">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <GuideFooter
                title={<>その夢が伝える<br />真実を知る</>}
                description="繰り返し見る夢のキーワードを夢辞典で詳しく調べてみましょう。潜在意識からのメッセージが、より明確に浮かび上がります。"
                buttonText="キーワードを探す"
            />
        </GuideArticle>
    );
}
