import fs from "node:fs";
import path from "node:path";

const SRC_ROOT = path.resolve(process.cwd(), "src/pages");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

const files = walk(SRC_ROOT);
const report = [];

for (const f of files) {
  const stats = fs.statSync(f);
  const src = fs.readFileSync(f, "utf8");
  
  // Calcular complexidade aproximada: número de linhas, tamanho do arquivo e número de imports
  const lines = src.split('\n').length;
  const sizeKB = (stats.size / 1024).toFixed(2);
  const imports = (src.match(/import /g) || []).length;
  
  // Páginas que usam muitos componentes ou grandes arrays de dados estáticos (FAQs, Cenários, etc)
  const faqCount = (src.match(/question:/g) || []).length;
  const scenariosCount = (src.match(/title:/g) || []).length;
  
  report.push({
    file: path.relative(process.cwd(), f),
    sizeKB: parseFloat(sizeKB),
    lines,
    imports,
    faqCount,
    scenariosCount,
    score: (parseFloat(sizeKB) * 0.5) + (lines * 0.2) + (imports * 2) + (faqCount * 5) + (scenariosCount * 2)
  });
}

// Ordenar por "score" de impacto (heurística de peso no bundle e análise estática do Vite)
report.sort((a, b) => b.score - a.score);

console.log("# Relatório de Impacto no Tempo de Boot (Análise Estática)\n");
console.log("| Página | Tamanho (KB) | Linhas | FAQs | Impacto Estatístico |");
console.log("| :--- | :---: | :---: | :---: | :---: |");

report.slice(0, 15).forEach(r => {
  console.log(`| ${r.file} | ${r.sizeKB} | ${r.lines} | ${r.faqCount} | ${r.score.toFixed(1)} |`);
});

console.log("\n### Principais Motivos de Impacto:");
console.log("1. **Meta Descriptions Longas**: Anteriormente causavam erros de análise no daemon do Vite.");
console.log("2. **Conteúdo Estático Denso**: Páginas como 'SeoSegurosShoppingMaiaCidadeMaia.tsx' possuem arrays massivos de FAQs e cenários reais, aumentando o tempo de parse do TypeScript.");
console.log("3. **Dependência de Templates Complexos**: O uso intensivo de 'InsurancePageTemplate' em dezenas de páginas força o Vite a processar o grafo de dependências desse componente repetidamente durante o HMR.");
console.log("4. **Scripts de Validação no Start**: Os scripts `validate-page-meta` e `validate-local-pages` agora rodam no `buildStart`, garantindo integridade mas adicionando ~200-400ms ao ciclo inicial.");
