
import React, { useState } from 'react';
import { DifficultyLevel, StoryTask } from '../types';
import { generateStoryTask, evaluateStoryTranslation, playPronunciation } from '../services/geminiService';

export const StoryGame: React.FC = () => {
  const [level, setLevel] = useState<DifficultyLevel | null>(null);
  const [task, setTask] = useState<StoryTask | null>(null);
  const [userTranslation, setUserTranslation] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadStory = async (lvl: DifficultyLevel) => {
    setLoading(true);
    setTask(null);
    setUserTranslation('');
    setFeedback(null);
    try {
      const newTask = await generateStoryTask(lvl);
      setTask(newTask);
    } catch (e) {
      console.error(e);
      alert("Greška pri generisanju priče.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async () => {
    if (!task || !userTranslation.trim()) return;
    setLoading(true);
    try {
      const result = await evaluateStoryTranslation(task.hungarianText, userTranslation);
      setFeedback(result);
    } catch (e) {
      setFeedback("Greška pri evaluaciji.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = async () => {
    if (!task || isPlaying) return;
    setIsPlaying(true);
    await playPronunciation(task.hungarianText);
    setIsPlaying(false);
  };

  if (!level) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">Izaberite nivo priče</h2>
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((l) => (
            <button
              key={l}
              onClick={() => { setLevel(l as DifficultyLevel); loadStory(l as DifficultyLevel); }}
              className="p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all font-bold text-lg"
            >
              Nivo {l} {l === 5 ? "(B2)" : ""}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
         <button onClick={() => setLevel(null)} className="text-slate-500 hover:text-slate-800">← Promeni nivo</button>
         <span className="font-bold text-emerald-600">Nivo {level}</span>
      </div>

      {loading && !task && (
         <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600">Generisanje priče...</p>
         </div>
      )}

      {task && (
        <>
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-xl font-bold text-emerald-700">{task.title}</h2>
                <button 
                  onClick={handlePlayAudio}
                  disabled={isPlaying}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold hover:bg-emerald-100 transition-colors disabled:opacity-50"
                >
                  {isPlaying ? (
                    <>
                      <span className="animate-spin">⏳</span> Učitavanje...
                    </>
                  ) : (
                    <>
                      <span>🔊</span> Poslušaj priču
                    </>
                  )}
                </button>
             </div>
             <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-medium">
               {task.hungarianText}
             </p>
           </div>

           <div className="mb-8">
             <label className="block text-slate-500 font-bold mb-2">Vaš prevod na srpski:</label>
             <textarea
               value={userTranslation}
               onChange={(e) => setUserTranslation(e.target.value)}
               placeholder="Ovde upišite prevod priče..."
               className="w-full h-40 p-4 rounded-xl border-2 border-slate-300 bg-white text-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-base md:text-lg"
               disabled={!!feedback}
             />
             {!feedback && (
                <button
                  onClick={handleCheck}
                  disabled={loading || !userTranslation.trim()}
                  className="mt-4 w-full md:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 hover:shadow-lg disabled:opacity-50 transition-all"
                >
                  {loading ? "Proveravam..." : "Proveri Prevod"}
                </button>
             )}
           </div>

           {feedback && (
             <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 animate-fade-in-up">
               <h3 className="font-bold text-blue-900 mb-4 text-lg">Evaluacija AI Instruktora:</h3>
               <div className="prose text-blue-800 whitespace-pre-wrap mb-6">
                 {feedback}
               </div>
               
               <div className="bg-white/50 p-4 rounded-lg mb-6">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">Referentni prevod:</p>
                 <p className="text-slate-700 italic">{task.serbianTranslation}</p>
               </div>

               <button
                 onClick={() => loadStory(level)}
                 className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all"
               >
                 Sledeća Priča →
               </button>
             </div>
           )}
        </>
      )}
    </div>
  );
};
