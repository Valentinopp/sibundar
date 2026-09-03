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
  formatMatchDate = (d) => d || '',
}: MatchesViewProps) {
  const [selectedSeason, setSelectedSeason] =
    useState<string>('2026-27');

  const [internalWeek, setInternalWeek] =
    useState<string>('1');

  // Menandai apakah sinkronisasi pekan otomatis
  // untuk musim aktif sudah dilakukan.
  const autoWeekSyncedRef = useRef(false);

  const activeWeek =
    externalSelectedPekan || internalWeek;

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

      if (!response.ok) return [];

      const data = await response.json();

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

    // Cek seluruh pekan 1-34 secara paralel.
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
        const weekNumber = index + 1;

        // Pekan dianggap sudah dimulai ketika
        // minimal satu pertandingan memiliki
        // tanggal <= hari ini.
        const hasStarted =
          weekMatches.some((match) => {
            const dateValue =
              match.match_date ||
              match.tanggal;

            if (!dateValue) {
              return false;
            }

            const matchDate =
              new Date(dateValue);

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
    w: string
  ) => {
    if (externalSetSelectedPekan) {
      externalSetSelectedPekan(w);
    } else {
      setInternalWeek(w);
    }
  };

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
   * STATISTICS COMING SOON MODAL
   * ============================================================
   */
  const [
    showStatsComingSoon,
    setShowStatsComingSoon,
  ] = useState(false);

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
        `https://sibundar-api.vercel.app/usr/match/match_history?season=${season}&week=${targetWeek}&_t=${Date.now()}`,
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
          matchData = data.data;
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
        err.message ||
          'Gagal terhubung ke API'
      );
    } finally {
      setIsLoading(false);
    }
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
   * ESCAPE KEY FOR MODAL
   * ============================================================
   */
  useEffect(() => {
    if (!showStatsComingSoon) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        setShowStatsComingSoon(
          false
        );
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
  }, [showStatsComingSoon]);

  /*
   * ============================================================
   * LOCK BODY SCROLL WHEN MODAL OPEN
   * ============================================================
   */
  useEffect(() => {
    if (!showStatsComingSoon) {
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
  }, [showStatsComingSoon]);

  /*
   * ============================================================
   * SEARCH FILTER
   * ============================================================
   */
  const filteredMatches =
    matches.filter((m) => {
      if (!searchQuery) {
        return true;
      }

      const q =
        searchQuery.toLowerCase();

      const home = (
        m.home_team ||
        m.tim_home ||
        ''
      ).toLowerCase();

      const away = (
        m.away_team ||
        m.tim_away ||
        ''
      ).toLowerCase();

      const stadium = (
        m.stadium ||
        m.stadion ||
        ''
      ).toLowerCase();

      return (
        home.includes(q) ||
        away.includes(q) ||
        stadium.includes(q)
      );
    });

  /*
   * ============================================================
   * STATISTICS COMING SOON MODAL
   * ============================================================
   *
   * PENTING:
   * Modal dirender menggunakan createPortal ke document.body.
   *
   * Jadi modal tidak lagi mengikuti parent/container,
   * melainkan langsung mengikuti viewport browser.
   * ============================================================
   */
  const statsComingSoonModal =
    showStatsComingSoon &&
    typeof document !==
      'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stats-coming-soon-title"
            onClick={() =>
              setShowStatsComingSoon(
                false
              )
            }
          >
            {/* BACKDROP */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* MODAL */}
            <div
              className="relative z-10 w-full max-w-sm rounded-3xl bg-[#111827] border border-white/[0.08] shadow-2xl p-7 text-center animate-pop"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* CLOSE ICON */}
              <button
                type="button"
                onClick={() =>
                  setShowStatsComingSoon(
                    false
                  )
                }
                className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* ICON */}
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-orange-400" />
              </div>

              {/* TITLE */}
              <h3
                id="stats-coming-soon-title"
                className="text-lg font-extrabold text-white"
              >
                Statistik Laga
              </h3>

              {/* COMING SOON */}
              <p className="mt-2 text-sm font-bold text-orange-400">
                Coming Soon
              </p>

              {/* DESCRIPTION */}
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Fitur statistik lengkap
                pertandingan sedang
                dalam pengembangan.
              </p>

              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setShowStatsComingSoon(
                    false
                  )
                }
                className="mt-6 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-extrabold transition-all active:scale-95 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {/* ========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="space-y-6 animate-pop">

        {/* ======================================================
            HEADER & FILTER
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

          {/* FILTER CONTROLS */}
          <div className="flex flex-wrap items-center gap-3">

            {/* SEASON */}
            <div className="flex items-center gap-2">

              <span className="text-xs font-bold text-slate-400">
                Musim:
              </span>

              <select
                value={selectedSeason}
                onChange={(e) =>
                  handleSeasonChange(
                    e.target.value
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
                onChange={(e) =>
                  handleWeekChange(
                    e.target.value
                  )
                }
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer hover:border-white/20 transition-colors font-semibold"
              >

                <option value="all">
                  Semua Pekan (1-34)
                </option>

                {Array.from(
                  { length: 34 },
                  (_, i) => (
                    <option
                      key={i + 1}
                      value={String(
                        i + 1
                      )}
                    >
                      Pekan {i + 1}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

        </div>

        {/* ======================================================
            GRID / LOADING / ERROR
        ======================================================= */}
        {isLoading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {[1, 2, 3, 4, 5, 6].map(
              (n) => (

                <div
                  key={n}
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

          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center space-y-3">

            <p className="text-xs text-red-400 font-semibold">
              {error}
            </p>

            <button
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

          <div className="p-8 rounded-3xl bg-[#111827] border border-white/[0.08] text-center text-slate-400 text-xs">
            Tidak ada data
            pertandingan untuk Musim{' '}
            {selectedSeason} Pekan{' '}
            {activeWeek}.
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {filteredMatches.map(
              (match, idx) => {

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

                const dateDisplay =
                  formatMatchDate(
                    match.match_date ||
                      match.tanggal,
                    match.match_time
                  );

                let scoreDisplay =
                  match.skor;

                if (!scoreDisplay) {

                  const hs =
                    match.home_score !==
                      null &&
                    match.home_score !==
                      undefined
                      ? match.home_score
                      : '-';

                  const as =
                    match.away_score !==
                      null &&
                    match.away_score !==
                      undefined
                      ? match.away_score
                      : '-';

                  scoreDisplay = `${hs} : ${as}`;
                }

                return (
                  <div
                    key={
                      match._id ||
                      match.id ||
                      `${homeTeam}-${awayTeam}-${idx}`
                    }
                    className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl group flex flex-col justify-between"
                  >

                    {/* MATCH HEADER */}
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3">

                      <span className="font-bold text-orange-400">
                        Pekan{' '}
                        {match.week ||
                          match.pekan ||
                          activeWeek}{' '}
                        •{' '}
                        {dateDisplay ||
                          match.match_date ||
                          match.tanggal ||
                          '-'}
                      </span>

                      <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                        {stadium}
                      </span>

                    </div>

                    {/* TEAMS + SCORE */}
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

                    {/* STATISTICS BUTTON */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowStatsComingSoon(
                          true
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
          PORTAL MODAL
      ========================================================= */}
      {statsComingSoonModal}

    </>
  );
}
