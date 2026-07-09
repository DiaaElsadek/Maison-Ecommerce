import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router';

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [searchQ, setSearchQ] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleSearch = () => {
    if (searchQ.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQ)}`);
      onClose();
    }
  };

  const handleQuickSearch = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm flex flex-col items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:text-accent transition-colors"
        aria-label="Close search"
      >
        <X className="w-6 h-6" />
      </button>
      <p className="label-mono text-muted-foreground mb-8 tracking-[0.2em]">
        What are you looking for?
      </p>
      <div className="w-full max-w-xl px-6">
        <div className="flex items-center border-b-2 border-foreground gap-4">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={searchRef}
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            placeholder="Search products, collections..."
            className="flex-1 py-4 text-2xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-display"
          />
        </div>
      </div>
      <div className="mt-12 flex gap-6">
        {['New Arrivals', 'Bestsellers', 'Cashmere', 'Leather Goods'].map((t) => (
          <button
            key={t}
            onClick={() => handleQuickSearch(t)}
            className="label-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
