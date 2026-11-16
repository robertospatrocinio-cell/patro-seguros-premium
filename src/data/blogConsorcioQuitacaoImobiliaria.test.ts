import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "@/lib/blogData";
import { getBlogContent } from "@/data/blogContentIndex";
import { getMetadataForRoute } from "@/lib/seoMetadata";
import { consorcioQuitacaoImobiliariaArticle, consorcioQuitacaoImobiliariaContent } from "@/data/blogConsorcioQuitacaoImobiliaria";

const slug = "usar-consorcio-para-quitar-financiamento-imobiliario-interveniencia-quitante";
const path = `/blog/${slug}`;

 describe("Artigo de consórcio para quitação de financiamento imobiliário", () => {
  it("registra uma única entrada e disponibiliza o conteúdo no blog", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioQuitacaoImobiliariaArticle);
    expect(getBlogContent(slug)).toBe(consorcioQuitacaoImobiliariaContent);
    expect(consorcioQuitacaoImobiliariaContent.title).toBe(consorcioQuitacaoImobiliariaArticle.title);
  });

  it("preserva os metadados solicitados e a URL canônica", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Usar Consórcio para Quitar Financiamento Imobiliário: Como Funciona");
    expect(meta?.description).toBe("Descubra como usar o consórcio para quitar seu financiamento imobiliário através da interveniência quitante. Troque juros altos por parcelas sem juros!");
    expect(meta?.h1).toBe(consorcioQuitacaoImobiliariaArticle.title);
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(meta?.ogType).toBe("article");
    expect(getMetadataForRoute(`${path}/`)?.canonical).toBe(meta?.canonical);
    expect(consorcioQuitacaoImobiliariaArticle.tags).toEqual([
      "usar consórcio para quitar financiamento imobiliário",
      "interveniência quitante consórcio",
      "quitar financiamento de imóvel com consórcio",
      "trocar financiamento por consórcio",
      "consórcio de imóveis quitação",
    ]);
  });

  it("inclui comparação, etapas e ressalvas sem prometer economia ou contemplação", () => {
    const { content } = consorcioQuitacaoImobiliariaContent;
    expect(content).toContain("| Critério financeiro | Manter o financiamento bancário |");
    expect(content).toContain("hipótese didática, não como oferta");
    expect(content).toContain("quitação total de financiamento");
    expect(content).toContain("taxa de administração");
    expect(content).toContain("financiamento e consórcio ao mesmo tempo durante a espera");
    expect(content).toContain("Não existe data garantida de contemplação");
    expect(content).toContain("1. **Compare antes de aderir.");
    expect(content).toContain("6. **Confira pagamento e registros.");
    expect(content).toContain("o destino dessa sobra precisa ser aprovado");
    expect(content).toContain("](/consorcio-imoveis)");
    expect(content).toContain("](/seguro-residencial)");
    expect(content).toContain("https://wa.me/551151997500");
  });

  it("mantém quatro perguntas frequentes sobre FGTS, banco, seguros e ITBI", () => {
    const { faqs } = consorcioQuitacaoImobiliariaContent;
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs[0].a).toContain("confirmação formal");
    expect(faqs[1].a).toContain("não garante a aprovação do crédito");
    expect(faqs[2].a).toContain("não é automático");
    expect(faqs[3].a).toContain("sem transmissão da propriedade");
  });
});
