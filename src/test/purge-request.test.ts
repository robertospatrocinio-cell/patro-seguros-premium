import { describe, expect, it } from "vitest";
import { parsePurgeRequest } from "../../supabase/functions/_shared/purge-request";

const tags = ["home", "seguros", "all"];

describe("validação de pedidos de limpeza de cache", () => {
  it("normaliza caminhos internos, remove fragmentos e elimina duplicados", () => {
    expect(parsePurgeRequest({ urls: ["/seguro-auto#cotacao", "https://www.patroseguros.com.br/seguro-auto"] }, tags))
      .toEqual({ urls: ["https://www.patroseguros.com.br/seguro-auto"], tags: [], purgeEverything: false });
  });

  it.each([
    "https://example.com/", "//example.com/", "http://www.patroseguros.com.br/",
    "https://www.patroseguros.com.br.example.com/", "https://user:pass@www.patroseguros.com.br/",
    "javascript:alert(1)", "\\\\example.com/path", "/path\nwith-control",
  ])("recusa endereço externo ou ambíguo: %s", (url) => {
    expect(() => parsePurgeRequest({ urls: [url] }, tags)).toThrow();
  });

  it.each([null, [], {}, { tags: [42] }, { tags: ["unknown"] }, { urls: [null] },
    { urls: [""] }, { purgeEverything: "true" }, { urls: Array(301).fill("/") }])(
    "recusa formatos inválidos sem convertê-los em limpeza total: %j", (body) => {
      expect(() => parsePurgeRequest(body, tags)).toThrow();
    },
  );

  it("exige decisão explícita para limpar tudo", () => {
    expect(parsePurgeRequest({ tags: [" HOME "] }, tags).purgeEverything).toBe(false);
    expect(parsePurgeRequest({ tags: ["all"] }, tags).purgeEverything).toBe(true);
    expect(parsePurgeRequest({ purgeEverything: true }, tags).purgeEverything).toBe(true);
  });
});
