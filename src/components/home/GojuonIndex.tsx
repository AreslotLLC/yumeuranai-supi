import Link from "next/link";

const gojuonRows = [
    { label: "あ行", chars: ["あ", "い", "う", "え", "お"], href: "/index/a" },
    { label: "か行", chars: ["か", "き", "く", "け", "こ"], href: "/index/ka" },
    { label: "さ行", chars: ["さ", "し", "す", "せ", "そ"], href: "/index/sa" },
    { label: "た行", chars: ["た", "ち", "つ", "て", "と"], href: "/index/ta" },
    { label: "な行", chars: ["な", "に", "ぬ", "ね", "の"], href: "/index/na" },
    { label: "は行", chars: ["は", "ひ", "ふ", "へ", "ほ"], href: "/index/ha" },
    { label: "ま行", chars: ["ま", "み", "む", "め", "も"], href: "/index/ma" },
    { label: "や行", chars: ["や", "ゆ", "よ"], href: "/index/ya" },
    { label: "ら行", chars: ["ら", "り", "る", "れ", "ろ"], href: "/index/ra" },
    { label: "わ行", chars: ["わ", "を", "ん"], href: "/index/wa" },
];

/**
 * 50音順インデックス - 改善版
 * - 大きなタップ領域
 * - 明確なホバーアニメーション
 * - 視認性の向上
 */
export function GojuonIndex() {
    return (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {gojuonRows.map((row) => (
                <Link
                    key={row.label}
                    href={row.href}
                    className="group relative inline-flex items-center justify-center min-w-[4.5rem] sm:min-w-[6rem] px-3 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-lg font-bold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary hover:shadow-md transition-all duration-200"
                >
                    {row.label}
                </Link>
            ))}
        </div>
    );
}
