import { describe, expect, it } from "vitest";
import { seoLocalPages } from "./seoLocalAutoPages";
import { seoLocalSaudePages } from "./seoLocalSaudePages";
import { seoLocalProdutoBairroPages } from "./seoLocalProdutoBairroPages";
import { buildCommercialLocalPage } from "./localCommercialContent";
import { bairros } from "@/lib/bairrosData";

const reviewed = { ...seoLocalProdutoBairroPages, ...seoLocalSaudePages };
// Mesma precedência da página e do resolvedor central de metadados.
const effective = { ...reviewed, ...seoLocalPages };

describe("Revisão comercial ampliada", () => {
  it("preserva os catálogos e não amplia a matriz de bairros", () => {
    expect(Object.keys(seoLocalProdutoBairroPages)).toHaveLength(12);
    expect(Object.keys(seoLocalSaudePages)).toHaveLength(19);
    expect(Object.keys(reviewed)).toHaveLength(31);
    expect(seoLocalProdutoBairroPages["seguro-vida-centro-guarulhos"]).toBeUndefined();
    expect(seoLocalSaudePages["plano-saude-picanco"]).toBeDefined();
    expect(seoLocalSaudePages["seguro-galpao-guarulhos"]).toBeDefined();
  });

  it.each(Object.keys(reviewed))("usa condições verificáveis no conteúdo efetivo de %s", (slug) => {
    const page = effective[slug];
    expect(page).toBeDefined();
    expect(JSON.stringify(page)).not.toMatch(/R\$|\d+\s*%|guincho ilimitado|indenização integral|plantão 24\/7/i);
    expect(page.priceRange).toBeUndefined();
    expect(page.testimonials).toEqual([]);
    expect(page.insurers).toEqual([]);
    expect(page.realScenarios).toEqual([]);
    expect(page.faqs.length).toBeGreaterThanOrEqual(5);
    expect(page.metaDescription.length).toBeLessThanOrEqual(160);
    expect(page.title.length).toBeLessThanOrEqual(60);
    expect(page.detailedDescription).toContain("não uma filial no bairro");
    expect(page.relatedInsurances.some(({ link }) => link.startsWith("/cotacao?tipo="))).toBe(true);
    for (const { link } of page.relatedInsurances) {
      if (link.startsWith("/seguros-guarulhos/")) {
        expect(bairros.some(({ id }) => link === `/seguros-guarulhos/${id}`)).toBe(true);
      }
    }
  });

  it("revisa a fonte de Cumbica que realmente ganha na resolução", () => {
    expect(effective["seguro-empresarial-cumbica"]).toBe(seoLocalPages["seguro-empresarial-cumbica"]);
    expect(effective["seguro-empresarial-cumbica"].description).toContain("bens de terceiros");
  });

  it("não confunde Cidade Maia com Jardim Maia", () => {
    const page = reviewed["seguro-residencial-cidade-maia"];
    expect(page.neighborhood).toBe("Cidade Maia");
    expect(page.relatedInsurances.some(({ link }) => link === "/seguros-guarulhos/jardim-maia")).toBe(false);
  });

  it("diferencia rede de saúde, assistência e indenização", () => {
    const health = buildCommercialLocalPage("saude", { slug: "teste", bairro: "Centro" });
    expect(JSON.stringify(health)).toContain("Proximidade geográfica não significa credenciamento");
    const home = buildCommercialLocalPage("residencial", { slug: "teste", bairro: "Guarulhos" });
    expect(home.faqs.some(({ answer }) => answer.includes("proteções diferentes"))).toBe(true);
    expect(home.neighborhood).toBeUndefined();
  });
});
