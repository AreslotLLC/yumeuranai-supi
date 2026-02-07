"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface HomeFAQProps {
    questions: FAQItem[];
}

/**
 * ホームページ用FAQセクション（アコーディオン形式）
 */
export function HomeFAQ({ questions }: HomeFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-slate-50/50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-widest mb-4">
                        <HelpCircle className="w-4 h-4" />
                        FAQ
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-serif">
                        よくある質問
                    </h2>
                </div>

                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div 
                            key={index}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 shadow-sm hover:shadow-mystic"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                            >
                                <span className="font-bold text-slate-900 dark:text-white text-lg pr-8">
                                    {item.question}
                                </span>
                                <ChevronDown 
                                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : ""}`} 
                                />
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                <div className="p-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
