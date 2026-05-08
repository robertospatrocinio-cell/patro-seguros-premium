/**
 * WhatsApp Override Store
 *
 * Pequeno store externo (sem dependências) que permite a páginas
 * específicas — em especial o `LocalPageTemplate` — ditar a mensagem
 * pré-preenchida e o label de tracking do botão flutuante global
 * `WhatsAppButton`, renderizado uma única vez em `App.tsx`.
 *
 * Por que não Context:
 *   `WhatsAppButton` é montado FORA de `<Routes>`, então não enxerga
 *   contextos definidos dentro de páginas individuais. Um store
 *   module-level com `useSyncExternalStore` resolve sem prop drilling.
 *
 * Uso:
 *   // em LocalPageTemplate (efeito):
 *   useEffect(() => {
 *     setWhatsAppOverride({ message, trackingLabel });
 *     return () => clearWhatsAppOverride();
 *   }, [...]);
 *
 *   // em WhatsAppButton:
 *   const override = useWhatsAppOverride();
 */

export interface WhatsAppOverride {
  /** Texto pré-preenchido enviado ao WhatsApp (será URL-encoded). */
  message: string;
  /** Label de tracking GA4/Meta (ex.: "local-page:seguro-auto-pimentas:floating"). */
  trackingLabel: string;
}

let current: WhatsAppOverride | null = null;
const listeners = new Set<() => void>();

export function setWhatsAppOverride(value: WhatsAppOverride): void {
  current = value;
  listeners.forEach((fn) => fn());
}

export function clearWhatsAppOverride(): void {
  current = null;
  listeners.forEach((fn) => fn());
}

export function subscribeWhatsAppOverride(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getWhatsAppOverrideSnapshot(): WhatsAppOverride | null {
  return current;
}

/** SSR-safe: nunca há override no servidor (evita hydration mismatch). */
export function getWhatsAppOverrideServerSnapshot(): null {
  return null;
}