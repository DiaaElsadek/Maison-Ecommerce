import React, { useState } from 'react';
import { X } from 'lucide-react';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-foreground text-primary-foreground text-center py-2 px-4 relative text-xs tracking-[0.15em] uppercase font-mono-brand">
      Complimentary delivery on orders over £150
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
        aria-label="Dismiss announcement"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
