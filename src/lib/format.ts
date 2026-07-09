import { BRAND_LOCALE } from '@/config/constants';

/**
 * Format a number as GBP currency.
 * Uses £ symbol with no decimal places for whole numbers.
 */
export function formatPrice(amount: number): string {
  return `\u00a3${amount.toLocaleString(BRAND_LOCALE, { minimumFractionDigits: 0 })}`;
}

/**
 * Shorthand alias for formatPrice — matches the original codebase convention.
 */
export const fmt = formatPrice;
