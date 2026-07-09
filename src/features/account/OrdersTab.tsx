import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { fmt } from '@/lib/format';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';

const MOCK_ORDERS = [
  {
    id: 'MSN-K8PQ2A',
    date: '14 January 2025',
    status: 'Delivered',
    items: 2,
    total: 1770,
    tracking: 'OFW9821001GB',
  },
  {
    id: 'MSN-J7MN4C',
    date: '3 December 2024',
    status: 'Delivered',
    items: 1,
    total: 480,
    tracking: 'OFW9733882GB',
  },
  {
    id: 'MSN-R5XL9E',
    date: '18 November 2024',
    status: 'Processing',
    items: 3,
    total: 2040,
    tracking: '',
  },
];

export function OrdersTab() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6 font-display">Order History</h2>
      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-mono-brand">{order.date}</p>
                <p className="font-medium font-mono-brand">{order.id}</p>
              </div>
              <div className="text-right">
                <span
                  className={cn(
                    'text-xs px-2 py-1 font-mono-brand',
                    order.status === 'Delivered'
                      ? 'bg-secondary text-foreground'
                      : 'bg-accent text-accent-foreground'
                  )}
                >
                  {order.status}
                </span>
                <p className="text-sm font-medium mt-2">{fmt(order.total)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              {PRODUCTS.slice(0, order.items).map((p, i) => (
                <div key={i} className="w-12 h-14 bg-secondary overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {order.items > 3 && (
                <span className="text-xs text-muted-foreground font-mono-brand">
                  +{order.items - 3} more
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                View Order
              </Button>
              {order.tracking && (
                <Button variant="ghost" size="sm">
                  <Truck className="w-3 h-3" /> Track
                </Button>
              )}
              {order.status === 'Delivered' && (
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-3 h-3" /> Return
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
