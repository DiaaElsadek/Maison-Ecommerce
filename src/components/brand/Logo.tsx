import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

export function Logo({
  className,
  iconSize = 20,
  showWordmark = true,
  wordmarkClassName,
}: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 20 20"
        fill="none"
        className="text-current"
        aria-hidden="true"
      >
        <path
          d="M1 18V2L10 11L19 2V18"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span
          className={cn(
            'tracking-[0.35em] uppercase font-display',
            wordmarkClassName ?? 'text-lg'
          )}
        >
          Maison
        </span>
      )}
    </div>
  );
}
