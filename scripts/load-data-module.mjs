// Shared esbuild loader for build-time scripts (sitemap, validators).
// Bundles a TS module from `src/data/...` (which only imports types from
// outside `data/`) into a temp ESM file and dynamically imports it so
// Node-side build scripts can read its runtime exports.

import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const EMPTY_LOADERS = {
  ".css": "empty",
  ".webp": "empty",
  ".png": "empty",
  ".jpg": "empty",
  ".jpeg": "empty",
  ".svg": "empty",
  ".gif": "empty",
  ".avif": "empty",
};

/**
 * Loader compartilhado para scripts de build (sitemap, validadores).
 * Faz o bundle de um módulo TypeScript de `src/data/` para ESM e o importa dinamicamente.
 * Permite ler dados de configuração do frontend no ambiente Node/Bun do build.
 */
 export async function loadDataModule(relPath) {
  const cacheDir = path.join(ROOT, "node_modules/.cache/load-data-module");
  fs.mkdirSync(cacheDir, { recursive: true });
  const outfile = path.join(cacheDir, path.basename(relPath, ".ts") + ".mjs");
  await esbuild.build({
    entryPoints: [path.resolve(ROOT, relPath)],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node18",
    outfile,
    logLevel: "silent",
    loader: EMPTY_LOADERS,
    alias: { "@": path.resolve(ROOT, "src") },
    external: ["react", "react-dom", "react/jsx-runtime"],
  });
  return import(pathToFileURL(outfile).href + "?t=" + Date.now());
}