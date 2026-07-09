import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export const StarRating = React.memo(function StarRating({
  rating,
  count,
  size = 'sm',
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(rating) ? 'full' : i < rating ? 'half' : 'empty'
  );
  const sz = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((s, i) => (
          <Star
            key={i}
            className={cn(
              sz,
              s === 'full'
                ? 'fill-accent text-accent'
                : s === 'half'
                  ? 'fill-accent/50 text-accent'
                  : 'fill-transparent text-border'
            )}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground font-mono-brand">({count})</span>
      )}
    </div>
  );
});
