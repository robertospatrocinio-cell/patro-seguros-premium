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

/**
 * Formata uma mensagem de erro com localização precisa do campo JSON-LD que
 * violou a regra. Preserva os textos originais (para os testes) e anexa
 * `[field=..., rule=...]` no fim para que quem lê saiba exatamente onde tocar.
 *
 *   [route=/contato file=dist/contato/index.html block#1] FAQPage: question[2] sem name  [field=mainEntity[2].name, rule=faq.question.name]
 */
function fmt(base, meta = {}) {
  const parts = [];
  if (meta.field) parts.push(`field=${meta.field}`);
  if (meta.rule) parts.push(`rule=${meta.rule}`);
  return parts.length ? `${base}  [${parts.join(", ")}]` : base;
}
const push = (errors, base, meta) => errors.push(fmt(base, meta));

export function validateBreadcrumb(node, errors, label = "BreadcrumbList") {
  const items = node.itemListElement;
  if (!Array.isArray(items) || items.length === 0) {
    push(errors, `${label}: itemListElement vazio ou ausente`,
      { field: "itemListElement", rule: "breadcrumb.itemListElement.required" });
    return;
  }
  if (items.length < 2) {
    push(errors, `${label}: rich results exigem ao menos 2 itens (recebido ${items.length})`,
      { field: "itemListElement", rule: "breadcrumb.minItems" });
  }
  items.forEach((it, i) => {
    if (it.position !== i + 1) {
      push(errors, `${label}: position[${i}] esperado ${i + 1}, recebido ${it.position}`,
        { field: `itemListElement[${i}].position`, rule: "breadcrumb.position.sequential" });
    }
    if (!it.name) push(errors, `${label}: item[${i}] sem name`,
      { field: `itemListElement[${i}].name`, rule: "breadcrumb.item.name" });
    if (!it.item && i < items.length - 1) push(errors, `${label}: item[${i}] sem URL`,
      { field: `itemListElement[${i}].item`, rule: "breadcrumb.item.urlRequired" });
    if (it.item) {
      const url = typeof it.item === "string" ? it.item : it.item?.["@id"] || it.item?.url;
      if (typeof url === "string" && !/^https?:\/\//i.test(url)) {
        push(errors, `${label}: item[${i}].item deve ser URL absoluta http(s) (recebido "${url}")`,
          { field: `itemListElement[${i}].item`, rule: "breadcrumb.item.absoluteUrl" });
      }
    }
  });
}

export function validateLocalBusiness(node, errors, label, options = {}) {
  const { strict = false } = options;
  const tp = Array.isArray(node["@type"]) ? node["@type"].join("/") : node["@type"];
  if (!node.name) push(errors, `${label} ${tp}: faltando name`,
    { field: "name", rule: "localBusiness.name" });
  if (!node.address) push(errors, `${label} ${tp}: faltando address`,
    { field: "address", rule: "localBusiness.address" });
  else if (!node.address.streetAddress) push(errors, `${label} ${tp}: address.streetAddress ausente`,
    { field: "address.streetAddress", rule: "localBusiness.address.streetAddress" });
  if (!node.telephone) push(errors, `${label} ${tp}: faltando telephone`,
    { field: "telephone", rule: "localBusiness.telephone" });
  if (node.aggregateRating && node.aggregateRating.ratingValue !== undefined) {
    const v = Number(node.aggregateRating.ratingValue);
    if (Number.isNaN(v) || v < 0 || v > 5) push(errors, `${label} aggregateRating.ratingValue inválido`,
      { field: "aggregateRating.ratingValue", rule: "aggregateRating.range" });
  }
  if (Array.isArray(node.review)) {
    node.review.forEach((r, i) => {
      if (r.reviewRating && Number.isNaN(Number(r.reviewRating.ratingValue))) {
        push(errors, `${label} review[${i}].reviewRating.ratingValue não numérico`,
          { field: `review[${i}].reviewRating.ratingValue`, rule: "review.rating.numeric" });
      }
      if (!r.author) push(errors, `${label} review[${i}] sem author`,
        { field: `review[${i}].author`, rule: "review.author" });
    });
  }
  if (strict) {
    if (!node.url) push(errors, `${label} ${tp}: rich results exigem url (site oficial)`,
      { field: "url", rule: "localBusiness.strict.url" });
    if (!node.image && !node.logo) push(errors, `${label} ${tp}: rich results exigem image ou logo`,
      { field: "image|logo", rule: "localBusiness.strict.imageOrLogo" });
    if (node.address && typeof node.address === "object") {
      if (!node.address.addressLocality) push(errors, `${label} ${tp}: address.addressLocality ausente`,
        { field: "address.addressLocality", rule: "localBusiness.strict.addressLocality" });
      if (!node.address.addressRegion) push(errors, `${label} ${tp}: address.addressRegion ausente`,
        { field: "address.addressRegion", rule: "localBusiness.strict.addressRegion" });
      if (!node.address.addressCountry) push(errors, `${label} ${tp}: address.addressCountry ausente`,
        { field: "address.addressCountry", rule: "localBusiness.strict.addressCountry" });
    }
    if (node.geo) {
      const lat = Number(node.geo.latitude);
      const lng = Number(node.geo.longitude);
      if (Number.isNaN(lat) || lat < -90 || lat > 90) push(errors, `${label} ${tp}: geo.latitude inválida`,
        { field: "geo.latitude", rule: "localBusiness.strict.geo.latitude" });
      if (Number.isNaN(lng) || lng < -180 || lng > 180) push(errors, `${label} ${tp}: geo.longitude inválida`,
        { field: "geo.longitude", rule: "localBusiness.strict.geo.longitude" });
    }
    if (Array.isArray(node.openingHoursSpecification)) {
      const H = /^([01]\d|2[0-3]):[0-5]\d$/;
      node.openingHoursSpecification.forEach((oh, i) => {
        if (oh.opens && !H.test(oh.opens)) push(errors, `${label} openingHoursSpecification[${i}].opens formato inválido (HH:MM)`,
          { field: `openingHoursSpecification[${i}].opens`, rule: "localBusiness.strict.openingHours.format" });
        if (oh.closes && !H.test(oh.closes)) push(errors, `${label} openingHoursSpecification[${i}].closes formato inválido (HH:MM)`,
          { field: `openingHoursSpecification[${i}].closes`, rule: "localBusiness.strict.openingHours.format" });
      });
    }
  }
}

export function validateOrganization(node, errors, label, options = {}) {
  const { strict = false } = options;
  if (!node.name) push(errors, `${label} Organization: faltando name`,
    { field: "name", rule: "organization.name" });
  if (strict) {
    if (!node.url) push(errors, `${label} Organization: rich results exigem url`,
      { field: "url", rule: "organization.strict.url" });
    const logo = node.logo;
    const logoUrl = typeof logo === "string" ? logo : logo?.url || logo?.["@id"];
    if (!logoUrl) push(errors, `${label} Organization: rich results (Logo) exigem logo (URL ou ImageObject.url)`,
      { field: "logo", rule: "organization.strict.logo" });
    else if (!/^https?:\/\//i.test(logoUrl)) push(errors, `${label} Organization: logo deve ser URL absoluta http(s)`,
      { field: "logo", rule: "organization.strict.logo.absoluteUrl" });
    if (!Array.isArray(node.sameAs) || node.sameAs.length === 0) {
      push(errors, `${label} Organization: sameAs[] recomendado (perfis oficiais) ausente`,
        { field: "sameAs", rule: "organization.strict.sameAs" });
    }
    if (Array.isArray(node.contactPoint)) {
      node.contactPoint.forEach((cp, i) => {
        if (!cp.telephone) push(errors, `${label} Organization: contactPoint[${i}] sem telephone`,
          { field: `contactPoint[${i}].telephone`, rule: "organization.strict.contactPoint.telephone" });
        if (!cp.contactType) push(errors, `${label} Organization: contactPoint[${i}] sem contactType`,
          { field: `contactPoint[${i}].contactType`, rule: "organization.strict.contactPoint.contactType" });
      });
    }
  }
}

export function validateFAQ(node, errors, label) {
  const items = node.mainEntity;
  if (!Array.isArray(items) || items.length === 0) {
    push(errors, `${label} FAQPage: mainEntity vazio`,
      { field: "mainEntity", rule: "faq.mainEntity.required" });
    return;
  }
  items.forEach((q, i) => {
    if (!q.name) push(errors, `${label} FAQPage: question[${i}] sem name`,
      { field: `mainEntity[${i}].name`, rule: "faq.question.name" });
    if (!q.acceptedAnswer?.text) push(errors, `${label} FAQPage: question[${i}] sem acceptedAnswer.text`,
      { field: `mainEntity[${i}].acceptedAnswer.text`, rule: "faq.question.answerText" });
  });
}

export function validateHowTo(node, errors, label) {
  if (!node.name || !String(node.name).trim()) {
    push(errors, `${label} HowTo: faltando name`,
      { field: "name", rule: "howto.name" });
  }
  const steps = node.step;
  if (!Array.isArray(steps) || steps.length === 0) {
    push(errors, `${label} HowTo: step[] vazio ou ausente`,
      { field: "step", rule: "howto.step.required" });
    return;
  }
  steps.forEach((s, i) => {
    const type = Array.isArray(s?.["@type"]) ? s["@type"][0] : s?.["@type"];
    if (type !== "HowToStep") push(errors, `${label} HowTo: step[${i}] @type deveria ser HowToStep`,
      { field: `step[${i}].@type`, rule: "howto.step.type" });
    if (!s?.name) push(errors, `${label} HowTo: step[${i}] sem name`,
      { field: `step[${i}].name`, rule: "howto.step.name" });
    if (!s?.text && !s?.itemListElement) push(errors, `${label} HowTo: step[${i}] sem text nem itemListElement`,
      { field: `step[${i}].text|itemListElement`, rule: "howto.step.body" });
  });
  const ISO_DUR = /^P(T\d+[HMS])?/;
  if (node.totalTime && !ISO_DUR.test(String(node.totalTime))) {
    push(errors, `${label} HowTo: totalTime não está em ISO 8601 duration (${node.totalTime})`,
      { field: "totalTime", rule: "howto.totalTime.iso8601" });
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
    push(errors, `${label} ${type}: faltando headline`,
      { field: "headline", rule: "article.headline" });
  } else if (String(node.headline).length > 110) {
    push(errors, `${label} ${type}: headline > 110 chars (Google trunca)`,
      { field: "headline", rule: "article.headline.maxLen" });
  }
  if (!authorName(node.author)) {
    push(errors, `${label} ${type}: faltando author (string ou {name})`,
      { field: "author", rule: "article.author" });
  }
  if (!node.datePublished) {
    push(errors, `${label} ${type}: faltando datePublished`,
      { field: "datePublished", rule: "article.datePublished" });
  } else if (!ISO_DATE_RE.test(String(node.datePublished))) {
    push(errors, `${label} ${type}: datePublished não está em ISO 8601 (${node.datePublished})`,
      { field: "datePublished", rule: "article.datePublished.iso8601" });
  }
  if (node.dateModified && !ISO_DATE_RE.test(String(node.dateModified))) {
    push(errors, `${label} ${type}: dateModified não está em ISO 8601 (${node.dateModified})`,
      { field: "dateModified", rule: "article.dateModified.iso8601" });
  }
  if (!hasImage(node.image)) {
    push(errors, `${label} ${type}: faltando image (URL, array ou ImageObject)`,
      { field: "image", rule: "article.image" });
  }
}

/**
 * URL fields cujo valor precisa ser URL absoluta (http/https).
 * Se strict=true, exige https. Se canonicalHost for informado, URLs que
 * apontem para o próprio site (mesmo apex sem `www.`, com trailing slash
 * divergente, etc.) devem bater exatamente com o host canônico.
 */
const URL_FIELDS = new Set([
  "@id", "url", "logo", "image", "sameAs", "item",
  "mainEntityOfPage", "contentUrl", "thumbnailUrl", "identifier",
  "significantLink", "significantLinks", "primaryImageOfPage",
  "potentialAction", "target",
]);

// Hosts "irmãos" (mesmo site) que devem ser normalizados para o canonicalHost.
// Ex.: canonicalHost="www.patroseguros.com.br" → "patroseguros.com.br" é o mesmo site.
function siblingHosts(canonicalHost) {
  if (!canonicalHost) return new Set();
  const bare = canonicalHost.replace(/^www\./, "");
  return new Set([bare, `www.${bare}`]);
}

function extractUrlLike(v) {
  if (typeof v === "string") return [v];
  if (!v || typeof v !== "object") return [];
  if (Array.isArray(v)) return v.flatMap(extractUrlLike);
  const out = [];
  if (typeof v["@id"] === "string") out.push(v["@id"]);
  if (typeof v.url === "string") out.push(v.url);
  return out;
}

function isJsonLdInternalRef(url) {
  // JSON-LD permite @id como fragmento local (#organization) ou URN.
  return /^#/.test(url) || /^urn:/i.test(url);
}

/**
 * Percorre recursivamente o nó e valida cada campo listado em URL_FIELDS.
 * Regras:
 *   1. URL deve ser absoluta http(s) (rejeita relativa / protocolo ausente).
 *   2. Se options.strict: rejeita http:// (exige https).
 *   3. Se options.canonicalHost: URLs no mesmo site (hosts irmãos) precisam
 *      usar exatamente o host canônico (evita mix www / apex, http/https).
 */
export function validateUrls(node, errors, label, options = {}) {
  const { strict = false, canonicalHost = null } = options;
  const siblings = siblingHosts(canonicalHost);

  const check = (raw, path) => {
    if (typeof raw !== "string" || !raw.trim()) return;
    if (isJsonLdInternalRef(raw)) return;
    // Precisa ter esquema absoluto http/https
    if (!/^https?:\/\//i.test(raw)) {
      push(errors, `${label}: ${path} não é URL absoluta http(s) (recebido "${raw}")`,
        { field: path, rule: "url.absolute" });
      return;
    }
    let u;
    try { u = new URL(raw); } catch {
      push(errors, `${label}: ${path} URL malformada ("${raw}")`,
        { field: path, rule: "url.malformed" });
      return;
    }
    if (strict && u.protocol !== "https:") {
      push(errors, `${label}: ${path} deve usar https (recebido "${raw}")`,
        { field: path, rule: "url.https" });
    }
    if (canonicalHost && siblings.has(u.host) && u.host !== canonicalHost) {
      push(errors, `${label}: ${path} host inconsistente com canônico — esperado "${canonicalHost}", recebido "${u.host}"`,
        { field: path, rule: "url.canonicalHost" });
    }
  };

  const walk = (n, base) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) { n.forEach((item, i) => walk(item, `${base}[${i}]`)); return; }
    for (const [k, v] of Object.entries(n)) {
      const path = base ? `${base}.${k}` : k;
      if (URL_FIELDS.has(k)) {
        const urls = extractUrlLike(v);
        if (Array.isArray(v)) {
          v.forEach((it, i) => {
            const sub = `${path}[${i}]`;
            extractUrlLike(it).forEach((u) => check(u, sub));
            // continua recursando estruturas aninhadas dentro do array
            if (it && typeof it === "object" && !Array.isArray(it)) walk(it, sub);
          });
        } else {
          urls.forEach((u) => check(u, path));
          if (v && typeof v === "object" && !Array.isArray(v)) walk(v, path);
        }
      } else if (v && typeof v === "object") {
        walk(v, path);
      }
    }
  };

  walk(node, "");
}

/**
 * WebSite — rich results (Sitelinks Search Box).
 *   Requer: name, url absoluta.
 *   Se potentialAction for SearchAction, exige target.urlTemplate contendo
 *   {search_term_string} e query-input="required name=search_term_string".
 */
export function validateWebSite(node, errors, label, options = {}) {
  const { strict = false } = options;
  if (!node.name) push(errors, `${label} WebSite: faltando name`,
    { field: "name", rule: "website.name" });
  if (!node.url) push(errors, `${label} WebSite: faltando url`,
    { field: "url", rule: "website.url" });
  else if (strict && !/^https:\/\//i.test(String(node.url))) {
    push(errors, `${label} WebSite: url deve ser https (recebido "${node.url}")`,
      { field: "url", rule: "website.url.https" });
  }
  const actions = node.potentialAction
    ? (Array.isArray(node.potentialAction) ? node.potentialAction : [node.potentialAction])
    : [];
  actions.forEach((a, i) => {
    const t = Array.isArray(a?.["@type"]) ? a["@type"][0] : a?.["@type"];
    if (t !== "SearchAction") return;
    const target = a.target;
    const urlTemplate = typeof target === "string" ? target : target?.urlTemplate;
    if (!urlTemplate) {
      push(errors, `${label} WebSite: potentialAction[${i}].target.urlTemplate ausente`,
        { field: `potentialAction[${i}].target.urlTemplate`, rule: "website.searchAction.urlTemplate" });
    } else if (!/\{search_term_string\}/.test(urlTemplate)) {
      push(errors, `${label} WebSite: potentialAction[${i}].target.urlTemplate precisa conter {search_term_string}`,
        { field: `potentialAction[${i}].target.urlTemplate`, rule: "website.searchAction.placeholder" });
    }
    const qi = a["query-input"];
    if (typeof qi !== "string" || !/^required\s+name=search_term_string$/.test(qi)) {
      push(errors, `${label} WebSite: potentialAction[${i}]["query-input"] deve ser "required name=search_term_string"`,
        { field: `potentialAction[${i}].query-input`, rule: "website.searchAction.queryInput" });
    }
  });
}

/**
 * SiteNavigationElement — usado para descrever menus globais.
 * Aceita nó único ou array; cada elemento precisa de name + url absoluta.
 * Recomenda position quando emitido em @graph para preservar ordem.
 */
export function validateSiteNavigation(node, errors, label) {
  const list = Array.isArray(node) ? node : [node];
  list.forEach((n, i) => {
    const path = list.length > 1 ? `[${i}]` : "";
    if (!n?.name) push(errors, `${label} SiteNavigationElement${path}: faltando name`,
      { field: `${path || "root"}.name`, rule: "siteNav.name" });
    if (!n?.url) push(errors, `${label} SiteNavigationElement${path}: faltando url`,
      { field: `${path || "root"}.url`, rule: "siteNav.url" });
    else if (!/^https?:\/\//i.test(String(n.url))) {
      push(errors, `${label} SiteNavigationElement${path}: url deve ser absoluta http(s) (recebido "${n.url}")`,
        { field: `${path || "root"}.url`, rule: "siteNav.url.absolute" });
    }
  });
}

export function validateNode(node, errors, label = "root", options = {}) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n, i) => validateNode(n, errors, `${label}[${i}]`, options));
    return;
  }
  if (!node["@context"]) push(errors, `${label}: faltando @context`,
    { field: "@context", rule: "jsonld.context" });
  if (Array.isArray(node["@graph"])) {
    node["@graph"].forEach((n, i) => validateNode({ "@context": node["@context"], ...n }, errors, `${label}@graph[${i}]`, options));
    return;
  }
  if (!node["@type"]) { push(errors, `${label}: faltando @type`,
    { field: "@type", rule: "jsonld.type" }); return; }
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  const type = types[0];
  if (type === "BreadcrumbList") validateBreadcrumb(node, errors, label);
  else if (types.some((t) => t === "LocalBusiness" || t === "InsuranceAgency")) validateLocalBusiness(node, errors, label, options);
  else if (type === "Organization") validateOrganization(node, errors, label, options);
  else if (type === "FAQPage") validateFAQ(node, errors, label);
  else if (type === "HowTo") validateHowTo(node, errors, label);
  else if (type === "Article" || type === "BlogPosting" || type === "NewsArticle") validateArticle(node, errors, label);
  else if (type === "WebSite") validateWebSite(node, errors, label, options);
  else if (type === "SiteNavigationElement") validateSiteNavigation(node, errors, label);
  // Verificação genérica de URLs em qualquer nó tipado
  validateUrls(node, errors, label, options);
}

export function validateJsonLdBlock(raw, label = "block", options = {}) {
  const errors = [];
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch (e) {
    return [fmt(`${label}: JSON inválido — ${e.message}`,
      { field: "(root)", rule: "jsonld.parse" })];
  }
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