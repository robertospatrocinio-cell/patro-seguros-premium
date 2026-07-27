import { describe, it, expect } from "vitest";
import {
  isAbsUrl,
  extractImageUrl,
  checkBreadcrumbList,
  checkFAQPage,
  checkOrganization,
  checkImageObject,
  checkArticle,
  checkLocalBusiness,
} from "./rich-results-checkers.mjs";

/**
 * Testes focados nas regras de URL (absoluta × relativa × esquemas
 * exóticos) e nos casos edge de `image` / `ImageObject` em
 * BreadcrumbList, FAQPage e Organization.
 *
 * Complementa `rich-results-checkers.test.mjs`, que cobre os contratos
 * "felizes" desses três tipos. Aqui isolamos as bordas: http vs https,
 * data:/blob:, protocol-relative, trailing whitespace, ImageObject
 * aninhado, arrays mistos de imagens, etc.
 */

const HTTPS = "https://www.patroseguros.com.br";
const HTTP = "http://www.patroseguros.com.br";

const hasReq = (r, re) => r.req.some((m) => re.test(m));
const noReq = (r) => r.req.length === 0;

// ============================================================================
// isAbsUrl — helper base de todas as regras de URL
// ============================================================================
describe("isAbsUrl — matriz de esquemas", () => {
  it("aceita https:// e http://", () => {
    expect(isAbsUrl("https://a.com/x")).toBe(true);
    expect(isAbsUrl("http://a.com/x")).toBe(true);
  });

  it("aceita variações de case (HTTPS, Http)", () => {
    expect(isAbsUrl("HTTPS://a.com")).toBe(true);
    expect(isAbsUrl("Http://a.com")).toBe(true);
  });

  it("rejeita URLs relativas", () => {
    expect(isAbsUrl("/img/foo.jpg")).toBe(false);
    expect(isAbsUrl("./foo.jpg")).toBe(false);
    expect(isAbsUrl("../foo.jpg")).toBe(false);
    expect(isAbsUrl("foo.jpg")).toBe(false);
  });

  it("rejeita protocol-relative (//cdn/foo)", () => {
    // Google Rich Results exige esquema explícito — //cdn não passa.
    expect(isAbsUrl("//cdn.example.com/x.jpg")).toBe(false);
  });

  it("rejeita data URI, blob URI e file://", () => {
    expect(isAbsUrl("data:image/png;base64,iVBORw0KGgo=")).toBe(false);
    expect(isAbsUrl("blob:https://a.com/uuid")).toBe(false);
    expect(isAbsUrl("file:///tmp/x.jpg")).toBe(false);
  });

  it("rejeita esquemas não-web (mailto, tel, javascript, ftp)", () => {
    expect(isAbsUrl("mailto:a@b.com")).toBe(false);
    expect(isAbsUrl("tel:+5511999999999")).toBe(false);
    expect(isAbsUrl("javascript:void(0)")).toBe(false);
    expect(isAbsUrl("ftp://a.com/x")).toBe(false);
  });

  it("rejeita não-strings e string vazia", () => {
    expect(isAbsUrl("")).toBe(false);
    expect(isAbsUrl(null)).toBe(false);
    expect(isAbsUrl(undefined)).toBe(false);
    expect(isAbsUrl(123)).toBe(false);
    expect(isAbsUrl({ url: "https://a.com" })).toBe(false);
  });
});

// ============================================================================
// extractImageUrl — pull do primeiro URL utilizável de um campo `image`
// ============================================================================
describe("extractImageUrl — variações do campo image", () => {
  it("string simples", () => {
    expect(extractImageUrl("https://a.com/x.jpg")).toBe("https://a.com/x.jpg");
  });

  it("ImageObject com url", () => {
    expect(extractImageUrl({ "@type": "ImageObject", url: "https://a.com/x.jpg" }))
      .toBe("https://a.com/x.jpg");
  });

  it("ImageObject com @id quando url ausente", () => {
    expect(extractImageUrl({ "@type": "ImageObject", "@id": "https://a.com/x.jpg" }))
      .toBe("https://a.com/x.jpg");
  });

  it("prefere url sobre @id quando ambos presentes", () => {
    expect(extractImageUrl({ url: "https://a.com/prefer.jpg", "@id": "https://a.com/id.jpg" }))
      .toBe("https://a.com/prefer.jpg");
  });

  it("array de strings — devolve a primeira truthy", () => {
    expect(extractImageUrl(["", "https://a.com/x.jpg", "https://a.com/y.jpg"]))
      .toBe("https://a.com/x.jpg");
  });

  it("array misto (string vazia, ImageObject) — pula falsy", () => {
    expect(extractImageUrl([null, "", { url: "https://a.com/found.jpg" }]))
      .toBe("https://a.com/found.jpg");
  });

  it("devolve null para input vazio/inválido", () => {
    expect(extractImageUrl(null)).toBeNull();
    expect(extractImageUrl(undefined)).toBeNull();
    expect(extractImageUrl([])).toBeNull();
    expect(extractImageUrl({})).toBeNull();
    expect(extractImageUrl(42)).toBeNull();
  });

  it("propaga URLs não-http (data:/relativas) — validação absoluta é responsabilidade do checker", () => {
    // extractImageUrl é ingênuo por design: só faz pull. A checagem
    // http(s) fica com isAbsUrl no checker. Isso garante que um data
    // URI seja detectado como "presente mas inválido" (req), e não
    // como "ausente" (mensagem errada para o dev).
    expect(extractImageUrl("data:image/png;base64,AAA")).toBe("data:image/png;base64,AAA");
    expect(extractImageUrl("/relativo.jpg")).toBe("/relativo.jpg");
  });
});

// ============================================================================
// BreadcrumbList — item.item precisa ser URL absoluta (exceto último)
// ============================================================================
describe("checkBreadcrumbList — URLs dos itens", () => {
  const mk = (url) => ({
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: url },
      { "@type": "ListItem", position: 2, name: "Atual" }, // último sem URL: ok
    ],
  });

  it("aceita https absoluta", () => {
    expect(noReq(checkBreadcrumbList(mk(`${HTTPS}/`)))).toBe(true);
  });

  it("aceita http absoluta (Google não exige https no schema)", () => {
    expect(noReq(checkBreadcrumbList(mk(`${HTTP}/`)))).toBe(true);
  });

  it("rejeita URL relativa", () => {
    expect(hasReq(checkBreadcrumbList(mk("/seguros")), /URL absoluta/)).toBe(true);
  });

  it("rejeita protocol-relative (//cdn/…)", () => {
    expect(hasReq(checkBreadcrumbList(mk("//www.patroseguros.com.br/x")), /URL absoluta/)).toBe(true);
  });

  it("rejeita data URI", () => {
    expect(hasReq(checkBreadcrumbList(mk("data:text/html,<p>x")), /URL absoluta/)).toBe(true);
  });

  it("aceita item como string direta (não só item.@id/url)", () => {
    // Schema.org permite item ser string; o checker precisa suportar
    // as duas formas para não gerar falso-positivo.
    const r = checkBreadcrumbList({
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${HTTPS}/` },
        { "@type": "ListItem", position: 2, name: "Atual" },
      ],
    });
    expect(noReq(r)).toBe(true);
  });

  it("aceita item como objeto com @id (URL canônica)", () => {
    const r = checkBreadcrumbList({
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",
          item: { "@id": `${HTTPS}/`, name: "Home" } },
        { "@type": "ListItem", position: 2, name: "Atual" },
      ],
    });
    expect(noReq(r)).toBe(true);
  });

  it("aceita item como objeto com url quando @id ausente", () => {
    const r = checkBreadcrumbList({
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",
          item: { url: `${HTTPS}/`, name: "Home" } },
        { "@type": "ListItem", position: 2, name: "Atual" },
      ],
    });
    expect(noReq(r)).toBe(true);
  });

  it("último item PODE omitir URL (regra Google)", () => {
    const r = checkBreadcrumbList({
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${HTTPS}/` },
        { "@type": "ListItem", position: 2, name: "Auto" /* sem item */ },
      ],
    });
    expect(noReq(r)).toBe(true);
  });

  it("penúltimo item NÃO pode omitir URL", () => {
    const r = checkBreadcrumbList({
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home" /* sem item */ },
        { "@type": "ListItem", position: 2, name: "Meio", item: `${HTTPS}/x` },
        { "@type": "ListItem", position: 3, name: "Fim" },
      ],
    });
    expect(hasReq(r, /item\[0\].item precisa ser URL absoluta/)).toBe(true);
  });
});

// ============================================================================
// FAQPage — não tem campo URL, mas queremos garantir que URLs em
// acceptedAnswer.text não falseiem a validação (o checker deve olhar
// apenas para acceptedAnswer.text não-vazio, independente do conteúdo).
// ============================================================================
describe("checkFAQPage — imunidade a URLs no answer.text", () => {
  const q = (text) => ({
    "@type": "Question",
    name: "Pergunta relevante?",
    acceptedAnswer: { "@type": "Answer", text },
  });

  it("aceita answer.text com HTML contendo link https", () => {
    const r = checkFAQPage({
      mainEntity: [
        q('Ver <a href="https://a.com/x">detalhes</a>.'),
        q("Resposta 2 curta e direta."),
      ],
    });
    expect(noReq(r)).toBe(true);
  });

  it("aceita answer.text com data URI embutido no HTML", () => {
    const r = checkFAQPage({
      mainEntity: [
        q('<img src="data:image/png;base64,AAA"/>Resposta.'),
        q("Resposta 2."),
      ],
    });
    expect(noReq(r)).toBe(true);
  });

  it("rejeita answer.text que é só whitespace (não confundir com URL válida)", () => {
    const r = checkFAQPage({ mainEntity: [q("   "), q("Resposta ok.")] });
    expect(hasReq(r, /acceptedAnswer\.text ausente/)).toBe(true);
  });
});

// ============================================================================
// Organization — url absoluta + logo absoluta (bloqueia Logo rich result)
// ============================================================================
describe("checkOrganization — url e logo (ImageObject)", () => {
  const base = { name: "Patro Seguros" };

  it("aprova url + logo https absolutas", () => {
    const r = checkOrganization({
      ...base,
      url: `${HTTPS}/`,
      logo: { "@type": "ImageObject", url: `${HTTPS}/logo.png` },
    });
    expect(noReq(r)).toBe(true);
  });

  it("aprova logo como string absoluta (schema permite)", () => {
    const r = checkOrganization({
      ...base,
      url: `${HTTPS}/`,
      logo: `${HTTPS}/logo.png`,
    });
    expect(noReq(r)).toBe(true);
  });

  it("aprova logo com @id absoluto quando url ausente", () => {
    const r = checkOrganization({
      ...base,
      url: `${HTTPS}/`,
      logo: { "@type": "ImageObject", "@id": `${HTTPS}/logo.png` },
    });
    expect(noReq(r)).toBe(true);
  });

  it("rejeita url relativa", () => {
    const r = checkOrganization({ ...base, url: "/", logo: `${HTTPS}/logo.png` });
    expect(hasReq(r, /url absoluta ausente/)).toBe(true);
  });

  it("rejeita url protocol-relative", () => {
    const r = checkOrganization({
      ...base,
      url: "//www.patroseguros.com.br/",
      logo: `${HTTPS}/logo.png`,
    });
    expect(hasReq(r, /url absoluta ausente/)).toBe(true);
  });

  it("rejeita logo relativa", () => {
    const r = checkOrganization({ ...base, url: `${HTTPS}/`, logo: "/logo.png" });
    expect(hasReq(r, /logo absoluta ausente/)).toBe(true);
  });

  it("rejeita logo data URI (Google bloqueia Logo rich result)", () => {
    const r = checkOrganization({
      ...base,
      url: `${HTTPS}/`,
      logo: { "@type": "ImageObject", url: "data:image/png;base64,AAA" },
    });
    expect(hasReq(r, /logo absoluta ausente/)).toBe(true);
  });

  it("rejeita logo blob:", () => {
    const r = checkOrganization({
      ...base,
      url: `${HTTPS}/`,
      logo: "blob:https://a.com/uuid",
    });
    expect(hasReq(r, /logo absoluta ausente/)).toBe(true);
  });

  it("aceita http:// (não força https, só absoluta)", () => {
    const r = checkOrganization({
      ...base,
      url: `${HTTP}/`,
      logo: `${HTTP}/logo.png`,
    });
    expect(noReq(r)).toBe(true);
  });

  it("rejeita logo ausente (undefined)", () => {
    const r = checkOrganization({ ...base, url: `${HTTPS}/` });
    expect(hasReq(r, /logo absoluta ausente/)).toBe(true);
  });

  it("rejeita logo como array vazio", () => {
    const r = checkOrganization({ ...base, url: `${HTTPS}/`, logo: [] });
    expect(hasReq(r, /logo absoluta ausente/)).toBe(true);
  });

  it("aceita logo como array com uma ImageObject absoluta válida", () => {
    const r = checkOrganization({
      ...base,
      url: `${HTTPS}/`,
      logo: [{ "@type": "ImageObject", url: `${HTTPS}/logo.png` }],
    });
    expect(noReq(r)).toBe(true);
  });
});

// ============================================================================
// ImageObject standalone — contentUrl/url/@id devem ser absolutos
// ============================================================================
describe("checkImageObject — contentUrl vs url vs @id", () => {
  it("aceita contentUrl absoluto (prioridade sobre url)", () => {
    const r = checkImageObject({
      contentUrl: `${HTTPS}/x.jpg`,
      url: "/relativa-ignorada.jpg",
    });
    expect(noReq(r)).toBe(true);
  });

  it("cai para url quando contentUrl ausente", () => {
    expect(noReq(checkImageObject({ url: `${HTTPS}/x.jpg` }))).toBe(true);
  });

  it("cai para @id quando contentUrl e url ausentes", () => {
    expect(noReq(checkImageObject({ "@id": `${HTTPS}/x.jpg` }))).toBe(true);
  });

  it("rejeita quando todos os campos ausentes", () => {
    expect(hasReq(checkImageObject({}), /contentUrl\/url absoluta/)).toBe(true);
  });

  it("rejeita data URI mesmo em contentUrl", () => {
    const r = checkImageObject({ contentUrl: "data:image/png;base64,AAA" });
    expect(hasReq(r, /contentUrl\/url absoluta/)).toBe(true);
  });

  it("rejeita protocol-relative", () => {
    const r = checkImageObject({ url: "//cdn.example.com/x.jpg" });
    expect(hasReq(r, /contentUrl\/url absoluta/)).toBe(true);
  });

  it("recomenda width/height (rec, não req)", () => {
    const r = checkImageObject({ url: `${HTTPS}/x.jpg` });
    expect(r.req).toEqual([]);
    expect(r.rec.some((m) => /width\/height/.test(m))).toBe(true);
  });
});

// ============================================================================
// Casos secundários — Article e LocalBusiness dependem de image absoluta
// e são bons cross-checks das regras acima.
// ============================================================================
describe("checkArticle — image obrigatoriamente absoluta", () => {
  const base = {
    headline: "Post",
    datePublished: "2026-01-15",
    author: { name: "Autor" },
    publisher: {
      name: "Patro",
      logo: { "@type": "ImageObject", url: `${HTTPS}/logo.png` },
    },
  };

  it("aceita image string https", () => {
    expect(noReq(checkArticle({ ...base, image: `${HTTPS}/cover.jpg` }))).toBe(true);
  });

  it("aceita image ImageObject com url absoluta", () => {
    const r = checkArticle({
      ...base,
      image: { "@type": "ImageObject", url: `${HTTPS}/cover.jpg` },
    });
    expect(noReq(r)).toBe(true);
  });

  it("rejeita image relativa", () => {
    expect(hasReq(checkArticle({ ...base, image: "/cover.jpg" }), /image ausente ou não-absoluta/))
      .toBe(true);
  });

  it("rejeita image data URI", () => {
    expect(hasReq(
      checkArticle({ ...base, image: "data:image/png;base64,AAA" }),
      /image ausente ou não-absoluta/,
    )).toBe(true);
  });

  it("rejeita publisher.logo relativa", () => {
    const r = checkArticle({
      ...base,
      image: `${HTTPS}/cover.jpg`,
      publisher: { name: "Patro", logo: "/logo.png" },
    });
    expect(hasReq(r, /publisher\.logo.*absoluta/)).toBe(true);
  });
});

describe("checkLocalBusiness — image OU logo (qualquer um serve, absoluto)", () => {
  const base = {
    name: "Patro Seguros",
    telephone: "+551123456789",
    address: {
      streetAddress: "Rua X, 1",
      addressLocality: "Guarulhos",
      addressRegion: "SP",
      postalCode: "07000-000",
      addressCountry: "BR",
    },
  };

  it("aceita apenas image absoluta (sem logo)", () => {
    const r = checkLocalBusiness({ ...base, image: `${HTTPS}/foto.jpg` });
    expect(hasReq(r, /image \(ou logo\)/)).toBe(false);
  });

  it("aceita apenas logo absoluta (sem image) como fallback", () => {
    const r = checkLocalBusiness({
      ...base,
      logo: { "@type": "ImageObject", url: `${HTTPS}/logo.png` },
    });
    expect(hasReq(r, /image \(ou logo\)/)).toBe(false);
  });

  it("rejeita quando ambas relativas", () => {
    const r = checkLocalBusiness({ ...base, image: "/foto.jpg", logo: "/logo.png" });
    expect(hasReq(r, /image \(ou logo\).*absoluta/)).toBe(true);
  });

  it("rejeita quando image é data URI e logo ausente", () => {
    const r = checkLocalBusiness({ ...base, image: "data:image/png;base64,AAA" });
    expect(hasReq(r, /image \(ou logo\).*absoluta/)).toBe(true);
  });
});