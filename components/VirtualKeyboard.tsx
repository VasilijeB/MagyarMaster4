import React from 'react';
import { HUNGARIAN_CHARS } from '../constants';

interface VirtualKeyboardProps {
  onCharClick: (char: string) => void;
  characters?: string[];
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onCharClick, characters = HUNGARIAN_CHARS }) => {
  return (
    <div className="w-full px-0 md:px-1">
      <div className="flex w-full justify-center gap-1 md:gap-2 max-w-3xl mx-auto">
        {characters.map((char) => (
          <button
            key={char}
            onClick={() => onCharClick(char)}
            type="button" // Prevent form submission
            className="flex-1 min-w-0 h-10 md:h-14 bg-slate-100 border border-slate-300 rounded md:rounded-lg shadow-sm text-slate-800 hover:bg-slate-200 hover:border-slate-400 font-bold text-base md:text-2xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 active:bg-slate-300 active:scale-95 flex items-center justify-center p-0"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};