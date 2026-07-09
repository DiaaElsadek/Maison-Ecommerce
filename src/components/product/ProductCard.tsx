import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { fmt } from '@/lib/format';
import { productPath } from '@/config/routes';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCompare } from '@/features/compare/useCompare';
import { StarRating } from '@/components/brand/StarRating';
import { ProductBadge } from '@/components/brand/Badge';
import type { FakeProduct } from '@/types/api';

interface ProductCardProps {
  product: FakeProduct;
}

export const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id.toString());
  
  const { toggleCompare, isComparing } = useCompare();
  const comparing = isComparing(product.id);

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative overflow-hidden bg-secondary mb-3" style={{ aspectRatio: '4/5' }}>
        <Link to={productPath(product.id.toString())}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.rating?.rate > 4.5 && <ProductBadge variant="bestseller">Top Rated</ProductBadge>}
        </div>
        <button
          onClick={() => toggle(product.id.toString())}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'w-4 h-4',
              wishlisted ? 'fill-foreground text-foreground' : 'text-foreground'
            )}
          />
        </button>
        <button
          onClick={() => toggleCompare(product.id)}
          className="absolute top-12 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all hover:bg-white mt-2"
          aria-label={comparing ? 'Remove from compare' : 'Add to compare'}
        >
          <ArrowLeftRight
            className={cn(
              'w-4 h-4',
              comparing ? 'text-accent' : 'text-foreground'
            )}
          />
        </button>
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            to={productPath(product.id.toString())}
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-foreground text-primary-foreground text-xs tracking-[0.08em] uppercase font-medium font-mono-brand transition-all hover:bg-foreground/85"
          >
            Quick View
          </Link>
        </div>
      </div>
      <Link to={productPath(product.id.toString())} className="block">
        <p className="label-mono text-muted-foreground mb-0.5 truncate">{product.category}</p>
        <h3 className="text-sm font-medium text-foreground mb-1 leading-tight line-clamp-1">{product.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">{fmt(product.price)}</span>
        </div>
        <div className="mt-1">
          <StarRating rating={product.rating?.rate || 0} count={product.rating?.count || 0} />
        </div>
      </Link>
    </motion.div>
  );
});
