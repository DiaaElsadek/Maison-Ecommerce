import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductListItem } from '@/components/product/ProductListItem';
import { CategoryFilters } from './CategoryFilters';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { Skeleton } from '@/app/components/ui/skeleton';
import { usePreferences } from '@/features/preferences/usePreferences';
import type { SortOption } from '@/types';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(category);

  // Sync state if URL changes
  React.useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  // Map UI categories to FakeStoreAPI categories
  const categoryMap: Record<string, string> = {
    "Women": "women's clothing",
    "Men": "men's clothing",
    "Accessories": "jewelery",
    "Beauty": "electronics",
    "Maison": "electronics"
  };

  const mappedCategory = activeCategory ? (categoryMap[activeCategory] || activeCategory.toLowerCase()) : undefined;

  const [sort, setSort] = useState<SortOption>('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const { viewMode, setViewMode } = usePreferences();
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showCount, setShowCount] = useState(8);

  const { data: apiProducts = [], isLoading } = useQuery({
    queryKey: ['products-all'],
    queryFn: () => productsApi.getAllProducts()
  });

  const filtered = useMemo(() => {
    let items = apiProducts;

    if (mappedCategory) {
      items = items.filter(p => p.category === mappedCategory);
    }

    items = items.filter((p) => p.price <= priceRange[1]);

    if (selectedSizes.length > 0) {
      // FakeStoreAPI doesn't have sizes, we'll mock size filtering by just passing them through if it's not strictly typed.
      // We will skip size filtering for fake store since there are no sizes.
    }

    return items;
  }, [apiProducts, mappedCategory, priceRange, selectedSizes]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      return 0; // FakeStore doesn't have newest/bestseller properties
    });
  }, [filtered, sort]);

  const displayed = sorted.slice(0, showCount);

  return (
    <div>
      <div className="bg-secondary py-16 px-6 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4 font-mono-brand">
          Collection
        </p>
        <h1 className="text-5xl text-foreground font-display">
          {activeCategory ? activeCategory : 'All Pieces'}
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 label-mono hover:text-accent transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <span className="text-xs text-muted-foreground font-mono-brand">
              {sorted.length} results
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="label-mono bg-transparent border border-border px-3 py-2 focus:outline-none focus:border-foreground cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
            <div className="hidden md:flex items-center border border-border">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'grid'
                    ? 'bg-foreground text-primary-foreground'
                    : 'hover:bg-secondary'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'list'
                    ? 'bg-foreground text-primary-foreground'
                    : 'hover:bg-secondary'
                )}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          {filterOpen && (
            <CategoryFilters
              currentCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
            />
          )}

          {/* Product Grid/List */}
          <div className="flex-1">
            {isLoading ? (
              <div
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? filterOpen
                      ? 'grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-2 lg:grid-cols-4'
                    : 'grid-cols-1'
                )}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className={viewMode === 'grid' ? "aspect-[4/5] w-full" : "h-40 w-full"} />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No pieces match your current filters.</p>
                <button
                  onClick={() => {
                    setActiveCategory(undefined);
                    setPriceRange([0, 3000]);
                    setSelectedSizes([]);
                  }}
                  className="mt-4 label-mono hover:text-foreground"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    'grid gap-6',
                    viewMode === 'grid'
                      ? filterOpen
                        ? 'grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-2 lg:grid-cols-4'
                      : 'grid-cols-1'
                  )}
                >
                  {displayed.map((p) =>
                    viewMode === 'grid' ? (
                      <ProductCard key={p.id} product={p} />
                    ) : (
                      <ProductListItem key={p.id} product={p} />
                    )
                  )}
                </div>
                {showCount < sorted.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowCount((c) => c + 8)}
                      className="border border-foreground px-8 py-3 text-sm font-medium hover:bg-foreground hover:text-primary-foreground transition-colors font-mono-brand uppercase tracking-[0.08em]"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
