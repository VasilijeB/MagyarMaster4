import React, { useState } from 'react';
import { WordCategory, DifficultyLevel, FlashCardDirection } from '../types';

interface CategorySelectionProps {
  onSelect: (category: WordCategory, level: DifficultyLevel, direction: FlashCardDirection) => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);

  const categories = [
    { 
      id: WordCategory.NOUNS, 
      label: "Imenice (Főnevek)", 
      desc: "Predmeti, mesta i stvari.", 
      icon: "📦",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-800"
    },
    { 
      id: WordCategory.VERBS, 
      label: "Glagoli (Igék)", 
      desc: "Radnje i stanja (Infinitiv).", 
      icon: "🏃",
      color: "bg-red-50 border-red-200 hover:border-red-400 text-red-800"
    },
    { 
      id: WordCategory.ADJECTIVES, 
      label: "Pridevi (Melléknevek)", 
      desc: "Opisi i osobine.", 
      icon: "✨",
      color: "bg-amber-50 border-amber-200 hover:border-amber-400 text-amber-800"
    },
  ];

  const levels: { level: DifficultyLevel; label: string; desc: string; color: string }[] = [
    { level: 1, label: "Nivo 1: Apsolutni početnik", desc: "Osnovni A1 rečnik. Reči visoke frekvencije.", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-900" },
    { level: 2, label: "Nivo 2: Početni", desc: "Prelaz A1/A2. Uobičajene svakodnevne reči.", color: "bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-900" },
    { level: 3, label: "Nivo 3: Osnovni", desc: "Nivo A2. Rečnik rutinskog svakodnevnog života.", color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-900" },
    { level: 4, label: "Nivo 4: Srednji", desc: "Nivo B1. Razgovor o poslu i slobodnom vremenu.", color: "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-900" },
    { level: 5, label: "Nivo 5: Viši srednji", desc: "Nivo B2. Složenije teme.", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-900" },
  ];

  if (selectedCategory && selectedLevel) {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
             <button 
                onClick={() => setSelectedLevel(null)}
                className="mb-8 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors font-medium"
             >
                ← Nazad na nivoe
             </button>
    
             <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-slate-800 mb-3">Izaberite smer</h2>
               <p className="text-slate-500">
                 Kako želite da vežbate?
               </p>
             </div>
    
             <div className="space-y-4">
                 <button
                   onClick={() => onSelect(selectedCategory, selectedLevel, FlashCardDirection.SER_HUN)}
                   className="w-full p-6 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:bg-emerald-100 text-emerald-900"
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-xl font-bold">Srpski ➝ Mađarski</h3>
                       <p className="text-sm opacity-80 mt-1">Dobićete reč na srpskom, upišite mađarski prevod.</p>
                     </div>
                     <div className="text-3xl">🇭🇺</div>
                   </div>
                 </button>

                 <button
                   onClick={() => onSelect(selectedCategory, selectedLevel, FlashCardDirection.HUN_SER)}
                   className="w-full p-6 rounded-xl border-2 border-indigo-200 bg-indigo-50 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:bg-indigo-100 text-indigo-900"
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-xl font-bold">Mađarski ➝ Srpski</h3>
                       <p className="text-sm opacity-80 mt-1">Dobićete reč na mađarskom, upišite srpski prevod.</p>
                     </div>
                     <div className="text-3xl">🇷🇸</div>
                   </div>
                 </button>
             </div>
        </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
         <button 
            onClick={() => setSelectedCategory(null)}
            className="mb-8 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors font-medium"
         >
            ← Nazad na kategorije
         </button>

         <div className="text-center mb-10">
           <h2 className="text-3xl font-bold text-slate-800 mb-3">Izaberite težinu</h2>
           <p className="text-slate-500">
             Izaberite nivo za <span className="font-bold text-slate-800">{categories.find(c => c.id === selectedCategory)?.label}</span>.
           </p>
         </div>

         <div className="space-y-4">
           {levels.map((lvl) => (
             <button
               key={lvl.level}
               onClick={() => setSelectedLevel(lvl.level)}
               className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${lvl.color}`}
             >
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-xl font-bold">{lvl.label}</h3>
                   <p className="text-sm opacity-80 mt-1">{lvl.desc}</p>
                 </div>
                 <div className="text-2xl font-bold opacity-20">
                   {lvl.level}
                 </div>
               </div>
             </button>
           ))}
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
          Magyar<span className="text-emerald-600">Master</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">
          Izaberite kategoriju da biste generisali novi set kartica. 
          Usavršite pravopis i rečnik mađarskog jezika.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.color}`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {cat.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{cat.label}</h3>
            <p className="opacity-80 text-sm font-medium leading-relaxed">
              {cat.desc}
            </p>
          </button>
        ))}
      </div>
      
      <div className="mt-16 flex justify-center opacity-50">
        <div className="flex gap-1">
          <div className="w-16 h-2 bg-red-600 rounded-l-full"></div>
          <div className="w-16 h-2 bg-white border border-slate-200"></div>
          <div className="w-16 h-2 bg-emerald-600 rounded-r-full"></div>
        </div>
      </div>
    </div>
  );
};