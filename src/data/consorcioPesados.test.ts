import { describe, expect, it } from "vitest";
import { EMPRESA } from "../config/empresa";
import { consorcioModalities } from "./consorcioHub";
import { CONSORCIO_NATIONAL_PAGES, getConsorcioNationalStaticContent } from "./consorcioNacional";
import { consorcioPesadosFaqs, consorcioPesadosFinancialProductSchema, consorcioPesadosPath, consorcioPesadosSchema } from "./consorcioPesados";

const page = CONSORCIO_NATIONAL_PAGES.find(item => item.path === consorcioPesadosPath)!;

describe("Dados estruturados do consórcio de pesados e máquinas", () => {
  it("descreve o produto nacional com a identidade oficial e os custos", () => {
    const product = consorcioPesadosFinancialProductSchema;
    expect(product["@type"]).toBe("FinancialProduct");
    expect(product["@id"]).toBe(`${EMPRESA.dominioCanonico}${consorcioPesadosPath}#product`);
    expect(product.url).toBe(`${EMPRESA.dominioCanonico}${consorcioPesadosPath}`);
    expect(product.interestRate).toBe(0);
    expect(product.amount).toEqual({
      "@type": "MonetaryAmount", currency: "BRL", minValue: 150000, maxValue: 2000000,
    });
    expect(product.areaServed.alternateName).toBe("BR");
    expect(product.provider["@id"]).toBe(`${EMPRESA.dominioCanonico}/#insurance-agency`);
    expect(product.provider.name).toBe(EMPRESA.razaoSocial);
    expect(product.feesAndCommissionsSpecification).toContain("Taxa de administração");
    expect(product.description).toContain("sujeitas à disponibilidade do grupo");
  });

  it("mantém a faixa de crédito visível alinhada à marcação", () => {
    const modality = consorcioModalities.find(item => item.href === consorcioPesadosPath)!;
    expect(modality.range).toContain("R$ 150 mil a R$ 2 milhões");
    expect(page.bullets[0]).toContain(modality.range);
    expect(page.bullets[0]).toContain("sujeitas à disponibilidade");
  });

  it("publica as mesmas cinco respostas na página, no conteúdo estático e em uma única FAQ", () => {
    expect(page.faqs).toBe(consorcioPesadosFaqs);
    const graph = consorcioPesadosSchema["@graph"];
    expect(graph).toHaveLength(2);
    expect(graph.filter(item => item["@type"] === "FAQPage")).toHaveLength(1);
    const faq = graph.find(item => "mainEntity" in item)!;
    if (!("mainEntity" in faq)) throw new Error("FAQ ausente");
    expect(faq["@id"]).toBe(`${EMPRESA.dominioCanonico}${consorcioPesadosPath}#faq`);
    expect(faq.mainEntity).toHaveLength(5);
    const { body } = getConsorcioNationalStaticContent(page);
    faq.mainEntity.forEach((item, index) => {
      expect(item.name).toBe(page.faqs[index].question);
      expect(item.acceptedAnswer.text).toBe(page.faqs[index].answer);
      expect(body).toContain(item.name);
      expect(body).toContain(item.acceptedAnswer.text);
    });
  });

  it("preserva as perguntas das demais modalidades", () => {
    const realEstate = CONSORCIO_NATIONAL_PAGES.find(item => item.path === "/consorcio-imoveis")!;
    expect(realEstate.faqs).toHaveLength(3);
    expect(realEstate.faqs).not.toBe(consorcioPesadosFaqs);
  });
});
