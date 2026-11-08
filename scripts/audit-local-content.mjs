#!/usr/bin/env node
/** Inventário offline: não acessa Google nem altera URLs, sitemaps ou indexação. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadDataModule } from "./load-data-module.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const origin = "https://www.patroseguros.com.br";
const sources = [
  "src/lib/bairrosData.ts", "src/data/seoLocalAutoPages.ts",
  "src/data/seoLocalBairrosGuarulhos.ts", "src/data/seoLocalProdutoBairroPages.ts",
  "src/data/seoLocalSaudePages.ts", "src/data/cidadesRegiao.ts",
  "src/data/segurosSaoPauloRegional.ts", "src/data/segurosSaoPauloProdutos.ts",
  "src/data/seoLocalGuarulhosHub.ts", "src/data/seoModelosAutoPages.ts",
];
const rows = new Map();
const failures = [];
const add = (pathname, data = {}) => {
  if (!pathname || /[?:*]/.test(pathname)) return;
  const key = "/" + pathname.replace(/^\/+|\/+$/g, "");
  const previous = rows.get(key) ?? { path: key, sources: [], sitemaps: [], configs: [] };
  rows.set(key, { ...previous, ...data });
};
for (const source of sources) {
  try {
    const mod = await loadDataModule(source);
    const seen = new WeakSet();
    const visit = (value) => {
      if (!value || typeof value !== "object" || seen.has(value)) return;
      seen.add(value);
      const rawSlug = typeof value.slug === "string" ? value.slug : typeof value.path === "string" ? value.path : null;
      // Os registros de cidades guardam apenas o município, não o caminho da rota.
      const slug = rawSlug && source === "src/data/cidadesRegiao.ts"
        ? `/corretora-de-seguros/${rawSlug}` : rawSlug;
      if (slug) {
        add(slug);
        const entry = rows.get("/" + slug.replace(/^\/+|\/+$/g, ""));
        if (entry) {
          entry.sources = [...new Set([...entry.sources, source])];
          entry.configs.push({ title: value.title ?? value.nome ?? null,
            locality: value.neighborhood ?? value.city ?? value.bairro ?? value.nome ?? null,
            text: JSON.stringify(value),
            links: value.relatedInsurances ?? value.outrosSeguros ?? [], faqs: value.faqs?.length ?? 0 });
        }
      }
      for (const child of Object.values(value)) visit(child);
    };
    visit(mod);
    if (source === "src/lib/bairrosData.ts") {
      for (const bairro of mod.bairros) {
        add(`/seguros-guarulhos/${bairro.id}`, { sources: [source], configs: [{
          title: bairro.nome, locality: bairro.nome, text: JSON.stringify(bairro),
          faqs: bairro.faqs.length, links: [],
        }] });
      }
    }
  } catch (error) { failures.push({ source, error: error.message }); }
}
for (const name of fs.readdirSync(path.join(root, "public")).filter(n => /^sitemap.*\.xml$/.test(n))) {
  const xml = fs.readFileSync(path.join(root, "public", name), "utf8");
  for (const match of xml.matchAll(/<loc>\s*(https:\/\/[^<]+)\s*<\/loc>/g)) {
    const url = new URL(match[1]);
    if (url.origin !== origin || !/guarulhos|sao-paulo|\/seguros-guarulhos\/|cumbica|pimentas|maia|augusta|galvao|bonsucesso|taboao|picanco|gopouva|macedo|paraventi|continental/.test(url.pathname)) continue;
    add(url.pathname);
    rows.get(url.pathname)?.sitemaps.push(name);
  }
}
const router = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const literalRoutes = new Set([...router.matchAll(/<Route\s+path="([^"]+)"/g)].map(m => m[1]));
// Inclui páginas locais explícitas, mesmo quando ainda não constam nos sitemaps.
for (const route of literalRoutes) {
  if (/guarulhos|sao-paulo|cumbica|pimentas|maia|augusta|galvao|bonsucesso|taboao|picanco|gopouva|macedo|paraventi|continental/.test(route)) {
    add(route);
  }
}
const pendingGroups = [
  ["/seguro-auto-pimentas", "/seguro-auto-pimentas-guarulhos"],
  ["/seguro-auto-vila-augusta", "/seguro-auto-vila-augusta-guarulhos"],
  ["/seguro-auto-bonsucesso-guarulhos", "/seguro-auto-bonsucesso-guarulhos-v2"],
  ["/seguro-auto-jardim-maia", "/seguro-auto-cidade-maia", "/seguro-auto-maia-guarulhos"],
];
const inventory = [...rows.values()].sort((a, b) => a.path.localeCompare(b.path)).map(row => {
  const text = row.configs.map(c => c.text).join("\n");
  const group = pendingGroups.find(g => g.includes(row.path));
  const flags = [];
  if (/R\$|\d+\s*%/.test(text)) flags.push("Valores ou percentuais: validar origem, data e perfil");
  if (/ilimitad|garantimos|garantindo|melhor preço|obrigatório/i.test(text)) flags.push("Revisar promessa ou condição contratual");
  if (!row.configs.length) flags.push("Conteúdo não expandido: revisão do componente necessária");
  if (group) flags.push("Sobreposição de intenção: decisão depende de tráfego e backlinks");
  return { ...row, configs: row.configs.map(({ text: omitted, ...config }) => config),
    literalRoute: literalRoutes.has(row.path),
    routeCaution: "Ausência de rota literal não prova 404; verificar rotas dinâmicas e precedência",
    priority: /pimentas/.test(row.path) ? "P0" : /auto|empresarial|guarulhos\//.test(row.path) ? "P1" : "P2",
    classification: group ? "Consolidar — proposta, não executar" : "Melhorar",
    intent: /auto/.test(row.path) ? "Cotação de seguro auto" : /seguros-guarulhos\//.test(row.path) ? "Orientação e cotação multimodal" : "Validar intenção comercial no componente",
    flags, consolidationCandidates: group ?? [], traffic: null, backlinks: null,
    localityVerified: false, originalityVerified: false, changesToIndexing: "Nenhuma" };
});
const out = path.join(root, "audit-output/parte-2");
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "local-inventory.json"), JSON.stringify({ scope: "offline-preliminary", failures,
  limitations: ["Não mede tráfego, backlinks, posição ou status HTTP", "Sitemap não prova publicação", "Não detecta duplicação semântica", "Campos geográficos exigem validação humana"], inventory }, null, 2));
fs.writeFileSync(path.join(out, "local-inventory.csv"), ["URL;Prioridade;Classificação;Pendências", ...inventory.map(r =>
  [origin + r.path, r.priority, r.classification, r.flags.join(" | ")].map(v => `"${v.replaceAll('"', '""')}"`).join(";"))].join("\n"));
console.log(`Inventário: ${inventory.length} candidatos; fontes não carregadas: ${failures.length}.`);
if (failures.length) process.exitCode = 1;
