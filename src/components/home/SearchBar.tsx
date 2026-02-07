"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    placeholder?: string;
    className?: string;
}

/**
 * 検索バーコンポーネント
 * 夢のキーワードを入力して検索するためのコンポーネント
 */
export function SearchBar({
    placeholder = "キーワードを入力（例：蛇、空を飛ぶ）",
    className = "",
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-2xl ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-12 sm:h-14 md:h-16 pl-4 sm:pl-6 pr-20 sm:pr-24 text-sm sm:text-base md:text-lg rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-slate-400 dark:text-white"
                />
                <button
                    type="submit"
                    className="absolute inset-y-1.5 sm:inset-y-2 right-1.5 sm:right-2 px-6 sm:px-8 text-sm sm:text-base bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg"
                >
                    占う
                </button>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
                夢に登場した印象的なキーワードから、その深層心理を読み解きます
            </p>
        </form>
    );
}
