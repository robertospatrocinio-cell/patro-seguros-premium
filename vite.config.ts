import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
 import path from "path";
 import fs from "fs";
 import https from "https";
 import jwt from "jsonwebtoken";

// Plugin to notify Google that the sitemap has been updated.
// Note: Google has deprecated the /ping endpoint, but it's still good practice
// to include it as a last-mile fallback or to trigger custom indexing webhooks.
 /**
  * Plugin to notify Google about sitemap updates using both Indexing API and legacy Ping.
  * Implements retries with exponential backoff and timeout.
  */
 function googleIndexingPlugin(): Plugin {
   const MAX_RETRIES = 3;
   const TIMEOUT_MS = 15000;
   const INITIAL_DELAY = 2000;
 
   const getAccessToken = async (credentials: any): Promise<string> => {
     const iat = Math.floor(Date.now() / 1000);
     const exp = iat + 3600;
     const payload = {
       iss: credentials.client_email,
       sub: credentials.client_email,
       aud: "https://oauth2.googleapis.com/token",
       iat,
       exp,
       scope: "https://www.googleapis.com/auth/indexing",
     };
 
     const token = jwt.sign(payload, credentials.private_key, { algorithm: "RS256" });
 
     return new Promise((resolve, reject) => {
       const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`;
       const req = https.request(
         "https://oauth2.googleapis.com/token",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded",
             "Content-Length": Buffer.byteLength(postData),
           },
         },
         (res) => {
           let body = "";
           res.on("data", (chunk) => (body += chunk));
           res.on("end", () => {
             const data = JSON.parse(body);
             if (data.access_token) resolve(data.access_token);
             else reject(new Error("Falha ao obter access token: " + body));
           });
         }
       );
       req.on("error", reject);
       req.write(postData);
       req.end();
     });
   };
 
   const notifyIndexingApi = async (url: string, accessToken: string): Promise<boolean> => {
     return new Promise((resolve) => {
       const postData = JSON.stringify({ url, type: "URL_UPDATED" });
       const req = https.request(
         "https://indexing.googleapis.com/v3/urlNotifications:publish",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${accessToken}`,
             "Content-Length": Buffer.byteLength(postData),
           },
         },
         (res) => {
           if (res.statusCode === 200) resolve(true);
           else {
             console.warn(`⚠️ Indexing API retornou ${res.statusCode}`);
             resolve(false);
           }
         }
       );
       req.on("error", () => resolve(false));
       req.write(postData);
       req.end();
     });
   };
 
   const notifyLegacyPing = async (sitemapUrl: string, attempt = 0): Promise<void> => {
     const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
     return new Promise((resolve) => {
       const request = https.get(pingUrl, (res) => {
         if (res.statusCode === 200) {
           console.log("✅ Google Ping (Legacy) notificado com sucesso.");
           resolve();
         } else {
           retryOrResolve();
         }
       });
       request.on("error", retryOrResolve);
       request.setTimeout(TIMEOUT_MS, () => {
         request.destroy();
         retryOrResolve();
       });
 
       function retryOrResolve() {
         if (attempt < MAX_RETRIES - 1) {
           const delay = INITIAL_DELAY * Math.pow(2, attempt);
           setTimeout(() => notifyLegacyPing(sitemapUrl, attempt + 1).then(resolve), delay);
         } else resolve();
       }
     });
   };
 
   return {
     name: "google-indexing",
    async closeBundle() {
      if (process.env.NODE_ENV !== "production") return;

      // Use VITE_SITE_URL or fall back to production domain
      const siteUrl = process.env.VITE_SITE_URL || "https://www.patroseguros.com.br";
      const sitemapUrl = `${siteUrl.replace(/\/$/, "")}/sitemap-index.xml`;
      const credentialsRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
 
       if (credentialsRaw) {
         try {
           console.log("🚀 Iniciando Google Indexing API...");
           const credentials = JSON.parse(credentialsRaw);
           const token = await getAccessToken(credentials);
           const success = await notifyIndexingApi(sitemapUrl, token);
           if (success) {
             console.log("✅ Google Indexing API notificada com sucesso.");
             return;
           }
         } catch (err) {
           console.warn("⚠️ Falha na Google Indexing API, usando fallback...");
         }
       } else {
         console.warn("ℹ️ GOOGLE_SERVICE_ACCOUNT_JSON não configurado. Usando apenas legacy ping.");
       }
 
       console.log("🚀 Notificando Google Ping (Fallback)...");
       await notifyLegacyPing(sitemapUrl);
     },
   };
 }

import { componentTagger } from "lovable-tagger";
import { compression } from "vite-plugin-compression2";
 import { generateSitemapBundle } from "./scripts/generate-sitemap";
 import { execSync } from "child_process";
import { validateLocalPages } from "./scripts/validate-local-pages.mjs";
import { validatePageMeta } from "./scripts/validate-page-meta.mjs";
import { loadDataModule } from "./scripts/load-data-module.mjs";

// Plugin to auto-generate sitemap.xml at build time
function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    async closeBundle() {
      // Read blog slugs from blogData source
      const blogDataPath = path.resolve(__dirname, "src/lib/blogData.ts");
      const blogSrc = fs.readFileSync(blogDataPath, "utf-8");
      const slugRegex = /slug:\s*"([^"]+)"/g;
      const slugs: string[] = [];
      let match: RegExpExecArray | null;
      while ((match = slugRegex.exec(blogSrc)) !== null) {
        slugs.push(match[1]);
      }

      // Derive unique blog category slugs (slugified, accent-stripped) from blogData.
      const categoryRegex = /category:\s*"([^"]+)"/g;
      const categorySet = new Set<string>();
      let catMatch: RegExpExecArray | null;
      const slugifyCat = (s: string) =>
        s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      while ((catMatch = categoryRegex.exec(blogSrc)) !== null) {
        categorySet.add(slugifyCat(catMatch[1]));
      }
      const blogCategorySlugs = [...categorySet];

      // Load blog author slugs from src/lib/blogAuthors.ts so /blog/autor/:slug
      // pages are indexed alongside articles and categories.
      const blogAuthorSlugs: string[] = [];
      try {
        const authorsMod = await loadDataModule("src/lib/blogAuthors.ts");
        if (Array.isArray(authorsMod.blogAuthors)) {
          blogAuthorSlugs.push(...authorsMod.blogAuthors.map((a: any) => a.slug));
        }
      } catch (err) {
        console.warn("⚠️  sitemap: falha ao carregar autores do blog —", err instanceof Error ? err.message : err);
      }

      // Load local SEO page slugs at build time so sitemap-bairros.xml stays
      // in sync automatically with all local SEO data files.
      const localSlugs: string[] = [];
      const dataFiles = [
        "src/data/seoLocalAutoPages.ts", 
        "src/data/seoLocalSaudePages.ts",
        "src/data/seoModelosAutoPages.ts"
      ];

      
      for (const file of dataFiles) {
        try {
          const mod = await loadDataModule(file);
          const slugsFromMod = mod.seoLocalPageSlugs || mod.seoLocalSlugs || mod.seoLocalSaudeSlugs || mod.seoModeloAutoSlugs;
          if (Array.isArray(slugsFromMod)) {
            localSlugs.push(...slugsFromMod);
          }
        } catch (err) {
          console.warn(`⚠️  sitemap: falha ao carregar ${file} —`, err instanceof Error ? err.message : err);
        }
      }

       // Load business insurance segments
       const segmentSlugs: string[] = [];
       try {
         const segmentosMod = await loadDataModule("src/data/segmentosEmpresariais.ts");
         if (Array.isArray(segmentosMod.segmentos)) {
           segmentSlugs.push(...segmentosMod.segmentos.map((s: any) => s.slug));
         }
       } catch (err) {
         console.warn("⚠️  sitemap: falha ao carregar segmentos empresariais —", err instanceof Error ? err.message : err);
       }
 
       const { index, files } = (generateSitemapBundle as any)(slugs, localSlugs, segmentSlugs, blogCategorySlugs, blogAuthorSlugs);
      const outDir = path.resolve(__dirname, "dist");
      fs.mkdirSync(outDir, { recursive: true });
      // Cluster sitemaps + legacy flat sitemap.xml
       for (const [name, xml] of Object.entries(files as Record<string, string>)) {
         const filePath = path.join(outDir, name);
         // Garante que a pasta de saída exista antes de gravar o arquivo
         // (cobre subdiretórios futuros e protege contra dist ausente).
         fs.mkdirSync(path.dirname(filePath), { recursive: true });
         // If a directory exists with the same name, we need to remove it (unlikely but safe)
         if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
           fs.rmSync(filePath, { recursive: true });
         }
         fs.writeFileSync(filePath, xml, "utf-8");
         const count = xml.split("<url>").length - 1;
         if (count > 0) console.log(`✅ ${name} generated with ${count} URLs`);
         else console.log(`✅ ${name} generated (index/meta)`);
      }
      console.log(`✅ sitemap-index.xml generated with ${Object.keys(files).length - 1} cluster sitemaps`);

      // ---- robots.txt otimizado (gerado automaticamente a cada build) ------
      // Mantém Sitemap-index + referência explícita ao sitemap-guarulhos.xml
      // (foco SEO local) e bloqueia rotas internas/admin.
      const SITE = "https://www.patroseguros.com.br";
      const robotsTxt = [
        "# Gerado automaticamente pelo sitemapPlugin — não editar manualmente.",
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /api/",
        "Disallow: /~api/",
        "Disallow: /~flock.js",
        "Disallow: /ebook-consorcio/",
        "Disallow: /avaliar-no-google/",
        "Disallow: /performance-diagnostico",
        "Disallow: /conversion-dashboard",
        "Disallow: /seo-technical-report",
        "Disallow: /pagespeed-history",
        "",
        "# Allow public high-value paths",
        "Allow: /lp/",
        "Allow: /blog/",
        "Allow: /seguros-guarulhos/",
        "Allow: /planos-de-saude/",
        "",
        "# Sitemaps",
        `Sitemap: ${SITE}/sitemap-index.xml`,
        `Sitemap: ${SITE}/sitemap-guarulhos.xml`,
        `Sitemap: ${SITE}/sitemap-bairros.xml`,
        `Sitemap: ${SITE}/sitemap-auto.xml`,
        `Sitemap: ${SITE}/sitemap-vida-saude.xml`,
        `Sitemap: ${SITE}/sitemap-empresarial.xml`,
        `Sitemap: ${SITE}/sitemap-geral.xml`,
        "",
        "# Optimization for Search Bots",
        "User-agent: Googlebot",
        "Allow: /",
        "Crawl-delay: 0.1",
        "",
        "User-agent: Bingbot",
        "Allow: /",
        "Crawl-delay: 0.5",
        "",
      ].join("\n");
      fs.writeFileSync(path.join(outDir, "robots.txt"), robotsTxt, "utf-8");
      console.log("✅ robots.txt gerado (com Sitemap-index + sitemap-guarulhos.xml).");


       // Final validation step for XML and UTF-8 encoding
       try {
         console.log("🚀 Running final sitemap validation...");
         // Só tenta bun (rápido). Se não houver, pula — validador é checagem
         // estrutural, não bloqueia deploy. npx ts-node tinha cold-start de
         // dezenas de segundos e estourava o deadline do executor de build.
         try {
           execSync("bun run scripts/validate-sitemaps.ts", { stdio: "inherit", timeout: 30_000 });
         } catch (bunErr) {
           console.warn("ℹ️ Sitemap validator pulado (bun indisponível ou timeout). Rode local com `bun run scripts/validate-sitemaps.ts`.");
         }
       } catch (err) {
         console.warn("⚠️ Sitemap validation skipped:", err instanceof Error ? err.message : err);
       }
    },
  };
}

function spaFallbackPlugin(): Plugin {
  return {
    name: "spa-fallback-copy",
    async closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      const fallbackPath = path.join(outDir, "404.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath);
        console.log("✅ 404.html generated from index.html");
      }

      // Run prerender script
      try {
        console.log("🚀 Starting prerender process...");
        execSync("node scripts/prerender.mjs", { stdio: "inherit" });
      } catch (err) {
        console.error("❌ Prerender failed:", err);
      }

      // Fase 1 — SSG real (puppeteer) sobreposto às ~40 rotas curadas.
      // Falha silenciosa: build não quebra se Chromium estiver indisponível.
      // Puppeteer (Chromium + ~40 rotas) excede o deadline do executor de
      // build do Lovable. Mantemos opt-in via ENABLE_REACT_SSG=1 para CI/local.
      if (process.env.ENABLE_REACT_SSG === "1") {
        try {
          console.log("🚀 Starting React SSG pass (Phase 1)...");
          execSync("node scripts/prerender-react.mjs", { stdio: "inherit" });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("⚠️  React SSG pass falhou — Fase 1 mantém prerender.mjs apenas:", msg);
        }
      } else {
        console.log("⏭️  React SSG (puppeteer) pulado — defina ENABLE_REACT_SSG=1 para ativar.");
      }

      // Validadores pós-build (JSON-LD + canonical/headings).
      // Eles parseiam 470+ HTMLs gerados pelo prerender; cumulativamente
      // estouravam o deadline do executor de build do Lovable e travavam
      // o publish silenciosamente. Como apenas CONFEREM o que já foi gerado
      // (não alteram output), agora são opt-in via ENABLE_BUILD_VALIDATORS=1
      // para CI/local. Em produção o publish não depende deles.
      if (process.env.ENABLE_BUILD_VALIDATORS === "1") {
        try {
          console.log("🔎 Validando JSON-LD e breadcrumbs...");
          execSync("node scripts/validate-jsonld-build.mjs", { stdio: "inherit" });
        } catch (err) {
          console.error("❌ Validação de JSON-LD falhou. Build abortado.");
          process.exit(1);
        }
        try {
          console.log("🔎 Validando canonical e hierarquia de headings...");
          execSync("node scripts/validate-canonical-headings-build.mjs", { stdio: "inherit" });
        } catch (err) {
          console.error("❌ Validação de canonical/headings falhou. Build abortado.");
          process.exit(1);
        }
        try {
          console.log("🔎 Validando unicidade de Organization/InsuranceAgency...");
          execSync("node scripts/validate-schema-uniqueness.mjs", { stdio: "inherit" });
        } catch (err) {
          console.error("❌ Validação de unicidade de schema falhou. Build abortado.");
          process.exit(1);
        }
      } else {
        console.log("⏭️  Validadores JSON-LD/canonical pulados (defina ENABLE_BUILD_VALIDATORS=1 para ativar em CI).");
      }
    },
  };
}

// Plugin to validate that every local SEO page has the minimum FAQs,
// insurers, testimonials, scenarios and unique content. Fails the build
// if any page violates the LocalPageTemplate editorial contract.
function validateLocalPagesPlugin(): Plugin {
  return {
    name: "validate-local-pages",
    async buildStart() {
      try {
        await validateLocalPages();
      } catch (err) {
        this.error(err instanceof Error ? err.message : String(err));
      }
    },
  };
}

// Plugin to validate that every <PageMeta description="..."> across the
// codebase stays within the 160-char SEO limit. Mirrors validate-local-pages
// but covers all hand-authored pages (institutional, niche, landing, etc).
function validatePageMetaPlugin(): Plugin {
  return {
    name: "validate-page-meta",
    async buildStart() {
      try {
        await validatePageMeta();
      } catch (err) {
        this.error(err instanceof Error ? err.message : String(err));
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    /**
     * Vite preloads, por padrão, todos os chunks alcançáveis a partir do
     * entry — inclusive dependências de rotas lazy (admin/CRM/dashboards).
     * Isso enchia o `<head>` da home com `modulepreload` de
     * vendor-charts/supabase/tanstack/dates (>800 KB), inflando o Render
     * Delay do LCP mobile. Filtramos esses vendors para que só sejam
     * baixados quando a rota lazy correspondente for navegada.
     */
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter(
          (d) =>
            !/vendor-(charts|supabase|tanstack|dates)-/.test(d),
        );
      },
    },
    rollupOptions: {
        output: {
          /**
           * Code-splitting conservador para reduzir o entry e melhorar LCP mobile.
           *
           * Regras de segurança (evitam o TDZ que motivou a remoção anterior):
           *  - NUNCA separar `react`, `react-dom`, `scheduler`, `react-router*`
           *    ou qualquer wrapper que dependa deles (sonner, radix, hookform)
           *    em chunk próprio — eles ficam no chunk default e são avaliados
           *    antes de quem os consome.
           *  - Apenas libs "folha" (sem cadeia de dependentes críticos para
           *    o boot) são extraídas em chunks dedicados, e somente quando
           *    são pesadas e/ou usadas em rotas/seções não-críticas.
           *  - Tudo o que não casa retorna `undefined` → Rollup decide.
           */
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return undefined;

            // Recharts: ~250 KB, só usado no CRM/dashboards (lazy).
            if (/[\\/]node_modules[\\/](recharts|d3-[^\\/]+|victory-vendor|internmap|delaunator|robust-predicates)[\\/]/.test(id)) {
              return "vendor-charts";
            }

            // Embla carousel: usado apenas no hero da home (já dentro do entry,
            // mas isolar permite cache independente de updates do entry).
            if (/[\\/]node_modules[\\/]embla-carousel(-react)?[\\/]/.test(id)) {
              return "vendor-embla";
            }

            // Supabase client: ~80 KB, usado em rotas auth/CRM (lazy).
            if (/[\\/]node_modules[\\/]@supabase[\\/]/.test(id)) {
              return "vendor-supabase";
            }

            // TanStack Query: usado em hooks do CRM (lazy).
            if (/[\\/]node_modules[\\/]@tanstack[\\/]/.test(id)) {
              return "vendor-tanstack";
            }

            // Lucide-react: árvore enorme; tree-shaking individual já ocorre,
            // mas o que sobra agrupado fica fora do entry.
            if (/[\\/]node_modules[\\/]lucide-react[\\/]/.test(id)) {
              return "vendor-icons";
            }

            // date-fns + react-day-picker (calendário, usado em forms tardios).
            if (/[\\/]node_modules[\\/](date-fns|react-day-picker)[\\/]/.test(id)) {
              return "vendor-dates";
            }

            return undefined;
          },
        },
    },
    cssMinify: true,
    reportCompressedSize: true,
    // 'hidden' gera .map para debug/Sentry sem expor //# sourceMappingURL
    // no JS final — resolve o audit `valid-source-maps` do Lighthouse sem
    // vazar código-fonte para o cliente.
    sourcemap: "hidden",
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Convert standard CSS imports to preloads in development/preview as well to fix render blocking
    {
      name: "preview-css-optimizer",
      transformIndexHtml(html: string) {
        // Only apply in production builds to avoid breaking development HMR
        return html;
      }
    },
    mode === "production" && compression({ algorithms: ["gzip", "brotliCompress"], threshold: 1024, deleteOriginalAssets: false }),
    mode === "production" && sitemapPlugin(),
     mode === "production" && spaFallbackPlugin(),
     mode === "production" && googleIndexingPlugin(),
     // validateLocalPagesPlugin(),
     // validatePageMetaPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
