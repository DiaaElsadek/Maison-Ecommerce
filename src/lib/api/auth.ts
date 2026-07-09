import { apiClient } from './axios';
import { AuthResponse, FakeUser } from '@/types/api';

export const authApi = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', {
      username,
      password,
    });
    console.log("login", data);
    return data;
  },

  signup: async (userData: any): Promise<FakeUser> => {
    const { data } = await apiClient.post<FakeUser>('/users', userData);
    return data;
  },

  getAllUsers: async () => {
    const { data } = await apiClient.get<FakeUser[]>('/users');
    return data;
  },

  getUserById: async (id: number) => {
    const { data } = await apiClient.get<FakeUser>(`/users/${id}`);
    return data;
  },

  updateUser: async (id: number, updateData: Partial<FakeUser>) => {
    const { data } = await apiClient.put(`/users/${id}`, updateData);
    return data;
  }
};
