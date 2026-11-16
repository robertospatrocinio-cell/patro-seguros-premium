import { describe, expect, it } from "vitest";
import { agroArticles } from "@/data/blogAgroData";
import { agroArticlesContent } from "@/data/blogAgroContent";
import { getBlogContent } from "@/data/blogContentIndex";
import { getArticleMeta } from "@/lib/blogData";

const slug = "quanto-custa-seguro-trator-agricola-2026";
const pillar = "/seguro-trator-agricola";

 describe("Artigo sobre preço do seguro de trator agrícola", () => {
  it("registra uma única entrada no catálogo e mantém título e conteúdo consistentes", () => {
    expect(agroArticles.filter(article => article.slug === slug)).toHaveLength(1);
    const meta = getArticleMeta(slug);
    const article = getBlogContent(slug);

    expect(meta).toBeDefined();
    expect(article).toBe(agroArticlesContent[slug]);
    expect(article?.title).toBe(meta?.title);
    expect(meta?.category).toBe("Agronegócio");
    expect(meta?.excerpt.length).toBeLessThanOrEqual(160);
  });

  it("leva à página pilar e ao formulário específico do trator", () => {
    const content = agroArticlesContent[slug].content;
    expect(content).toContain(`](${pillar})`);
    expect(content).toContain(`](${pillar}#solicitar-cotacao)`);
    expect(content).toContain("](/seguro-penhor-rural)");
  });

  it("distingue o exemplo didático de uma cotação ou pesquisa de preços", () => {
    const content = agroArticlesContent[slug].content;
    expect(content).toContain("Esses números são fictícios");
    expect(content).toContain("não apresenta pesquisa de preços de 2026");
    expect(content).toContain("Pedir cotação ou enviar documentos não inicia a cobertura.");
  });

  it("oferece perguntas completas e sem duplicação para a FAQ visível", () => {
    const { faqs } = agroArticlesContent[slug];
    expect(faqs.length).toBeGreaterThanOrEqual(8);
    expect(new Set(faqs.map(faq => faq.q)).size).toBe(faqs.length);
    expect(faqs.every(faq => faq.q.trim().length > 0 && faq.a.trim().length > 0)).toBe(true);
  });
});
