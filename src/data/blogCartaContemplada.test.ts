import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "@/lib/blogData";
import { getBlogContent } from "@/data/blogContentIndex";
import { getMetadataForRoute } from "@/lib/seoMetadata";
import { cartaContempladaArticle, cartaContempladaContent } from "@/data/blogCartaContemplada";

const slug = "carta-de-credito-contemplada-riscos-como-fugir-de-golpes";
const path = `/blog/${slug}`;

describe("Artigo sobre riscos de carta contemplada", () => {
  it("registra o artigo uma única vez e disponibiliza conteúdo síncrono", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(cartaContempladaArticle);
    expect(getBlogContent(slug)).toBe(cartaContempladaContent);
    expect(cartaContempladaContent.title).toBe(cartaContempladaArticle.title);
  });

  it("preserva os metadados pedidos e a URL canônica", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Carta de Crédito Contemplada: Riscos e Como Fugir de Golpes");
    expect(meta?.description).toBe("Vai comprar carta de crédito contemplada de terceiros? Conheça os 5 principais golpes do mercado, saiba como validar no Banco Central e veja alternativas seguras.");
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(meta?.h1).toBe(cartaContempladaArticle.title);
    expect(meta?.ogType).toBe("article");
    expect(getMetadataForRoute(`${path}/`)?.canonical).toBe(meta?.canonical);
    expect(cartaContempladaArticle.tags).toContain("carta de crédito contemplada riscos");
    expect(cartaContempladaArticle.tags).toHaveLength(5);
  });

  it("inclui cinco riscos, checklist, comparativo e caminhos para simular", () => {
    const { content } = cartaContempladaContent;
    expect(content).toContain("### 1. Cota contemplada fantasma");
    expect(content).toContain("### 5. Reprovação de crédito");
    expect(content).toContain("## Checklist de segurança");
    expect(content).toContain("### 5. Condicione o pagamento");
    expect(content).toContain("| Critério de análise | Carta contemplada de terceiros |");
    expect(content).toContain("](/consorcio#comparar)");
    expect(content).not.toContain("#simulador");
    expect(content).toContain("](/consorcio-imoveis)");
    expect(content).toContain("](/consorcio-veiculos)");
    expect(content).toContain("](/consorcio-pesados-maquinas)");
    expect(content).toContain("https://wa.me/551151997500");
  });

  it("distingue autorização da administradora de validação da cota e evita garantias", () => {
    const { content, faqs } = cartaContempladaContent;
    expect(content).toContain("https://www.bcb.gov.br/meubc/encontreinstituicao");
    expect(content).toContain("não autentica anúncios nem certifica uma cota específica");
    expect(content).toContain("depende da anuência prévia da administradora");
    expect(content).toContain("Nenhum estudo de histórico garante contemplação imediata");
    expect(content).toContain("não autoriza nem certifica operações de consórcio");
    expect(content).not.toContain("80% das ofertas");
    expect(content).not.toContain("100% seguro");
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs[1].a).toContain("saldo total é automaticamente elegível");
    expect(faqs[3].a).toContain("sem data garantida");
  });
});
