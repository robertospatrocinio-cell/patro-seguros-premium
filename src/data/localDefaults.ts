import type { LocalInsurer, LocalTestimonial } from "@/components/LocalPageTemplate";

/**
 * Defaults reutilizáveis para páginas locais e de bairro.
 * Use override por página sempre que houver depoimento real do bairro.
 */

export const DEFAULT_INSURERS: LocalInsurer[] = [
  { name: "Porto Seguro", highlight: "rede referenciada ampla em Guarulhos e cobertura para apps" },
  { name: "Allianz", highlight: "ótima precificação para condutores acima de 30 anos" },
  { name: "HDI", highlight: "competitiva para veículos populares e seminovos" },
  { name: "Tokio Marine", highlight: "perfil flexível para Uber, 99 e InDriver" },
  { name: "Bradesco Seguros", highlight: "rede integrada ao banco e parcelamento facilitado" },
  { name: "SulAmérica", highlight: "forte em saúde e auto premium" },
  { name: "Liberty", highlight: "boa para perfis jovens com franquia reduzida" },
  { name: "Mapfre", highlight: "histórico sólido em sinistros e assistência 24h" },
  { name: "Azul Seguros", highlight: "preços agressivos para CEPs de baixo risco" },
];

export const DEFAULT_TESTIMONIALS: LocalTestimonial[] = [
  {
    author: "Marcelo R.",
    neighborhood: "Cidade Maia, Guarulhos",
    quote:
      "Atendimento humano de verdade. A Patro recotou meu seguro auto na renovação e economizei R$ 1.100/ano sem perder cobertura.",
    rating: 5,
  },
  {
    author: "Juliana P.",
    neighborhood: "Vila Augusta, Guarulhos",
    quote:
      "Roubaram meu carro perto do GRU e a Patro acompanhou o processo todo. Indenização integral em 18 dias.",
    rating: 5,
  },
  {
    author: "Roberto S.",
    neighborhood: "Bonsucesso, Guarulhos",
    quote:
      "Tinha plano individual caro. Migrei para plano MEI pela Patro e economizo R$ 380/mês com a mesma rede.",
    rating: 5,
  },
  {
    author: "Ana L.",
    neighborhood: "Centro, Guarulhos",
    quote:
      "Cotação em 2h, comparativo claro entre 7 seguradoras. Fechei pela primeira vez com corretora local e não troco mais.",
    rating: 5,
  },
];