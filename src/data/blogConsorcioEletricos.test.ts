import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "../lib/blogData";
import { getBlogContent } from "./blogContentIndex";
import { getMetadataForRoute } from "../lib/seoMetadata";
import { consorcioEletricosArticle, consorcioEletricosContent } from "./blogConsorcioEletricos";

const slug = "consorcio-carro-eletrico-ou-hibrido-vale-a-pena-financiamento";
const path = `/blog/${slug}`;

describe("Artigo de consórcio para carros elétricos e híbridos", () => {
  it("registra metadados únicos e conteúdo síncrono para a rota do blog", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioEletricosArticle);
    expect(getBlogContent(slug)).toBe(consorcioEletricosContent);
    expect(consorcioEletricosContent.title).toBe(consorcioEletricosArticle.title);
  });

  it("mantém título, descrição, palavras-chave e URL canônica solicitados", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Consórcio para Carro Elétrico ou Híbrido: Vale Mais a Pena?");
    expect(meta?.description).toBe("Descubra se o consórcio para carro elétrico ou híbrido (BYD, GWM, Volvo, Toyota) vale mais a pena que o financiamento das montadoras. Compare custos e parcelas!");
    expect(meta?.h1).toBe(consorcioEletricosArticle.title);
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(getMetadataForRoute(`${path}/`)?.canonical).toBe(meta?.canonical);
    expect(meta?.ogType).toBe("article");
    expect(consorcioEletricosArticle.tags).toContain("consórcio carro elétrico ou híbrido");
    expect(consorcioEletricosArticle.tags).toHaveLength(5);
  });

  it("apresenta comparação com premissas explícitas e caminhos para simulação", () => {
    const { content } = consorcioEletricosContent;
    expect(content).toContain("| Critério de comparação | Consórcio de veículos: exemplo didático |");
    expect(content).toContain("taxa de administração total de 15%");
    expect(content).toContain("entrada de 20%");
    expect(content).toContain("juros de 2% ao mês");
    expect(content).toContain("Custo Efetivo Total (CET)");
    expect(content).toContain("não são equivalentes em prazo");
    expect(content).toContain("](/consorcio#comparar)");
    expect(content).toContain("](/consorcio-veiculos)");
    expect(content).toContain("](/seguro-auto)");
    expect(content).not.toContain("#simulador");
    expect(content).toContain("https://wa.me/551151997500");
  });

  it("explica riscos de lance, reajustes, seguro e compra por CNPJ sem garantias", () => {
    const { content, faqs } = consorcioEletricosContent;
    expect(content).toContain("sem data garantida");
    expect(content).toContain("reduz o crédito líquido para comprar o carro");
    expect(content).toContain("O prazo da administradora pode vencer antes da venda");
    expect(content).toContain("não garante o valor da Tabela FIPE");
    expect(content).toContain("Nenhuma cobertura deve ser presumida");
    expect(content).toContain("registro SUSEP não autoriza nem certifica");
    expect(content).toContain("https://www.bcb.gov.br/meubc/encontreinstituicao");
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs[1].a).toContain("sem gerar automaticamente crédito adicional");
    expect(faqs[3].a).toContain("não garante ausência de impacto");
  });
});
