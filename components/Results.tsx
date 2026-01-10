import React, { useEffect } from 'react';
import { GameResult } from '../types';

interface ResultsProps {
  results: GameResult[];
  onRestart: () => void;
  onPlayAgain: () => void;
  earnedForints?: number;
}

// Celebration sound helper
const playVictorySound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const notes = [
      { f: 523.25, d: 0.1 }, // C5
      { f: 659.25, d: 0.1 }, // E5
      { f: 783.99, d: 0.1 }, // G5
      { f: 1046.50, d: 0.4 } // C6
    ];

    notes.forEach((n, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, now + i * 0.12);
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + n.d + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + n.d + 0.3);
    });
  } catch (e) {
    console.warn("Audio Context unavailable");
  }
};

export const Results: React.FC<ResultsProps> = ({ results, onRestart, onPlayAgain, earnedForints = 0 }) => {
  const correctCount = results.filter(r => r.isCorrect).length;
  const percentage = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  useEffect(() => {
    if (percentage >= 80) {
      playVictorySound();
    }
  }, [percentage]);

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

  const uniqueCardsMap = new Map();
  results.forEach(r => {
    if (!uniqueCardsMap.has(r.card.id)) {
      uniqueCardsMap.set(r.card.id, r.card);
    }
  });
  const uniqueCards = Array.from(uniqueCardsMap.values());

  const circleStyle = {
    background: `conic-gradient(${percentage >= 50 ? '#10b981' : '#f59e0b'} ${percentage * 3.6}deg, #f1f5f9 0deg)`
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 md:py-12 animate-fade-in-up relative">
      {/* Celebration Particles */}
      {percentage >= 80 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-confetti-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                backgroundColor: ['#10b981', '#34d399', '#fcd34d', '#fbbf24'][Math.floor(Math.random() * 4)],
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Action Button: Exclusive "Play Again" focus */}
      <div className="text-center flex flex-col gap-4 justify-center items-center mb-8 relative z-20">
        <button
          onClick={onPlayAgain}
          className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 hover:scale-105 transition-all shadow-2xl shadow-emerald-900/30 w-full md:w-auto border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1"
        >
          Igraj opet isti nivo ↻
        </button>
      </div>

      <div className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 text-center mb-12 transform animate-[victory-entrance_0.6s_ease-out]">
        
        {/* Earnings Display */}
        <div className="inline-flex items-center gap-2 bg-amber-50 px-6 py-2 rounded-full border border-amber-200 mb-6 animate-bounce shadow-sm">
           <span className="text-2xl">🪙</span>
           <span className="font-black text-amber-800 text-xl">+{earnedForints} Ft</span>
        </div>

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

      <h3 className="text-xl font-bold text-slate-800 mb-4 pl-2">Pregled reči iz ove vežbe</h3>
      
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

      <style>{`
        @keyframes confetti-particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes victory-entrance {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-confetti-particle {
          animation: confetti-particle linear forwards;
        }
      `}</style>
    </div>
  );
};