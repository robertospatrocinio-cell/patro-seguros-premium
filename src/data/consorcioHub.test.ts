import { describe, expect, it } from "vitest";
import { consorcioHub, consorcioFaqs, consorcioModalities, consorcioComparison, consorcioFinancialProductSchema, consorcioFaqSchema, consorcioSchema, consorcioWhatsapp, consorcioOfficialSources } from "./consorcioHub";
import { EMPRESA } from "../config/empresa";
import { getConsorcioStaticContent } from "./consorcioHubSeo";
import { calculateConsorcioScenario } from "../lib/consorcioSimulation";

const scenario = {
  credit: 300000, consortiumMonths: 180, administrationPercent: 20,
  reservePercent: 2, consortiumOtherCosts: 0, financingMonths: 180,
  downPayment: 0, monthlyInterestPercent: 1, financingOtherCosts: 0,
};

describe("Revisão do hub de consórcio", () => {
  it("mantém metadados claros dentro dos limites do projeto", () => {
    expect(consorcioHub.title.length).toBeLessThanOrEqual(60);
    expect(consorcioHub.description.length).toBeLessThanOrEqual(160);
    expect(consorcioHub.description).toContain("custos");
    expect(consorcioHub.h1).toContain("Consórcio");
    expect(consorcioHub.h1).not.toContain("Guarulhos");
  });

  it("mantém todas as respostas idênticas no conteúdo estático e na FAQ estruturada", () => {
    const content = getConsorcioStaticContent();
    expect(content.h1).toBe(consorcioHub.h1);
    expect(consorcioFaqs.length).toBeGreaterThanOrEqual(13);
    expect(consorcioFaqSchema.mainEntity).toHaveLength(consorcioFaqs.length);
    consorcioFaqs.forEach((faq, index) => {
      expect(content.body).toContain(faq.q);
      expect(content.body).toContain(faq.a);
      expect(consorcioFaqSchema.mainEntity[index]).toEqual({
        "@type": "Question", name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      });
    });
    expect(content.body).toContain("não garante a operação");
    expect(content.body).toContain("Não se aplica a veículos, máquinas ou serviços");
  });

  it("oferece modalidades, comparação, contato e fontes oficiais sem depender de JS", () => {
    const { body } = getConsorcioStaticContent();
    expect(consorcioModalities).toHaveLength(4);
    expect(consorcioComparison).toHaveLength(6);
    for (const item of consorcioModalities) expect(body).toContain(item.href);
    for (const id of ["comparar", "modalidades", "comparativo", "duvidas", "simulacao"]) {
      expect(body).toContain(`id="${id}"`);
    }
    for (const source of consorcioOfficialSources) {
      expect(new URL(source.url).protocol).toBe("https:");
      expect(body).toContain(source.url);
    }
    expect(body).toContain("Tabela Price");
    expect(body).toContain("Não há data garantida de contemplação");
    expect(body).not.toContain('style="display:none"');
    const whatsapp = new URL(consorcioWhatsapp);
    expect(whatsapp.hostname).toBe("wa.me");
    expect(whatsapp.searchParams.get("text")).toContain("consórcio");
  });

  it("preserva identificadores e instituição, sem avaliações ou ofertas inventadas", () => {
    expect(consorcioSchema["@context"]).toBe("https://schema.org");
    expect(consorcioSchema["@graph"]).toEqual([consorcioFinancialProductSchema, consorcioFaqSchema]);
    expect(consorcioFinancialProductSchema["@id"]).toBe(`${EMPRESA.dominioCanonico}/consorcio#product`);
    expect(consorcioFinancialProductSchema.interestRate).toBe(0);
    expect(consorcioFinancialProductSchema.feesAndCommissionsSpecification).toBe(consorcioHub.warning);
    expect(consorcioFinancialProductSchema.provider).toMatchObject({
      "@id": `${EMPRESA.dominioCanonico}/#insurance-agency`, name: EMPRESA.razaoSocial,
      telephone: EMPRESA.telefoneE164, taxID: EMPRESA.cnpj,
    });
    expect(consorcioFinancialProductSchema).not.toHaveProperty("offers");
    expect(consorcioFinancialProductSchema).not.toHaveProperty("aggregateRating");
  });

  it("calcula custos nominais sem forçar economia e trata entrada integral e juro próximo de zero", () => {
    const base = calculateConsorcioScenario(scenario)!;
    expect(base.consortiumTotal).toBe(366000);
    expect(base.consortiumPayment).toBeCloseTo(2033.333333, 6);
    expect(base.nominalDifference).toBeGreaterThan(0);
    const zero = calculateConsorcioScenario({ ...scenario, monthlyInterestPercent: 0 })!;
    expect(zero.financingPayment).toBeCloseTo(300000 / 180, 6);
    expect(zero.nominalDifference).toBeLessThan(0);
    const nearZero = calculateConsorcioScenario({ ...scenario, monthlyInterestPercent: 0.00000001 })!;
    expect(nearZero.financingPayment).toBeCloseTo(zero.financingPayment, 3);
    const full = calculateConsorcioScenario({ ...scenario, downPayment: scenario.credit, financingOtherCosts: 1000 })!;
    expect(full.financingPayment).toBe(0);
    expect(full.financingTotal).toBe(301000);
  });

  it.each([
    { credit: NaN }, { credit: Infinity }, { credit: 999 }, { credit: 100000001 },
    { consortiumMonths: 36.5 }, { financingMonths: 0 }, { consortiumMonths: 481 },
    { downPayment: 400000 }, { reservePercent: -1 }, { administrationPercent: 101 },
    { monthlyInterestPercent: 11 }, { consortiumOtherCosts: 100000001 },
  ])("recusa cenário inválido: %j", patch => {
    expect(calculateConsorcioScenario({ ...scenario, ...patch })).toBeNull();
  });
});
