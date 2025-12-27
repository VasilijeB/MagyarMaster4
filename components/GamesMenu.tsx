import React from 'react';
import { GameMode } from '../types';

interface GamesMenuProps {
  onSelectGame: (mode: GameMode) => void;
  onGoBack: () => void;
}

export const GamesMenu: React.FC<GamesMenuProps> = ({ onSelectGame, onGoBack }) => {
  const gamesList = [
    {
      mode: GameMode.GOULASH,
      title: "Kuvanje gulaša",
      desc: "Interaktivna priča o mađarskoj kuhinji. Naučite jezik kroz faze spremanja čuvenog jela.",
      icon: "🍲",
      accent: "bg-orange-500",
      bg: "bg-orange-50",
      text: "text-orange-900"
    }
    // Future games can be added here
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      <button 
        onClick={onGoBack}
        className="mb-8 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors font-medium"
      >
        ← Nazad na početnu
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Igre i Avanture</h1>
        <p className="text-slate-500 text-lg">Učite mađarski kroz igru i pripovedanje.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {gamesList.map((game) => (
          <button
            key={game.mode}
            onClick={() => onSelectGame(game.mode)}
            className={`group p-8 rounded-[2rem] border-2 border-transparent hover:border-slate-200 transition-all text-left flex flex-col h-full bg-white shadow-sm hover:shadow-xl transform hover:-translate-y-1`}
          >
            <div className={`w-20 h-20 ${game.bg} rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner ring-4 ring-white`}>
              {game.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{game.title}</h3>
            <p className="text-slate-500 leading-relaxed mb-8 flex-1">
              {game.desc}
            </p>
            <div className={`inline-flex items-center gap-2 font-bold ${game.text} uppercase tracking-widest text-sm`}>
               Započni igru <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};