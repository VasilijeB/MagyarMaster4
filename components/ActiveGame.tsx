
import React, { useState, useRef, useEffect } from 'react';
import { FlashCard, GameResult, FlashCardDirection } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { playPronunciation } from '../services/geminiService';
import { HUNGARIAN_CHARS, SERBIAN_CHARS } from '../constants';

interface ActiveGameProps {
  cards: FlashCard[];
  onComplete: (results: GameResult[]) => void;
  onCancel: () => void;
  direction?: FlashCardDirection;
}

export const ActiveGame: React.FC<ActiveGameProps> = ({ cards, onComplete, onCancel, direction = FlashCardDirection.SER_HUN }) => {
  // 1. Declare all Hooks at the top level
  const [deck, setDeck] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<GameResult[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [lastResultCorrect, setLastResultCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 2. Define Effects
  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setResults([]);
  }, [cards]);

  useEffect(() => {
    // Only focus if the input exists and we are in a 'playing' state (no feedback shown)
    if (inputRef.current && feedback === 'none') {
      inputRef.current.focus();
    }
  }, [currentIndex, feedback, deck.length]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // 3. Helper Functions
  const currentCard = deck[currentIndex];

  const proceedToNext = (isCorrect: boolean) => {
    // Clear any pending audio timeout if user skips ahead quickly
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const newResult: GameResult = {
      card: currentCard,
      userAnswer: inputValue.trim(),
      isCorrect
    };

    const newResults = [...results, newResult];
    setResults(newResults);

    // Logic to repeat wrong answers: Append current card to end of deck
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

  // Effect to handle Enter key for navigation when feedback is shown
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

  // 4. Conditional Returns (Guard Clauses) AFTER all hooks
  if (deck.length === 0) return null;

  // Determine question/answer based on direction
  const isHungToSerb = direction === FlashCardDirection.HUN_SER;
  
  const questionText = isHungToSerb ? currentCard.hungarian : currentCard.serbian;
  const targetAnswerPrimary = isHungToSerb ? currentCard.serbian : currentCard.hungarian;
  const validAnswers = isHungToSerb 
    ? [currentCard.serbian.toLowerCase()] // Can expand to serbian synonyms if added later
    : [currentCard.hungarian.toLowerCase(), ...currentCard.hungarianAlt];
    
  const inputPlaceholder = isHungToSerb ? "Upišite na srpskom..." : "Upišite na mađarskom...";
  const keyboardChars = isHungToSerb ? SERBIAN_CHARS : HUNGARIAN_CHARS;

  const handleVirtualKey = (char: string) => {
    setInputValue(prev => prev + char);
    inputRef.current?.focus();
  };

  const handleAudioClick = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await playPronunciation(currentCard.hungarian);
    setIsPlayingAudio(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const cleanInput = inputValue.trim().toLowerCase();
    
    // Check against accepted answers
    const isCorrect = validAnswers.includes(cleanInput);

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setLastResultCorrect(isCorrect);

    // Play audio after 100ms delay for near-instant feedback
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
        playPronunciation(currentCard.hungarian);
    }, 100);
  };

  const progressPercentage = ((currentIndex) / deck.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
        >
          ← Izađi
        </button>
        <div className="text-slate-400 text-sm font-mono">
          {currentIndex + 1} / {deck.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full mb-12 overflow-hidden">
        <div 
          className="bg-emerald-500 h-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Card Area */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center mb-8 transition-all duration-300">
          <h2 className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-4">Prevedite ovu reč</h2>
          <div className="flex flex-col items-center justify-center gap-4">
             <p className="text-3xl md:text-5xl font-bold text-slate-800 mb-2 break-words max-w-full">
               {questionText}
             </p>
             {/* Show audio hint ONLY if question is in Hungarian */}
             {isHungToSerb && (
                <button 
                   onClick={handleAudioClick}
                   disabled={isPlayingAudio}
                   className="flex items-center gap-2 px-4 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-medium transition-colors"
                >
                   {isPlayingAudio ? <span>Reprodukovanje...</span> : <><span>🔊</span> <span>Poslušaj</span></>}
                </button>
             )}
             
             {!isHungToSerb && (
                <button 
                  type="button"
                  disabled={true}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-300 rounded-full text-xs md:text-sm font-medium cursor-not-allowed"
                  title="Proverite odgovor da biste čuli izgovor"
                >
                    <span>🔊</span>
                    <span>Izgovor (Mađarski)</span>
                </button>
             )}
          </div>
          
          {/* Feedback Overlay */}
          {feedback !== 'none' && (
            <div className={`absolute inset-0 rounded-3xl flex items-center justify-center backdrop-blur-sm bg-white/90 transition-opacity duration-300 z-10`}>
               <div className="text-center animate-scale-in px-4 w-full">
                 {feedback === 'correct' ? (
                   <>
                     <div className="text-6xl mb-2">✨</div>
                     <div className="text-emerald-600 font-bold text-2xl mb-4">Tačno!</div>
                     <button 
                        onClick={handleAudioClick}
                        disabled={isPlayingAudio}
                        className="flex items-center gap-2 mx-auto px-6 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full text-sm font-bold transition-colors shadow-sm mb-6"
                     >
                       {isPlayingAudio ? <span className="animate-pulse">Reprodukovanje...</span> : <><span>🔊</span> <span>Poslušaj izgovor</span></>}
                     </button>
                     <div>
                      <button
                        onClick={() => proceedToNext(true)}
                        className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 hover:scale-105 transition-all shadow-lg border-2 border-emerald-700"
                      >
                        Sledeće pitanje → <span className="text-sm opacity-70 font-normal ml-1">(Enter)</span>
                      </button>
                     </div>
                   </>
                 ) : (
                   <>
                     <div className="text-6xl mb-2">❌</div>
                     <div className="text-rose-600 font-bold text-xl mb-1">Netačno.</div>
                     <div className="text-slate-500 mb-6 flex flex-col items-center">
                        <span>Tačan odgovor: <span className="font-bold text-slate-800">{targetAnswerPrimary}</span></span>
                        <button 
                            onClick={handleAudioClick}
                            disabled={isPlayingAudio}
                            className="mt-2 flex items-center gap-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition-colors"
                        >
                           {isPlayingAudio ? <span className="animate-pulse">Reprodukovanje...</span> : <><span>🔊</span> <span>Poslušaj</span></>}
                        </button>
                     </div>
                     <button
                       onClick={() => proceedToNext(false)}
                       className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 hover:scale-105 transition-all shadow-lg border-2 border-emerald-700"
                     >
                       Sledeće pitanje → <span className="text-sm opacity-70 font-normal ml-1">(Enter)</span>
                     </button>
                   </>
                 )}
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={feedback !== 'none'}
              placeholder={inputPlaceholder}
              className={`w-full text-center text-xl md:text-2xl p-4 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all shadow-sm font-bold
                ${feedback === 'none' 
                  ? 'border-emerald-500 bg-white text-emerald-900 placeholder:text-emerald-300/50' 
                  : feedback === 'correct'
                    ? 'border-emerald-500 bg-white text-emerald-800'
                    : 'border-rose-500 bg-white text-rose-800'
                }
              `}
            />
            {feedback === 'none' && (
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Proveri
              </button>
            )}
          </div>
          
          <VirtualKeyboard onCharClick={handleVirtualKey} characters={keyboardChars} />
        </form>
      </div>
    </div>
  );
};
