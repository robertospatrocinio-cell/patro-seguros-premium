import { describe, expect, it } from "vitest";
import { EMPRESA } from "../config/empresa";
import { consorcioModalities } from "./consorcioHub";
import { CONSORCIO_NATIONAL_PAGES, getConsorcioNationalStaticContent } from "./consorcioNacional";
import { consorcioVeiculosFaqs, consorcioVeiculosFinancialProductSchema, consorcioVeiculosPath, consorcioVeiculosSchema } from "./consorcioVeiculos";

const page = CONSORCIO_NATIONAL_PAGES.find(item => item.path === consorcioVeiculosPath)!;

 describe("Dados estruturados do consórcio de veículos", () => {
  it("descreve o produto nacional com a identidade oficial e os custos", () => {
    const product = consorcioVeiculosFinancialProductSchema;
    expect(product["@type"]).toBe("FinancialProduct");
    expect(product["@id"]).toBe(`${EMPRESA.dominioCanonico}${consorcioVeiculosPath}#product`);
    expect(product.url).toBe(`${EMPRESA.dominioCanonico}${consorcioVeiculosPath}`);
    expect(product.category).toBe("Consórcio de Automóveis e Motos");
    expect(product.interestRate).toBe(0);
    expect(product.amount).toEqual({
      "@type": "MonetaryAmount", currency: "BRL", minValue: 30000, maxValue: 350000,
    });
    expect(product.areaServed.alternateName).toBe("BR");
    expect(product.provider["@id"]).toBe(`${EMPRESA.dominioCanonico}/#insurance-agency`);
    expect(product.provider.name).toBe(EMPRESA.razaoSocial);
    expect(product.description).toContain("sujeitas à disponibilidade do grupo");
    expect(product.feesAndCommissionsSpecification).toContain("Taxa de administração");
  });

  it("mantém a faixa de crédito visível alinhada à marcação", () => {
    const modality = consorcioModalities.find(item => item.href === consorcioVeiculosPath)!;
    expect(modality.range).toContain("R$ 30 mil a R$ 350 mil");
    expect(page.bullets[0]).toContain(modality.range);
    expect(page.bullets[0]).toContain("sujeitas à disponibilidade");
  });

  it("compartilha as cinco respostas entre a página, a versão estática e uma única FAQ", () => {
    expect(page.faqs).toBe(consorcioVeiculosFaqs);
    const graph = consorcioVeiculosSchema["@graph"];
    expect(graph).toHaveLength(2);
    expect(graph.filter(item => item["@type"] === "FAQPage")).toHaveLength(1);
    const faq = graph.find(item => "mainEntity" in item)!;
    if (!("mainEntity" in faq)) throw new Error("FAQ ausente");
    expect(faq["@id"]).toBe(`${EMPRESA.dominioCanonico}${consorcioVeiculosPath}#faq`);
    expect(faq.mainEntity).toHaveLength(5);
    const { body } = getConsorcioNationalStaticContent(page);
    faq.mainEntity.forEach((item, index) => {
      expect(item.name).toBe(page.faqs[index].question);
      expect(item.acceptedAnswer.text).toBe(page.faqs[index].answer);
      expect(body).toContain(item.name);
      expect(body).toContain(item.acceptedAnswer.text);
    });
  });

  it("explica os limites de idade, reajustes, saldo e contratação digital", () => {
    expect(page.faqs[0].answer).toContain("limite de ano de fabricação não é universal");
    expect(page.faqs[1].answer).toContain("regras após a contemplação");
    expect(page.faqs[2].answer).toContain("limite de até 10% do crédito");
    expect(page.faqs[2].answer).toContain("não significa que toda a diferença");
    expect(page.faqs[3].answer).toContain("não libera automaticamente");
    expect(page.faqs[4].answer).toContain("etapas presenciais");
    expect(page.faqs[4].answer).toContain("nem de contemplação em data específica");
  });
});
