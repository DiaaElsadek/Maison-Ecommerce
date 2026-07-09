import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PriceDisplay } from '@/components/brand/PriceDisplay';
import { StarRating } from '@/components/brand/StarRating';
import { useCart } from '@/hooks/use-cart';
import type { FakeProduct } from '@/types/api';
import { useNavigate } from 'react-router';
import { productPath } from '@/config/routes';
import { ProductSizePicker } from '@/components/product/ProductSizePicker';

interface QuickViewModalProps {
  product: FakeProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ product, open, onOpenChange }: QuickViewModalProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const mockSizes = ['S', 'M', 'L', 'XL'];
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  
  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({ product, size, color: 'Default', quantity: 1 });
    onOpenChange(false);
  };

  const navigateToProduct = () => {
    onOpenChange(false);
    navigate(productPath(product.id.toString()));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background shadow-2xl border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[90vh]">
            {/* Image side */}
            <div className="bg-secondary relative h-64 md:h-full overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details side */}
            <div className="p-8 overflow-y-auto flex flex-col relative">
              <Dialog.Close asChild>
                <button className="absolute top-4 right-4 p-2 bg-secondary hover:bg-border transition-colors rounded-none">
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>

              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-mono-brand mb-4">
                {product.category}
              </p>
              
              <Dialog.Title className="text-2xl font-display mb-4">
                {product.title}
              </Dialog.Title>

              <div className="flex items-center gap-4 mb-6">
                <PriceDisplay price={product.price} size="lg" />
                <StarRating rating={product.rating?.rate || 0} count={product.rating?.count || 0} size="sm" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8 line-clamp-4">
                {product.description}
              </p>

              <div className="mt-auto pt-6 border-t border-border space-y-6">
                <ProductSizePicker
                  sizes={mockSizes}
                  selectedSize={size}
                  onChange={(s) => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  error={sizeError}
                />

                <div className="flex gap-4">
                  <Button variant="primary" className="flex-1" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={navigateToProduct}>
                    Full Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
