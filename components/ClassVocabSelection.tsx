import React from 'react';
import { CLASS_LESSONS } from '../data/classVocabData';
import { FlashCardDirection } from '../types';

interface ClassVocabSelectionProps {
  onSelectLesson: (lessonId: number, direction: FlashCardDirection) => void;
  onGoBack: () => void;
}

export const ClassVocabSelection: React.FC<ClassVocabSelectionProps> = ({ onSelectLesson, onGoBack }) => {
  const [selectedLessonId, setSelectedLessonId] = React.useState<number | null>(null);

  if (selectedLessonId !== null) {
    const lesson = CLASS_LESSONS.find(l => l.id === selectedLessonId);
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
        <button onClick={() => setSelectedLessonId(null)} className="mb-6 text-slate-500 hover:text-slate-800 font-medium">← Nazad na lekcije</button>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{lesson?.title}</h2>
          <p className="text-slate-500">Izaberite smer vežbanja</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => onSelectLesson(selectedLessonId, FlashCardDirection.SER_HUN)}
            className="w-full p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-left hover:bg-emerald-100 transition-all font-bold"
          >
            Srpski ➝ Mađarski
          </button>
          <button
            onClick={() => onSelectLesson(selectedLessonId, FlashCardDirection.HUN_SER)}
            className="w-full p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50 text-left hover:bg-indigo-100 transition-all font-bold"
          >
            Mađarski ➝ Srpski
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in">
      <button onClick={onGoBack} className="mb-6 text-slate-500 hover:text-slate-800 font-medium">← Nazad na početnu</button>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Reči sa časova</h1>
        <p className="text-slate-500">Vežbajte vokabular koji smo radili u grupi.</p>
      </div>

      <div className="grid gap-4">
        {CLASS_LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setSelectedLessonId(lesson.id)}
            className="p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition-all text-left group flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700">{lesson.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{lesson.words.length} reči</p>
            </div>
            <div className="text-2xl opacity-30 group-hover:opacity-100 transition-opacity">📖</div>
          </button>
        ))}
      </div>
    </div>
  );
};
