
import { User } from '../types';

const USER_KEY = 'magyar_master_user';
const MISTAKES_KEY = 'magyar_master_mistakes';
const MASTERED_KEY = 'magyar_master_mastered';
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

  // Add to mistakes (unique)
  const updatedMistakes = Array.from(new Set([...currentMistakes, ...words]));
  
  // If a word is now a mistake, remove it from mastered list (regression)
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

  // Add to mastered (unique)
  const updatedMastered = Array.from(new Set([...currentMastered, ...words]));

  // Remove from mistakes if it was there (improvement)
  const updatedMistakes = currentMistakes.filter(w => !words.includes(w));

  localStorage.setItem(MASTERED_KEY, JSON.stringify(updatedMastered));
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(updatedMistakes));
};

// --- ADVENTURE CUSTOM IMAGES TRACKING ---

/**
 * Retrieves custom uploaded images for the adventure mode from local storage.
 */
export const getCustomAdventureImages = (): { intro: Record<number, string>, story: Record<number, string> } => {
  const data = localStorage.getItem(ADVENTURE_IMAGES_KEY);
  if (!data) return { intro: {}, story: {} };
  try {
    return JSON.parse(data);
  } catch {
    return { intro: {}, story: {} };
  }
};

/**
 * Saves custom uploaded images for a specific adventure step.
 */
export const saveCustomAdventureImage = (step: number, type: 'intro' | 'story', base64: string) => {
  const current = getCustomAdventureImages();
  if (type === 'intro') {
    current.intro[step] = base64;
  } else {
    current.story[step] = base64;
  }
  localStorage.setItem(ADVENTURE_IMAGES_KEY, JSON.stringify(current));
};
