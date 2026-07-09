import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

// Providers
import { CartProvider } from '@/contexts/cart-context';
import { WishlistProvider } from '@/contexts/wishlist-context';
import { AuthProvider } from '@/contexts/auth-context';

// Layout
import { PageShell, MinimalShell } from '@/components/layout/PageShell';

// Features
import { HomePage } from '@/features/home/HomePage';
import { CategoryPage } from '@/features/category/CategoryPage';
import { ProductDetailPage } from '@/features/product/ProductDetailPage';
import { SearchPage } from '@/features/search/SearchPage';
import { CartPage } from '@/features/cart/CartPage';
import { WishlistPage } from '@/features/wishlist/WishlistPage';
import { CheckoutPage } from '@/features/checkout/CheckoutPage';
import { OrderConfirmation } from '@/features/checkout/OrderConfirmation';
import { AuthPage } from '@/features/auth/AuthPage';
import { AccountPage } from '@/features/account/AccountPage';
import { SupportPage } from '@/features/support/SupportPage';
import { FAQPage } from '@/features/faq/FAQPage';
import { BlogPage } from '@/features/blog/BlogPage';

// Errors
import { NotFoundPage } from '@/features/errors/NotFoundPage';
import { ErrorPage } from '@/features/errors/ErrorPage';
import { MaintenancePage } from '@/features/errors/MaintenancePage';
import { ErrorBoundary } from '@/features/errors/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Routes>
                {/* Main App Layout */}
                <Route element={<PageShell />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<CategoryPage />} />
                  <Route path="/shop/:category" element={<CategoryPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/blog" element={<BlogPage />} />

                  {/* Errors */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="/500" element={<ErrorPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>

                {/* Minimal Layout */}
                <Route element={<MinimalShell />}>
                  <Route path="/maintenance" element={<MaintenancePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
