
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

type CardStatus = 'pending' | 'correct' | 'incorrect';

// Helper to play instant feedback sounds using browser AudioContext
const playFeedbackSound = (type: 'correct' | 'incorrect') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    if (type === 'correct') {
      // Pleasant "Success Chime" (C5 -> E5)
      // Note 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      gain1.gain.setValueAtTime(0.1, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Note 2 (slightly delayed)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain2.gain.setValueAtTime(0.1, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.5);

    } else {
      // Softer "Error Thud"
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle'; // Softer than sawtooth
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.3); // Pitch drop
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.error("Audio playback error", e);
  }
};

export const ActiveGame: React.FC<ActiveGameProps> = ({ cards, onComplete, onCancel, direction = FlashCardDirection.SER_HUN }) => {
  // The actual playing deck (can grow if user makes mistakes)
  const [deck, setDeck] = useState<FlashCard[]>([]);
  // The fixed original deck for the progress bar
  const [originalDeck, setOriginalDeck] = useState<FlashCard[]>([]);
  // Track status of unique card IDs
  const [cardStatus, setCardStatus] = useState<Record<string, CardStatus>>({});
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<GameResult[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [lastResultCorrect, setLastResultCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDeck(cards);
    setOriginalDeck(cards);
    
    // Initialize statuses
    const initialStatus: Record<string, CardStatus> = {};
    cards.forEach(c => initialStatus[c.id] = 'pending');
    setCardStatus(initialStatus);

    setCurrentIndex(0);
    setResults([]);
  }, [cards]);

  useEffect(() => {
    // Keep focus on input even when feedback changes, unless game is over
    if (inputRef.current) {
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

    // Update status for the progress bar
    setCardStatus(prev => ({
      ...prev,
      [currentCard.id]: isCorrect ? 'correct' : 'incorrect'
    }));

    if (!isCorrect) {
      // Add to end of deck to retry later
      setDeck(prev => [...prev, currentCard]);
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
      setFeedback('none');
    } else {
      if (currentIndex < deck.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setInputValue('');
        setFeedback('none');
      } else {
        onComplete(newResults);
      }
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
    : [currentCard.hungarian.toLowerCase(), ...currentCard.hungarianAlt.map(a => a.toLowerCase())];
  
  const synonyms = isHungToSerb ? [] : currentCard.hungarianAlt;
    
  const inputPlaceholder = isHungToSerb ? "Prevedi na srpski..." : "Prevedi na mađarski...";
  const keyboardChars = isHungToSerb ? SERBIAN_CHARS : HUNGARIAN_CHARS;

  const handleVirtualKey = (char: string) => {
    // Prevent default touch behavior to keep keyboard open
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
    
    playFeedbackSound(isCorrect ? 'correct' : 'incorrect');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-1 md:py-6 min-h-[100dvh] h-[100dvh] flex flex-col overflow-hidden">
      {/* Header & Progress - Reduced margins for mobile */}
      <div className="flex flex-col gap-2 md:gap-6 mb-2 md:mb-8 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button 
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors"
          >
            ✕ Izađi
          </button>
          
          <div className="flex-1 mx-4 flex gap-1 h-2 md:h-3">
            {originalDeck.map((card) => {
              const status = cardStatus[card.id];
              const isCurrent = currentCard.id === card.id;
              
              let bgClass = 'bg-slate-200';
              if (status === 'correct') bgClass = 'bg-emerald-500';
              if (status === 'incorrect') bgClass = 'bg-rose-500';

              return (
                <div 
                  key={card.id}
                  className={`flex-1 rounded-full transition-all duration-300 relative ${bgClass} ${isCurrent ? 'ring-2 ring-slate-400 ring-offset-1 transform scale-110 z-10' : ''}`}
                >
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Game Area - Compacted gaps */}
      <div className="flex-1 flex flex-col justify-start md:justify-center gap-2 md:gap-8 overflow-hidden">
        
        {/* Flashcard - Reduced min-height for mobile to fit above keyboard */}
        <div className="perspective-1000 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] w-full flex-shrink-0">
          <div className="relative bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[150px] md:min-h-[450px] flex flex-col items-center justify-center p-4 md:p-12 text-center overflow-hidden transition-all duration-300 group">
            {/* Dynamic Top Gradient: Red for incorrect, Green for correct/neutral */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${feedback === 'incorrect' ? 'from-rose-500 to-red-600' : 'from-emerald-400 to-teal-500'}`}></div>
            
            <h2 className="text-slate-400 uppercase tracking-[0.2em] text-[10px] md:text-xs font-extrabold mb-2 md:mb-6 flex items-center gap-2">
              {isHungToSerb ? "MAĐARSKI" : "SRPSKI"}
            </h2>
            
            <p className="text-5xl md:text-8xl font-extrabold text-slate-800 mb-2 leading-tight break-words max-w-full">
              {questionText}
            </p>

            {/* Feedback Overlay - Compacted for mobile */}
            {feedback !== 'none' && (
              // Speed up animation here: animate-[scale-in_0.15s_ease-out_forwards]
              <div className="absolute inset-0 z-20 bg-white/98 backdrop-blur-md flex flex-col items-center justify-center p-2 md:p-8 animate-[scale-in_0.15s_ease-out_forwards]">
                 <div className="flex flex-col items-center justify-center w-full">
                   {feedback === 'correct' ? (
                     <>
                       {/* Green Check Mark */}
                       <div className="w-12 h-12 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 md:mb-6 animate-scale-in">
                          <svg className="w-6 h-6 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                       </div>
                       <h3 className="text-xl md:text-4xl font-bold text-emerald-600 mb-2">Tačno!</h3>
                       {/* Big Text */}
                       <div className="text-emerald-600 font-extrabold text-4xl md:text-8xl flex items-center justify-center text-center leading-tight">
                          {currentCard.hungarian}
                       </div>
                     </>
                   ) : (
                     <>
                       <div className="w-10 h-10 md:w-20 md:h-20 bg-rose-100 rounded-full flex items-center justify-center text-xl md:text-4xl mb-2 md:mb-6 animate-shake text-rose-600">
                         <svg className="w-5 h-5 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
                       </div>
                       {/* Red text for incorrect feedback */}
                       <div className="text-rose-500 text-sm md:text-lg font-bold">
                          Tačan odgovor: <br/>
                          <div className="font-extrabold text-rose-700 text-3xl md:text-6xl mt-1 md:mt-2 flex items-center justify-center gap-3">
                            {targetAnswerPrimary}
                          </div>
                          {synonyms.length > 0 && (
                            <p className="text-xs md:text-sm mt-2 text-slate-400 font-medium">
                              (Takođe: {synonyms.join(', ')})
                            </p>
                          )}
                       </div>
                     </>
                   )}
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Input & Keyboard */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative z-10 pb-2 flex-shrink-0">
          <div className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // Use readOnly instead of disabled to keep keyboard open
              readOnly={feedback !== 'none'}
              placeholder={inputPlaceholder}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className={`w-full text-center text-lg md:text-2xl p-3 md:p-6 rounded-2xl border-2 outline-none transition-all shadow-lg shadow-slate-100 font-bold placeholder:font-normal px-12 md:px-8
                ${feedback === 'none' 
                  ? 'border-slate-200 bg-white text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10' 
                  : 'border-slate-100 bg-slate-50 text-slate-400 select-none'
                }
              `}
            />
            
            {/* Submit Button */}
            {feedback === 'none' && inputValue.trim() && (
              <button
                type="submit"
                // Prevent mouse down from stealing focus
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-2 md:right-3 top-2 bottom-2 md:top-3 md:bottom-3 aspect-square bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            )}

            {/* Continue Button */}
            {feedback !== 'none' && (
              <button
                type="button"
                onClick={() => proceedToNext(feedback === 'correct')}
                // CRITICAL: Prevents button click from closing the keyboard
                onMouseDown={(e) => e.preventDefault()}
                className={`absolute right-2 md:right-3 top-2 bottom-2 md:top-3 md:bottom-3 px-3 md:px-6 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2
                  ${feedback === 'correct' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'}
                `}
              >
                <span className="hidden md:inline">Nastavi</span> 
                {/* SVG Arrow for better centering */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="mt-2 md:mt-8">
            <VirtualKeyboard 
              onCharClick={handleVirtualKey} 
              characters={keyboardChars} 
            />
          </div>
        </form>
      </div>
    </div>
  );
};
