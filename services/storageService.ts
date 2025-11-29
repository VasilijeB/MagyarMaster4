
import { User } from '../types';

const USER_KEY = 'magyar_master_user';
const MISTAKES_KEY = 'magyar_master_mistakes';

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

// We store an array of unique Serbian words that the user struggled with.
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
  const current = getMistakes();
  // Create a Set to ensure uniqueness
  const updated = Array.from(new Set([...current, ...words]));
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
};

export const removeMistakes = (wordsToRemove: string[]) => {
  const current = getMistakes();
  const updated = current.filter(word => !wordsToRemove.includes(word));
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
};
