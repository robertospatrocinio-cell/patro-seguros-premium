import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "../lib/blogData";
import { getBlogContent } from "./blogContentIndex";
import { getMetadataForRoute } from "../lib/seoMetadata";
import { consorcioCaminhoesArticle, consorcioCaminhoesContent } from "./blogConsorcioCaminhoes";

const slug = "consorcio-de-caminhoes-como-renovar-frota-sem-juros";
const path = `/blog/${slug}`;

describe("Artigo de consórcio de caminhões", () => {
  it("registra o artigo uma única vez no catálogo e no conteúdo", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioCaminhoesArticle);
    expect(getBlogContent(slug)).toBe(consorcioCaminhoesContent);
    expect(consorcioCaminhoesContent.title).toBe(consorcioCaminhoesArticle.title);
  });

  it("preserva os metadados solicitados também na geração estática", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Consórcio de Caminhões: Como Renovar Sua Frota Sem Juros");
    expect(meta?.description).toBe("Saiba como renovar caminhões e implementos rodoviários sem juros bancários. Compare consórcio vs. CDC, use seu caminhão usado como lance e simule planos.");
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(meta?.h1).toBe(consorcioCaminhoesArticle.title);
    expect(meta?.ogType).toBe("article");
    expect(consorcioCaminhoesArticle.tags).toContain("consórcio de caminhões");
    expect(consorcioCaminhoesArticle.tags).toHaveLength(5);
  });

  it("inclui comparativo, planejamento de lance, seguros e próximos passos", () => {
    const { content } = consorcioCaminhoesContent;
    expect(content).toContain("| Critério operacional e financeiro | Consórcio de caminhões |");
    expect(content).toContain("](/consorcio-pesados-maquinas)");
    expect(content).toContain("](/consorcio)");
    expect(content).toContain("](/seguro-caminhao)");
    expect(content).toContain("](/seguro-frota)");
    expect(content).toContain("https://wa.me/551151997500");
    expect(content).toContain("Lance embutido reduz o crédito líquido");
    expect(content).toContain("antes da liberação da carta");
    expect(content).toContain("Não há economia média garantida de 35% a 50%");
    expect(content).toContain("não garante a liberação do pagamento");
  });

  it("mantém quatro perguntas frequentes distintas e completas", () => {
    const { faqs } = consorcioCaminhoesContent;
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs.map(faq => faq.a).join(" ")).toContain("nenhuma modalidade garante contemplação");
  });
});
