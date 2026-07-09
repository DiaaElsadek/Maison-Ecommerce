import { apiClient } from './axios';
import { FakeProduct } from '@/types/api';

export const productsApi = {
  getAllProducts: async (limit?: number, sort?: 'asc' | 'desc') => {
    let url = '/products';
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (sort) params.append('sort', sort);
    if (params.toString()) url += `?${params.toString()}`;
    const { data } = await apiClient.get<FakeProduct[]>(url);
    return data;
  },

  getProductById: async (id: number | string) => {
    const { data } = await apiClient.get<FakeProduct>(`/products/${id}`);
    return data;
  },

  getCategories: async () => {
    const { data } = await apiClient.get<string[]>('/products/categories');
    return data;
  },

  getProductsByCategory: async (category: string, limit?: number, sort?: 'asc' | 'desc') => {
    let url = `/products/category/${category}`;
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (sort) params.append('sort', sort);
    if (params.toString()) url += `?${params.toString()}`;
    const { data } = await apiClient.get<FakeProduct[]>(url);
    return data;
  }
};
