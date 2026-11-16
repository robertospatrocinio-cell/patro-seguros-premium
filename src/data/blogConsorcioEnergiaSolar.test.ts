import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "@/lib/blogData";
import { getBlogContent } from "@/data/blogContentIndex";
import { getMetadataForRoute } from "@/lib/seoMetadata";
import { consorcioEnergiaSolarArticle, consorcioEnergiaSolarContent } from "@/data/blogConsorcioEnergiaSolar";

const slug = "consorcio-de-energia-solar-instalar-placas-sem-juros";
const path = `/blog/${slug}`;

describe("Artigo de consórcio de energia solar", () => {
  it("registra o artigo uma única vez e disponibiliza seu conteúdo", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioEnergiaSolarArticle);
    expect(getBlogContent(slug)).toBe(consorcioEnergiaSolarContent);
    expect(consorcioEnergiaSolarContent.title).toBe(consorcioEnergiaSolarArticle.title);
  });

  it("preserva os metadados solicitados e a URL canônica", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Consórcio de Energia Solar: Como Instalar Placas Sem Juros");
    expect(meta?.description).toBe("Saiba como instalar energia solar sem pagar juros de financiamento bancário. Compare consórcio vs. CDC solar, veja prazos e reduza sua conta de luz em até 90%.");
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(meta?.h1).toBe(consorcioEnergiaSolarArticle.title);
    expect(meta?.ogType).toBe("article");
    expect(getMetadataForRoute(`${path}/`)?.canonical).toBe(meta?.canonical);
    expect(consorcioEnergiaSolarArticle.tags).toEqual([
      "consórcio de energia solar",
      "consórcio para placas fotovoltaicas",
      "financiar energia solar ou consórcio",
      "consórcio de serviços energia solar",
      "instalar energia solar sem juros",
    ]);
  });

  it("explica custos e economia sem prometer contemplação ou projeto gratuito", () => {
    const { content } = consorcioEnergiaSolarContent;
    expect(content).toContain("| Critério financeiro | Consórcio de energia solar");
    expect(content).toContain("hipótese didática, não uma oferta");
    expect(content).toContain("R$ 28.320");
    expect(content).toContain("2% ao mês");
    expect(content).toContain("R$ 33.900");
    expect(content).toContain("taxa de administração");
    expect(content).toContain("custo efetivo total (CET)");
    expect(content).toContain("não é garantida");
    expect(content).toContain("Não há garantia de contemplação");
    expect(content).toContain("A unificação de cotas não é automática");
    expect(content).toContain("não garante a entrega nem elimina riscos");
    expect(content).toContain("Lei nº 14.300/2022");
    expect(content).toContain("](/consorcio-servicos)");
    expect(content).toContain("](/seguro-placa-solar)");
    expect(content).toContain("](/seguro-residencial)");
    expect(content).toContain("](/seguro-empresarial)");
    expect(content).toContain("https://wa.me/551151997500");
  });

  it("mantém quatro perguntas frequentes com as ressalvas contratuais", () => {
    const { faqs } = consorcioEnergiaSolarContent;
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs[0].a).toContain("não significa depósito imediato");
    expect(faqs[1].a).toContain("aceitação pela administradora");
    expect(faqs[2].a).toContain("não é automaticamente entregue em dinheiro");
    expect(faqs[3].a).toContain("IPCA não é uma regra universal");
  });
});
