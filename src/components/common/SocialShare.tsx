"use client";

import React from "react";
import { Twitter, Send, Share2 } from "lucide-react";

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
}

/**
 * SNSシェアボタンコンポーネント (X, LINE, Facebook)
 */
export function SocialShare({ url, title, description }: SocialShareProps) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = description ? encodeURIComponent(description) : "";

    const shareLinks = [
        {
            name: "X (Twitter)",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "bg-black text-white",
        },
        {
            name: "LINE",
            icon: Send, // Lucide doesn't have a dedicated LINE icon, Send is a common substitute or we could use a custom SVG
            href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
            color: "bg-[#06C755] text-white",
        },
        {
            name: "Facebook",
            icon: Share2,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "bg-[#1877F2] text-white",
        },
    ];

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Share</span>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm ${link.color}`}
                    aria-label={`${link.name}でシェア`}
                >
                    <link.icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                </a>
            ))}
        </div>
    );
}

/**
 * LINEアイコン用のカスタムSVG（Lucideにないため）
 */
export function LineIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M19.365 9.863c.064.433.1.88.1 1.335 0 3.926-3.562 7.121-7.95 7.121-1.01 0-1.956-.169-2.821-.462l-2.73 1.706c-.464.288-.936.143-.804-.374l.43-1.666c-1.353-1.31-2.19-3.036-2.19-4.325 0-3.926 3.562-7.121 7.95-7.121 4.388 0 7.95 3.195 7.95 7.121l.065.665z" />
        </svg>
    );
}
