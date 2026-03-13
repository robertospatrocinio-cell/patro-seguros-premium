import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && asyncCssPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
