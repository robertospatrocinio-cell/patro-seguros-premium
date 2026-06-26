/**
 * Pure JSON-LD validation helpers. No filesystem / no process.exit so they can
 * be unit-tested with Vitest and reused by the build-time CLI.
 */

const SCRIPT_RE = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

export function extractBlocks(html) {
  const blocks = [];
  let m;
  const re = new RegExp(SCRIPT_RE.source, "gi");
  while ((m = re.exec(html)) !== null) blocks.push(m[1].trim());
  return blocks;
}

export function validateBreadcrumb(node, errors, label = "BreadcrumbList") {
  const items = node.itemListElement;
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(`${label}: itemListElement vazio ou ausente`);
    return;
  }
  items.forEach((it, i) => {
    if (it.position !== i + 1) {
      errors.push(`${label}: position[${i}] esperado ${i + 1}, recebido ${it.position}`);
    }
    if (!it.name) errors.push(`${label}: item[${i}] sem name`);
    if (!it.item && i < items.length - 1) errors.push(`${label}: item[${i}] sem URL`);
  });
}

export function validateLocalBusiness(node, errors, label) {
  if (!node.name) errors.push(`${label} ${node["@type"]}: faltando name`);
  if (!node.address) errors.push(`${label} ${node["@type"]}: faltando address`);
  else if (!node.address.streetAddress) errors.push(`${label} ${node["@type"]}: address.streetAddress ausente`);
  if (!node.telephone) errors.push(`${label} ${node["@type"]}: faltando telephone`);
  if (node.aggregateRating) {
    const v = Number(node.aggregateRating.ratingValue);
    if (Number.isNaN(v) || v < 0 || v > 5) errors.push(`${label} aggregateRating.ratingValue inválido`);
  }
  if (Array.isArray(node.review)) {
    node.review.forEach((r, i) => {
      if (r.reviewRating && Number.isNaN(Number(r.reviewRating.ratingValue))) {
        errors.push(`${label} review[${i}].reviewRating.ratingValue não numérico`);
      }
      if (!r.author) errors.push(`${label} review[${i}] sem author`);
    });
  }
}

export function validateFAQ(node, errors, label) {
  const items = node.mainEntity;
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(`${label} FAQPage: mainEntity vazio`);
    return;
  }
  items.forEach((q, i) => {
    if (!q.name) errors.push(`${label} FAQPage: question[${i}] sem name`);
    if (!q.acceptedAnswer?.text) errors.push(`${label} FAQPage: question[${i}] sem acceptedAnswer.text`);
  });
}

export function validateNode(node, errors, label = "root") {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n, i) => validateNode(n, errors, `${label}[${i}]`));
    return;
  }
  if (!node["@context"]) errors.push(`${label}: faltando @context`);
  if (!node["@type"]) { errors.push(`${label}: faltando @type`); return; }
  const type = Array.isArray(node["@type"]) ? node["@type"][0] : node["@type"];
  if (type === "BreadcrumbList") validateBreadcrumb(node, errors, label);
  else if (type === "LocalBusiness" || type === "InsuranceAgency" || type === "Organization") validateLocalBusiness(node, errors, label);
  else if (type === "FAQPage") validateFAQ(node, errors, label);
}

export function validateJsonLdBlock(raw, label = "block") {
  const errors = [];
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch (e) { return [`${label}: JSON inválido — ${e.message}`]; }
  validateNode(parsed, errors, label);
  return errors;
}

export function validateHtml(html, label = "page") {
  const errors = [];
  const blocks = extractBlocks(html);
  blocks.forEach((raw, idx) => {
    errors.push(...validateJsonLdBlock(raw, `${label}#${idx}`));
  });
  return { blocks: blocks.length, errors };
}