import { StorageService } from '@/lib/storage';

export const recentlyViewedStorage = new StorageService<number[]>({
  key: 'maison_recently_viewed',
  version: 1,
  maxItems: 20,
  fallback: [],
  validate: (data): data is number[] => Array.isArray(data) && data.every(item => typeof item === 'number')
});
