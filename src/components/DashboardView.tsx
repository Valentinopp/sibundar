import type { ComponentType } from 'react';
import { Flame, Play, Zap, Activity, Shield, Users, FileText, Award, ChevronRight } from 'lucide-react';

interface UpcomingMatch {
  [key: string]: any;
}

interface DashboardViewProps {
  t: any;
  handleNavClick: (navId: string) => void;
  openServiceModal: (serviceType: string) => void;
  isLoadingMatches: boolean;
  apiError: string | null;
  upcomingMatches: UpcomingMatch[];
  fetchUpcomingMatches: () => void;
  setSelectedH2HMatch: (match: any) => void;

  LIGA1_TEAMS: any[];
  AnimatedCounter: ComponentType<{ value: string; duration?: number }>;
  Sparkline: ComponentType<{ color?: string; data?: number[] }>;
  TeamBadge: ComponentType<{ name: string; size?: string }>;
  formatMatchDate: (dateStr?: string, timeStr?: string) => string;
}

export default function DashboardView({
  t,
  handleNavClick,
  openServiceModal,
  isLoadingMatches,
  apiError,
  upcomingMatches,
  fetchUpcomingMatches,
  setSelectedH2HMatch,

  LIGA1_TEAMS,
  AnimatedCounter,
  Sparkline,
  TeamBadge,
  formatMatchDate,
}: DashboardViewProps) {
  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-950 border border-white/[0.08] p-5 sm:p-7 md:p-8 overflow-hidden shadow-2xl animate-pop">
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[150%] pointer-events-none opacity-20 transform rotate-12 translate-x-8 animate-float">
          <svg viewBox="0 0 400 260" className="w-full h-full stroke-orange-400 fill-none" strokeWidth="1.5">
            <rect x="10" y="10" width="380" height="240" rx="6" />
            <line x1="200" y1="10" x2="200" y2="250" />
            <circle cx="200" cy="130" r="48" />
            <circle cx="200" cy="130" r="3" fill="#F97316" />
            <rect x="10" y="60" width="60" height="140" />
            <rect x="10" y="95" width="20" height="70" />
            <path d="M 70 105 A 35 35 0 0 1 70 155" />
            <rect x="330" y="60" width="60" height="140" />
            <rect x="370" y="95" width="20" height="70" />
            <path d="M 330 105 A 35 35 0 0 1 330 155" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-3 hover:bg-orange-500/20 transition-colors">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-bounce shrink-0" />
            <span>{t.hero.badge}</span>
          </div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.hero.titleStart}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Sibundar</span>{t.hero.titleEnd}
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button 
              onClick={() => handleNavClick('matches')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center gap-2 group cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950 shrink-0 group-hover:scale-110 transition-transform" />
              <span>{t.hero.exploreMatches}</span>
            </button>
            <button 
              onClick={() => openServiceModal('basic')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white border border-white/10 font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0 group-hover:rotate-12 transition-transform" />
              <span>{t.hero.requestAnalysis}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { title: t.stats.totalMatches, value: '289', change: '+12.4%', sub: t.stats.thisSeason, color: '#F97316', icon: Activity, spark: [30, 45, 55, 60, 75, 80, 95] },
          { title: t.stats.activeClubs, value: '18', change: '100%', sub: t.stats.fullCoverage, color: '#3B82F6', icon: Shield, spark: [18, 18, 18, 18, 18, 18, 18] },
          { title: t.stats.playersTracked, value: '520+', change: '+8.1%', sub: t.stats.scoutingDatabase, color: '#F59E0B', icon: Users, spark: [20, 35, 50, 65, 80, 88, 92] },
          { title: t.stats.analysisRequests, value: '142', change: '+24.5%', sub: t.stats.funAndClubs, color: '#EA580C', icon: FileText, spark: [10, 20, 30, 45, 70, 90, 110] },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="p-3.5 sm:p-5 rounded-2xl bg-[#111827]/90 border border-white/[0.07] backdrop-blur-xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 group shadow-lg cursor-default relative overflow-hidden shimmer-effect">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate pr-1">{card.title}</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 group-hover:border-orange-500/30 transition-all duration-300">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>

              <div className="flex items-end justify-between gap-1">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                    <AnimatedCounter value={card.value} />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                    <span className="text-[9px] sm:text-[11px] font-bold text-orange-400 bg-orange-500/10 px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded border border-orange-500/20">
                      {card.change}
                    </span>
                  </div>
                </div>
                <Sparkline color={card.color} data={card.spark} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="lg:col-span-2 space-y-5 lg:space-y-6">
          {/* Upcoming Matches Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{t.upcoming.title}</h2>
                <p className="text-[10px] sm:text-xs text-slate-400">{t.upcoming.subtitle}</p>
              </div>
            </div>

            {isLoadingMatches ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-4 rounded-2xl bg-[#111827]/90 border border-white/[0.07] animate-pulse space-y-3">
                    <div className="h-3 bg-slate-800/80 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-800/80 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800/80 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : apiError && upcomingMatches.length === 0 ? (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center space-y-2">
                <p className="text-xs text-red-400 font-semibold">Gagal memuat jadwal dari API ({apiError})</p>
                <button 
                  onClick={fetchUpcomingMatches}
                  className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs cursor-pointer active:scale-95 transition-all"
                >
                  Coba Muat Ulang API
                </button>
              </div>
            ) : upcomingMatches.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center text-xs text-slate-400">
                Tidak ada data pertandingan mendatang yang diterima dari API saat ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {upcomingMatches.map((match, idx) => {
                  const homeTeam = match.home_team || match.homeTeam || match.home || match.klub_tuan_rumah || match.team1 || match.host || match.tuan_rumah || 'Tim Home';
                  const awayTeam = match.away_team || match.awayTeam || match.away || match.klub_tamu || match.team2 || match.guest || match.tamu || 'Tim Away';
                  const stadiumName = match.stadium || match.venue || match.stadium_name || match.stadion || match.location || 'Stadion Pertandingan';
                  const matchDate = match.match_date || match.matchDate || match.date || match.tanggal || match.datetime || '';
                  const matchTime = match.match_time || match.matchTime || match.time || match.jam || match.waktu || '';
                  const matchTimeDisplay = formatMatchDate(matchDate, matchTime);
                  const matchCompetition = match.competition || match.league || match.kompetisi || match.liga || t.upcoming.derby;

                  return (
                    <div key={match._id || match.id || idx} className="p-3.5 sm:p-4 rounded-2xl bg-[#111827]/90 border border-white/[0.07] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-lg group">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2.5">
                          <span className="font-medium text-slate-300 truncate max-w-[130px]">{matchTimeDisplay || 'Jadwal API'}</span>
                          <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30 group-hover:scale-105 transition-transform">{matchCompetition}</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <TeamBadge name={homeTeam} size="sm" />
                            <span className="text-xs font-bold text-white truncate group-hover:text-orange-400 transition-colors">{homeTeam}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TeamBadge name={awayTeam} size="sm" />
                            <span className="text-xs font-bold text-white truncate group-hover:text-orange-400 transition-colors">{awayTeam}</span>
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-slate-400">
                          <div className="flex items-center gap-1 truncate">
                            <span className="truncate">{stadiumName}</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedH2HMatch({
                          id: match._id || match.id || `m${idx + 1}`,
                          home: homeTeam,
                          away: awayTeam,
                          stadium: stadiumName,
                          time: matchTimeDisplay
                        })}
                        className="mt-3 w-full py-2 rounded-lg bg-white/[0.05] hover:bg-orange-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-white/[0.08] transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                      >
                        <span>{t.upcoming.viewStats}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Standings Table */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#111827]/90 border border-white/[0.07] p-4 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{t.standings.title}</h2>
                <p className="text-[10px] sm:text-xs text-slate-400">{t.standings.subtitle}</p>
              </div>
              <span className="text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                {t.standings.matchday}
              </span>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
              <table className="w-full text-left text-xs min-w-[620px]">
                <thead>
                  <tr className="border-b border-white/[0.06] text-slate-400 font-semibold uppercase text-[9px] sm:text-[10px] tracking-wider">
                    <th className="pb-2.5 pl-2">{t.standings.pos}</th>
                    <th className="pb-2.5">{t.standings.club}</th>
                    <th className="pb-2.5 text-center">{t.standings.mp}</th>
                    <th className="pb-2.5 text-center">{t.standings.w}</th>
                    <th className="pb-2.5 text-center">{t.standings.d}</th>
                    <th className="pb-2.5 text-center">{t.standings.l}</th>
                    <th className="pb-2.5 text-center">{t.standings.gf}</th>
                    <th className="pb-2.5 text-center">{t.standings.ga}</th>
                    <th className="pb-2.5 text-center">{t.standings.gd}</th>
                    <th className="pb-2.5 text-center">{t.standings.pts}</th>
                    <th className="pb-2.5 text-right pr-2">{t.standings.last5}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {LIGA1_TEAMS.map((team, idx) => (
                    <tr key={team.id} className={`hover:bg-white/[0.05] transition-colors duration-200 group ${team.isRelegation ? 'bg-red-500/[0.02]' : ''}`}>
                      <td className="py-2.5 pl-2 font-mono font-bold text-slate-400">
                        <div className="flex items-center gap-1">
                          <span>{idx + 1}</span>
                          {team.isRelegation && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-ping" />}
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <TeamBadge name={team.name} size="sm" />
                          <span className="font-bold text-white block truncate group-hover:text-orange-400 transition-colors">{team.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-center text-slate-300">{team.played}</td>
                      <td className="py-2.5 text-center text-slate-300">{team.w}</td>
                      <td className="py-2.5 text-center text-slate-300">{team.d}</td>
                      <td className="py-2.5 text-center text-slate-300">{team.l}</td>
                      <td className="py-2.5 text-center font-mono text-slate-400">{team.gf}</td>
                      <td className="py-2.5 text-center font-mono text-slate-400">{team.ga}</td>
                      <td className="py-2.5 text-center font-mono font-bold text-slate-200">{team.gd}</td>
                      <td className="py-2.5 text-center font-mono font-black text-orange-400">{team.points}</td>
                      <td className="py-2.5 text-right pr-2">
                        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                          {team.form.map((res: string, fIdx: number) => (
                            <span key={fIdx} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded text-[8px] font-bold flex items-center justify-center transition-transform hover:scale-125 ${
                              res === 'W' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              res === 'D' ? 'bg-slate-500/20 text-slate-400 border border-slate-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {res}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5 lg:space-y-6">
          {/* Top Players - Coming Soon */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#111827]/90 border border-white/[0.07] p-4 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Top Player
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  Pemain terbaik Liga 1
                </p>
              </div>

              <Award className="w-4 h-4 text-orange-400 shrink-0" />
            </div>

            <div className="min-h-[220px] flex flex-col items-center justify-center text-center rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-orange-400" />
              </div>

              <h3 className="text-sm font-bold text-white">
                Coming Soon
              </h3>

              <p className="mt-1 max-w-[220px] text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                Fitur ranking pemain terbaik akan segera tersedia.
              </p>
            </div>
          </div>

          {/* Tactical Articles - Coming Soon */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#111827]/90 border border-white/[0.07] p-4 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Laporan Taktis
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  Analisis taktis & laporan pertandingan
                </p>
              </div>

              <FileText className="w-4 h-4 text-orange-400 shrink-0" />
            </div>

            <div className="min-h-[220px] flex flex-col items-center justify-center text-center rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>

              <h3 className="text-sm font-bold text-white">
                Coming Soon
              </h3>

              <p className="mt-1 max-w-[220px] text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                Laporan dan analisis taktis mendalam akan segera tersedia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}