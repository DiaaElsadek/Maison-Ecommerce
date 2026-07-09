import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        if (!state.items.find(i => i.id === item.id)) {
          return { items: [...state.items, item] };
        }
        return state;
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.id !== productId)
      })),
      isInWishlist: (productId) => {
        return !!get().items.find(i => i.id === productId);
      }
    }),
    {
      name: 'maison-wishlist',
    }
  )
);
