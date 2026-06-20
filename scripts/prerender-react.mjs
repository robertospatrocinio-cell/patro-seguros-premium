/**
 * SSG real para a Fase 1 de rotas — complementa `scripts/prerender.mjs`.
 *
 * Diferença para o prerender.mjs:
 *   - prerender.mjs: string-replace de meta tags + bloco oculto `#crawler-content`
 *                     (cobre TODAS as rotas do sitemap, sem browser).
 *   - prerender-react.mjs: sobe um servidor estático, abre Chromium e captura
 *                          o HTML final pós-hidratação do React (com `<h1>`,
 *                          `<main>`, breadcrumbs, conteúdo do hub) — para o
 *                          subconjunto de ~40 rotas curado em
 *                          `prerender-routes.ts`.
 *
 * Roda APÓS o `prerender.mjs`. Sobrescreve apenas `dist/<rota>/index.html`
 * das rotas da Fase 1. Se algo falhar (Chromium ausente, timeout, etc.),
 * loga warning e sai com código 0 — o build continua e a versão do
 * prerender.mjs original permanece em dist/.
 */
import fs from "fs";
import path from "path";
import http from "http";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const INDEX_HTML = path.join(DIST, "index.html");

const SKIP = process.env.PATRO_SKIP_REACT_PRERENDER === "1";
const PORT = Number(process.env.PATRO_PRERENDER_PORT || 4178);
const PAGE_TIMEOUT_MS = 25_000;
const RENDER_AFTER_MS = 1_500;
const CONCURRENCY = Number(process.env.PATRO_PRERENDER_CONCURRENCY || 4);

if (SKIP) {
  console.log("ℹ️  prerender-react: pulado (PATRO_SKIP_REACT_PRERENDER=1).");
  process.exit(0);
}

if (!fs.existsSync(INDEX_HTML)) {
  console.warn("⚠️  prerender-react: dist/index.html não existe — pulando.");
  process.exit(0);
}

// Carrega a lista de rotas da Fase 1 (TS via tsx/bun loader não está disponível
// aqui — então duplicamos o caminho: leitura por regex do arquivo .ts).
function loadPhase1Routes() {
  const file = path.join(ROOT, "scripts", "prerender-routes.ts");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf-8");
  const match = src.match(/PRERENDER_ROUTES_PHASE_1[^[]*\[([\s\S]*?)\];/);
  if (!match) return [];
  const routes = [];
  const re = /"([^"]+)"/g;
  let m;
  while ((m = re.exec(match[1])) !== null) routes.push(m[1]);
  return [...new Set(routes)];
}

function loadPhase2ExtraRoutes() {
  const file = path.join(ROOT, "scripts", "prerender-routes.ts");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf-8");
  const match = src.match(/PRERENDER_ROUTES_PHASE_2_EXTRA[^[]*\[([\s\S]*?)\];/);
  if (!match) return [];
  const out = [];
  const re = /"([^"]+)"/g;
  let m;
  while ((m = re.exec(match[1])) !== null) out.push(m[1]);
  return out;
}

function loadBlogRoutes() {
  // Só pré-renderiza posts cujo conteúdo está disponível em algum dos
  // 8 módulos `blog*Content.ts`. Slugs apenas com metadados (sem corpo)
  // ficam como SPA — evita gravar HTML "Artigo não encontrado".
  const contentFiles = [
    "src/data/blogArticlesContent.ts",
    "src/data/blogAutoContent.ts",
    "src/data/blogAgroContent.ts",
    "src/data/blogGuarulhosContent.ts",
    "src/data/blogGuarulhosLojistasContent.ts",
    "src/data/blogPatroPrivateContent.ts",
    "src/data/blogVeterinariaContent.ts",
    "src/data/blogVistoriaContent.ts",
  ];
  const slugs = new Set();
  for (const rel of contentFiles) {
    const f = path.join(ROOT, rel);
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, "utf-8");
    const re = /^\s*"([a-z0-9-]+)":\s*\{/gm;
    let m;
    while ((m = re.exec(src)) !== null) slugs.add(m[1]);
  }
  return [...slugs].map((s) => `/blog/${s}`);
}

function loadBairroRoutes() {
  const file = path.join(ROOT, "src", "lib", "bairrosData.ts");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf-8");
  const ids = [];
  const re = /id:\s*"([a-z0-9-]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) ids.push(m[1]);
  return [...new Set(ids)].map((id) => `/seguros-guarulhos/${id}`);
}

function loadAllAppRoutes() {
  // Fase 3 — extrai TODAS as rotas estáticas registradas em src/App.tsx.
  const file = path.join(ROOT, "src", "App.tsx");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf-8");
  const out = [];
  const re = /path="([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const p = m[1];
    if (!p.startsWith("/")) continue;
    if (p.includes(":") || p.includes("*")) continue; // dinâmicas: tratadas separadamente
    out.push(p);
  }
  const EXCLUDE = new Set([
    "/cotacao",
    "/cotacao-seguro-auto",
    "/cotacao-seguro-auto-guarulhos",
    "/formulario-seguro-vida",
    "/seguro-vida/formulario",
    "/indique-um-amigo",
    "/indique-amigo",
    "/ebook-consorcio",
    "/avaliar-no-google",
    "/crm",
    "/admin/login",
    "/admin/purge-logs",
    "/admin/performance",
    "/admin/seo-tecnico",
    "/admin/conversoes",
    "/admin/pagespeed",
    "/admin/schemas",
  ]);
  return [...new Set(out)].filter((p) => !EXCLUDE.has(p) && !p.startsWith("/admin"));
}

const PHASE_1 = loadPhase1Routes();
const PHASE_2 = [
  ...loadPhase2ExtraRoutes(),
  ...loadBairroRoutes(),
  ...loadBlogRoutes(),
];
const PHASE_3_ENABLED = process.env.PATRO_PRERENDER_PHASE_3 !== "0";
const PHASE_3 = PHASE_3_ENABLED ? loadAllAppRoutes() : [];
const ROUTES = [...new Set([...PHASE_1, ...PHASE_2, ...PHASE_3])];
console.log(
  `🗺️  prerender-react: Fase 1 = ${PHASE_1.length} | Fase 2 = ${PHASE_2.length} | Fase 3 = ${PHASE_3.length} | total único = ${ROUTES.length}`
);
if (ROUTES.length === 0) {
  console.warn("⚠️  prerender-react: nenhuma rota carregada — pulando.");
  process.exit(0);
}

// 1) Servidor HTTP estático com fallback SPA.
function startStaticServer() {
  const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".xml": "application/xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
  };
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let filePath = path.join(DIST, decodeURIComponent(url.pathname));
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        // SPA fallback
        filePath = INDEX_HTML;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    } catch (err) {
      res.writeHead(500); res.end("err");
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function tryLoadPuppeteer() {
  try {
    const mod = await import("puppeteer");
    return mod.default || mod;
  } catch (err) {
    console.warn("⚠️  prerender-react: módulo `puppeteer` não disponível —", err?.message || err);
    return null;
  }
}

function findPlaywrightChromium() {
  // Sandbox Lovable expõe Playwright Chromium em /nix/store/*-playwright-chromium
  // Se existir, evita download do Chromium pelo puppeteer.
  try {
    const env = process.env.PUPPETEER_EXECUTABLE_PATH;
    if (env && fs.existsSync(env)) return env;
    const nixDir = "/nix/store";
    if (!fs.existsSync(nixDir)) return null;
    const entries = fs.readdirSync(nixDir).filter((d) => d.includes("playwright-chromium"));
    for (const d of entries) {
      const chrome = path.join(nixDir, d, "chrome-linux", "chrome");
      if (fs.existsSync(chrome)) return chrome;
    }
  } catch {}
  return null;
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(PAGE_TIMEOUT_MS);
  page.setDefaultTimeout(PAGE_TIMEOUT_MS);

  // Bloqueia analytics no contexto de build para evitar ruído em GA4/Meta Pixel.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const u = req.url();
    if (/googletagmanager|google-analytics|facebook\.net|connect\.facebook|doubleclick|sentry\.io/i.test(u)) {
      return req.abort();
    }
    req.continue();
  });

  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle0" });
  // Espera adicional para PageMeta (useEffect) finalizar a injeção de tags por rota.
  await new Promise((r) => setTimeout(r, RENDER_AFTER_MS));

  // Captura o HTML final e remove tags de analytics inline.
  let html = await page.content();
  await page.close();

  // Sanitização leve: remove `<script>` inline contendo GA/Pixel/Sentry,
  // que serão recarregados pelo SPA durante hidratação.
  html = html.replace(/<script[^>]*>[\s\S]*?(gtag\(|fbq\(|GA_MEASUREMENT_ID|sentry)[\s\S]*?<\/script>/gi, "");

  // Garante doctype no topo (puppeteer às vezes preserva, mas validamos).
  if (!/^\s*<!doctype/i.test(html)) html = `<!doctype html>\n${html}`;

  return html;
}

function writeRouteHtml(route, html) {
  if (route === "/") {
    fs.writeFileSync(INDEX_HTML, html, "utf-8");
    return INDEX_HTML;
  }
  const dir = path.join(DIST, route);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "index.html");
  fs.writeFileSync(file, html, "utf-8");
  return file;
}

async function pool(items, size, worker) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: size }, async () => {
    while (i < items.length) {
      const idx = i++;
      try {
        results.push(await worker(items[idx], idx));
      } catch (err) {
        console.warn(`⚠️  prerender-react: falha em ${items[idx]} —`, err?.message || err);
      }
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  const puppeteer = await tryLoadPuppeteer();
  if (!puppeteer) {
    console.warn("ℹ️  prerender-react: SPA-only para Fase 1. Instale `puppeteer` para ativar SSG completo.");
    return;
  }

  const executablePath = findPlaywrightChromium();
  const launchOpts = {
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  };
  if (executablePath) {
    launchOpts.executablePath = executablePath;
    console.log(`🔧 prerender-react: usando Chromium em ${executablePath}`);
  }

  let browser;
  try {
    browser = await puppeteer.launch(launchOpts);
  } catch (err) {
    console.warn("⚠️  prerender-react: falha ao iniciar Chromium —", err?.message || err);
    console.warn("ℹ️  Build continua como SPA. Phase 1 fica com prerender.mjs apenas.");
    return;
  }

  let server;
  try {
    server = await startStaticServer();
  } catch (err) {
    await browser.close().catch(() => {});
    console.warn("⚠️  prerender-react: falha ao subir servidor estático —", err?.message || err);
    return;
  }

  console.log(`🚀 prerender-react: renderizando ${ROUTES.length} rotas (Fase 1+2+3) com concorrência ${CONCURRENCY}...`);
  const t0 = Date.now();
  let ok = 0;
  await pool(ROUTES, CONCURRENCY, async (route) => {
    const html = await renderRoute(browser, route);
    writeRouteHtml(route, html);
    ok++;
    if (ok % 5 === 0 || ok === ROUTES.length) {
      console.log(`   ${ok}/${ROUTES.length} rotas renderizadas`);
    }
  });

  await browser.close().catch(() => {});
  server.close();
  console.log(`✅ prerender-react: ${ok}/${ROUTES.length} rotas em ${((Date.now() - t0) / 1000).toFixed(1)}s.`);
}

main().catch((err) => {
  console.warn("⚠️  prerender-react: erro inesperado —", err?.message || err);
  // Nunca falha o build.
  process.exit(0);
});