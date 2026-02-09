import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { BreadcrumbSchema } from "@/components/seo";

const PAGE_PATH = "/disclaimer";
const FULL_URL = `${siteConfig.baseUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
    title: `免責事項 | ${siteConfig.name}`,
    description: "夢と占い.jpの免責事項です。当サイトの情報利用に関する注意事項、夢診断の解釈、アフィリエイト広告の使用について説明しています。",
    alternates: {
        canonical: FULL_URL,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <BreadcrumbSchema
                items={[
                    { name: "ホーム", url: siteConfig.baseUrl },
                    { name: "免責事項", url: FULL_URL },
                ]}
            />
            {/* ヒーローセクション */}
            <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
                            免責事項
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            当サイトのご利用にあたって
                        </p>
                    </div>
                </div>
            </section>

            {/* パンくず */}
            <Breadcrumbs
                items={[
                    { name: "ホーム", path: "/" },
                    { name: "免責事項", path: PAGE_PATH },
                ]}
            />

            {/* メインコンテンツ */}
            <main className="py-10 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="markdown-content space-y-10">
                            {/* 1. 情報の正確性・最新性について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    1. 夢診断の解釈と正確性について
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    夢と占い.jp（以下「当サイト」といいます）では、掲載する情報の作成時点において、心理学、スピリチュアル、文化的な伝承に基づき可能な限り正確かつ多様な解釈を提供するよう努めております。しかしながら、夢の内容は非常に主観的であり、個人の状況、感情、経験によってその意味や解釈は大きく異なります。
                                </p>
                                <div className="p-4 sm:p-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-xl">
                                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        <strong>ご注意：</strong>当サイトが提供する夢診断の結果は、あくまで一つの指標や可能性を示すものであり、確実な未来予知や運命の決定を保証するものではありません。あくまでエンターテインメントとして、またご自身の内面を見つめる一つのきっかけとしてご利用ください。
                                    </p>
                                </div>
                            </section>

                            {/* 2. 情報利用に関する免責 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    2. 情報利用および健康に関する免責
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトに掲載された夢の解釈やアドバイスを参考にされたことによる、利用者または第三者の行動、およびその結果生じた損害やトラブル（精神的な動揺等を含みますがこれらに限定されません）について、当サイト運営者は一切の責任を負いかねます。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    特に、悪夢が続く場合や精神的な不安が強い場合、睡眠障害の疑いがある場合などは、夢占いに頼るのではなく、心療内科や精神科などの専門医療機関、および適切な有資格者へ相談されることを強くお勧めいたします。当サイトの情報は医学的、心理学的な治療や代用となるものではありません。
                                </p>
                            </section>

                            {/* 3. アフィリエイト広告および外部リンクについて */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    3. アフィリエイト広告および外部リンクについて
                                </h2>
                                <div className="p-4 sm:p-5 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl mb-4">
                                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        当サイトは、第三者配信の広告サービスや<strong>アフィリエイトプログラム</strong>に参加しています。当サイト経由で占いサービスや商品を購入・成約された場合、当サイト運営者に広告収入が発生する場合があります。
                                    </p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトで紹介している鑑定サービス等は、当サイトが直接運営・提供しているものではありません。お客様とリンク先の業者との間で直接取引されるものです。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    サービス内容、料金、特定商取引法に基づく表記等については、リンク先の各公式サイトを必ずご確認ください。当サイトは、外部サイトの内容や提供されるサービス、およびそこで発生したトラブル等について、一切の責任を負いません。
                                </p>
                            </section>

                            {/* 4. 著作権について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    4. 著作権について
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトに掲載されている文章、画像、デザイン、および独自の夢解釈コンテンツの著作権は、当サイト運営者または正当な権利を有する第三者に帰属します。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    無断での複製、転載、改変等は著作権法により禁じられています。適切な範囲内での引用を除き、承諾なく当サイトのコンテンツを利用することはできません。
                                </p>
                            </section>

                            {/* 5. コンテンツの変更・削除 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    5. コンテンツの変更・削除
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    当サイトは、予告なく掲載内容の変更、修正、または削除を行うことがあります。これらによって生じたいかなる損害についても、当サイト運営者は一切の責任を負いません。
                                </p>
                            </section>

                            {/* 制定日 */}
                            <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    改訂日：2026年1月22日
                                </p>
                            </section>

                            {/* 関連リンク */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 italic font-serif">
                                    Related Pages
                                </h2>
                                <ul className="space-y-3">
                                    <li>
                                        <Link
                                            href="/about"
                                            className="text-primary hover:underline flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            運営者情報
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy-policy"
                                            className="text-primary hover:underline flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            プライバシーポリシー
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
