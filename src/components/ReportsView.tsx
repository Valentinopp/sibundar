import React from 'react';
import { ArrowLeft, Bookmark, Share2, Clock, Zap, CheckCircle2, ChevronRight, BookOpen, ArrowUpRight } from 'lucide-react';

export default function ReportsView({
  selectedArticle,
  setSelectedArticle,
  articleCategory,
  setArticleCategory,
  TACTICAL_ARTICLES,
  handleArticleClick,
}) {
  return (
    <div className="space-y-6">
      {selectedArticle ? (
        <article className="max-w-4xl mx-auto space-y-6 animate-pop">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-bold text-slate-200 border border-white/10 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-orange-400" />
              <span>Kembali ke Laporan Taktis</span>
            </button>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-95" title="Simpan Artikel">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-95" title="Bagikan Artikel">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <header className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedArticle.badgeColor}`}>
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {selectedArticle.readTime}
              </span>
              <span className="text-xs text-slate-500">• {selectedArticle.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {selectedArticle.summary}
            </p>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111827] border border-white/[0.08] my-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-orange-400 font-black text-sm">
                    {selectedArticle.author.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{selectedArticle.author}</div>
                  <div className="text-[11px] text-slate-400">{selectedArticle.role}</div>
                </div>
              </div>

              <span className="text-[10px] uppercase font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                Sibundar Verified Analyst
              </span>
            </div>
          </header>

          {selectedArticle.coverImage && (
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[21/9] group">
              <img 
                src={selectedArticle.coverImage} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-80" />
            </div>
          )}

          {selectedArticle.keyTakeaways && (
            <div className="p-5 rounded-2xl bg-orange-500/[0.06] border border-orange-500/20 space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-extrabold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4 fill-orange-400 animate-pulse" />
                <span>Poin Taktis Utama (Key Takeaways)</span>
              </div>
              <ul className="space-y-2">
                {selectedArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedArticle.sections && selectedArticle.sections.length > 0 && (
            <div className="space-y-6 pt-4 text-slate-200 text-sm leading-relaxed">
              {selectedArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3 bg-[#111827]/60 p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-white/10 transition-colors">
                  <h2 className="text-base sm:text-lg font-bold text-orange-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-orange-500" />
                    <span>{sec.heading}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>
      ) : (
        <div className="space-y-6 animate-pop">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5 animate-pulse" />
                <span>Repository Laporan Taktis</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Pusat Artikel & Analisis Sepak Bola Liga 1
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {['Semua', 'Analisis Tim', 'Metrik & Data', 'Formasi Taktis'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setArticleCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                    articleCategory === cat
                      ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                      : 'bg-white/[0.05] text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TACTICAL_ARTICLES
              .filter(a => articleCategory === 'Semua' || a.category === articleCategory)
              .map((article) => (
                <div 
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="p-5 rounded-3xl bg-[#111827]/90 border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    {article.coverImage && (
                      <div className="rounded-2xl overflow-hidden aspect-video border border-white/5 relative">
                        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className={`absolute top-2 left-2 text-[9px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${article.badgeColor}`}>
                          {article.category}
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-sm font-extrabold text-white group-hover:text-orange-400 transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">{article.author}</span>
                    <span className="text-orange-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Baca Selengkapnya</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}