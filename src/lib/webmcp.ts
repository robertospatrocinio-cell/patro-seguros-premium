/**
 * Camada mínima sobre a WebMCP Imperative API (navigator.modelContext).
 * - Feature detection antes de qualquer registro.
 * - Sem dependências externas, sem servidor MCP, sem API de IA.
 * - Sem logs/avisos técnicos para o visitante quando o navegador não suporta.
 *
 * Referência: https://developer.chrome.com/docs/ai/webmcp/imperative-api
 */

export interface WebMcpToolResult {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

export interface WebMcpToolDescriptor {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  execute: (args: unknown, extra?: unknown) => WebMcpToolResult | Promise<WebMcpToolResult>;
}

interface ModelContextLike {
  registerTool?: (tool: WebMcpToolDescriptor) => { unregister?: () => void } | void;
  unregisterTool?: (name: string) => void;
}

function getModelContext(): ModelContextLike | null {
  if (typeof navigator === "undefined") return null;
  const mc = (navigator as unknown as { modelContext?: ModelContextLike }).modelContext;
  if (!mc || typeof mc.registerTool !== "function") return null;
  return mc;
}

export function isWebMcpSupported(): boolean {
  return getModelContext() !== null;
}

/**
 * Registra uma ferramenta se o navegador suportar WebMCP.
 * Retorna sempre uma função de limpeza idempotente (no-op se não suportado).
 */
export function registerWebMcpTool(tool: WebMcpToolDescriptor): () => void {
  const mc = getModelContext();
  if (!mc || typeof mc.registerTool !== "function") return () => {};

  let handle: { unregister?: () => void } | void;
  try {
    handle = mc.registerTool(tool);
  } catch {
    return () => {};
  }

  let done = false;
  return () => {
    if (done) return;
    done = true;
    try {
      if (handle && typeof handle.unregister === "function") handle.unregister();
      else if (typeof mc.unregisterTool === "function") mc.unregisterTool(tool.name);
    } catch {
      /* silencioso: nada a mostrar ao visitante */
    }
  };
}

export function textResult(payload: unknown, isError = false): WebMcpToolResult {
  return {
    content: [{ type: "text", text: typeof payload === "string" ? payload : JSON.stringify(payload) }],
    isError: isError || undefined,
  };
}
