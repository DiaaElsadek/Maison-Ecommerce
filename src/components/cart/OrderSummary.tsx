import React, { useState } from 'react';
import { Link } from 'react-router';
import { Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { fmt } from '@/lib/format';
import { useCart } from '@/hooks/use-cart';
import { PROMO_CODE, PROMO_DISCOUNT } from '@/config/constants';

export function OrderSummary() {
  const { subtotal, getShipping } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const discount = promoApplied ? Math.round(subtotal * PROMO_DISCOUNT) : 0;
  const shipping = getShipping();
  const total = subtotal - discount + shipping;

  return (
    <div className="bg-secondary p-8 sticky top-24">
      <h2 className="text-lg font-medium mb-6 font-display">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-accent">
            <span>Promo (10% off)</span>
            <span>–{fmt(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Complimentary' : fmt(shipping)}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between font-medium">
          <span>Total</span>
          <span>{fmt(total)}</span>
        </div>
      </div>

      {/* Promo */}
      <div className="flex gap-0 mb-6">
        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code"
          className="flex-1 border border-border bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
        <button
          onClick={() => {
            if (promoCode === PROMO_CODE) setPromoApplied(true);
          }}
          className="bg-foreground text-primary-foreground px-4 py-2.5 text-xs tracking-[0.12em] uppercase hover:bg-foreground/85 transition-colors font-mono-brand"
        >
          Apply
        </button>
      </div>
      {promoApplied && (
        <p className="text-xs text-accent mb-4 font-mono-brand">10% discount applied.</p>
      )}

      <Link
        to="/checkout"
        className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 text-sm bg-foreground text-primary-foreground hover:bg-foreground/85 transition-all tracking-[0.08em] uppercase font-medium font-mono-brand"
      >
        Proceed to Checkout <Lock className="w-4 h-4" />
      </Link>

      <div className="flex items-center justify-center gap-2 mt-3">
        <Lock className="w-3 h-3 text-muted-foreground" />
        <p className="text-xs text-muted-foreground font-mono-brand">Secure checkout by Stripe</p>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((p) => (
          <span
            key={p}
            className="text-[9px] text-muted-foreground border border-border px-1.5 py-0.5 font-mono-brand"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
