import { describe, it, expect } from "vitest";
import {
  normalizeQuestion,
  dedupe,
  suggestFaqs,
  countFaqs,
  topUpBackfillForSlug,
  serializeBackfill,
} from "./faq-underfilled-helpers.mjs";

describe("normalizeQuestion", () => {
  it("normaliza case e espaços", () => {
    expect(normalizeQuestion("  Como Contratar? ")).toBe("como contratar?");
  });
  it("é tolerante a null/undefined", () => {
    expect(normalizeQuestion(undefined)).toBe("");
    expect(normalizeQuestion(null)).toBe("");
  });
});

describe("dedupe", () => {
  it("remove duplicatas case-insensitive mantendo a primeira", () => {
    const out = dedupe([
      { q: "Como?", a: "A1" },
      { q: "como?", a: "A2" },
      { q: "Outra?", a: "A3" },
    ]);
    expect(out).toEqual([
      { q: "Como?", a: "A1" },
      { q: "Outra?", a: "A3" },
    ]);
  });
  it("descarta itens vazios ou incompletos", () => {
    expect(dedupe([{ q: "", a: "x" }, { q: "y", a: "" }, null, undefined])).toEqual([]);
  });
});

describe("suggestFaqs — determinismo", () => {
  it("mesma entrada ⇒ mesma saída (byte-a-byte)", () => {
    const a = suggestFaqs({ title: "Seguro X", category: "Auto" });
    const b = suggestFaqs({ title: "Seguro X", category: "Auto" });
    expect(a).toEqual(b);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
  it("gera pelo menos 2 sugestões distintas (case-insensitive)", () => {
    const s = suggestFaqs({ title: "Seguro X", category: "Auto" });
    expect(s.length).toBeGreaterThanOrEqual(3);
    const keys = new Set(s.map((f) => normalizeQuestion(f.q)));
    expect(keys.size).toBe(s.length);
  });
  it("normaliza título removendo sufixo após | ", () => {
    const s = suggestFaqs({ title: "Seguro X | Patro", category: "Auto" });
    expect(s[0].a).toContain('"Seguro X"');
    expect(s[0].a).not.toContain("| Patro");
  });
  it("usa 'seguro' quando categoria é falsy", () => {
    const s = suggestFaqs({ title: "T", category: undefined });
    expect(s[0].q).toContain("seguro");
  });
});

describe("countFaqs", () => {
  const contentIndex = { slug1: { faqs: [{ q: "A", a: "x" }] } };
  const extra = {
    slug1: {
      faqs: [{ q: "B", a: "x" }],
      timeline: { stages: [{ faqQ: "C", faqA: "x" }, { faqQ: "", faqA: "" }] },
      comparison: { rows: [{ faqQ: "a", faqA: "x" }] }, // duplicata de "A"
    },
  };
  const backfill = { slug1: [{ q: "D", a: "x" }] };

  it("soma fontes e dedupe case-insensitive", () => {
    expect(countFaqs("slug1", contentIndex, extra, backfill)).toBe(4); // A,B,C,D
  });
  it("retorna 0 para slug ausente sem lançar", () => {
    expect(countFaqs("nao-existe", contentIndex, extra, backfill)).toBe(0);
  });
  it("tolera fontes undefined", () => {
    expect(countFaqs("slug1", undefined, undefined, undefined)).toBe(0);
  });
});

describe("topUpBackfillForSlug — idempotência e dedupe", () => {
  const suggestions = [
    { q: "Q1", a: "A1" },
    { q: "Q2", a: "A2" },
  ];

  it("adiciona apenas o necessário para atingir target", () => {
    const r = topUpBackfillForSlug({ existing: [], suggestions, currentCount: 0, target: 2 });
    expect(r.added).toBe(2);
    expect(r.next).toEqual(suggestions);
    expect(r.shortfall).toBe(0);
  });
  it("preenche exatamente 2 Q&A quando currentCount=0 e há 3+ sugestões", () => {
    const three = [
      { q: "Q1", a: "A1" },
      { q: "Q2", a: "A2" },
      { q: "Q3", a: "A3" },
    ];
    const r = topUpBackfillForSlug({ existing: [], suggestions: three, currentCount: 0, target: 2 });
    expect(r.next).toHaveLength(2);
    expect(r.shortfall).toBe(0);
  });
  it("usa fallback quando primeiras sugestões colidem com Q&A existente", () => {
    const three = [
      { q: "Q1", a: "A1" },
      { q: "Q2", a: "A2" },
      { q: "Q3", a: "A3" },
    ];
    // artigo com 0 Q&A e 1 backfill que colide com Q1 → deve usar Q2 e Q3
    const r = topUpBackfillForSlug({
      existing: [{ q: "q1", a: "old" }],
      suggestions: three,
      currentCount: 1,
      target: 2,
    });
    expect(r.added).toBe(1);
    expect(r.shortfall).toBe(0);
    expect(r.next.map((f) => f.q)).toEqual(["q1", "Q2"]);
  });
  it("reporta shortfall > 0 quando sugestões insuficientes/colididas", () => {
    const r = topUpBackfillForSlug({
      existing: [{ q: "Q1", a: "x" }],
      suggestions: [{ q: "q1", a: "dup" }],
      currentCount: 0,
      target: 2,
    });
    expect(r.shortfall).toBeGreaterThan(0);
  });
  it("não adiciona nada quando já atinge target", () => {
    const r = topUpBackfillForSlug({ existing: [{ q: "X", a: "1" }], suggestions, currentCount: 2, target: 2 });
    expect(r.added).toBe(0);
    expect(r.next).toEqual([{ q: "X", a: "1" }]);
  });
  it("não duplica pergunta já existente (case-insensitive)", () => {
    const r = topUpBackfillForSlug({
      existing: [{ q: "q1", a: "old" }],
      suggestions,
      currentCount: 1,
      target: 2,
    });
    expect(r.added).toBe(1);
    expect(r.next.map((f) => f.q)).toEqual(["q1", "Q2"]);
  });
  it("é idempotente: aplicar 2× produz o mesmo resultado", () => {
    const first = topUpBackfillForSlug({ existing: [], suggestions, currentCount: 1, target: 2 });
    const second = topUpBackfillForSlug({
      existing: first.next,
      suggestions,
      currentCount: 1 + first.added,
      target: 2,
    });
    expect(second.added).toBe(0);
    expect(second.next).toEqual(first.next);
  });
  it("nunca sobrescreve entradas existentes", () => {
    const existing = [{ q: "Q1", a: "ORIGINAL" }];
    const r = topUpBackfillForSlug({ existing, suggestions, currentCount: 1, target: 2 });
    expect(r.next[0]).toEqual({ q: "Q1", a: "ORIGINAL" });
  });
  it("ignora sugestões vazias/incompletas", () => {
    const r = topUpBackfillForSlug({
      existing: [],
      suggestions: [{ q: "", a: "x" }, { q: "y", a: "" }, { q: "OK", a: "OK" }],
      currentCount: 0,
      target: 2,
    });
    expect(r.next).toEqual([{ q: "OK", a: "OK" }]);
  });
});

describe("serializeBackfill — determinismo", () => {
  it("ordena slugs alfabeticamente e produz saída estável", () => {
    const a = serializeBackfill({ b: [{ q: "1", a: "1" }], a: [{ q: "2", a: "2" }] });
    const b = serializeBackfill({ a: [{ q: "2", a: "2" }], b: [{ q: "1", a: "1" }] });
    expect(a).toBe(b);
    expect(a.indexOf('"a":')).toBeLessThan(a.indexOf('"b":'));
  });
  it("saída é válida TypeScript (contém export const)", () => {
    const out = serializeBackfill({ x: [{ q: "Q", a: "A" }] });
    expect(out).toContain("export const blogFaqBackfill");
    expect(out).toContain('"x":');
  });
});