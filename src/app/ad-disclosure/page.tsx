import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { BreadcrumbSchema } from "@/components/seo";

const PAGE_PATH = "/ad-disclosure";
const FULL_URL = `${siteConfig.baseUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
    title: "広告掲載について | 夢と占い.jp",
    description: "夢と占い.jpにおける広告掲載・アフィリエイトプログラムの利用についてご説明しています。",
    alternates: {
        canonical: FULL_URL,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AdDisclosurePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <BreadcrumbSchema
                items={[
                    { name: "ホーム", url: siteConfig.baseUrl },
                    { name: "広告掲載について", url: FULL_URL },
                ]}
            />
            {/* ヒーローセクション */}
            <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            広告掲載について
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            当サイトの広告利用に関するご説明
                        </p>
                    </div>
                </div>
            </section>

            {/* パンくず */}
            <Breadcrumbs
                items={[
                    { name: "ホーム", path: "/" },
                    { name: "広告掲載について", path: PAGE_PATH },
                ]}
            />

            {/* メインコンテンツ */}
            <main className="py-10 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="markdown-content space-y-10">
                            {/* アフィリエイト広告について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    アフィリエイト広告について
                                </h2>
                                <div className="p-4 sm:p-5 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl mb-4">
                                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        当サイト「夢と占い.jp」は、<strong>アフィリエイトプログラム</strong>を利用しています。
                                        当サイトに掲載されているリンクを経由して商品・サービスをご購入・ご利用いただいた場合、当サイト運営者に広告報酬が支払われることがあります。
                                    </p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトでは、株式会社ファンコミュニケーションズが運営するアフィリエイトサービス「A8.net」をはじめとする各種アフィリエイトプログラムに参加しております。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    これらのプログラムを通じて得られる報酬は、サイトの運営・コンテンツ制作に充てさせていただいております。
                                </p>
                            </section>

                            {/* 広告表示・掲載について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    広告表示・掲載について
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトでは、以下の形式で広告を掲載しております。
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                                    <li>テキストリンク広告</li>
                                    <li>バナー広告（画像広告）</li>
                                    <li>商品・サービスの比較・紹介記事内の広告リンク</li>
                                </ul>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    広告を含むコンテンツには「PR」「広告」等の表記を行い、広告であることを明示しております。
                                </p>
                            </section>

                            {/* 取引について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    商品・サービスのお取引について
                                </h2>
                                <div className="p-4 sm:p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl mb-4">
                                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        <strong>ご注意：</strong>当サイトでご紹介している商品・サービスは、当サイトが直接販売・提供するものではありません。
                                        お客様と広告主（販売店・サービス提供者）との間で直接取引されるものです。
                                    </p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    商品・サービスの内容、価格、在庫状況、特定商取引法に基づく表記、キャンセル・返品条件等については、リンク先の各広告主サイトをご確認ください。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    当サイトは、外部サイトで行われる取引やそこで発生したトラブル等について、一切の責任を負いかねます。
                                </p>
                            </section>

                            {/* 情報の正確性について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    コンテンツの信頼性について
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトでは、アフィリエイト広告収入の有無にかかわらず、公正かつ正確な情報をお届けするよう努めております。
                                    掲載する情報は可能な限り最新かつ正確であるよう心がけておりますが、その内容を保証するものではありません。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    詳細については、<Link href="/disclaimer" className="text-primary hover:underline">免責事項</Link>をご確認ください。
                                </p>
                            </section>

                            {/* 制定日 */}
                            <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    制定日：2026年1月16日
                                </p>
                            </section>

                            {/* 関連リンク */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    関連ページ
                                </h2>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/disclaimer"
                                            className="text-primary hover:underline"
                                        >
                                            免責事項
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy-policy"
                                            className="text-primary hover:underline"
                                        >
                                            プライバシーポリシー
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about"
                                            className="text-primary hover:underline"
                                        >
                                            運営者情報
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
