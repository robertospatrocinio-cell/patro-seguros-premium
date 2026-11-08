import { describe, expect, it } from "vitest";
import { seoLocalPages } from "@/data/seoLocalAutoPages";
import { bairros } from "@/lib/bairrosData";

const autoSlugs = [
  "seguro-auto-pimentas", "seguro-auto-pimentas-guarulhos",
  "seguro-auto-vila-galvao", "seguro-auto-bonsucesso-guarulhos",
  "seguro-auto-cumbica", "seguro-auto-jardim-maia", "seguro-auto-jardim-sao-joao",
  "seguro-auto-taboao-guarulhos", "seguro-auto-centro-guarulhos",
  "seguro-auto-vila-augusta", "seguro-auto-cidade-maia", "seguro-auto-maia-guarulhos",
  "seguro-auto-vila-augusta-guarulhos", "seguro-auto-bonsucesso-guarulhos-v2",
  "seguro-auto-paraventi-guarulhos", "seguro-auto-continental-guarulhos",
  "seguro-auto-picanco-guarulhos", "seguro-auto-macedo-guarulhos", "seguro-auto-gopouva-guarulhos",
];

describe("Revisão comercial local — auto por bairro e Pimentas", () => {
  it.each(autoSlugs)("não publica estimativas ou resultados não comprovados em %s", (slug) => {
    const page = seoLocalPages[slug];
    expect(page).toBeDefined();
    const content = JSON.stringify(page);
    expect(content).not.toMatch(/R\$|\d+\s*%/);
    expect(content).not.toMatch(/guincho ilimitado|sinistralidade.*acima da média/i);
    expect(page.priceRange).toBeUndefined();
    expect(page.testimonials).toEqual([]);
    expect(page.insurers).toEqual([]);
    expect(page.realScenarios).toEqual([]);
    expect(page.faqs.length).toBeGreaterThanOrEqual(5);
    expect(page.metaDescription.length).toBeLessThanOrEqual(160);
    expect(page.neighborhood).toBeTruthy();
    expect(page.relatedInsurances.some(link => link.link.startsWith("/seguros-guarulhos/"))).toBe(true);
    expect(page.relatedInsurances.some(link => link.link === "/cotacao?tipo=auto")).toBe(true);
  });

  it("não confunde a área atendida com uma filial e não garante rede de saúde", () => {
    const page = bairros.find(bairro => bairro.id === "pimentas")!;
    expect(page).toBeDefined();
    expect(page.descricao).toContain("sem filial no bairro");
    expect(page.testimonials).toEqual([]);
    expect(page.intel?.riskProfile).toBeUndefined();
    expect(page.intel?.localCase).toBeUndefined();
    expect(page.intel?.landmarks).toBeUndefined();
    expect(JSON.stringify(page.faqs)).not.toMatch(/R\$|\d+\s*%/);
    for (const slug of ["seguro-auto-pimentas", "seguro-auto-pimentas-guarulhos"]) {
      expect(seoLocalPages[slug].relatedInsurances).toContainEqual({
        title: "Outros seguros em Pimentas", link: "/seguros-guarulhos/pimentas",
      });
    }
    expect(page.faqs.some(faq => faq.answer.includes("guia oficial da operadora"))).toBe(true);
    expect(page.faqs.some(faq => faq.answer.includes("não substitui a declaração de uso"))).toBe(true);
  });

  it.each([
    ["seguro-auto-vila-galvao", "vila-galvao"],
    ["seguro-auto-jardim-sao-joao", "jardim-sao-joao"],
    ["seguro-auto-taboao-guarulhos", "taboao"],
  ])("liga %s ao bairro correto", (slug, id) => {
    const page = seoLocalPages[slug];
    expect(bairros.some(bairro => bairro.id === id)).toBe(true);
    expect(page.relatedInsurances.some(link => link.link === `/seguros-guarulhos/${id}`)).toBe(true);
  });
});
