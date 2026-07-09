import React, { createContext, useCallback, useMemo, useState } from 'react';
import type { FakeUser } from '@/types/api';

interface AuthContextValue {
  user: FakeUser | null;
  isAuthenticated: boolean;
  signIn: (user: FakeUser, token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUserFromStorage(): FakeUser | null {
  try {
    const raw = localStorage.getItem('maison-user');
    return raw ? (JSON.parse(raw) as FakeUser) : null;
  } catch {
    return null;
  }
}

function saveUserToStorage(user: FakeUser | null): void {
  if (user) {
    localStorage.setItem('maison-user', JSON.stringify(user));
  } else {
    localStorage.removeItem('maison-user');
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FakeUser | null>(loadUserFromStorage);

  const signIn = useCallback((u: FakeUser, token: string) => {
    setUser(u);
    saveUserToStorage(u);
    localStorage.setItem('accessToken', token);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    saveUserToStorage(null);
    localStorage.removeItem('accessToken');
  }, []);

  const isAuthenticated = user !== null;

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated, signIn, signOut }),
    [user, isAuthenticated, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
