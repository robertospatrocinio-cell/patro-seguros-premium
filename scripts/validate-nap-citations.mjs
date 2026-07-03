#!/usr/bin/env node
/**
 * validate-nap-citations.mjs
 *
 * Varre uma lista de URLs de citações externas (Reclame Aqui, Foursquare,
 * LinkedIn público, etc.) e verifica se o NAP (Name / Address / Phone)
 * bate com a fonte única de verdade em `docs/aeo-nap-master.md`.
 *
 * Uso:
 *   node scripts/validate-nap-citations.mjs
 *   node scripts/validate-nap-citations.mjs --url https://www.reclameaqui.com.br/empresa/patro/
 *   node scripts/validate-nap-citations.mjs --file citations.txt   # uma URL por linha
 *
 * Saída: relatório por URL com PASS / WARN / FAIL para cada campo NAP,
 *        e um resumo global. Exit code 1 se qualquer FAIL.
 *
 * Não requer dependências — usa fetch nativo do Node 18+.
 */

import fs from "node:fs";

// -------------------- Fonte única de verdade (canônico) -------------------
const CANONICAL = {
  name: "Patro Corretora de Seguros",
  nameShort: "Patro Seguros",
  // Fragmentos exigidos no endereço (todos devem estar presentes)
  addressFragments: [
    "Salgado Filho",
    "2120",
    "Cidade Maia",
    "Guarulhos",
    "07115",
  ],
  // Formas aceitas de telefone (qualquer uma passa; qualquer outra falha)
  phonePatterns: [
    /\(11\)\s*5199[-\s]?7500/,
    /11\s*5199[-\s]?7500/,
    /\+?55\s*11\s*5199[-\s]?7500/,
    /551151997500/,
  ],
  // Termos proibidos (indicam variação de marca)
  forbidden: [
    /patrocinio\s+seguros/i,
    /patro\s+seguros\s+guarulhos/i,
    /patro\s+corretora\s+ltda(?!\s|$)/i,
  ],
};

// URLs default para monitorar (editar conforme publicar em cada diretório)
const DEFAULT_URLS = [
  "https://www.reclameaqui.com.br/empresa/patro-corretora-de-seguros/",
  "https://www.linkedin.com/company/patro-seguros",
  "https://foursquare.com/v/patro-seguros",
  "https://www.apontador.com.br/local/sp/guarulhos/seguros/patro_seguros.html",
  "https://www.guiamais.com.br/patro-seguros-guarulhos-sp",
  "https://www.solutudo.com.br/guarulhos/patro-seguros",
  "https://www.hotfrog.com.br/company/patro-seguros",
  "https://www.cybo.com/BR-biz/patro-seguros",
];

// -------------------- CLI ------------------------------------------------
const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

function loadUrls() {
  const oneUrl = flag("url");
  if (oneUrl) return [oneUrl];
  const fromFile = flag("file");
  if (fromFile) {
    return fs
      .readFileSync(fromFile, "utf-8")
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s && !s.startsWith("#"));
  }
  return DEFAULT_URLS;
}

// -------------------- Fetch + parse ---------------------------------------
async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; PatroNAPValidator/1.0; +https://www.patroseguros.com.br)",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// -------------------- Auditoria por URL -----------------------------------
function audit(text) {
  const findings = [];

  // Nome
  const hasFullName = text.includes(CANONICAL.name);
  const hasShortName = new RegExp(`\\b${CANONICAL.nameShort}\\b`, "i").test(text);
  if (hasFullName) {
    findings.push({ field: "name", level: "PASS", msg: `Nome canônico presente ("${CANONICAL.name}")` });
  } else if (hasShortName) {
    findings.push({ field: "name", level: "WARN", msg: `Somente forma curta encontrada ("${CANONICAL.nameShort}") — preferir a canônica` });
  } else {
    findings.push({ field: "name", level: "FAIL", msg: "Nome canônico ausente" });
  }

  // Endereço
  const missing = CANONICAL.addressFragments.filter((f) => !text.toLowerCase().includes(f.toLowerCase()));
  if (missing.length === 0) {
    findings.push({ field: "address", level: "PASS", msg: "Endereço completo (todos os fragmentos presentes)" });
  } else if (missing.length <= 1) {
    findings.push({ field: "address", level: "WARN", msg: `Endereço quase completo — faltam: ${missing.join(", ")}` });
  } else {
    findings.push({ field: "address", level: "FAIL", msg: `Endereço divergente — faltam: ${missing.join(", ")}` });
  }

  // Telefone
  const phoneOk = CANONICAL.phonePatterns.some((re) => re.test(text));
  findings.push({
    field: "phone",
    level: phoneOk ? "PASS" : "FAIL",
    msg: phoneOk ? "Telefone canônico presente" : "Telefone canônico ausente ou em formato divergente",
  });

  // Formas proibidas
  for (const re of CANONICAL.forbidden) {
    if (re.test(text)) {
      findings.push({ field: "brand", level: "FAIL", msg: `Termo proibido encontrado: ${re}` });
    }
  }

  return findings;
}

// -------------------- Runner ---------------------------------------------
const COLORS = { PASS: "\x1b[32m", WARN: "\x1b[33m", FAIL: "\x1b[31m", RST: "\x1b[0m" };
function c(level, s) { return `${COLORS[level] || ""}${s}${COLORS.RST}`; }

async function run() {
  const urls = loadUrls();
  console.log(`▶ Validando NAP em ${urls.length} URL(s) contra fonte única (docs/aeo-nap-master.md)\n`);

  const summary = { pass: 0, warn: 0, fail: 0, unreachable: 0 };

  for (const url of urls) {
    process.stdout.write(`• ${url}\n`);
    let text;
    try {
      const html = await fetchText(url);
      text = stripHtml(html);
    } catch (err) {
      console.log(`  ${c("FAIL", "UNREACHABLE")} — ${err.message}\n`);
      summary.unreachable++;
      continue;
    }

    const findings = audit(text);
    for (const f of findings) {
      const badge = c(f.level, f.level.padEnd(4));
      console.log(`  [${badge}] ${f.field.padEnd(8)} ${f.msg}`);
      if (f.level === "PASS") summary.pass++;
      else if (f.level === "WARN") summary.warn++;
      else summary.fail++;
    }
    console.log("");
  }

  console.log("──────────────── Resumo ────────────────");
  console.log(`  ${c("PASS", "PASS")} ${summary.pass}   ${c("WARN", "WARN")} ${summary.warn}   ${c("FAIL", "FAIL")} ${summary.fail}   Inacessíveis: ${summary.unreachable}`);

  if (summary.fail > 0 || summary.unreachable > 0) {
    console.log("\n❌ Existem citações divergentes ou inacessíveis. Corrigir no diretório e re-rodar.");
    process.exit(1);
  }
  console.log("\n✅ Todas as citações auditadas estão consistentes com o NAP canônico.");
}

run().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(2);
});