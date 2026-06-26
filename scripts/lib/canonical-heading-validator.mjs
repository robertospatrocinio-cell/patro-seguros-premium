/**
 * Pure validators for canonical URL + heading hierarchy on a prerendered HTML
 * page. No filesystem / no process.exit so it can be unit-tested and reused
 * by the build-time CLI.
 *
 * Heading rule: exactly one <h1>; subsequent headings must not skip levels
 * (a section may go h1 → h2 → h3, never h1 → h3).
 * Canonical rule: exactly one absolute <link rel="canonical">; pathname must
 * equal the route the page was rendered for.
 */

const CANONICAL_RE = /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi;
const HREF_RE = /href=["']([^"']+)["']/i;
const HEADING_RE = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;

export function extractCanonicals(html) {
  const out = [];
  const re = new RegExp(CANONICAL_RE.source, "gi");
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[0].match(HREF_RE)?.[1] ?? null;
    out.push(href);
  }
  return out;
}

export function extractHeadings(html) {
  const out = [];
  const re = new RegExp(HEADING_RE.source, "gi");
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    out.push({ level: Number(m[1]), text });
  }
  return out;
}

export function validateCanonical(html, route, { expectedHost } = {}) {
  const errors = [];
  const canonicals = extractCanonicals(html);
  if (canonicals.length === 0) {
    errors.push("canonical ausente");
    return errors;
  }
  if (canonicals.length > 1) {
    errors.push(`canonical duplicado (${canonicals.length} encontrados)`);
  }
  const href = canonicals[0];
  if (!href) { errors.push("canonical sem atributo href"); return errors; }
  let url;
  try { url = new URL(href); }
  catch { errors.push(`canonical não é URL absoluta: ${href}`); return errors; }
  if (expectedHost && url.host !== expectedHost) {
    errors.push(`canonical host esperado ${expectedHost}, recebido ${url.host}`);
  }
  const norm = (p) => (p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p);
  if (norm(url.pathname) !== norm(route)) {
    errors.push(`canonical aponta para ${url.pathname}, esperado ${route}`);
  }
  return errors;
}

export function validateHeadings(html) {
  const errors = [];
  const headings = extractHeadings(html);
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) errors.push("nenhum <h1> encontrado");
  else if (h1s.length > 1) errors.push(`múltiplos <h1> (${h1s.length})`);
  if (h1s[0] && !h1s[0].text) errors.push("<h1> vazio");

  // hierarchia: nível atual não pode pular > 1 sobre o maior visto até agora
  let maxSeen = 0;
  headings.forEach((h, i) => {
    if (h.level > maxSeen + 1) {
      errors.push(`heading[${i}] pula de h${maxSeen} para h${h.level} ("${h.text.slice(0, 40)}")`);
    }
    if (h.level > maxSeen) maxSeen = h.level;
  });
  return errors;
}

export function validatePage(html, route, opts = {}) {
  return {
    canonical: validateCanonical(html, route, opts),
    headings: validateHeadings(html),
  };
}