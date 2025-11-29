

export enum WordCategory {
  NOUNS = 'Nouns',
  VERBS = 'Verbs',
  ADJECTIVES = 'Adjectives',
  NUMBERS_CARDINAL = 'NumbersCardinal',
  NUMBERS_ORDINAL = 'NumbersOrdinal',
  ADVERBS = 'Adverbs'
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export enum GameMode {
  DASHBOARD = 'DASHBOARD',
  VOCAB = 'VOCAB',
  CONJUGATION = 'CONJUGATION',
  CUSTOM_VOCAB = 'CUSTOM_VOCAB',
  GRAMMAR = 'GRAMMAR',
  STORIES = 'STORIES'
}

export enum FlashCardDirection {
  SER_HUN = 'SER_HUN',
  HUN_SER = 'HUN_SER'
}

export interface FlashCard {
  id: string;
  serbian: string;
  hungarian: string;
  hungarianAlt: string[];
}

export interface GameResult {
  card: FlashCard;
  userAnswer: string;
  isCorrect: boolean;
}

export interface ConjugationTask {
  verbInfinite: string;
  translation: string;
  forms: {
    en: string; // Én
    te: string; // Te
    o: string;  // Ő
    mi: string; // Mi
    ti: string; // Ti
    ok: string; // Ők
  }
}

export interface StoryTask {
  title: string;
  hungarianText: string;
  serbianTranslation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppState {
  MENU = 'MENU',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface User {
  name: string;
}