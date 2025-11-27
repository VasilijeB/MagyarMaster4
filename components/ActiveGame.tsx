import React, { useState, useRef, useEffect } from 'react';
import { FlashCard, GameResult, FlashCardDirection } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HUNGARIAN_CHARS, SERBIAN_CHARS } from '../constants';

interface ActiveGameProps {
  cards: FlashCard[];
  onComplete: (results: GameResult[]) => void;
  onCancel: () => void;
  direction?: FlashCardDirection;
}

export const ActiveGame: React.FC<ActiveGameProps> = ({ cards, onComplete, onCancel, direction = FlashCardDirection.SER_HUN }) => {
  const [deck, setDeck] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<GameResult[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [lastResultCorrect, setLastResultCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setResults([]);
  }, [cards]);

  useEffect(() => {
    if (inputRef.current && feedback === 'none') {
      inputRef.current.focus();
    }
  }, [currentIndex, feedback, deck.length]);

  const currentCard = deck[currentIndex];

  const proceedToNext = (isCorrect: boolean) => {
    const newResult: GameResult = {
      card: currentCard,
      userAnswer: inputValue.trim(),
      isCorrect
    };

    const newResults = [...results, newResult];
    setResults(newResults);

    if (!isCorrect) {
      setDeck(prev => [...prev, currentCard]);
    }

    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
      setFeedback('none');
    } else {
      onComplete(newResults);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && feedback !== 'none') {
        e.preventDefault();
        e.stopPropagation();
        proceedToNext(lastResultCorrect);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback, lastResultCorrect, deck, currentIndex, inputValue, results]);

  if (deck.length === 0) return null;

  const isHungToSerb = direction === FlashCardDirection.HUN_SER;
  const questionText = isHungToSerb ? currentCard.hungarian : currentCard.serbian;
  const targetAnswerPrimary = isHungToSerb ? currentCard.serbian : currentCard.hungarian;
  const validAnswers = isHungToSerb 
    ? [currentCard.serbian.toLowerCase()] 
    : [currentCard.hungarian.toLowerCase(), ...currentCard.hungarianAlt];
    
  const inputPlaceholder = isHungToSerb ? "Prevedi na srpski..." : "Prevedi na mađarski...";
  const keyboardChars = isHungToSerb ? SERBIAN_CHARS : HUNGARIAN_CHARS;

  const handleVirtualKey = (char: string) => {
    setInputValue(prev => prev + char);
    inputRef.current?.focus();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const cleanInput = inputValue.trim().toLowerCase();
    const isCorrect = validAnswers.includes(cleanInput);

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setLastResultCorrect(isCorrect);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 min-h-[calc(100vh-80px)] flex flex-col">
      {/* Header & Progress */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <button 
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors"
          >
            ✕ Izađi
          </button>
          <div className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Kartica {currentIndex + 1} od {deck.length}
          </div>
        </div>

        {/* Segmented Progress Bar */}
        <div className="flex gap-1 h-2 w-full">
          {deck.map((_, idx) => (
            <div 
              key={idx}
              className={`flex-1 rounded-full transition-all duration-500 ${
                idx < currentIndex ? 'bg-emerald-400' : 
                idx === currentIndex ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col justify-center gap-8">
        
        {/* Flashcard */}
        <div className="perspective-1000">
          <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 md:p-16 text-center transform transition-transform duration-500 hover:scale-[1.01] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            
            <h2 className="text-slate-400 uppercase tracking-[0.2em] text-xs font-extrabold mb-6">
              {isHungToSerb ? "MAĐARSKI" : "SRPSKI"}
            </h2>
            
            <p className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-2 leading-tight">
              {questionText}
            </p>

            {/* Feedback Overlay (Absolute) */}
            {feedback !== 'none' && (
              <div className="absolute inset-0 z-20 rounded-[2rem] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-scale-in">
                 {feedback === 'correct' ? (
                   <>
                     <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce">
                       ✨
                     </div>
                     <h3 className="text-3xl font-bold text-emerald-600 mb-2">Tačno!</h3>
                     <p className="text-slate-400 mb-8 font-medium">Sjajno obavljeno.</p>
                   </>
                 ) : (
                   <>
                     <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-4xl mb-4 animate-shake">
                       ❌
                     </div>
                     <h3 className="text-3xl font-bold text-rose-600 mb-2">Netačno</h3>
                     <div className="text-slate-500 mb-8 text-lg">
                        Tačan odgovor je: <br/>
                        <span className="font-bold text-slate-800 text-2xl">{targetAnswerPrimary}</span>
                     </div>
                   </>
                 )}
                 
                 <button
                   onClick={() => proceedToNext(feedback === 'correct')}
                   autoFocus
                   className={`px-10 py-4 rounded-2xl font-bold text-lg text-white shadow-xl hover:scale-105 transition-all w-full md:w-auto
                     ${feedback === 'correct' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-200'}
                   `}
                 >
                   Nastavi (Enter) →
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* Input & Keyboard */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative z-10">
          <div className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={feedback !== 'none'}
              placeholder={inputPlaceholder}
              className={`w-full text-center text-xl md:text-2xl p-6 rounded-2xl border-2 outline-none transition-all shadow-lg shadow-slate-100 font-bold placeholder:font-normal
                ${feedback === 'none' 
                  ? 'border-slate-200 bg-white text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10' 
                  : 'border-slate-100 bg-slate-50 text-slate-400'
                }
              `}
            />
            {feedback === 'none' && inputValue.trim() && (
              <button
                type="submit"
                className="absolute right-3 top-3 bottom-3 aspect-square bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 shadow-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>
          
          <div className="mt-8">
            <VirtualKeyboard onCharClick={handleVirtualKey} characters={keyboardChars} />
          </div>
        </form>
      </div>
    </div>
  );
};