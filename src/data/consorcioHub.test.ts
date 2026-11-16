import { describe, expect, it } from "vitest";
import { consorcioHub, consorcioFaqs, consorcioModalities, consorcioComparison, consorcioFinancialProductSchema, consorcioFaqSchema, consorcioSchema, consorcioWhatsapp } from "./consorcioHub";
import { EMPRESA } from "../config/empresa";
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

  it("descreve o produto financeiro nacional com custos e dados oficiais", () => {
    expect(consorcioFinancialProductSchema["@type"]).toBe("FinancialProduct");
    expect(consorcioFinancialProductSchema["@id"]).toBe(`${EMPRESA.dominioCanonico}/consorcio#product`);
    expect(consorcioFinancialProductSchema.areaServed.alternateName).toBe("BR");
    expect(consorcioFinancialProductSchema.interestRate).toBe(0);
    expect(consorcioFinancialProductSchema.feesAndCommissionsSpecification).toBe(consorcioHub.warning);
    expect(consorcioFinancialProductSchema.provider).toMatchObject({
      "@id": `${EMPRESA.dominioCanonico}/#insurance-agency`,
      name: EMPRESA.razaoSocial,
      telephone: EMPRESA.telefoneE164,
      taxID: EMPRESA.cnpj,
    });
    expect(consorcioFinancialProductSchema).not.toHaveProperty("offers");
    expect(consorcioFinancialProductSchema).not.toHaveProperty("aggregateRating");
    expect(new URL(consorcioWhatsapp).hostname).toBe("wa.me");
  });

  it("reúne produto e uma única FAQ idêntica às seis respostas visíveis", () => {
    expect(consorcioSchema["@context"]).toBe("https://schema.org");
    expect(consorcioSchema["@graph"]).toEqual([consorcioFinancialProductSchema, consorcioFaqSchema]);
    expect(consorcioFaqSchema["@type"]).toBe("FAQPage");
    expect(consorcioFaqSchema["@id"]).toBe(`${EMPRESA.dominioCanonico}/consorcio#faq`);
    expect(consorcioFaqSchema.mainEntity).toHaveLength(6);
    consorcioFaqSchema.mainEntity.forEach((question, index) => {
      expect(question["@type"]).toBe("Question");
      expect(question.name).toBe(consorcioFaqs[index].q);
      expect(question.acceptedAnswer).toEqual({ "@type": "Answer", text: consorcioFaqs[index].a });
    });
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
