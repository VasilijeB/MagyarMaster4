
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
      color: "bg-red-50 border-red-200 hover:border-red-400 text-red-900"
    },
    { 
      id: WordCategory.VERBS, 
      label: "Glagoli (Igék)", 
      desc: "Radnje i stanja (Infinitiv).", 
      icon: "🏃",
      color: "bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800"
    },
    { 
      id: WordCategory.ADJECTIVES, 
      label: "Pridevi (Melléknevek)", 
      desc: "Opisi i osobine.", 
      icon: "✨",
      color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400 text-emerald-900"
    },
    { 
      id: WordCategory.NUMBERS, 
      label: "Brojevi (Számok)", 
      desc: "Obični i redni brojevi.", 
      icon: "🔢",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-900"
    },
    { 
      id: WordCategory.ADVERBS, 
      label: "Veznici & Prilozi", 
      desc: "Reči za povezivanje.", 
      icon: "🔗",
      color: "bg-amber-50 border-amber-200 hover:border-amber-400 text-amber-900"
    },
  ];

  const levels: { level: DifficultyLevel; label: string; desc: string; color: string }[] = [
    { level: 1, label: "Nivo 1: Početnik", desc: "Osnove i najčešće reči.", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-900" },
    { level: 2, label: "Nivo 2: Osnovni", desc: "Svakodnevne situacije.", color: "bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-900" },
    { level: 3, label: "Nivo 3: Srednji", desc: "Širi vokabular i opisi.", color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-900" },
    { level: 4, label: "Nivo 4: Napredni (B2)", desc: "Apstraktni pojmovi i društvo.", color: "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-900" },
    { level: 5, label: "Nivo 5: Ekspert (C1)", desc: "Stručni izrazi i složene strukture.", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-900" },
  ];

  if (selectedCategory && selectedLevel) {
    return (
        <div className="max-w-2xl mx-auto px-6 py-8 md:py-12 animate-fade-in">
             <button 
                onClick={() => setSelectedLevel(null)}
                className="mb-6 md:mb-8 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors font-medium"
             >
                ← Nazad na nivoe
             </button>
    
             <div className="text-center mb-8 md:mb-10">
               <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 md:mb-3">Izaberite smer</h2>
               <p className="text-slate-500 text-sm md:text-base">
                 Kako želite da vežbate?
               </p>
             </div>
    
             <div className="space-y-4">
                 <button
                   onClick={() => onSelect(selectedCategory, selectedLevel, FlashCardDirection.SER_HUN)}
                   className="w-full p-6 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-left transition duration-200 ease-out hover:shadow-md hover:bg-emerald-100 text-emerald-900 transform-gpu"
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-lg md:text-xl font-bold">Srpski ➝ Mađarski</h3>
                       <p className="text-xs md:text-sm opacity-80 mt-1">Dobićete reč na srpskom, upišite mađarski prevod.</p>
                     </div>
                     <div className="text-2xl md:text-3xl">🇭🇺</div>
                   </div>
                 </button>

                 <button
                   onClick={() => onSelect(selectedCategory, selectedLevel, FlashCardDirection.HUN_SER)}
                   className="w-full p-6 rounded-xl border-2 border-indigo-200 bg-indigo-50 text-left transition duration-200 ease-out hover:shadow-md hover:bg-indigo-100 text-indigo-900 transform-gpu"
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-lg md:text-xl font-bold">Mađarski ➝ Srpski</h3>
                       <p className="text-xs md:text-sm opacity-80 mt-1">Dobićete reč na mađarskom, upišite srpski prevod.</p>
                     </div>
                     <div className="text-2xl md:text-3xl">🇷🇸</div>
                   </div>
                 </button>
             </div>
        </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8 md:py-12 animate-fade-in">
         <button 
            onClick={() => setSelectedCategory(null)}
            className="mb-6 md:mb-8 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors font-medium"
         >
            ← Nazad na kategorije
         </button>

         <div className="text-center mb-8 md:mb-10">
           <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 md:mb-3">Izaberite težinu</h2>
           <p className="text-slate-500 text-sm md:text-base">
             Izaberite nivo za <span className="font-bold text-slate-800">{categories.find(c => c.id === selectedCategory)?.label}</span>.
           </p>
         </div>

         <div className="space-y-3 md:space-y-4">
           {levels.map((lvl) => (
             <button
               key={lvl.level}
               onClick={() => setSelectedLevel(lvl.level)}
               className={`w-full p-5 md:p-6 rounded-xl border-2 text-left transition duration-200 ease-out hover:shadow-md transform-gpu ${lvl.color}`}
             >
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-lg md:text-xl font-bold">{lvl.label}</h3>
                   <p className="text-xs md:text-sm opacity-80 mt-1">{lvl.desc}</p>
                 </div>
                 <div className="text-xl md:text-2xl font-bold opacity-20">
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
    <div className="max-w-5xl mx-auto px-4 py-4 md:py-12 animate-fade-in min-h-[calc(100vh-100px)] flex flex-col">
      <div className="text-center mb-4 md:mb-12">
        <h1 className="text-2xl md:text-6xl font-bold text-slate-800 mb-1 md:mb-4 tracking-tight">
          Vežbaj <span className="text-emerald-600">reči</span>
        </h1>
        <p className="text-xs md:text-lg text-slate-500 max-w-lg mx-auto leading-tight">
          Izaberite kategoriju.
        </p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 flex-1 content-start">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`group relative p-4 md:p-8 rounded-2xl border-2 text-left transition duration-200 ease-out hover:shadow-xl transform-gpu ${cat.color} flex md:flex-col items-center md:items-start md:justify-center gap-4 md:gap-0`}
          >
            <div className="text-2xl md:text-4xl md:mb-4">
              {cat.icon}
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-bold mb-0.5 md:mb-2 leading-tight">{cat.label}</h3>
              <p className="opacity-80 text-xs md:text-sm font-medium leading-tight">
                {cat.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
      
      {/* Decorative Flag - Positioned to be compact */}
      <div className="mt-4 md:mt-16 flex justify-center opacity-50 pb-4">
        <div className="flex flex-col shadow-sm">
          <div className="w-16 md:w-24 h-1.5 md:h-4 bg-red-600 rounded-t-lg"></div>
          <div className="w-16 md:w-24 h-1.5 md:h-4 bg-white border-x border-slate-100"></div>
          <div className="w-16 md:w-24 h-1.5 md:h-4 bg-emerald-600 rounded-b-lg"></div>
        </div>
      </div>
    </div>
  );
};
