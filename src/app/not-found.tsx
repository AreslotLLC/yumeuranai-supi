"use client";

import Link from "next/link";
import { Home, Search, BookOpen, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                {/* 404アイコン */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 text-primary rounded-full mb-4">
                        <span className="text-4xl font-black">404</span>
                    </div>
                </div>

                {/* メッセージ */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    ページが見つかりませんでした
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    お探しのページは移動または削除された可能性があります。
                    <br />
                    URLをご確認のうえ、再度お試しください。
                </p>

                {/* ナビゲーションリンク */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        トップページへ
                    </Link>
                    <Link
                        href="/guide"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        <BookOpen className="w-4 h-4" />
                        夢占いガイドを見る
                    </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        前のページに戻る
                    </button>
                </div>
            </div>
        </div>
    );
}
