import React, { createContext, useCallback, useMemo, useState } from 'react';
import type { User } from '@/types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUserFromStorage(): User | null {
  try {
    const raw = localStorage.getItem('maison-user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveUserToStorage(user: User | null): void {
  if (user) {
    localStorage.setItem('maison-user', JSON.stringify(user));
  } else {
    localStorage.removeItem('maison-user');
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUserFromStorage);

  const signIn = useCallback((u: User) => {
    setUser(u);
    saveUserToStorage(u);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    saveUserToStorage(null);
  }, []);

  const isAuthenticated = user !== null;

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated, signIn, signOut }),
    [user, isAuthenticated, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
