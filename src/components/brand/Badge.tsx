import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'sale' | 'new' | 'bestseller';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  sale: 'bg-destructive text-destructive-foreground',
  new: 'bg-foreground text-primary-foreground',
  bestseller: 'bg-accent text-accent-foreground',
  default: 'bg-secondary text-secondary-foreground',
};

export function ProductBadge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono-brand',
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  );
}
