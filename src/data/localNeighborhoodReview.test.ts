import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { bairros } from "@/lib/bairrosData";
import { getLocalPreparation, LOCAL_PRIORITY_AREAS, reviewNeighborhood } from "./localNeighborhoodReview";

// O template publicado aplica esta camada; os registros históricos não são provas.
describe("Revisão editorial dos bairros de Guarulhos", () => {
  it("mantém cinco prioridades com orientações distintas e slugs existentes", () => {
    expect(LOCAL_PRIORITY_AREAS).toHaveLength(5);
    const lists = LOCAL_PRIORITY_AREAS.map((area) => {
      expect(bairros.some((bairro) => bairro.id === area.id)).toBe(true);
      expect(getLocalPreparation(area.id)).toHaveLength(3);
      return JSON.stringify(getLocalPreparation(area.id));
    });
    expect(new Set(lists).size).toBe(5);
  });

  it.each(bairros.map((bairro) => [bairro.id, bairro] as const))(
    "não publica alegações locais sem fonte em %s",
    (_id, bairro) => {
      const reviewed = reviewNeighborhood(bairro);
      expect(reviewed.id).toBe(bairro.id);
      expect(reviewed.nome).toBe(bairro.nome);
      expect(reviewed.image).toBe(bairro.image);
      expect(reviewed.geo).toEqual(bairro.geo);
      expect(reviewed.intel).toBeUndefined();
      expect(reviewed.testimonials).toEqual([]);
      expect(reviewed.localFaqs).toEqual([]);
      expect(reviewed.faqs.length).toBeGreaterThanOrEqual(5);
      const copy = JSON.stringify({
        descricao: reviewed.descricao,
        foco: reviewed.foco,
        faqs: reviewed.faqs,
        preparation: getLocalPreparation(reviewed.id),
      });
      expect(copy).not.toMatch(/R\$|\d+\s*%|caso real|indenização em \d+/i);
      expect(copy).toContain("não uma filial");
      expect(copy).toContain("guia oficial da operadora");
      // A revisão não altera os dados de origem compartilhados por outros usos.
      expect(reviewed).not.toBe(bairro);
    },
  );

  it("mantém um único hub municipal, um template de bairro e o alias de encaminhamento", () => {
    const app = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
    expect(app.match(/path="\/seguros-guarulhos"/g)).toHaveLength(1);
    expect(app.match(/path="\/seguros-guarulhos\/:(?:bairro|slug)"/g)).toHaveLength(1);
    expect(app.match(/path="\/seguros-em-guarulhos"/g)).toHaveLength(1);
    expect(app).toContain('path="/seguros-em-guarulhos" element={<Navigate to="/seguros-guarulhos" replace />}');
    const template = readFileSync(new URL("../pages/SegurosGuarulhosBairros.tsx", import.meta.url), "utf8");
    expect(template).toContain("legacyBairros.map(reviewNeighborhood)");
    expect(template).toContain("getLocalPreparation(selectedBairro.id)");
    expect(template).toContain("const WHATSAPP_NUMBER = WHATSAPP_DIGITS");
    expect(template).toContain("onSubmit={handleSubmit}");
    expect(template).toContain('to="/cotacao"');
  });
});
