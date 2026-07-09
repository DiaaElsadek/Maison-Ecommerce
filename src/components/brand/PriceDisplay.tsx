import React from 'react';
import { fmt } from '@/lib/format';
import { ProductBadge } from './Badge';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'lg';
}

export function PriceDisplay({ price, originalPrice, size = 'sm' }: PriceDisplayProps) {
  const textSize = size === 'lg' ? 'text-2xl' : 'text-sm';
  const originalSize = size === 'lg' ? 'text-lg' : 'text-sm';

  return (
    <div className="flex items-center gap-2">
      <span className={`${textSize} text-foreground`}>{fmt(price)}</span>
      {originalPrice && (
        <>
          <span className={`${originalSize} text-muted-foreground line-through`}>
            {fmt(originalPrice)}
          </span>
          {size === 'lg' && <ProductBadge variant="sale">Sale</ProductBadge>}
        </>
      )}
    </div>
  );
}
