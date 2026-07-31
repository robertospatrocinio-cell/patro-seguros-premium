#!/usr/bin/env node
/**
 * Emite stubs estáticos de redirect/tombstone em dist/.
 *
 * POR QUE: o host estático serve o SPA fallback para qualquer caminho
 * desconhecido, devolvendo o HTML da homepage com status 200 (soft 404) e
 * canonical para a raiz. Materializar um arquivo por URL legada garante que
 * o crawler receba um documento próprio, `noindex`, com canonical apontando
 * para o destino real e redirect imediato — nunca a homepage.
 *
 * O 301 server-side continua definido em public/.htaccess (gerado da mesma
 * fonte) e tem precedência onde o servidor o processa.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const ORIGIN = "https://www.patroseguros.com.br";
const SRC = path.resolve("src/lib/redirects.ts");

if (!fs.existsSync(DIST)) {
  console.warn("⚠️  emit-redirect-stubs: dist/ não existe — pulando.");
  process.exit(0);
}

const ts = fs.readFileSync(SRC, "utf-8");
const exactBlock = ts.split("export const EXACT_REDIRECTS")[1]?.split("export const PATTERN_REDIRECTS")[0] ?? "";
const exact = [...exactBlock.matchAll(/from:\s*"([^"]+)"[\s\S]*?to:\s*"([^"]+)"/g)].map((m) => ({
  from: m[1],
  to: m[2],
}));

/** Slugs do blog — espelhados como stubs em /artigos/{slug}. */
function blogSlugs() {
  const dir = path.join(DIST, "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !["categoria", "autor", "cluster"].includes(d.name))
    .map((d) => d.name);
}

const redirectHtml = (from, to) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Redirecionando para ${to}</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${ORIGIN}${to}" />
    <meta http-equiv="refresh" content="0; url=${to}" />
    <script>window.location.replace(${JSON.stringify(to)});</script>
  </head>
  <body>
    <p>Esta página mudou de endereço. Continue em <a href="${to}">${ORIGIN}${to}</a>.</p>
  </body>
</html>
`;

const goneHtml = (from) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Conteúdo removido (410) | Patro Seguros</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="Este conteúdo foi removido definitivamente e não possui substituto direto." />
  </head>
  <body>
    <h1>Conteúdo removido</h1>
    <p>O endereço <code>${from}</code> foi descontinuado e não possui substituto direto.</p>
    <p><a href="/blog">Ver o blog</a> · <a href="/">Página inicial</a></p>
  </body>
</html>
`;

function write(routePath, html) {
  const dir = path.join(DIST, routePath.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
}

let count = 0;
for (const r of exact) {
  write(r.from, redirectHtml(r.from, r.to));
  count++;
}
const slugs = blogSlugs();
for (const s of slugs) {
  write(`/artigos/${s}`, redirectHtml(`/artigos/${s}`, `/blog/${s}`));
  count++;
}

// Tombstones para as estruturas legadas de WordPress mais rastreadas.
const GONE_PATHS = [
  "/tag/seguros",
  "/tag/seguros/feed",
  "/tag/seguroauto",
  "/tag/seguroapartamento",
  "/tag/segurodevida",
  "/tag/segurodecarro",
  "/feed",
  "/comments/feed",
];
for (const g of GONE_PATHS) {
  write(g, goneHtml(g));
  count++;
}

console.log(
  `✅ emit-redirect-stubs: ${exact.length} stubs 301 exatos, ${slugs.length} stubs /artigos, ${GONE_PATHS.length} tombstones (${count} arquivos)`,
);
