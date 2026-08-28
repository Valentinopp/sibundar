import { UserRound, Clock3 } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  rating: number;
  avatar: string;
}

interface PlayersViewProps {
  TOP_PLAYERS: Player[];
}

export default function PlayersView({
  TOP_PLAYERS,
}: PlayersViewProps) {
  /*
   * TOP_PLAYERS sengaja tidak digunakan untuk menampilkan
   * identitas pemain karena data pemain belum tersedia.
   *
   * Jumlah card tetap mengikuti jumlah data yang dikirim
   * supaya layout halaman tetap konsisten.
   */
  const cardCount = Math.max(
    TOP_PLAYERS?.length || 0,
    8
  );

  return (
    <div className="space-y-4 animate-pop">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
        <h2 className="text-xl font-bold text-white">
          Database Pemain
        </h2>

        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Data pemain, profil, foto, dan statistik performa
          sedang dalam tahap pengembangan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from(
          { length: cardCount },
          (_, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/30 transition-all duration-300 text-center space-y-3 shadow-xl"
            >
              <div className="w-16 h-16 rounded-full mx-auto bg-slate-900 border-2 border-white/[0.08] flex items-center justify-center">
                <UserRound className="w-7 h-7 text-slate-600" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-wider">
                  <Clock3 className="w-3 h-3" />
                  Coming Soon
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm">
                  Nama Pemain
                </h3>

                <p className="text-xs text-slate-500">
                  Profil pemain segera tersedia
                </p>
              </div>

              <div className="flex justify-center gap-3 text-xs pt-2 border-t border-white/10">
                <span className="text-slate-500 font-bold">
                  0 Gol
                </span>

                <span className="text-slate-500 font-bold">
                  0 Assist
                </span>

                <span className="text-slate-500 font-bold">
                  0 Rating
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
