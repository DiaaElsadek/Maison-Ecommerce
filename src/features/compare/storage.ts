import { StorageService } from '@/lib/storage';

export const compareStorage = new StorageService<number[]>({
  key: 'maison_compare_v1',
  version: 1,
  maxItems: 3,
  fallback: [],
  validate: (data): data is number[] => Array.isArray(data) && data.every(item => typeof item === 'number')
});
