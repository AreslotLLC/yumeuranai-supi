"use client";

import React from "react";
import { List } from "lucide-react";

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    items: TocItem[];
    className?: string;
}

export function TableOfContents({ items, className = "" }: TableOfContentsProps) {
    if (items.length === 0) return null;

    return (
        <nav className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm ${className}`}>
            <div className="flex items-center gap-2 mb-4 text-primary font-bold border-b border-primary/10 pb-3">
                <List className="w-5 h-5" />
                <span>目次</span>
            </div>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`${item.level === 3 ? "ml-4 text-sm" : "text-base font-medium"
                            }`}
                    >
                        <a
                            href={`#${item.id}`}
                            className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-accent transition-colors block py-0.5"
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
