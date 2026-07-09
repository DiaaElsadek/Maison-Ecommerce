import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
}

export function QuantitySelector({ quantity, onChange, min = 1 }: QuantitySelectorProps) {
  return (
    <div>
      <p className="label-mono text-muted-foreground mb-3">Quantity</p>
      <div className="flex items-center border border-border w-fit">
        <button
          onClick={() => onChange(Math.max(min, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-10 text-center text-sm font-mono-brand">{quantity}</span>
        <button
          onClick={() => onChange(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
