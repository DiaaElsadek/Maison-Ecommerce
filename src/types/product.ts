import type { FakeProduct } from '@/types/api';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  materials: string;
  care: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  sku: string;
}

export interface CartItem {
  product: FakeProduct;
  quantity: number;
  color: string;
  size: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  tagline: string;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export type ViewMode = 'grid' | 'list';
