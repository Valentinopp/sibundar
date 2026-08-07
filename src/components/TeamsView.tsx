import type { ComponentType } from 'react';
import { Shield } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  nickname: string;
  played: number;
  points: number;
  avgXg?: number;
  [key: string]: any;
}

interface TeamInfo {
  coach?: string;
  stadium?: string;
  city?: string;
  [key: string]: any;
}

interface TeamsViewProps {
  LIGA1_TEAMS: Team[];
  TEAM_INFO: Record<string, TeamInfo>;
  TeamBadge: ComponentType<{ name: string; size?: string }>;
}

export default function TeamsView({ LIGA1_TEAMS, TEAM_INFO, TeamBadge }: TeamsViewProps) {
  return (
    <div className="space-y-6 animate-pop">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>18 Klub BRI Liga 1</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Direktori Klub Lengkap Musim Ini
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Profil resmi, nama pelatih kepala, stadion kandang, jumlah skuad, dan performa rata-rata xG seluruh 18 klub peserta.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {LIGA1_TEAMS.map((team, idx) => {
          const info = TEAM_INFO[team.name] || {};
          return (
            <div key={team.id} className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <TeamBadge name={team.name} size="md" />
                    <div>
                      <h3 className="font-black text-white text-sm group-hover:text-orange-400 transition-colors">{team.name}</h3>
                      <span className="text-[10px] text-slate-400 font-medium">{team.nickname}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 group-hover:scale-110 transition-transform">
                    #{idx + 1}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/[0.05]">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Pelatih:</span>
                    <span className="font-semibold text-white">{info.coach || 'Head Coach'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Stadion:</span>
                    <span className="font-semibold text-slate-300 truncate max-w-[160px]">{info.stadium || 'Stadion Klub'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Kota Asal:</span>
                    <span className="font-semibold text-slate-300">{info.city || 'Indonesia'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Poin / Laga</span>
                  <span className="font-mono font-extrabold text-white">{team.points} Pts ({team.played} Laga)</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Rerata xG</span>
                  <span className="font-mono font-extrabold text-orange-400">{team.avgXg || '1.45'} xG</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}