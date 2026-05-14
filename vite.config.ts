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

// Plugin to make CSS non-render-blocking by converting <link rel="stylesheet"> 
// to async loading with print/onload trick (critical CSS is already inlined in index.html)
function asyncCssPlugin(): Plugin {
  return {
    name: "async-css",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // Match any Vite-injected stylesheet link (with or without crossorigin)
        return html.replace(
          /<link\s+rel="stylesheet"\s*(?:crossorigin\s*)?href="(\/assets\/[^"]+\.css)"\s*\/?>/gi,
          '<link rel="preload" href="$1" as="style" onload="this.rel=\'stylesheet\'">' +
          '<noscript><link rel="stylesheet" href="$1"></noscript>'
        );
      },
    },
  };
}

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

      // Load local SEO page slugs at build time so sitemap-bairros.xml stays
      // in sync automatically with all local SEO data files.
      const localSlugs: string[] = [];
      const dataFiles = ["src/data/seoLocalAutoPages.ts", "src/data/seoLocalSaudePages.ts"];
      
      for (const file of dataFiles) {
        try {
          const mod = await loadDataModule(file);
          if (Array.isArray(mod.seoLocalPageSlugs)) {
            localSlugs.push(...mod.seoLocalPageSlugs);
          }
        } catch (err) {
          console.warn(`⚠️  sitemap: falha ao carregar ${file} —`, err instanceof Error ? err.message : err);
        }
      }

      const { index, files } = generateSitemapBundle(slugs, localSlugs);
      const outDir = path.resolve(__dirname, "dist");
      fs.mkdirSync(outDir, { recursive: true });
      // Cluster sitemaps + legacy flat sitemap.xml
      for (const [name, xml] of Object.entries(files)) {
        fs.writeFileSync(path.join(outDir, name), xml, "utf-8");
        const count = xml.split("<url>").length - 1;
        console.log(`✅ ${name} generated with ${count} URLs`);
      }
      // Sitemap index referencing all clusters
      fs.writeFileSync(path.join(outDir, "sitemap-index.xml"), index, "utf-8");
      console.log(`✅ sitemap-index.xml generated with ${Object.keys(files).length - 1} cluster sitemaps`);

      // Mirror as sitemap_index.xml (WordPress/Yoast convention)
      fs.writeFileSync(path.join(outDir, "sitemap_index.xml"), index, "utf-8");

       // Final validation step for XML and UTF-8 encoding
       try {
         console.log("🚀 Running final sitemap validation...");
         // Try bun first, fall back to node if not available
         try {
           execSync("bun run scripts/validate-sitemaps.ts", { stdio: "inherit" });
         } catch (bunErr) {
           console.log("ℹ️ bun not found, trying with ts-node/node...");
           execSync("npx ts-node scripts/validate-sitemaps.ts", { stdio: "inherit" });
         }
       } catch (err) {
         console.error("❌ Sitemap validation failed. Build aborted.");
         process.exit(1);
       }
    },
  };
}

function spaFallbackPlugin(): Plugin {
  return {
    name: "spa-fallback-copy",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      const fallbackPath = path.join(outDir, "404.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath);
        console.log("✅ 404.html generated from index.html");
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
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router": ["react-router-dom"],
          "ui-core": [
            "@radix-ui/react-dialog", 
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "lucide-react"
          ],
          "ui-form": ["@radix-ui/react-checkbox", "@radix-ui/react-radio-group", "@radix-ui/react-select", "@radix-ui/react-switch", "react-hook-form", "zod"],
          "ui-navigation": ["@radix-ui/react-navigation-menu", "@radix-ui/react-menubar", "@radix-ui/react-tabs"],
          "ui-feedback": ["@radix-ui/react-tooltip", "@radix-ui/react-popover", "@radix-ui/react-alert-dialog", "@radix-ui/react-hover-card", "@radix-ui/react-toast"],
          "ui-content": ["@radix-ui/react-accordion", "@radix-ui/react-scroll-area", "@radix-ui/react-collapsible", "@radix-ui/react-aspect-ratio", "@radix-ui/react-avatar", "@radix-ui/react-separator"],
          "data-query": ["@tanstack/react-query", "@supabase/supabase-js"],
          "utils": ["clsx", "tailwind-merge", "date-fns", "framer-motion"]
        },
      },
    },
    cssMinify: true,
    reportCompressedSize: true,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && asyncCssPlugin(),
    mode === "production" && compression({ algorithms: ["gzip", "brotliCompress"], threshold: 1024 }),
    mode === "production" && sitemapPlugin(),
     mode === "production" && spaFallbackPlugin(),
     mode === "production" && googleIndexingPlugin(),
     validateLocalPagesPlugin(),
    validatePageMetaPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
