#!/usr/bin/env node
/**
 * validate-jumplinks-headings.mjs
 *
 * Checagem unificada que garante, em uma única execução no CI, que TODO
 * jump link do site aponte para um heading real com `id` correto e nível
 * H1/H2/H3.
 *
 * Substitui a execução separada de:
 *   - `validate-jumplinks.mjs`         → id existe no template + prop
 *                                        condicional + id presente no HTML
 *                                        pré-renderizado.
 *   - `validate-heading-hierarchy.mjs` → id de heading está em <h1|h2|h3>,
 *                                        hierarquia não pula níveis, e o
 *                                        href do jump link no HTML servido
 *                                        aponta para um heading (não p/
 *                                        <div>/<h4>).
 *
 * Regra combinada: um jump link `#foo` só é válido quando
 *   1. `foo` é declarado como `id` no `InsurancePageTemplate.tsx`;
 *   2. a página que usa esse href passa a prop condicional (se houver);
 *   3. no HTML de `dist/`, `id="foo"` está em `<h1|h2|h3>` — não em `<div>`,
 *      `<section>`, `<span>` ou heading fora de H1/H2/H3;
 *   4. a hierarquia global de headings da rota não pula níveis;
 *   5. o id de heading está pareado com `aria-labelledby` em uma section.
 *
 * Flags herdadas:
 *   SKIP_DIST=1   → pula camadas 3 e 4 (útil pré-build).
 *   WARN_ONLY=1   → hierarquia não falha o build (só reporta).
 */
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PHASES = [
  {
    label: "Jump links → id no template + prop condicional + presença em dist/",
    script: "validate-jumplinks.mjs",
  },
  {
    label: "Heading hierarchy → tag correta, sem saltos de nível, jump links em <h1|h2|h3>",
    script: "validate-heading-hierarchy.mjs",
  },
];

let failed = 0;
for (const phase of PHASES) {
  console.log(`\n▶ ${phase.label}`);
  console.log(`  (${phase.script})`);
  const res = spawnSync(
    process.execPath,
    [path.join(__dirname, phase.script)],
    { stdio: "inherit", env: process.env },
  );
  if (res.status !== 0) failed++;
}

if (failed > 0) {
  console.error(
    `\n✗ ${failed}/${PHASES.length} fase(s) falharam na checagem unificada de jump links + headings.`,
  );
  process.exit(1);
}
console.log(
  `\n✓ Todas as ${PHASES.length} fases passaram: jump links apontam para <h1|h2|h3> com id correto.`,
);