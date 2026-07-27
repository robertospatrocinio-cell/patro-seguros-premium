/**
 * Vocabulário esperado das mensagens `req` e `rec` de cada checker de
 * Google Rich Results. Cada @type mapeia para dois arrays de RegExp:
 *
 *   { req: [/.../], rec: [/.../] }
 *
 * REGRA CENTRAL: toda mensagem emitida por `CHECKERS[type](node)` DEVE
 * casar com pelo menos um padrão da lista correspondente. Se um checker
 * passa a emitir uma mensagem nova (ou reescreve uma antiga), o teste
 * `rich-results-message-patterns.test.mjs` quebra.
 *
 * Por que existe:
 *   - O pipeline (`validate-google-rich-results.mjs`, dashboards em
 *     `dist/rich-results-report.html`, painéis admin) faz `grep` em
 *     substrings dessas mensagens ("url absoluta", "≥ 2 Question",
 *     "publisher.logo") para classificar rich results e priorizar
 *     correções. Uma reformulação silenciosa (ex.: trocar "url absoluta
 *     ausente" por "URL faltando") quebra o pipeline sem quebrar
 *     nenhum teste — os checkers continuam retornando `req.length > 0`,
 *     só que as métricas passam a errar de categoria.
 *   - No fuzzing, garantimos que qualquer entrada inválida produza um
 *     `req`/`rec` reconhecível — sem "veredictos fantasma" com wording
 *     inédito escapando pelas rachaduras.
 *
 * Como adicionar / mudar mensagens:
 *   1. Atualize o checker em `rich-results-checkers.mjs`.
 *   2. Adicione a nova RegExp aqui (ou ajuste a existente).
 *   3. Rode `bunx vitest run scripts/lib/rich-results-message-patterns.test.mjs`.
 *   4. Se o pipeline (validador, dashboard) depende do wording antigo,
 *      atualize-o na mesma PR — este teste é o gatilho para lembrar.
 */

// Padrões compartilhados (reutilizados entre checkers similares).
const AUTHOR_MISSING = /^author ausente ou sem name$/;
const NAME_MISSING = /^name ausente$/;
const URL_ABS_MISSING = /^url absoluta ausente$/;
const GEO_LAT_INVALID = /^geo\.latitude inválida$/;
const GEO_LNG_INVALID = /^geo\.longitude inválida$/;
const DATE_ISO_INVALID = /fora do ISO 8601$/;

const ARTICLE_PATTERNS = {
  req: [
    /^headline ausente$/,
    /^datePublished ausente$/,
    /^datePublished ".*" fora do ISO 8601$/,
    /^dateModified ".*" fora do ISO 8601$/,
    AUTHOR_MISSING,
    /^image ausente ou não-absoluta \(Google exige\)$/,
    /^publisher ausente$/,
    /^publisher\.name ausente$/,
    /^publisher\.logo \(ImageObject\.url\) ausente\/não-absoluta$/,
  ],
  rec: [
    /^headline > 110 chars \(Google trunca\)$/,
  ],
};

const LOCALBUSINESS_PATTERNS = {
  req: [
    NAME_MISSING,
    /^image \(ou logo\) ausente \/ não-absoluta$/,
    /^address ausente$/,
    /^address\.(streetAddress|addressLocality|addressRegion|postalCode|addressCountry) ausente$/,
    /^telephone ausente$/,
    GEO_LAT_INVALID,
    GEO_LNG_INVALID,
    /^aggregateRating\.ratingValue fora de 0\.\.5$/,
    /^aggregateRating precisa de reviewCount ou ratingCount$/,
  ],
  rec: [
    /^url \(site oficial\) recomendado$/,
    /^geo \(latitude\/longitude\) recomendado$/,
    /^priceRange recomendado$/,
  ],
};

const ORGANIZATION_PATTERNS = {
  req: [
    NAME_MISSING,
    URL_ABS_MISSING,
    /^logo absoluta ausente \(bloqueia rich result de Logo\)$/,
  ],
  rec: [
    /^sameAs\[\] recomendado \(perfis oficiais\)$/,
  ],
};

export const MESSAGE_PATTERNS = {
  BreadcrumbList: {
    req: [
      /^itemListElement ausente\/vazio$/,
      /^Google exige ≥ 2 itens \(recebido \d+\)$/,
      /^position\[\d+\] esperado \d+, recebido .+$/,
      /^item\[\d+\] sem name$/,
      /^item\[\d+\]\.item precisa ser URL absoluta$/,
    ],
    rec: [],
  },
  FAQPage: {
    req: [
      /^mainEntity vazio$/,
      /^mainEntity\[\d+\]\.@type ≠ Question$/,
      /^mainEntity\[\d+\]\.name ausente$/,
      /^mainEntity\[\d+\]\.acceptedAnswer ausente$/,
      /^mainEntity\[\d+\]\.acceptedAnswer\.@type ≠ Answer$/,
      /^mainEntity\[\d+\]\.acceptedAnswer\.text ausente$/,
    ],
    rec: [
      /^Google recomenda ≥ 2 Question \(recebido \d+\)$/,
      /^mainEntity\[\d+\]\.name > 300 chars \(Google trunca\)$/,
    ],
  },
  HowTo: {
    req: [
      NAME_MISSING,
      /^step\[\] ausente\/vazio$/,
      /^step\[\d+\]\.@type ≠ HowToStep$/,
      /^step\[\d+\]\.name ausente$/,
      /^step\[\d+\] sem text nem itemListElement$/,
      /^totalTime ".*" não é duração ISO 8601$/,
    ],
    rec: [
      /^image ausente \(recomendado para elegibilidade\)$/,
    ],
  },
  Article: ARTICLE_PATTERNS,
  BlogPosting: ARTICLE_PATTERNS,
  NewsArticle: ARTICLE_PATTERNS,
  LocalBusiness: LOCALBUSINESS_PATTERNS,
  InsuranceAgency: LOCALBUSINESS_PATTERNS,
  Organization: ORGANIZATION_PATTERNS,
  GovernmentOrganization: ORGANIZATION_PATTERNS,
  WebSite: {
    req: [
      NAME_MISSING,
      URL_ABS_MISSING,
      /^SearchAction\.target\.urlTemplate precisa conter \{search_term_string\}$/,
      /^SearchAction\["query-input"\] deve ser "required name=search_term_string"$/,
    ],
    rec: [],
  },
  Service: {
    req: [
      NAME_MISSING,
      /^provider ausente$/,
      /^provider sem name\/@id$/,
    ],
    rec: [],
  },
  Review: {
    req: [
      /^itemReviewed ausente$/,
      /^itemReviewed sem name\/@id$/,
      AUTHOR_MISSING,
      /^reviewRating ausente$/,
      /^reviewRating\.ratingValue ausente\/inválido$/,
      /^reviewRating\.ratingValue -?\d+(\.\d+)? fora de \[-?\d+(\.\d+)?\.\.-?\d+(\.\d+)?\]$/,
      /^datePublished fora do ISO 8601$/,
    ],
    rec: [
      /^reviewRating\.bestRating recomendado$/,
      /^datePublished recomendado$/,
    ],
  },
  ItemList: {
    req: [
      /^itemListElement ausente\/vazio$/,
      /^itemListElement\[\d+\]\.@type ≠ ListItem$/,
      /^itemListElement\[\d+\]\.position esperado \d+, recebido .+$/,
      /^itemListElement\[\d+\] precisa de url absoluta ou item aninhado válido$/,
    ],
    rec: [
      /^Google recomenda ≥ 2 itens para carousel \(recebido \d+\)$/,
    ],
  },
  Offer: {
    req: [
      /^price \(ou priceSpecification\) ausente$/,
      /^priceCurrency ausente$/,
      /^priceValidUntil ".*" fora do ISO 8601$/,
    ],
    rec: [
      /^availability recomendado \(schema\.org\/ItemAvailability\)$/,
      /^url recomendado$/,
    ],
  },
  AggregateOffer: {
    req: [
      /^lowPrice ausente\/inválido$/,
      /^priceCurrency ausente$/,
      /^highPrice inválido$/,
    ],
    rec: [
      /^offerCount recomendado$/,
    ],
  },
  ProfilePage: {
    req: [
      /^mainEntity \(Person\/Organization\) ausente$/,
      /^mainEntity deve ser Person ou Organization$/,
      /^mainEntity\.name ausente$/,
    ],
    rec: [
      /^dateCreated ou dateModified recomendado$/,
    ],
  },
  Person: {
    req: [NAME_MISSING],
    rec: [
      /^url ou sameAs recomendado$/,
      /^image recomendada$/,
    ],
  },
  Place: {
    req: [
      /^name ou address ausente$/,
      GEO_LAT_INVALID,
      GEO_LNG_INVALID,
    ],
    rec: [],
  },
  WebPage: {
    req: [
      /^name \(ou headline\) ausente$/,
      /^speakable inválido \(esperado SpeakableSpecification\)$/,
    ],
    rec: [
      /^url absoluta recomendada$/,
    ],
  },
  CollectionPage: {
    req: [NAME_MISSING],
    rec: [/^hasPart ou mainEntity recomendado$/],
  },
  ImageObject: {
    req: [/^contentUrl\/url absoluta ausente$/],
    rec: [/^width\/height recomendados$/],
  },
  ContactPoint: {
    req: [/^telephone ou email ausente$/],
    rec: [/^contactType recomendado$/],
  },
  SpeakableSpecification: {
    req: [/^xpath ou cssSelector ausente$/],
    rec: [],
  },
  SiteNavigationElement: {
    req: [NAME_MISSING, URL_ABS_MISSING],
    rec: [],
  },
};

// QAPage compartilha o checker (e portanto o vocabulário) do FAQPage.
MESSAGE_PATTERNS.QAPage = MESSAGE_PATTERNS.FAQPage;

// Silencia lints falsos-positivos ao reutilizar a mesma constante.
void DATE_ISO_INVALID;

/**
 * Retorna a lista de mensagens que NÃO casam com nenhum padrão esperado.
 * Vazia = tudo OK. Não-vazia = wording desconhecido = falha do teste.
 */
export function findUnknownMessages(type, kind, messages) {
  const patterns = MESSAGE_PATTERNS[type]?.[kind] ?? [];
  if (patterns.length === 0) return messages.length > 0 ? messages.slice() : [];
  const unknown = [];
  for (const msg of messages) {
    if (!patterns.some((re) => re.test(msg))) unknown.push(msg);
  }
  return unknown;
}