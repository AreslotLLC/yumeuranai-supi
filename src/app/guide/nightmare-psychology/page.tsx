import React from "react";
import { GuideArticle } from "@/components/article/GuideArticle";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GuideFooter } from "@/components/article/GuideFooter";

export const metadata = {
    title: "「悪夢」を癒やす：闇夜の奥に眠る光 | 夢と占い.jp",
    description: "追いかけられる、落ちる、歯が抜ける……。悪夢が教えるストレスの正体と、心のSOSを読み解くヒント。精神科領域でも注目される「イメージ変換法」などの改善策も解説。",
    alternates: {
        canonical: `${siteConfig.baseUrl}/guide/nightmare-psychology`,
    },
};

export default function Page() {
    return (
        <GuideArticle
            slug="nightmare-psychology"
            title="「悪夢」を癒やす"
            fullTitle="闇夜の奥に眠る、癒やしの光。悪夢が教える魂のSOSと、静かな眠りを守る魔法"
            description={metadata.description}
            image="/images/guide/nightmare.png"
            category="心の奥底への旅路"
            publishedDate="2026-01-30"
        >
            <div className="markdown-content">
                <section className="mb-10">
                    <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium text-center max-w-3xl mx-auto border border-primary/20 p-8 rounded-[2rem] bg-primary/5 italic">
                        「暗い森で迷い、嫌な汗をかいて目覚める夜」<br />
                        それは、あなたの魂が懸命に送っている、切実な愛のメッセージかもしれません。悪夢という闇を優しく見つめ、その奥に眠る光を読み解くことで、本当の癒やしが静かに始まります。
                    </p>
                </section>

                <h2 className="text-3xl font-black mt-12 mb-6 border-none p-0 leading-tight">闇夜が語りかける、4つの秘密</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {[
                        {
                            t: "何かに追いかけられる夢",
                            link: "/contents/situation/chased",
                            d: "「責任」や「期限」に追われているサイン。逃げきれない恐怖は、現実の課題を先延ばしにしている焦燥感の現れです。何から逃げているのかを見極めることが解決のヒントです。",
                            cardStyle: "guide-card-warning",
                            blob: "bg-rose-400/10"
                        },
                        {
                            t: "高いところから落ちる夢",
                            link: "/contents/situation/falling",
                            d: "地位や評価への「不安」を示します。足元が不安定な感覚は、自信の喪失を象徴していることも。着地できたなら、それは問題解決が近いことを暗示しています。",
                            cardStyle: "guide-card-insight",
                            blob: "bg-indigo-400/10"
                        },
                        {
                            t: "歯が抜ける夢",
                            d: "強いストレスやエネルギーの低下を警告。脳が「大切なものが損なわれる」というメタファーとして現します。家族や身近な人への心配、あるいは自分自身の健康不安が隠れている場合があります。",
                            cardStyle: "guide-card-warning",
                            blob: "bg-rose-400/10"
                        },
                        {
                            t: "恥をかく・裸になる夢",
                            d: "「隠し事がバレる不安」や自己肯定感の揺らぎを教えています。虚勢を張っていることへの疲れが現れている可能性も。ありのままの自分を受け入れる時期です。",
                            cardStyle: "guide-card-insight",
                            blob: "bg-indigo-400/10"
                        }
                    ].map((item, i) => (
                        <div key={i} className={`guide-card ${item.cardStyle} relative overflow-hidden group`}>
                            <div className={`bg-deco-blob ${item.blob}`} />
                            {item.link ? (
                                <h3 className={`decorated-title ${item.cardStyle === 'guide-card-warning' ? 'decorated-title-accent' : ''} text-2xl font-black mb-4 m-0 border-none p-0`}>
                                    <Link href={item.link} className="hover:text-primary transition-colors no-underline relative z-10">{item.t}</Link>
                                </h3>
                            ) : (
                                <h3 className={`decorated-title ${item.cardStyle === 'guide-card-warning' ? 'decorated-title-accent' : ''} text-2xl font-black mb-4 m-0 border-none p-0`}>{item.t}</h3>
                            )}
                            <p className="text-base leading-relaxed m-0 relative z-10 text-slate-600 dark:text-slate-400">{item.d}</p>
                        </div>
                    ))}
                </div>

                <h2>悪夢を引き起こす意外な「生物学的要因」</h2>
                <p>
                    悪夢は心理的な要因だけでなく、身体的なコンディションにも大きく左右されます。
                </p>
                <div className="grid gap-6 md:grid-cols-2 mb-12">
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-rose-400/10" />
                        <h4 className="decorated-title decorated-title-accent font-bold mb-2 m-0 border-none p-0">体温とうつ伏せ寝</h4>
                        <p className="text-sm m-0 text-slate-600 dark:text-slate-400 leading-relaxed">室温が高すぎたり、うつ伏せで胸部を圧迫して寝たりすると、呼吸が苦しくなり、それが夢の中で「首を絞められる」「水に溺れる」といった悪夢として反映されることがあります。</p>
                    </div>
                    <div className="guide-card relative overflow-hidden group">
                        <div className="bg-deco-blob bg-indigo-400/10" />
                        <h4 className="decorated-title font-bold mb-2 m-0 border-none p-0">脳のデトックス不足</h4>
                        <p className="text-sm m-0 text-slate-600 dark:text-slate-400 leading-relaxed">過度のアルコールや就寝直前の食事は、脳が正常なレム睡眠サイクルに入るのを妨げます。脳が情報を整理しきれない「ノイズ」が悪夢となって現れやすくなります。</p>
                    </div>
                </div>

                <section className="guide-card guide-card-warning px-4 py-10 md:p-12 lg:p-16">
                    <h2 className="text-3xl font-black mb-8 border-none p-0 m-0 leading-tight">
                        繰り返し見る悪夢の警告
                    </h2>
                    <p className="text-xl leading-relaxed m-0 font-medium italic">
                        同じ悪夢を何度も見る場合、潜在意識が「まだこの課題を解決できていない」と強く信号を送っています。現実で何かを我慢しすぎていないか、自分と向き合う時間を作ってください。
                    </p>
                </section>

                <h2 className="text-3xl font-black mt-12 mb-8 border-none p-0 leading-tight">闇夜をそっと癒やす、穏やかな魔法</h2>
                <div className="space-y-6 mb-12">
                    {[
                        { t: "イメージ変換法（IRM）", d: "目覚めた後、夢の結末をハッピーエンドに意図的に書き換えます。「怪物が犬になった」など、脳の記憶をポジティブに塗り替えます。" },
                        { t: "刺激物のコントロール", d: "就寝前のスマホ、カフェイン、アルコールを控えます。レム睡眠を不安定にする要因を取り除くことが、穏やかな夜への近道です。" },
                        { t: "安心の入眠ルーティン", d: "「お気に入りの音楽を聴く」「ハーブティーを飲む」などの儀式を作り、脳に『今は安全だ』と教え込み、副交感神経を優位にします。" }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-start px-4 py-8 md:p-10 bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl md:rounded-[3rem] border border-slate-100 dark:border-slate-800">
                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xl font-black mb-3 text-slate-900 dark:text-white m-0 border-none p-0 leading-tight">{item.t}</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-base">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>よくある質問（FAQ）</h2>
                <div className="space-y-6 mb-12">
                    <details className="guide-card group outline-none cursor-pointer">
                        <summary className="font-bold list-none flex items-center justify-between">
                            悪夢を見た日は運勢が悪いのでしょうか？
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            逆夢（さかゆめ）といって、現実では良いことが起きる兆候である場合も多いです。悪夢は脳の「掃除（デトックス）」でもあるため、むしろスッキリして新しい一日を迎えられるポジティブな側面もあります。
                        </p>
                    </details>
                    <details className="guide-card group outline-none cursor-pointer">
                        <summary className="font-bold list-none flex items-center justify-between">
                            子供がひどい悪夢を怖がるときはどう接すべき？
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            まずは「ただの夢だから大丈夫」と強く抱きしめて安心させてあげてください。そして翌朝、夢の内容を絵に描いたりして、その怪物を「面白い姿」に描き変える遊びをすると、恐怖心が和らぎます。
                        </p>
                    </details>
                </div>
            </div>
            <GuideFooter
                title={<>悪夢は魂の<br />「デトックス」</>}
                description="脳がストレスを掃除してくれた証。見た後は自分を甘やかし, リセットされた気分で新しい一日を始めましょう。"
                buttonText="同じ夢を繰り返す理由を見る"
                buttonHref="/guide/repeated-dreams"
            />
        </GuideArticle>
    );
}
