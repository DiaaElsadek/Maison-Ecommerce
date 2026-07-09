import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { User, Package, Heart, Bell, RotateCcw, Settings, LogOut } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useWishlist } from '@/hooks/use-wishlist';
import { ProfileTab } from './ProfileTab';
import { OrdersTab } from './OrdersTab';
import { NotificationsTab } from './NotificationsTab';
import { ReturnsTab } from './ReturnsTab';
import { SettingsTab } from './SettingsTab';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';

type TabId = 'profile' | 'orders' | 'wishlist' | 'notifications' | 'returns' | 'settings';

export function AccountPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { ids: wishlistIds } = useWishlist();
  const [tab, setTab] = useState<TabId>('profile');

  // Protect route
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const TABS = [
    { id: 'profile' as const, label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'orders' as const, label: 'Orders', icon: <Package className="w-4 h-4" /> },
    { id: 'wishlist' as const, label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
    { id: 'notifications' as const, label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'returns' as const, label: 'Returns', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'settings' as const, label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl text-foreground font-display">My Account</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user.name}.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="space-y-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left font-mono-brand',
                  tab === t.id
                    ? 'bg-foreground text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {tab === 'profile' && <ProfileTab user={user} />}
          {tab === 'orders' && <OrdersTab />}
          {tab === 'wishlist' && (
            <div>
              <h2 className="text-xl font-medium mb-6 font-display">
                Saved Pieces ({wishlistProducts.length})
              </h2>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nothing saved yet.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => navigate('/shop')}
                  >
                    Explore
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === 'notifications' && <NotificationsTab />}
          {tab === 'returns' && <ReturnsTab />}
          {tab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}
