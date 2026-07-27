import { describe, it, expect } from "vitest";
import { FuzzCoverage, normalizeRule } from "./fuzz-coverage.mjs";

describe("normalizeRule", () => {
  it("agrupa mensagens que só variam no valor entre backticks/aspas", () => {
    const a = normalizeRule("`logo` deve ser URL absoluta, veio: `/rel.png`");
    const b = normalizeRule("`logo` deve ser URL absoluta, veio: `/outro.png`");
    expect(a).toBe(b);
  });

  it("colapsa números literais", () => {
    expect(normalizeRule("mainEntity precisa de ≥ 2 Question"))
      .toBe(normalizeRule("mainEntity precisa de ≥ 5 Question"));
  });

  it("é idempotente e trunca em 120 chars", () => {
    const long = "x".repeat(500);
    const n = normalizeRule(long);
    expect(n.length).toBeLessThanOrEqual(120);
    expect(normalizeRule(n)).toBe(n);
  });
});

describe("FuzzCoverage.record + toReport", () => {
  it("conta invocations, req/rec normalizadas e unsupported", () => {
    const cov = new FuzzCoverage();
    cov.record("Organization", { req: ["`url` obrigatória"], rec: [] });
    cov.record("Organization", { req: ["`url` obrigatória"], rec: ["adicione `sameAs`"] });
    cov.record("WebSite", { req: [], rec: [], unsupported: true });

    const r = cov.toReport();
    expect(r.totals.types).toBe(2);
    expect(r.totals.invocations).toBe(3);
    expect(r.types.Organization.invocations).toBe(2);
    expect(r.types.Organization.distinctReq).toBe(1);
    expect(r.types.Organization.req["`…` obrigatória"]).toBe(2);
    expect(r.types.WebSite.unsupported).toBe(1);
  });

  it("wrap encaminha o retorno e registra automaticamente", () => {
    const cov = new FuzzCoverage();
    const check = (n) => ({ req: n.bad ? ["falta url"] : [], rec: [] });
    const wrapped = cov.wrap("X", check);
    expect(wrapped({ bad: true })).toEqual({ req: ["falta url"], rec: [] });
    expect(wrapped({ bad: false })).toEqual({ req: [], rec: [] });
    const r = cov.toReport();
    expect(r.types.X.invocations).toBe(2);
    expect(r.types.X.req["falta url"]).toBe(1);
  });
});

describe("FuzzCoverage.compareBaseline", () => {
  const cov = new FuzzCoverage();
  for (let i = 0; i < 10; i++) cov.record("A", { req: ["r1"], rec: ["k1"] });
  cov.record("A", { req: ["r2"], rec: [] });

  it("passa quando cobertura atende o baseline", () => {
    const v = cov.compareBaseline({
      A: { minInvocations: 5, minDistinctReq: 2, minDistinctRec: 1 },
    });
    expect(v).toEqual([]);
  });

  it("falha quando invocations < baseline", () => {
    const v = cov.compareBaseline({ A: { minInvocations: 999 } });
    expect(v[0]).toMatch(/A: invocations=11 < baseline 999/);
  });

  it("falha quando distinctReq < baseline", () => {
    const v = cov.compareBaseline({ A: { minDistinctReq: 5 } });
    expect(v[0]).toMatch(/distinctReq=2 < baseline 5/);
  });

  it("falha quando @type do baseline nunca foi exercitado", () => {
    const v = cov.compareBaseline({ Z: { minInvocations: 1 } });
    expect(v[0]).toMatch(/Z: nunca exercitado/);
  });

  it("falha quando requiredRules do baseline não foi acionada", () => {
    const v = cov.compareBaseline({ A: { requiredRules: ["r-nao-existe"] } });
    expect(v[0]).toMatch(/regra obrigatória do baseline nunca acionada/);
  });
});

describe("FuzzCoverage.formatSummary", () => {
  it("imprime totais e top-N regras", () => {
    const cov = new FuzzCoverage();
    for (let i = 0; i < 3; i++) cov.record("Org", { req: ["a"], rec: [] });
    cov.record("Org", { req: ["b"], rec: [] });
    const s = cov.formatSummary({ topRules: 2 });
    expect(s).toContain("Fuzz coverage");
    expect(s).toContain("Org:");
    expect(s).toContain("3× a");
  });
});