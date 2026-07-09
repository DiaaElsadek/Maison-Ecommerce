import { StorageService } from '@/lib/storage';
import type { ViewMode } from '@/types';

export interface UIPreferences {
  viewMode: ViewMode;
}

export const preferencesStorage = new StorageService<UIPreferences>({
  key: 'maison_preferences_v1',
  version: 2,
  fallback: { viewMode: 'grid' },
  validate: (data): data is UIPreferences => {
    return typeof data === 'object' && data !== null && ('viewMode' in data);
  }
});
