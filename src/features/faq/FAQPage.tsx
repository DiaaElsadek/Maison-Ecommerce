import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { FAQ_ITEMS } from '@/data/faq';

export function FAQPage() {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="label-mono text-accent mb-3">Frequently asked</p>
        <h1 className="text-5xl text-foreground mb-4 font-display">Questions</h1>
      </div>
      {FAQ_ITEMS.map((section) => (
        <div key={section.category} className="mb-10">
          <h2 className="label-mono text-muted-foreground mb-4 border-b border-border pb-3">
            {section.category}
          </h2>
          <div className="space-y-0">
            {section.questions.map((item) => {
              const key = section.category + item.q;
              const isOpen = openItem === key;
              return (
                <div key={item.q} className="border-b border-border">
                  <button
                    onClick={() => setOpenItem(isOpen ? null : key)}
                    className="w-full flex items-center justify-between py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-sm pr-4">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 flex-shrink-0 transition-transform',
                        isOpen ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-5 text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="text-center mt-12 p-8 bg-secondary">
        <p className="text-muted-foreground mb-4">Still have a question?</p>
        <Button variant="primary" size="md" onClick={() => navigate('/support')}>
          Contact Us <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
