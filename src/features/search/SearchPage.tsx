import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Search, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [q, setQ] = useState(initialQuery);

  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center border-b-2 border-foreground gap-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            autoFocus
            className="flex-1 py-4 text-2xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-display"
          />
          {q && (
            <button onClick={() => setQ('')}>
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      </div>

      {q ? (
        <>
          <p className="text-xs text-muted-foreground mb-8 tracking-[0.12em] uppercase font-mono-brand">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
          </p>
          {results.length > 0 ? (
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
        <div>
          <p className="text-xs text-muted-foreground mb-6 tracking-[0.15em] uppercase font-mono-brand">
            Popular searches
          </p>
          <div className="flex flex-wrap gap-3">
            {['Cashmere', 'Leather Bag', 'Overcoat', 'Loafers', 'Watch', 'Fragrance'].map((t) => (
              <button
                key={t}
                onClick={() => setQ(t)}
                className="px-5 py-2.5 border border-border text-sm hover:border-foreground hover:bg-secondary transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
