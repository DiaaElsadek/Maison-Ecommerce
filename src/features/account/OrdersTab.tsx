import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { fmt } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { cartsApi } from '@/lib/api/carts';
import { productsApi } from '@/lib/api/products';
import { Skeleton } from '@/app/components/ui/skeleton';

export function OrdersTab() {
  const { user } = useAuth();
  
  const { data: carts = [], isLoading: isLoadingCarts } = useQuery({
    queryKey: ['user-carts', user?.id],
    queryFn: () => cartsApi.getUserCarts(user?.id || 1),
    enabled: !!user
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => productsApi.getAllProducts()
  });

  const getProductImage = (id: number) => {
    const p = allProducts.find(p => p.id === id);
    return p?.image || '';
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 font-display">Order History</h2>
      <div className="space-y-4">
        {isLoadingCarts ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))
        ) : carts.length === 0 ? (
          <p className="text-muted-foreground text-sm">You have no past orders.</p>
        ) : carts.map((order) => (
          <div key={order.id} className="border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-mono-brand">{new Date(order.date).toLocaleDateString()}</p>
                <p className="font-medium font-mono-brand">Order #{order.id}</p>
              </div>
              <div className="text-right">
                <span
                  className="text-xs px-2 py-1 font-mono-brand bg-secondary text-foreground"
                >
                  Delivered
                </span>
                {/* FakeStoreAPI carts don't include pricing, so we'll mock total or calc from products if available */}
                <p className="text-sm font-medium mt-2">
                  {fmt(order.products.reduce((acc, p) => {
                    const matched = allProducts.find(x => x.id === p.productId);
                    return acc + ((matched?.price || 0) * p.quantity);
                  }, 0))}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              {order.products.slice(0, 3).map((p, i) => (
                <div key={i} className="w-12 h-14 bg-secondary overflow-hidden">
                  {getProductImage(p.productId) && (
                    <img src={getProductImage(p.productId)} alt="Product" className="w-full h-full object-cover" />
                  )}
                </div>
              ))}
              {order.products.length > 3 && (
                <span className="text-xs text-muted-foreground font-mono-brand">
                  +{order.products.length - 3} more
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                View Order
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
