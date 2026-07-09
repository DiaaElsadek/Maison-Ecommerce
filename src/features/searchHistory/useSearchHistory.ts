import { useState, useCallback, useEffect } from 'react';
import { searchHistoryStorage } from './storage';

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(searchHistoryStorage.get());
  }, []);

  const addSearchTerm = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setHistory(prev => {
      // Remove if it exists and put it at the front (case insensitive)
      const filtered = prev.filter(t => t.toLowerCase() !== trimmed.toLowerCase());
      const next = [trimmed, ...filtered].slice(0, 10);
      searchHistoryStorage.set(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    searchHistoryStorage.clear();
    setHistory([]);
  }, []);

  const removeTerm = useCallback((term: string) => {
    setHistory(prev => {
      const next = prev.filter(t => t !== term);
      searchHistoryStorage.set(next);
      return next;
    });
  }, []);

  return { history, addSearchTerm, clearHistory, removeTerm };
}
