import { User } from '@/types';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('calix_token');
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('calix_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
};

export const setAuth = (token: string, user: User) => {
  localStorage.setItem('calix_token', token);
  localStorage.setItem('calix_user', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('calix_token');
  localStorage.removeItem('calix_user');
};

export const isAuthenticated = (): boolean => !!getToken();
