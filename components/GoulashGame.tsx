import React, { useState, useEffect, useRef } from 'react';
import { ActiveGame } from './ActiveGame';
import { FlashCard, FlashCardDirection, WordCategory } from '../types';
import { generateFolkArtImage } from '../services/geminiService';
import { getStaticFlashcards } from '../services/contentService';
import { saveCustomAdventureImage, getCustomAdventureImages } from '../services/storageService';
import { GOULASH_SAGA, ADVENTURE_INTRO_SERBIAN, ADVENTURE_BG_IMAGE } from '../data/goulashData';

interface GoulashGameProps {
  onGoBack: () => void;
}

type GoulashStep = 'mission_briefing' | 'intro' | 'playing' | 'celebrating' | 'story' | 'final';

export const GoulashGame: React.FC<GoulashGameProps> = ({ onGoBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uiState, setUiState] = useState<GoulashStep>('mission_briefing');
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [introImages, setIntroImages] = useState<Record<number, string>>({});
  const [storyImages, setStoryImages] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTypeRef = useRef<'intro' | 'story'>('intro');

  const currentStepData = GOULASH_SAGA[currentStep];

  // Load custom images from storage on mount
  useEffect(() => {
    const saved = getCustomAdventureImages();
    setIntroImages(prev => ({ ...prev, ...saved.intro }));
    setStoryImages(prev => ({ ...prev, ...saved.story }));
  }, []);

  // Load Level assets
  useEffect(() => {
    const loadStageAssets = async () => {
      if (uiState !== 'intro') return;

      setLoading(true);
      try {
        const categories = [WordCategory.NOUNS, WordCategory.VERBS, WordCategory.ADJECTIVES];
        const randomCat = categories[currentStep % categories.length];
        const cards = await getStaticFlashcards(randomCat, currentStepData.level);
        setFlashcards(cards);

        if (introImages[currentStep]) {
          // Keep custom
        } else if (currentStepData.localIntroImage) {
          setIntroImages(prev => ({ ...prev, [currentStep]: currentStepData.localIntroImage! }));
        } else if (!introImages[currentStep]) {
          setLoadingImage(true);
          const img = await generateFolkArtImage(currentStepData.introImagePrompt);
          if (img) setIntroImages(prev => ({ ...prev, [currentStep]: img }));
          setLoadingImage(false);
        }
      } catch (err) {
        console.error("Failed to load assets for goulash stage", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadStageAssets();
  }, [currentStep, uiState]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const type = uploadTypeRef.current;
      
      if (type === 'intro') {
        setIntroImages(prev => ({ ...prev, [currentStep]: base64 }));
      } else {
        setStoryImages(prev => ({ ...prev, [currentStep]: base64 }));
      }
      
      saveCustomAdventureImage(currentStep, type, base64);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (type: 'intro' | 'story') => {
    uploadTypeRef.current = type;
    fileInputRef.current?.click();
  };

  const startLevel = () => {
    setUiState('playing');
  };

  const completeLevel = async () => {
    setUiState('celebrating');
    
    // Pre-load story image
    if (storyImages[currentStep]) {
      // Custom exists
    } else if (currentStepData.localStoryImage) {
      setStoryImages(prev => ({ ...prev, [currentStep]: currentStepData.localStoryImage! }));
    } else {
      setLoadingImage(true);
      generateFolkArtImage(currentStepData.storyImagePrompt).then(img => {
        if (img) setStoryImages(prev => ({ ...prev, [currentStep]: img }));
        setLoadingImage(false);
      });
    }

    setTimeout(() => {
      setUiState('story');
    }, 2500);
  };

  const nextStep = () => {
    if (currentStep < GOULASH_SAGA.length - 1) {
      setCurrentStep(prev => prev + 1);
      setUiState('intro');
    } else {
      setUiState('final');
    }
  };

  const UploadButton = ({ type }: { type: 'intro' | 'story' }) => (
    <button 
      onClick={(e) => { e.stopPropagation(); triggerUpload(type); }}
      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur hover:bg-white text-slate-800 p-3 rounded-2xl shadow-lg border border-slate-200 transition-all active:scale-90 flex items-center gap-2 font-bold text-sm z-30"
      title="Promeni sliku"
    >
      <span className="text-xl">📷</span>
      <span className="hidden sm:inline">Promeni sliku</span>
    </button>
  );

  if (uiState === 'mission_briefing') {
    return (
      <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center p-6 animate-fade-in overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20 z-10"></div>
          <img 
            src={ADVENTURE_BG_IMAGE || "https://images.unsplash.com/photo-1548546738-8509cb246ed3?q=80&w=1974&auto=format&fit=crop"} 
            alt="Janos waking up" 
            className="w-full h-full object-cover opacity-80 scale-105"
          />
        </div>

        <div className="relative z-20 max-w-2xl w-full flex flex-col items-center">
          <div className="mb-6 md:mb-10 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-xl animate-fade-in-up">
              Janoševa <span className="text-orange-400">Avantura</span>
            </h1>
          </div>

          <div className="glass p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/20 mb-10 animate-fade-in-up animation-delay-200">
             <p className="text-slate-900 text-xl md:text-2xl leading-relaxed text-center italic font-bold">
               {ADVENTURE_INTRO_SERBIAN}
             </p>
          </div>

          <div className="w-full space-y-4 animate-fade-in-up animation-delay-400">
            <button
              onClick={() => setUiState('intro')}
              className="w-full bg-orange-600 text-white py-5 rounded-3xl font-black text-2xl hover:bg-orange-700 shadow-2xl shadow-orange-900/40 transition-all hover:scale-105 active:scale-95"
            >
              Pomozi Janošu →
            </button>
            <button 
              onClick={onGoBack} 
              className="w-full text-white/70 font-bold hover:text-white transition-colors text-sm py-2"
            >
              Vrati se nazad
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (uiState === 'intro') {
    const introImg = introImages[currentStep];
    return (
      <div className="max-w-2xl mx-auto px-6 py-8 animate-fade-in flex flex-col items-center text-center">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-xl relative mb-8 group">
           {loadingImage ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-50">
               <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
               <p className="text-xs text-orange-400 mt-2 font-bold animate-pulse">Učitavanje Janoša...</p>
             </div>
           ) : introImg ? (
             <>
               <img src={introImg} alt="Intro" className="w-full h-full object-cover animate-scale-in" />
               <UploadButton type="intro" />
             </>
           ) : (
             <>
               <div className="absolute inset-0 flex items-center justify-center text-5xl">
                 {['🚶', '🛒', '🥩', '🔥'][currentStep]}
               </div>
               <UploadButton type="intro" />
             </>
           )}
        </div>

        <h2 className="text-xs font-black text-orange-600 uppercase tracking-widest mb-2">Deo {currentStep + 1} od 4</h2>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">{currentStepData.title}</h1>
        <p className="text-slate-600 text-lg mb-12 max-w-md font-medium">
          {currentStepData.instructionText}
        </p>

        <button
          onClick={startLevel}
          disabled={loading || flashcards.length === 0}
          className="w-full bg-orange-600 text-white py-5 rounded-3xl font-bold text-2xl hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Pripremanje reči..." : "Započni pomoć"}
        </button>
        <button onClick={onGoBack} className="mt-6 text-slate-400 font-bold hover:text-slate-600">Odustani</button>
      </div>
    );
  }

  if (uiState === 'playing') {
    return (
      <ActiveGame
        cards={flashcards}
        onComplete={completeLevel}
        onCancel={() => setUiState('intro')}
        direction={FlashCardDirection.SER_HUN}
      />
    );
  }

  if (uiState === 'celebrating') {
    return (
      <div className="fixed inset-0 z-[100] bg-emerald-600 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {[...Array(15)].map((_, i) => (
             <div 
               key={i}
               className="absolute animate-float-up text-4xl"
               style={{ 
                 left: `${Math.random() * 100}%`, 
                 bottom: '-10%', 
                 animationDelay: `${Math.random() * 2}s`,
                 animationDuration: `${3 + Math.random() * 2}s`
               }}
             >
               {['🥘', '🌶️', '🇭🇺', '✨', '🔥'][Math.floor(Math.random() * 5)]}
             </div>
           ))}
        </div>

        <div className="relative z-10 animate-scale-in">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-2xl mb-8 mx-auto ring-8 ring-white/20">
            ✅
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
            ODLIČNO!
          </h1>
          <p className="text-emerald-50 text-xl md:text-2xl font-bold max-w-md mx-auto">
            Uspešno ste pomogli Janošu. <br/> Pogledajte nastavak priče...
          </p>
        </div>
        
        <style>{`
          @keyframes float-up {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
          }
          .animate-float-up {
            animation: float-up linear forwards;
          }
        `}</style>
      </div>
    );
  }

  if (uiState === 'story') {
    const currentImage = storyImages[currentStep];

    return (
      <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-4 animate-fade-in overflow-hidden">
        {/* Background Blur Image */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {currentImage && <img src={currentImage} className="w-full h-full object-cover blur-2xl scale-110" alt="" />}
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />

        <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square md:aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-slate-800 border-4 border-white/20 shadow-2xl group animate-scale-in">
            {loadingImage ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800">
                 <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                 <p className="text-white/60 font-bold animate-pulse">Učitavanje priče...</p>
              </div>
            ) : (
              <>
                {currentImage ? (
                  <img src={currentImage} alt="Story illustration" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">Slika nije učitana</div>
                )}
                
                <UploadButton type="story" />

                {/* Centered Large Speech Bubble */}
                {!loadingImage && currentImage && (
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-2xl px-8 py-6 md:px-12 md:py-10 rounded-[3rem] shadow-2xl border-2 border-orange-200/30 text-center max-w-3xl pointer-events-auto transform animate-fade-in-up">
                      <p className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight italic tracking-tight mb-4 md:mb-6">
                        {currentStepData.conversationHungarian}
                      </p>
                      <p className="text-lg md:text-2xl font-bold text-slate-500 border-t border-slate-100 pt-4 md:pt-6">
                        {currentStepData.conversationSerbian}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Immersive Transparent Button */}
          <button 
            onClick={nextStep}
            className="mt-8 md:mt-12 px-12 md:px-20 py-4 md:py-6 rounded-[2rem] border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-black text-xl md:text-2xl backdrop-blur-md transition-all active:scale-95 shadow-2xl group flex items-center gap-4"
          >
            {currentStep < GOULASH_SAGA.length - 1 ? (
              <>
                Sledeći korak 
                <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
              </>
            ) : (
              <>
                Završi avanturu 🏆
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (uiState === 'final') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in-up text-center">
        <div className="inline-block p-5 bg-emerald-100 text-emerald-700 rounded-full text-5xl mb-6 shadow-inner animate-bounce">👑</div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">Bravo!</h1>
        <p className="text-slate-500 text-xl font-medium mb-12">Pomogli ste Janošu da skuva savršen gulyásleves!</p>
        
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-left mb-12 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-orange-600 mb-4">🏆 Janošev gulyásleves Recept</h3>
            <ul className="space-y-2 text-slate-600">
               <li>✔ 1 kg marhahús (junetina koju je Janoš izabrao)</li>
               <li>✔ 2 hagyma (luk sa pijace)</li>
               <li>✔ 2 evőkanál zsír (mast za bolji ukus)</li>
               <li>✔ Só és paprika (obavezni sastojci)</li>
            </ul>
        </div>

        <button
          onClick={onGoBack}
          className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-2xl hover:bg-slate-800 shadow-2xl transition-all"
        >
          Završi avanturu
        </button>
      </div>
    );
  }

  return null;
};