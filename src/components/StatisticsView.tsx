import { BarChart3, Zap, Activity, Shield } from 'lucide-react';

export default function StatisticsView() {
  return (
    <div className="space-y-6 animate-pop">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5 animate-pulse" />
          <span>Pusat Data Taktis</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Statistik Tingkat Lanjut & Metrik Performa Liga 1
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Agregasi data expected goals (xG), intensitas pressing (PPDA), serta penguasaan bola sepertiga akhir (Field Tilt) seluruh tim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* xG Leaders */}
        <div className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] space-y-4 shadow-xl hover:border-orange-500/30 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="font-extrabold text-white text-sm">Tim Teratas Expected Goals (xG)</h3>
            <Zap className="w-4 h-4 text-orange-400" />
          </div>
          <div className="space-y-3">
            {[
              { rank: 1, team: 'Borneo FC', xG: '2.05 /laga', total: '69.7 Total xG' },
              { rank: 2, team: 'Persib Bandung', xG: '1.92 /laga', total: '65.2 Total xG' },
              { rank: 3, team: 'Persija Jakarta', xG: '1.81 /laga', total: '61.5 Total xG' },
              { rank: 4, team: 'Persebaya Surabaya', xG: '1.68 /laga', total: '57.1 Total xG' },
              { rank: 5, team: 'Malut United', xG: '1.62 /laga', total: '55.0 Total xG' },
            ].map((t) => (
              <div key={t.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-orange-500/20 hover:scale-[1.02] transition-all duration-200 cursor-default">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-mono font-bold text-xs flex items-center justify-center">{t.rank}</span>
                  <span className="font-bold text-xs text-white">{t.team}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-extrabold text-xs text-orange-400">{t.xG}</div>
                  <div className="text-[10px] text-slate-500">{t.total}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PPDA (Pressing Intensity) */}
        <div className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] space-y-4 shadow-xl hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="font-extrabold text-white text-sm">Intensitas Pressing (PPDA Terbaik)</h3>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="space-y-3">
            {[
              { rank: 1, team: 'Borneo FC', ppda: '8.2', status: 'Sangat Agresif' },
              { rank: 2, team: 'Persib Bandung', ppda: '8.4', status: 'Agresif' },
              { rank: 3, team: 'Persebaya Surabaya', ppda: '9.1', status: 'Tinggi' },
              { rank: 4, team: 'PSM Makassar', ppda: '9.5', status: 'Tinggi' },
              { rank: 5, team: 'Persija Jakarta', ppda: '10.2', status: 'Moderat' },
            ].map((t) => (
              <div key={t.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-amber-500/20 hover:scale-[1.02] transition-all duration-200 cursor-default">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">{t.rank}</span>
                  <span className="font-bold text-xs text-white">{t.team}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-extrabold text-xs text-amber-400">{t.ppda} PPDA</div>
                  <div className="text-[10px] text-slate-500">{t.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Sheets */}
        <div className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] space-y-4 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="font-extrabold text-white text-sm">Peringkat Nirbobol (Clean Sheets)</h3>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-3">
            {[
              { rank: 1, team: 'Persib Bandung', cs: '16 Laga', ratio: '47% Laga' },
              { rank: 2, team: 'Persija Jakarta', cs: '14 Laga', ratio: '41% Laga' },
              { rank: 3, team: 'Borneo FC', cs: '13 Laga', ratio: '38% Laga' },
              { rank: 4, team: 'Persebaya Surabaya', cs: '12 Laga', ratio: '35% Laga' },
              { rank: 5, team: 'Persita Tangerang', cs: '11 Laga', ratio: '32% Laga' },
            ].map((t) => (
              <div key={t.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-200 cursor-default">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">{t.rank}</span>
                  <span className="font-bold text-xs text-white">{t.team}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-extrabold text-xs text-emerald-400">{t.cs}</div>
                  <div className="text-[10px] text-slate-500">{t.ratio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}