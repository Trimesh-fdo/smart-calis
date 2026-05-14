'use client';
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { getUser, getToken, setAuth, clearAuth } from '@/utils/auth';
import { userAPI } from '@/services/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tok = getToken();
    const usr = getUser();
    setToken(tok);
    setUser(usr);
    setLoading(false);
  }, []);

  // After login the backend only returns { id, name, email }.
  // We immediately fetch the full profile so all dashboard pages have complete data.
  const login = async (tok: string, partialUser: User) => {
    // Store token first so the API interceptor can attach it
    localStorage.setItem('calix_token', tok);
    document.cookie = `calix_token=${tok}; path=/; max-age=${7 * 24 * 60 * 60}`;
    setToken(tok);

    try {
      const res = await userAPI.getProfile();
      const fullUser: User = res.data;
      setAuth(tok, fullUser);
      setUser(fullUser);
    } catch {
      // Fallback to partial user if profile fetch fails
      const fallback = { ...partialUser, _id: (partialUser as unknown as { id: string }).id ?? partialUser._id };
      setAuth(tok, fallback);
      setUser(fallback);
    }
  };

  const logout = () => {
    clearAuth();
    document.cookie = 'calix_token=; path=/; max-age=0';
    setToken(null);
    setUser(null);
  };

  const updateUser = (updated: User) => {
    localStorage.setItem('calix_user', JSON.stringify(updated));
    setUser(updated);
  };

  return { user, token, loading, login, logout, updateUser, isAuthenticated: !!token };
}
