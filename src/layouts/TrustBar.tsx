import React from 'react';
import { Truck, RotateCcw, Shield } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: <Truck className="w-4 h-4" />, label: 'Free Delivery', desc: 'On orders over £150' },
  { icon: <RotateCcw className="w-4 h-4" />, label: 'Free Returns', desc: '30-day return window' },
  { icon: <Shield className="w-4 h-4" />, label: 'Authenticity', desc: 'Certified genuine goods' },
  { icon: <Shield className="w-4 h-4" />, label: 'Expert Care', desc: 'Dedicated advisors' },
];

export function TrustBar() {
  return (
    <section className="border-b border-border">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-8 py-6">
              <div className="text-accent flex-shrink-0">{item.icon}</div>
              <div>
                <p className="label-mono font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
