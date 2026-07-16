/**
 * Utilitários para emitir anotações do GitHub Actions Checks a partir dos
 * erros produzidos pelo validador JSON-LD.
 *
 * O formato de workflow command é documentado em:
 *   https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions
 *
 *   ::error file={path},line={n},col={c},endLine={e},title={t}::{message}
 *
 * Todas as vírgulas, quebras de linha e retornos precisam ser escapados (o
 * GitHub trata NL como fim do comando).
 */

function esc(v) {
  return String(v)
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A");
}

function escProp(v) {
  return esc(v).replace(/:/g, "%3A").replace(/,/g, "%2C");
}

export function isGithubActions() {
  return process.env.GITHUB_ACTIONS === "true";
}

/**
 * Emite `::error` (ou warning/notice) no stdout — GitHub Actions coleta e
 * exibe como Check Annotation no arquivo/linha indicados.
 */
export function emitAnnotation({
  level = "error",
  file,
  line,
  col,
  endLine,
  title,
  message,
}) {
  const props = [];
  if (file) props.push(`file=${escProp(file)}`);
  if (line) props.push(`line=${line}`);
  if (col) props.push(`col=${col}`);
  if (endLine) props.push(`endLine=${endLine}`);
  if (title) props.push(`title=${escProp(title)}`);
  const head = props.length ? ` ${props.join(",")}` : "";
  // stdout — GitHub captura tanto stdout quanto stderr.
  process.stdout.write(`::${level}${head}::${esc(message)}\n`);
}

// -------- Localização de blocos JSON-LD dentro de um HTML --------

const LD_RE_G = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

/**
 * Retorna os blocos `<script type="application/ld+json">` com posição:
 *   [{ raw, contentStart, contentEnd, startLine, startCol, endLine }]
 * `contentStart` = offset do primeiro char do JSON dentro do HTML (usado para
 * calcular linha/col de erros de campo específicos).
 */
export function extractBlocksWithLocation(html) {
  const out = [];
  let m;
  LD_RE_G.lastIndex = 0;
  while ((m = LD_RE_G.exec(html)) !== null) {
    const raw = m[1];
    const openTagLen = m[0].length - raw.length - "</script>".length;
    const contentStart = m.index + openTagLen;
    const contentEnd = contentStart + raw.length;
    const before = html.slice(0, contentStart);
    const startLine = countLines(before) + 1;
    const lastNl = before.lastIndexOf("\n");
    const startCol = lastNl === -1 ? contentStart + 1 : contentStart - lastNl;
    const endLine = startLine + countLines(raw);
    out.push({ raw: raw.trim(), rawUntrimmed: raw, contentStart, contentEnd, startLine, startCol, endLine });
  }
  return out;
}

function countLines(str) {
  let n = 0;
  for (let i = 0; i < str.length; i++) if (str.charCodeAt(i) === 10) n += 1;
  return n;
}

/**
 * Dado o texto do bloco (sem trim) e um `fieldPath` como
 * `mainEntity[2].acceptedAnswer.text`, tenta localizar a linha/col dentro do
 * bloco onde o último segmento aparece como chave JSON `"segment"`.
 * Retorna { lineInBlock, colInBlock } ou null se não achou.
 */
export function locateFieldInBlock(rawUntrimmed, fieldPath) {
  if (!fieldPath) return null;
  const segs = fieldPath.split(".").flatMap((s) => s.split("["));
  const key = (segs[segs.length - 1] || "")
    .replace(/\]$/, "")
    .replace(/\|.*$/, "") // "text|itemListElement" → "text"
    .trim();
  if (!key || /^\d+$/.test(key) || key === "(root)") return null;
  const needle = `"${key}"`;
  const idx = rawUntrimmed.lastIndexOf(needle);
  if (idx === -1) return null;
  const before = rawUntrimmed.slice(0, idx);
  const line = countLines(before);
  const lastNl = before.lastIndexOf("\n");
  const col = lastNl === -1 ? idx + 1 : idx - lastNl;
  return { lineInBlock: line, colInBlock: col };
}

/**
 * Combina um `block` (com startLine/startCol) e um erro do validador para
 * produzir { file, line, col, endLine, title, message } prontos para
 * `emitAnnotation`.
 *
 * O erro do validador tem formato:
 *   [route=X file=Y block#N] TIPO: mensagem  [field=..., rule=...]
 */
export function buildAnnotationFromError({ file, block, errorMsg }) {
  // [field=... , rule=...]  — field pode conter colchetes ("mainEntity[0].name").
  const suffix = errorMsg.match(/\[([^\[]*(?:field=|rule=)[^\[]*)\]\s*$/)?.[1] ?? "";
  const field = suffix.match(/field=([^,]+?)(?=,\s*rule=|$)/)?.[1]?.trim();
  const rule = suffix.match(/rule=([^,\]]+)/)?.[1]?.trim();
  const cleaned = errorMsg.replace(/\s*\[route=[^\]]+\]\s*/, "").trim();
  let line = block.startLine;
  let col = block.startCol;
  if (field) {
    const loc = locateFieldInBlock(block.rawUntrimmed, field);
    if (loc) {
      line = block.startLine + loc.lineInBlock;
      col = loc.lineInBlock === 0 ? block.startCol + loc.colInBlock - 1 : loc.colInBlock;
    }
  }
  return {
    file,
    line,
    col,
    endLine: block.endLine,
    title: rule ? `JSON-LD: ${rule}` : "JSON-LD validation failed",
    message: cleaned,
  };
}