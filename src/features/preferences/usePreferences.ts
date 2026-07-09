import { useState, useCallback, useEffect } from 'react';
import { preferencesStorage, type UIPreferences } from './storage';
import type { ViewMode } from '@/types';

export function usePreferences() {
  const [preferences, setPreferences] = useState<UIPreferences>(preferencesStorage.get());

  // Listen for storage events in case preferences are updated in another tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'maison_preferences_v1_v1') { // name_version format
        setPreferences(preferencesStorage.get());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setViewMode = useCallback((viewMode: ViewMode) => {
    setPreferences(prev => {
      const next = { ...prev, viewMode };
      preferencesStorage.set(next);
      return next;
    });
  }, []);

  return { 
    viewMode: preferences.viewMode, 
    setViewMode
  };
}
