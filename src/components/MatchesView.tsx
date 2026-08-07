import { Calendar, BarChart3 } from 'lucide-react';
import type { ComponentType } from 'react';

interface MatchRecord {
  id: string;
  pekan: number;
  tanggal: string;
  tim_home: string;
  tim_away: string;
  skor: string;
  stadion: string;
}

interface MatchesViewProps {
  selectedPekan: string;
  setSelectedPekan: (pekan: string) => void;
  searchQuery: string;
  PAST_MATCHES_HISTORY: MatchRecord[];
  normalizeTeamName: (fullName: string) => string;
  TeamBadge: ComponentType<{ name: string; size?: string }>;
  setIsCompareModalOpen: (open: boolean) => void;
}

export default function MatchesView({
  selectedPekan,
  setSelectedPekan,
  searchQuery,
  PAST_MATCHES_HISTORY,
  normalizeTeamName,
  TeamBadge,
  setIsCompareModalOpen,
}: MatchesViewProps) {
  const filteredMatches = PAST_MATCHES_HISTORY.filter((m) => {
    const matchPekan = selectedPekan === 'all' || !selectedPekan ? true : m.pekan === parseInt(selectedPekan, 10);
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !searchQuery ||
      m.tim_home.toLowerCase().includes(q) ||
      m.tim_away.toLowerCase().includes(q) ||
      m.stadion.toLowerCase().includes(q);
    return matchPekan && matchSearch;
  });

  return (
    <div className="space-y-6 animate-pop">
      {/* Header & Filter Pekan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 animate-pulse" />
            <span>Histori Laga Terdaftar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Rekam Hasil & Jadwal Pertandingan
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Hasil skor lengkap seluruh pertandingan BRI Liga 1 berdasarkan pekan dan pencarian.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Filter Pekan:</span>
          <select
            value={selectedPekan || '34'}
            onChange={(e) => setSelectedPekan(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer hover:border-white/20 transition-colors"
          >
            <option value="all">Semua Pekan (1-34)</option>
            {Array.from({ length: 34 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                Pekan {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Kartu Pertandingan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMatches.map((match) => (
          <div
            key={match.id}
            className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3">
              <span className="font-bold text-orange-400">Pekan {match.pekan} • {match.tanggal}</span>
              <span className="text-[11px] text-slate-400 truncate max-w-[140px]">{match.stadion}</span>
            </div>

            <div className="grid grid-cols-3 items-center text-center py-1">
              {/* Tim Home */}
              <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                <TeamBadge name={normalizeTeamName(match.tim_home)} size="md" />
                <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                  {match.tim_home}
                </span>
              </div>

              {/* Skor Laga */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-black text-white tracking-tight px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  {match.skor}
                </div>
              </div>

              {/* Tim Away */}
              <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                <TeamBadge name={normalizeTeamName(match.tim_away)} size="md" />
                <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                  {match.tim_away}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-orange-500 hover:text-slate-950 text-slate-200 text-xs font-extrabold border border-white/10 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Lihat Telemetri Laga</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
