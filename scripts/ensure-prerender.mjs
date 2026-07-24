#!/usr/bin/env node
/**
 * Garante que os HTMLs estáticos necessários para validação SEO existam antes
 * do postbuild. O plugin do Vite também roda o prerender, mas este guard evita
 * falso negativo quando o postbuild é executado sobre um dist incompleto.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const REQUIRED_ROUTES = [
  "/",
  "/sobre",
  "/servicos",
  "/contato",
  "/faq",
  "/verificar-susep",
  "/como-comparar-seguradoras-guarulhos",
];

const REQUIRED_HOME_TYPES = ["Organization", "WebSite", "SiteNavigationElement"];

function routeToFile(route) {
  return route === "/"
    ? path.join(DIST, "index.html")
    : path.join(DIST, route.replace(/^\/+/, ""), "index.html");
}

function collectTypes(node, acc = new Set()) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    node.forEach((item) => collectTypes(item, acc));
    return acc;
  }
  if (Array.isArray(node["@graph"])) node["@graph"].forEach((item) => collectTypes(item, acc));
  const type = node["@type"];
  if (type) (Array.isArray(type) ? type : [type]).forEach((item) => acc.add(item));
  return acc;
}

function getJsonLdTypes(file) {
  if (!fs.existsSync(file)) return new Set();
  const html = fs.readFileSync(file, "utf-8");
  const types = new Set();
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      collectTypes(JSON.parse(match[1]), types);
    } catch {
      // O validador principal reporta JSON-LD inválido com localização exata.
    }
  }
  return types;
}

function missingArtifacts() {
  const missing = [];
  for (const route of REQUIRED_ROUTES) {
    if (!fs.existsSync(routeToFile(route))) missing.push(`${route}: HTML ausente`);
  }

  const homeTypes = getJsonLdTypes(routeToFile("/"));
  for (const type of REQUIRED_HOME_TYPES) {
    if (!homeTypes.has(type)) missing.push(`/: schema ${type} ausente`);
  }

  return missing;
}

let missing = missingArtifacts();

if (missing.length > 0) {
  console.warn("⚠️  Prerender incompleto antes da validação:");
  missing.forEach((item) => console.warn(`   • ${item}`));
  console.warn("🚀 Rodando prerender.mjs novamente antes dos validadores...");
  execSync("node scripts/prerender.mjs", { cwd: ROOT, stdio: "inherit" });
  missing = missingArtifacts();
}

if (missing.length > 0) {
  console.error("❌ Prerender ainda incompleto após nova tentativa:");
  missing.forEach((item) => console.error(`   • ${item}`));
  process.exit(1);
}

console.log("✅ Prerender confirmado para rotas críticas e schemas da home.");