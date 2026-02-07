/**
 * 信頼性セクション - 夢占いの信頼性を示す項目
 */
const trustItems = [
    {
        tag: "Data",
        title: "5,000以上のキーワード",
        description: "古今東西の膨大な文献とデータに基づき、あらゆる夢のシンボルを網羅",
    },
    {
        tag: "Psychology",
        title: "心理学的アプローチ",
        description: "ユングやフロイトの深層心理学をベースにした、論理的な夢分析を重視",
    },
    {
        tag: "Updated",
        title: "現代的な解釈",
        description: "AIやSNSなど、現代特有のライフスタイルに合わせた夢の意味を随時更新",
    },
    {
        tag: "Quality",
        title: "多角的な視点",
        description: "スピリチュアルな側面だけでなく、脳科学や健康状態との関連も考慮",
    },
];

export function TrustSignals() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="flex flex-col p-8 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-white bg-primary px-3 py-1 rounded-full shadow-sm">
                                {item.tag}
                            </span>
                            <div className="h-px flex-1 bg-indigo-50 dark:bg-slate-800" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors font-serif">
                            {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
