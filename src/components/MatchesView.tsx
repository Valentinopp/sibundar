import {
  useState,
  useEffect,
  useRef,
  type ComponentType,
} from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar,
  BarChart3,
  RefreshCw,
  X,
} from 'lucide-react';

interface MatchRecord {
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

interface MatchStatisticsResponse {
  match_id: string;
  home_team_stats: TeamStatistics;
  away_team_stats: TeamStatistics;
}

interface MatchStats {
  shots: [number, number];
  shotsOnTarget: [number, number];
  possession: [number, number];
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

  const autoWeekSyncedRef =
    useRef(false);

  const activeWeek =
    externalSelectedPekan || internalWeek;

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
    useState<MatchStatisticsResponse | null>(
      null
    );

  /*
   * ============================================================
   * GET MATCHES PER WEEK
   * ============================================================
   */
  const getWeekMatches = async (
    season: string,
    week: number
  ): Promise<MatchRecord[]> => {
    try {
      const response = await fetch(
        `https://sibundar-api.vercel.app/usr/match/match_history?season=${encodeURIComponent(
          season
        )}&week=${week}&_t=${Date.now()}`,
        {
          cache: 'no-store',
          headers: {
            'Cache-Control':
              'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        }
      );

      if (!response.ok) {
        return [];
      }

      const data =
        await response.json();

      if (Array.isArray(data)) {
        return data;
      }

      if (
        data &&
        typeof data === 'object'
      ) {
        if (Array.isArray(data.matches)) {
          return data.matches;
        }

        if (Array.isArray(data.data)) {
          return data.data;
        }

        if (Array.isArray(data.result)) {
          return data.result;
        }
      }
    } catch (err) {
      console.warn(
        `Gagal mengecek Pekan ${week}:`,
        err
      );
    }

    return [];
  };

  /*
   * ============================================================
   * GET LATEST WEEK
   * ============================================================
   */
  const getLatestWeekForSeason = async (
    season: string
  ): Promise<string> => {
    const today = new Date();

    const weekResults = await Promise.all(
      Array.from(
        { length: 34 },
        (_, index) =>
          getWeekMatches(
            season,
            index + 1
          )
      )
    );

    let latestWeek = 1;

    weekResults.forEach(
      (weekMatches, index) => {
        const weekNumber =
          index + 1;

        const hasStarted =
          weekMatches.some((match) => {
            const dateValue =
              match.match_date ||
              match.tanggal;

            if (!dateValue) {
              return false;
            }

            const matchDate =
              new Date(
                `${dateValue}T00:00:00`
              );

            return (
              !Number.isNaN(
                matchDate.getTime()
              ) &&
              matchDate <= today
            );
          });

        if (hasStarted) {
          latestWeek = Math.max(
            latestWeek,
            weekNumber
          );
        }
      }
    );

    return String(
      Math.min(
        Math.max(latestWeek, 1),
        34
      )
    );
  };

  /*
   * ============================================================
   * SEASON CHANGE
   * ============================================================
   */
  const handleSeasonChange = async (
    season: string
  ) => {
    setSelectedSeason(season);

    const latestWeek =
      await getLatestWeekForSeason(
        season
      );

    if (externalSetSelectedPekan) {
      externalSetSelectedPekan(
        latestWeek
      );
    } else {
      setInternalWeek(latestWeek);
    }
  };

  /*
   * ============================================================
   * WEEK CHANGE
   * ============================================================
   */
  const handleWeekChange = (
    week: string
  ) => {
    if (externalSetSelectedPekan) {
      externalSetSelectedPekan(week);
    } else {
      setInternalWeek(week);
    }
  };

  /*
   * ============================================================
   * FETCH MATCH HISTORY
   * ============================================================
   */
  const fetchMatchHistory = async (
    season: string,
    week: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const targetWeek =
        week === 'all'
          ? '1'
          : week;

      const response = await fetch(
        `https://sibundar-api.vercel.app/usr/match/match_history?season=${encodeURIComponent(
          season
        )}&week=${encodeURIComponent(
          targetWeek
        )}&_t=${Date.now()}`,
        {
          cache: 'no-store',
          headers: {
            'Cache-Control':
              'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Gagal mengambil data histori pertandingan`
        );
      }

      const data =
        await response.json();

      let matchData: MatchRecord[] =
        [];

      if (Array.isArray(data)) {
        matchData = data;
      } else if (
        data &&
        typeof data === 'object'
      ) {
        if (
          Array.isArray(data.matches)
        ) {
          matchData =
            data.matches;
        } else if (
          Array.isArray(data.data)
        ) {
          matchData =
            data.data;
        } else if (
          Array.isArray(data.result)
        ) {
          matchData =
            data.result;
        }
      }

      setMatches(matchData);
    } catch (err: any) {
      console.error(
        'Error fetching match history:',
        err
      );

      setError(
        err?.message ||
          'Gagal terhubung ke API'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /*
   * ============================================================
   * FETCH MATCH STATISTICS
   *
   * Endpoint:
   * /usr/match/statistic/{match_id}
   *
   * match_id diambil langsung dari:
   * selectedMatch._id atau selectedMatch.id
   * ============================================================
   */
  const fetchMatchStatistics = async (
    match: MatchRecord
  ) => {
    const matchId =
      match._id || match.id;

    if (!matchId) {
      setStatsError(
        'ID pertandingan tidak ditemukan.'
      );
      return;
    }

    try {
      setIsStatsLoading(true);
      setStatsError(null);
      setMatchStatistics(null);

      const response = await fetch(
        `https://sibundar-api.vercel.app/usr/match/statistic/${encodeURIComponent(
          matchId
        )}?_t=${Date.now()}`,
        {
          cache: 'no-store',
          headers: {
            'Cache-Control':
              'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Gagal mengambil statistik pertandingan`
        );
      }

      const data =
        (await response.json()) as MatchStatisticsResponse;

      /*
       * Validasi response sederhana agar UI
       * tidak mencoba membaca struktur yang salah.
       */
      if (
        !data ||
        !data.home_team_stats ||
        !data.away_team_stats
      ) {
        throw new Error(
          'Format data statistik dari API tidak valid.'
        );
      }

      setMatchStatistics(data);
    } catch (err: any) {
      console.error(
        'Error fetching match statistics:',
        err
      );

      setStatsError(
        err?.message ||
          'Gagal mengambil statistik pertandingan.'
      );
    } finally {
      setIsStatsLoading(false);
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
    fetchMatchStatistics(match);
  };

  /*
   * ============================================================
   * CLOSE STATISTICS
   * ============================================================
   */
  const closeStatistics = () => {
    setShowMatchStats(false);
    setSelectedMatch(null);
    setMatchStatistics(null);
    setStatsError(null);
    setIsStatsLoading(false);
  };

  /*
   * ============================================================
   * AUTO DETECT LATEST WEEK
   * ============================================================
   */
  useEffect(() => {
    let cancelled = false;

    autoWeekSyncedRef.current =
      false;

    const resolveLatestWeek =
      async () => {
        const latestWeek =
          await getLatestWeekForSeason(
            selectedSeason
          );

        if (
          cancelled ||
          autoWeekSyncedRef.current
        ) {
          return;
        }

        autoWeekSyncedRef.current =
          true;

        if (
          externalSetSelectedPekan
        ) {
          externalSetSelectedPekan(
            latestWeek
          );
        } else {
          setInternalWeek(
            latestWeek
          );
        }
      };

    resolveLatestWeek();

    return () => {
      cancelled = true;
    };
  }, [selectedSeason]);

  /*
   * ============================================================
   * FETCH WHEN SEASON / WEEK CHANGES
   * ============================================================
   */
  useEffect(() => {
    fetchMatchHistory(
      selectedSeason,
      activeWeek
    );
  }, [
    selectedSeason,
    activeWeek,
  ]);

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
   * home_team_stats
   * away_team_stats
   *
   * Passes dan pass_accuracy sengaja
   * tidak dimasukkan ke tabel.
   */
  const currentStats: MatchStats | null =
    matchStatistics
      ? {
          shots: [
            matchStatistics
              .home_team_stats.shots,
            matchStatistics
              .away_team_stats.shots,
          ],

          shotsOnTarget: [
            matchStatistics
              .home_team_stats
              .shots_on_target,
            matchStatistics
              .away_team_stats
              .shots_on_target,
          ],

          possession: [
            matchStatistics
              .home_team_stats.possession,
            matchStatistics
              .away_team_stats.possession,
          ],

          fouls: [
            matchStatistics
              .home_team_stats.fouls,
            matchStatistics
              .away_team_stats.fouls,
          ],

          yellowCards: [
            matchStatistics
              .home_team_stats
              .yellow_cards,
            matchStatistics
              .away_team_stats
              .yellow_cards,
          ],

          redCards: [
            matchStatistics
              .home_team_stats.red_cards,
            matchStatistics
              .away_team_stats.red_cards,
          ],

          offsides: [
            matchStatistics
              .home_team_stats.offsides,
            matchStatistics
              .away_team_stats.offsides,
          ],

          corners: [
            matchStatistics
              .home_team_stats.corners,
            matchStatistics
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
            label: 'Shots',
            values:
              currentStats.shots,
          },
          {
            label: 'Shots on target',
            values:
              currentStats.shotsOnTarget,
          },
          {
            label: 'Possession',
            values:
              currentStats.possession,
            unit: '%',
          },
          {
            label: 'Fouls',
            values:
              currentStats.fouls,
          },
          {
            label: 'Yellow cards',
            values:
              currentStats.yellowCards,
          },
          {
            label: 'Red cards',
            values:
              currentStats.redCards,
          },
          {
            label: 'Offsides',
            values:
              currentStats.offsides,
          },
          {
            label: 'Corners',
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
  const matchStatsModal =
    showMatchStats &&
    selectedMatch &&
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
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111827] border border-white/[0.08] shadow-2xl p-5 sm:p-7 animate-pop"
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
                  Statistik Pertandingan
                </h3>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">

                  <span className="text-slate-400">
                    {selectedMatch.match_date ||
                      selectedMatch.tanggal ||
                      '-'}
                  </span>

                  {selectedMatch.match_time && (
                    <>
                      <span className="text-slate-600">
                        •
                      </span>

                      <span className="font-bold text-orange-400">
                        {selectedMatch.match_time} WIB
                      </span>
                    </>
                  )}

                </div>
              </div>

              {/* ==================================================
                  TEAMS
              ================================================== */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-8">

                {/* HOME */}
                <div className="flex flex-col items-center text-center gap-3 min-w-0">

                  <div className="scale-[1.35]">
                    <TeamBadge
                      name={normalizeTeamName(
                        selectedMatch.home_team ||
                          selectedMatch.tim_home ||
                          'Home Team'
                      )}
                      size="md"
                    />
                  </div>

                  <span className="text-sm font-bold text-white leading-tight max-w-[180px]">
                    {selectedMatch.home_team ||
                      selectedMatch.tim_home ||
                      'Home Team'}
                  </span>

                </div>

                {/* SCORE */}
                <div className="flex flex-col items-center justify-center shrink-0">

                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    VS
                  </span>

                  <span className="mt-1 text-lg font-black text-white">
                    {selectedMatch.home_score ??
                      '-'}
                    {' : '}
                    {selectedMatch.away_score ??
                      '-'}
                  </span>

                </div>

                {/* AWAY */}
                <div className="flex flex-col items-center text-center gap-3 min-w-0">

                  <div className="scale-[1.35]">
                    <TeamBadge
                      name={normalizeTeamName(
                        selectedMatch.away_team ||
                          selectedMatch.tim_away ||
                          'Away Team'
                      )}
                      size="md"
                    />
                  </div>

                  <span className="text-sm font-bold text-white leading-tight max-w-[180px]">
                    {selectedMatch.away_team ||
                      selectedMatch.tim_away ||
                      'Away Team'}
                  </span>

                </div>

              </div>

              {/* ==================================================
                  STATISTICS CONTENT
              ================================================== */}
              {isStatsLoading ? (

                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-10 flex flex-col items-center justify-center text-center">

                  <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-orange-400 animate-spin mb-4" />

                  <p className="text-sm font-bold text-white">
                    Memuat statistik...
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Mengambil data statistik pertandingan
                  </p>

                </div>

              ) : statsError ? (

                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center">

                  <div className="mx-auto mb-3 w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-red-400" />
                  </div>

                  <p className="text-sm font-bold text-red-400">
                    Gagal memuat statistik
                  </p>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {statsError}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      fetchMatchStatistics(
                        selectedMatch
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
                      {selectedMatch.home_team ||
                        selectedMatch.tim_home ||
                        'Home'}
                    </div>

                    <div className="text-center text-[10px] font-extrabold text-orange-400 uppercase tracking-wider whitespace-nowrap">
                      Statistik
                    </div>

                    <div className="text-center text-xs font-bold text-white truncate px-2">
                      {selectedMatch.away_team ||
                        selectedMatch.tim_away ||
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

              {/* ==================================================
                  STATUS
              ================================================== */}
              {selectedMatch.status && (
                <div className="mt-4 text-center">
                  <span className="inline-flex px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase">
                    {selectedMatch.status}
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
                fetchMatchHistory(
                  selectedSeason,
                  activeWeek
                )
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
