import React from 'react';
import { cn } from '@/lib/utils';
import type { ProductColor } from '@/types';

interface ProductColorPickerProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onChange: (color: ProductColor) => void;
}

export function ProductColorPicker({ colors, selectedColor, onChange }: ProductColorPickerProps) {
  return (
    <div>
      <p className="label-mono text-muted-foreground mb-3">
        Colour: <span className="text-foreground">{selectedColor.name}</span>
      </p>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => onChange(c)}
            title={c.name}
            className={cn(
              'w-8 h-8 border-2 transition-all rounded-full',
              selectedColor.name === c.name
                ? 'border-foreground scale-110'
                : 'border-transparent hover:border-border'
            )}
            style={{ backgroundColor: c.hex }}
          >
            {c.hex === '#FAF8F5' && (
              <div className="w-full h-full rounded-full border border-border/50" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
