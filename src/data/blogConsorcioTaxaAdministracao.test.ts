import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "../lib/blogData";
import { getBlogContent } from "./blogContentIndex";
import { getMetadataForRoute } from "../lib/seoMetadata";
import { consorcioTaxaAdministracaoArticle, consorcioTaxaAdministracaoContent } from "./blogConsorcioTaxaAdministracao";

const slug = "taxa-de-administracao-no-consorcio-como-calcular-custo-real";
const path = `/blog/${slug}`;

describe("Artigo sobre taxa de administração no consórcio", () => {
  it("registra uma única entrada e disponibiliza o conteúdo no blog", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioTaxaAdministracaoArticle);
    expect(getBlogContent(slug)).toBe(consorcioTaxaAdministracaoContent);
    expect(consorcioTaxaAdministracaoContent.title).toBe(consorcioTaxaAdministracaoArticle.title);
  });

  it("preserva os metadados solicitados e a URL canônica", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Taxa de Administração no Consórcio: Como Calcular o Custo Real");
    expect(meta?.description).toBe("Aprenda a calcular a taxa de administração no consórcio por ano e mês. Compare o custo linear do consórcio com os juros compostos de financiamentos bancários!");
    expect(meta?.h1).toBe(consorcioTaxaAdministracaoArticle.title);
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(meta?.ogType).toBe("article");
    expect(getMetadataForRoute(`${path}/`)?.canonical).toBe(meta?.canonical);
    expect(consorcioTaxaAdministracaoArticle.tags).toEqual([
      "taxa de administração no consórcio",
      "como calcular taxa de administração consórcio",
      "taxa de administração vs juros financiamento",
      "fundo de reserva consórcio como funciona",
      "custo efetivo consórcio",
    ]);
  });

  it("mantém exemplos matemáticos coerentes com as hipóteses", () => {
    expect(200000 * 0.16).toBe(32000);
    expect(32000 / 100).toBe(320);
    expect(16 / 100 * 12).toBeCloseTo(1.92);
    expect(300000 * 1.18 / 120).toBe(2950);
    const payment = 300000 * 0.0125 / (1 - (1.0125 ** -120));
    expect(payment).toBeGreaterThan(4830);
    expect(payment).toBeLessThan(4850);
    expect(payment * 120 - 300000).toBeGreaterThan(280000);
    expect(payment * 120 - 300000).toBeLessThan(282000);
    expect((1.0125 ** 12 - 1) * 100).toBeCloseTo(16.08, 2);
  });

  it("inclui tabela, etapas e ressalvas sobre custo efetivo e contemplação", () => {
    const { content } = consorcioTaxaAdministracaoContent;
    expect(content).toContain("| Indicador financeiro | Consórcio:");
    expect(content).toContain("não revela uma taxa efetiva equivalente aos juros bancários");
    expect(content).toContain("Os totais são didáticos, não ofertas nem garantia de economia");
    expect(content).toContain("lance embutido reduz o crédito líquido disponível");
    expect(content).toContain("1. **Padronize o objetivo:");
    expect(content).toContain("5. **Teste o orçamento e a espera:");
    expect(content).toContain("](/consorcio#comparar)");
    expect(content).toContain("https://wa.me/551151997500");
  });

  it("mantém quatro perguntas frequentes completas", () => {
    const { faqs } = consorcioTaxaAdministracaoContent;
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs[0].a).toContain("Não existe uma taxa única");
    expect(faqs[1].a).toContain("Peça um demonstrativo de quitação");
    expect(faqs[2].a).toContain("valor em reais");
    expect(faqs[3].a).toContain("não garante economia nem contemplação");
  });
});
