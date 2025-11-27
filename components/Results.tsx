import React from 'react';
import { GameResult } from '../types';

interface ResultsProps {
  results: GameResult[];
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ results, onRestart }) => {
  const correctCount = results.filter(r => r.isCorrect).length;
  const percentage = Math.round((correctCount / results.length) * 100);

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

      <h3 className="text-xl font-bold text-slate-800 mb-6 pl-4">Pregled Odgovora</h3>
      
      <div className="space-y-4 mb-12">
        {results.map((result, idx) => (
          <div 
            key={idx}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white shadow-sm border border-slate-100 transition-all hover:shadow-md ${
              !result.isCorrect ? 'bg-rose-50/30' : ''
            }`}
          >
            <div className="flex-1 mb-2 sm:mb-0">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">
                {result.card.serbian}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                {result.isCorrect ? (
                   <span className="text-xl font-bold text-slate-800">{result.userAnswer}</span>
                ) : (
                  <>
                     <span className="text-xl font-bold text-rose-500 line-through decoration-2 opacity-60">
                       {result.userAnswer || "..."}
                     </span>
                     <span className="hidden sm:inline text-slate-300">➜</span>
                     <span className="text-xl font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                       {result.card.hungarian}
                     </span>
                  </>
                )}
              </div>
            </div>
            
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm border-2 ${
              result.isCorrect 
                ? 'bg-emerald-100 border-emerald-200 text-emerald-600' 
                : 'bg-rose-100 border-rose-200 text-rose-600'
            }`}>
              {result.isCorrect ? '✓' : '✕'}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center sticky bottom-8">
        <button
          onClick={onRestart}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20"
        >
          Nova igra
        </button>
      </div>
    </div>
  );
};