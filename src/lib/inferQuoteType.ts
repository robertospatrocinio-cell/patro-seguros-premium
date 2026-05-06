// Map a page path/title to the Cotacao select value
export const inferQuoteTypeFromText = (text: string): string => {
  const t = (text || "").toLowerCase();
  if (t.includes("auto") || t.includes("carro") || t.includes("moto")) return "auto";
  if (t.includes("vida")) return "vida";
  if (t.includes("residencial") || t.includes("casa") || t.includes("imovel") || t.includes("imóvel") || t.includes("condominio") || t.includes("condomínio")) return "residencial";
  if (t.includes("viagem")) return "viagem";
  if (t.includes("saude") || t.includes("saúde") || t.includes("odonto") || t.includes("plano-de-saude")) return "saude";
  if (t.includes("frota")) return "frota";
  if (t.includes("rc") || t.includes("responsabilidade")) return "rc";
  if (t.includes("empresa") || t.includes("pme") || t.includes("galpao") || t.includes("galpão") || t.includes("industria") || t.includes("indústria") || t.includes("comercial")) return "empresarial";
  return "";
};