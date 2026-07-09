import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface ProductNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  initialNote: string;
  onSave: (note: string) => void;
}

export function ProductNoteDialog({ open, onOpenChange, productTitle, initialNote, onSave }: ProductNoteDialogProps) {
  const [note, setNote] = useState(initialNote);

  useEffect(() => {
    if (open) {
      setNote(initialNote);
    }
  }, [open, initialNote]);

  const handleSave = () => {
    onSave(note);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background shadow-2xl border border-border w-[90vw] max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-display">
              Note for {productTitle}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>
          
          <div className="mb-6">
            <label className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-mono-brand block mb-2">
              Your private note
            </label>
            <textarea
              className="w-full h-32 p-3 bg-secondary text-foreground text-sm resize-none focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="E.g. Buy for mom's birthday..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button variant="primary" onClick={handleSave}>
              Save Note
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
