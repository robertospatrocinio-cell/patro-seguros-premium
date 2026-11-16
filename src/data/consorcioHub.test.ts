import { describe, expect, it } from "vitest";
import { consorcioHub, consorcioFaqs, consorcioModalities, consorcioComparison, consorcioServiceSchema, consorcioWhatsapp } from "./consorcioHub";
import { getConsorcioStaticContent } from "./consorcioHubSeo";
import { calculateConsorcioScenario } from "../lib/consorcioSimulation";

const scenario = {
  credit: 300000, consortiumMonths: 180, administrationPercent: 20,
  reservePercent: 2, consortiumOtherCosts: 0, financingMonths: 180,
  downPayment: 0, monthlyInterestPercent: 1, financingOtherCosts: 0,
};

describe("Hub nacional de consórcio", () => {
  it("mantém metadados dentro dos limites do projeto", () => {
    expect(consorcioHub.title.length).toBeLessThanOrEqual(60);
    expect(consorcioHub.description.length).toBeLessThanOrEqual(160);
    expect(consorcioHub.description).toContain("todo o Brasil");
    expect(consorcioHub.h1).not.toContain("Guarulhos");
  });

  it("publica as mesmas seis perguntas no conteúdo estático", () => {
    const content = getConsorcioStaticContent();
    expect(content.h1).toBe(consorcioHub.h1);
    expect(consorcioFaqs).toHaveLength(6);
    for (const faq of consorcioFaqs) {
      expect(content.body).toContain(faq.q);
      expect(content.body).toContain(faq.a);
    }
  });

  it("inclui modalidades, comparação, consultoria e contato sem depender de JS", () => {
    const { body } = getConsorcioStaticContent();
    expect(consorcioModalities).toHaveLength(4);
    expect(consorcioComparison).toHaveLength(6);
    for (const item of consorcioModalities) expect(body).toContain(item.href);
    for (const id of ["comparar", "modalidades", "comparativo", "duvidas", "simulacao"]) {
      expect(body).toContain(`id="${id}"`);
    }
    expect(body).toContain("Tabela Price");
    expect(body).toContain("Não há data garantida de contemplação");
    expect(body).toContain("https://wa.me/");
    expect(body).not.toContain('style="display:none"');
  });

  it("descreve um serviço nacional sem inventar oferta ou avaliação agregada", () => {
    expect(consorcioServiceSchema["@type"]).toBe("Service");
    expect(consorcioServiceSchema.areaServed.alternateName).toBe("BR");
    expect(consorcioServiceSchema).not.toHaveProperty("offers");
    expect(consorcioServiceSchema).not.toHaveProperty("aggregateRating");
    expect(new URL(consorcioWhatsapp).hostname).toBe("wa.me");
  });

  it("compara custos nominais sem forçar economia positiva", () => {
    const base = calculateConsorcioScenario(scenario)!;
    expect(base.consortiumTotal).toBe(366000);
    expect(base.consortiumPayment).toBeCloseTo(2033.3333, 2);
    expect(base.nominalDifference).toBeGreaterThan(0);
    const noInterest = calculateConsorcioScenario({ ...scenario, monthlyInterestPercent: 0 })!;
    expect(noInterest.nominalDifference).toBeLessThan(0);
    expect(calculateConsorcioScenario({ ...scenario, downPayment: 400000 })).toBeNull();
  });
});
