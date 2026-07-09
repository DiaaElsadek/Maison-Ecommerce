import React from 'react';
import { Clock } from 'lucide-react';

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-foreground flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-2.5 mb-16">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-primary-foreground"
        >
          <path
            d="M1 18V2L10 11L19 2V18"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-lg tracking-[0.35em] uppercase text-primary-foreground font-display">
          Maison
        </span>
      </div>
      <h1 className="text-5xl text-primary-foreground mb-6 font-display">
        We are making<br />
        <span className="italic">improvements.</span>
      </h1>
      <p className="text-primary-foreground/60 max-w-md mb-12 leading-relaxed">
        MAISON will return shortly. We are making improvements to ensure your experience is
        exceptional. Thank you for your patience.
      </p>
      <div className="flex items-center gap-2 text-primary-foreground/40">
        <Clock className="w-4 h-4" />
        <span className="label-mono !text-primary-foreground/40">Estimated return: 2 hours</span>
      </div>
    </div>
  );
}
