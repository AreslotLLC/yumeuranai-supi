import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GuideFooterProps {
  title: React.ReactNode;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export const GuideFooter: React.FC<GuideFooterProps> = ({
  title,
  description,
  buttonText = "キーワードを調べる",
  buttonHref = "/contents",
  className = "bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900",
}) => {
  return (
    <footer className={`mt-32 p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl border border-white/5 ${className}`}>
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="relative z-10">
        <h3 className="text-3xl md:text-5xl font-black mb-10 border-none! p-0 m-0 leading-tight !text-white drop-shadow-sm">
          {title}
        </h3>
        <p className="text-xl !text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-900 font-black rounded-2xl shadow-xl text-lg hover:scale-105 transition-transform"
        >
          {buttonText} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
};
