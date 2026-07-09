import React from 'react';
import { Link } from 'react-router';
import { fmt } from '@/lib/format';
import { productPath } from '@/config/routes';
import { StarRating } from '@/components/brand/StarRating';
import type { Product } from '@/types';

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Link
      to={productPath(product.id)}
      className="flex gap-6 border-b border-border pb-6 cursor-pointer group"
    >
      <div className="w-32 h-40 flex-shrink-0 overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 py-2">
        <p className="label-mono text-muted-foreground mb-1">{product.subcategory}</p>
        <h3 className="text-base font-medium mb-2">{product.name}</h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <span className="font-medium">{fmt(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {fmt(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
