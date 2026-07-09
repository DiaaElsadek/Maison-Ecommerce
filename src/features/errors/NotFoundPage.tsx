import React from 'react';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-light text-border mb-6 font-display">404</p>
      <h1 className="text-3xl text-foreground mb-4 font-display">Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        The page you are looking for may have moved, or perhaps it never existed.
      </p>
      <div className="flex gap-4">
        <Button variant="primary" size="md" onClick={() => navigate('/')}>
          <Home className="w-4 h-4" /> Home
        </Button>
        <Button variant="outline" size="md" onClick={() => navigate('/search')}>
          Search Products
        </Button>
      </div>
    </div>
  );
}
