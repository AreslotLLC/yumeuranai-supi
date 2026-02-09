import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/siteConfig";
import { BreadcrumbSchema } from "@/components/seo";

const PAGE_PATH = "/about";
const FULL_URL = `${siteConfig.baseUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
    title: "運営者情報 | 夢と占い.jp",
    description: "夢と占い.jpの運営者情報ページです。サイトの運営方針、連絡先等をご案内しています。",
    alternates: {
        canonical: FULL_URL,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <BreadcrumbSchema
                items={[
                    { name: "ホーム", url: siteConfig.baseUrl },
                    { name: "運営者情報", url: FULL_URL },
                ]}
            />
            {/* ヒーローセクション */}
            <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            運営者情報
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            夢と占い.jpの運営について
                        </p>
                    </div>
                </div>
            </section>

            {/* パンくず */}
            <Breadcrumbs
                items={[
                    { name: "ホーム", path: "/" },
                    { name: "運営者情報", path: PAGE_PATH },
                ]}
            />

            {/* メインコンテンツ */}
            <main className="py-10 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="markdown-content">
                            {/* サイト概要 */}
                            <section className="mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    サイト概要
                                </h2>
                                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                                    <table className="w-full text-sm">
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            <tr className="bg-white dark:bg-slate-950">
                                                <th className="px-4 py-4 text-left font-bold text-slate-900 dark:text-white w-1/3 bg-slate-50 dark:bg-slate-900">
                                                    サイト名
                                                </th>
                                                <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                                                    夢と占い.jp
                                                </td>
                                            </tr>
                                            <tr className="bg-white dark:bg-slate-950">
                                                <th className="px-4 py-4 text-left font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">
                                                    サイトURL
                                                </th>
                                                <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                                                    <Link
                                                        href="/"
                                                        className="text-primary hover:underline"
                                                    >
                                                        {siteConfig.baseUrl}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr className="bg-white dark:bg-slate-950">
                                                <th className="px-4 py-4 text-left font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">
                                                    運営会社
                                                </th>
                                                <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                                                    株式会社Areslot
                                                </td>
                                            </tr>
                                            <tr className="bg-white dark:bg-slate-950">
                                                <th className="px-4 py-4 text-left font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">
                                                    お問い合わせ
                                                </th>
                                                <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                                                    <a
                                                        href="https://www.areslot.jp/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        https://www.areslot.jp/
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* サイトの目的 */}
                            <section className="mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    サイトの目的
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    「夢と占い.jp」は、日々の睡眠の中で見る「夢」という不思議な現象を通じて、自分自身の深層心理や未来へのヒントを紐解くためのお手伝いをする情報サイトです。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    夢は単なる幻想ではなく、私たちの無意識が発する重要なメッセージであると私たちは考えています。当サイトでは、古今東西の文献や心理学的アプローチを参考に、現代のライフスタイルに合わせた解釈を分かりやすく提供することを目指しています。
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    昨日見た夢のキーワードから、あなたの心が何を求めているのか、何に不安を感じているのか。その答えを見つけることで、皆さまがより前向きに、より健やかな毎日を送れるようなサポートをさせていただきます。
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
                                            href="/privacy-policy"
                                            className="text-primary hover:underline"
                                        >
                                            プライバシーポリシー
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
