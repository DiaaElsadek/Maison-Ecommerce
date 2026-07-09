import React from 'react';
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import type { FakeProduct } from '@/types/api';

interface ProductGridProps {
  products: FakeProduct[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  const colClass =
    columns === 2
      ? 'grid-cols-2'
      : columns === 3
        ? 'grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-2 lg:grid-cols-4';

  return (
    <div className={cn('grid gap-6', colClass, className)}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
