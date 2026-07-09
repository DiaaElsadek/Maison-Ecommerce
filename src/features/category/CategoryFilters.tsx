import React from 'react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/data/categories';
import { Link } from 'react-router';
import { shopPath } from '@/config/routes';

interface CategoryFiltersProps {
  currentCategory?: string;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
}

export function CategoryFilters({
  currentCategory,
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
}: CategoryFiltersProps) {
  const toggleSize = (s: string) => {
    setSelectedSizes(
      selectedSizes.includes(s)
        ? selectedSizes.filter((x) => x !== s)
        : [...selectedSizes, s]
    );
  };

  return (
    <aside className="w-56 flex-shrink-0 space-y-8">
      <div>
        <p className="label-mono font-medium mb-4">Category</p>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to={shopPath(c.id)}
            className={cn(
              'block w-full text-left py-1.5 text-sm transition-colors',
              c.id === currentCategory
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div>
        <p className="label-mono font-medium mb-4">Price</p>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-foreground"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono-brand">
            <span>£0</span>
            <span>£{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <p className="label-mono font-medium mb-4">Size</p>
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={cn(
                'w-10 h-10 text-xs border transition-colors font-mono-brand',
                selectedSizes.includes(s)
                  ? 'bg-foreground text-primary-foreground border-foreground'
                  : 'border-border hover:border-foreground'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
