import React, { useState } from 'react';
import { Link } from 'react-router';
import { Globe } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { shopPath } from '@/config/routes';

interface FooterLink {
  label: string;
  to: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'Women', to: shopPath('Women') },
      { label: 'Men', to: shopPath('Men') },
      { label: 'Accessories', to: shopPath('Accessories') },
      { label: 'Beauty', to: shopPath('Beauty') },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Story', to: '/blog' },
      { label: 'Sustainability', to: '/blog' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press', to: '/press' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Centre', to: '/support' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Returns', to: '/faq' },
      { label: 'Size Guide', to: '/faq' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-foreground text-primary-foreground mt-24">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo wordmarkClassName="text-base" />
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed mb-6 max-w-xs">
              Crafted without compromise. Every piece made in partnership with family-owned
              workshops across Europe.
            </p>
            {subscribed ? (
              <p className="text-xs text-accent tracking-[0.1em] font-mono-brand">
                Thank you for subscribing.
              </p>
            ) : (
              <div className="flex gap-0">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />
                <button
                  onClick={() => {
                    if (email) setSubscribed(true);
                  }}
                  className="bg-accent text-accent-foreground px-4 py-3 text-xs tracking-[0.12em] uppercase hover:bg-accent/85 transition-colors font-mono-brand"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/50 mb-4 font-mono-brand">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40 tracking-[0.1em] font-mono-brand">
            © 2025 Maison. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((t) => (
              <button
                key={t}
                className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors tracking-[0.1em] font-mono-brand"
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Globe className="w-4 h-4 text-primary-foreground/40" />
            <span className="text-xs text-primary-foreground/40 font-mono-brand">
              English (UK) · GBP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
