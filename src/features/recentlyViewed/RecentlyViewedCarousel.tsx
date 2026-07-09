import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { useRecentlyViewed } from './useRecentlyViewed';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/app/components/ui/skeleton';

export function RecentlyViewedCarousel({ currentProductId }: { currentProductId?: number }) {
  const { ids } = useRecentlyViewed();
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => productsApi.getAllProducts()
  });

  if (ids.length === 0) return null;

  // Filter out the current product if we're on a product detail page
  const displayIds = ids.filter(id => id !== currentProductId).slice(0, 4);

  if (displayIds.length === 0) return null;

  const items = displayIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as typeof allProducts;

  if (isLoading) {
    return (
      <section className="py-20 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-2xl font-display mb-10">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-2xl font-display mb-10">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
