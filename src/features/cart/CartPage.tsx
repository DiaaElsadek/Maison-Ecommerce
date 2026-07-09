import React from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CartLineItem } from '@/components/cart/CartLineItem';
import { OrderSummary } from '@/components/cart/OrderSummary';

export function CartPage() {
  const navigate = useNavigate();
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-3xl text-foreground mb-4 font-display">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8">Add something beautiful to begin.</p>
        <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <h1 className="text-4xl text-foreground mb-10 font-display">Your Bag ({items.length})</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-0 border-t border-border">
          {items.map((item) => (
            <CartLineItem key={`${item.product.id}-${item.size}-${item.color}`} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
