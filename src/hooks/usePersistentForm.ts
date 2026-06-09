import { useState, useEffect, useRef } from 'react';

export function usePersistentForm<T>(storageKey: string, initialValue: T) {
  const [data, setData] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initialValue;
  });

  const isRestored = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(storageKey)) {
      isRestored.current = true;
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [storageKey, data]);

  const clear = () => {
    localStorage.removeItem(storageKey);
    setData(initialValue);
  };

  return [data, setData, clear, isRestored.current] as const;
}

