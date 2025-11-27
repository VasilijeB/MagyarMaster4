
import React, { useState, useEffect } from 'react';
import { AppState, FlashCard, GameResult, WordCategory, DifficultyLevel, GameMode, FlashCardDirection, User } from './types';
import { generateFlashcards } from './services/geminiService';
import { saveUser, getUser } from './services/storageService';
import { CategorySelection } from './components/CategorySelection';
import { ActiveGame } from './components/ActiveGame';
import { Results } from './components/Results';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ConjugationGame } from './components/ConjugationGame';
import { CustomVocabSetup } from './components/CustomVocabSetup';
import { GrammarChat } from './components/GrammarChat';
import { StoryGame } from './components/StoryGame';
import { Login } from './components/Login';
import { LOADING_MESSAGES } from './constants';

const App: React.FC = () => {
  // User Authentication
  const [user, setUser] = useState<User | null>(null);

  // Navigation State
  const [currentMode, setCurrentMode] = useState<GameMode>(GameMode.DASHBOARD);
  
  // Flashcard Game State
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [results, setResults] = useState<GameResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState<string>(LOADING_MESSAGES[0]);
  const [vocabDirection, setVocabDirection] = useState<FlashCardDirection>(FlashCardDirection.SER_HUN);

  // Load user on mount
  useEffect(() => {
    const loadedUser = getUser();
    if (loadedUser) {
      setUser(loadedUser);
    }
  }, []);

  const handleLogin = (name: string) => {
    const newUser = saveUser(name);
    setUser(newUser);
  };

  // Handler for standard vocab game
  const handleVocabStart = async (category: WordCategory, level: DifficultyLevel, direction: FlashCardDirection) => {
    setAppState(AppState.LOADING);
    setVocabDirection(direction);
    setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    try {
      const cards = await generateFlashcards(category, level);
      setFlashcards(cards);
      setAppState(AppState.PLAYING);
    } catch (err) {
      console.error(err);
      setErrorMsg("Nije uspelo generisanje kartica.");
      setAppState(AppState.ERROR);
    }
  };

  // Handler for custom vocab game start
  const handleCustomStart = (cards: FlashCard[]) => {
    setFlashcards(cards);
    setVocabDirection(FlashCardDirection.SER_HUN); 
    setAppState(AppState.PLAYING);
  };

  const handleGameComplete = (gameResults: GameResult[]) => {
    setResults(gameResults);
    setAppState(AppState.RESULTS);
  };

  const handleRestart = () => {
    setAppState(AppState.MENU);
    setFlashcards([]);
    setResults([]);
  };

  const handleNavigation = (mode: GameMode) => {
    setCurrentMode(mode);
    setAppState(AppState.MENU);
    setFlashcards([]);
    setResults([]);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Render content based on current Mode
  const renderContent = () => {
    switch (currentMode) {
      case GameMode.DASHBOARD:
        return <Dashboard onSelectMode={handleNavigation} user={user} />;
      
      case GameMode.CONJUGATION:
        return <ConjugationGame />;
      
      case GameMode.GRAMMAR:
        return <GrammarChat />;

      case GameMode.STORIES:
        return <StoryGame />;
        
      case GameMode.VOCAB:
      case GameMode.CUSTOM_VOCAB:
        if (appState === AppState.MENU) {
            if (currentMode === GameMode.VOCAB) {
                return <CategorySelection onSelect={handleVocabStart} />;
            } else {
                return <CustomVocabSetup onStart={handleCustomStart} />;
            }
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
              <button onClick={() => setAppState(AppState.MENU)} className="px-6 py-3 bg-slate-900 text-white rounded-lg">Nazad</button>
            </div>
          );
        }
        if (appState === AppState.PLAYING) {
          return (
            <ActiveGame 
              cards={flashcards}
              onComplete={handleGameComplete}
              onCancel={() => handleNavigation(GameMode.DASHBOARD)}
              direction={vocabDirection}
            />
          );
        }
        if (appState === AppState.RESULTS) {
          return <Results results={results} onRestart={handleRestart} />;
        }
        return null;
        
      default:
        return <Dashboard onSelectMode={handleNavigation} user={user} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans">
      <Navbar currentMode={currentMode} onNavigate={handleNavigation} user={user} />
      <main className="flex-1 w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
