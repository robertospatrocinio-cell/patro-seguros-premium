#!/usr/bin/env node
/**
 * validate-jumplinks.mjs
 *
 * CI gate: garante que TODO `jumpLinks` passado ao `InsurancePageTemplate`
 * aponte para um heading com `id` estável — tanto no código-fonte do template
 * (para páginas SPA) quanto no HTML pré-renderizado (para páginas em `dist/`).
 *
 * Motivação:
 *  - Crawlers seguem hashes; se `#preco-heading` não existe no HTML servido,
 *    o link vira uma âncora quebrada e prejudica UX/SEO.
 *  - Leitores de tela dependem do id + aria-labelledby para navegar seções.
 *
 * Regras aplicadas em cada href `#foo`:
 *  1. O id `foo` precisa existir como `id="foo"` em `InsurancePageTemplate.tsx`.
 *  2. Se a seção correspondente é condicional (renderiza só quando a prop X
 *     é passada), a página precisa passar essa prop.
 *  3. Se a rota está em `dist/`, o HTML pré-renderizado precisa conter o id.
 *
 * Uso:
 *   node scripts/validate-jumplinks.mjs                # valida fonte + dist
 *   SKIP_DIST=1 node scripts/validate-jumplinks.mjs    # só fonte (pre-build)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PAGES_DIR = path.join(ROOT, "src", "pages");
const TEMPLATE = path.join(ROOT, "src", "components", "InsurancePageTemplate.tsx");
const DIST = path.join(ROOT, "dist");
const SKIP_DIST = process.env.SKIP_DIST === "1";

/**
 * Mapa id → prop obrigatória (undefined = seção sempre renderiza).
 * Mantém sincronia manual com `InsurancePageTemplate.tsx`; um teste abaixo
 * bloqueia o CI se um id conhecido do template não estiver mapeado aqui.
 */
const ID_REQUIREMENTS = {
  "coberturas-heading": null, // sempre (coverages é obrigatório)
  "faq-heading": null, // sempre (faqs é obrigatório)
  "formulario-heading": null,
  "quem-precisa-heading": null,
  "por-que-patro-heading": null,
  "descricao-heading": null,
  "como-funciona-heading": "howItWorks",
  "preco-heading": "pricingInfo",
  "cenarios-heading": "realScenarios",
  "detalhes-heading": "importantDetails",
  "dicas-heading": "tips",
  "exclusoes-heading": "coverageExclusions",
  "galeria-heading": "gallery",
  "artigo-destaque-heading": "featuredArticle",
  "relacionados-heading": "relatedPages",
};

function readFile(p) {
  return fs.readFileSync(p, "utf-8");
}

function collectTemplateIds(src) {
  const ids = new Set();
  const re = /id="([a-z0-9-]+-heading)"/g;
  let m;
  while ((m = re.exec(src)) !== null) ids.add(m[1]);
  return ids;
}

/**
 * A11y gate: cada id `<foo>-heading` do template DEVE ter uma <section>
 * (ou landmark equivalente) que a referencie via `aria-labelledby="foo-heading"`.
 * Sem esse par, screen readers não anunciam a região ao pular via link
 * âncora do cluster, o que quebra o contrato de "jumping between clusters
 * acessível" que os jump-links prometem.
 */
function collectAriaLabelledBy(src) {
  const refs = new Set();
  const re = /aria-labelledby="([a-z0-9-]+-heading)"/g;
  let m;
  while ((m = re.exec(src)) !== null) refs.add(m[1]);
  return refs;
}

function collectPagesWithJumpLinks() {
  const results = [];
  for (const entry of fs.readdirSync(PAGES_DIR, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".tsx")) continue;
    const full = path.join(PAGES_DIR, entry.name);
    const src = readFile(full);
    if (!/jumpLinks=\{/.test(src)) continue;
    const block = src.match(/jumpLinks=\{\[([\s\S]*?)\]\}/);
    if (!block) continue;
    const hrefs = [...block[1].matchAll(/href:\s*["'`]#([a-z0-9-]+)["'`]/g)].map((x) => x[1]);
    if (hrefs.length === 0) continue;
    const propsPassed = new Set(
      [...src.matchAll(/^\s{2,}([a-zA-Z]+)=/gm)].map((x) => x[1])
    );
    results.push({ file: full, name: entry.name, hrefs, propsPassed, src });
  }
  return results;
}

/**
 * Descobre a rota pública associada a um arquivo de página, lendo App.tsx.
 * Retorna null se não encontrar mapeamento (a página pode ser SPA-only).
 */
function loadRoutesFromAppTsx() {
  const app = readFile(path.join(ROOT, "src", "App.tsx"));
  // Casa <Route path="/foo" element={<Bar ... />} e variações com lazy.
  const routes = new Map();
  const re = /path="([^"]+)"[\s\S]{0,200}?element=\{\s*<([A-Za-z0-9_]+)/g;
  let m;
  while ((m = re.exec(app)) !== null) {
    const [, route, component] = m;
    if (!routes.has(component)) routes.set(component, route);
  }
  return routes;
}

function distHtmlForRoute(route) {
  if (!route || route.startsWith(":") || route.includes(":")) return null;
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  const candidates = clean
    ? [
        path.join(DIST, clean, "index.html"),
        path.join(DIST, `${clean}.html`),
      ]
    : [path.join(DIST, "index.html")];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

function validate() {
  const templateSrc = readFile(TEMPLATE);
  const templateIds = collectTemplateIds(templateSrc);
  const errors = [];
  const warnings = [];

  // Guard: todo id conhecido do template deve estar mapeado em ID_REQUIREMENTS.
  for (const id of templateIds) {
    if (!(id in ID_REQUIREMENTS)) {
      errors.push(
        `[template] id "${id}" existe em InsurancePageTemplate.tsx mas não está mapeado em ID_REQUIREMENTS (scripts/validate-jumplinks.mjs). Atualize o mapa.`
      );
    }
  }

  // Guard A11y: todo id `-heading` precisa de <section aria-labelledby>
  // apontando pra ele. Isso garante que o cluster jumping expõe um
  // landmark nomeado aos leitores de tela.
  const labelledRefs = collectAriaLabelledBy(templateSrc);
  for (const id of templateIds) {
    if (!labelledRefs.has(id)) {
      errors.push(
        `[a11y] heading id "${id}" não é referenciado por nenhum aria-labelledby no InsurancePageTemplate. Adicione aria-labelledby="${id}" na <section> correspondente para que leitores de tela anunciem a região ao pular via jump-link.`
      );
    }
  }
  for (const ref of labelledRefs) {
    if (!templateIds.has(ref)) {
      errors.push(
        `[a11y] aria-labelledby="${ref}" aponta para um id inexistente no template — âncora quebrada para tecnologias assistivas.`
      );
    }
  }
  for (const id of Object.keys(ID_REQUIREMENTS)) {
    if (!templateIds.has(id)) {
      warnings.push(
        `[template] id "${id}" mapeado mas não encontrado em InsurancePageTemplate.tsx (renomeado?).`
      );
    }
  }

  const componentToRoute = loadRoutesFromAppTsx();
  const pages = collectPagesWithJumpLinks();

  let totalHrefs = 0;
  let checkedDist = 0;

  for (const page of pages) {
    const componentName = page.name.replace(/\.tsx$/, "");
    const route = componentToRoute.get(componentName) || null;
    const distPath = SKIP_DIST ? null : distHtmlForRoute(route);
    let distHtml = distPath ? readFile(distPath) : null;
    // SPA shells (root vazio) não contêm headings — o React hidrata no
    // cliente. Validar ids nelas gera falsos positivos e bloqueia o build.
    if (distHtml && /<div id="root">\s*<\/div>/.test(distHtml)) {
      warnings.push(
        `[${page.name}] rota ${route} gerou apenas shell SPA em dist/ — validação de ids no HTML pulada.`
      );
      distHtml = null;
    }

    for (const id of page.hrefs) {
      totalHrefs++;
      // 1. id precisa existir no template
      if (!templateIds.has(id)) {
        errors.push(
          `[${page.name}] href #${id} não corresponde a nenhum id no InsurancePageTemplate.`
        );
        continue;
      }
      // 2. seção condicional exige prop
      const requiredProp = ID_REQUIREMENTS[id];
      if (requiredProp && !page.propsPassed.has(requiredProp)) {
        errors.push(
          `[${page.name}] href #${id} exige a prop "${requiredProp}" (seção condicional), que não é passada ao InsurancePageTemplate.`
        );
      }
      // 3. se pré-renderizado, id precisa estar no HTML servido
      if (distHtml) {
        checkedDist++;
        if (!distHtml.includes(`id="${id}"`)) {
          errors.push(
            `[${page.name} → ${route}] id="${id}" ausente em ${path.relative(ROOT, distPath)}.`
          );
        }
      } else if (!SKIP_DIST && route) {
        warnings.push(
          `[${page.name}] rota ${route} não está pré-renderizada em dist/ — validação limitada a análise estática.`
        );
      }
    }
  }

  const summary = {
    pages: pages.length,
    hrefs: totalHrefs,
    distChecked: checkedDist,
    errors: errors.length,
    warnings: warnings.length,
  };

  if (warnings.length) {
    console.log("\nAvisos:");
    for (const w of warnings) console.log(" -", w);
  }
  if (errors.length) {
    console.error("\nErros:");
    for (const e of errors) console.error(" -", e);
    console.error("\nResumo:", summary);
    process.exit(1);
  }
  console.log("Jump links validados com sucesso.", summary);
}

// CLI direto: mantém compat com o postbuild antigo, mas hoje o pipeline
// unificado (`validate-jumplinks-headings.mjs`) executa esta função como
// primeira camada. Guardamos para não rodar ao ser importado por testes ou
// pelo runner unificado.
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) validate();

export {
  collectTemplateIds,
  collectAriaLabelledBy,
  collectPagesWithJumpLinks,
  loadRoutesFromAppTsx,
  distHtmlForRoute,
  validate,
  ID_REQUIREMENTS,
};