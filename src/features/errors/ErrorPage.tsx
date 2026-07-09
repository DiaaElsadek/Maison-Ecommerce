import React from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <AlertTriangle className="w-16 h-16 text-muted-foreground mb-6" />
      <p className="label-mono text-muted-foreground mb-2">Error 500</p>
      <h1 className="text-3xl text-foreground mb-4 font-display">Something went wrong</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        We encountered an unexpected error. Our team has been notified and is working on a fix.
      </p>
      <div className="flex gap-4">
        <Button variant="primary" size="md" onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4" /> Try Again
        </Button>
        <Button variant="outline" size="md" onClick={() => navigate('/support')}>
          Contact Support
        </Button>
      </div>
    </div>
  );
}
