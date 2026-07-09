import React, { createContext, useCallback, useMemo, useState } from 'react';
import type { CartItem, Product } from '@/types';
import { FREE_DELIVERY_THRESHOLD, STANDARD_SHIPPING, EXPRESS_SHIPPING } from '@/config/constants';

import { StorageService } from '@/lib/storage';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  clearCart: () => void;
  getShipping: (method?: 'standard' | 'express') => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const cartStorage = new StorageService<CartItem[]>({
  key: 'maison-cart',
  version: 2,
  fallback: [],
  validate: (data): data is CartItem[] => Array.isArray(data) // simplistic check for now
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(cartStorage.get());

  const updateItems = useCallback((updater: (prev: CartItem[]) => CartItem[]) => {
    setItems((prev) => {
      const next = updater(prev);
      cartStorage.set(next);
      return next;
    });
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      updateItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
          return next;
        }
        return [...prev, item];
      });
    },
    [updateItems]
  );

  const updateQuantity = useCallback(
    (productId: number, size: string, color: string, quantity: number) => {
      updateItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
      );
    },
    [updateItems]
  );

  const removeItem = useCallback(
    (productId: number, size: string, color: string) => {
      updateItems((prev) =>
        prev.filter(
          (i) => !(i.product.id === productId && i.size === size && i.color === color)
        )
      );
    },
    [updateItems]
  );

  const clearCart = useCallback(() => {
    updateItems(() => []);
    cartStorage.clear();
  }, [updateItems]);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const getShipping = useCallback(
    (method: 'standard' | 'express' = 'standard') => {
      if (method === 'express') return EXPRESS_SHIPPING;
      return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_SHIPPING;
    },
    [subtotal]
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart, getShipping }),
    [items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart, getShipping]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext };
