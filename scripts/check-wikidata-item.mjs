#!/usr/bin/env node
/**
 * check-wikidata-item.mjs
 *
 * Consulta a API pública do Wikidata (SPARQL + wbsearchentities) procurando
 * o item "Patro Corretora de Seguros". Se encontrar, imprime o QID e o
 * snippet pronto para colar no sameAs dos schemas + no llms-full.txt e
 * NAP master.
 *
 * Uso:
 *   node scripts/check-wikidata-item.mjs
 *   node scripts/check-wikidata-item.mjs --qid Q123456789   # força QID conhecido
 *
 * Sem dependências (Node 18+ com fetch nativo).
 */

const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

const KNOWN_QID = flag("qid");
const SEARCH_TERMS = [
  "Patro Corretora de Seguros",
  "Patro Seguros",
  "Patrocínio Corretora de Seguros",
];

// -------------------- 1) Buscar candidatos --------------------
async function searchEntity(term) {
  const url =
    `https://www.wikidata.org/w/api.php?action=wbsearchentities` +
    `&search=${encodeURIComponent(term)}` +
    `&language=pt-br&format=json&type=item&limit=10&origin=*`;
  const res = await fetch(url, {
    headers: { "User-Agent": "PatroWikidataCheck/1.0 (contato@patroseguros.com.br)" },
  });
  if (!res.ok) throw new Error(`wbsearchentities ${res.status}`);
  const data = await res.json();
  return data.search || [];
}

// -------------------- 2) Buscar detalhes do QID candidato --------------------
async function getEntity(qid) {
  const url =
    `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`;
  const res = await fetch(url, {
    headers: { "User-Agent": "PatroWikidataCheck/1.0" },
  });
  if (!res.ok) throw new Error(`EntityData ${qid} ${res.status}`);
  const data = await res.json();
  return data.entities?.[qid];
}

// -------------------- 3) Validar que o candidato é realmente a Patro --------
function matchesPatro(entity) {
  const claims = entity.claims || {};
  const website = claims.P856?.[0]?.mainsnak?.datavalue?.value || "";
  const phone = claims.P1329?.[0]?.mainsnak?.datavalue?.value || "";
  const country = claims.P17?.[0]?.mainsnak?.datavalue?.value?.id || "";
  const industry = claims.P452?.[0]?.mainsnak?.datavalue?.value?.id || "";

  const websiteOk = website.includes("patroseguros.com.br");
  const phoneOk = phone.replace(/\D/g, "").includes("551151997500");
  const countryOk = country === "Q155";
  const industryOk = industry === "Q43183";

  const score = [websiteOk, phoneOk, countryOk, industryOk].filter(Boolean).length;
  return { score, checks: { websiteOk, phoneOk, countryOk, industryOk } };
}

// -------------------- 4) Gerar snippet ------------------------------
function snippet(qid) {
  const url = `https://www.wikidata.org/wiki/${qid}`;
  return `
  ── Snippet para colar no sameAs ────────────────────────────────

  URL Wikidata publicada: ${url}

  Adicionar esta linha no array "sameAs" dos schemas em:

    • index.html                                 (2 blocos: InsuranceAgency + Organization)
    • src/components/LocalBusinessSchema.tsx     (bloco InsuranceAgency)
    • public/llms-full.txt                       (seção "Sinais de autoridade")
    • docs/aeo-nap-master.md                     (bloco sameAs canônico)

  Linha a colar (respeitando vírgulas):

    "${url}"

  Também adicionar em index.html, dentro do "identifier" dos 2 blocos:

    {"@type": "PropertyValue", "name": "Wikidata", "propertyID": "https://www.wikidata.org", "value": "${qid}"}

  ────────────────────────────────────────────────────────────────
`;
}

// -------------------- Runner ----------------------------------------
async function run() {
  if (KNOWN_QID) {
    console.log(`▶ Verificando QID informado: ${KNOWN_QID}`);
    const entity = await getEntity(KNOWN_QID);
    if (!entity) {
      console.error(`❌ QID ${KNOWN_QID} não encontrado.`);
      process.exit(1);
    }
    const { score, checks } = matchesPatro(entity);
    console.log(`  Checks:`, checks, `Score ${score}/4`);
    if (score >= 3) {
      console.log(`✅ Item validado como Patro Seguros.`);
      console.log(snippet(KNOWN_QID));
    } else {
      console.log(`⚠  Score baixo — verificar se o item está completo.`);
    }
    return;
  }

  console.log("▶ Procurando item Wikidata para Patro Corretora de Seguros...\n");
  const seen = new Set();
  const candidates = [];
  for (const term of SEARCH_TERMS) {
    console.log(`  🔍 Termo: "${term}"`);
    const results = await searchEntity(term);
    for (const r of results) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      candidates.push(r);
    }
  }
  console.log(`\n  ${candidates.length} candidato(s) únicos encontrados.\n`);

  if (candidates.length === 0) {
    console.log("❌ Nenhum item Wikidata encontrado ainda.");
    console.log("   → Seguir docs/aeo-wikidata-submission.md para criar.");
    process.exit(0);
  }

  let best = { qid: null, score: 0, entity: null };
  for (const c of candidates) {
    try {
      const entity = await getEntity(c.id);
      if (!entity) continue;
      const { score, checks } = matchesPatro(entity);
      const label = entity.labels?.["pt-br"]?.value || entity.labels?.pt?.value || entity.labels?.en?.value || "(sem label)";
      console.log(`  • ${c.id.padEnd(12)} "${label}"  score=${score}/4  ${JSON.stringify(checks)}`);
      if (score > best.score) best = { qid: c.id, score, entity };
    } catch (err) {
      console.log(`  • ${c.id} — falha ao ler: ${err.message}`);
    }
  }

  console.log("");
  if (best.qid && best.score >= 3) {
    console.log(`✅ Item Patro Seguros encontrado: ${best.qid} (confiança ${best.score}/4)`);
    console.log(snippet(best.qid));
  } else if (best.qid) {
    console.log(`⚠  Melhor candidato ${best.qid} tem score ${best.score}/4 — inconclusivo.`);
    console.log(`   Se for realmente a Patro, completar statements no Wikidata e re-rodar.`);
    console.log(`   Se não for, seguir docs/aeo-wikidata-submission.md.`);
  } else {
    console.log("❌ Nenhum candidato validado. Seguir docs/aeo-wikidata-submission.md.");
  }
}

run().catch((err) => {
  console.error("Erro fatal:", err.message);
  process.exit(2);
});