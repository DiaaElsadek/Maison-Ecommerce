import React, { createContext, useCallback, useMemo, useState } from 'react';

interface WishlistContextValue {
  ids: string[];
  count: number;
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function loadWishlistFromStorage(): string[] {
  try {
    const raw = localStorage.getItem('maison-wishlist');
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveWishlistToStorage(ids: string[]): void {
  localStorage.setItem('maison-wishlist', JSON.stringify(ids));
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(loadWishlistFromStorage);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveWishlistToStorage(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids]);

  const clear = useCallback(() => {
    setIds([]);
    saveWishlistToStorage([]);
  }, []);

  const count = ids.length;

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count, toggle, isWishlisted, clear }),
    [ids, count, toggle, isWishlisted, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export { WishlistContext };
