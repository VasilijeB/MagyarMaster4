
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
  
  // Basic heuristics for Serbian Vocative case
  // 1. Ends in vowel usually remains same (Nikola -> Nikola, Marija -> Marija, Marko -> Marko)
  if (['a', 'e', 'i', 'o', 'u'].includes(lastChar)) {
    return n;
  }

  // 2. Specific consonant endings
  if (lastChar === 'k') return n.slice(0, -1) + 'če'; // Vuk -> Vuče
  if (lastChar === 'g') return n.slice(0, -1) + 'že'; // Predrag -> Predraže
  
  // 3. Most male names ending in consonant get 'e'
  // Stefan -> Stefane, Filip -> Filipe
  if (n.toLowerCase().endsWith("ar") && n.length > 3) {
      return n + 'e'; 
  }

  return n + 'e';
};

export const Dashboard: React.FC<DashboardProps> = ({ onSelectMode, user }) => {
  const games = [
    {
      mode: GameMode.VOCAB,
      title: "Kartice Reči",
      desc: "Vežbajte imenice, glagole i prideve.",
      icon: "📇",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800"
    },
    {
      mode: GameMode.CONJUGATION,
      title: "Konjugacija",
      desc: "Vežbajte glagolske oblike (Ja, Ti, On...) kroz različite nivoe.",
      icon: "✍️",
      color: "bg-red-50 hover:bg-red-100 border-red-200 text-red-800"
    },
    {
      mode: GameMode.CUSTOM_VOCAB,
      title: "Moji Izrazi",
      desc: "Unesite svoje reči i napravite personalizovani test.",
      icon: "⭐",
      color: "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800"
    },
    {
      mode: GameMode.STORIES,
      title: "Kratke Priče",
      desc: "Prevedite kratke priče na srpski i proverite razumevanje.",
      icon: "📖",
      color: "bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800"
    },
    {
      mode: GameMode.GRAMMAR,
      title: "Gramatički Pomoćnik",
      desc: "Pitajte bilo šta o mađarskoj gramatici.",
      icon: "💡",
      color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800"
    }
  ];

  const greetingName = user ? toVocative(user.name) : 'Gosti';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-fade-in">
      <div className="mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 tracking-tight text-center">
          Dobrodošli, <span className="text-emerald-600">{greetingName}</span>!
        </h1>
        <p className="text-center text-slate-500 max-w-lg mx-auto text-lg mt-4">
          Izaberite igru i započnite učenje mađarskog jezika.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {games.map((game) => (
          <button
            key={game.mode}
            onClick={() => onSelectMode(game.mode)}
            className={`group p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${game.color}`}
          >
            <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              {game.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{game.title}</h3>
            <p className="opacity-80 font-medium leading-relaxed text-sm md:text-base">
              {game.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
