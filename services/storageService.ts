
import { User } from '../types';

const USER_KEY = 'magyar_master_user';

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
