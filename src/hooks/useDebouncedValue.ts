import { useEffect, useState } from "react";

/**
 * Retorna `value` apenas após `delayMs` sem alterações.
 * Útil para campos de busca: evita filtrar listas grandes a cada tecla.
 */
export function useDebouncedValue<T>(value: T, delayMs = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}