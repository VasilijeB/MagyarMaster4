import React from 'react';
import { GameResult } from '../types';

interface ResultsProps {
  results: GameResult[];
  onRestart: () => void;
  onPlayAgain: () => void;
}

export const Results: React.FC<ResultsProps> = ({ results, onRestart, onPlayAgain }) => {
  // Calculate score based on total attempts vs correct answers
  // (Assuming results contains all attempts. If we want score based on unique cards, logic would differ, 
  // but usually "Game Score" implies accuracy of inputs)
  const correctCount = results.filter(r => r.isCorrect).length;
  // Prevent division by zero
  const percentage = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  let message = "";
  let subMessage = "";
  let colorClass = "";
  
  if (percentage === 100) {
    message = "Savršeno!";
    subMessage = "Neverovatno znanje! 🏆";
    colorClass = "text-emerald-500";
  } else if (percentage >= 80) {
    message = "Odlično!";
    subMessage = "Samo tako nastavite! 🌟";
    colorClass = "text-emerald-500";
  } else if (percentage >= 50) {
    message = "Dobar posao";
    subMessage = "Imate dobre osnove. 👍";
    colorClass = "text-amber-500";
  } else {
    message = "Vežba čini majstora";
    subMessage = "Ne odustajte! 💪";
    colorClass = "text-slate-500";
  }

  // Deduplicate cards to show a clean vocabulary list
  const uniqueCardsMap = new Map();
  results.forEach(r => {
    if (!uniqueCardsMap.has(r.card.id)) {
      uniqueCardsMap.set(r.card.id, r.card);
    }
  });
  const uniqueCards = Array.from(uniqueCardsMap.values());

  // Conic gradient for the score circle
  const circleStyle = {
    background: `conic-gradient(${percentage >= 50 ? '#10b981' : '#f59e0b'} ${percentage * 3.6}deg, #f1f5f9 0deg)`
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 text-center mb-12">
        
        {/* Score Circle */}
        <div className="relative w-40 h-40 mx-auto mb-8 rounded-full flex items-center justify-center" style={circleStyle}>
          <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
             <span className={`text-4xl font-extrabold ${colorClass}`}>{percentage}%</span>
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Tačno</span>
          </div>
        </div>

        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{message}</h2>
        <p className="text-slate-500 text-lg mb-8 font-medium">{subMessage}</p>
        
        <div className="flex justify-center gap-4 text-sm font-bold">
           <div className="px-6 py-3 rounded-2xl bg-emerald-50 text-emerald-700">
             ✅ {correctCount} Tačnih
           </div>
           <div className="px-6 py-3 rounded-2xl bg-rose-50 text-rose-700">
             ❌ {results.length - correctCount} Netačnih
           </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4 pl-2">Reči iz ove vežbe ({uniqueCards.length})</h3>
      
      <div className="space-y-2 mb-12">
        {uniqueCards.map((card, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-start gap-3 text-left"
          >
             <span className="text-slate-600 font-medium text-lg">{card.serbian}</span>
             <span className="text-slate-300 font-light text-xl">−</span>
             <span className="text-emerald-700 font-bold text-xl">{card.hungarian}</span>
             {card.hungarianAlt && card.hungarianAlt.length > 0 && (
               <span className="text-slate-400 text-sm">({card.hungarianAlt.join(', ')})</span>
             )}
          </div>
        ))}
      </div>

      <div className="text-center sticky bottom-8 flex flex-col md:flex-row gap-4 justify-center items-center pb-8 bg-slate-50/90 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none p-4 rounded-t-2xl md:p-0 md:rounded-none">
        <button
          onClick={onPlayAgain}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 hover:scale-105 transition-all shadow-xl shadow-emerald-900/20 w-full md:w-auto"
        >
          Igraj ponovo isti nivo ↻
        </button>
        <button
          onClick={onRestart}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20 w-full md:w-auto"
        >
          Nova igra
        </button>
      </div>
    </div>
  );
};