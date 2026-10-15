import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Execute na raiz: node scripts/validate-agro-cluster.mjs [--dist]
// Sem --dist: contratos de conteúdo e registro de rotas, não uma auditoria de SEO completa.
const pages = [
  ['seguro-maquinas-agricolas', 'SeguroMaquinasAgricolas'],
  ['seguro-equipamentos-agricolas', 'SeguroEquipamentosAgricolas'],
  ['seguro-drone-agricola', 'SeguroDroneAgricola'],
  ['seguro-trator-agricola', 'SeguroTratorAgricola'],
  ['seguro-colheitadeira-graos', 'SeguroColheitadeiraGraos'],
  ['seguro-colhedora-cana', 'SeguroColhedoraCana'],
  ['seguro-colhedora-algodao', 'SeguroColhedoraAlgodao'],
  ['seguro-pulverizador-agricola', 'SeguroPulverizadorAgricola'],
];
const read = (path) => readFileSync(resolve(path), 'utf8');
const router = read('src/App.tsx');
const template = read('src/components/InsurancePageTemplate.tsx');
let failures = 0;
const check = (ok, message) => {
  console.log(`${ok ? 'OK' : 'FALHA'}: ${message}`);
  if (!ok) failures += 1;
};
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
const built = process.argv.includes('--dist');

for (const [slug, component] of pages) {
  const source = read(`src/pages/${component}.tsx`);
  check(router.includes(`/${slug}`) && router.includes(component), `${slug}: registro no roteador`);
  check(/localSeo=\{\{\s*skip:\s*true\s*\}\}/.test(source), `${slug}: escopo nacional explícito`);
  check(source.includes('link: "/seguro-penhor-rural"'), `${slug}: link para penhor rural`);
  check(source.includes('coverageExclusions={'), `${slug}: limitações explicadas`);
  const title = source.match(/\btitle="([^"]+)"/)?.[1];
  const headline = source.match(/\bheadline="([^"]+)"/)?.[1];
  const description = source.match(/\bmetaDescription="([^"]+)"/)?.[1];
  check(Boolean(title && headline && title !== headline && description), `${slug}: título, H1 e descrição próprios`);
  check(!/Guarulhos/i.test(`${title} ${headline} ${description}`), `${slug}: sem direcionamento local indevido nos metadados`);
  check(/concessionárias/.test(source) && /nacional|todo o Brasil/.test(source), `${slug}: especialização e alcance declarados`);
  if (!built) continue;

  const candidates = [`dist/${slug}/index.html`, `dist/${slug}.html`];
  const path = candidates.find(existsSync);
  check(Boolean(path), `${slug}: HTML pré-renderizado`);
  if (!path) continue;
  const html = read(path);
  check((html.match(/<h1\b/gi) ?? []).length === 1, `${slug}: um H1 no HTML`);
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonicals = links.filter((tag) => attr(tag, 'rel')?.toLowerCase() === 'canonical');
  check(canonicals.length === 1, `${slug}: um canonical`);
  let canonicalMatches = false;
  try {
    const url = new URL(attr(canonicals[0] ?? '', 'href') ?? '');
    canonicalMatches = url.protocol === 'https:' && url.pathname.replace(/\/$/, '') === `/${slug}`;
  } catch { /* Um canonical inválido é uma falha, não uma URL a adivinhar. */ }
  check(canonicalMatches, `${slug}: canonical HTTPS da própria rota`);
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  const robots = metas.filter((tag) => /^(robots|googlebot)$/i.test(attr(tag, 'name') ?? ''));
  check(!robots.some((tag) => /\b(noindex|none)\b/i.test(attr(tag, 'content') ?? '')), `${slug}: sem noindex no HTML`);
  check(links.length > 0 && /href=["'](?:https:\/\/[^/]+)?\/seguro-penhor-rural(?:["'#/?])/.test(html), `${slug}: link de penhor renderizado`);
  const schemas = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  check(schemas.length > 0, `${slug}: dados estruturados presentes`);
  check(schemas.every((match) => { try { JSON.parse(match[1]); return true; } catch { return false; } }), `${slug}: JSON-LD legível`);
}

check(template.includes('semGuarulhos = localSeo?.skip ?? false'), 'Template nacional não acrescenta blocos locais por padrão');
check(template.includes('return "agro"'), 'Template permite direcionar cotação agrícola');
const articles = read('src/data/blogAgroContent.ts');
check(articles.includes('[seguro penhor rural](/seguro-penhor-rural)'), 'Artigos apontam para penhor rural');
check(articles.includes('[seguro RETA para drone](/seguro-reta-drone)'), 'Artigo de drone diferencia RETA');

const penhorSlug = 'seguro-penhor-rural-maquinas-financiadas';
for (const component of ['SeguroTratorAgricola', 'SeguroColheitadeiraGraos', 'SeguroColhedoraCana', 'SeguroColhedoraAlgodao']) {
  const source = read(`src/pages/${component}.tsx`);
  const coverages = source.match(/coverages=\{\[([\s\S]*?)\]\}/)?.[1] ?? '';
  check(coverages.includes('Quebra de vidros da cabine'), `${component}: cobertura de vidros visível`);
  check(/title: "Transporte/.test(coverages), `${component}: transporte listado nas coberturas`);
  check(coverages.includes('carga e descarga'), `${component}: condições do transporte explicadas`);
  check(source.includes(`/blog/${penhorSlug}`), `${component}: link para o guia de máquinas financiadas`);
}
const penhorArticle = articles.split(`"${penhorSlug}": {`)[1]?.split('\n  "psr-passo-a-passo-produtor-rural-subvencao"')[0] ?? '';
check(penhorArticle.includes('## O que é seguro penhor rural?'), 'Guia de penhor: conteúdo cadastrado');
check((penhorArticle.match(/\{ q:/g) ?? []).length >= 10, 'Guia de penhor: principais dúvidas respondidas');
check(read('src/data/blogAgroData.ts').includes(`slug: "${penhorSlug}"`), 'Guia de penhor: listado no blog');
check(read('public/sitemap-blog.xml').includes(`/blog/${penhorSlug}</loc>`), 'Guia de penhor: URL no sitemap');
check(read('src/pages/SeguroPenhorRural.tsx').includes('id="solicitar-cotacao"'), 'Guia de penhor: destino da cotação existe');
console.log(`\n${failures} falha(s). ${built ? 'HTML local conferido.' : 'HTML publicado não foi conferido; use --dist após a pré-renderização.'}`);
console.log('Este teste não mede ranking, desempenho, indexação ou elegibilidade a resultados enriquecidos.');
process.exitCode = failures ? 1 : 0;
