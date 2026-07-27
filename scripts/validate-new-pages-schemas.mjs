#!/usr/bin/env node
/**
 * validate-new-pages-schemas.mjs
 *
 * Checagem CI focada nas páginas recém-criadas — garante presença e
 * consistência dos schemas Service, BreadcrumbList e FAQPage.
 *
 * Estratégia: validação a NÍVEL DE FONTE (TSX). Rich snippets como
 * Service e FAQPage são injetados por React-Helmet e não aparecem em
 * dist/*.html estático, então uma checagem só no dist/ dá falso-negativo.
 *
 * Regras por página listada em NEW_PAGES:
 *   1) A página renderiza um TEMPLATE que sabidamente injeta os 3 schemas
 *      (InsurancePageTemplate, LocalPageTemplate, PremiumPageTemplate,
 *       HealthPlanTemplate, InsurerPageTemplate, PartnerInsurerPage), OU
 *   2) A página renderiza EXPLICITAMENTE os 3 componentes:
 *      <ServiceSchema …/>, <BreadcrumbSchema …/> e um FAQPage
 *      (<FAQSchema>, <FAQPageSchema> ou <LocalAreaSchema faqs=…>).
 *
 * Uma página pode ser marcada como `exempt` no registro (com motivo)
 * quando o schema não faz sentido (ex.: thank-you page).
 *
 * Exit code: 0 tudo OK, 1 se qualquer página nova violar as regras.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/**
 * Templates que INJETAM automaticamente Service + BreadcrumbList + FAQPage.
 * Verificado em src/components/*.tsx (grep ServiceSchema / BreadcrumbSchema /
 * FAQSchema no template).
 */
const SCHEMA_TEMPLATES = [
  "InsurancePageTemplate",
  "LocalPageTemplate",
  "PremiumPageTemplate",
  "HealthPlanTemplate",
  "InsurerPageTemplate",
  "PartnerInsurerPage",
];

/**
 * Registro das páginas recém-criadas que devem carregar os 3 schemas.
 * Adicionar novas entradas aqui à medida que forem criadas. O script
 * falha o build se o arquivo existir mas não satisfizer a regra.
 * Campo `exempt` (opcional) documenta ausência intencional.
 */
const NEW_PAGES = [
  { file: "src/pages/SeguroCartaVerde.tsx" },
  { file: "src/pages/LandingSeguroAcidentesPessoais.tsx" },
  {
    file: "src/pages/ComoCompararSeguradorasGuarulhos.tsx",
    exempt: "Página editorial/comparativa — usa Article + HowTo + FAQPage; Service não se aplica.",
  },
  {
    file: "src/pages/SeguradoraParceiraSeoPage.tsx",
    exempt: "Página institucional de parceiro — usa Organization + FAQPage; Service seria redundante.",
  },
  {
    file: "src/pages/SeguradorasParceirasHub.tsx",
    exempt: "Hub/CollectionPage — usa BreadcrumbList + FAQPage; Service não representa oferta única.",
  },
  {
    file: "src/pages/SegurosGuarulhosBairros.tsx",
    exempt: "Hub de bairros — usa LocalBusiness + FAQPage; Service coberto por subpáginas produto×bairro.",
  },
  { file: "src/pages/SeoLocalPage.tsx" },
  { file: "src/pages/IndiqueEGanhe.tsx" },
  {
    file: "src/pages/ObrigadoIndicacao.tsx",
    exempt: "Thank-you page — sem valor SEO, robots noindex.",
  },
];

const SERVICE_RE = /<ServiceSchema\b/;
// PageMeta auto-emite <BreadcrumbSchema /> a partir do pathname
// (ver src/components/PageMeta.tsx), então usá-lo satisfaz o requisito.
const BREADCRUMB_RE = /<(BreadcrumbSchema|PageMeta)\b/;
// FAQPage pode vir de qualquer um destes componentes:
const FAQ_RE = /<(FAQSchema|FAQPageSchema|LocalAreaSchema)\b/;
const TEMPLATE_RE = new RegExp(`<(${SCHEMA_TEMPLATES.join("|")})\\b`);

const errors = [];
const summary = [];

for (const entry of NEW_PAGES) {
  const abs = path.join(ROOT, entry.file);
  if (!fs.existsSync(abs)) {
    errors.push(`${entry.file}: arquivo não encontrado — remova do registro ou restaure a página.`);
    continue;
  }
  const src = fs.readFileSync(abs, "utf-8");
  if (entry.exempt) {
    summary.push({ file: entry.file, status: "exempt", reason: entry.exempt });
    continue;
  }
  const usesTemplate = TEMPLATE_RE.test(src);
  const hasService = SERVICE_RE.test(src);
  const hasBreadcrumb = BREADCRUMB_RE.test(src);
  const hasFaq = FAQ_RE.test(src);

  if (usesTemplate) {
    summary.push({ file: entry.file, status: "ok-template" });
    continue;
  }
  const missing = [];
  if (!hasService) missing.push("ServiceSchema");
  if (!hasBreadcrumb) missing.push("BreadcrumbSchema");
  if (!hasFaq) missing.push("FAQ (FAQSchema | FAQPageSchema | LocalAreaSchema)");
  if (missing.length) {
    errors.push(`${entry.file}: schema(s) ausente(s) — ${missing.join(", ")}. ` +
      `Adicione os componentes explicitamente ou envolva a página num template schema-aware (${SCHEMA_TEMPLATES.join(", ")}).`);
  } else {
    summary.push({ file: entry.file, status: "ok-explicit" });
  }
}

console.log("\n📑 Schemas obrigatórios em páginas recém-criadas (Service + BreadcrumbList + FAQPage):");
for (const s of summary) {
  const icon = s.status === "exempt" ? "⚪" : "✅";
  console.log(`  ${icon} ${s.file}  [${s.status}]${s.reason ? " — " + s.reason : ""}`);
}
if (errors.length) {
  console.error(`\n❌ ${errors.length} página(s) sem schemas obrigatórios:`);
  errors.forEach((e) => console.error("  • " + e));
  process.exit(1);
}
console.log(`\n✅ ${NEW_PAGES.length} páginas verificadas — todos os schemas presentes.`);
