import { StorageService } from '@/lib/storage';

export type ProductNotesRecord = Record<number, string>;

export const productNotesStorage = new StorageService<ProductNotesRecord>({
  key: 'maison_product_notes_v1',
  version: 1,
  fallback: {},
  validate: (data): data is ProductNotesRecord => {
    return typeof data === 'object' && data !== null && !Array.isArray(data);
  }
});
