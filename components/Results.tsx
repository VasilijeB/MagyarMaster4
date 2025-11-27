import React, { useState } from 'react';
import { GameResult } from '../types';
import { playPronunciation } from '../services/geminiService';

interface ResultsProps {
  results: GameResult[];
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ results, onRestart }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const correctCount = results.filter(r => r.isCorrect).length;
  const percentage = Math.round((correctCount / results.length) * 100);

  let message = "";
  if (percentage === 100) message = "Savršeno! (Tökéletes!) 🏆";
  else if (percentage >= 80) message = "Odlično! (Nagyon jó!) 🌟";
  else if (percentage >= 50) message = "Nije loše. (Nem rossz.) 👍";
  else message = "Vežba čini majstora. (Gyakorlás teszi a mestert.) 💪";

  const handleAudioClick = async (id: string, text: string) => {
    if (playingId) return;
    setPlayingId(id);
    await playPronunciation(text);
    setPlayingId(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-block p-4 rounded-full bg-slate-100 mb-4 shadow-inner">
          <span className="text-4xl font-bold text-emerald-600">{percentage}%</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{message}</h2>
        <p className="text-slate-500">Imali ste {correctCount} od {results.length} tačnih odgovora.</p>
      </div>

      <div className="space-y-4 mb-12">
        {results.map((result, idx) => (
          <div 
            key={result.card.id}
            className={`flex items-center justify-between p-4 rounded-xl border-l-4 bg-white shadow-sm ${
              result.isCorrect ? 'border-emerald-500' : 'border-rose-500'
            }`}
          >
            <div className="flex-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                {result.card.serbian}
              </div>
              <div className="flex flex-wrap gap-x-2 items-center">
                {result.isCorrect ? (
                   <span className="text-lg font-bold text-slate-800">{result.userAnswer}</span>
                ) : (
                  <>
                     <span className="text-lg font-bold text-rose-600 line-through opacity-70 mr-2">
                       {result.userAnswer || "(prazno)"}
                     </span>
                     <span className="text-lg font-bold text-emerald-600">
                       {result.card.hungarian}
                     </span>
                  </>
                )}
                
                <button
                  onClick={() => handleAudioClick(result.card.id, result.card.hungarian)}
                  disabled={playingId !== null}
                  className={`ml-2 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    playingId === result.card.id 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'text-slate-400 hover:bg-slate-100 hover:text-emerald-600'
                  }`}
                  title="Poslušaj izgovor"
                >
                  {playingId === result.card.id ? (
                    <span className="animate-pulse">🔊</span>
                  ) : (
                    <span>🔊</span>
                  )}
                </button>
              </div>
            </div>
            <div className="ml-4 text-2xl">
              {result.isCorrect ? '✅' : '❌'}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
        >
          Nova igra
        </button>
      </div>
    </div>
  );
};
