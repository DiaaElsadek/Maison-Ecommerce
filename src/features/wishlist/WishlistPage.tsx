import React from 'react';
import { useNavigate } from 'react-router';
import { Heart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useWishlist } from '@/hooks/use-wishlist';
import { useProductNotes } from '@/features/productNotes/useProductNotes';
import { ProductNoteDialog } from '@/features/productNotes/ProductNoteDialog';
import { FileText, Pencil } from 'lucide-react';

export function WishlistPage() {
  const navigate = useNavigate();
  const { ids } = useWishlist();
  const { notes, saveNote, getNote } = useProductNotes();
  const [activeNoteProduct, setActiveNoteProduct] = React.useState<{ id: number, title: string } | null>(null);

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => productsApi.getAllProducts()
  });

  const items = allProducts.filter((p) => ids.includes(p.id.toString()));

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <h1 className="text-4xl text-foreground font-display mb-10">Wishlist</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] w-full" />
          ))}
        </div>
      </div>
    );
  }

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
        {items.map((p) => {
          const note = getNote(p.id);
          return (
            <div key={p.id} className="flex flex-col relative">
              <ProductCard product={p} />
              <div className="mt-2 border border-border p-3 flex flex-col items-start gap-2 bg-secondary/50 flex-1">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-mono-brand flex items-center gap-1.5">
                    <FileText className="w-3 h-3" /> Note
                  </span>
                  <button 
                    onClick={() => setActiveNoteProduct({ id: p.id, title: p.title })}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                </div>
                {note ? (
                  <p className="text-sm text-foreground italic line-clamp-3 leading-relaxed">"{note}"</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No note added.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {activeNoteProduct && (
        <ProductNoteDialog
          open={!!activeNoteProduct}
          onOpenChange={(open) => {
            if (!open) setActiveNoteProduct(null);
          }}
          productTitle={activeNoteProduct.title}
          initialNote={getNote(activeNoteProduct.id)}
          onSave={(newNote) => saveNote(activeNoteProduct.id, newNote)}
        />
      )}
    </div>
  );
}
