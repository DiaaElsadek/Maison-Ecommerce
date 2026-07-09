import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { CompareDrawer } from '@/features/compare/CompareDrawer';

export function PageShell() {
  useScrollToTop();
  const { pathname } = useLocation();
  const isAuth = pathname === '/auth';

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      {!isAuth && <Footer />}
      <CompareDrawer />
    </div>
  );
}

/**
 * Minimal layout for pages that don't show nav/footer (e.g. maintenance).
 */
export function MinimalShell() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Outlet />
    </div>
  );
}
