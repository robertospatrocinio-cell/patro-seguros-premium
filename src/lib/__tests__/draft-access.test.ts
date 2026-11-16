import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: invoke }));
vi.mock("@/lib/leadAttribution", () => ({
  getLeadAttribution: () => ({}),
  safeAttributionPath: () => null,
}));

const token = "a".repeat(64);

beforeEach(() => {
  vi.resetModules();
  invoke.mockReset();
  localStorage.clear();
});

describe("acesso aos rascunhos de cotação", () => {
  it("guarda a autorização recebida e a envia nas atualizações", async () => {
    invoke.mockResolvedValueOnce({ data: { id: "draft-1", update_token: token }, error: null });
    const { savePartialQuote } = await import("@/lib/leadsApi");
    await savePartialQuote({ name: "Maria Silva" });
    invoke.mockResolvedValueOnce({ data: { id: "draft-1" }, error: null });
    await savePartialQuote({ id: "draft-1", current_step: 2 });
    expect(invoke).toHaveBeenLastCalledWith("save-partial-quote", {
      id: "draft-1", current_step: 2, update_token: token,
    });
  });

  it("não tenta alterar um rascunho antigo sem autorização", async () => {
    invoke.mockResolvedValueOnce({ data: { id: "new-draft", update_token: token }, error: null });
    const { savePartialQuote } = await import("@/lib/leadsApi");
    await savePartialQuote({ id: "legacy-draft", name: "Maria Silva" });
    expect(invoke).toHaveBeenLastCalledWith("save-partial-quote", {
      id: undefined, name: "Maria Silva", update_token: undefined,
    });
    invoke.mockResolvedValueOnce({ data: { id: "new-draft" }, error: null });
    await savePartialQuote({ id: "legacy-draft", current_step: 3 });
    expect(invoke).toHaveBeenLastCalledWith("save-partial-quote", {
      id: "new-draft", current_step: 3, update_token: token,
    });
  });

  it("recupera a autorização após recarregar a página", async () => {
    localStorage.setItem("patro:draft-access:saved-draft", JSON.stringify({ id: "saved-draft", token }));
    invoke.mockResolvedValueOnce({ data: { id: "saved-draft" }, error: null });
    const { savePartialQuote } = await import("@/lib/leadsApi");
    await savePartialQuote({ id: "saved-draft", current_step: 2 });
    expect(invoke).toHaveBeenLastCalledWith("save-partial-quote", {
      id: "saved-draft", current_step: 2, update_token: token,
    });
  });

  it("devolve o erro sem fingir que o rascunho foi salvo", async () => {
    const error = new Error("unavailable");
    invoke.mockResolvedValueOnce({ data: null, error });
    const { savePartialQuote } = await import("@/lib/leadsApi");
    expect(await savePartialQuote({ name: "Maria Silva" })).toEqual({ id: null, error });
  });
});

describe("barreiras de segurança no servidor", () => {
  const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

  it("verifica a autorização do rascunho antes da escrita privilegiada", () => {
    const code = source("supabase/functions/save-partial-quote/index.ts");
    const guard = code.indexOf("if (id && !(await ownsDraft(id, body.update_token)))");
    expect(guard).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(code.indexOf('.update(payload)'));
    expect(code).toContain('name: "HMAC", hash: "SHA-256"');
    expect(code).toContain('partial-quote-update:v1:${id}');
    expect(code).toContain("update_token: updateToken");
  });

  it("mantém formulários públicos sem depender de getClaims no SDK antigo", () => {
    for (const name of ["save-partial-quote", "send-form-email"]) {
      const code = source(`supabase/functions/${name}/index.ts`);
      expect(code).not.toContain(".getClaims(");
      expect(code).toContain(".auth.getUser(jwt)");
      expect(code).toContain('Deno.env.get("SUPABASE_ANON_KEY")');
      expect(code).toContain('if (req.method !== "POST")');
    }
  });
});
