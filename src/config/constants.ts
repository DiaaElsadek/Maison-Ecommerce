export const BRAND_NAME = 'Maison';
export const BRAND_CURRENCY = 'GBP';
export const BRAND_LOCALE = 'en-GB';
export const FREE_DELIVERY_THRESHOLD = 150;
export const STANDARD_SHIPPING = 8;
export const EXPRESS_SHIPPING = 15;
export const PROMO_CODE = 'MAISON10';
export const PROMO_DISCOUNT = 0.1;

export const CATEGORY_IDS = ['Women', 'Men', 'Accessories', 'Beauty'] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];
