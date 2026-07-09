export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  SHOP_CATEGORY: '/shop/:category',
  PRODUCT: '/product/:productId',
  SEARCH: '/search',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  AUTH: '/auth',
  ACCOUNT: '/account',
  SUPPORT: '/support',
  FAQ: '/faq',
  BLOG: '/blog',
  MAINTENANCE: '/maintenance',
} as const;

export function productPath(productId: string): string {
  return `/product/${productId}`;
}

export function shopPath(category?: string): string {
  return category ? `/shop/${category}` : '/shop';
}
