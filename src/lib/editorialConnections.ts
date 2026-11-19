export interface EditorialTopic {
  id: string;
  label: string;
  pattern: RegExp;
  guide?: { slug: string; title: string };
  faqId?: string;
}

const guide = (slug: string, title: string) => ({ slug, title });

/** Ordem intencional: assuntos específicos precedem modalidades mais amplas. */
export const editorialTopics: EditorialTopic[] = [
  { id: "consorcio", label: "Consórcio", pattern: /consorcio|carta.*contemplada/, guide: guide("consorcio-guarulhos", "Guia de consórcio em Guarulhos"), faqId: "consorcio" },
  { id: "private", label: "Patro Private", pattern: /patro-private|patro private|patrimonio premium/, guide: guide("patro-private", "Guia de proteção patrimonial Patro Private") },
  { id: "consultorios", label: "Consultórios e clínicas", pattern: /consultorio|clinica|veterinari|odontolog|dentista|petshop/, guide: guide("seguros-para-consultorios", "Guia de seguros para consultórios e clínicas"), faqId: "consultorios" },
  { id: "cyber", label: "Seguro Cyber", pattern: /cyber|cibernetic|lgpd|ransomware|vazamento.*dados/, guide: guide("seguro-cyber", "Guia de seguro cyber"), faqId: "cyber" },
  { id: "garantia", label: "Seguro Garantia", pattern: /garantia|licitacao/, guide: guide("seguro-garantia", "Guia de seguro garantia"), faqId: "garantia" },
  { id: "credito", label: "Seguro de Crédito", pattern: /seguro.*credito|inadimplencia/, guide: guide("seguro-de-credito", "Guia de seguro de crédito"), faqId: "credito" },
  { id: "transporte", label: "Transporte e cargas", pattern: /transporte|cargas|transportadora|logistica/, guide: guide("seguro-transporte-cargas", "Guia de seguro transporte e cargas") },
  { id: "agro", label: "Agro e rural", pattern: /agro|rural|trator|colheit|pulveriz|pecuario/ },
  { id: "saude", label: "Planos de Saúde", pattern: /saude|carencia|coparticipacao|operadora|portabilidade/, guide: guide("plano-de-saude-guarulhos", "Guia de planos de saúde em Guarulhos"), faqId: "saude" },
  { id: "vida", label: "Seguro de Vida", pattern: /(?:^|[- ])vida(?:$|[- ])|previdencia|sucessorio|beneficiario/, guide: guide("seguro-vida", "Guia de seguro de vida"), faqId: "vida" },
  { id: "residencial", label: "Seguro Residencial", pattern: /residencial|residencia|flat|imovel alugado/, guide: guide("seguro-residencial-guarulhos", "Guia de seguro residencial em Guarulhos"), faqId: "residencial" },
  { id: "eletricos", label: "Veículos elétricos e híbridos", pattern: /(?:veiculos?|carros?)[- ](?:eletric|hibrid)|hibrid|byd|tesla/, guide: guide("seguro-auto-guarulhos", "Guia de seguro auto em Guarulhos"), faqId: "eletricos" },
  { id: "salas", label: "Salas comerciais", pattern: /sala-comercial|salas-comerciais|sala comercial|salas comerciais|coworking/, guide: guide("seguro-empresarial-guarulhos", "Guia de seguro empresarial em Guarulhos"), faqId: "salas" },
  { id: "auto", label: "Seguro Auto", pattern: /auto|veicul|motorista|carro|moto|frota|franquia|fipe|cnh|vistoria/, guide: guide("seguro-auto-guarulhos", "Guia de seguro auto em Guarulhos"), faqId: "auto" },
  { id: "empresarial", label: "Seguro Empresarial", pattern: /empres|comerc|galp|loja|industr|negocio/, guide: guide("seguro-empresarial-guarulhos", "Guia de seguro empresarial em Guarulhos"), faqId: "empresarial" },
];

const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Usa primeiro o assunto específico do endereço, depois a categoria editorial. */
export function getEditorialTopic(slug: string, category = ""): EditorialTopic | undefined {
  return editorialTopics.find((topic) => topic.pattern.test(normalize(slug)))
    ?? editorialTopics.find((topic) => topic.pattern.test(normalize(category)));
}

export function getTopicForFaq(categoryId: string): EditorialTopic | undefined {
  return editorialTopics.find((topic) => topic.faqId === categoryId);
}
