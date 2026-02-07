"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // エラーログ出力（本当はSentryなどに送るのがベスト）
        console.error("Global Error:", error);
    }, [error]);

    return (
        <html>
            <body className="antialiased min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center border border-slate-200">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-500 rounded-full mb-6">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                        システムエラーが発生しました
                    </h1>
                    <p className="text-slate-600 mb-6">
                        申し訳ありませんが、予期せぬエラーが発生しました。<br />
                        時間をおいて再度お試しください。
                    </p>

                    {/* 開発環境でのみ詳細を表示 */}
                    {process.env.NODE_ENV === "development" && (
                        <div className="text-left bg-slate-900 text-slate-200 p-4 rounded-lg text-xs font-mono overflow-auto max-h-48 mb-6">
                            <p className="font-bold text-red-400 mb-2">{error.name}: {error.message}</p>
                            <pre>{error.stack}</pre>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => reset()}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all"
                        >
                            再読み込み
                        </button>
                        <Link
                            href="/"
                            className="px-6 py-3 bg-white text-slate-700 border border-slate-300 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            トップページへ
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}
