import { COMPANY, ORGANIZATION_SCHEMA } from "../config/company";

export const eoPath = "/seguro-eo-engenharia-aeroportos";
export const eoArticlePath = "/blog/seguro-eo-engenharia-prestadores-servicos-aeroportos";
const url = COMPANY.dominioCanonico + eoPath;
export const eoMeta = {
  title: "Seguro E&O Engenharia para Aeroportos | Patro Seguros",
  description: "Precisa de Seguro E&O Engenharia para atuar no Aeroporto de Guarulhos? Envie as exigências do contrato e solicite uma cotação com a Patro Seguros.",
  h1: "Seguro E&O Engenharia para Empresas que Prestam Serviços em Aeroportos",
  canonical: url, ogUrl: url, ogType: "website" as const,
  ogImage: `${COMPANY.dominioCanonico}/images/engenharia-aeroportuaria-projetos.jpg`,
  ogImageAlt: "Profissionais de engenharia com capacetes e coletes revisam uma planta junto à janela de um terminal aeroportuário.",
};
export const eoLocal = "A Patro Seguros atende empresas que prestam serviços no Aeroporto Internacional de São Paulo/Guarulhos (GRU Airport) e em outros aeroportos do Brasil. A corretora fica na Cidade Maia, em Guarulhos, fora do aeroporto. O atendimento não implica vínculo com a concessionária nem aprovação da apólice pela contratante.";
export const eoSchema = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url, url, name: eoMeta.title, description: eoMeta.description, inLanguage: "pt-BR", mainEntity: { "@id": `${url}#service` } },
    { "@type": "Service", "@id": `${url}#service`, url, name: "Cotação de Seguro E&O Engenharia para Aeroportos", serviceType: "Corretagem de seguro de responsabilidade civil profissional", description: eoMeta.description, provider: { "@type": "InsuranceAgency", "@id": ORGANIZATION_SCHEMA["@id"], name: COMPANY.nomeFantasia, url: COMPANY.dominioCanonico }, areaServed: ORGANIZATION_SCHEMA.areaServed },
  ],
};
