"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TOCItem {
    id: string;
    title: string;
    level: number;
}

interface TableOfContentsGuideProps {
    /** 目次に含めるセクションのid一覧 */
    items: TOCItem[];
}

/**
 * ガイドページ用目次コンポーネント
 */
export function TableOfContentsGuide({ items }: TableOfContentsGuideProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-100px 0px -80% 0px",
            }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        <nav className="relative p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 mb-12 overflow-hidden">
            {/* 装飾用バックグラウンド */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />

            <h2 className="relative z-10 font-bold text-slate-400 dark:text-slate-500 mb-6 text-xs uppercase tracking-[0.2em] font-serif">
                Table of Contents
            </h2>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li
                        key={item.id}
                        style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                    >
                        <Link
                            href={`#${item.id}`}
                            className={`block text-sm py-1 transition-colors ${activeId === item.id
                                    ? "text-primary font-medium"
                                    : "text-slate-600 dark:text-slate-400 hover:text-primary"
                                }`}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
