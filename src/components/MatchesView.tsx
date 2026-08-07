import { useState, useEffect, type ComponentType } from 'react';
import { Calendar, BarChart3, RefreshCw } from 'lucide-react';

interface MatchRecord {
  id?: string;
  _id?: string;
  pekan?: number;
  week?: number | string;
  tanggal?: string;
  match_date?: string;
  match_time?: string;
  tim_home?: string;
  home_team?: string;
  tim_away?: string;
  away_team?: string;
  skor?: string;
  home_score?: number | null;
  away_score?: number | null;
  stadion?: string;
  stadium?: string;
  status?: string | null;
}

export interface MatchesViewProps {
  selectedPekan?: string;
  setSelectedPekan?: (pekan: string) => void;
  searchQuery: string;
  PAST_MATCHES_HISTORY?: MatchRecord[];
  normalizeTeamName: (fullName: string) => string;
  TeamBadge: ComponentType<{ name: string; size?: string }>;
  setIsCompareModalOpen: (open: boolean) => void;
  formatMatchDate?: (dateStr?: string, timeStr?: string) => string;
}

export default function MatchesView({
  selectedPekan: externalSelectedPekan,
  setSelectedPekan: externalSetSelectedPekan,
  searchQuery,
  normalizeTeamName,
  TeamBadge,
  setIsCompareModalOpen,
  formatMatchDate = (d) => d || '',
}: MatchesViewProps) {
  const [selectedSeason, setSelectedSeason] = useState<string>('2025-26');
  const [internalWeek, setInternalWeek] = useState<string>('34');

  const activeWeek = externalSelectedPekan || internalWeek;

  const handleWeekChange = (w: string) => {
    if (externalSetSelectedPekan) {
      externalSetSelectedPekan(w);
    } else {
      setInternalWeek(w);
    }
  };

  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatchHistory = async (season: string, week: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const targetWeek = week === 'all' ? '1' : week;
      const response = await fetch(
        `https://sibundar-api.vercel.app/match_history?season=${season}&week=${targetWeek}&_t=${Date.now()}`,
        {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Gagal mengambil data histori pertandingan`);
      }

      const data = await response.json();
      let matchData: MatchRecord[] = [];

      if (Array.isArray(data)) {
        matchData = data;
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.matches)) matchData = data.matches;
        else if (Array.isArray(data.data)) matchData = data.data;
        else if (Array.isArray(data.result)) matchData = data.result;
      }

      setMatches(matchData);
    } catch (err: any) {
      console.error('Error fetching match history:', err);
      setError(err.message || 'Gagal terhubung ke API');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchHistory(selectedSeason, activeWeek);
  }, [selectedSeason, activeWeek]);

  const filteredMatches = matches.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const home = (m.home_team || m.tim_home || '').toLowerCase();
    const away = (m.away_team || m.tim_away || '').toLowerCase();
    const stadium = (m.stadium || m.stadion || '').toLowerCase();
    return home.includes(q) || away.includes(q) || stadium.includes(q);
  });

  return (
    <div className="space-y-6 animate-pop">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 animate-pulse" />
            <span>Histori Laga Resmi API</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Rekam Hasil & Jadwal Pertandingan
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Hasil skor lengkap pertandingan BRI Liga 1 dari API berdasarkan Musim dan Pekan.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Musim:</span>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer hover:border-white/20 transition-colors font-semibold"
            >
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Pekan:</span>
            <select
              value={activeWeek}
              onChange={(e) => handleWeekChange(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer hover:border-white/20 transition-colors font-semibold"
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
      </div>

      {/* Grid Content / Loading / Error */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="p-5 rounded-3xl bg-[#111827]/90 border border-white/[0.07] animate-pulse space-y-4">
              <div className="h-4 bg-slate-800 rounded w-1/2"></div>
              <div className="h-12 bg-slate-800 rounded"></div>
              <div className="h-8 bg-slate-800 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center space-y-3">
          <p className="text-xs text-red-400 font-semibold">{error}</p>
          <button
            onClick={() => fetchMatchHistory(selectedSeason, activeWeek)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Lagi</span>
          </button>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="p-8 rounded-3xl bg-[#111827] border border-white/[0.08] text-center text-slate-400 text-xs">
          Tidak ada data pertandingan untuk Musim {selectedSeason} Pekan {activeWeek}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map((match, idx) => {
            const homeTeam = match.home_team || match.tim_home || 'Home Team';
            const awayTeam = match.away_team || match.tim_away || 'Away Team';
            const stadium = match.stadium || match.stadion || 'Stadion TBD';
            const dateDisplay = formatMatchDate(match.match_date || match.tanggal, match.match_time);
            
            let scoreDisplay = match.skor;
            if (!scoreDisplay) {
              const hs = match.home_score !== null && match.home_score !== undefined ? match.home_score : '-';
              const as = match.away_score !== null && match.away_score !== undefined ? match.away_score : '-';
              scoreDisplay = `${hs} : ${as}`;
            }

            return (
              <div
                key={match._id || match.id || `${homeTeam}-${awayTeam}-${idx}`}
                className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3">
                  <span className="font-bold text-orange-400">
                    Pekan {match.week || match.pekan || activeWeek} • {dateDisplay || match.match_date || match.tanggal || '-'}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                    {stadium}
                  </span>
                </div>

                <div className="grid grid-cols-3 items-center text-center py-1">
                  {/* Tim Home */}
                  <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <TeamBadge name={normalizeTeamName(homeTeam)} size="md" />
                    <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                      {homeTeam}
                    </span>
                  </div>

                  {/* Skor & Status */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-white tracking-tight px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      {scoreDisplay}
                    </div>
                    {match.status && (
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                        {match.status}
                      </span>
                    )}
                  </div>

                  {/* Tim Away */}
                  <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <TeamBadge name={normalizeTeamName(awayTeam)} size="md" />
                    <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                      {awayTeam}
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
            );
          })}
        </div>
      )}
    </div>
  );
}