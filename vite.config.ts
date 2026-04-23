import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { compression } from "vite-plugin-compression2";

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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router": ["react-router-dom"],
          "ui-core": ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip"],
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
    mode === "production" && compression({ algorithm: "gzip", threshold: 1024 }),
    mode === "production" && compression({ algorithm: "brotliCompress", threshold: 1024 }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
