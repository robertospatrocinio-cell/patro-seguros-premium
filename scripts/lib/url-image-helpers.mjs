/**
 * Helpers unificados para checagem de URL e imagem em JSON-LD.
 *
 * Ponto único da verdade compartilhado entre:
 *   - `scripts/lib/jsonld-validator.mjs`   (validação estrutural pré-Rich Results)
 *   - `scripts/lib/rich-results-checkers.mjs` (elegibilidade Google Rich Results)
 *
 * Motivação: antes desta lib, cada validador implementava seu próprio regex
 * de URL absoluta (`/^https?:\/\//i`), seu próprio extrator de imagem
 * (`hasImage` vs `extractImageUrl`) e seu próprio extrator de URLs em campos
 * genéricos (`extractUrlLike`). Divergências silenciosas causavam bugs em
 * que o CLI de runtime aprovava um schema que os testes reprovavam (ou
 * vice-versa). Centralizando aqui, tests e runtime aplicam exatamente a
 * mesma regra.
 *
 * Regras:
 *   isAbsUrl(v)       → true se v é string com esquema http:// ou https://
 *   isHttpsUrl(v)     → true somente se https:// (strict mode)
 *   isPlainObj(v)     → objeto puro (não array, não null)
 *   extractImageUrl(image)   → primeira URL encontrada em image | array | ImageObject
 *   hasImage(image)          → booleano derivado de extractImageUrl (não vazio)
 *   extractUrlLike(v)        → array com todas as URLs em v (string, @id, url, arrays)
 */

export const ABS_URL_RE = /^https?:\/\//i;
export const HTTPS_URL_RE = /^https:\/\//i;

export const isPlainObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
export const isAbsUrl = (v) => typeof v === "string" && ABS_URL_RE.test(v);
export const isHttpsUrl = (v) => typeof v === "string" && HTTPS_URL_RE.test(v);

/**
 * Extrai a primeira URL utilizável de um campo `image`:
 *   - string  → a própria string
 *   - array   → primeira posição que resolver para uma string não vazia
 *   - objeto  → `url` OU `@id` (ImageObject)
 *   - qualquer outro valor → null
 */
export function extractImageUrl(image) {
  if (!image) return null;
  if (typeof image === "string") return image.trim() ? image : null;
  if (Array.isArray(image)) return image.map(extractImageUrl).find(Boolean) ?? null;
  if (isPlainObj(image)) {
    const u = image.url || image["@id"] || image.contentUrl;
    return typeof u === "string" && u.trim() ? u : null;
  }
  return null;
}

/** Boolean derivado de extractImageUrl — mantém API do jsonld-validator antigo. */
export function hasImage(image) {
  return extractImageUrl(image) !== null;
}

/**
 * Extrai todas as URLs textuais de um valor arbitrário (usado por
 * `validateUrls` para percorrer campos como `sameAs`, `mainEntityOfPage`,
 * `potentialAction.target`, etc).
 */
export function extractUrlLike(v) {
  if (typeof v === "string") return [v];
  if (!v || typeof v !== "object") return [];
  if (Array.isArray(v)) return v.flatMap(extractUrlLike);
  const out = [];
  if (typeof v["@id"] === "string") out.push(v["@id"]);
  if (typeof v.url === "string") out.push(v.url);
  return out;
}