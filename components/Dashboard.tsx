import React from 'react';
import { GameMode, User } from '../types';

interface DashboardProps {
  onSelectMode: (mode: GameMode) => void;
  user: User | null;
}

const toVocative = (name: string): string => {
  const n = name.trim();
  if (n.length < 2) return n;
  const lastChar = n.slice(-1).toLowerCase();
  if (['a', 'e', 'i', 'o', 'u'].includes(lastChar)) return n;
  if (lastChar === 'k') return n.slice(0, -1) + 'če';
  if (lastChar === 'g') return n.slice(0, -1) + 'že';
  if (n.toLowerCase().endsWith("ar") && n.length > 3) return n + 'e';
  return n + 'e';
};

export const Dashboard: React.FC<DashboardProps> = ({ onSelectMode, user }) => {
  const games = [
    {
      mode: GameMode.VOCAB,
      title: "Kartice Reči",
      desc: "Imenice, glagoli, pridevi",
      icon: "📇",
      gradient: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50",
      delay: "delay-0"
    },
    {
      mode: GameMode.CONJUGATION,
      title: "Konjugacija",
      desc: "Glagolski oblici",
      icon: "✍️",
      gradient: "from-rose-500 to-pink-500",
      bg: "bg-rose-50",
      delay: "delay-75"
    },
    {
      mode: GameMode.STORIES,
      title: "Kratke Priče",
      desc: "Čitanje i prevod",
      icon: "📖",
      gradient: "from-teal-500 to-emerald-500",
      bg: "bg-teal-50",
      delay: "delay-100"
    },
    {
      mode: GameMode.GRAMMAR,
      title: "Gramatika",
      desc: "AI Instruktor",
      icon: "💡",
      gradient: "from-amber-400 to-orange-500",
      bg: "bg-amber-50",
      delay: "delay-150"
    },
    {
      mode: GameMode.CUSTOM_VOCAB,
      title: "Moji Izrazi",
      desc: "Tvoje reči",
      icon: "⭐",
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-50",
      delay: "delay-200"
    }
  ];

  const greetingName = user ? toVocative(user.name) : 'Gosti';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-fade-in">
      {/* Hero Header */}
      <div className="relative mb-16 p-8 md:p-12 rounded-3xl bg-slate-900 text-white overflow-hidden shadow-2xl shadow-slate-200">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Zdravo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{greetingName}</span>! 👋
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            Spremni za učenje? Izaberite modul i nastavite svoj napredak u mađarskom jeziku.
          </p>
        </div>
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
        Dostupni Moduli
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <button
            key={game.mode}
            onClick={() => onSelectMode(game.mode)}
            className={`group relative p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden animate-fade-in-up ${game.delay}`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${game.gradient} opacity-5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${game.bg} group-hover:scale-110 transition-transform duration-300`}>
                {game.icon}
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">
              {game.title}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {game.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};