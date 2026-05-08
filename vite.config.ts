import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
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
          "ui-tooltip": ["@radix-ui/react-tooltip"],
          "ui-dialog": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
          "ui-accordion": ["@radix-ui/react-accordion"],
          "query": ["@tanstack/react-query"],
          "ui-select": ["@radix-ui/react-select", "@radix-ui/react-popover"],
          "ui-navigation": ["@radix-ui/react-navigation-menu", "@radix-ui/react-menubar"],
          "ui-form": ["@radix-ui/react-checkbox", "@radix-ui/react-radio-group", "@radix-ui/react-switch", "@radix-ui/react-label"],
           "ui-misc": ["@radix-ui/react-tabs", "@radix-ui/react-scroll-area", "@radix-ui/react-separator", "@radix-ui/react-progress", "@radix-ui/react-slider", "@radix-ui/react-alert-dialog", "@radix-ui/react-hover-card", "@radix-ui/react-context-menu", "@radix-ui/react-collapsible", "@radix-ui/react-toast"],
           "libs": ["@supabase/supabase-js", "lucide-react", "clsx", "tailwind-merge", "date-fns"],
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
    validateLocalPagesPlugin(),
    validatePageMetaPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
