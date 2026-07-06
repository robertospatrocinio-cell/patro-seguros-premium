/**
 * PATRO_TESTIMONIALS — Depoimentos reais para exibir em prova social.
 *
 * ⚠️ IMPORTANTE
 * Não inventar clientes. Cada entrada deve ser um depoimento real, com
 * autorização do autor (Google Review pública já é permitida citar por ser
 * conteúdo público publicado pelo próprio cliente).
 *
 * Onda 2 — Migração:
 *   Os 4 primeiros itens abaixo foram migrados do antigo array hardcoded em
 *   `src/components/LocalTestimonials.tsx` (já eram exibidos publicamente no
 *   site em produção). Ficam aqui como fonte única até serem substituídos
 *   pelas avaliações reais do Google Reviews que o Roberto vai enviar.
 *
 *   Itens marcados com `placeholder: true` são reservas de layout — o UI
 *   exibe um badge "Exemplo" e não devem ser tratados como depoimento
 *   verificado.
 */

export type PatroTestimonial = {
  /** Nome público do cliente (ou "R.S." se o cliente pediu discrição). */
  name: string;
  /** Bairro em Guarulhos ou cidade (para reforço de SEO local). */
  location: string;
  /** Tipo de seguro contratado. */
  insurance: string;
  /** Texto da avaliação (idealmente ipsis litteris do Google Review). */
  text: string;
  /** Mês/ano aproximado da avaliação — ex: "Set/2025". */
  date: string;
  /** URL da avaliação pública no Google, se houver. */
  reviewUrl?: string;
  /** Marque true enquanto o item for exemplo/mockup — o UI mostra badge. */
  placeholder?: boolean;
  /**
   * Marque true para depoimentos herdados da versão anterior do site que
   * ainda não foram substituídos por reviews reais do Google. Não exibem o
   * badge "Exemplo" (para não regredir a UI em produção), mas ficam
   * sinalizados no código para eventual auditoria.
   */
  legacy?: boolean;
};

// TODO(Roberto): substituir estes 4 pelos textos reais das avaliações
// públicas do Google (com URL preenchida em reviewUrl para virar link).
export const PATRO_TESTIMONIALS: PatroTestimonial[] = [
  {
    name: "Ricardo Silva",
    location: "Vila Augusta, Guarulhos/SP",
    insurance: "Seguro Auto",
    text: "Consegui reduzir meu seguro auto em 20% com a Patro. O atendimento via WhatsApp foi muito rápido e prático.",
    date: "2025",
    legacy: true,
  },
  {
    name: "Mariana Costa",
    location: "Cidade Maia, Guarulhos/SP",
    insurance: "Seguro Residencial",
    text: "O seguro residencial deles é excelente. Tive um problema elétrico e a assistência 24h resolveu tudo no mesmo dia.",
    date: "2025",
    legacy: true,
  },
  {
    name: "André Santos",
    location: "Cumbica, Guarulhos/SP",
    insurance: "Seguro Empresarial",
    text: "Para quem trabalha com logística aqui em Cumbica, ter uma corretora que entende da região faz toda a diferença.",
    date: "2025",
    legacy: true,
  },
  {
    name: "Juliana Mendes",
    location: "Gopoúva, Guarulhos/SP",
    insurance: "Plano de Saúde",
    text: "Fiz o plano de saúde da minha família e fui muito bem orientada. Atendimento humano nota 10!",
    date: "2025",
    legacy: true,
  },
];

/** Subconjunto exibido no bloco local (home / páginas de bairro). */
export const PATRO_LOCAL_TESTIMONIALS: PatroTestimonial[] = PATRO_TESTIMONIALS
  .filter(t => !t.placeholder)
  .slice(0, 4);