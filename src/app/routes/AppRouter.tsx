import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

// Layouts
import { PageShell, MinimalShell } from '@/layouts/PageShell';

// Route Guard
import { ProtectedRoute } from './ProtectedRoute';

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
  </div>
);

// Lazy-loaded Features
const HomePage = React.lazy(() => import('@/features/home/HomePage').then(m => ({ default: m.HomePage })));
const CategoryPage = React.lazy(() => import('@/features/category/CategoryPage').then(m => ({ default: m.CategoryPage })));
const ProductDetailPage = React.lazy(() => import('@/features/product/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const SearchPage = React.lazy(() => import('@/features/search/SearchPage').then(m => ({ default: m.SearchPage })));
const CartPage = React.lazy(() => import('@/features/cart/CartPage').then(m => ({ default: m.CartPage })));
const WishlistPage = React.lazy(() => import('@/features/wishlist/WishlistPage').then(m => ({ default: m.WishlistPage })));
const CheckoutPage = React.lazy(() => import('@/features/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderConfirmation = React.lazy(() => import('@/features/checkout/OrderConfirmation').then(m => ({ default: m.OrderConfirmation })));
const AuthPage = React.lazy(() => import('@/features/auth/AuthPage').then(m => ({ default: m.AuthPage })));
const AccountPage = React.lazy(() => import('@/features/account/AccountPage').then(m => ({ default: m.AccountPage })));
const SupportPage = React.lazy(() => import('@/features/support/SupportPage').then(m => ({ default: m.SupportPage })));
const FAQPage = React.lazy(() => import('@/features/faq/FAQPage').then(m => ({ default: m.FAQPage })));
const BlogPage = React.lazy(() => import('@/features/blog/BlogPage').then(m => ({ default: m.BlogPage })));

// Lazy-loaded Errors
const NotFoundPage = React.lazy(() => import('@/features/errors/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ErrorPage = React.lazy(() => import('@/features/errors/ErrorPage').then(m => ({ default: m.ErrorPage })));
const MaintenancePage = React.lazy(() => import('@/features/errors/MaintenancePage').then(m => ({ default: m.MaintenancePage })));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>

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
      </Suspense>
    </BrowserRouter>
  );
}
