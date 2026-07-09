import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { CATEGORY_IDS } from '@/config/constants';
import { shopPath } from '@/config/routes';
import { Logo } from '@/components/brand/Logo';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { AnnouncementBar } from './AnnouncementBar';
import { SearchOverlay } from './SearchOverlay';
import { MobileDrawer } from './MobileDrawer';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main categories">
              {CATEGORY_IDS.map((c) => (
                <Link
                  key={c}
                  to={shopPath(c)}
                  className="text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors font-mono-brand"
                >
                  {c}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <Logo />
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex p-1 hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <Link
                to="/wishlist"
                className="hidden lg:flex p-1 hover:text-accent transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] flex items-center justify-center rounded-full font-mono-brand">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="hidden lg:flex p-1 hover:text-accent transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-primary-foreground text-[9px] flex items-center justify-center rounded-full font-mono-brand">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/auth"
                className="hidden lg:flex p-1 hover:text-accent transition-colors"
                aria-label="Account"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </>
  );
}
