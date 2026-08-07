import React from 'react';

export default function PlayersView({ TOP_PLAYERS }) {
  return (
    <div className="space-y-4 animate-pop">
      <h2 className="text-xl font-bold text-white">Database Pemain & Rating xG</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {TOP_PLAYERS.map((p) => (
          <div key={p.id} className="p-4 rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 text-center space-y-2 group shadow-xl">
            <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-orange-500 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20" />
            <h3 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">{p.name}</h3>
            <p className="text-xs text-slate-400">{p.team} ({p.position})</p>
            <div className="flex justify-center gap-3 text-xs pt-2 border-t border-white/10">
              <span className="text-orange-400 font-bold">{p.goals} Gol</span>
              <span className="text-blue-400 font-bold">{p.assists} Assist</span>
              <span className="text-amber-400 font-bold">{p.rating} Rating</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}