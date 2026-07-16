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
  if (items.length < 2) {
    errors.push(`${label}: rich results exigem ao menos 2 itens (recebido ${items.length})`);
  }
  items.forEach((it, i) => {
    if (it.position !== i + 1) {
      errors.push(`${label}: position[${i}] esperado ${i + 1}, recebido ${it.position}`);
    }
    if (!it.name) errors.push(`${label}: item[${i}] sem name`);
    if (!it.item && i < items.length - 1) errors.push(`${label}: item[${i}] sem URL`);
    if (it.item) {
      const url = typeof it.item === "string" ? it.item : it.item?.["@id"] || it.item?.url;
      if (typeof url === "string" && !/^https?:\/\//i.test(url)) {
        errors.push(`${label}: item[${i}].item deve ser URL absoluta http(s) (recebido "${url}")`);
      }
    }
  });
}

export function validateLocalBusiness(node, errors, label, options = {}) {
  const { strict = false } = options;
  if (!node.name) errors.push(`${label} ${node["@type"]}: faltando name`);
  if (!node.address) errors.push(`${label} ${node["@type"]}: faltando address`);
  else if (!node.address.streetAddress) errors.push(`${label} ${node["@type"]}: address.streetAddress ausente`);
  if (!node.telephone) errors.push(`${label} ${node["@type"]}: faltando telephone`);
  if (node.aggregateRating && node.aggregateRating.ratingValue !== undefined) {
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
  if (strict) {
    const type = Array.isArray(node["@type"]) ? node["@type"].join("/") : node["@type"];
    if (!node.url) errors.push(`${label} ${type}: rich results exigem url (site oficial)`);
    if (!node.image && !node.logo) errors.push(`${label} ${type}: rich results exigem image ou logo`);
    if (node.address && typeof node.address === "object") {
      if (!node.address.addressLocality) errors.push(`${label} ${type}: address.addressLocality ausente`);
      if (!node.address.addressRegion) errors.push(`${label} ${type}: address.addressRegion ausente`);
      if (!node.address.addressCountry) errors.push(`${label} ${type}: address.addressCountry ausente`);
    }
    if (node.geo) {
      const lat = Number(node.geo.latitude);
      const lng = Number(node.geo.longitude);
      if (Number.isNaN(lat) || lat < -90 || lat > 90) errors.push(`${label} ${type}: geo.latitude inválida`);
      if (Number.isNaN(lng) || lng < -180 || lng > 180) errors.push(`${label} ${type}: geo.longitude inválida`);
    }
    if (Array.isArray(node.openingHoursSpecification)) {
      const H = /^([01]\d|2[0-3]):[0-5]\d$/;
      node.openingHoursSpecification.forEach((oh, i) => {
        if (oh.opens && !H.test(oh.opens)) errors.push(`${label} openingHoursSpecification[${i}].opens formato inválido (HH:MM)`);
        if (oh.closes && !H.test(oh.closes)) errors.push(`${label} openingHoursSpecification[${i}].closes formato inválido (HH:MM)`);
      });
    }
  }
}

export function validateOrganization(node, errors, label, options = {}) {
  const { strict = false } = options;
  if (!node.name) errors.push(`${label} Organization: faltando name`);
  if (strict) {
    if (!node.url) errors.push(`${label} Organization: rich results exigem url`);
    const logo = node.logo;
    const logoUrl = typeof logo === "string" ? logo : logo?.url || logo?.["@id"];
    if (!logoUrl) errors.push(`${label} Organization: rich results (Logo) exigem logo (URL ou ImageObject.url)`);
    else if (!/^https?:\/\//i.test(logoUrl)) errors.push(`${label} Organization: logo deve ser URL absoluta http(s)`);
    if (!Array.isArray(node.sameAs) || node.sameAs.length === 0) {
      errors.push(`${label} Organization: sameAs[] recomendado (perfis oficiais) ausente`);
    }
    if (Array.isArray(node.contactPoint)) {
      node.contactPoint.forEach((cp, i) => {
        if (!cp.telephone) errors.push(`${label} Organization: contactPoint[${i}] sem telephone`);
        if (!cp.contactType) errors.push(`${label} Organization: contactPoint[${i}] sem contactType`);
      });
    }
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

export function validateHowTo(node, errors, label) {
  if (!node.name || !String(node.name).trim()) {
    errors.push(`${label} HowTo: faltando name`);
  }
  const steps = node.step;
  if (!Array.isArray(steps) || steps.length === 0) {
    errors.push(`${label} HowTo: step[] vazio ou ausente`);
    return;
  }
  steps.forEach((s, i) => {
    const type = Array.isArray(s?.["@type"]) ? s["@type"][0] : s?.["@type"];
    if (type !== "HowToStep") errors.push(`${label} HowTo: step[${i}] @type deveria ser HowToStep`);
    if (!s?.name) errors.push(`${label} HowTo: step[${i}] sem name`);
    if (!s?.text && !s?.itemListElement) errors.push(`${label} HowTo: step[${i}] sem text nem itemListElement`);
  });
  const ISO_DUR = /^P(T\d+[HMS])?/;
  if (node.totalTime && !ISO_DUR.test(String(node.totalTime))) {
    errors.push(`${label} HowTo: totalTime não está em ISO 8601 duration (${node.totalTime})`);
  }
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

function authorName(author) {
  if (!author) return null;
  if (typeof author === "string") return author.trim() || null;
  if (Array.isArray(author)) return author.map(authorName).find(Boolean) ?? null;
  if (typeof author === "object") return (author.name && String(author.name).trim()) || null;
  return null;
}

function hasImage(image) {
  if (!image) return false;
  if (typeof image === "string") return image.trim().length > 0;
  if (Array.isArray(image)) return image.some(hasImage);
  if (typeof image === "object") return Boolean(image.url || image["@id"]);
  return false;
}

export function validateArticle(node, errors, label) {
  const type = Array.isArray(node["@type"]) ? node["@type"][0] : node["@type"];
  if (!node.headline || !String(node.headline).trim()) {
    errors.push(`${label} ${type}: faltando headline`);
  } else if (String(node.headline).length > 110) {
    errors.push(`${label} ${type}: headline > 110 chars (Google trunca)`);
  }
  if (!authorName(node.author)) {
    errors.push(`${label} ${type}: faltando author (string ou {name})`);
  }
  if (!node.datePublished) {
    errors.push(`${label} ${type}: faltando datePublished`);
  } else if (!ISO_DATE_RE.test(String(node.datePublished))) {
    errors.push(`${label} ${type}: datePublished não está em ISO 8601 (${node.datePublished})`);
  }
  if (node.dateModified && !ISO_DATE_RE.test(String(node.dateModified))) {
    errors.push(`${label} ${type}: dateModified não está em ISO 8601 (${node.dateModified})`);
  }
  if (!hasImage(node.image)) {
    errors.push(`${label} ${type}: faltando image (URL, array ou ImageObject)`);
  }
}

export function validateNode(node, errors, label = "root", options = {}) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n, i) => validateNode(n, errors, `${label}[${i}]`, options));
    return;
  }
  if (!node["@context"]) errors.push(`${label}: faltando @context`);
  if (Array.isArray(node["@graph"])) {
    node["@graph"].forEach((n, i) => validateNode({ "@context": node["@context"], ...n }, errors, `${label}@graph[${i}]`, options));
    return;
  }
  if (!node["@type"]) { errors.push(`${label}: faltando @type`); return; }
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  const type = types[0];
  if (type === "BreadcrumbList") validateBreadcrumb(node, errors, label);
  else if (types.some((t) => t === "LocalBusiness" || t === "InsuranceAgency")) validateLocalBusiness(node, errors, label, options);
  else if (type === "Organization") validateOrganization(node, errors, label, options);
  else if (type === "FAQPage") validateFAQ(node, errors, label);
  else if (type === "HowTo") validateHowTo(node, errors, label);
  else if (type === "Article" || type === "BlogPosting" || type === "NewsArticle") validateArticle(node, errors, label);
}

export function validateJsonLdBlock(raw, label = "block", options = {}) {
  const errors = [];
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch (e) { return [`${label}: JSON inválido — ${e.message}`]; }
  validateNode(parsed, errors, label, options);
  return errors;
}

export function validateHtml(html, label = "page", options = {}) {
  const errors = [];
  const blocks = extractBlocks(html);
  blocks.forEach((raw, idx) => {
    errors.push(...validateJsonLdBlock(raw, `${label}#${idx}`, options));
  });
  return { blocks: blocks.length, errors };
}