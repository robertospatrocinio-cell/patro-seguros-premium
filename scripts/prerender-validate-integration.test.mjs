/**
 * Teste de integração: mini-prerender + validador de rich results.
 *
 * Reproduz o pipeline do build (React → HTML → validador) num diretório
 * dist temporário, com um conjunto mínimo de rotas cobrindo os três
 * schemas globais do site:
 *
 *   /              → Organization (bloco estático do index.html)
 *   /seguro-auto   → BreadcrumbList (mesma forma emitida por BreadcrumbSchema.tsx)
 *   /faq           → FAQPage (mesma forma emitida por FAQSchema.tsx)
 *
 * Depois roda o script real `scripts/validate-google-rich-results.mjs`
 * apontado para o dist temporário e afirma:
 *   - exit 0 (mesmo com --strict-warn)
 *   - summary.ineligible === 0
 *   - summary.eligibleWarn === 0
 *   - cada schema esperado foi de fato validado como `eligible`
 *
 * Isolamos em /tmp/prerender-validate-integration-* para não interferir
 * no dist real do projeto — o teste roda mesmo sem `npm run build`.
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VALIDATOR = path.join(ROOT, "scripts", "validate-google-rich-results.mjs");
const BASE = "https://www.patroseguros.com.br";

// ---------- geradores de JSON-LD (paridade com os componentes React) ---------

/** Mesmo shape que `src/components/BreadcrumbSchema.tsx` emite. */
function breadcrumbListJsonLd(pathname, trail) {
  const currentAbs = `${BASE}${pathname === "/" ? "" : pathname.replace(/\/+$/, "")}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${currentAbs}#breadcrumb`,
    itemListElement: trail.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${BASE}${it.url === "/" ? "" : it.url}`,
    })),
  };
}

/** Mesmo shape que `src/components/FAQSchema.tsx` emite (só ≥ 2 Q válidas). */
function faqPageJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Cópia do bloco Organization estático em `index.html` (linhas 217-286). */
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "Patro Corretora de Seguros",
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/images/logo-full.webp`,
    width: 300,
    height: 60,
  },
  sameAs: [
    "https://www.instagram.com/patroseguros",
    "https://www.linkedin.com/company/patroseguros",
  ],
};

function htmlWith(...blocks) {
  const scripts = blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join("\n");
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${scripts}</head><body><div id="root"></div></body></html>`;
}

// ---------- fixture dist temporário ------------------------------------------

let TMP_DIST;

beforeAll(() => {
  TMP_DIST = fs.mkdtempSync(path.join(os.tmpdir(), "prerender-validate-integration-"));

  const write = (relDir, html) => {
    const dir = path.join(TMP_DIST, relDir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
  };

  // ROOT `/` — Organization + BreadcrumbList mínimo
  write("", htmlWith(
    ORGANIZATION_JSONLD,
    breadcrumbListJsonLd("/", [
      { name: "Início", url: "/" },
      { name: "Home", url: "/" },
    ]),
  ));

  // `/seguro-auto` — BreadcrumbList 3 níveis + Organization propagado
  write("seguro-auto", htmlWith(
    ORGANIZATION_JSONLD,
    breadcrumbListJsonLd("/seguro-auto", [
      { name: "Início", url: "/" },
      { name: "Seguros", url: "/seguros" },
      { name: "Seguro Auto", url: "/seguro-auto" },
    ]),
  ));

  // `/faq` — FAQPage com ≥ 2 perguntas + BreadcrumbList + Organization
  write("faq", htmlWith(
    ORGANIZATION_JSONLD,
    breadcrumbListJsonLd("/faq", [
      { name: "Início", url: "/" },
      { name: "FAQ", url: "/faq" },
    ]),
    faqPageJsonLd([
      { q: "Como faço uma cotação?", a: "Preencha o formulário no site ou fale via WhatsApp." },
      { q: "Vocês atendem fora de Guarulhos?", a: "Sim, atendemos em todo o Brasil via canais digitais." },
      { q: "Qual o horário de atendimento?", a: "Segunda a sexta, das 9h às 18h, e sábado das 9h às 13h." },
    ]),
  ));
});

afterAll(() => {
  if (TMP_DIST && fs.existsSync(TMP_DIST)) fs.rmSync(TMP_DIST, { recursive: true, force: true });
});

// ---------- rodada do validador real -----------------------------------------

function runValidator(extraArgs = []) {
  return spawnSync(
    "node",
    [VALIDATOR, `--dist=${TMP_DIST}`, ...extraArgs],
    { encoding: "utf-8", cwd: ROOT },
  );
}

// ---------- assertions -------------------------------------------------------

describe("prerender + validador: bundle mínimo com breadcrumb/FAQ/organization", () => {
  it("valida sem ineligible nem warn (--strict-warn passa)", () => {
    const res = runValidator(["--strict-warn"]);
    expect(
      res.status,
      `validador falhou:\nSTDOUT:\n${res.stdout}\nSTDERR:\n${res.stderr}`,
    ).toBe(0);
  });

  it("relatório: summary.ineligible === 0 e eligibleWarn === 0", () => {
    runValidator(); // regenera o report neste dist
    const reportPath = path.join(TMP_DIST, "google-rich-results-report.json");
    expect(fs.existsSync(reportPath)).toBe(true);
    const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
    expect(report.summary.ineligible).toBe(0);
    expect(report.summary.eligibleWarn).toBe(0);
    expect(report.summary.eligible).toBeGreaterThan(0);
  });

  it("byType: BreadcrumbList / FAQPage / Organization todos 100% eligible", () => {
    const report = JSON.parse(
      fs.readFileSync(path.join(TMP_DIST, "google-rich-results-report.json"), "utf-8"),
    );
    for (const t of ["BreadcrumbList", "FAQPage", "Organization"]) {
      const stats = report.byType[t];
      expect(stats, `byType[${t}] ausente no relatório`).toBeDefined();
      expect(stats.total, `${t} sem ocorrências`).toBeGreaterThan(0);
      expect(stats.ineligible, `${t}: ${stats.ineligible} ineligible`).toBe(0);
      expect(stats.eligible_warn ?? stats.eligibleWarn ?? 0,
        `${t}: warn > 0`).toBe(0);
      expect(stats.eligible, `${t}: 0 eligible`).toBeGreaterThan(0);
    }
  });

  it("cobertura de rotas: as 3 rotas do fixture aparecem no relatório", () => {
    const report = JSON.parse(
      fs.readFileSync(path.join(TMP_DIST, "google-rich-results-report.json"), "utf-8"),
    );
    const routes = Object.keys(report.routes);
    // routeFromFile mapeia dist/x/index.html → /x — casamos por sufixo
    for (const expected of ["/", "/seguro-auto", "/faq"]) {
      const found = routes.some((r) => r === expected);
      expect(found, `rota ${expected} ausente. routes=${JSON.stringify(routes)}`).toBe(true);
    }
  });

  it("regressão: se injetarmos breadcrumb com URL relativa, validador falha", () => {
    // Prova negativa: o pipeline realmente detecta um bug de prerender.
    const bogusDir = fs.mkdtempSync(path.join(os.tmpdir(), "prv-neg-"));
    try {
      fs.writeFileSync(
        path.join(bogusDir, "index.html"),
        htmlWith(
          ORGANIZATION_JSONLD,
          breadcrumbListJsonLd("/x", [
            { name: "Início", url: "/" },
            { name: "X", url: "/x" },
          ]),
        ),
        "utf-8",
      );
      // Sobrescreve o penúltimo item com URL relativa (bug simulado)
      const bad = JSON.parse(fs.readFileSync(path.join(bogusDir, "index.html"), "utf-8")
        .match(/<script type="application\/ld\+json">(.+?)<\/script>/g)[1]
        .replace(/^<script[^>]*>|<\/script>$/g, ""));
      bad.itemListElement[0].item = "/apenas-relativa";
      fs.writeFileSync(
        path.join(bogusDir, "index.html"),
        htmlWith(ORGANIZATION_JSONLD, bad),
        "utf-8",
      );

      const res = spawnSync(
        "node",
        [VALIDATOR, `--dist=${bogusDir}`],
        { encoding: "utf-8", cwd: ROOT },
      );
      expect(res.status, "validador aprovou breadcrumb com URL relativa").not.toBe(0);
    } finally {
      fs.rmSync(bogusDir, { recursive: true, force: true });
    }
  });
});

// ============================================================================
// SUITE ADICIONAL — invariância à ordem dos nós JSON-LD
// ============================================================================
// Google Rich Results é indiferente à ordem em que os blocos JSON-LD
// aparecem no HTML. Nosso validador precisa manter a mesma indiferença:
// para cada rota do fixture, qualquer permutação da ordem dos <script
// type="application/ld+json"> deve produzir EXATAMENTE o mesmo veredicto
// por rota — ineligible=0, eligibleWarn=0, eligible>0.
//
// Se um dia o validador começar a depender de "o primeiro nó é o
// principal" (regressão sutil), este teste quebra imediatamente.
// ============================================================================

function permutations(arr) {
  if (arr.length <= 1) return [arr.slice()];
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of permutations(rest)) out.push([arr[i], ...p]);
  }
  return out;
}

// Fixtures (blocos JSON-LD por rota) — mesmos usados na suite acima,
// só que expressos como arrays para poder permutar.
function fixtureBlocksFor(route) {
  switch (route) {
    case "/":
      return [
        ORGANIZATION_JSONLD,
        breadcrumbListJsonLd("/", [
          { name: "Início", url: "/" },
          { name: "Home", url: "/" },
        ]),
      ];
    case "/seguro-auto":
      return [
        ORGANIZATION_JSONLD,
        breadcrumbListJsonLd("/seguro-auto", [
          { name: "Início", url: "/" },
          { name: "Seguros", url: "/seguros" },
          { name: "Seguro Auto", url: "/seguro-auto" },
        ]),
      ];
    case "/faq":
      return [
        ORGANIZATION_JSONLD,
        breadcrumbListJsonLd("/faq", [
          { name: "Início", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]),
        faqPageJsonLd([
          { q: "Como faço uma cotação?", a: "Preencha o formulário no site ou fale via WhatsApp." },
          { q: "Vocês atendem fora de Guarulhos?", a: "Sim, atendemos em todo o Brasil via canais digitais." },
          { q: "Qual o horário de atendimento?", a: "Segunda a sexta, das 9h às 18h, e sábado das 9h às 13h." },
        ]),
      ];
    default:
      throw new Error(`fixtureBlocksFor: rota desconhecida ${route}`);
  }
}

const ROUTES = ["/", "/seguro-auto", "/faq"];

function routeToRelDir(route) {
  return route === "/" ? "" : route.replace(/^\//, "");
}

function writeFixtureDist(distDir, perRouteBlocks) {
  for (const [route, blocks] of Object.entries(perRouteBlocks)) {
    const dir = path.join(distDir, routeToRelDir(route));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), htmlWith(...blocks), "utf-8");
  }
}

function aggregateRoute(routeEntry) {
  const c = { eligible: 0, eligibleWarn: 0, ineligible: 0, unsupported: 0 };
  for (const n of routeEntry?.nodes ?? []) {
    if (n.verdict === "eligible") c.eligible++;
    else if (n.verdict === "eligible-warn") c.eligibleWarn++;
    else if (n.verdict === "ineligible") c.ineligible++;
    else if (n.verdict === "unsupported") c.unsupported++;
  }
  return c;
}

describe("invariância à ordem dos nós JSON-LD por rota", () => {
  // 2! + 2! + 3! = 2+2+6 = 10 combinações por rota. Para não explodir
  // (produto cartesiano seria 24 runs de validador), permutamos UMA
  // rota por vez mantendo as outras na ordem canônica. Isso ainda
  // exercita todas as permutações relevantes em O(soma) e não O(produto).
  for (const target of ROUTES) {
    const perms = permutations(fixtureBlocksFor(target));
    it(`${target}: ${perms.length} permutações → ineligible=0, eligibleWarn=0, eligible>0`, () => {
      const baseBlocks = Object.fromEntries(
        ROUTES.map((r) => [r, fixtureBlocksFor(r)]),
      );
      // Cada permutação: mesmo dist temporário reescrito.
      const dist = fs.mkdtempSync(path.join(os.tmpdir(), `prv-perm-${routeToRelDir(target) || "root"}-`));
      try {
        let previousByRoute = null;
        perms.forEach((perm, idx) => {
          writeFixtureDist(dist, { ...baseBlocks, [target]: perm });
          const res = spawnSync(
            "node",
            [VALIDATOR, `--dist=${dist}`, "--strict-warn"],
            { encoding: "utf-8", cwd: ROOT },
          );
          expect(
            res.status,
            `[${target}] perm#${idx} falhou:\nORDEM: ${perm.map((b) => b["@type"]).join(",")}\nSTDOUT:\n${res.stdout}\nSTDERR:\n${res.stderr}`,
          ).toBe(0);

          const report = JSON.parse(
            fs.readFileSync(path.join(dist, "google-rich-results-report.json"), "utf-8"),
          );
          // Invariantes globais.
          expect(report.summary.ineligible, `[${target}] perm#${idx}: ineligible`).toBe(0);
          expect(report.summary.eligibleWarn, `[${target}] perm#${idx}: eligibleWarn`).toBe(0);
          expect(report.summary.eligible, `[${target}] perm#${idx}: eligible=0`).toBeGreaterThan(0);

          // Invariantes por rota — cada rota do fixture continua limpa.
          for (const route of ROUTES) {
            const routeStats = report.routes[route];
            expect(routeStats, `[${target}] perm#${idx}: rota ${route} sumiu`).toBeDefined();
            const c = aggregateRoute(routeStats);
            expect(c.ineligible, `[${target}] perm#${idx}: ${route} ineligible`).toBe(0);
            expect(c.eligibleWarn, `[${target}] perm#${idx}: ${route} warn`).toBe(0);
            expect(c.eligible, `[${target}] perm#${idx}: ${route} eligible=0`).toBeGreaterThan(0);
          }

          // Determinismo: contadores idênticos entre permutações.
          const currentByRoute = Object.fromEntries(
            ROUTES.map((r) => [r, aggregateRoute(report.routes[r])]),
          );
          if (previousByRoute) {
            expect(
              currentByRoute,
              `[${target}] perm#${idx}: contadores por rota mudaram vs perm anterior`,
            ).toEqual(previousByRoute);
          }
          previousByRoute = currentByRoute;
        });
      } finally {
        fs.rmSync(dist, { recursive: true, force: true });
      }
    });
  }
});

// ============================================================================
// SUITE NEGATIVA — Organization com url/logo quebrados DEVE falhar
// ============================================================================
// Prova, contra o bundle prerenderizado real (mini-fixture), que o
// validador detecta regressões nos campos obrigatórios da Organization
// (url absoluta, logo absoluta). Cada caso injeta UM erro isolado e
// confirma:
//   - exit code ≠ 0
//   - report.summary.ineligible > 0
//   - a mensagem req esperada aparece na rota afetada
//
// Se um dia o checker de Organization for enfraquecido (ex.: aceitar
// URL relativa), estes testes quebram antes do deploy.
// ============================================================================

describe("negativos: Organization com url/logo inválidos derruba o validador", () => {
  const CASES = [
    {
      name: "url ausente",
      mutate: (org) => { delete org.url; },
      expectReq: /^url absoluta ausente$/,
    },
    {
      name: "url relativa",
      mutate: (org) => { org.url = "/rel"; },
      expectReq: /^url absoluta ausente$/,
    },
    {
      name: "url com esquema javascript:",
      mutate: (org) => { org.url = "javascript:void(0)"; },
      expectReq: /^url absoluta ausente$/,
    },
    {
      name: "url protocol-relative",
      mutate: (org) => { org.url = "//patroseguros.com.br"; },
      expectReq: /^url absoluta ausente$/,
    },
    {
      name: "logo ausente",
      mutate: (org) => { delete org.logo; },
      expectReq: /^logo absoluta ausente/,
    },
    {
      name: "logo string relativa",
      mutate: (org) => { org.logo = "/images/logo-full.webp"; },
      expectReq: /^logo absoluta ausente/,
    },
    {
      name: "logo ImageObject sem url absoluta",
      mutate: (org) => { org.logo = { "@type": "ImageObject", url: "/rel.png", width: 300, height: 60 }; },
      expectReq: /^logo absoluta ausente/,
    },
    {
      name: "logo data: URI",
      mutate: (org) => { org.logo = "data:image/png;base64,AAA"; },
      expectReq: /^logo absoluta ausente/,
    },
  ];

  for (const { name, mutate, expectReq } of CASES) {
    it(`Organization: ${name} → validador falha`, () => {
      const dist = fs.mkdtempSync(path.join(os.tmpdir(), "prv-neg-org-"));
      try {
        // Clona profundamente para não vazar mutações entre casos
        const brokenOrg = JSON.parse(JSON.stringify(ORGANIZATION_JSONLD));
        mutate(brokenOrg);

        const dir = path.join(dist, ""); // rota "/"
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(
          path.join(dir, "index.html"),
          htmlWith(
            brokenOrg,
            breadcrumbListJsonLd("/", [
              { name: "Início", url: "/" },
              { name: "Home", url: "/" },
            ]),
          ),
          "utf-8",
        );

        const res = spawnSync(
          "node",
          [VALIDATOR, `--dist=${dist}`],
          { encoding: "utf-8", cwd: ROOT },
        );
        expect(
          res.status,
          `validador aprovou Organization quebrada (${name}):\nSTDOUT:\n${res.stdout}\nSTDERR:\n${res.stderr}`,
        ).not.toBe(0);

        const report = JSON.parse(
          fs.readFileSync(path.join(dist, "google-rich-results-report.json"), "utf-8"),
        );
        expect(report.summary.ineligible, `${name}: ineligible deveria ser > 0`).toBeGreaterThan(0);

        // Confirma que o motivo é o esperado (Organization) e não outro nó
        const orgNode = (report.routes["/"]?.nodes ?? []).find(
          (n) => n.type === "Organization",
        );
        expect(orgNode, `${name}: nó Organization ausente do relatório`).toBeDefined();
        expect(orgNode.verdict, `${name}: Organization não marcada ineligible`).toBe("ineligible");
        expect(
          orgNode.required.some((m) => expectReq.test(m)),
          `${name}: req esperado (${expectReq}) ausente — recebido ${JSON.stringify(orgNode.required)}`,
        ).toBe(true);
      } finally {
        fs.rmSync(dist, { recursive: true, force: true });
      }
    });
  }

  it("controle: Organization intacta continua eligible (guarda contra falso-positivo)", () => {
    const dist = fs.mkdtempSync(path.join(os.tmpdir(), "prv-neg-org-ok-"));
    try {
      fs.mkdirSync(dist, { recursive: true });
      fs.writeFileSync(
        path.join(dist, "index.html"),
        htmlWith(
          ORGANIZATION_JSONLD,
          breadcrumbListJsonLd("/", [
            { name: "Início", url: "/" },
            { name: "Home", url: "/" },
          ]),
        ),
        "utf-8",
      );
      const res = spawnSync(
        "node",
        [VALIDATOR, `--dist=${dist}`, "--strict-warn"],
        { encoding: "utf-8", cwd: ROOT },
      );
      expect(res.status, `controle falhou:\n${res.stdout}\n${res.stderr}`).toBe(0);
    } finally {
      fs.rmSync(dist, { recursive: true, force: true });
    }
  });
});

// ============================================================================
// SUITE — Determinismo do pipeline
// ============================================================================
// Rodar o validador N vezes contra o MESMO dist prerenderizado deve
// sempre produzir:
//   1. o mesmo `summary` (eligible/eligibleWarn/ineligible/unsupported)
//   2. o mesmo conjunto de `@type` em `byType`
//   3. os mesmos contadores dentro de cada `byType[type]`
//   4. o mesmo conjunto de rotas + mesmo verdict por nó em cada rota
//
// Se algum dia introduzirmos ordenação instável (Object.keys sem sort,
// iteração dependente de timing, cache com TTL, PRNG não seedado), este
// teste quebra imediatamente.
// ============================================================================

describe("determinismo: execuções repetidas do validador produzem o mesmo relatório", () => {
  const RUNS = 5;

  function readReport(distDir) {
    return JSON.parse(
      fs.readFileSync(path.join(distDir, "google-rich-results-report.json"), "utf-8"),
    );
  }

  function snapshot(report) {
    // Ignora `generatedAt` (timestamp) — o resto DEVE bater byte-a-byte.
    return {
      summary: report.summary,
      byTypeKeys: Object.keys(report.byType ?? {}).sort(),
      byType: Object.fromEntries(
        Object.entries(report.byType ?? {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => [k, v]),
      ),
      routesKeys: Object.keys(report.routes ?? {}).sort(),
      routeNodes: Object.fromEntries(
        Object.entries(report.routes ?? {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([route, entry]) => [
            route,
            (entry.nodes ?? []).map((n) => ({
              type: n.type,
              verdict: n.verdict,
              required: [...n.required].sort(),
              recommended: [...n.recommended].sort(),
            })),
          ]),
      ),
    };
  }

  it(`${RUNS} execuções sobre o mesmo fixture → snapshots idênticos`, () => {
    const dist = fs.mkdtempSync(path.join(os.tmpdir(), "prv-det-"));
    try {
      // Popula o dist com as 3 rotas canônicas do fixture.
      for (const route of ROUTES) {
        const dir = path.join(dist, routeToRelDir(route));
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), htmlWith(...fixtureBlocksFor(route)), "utf-8");
      }

      const snapshots = [];
      for (let i = 0; i < RUNS; i++) {
        const res = spawnSync(
          "node",
          [VALIDATOR, `--dist=${dist}`, "--strict-warn"],
          { encoding: "utf-8", cwd: ROOT },
        );
        expect(
          res.status,
          `run#${i} falhou:\nSTDOUT:\n${res.stdout}\nSTDERR:\n${res.stderr}`,
        ).toBe(0);
        snapshots.push(snapshot(readReport(dist)));
      }

      const first = snapshots[0];
      for (let i = 1; i < snapshots.length; i++) {
        expect(
          snapshots[i].summary,
          `run#${i}: summary divergiu de run#0`,
        ).toEqual(first.summary);
        expect(
          snapshots[i].byTypeKeys,
          `run#${i}: conjunto de @type divergiu (${snapshots[i].byTypeKeys.join(",")} vs ${first.byTypeKeys.join(",")})`,
        ).toEqual(first.byTypeKeys);
        expect(
          snapshots[i].byType,
          `run#${i}: contadores por @type divergiram`,
        ).toEqual(first.byType);
        expect(
          snapshots[i].routesKeys,
          `run#${i}: conjunto de rotas divergiu`,
        ).toEqual(first.routesKeys);
        expect(
          snapshots[i].routeNodes,
          `run#${i}: verdict por nó divergiu em alguma rota`,
        ).toEqual(first.routeNodes);
      }

      // Sanity: o snapshot não é trivialmente vazio.
      expect(first.byTypeKeys, "byType vazio — fixture não gerou nós?").not.toEqual([]);
      expect(first.routesKeys.length, "nenhuma rota no relatório").toBeGreaterThan(0);
    } finally {
      fs.rmSync(dist, { recursive: true, force: true });
    }
  });

  it("mesmos blocos em ordem diferente entre runs → mesmo summary e mesmo conjunto de @type", () => {
    // Complementa a suíte de invariância de ordem: aqui não permutamos
    // exaustivamente, só rodamos duas vezes com ordens diferentes e
    // exigimos summary + byType idênticos, provando que o pipeline
    // agrega por @type/verdict e não por posição.
    const distA = fs.mkdtempSync(path.join(os.tmpdir(), "prv-det-a-"));
    const distB = fs.mkdtempSync(path.join(os.tmpdir(), "prv-det-b-"));
    try {
      for (const route of ROUTES) {
        const blocks = fixtureBlocksFor(route);
        const reversed = [...blocks].reverse();
        const dirA = path.join(distA, routeToRelDir(route));
        const dirB = path.join(distB, routeToRelDir(route));
        fs.mkdirSync(dirA, { recursive: true });
        fs.mkdirSync(dirB, { recursive: true });
        fs.writeFileSync(path.join(dirA, "index.html"), htmlWith(...blocks), "utf-8");
        fs.writeFileSync(path.join(dirB, "index.html"), htmlWith(...reversed), "utf-8");
      }

      for (const d of [distA, distB]) {
        const res = spawnSync("node", [VALIDATOR, `--dist=${d}`, "--strict-warn"], {
          encoding: "utf-8", cwd: ROOT,
        });
        expect(res.status, `run em ${d} falhou`).toBe(0);
      }

      const a = snapshot(readReport(distA));
      const b = snapshot(readReport(distB));
      expect(b.summary, "summary divergiu ao inverter a ordem dos blocos").toEqual(a.summary);
      expect(b.byTypeKeys, "conjunto de @type divergiu ao inverter a ordem").toEqual(a.byTypeKeys);
      expect(b.byType, "contadores por @type divergiram ao inverter a ordem").toEqual(a.byType);
    } finally {
      fs.rmSync(distA, { recursive: true, force: true });
      fs.rmSync(distB, { recursive: true, force: true });
    }
  });
});

// ============================================================================
// SUITE — Snapshot do relatório (drift-detection por rota e por @type)
// ============================================================================
// Congela um snapshot canônico do `google-rich-results-report.json`
// gerado sobre o fixture mínimo (ROUTES × fixtureBlocksFor). Se alguma
// mudança no validador, nos checkers ou no shape do JSON-LD emitido pelos
// componentes alterar:
//   - o summary agregado,
//   - o breakdown por @type,
//   - o breakdown por rota (verdict + listas de required/recommended),
// o snapshot quebra e força revisão explícita — evitando drift silencioso
// no relatório que o CI publica em `dist/rich-results-by-route.json`.
//
// O snapshot é normalizado (chaves ordenadas, `generatedAt` removido) para
// ser 100% determinístico entre máquinas e execuções.
// ============================================================================

describe("snapshot: google-rich-results-report.json (drift por rota e por @type)", () => {
  function normalizeReport(report) {
    const sortKeys = (obj) =>
      Object.fromEntries(
        Object.entries(obj)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => [k, v]),
      );

    return {
      summary: sortKeys(report.summary ?? {}),
      byType: Object.fromEntries(
        Object.entries(report.byType ?? {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([type, stats]) => [type, sortKeys(stats)]),
      ),
      routes: Object.fromEntries(
        Object.entries(report.routes ?? {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([route, entry]) => [
            route,
            {
              nodes: (entry.nodes ?? []).map((n) => ({
                type: n.type,
                verdict: n.verdict,
                required: [...(n.required ?? [])].sort(),
                recommended: [...(n.recommended ?? [])].sort(),
              })),
            },
          ]),
      ),
    };
  }

  it("congela breakdown por rota e por @type do fixture mínimo", () => {
    const dist = fs.mkdtempSync(path.join(os.tmpdir(), "prv-snap-"));
    try {
      for (const route of ROUTES) {
        const dir = path.join(dist, routeToRelDir(route));
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), htmlWith(...fixtureBlocksFor(route)), "utf-8");
      }

      const res = spawnSync(
        "node",
        [VALIDATOR, `--dist=${dist}`, "--strict-warn"],
        { encoding: "utf-8", cwd: ROOT },
      );
      expect(
        res.status,
        `validador falhou:\nSTDOUT:\n${res.stdout}\nSTDERR:\n${res.stderr}`,
      ).toBe(0);

      const report = JSON.parse(
        fs.readFileSync(path.join(dist, "google-rich-results-report.json"), "utf-8"),
      );
      const normalized = normalizeReport(report);

      expect(normalized).toMatchSnapshot();
    } finally {
      fs.rmSync(dist, { recursive: true, force: true });
    }
  });
});