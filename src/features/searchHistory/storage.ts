import { StorageService } from '@/lib/storage';

export const searchHistoryStorage = new StorageService<string[]>({
  key: 'maison_search_history',
  version: 1,
  maxItems: 10,
  fallback: [],
  validate: (data): data is string[] => Array.isArray(data) && data.every(item => typeof item === 'string')
});
