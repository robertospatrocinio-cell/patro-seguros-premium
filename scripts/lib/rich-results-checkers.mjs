/**
 * Regras de elegibilidade a Google Rich Results — extraídas do
 * `scripts/validate-google-rich-results.mjs` para permitir testes
 * unitários e reuso. Cada checker recebe um nó JSON-LD e devolve
 * `{ req: string[], rec: string[], unsupported?: boolean }`.
 *
 *   req.length > 0  → ineligible (não gera rich result)
 *   rec.length > 0  → eligible-warn (gera, mas Google recomenda ajustes)
 *   unsupported     → @type reconhecido porém sem rich result no Google
 */

export const typeOf = (n) => {
  const t = n?.["@type"];
  return Array.isArray(t) ? t : t ? [t] : [];
};
export const hasType = (n, t) => typeOf(n).includes(t);
export const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);
export const isAbsUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);
export const isIso8601Date = (v) =>
  typeof v === "string" &&
  /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/.test(v);
export const isIso8601Duration = (v) =>
  typeof v === "string" && /^P(?:\d+[YMWD])*(?:T(?:\d+[HMS])+)?$/.test(v) && v !== "P";
export const isNonEmptyStr = (v) => typeof v === "string" && v.trim().length > 0;
export const isFiniteNumber = (v) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n);
};

export function flattenNodes(root, out = []) {
  if (!root) return out;
  if (Array.isArray(root)) { root.forEach((n) => flattenNodes(n, out)); return out; }
  if (!isPlainObj(root)) return out;
  if (Array.isArray(root["@graph"])) root["@graph"].forEach((n) => flattenNodes(n, out));
  if (root["@type"]) out.push(root);
  return out;
}

export function extractImageUrl(image) {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (Array.isArray(image)) return image.map(extractImageUrl).find(Boolean) ?? null;
  if (isPlainObj(image)) return image.url || image["@id"] || null;
  return null;
}

// ---------- checkers --------------------------------------------------------

export function checkBreadcrumbList(n) {
  const req = [], rec = [];
  const items = n.itemListElement;
  if (!Array.isArray(items) || items.length === 0) {
    req.push("itemListElement ausente/vazio");
    return { req, rec };
  }
  if (items.length < 2) req.push("Google exige ≥ 2 itens (recebido " + items.length + ")");
  items.forEach((it, i) => {
    if (it?.position !== i + 1) req.push(`position[${i}] esperado ${i + 1}, recebido ${it?.position}`);
    const name = it?.name || it?.item?.name;
    if (!name) req.push(`item[${i}] sem name`);
    const url = typeof it?.item === "string" ? it.item : it?.item?.["@id"] || it?.item?.url;
    if (i < items.length - 1 && !isAbsUrl(url)) req.push(`item[${i}].item precisa ser URL absoluta`);
  });
  return { req, rec };
}

export function checkFAQPage(n) {
  const req = [], rec = [];
  const items = n.mainEntity;
  if (!Array.isArray(items) || items.length === 0) { req.push("mainEntity vazio"); return { req, rec }; }
  if (items.length < 2) rec.push("Google recomenda ≥ 2 Question (recebido " + items.length + ")");
  items.forEach((q, i) => {
    if (!hasType(q, "Question")) req.push(`mainEntity[${i}].@type ≠ Question`);
    const name = typeof q?.name === "string" ? q.name.trim() : "";
    if (!name) req.push(`mainEntity[${i}].name ausente`);
    else if (name.length > 300) rec.push(`mainEntity[${i}].name > 300 chars (Google trunca)`);
    const ans = q?.acceptedAnswer;
    if (!ans) req.push(`mainEntity[${i}].acceptedAnswer ausente`);
    else {
      if (!hasType(ans, "Answer")) req.push(`mainEntity[${i}].acceptedAnswer.@type ≠ Answer`);
      const text = typeof ans?.text === "string" ? ans.text.trim() : "";
      if (!text) req.push(`mainEntity[${i}].acceptedAnswer.text ausente`);
    }
  });
  return { req, rec };
}

export function checkHowTo(n) {
  const req = [], rec = [];
  if (!n.name || !String(n.name).trim()) req.push("name ausente");
  const steps = n.step;
  if (!Array.isArray(steps) || steps.length === 0) { req.push("step[] ausente/vazio"); return { req, rec }; }
  steps.forEach((s, i) => {
    if (!hasType(s, "HowToStep")) req.push(`step[${i}].@type ≠ HowToStep`);
    if (!s?.name) req.push(`step[${i}].name ausente`);
    if (!s?.text && !s?.itemListElement) req.push(`step[${i}] sem text nem itemListElement`);
  });
  if (n.totalTime && !isIso8601Duration(n.totalTime))
    req.push(`totalTime "${n.totalTime}" não é duração ISO 8601`);
  if (!extractImageUrl(n.image)) rec.push("image ausente (recomendado para elegibilidade)");
  return { req, rec };
}

export function checkArticle(n) {
  const req = [], rec = [];
  const headline = typeof n.headline === "string" ? n.headline.trim() : "";
  if (!headline) req.push("headline ausente");
  else if (headline.length > 110) rec.push("headline > 110 chars (Google trunca)");
  if (!n.datePublished) req.push("datePublished ausente");
  else if (!isIso8601Date(n.datePublished)) req.push(`datePublished "${n.datePublished}" fora do ISO 8601`);
  if (n.dateModified && !isIso8601Date(n.dateModified))
    req.push(`dateModified "${n.dateModified}" fora do ISO 8601`);
  const author = n.author;
  const authorOk = typeof author === "string" ? !!author.trim()
    : Array.isArray(author) ? author.some((a) => a?.name)
    : isPlainObj(author) ? !!author.name : false;
  if (!authorOk) req.push("author ausente ou sem name");
  const image = extractImageUrl(n.image);
  if (!isAbsUrl(image)) req.push("image ausente ou não-absoluta (Google exige)");
  const publisher = n.publisher;
  if (!isPlainObj(publisher)) req.push("publisher ausente");
  else {
    if (!publisher.name) req.push("publisher.name ausente");
    const logo = extractImageUrl(publisher.logo);
    if (!isAbsUrl(logo)) req.push("publisher.logo (ImageObject.url) ausente/não-absoluta");
  }
  return { req, rec };
}

export function checkLocalBusiness(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  const image = extractImageUrl(n.image) || extractImageUrl(n.logo);
  if (!isAbsUrl(image)) req.push("image (ou logo) ausente / não-absoluta");
  const addr = n.address;
  if (!isPlainObj(addr)) req.push("address ausente");
  else {
    ["streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"].forEach((k) => {
      if (!addr[k]) req.push(`address.${k} ausente`);
    });
  }
  if (!n.telephone) req.push("telephone ausente");
  if (!n.url) rec.push("url (site oficial) recomendado");
  if (n.geo) {
    const lat = Number(n.geo.latitude), lng = Number(n.geo.longitude);
    if (Number.isNaN(lat) || lat < -90 || lat > 90) req.push("geo.latitude inválida");
    if (Number.isNaN(lng) || lng < -180 || lng > 180) req.push("geo.longitude inválida");
  } else {
    rec.push("geo (latitude/longitude) recomendado");
  }
  if (!n.priceRange) rec.push("priceRange recomendado");
  if (n.aggregateRating) {
    const r = Number(n.aggregateRating.ratingValue);
    if (Number.isNaN(r) || r < 0 || r > 5) req.push("aggregateRating.ratingValue fora de 0..5");
    if (!n.aggregateRating.reviewCount && !n.aggregateRating.ratingCount)
      req.push("aggregateRating precisa de reviewCount ou ratingCount");
  }
  return { req, rec };
}

export function checkOrganization(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!isAbsUrl(n.url)) req.push("url absoluta ausente");
  const logo = extractImageUrl(n.logo);
  if (!isAbsUrl(logo)) req.push("logo absoluta ausente (bloqueia rich result de Logo)");
  if (!Array.isArray(n.sameAs) || n.sameAs.length === 0) rec.push("sameAs[] recomendado (perfis oficiais)");
  return { req, rec };
}

export function checkWebSite(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!isAbsUrl(n.url)) req.push("url absoluta ausente");
  const actions = n.potentialAction
    ? (Array.isArray(n.potentialAction) ? n.potentialAction : [n.potentialAction])
    : [];
  const search = actions.find((a) => hasType(a, "SearchAction"));
  if (search) {
    const tpl = typeof search.target === "string" ? search.target : search.target?.urlTemplate;
    if (!tpl || !/\{search_term_string\}/.test(tpl))
      req.push("SearchAction.target.urlTemplate precisa conter {search_term_string}");
    if (search["query-input"] !== "required name=search_term_string")
      req.push('SearchAction["query-input"] deve ser "required name=search_term_string"');
  }
  return { req, rec };
}

export function checkService(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!n.provider) req.push("provider ausente");
  else if (isPlainObj(n.provider) && !n.provider.name && !n.provider["@id"])
    req.push("provider sem name/@id");
  return { req, rec, unsupported: true };
}

export function checkReview(n) {
  const req = [], rec = [];
  const item = n.itemReviewed;
  if (!item) req.push("itemReviewed ausente");
  else if (isPlainObj(item) && !item.name && !item["@id"]) req.push("itemReviewed sem name/@id");
  const author = n.author;
  const authorOk = typeof author === "string" ? !!author.trim()
    : Array.isArray(author) ? author.some((a) => a?.name)
    : isPlainObj(author) ? !!author.name : false;
  if (!authorOk) req.push("author ausente ou sem name");
  const r = n.reviewRating;
  if (!isPlainObj(r)) req.push("reviewRating ausente");
  else {
    if (!isFiniteNumber(r.ratingValue)) req.push("reviewRating.ratingValue ausente/inválido");
    else {
      const rv = Number(r.ratingValue);
      const bestRaw = r.bestRating !== undefined ? Number(r.bestRating) : 5;
      const worstRaw = r.worstRating !== undefined ? Number(r.worstRating) : 1;
      if (rv < worstRaw || rv > bestRaw) req.push(`reviewRating.ratingValue ${rv} fora de [${worstRaw}..${bestRaw}]`);
    }
    if (r.bestRating === undefined) rec.push("reviewRating.bestRating recomendado");
  }
  if (!n.datePublished) rec.push("datePublished recomendado");
  else if (!isIso8601Date(n.datePublished)) req.push("datePublished fora do ISO 8601");
  return { req, rec };
}

export function checkItemList(n) {
  const req = [], rec = [];
  const items = n.itemListElement;
  if (!Array.isArray(items) || items.length === 0) { req.push("itemListElement ausente/vazio"); return { req, rec }; }
  if (items.length < 2) rec.push("Google recomenda ≥ 2 itens para carousel (recebido " + items.length + ")");
  items.forEach((it, i) => {
    if (!hasType(it, "ListItem")) req.push(`itemListElement[${i}].@type ≠ ListItem`);
    if (it?.position !== i + 1) req.push(`itemListElement[${i}].position esperado ${i + 1}, recebido ${it?.position}`);
    const url = typeof it?.url === "string" ? it.url
      : typeof it?.item === "string" ? it.item
      : it?.item?.url || it?.item?.["@id"];
    const nested = isPlainObj(it?.item) && (it.item["@type"] || it.item.name);
    if (!isAbsUrl(url) && !nested) req.push(`itemListElement[${i}] precisa de url absoluta ou item aninhado válido`);
  });
  return { req, rec };
}

export function checkOffer(n) {
  const req = [], rec = [];
  if (!isFiniteNumber(n.price) && !n.priceSpecification) req.push("price (ou priceSpecification) ausente");
  if (!isNonEmptyStr(n.priceCurrency) && !n.priceSpecification?.priceCurrency) req.push("priceCurrency ausente");
  if (!n.availability) rec.push("availability recomendado (schema.org/ItemAvailability)");
  if (!n.url) rec.push("url recomendado");
  if (n.priceValidUntil && !isIso8601Date(n.priceValidUntil))
    req.push(`priceValidUntil "${n.priceValidUntil}" fora do ISO 8601`);
  return { req, rec };
}

export function checkAggregateOffer(n) {
  const req = [], rec = [];
  if (!isFiniteNumber(n.lowPrice)) req.push("lowPrice ausente/inválido");
  if (!isNonEmptyStr(n.priceCurrency)) req.push("priceCurrency ausente");
  if (!isFiniteNumber(n.offerCount)) rec.push("offerCount recomendado");
  if (n.highPrice !== undefined && !isFiniteNumber(n.highPrice)) req.push("highPrice inválido");
  return { req, rec };
}

export function checkProfilePage(n) {
  const req = [], rec = [];
  const me = n.mainEntity;
  if (!isPlainObj(me)) req.push("mainEntity (Person/Organization) ausente");
  else if (!hasType(me, "Person") && !hasType(me, "Organization"))
    req.push("mainEntity deve ser Person ou Organization");
  else if (!me.name) req.push("mainEntity.name ausente");
  if (!n.dateCreated && !n.dateModified) rec.push("dateCreated ou dateModified recomendado");
  return { req, rec };
}

export function checkPerson(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!n.url && !n.sameAs) rec.push("url ou sameAs recomendado");
  if (!extractImageUrl(n.image)) rec.push("image recomendada");
  return { req, rec };
}

export function checkPlace(n) {
  const req = [], rec = [];
  if (!n.name && !n.address) req.push("name ou address ausente");
  if (isPlainObj(n.geo)) {
    const lat = Number(n.geo.latitude), lng = Number(n.geo.longitude);
    if (Number.isNaN(lat) || lat < -90 || lat > 90) req.push("geo.latitude inválida");
    if (Number.isNaN(lng) || lng < -180 || lng > 180) req.push("geo.longitude inválida");
  }
  return { req, rec };
}

export function checkWebPage(n) {
  const req = [], rec = [];
  if (!n.name && !n.headline) req.push("name (ou headline) ausente");
  if (!isAbsUrl(n.url) && !isAbsUrl(n["@id"])) rec.push("url absoluta recomendada");
  if (n.speakable && !isPlainObj(n.speakable) && !Array.isArray(n.speakable))
    req.push("speakable inválido (esperado SpeakableSpecification)");
  return { req, rec };
}

export function checkCollectionPage(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  // Só recomendamos hasPart/mainEntity quando o nó realmente descreve
  // uma coleção. Sinais de "coleção real": presença de campos que só
  // fazem sentido em listagens (numberOfItems, about[], significantLink[],
  // itemListElement, keywords) OU um @id/url que aponta para uma rota
  // com semântica de hub (/hub-*, /hubs/, /categorias, /solucoes-*,
  // /seguradoras, /seguradoras-parceiras, /artigos, /blog).
  // Para páginas comuns tipadas como CollectionPage (ex.: landing sem
  // filhos indexáveis), não emitimos warning — tratamos como WebPage.
  if (!n.hasPart && !n.mainEntity) {
    const url = String(n.url || n["@id"] || "");
    const looksLikeHub =
      /\/(hub-|hubs\/|categorias?\/|solucoes-|seguradoras(-parceiras)?(\/|#|$)|artigos(\/|#|$)|blog(\/|#|$))/i.test(url);
    const hasCollectionSignal =
      Number.isFinite(n.numberOfItems) ||
      Array.isArray(n.about) ||
      Array.isArray(n.significantLink) ||
      Array.isArray(n.itemListElement) ||
      Array.isArray(n.keywords);
    if (looksLikeHub || hasCollectionSignal) {
      rec.push("hasPart ou mainEntity recomendado");
    }
  }
  return { req, rec };
}

export function checkImageObject(n) {
  const req = [], rec = [];
  const url = n.contentUrl || n.url || n["@id"];
  if (!isAbsUrl(url)) req.push("contentUrl/url absoluta ausente");
  if (!isFiniteNumber(n.width) || !isFiniteNumber(n.height)) rec.push("width/height recomendados");
  return { req, rec };
}

export function checkContactPoint(n) {
  const req = [], rec = [];
  if (!n.telephone && !n.email) req.push("telephone ou email ausente");
  if (!n.contactType) rec.push("contactType recomendado");
  return { req, rec };
}

export function checkSpeakable(n) {
  const req = [], rec = [];
  if (!n.xpath && !n.cssSelector) req.push("xpath ou cssSelector ausente");
  return { req, rec };
}

export function checkSiteNav(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!isAbsUrl(n.url)) req.push("url absoluta ausente");
  return { req, rec, unsupported: true };
}

export const CHECKERS = {
  BreadcrumbList: checkBreadcrumbList,
  FAQPage: checkFAQPage,
  QAPage: checkFAQPage,
  HowTo: checkHowTo,
  Article: checkArticle,
  BlogPosting: checkArticle,
  NewsArticle: checkArticle,
  LocalBusiness: checkLocalBusiness,
  InsuranceAgency: checkLocalBusiness,
  Organization: checkOrganization,
  GovernmentOrganization: checkOrganization,
  WebSite: checkWebSite,
  Service: checkService,
  Review: checkReview,
  ItemList: checkItemList,
  Offer: checkOffer,
  AggregateOffer: checkAggregateOffer,
  ProfilePage: checkProfilePage,
  Person: checkPerson,
  Place: checkPlace,
  WebPage: checkWebPage,
  CollectionPage: checkCollectionPage,
  ImageObject: checkImageObject,
  ContactPoint: checkContactPoint,
  SpeakableSpecification: checkSpeakable,
  SiteNavigationElement: checkSiteNav,
};