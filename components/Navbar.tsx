import React, { useState } from 'react';
import { GameMode, User } from '../types';

interface NavbarProps {
  currentMode: GameMode;
  onNavigate: (mode: GameMode) => void;
  user: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentMode, onNavigate, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (mode: GameMode) => {
    onNavigate(mode);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 transition-all duration-300 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick(GameMode.DASHBOARD)}
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
                M
              </div>
              <span className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                Magyar<span className="text-emerald-600">Master</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
              <NavButton 
                active={currentMode === GameMode.VOCAB} 
                onClick={() => handleNavClick(GameMode.VOCAB)}
                label="Vežbaj reči"
                icon="📇"
              />
              <NavButton 
                active={currentMode === GameMode.CONJUGATION} 
                onClick={() => handleNavClick(GameMode.CONJUGATION)}
                label="Konjugacija"
                icon="✍️"
              />
              <NavButton 
                active={currentMode === GameMode.STORIES} 
                onClick={() => handleNavClick(GameMode.STORIES)}
                label="Priče"
                icon="📖"
              />
              <NavButton 
                active={currentMode === GameMode.GRAMMAR} 
                onClick={() => handleNavClick(GameMode.GRAMMAR)}
                label="Gramatika"
                icon="💡"
              />
               <NavButton 
                active={currentMode === GameMode.CUSTOM_VOCAB} 
                onClick={() => handleNavClick(GameMode.CUSTOM_VOCAB)}
                label="Moje"
                icon="⭐"
              />
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
                        <div className="text-right hidden xl:block">
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Učenik</p>
                          <p className="text-sm font-bold text-slate-700">{user.name}</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-slate-100">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                   <button 
                     onClick={() => setIsMenuOpen(true)} 
                     className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                   >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                   </button>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out h-full flex flex-col p-6">
             <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl text-slate-800">Meni</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             
             <div className="flex-1 space-y-2">
                <MobileNavButton 
                  active={currentMode === GameMode.DASHBOARD} 
                  onClick={() => handleNavClick(GameMode.DASHBOARD)}
                  label="Početna"
                  icon="🏠"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.VOCAB} 
                  onClick={() => handleNavClick(GameMode.VOCAB)}
                  label="Vežbaj reči"
                  icon="📇"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.CONJUGATION} 
                  onClick={() => handleNavClick(GameMode.CONJUGATION)}
                  label="Konjugacija"
                  icon="✍️"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.STORIES} 
                  onClick={() => handleNavClick(GameMode.STORIES)}
                  label="Kratke Priče"
                  icon="📖"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.GRAMMAR} 
                  onClick={() => handleNavClick(GameMode.GRAMMAR)}
                  label="Gramatika"
                  icon="💡"
                />
                 <MobileNavButton 
                  active={currentMode === GameMode.CUSTOM_VOCAB} 
                  onClick={() => handleNavClick(GameMode.CUSTOM_VOCAB)}
                  label="Moji Izrazi"
                  icon="⭐"
                />
             </div>

             <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                   </div>
                   <div>
                      <p className="font-bold text-slate-800">{user?.name}</p>
                      <p className="text-xs text-slate-500">Ulogovan</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavButton = ({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
      active 
        ? 'bg-white text-emerald-700 shadow-sm shadow-slate-200 ring-1 ring-black/5' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
    }`}
  >
    <span>{icon}</span>
    {label}
  </button>
);

const MobileNavButton = ({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-4 rounded-2xl text-left font-bold transition-all flex items-center gap-4 ${
      active 
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
    }`}
  >
    <span className="text-2xl">{icon}</span>
    {label}
  </button>
);