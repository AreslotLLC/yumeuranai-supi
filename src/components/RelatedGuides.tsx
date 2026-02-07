import Link from "next/link";
import { guidePages } from "@/lib/siteConfig";

interface RelatedGuidesProps {
    /** 現在のページのパスを除外するため */
    currentPath: string;
}

const allGuides = [
    {
        path: guidePages.basics.path,
        title: guidePages.basics.title,
        description: guidePages.basics.description,
    },
    {
        path: guidePages.lucky.path,
        title: guidePages.lucky.title,
        description: guidePages.lucky.description,
    },
    {
        path: guidePages.remember.path,
        title: guidePages.remember.title,
        description: guidePages.remember.description,
    },
    {
        path: guidePages.nightmare.path,
        title: guidePages.nightmare.title,
        description: guidePages.nightmare.description,
    },
    {
        path: guidePages.precognitive.path,
        title: guidePages.precognitive.title,
        description: guidePages.precognitive.description,
    },
];

/**
 * 関連ガイドリンクセクション
 */
export function RelatedGuides({ currentPath }: RelatedGuidesProps) {
    const relatedGuides = allGuides.filter(
        (guide) => guide.path !== currentPath
    );

    return (
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">
                おすすめのガイド記事
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedGuides.map((guide) => (
                    <Link
                        key={guide.path}
                        href={guide.path}
                        className="group relative p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl overflow-hidden"
                    >
                        {/* 装飾用バックグラウンド */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                        
                        <h3 className="relative z-10 font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-3 font-serif">
                            {guide.title}
                        </h3>
                        <p className="relative z-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {guide.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
