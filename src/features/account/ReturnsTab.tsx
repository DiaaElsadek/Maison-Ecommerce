import React from 'react';
import { Button } from '@/app/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { Skeleton } from '@/app/components/ui/skeleton';

export function ReturnsTab() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => productsApi.getAllProducts()
  });

  const demoProduct = allProducts[0];
  return (
    <div>
      <h2 className="text-xl font-medium mb-6 font-display">Returns & Exchanges</h2>
      <div className="bg-secondary p-6 mb-8">
        <h3 className="font-medium mb-2">Return Policy</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Full-price items may be returned within 30 days of delivery. Items must be unworn with all
          original tags attached. Sale items are final sale.
        </p>
      </div>
      <h3 className="font-medium mb-4">Eligible for Return</h3>
      <div className="border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-14 bg-secondary overflow-hidden flex-shrink-0">
            {isLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <img src={demoProduct?.image} alt="" className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            {isLoading ? (
              <Skeleton className="w-24 h-4 mb-2" />
            ) : (
              <p className="text-sm font-medium line-clamp-1">{demoProduct?.title || 'Product'}</p>
            )}
            <p className="text-xs text-muted-foreground font-mono-brand">
              MSN-K8PQ2A · Size M · Camel
            </p>
            <p className="text-xs text-accent mt-1 font-mono-brand">16 days remaining</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Initiate Return
        </Button>
      </div>
    </div>
  );
}
