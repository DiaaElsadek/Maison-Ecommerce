import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { cn } from '@/lib/utils';
import { fmt } from '@/lib/format';
import { useCart } from '@/hooks/use-cart';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, getShipping } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: 'GB',
    delivery: 'standard' as 'standard' | 'express',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });

  const shipping = getShipping(form.delivery);
  const total = subtotal + shipping;

  const updateForm = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handlePlaceOrder = () => {
    navigate('/checkout/confirmation', {
      state: {
        orderData: {
          ...form,
          total,
          shipping,
        },
      },
      replace: true,
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl text-foreground font-display">Checkout</h1>
        <div className="flex items-center gap-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 transition-all font-mono-brand',
                  step >= s
                    ? 'bg-foreground text-primary-foreground border-foreground'
                    : 'border-border text-muted-foreground'
                )}
              >
                {step > s ? <Check className="w-3 h-3" /> : s}
              </div>
              <span
                className={cn(
                  'text-xs tracking-[0.1em] uppercase hidden sm:block font-mono-brand',
                  step >= s ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {s === 1 ? 'Delivery' : 'Payment'}
              </span>
              {s < 2 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium font-display">Delivery Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => updateForm('firstName', e.target.value)}
                  required
                />
                <FormInput
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => updateForm('lastName', e.target.value)}
                  required
                />
              </div>
              <FormInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => updateForm('email', e.target.value)}
                required
              />
              <FormInput
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
              />
              <FormInput
                label="Address Line 1"
                value={form.address1}
                onChange={(e) => updateForm('address1', e.target.value)}
                required
              />
              <FormInput
                label="Address Line 2 (optional)"
                value={form.address2}
                onChange={(e) => updateForm('address2', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="City"
                  value={form.city}
                  onChange={(e) => updateForm('city', e.target.value)}
                  required
                />
                <FormInput
                  label="Postcode"
                  value={form.postcode}
                  onChange={(e) => updateForm('postcode', e.target.value)}
                  required
                />
              </div>
              <div>
                <p className="label-mono mb-3">Delivery Method</p>
                <div className="space-y-3">
                  {[
                    {
                      id: 'standard',
                      label: 'Standard Delivery',
                      desc: '3–5 working days',
                      price: getShipping('standard') === 0 ? 'Complimentary' : fmt(getShipping('standard')),
                    },
                    {
                      id: 'express',
                      label: 'Express Delivery',
                      desc: '1–2 working days',
                      price: fmt(getShipping('express')),
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        'flex items-center justify-between p-4 border-2 cursor-pointer transition-colors',
                        form.delivery === opt.id
                          ? 'border-foreground'
                          : 'border-border hover:border-muted-foreground'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={form.delivery === opt.id}
                          onChange={() => updateForm('delivery', opt.id)}
                          className="accent-foreground"
                        />
                        <div>
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono-brand">{opt.price}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setStep(2)}
                disabled={
                  !form.firstName ||
                  !form.lastName ||
                  !form.email ||
                  !form.address1 ||
                  !form.city ||
                  !form.postcode
                }
              >
                Continue to Payment <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Back to delivery"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-xl font-medium font-display">Payment Details</h2>
              </div>
              <div className="flex items-center gap-2 bg-secondary p-4 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Your payment information is encrypted and secure.</span>
              </div>
              <FormInput
                label="Cardholder Name"
                value={form.cardName}
                onChange={(e) => updateForm('cardName', e.target.value)}
                required
                placeholder="As it appears on your card"
              />
              <div>
                <label className="label-mono mb-1.5 block">Card Number *</label>
                <input
                  value={form.cardNumber}
                  onChange={(e) =>
                    updateForm(
                      'cardNumber',
                      e.target.value
                        .replace(/\D/g, '')
                        .replace(/(.{4})/g, '$1 ')
                        .trim()
                        .slice(0, 19)
                    )
                  }
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors font-mono-brand"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-mono mb-1.5 block">Expiry *</label>
                  <input
                    value={form.expiry}
                    onChange={(e) =>
                      updateForm(
                        'expiry',
                        e.target.value
                          .replace(/\D/g, '')
                          .replace(/(\d{2})/, '$1/')
                          .slice(0, 5)
                      )
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors font-mono-brand"
                  />
                </div>
                <div>
                  <label className="label-mono mb-1.5 block">CVV *</label>
                  <input
                    value={form.cvv}
                    onChange={(e) =>
                      updateForm('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    placeholder="000"
                    maxLength={4}
                    type="password"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors font-mono-brand"
                  />
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="label-mono text-muted-foreground mb-3">Or pay with</p>
                <div className="grid grid-cols-2 gap-3">
                  {['PayPal', 'Apple Pay'].map((method) => (
                    <button
                      key={method}
                      className="border border-border py-3 text-sm font-medium hover:border-foreground hover:bg-secondary transition-colors"
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                variant="accent"
                size="lg"
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={
                  !form.cardName ||
                  form.cardNumber.replace(/\s/g, '').length < 16 ||
                  !form.expiry ||
                  form.cvv.length < 3
                }
              >
                <Lock className="w-4 h-4" /> Place Order · {fmt(total)}
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-secondary p-6 sticky top-24">
            <h2 className="label-mono font-medium mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                  <div className="w-12 h-14 flex-shrink-0 bg-white overflow-hidden relative">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-primary-foreground text-[9px] flex items-center justify-center font-mono-brand">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground font-mono-brand">
                      {item.size} · {item.color}
                    </p>
                    <p className="text-xs font-medium mt-1">
                      {fmt(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Complimentary' : fmt(shipping)}</span>
              </div>
              <div className="flex justify-between font-medium border-t border-border pt-2">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
