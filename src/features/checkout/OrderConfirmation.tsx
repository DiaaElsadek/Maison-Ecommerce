import React, { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { fmt } from '@/lib/format';
import { useCart } from '@/hooks/use-cart';

interface OrderData {
  firstName: string;
  lastName: string;
  city: string;
  delivery: 'standard' | 'express';
  total: number;
}

export function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderData = location.state?.orderData as OrderData | undefined;

  useEffect(() => {
    // Clear the cart when landing on confirmation
    if (orderData) {
      clearCart();
    }
  }, [orderData, clearCart]);

  if (!orderData) {
    return <Navigate to="/shop" replace />;
  }

  const orderNum = 'MSN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-white" />
        </div>
      </motion.div>
      <h1 className="text-4xl text-foreground mb-4 font-display">
        Thank you, {orderData.firstName}.
      </h1>
      <p className="text-muted-foreground mb-2">
        Your order has been placed and is being prepared with care.
      </p>
      <p className="text-xs text-muted-foreground mb-8 font-mono-brand">
        Order number: {orderNum}
      </p>

      <div className="bg-secondary p-6 text-left mb-8 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery to</span>
          <span>
            {orderData.firstName} {orderData.lastName}, {orderData.city}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery method</span>
          <span>
            {orderData.delivery === 'express' ? 'Express (1–2 days)' : 'Standard (3–5 days)'}
          </span>
        </div>
        <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
          <span className="text-muted-foreground">Order total</span>
          <span className="font-medium">{fmt(orderData.total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" size="md" onClick={() => navigate('/account')}>
          Track Order
        </Button>
        <Button variant="outline" size="md" onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
