/**
 * Fixture canônico do teste de integração `prerender-validate-integration`.
 *
 * Exportado como módulo para que tanto o teste vitest quanto o builder de
 * relatório usado pelo CI (`scripts/build-integration-report.mjs`) compartilhem
 * exatamente o mesmo dist: qualquer divergência sutil entre a fixture do teste
 * e a fixture do artefato invalidaria o diff que o PR publica.
 *
 * Só a construção do dist mora aqui — asserts continuam no teste.
 */

import fs from "node:fs";
import path from "node:path";

export const BASE = "https://www.patroseguros.com.br";
export const ROUTES = ["/", "/seguro-auto", "/faq"];

/** Mesmo shape que `src/components/BreadcrumbSchema.tsx` emite. */
export function breadcrumbListJsonLd(pathname, trail) {
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

/** Mesmo shape que `src/components/FAQSchema.tsx` emite. */
export function faqPageJsonLd(faqs) {
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

/** Cópia do bloco Organization estático em `index.html`. */
export const ORGANIZATION_JSONLD = {
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

export function htmlWith(...blocks) {
  const scripts = blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join("\n");
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${scripts}</head><body><div id="root"></div></body></html>`;
}

export function fixtureBlocksFor(route) {
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

export function routeToRelDir(route) {
  return route === "/" ? "" : route.replace(/^\//, "");
}

/** Popula um dist temporário com o fixture canônico das ROUTES. */
export function writeCanonicalFixture(distDir) {
  for (const route of ROUTES) {
    const dir = path.join(distDir, routeToRelDir(route));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), htmlWith(...fixtureBlocksFor(route)), "utf-8");
  }
}