#!/usr/bin/env node
/** Inventário editorial, sem alterar páginas nem decisões de indexação.
 * Executar: node scripts/audit-commercial-content.mjs
 * Candidatos exigem leitura humana: valores de capital/formulário não são preços.
 */
import fs from "node:fs";
import path from "node:path";

const roots = ["src/pages", "src/data", "src/lib", "src/components"];
const rules = [
  ["valor-monetario", /R\$\s*[\d]/i],
  ["percentual-comercial", /\d+[.,]?\d*\s*%/],
  ["promessa-absoluta", /indeniza[çc][ãa]o integral|sem car[êe]ncia|ilimitad[oa]|aceita[çc][ãa]o garantida|cobertura total|sem exclus[õo]es/i],
  ["prazo-atendimento", /em at[ée]\s*\d+\s*(?:h\b|horas?|dias?)|plant[ãa]o 24\/7/i],
  ["rede-saude", /rede credenciada|hospitais? credenciad|cobre.*hospital|hospital.*cobert/i],
  ["prova-social", /ap[óo]lices ativas|economizou|garantiu.*indeniza[çc][ãa]o/i],
];

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return filesUnder(file);
    return /\.(?:ts|tsx)$/.test(file) && !/\.(?:test|spec)\./.test(file) ? [file] : [];
  });
}

const candidates = [];
for (const file of roots.flatMap(filesUnder).sort()) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const kinds = rules.filter(([, rule]) => rule.test(line)).map(([kind]) => kind);
    if (kinds.length) candidates.push({
      file: file.split(path.sep).join("/"), line: index + 1, kinds,
      excerpt: line.trim().slice(0, 550), status: "validar-no-contexto",
    });
  });
}

const report = {
  scope: "Fontes React/TypeScript; não verifica banco, CDN, páginas publicadas ou Google Maps.",
  limitations: [
    "Heurística não equivale a auditoria concluída e pode gerar falsos positivos.",
    "Não mede tráfego ou backlinks e não autoriza redirecionamentos ou desindexação.",
    "Verificar a rota e a precedência dos catálogos antes de corrigir uma ocorrência.",
    "Capital, franquia e opções de formulário não são necessariamente preço de seguro.",
    "Conteúdo estático de prerender e blog também requer revisão editorial específica.",
  ],
  totalCandidates: candidates.length,
  byKind: Object.fromEntries(rules.map(([kind]) => [kind, candidates.filter((item) => item.kinds.includes(kind)).length])),
  candidates,
};
fs.mkdirSync("audit-output", { recursive: true });
const destination = "audit-output/commercial-content-candidates.json";
fs.writeFileSync(destination, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Inventário salvo em ${destination}: ${candidates.length} linhas para análise humana.`);
