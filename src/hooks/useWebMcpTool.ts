import { useEffect, useRef } from "react";
import { registerWebMcpTool, type WebMcpToolDescriptor } from "@/lib/webmcp";

/**
 * Registra uma ferramenta WebMCP durante o ciclo de vida do componente.
 * - Um único registro por nome (protege contra StrictMode e navegação SPA).
 * - Remove o registro ao desmontar.
 * - O `execute` é lido de uma ref, então o descriptor não precisa ser recriado.
 */
const active = new Map<string, number>();

export function useWebMcpTool(descriptor: WebMcpToolDescriptor | null) {
  const executeRef = useRef(descriptor?.execute);
  executeRef.current = descriptor?.execute;

  const name = descriptor?.name ?? null;
  const description = descriptor?.description ?? "";
  const schemaKey = descriptor ? JSON.stringify([descriptor.inputSchema, descriptor.annotations]) : "";

  useEffect(() => {
    if (!name || !descriptor) return;

    const count = active.get(name) ?? 0;
    active.set(name, count + 1);
    if (count > 0) {
      // Já registrado (StrictMode duplo-mount ou dois formulários na mesma página).
      return () => {
        active.set(name, (active.get(name) ?? 1) - 1);
      };
    }

    const unregister = registerWebMcpTool({
      name,
      description,
      inputSchema: descriptor.inputSchema,
      annotations: descriptor.annotations,
      execute: (args, extra) => executeRef.current!(args, extra),
    });

    return () => {
      active.set(name, Math.max(0, (active.get(name) ?? 1) - 1));
      if ((active.get(name) ?? 0) === 0) unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, schemaKey]);
}
