import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Search, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useSearchHistory } from '@/features/searchHistory/useSearchHistory';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [q, setQ] = useState(initialQuery);
  const { history, addSearchTerm, removeTerm, clearHistory } = useSearchHistory();

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['all-products-search'],
    queryFn: () => productsApi.getAllProducts()
  });

  const results = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <form 
          className="flex items-center border-b-2 border-foreground gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            addSearchTerm(q);
          }}
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            autoFocus
            className="flex-1 py-4 text-2xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-display"
          />
          {q && (
            <button type="button" onClick={() => setQ('')}>
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </form>
      </div>

      {q ? (
        <>
          <p className="text-xs text-muted-foreground mb-8 tracking-[0.12em] uppercase font-mono-brand">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
          </p>
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] w-full" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl text-foreground mb-3 font-display">No results found</h2>
              <p className="text-muted-foreground mb-8">
                Try a different search term or browse our collections.
              </p>
              <Button variant="primary" onClick={() => navigate('/shop')}>
                Browse All Products
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {history.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-mono-brand">
                  Recent searches
                </p>
                <button 
                  onClick={clearHistory}
                  className="text-xs text-muted-foreground hover:text-foreground font-mono-brand underline"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {history.map((t) => (
                  <div key={t} className="flex items-center justify-between group">
                    <button
                      onClick={() => setQ(t)}
                      className="text-sm text-foreground hover:text-accent transition-colors flex-1 text-left py-2"
                    >
                      {t}
                    </button>
                    <button
                      onClick={() => removeTerm(t)}
                      className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <p className="text-xs text-muted-foreground mb-6 tracking-[0.15em] uppercase font-mono-brand">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-3">
              {['Cashmere', 'Leather Bag', 'Overcoat', 'Loafers', 'Watch', 'Fragrance'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setQ(t);
                    addSearchTerm(t);
                  }}
                  className="px-5 py-2.5 border border-border text-sm hover:border-foreground hover:bg-secondary transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
