
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
      title: "Vežbaj reči",
      desc: "Vežbajte prevod imenica, glagola i prideva",
      icon: "📇",
      color: "text-blue-600",
      bg: "bg-blue-50 group-hover:bg-blue-100",
      border: "hover:border-blue-200"
    },
    {
      mode: GameMode.CONJUGATION,
      title: "Konjugacija",
      desc: "Vežbanje glagolskih oblika",
      icon: "✍️",
      color: "text-rose-600",
      bg: "bg-rose-50 group-hover:bg-rose-100",
      border: "hover:border-rose-200"
    },
    {
      mode: GameMode.STORIES,
      title: "Kratke Priče",
      desc: "Čitanje i prevod",
      icon: "📖",
      color: "text-teal-600",
      bg: "bg-teal-50 group-hover:bg-teal-100",
      border: "hover:border-teal-200"
    },
    {
      mode: GameMode.GRAMMAR,
      title: "Gramatika",
      desc: "Pomoć i objašnjenja",
      icon: "💡",
      color: "text-amber-600",
      bg: "bg-amber-50 group-hover:bg-amber-100",
      border: "hover:border-amber-200"
    },
    {
      mode: GameMode.CUSTOM_VOCAB,
      title: "Moji Izrazi",
      desc: "Vaše reči za vežbu",
      icon: "⭐",
      color: "text-violet-600",
      bg: "bg-violet-50 group-hover:bg-violet-100",
      border: "hover:border-violet-200"
    }
  ];

  const greetingName = user ? toVocative(user.name) : 'Gosti';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 animate-fade-in flex flex-col min-h-[calc(100vh-100px)]">
      {/* Hero Header */}
      <div className="text-center mb-6 md:mb-10">
         <h1 className="text-2xl md:text-5xl font-bold text-slate-900 mb-2">
            Zdravo, <span className="text-emerald-600">{greetingName}</span>! 👋
         </h1>
         <p className="text-slate-500 text-sm md:text-lg">
            Šta želite da učite danas?
         </p>
      </div>

      {/* Vertical List */}
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        {games.map((game, index) => (
          <button
            key={game.mode}
            onClick={() => onSelectMode(game.mode)}
            className={`group w-full p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-200 ease-out hover:shadow-lg flex items-center text-left relative overflow-hidden ${game.border}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon Box */}
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-sm transition-colors duration-300 flex-shrink-0 ${game.bg} ${game.color}`}>
              {game.icon}
            </div>

            {/* Content */}
            <div className="flex-1 ml-4 z-10">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                {game.title}
              </h3>
              
              {/* Description - Hidden by default, reveals on hover (Desktop) / Always visible small (Mobile) */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                 <p className="overflow-hidden text-slate-500 text-sm md:text-base font-medium opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="block pt-1">{game.desc}</span>
                 </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-100 group-hover:text-emerald-500 transition-colors ml-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
