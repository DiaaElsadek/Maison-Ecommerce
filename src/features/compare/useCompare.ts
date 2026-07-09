import { useState, useCallback, useEffect } from 'react';
import { compareStorage } from './storage';
import { toast } from 'sonner';

export function useCompare() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    setIds(compareStorage.get());
  }, []);

  const toggleCompare = useCallback((id: number) => {
    setIds(prev => {
      const exists = prev.includes(id);
      let next;
      if (exists) {
        next = prev.filter(pId => pId !== id);
      } else {
        if (prev.length >= 3) {
          toast.error('You can only compare up to 3 products.');
          return prev;
        }
        next = [...prev, id];
        toast.success('Added to comparison');
      }
      compareStorage.set(next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    compareStorage.clear();
    setIds([]);
  }, []);

  const isComparing = useCallback((id: number) => ids.includes(id), [ids]);

  return { ids, toggleCompare, clearCompare, isComparing };
}
