import React from 'react';
import { useCompare } from './useCompare';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { X, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { fmt } from '@/lib/format';
import { StarRating } from '@/components/brand/StarRating';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { productPath } from '@/config/routes';

export function CompareDrawer() {
  const { ids, toggleCompare, clearCompare } = useCompare();
  const [isOpen, setIsOpen] = React.useState(false);

  const { data: allProducts = [] } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => productsApi.getAllProducts(),
    enabled: ids.length > 0
  });

  if (ids.length === 0) {
    if (isOpen) setIsOpen(false);
    return null;
  }

  const products = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as typeof allProducts;

  return (
    <>
      {/* Floating Action Bar */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground px-6 py-4 flex items-center gap-6 shadow-2xl z-40"
          >
            <div>
              <p className="text-sm font-medium font-display">Compare Products</p>
              <p className="text-xs text-primary-foreground/70 font-mono-brand">{ids.length} of 3 selected</p>
            </div>
            <div className="flex gap-3">
              <Button variant="accent" size="sm" onClick={() => setIsOpen(true)}>
                Compare
              </Button>
              <button onClick={clearCompare} className="text-primary-foreground/70 hover:text-primary-foreground">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 h-[85vh] bg-background border-t border-border z-50 overflow-y-auto"
            >
              <div className="max-w-screen-xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-display">Comparison</h2>
                  <div className="flex items-center gap-4">
                    <button onClick={clearCompare} className="text-sm text-muted-foreground hover:text-foreground font-mono-brand underline">
                      Clear All
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-2 bg-secondary hover:bg-border transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto pb-8">
                  <div className="flex gap-8 min-w-max">
                    {products.map(product => (
                      <div key={product.id} className="w-[300px] flex-shrink-0">
                        <div className="relative bg-secondary aspect-[4/5] mb-6">
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => toggleCompare(product.id)}
                            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white transition-colors text-foreground"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-mono-brand mb-1">{product.category}</p>
                            <h3 className="font-medium text-lg leading-tight line-clamp-2 min-h-[2.8rem]">{product.title}</h3>
                          </div>
                          
                          <div className="py-4 border-y border-border">
                            <p className="text-2xl">{fmt(product.price)}</p>
                          </div>

                          <div className="py-4 border-b border-border">
                            <p className="text-xs text-muted-foreground uppercase font-mono-brand mb-2">Rating</p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={product.rating.rate} size="sm" />
                              <span className="text-sm">({product.rating.count})</span>
                            </div>
                          </div>

                          <div className="py-4 border-b border-border min-h-[150px]">
                            <p className="text-xs text-muted-foreground uppercase font-mono-brand mb-2">Details</p>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{product.description}</p>
                          </div>

                          <Button variant="outline" className="w-full mt-4" asChild>
                            <Link to={productPath(product.id.toString())}>View Product</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Empty Slots */}
                    {Array.from({ length: 3 - products.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="w-[300px] flex-shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-border aspect-[4/5]">
                        <div className="w-12 h-12 bg-secondary flex items-center justify-center mb-4">
                          <span className="text-muted-foreground font-mono-brand">{i + products.length + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Add a product to compare</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
