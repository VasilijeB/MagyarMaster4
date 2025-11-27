
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
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div 
              onClick={() => handleNavClick(GameMode.DASHBOARD)}
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            >
              <span className="text-xl md:text-2xl font-bold text-slate-800">
                Magyar<span className="text-emerald-600">Master</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex gap-1 overflow-x-auto items-center">
              <NavButton 
                active={currentMode === GameMode.VOCAB} 
                onClick={() => handleNavClick(GameMode.VOCAB)}
                label="Kartice Reči"
              />
              <NavButton 
                active={currentMode === GameMode.CONJUGATION} 
                onClick={() => handleNavClick(GameMode.CONJUGATION)}
                label="Konjugacija"
              />
              <NavButton 
                active={currentMode === GameMode.CUSTOM_VOCAB} 
                onClick={() => handleNavClick(GameMode.CUSTOM_VOCAB)}
                label="Moji Izrazi"
              />
               <NavButton 
                active={currentMode === GameMode.STORIES} 
                onClick={() => handleNavClick(GameMode.STORIES)}
                label="Priče"
              />
              <NavButton 
                active={currentMode === GameMode.GRAMMAR} 
                onClick={() => handleNavClick(GameMode.GRAMMAR)}
                label="Gramatika"
              />
            </div>

            <div className="flex items-center gap-4">
                {user && (
                    <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                        <span className="font-bold text-slate-700">{user.name}</span>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                   <button 
                     onClick={() => setIsMenuOpen(true)} 
                     className="text-sm font-bold text-emerald-600 border border-emerald-600 px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
                   >
                      Meni
                   </button>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-out h-full flex flex-col">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{user?.name}</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
             </div>
             <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                <MobileNavButton 
                  active={currentMode === GameMode.DASHBOARD} 
                  onClick={() => handleNavClick(GameMode.DASHBOARD)}
                  label="Početna"
                  icon="🏠"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.VOCAB} 
                  onClick={() => handleNavClick(GameMode.VOCAB)}
                  label="Kartice Reči"
                  icon="📇"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.CONJUGATION} 
                  onClick={() => handleNavClick(GameMode.CONJUGATION)}
                  label="Konjugacija"
                  icon="✍️"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.CUSTOM_VOCAB} 
                  onClick={() => handleNavClick(GameMode.CUSTOM_VOCAB)}
                  label="Moji Izrazi"
                  icon="⭐"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.STORIES} 
                  onClick={() => handleNavClick(GameMode.STORIES)}
                  label="Priče"
                  icon="📖"
                />
                <MobileNavButton 
                  active={currentMode === GameMode.GRAMMAR} 
                  onClick={() => handleNavClick(GameMode.GRAMMAR)}
                  label="Gramatika"
                  icon="💡"
                />
             </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
      active 
        ? 'bg-emerald-50 text-emerald-700' 
        : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
    }`}
  >
    {label}
  </button>
);

const MobileNavButton = ({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-3 rounded-xl text-left font-medium transition-all flex items-center gap-3 ${
      active 
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
        : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    <span className="text-xl">{icon}</span>
    {label}
  </button>
);
