import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { FREE_DELIVERY_THRESHOLD, STANDARD_SHIPPING, EXPRESS_SHIPPING } from '@/config/constants';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  clearCart: () => void;
  getShipping: (method?: 'standard' | 'express') => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingIdx = state.items.findIndex(
          (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
        );
        if (existingIdx >= 0) {
          const newItems = [...state.items];
          newItems[existingIdx].quantity += item.quantity;
          return { items: newItems };
        }
        return { items: [...state.items, item] };
      }),
      updateQuantity: (productId, size, color, quantity) => set((state) => ({
        items: state.items.map((i) => 
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
      })),
      removeItem: (productId, size, color) => set((state) => ({
        items: state.items.filter((i) => !(i.product.id === productId && i.size === size && i.color === color))
      })),
      clearCart: () => set({ items: [] }),
      getShipping: (method = 'standard') => {
        const items = get().items;
        const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
        if (method === 'express') return EXPRESS_SHIPPING;
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_SHIPPING;
      },
    }),
    {
      name: 'maison-cart',
    }
  )
);
