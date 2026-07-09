import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/app/components/ui/input';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, required, ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <label className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-1.5 block font-mono-brand">
            {label} {required && '*'}
          </label>
        )}
        <Input
          ref={ref}
          required={required}
          className={cn(
            'h-auto border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors font-mono-brand rounded-none focus-visible:ring-0 focus-visible:border-foreground',
            error && 'border-destructive focus-visible:border-destructive'
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive mt-1 font-mono-brand">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
