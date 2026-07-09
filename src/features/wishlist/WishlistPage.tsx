import React from 'react';
import { useNavigate } from 'react-router';
import { Heart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlist } from '@/hooks/use-wishlist';

export function WishlistPage() {
  const navigate = useNavigate();
  const { ids } = useWishlist();

  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-3xl text-foreground mb-4 font-display">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8">Save items you love to build your collection.</p>
        <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
          Explore Collection
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-4xl text-foreground font-display">Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-2">{items.length} items</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
