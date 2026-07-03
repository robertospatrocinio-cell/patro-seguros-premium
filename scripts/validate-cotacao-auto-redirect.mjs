#!/usr/bin/env node
/**
 * Valida que https://patroseguros.com.br/cotacao-auto responde com:
 *   - HTTP 302 (Found)
 *   - Header `Location` apontando para o formulário oficial da Segfy
 *
 * Uso:
 *   node scripts/validate-cotacao-auto-redirect.mjs
 *   node scripts/validate-cotacao-auto-redirect.mjs --url https://www.patroseguros.com.br/cotacao-auto
 *
 * Códigos de saída:
 *   0 = OK
 *   1 = falha (status, location ou rede)
 */

const DEFAULT_URL = "https://patroseguros.com.br/cotacao-auto";
const EXPECTED_LOCATION =
  "https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D";
const EXPECTED_STATUS = 302;

function parseArgs(argv) {
  const args = { url: DEFAULT_URL };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--url" && argv[i + 1]) {
      args.url = argv[++i];
    } else if (argv[i].startsWith("--url=")) {
      args.url = argv[i].slice("--url=".length);
    }
  }
  return args;
}

function normalize(u) {
  try {
    // Compara ignorando encoding sutil e barra final.
    const url = new URL(u);
    return `${url.origin}${url.pathname.replace(/\/$/, "")}${url.search}`;
  } catch {
    return u;
  }
}

async function main() {
  const { url } = parseArgs(process.argv);
  console.log(`→ Validando redirect: ${url}`);

  let res;
  try {
    res = await fetch(url, {
      method: "GET",
      redirect: "manual",
      headers: { "User-Agent": "patro-redirect-validator/1.0" },
    });
  } catch (err) {
    console.error(`✗ Erro de rede: ${err.message}`);
    process.exit(1);
  }

  const status = res.status;
  const location = res.headers.get("location") || "";

  console.log(`  status:   ${status}`);
  console.log(`  location: ${location || "(vazio)"}`);

  const failures = [];
  if (status !== EXPECTED_STATUS) {
    failures.push(`status esperado ${EXPECTED_STATUS}, recebido ${status}`);
  }
  if (normalize(location) !== normalize(EXPECTED_LOCATION)) {
    failures.push(
      `Location esperado ${EXPECTED_LOCATION}, recebido ${location || "(vazio)"}`,
    );
  }

  if (failures.length) {
    console.error("\n✗ FALHOU:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }

  console.log("\n✓ OK — redirect 302 para Segfy validado.");
}

main();