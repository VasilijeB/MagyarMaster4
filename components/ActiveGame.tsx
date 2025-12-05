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

type CardStatus = 'pending' | 'correct' | 'incorrect' | 'almost';

// Helper to remove diacritics for "almost correct" checking
const normalizeText = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

// Singleton AudioContext to prevent resource exhaustion and distortion
let audioContext: AudioContext | null = null;

const playFeedbackSound = (type: 'correct' | 'incorrect' | 'almost') => {
  try {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContext = new AudioContextClass();
      }
    }
    
    if (!audioContext) return;
    
    // Browser policy requires resuming context after user interaction
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const ctx = audioContext;
    const now = ctx.currentTime;
    
    if (type === 'correct') {
      // Pleasant "Success Chime" (Sine waves)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.1, now + 0.02); 
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.55);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.05); // E5
      
      gain2.gain.setValueAtTime(0, now + 0.05);
      gain2.gain.linearRampToValueAtTime(0.1, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.6);

    } else {
      // Softer "Error" sound (Low Sine with pitch drop)
      // We use the same sound for 'incorrect' and 'almost' but could tweak pitch if desired
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine'; 
      // Slightly higher pitch for "almost" to indicate it's not a total fail
      const startFreq = type === 'almost' ? 300 : 200;
      
      osc.frequency.setValueAtTime(startFreq, now); 
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.3); // Pitch drop
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    console.error("Audio playback error", e);
  }
};

export const ActiveGame: React.FC<ActiveGameProps> = ({ cards, onComplete, onCancel, direction = FlashCardDirection.SER_HUN }) => {
  const [deck, setDeck] = useState<FlashCard[]>([]);
  const [originalDeck, setOriginalDeck] = useState<FlashCard[]>([]);
  const [cardStatus, setCardStatus] = useState<Record<string, CardStatus>>({});
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<GameResult[]>([]);
  
  // Added 'almost' state
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect' | 'almost'>('none');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDeck(cards);
    setOriginalDeck(cards);
    
    const initialStatus: Record<string, CardStatus> = {};
    cards.forEach(c => initialStatus[c.id] = 'pending');
    setCardStatus(initialStatus);

    setCurrentIndex(0);
    setResults([]);
  }, [cards]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, feedback, deck.length]);

  const currentCard = deck[currentIndex];

  const proceedToNext = (status: 'correct' | 'incorrect' | 'almost') => {
    const isCorrect = status === 'correct';

    const newResult: GameResult = {
      card: currentCard,
      userAnswer: inputValue.trim(),
      isCorrect: isCorrect // 'almost' counts as incorrect for scoring purposes usually
    };

    const newResults = [...results, newResult];
    setResults(newResults);

    // Update status for the progress bar
    setCardStatus(prev => ({
      ...prev,
      [currentCard.id]: status
    }));

    if (!isCorrect) {
      // Add to end of deck to retry later (both incorrect and almost)
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
        proceedToNext(feedback as 'correct' | 'incorrect' | 'almost');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback, deck, currentIndex, inputValue, results]);

  if (deck.length === 0) return null;

  const isHungToSerb = direction === FlashCardDirection.HUN_SER;
  
  const questionText = isHungToSerb 
    ? currentCard.hungarian 
    : (currentCard.display || currentCard.serbian);
    
  const targetAnswerPrimary = isHungToSerb 
    ? (currentCard.display || currentCard.serbian)
    : currentCard.hungarian;
  
  const validAnswers = isHungToSerb 
    ? [currentCard.serbian.toLowerCase()] 
    : [currentCard.hungarian.toLowerCase(), ...currentCard.hungarianAlt.map(a => a.toLowerCase())];
  
  const synonyms = isHungToSerb ? [] : currentCard.hungarianAlt;
    
  const inputPlaceholder = isHungToSerb ? "Prevedi na srpski..." : "Prevedi na mađarski...";
  const keyboardChars = isHungToSerb ? SERBIAN_CHARS : HUNGARIAN_CHARS;

  const handleVirtualKey = (char: string) => {
    if (feedback === 'none') {
        setInputValue(prev => prev + char);
        inputRef.current?.focus();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (feedback !== 'none') {
        proceedToNext(feedback as 'correct' | 'incorrect' | 'almost');
        return;
    }

    if (!inputValue.trim()) return;

    const cleanInput = inputValue.trim().toLowerCase();
    
    // 1. Check Exact Match
    const isExact = validAnswers.includes(cleanInput);

    if (isExact) {
        setFeedback('correct');
        playFeedbackSound('correct');
        return;
    }

    // 2. Check Diacritic Mistake (Normalized Match)
    const normalizedInput = normalizeText(cleanInput);
    const isAlmost = validAnswers.some(ans => normalizeText(ans) === normalizedInput);

    if (isAlmost) {
        setFeedback('almost');
        playFeedbackSound('almost');
        return;
    }

    // 3. Incorrect
    setFeedback('incorrect');
    playFeedbackSound('incorrect');
  };

  // Determine top gradient color based on feedback
  let gradientClass = 'from-emerald-400 to-teal-500'; // Default/Correct
  if (feedback === 'incorrect') gradientClass = 'from-rose-500 to-red-600';
  if (feedback === 'almost') gradientClass = 'from-amber-400 to-yellow-500';

  return (
    <div className="max-w-2xl mx-auto px-4 py-1 md:py-6 min-h-[100dvh] h-[100dvh] flex flex-col overflow-hidden">
      {/* Header & Progress */}
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
              if (status === 'almost') bgClass = 'bg-amber-400';

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

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col justify-start md:justify-center gap-2 md:gap-8 overflow-hidden">
        
        {/* Flashcard */}
        <div className="perspective-1000 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] w-full flex-shrink-0">
          {/* Increased min-height to 240px on mobile to fit the bigger hint */}
          <div className="relative bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[240px] md:min-h-[450px] flex flex-col items-center justify-center p-4 md:p-8 text-center overflow-hidden transition-all duration-300 group">
            {/* Dynamic Top Gradient */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradientClass}`}></div>
            
            <h2 className="text-slate-400 uppercase tracking-[0.2em] text-[10px] md:text-xs font-extrabold mb-2 md:mb-6 flex items-center gap-2">
              {isHungToSerb ? "MAĐARSKI" : "SRPSKI"}
            </h2>
            
            <p className="text-4xl md:text-8xl font-extrabold text-slate-800 mb-2 leading-tight break-words max-w-full">
              {questionText}
            </p>

            {/* Feedback Overlay */}
            {feedback !== 'none' && (
              <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-3 md:p-6 animate-[scale-in_0.15s_ease-out_forwards]
                ${feedback === 'almost' ? 'bg-amber-50/98 backdrop-blur-md' : 'bg-white/98 backdrop-blur-md'}
              `}>
                 <div className="flex flex-col items-center justify-center w-full h-full max-w-lg mx-auto relative">
                   
                   {feedback === 'correct' ? (
                     <>
                       {/* Green Check Mark */}
                       <div className="w-10 h-10 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 animate-scale-in flex-shrink-0">
                          <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                       </div>
                       
                       {/* Answer */}
                       <div className="text-emerald-600 font-extrabold text-2xl md:text-5xl flex items-center justify-center text-center leading-tight mb-2 break-words w-full">
                          {currentCard.hungarian}
                       </div>
                     </>
                   ) : feedback === 'almost' ? (
                     <>
                       {/* Yellow Warning Icon */}
                       <div className="w-8 h-8 md:w-14 md:h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-2 animate-shake shadow-sm border-2 border-amber-200 flex-shrink-0">
                          <svg className="w-4 h-4 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                       </div>
                       
                       <p className="text-amber-700 font-bold mb-1 text-[10px] md:text-sm bg-amber-100 px-3 py-0.5 rounded-full">Pazi na akcente!</p>
                       
                       <div className="font-extrabold text-amber-600 text-xl md:text-4xl mb-2 flex items-center justify-center gap-3 text-center leading-tight break-words w-full">
                          {targetAnswerPrimary}
                       </div>
                     </>
                   ) : (
                     <>
                       {/* Red Cross */}
                       <div className="w-8 h-8 md:w-14 md:h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-2 animate-shake flex-shrink-0">
                         <svg className="w-4 h-4 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
                       </div>
                       
                       <div className="text-rose-500 text-[10px] md:text-sm font-bold mb-0.5">
                          Tačan odgovor:
                       </div>
                       <div className="font-extrabold text-rose-700 text-xl md:text-4xl mb-2 flex items-center justify-center gap-3 text-center leading-tight break-words w-full">
                          {targetAnswerPrimary}
                       </div>
                       {synonyms.length > 0 && (
                            <p className="text-[10px] md:text-xs mb-2 text-slate-400 font-medium">
                              (Takođe: {synonyms.join(', ')})
                            </p>
                       )}
                     </>
                   )}

                   {/* HINT SECTION - BIGGER & MORE OBVIOUS */}
                   {currentCard.hint && (
                     <div className={`mt-3 w-full p-3 rounded-2xl border-2 flex items-center gap-3 text-left animate-fade-in-up shadow-sm
                       ${feedback === 'correct' ? 'bg-emerald-100 border-emerald-200' : 
                         feedback === 'almost' ? 'bg-amber-100 border-amber-200' : 'bg-rose-100 border-rose-200'
                       }
                     `}>
                        <div className="text-2xl md:text-3xl flex-shrink-0 drop-shadow-sm">💡</div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5 opacity-80 ${
                             feedback === 'correct' ? 'text-emerald-800' : 
                             feedback === 'almost' ? 'text-amber-800' : 'text-rose-800'
                          }`}>Korisan savet</p>
                          <p className={`text-sm md:text-lg font-bold leading-tight ${
                             feedback === 'correct' ? 'text-emerald-900' : 
                             feedback === 'almost' ? 'text-amber-900' : 'text-rose-900'
                          }`}>
                            {currentCard.hint}
                          </p>
                        </div>
                     </div>
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
              onChange={(e) => {
                if (feedback === 'none') {
                    setInputValue(e.target.value);
                }
              }}
              placeholder={inputPlaceholder}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
              className={`w-full text-center text-lg md:text-2xl p-3 md:p-6 rounded-2xl border-2 outline-none transition-all shadow-lg shadow-slate-100 font-bold placeholder:font-normal px-12 md:px-8
                ${feedback === 'none' 
                  ? 'border-slate-200 bg-white text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10' 
                  : 'border-slate-100 bg-slate-50 text-slate-400'
                }
              `}
            />
            
            {/* Submit Button */}
            {feedback === 'none' && inputValue.trim() && (
              <button
                type="submit"
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
                onClick={() => proceedToNext(feedback as 'correct' | 'incorrect' | 'almost')}
                onMouseDown={(e) => e.preventDefault()}
                className={`absolute right-2 md:right-3 top-2 bottom-2 md:top-3 md:bottom-3 px-3 md:px-6 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2
                  ${feedback === 'correct' ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : feedback === 'almost' ? 'bg-amber-500 hover:bg-amber-600' 
                    : 'bg-rose-500 hover:bg-rose-600'
                  }
                `}
              >
                <span className="hidden md:inline">Nastavi</span> 
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