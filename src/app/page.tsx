import Image from "next/image";
import Link from "next/link";
import { getGuides, getCategories, getPopularKeywords } from "@/lib/airtable";
import { ArrowRight, Sparkles, Moon, Search, BookOpen, PawPrint, Users, Star, Mountain, Utensils, Heart, Car, Home } from "lucide-react";
import { TrustSignals, SearchSection, HomeFAQ } from "@/components/home";
import { WebSiteSchema, OrganizationSchema, FAQSchema } from "@/components/seo";
import { siteConfig } from "@/lib/siteConfig";
import { uiStrings } from "@/constants/uiStrings";

export const revalidate = 3600;

export default async function HomePage() {
  const BASE_URL = siteConfig.baseUrl;

  const allGuides = await getGuides();
  const featuredGuides = allGuides.slice(0, 3);
  const categories = await getCategories();
  const popularKeywordsData = await getPopularKeywords(8);

  const popularKeywords = popularKeywordsData.map(kw => ({
    title: kw.title,
    slug: kw.slug,
    category: Array.isArray(kw.category) ? kw.category[0] : (kw.category || uiStrings.common.uncategorized)
  }));

  const faqQuestions = uiStrings.home.faq.items;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 構造化データ */}
      <WebSiteSchema
        name={siteConfig.name}
        alternateName={siteConfig.alternateName}
        url={BASE_URL}
        description={siteConfig.description}
        searchUrl={`${BASE_URL}/search`}
      />
      <OrganizationSchema
        name={siteConfig.name}
        url={BASE_URL}
        logo={`${BASE_URL}${siteConfig.logo}`}
      />
      <FAQSchema questions={faqQuestions} />

      {/* ヒーローセクション - 没入感のある神秘的なデザイン */}
      <section className="relative bg-[#020617] py-24 md:py-40 lg:py-48 overflow-hidden">
        {/* ベースとなるノイズテクスチャ */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* ... (グラデーション部分は維持) ... */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-900/30 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/10 blur-[150px] rounded-full" />
        </div>

        {/* ... (星空部分は維持) ... */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full translate-z-0"
              style={{
                top: `${(i * 7.7) % 100}%`,
                left: `${(i * 13.3) % 100}%`,
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                opacity: (i % 5) * 0.1 + 0.1,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* テキストコンテンツ */}
            <div className="lg:col-span-7 xl:col-span-6 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl rounded-full text-xs sm:text-sm font-bold mb-10 border border-white/10 text-accent/90 shadow-2xl">
                <Sparkles className="w-4 h-4" />
                <span className="tracking-[0.2em] uppercase">{uiStrings.home.hero.tagline}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-10 leading-[1.05] tracking-tight font-serif">
                {uiStrings.home.hero.titleLine1}
                <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-primary-foreground drop-shadow-sm">
                  {uiStrings.home.hero.titleLine2}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-300/80 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light whitespace-pre-line">
                {uiStrings.home.hero.description}
              </p>

              {/* クイックツール */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <Link
                  href="/contents"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white font-bold text-xl rounded-2xl shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                >
                  <Search className="w-6 h-6" />
                  {uiStrings.home.hero.ctaSearch}
                </Link>
                <Link
                  href="/guide"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  {uiStrings.home.hero.ctaGuide}
                </Link>
              </div>
              {/* 五十音索引への導線 */}
              <div className="mt-6 flex justify-center lg:justify-start">
                <Link
                  href="/keywords"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  五十音索引で全キーワードを見る <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* イメージエリア */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center relative mt-12 lg:mt-0">
              <div className="relative w-full max-w-2xl aspect-square">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] scale-90" />
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-[80px] scale-75 translate-x-4 translate-y-4" />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full p-4 md:p-8">
                    <Image
                      src="/hero-main.png"
                      alt={uiStrings.home.hero.altHeroMain}
                      fill
                      className="object-contain mix-blend-lighten"
                      style={{
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)'
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 検索セクション (Mystic Aurora) */}
      <SearchSection keywords={popularKeywords} />


      {/* カテゴリから探す */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-12 font-serif">
            {uiStrings.home.categories.title}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {categories.map((cat, idx) => {
              return (
                <Link
                  key={cat.id || idx}
                  href={`/contents/${encodeURIComponent(cat.name)}`}
                  className="group relative p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm hover:shadow-mystic flex flex-col items-center justify-center text-center overflow-hidden min-h-[120px]"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10 font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors font-serif text-lg md:text-xl">
                    {cat.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 注目のガイド記事 */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 font-serif">
                {uiStrings.home.featuredGuides.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {uiStrings.home.featuredGuides.description}
              </p>
            </div>
            <Link href="/guide" className="text-primary font-bold hover:underline flex items-center gap-1">
              {uiStrings.home.featuredGuides.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guide/${guide.slug}`}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-mystic transition-all group block"
              >
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-4">
                  {guide.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {guide.fullTitle || guide.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                  {guide.description}
                </p>
                <div className="flex items-center text-primary font-bold text-sm">
                  {uiStrings.home.featuredGuides.readMore} <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQセクション (Visible) */}
      <HomeFAQ questions={faqQuestions} />

      {/* 信頼性 */}
      <section className="py-20 bg-primary/5 text-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 font-serif">
              {uiStrings.home.trust.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {uiStrings.home.trust.description}
            </p>
          </div>
          <TrustSignals />
        </div>
      </section>
    </div>
  );
}
