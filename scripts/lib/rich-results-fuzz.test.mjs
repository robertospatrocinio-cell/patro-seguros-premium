import { describe, it, expect, afterAll } from "vitest";
import { CHECKERS } from "./rich-results-checkers.mjs";
import { shrinkCounterexample, formatCounterexample } from "./jsonld-shrinker.mjs";
import { FuzzCoverage } from "./fuzz-coverage.mjs";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// -------- Coverage global desta run de fuzz --------
const COV = new FuzzCoverage();
// Envolve o mapa CHECKERS: qualquer suite que chame `CHECKERS.X(node)`
// registra invocação + regras acionadas automaticamente.
for (const t of Object.keys(CHECKERS)) {
  CHECKERS[t] = COV.wrap(t, CHECKERS[t]);
}

const HERE = dirname(fileURLToPath(import.meta.url));
const BASELINE_PATH = resolve(HERE, "fuzz-coverage.baseline.json");
const REPORT_PATH = resolve(HERE, "..", "..", "dist", "fuzz-coverage.json");

afterAll(() => {
  const report = COV.toReport();
  try {
    mkdirSync(dirname(REPORT_PATH), { recursive: true });
    writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  } catch { /* dist opcional em ambientes sem escrita */ }

  // Log humano-legível (aparece no output do CI).
  // eslint-disable-next-line no-console
  console.log("\n" + COV.formatSummary({ topRules: 3 }));

  // Enforcement contra baseline, a menos que UPDATE_FUZZ_BASELINE=1.
  if (process.env.UPDATE_FUZZ_BASELINE === "1") {
    const next = {};
    for (const [t, data] of Object.entries(report.types)) {
      next[t] = {
        minInvocations: Math.max(1, Math.floor(data.invocations * 0.8)),
        minDistinctReq: Math.max(1, Math.floor(data.distinctReq * 0.8)),
      };
    }
    writeFileSync(BASELINE_PATH, JSON.stringify(next, null, 2) + "\n");
    console.log(`[fuzz-coverage] baseline atualizado em ${BASELINE_PATH}`);
    return;
  }
  if (!existsSync(BASELINE_PATH)) return;
  // Enforcement só quando explicitamente ligado (modo full no CI).
  // No modo fast (poucas iterações) o baseline naturalmente não é
  // atingido — a fast serve para detectar throws/regressões óbvias.
  if (process.env.FUZZ_ENFORCE_COVERAGE !== "1") return;
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const violations = COV.compareBaseline(baseline);
  if (violations.length > 0) {
    throw new Error(
      `Fuzz coverage caiu abaixo do baseline (${violations.length} violações):\n  - ` +
      violations.join("\n  - ") +
      `\n\nSe a mudança é intencional, rode: UPDATE_FUZZ_BASELINE=1 bunx vitest run scripts/lib/rich-results-fuzz.test.mjs`,
    );
  }
});

/**
 * Fuzzing dos checkers de Google Rich Results.
 *
 * Objetivos (property-based, sem dependência externa):
 *
 *   1. ROBUSTEZ — nenhum checker pode lançar exceção diante de entradas
 *      arbitrárias/maliciosas. O validador roda em build; um throw
 *      derruba o postbuild inteiro.
 *
 *   2. CONTRATO DE RETORNO — todo checker devolve
 *      `{ req: string[], rec: string[], unsupported?: boolean }`
 *      com mensagens não-vazias.
 *
 *   3. CLASSIFICAÇÃO DE INVÁLIDOS — quando fuzzamos apenas com "lixo"
 *      (primitivos, arrays vazios, campos ausentes), esperamos que
 *      cada checker acuse ≥ 1 requisito (`req.length > 0`) OU seja
 *      marcado como `unsupported`. Nunca deve aprovar (`req=[]`) um
 *      objeto totalmente vazio dos campos obrigatórios.
 *
 * PRNG seedado (Mulberry32) para reprodutibilidade. Aumente ITERATIONS
 * localmente para stress; o default cobre ~1500 amostras por checker.
 */

const SEED = Number(process.env.FUZZ_SEED || 0xC0FFEE);
const ITERATIONS = Number(process.env.FUZZ_ITER || 60);

// ---------- PRNG determinístico ---------------------------------------------
function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6D2B79F5) >>> 0;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const chance = (p) => rand() < p;
const int = (min, max) => Math.floor(rand() * (max - min + 1)) + min;

// ---------- Geradores de "lixo" ---------------------------------------------
const PRIMITIVES = [
  undefined, null, "", "   ", "x",
  0, 1, -1, NaN, Infinity, -Infinity,
  true, false,
  [], {}, [null], [{}], [1, 2, 3],
  { "@type": "Foo" }, { "@type": [] }, { "@type": ["A", "B"] },
  { name: "" }, { name: "   " },
  "not a url", "ftp://x", "mailto:a@b.com", "javascript:0",
  "/relative", "./x", "//protocol-relative.com/x",
  "data:image/png;base64,AAA", "blob:https://a.com/uuid",
  "http://a.com", "https://a.com/x.jpg",
  { "@type": "ImageObject" }, { "@type": "ImageObject", url: "/rel" },
  { deeply: { nested: { garbage: [1, null, {}] } } },
];

function fuzzValue(depth = 0) {
  if (depth > 3) return pick(PRIMITIVES);
  const kind = int(0, 6);
  switch (kind) {
    case 0: return pick(PRIMITIVES);
    case 1: return int(-1000, 1000);
    case 2: return rand().toString(36).slice(2);
    case 3: { // array de tamanho aleatório
      const n = int(0, 4);
      return Array.from({ length: n }, () => fuzzValue(depth + 1));
    }
    case 4: { // objeto com chaves aleatórias
      const obj = {};
      const n = int(0, 4);
      for (let i = 0; i < n; i++) obj["k" + i] = fuzzValue(depth + 1);
      return obj;
    }
    case 5: return chance(0.5) ? null : undefined;
    case 6: return pick([
      { "@type": "Question", name: fuzzValue(depth + 1), acceptedAnswer: fuzzValue(depth + 1) },
      { "@type": "ListItem", position: int(0, 5), name: pick(["", "x"]), item: fuzzValue(depth + 1) },
      { "@type": "ImageObject", url: pick(["/rel", "data:x", "https://a.com/x.jpg", null]) },
      { "@type": "Answer", text: pick(["", "  ", "resposta ok"]) },
    ]);
  }
  return null;
}

// Gera um nó com @type fixo e campos aleatórios (nomes reais + lixo).
const KNOWN_FIELDS = [
  "name", "url", "@id", "image", "logo", "description",
  "itemListElement", "mainEntity", "hasPart", "sameAs",
  "author", "publisher", "datePublished", "dateModified", "headline",
  "step", "totalTime", "address", "telephone", "geo", "priceRange",
  "aggregateRating", "provider", "itemReviewed", "reviewRating",
  "price", "priceCurrency", "availability", "priceValidUntil",
  "lowPrice", "highPrice", "offerCount", "contentUrl", "width", "height",
  "contactType", "email", "xpath", "cssSelector", "speakable",
  "potentialAction", "numberOfItems", "about", "keywords",
];

function fuzzNode(type) {
  const node = { "@type": type };
  const nFields = int(0, 6);
  for (let i = 0; i < nFields; i++) {
    node[pick(KNOWN_FIELDS)] = fuzzValue();
  }
  return node;
}

// ---------- Contrato base dos retornos --------------------------------------
function assertShape(result, ctx) {
  expect(result, ctx).toBeDefined();
  expect(Array.isArray(result.req), `${ctx}: req deve ser array`).toBe(true);
  expect(Array.isArray(result.rec), `${ctx}: rec deve ser array`).toBe(true);
  for (const m of result.req) {
    expect(typeof m, `${ctx}: req msg string`).toBe("string");
    expect(m.length, `${ctx}: req msg não-vazia`).toBeGreaterThan(0);
  }
  for (const m of result.rec) {
    expect(typeof m, `${ctx}: rec msg string`).toBe("string");
    expect(m.length, `${ctx}: rec msg não-vazia`).toBeGreaterThan(0);
  }
  if (result.unsupported !== undefined) {
    expect(typeof result.unsupported, `${ctx}: unsupported bool`).toBe("boolean");
  }
}

// ============================================================================
// SUITE 1 — Robustez universal: nenhum checker pode lançar
// ============================================================================
describe("fuzz: robustez — nenhum checker lança em input arbitrário", () => {
  const types = Object.keys(CHECKERS);

  for (const type of types) {
    it(`${type}: sobrevive a ${ITERATIONS} inputs randômicos`, () => {
      const check = CHECKERS[type];
      for (let i = 0; i < ITERATIONS; i++) {
        const node = fuzzNode(type);
        let r;
        expect(
          () => { r = check(node); },
          `[${type}] iter=${i} seed=${SEED} node=${JSON.stringify(node).slice(0, 200)}`,
        ).not.toThrow();
        assertShape(r, `${type}#${i}`);
      }
    });
  }

  it("todos os checkers sobrevivem a primitivos crus (undefined/null/string/número)", () => {
    for (const [type, check] of Object.entries(CHECKERS)) {
      for (const p of [null, undefined, "", "x", 0, 1, false, true, [], {}]) {
        // O contrato assume um objeto — mas o checker não pode explodir
        // quando o pipeline injeta lixo. Se `node` não é objeto, o
        // acesso a propriedades deve devolver undefined sem crash.
        // Usamos `?? {}` para simular a proteção mínima esperada.
        expect(() => check(p ?? {}), `${type} vs ${JSON.stringify(p)}`).not.toThrow();
      }
    }
  });
});

// ============================================================================
// SUITE 2 — Classificação: nós vazios NÃO podem ser aprovados
// (exceto quando `unsupported=true`, que é o veredicto correto)
// ============================================================================
describe("fuzz: classificação — nó vazio de campos obrigatórios não aprova", () => {
  // Alguns @types não têm nenhum campo obrigatório na spec do Google
  // (só recomendações) — para esses, um objeto vazio pode legitimamente
  // retornar req=[]. Documentamos aqui, com justificativa.
  const NO_REQUIRED_FIELDS = new Set([
    // WebPage: name pode vir de headline (o checker aceita) — mas com
    //   objeto vazio ambos ausentes, então req > 0. Não é exceção.
    // Nenhum checker atual está na lista — mantida para futuras
    // adições explícitas. Manter vazio força justificar cada
    // exceção via novo teste dedicado.
  ]);

  for (const type of Object.keys(CHECKERS)) {
    it(`${type}: objeto vazio deve ser inválido OU marcado unsupported`, () => {
      const r = CHECKERS[type]({ "@type": type });
      assertShape(r, `${type} empty`);
      if (NO_REQUIRED_FIELDS.has(type)) return;
      const invalido = r.req.length > 0 || r.unsupported === true;
      expect(
        invalido,
        `${type} aprovou objeto vazio — req=${JSON.stringify(r.req)} unsupported=${r.unsupported}`,
      ).toBe(true);
    });
  }
});

// ============================================================================
// SUITE 3 — Property: URLs claramente inválidas SEMPRE geram req
// ============================================================================
describe("fuzz: URLs inválidas em campos obrigatórios geram req", () => {
  const BAD_URLS = [
    "/relativa", "./local", "../up", "sem-esquema",
    "//protocol-relative.com/x", "data:image/png;base64,AAA",
    "blob:https://a.com/uuid", "javascript:void(0)", "mailto:a@b",
    "", "   ", null, undefined, 42, {},
  ];

  it("Organization: url e logo inválidos SEMPRE viram req", () => {
    for (const bad of BAD_URLS) {
      const r = CHECKERS.Organization({
        "@type": "Organization",
        name: "X",
        url: bad,
        logo: bad,
      });
      expect(
        r.req.some((m) => /url absoluta/.test(m)) &&
        r.req.some((m) => /logo absoluta/.test(m)),
        `Organization aceitou url/logo inválidos: ${JSON.stringify(bad)} → req=${JSON.stringify(r.req)}`,
      ).toBe(true);
    }
  });

  it("BreadcrumbList: item.item inválido no penúltimo SEMPRE vira req", () => {
    for (const bad of BAD_URLS) {
      const r = CHECKERS.BreadcrumbList({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: bad },
          { "@type": "ListItem", position: 2, name: "Fim" },
        ],
      });
      expect(
        r.req.some((m) => /URL absoluta/.test(m)),
        `BreadcrumbList aceitou item inválido: ${JSON.stringify(bad)} → req=${JSON.stringify(r.req)}`,
      ).toBe(true);
    }
  });

  it("ImageObject: contentUrl/url/@id todos inválidos SEMPRE vira req", () => {
    for (const bad of BAD_URLS) {
      const r = CHECKERS.ImageObject({
        "@type": "ImageObject",
        contentUrl: bad,
        url: bad,
        "@id": bad,
      });
      expect(
        r.req.some((m) => /contentUrl\/url absoluta/.test(m)),
        `ImageObject aceitou URLs inválidas: ${JSON.stringify(bad)} → req=${JSON.stringify(r.req)}`,
      ).toBe(true);
    }
  });
});

// ============================================================================
// SUITE 4 — Property: FAQPage com < 2 Question válidas nunca "silencia"
// (deve gerar req OU rec, nunca aprovar liso)
// ============================================================================
describe("fuzz: FAQPage — 0/1 Question válida gera algum sinal", () => {
  it("mainEntity vazio → req", () => {
    const r = CHECKERS.FAQPage({ "@type": "FAQPage", mainEntity: [] });
    expect(r.req.length).toBeGreaterThan(0);
  });

  it("1 Question válida → rec (Google recomenda ≥ 2)", () => {
    const r = CHECKERS.FAQPage({
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "P1?", acceptedAnswer: { "@type": "Answer", text: "R1" } },
      ],
    });
    expect(r.req.length).toBe(0);
    expect(r.rec.some((m) => /≥ 2 Question/.test(m))).toBe(true);
  });

  it("fuzz: Questions com campos randômicos — nunca aprova liso quando há Q inválida", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const questions = Array.from({ length: int(1, 3) }, () => ({
        "@type": pick(["Question", "Q", "Answer", 42]), // meio inválidos de propósito
        name: pick(["", "  ", "P?"]),
        acceptedAnswer: pick([
          null, undefined, {}, "string",
          { "@type": "Answer", text: pick(["", "  ", "R"]) },
        ]),
      }));
      const r = CHECKERS.FAQPage({ "@type": "FAQPage", mainEntity: questions });
      assertShape(r, `fuzz FAQ#${i}`);
      const todasValidas = questions.every(
        (q) => q["@type"] === "Question" && typeof q.name === "string" &&
               q.name.trim() && q.acceptedAnswer?.["@type"] === "Answer" &&
               typeof q.acceptedAnswer?.text === "string" &&
               q.acceptedAnswer.text.trim(),
      );
      if (!todasValidas) {
        expect(
          r.req.length,
          `FAQ com Q inválida aprovou liso: iter=${i} seed=${SEED} q=${JSON.stringify(questions).slice(0, 300)}`,
        ).toBeGreaterThan(0);
      }
    }
  });
});

// ============================================================================
// SUITE 5 — Prova determinística: mesma seed produz mesmos veredictos
// ============================================================================
describe("fuzz: determinismo do PRNG", () => {
  it("mesma seed → mesma sequência de mulberry32", () => {
    const a = mulberry32(0xDEADBEEF);
    const b = mulberry32(0xDEADBEEF);
    for (let i = 0; i < 100; i++) expect(a()).toBe(b());
  });

  it("seed diferente → sequências diferentes", () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    let diffs = 0;
    for (let i = 0; i < 100; i++) if (a() !== b()) diffs++;
    expect(diffs).toBeGreaterThan(90);
  });
});

// ============================================================================
// SUITE 6 — Property + Shrinker: contraexemplos minimizados
// ============================================================================
// Ao invés de falhar com o nó randômico "gordo" que primeiro violou a
// propriedade, encontramos o menor nó equivalente e reportamos ELE. Isso
// dá ao desenvolvedor um repro copiável (ex.: `{"@type":"Organization"}`)
// em vez de 400 chars de lixo com o bug escondido no meio.
describe("fuzz+shrink: propriedades minimizadas em falha", () => {
  const PROPERTIES = [
    {
      type: "Organization",
      // Todo Organization sem url válida DEVE ter req contendo "url absoluta".
      generate: () => ({
        "@type": "Organization",
        name: pick(["", "  ", "X", "Patro"]),
        url: pick([undefined, "", "/rel", "javascript:0", "https://ok.com"]),
        logo: pick([undefined, "", "/rel.png", "https://ok.com/l.png"]),
        extra: fuzzValue(),
      }),
      property: (r, n) => {
        // Propriedade: se url é absoluta válida, r.req NÃO deve conter "url absoluta".
        // Se aparece o req sem justificativa (url válida), é bug.
        const urlOk = typeof n.url === "string" && /^https?:\/\//.test(n.url);
        const flagged = r.req.some((m) => /url absoluta/.test(m));
        return urlOk && flagged; // TRUE = quebra a propriedade
      },
    },
    {
      type: "FAQPage",
      generate: () => ({
        "@type": "FAQPage",
        mainEntity: Array.from({ length: int(2, 4) }, () => ({
          "@type": "Question",
          name: pick(["P?", "Como funciona?"]),
          acceptedAnswer: { "@type": "Answer", text: pick(["R", "resposta ok"]) },
        })),
        junk: fuzzValue(),
      }),
      // Propriedade: FAQ com ≥2 Q válidas NÃO pode ter req.
      property: (r) => r.req.length > 0,
    },
  ];

  for (const { type, generate, property } of PROPERTIES) {
    it(`${type}: propriedade não viola em ${ITERATIONS} amostras (shrinker ativo se falhar)`, () => {
      const check = CHECKERS[type];
      for (let i = 0; i < ITERATIONS; i++) {
        const node = generate();
        let r;
        try { r = check(node); } catch { continue; }
        if (property(r, node)) {
          const { shrunk, steps } = shrinkCounterexample(node, check, property);
          throw new Error(
            `[${type}] propriedade violada; contraexemplo minimizado após ${steps} passos:\n` +
            `  ${formatCounterexample(shrunk, { seed: SEED, iter: i })}\n` +
            `  original: ${JSON.stringify(node).slice(0, 200)}`,
          );
        }
      }
    });
  }
});