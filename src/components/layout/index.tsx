"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { headerNavLinks, footerNavLinks, siteConfig } from "@/lib/siteConfig";
import { SiteNavigationSchema } from "@/components/seo";
import { uiStrings } from "@/constants/uiStrings";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // ナビゲーション用の項目を整形
    const navItems = [
        { name: "ホーム", url: "/" },
        ...headerNavLinks.map(link => ({ name: link.label, url: link.href }))
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/80">
            <SiteNavigationSchema items={navItems} />
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* ロゴ */}
                <Link href="/" className="group flex items-center space-x-2">
                    <img src={siteConfig.logo} alt={`${siteConfig.name} ロゴ`} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-sm" />
                    <span className="text-xl sm:text-2xl font-bold font-serif text-primary group-hover:opacity-80 transition-all duration-300">
                        {siteConfig.name}
                    </span>
                </Link>

                {/* デスクトップナビ */}
                <nav className="hidden md:flex items-center space-x-1">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* モバイルメニューボタン */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="メニュー"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* モバイルメニュー */}
            {isMenuOpen && (
                <nav className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <div className="container mx-auto px-4 py-4 space-y-1">
                        {headerNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
                    {/* ブランドと説明 */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-bold font-serif text-primary inline-block mb-6">
                            {siteConfig.name}
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-md">
                            {uiStrings.footer.description}
                        </p>
                    </div>

                    {/* ガイドナビゲーション */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
                            {uiStrings.footer.navGuides}
                        </h4>
                        <nav className="flex flex-col gap-4">
                            {footerNavLinks.guides.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-slate-500 hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* リーガル・その他 */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
                            {uiStrings.footer.navSite}
                        </h4>
                        <nav className="flex flex-col gap-4">
                            {footerNavLinks.legal.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-slate-500 hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* 下部エリア */}
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} {siteConfig.name} All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-xs text-slate-400 italic">{uiStrings.footer.tagline}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
