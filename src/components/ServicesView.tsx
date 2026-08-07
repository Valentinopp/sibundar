import { FileText, Check, Activity, Sparkles } from 'lucide-react';

interface ServicesViewProps {
  t: any;
  openServiceModal: (serviceType: string) => void;
}

export default function ServicesView({ t, openServiceModal }: ServicesViewProps) {
  return (
    <section className="pt-2 space-y-6 animate-pop">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">{t.services.heading}</h2>
        <p className="text-xs sm:text-sm text-slate-400">{t.services.subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
        {/* Basic Package */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-slate-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full shadow-xl">
          <div className="mb-4">
            <FileText className="w-8 h-8 text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-white">{t.services.pkg1Title}</h3>
            <div className="mt-2 text-2xl font-black text-white">{t.services.pkg1Price}</div>
            <div className="text-[10px] text-slate-500 font-medium">Per Pertandingan</div>
          </div>
          
          <div className="flex-1 space-y-3 my-6">
            {t.services.pkg1Features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          <button onClick={() => openServiceModal('basic')} className="mt-auto w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 active:scale-95 text-white font-bold text-xs transition-all duration-200 cursor-pointer">
            {t.services.btnText}
          </button>
        </div>

        {/* Pro Tactical Package */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-[#111827] border-2 border-orange-500/60 shadow-2xl shadow-orange-500/20 flex flex-col h-full relative transform md:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg animate-pulse">
            Paling Populer
          </div>
          <div className="mb-4 pt-2">
            <Activity className="w-8 h-8 text-orange-400 mb-3" />
            <h3 className="text-lg font-bold text-white">{t.services.pkg2Title}</h3>
            <div className="mt-2 text-2xl font-black text-orange-400">{t.services.pkg2Price}</div>
            <div className="text-[10px] text-slate-400 font-medium">Per Pertandingan</div>
          </div>
          
          <div className="flex-1 space-y-3 my-6">
            {t.services.pkg2Features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 leading-relaxed font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <button onClick={() => openServiceModal('pro')} className="mt-auto w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 text-slate-950 font-extrabold text-xs transition-all duration-200 shadow-lg shadow-orange-500/20 cursor-pointer">
            {t.services.btnText}
          </button>
        </div>

        {/* Elite Scouting Package */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full shadow-xl">
          <div className="mb-4">
            <Sparkles className="w-8 h-8 text-amber-400 mb-3 animate-pulse" />
            <h3 className="text-lg font-bold text-white">{t.services.pkg3Title}</h3>
            <div className="mt-2 text-2xl font-black text-white">{t.services.pkg3Price}</div>
            <div className="text-[10px] text-slate-500 font-medium">Per Pertandingan</div>
          </div>
          
          <div className="flex-1 space-y-3 my-6">
            {t.services.pkg3Features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          <button onClick={() => openServiceModal('elite')} className="mt-auto w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 active:scale-95 text-white font-bold text-xs transition-all duration-200 cursor-pointer">
            {t.services.btnText}
          </button>
        </div>
      </div>
    </section>
  );
}
