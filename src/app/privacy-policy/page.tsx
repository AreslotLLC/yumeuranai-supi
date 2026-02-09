import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { BreadcrumbSchema } from "@/components/seo";

const PAGE_PATH = "/privacy-policy";
const FULL_URL = `${siteConfig.baseUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
    title: "プライバシーポリシー | 夢と占い.jp",
    description: "夢と占い.jpのプライバシーポリシーです。個人情報の取り扱い、Cookie・アクセス解析の使用について説明しています。",
    alternates: {
        canonical: FULL_URL,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <BreadcrumbSchema
                items={[
                    { name: "ホーム", url: siteConfig.baseUrl },
                    { name: "プライバシーポリシー", url: FULL_URL },
                ]}
            />
            {/* ヒーローセクション */}
            <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            プライバシーポリシー
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            個人情報の取り扱いについて
                        </p>
                    </div>
                </div>
            </section>

            {/* パンくず */}
            <Breadcrumbs
                items={[
                    { name: "ホーム", path: "/" },
                    { name: "プライバシーポリシー", path: PAGE_PATH },
                ]}
            />

            {/* メインコンテンツ */}
            <main className="py-10 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="markdown-content space-y-10">
                            {/* 1. 基本方針 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    1. 基本方針
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    夢と占い.jp（以下「当サイト」といいます）は、訪問者の個人情報の保護について、以下のとおりプライバシーポリシーを定め、これに従って適切に取り扱います。
                                </p>
                            </section>

                            {/* 2. アクセス解析ツールについて */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    2. アクセス解析ツールについて
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトでは、サービスの向上およびコンテンツの改善を目的として、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスは、データの収集のためにCookie（クッキー）を使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    この機能はCookieを無効にすることで収集を拒否することが可能です。お使いのブラウザの設定をご確認ください。Googleアナリティクスの規約等に関する詳細は、
                                    <a
                                        href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        Googleアナリティクス利用規約
                                    </a>
                                    や
                                    <a
                                        href="https://policies.google.com/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        Googleのポリシーと規約
                                    </a>
                                    をご覧ください。
                                </p>
                            </section>

                            {/* 3. 広告の配信について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    3. 広告の配信について
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトでは、第三者配信の広告サービス（Googleアドセンス、A8.net、バリューコマース等）を利用しています。これらの広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    また、Googleアドセンスに関して、このプロセスの詳細や、このような情報が広告配信事業者に使用されないようにする方法については、
                                    <a
                                        href="https://www.google.com/settings/ads"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        Googleの広告設定
                                    </a>
                                    より設定が可能です。
                                </p>
                                <div className="p-4 sm:p-5 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl">
                                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        当サイトは、Amazon.co.jpを宣伝しリンクすることによって紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、<strong>Amazonアソシエイト・プログラム</strong>の参加者です。
                                    </p>
                                </div>
                            </section>

                            {/* 4. Cookie（クッキー）について */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    4. Cookie（クッキー）について
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    Cookieとは、訪問者がWebサイトを閲覧した際に、ブラウザとサーバーとの間で送受信される小さなテキストファイルです。当サイトでは、利便性向上やサイトの利用状況把握のためにCookieを利用しています。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    訪問者は、ブラウザの設定によりCookieの受け入れを拒否することができます。ただし、Cookieを無効にした場合、当サイトの一部機能が正常に動作しない可能性がありますので、あらかじめご了承ください。
                                </p>
                            </section>

                            {/* 5. 個人情報の管理と第三者への提供 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    5. 個人情報の管理と第三者への提供
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    当サイトでは、訪問者から直接的な個人情報（氏名、メールアドレス等）を取得するフォーム等は設置しておりません。アクセス解析等で取得した匿名情報についても、適切に管理を行い、以下のいずれかに該当する場合を除き、第三者に提供することはありません。
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                                    <li>法令に基づき開示が必要な場合</li>
                                    <li>不正アクセス、脅迫等の違法行為があった場合</li>
                                    <li>ご本人の同意がある場合</li>
                                </ul>
                            </section>

                            {/* 6. プライバシーポリシーの変更 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    6. プライバシーポリシーの変更
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    当サイトは、法令の制定・改正や社会情勢の変化に応じて、本プライバシーポリシーを適宜見直し、予告なく変更することがあります。変更後のプライバシーポリシーは、当ページにて公開した時点から効力を生じるものとします。
                                </p>
                            </section>

                            {/* 7. お問い合わせ */}
                            <section>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    7. お問い合わせ
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    本プライバシーポリシーに関するお問い合わせは、
                                    <a
                                        href="https://www.areslot.jp/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        当サイトの運営会社ウェブサイト
                                    </a>
                                    よりご連絡ください。
                                </p>
                            </section>

                            {/* 制定日 */}
                            <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    制定日：2026年1月9日
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
                                            href="/about"
                                            className="text-primary hover:underline"
                                        >
                                            運営者情報
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/disclaimer"
                                            className="text-primary hover:underline"
                                        >
                                            免責事項
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
