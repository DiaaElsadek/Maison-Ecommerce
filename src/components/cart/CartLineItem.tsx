import React from 'react';
import { Link } from 'react-router';
import { X, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fmt } from '@/lib/format';
import { productPath } from '@/config/routes';
import { useCart } from '@/hooks/use-cart';
import type { CartItem as CartItemType } from '@/types';

interface CartLineItemProps {
  item: CartItemType;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-6 py-8 border-b border-border">
      <Link
        to={productPath(item.product.id.toString())}
        className="w-24 h-32 flex-shrink-0 bg-secondary overflow-hidden"
      >
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <p className="label-mono text-muted-foreground mb-1">{item.product.category}</p>
            <h3 className="font-medium text-base mb-1">{item.product.title}</h3>
            <p className="text-xs text-muted-foreground font-mono-brand">
              {item.color} · Size {item.size}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.product.id, item.size, item.color)}
            className="p-1 hover:text-destructive transition-colors"
            aria-label={`Remove ${item.product.title} from cart`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-border">
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.size, item.color, Math.max(1, item.quantity - 1))
              }
              className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-xs font-mono-brand">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
              }
              className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="font-medium">{fmt(item.product.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
