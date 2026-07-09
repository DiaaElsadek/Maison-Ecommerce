import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
          <h1 className="text-3xl text-foreground mb-4 font-display">Application Error</h1>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Something went critically wrong.
          </p>
          <Button variant="primary" size="md" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" /> Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
