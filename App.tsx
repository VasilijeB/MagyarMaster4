import React, { useState, useEffect } from 'react';
import { AppState, FlashCard, GameResult, WordCategory, DifficultyLevel, GameMode, FlashCardDirection, User } from './types';
import { getStaticFlashcards } from './services/contentService'; 
import { saveUser, getUser, addMistakes, addMastered } from './services/storageService';
import { CategorySelection } from './components/CategorySelection';
import { ActiveGame } from './components/ActiveGame';
import { Results } from './components/Results';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ConjugationGame } from './components/ConjugationGame';
import { CustomVocabSetup } from './components/CustomVocabSetup';
import { GrammarChat } from './components/GrammarChat';
import { StoryGame } from './components/StoryGame';
import { Dictionary } from './components/Dictionary';
import { Login } from './components/Login';
import { LandingPage } from './components/LandingPage';
import { LOADING_MESSAGES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uiState, setUiState] = useState<'landing' | 'login' | 'app'>('landing');
  
  // Navigation State
  const [currentMode, setCurrentMode] = useState<GameMode>(GameMode.DASHBOARD);
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  
  // Vocab State (Lifted for History Support)
  const [vocabCategory, setVocabCategory] = useState<WordCategory | null>(null);
  const [vocabLevel, setVocabLevel] = useState<DifficultyLevel | null>(null);
  const [vocabDirection, setVocabDirection] = useState<FlashCardDirection>(FlashCardDirection.SER_HUN);

  // Game Data
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [results, setResults] = useState<GameResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState<string>(LOADING_MESSAGES[0]);

  useEffect(() => {
    const loadedUser = getUser();
    if (loadedUser) {
      setUser(loadedUser);
      setUiState('app');
    } else {
      setUiState('landing');
    }
  }, []);

  // --- HISTORY MANAGEMENT ---
  useEffect(() => {
    // Initialize history state when entering app
    if (uiState === 'app') {
      window.history.replaceState({
        mode: GameMode.DASHBOARD,
        appState: AppState.MENU,
        category: null,
        level: null
      }, '');
    }
  }, [uiState]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        const s = event.state;
        setCurrentMode(s.mode);
        setAppState(s.appState);
        setVocabCategory(s.category || null);
        setVocabLevel(s.level || null);

        // Edge case: If popping back to PLAYING but we have no flashcards (e.g. refresh or invalid state)
        if (s.appState === AppState.PLAYING && flashcards.length === 0) {
           // Fallback to menu to avoid broken UI
           setAppState(AppState.MENU);
           window.history.replaceState({ ...s, appState: AppState.MENU }, '');
        }
      } else {
        // Fallback if history state is empty (shouldn't happen with correct initialization)
        if (uiState === 'app') {
          setCurrentMode(GameMode.DASHBOARD);
          setAppState(AppState.MENU);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [uiState, flashcards.length]);

  const pushState = (mode: GameMode, state: AppState, category: WordCategory | null = null, level: DifficultyLevel | null = null) => {
    const newState = { mode, appState: state, category, level };
    window.history.pushState(newState, '');
    setCurrentMode(mode);
    setAppState(state);
    setVocabCategory(category);
    setVocabLevel(level);
  };

  const replaceState = (mode: GameMode, state: AppState, category: WordCategory | null = null, level: DifficultyLevel | null = null) => {
    const newState = { mode, appState: state, category, level };
    window.history.replaceState(newState, '');
    setCurrentMode(mode);
    setAppState(state);
    setVocabCategory(category);
    setVocabLevel(level);
  };

  const handleBack = () => {
    window.history.back();
  };

  // --- HANDLERS ---

  const handleLogin = (name: string) => {
    const newUser = saveUser(name);
    setUser(newUser);
    setUiState('app');
  };

  // Main Navigation (from Navbar/Dashboard)
  const handleNavigation = (mode: GameMode) => {
    // If we are already in the mode and at menu, don't push duplicate
    if (mode === currentMode && appState === AppState.MENU && !vocabCategory) return;
    pushState(mode, AppState.MENU);
    setFlashcards([]);
    setResults([]);
  };

  // Vocab Flow Handlers
  const handleVocabCategorySelect = (category: WordCategory) => {
    pushState(GameMode.VOCAB, AppState.MENU, category, null);
  };

  const handleVocabLevelSelect = (level: DifficultyLevel) => {
    pushState(GameMode.VOCAB, AppState.MENU, vocabCategory, level);
  };

  const handleVocabGameStart = async (direction: FlashCardDirection) => {
    if (!vocabCategory || !vocabLevel) return;
    
    // Push PLAYING state
    pushState(GameMode.VOCAB, AppState.PLAYING, vocabCategory, vocabLevel);
    
    setVocabDirection(direction);
    setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    setAppState(AppState.LOADING); // Immediate UI update while keeping history correct

    try {
      const cards = await getStaticFlashcards(vocabCategory, vocabLevel);
      setFlashcards(cards);
      setAppState(AppState.PLAYING);
    } catch (err) {
      console.error(err);
      setErrorMsg("Nije uspelo učitavanje kartica.");
      setAppState(AppState.ERROR);
    }
  };

  const handleCustomStart = (cards: FlashCard[]) => {
    setFlashcards(cards);
    setVocabDirection(FlashCardDirection.SER_HUN); 
    pushState(GameMode.CUSTOM_VOCAB, AppState.PLAYING);
  };

  const handleGameComplete = (gameResults: GameResult[]) => {
    setResults(gameResults);
    
    // Replace the PLAYING history entry with RESULTS so "Back" goes to Menu, not Game
    replaceState(currentMode, AppState.RESULTS, vocabCategory, vocabLevel);

    // Mistake tracking logic...
    const struggles: string[] = [];
    const mastered: string[] = [];
    const incorrectMap = new Set<string>();
    gameResults.forEach(res => { if (!res.isCorrect) incorrectMap.add(res.card.serbian); });
    const uniqueCards = new Set<string>();
    gameResults.forEach(res => {
      const key = res.card.serbian;
      if (!uniqueCards.has(key)) {
        uniqueCards.add(key);
        if (incorrectMap.has(key)) struggles.push(key);
        else mastered.push(key);
      }
    });

    if (struggles.length > 0) addMistakes(struggles);
    if (mastered.length > 0) addMastered(mastered);
  };

  const handleRestart = () => {
    // Go back to menu
    handleBack();
  };

  const handlePlayAgain = () => {
    if (vocabCategory && vocabLevel) {
       // Replace RESULTS with PLAYING again
       replaceState(GameMode.VOCAB, AppState.PLAYING, vocabCategory, vocabLevel);
       // Re-fetch logic or reuse? Better to re-fetch for shuffle
       setAppState(AppState.LOADING);
       getStaticFlashcards(vocabCategory, vocabLevel).then(cards => {
          setFlashcards(cards);
          setAppState(AppState.PLAYING);
       });
    } else {
      handleRestart();
    }
  };

  if (uiState === 'landing') return <LandingPage onStart={() => setUiState('login')} />;
  if (uiState === 'login' || !user) return <Login onLogin={handleLogin} />;

  const renderContent = () => {
    switch (currentMode) {
      case GameMode.DASHBOARD: return <Dashboard onSelectMode={handleNavigation} user={user} />;
      case GameMode.CONJUGATION: return <ConjugationGame onGoBack={handleBack} />;
      case GameMode.GRAMMAR: return <GrammarChat onGoBack={handleBack} />;
      case GameMode.STORIES: return <StoryGame onGoBack={handleBack} />;
      case GameMode.DICTIONARY: return <Dictionary onGoBack={handleBack} />;
      case GameMode.VOCAB:
      case GameMode.CUSTOM_VOCAB:
        if (appState === AppState.MENU) {
            return currentMode === GameMode.VOCAB 
              ? <CategorySelection 
                  selectedCategory={vocabCategory}
                  selectedLevel={vocabLevel}
                  onSelectCategory={handleVocabCategorySelect}
                  onSelectLevel={handleVocabLevelSelect}
                  onStartGame={handleVocabGameStart}
                  onGoBack={handleBack}
                />
              : <CustomVocabSetup onStart={handleCustomStart} onGoBack={handleBack} />;
        }
        if (appState === AppState.LOADING) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
               <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
               <p className="text-lg text-slate-600 font-medium animate-pulse">{loadingMsg}</p>
            </div>
          );
        }
        if (appState === AppState.ERROR) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Greška.</h2>
              <p className="text-slate-600 mb-4">{errorMsg}</p>
              <button onClick={handleBack} className="px-6 py-3 bg-slate-900 text-white rounded-lg">Nazad</button>
            </div>
          );
        }
        if (appState === AppState.PLAYING) {
          return (
            <ActiveGame 
              cards={flashcards}
              onComplete={handleGameComplete}
              onCancel={handleBack}
              direction={vocabDirection}
            />
          );
        }
        if (appState === AppState.RESULTS) {
          return <Results results={results} onRestart={handleRestart} onPlayAgain={handlePlayAgain} />;
        }
        return null;
      default: return <Dashboard onSelectMode={handleNavigation} user={user} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans">
      <Navbar currentMode={currentMode} onNavigate={handleNavigation} user={user} />
      <main className="flex-1 w-full">{renderContent()}</main>
    </div>
  );
};

export default App;