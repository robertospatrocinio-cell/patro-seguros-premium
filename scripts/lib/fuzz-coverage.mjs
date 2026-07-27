/**
 * Coverage tracker para o fuzzing de JSON-LD.
 *
 * Objetivo: contar, ao longo de uma run de fuzz,
 *   1. quantas vezes cada `@type` foi exercitado (invocações do checker);
 *   2. quantas vezes cada regra `req`/`rec` foi acionada (mensagens únicas);
 *   3. quais @types nunca disparam nada (candidatos a mais amostras).
 *
 * O relatório é gravado em `dist/fuzz-coverage.json` e um sumário
 * humano-legível é impresso no stdout. Um baseline em
 * `scripts/lib/fuzz-coverage.baseline.json` define pisos mínimos por
 * tipo/regra — se a cobertura cair abaixo em CI, o teste falha, ou
 * seja: novas mudanças no fuzz que reduzam variedade quebram o build
 * ANTES de mascarar bugs.
 *
 * Normalização de regras: mensagens contêm partes variáveis
 * (valores recebidos entre aspas/backticks). Removemos esses trechos
 * para agrupar variantes da mesma regra em um único contador.
 */

/** Normaliza uma mensagem de regra removendo trechos variáveis. */
export function normalizeRule(msg) {
  if (typeof msg !== "string") return String(msg);
  return msg
    .replace(/`[^`]*`/g, "`…`")           // conteúdo em backticks
    .replace(/"[^"]*"/g, '"…"')            // conteúdo em aspas
    .replace(/\b\d+(?:\.\d+)?\b/g, "N")    // números literais
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

export class FuzzCoverage {
  constructor() {
    /** @type {Map<string, { invocations:number, req:Map<string,number>, rec:Map<string,number>, unsupported:number }>} */
    this.perType = new Map();
  }

  _bucket(type) {
    let b = this.perType.get(type);
    if (!b) {
      b = { invocations: 0, req: new Map(), rec: new Map(), unsupported: 0 };
      this.perType.set(type, b);
    }
    return b;
  }

  /** Registra uma invocação de checker e seu resultado. */
  record(type, result) {
    const b = this._bucket(type);
    b.invocations++;
    if (!result || typeof result !== "object") return;
    if (result.unsupported) b.unsupported++;
    for (const m of result.req ?? []) {
      const k = normalizeRule(m);
      b.req.set(k, (b.req.get(k) ?? 0) + 1);
    }
    for (const m of result.rec ?? []) {
      const k = normalizeRule(m);
      b.rec.set(k, (b.rec.get(k) ?? 0) + 1);
    }
  }

  /** Envolve um checker para gravar automaticamente. */
  wrap(type, check) {
    return (node) => {
      let r;
      try { r = check(node); }
      catch (e) { this._bucket(type).invocations++; throw e; }
      this.record(type, r);
      return r;
    };
  }

  /** Snapshot serializável (Maps → objetos ordenados por hits desc). */
  toReport() {
    const types = {};
    const sortedTypes = [...this.perType.keys()].sort();
    let totalInvocations = 0;
    let totalReqHits = 0;
    let totalRecHits = 0;
    for (const t of sortedTypes) {
      const b = this.perType.get(t);
      const req = [...b.req.entries()].sort((a, b) => b[1] - a[1]);
      const rec = [...b.rec.entries()].sort((a, b) => b[1] - a[1]);
      totalInvocations += b.invocations;
      totalReqHits += req.reduce((s, [, n]) => s + n, 0);
      totalRecHits += rec.reduce((s, [, n]) => s + n, 0);
      types[t] = {
        invocations: b.invocations,
        unsupported: b.unsupported,
        distinctReq: req.length,
        distinctRec: rec.length,
        req: Object.fromEntries(req),
        rec: Object.fromEntries(rec),
      };
    }
    return {
      generatedAt: new Date().toISOString(),
      totals: {
        types: sortedTypes.length,
        invocations: totalInvocations,
        reqHits: totalReqHits,
        recHits: totalRecHits,
      },
      types,
    };
  }

  /**
   * Compara com um baseline `{ [type]: { minInvocations, minDistinctReq, minDistinctRec, requiredRules?:string[] } }`.
   * Retorna a lista de violações (strings). Vazia = OK.
   *
   * @param {Record<string, any>} baseline
   * @param {object} [options]
   * @param {number} [options.defaultMinInvocations=0]
   */
  compareBaseline(baseline, options = {}) {
    const violations = [];
    const defaultMin = options.defaultMinInvocations ?? 0;
    const report = this.toReport();
    for (const [type, expected] of Object.entries(baseline ?? {})) {
      const actual = report.types[type];
      const minInv = expected.minInvocations ?? defaultMin;
      if (!actual) {
        if (minInv > 0) violations.push(`${type}: nunca exercitado (esperado ≥ ${minInv} invocações)`);
        continue;
      }
      if (actual.invocations < minInv) {
        violations.push(`${type}: invocations=${actual.invocations} < baseline ${minInv}`);
      }
      if (expected.minDistinctReq && actual.distinctReq < expected.minDistinctReq) {
        violations.push(`${type}: distinctReq=${actual.distinctReq} < baseline ${expected.minDistinctReq}`);
      }
      if (expected.minDistinctRec && actual.distinctRec < expected.minDistinctRec) {
        violations.push(`${type}: distinctRec=${actual.distinctRec} < baseline ${expected.minDistinctRec}`);
      }
      for (const rule of expected.requiredRules ?? []) {
        if (!(rule in actual.req) && !(rule in actual.rec)) {
          violations.push(`${type}: regra obrigatória do baseline nunca acionada: "${rule}"`);
        }
      }
    }
    return violations;
  }

  /** Sumário textual, top-N regras por tipo. */
  formatSummary({ topRules = 3 } = {}) {
    const r = this.toReport();
    const lines = [];
    lines.push(`Fuzz coverage — ${r.totals.types} @types, ${r.totals.invocations} invocações, ${r.totals.reqHits} req, ${r.totals.recHits} rec`);
    for (const [type, t] of Object.entries(r.types)) {
      const top = Object.entries(t.req).slice(0, topRules)
        .map(([m, n]) => `    ${n}× ${m}`).join("\n");
      lines.push(`  ${type}: inv=${t.invocations} req=${t.distinctReq}(uniq) rec=${t.distinctRec}(uniq) unsup=${t.unsupported}${top ? "\n" + top : ""}`);
    }
    return lines.join("\n");
  }
}