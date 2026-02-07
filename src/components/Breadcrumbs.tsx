import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/siteConfig";

interface BreadcrumbItem {
    name: string;
    path: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

/**
 * パンくずコンポーネント
 * - UI表示と構造化データを同時に出力
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
    // 構造化データ用に絶対URLを生成
    const schemaItems = items.map((item) => ({
        name: item.name,
        url: `${siteConfig.baseUrl}${item.path}`,
    }));

    return (
        <>
            {/* 構造化データ */}
            <BreadcrumbSchema items={schemaItems} />

            {/* UI表示 */}
            <nav
                aria-label="パンくずリスト"
                className="py-4 px-4 sm:px-6 lg:px-8"
            >
                <ol className="container mx-auto flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    {items.map((item, index) => (
                        <li key={item.path} className="flex items-center gap-2">
                            {index > 0 && (
                                <span className="text-slate-300 dark:text-slate-600">
                                    /
                                </span>
                            )}
                            {index === items.length - 1 ? (
                                <span className="text-slate-700 dark:text-slate-300 font-medium">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.path}
                                    className="hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
