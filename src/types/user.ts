export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export type AuthMode = 'signin' | 'signup';

export interface NotificationSettings {
  orders: boolean;
  promotions: boolean;
  newArrivals: boolean;
}

export interface MockOrder {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped';
  items: number;
  total: number;
  tracking: string;
}
