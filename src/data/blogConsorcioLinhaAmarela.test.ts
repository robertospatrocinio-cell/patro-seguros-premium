import { describe, expect, it } from "vitest";
import { articles, getArticleMeta } from "../lib/blogData";
import { getBlogContent } from "./blogContentIndex";
import { getMetadataForRoute } from "../lib/seoMetadata";
import { consorcioLinhaAmarelaArticle, consorcioLinhaAmarelaContent } from "./blogConsorcioLinhaAmarela";

const slug = "consorcio-linha-amarela-escavadeiras-retroescavadeiras";
const path = `/blog/${slug}`;

describe("Artigo de consórcio linha amarela", () => {
  it("registra o artigo uma única vez e disponibiliza seu conteúdo", () => {
    expect(articles.filter(article => article.slug === slug)).toHaveLength(1);
    expect(getArticleMeta(slug)).toEqual(consorcioLinhaAmarelaArticle);
    expect(getBlogContent(slug)).toBe(consorcioLinhaAmarelaContent);
    expect(consorcioLinhaAmarelaContent.title).toBe(consorcioLinhaAmarelaArticle.title);
  });

  it("preserva metadados editoriais e URL canônica", () => {
    const meta = getMetadataForRoute(path);
    expect(meta?.title).toBe("Consórcio Linha Amarela: Comprar Escavadeiras Sem Descapitalizar");
    expect(meta?.description).toBe("Saiba como comprar escavadeiras, retroescavadeiras e pás carregadeiras sem juros e sem travar seu limite bancário. Compare consórcio vs. CDC/Finame e simule!");
    expect(meta?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(meta?.h1).toBe(consorcioLinhaAmarelaArticle.title);
    expect(meta?.ogType).toBe("article");
    expect(getMetadataForRoute(`${path}/`)?.canonical).toBe(meta?.canonical);
    expect(consorcioLinhaAmarelaArticle.tags).toEqual([
      "consórcio linha amarela",
      "consórcio de escavadeiras",
      "consórcio de retroescavadeira",
      "consórcio máquinas pesadas construção",
      "comprar pá carregadeira sem juros",
    ]);
  });

  it("inclui comparativo, estratégias e ressalvas financeiras", () => {
    const { content } = consorcioLinhaAmarelaContent;
    expect(content).toContain("| Critério de decisão | Consórcio linha amarela |");
    expect(content).toContain("hipótese didática, não uma oferta");
    expect(content).toContain("R$ 690 mil não é um teto de custo");
    expect(content).toContain("taxa de administração");
    expect(content).toContain("SCR não é um limite único");
    expect(content).toContain("Ofertar o lance não garante a contemplação");
    expect(content).toContain("restando R$ 450 mil");
    expect(content).toContain("não conte com vender a máquina antiga somente depois da compra");
    expect(content).toContain("Não há uma exigência idêntica de seguro para toda cota");
    expect(content).toContain("](/consorcio-pesados-maquinas)");
    expect(content).not.toContain("](/consorcio-veiculos-pesados)");
    expect(content).toContain("](/seguro-maquinas)");
    expect(content).toContain("](/seguro-maquinas-linha-amarela)");
    expect(content).toContain("https://wa.me/551151997500");
  });

  it("mantém quatro perguntas frequentes sem garantir aceitação ou liberação", () => {
    const { faqs } = consorcioLinhaAmarelaContent;
    expect(faqs).toHaveLength(4);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(4);
    expect(faqs.every(faq => faq.q.trim() && faq.a.trim())).toBe(true);
    expect(faqs[0].a).toContain("não há regra universal de 8 a 10 anos");
    expect(faqs[1].a).toContain("paga diretamente ao fornecedor aprovado");
    expect(faqs[2].a).toContain("IPCA e a atualização anual não são regras universais");
    expect(faqs[3].a).toContain("A soma não é automática");
  });
});
