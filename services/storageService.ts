
import { User } from '../types';

const USER_KEY = 'magyar_master_user';
const MISTAKES_KEY = 'magyar_master_mistakes';
const MASTERED_KEY = 'magyar_master_mastered';
const FORINTS_KEY = 'magyar_master_forints';
const ADVENTURE_IMAGES_KEY = 'magyar_master_adventure_images';

export const saveUser = (name: string): User => {
  const newUser: User = {
    name
  };
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
};

export const getUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
};

// --- FORINT CURRENCY ---

export const getForints = (): number => {
  const data = localStorage.getItem(FORINTS_KEY);
  return data ? parseInt(data, 10) : 0;
};

export const addForints = (amount: number): number => {
  const current = getForints();
  const updated = current + amount;
  localStorage.setItem(FORINTS_KEY, updated.toString());
  return updated;
};

// --- MISTAKE TRACKING ---

export const getMistakes = (): string[] => {
  const data = localStorage.getItem(MISTAKES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as string[];
  } catch {
    return [];
  }
};

export const addMistakes = (words: string[]) => {
  const currentMistakes = getMistakes();
  const currentMastered = getMastered();

  const updatedMistakes = Array.from(new Set([...currentMistakes, ...words]));
  const updatedMastered = currentMastered.filter(w => !words.includes(w));

  localStorage.setItem(MISTAKES_KEY, JSON.stringify(updatedMistakes));
  localStorage.setItem(MASTERED_KEY, JSON.stringify(updatedMastered));
};

export const removeMistakes = (wordsToRemove: string[]) => {
  const current = getMistakes();
  const updated = current.filter(word => !wordsToRemove.includes(word));
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
};

// --- MASTERED TRACKING ---

export const getMastered = (): string[] => {
  const data = localStorage.getItem(MASTERED_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as string[];
  } catch {
    return [];
  }
};

export const addMastered = (words: string[]) => {
  const currentMastered = getMastered();
  const currentMistakes = getMistakes();

  const updatedMastered = Array.from(new Set([...currentMastered, ...words]));
  const updatedMistakes = currentMistakes.filter(w => !words.includes(w));

  localStorage.setItem(MASTERED_KEY, JSON.stringify(updatedMastered));
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(updatedMistakes));
};

// --- ADVENTURE CUSTOM IMAGES TRACKING ---

export const getCustomAdventureImages = (): { intro: Record<number, string>, story: Record<number, string> } => {
  const data = localStorage.getItem(ADVENTURE_IMAGES_KEY);
  if (!data) return { intro: {}, story: {} };
  try {
    return JSON.parse(data);
  } catch {
    return { intro: {}, story: {} };
  }
};

export const saveCustomAdventureImage = (step: number, type: 'intro' | 'story', base64: string) => {
  const current = getCustomAdventureImages();
  if (type === 'intro') {
    current.intro[step] = base64;
  } else {
    current.story[step] = base64;
  }
  localStorage.setItem(ADVENTURE_IMAGES_KEY, JSON.stringify(current));
};
