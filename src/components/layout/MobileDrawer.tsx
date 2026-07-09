import React from 'react';
import { Link } from 'react-router';
import { X, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { CATEGORY_IDS } from '@/config/constants';
import { shopPath } from '@/config/routes';
import { Logo } from '@/components/brand/Logo';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';

interface MobileDrawerProps {
  onClose: () => void;
}

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="bg-background w-80 h-full flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-10">
          <Logo iconSize={16} wordmarkClassName="text-sm" />
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>
        {CATEGORY_IDS.map((c) => (
          <Link
            key={c}
            to={shopPath(c)}
            onClick={onClose}
            className="py-4 text-left text-sm tracking-[0.15em] uppercase border-b border-border hover:text-accent transition-colors font-mono-brand block"
          >
            {c}
          </Link>
        ))}
        <div className="mt-8 flex flex-col gap-4">
          <Link
            to="/search"
            onClick={onClose}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
          <Link
            to="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Heart className="w-4 h-4" />
            Wishlist ({wishlistCount})
          </Link>
          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Cart ({itemCount})
          </Link>
          <Link
            to="/auth"
            onClick={onClose}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-4 h-4" />
            Account
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-foreground/30" onClick={onClose} />
    </div>
  );
}
