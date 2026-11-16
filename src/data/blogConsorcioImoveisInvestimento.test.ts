import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "@/lib/blogData";
import { getBlogContent } from "@/data/blogContentIndex";
import { getMetadataForRoute } from "@/lib/seoMetadata";
import { consorcioImoveisInvestimentoArticle, consorcioImoveisInvestimentoContent } from "@/data/blogConsorcioImoveisInvestimento";

const slug = "investir-em-imoveis-com-consorcio-aluguel-paga-parcela";
const path = `/blog/${slug}`;

describe("Artigo de investimento imobiliário com consórcio", () => {
  it("registra metadados e conteúdo uma única vez no blog", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioImoveisInvestimentoArticle);
    expect(getBlogContent(slug)).toBe(consorcioImoveisInvestimentoContent);
    expect(consorcioImoveisInvestimentoContent.title).toBe(consorcioImoveisInvestimentoArticle.title);
  });

  it("preserva título e descrição solicitados no SEO estático", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Investir em Imóveis com Consórcio: O Aluguel Paga a Parcela?");
    expect(meta?.description).toBe("Aprenda como investir em imóveis com consórcio e usar a renda do aluguel para pagar as parcelas sem juros. Veja a matemática da alavancagem patrimonial!");
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(meta?.h1).toBe(consorcioImoveisInvestimentoArticle.title);
    expect(meta?.ogType).toBe("article");
    expect(getMetadataForRoute(`${path}/`)?.canonical).toBe(meta?.canonical);
    expect(consorcioImoveisInvestimentoArticle.tags).toContain("investir em imóveis com consórcio");
    expect(consorcioImoveisInvestimentoArticle.tags).toHaveLength(5);
  });

  it("explica a simulação sem garantir contemplação ou rentabilidade", () => {
    const { content } = consorcioImoveisInvestimentoContent;
    expect(content).toContain("| Etapa da operação | Exemplo numérico ilustrativo |");
    expect(content).toContain("R$ 400.000");
    expect(content).toContain("Crédito líquido de R$ 300.000");
    expect(content).toContain("hipótese didática, não uma oferta");
    expect(content).toContain("não calculada a partir da carta acima");
    expect(content).toContain("não assegura contemplação antecipada");
    expect(content).toContain("não há garantia de cobertura integral");
    expect(content).toContain("taxa de administração");
    expect(content).toContain("Os reajustes não necessariamente se compensam");
    expect(content).toContain("precisa complementar R$ 250");
    expect(content).toContain("](/consorcio-imoveis)");
    expect(content).toContain("](/seguro-residencial)");
    expect(content).toContain("](/seguro-empresarial)");
    expect(content).toContain("](/seguro-fianca-locaticia)");
    expect(content).toContain("https://wa.me/551151997500");
    expect(content).toContain("administradora autorizada pelo Banco Central");
  });

  it("mantém quatro respostas completas sobre FGTS, locação, tributos e prazo", () => {
    const { faqs } = consorcioImoveisInvestimentoContent;
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs[0].a).toContain("moradia própria");
    expect(faqs[1].a).toContain("anuência da administradora");
    expect(faqs[2].a).toContain("não é, em regra, dedutível");
    expect(faqs[3].a).toContain("Não existe prazo ideal universal");
  });
});
