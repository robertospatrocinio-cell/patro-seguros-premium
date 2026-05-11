import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import https from "https";

// Plugin to notify Google that the sitemap has been updated.
// Note: Google has deprecated the /ping endpoint, but it's still good practice
// to include it as a last-mile fallback or to trigger custom indexing webhooks.
 /**
  * Plugin to notify Google that the sitemap has been updated.
  * Implements retries with exponential backoff and timeout to avoid intermittent failures.
  */
 function googlePingPlugin(): Plugin {
   const MAX_RETRIES = 5;
   const TIMEOUT_MS = 10000; // 10s
   const INITIAL_DELAY = 1000; // 1s
 
   const notifyGoogle = async (attempt = 0): Promise<void> => {
     const sitemapUrl = "https://www.patroseguros.com.br/sitemap-index.xml";
     const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
 
     return new Promise((resolve) => {
       const request = https.get(pingUrl, (res) => {
         if (res.statusCode === 200) {
           console.log("✅ Google notificado com sucesso.");
           resolve();
         } else {
           console.warn(`⚠️ Google retornou status ${res.statusCode} (Tentativa ${attempt + 1}/${MAX_RETRIES}).`);
           retryOrResolve();
         }
       });
 
       request.on("error", (err) => {
         console.warn(`❌ Erro ao notificar Google: ${err.message} (Tentativa ${attempt + 1}/${MAX_RETRIES}).`);
         retryOrResolve();
       });
 
       request.setTimeout(TIMEOUT_MS, () => {
         request.destroy();
         console.warn(`⏱️ Timeout ao notificar Google (Tentativa ${attempt + 1}/${MAX_RETRIES}).`);
         retryOrResolve();
       });
 
       function retryOrResolve() {
         if (attempt < MAX_RETRIES - 1) {
           const delay = INITIAL_DELAY * Math.pow(2, attempt);
           console.log(`🔄 Retentando em ${delay}ms...`);
           setTimeout(() => notifyGoogle(attempt + 1).then(resolve), delay);
         } else {
           console.error("❌ Falha ao notificar Google após o número máximo de tentativas.");
           resolve();
         }
       }
     });
   };
 
   return {
     name: "google-ping",
     async closeBundle() {
       if (process.env.NODE_ENV !== "production") return;
       console.log(`🚀 Notificando Google sobre atualização do sitemap...`);
       await notifyGoogle();
     },
   };
 }

import { componentTagger } from "lovable-tagger";
import { compression } from "vite-plugin-compression2";
import { generateSitemapBundle } from "./scripts/generate-sitemap";
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
    mode === "production" && googlePingPlugin(),
    validateLocalPagesPlugin(),
    validatePageMetaPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
