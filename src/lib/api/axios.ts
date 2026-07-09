import axios from 'axios';
import { toast } from 'sonner';

const BASE_URL = 'https://fakestoreapi.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth:unauthorized'));
      toast.error('Session expired. Please sign in again.');
    } else {
      const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'An error occurred';
      toast.error(`API Error: ${errorMessage}`);
    }
    return Promise.reject(error);
  }
);
