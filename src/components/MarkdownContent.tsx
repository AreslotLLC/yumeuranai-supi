"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";

interface MarkdownContentProps {
    content: string;
    className?: string;
    bannerHtml?: string;
}

export function MarkdownContent({
    content,
    className = "",
    bannerHtml,
}: MarkdownContentProps) {
    // contentが文字列でない場合は空文字列に変換
    const safeContent = typeof content === 'string' ? content : '';
    // リテラルの \n を実際の改行文字に変換（Airtable等からのエスケープ対策）
    const sanitizedContent = safeContent ? safeContent.replace(/\\n/g, "\n") : "";

    // バナーの自動挿入ロジック (3つ目と5つ目のh2の前)
    let processedContent = sanitizedContent;
    if (bannerHtml) {
        const lines = sanitizedContent.split("\n");
        let h2Count = 0;
        const resultLines: string[] = [];
        const injectionPoints = [3, 5];

        lines.forEach((line) => {
            if (line.startsWith("## ")) {
                h2Count++;
                if (injectionPoints.includes(h2Count)) {
                    resultLines.push("\n```banner\n```\n");
                }
            }
            resultLines.push(line);
        });
        processedContent = resultLines.join("\n");
    }

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
                                    {/* 1つ目のバナー */}
                                    <div className="relative w-full max-w-[300px] mx-auto md:mx-0 overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
                                        <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 rounded z-10 pointer-events-none">
                                            PR
                                        </span>
                                        <div
                                            className="affiliate-banner flex justify-center [&_img]:max-w-full [&_img]:h-auto [&_a]:block"
                                            dangerouslySetInnerHTML={{ __html: bannerHtml }}
                                        />
                                    </div>

                                    {/* 2つ目のバナー (デスクトップのみ) */}
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
