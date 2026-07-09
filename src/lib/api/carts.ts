import { apiClient } from './axios';
import { FakeCart, CartProduct } from '@/types/api';

export const cartsApi = {
  getUserCarts: async (userId: number) => {
    const { data } = await apiClient.get<FakeCart[]>(`/carts/user/${userId}`);
    return data;
  },

  addCart: async (userId: number, products: CartProduct[], date: string = new Date().toISOString().split('T')[0]) => {
    const { data } = await apiClient.post<FakeCart>('/carts', {
      userId,
      date,
      products
    });
    return data;
  }
};
