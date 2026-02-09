"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import { AffiliateAd } from "@/types";
import { AffiliateTextButton } from "./article/AffiliateTextButton";

interface MarkdownContentProps {
    content: string;
    className?: string;
    bannerHtml?: string;
    textAds?: AffiliateAd[];
}

export function MarkdownContent({
    content,
    className = "",
    bannerHtml,
    textAds = [],
}: MarkdownContentProps) {
    // 広告のサイクル表示用カウンタ
    const [adIndex, setAdIndex] = useState(0);

    // contentが文字列でない場合は空文字列に変換
    const safeContent = typeof content === 'string' ? content : '';
    // リテラルの \n を実際の改行文字に変換（Airtable等からのエスケープ対策）
    const sanitizedContent = safeContent ? safeContent.replace(/\\n/g, "\n") : "";

    // バナーとテキスト広告の自動挿入ロジック
    let processedContent = sanitizedContent;
    
    const lines = sanitizedContent.split("\n");
    let sectionCount = 0;
    const resultLines: string[] = [];
    const bannerInjectionPoints = [3, 5];

    lines.forEach((line, index) => {
        // 次の行の見出しチェック（セクションの終了判定）
        const nextLine = lines[index + 1] || "";
        const isHeader = line.startsWith("## ") || line.startsWith("### ");
        const isNextHeader = nextLine.startsWith("## ") || nextLine.startsWith("### ");

        resultLines.push(line);

        // h2バナーの挿入（既存ロジック維持）
        if (line.startsWith("## ")) {
            const h2Count = resultLines.filter(l => l.startsWith("## ")).length;
            if (bannerHtml && bannerInjectionPoints.includes(h2Count)) {
                resultLines.push("\n```banner\n```\n");
            }
        }

        // テキスト広告の挿入（セクション終了直後）
        // 次が見出しか、または記事の最後である場合に挿入候補とする
        if (textAds.length > 0 && (isNextHeader || index === lines.length - 1)) {
            // 見出しの後、かつ中身がある程度ある場合に挿入（極端に短いセクションの連続を避けるため、簡易的に空行等を除外）
            // ここではシンプルに「セクションが終わったタイミング」で必ず挿入ブロックを入れる
            resultLines.push("\n```text-ad\n```\n");
        }
    });
    processedContent = resultLines.join("\n");

    // 太字 (**) と日本語の括弧 (「 」) が隣接するとパースに失敗する問題への対策
    processedContent = processedContent
        .replace(/\*\*([「『])/g, "**\u200B$1")
        .replace(/([」』])\*\*/g, "$1\u200B**");

    return (
        <div className={`prose prose-slate max-w-none dark:prose-invert font-serif ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeSlug]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-xl md:text-3xl font-bold mt-10 md:mt-20 mb-4 md:mb-8 border-l-4 border-accent border-b-2 border-accent/20 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-r-lg text-accent">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-lg md:text-2xl font-bold mt-8 md:mt-14 mb-3 md:mb-6 border-b-2 border-primary/30 pb-2 text-primary dark:text-primary">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-base md:text-xl font-bold mt-6 md:mt-10 mb-2 md:mb-5 text-slate-900 dark:text-white">
                            {children}
                        </h4>
                    ),
                    h5: ({ children }) => (
                        <h5 className="text-base font-bold mt-6 mb-2 text-slate-900 dark:text-white">
                            {children}
                        </h5>
                    ),
                    p: ({ children }) => (
                        <p className="my-2.5 md:my-4 leading-relaxed text-base md:text-[17px] font-medium text-slate-700 dark:text-slate-300">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="my-4 list-decimal space-y-2 pl-6">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="pl-1">{children}</li>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-bold text-slate-900 dark:text-white">
                            {children}
                        </strong>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-6 my-8 italic bg-slate-50 dark:bg-slate-900/50 py-4 rounded-r-xl">
                            {children}
                        </blockquote>
                    ),
                    code: ({ children, className }) => {
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code className="bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                                    {children}
                                </code>
                            );
                        }

                        // バナー挿入用の特殊コードブロック
                        if (className === "language-banner" && bannerHtml) {
                            return (
                                <div className="my-8 md:my-12 flex flex-col md:flex-row items-center justify-center gap-4">
                                    {/* ...既存のバナー表示コード（省略せずそのまま維持） */}
                                    <div className="relative w-full max-w-[300px] mx-auto md:mx-0 overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
                                        <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                                            PR
                                        </span>
                                        <div
                                            className="affiliate-banner flex justify-center [&_img]:max-w-full [&_img]:h-auto [&_a]:block"
                                            dangerouslySetInnerHTML={{ __html: bannerHtml }}
                                        />
                                    </div>

                                    <div className="hidden md:block relative w-full max-w-[300px] md:mx-0 overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
                                        <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                                            PR
                                        </span>
                                        <div
                                            className="affiliate-banner flex justify-center [&_img]:max-w-full [&_img]:h-auto [&_a]:block"
                                            dangerouslySetInnerHTML={{ __html: bannerHtml }}
                                        />
                                    </div>
                                </div>
                            );
                        }

                        // テキスト広告挿入用の特殊コードブロック
                        if (className === "language-text-ad" && textAds.length > 0) {
                            // クライアントサイドでのみサイクルを回すための工夫
                            // コンポーネント内で現在のインデックスを決定
                            return <AdCycleWrapper textAds={textAds} />;
                        }

                        return (
                            <code className="block bg-slate-100 dark:bg-slate-800 p-6 rounded-xl overflow-x-auto font-mono text-sm my-6">
                                {children}
                            </code>
                        );
                    },
                    a: ({ href, children }) => {
                        const isInternal = href?.startsWith("/") || href?.startsWith("./") || href?.startsWith("../");
                        if (isInternal) {
                            return (
                                <Link
                                    href={href || "#"}
                                    className="text-primary hover:opacity-80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all font-bold"
                                >
                                    {children}
                                </Link>
                            );
                        }
                        return (
                            <a
                                href={href}
                                className="text-primary hover:opacity-80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all font-bold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {children}
                            </a>
                        );
                    },
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <table className="w-full border-collapse">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-left font-bold border-b border-slate-200 dark:border-slate-800">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 text-sm">
                            {children}
                        </td>
                    ),
                }}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
}

/**
 * 広告のサイクル表示を管理するヘルパーコンポーネント（クロージャ的にインデックスを保持）
 */
let globalAdCounter = 0;
function AdCycleWrapper({ textAds }: { textAds: AffiliateAd[] }) {
    const [index] = useState(() => {
        const currentIndex = globalAdCounter % textAds.length;
        globalAdCounter++;
        return currentIndex;
    });

    return <AffiliateTextButton ad={textAds[index]} />;
}
