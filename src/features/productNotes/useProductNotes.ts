import { useState, useCallback, useEffect } from 'react';
import { productNotesStorage, type ProductNotesRecord } from './storage';

export function useProductNotes() {
  const [notes, setNotes] = useState<ProductNotesRecord>({});

  useEffect(() => {
    setNotes(productNotesStorage.get());
  }, []);

  const saveNote = useCallback((productId: number, note: string) => {
    setNotes(prev => {
      const next = { ...prev };
      if (note.trim() === '') {
        delete next[productId];
      } else {
        next[productId] = note.trim();
      }
      productNotesStorage.set(next);
      return next;
    });
  }, []);

  const getNote = useCallback((productId: number) => {
    return notes[productId] || '';
  }, [notes]);

  return { notes, saveNote, getNote };
}
