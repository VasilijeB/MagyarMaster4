import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">
            Magyar<span className="text-emerald-600">Master</span>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-200"
          >
            Počni vežbanje
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-10 lg:pt-48 lg:pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-sm uppercase tracking-wide animate-fade-in-up">
            👋 Dobrodošli
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight animate-fade-in-up delay-100">
            Vežbajte mađarske <br className="hidden md:block" />
            <span className="text-emerald-600">
              reči svakog dana.
            </span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-emerald-600 text-white text-lg font-bold rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-200 hover:-translate-y-1 transition-all"
            >
              Kreni sa učenjem
            </button>
          </div>
        </div>
        
        
      </header>

      {/* Features Grid */}
      <section id="features" className="pt-8 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Flashcards */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm">📇</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Vežbaj reči</h3>
                <p className="text-slate-500 leading-relaxed">
                  Vežbajte prevod imenica, glagola, prideva i fraza.
                </p>
            </div>

            {/* Feature 2: Conjugation */}
             <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors text-center">
               <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm">✍️</div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Konjugacija</h3>
               <p className="text-slate-500 leading-relaxed">
                 Vežbajte promene glagola kroz sva lica i vremena.
               </p>
            </div>

            {/* Feature 3: Stories (New) */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors text-center">
               <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm">📖</div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Kratke Priče</h3>
               <p className="text-slate-500 leading-relaxed">
                 Čitajte zanimljive priče prilagođene vašem nivou i vežbajte prevod.
               </p>
            </div>

            {/* Feature 4: Grammar (New) */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors text-center">
               <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm">💡</div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Gramatika</h3>
               <p className="text-slate-500 leading-relaxed">
                 Interaktivna objašnjenja i pomoć oko gramatičkih pravila.
               </p>
            </div>

            {/* Feature 5: Custom */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors text-center">
               <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm">⭐</div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Moji Izrazi</h3>
               <p className="text-slate-500 leading-relaxed">
                 Unesite svoje reči i napravite lični set za vežbu.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 bg-slate-50 text-center border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-slate-800 mb-8">Počnite odmah</h2>
              <button 
                onClick={onStart}
                className="px-10 py-4 bg-slate-900 text-white text-lg font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-300"
              >
                Otvori aplikaciju
              </button>
              <p className="mt-8 text-slate-400 text-sm">
                  © {new Date().getFullYear()} MagyarMaster.
              </p>
          </div>
      </footer>
    </div>
  );
};