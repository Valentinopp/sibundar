import {
  useState,
  useEffect,
  useRef,
  type ComponentType,
} from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUpRight,
  ArrowDownLeft,
  CircleDot,
  Repeat2,
  Calendar,
  BarChart3,
  RefreshCw,
  X,
} from 'lucide-react';

interface MatchRecord {
  match_id?: string;
  id?: string;
  _id?: string;

  competition?: string;
  season?: string;

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

interface TeamStatistics {
  shots: number;
  shots_on_target: number;
  possession: number;
  passes: number;
  pass_accuracy: number;
  fouls: number;
  yellow_cards: number;
  red_cards: number;
  offsides: number;
  corners: number;
}

interface MatchEvent {
  player: string;
  minute: string;
  team: string;
}

interface SubstitutionEvent {
  player_out: string;
  player_in: string;
  minute: string;
  team: string;
}

interface MatchDetailsResponse {
  match_id: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  status: string;
  statistics: {
    home_team_stats: TeamStatistics;
    away_team_stats: TeamStatistics;
  } | null;
  events: {
    goals: MatchEvent[];
    yellow_cards: MatchEvent[];
    red_cards: MatchEvent[];
    substitutions: SubstitutionEvent[];
  } | null;
}

interface MatchStats {
  shots: [number, number];
  shotsOnTarget: [number, number];
  possession: [number, number];
  passes: [number, number];
  passAccuracy: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  offsides: [number, number];
  corners: [number, number];
}

interface StatRow {
  label: string;
  values: [number, number];
  unit?: string;
  highlightHome?: boolean;
  highlightAway?: boolean;
}

export interface MatchesViewProps {
  selectedPekan?: string;
  setSelectedPekan?: (pekan: string) => void;
  searchQuery: string;
  PAST_MATCHES_HISTORY?: MatchRecord[];
  normalizeTeamName: (fullName: string) => string;
  TeamBadge: ComponentType<{
    name: string;
    size?: string;
  }>;
  formatMatchDate?: (
    dateStr?: string,
    timeStr?: string
  ) => string;
}

// Reuse requests across tab remounts; refresh after one minute.
const weekRequestCache = new Map<string, {
  expiresAt: number;
  request: Promise<MatchRecord[]>;
}>();

export default function MatchesView({
  selectedPekan: externalSelectedPekan,
  setSelectedPekan: externalSetSelectedPekan,
  searchQuery,
  normalizeTeamName,
  TeamBadge,
  formatMatchDate = (dateStr) => {
    if (!dateStr) return '';

    const date = new Date(
      `${dateStr}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
      return dateStr;
    }

    return date.toLocaleDateString(
      'id-ID',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    );
  },
}: MatchesViewProps) {
  /*
   * ============================================================
   * SEASON & WEEK
   * ============================================================
   */
  const [selectedSeason, setSelectedSeason] =
    useState<string>('2026-27');

  const [internalWeek, setInternalWeek] =
    useState<string>('1');

  const [resolvedSeason, setResolvedSeason] = useState<string | null>(null);
  const historyRequestRef = useRef(0);

  const activeWeek =
    externalSetSelectedPekan ? (externalSelectedPekan || internalWeek) : internalWeek;

  /*
   * ============================================================
   * MATCH STATE
   * ============================================================
   */
  const [matches, setMatches] =
    useState<MatchRecord[]>([]);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * ============================================================
   * STATISTICS MODAL STATE
   * ============================================================
   */
  const [
    showMatchStats,
    setShowMatchStats,
  ] = useState(false);

  const [
    selectedMatch,
    setSelectedMatch,
  ] = useState<MatchRecord | null>(null);

  /*
   * Loading khusus statistik.
   */
  const [
    isStatsLoading,
    setIsStatsLoading,
  ] = useState(false);

  /*
   * Error khusus statistik.
   */
  const [
    statsError,
    setStatsError,
  ] = useState<string | null>(null);

  /*
   * Data statistik pertandingan dari API.
   */
  const [
    matchStatistics,
    setMatchStatistics,
  ] =
    useState<MatchDetailsResponse | null>(
      null
    );

  const detailsRequestRef = useRef<AbortController | null>(null);

  useEffect(() => () => detailsRequestRef.current?.abort(), []);

  /*
   * ============================================================
   * GET MATCHES PER WEEK
   * ============================================================
   */
  const getWeekMatches = (
    season: string,
    week: number
  ): Promise<MatchRecord[]> => {
    const key = `${season}:${week}`;
    const cached = weekRequestCache.get(key);
    if (cached && cached.expiresAt > Date.now()) return cached.request;
    const entry = {
      expiresAt: Infinity,
      request: Promise.resolve([] as MatchRecord[]),
    };
    entry.request = (async () => {
      try {
        const response = await fetch(
          `https://sibundar-api.vercel.app/usr/match/match_history?season=${encodeURIComponent(season)}&week=${week}`,
          { cache: 'no-store' }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}: Gagal mengambil Pekan ${week}`);
        const data = await response.json();
        const result = Array.isArray(data) ? data : data?.matches ?? data?.data ?? data?.result;
        if (!Array.isArray(result)) throw new Error('Format daftar pertandingan tidak valid.');
        entry.expiresAt = Date.now() + 60_000;
        return result as MatchRecord[];
      } catch (err) {
        if (weekRequestCache.get(key) === entry) weekRequestCache.delete(key);
        throw err;
      }
    })();
    weekRequestCache.set(key, entry);
    return entry.request;
  };

  const getLatestWeekForSeason = async (season: string): Promise<string> => {
    // Existing API requires a week. Reuse these same results for the chosen week.
    const results = await Promise.all(
      Array.from({ length: 34 }, (_, index) => getWeekMatches(season, index + 1))
    );
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());
    let latestWeek = 0;
    results.forEach((weekMatches, index) => {
      const hasStarted = weekMatches.some(match => {
        const date = (match.match_date || match.tanggal || '').slice(0, 10);
        return /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= today;
      });
      if (hasStarted) latestWeek = index + 1;
    });
    // Before the season begins, show its first available match week.
    return String(latestWeek || Math.max(1, results.findIndex(items => items.length > 0) + 1));
  };

  const handleSeasonChange = (season: string) => {
    if (season === selectedSeason) return;
    historyRequestRef.current += 1;
    setResolvedSeason(null);
    setIsLoading(true);
    setError(null);
    setSelectedSeason(season);
  };

  const handleWeekChange = (week: string) => {
    historyRequestRef.current += 1;
    setInternalWeek(week);
    externalSetSelectedPekan?.(week);
  };

  const fetchMatchHistory = async (season: string, week: string) => {
    const requestId = ++historyRequestRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const data = week === 'all'
        ? (await Promise.all(Array.from({ length: 34 }, (_, i) => getWeekMatches(season, i + 1)))).flat()
        : await getWeekMatches(season, Number(week));
      if (requestId === historyRequestRef.current) setMatches(data);
    } catch (err: unknown) {
      if (requestId === historyRequestRef.current) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil daftar pertandingan.');
      }
    } finally {
      if (requestId === historyRequestRef.current) setIsLoading(false);
    }
  };

  const resolveLatestWeek = async (season: string, isCancelled: () => boolean) => {
    const requestId = ++historyRequestRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const latestWeek = await getLatestWeekForSeason(season);
      if (isCancelled() || requestId !== historyRequestRef.current) return;
      setInternalWeek(latestWeek);
      externalSetSelectedPekan?.(latestWeek);
      setResolvedSeason(season);
    } catch (err: unknown) {
      if (isCancelled() || requestId !== historyRequestRef.current) return;
      setError(err instanceof Error ? err.message : 'Gagal menentukan pekan terbaru.');
      setIsLoading(false);
    }
  };

  // GET /usr/match/{match_id}/details
  const fetchMatchDetails = async (match: MatchRecord) => {
    detailsRequestRef.current?.abort();
    const controller = new AbortController();
    detailsRequestRef.current = controller;
    setStatsError(null);
    setMatchStatistics(null);
    setIsStatsLoading(false);

    const matchId = match.match_id || match._id || match.id;
    if (!matchId) {
      setStatsError('ID pertandingan tidak ditemukan.');
      return;
    }

    try {
      setIsStatsLoading(true);
      const response = await fetch(
        `https://sibundar-api.vercel.app/usr/match/${encodeURIComponent(matchId)}/details`,
        { cache: 'no-store', signal: controller.signal }
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Gagal mengambil detail pertandingan`);
      }
      const data = (await response.json()) as MatchDetailsResponse;
      if (
        !data || typeof data.match_id !== 'string' ||
        typeof data.home_team !== 'string' || typeof data.away_team !== 'string' ||
        typeof data.home_score !== 'number' || typeof data.away_score !== 'number' ||
        typeof data.status !== 'string' ||
        (data.statistics != null &&
          (!data.statistics.home_team_stats || !data.statistics.away_team_stats))
      ) {
        throw new Error('Format data detail pertandingan dari API tidak valid.');
      }
      if (controller.signal.aborted) return;
      setMatchStatistics(data);
    } catch (err: unknown) {
      if (controller.signal.aborted) return;
      setStatsError(err instanceof Error ? err.message : 'Gagal mengambil detail pertandingan.');
    } finally {
      if (!controller.signal.aborted) setIsStatsLoading(false);
    }
  };

  /*
   * ============================================================
   * OPEN STATISTICS
   * ============================================================
   */
  const openMatchStatistics = (
    match: MatchRecord
  ) => {
    setSelectedMatch(match);
    setShowMatchStats(true);

    /*
     * Ambil statistik berdasarkan ID
     * pertandingan yang diklik.
     */
    fetchMatchDetails(match);
  };

  /*
   * ============================================================
   * CLOSE STATISTICS
   * ============================================================
   */
  const closeStatistics = () => {
    detailsRequestRef.current?.abort();
    setShowMatchStats(false);
    setSelectedMatch(null);
    setMatchStatistics(null);
    setStatsError(null);
    setIsStatsLoading(false);
  };

  // Resolve the initial week before fetching/rendering the selected list.
  useEffect(() => {
    let cancelled = false;
    setResolvedSeason(null);
    void resolveLatestWeek(selectedSeason, () => cancelled);
    return () => {
      cancelled = true;
      historyRequestRef.current += 1;
    };
  }, [selectedSeason]);

  useEffect(() => {
    if (resolvedSeason !== selectedSeason) return;
    void fetchMatchHistory(selectedSeason, activeWeek);
  }, [selectedSeason, activeWeek, resolvedSeason]);

  /*
   * ============================================================
   * ESCAPE KEY
   * ============================================================
   */
  useEffect(() => {
    if (!showMatchStats) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        closeStatistics();
      }
    };

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [showMatchStats]);

  /*
   * ============================================================
   * LOCK BODY SCROLL
   * ============================================================
   */
  useEffect(() => {
    if (!showMatchStats) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [showMatchStats]);

  /*
   * ============================================================
   * SEARCH FILTER
   * ============================================================
   */
  const filteredMatches =
    matches.filter((match) => {
      if (!searchQuery) {
        return true;
      }

      const query =
        searchQuery.toLowerCase();

      const home = (
        match.home_team ||
        match.tim_home ||
        ''
      ).toLowerCase();

      const away = (
        match.away_team ||
        match.tim_away ||
        ''
      ).toLowerCase();

      const stadium = (
        match.stadium ||
        match.stadion ||
        ''
      ).toLowerCase();

      return (
        home.includes(query) ||
        away.includes(query) ||
        stadium.includes(query)
      );
    });

  /*
   * ============================================================
   * CONVERT API STATISTICS
   * ============================================================
   *
   * API:
   *
   * statistics.home_team_stats
   * statistics.away_team_stats
   *
   * Seluruh 10 statistik API ditampilkan untuk kedua tim.
   */
  const statistics = matchStatistics?.statistics;
  const currentStats: MatchStats | null =
    statistics
      ? {
          shots: [
            statistics
              .home_team_stats.shots,
            statistics
              .away_team_stats.shots,
          ],

          shotsOnTarget: [
            statistics
              .home_team_stats
              .shots_on_target,
            statistics
              .away_team_stats
              .shots_on_target,
          ],

          possession: [
            statistics
              .home_team_stats.possession,
            statistics
              .away_team_stats.possession,
          ],

          passes: [
            statistics.home_team_stats.passes,
            statistics.away_team_stats.passes,
          ],

          passAccuracy: [
            statistics.home_team_stats.pass_accuracy,
            statistics.away_team_stats.pass_accuracy,
          ],

          fouls: [
            statistics
              .home_team_stats.fouls,
            statistics
              .away_team_stats.fouls,
          ],

          yellowCards: [
            statistics
              .home_team_stats
              .yellow_cards,
            statistics
              .away_team_stats
              .yellow_cards,
          ],

          redCards: [
            statistics
              .home_team_stats.red_cards,
            statistics
              .away_team_stats.red_cards,
          ],

          offsides: [
            statistics
              .home_team_stats.offsides,
            statistics
              .away_team_stats.offsides,
          ],

          corners: [
            statistics
              .home_team_stats.corners,
            statistics
              .away_team_stats.corners,
          ],
        }
      : null;

  /*
   * ============================================================
   * STATISTIC ROWS
   * ============================================================
   */
  const statRows: StatRow[] =
    currentStats
      ? [
          {
            label: 'Tembakan',
            values:
              currentStats.shots,
          },
          {
            label: 'Tepat sasaran',
            values:
              currentStats.shotsOnTarget,
          },
          {
            label: 'Penguasaan bola',
            values:
              currentStats.possession,
            unit: '%',
          },
          {
            label: 'Jumlah operan',
            values: currentStats.passes,
          },
          {
            label: 'Akurasi operan',
            values: currentStats.passAccuracy,
            unit: '%',
          },
          {
            label: 'Pelanggaran',
            values:
              currentStats.fouls,
          },
          {
            label: 'Kartu kuning',
            values:
              currentStats.yellowCards,
          },
          {
            label: 'Kartu merah',
            values:
              currentStats.redCards,
          },
          {
            label: 'Offside',
            values:
              currentStats.offsides,
          },
          {
            label: 'Sepak pojok',
            values:
              currentStats.corners,
          },
        ]
      : [];

  /*
   * ============================================================
   * STATISTICS MODAL
   * ============================================================
   */
  const detailMatch = selectedMatch
    ? { ...selectedMatch, ...(matchStatistics ?? {}) }
    : null;
  const homeName = detailMatch?.home_team || detailMatch?.tim_home || 'Home';
  const awayName = detailMatch?.away_team || detailMatch?.tim_away || 'Away';
  const teamKey = (value: string) =>
    value.trim().toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const eventSide = (team: string): 'home' | 'away' | 'unknown' => {
    const key = teamKey(team);
    if (key === 'home' || key === teamKey(homeName)) return 'home';
    if (key === 'away' || key === teamKey(awayName)) return 'away';
    const normalized = teamKey(normalizeTeamName(team));
    const home = normalized === teamKey(normalizeTeamName(homeName));
    const away = normalized === teamKey(normalizeTeamName(awayName));
    return normalized && home !== away ? (home ? 'home' : 'away') : 'unknown';
  };
  type TimelineEvent = {
    kind: 'goal' | 'yellow' | 'red' | 'substitution';
    label: string;
    event: MatchEvent | SubstitutionEvent;
  };
  const timeline: TimelineEvent[] = [
    ...(matchStatistics?.events?.goals ?? []).map(event => ({ kind: 'goal' as const, label: 'Gol', event })),
    ...(matchStatistics?.events?.yellow_cards ?? []).map(event => ({ kind: 'yellow' as const, label: 'Kartu kuning', event })),
    ...(matchStatistics?.events?.red_cards ?? []).map(event => ({ kind: 'red' as const, label: 'Kartu merah', event })),
    ...(matchStatistics?.events?.substitutions ?? []).map(event => ({ kind: 'substitution' as const, label: 'Pergantian', event })),
  ];
  // Sort stoppage time after its base minute and before the following minute.
  const minuteParts = (minute: string) => {
    const match = String(minute).match(/(\d+)(?:\s*\+\s*(\d+))?/);
    return match ? [Number(match[1]), Number(match[2] || 0)] : [Infinity, 0];
  };
  timeline.sort((a, b) => {
    const left = minuteParts(a.event.minute);
    const right = minuteParts(b.event.minute);
    return left[0] - right[0] || left[1] - right[1];
  });


  const matchStatsModal =
    showMatchStats &&
    detailMatch &&
    typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="match-stats-title"
            onClick={closeStatistics}
          >
            {/* BACKDROP */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* MODAL */}
            <div
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111827] border border-white/[0.08] shadow-2xl p-5 sm:p-7 animate-pop"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* CLOSE */}
              <button
                type="button"
                onClick={closeStatistics}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* ==================================================
                  TITLE
              ================================================== */}
              <div className="text-center mb-6 px-8">

                <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                </div>

                <h3
                  id="match-stats-title"
                  className="text-lg sm:text-xl font-extrabold text-white"
                >
                  Detail Pertandingan
                </h3>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">

                  <span className="text-slate-400">
                    {detailMatch.match_date ||
                      detailMatch.tanggal ||
                      '-'}
                  </span>

                  {detailMatch.match_time && (
                    <>
                      <span className="text-slate-600">
                        •
                      </span>

                      <span className="font-bold text-orange-400">
                        {detailMatch.match_time} WIB
                      </span>
                    </>
                  )}

                </div>
              </div>

              {/* ==================================================
                  TEAMS
              ================================================== */}
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 mb-6 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-slate-800/60 to-slate-900/40 px-3 py-6 sm:px-6">

                {/* HOME */}
                <div className="flex flex-col items-center text-center gap-3 min-w-0">

                  <div className="scale-[1.35]">
                    <TeamBadge
                      name={normalizeTeamName(
                        detailMatch.home_team ||
                          detailMatch.tim_home ||
                          'Home Team'
                      )}
                      size="md"
                    />
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-white leading-relaxed max-w-[180px] break-words">
                    {detailMatch.home_team ||
                      detailMatch.tim_home ||
                      'Home Team'}
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-orange-300">Home</span>

                </div>

                {/* SCORE */}
                <div className="flex flex-col items-center justify-center shrink-0">

                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    SKOR
                  </span>

                  <span className="mt-1 text-3xl sm:text-4xl font-black tracking-tight tabular-nums text-white">
                    {detailMatch.home_score ??
                      '-'}
                    {' : '}
                    {detailMatch.away_score ??
                      '-'}
                  </span>

                </div>

                {/* AWAY */}
                <div className="flex flex-col items-center text-center gap-3 min-w-0">

                  <div className="scale-[1.35]">
                    <TeamBadge
                      name={normalizeTeamName(
                        detailMatch.away_team ||
                          detailMatch.tim_away ||
                          'Away Team'
                      )}
                      size="md"
                    />
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-white leading-relaxed max-w-[180px] break-words">
                    {detailMatch.away_team ||
                      detailMatch.tim_away ||
                      'Away Team'}
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-300">Away</span>

                </div>

              </div>

              {!isStatsLoading && !statsError && matchStatistics && (
                <section aria-label="Pencetak gol" className="-mt-3 mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-4 sm:px-6">
                  <div className="flex items-center justify-center gap-2 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><path d="m12 7 4.8 3.5-1.8 5.6H9l-1.8-5.6Z" fill="currentColor" /><path d="M12 7V2.5m4.8 8 4.3-1.4M15 16.1l2.6 3.6M9 16.1l-2.6 3.6m.8-9.2L2.9 9.1" /></svg>
                    Pencetak gol
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    {(['home', 'away'] as const).map(side => {
                      const goals = timeline.filter(item => item.kind === 'goal' && eventSide(item.event.team) === side);
                      return (
                        <div key={side} className={`min-w-0 ${side === 'away' ? 'text-right' : 'text-left'}`}>
                          <span className="sr-only">{side === 'home' ? homeName : awayName}</span>
                          {goals.length > 0 ? (
                            <ul className="space-y-2">
                              {goals.map(({ event }, index) => (
                                <li key={`${event.minute}-${index}`} className={`flex items-baseline gap-2 text-xs sm:text-sm ${side === 'away' ? 'flex-row-reverse' : ''}`}>
                                  <span className={`shrink-0 font-bold tabular-nums ${side === 'home' ? 'text-orange-300' : 'text-sky-300'}`}>
                                    {String(event.minute).trim() ? `${String(event.minute).replace(/['′’]+$/, '')}′` : '—'}
                                  </span>
                                  <span className="min-w-0 font-medium text-slate-200 break-words leading-relaxed">{'player' in event ? event.player : ''}</span>
                                </li>
                              ))}
                            </ul>
                          ) : <p className="text-xs text-slate-500">Belum ada pencetak gol tercatat.</p>}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ==================================================
                  STATISTICS CONTENT
              ================================================== */}
              {isStatsLoading ? (

                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-10 flex flex-col items-center justify-center text-center">

                  <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-orange-400 animate-spin mb-4" />

                  <p className="text-sm font-bold text-white">
                    Memuat detail pertandingan...
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Mengambil statistik dan kejadian pertandingan
                  </p>

                </div>

              ) : statsError ? (

                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center">

                  <div className="mx-auto mb-3 w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-red-400" />
                  </div>

                  <p className="text-sm font-bold text-red-400">
                    Gagal memuat detail pertandingan
                  </p>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {statsError}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      fetchMatchDetails(
                        detailMatch
                      )
                    }
                    className="mt-4 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-extrabold transition-all active:scale-95 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />

                    <span>
                      Coba Lagi
                    </span>
                  </button>

                </div>

              ) : currentStats ? (

                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">

                  {/* ==================================================
                      TABLE HEADER
                  ================================================== */}
                  <div className="grid grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)] items-center px-3 sm:px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">

                    <div className="text-center text-xs font-bold text-white truncate px-2">
                      {detailMatch.home_team ||
                        detailMatch.tim_home ||
                        'Home'}
                    </div>

                    <div className="text-center text-[10px] font-extrabold text-orange-400 uppercase tracking-wider whitespace-nowrap">
                      Statistik
                    </div>

                    <div className="text-center text-xs font-bold text-white truncate px-2">
                      {detailMatch.away_team ||
                        detailMatch.tim_away ||
                        'Away'}
                    </div>

                  </div>

                  {/* ==================================================
                      STATISTIC ROWS
                  ================================================== */}
                  {statRows.map(
                    (stat, index) => (
                      <div
                        key={stat.label}
                        className={[
                          'grid grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)]',
                          'sm:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]',
                          'items-center',
                          'px-3 sm:px-4 py-3',
                          index !==
                            statRows.length - 1
                            ? 'border-b border-white/[0.04]'
                            : '',
                        ].join(' ')}
                      >

                        {/* HOME VALUE */}
                        <div className="flex items-center justify-center min-w-0">
                          <span
                            className={[
                              'inline-flex',
                              'items-center',
                              'justify-center',
                              'min-w-[42px]',
                              'h-7',
                              'px-2',
                              'rounded-lg',
                              'text-xs',
                              'font-bold',
                              'bg-orange-500/10',
                              'text-orange-400',
                            ].join(' ')}
                          >
                            {stat.values[0]}
                            {stat.unit || ''}
                          </span>
                        </div>

                        {/* CENTER LABEL */}
                        <div className="flex items-center justify-center min-w-0 px-2">
                          <span className="text-xs text-slate-300 text-center whitespace-nowrap">
                            {stat.label}
                          </span>
                        </div>

                        {/* AWAY VALUE */}
                        <div className="flex items-center justify-center min-w-0">
                          <span
                            className={[
                              'inline-flex',
                              'items-center',
                              'justify-center',
                              'min-w-[42px]',
                              'h-7',
                              'px-2',
                              'rounded-lg',
                              'text-xs',
                              'font-bold',
                              'bg-white/[0.04]',
                              'text-white',
                            ].join(' ')}
                          >
                            {stat.values[1]}
                            {stat.unit || ''}
                          </span>
                        </div>

                      </div>
                    )
                  )}

                </div>

              ) : (

                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 text-center">

                  <BarChart3 className="w-8 h-8 mx-auto text-slate-600 mb-3" />

                  <p className="text-sm font-bold text-slate-300">
                    Statistik belum tersedia
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Belum ada data statistik untuk pertandingan ini.
                  </p>

                </div>

              )}

              {!isStatsLoading && !statsError && matchStatistics && (
                <section className="mt-8" aria-labelledby="match-timeline-title">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <h4 id="match-timeline-title" className="text-base font-extrabold text-white">Jalannya pertandingan</h4>
                      <p className="text-xs text-slate-400 mt-1">Kejadian diurutkan berdasarkan menit pertandingan.</p>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-medium">
                      <span className="inline-flex items-center gap-1 text-emerald-300"><ArrowUpRight aria-hidden="true" className="w-4 h-4" /> Masuk</span>
                      <span className="inline-flex items-center gap-1 text-rose-300"><ArrowDownLeft aria-hidden="true" className="w-4 h-4" /> Keluar</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/[0.08] bg-slate-950/30 overflow-hidden">
                    <div className="grid grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] items-center gap-2 px-3 sm:px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                      <div className="min-w-0 text-left">
                        <p className="text-[9px] uppercase tracking-widest text-orange-300 mb-1">Home</p>
                        <p className="text-xs font-bold text-white break-words">{homeName}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 text-center">Menit</span>
                      <div className="min-w-0 text-right">
                        <p className="text-[9px] uppercase tracking-widest text-sky-300 mb-1">Away</p>
                        <p className="text-xs font-bold text-white break-words">{awayName}</p>
                      </div>
                    </div>
                    {timeline.length === 0 ? (
                      <div className="px-5 py-10 text-center">
                        <CircleDot aria-hidden="true" className="w-7 h-7 text-slate-600 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-slate-300">Belum ada kejadian tercatat</p>
                        <p className="text-xs text-slate-500 mt-1">Gol, kartu, dan pergantian pemain akan muncul di sini.</p>
                      </div>
                    ) : (
                      <ol className="relative px-3 sm:px-5 py-5 space-y-4">
                        <li aria-hidden="true" className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-white/[0.08] pointer-events-none" />
                        {timeline.map(({ kind, label, event }, index) => {
                          const side = eventSide(event.team);
                          const minute = String(event.minute).replace(/['′’]+$/, '');
                          return (
                            <li key={`${kind}-${event.team}-${event.minute}-${index}`} className="relative grid grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] gap-2 items-start">
                              <span className="col-start-2 row-start-1 z-10 justify-self-center rounded-full border border-white/10 bg-[#111827] px-2 py-1.5 text-[10px] sm:text-xs font-bold tabular-nums text-slate-200 whitespace-nowrap">{minute ? `${minute}′` : '—'}</span>
                              <div className={[
                                'min-w-0 rounded-xl border p-2.5 sm:p-3',
                                side === 'home' ? 'col-start-1 row-start-1 border-orange-400/15 bg-orange-400/[0.04] text-left' :
                                side === 'away' ? 'col-start-3 row-start-1 border-sky-400/15 bg-sky-400/[0.04] text-right' :
                                'col-span-3 row-start-2 z-10 border-white/10 bg-slate-900 text-center',
                              ].join(' ')}>
                                <div className={`flex items-center gap-1.5 mb-2 text-[10px] font-semibold text-slate-400 ${side === 'away' ? 'justify-end' : side === 'unknown' ? 'justify-center' : ''}`}>
                                  {kind === 'goal' ? <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><path d="m12 7 4.8 3.5-1.8 5.6H9l-1.8-5.6Z" fill="currentColor" /><path d="M12 7V2.5m4.8 8 4.3-1.4M15 16.1l2.6 3.6M9 16.1l-2.6 3.6m.8-9.2L2.9 9.1" /></svg> :
                                   kind === 'substitution' ? <Repeat2 aria-hidden="true" className="w-3.5 h-3.5 shrink-0" /> :
                                   <span aria-hidden="true" className={`inline-block w-2.5 h-3.5 rounded-sm shrink-0 ${kind === 'yellow' ? 'bg-amber-300' : 'bg-rose-500'}`} />}
                                  <span>{label}</span>
                                </div>
                                {'player_in' in event ? (
                                  <div className="space-y-2.5">
                                    <div className={`flex items-start gap-1.5 ${side === 'away' ? 'flex-row-reverse' : ''}`}>
                                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                                      <div className="min-w-0"><span className="block text-[9px] uppercase tracking-wide text-emerald-300 mb-0.5">Masuk</span><p className="text-xs sm:text-sm font-semibold text-emerald-200 break-words leading-relaxed">{event.player_in}</p></div>
                                    </div>
                                    <div className={`flex items-start gap-1.5 ${side === 'away' ? 'flex-row-reverse' : ''}`}>
                                      <ArrowDownLeft aria-hidden="true" className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                                      <div className="min-w-0"><span className="block text-[9px] uppercase tracking-wide text-rose-300 mb-0.5">Keluar</span><p className="text-xs sm:text-sm text-rose-200 break-words leading-relaxed">{event.player_out}</p></div>
                                    </div>
                                  </div>
                                ) : <p className="text-xs sm:text-sm font-semibold text-white break-words leading-relaxed">{event.player}</p>}
                                {side === 'unknown' && <p className="text-[10px] text-slate-400 mt-2">{event.team || 'Tim belum diketahui'}</p>}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </div>
                </section>
              )}

              {/* ==================================================
                  STATUS
              ================================================== */}
              {detailMatch.status && (
                <div className="mt-4 text-center">
                  <span className="inline-flex px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase">
                    {detailMatch.status}
                  </span>
                </div>
              )}

              {/* ==================================================
                  CLOSE BUTTON
              ================================================== */}
              <button
                type="button"
                onClick={closeStatistics}
                className="mt-6 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-extrabold transition-all active:scale-95 cursor-pointer"
              >
                Tutup
              </button>

            </div>
          </div>,
          document.body
        )
      : null;

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */
  return (
    <>
      <div className="space-y-6 animate-pop">

        {/* ======================================================
            HEADER
        ======================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">

          <div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">

              <Calendar className="w-3.5 h-3.5 animate-pulse" />

              <span>
                Histori Laga Resmi API
              </span>

            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Rekam Hasil & Jadwal
              Pertandingan
            </h2>

            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Hasil skor lengkap
              pertandingan BRI Liga 1
              dari API berdasarkan
              Musim dan Pekan.
            </p>

          </div>

          {/* ==================================================
              FILTERS
          =================================================== */}
          <div className="flex flex-wrap items-center gap-3">

            {/* SEASON */}
            <div className="flex items-center gap-2">

              <span className="text-xs font-bold text-slate-400">
                Musim:
              </span>

              <select
                value={selectedSeason}
                onChange={(event) =>
                  handleSeasonChange(
                    event.target.value
                  )
                }
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer hover:border-white/20 transition-colors font-semibold"
              >
                <option value="2026-27">
                  2026-27
                </option>

                <option value="2025-26">
                  2025-26
                </option>

                <option value="2024-25">
                  2024-25
                </option>
              </select>

            </div>

            {/* WEEK */}
            <div className="flex items-center gap-2">

              <span className="text-xs font-bold text-slate-400">
                Pekan:
              </span>

              <select
                value={activeWeek}
                disabled={resolvedSeason !== selectedSeason}
                onChange={(event) =>
                  handleWeekChange(
                    event.target.value
                  )
                }
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer hover:border-white/20 transition-colors font-semibold"
              >
                <option value="all">
                  Semua Pekan (1-34)
                </option>

                {Array.from(
                  { length: 34 },
                  (_, index) => (
                    <option
                      key={index + 1}
                      value={String(
                        index + 1
                      )}
                    >
                      Pekan {index + 1}
                    </option>
                  )
                )}
              </select>

            </div>

          </div>
        </div>

        {/* ======================================================
            LOADING
        ======================================================= */}
        {isLoading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {[1, 2, 3, 4, 5, 6].map(
              (number) => (
                <div
                  key={number}
                  className="p-5 rounded-3xl bg-[#111827]/90 border border-white/[0.07] animate-pulse space-y-4"
                >
                  <div className="h-4 bg-slate-800 rounded w-1/2" />

                  <div className="h-12 bg-slate-800 rounded" />

                  <div className="h-8 bg-slate-800 rounded" />
                </div>
              )
            )}

          </div>

        ) : error ? (

          /* ====================================================
             ERROR
          ===================================================== */
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center space-y-3">

            <p className="text-xs text-red-400 font-semibold">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                resolvedSeason !== selectedSeason
                  ? resolveLatestWeek(selectedSeason, () => false)
                  : fetchMatchHistory(selectedSeason, activeWeek)
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />

              <span>
                Coba Lagi
              </span>
            </button>

          </div>

        ) : filteredMatches.length ===
          0 ? (

          /* ====================================================
             EMPTY
          ===================================================== */
          <div className="p-8 rounded-3xl bg-[#111827] border border-white/[0.08] text-center text-slate-400 text-xs">
            Tidak ada data
            pertandingan untuk Musim{' '}
            {selectedSeason} Pekan{' '}
            {activeWeek}.
          </div>

        ) : (

          /* ====================================================
             MATCH GRID
          ===================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {filteredMatches.map(
              (match, index) => {

                const homeTeam =
                  match.home_team ||
                  match.tim_home ||
                  'Home Team';

                const awayTeam =
                  match.away_team ||
                  match.tim_away ||
                  'Away Team';

                const stadium =
                  match.stadium ||
                  match.stadion ||
                  'Stadion TBD';

                const matchDate =
                  match.match_date ||
                  match.tanggal ||
                  '';

                const matchTime =
                  match.match_time ||
                  '';

                const formattedDate =
                  formatMatchDate(
                    matchDate
                  );

                /*
                 * SCORE
                 */
                let scoreDisplay =
                  match.skor;

                if (!scoreDisplay) {
                  const homeScore =
                    match.home_score !==
                      null &&
                    match.home_score !==
                      undefined
                      ? match.home_score
                      : '-';

                  const awayScore =
                    match.away_score !==
                      null &&
                    match.away_score !==
                      undefined
                      ? match.away_score
                      : '-';

                  scoreDisplay =
                    `${homeScore} : ${awayScore}`;
                }

                return (
                  <div
                    key={
                      match.match_id ||
                      match._id ||
                      match.id ||
                      `${homeTeam}-${awayTeam}-${index}`
                    }
                    className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl group flex flex-col justify-between"
                  >

                    {/* ==================================================
                        MATCH HEADER
                    ================================================== */}
                    <div className="flex items-start justify-between gap-3 text-xs border-b border-white/[0.06] pb-3">

                      {/* DATE + TIME */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">

                        <span className="text-slate-300">
                          {formattedDate ||
                            matchDate ||
                            '-'}
                        </span>

                        {matchTime && (
                          <span className="text-slate-600">
                            •
                          </span>
                        )}

                        {matchTime && (
                          <span className="inline-flex items-center gap-1 font-bold text-orange-400">

                            <span>
                              {matchTime}
                            </span>

                            <span className="text-[10px] text-orange-400">
                              WIB
                            </span>

                          </span>
                        )}

                      </div>

                      {/* STADIUM */}
                      <span className="text-[11px] text-slate-400 truncate max-w-[140px] text-right">
                        {stadium}
                      </span>

                    </div>

                    {/* ==================================================
                        TEAMS + SCORE
                    ================================================== */}
                    <div className="grid grid-cols-3 items-center text-center py-1">

                      {/* HOME */}
                      <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">

                        <TeamBadge
                          name={normalizeTeamName(
                            homeTeam
                          )}
                          size="md"
                        />

                        <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                          {homeTeam}
                        </span>

                      </div>

                      {/* SCORE */}
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

                      {/* AWAY */}
                      <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">

                        <TeamBadge
                          name={normalizeTeamName(
                            awayTeam
                          )}
                          size="md"
                        />

                        <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                          {awayTeam}
                        </span>

                      </div>

                    </div>

                    {/* ==================================================
                        STATISTICS BUTTON
                    ================================================== */}
                    <button
                      type="button"
                      onClick={() =>
                        openMatchStatistics(
                          match
                        )
                      }
                      className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-orange-500 hover:text-slate-950 text-slate-200 text-xs font-extrabold border border-white/10 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <BarChart3 className="w-3.5 h-3.5" />

                      <span>
                        Lihat Statistik Laga
                      </span>
                    </button>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

      {/* ========================================================
          STATISTICS MODAL PORTAL
      ========================================================= */}
      {matchStatsModal}
    </>
  );
}
