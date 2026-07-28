export interface MaterialItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  href: string;
  relatedHref: string;
  relatedLabel: string;
  whatsapp: string;
}

const WA = (msg: string) => `https://wa.me/5511913800021?text=${encodeURIComponent(msg)}`;

export const materiais: MaterialItem[] = [
  { slug: "checklist-renovar-seguro-auto", title: "Checklist para renovar seguro auto", description: "Passos para revisar coberturas, franquia, perfil e uso antes de renovar sua apólice.", category: "Auto", href: "/materiais/checklist-renovar-seguro-auto", relatedHref: "/seguro-auto", relatedLabel: "Ver Seguro Auto", whatsapp: WA("Olá, quero o checklist de renovação do seguro auto e cotar com a Patro.") },
  { slug: "checklist-seguro-empresarial", title: "Checklist para contratar seguro empresarial", description: "O que reunir antes da cotação: atividade, faturamento, m², estoque, equipamentos e contratos.", category: "Empresarial", href: "/materiais/checklist-seguro-empresarial", relatedHref: "/seguro-empresarial", relatedLabel: "Ver Seguro Empresarial", whatsapp: WA("Olá, quero o checklist de seguro empresarial da Patro.") },
  { slug: "checklist-plano-saude-empresarial", title: "Checklist para contratar plano de saúde empresarial", description: "Vidas, faixas etárias, coparticipação, rede, reajuste e portabilidade — reunidos antes da proposta.", category: "Saúde", href: "/materiais/checklist-plano-saude-empresarial", relatedHref: "/plano-saude-empresarial", relatedLabel: "Ver Plano Empresarial", whatsapp: WA("Olá, quero o checklist de plano de saúde empresarial da Patro.") },
  { slug: "checklist-anual-seguros-empresa", title: "Checklist anual de seguros para empresas", description: "Revisão anual de patrimonial, RC, frota, vida em grupo, cyber e garantia.", category: "Empresarial", href: "/materiais/checklist-anual-seguros-empresa", relatedHref: "/seguro-empresarial", relatedLabel: "Ver Seguro Empresarial", whatsapp: WA("Olá, quero o checklist anual de seguros empresariais.") },
  { slug: "checklist-seguro-consultorio", title: "Checklist para proteger consultório ou clínica", description: "Equipamentos, RC Profissional, cyber, LGPD, lucros cessantes e assistência.", category: "Consultórios", href: "/materiais/checklist-seguro-consultorio", relatedHref: "/seguro-consultorio-guarulhos", relatedLabel: "Ver Seguro para Consultórios", whatsapp: WA("Olá, quero o checklist de seguro para consultório.") },
  { slug: "checklist-consorcio", title: "Checklist para contratar consórcio", description: "Objetivo, prazo, valor da carta, taxa de administração, fundo de reserva e regras do grupo.", category: "Consórcio", href: "/materiais/checklist-consorcio", relatedHref: "/consorcio", relatedLabel: "Ver Consórcio", whatsapp: WA("Olá, quero o checklist de consórcio da Patro.") },
  { slug: "checklist-seguro-galpao", title: "Checklist para seguro de galpão", description: "Endereço, atividade, m², valor de estoque, conteúdo e proteções contra incêndio e roubo.", category: "Empresarial", href: "/materiais/checklist-seguro-galpao", relatedHref: "/seguro-galpao", relatedLabel: "Ver Seguro para Galpões", whatsapp: WA("Olá, quero o checklist de seguro para galpão.") },
  { slug: "checklist-seguro-frota", title: "Checklist para seguro de frota", description: "Quantidade de veículos, uso, condutores, sinistralidade e coberturas ampliadas.", category: "Frota", href: "/materiais/checklist-seguro-frota", relatedHref: "/seguro-frota", relatedLabel: "Ver Seguro de Frota", whatsapp: WA("Olá, quero o checklist de seguro de frota.") },
  { slug: "checklist-seguro-cyber", title: "Checklist para seguro cyber", description: "MFA, backups, treinamento anti-phishing, políticas de acesso e dados sensíveis.", category: "Cyber", href: "/materiais/checklist-seguro-cyber", relatedHref: "/seguro-cyber", relatedLabel: "Ver Seguro Cyber", whatsapp: WA("Olá, quero o checklist de seguro cyber.") },
  { slug: "checklist-imoveis-investimento", title: "Checklist para imóveis de investimento", description: "Locação, temporada, mobiliado, RC, incêndio e proteção de conteúdo para investidores.", category: "Residencial", href: "/materiais/checklist-imoveis-investimento", relatedHref: "/seguro-residencial", relatedLabel: "Ver Seguro Residencial", whatsapp: WA("Olá, quero o checklist para imóveis de investimento.") },
];