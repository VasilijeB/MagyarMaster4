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
import { StoryGame } from './components/StoryGame';
import { Login } from './components/Login';
import { LandingPage } from './components/LandingPage';
import { DonationButton } from './components/DonationButton';
import { LOADING_MESSAGES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uiState, setUiState] = useState<'landing' | 'login' | 'app'>('landing');
  
  // Navigation State
  const [currentMode, setCurrentMode] = useState<GameMode>(GameMode.DASHBOARD);
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  
  // Vocab State
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

  useEffect(() => {
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

        if (s.appState === AppState.PLAYING && flashcards.length === 0) {
           setAppState(AppState.MENU);
           window.history.replaceState({ ...s, appState: AppState.MENU }, '');
        }
      } else {
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

  const handleLogin = (name: string) => {
    const newUser = saveUser(name);
    setUser(newUser);
    setUiState('app');
  };

  const handleNavigation = (mode: GameMode) => {
    if (mode === currentMode && appState === AppState.MENU && !vocabCategory) return;
    pushState(mode, AppState.MENU);
    setFlashcards([]);
    setResults([]);
  };

  const handleVocabCategorySelect = (category: WordCategory) => {
    pushState(GameMode.VOCAB, AppState.MENU, category, null);
  };

  const handleVocabLevelSelect = (level: DifficultyLevel) => {
    pushState(GameMode.VOCAB, AppState.MENU, vocabCategory, level);
  };

  const handleVocabGameStart = async (direction: FlashCardDirection) => {
    if (!vocabCategory || !vocabLevel) return;
    pushState(GameMode.VOCAB, AppState.PLAYING, vocabCategory, vocabLevel);
    setVocabDirection(direction);
    setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    setAppState(AppState.LOADING);

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
    replaceState(currentMode, AppState.RESULTS, vocabCategory, vocabLevel);

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
    handleBack();
  };

  const handlePlayAgain = () => {
    if (vocabCategory && vocabLevel) {
       replaceState(GameMode.VOCAB, AppState.PLAYING, vocabCategory, vocabLevel);
       setAppState(AppState.LOADING);
       getStaticFlashcards(vocabCategory, vocabLevel).then(cards => {
          setFlashcards(cards);
          setAppState(AppState.PLAYING);
       });
    } else {
      handleRestart();
    }
  };

  const renderContent = () => {
    switch (currentMode) {
      case GameMode.DASHBOARD: return <Dashboard onSelectMode={handleNavigation} user={user} />;
      case GameMode.CONJUGATION: return <ConjugationGame onGoBack={handleBack} />;
      case GameMode.STORIES: return <StoryGame onGoBack={handleBack} />;
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

  if (uiState === 'landing') return <LandingPage onStart={() => setUiState('login')} />;
  if (uiState === 'login') return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans">
      <Navbar currentMode={currentMode} onNavigate={handleNavigation} user={user} />
      <main className="flex-1 w-full">{renderContent()}</main>
      <DonationButton />
    </div>
  );
};

export default App;