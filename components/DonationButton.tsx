import React from 'react';

export const DonationButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 group">
      {/* Tooltip */}
      <div className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none mb-1">
        Podrži projekat ❤️
      </div>
      
      {/* Ko-fi Button */}
      <a 
        href="https://ko-fi.com/magyarmaster" 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white rounded-full shadow-2xl border border-slate-100 hover:scale-110 transition-all duration-300 active:scale-95 group"
      >
        {/* The Heart Icon - No animation */}
        <div className="relative z-10 text-3xl md:text-4xl">
          ❤️
        </div>
      </a>
    </div>
  );
};