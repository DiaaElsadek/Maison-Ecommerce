import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router';
import { Heart, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/app/components/ui/button';
import { productsApi } from '@/lib/api/products';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductColorPicker } from '@/components/product/ProductColorPicker';
import { ProductSizePicker } from '@/components/product/ProductSizePicker';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { PriceDisplay } from '@/components/brand/PriceDisplay';
import { StarRating } from '@/components/brand/StarRating';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useRecentlyViewed } from '@/features/recentlyViewed/useRecentlyViewed';
import { RecentlyViewedCarousel } from '@/features/recentlyViewed/RecentlyViewedCarousel';
import { cn } from '@/lib/utils';
import type { ProductColor } from '@/types';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getProductById(productId!),
    enabled: !!productId
  });

  const { data: recommendations = [] } = useQuery({
    queryKey: ['recommendations', productId],
    queryFn: () => productsApi.getProductsByCategory(product?.category || '', 4),
    enabled: !!product?.category
  });

  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addViewedProduct } = useRecentlyViewed();

  React.useEffect(() => {
    if (product?.id) {
      addViewedProduct(product.id);
    }
  }, [product?.id, addViewedProduct]);

  // Mock UI properties to preserve design
  const mockColors: ProductColor[] = [
    { name: 'Default', hex: '#1A1814' }
  ];
  const mockSizes = ['S', 'M', 'L', 'XL'];
  const mockDetails = [
    'Made with high-quality materials',
    'Designed for durability and comfort',
    'Imported'
  ];
  
  const [color, setColor] = useState<ProductColor | null>(mockColors[0]);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'care'>('details');
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return <div className="py-20 text-center font-mono-brand">Loading...</div>;
  }

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const wishlisted = isWishlisted(product.id.toString());

  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({ product, size, color: color?.name || '', quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <div className="text-xs text-muted-foreground mb-8 font-mono-brand">
          Home / {product.category} / <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={[product.image]} productName={product.title} />

          {/* Product info */}
          <div className="py-2">
            <h1 className="text-4xl font-medium mb-3 font-display">{product.title}</h1>
            <div className="flex items-center justify-between mb-6">
              <PriceDisplay price={product.price} size="lg" />
              <StarRating rating={product.rating?.rate || 0} count={product.rating?.count || 0} size="md" />
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="space-y-8 border-t border-border pt-8">
              {color && (
                <ProductColorPicker
                  colors={mockColors}
                  selectedColor={color}
                  onChange={setColor}
                />
              )}

              <ProductSizePicker
                sizes={mockSizes}
                selectedSize={size}
                onChange={(s) => {
                  setSize(s);
                  setSizeError(false);
                }}
                error={sizeError}
              />

              <QuantitySelector quantity={quantity} onChange={setQuantity} />

              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
                <button
                  onClick={() => toggle(product.id.toString())}
                  className={cn(
                    'w-12 h-[52px] flex items-center justify-center border transition-colors',
                    wishlisted ? 'border-foreground text-foreground' : 'border-border text-muted-foreground hover:border-foreground'
                  )}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={cn('w-5 h-5', wishlisted ? 'fill-current' : '')} />
                </button>
              </div>

              {/* Accordion details */}
              <div className="border-t border-border pt-8 mt-12">
                <div className="flex gap-8 border-b border-border mb-6">
                  {(['details', 'materials', 'care'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={cn(
                        'pb-3 text-xs tracking-[0.15em] uppercase border-b-2 transition-colors font-mono-brand',
                        activeTab === t
                          ? 'border-foreground text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed min-h-[120px]">
                  {activeTab === 'details' && (
                    <ul className="space-y-2 list-inside list-disc">
                      {mockDetails.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'materials' && <p>100% Quality Materials.</p>}
                  {activeTab === 'care' && <p>Handle with care. Follow standard care instructions.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <section className="border-t border-border bg-secondary">
        <div className="max-w-screen-xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl mb-4 font-display">Client Reviews</h2>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-5xl font-light">{product.rating?.rate.toFixed(1) || '0.0'}</span>
                <div>
                  <StarRating rating={product.rating?.rate || 0} size="md" />
                  <p className="text-sm text-muted-foreground mt-1">Based on {product.rating?.count || 0} reviews</p>
                </div>
              </div>
              <Button variant="outline" size="md" className="mt-8">
                Write a Review
              </Button>
            </div>
            <div className="lg:col-span-2 space-y-8">
              {/* FakeStoreAPI has no review body data, so we'll omit the static reviews to keep it clean */}
              <div className="text-muted-foreground text-sm">
                User reviews are not provided by FakeStoreAPI.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl text-foreground font-display">You may also like</h2>
        </div>
        <ProductGrid products={recommendations} />
      </section>

      {/* Recently Viewed */}
      <RecentlyViewedCarousel currentProductId={product.id} />
    </div>
  );
}
