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
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
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
                            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary dark:text-foreground/60 dark:hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* モバイルメニューボタン */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
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
                                className="block px-4 py-3 text-base font-medium text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
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
    // サーバーコンポーネントではないため、ここでは定数ベースのリンクを表示
    // 動的なデータが必要な場合は親（layout.tsx）から渡すか、useEffectで取得する
    
    const KANA_ROWS = [
        { id: "あ", label: "あ" }, { id: "か", label: "か" }, { id: "さ", label: "さ" }, { id: "た", label: "た" }, { id: "な", label: "な" },
        { id: "は", label: "は" }, { id: "ま", label: "ま" }, { id: "や", label: "や" }, { id: "ら", label: "ら" }, { id: "わ", label: "わ" },
    ];

    return (
        <footer className="border-t border-border/30 bg-muted/30 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* ブランドと説明 */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="text-2xl font-bold font-serif text-primary inline-block mb-6">
                            {siteConfig.name}
                        </Link>
                        <p className="text-sm text-foreground/60 leading-relaxed mb-8 max-w-md">
                            {uiStrings.footer.description}
                        </p>
                        
                        {/* 五十音索引リンク */}
                        <div className="mb-8">
                            <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-4">
                                五十音で探す
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {KANA_ROWS.map(row => (
                                    <Link
                                        key={row.id}
                                        href={`/keywords#${row.id}`}
                                        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                                    >
                                        {row.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* カテゴリ */}
                    <div>
                        <h4 className="text-sm font-bold text-foreground/90 uppercase tracking-wider mb-6">
                            カテゴリー
                        </h4>
                        <nav className="grid grid-cols-2 gap-y-4 gap-x-2">
                            {[
                                { name: "動物", slug: "動物" },
                                { name: "人物", slug: "人物" },
                                { name: "シチュエーション", slug: "シチュエーション" },
                                { name: "自然・風景", slug: "自然・風景" },
                                { name: "食べ物", slug: "食べ物" },
                                { name: "金運", slug: "金運" },
                                { name: "体・健康", slug: "体・健康" },
                                { name: "感情", slug: "感情" },
                            ].map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/contents/${encodeURIComponent(cat.slug)}`}
                                    className="text-sm text-slate-500 hover:text-primary transition-colors"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* ガイドナビゲーション */}
                    <div>
                        <h4 className="text-sm font-bold text-foreground/90 uppercase tracking-wider mb-6">
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
                        <h4 className="text-sm font-bold text-foreground/90 uppercase tracking-wider mb-6">
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

                {/* 人気キーワード (横並び) */}
                <div className="mt-16 pt-8 border-t border-border/30">
                    <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-6 text-center">
                        注目のキーワード
                    </h4>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                        {[
                            { title: "蛇", cat: "動物", slug: "snake" },
                            { title: "好きな人", cat: "人物", slug: "crush" },
                            { title: "追いかけられる", cat: "シチュエーション", slug: "being-chased" },
                            { title: "火事", cat: "シチュエーション", slug: "fire" },
                            { title: "空を飛ぶ", cat: "動作", slug: "flying" },
                            { title: "犬", cat: "動物", slug: "dog" },
                            { title: "幽霊", cat: "シチュエーション", slug: "ghost" },
                            { title: "トイレ", cat: "建物・家", slug: "toilet" },
                            { title: "結婚", cat: "シチュエーション", slug: "marriage" },
                            { title: "浮気", cat: "シチュエーション", slug: "cheating" },
                        ].map((word) => (
                            <Link
                                key={word.slug}
                                href={`/contents/${encodeURIComponent(word.cat)}/${word.slug}`}
                                className="text-xs text-slate-400 hover:text-primary transition-colors"
                            >
                                #{word.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 下部エリア */}
                <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-foreground/40">
                        © {new Date().getFullYear()} {siteConfig.name} All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-xs text-foreground/40 italic">{uiStrings.footer.tagline}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
