
import React, { useState } from 'react';
import { generateCustomFlashcards } from '../services/geminiService';
import { FlashCard } from '../types';

interface CustomVocabSetupProps {
  onStart: (cards: FlashCard[]) => void;
}

export const CustomVocabSetup: React.FC<CustomVocabSetupProps> = ({ onStart }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const cards = await generateCustomFlashcards(input);
      onStart(cards);
    } catch (e) {
      console.error(e);
      alert("Došlo je do greške pri obradi teksta.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600">Analiziranje reči...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Moji Izrazi</h2>
      <p className="text-slate-600 mb-8">
        Unesite reči ili fraze koje želite da naučite (na srpskom ili mađarskom). 
        Razdvojite ih zarezima ili novim redovima.
      </p>

      <textarea
        className="w-full h-64 p-4 rounded-xl border-2 border-slate-300 bg-white text-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none text-lg transition-all mb-6 placeholder-slate-400"
        placeholder="npr. pas, mačka, kuća, trčati..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={!input.trim()}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Napravi kartice
      </button>
    </div>
  );
};
