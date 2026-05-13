import { guarulhosArticlesContent } from "./blogGuarulhosContent";

export const articlesContent: Record<string, { title: string; content: string; faqs: { q: string; a: string }[] }> = {
  ...guarulhosArticlesContent,
  "crescimento-patrimonial-guarulhos-2026": {
    title: "Crescimento Patrimonial: Por que a Proteção é o Acelerador que Poucos Usam?",
    content: "Muitos acreditam que crescer financeiramente resume-se apenas a investir em renda variável ou imóveis...",
    faqs: [
      { q: "O consórcio é considerado um investimento?", a: "Sim, especialmente quando usado como ferramenta de alavancagem..." }
    ]
  },
  "porto-vs-tokio-marine-residencial-2026": {
    title: "Porto Seguro vs Tokio Marine: Qual o Melhor Seguro Residencial em 2026?",
    content: "Porto Seguro e Tokio Marine são duas das principais seguradoras do Brasil em seguro residencial...",
    faqs: [
      { q: "Porto Seguro ou Tokio Marine: qual é melhor?", a: "Porto vence em assistência, Tokio em preço..." }
    ]
  }
};
