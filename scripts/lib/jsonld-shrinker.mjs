/**
 * Shrinker de JSON-LD para property-based fuzzing.
 *
 * Objetivo: quando um checker de Google Rich Results falha em um input
 * gerado aleatoriamente, reduzir esse input ao MENOR contraexemplo que
 * ainda dispara a falha. Sem shrinking, a mensagem de erro do fuzz vem
 * carregada de "lixo" irrelevante (chaves extras, arrays enormes,
 * strings randômicas) — o desenvolvedor perde tempo separando sinal de
 * ruído. Com shrinking, o teste imprime o mínimo denominador comum:
 *
 *   ex.: { "@type": "Organization", name: "X" }   // sem url/logo
 *
 * O predicado devolve TRUE quando o input AINDA reproduz a falha.
 * Enquanto isso valer, reduzimos monotonicamente. Paramos quando não há
 * mais movimento (fixed-point) ou quando atingimos maxSteps.
 *
 * Estratégias, em ordem de agressividade:
 *   1. remover chave (preservando `@type` por default)
 *   2. substituir valor por primitivo mínimo (null, "", 0, [], {})
 *   3. reduzir array: cortar metade, remover 1 elemento por vez
 *   4. reduzir string: cortar metade, esvaziar
 *   5. reduzir número em direção a 0
 *   6. recursão em objetos/arrays internos
 *
 * NÃO usa mutação: sempre trabalha com clones para permitir rollback.
 */

/** Clone profundo simples (JSON-LD é JSON puro, sem funções/ciclos). */
function clone(v) {
  if (v === null || typeof v !== "object") return v;
  if (Array.isArray(v)) return v.map(clone);
  const out = {};
  for (const k of Object.keys(v)) out[k] = clone(v[k]);
  return out;
}

/** Retorna todos os "candidatos" de redução para um valor. */
function* candidates(value, opts) {
  if (value === null || value === undefined) return;

  if (typeof value === "string") {
    if (value.length > 0) yield "";
    if (value.length > 1) yield value.slice(0, Math.floor(value.length / 2));
    return;
  }

  if (typeof value === "number") {
    if (value !== 0 && Number.isFinite(value)) {
      yield 0;
      const half = Math.trunc(value / 2);
      if (half !== value && half !== 0) yield half;
    }
    return;
  }

  if (Array.isArray(value)) {
    if (value.length > 0) yield [];
    if (value.length > 1) {
      yield value.slice(0, Math.floor(value.length / 2));
      yield value.slice(Math.ceil(value.length / 2));
      // Remover um item por vez (permite isolar o culpado exato).
      for (let i = 0; i < value.length; i++) {
        const next = value.slice(0, i).concat(value.slice(i + 1));
        yield next;
      }
    }
    // Reduzir cada elemento internamente.
    for (let i = 0; i < value.length; i++) {
      for (const rc of candidates(value[i], opts)) {
        const next = value.slice();
        next[i] = rc;
        yield next;
      }
    }
    return;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    const preserve = opts.preserveKeys;
    // Remover chaves (exceto as preservadas).
    for (const k of keys) {
      if (preserve.has(k)) continue;
      const next = { ...value };
      delete next[k];
      yield next;
    }
    // Reduzir valor de cada chave.
    for (const k of keys) {
      for (const rc of candidates(value[k], opts)) {
        yield { ...value, [k]: rc };
      }
    }
    return;
  }

  // boolean / outros: sem redução útil.
}

/**
 * @param {any}      input     — JSON-LD original que reproduz a falha
 * @param {(v:any)=>boolean} predicate — TRUE quando `v` AINDA falha
 * @param {object}   [options]
 * @param {string[]} [options.preserveKeys=["@type"]] — chaves obrigatórias
 * @param {number}   [options.maxSteps=5000] — teto de reduções aceitas
 * @returns {{ shrunk:any, steps:number, iterations:number }}
 */
export function shrink(input, predicate, options = {}) {
  const opts = {
    preserveKeys: new Set(options.preserveKeys ?? ["@type"]),
    maxSteps: options.maxSteps ?? 5000,
  };

  // Sanity: predicado precisa segurar no ponto de partida.
  let current = clone(input);
  if (!safePredicate(predicate, current)) {
    return { shrunk: current, steps: 0, iterations: 0, unchanged: true };
  }

  let steps = 0;
  let iterations = 0;
  let progressed = true;

  while (progressed && steps < opts.maxSteps) {
    progressed = false;
    // Coleta candidatos e adota o PRIMEIRO que ainda satisfaz o predicado.
    for (const cand of candidates(current, opts)) {
      iterations++;
      if (iterations > opts.maxSteps * 20) break; // teto de exploração
      if (safePredicate(predicate, cand)) {
        current = cand;
        steps++;
        progressed = true;
        break; // reinicia a partir do novo mínimo
      }
    }
  }

  return { shrunk: current, steps, iterations };
}

function safePredicate(pred, v) {
  try { return Boolean(pred(v)); } catch { return false; }
}

/**
 * Helper para tests: dado um `check(node) → {req,rec,unsupported}` e uma
 * asserção sobre esse resultado, encontra e retorna o menor `node` que
 * ainda viola a asserção.
 *
 * @param {any} node               — nó original que falha
 * @param {(n:any)=>any} check     — checker (ex.: CHECKERS.Organization)
 * @param {(r:any,n:any)=>boolean} stillFails — TRUE se `r` (ou `n`) ainda
 *                                   representa a falha investigada
 * @param {object} [options]
 */
export function shrinkCounterexample(node, check, stillFails, options) {
  return shrink(
    node,
    (candidate) => {
      let r;
      try { r = check(candidate); } catch { return false; }
      try { return stillFails(r, candidate); } catch { return false; }
    },
    options,
  );
}

/** Formata um contraexemplo para mensagens de teste (JSON compacto). */
export function formatCounterexample(node, extra = {}) {
  const body = JSON.stringify(node);
  const meta = Object.entries(extra).map(([k, v]) => `${k}=${v}`).join(" ");
  return meta ? `${meta} node=${body}` : body;
}