import { useState, useEffect } from 'react';

type Variant = 'A' | 'B';

export const useABTest = (testKey: string) => {
  const [variant, setVariant] = useState<Variant>('A');

  useEffect(() => {
    // Basic persistent variant selection
    const storageKey = `ab_test_${testKey}`;
    const savedVariant = localStorage.getItem(storageKey) as Variant | null;
    
    if (savedVariant) {
      setVariant(savedVariant);
    } else {
      const newVariant: Variant = Math.random() > 0.5 ? 'B' : 'A';
      localStorage.setItem(storageKey, newVariant);
      setVariant(newVariant);
    }
  }, [testKey]);

  return variant;
};
