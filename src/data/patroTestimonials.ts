/**
 * PATRO_TESTIMONIALS — Depoimentos reais para exibir em prova social.
 *
 * ⚠️ IMPORTANTE
 * Não inventar clientes. Cada entrada deve ser um depoimento real, com
 * autorização do autor (Google Review pública já é permitida citar por ser
 * conteúdo público publicado pelo próprio cliente).
 *
 * Os itens abaixo marcados com `placeholder: true` são estruturas de exemplo
 * para o layout — devem ser substituídos por avaliações reais (o Roberto vai
 * enviar). Enquanto estiverem como placeholder, o componente exibe um badge
 * "Exemplo" em vez de tratar como depoimento verificado.
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
};

// TODO: SUBSTITUIR POR AVALIAÇÕES REAIS (Roberto vai enviar)
// Enquanto isso, os cards abaixo são exibidos com badge "Exemplo".
export const PATRO_TESTIMONIALS: PatroTestimonial[] = [
  {
    name: "Aguardando avaliação real",
    location: "Guarulhos/SP",
    insurance: "Seguro Auto",
    text: "Espaço reservado para depoimento real do cliente. Substituir por avaliação do Google Reviews com autorização.",
    date: "—",
    placeholder: true,
  },
  {
    name: "Aguardando avaliação real",
    location: "Guarulhos/SP",
    insurance: "Seguro Residencial",
    text: "Espaço reservado para depoimento real do cliente. Substituir por avaliação do Google Reviews com autorização.",
    date: "—",
    placeholder: true,
  },
  {
    name: "Aguardando avaliação real",
    location: "Guarulhos/SP",
    insurance: "Seguro Empresarial",
    text: "Espaço reservado para depoimento real do cliente. Substituir por avaliação do Google Reviews com autorização.",
    date: "—",
    placeholder: true,
  },
  {
    name: "Aguardando avaliação real",
    location: "Guarulhos/SP",
    insurance: "Seguro Vida",
    text: "Espaço reservado para depoimento real do cliente. Substituir por avaliação do Google Reviews com autorização.",
    date: "—",
    placeholder: true,
  },
  {
    name: "Aguardando avaliação real",
    location: "Guarulhos/SP",
    insurance: "Seguro Saúde",
    text: "Espaço reservado para depoimento real do cliente. Substituir por avaliação do Google Reviews com autorização.",
    date: "—",
    placeholder: true,
  },
  {
    name: "Aguardando avaliação real",
    location: "Guarulhos/SP",
    insurance: "Seguro Auto Premium",
    text: "Espaço reservado para depoimento real do cliente. Substituir por avaliação do Google Reviews com autorização.",
    date: "—",
    placeholder: true,
  },
];