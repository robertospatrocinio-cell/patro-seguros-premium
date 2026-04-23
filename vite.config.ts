import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { compression } from "vite-plugin-compression2";
import { generateSitemap } from "./scripts/generate-sitemap";

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
    closeBundle() {
      // Read blog slugs from blogData source
      const blogDataPath = path.resolve(__dirname, "src/lib/blogData.ts");
      const blogSrc = fs.readFileSync(blogDataPath, "utf-8");
      const slugRegex = /slug:\s*"([^"]+)"/g;
      const slugs: string[] = [];
      let match: RegExpExecArray | null;
      while ((match = slugRegex.exec(blogSrc)) !== null) {
        slugs.push(match[1]);
      }
      const xml = generateSitemap(slugs);
      const outDir = path.resolve(__dirname, "dist");
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf-8");
      console.log(`✅ sitemap.xml generated with ${xml.split("<url>").length - 1} URLs`);
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
          "ui-misc": ["@radix-ui/react-tabs", "@radix-ui/react-scroll-area", "@radix-ui/react-separator", "@radix-ui/react-progress", "@radix-ui/react-slider"],
          "ui-overlay": ["@radix-ui/react-alert-dialog", "@radix-ui/react-hover-card", "@radix-ui/react-context-menu", "@radix-ui/react-collapsible"],
          "ui-toast": ["@radix-ui/react-toast"],
          "supabase": ["@supabase/supabase-js"],
          "lucide": ["lucide-react"],
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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
