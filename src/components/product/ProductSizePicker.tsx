import React from 'react';
import { cn } from '@/lib/utils';

interface ProductSizePickerProps {
  sizes: string[];
  selectedSize: string;
  onChange: (size: string) => void;
  error?: boolean;
}

export function ProductSizePicker({ sizes, selectedSize, onChange, error }: ProductSizePickerProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="label-mono text-muted-foreground">
          Size{selectedSize && `: ${selectedSize}`}
        </p>
        <button className="text-xs text-muted-foreground hover:text-foreground underline font-mono-brand">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={cn(
              'px-4 py-2.5 text-xs border transition-all font-mono-brand',
              selectedSize === s
                ? 'bg-foreground text-primary-foreground border-foreground'
                : 'border-border hover:border-foreground'
            )}
          >
            {s}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-xs text-destructive mt-2 font-mono-brand">Please select a size</p>
      )}
    </div>
  );
}
