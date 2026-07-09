import React, { createContext, useCallback, useMemo, useState } from 'react';

import { StorageService } from '@/lib/storage';

interface WishlistContextValue {
  ids: string[];
  count: number;
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const wishlistStorage = new StorageService<string[]>({
  key: 'maison-wishlist',
  version: 2,
  fallback: [],
  validate: (data): data is string[] => Array.isArray(data) && data.every(item => typeof item === 'string')
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(wishlistStorage.get());

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      wishlistStorage.set(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids]);

  const clear = useCallback(() => {
    setIds([]);
    wishlistStorage.clear();
  }, []);

  const count = ids.length;

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count, toggle, isWishlisted, clear }),
    [ids, count, toggle, isWishlisted, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export { WishlistContext };
