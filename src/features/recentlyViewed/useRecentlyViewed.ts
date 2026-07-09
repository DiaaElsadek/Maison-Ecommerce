import { useState, useCallback, useEffect } from 'react';
import { recentlyViewedStorage } from './storage';

export function useRecentlyViewed() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    setIds(recentlyViewedStorage.get());
  }, []);

  const addViewedProduct = useCallback((id: number) => {
    setIds(prev => {
      const filtered = prev.filter(pId => pId !== id);
      const next = [id, ...filtered].slice(0, 20);
      recentlyViewedStorage.set(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    recentlyViewedStorage.clear();
    setIds([]);
  }, []);

  return { ids, addViewedProduct, clearHistory };
}
