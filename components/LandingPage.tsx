
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">
            Magyar<span className="text-emerald-600">Master</span>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all hover:scale-105"
          >
            Prijava
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold text-sm uppercase tracking-wide animate-fade-in-up">
            ✨ Pokreće veštačka inteligencija
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight animate-fade-in-up delay-100">
            Savladajte mađarski jezik <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              brže i pametnije.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Vaš lični instruktor za vokabular, gramatiku, izgovor i konverzaciju. 
            Prilagođeno Vašem nivou znanja.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-emerald-600 text-white text-lg font-bold rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-200 hover:-translate-y-1 transition-all"
            >
              Započnite besplatno
            </button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 text-lg font-bold rounded-2xl hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              Saznajte više
            </button>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
           <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </header>

      {/* Features Grid (Bento Box Style) */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Sve što Vam treba na jednom mestu</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Zaboravite na dosadne udžbenike. MagyarMaster koristi napredne jezičke modele da kreira vežbe samo za Vas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Flashcards */}
            <div className="md:col-span-2 p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📇</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Pametne Kartice Reči</h3>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                  Vežbajte imenice, glagole i prideve kroz 5 nivoa težine (A1-B2). 
                  Aplikacija nove reči svaki put, tako da nikada ne učite isto.
                  Uključuje automatski izgovor i prepoznavanje sinonima.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
                <div className="text-[200px]">🇭🇺</div>
              </div>
            </div>

            {/* Feature 2: Grammar */}
            <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white shadow-lg hover:shadow-xl transition-all group relative overflow-hidden">
               <div className="relative z-10">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 text-emerald-400">💡</div>
                <h3 className="text-2xl font-bold mb-4">Gramatički Mentor</h3>
                <p className="text-slate-400 text-lg">
                  Imate pitanje o sufiksima ili padežima? Naš četbot objašnjava gramatiku jednostavno, na srpskom jeziku, uz primere.
                </p>
              </div>
            </div>

            {/* Feature 3: Stories */}
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all group">
               <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-3xl mb-6">📖</div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Interaktivne Priče</h3>
               <p className="text-slate-500 text-lg">
                 Generišite jedinstvene kratke priče prilagođene Vašem nivou. Prevedite ih, a će oceniti Vaše razumevanje i ukazati na greške.
               </p>
            </div>

             {/* Feature 4: Conjugation */}
             <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all group">
               <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl mb-6">✍️</div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Master Konjugacije</h3>
               <p className="text-slate-500 text-lg">
                 Mađarski glagoli su teški. Vežbajte sve forme (jednina i množina) uz momentalnu proveru i ispravke.
               </p>
            </div>

            {/* Feature 5: Custom */}
            <div className="md:col-span-1 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transition-all group">
               <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6 text-white">⭐</div>
               <h3 className="text-2xl font-bold mb-4">Moji Izrazi</h3>
               <p className="text-emerald-100 text-lg">
                 Unesite sopstvene reči ili fraze, a aplikacija će automatski kreirati lekcije za Vas.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Methodology */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-16">Zašto MagyarMaster?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <div className="text-5xl font-bold text-emerald-600 mb-2">∞</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Beskonačan sadržaj</h3>
                    <p className="text-slate-500"> nikada nećete raditi istu vežbu dvaput.</p>
                </div>
                <div>
                    <div className="text-5xl font-bold text-emerald-600 mb-2">A1-B2</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Strukturirano učenje</h3>
                    <p className="text-slate-500">Sadržaj prati CEFR standarde, vodeći vas od početnika do samostalnog govornika.</p>
                </div>
                <div>
                    <div className="text-5xl font-bold text-emerald-600 mb-2">24/7</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Uvek dostupno</h3>
                    <p className="text-slate-500">Učite svojim tempom, bilo gde, na bilo kom uređaju.</p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 bg-slate-900 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Spremni da progovorite mađarski?</h2>
              <button 
                onClick={onStart}
                className="px-10 py-5 bg-emerald-500 text-white text-xl font-bold rounded-2xl hover:bg-emerald-600 hover:scale-105 transition-all shadow-2xl shadow-emerald-500/30"
              >
                Kreirajte svoj profil
              </button>
              <p className="mt-8 text-slate-400 text-sm">
                  © {new Date().getFullYear()} MagyarMaster. Sva prava zadržana.
              </p>
          </div>
          
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-3xl -z-0"></div>
      </footer>
    </div>
  );
};
