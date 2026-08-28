import { BarChart3, Zap, Activity, Shield } from 'lucide-react';

export default function StatisticsView() {
  const cards = [
    {
      title: 'Expected Goals (xG)',
      icon: Zap,
      iconClass: 'text-orange-400',
      borderHover: 'hover:border-orange-500/30',
    },
    {
      title: 'Intensitas Pressing (PPDA)',
      icon: Activity,
      iconClass: 'text-amber-400',
      borderHover: 'hover:border-amber-500/30',
    },
    {
      title: 'Peringkat Nirbobol (Clean Sheets)',
      icon: Shield,
      iconClass: 'text-emerald-400',
      borderHover: 'hover:border-emerald-500/30',
    },
  ];

  return (
    <div className="space-y-6 animate-pop">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5 animate-pulse" />
          <span>Pusat Data Taktis</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Statistik Tingkat Lanjut & Metrik Performa Sepak Bola
        </h2>

        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Modul statistik lanjutan sedang dalam tahap pengembangan.
          Data performa akan tersedia pada pembaruan berikutnya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`
                p-5 rounded-3xl
                bg-[#111827]
                border border-white/[0.08]
                space-y-4
                shadow-xl
                ${card.borderHover}
                transition-all duration-300
              `}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="font-extrabold text-white text-sm">
                  {card.title}
                </h3>

                <Icon
                  className={`w-4 h-4 ${card.iconClass}`}
                />
              </div>

              <div className="min-h-[220px] flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                    <BarChart3 className="w-7 h-7 text-slate-500" />
                  </div>

                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-wider">
                    Coming Soon
                  </div>

                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    Data statistik untuk modul ini
                    sedang dipersiapkan.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
