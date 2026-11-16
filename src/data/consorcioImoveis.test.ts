import { describe, expect, it } from "vitest";
import { EMPRESA } from "../config/empresa";
import { consorcioModalities } from "./consorcioHub";
import { CONSORCIO_NATIONAL_PAGES, getConsorcioNationalStaticContent } from "./consorcioNacional";
import { consorcioImoveisFaqs, consorcioImoveisFinancialProductSchema, consorcioImoveisPath, consorcioImoveisSchema } from "./consorcioImoveis";

const page = CONSORCIO_NATIONAL_PAGES.find(item => item.path === consorcioImoveisPath)!;

describe("Dados estruturados do consórcio de imóveis", () => {
  it("descreve o produto nacional com a identidade oficial e os custos", () => {
    const product = consorcioImoveisFinancialProductSchema;
    expect(product["@type"]).toBe("FinancialProduct");
    expect(product["@id"]).toBe(`${EMPRESA.dominioCanonico}${consorcioImoveisPath}#product`);
    expect(product.url).toBe(`${EMPRESA.dominioCanonico}${consorcioImoveisPath}`);
    expect(product.interestRate).toBe(0);
    expect(product.amount).toEqual({
      "@type": "MonetaryAmount", currency: "BRL", minValue: 100000, maxValue: 2000000,
    });
    expect(product.areaServed.alternateName).toBe("BR");
    expect(product.provider["@id"]).toBe(`${EMPRESA.dominioCanonico}/#insurance-agency`);
    expect(product.provider.name).toBe(EMPRESA.razaoSocial);
    expect(product.feesAndCommissionsSpecification).toContain("Taxa de administração");
    expect(product.description).toContain("sujeitas à disponibilidade do grupo");
    expect(product.description).toContain("FGTS apenas nas operações habitacionais elegíveis");
  });

  it("alinha a faixa de crédito visível à marcação", () => {
    const modality = consorcioModalities.find(item => item.href === consorcioImoveisPath)!;
    expect(modality.range).toContain("R$ 100 mil a R$ 2 milhões");
    expect(modality.range).not.toContain("milhões+");
    expect(page.bullets[0]).toContain(modality.range);
    expect(page.bullets[0]).toContain("sujeitas à disponibilidade");
  });

  it("compartilha as cinco respostas entre a página, a versão estática e uma única FAQ", () => {
    expect(page.faqs).toBe(consorcioImoveisFaqs);
    const graph = consorcioImoveisSchema["@graph"];
    expect(graph).toHaveLength(2);
    expect(graph.filter(item => item["@type"] === "FAQPage")).toHaveLength(1);
    const faq = graph.find(item => "mainEntity" in item)!;
    if (!("mainEntity" in faq)) throw new Error("FAQ ausente");
    expect(faq["@id"]).toBe(`${EMPRESA.dominioCanonico}${consorcioImoveisPath}#faq`);
    expect(faq.mainEntity).toHaveLength(5);
    const { body } = getConsorcioNationalStaticContent(page);
    faq.mainEntity.forEach((item, index) => {
      expect(item.name).toBe(page.faqs[index].question);
      expect(item.acceptedAnswer.text).toBe(page.faqs[index].answer);
      expect(body).toContain(item.name);
      expect(body).toContain(item.acceptedAnswer.text);
    });
  });

  it("evita promessas de reajuste, rendimento e liberação automática", () => {
    expect(page.faqs[0].answer).toContain("quitação total");
    expect(page.faqs[1].answer).toContain("não é obrigatório em todos os grupos");
    expect(page.faqs[2].answer).toContain("FGTS não se aplica à aquisição de imóvel rural");
    expect(page.faqs[3].answer).toContain("não garante retorno fixo");
    expect(page.faqs[4].answer).toContain("etapas presenciais");
  });
});
