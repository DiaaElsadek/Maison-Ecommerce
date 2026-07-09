import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function NotificationsTab() {
  const [notifSettings, setNotifSettings] = useState({
    orders: true,
    promotions: false,
    newArrivals: true,
  });

  const NOTIFICATIONS = [
    {
      key: 'orders' as const,
      label: 'Order Updates',
      desc: 'Shipping confirmations and delivery alerts',
    },
    {
      key: 'promotions' as const,
      label: 'Promotions & Events',
      desc: 'Exclusive offers and MAISON events',
    },
    {
      key: 'newArrivals' as const,
      label: 'New Arrivals',
      desc: 'First access to new collections',
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 font-display">Notification Preferences</h2>
      <div className="space-y-4 max-w-md">
        {NOTIFICATIONS.map((item) => (
          <div key={item.key} className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => setNotifSettings((s) => ({ ...s, [item.key]: !s[item.key] }))}
              className={cn(
                'w-10 h-6 rounded-full transition-colors relative',
                notifSettings[item.key] ? 'bg-foreground' : 'bg-border'
              )}
              aria-label={`Toggle ${item.label}`}
            >
              <span
                className={cn(
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  notifSettings[item.key] ? 'translate-x-5' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
