import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "@/lib/blogData";
import { getBlogContent } from "@/data/blogContentIndex";
import { consorcioAgroArticle, consorcioAgroContent } from "@/data/blogConsorcioAgro";

const slug = "consorcio-maquinas-agricolas-vale-a-pena-finame-credito-rural";

describe("Artigo de consórcio de máquinas agrícolas", () => {
  it("registra o artigo uma única vez e mantém o conteúdo sincronizado", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioAgroArticle);
    expect(getBlogContent(slug)).toBe(consorcioAgroContent);
    expect(consorcioAgroContent.title).toBe(getArticleMeta(slug)?.title);
  });

  it("preserva o título SEO e a descrição solicitados", () => {
    const meta = getArticleMeta(slug);
    expect(meta?.seoTitle).toBe("Consórcio de Máquinas Agrícolas Vale a Pena? Compare Finame e CDC");
    expect(meta?.excerpt).toBe("Descubra se o consórcio de máquinas agrícolas vale a pena frente ao Finame e crédito rural. Compare custos, entrada, prazos e compra à vista de tratores.");
    expect(meta?.tags).toContain("consórcio de máquinas agrícolas vale a pena");
  });

  it("inclui comparação, links comerciais e orientação sobre riscos", () => {
    const { content } = consorcioAgroContent;
    expect(content).toContain("| Critério de decisão | Consórcio de máquinas |");
    expect(content).toContain("](/consorcio-pesados-maquinas)");
    expect(content).toContain("](/consorcio)");
    expect(content).toContain("](/seguro-maquinas)");
    expect(content).toContain("](/seguro-trator-agricola)");
    expect(content).toContain("https://wa.me/551151997500");
    expect(content).toContain("não é uma previsão de contemplação");
    expect(content).toContain("Lance embutido reduz o valor disponível");
    expect(content).toContain("Não é correto prometer economia de 30% a 45%");
  });

  it("oferece as quatro perguntas frequentes sem duplicação", () => {
    const { faqs } = consorcioAgroContent;
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
  });
});
