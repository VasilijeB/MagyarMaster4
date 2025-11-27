import React from 'react';
import { HUNGARIAN_CHARS } from '../constants';

interface VirtualKeyboardProps {
  onCharClick: (char: string) => void;
  characters?: string[];
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onCharClick, characters = HUNGARIAN_CHARS }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {characters.map((char) => (
        <button
          key={char}
          onClick={() => onCharClick(char)}
          type="button" // Prevent form submission
          className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 border border-slate-300 rounded-lg shadow-md text-black hover:bg-slate-200 hover:border-slate-400 font-bold text-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 active:bg-slate-300 active:scale-95"
        >
          {char}
        </button>
      ))}
    </div>
  );
};