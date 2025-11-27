
import React, { useState } from 'react';
import { DifficultyLevel, ConjugationTask } from '../types';
import { generateConjugationTask, playPronunciation } from '../services/geminiService';
import { VirtualKeyboard } from './VirtualKeyboard';

export const ConjugationGame: React.FC = () => {
  const [level, setLevel] = useState<DifficultyLevel | null>(null);
  const [task, setTask] = useState<ConjugationTask | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ en: '', te: '', o: '', mi: '', ti: '', ok: '' });
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [activeField, setActiveField] = useState<keyof typeof inputs>('en');

  const loadTask = async (lvl: DifficultyLevel) => {
    setLoading(true);
    setTask(null);
    setShowResult(false);
    setInputs({ en: '', te: '', o: '', mi: '', ti: '', ok: '' });
    setFeedback({});
    try {
      const newTask = await generateConjugationTask(lvl);
      setTask(newTask);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswers = () => {
    if (!task) return;
    const newFeedback: Record<string, boolean> = {};
    
    // Explicitly define keys as const to ensure strict string literal types
    const keys = ['en', 'te', 'o', 'mi', 'ti', 'ok'] as const;

    keys.forEach(key => {
      const correct = task.forms[key].toLowerCase();
      const user = inputs[key].toLowerCase().trim();
      const isCorrect = correct === user;
      newFeedback[key] = isCorrect;
    });

    setFeedback(newFeedback);
    setShowResult(true);
  };

  const handleCharClick = (char: string) => {
    setInputs(prev => ({
      ...prev,
      [activeField]: prev[activeField] + char
    }));
  };

  if (!level) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">Izaberite nivo konjugacije</h2>
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((l) => (
            <button
              key={l}
              onClick={() => { setLevel(l as DifficultyLevel); loadTask(l as DifficultyLevel); }}
              className="p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all font-bold text-lg"
            >
              Nivo {l}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600">Generisanje glagola...</p>
      </div>
    );
  }

  if (!task) return <div>Greška.</div>;

  const singularPronouns = [
    { key: 'en', label: 'Én (Ja)' },
    { key: 'te', label: 'Te (Ti)' },
    { key: 'o', label: 'Ő (On/Ona)' },
  ];
  
  const pluralPronouns = [
    { key: 'mi', label: 'Mi (Mi)' },
    { key: 'ti', label: 'Ti (Vi)' },
    { key: 'ok', label: 'Ők (Oni)' },
  ];

  const renderInput = (p: { key: string; label: string }) => {
    const key = p.key as keyof typeof inputs;
    const isWrong = showResult && !feedback[key];
    const isCorrect = showResult && feedback[key];
    
    return (
      <div key={key} className="relative">
        <label className="block text-sm font-bold text-slate-500 mb-1 ml-2">{p.label}</label>
        <input
          type="text"
          value={inputs[key]}
          onFocus={() => setActiveField(key)}
          onChange={(e) => setInputs({...inputs, [key]: e.target.value})}
          disabled={showResult}
          className={`w-full p-4 rounded-xl border-2 text-lg font-bold outline-none transition-all
            ${activeField === key ? 'ring-4 ring-emerald-100 border-emerald-500' : 'border-emerald-500'}
            ${!showResult && 'bg-white text-emerald-700'}
            ${isWrong ? 'bg-rose-50 border-rose-300 text-rose-800' : ''}
            ${isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : ''}
          `}
        />
        {showResult && (
          <div className="absolute right-3 top-9">
            {isCorrect ? '✅' : '❌'}
          </div>
        )}
        {isWrong && (
          <div className="text-xs text-rose-600 font-bold mt-1 ml-2">
            Tačno: {task?.forms[key]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
         <button onClick={() => setLevel(null)} className="text-slate-500 hover:text-slate-800">← Promeni nivo</button>
         <span className="font-bold text-emerald-600">Nivo {level}</span>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mb-8 text-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Konjugujte glagol</h2>
        <div className="text-4xl font-bold text-slate-800 mb-2">{task.verbInfinite}</div>
        <p className="text-lg text-slate-500 italic mb-4">{task.translation}</p>
        <button 
           onClick={() => playPronunciation(task.verbInfinite)}
           className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full text-slate-600 font-medium transition-colors"
        >
          🔊 Poslušaj
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
             <h3 className="text-center font-bold text-slate-400 uppercase text-xs tracking-widest mb-4">Jednina (Egyes szám)</h3>
             {singularPronouns.map(renderInput)}
        </div>
        <div className="space-y-4">
             <h3 className="text-center font-bold text-slate-400 uppercase text-xs tracking-widest mb-4">Množina (Többes szám)</h3>
             {pluralPronouns.map(renderInput)}
        </div>
      </div>

      {!showResult ? (
        <div className="text-center">
           <VirtualKeyboard onCharClick={handleCharClick} />
           <button
             onClick={checkAnswers}
             className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 hover:shadow-lg transition-all w-full md:w-auto"
           >
             Proveri odgovore
           </button>
        </div>
      ) : (
        <div className="text-center animate-fade-in-up">
          <button
            onClick={() => loadTask(level)}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-lg"
          >
            Sledeći glagol →
          </button>
        </div>
      )}
    </div>
  );
};
