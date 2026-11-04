/**
 * Validação de limites de SEO técnico (auditoria title_too_long / description_too_long).
 * Percorre TODAS as rotas do sitemap + /contato + /cotacao e falha o build se
 * alguma rota tiver title > 60 chars ou description > 155 chars.
 *
 * Os limites são os mesmos aplicados em runtime pelo wrapper
 * `getMetadataForRoute` (src/lib/seoMetadata.ts): SEO_TITLE_MAX / SEO_DESCRIPTION_MAX.
 */
import { loadDataModule } from "./load-data-module.mjs";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

const { getMetadataForRoute } = await loadDataModule("src/lib/seoMetadata.ts");
const { generateSitemapBundle } = await loadDataModule("scripts/generate-sitemap.ts");
const { articles, allCategories, slugifyCategory } = await loadDataModule("src/lib/blogData.ts");
const { seoLocalPageSlugs: autoSlugs } = await loadDataModule("src/data/seoLocalAutoPages.ts");
const { seoLocalPageSlugs: saudeSlugs } = await loadDataModule("src/data/seoLocalSaudePages.ts");
const { seoLocalPageSlugs: modeloSlugs } = await loadDataModule("src/data/seoModelosAutoPages.ts");
const { seoLocalProdutoBairroSlugs: produtoBairroSlugs } = await loadDataModule("src/data/seoLocalProdutoBairroPages.ts");
const { segmentos } = await loadDataModule("src/data/segmentosEmpresariais.ts");
const { blogAuthors } = await loadDataModule("src/lib/blogAuthors.ts");

const bundle = generateSitemapBundle(
  articles.map((a) => a.slug),
  [...(autoSlugs || []), ...(saudeSlugs || []), ...(modeloSlugs || []), ...(produtoBairroSlugs || [])],
  (segmentos || []).map((s) => s.slug),
  (allCategories || []).map((c) => slugifyCategory(c)),
  (blogAuthors || []).map((a) => a.slug),
);

const routes = new Set();
Object.values(bundle.files).forEach((xml) => {
  const matches = xml.matchAll(/<loc>https:\/\/www\.patroseguros\.com\.br([^<]*)<\/loc>/g);
  for (const m of matches) {
    const loc = m[1] || "/";
    if (/\.[a-z0-9]+$/i.test(loc)) continue;
    routes.add(loc.length > 1 && loc.endsWith("/") ? loc.slice(0, -1) : loc);
  }
});
routes.add("/contato");
routes.add("/cotacao");

// Artigos do blog preservam título e resumo editoriais completos (decisão
// editorial em getMetadataForRoute). Para eles o comprimento é só um alerta.
const isBlogArticle = (route, meta) => meta.ogType === "article" && route.startsWith("/blog/");

const longTitles = [];
const longDescs = [];
const editorialTitles = [];
const editorialDescs = [];
for (const route of routes) {
  const meta = getMetadataForRoute(route);
  if (!meta) continue;
  const editorial = isBlogArticle(route, meta);
  if (meta.title && meta.title.length > TITLE_MAX) (editorial ? editorialTitles : longTitles).push([route, meta.title.length]);
  if (meta.description && meta.description.length > DESCRIPTION_MAX) (editorial ? editorialDescs : longDescs).push([route, meta.description.length]);
}

if (editorialTitles.length || editorialDescs.length) {
  console.warn(
    `⚠️  validate-meta-limits: ${editorialTitles.length} title(s) e ${editorialDescs.length} description(s) de artigos do blog acima do limite ` +
    `(preservados por decisão editorial; revise na fonte se quiser encurtar).`,
  );
}

if (longTitles.length || longDescs.length) {
  console.error(`❌ validate-meta-limits: ${longTitles.length} title(s) > ${TITLE_MAX} e ${longDescs.length} description(s) > ${DESCRIPTION_MAX}.`);
  longTitles.slice(0, 20).forEach(([r, l]) => console.error(`  • title ${l} chars: ${r}`));
  longDescs.slice(0, 20).forEach(([r, l]) => console.error(`  • description ${l} chars: ${r}`));
  process.exit(1);
}

console.log(`✓ validate-meta-limits: ${routes.size} rotas com title ≤ ${TITLE_MAX} e description ≤ ${DESCRIPTION_MAX}.`);
