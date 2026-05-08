import type { SeoLocalPageConfig } from "./seoLocalAutoPages";

const partnersLineSaude = "Bradesco Saúde, Amil, SulAmérica, Porto Saúde, HapVida/NotreDame Intermédica, Prevent Senior e MedSenior — comparamos todas as tabelas em Guarulhos.";

const saudeCoverages = [
  { title: "Consultas e Exames", description: "Acesso a consultas em todas as especialidades médicas e exames laboratoriais e de imagem." },
  { title: "Internação e Cirurgia", description: "Cobertura hospitalar completa em quartos coletivos ou privativos, conforme o plano escolhido." },
  { title: "Urgência e Emergência", description: "Atendimento 24h em pronto-socorro para casos agudos ou acidentes." },
  { title: "Maternidade", description: "Acompanhamento pré-natal completo e assistência ao parto (respeitando carências)." },
  { title: "Odontologia (Opcional)", description: "Possibilidade de incluir cobertura para tratamentos dentários, limpeza e cirurgias orais." },
  { title: "Telemedicina", description: "Consultas online via vídeo 24h por dia, sem sair de casa, incluso em quase todos os planos." },
];

interface SaudeBairroSeed {
  slug: string;
  bairro: string;
  hospitais: string[];
  clinicas: string[];
  referenciaLocal: string;
  precoMedio: string;
}

const saudeBairros: SaudeBairroSeed[] = [
  {
    slug: "plano-saude-centro-guarulhos",
    bairro: "Centro",
    hospitais: ["Hospital Carlos Chagas", "Hospital 8 de Maio (Próximo)", "Hospital Stella Maris"],
    clinicas: ["Centro Médico Amil", "Laboratório Lavoisier Centro", "Delboni Auriemo"],
    referenciaLocal: "próximo à Praça Getúlio Vargas e Avenida Tiradentes",
    precoMedio: "R$ 290 a R$ 580/mês (individual)"
  },
  {
    slug: "plano-saude-cidade-maia",
    bairro: "Cidade Maia",
    hospitais: ["Hospital Stella Maris", "Hospital Carlos Chagas", "Rede Própria GNDI"],
    clinicas: ["Laboratório Fleury (Shopping Maia)", "Centro Médico São Gabriel", "A+ Medicina Diagnóstica"],
    referenciaLocal: "no entorno do Shopping Maia e Avenida Paulo Faccini",
    precoMedio: "R$ 310 a R$ 620/mês (individual)"
  },
  {
    slug: "plano-saude-picanco",
    bairro: "Picanço",
    hospitais: ["Hospital Stella Maris", "Hospital Ipiranga (Vila Augusta)", "Hospital Carlos Chagas"],
    clinicas: ["Centro Médico Picanço", "Laboratório Delboni", "Clínica de Especialidades local"],
    referenciaLocal: "próximo ao Parque Shopping Maia e Avenida Suplicy",
    precoMedio: "R$ 285 a R$ 590/mês (individual)"
  },
  {
    slug: "plano-saude-vila-augusta",
    bairro: "Vila Augusta",
    hospitais: ["Hospital Ipiranga", "Hospital Stella Maris", "Hospital Carlos Chagas"],
    clinicas: ["Centro Médico GNDI", "Laboratório Lavoisier Vila Augusta", "CDB Medicina Diagnóstica"],
    referenciaLocal: "região da Avenida Guarulhos e Parque Cecap",
    precoMedio: "R$ 300 a R$ 600/mês (individual)"
  }
];

export const seoLocalSaudePages: Record<string, SeoLocalPageConfig> = saudeBairros.reduce((acc, b) => {
  acc[b.slug] = {
    slug: b.slug,
    title: `Plano de Saúde ${b.bairro} (Guarulhos) — Preços e Hospitais`,
    subtitle: `Compare os melhores planos de saúde para moradores do ${b.bairro}. Atendimento no ${b.hospitais[0]} e clínicas próximas.`,
    description: `Buscando plano de saúde no ${b.bairro}, Guarulhos? A Patro Seguros compara Bradesco, Amil, SulAmérica, Porto e HapVida para você economizar. Atendimento local ${b.referenciaLocal}.`,
    detailedDescription: `Morar no ${b.bairro} oferece a conveniência de estar próximo a excelentes centros médicos. Para quem busca um plano de saúde, a proximidade com hospitais como ${b.hospitais.join(", ")} é um fator decisivo na escolha da operadora.\n\nNa Patro Seguros, analisamos quais planos oferecem a melhor rede credenciada especificamente para o ${b.bairro}. Além dos hospitais, consideramos laboratórios e clínicas como ${b.clinicas.join(", ")} que atendem na região. Seja para plano individual, familiar ou empresarial (MEI), garantimos o menor preço de tabela com consultoria especializada em Guarulhos.`,
    metaDescription: `Planos de saúde no ${b.bairro}, Guarulhos. Preços a partir de ${b.precoMedio}. Atendimento nos hospitais ${b.hospitais.slice(0, 2).join(" e ")}. Cotação grátis!`,
    icon: "🏥",
    pricingIntro: `Os planos de saúde no ${b.bairro} variam conforme a idade e a rede hospitalar escolhida. Planos com foco local em Guarulhos costumam ser mais acessíveis.`,
    pricingFactors: [
      "Faixa etária dos beneficiários",
      "Tipo de contratação (Pessoa Física ou CNPJ/MEI)",
      "Inclusão de hospitais de elite em SP",
      "Opção com ou sem coparticipação"
    ],
    pricingNote: "*Valores médios para plano individual. Empresas com MEI podem ter descontos de até 40%.",
    faqs: [
      { 
        question: `Qual o melhor hospital para quem mora no ${b.bairro}?`, 
        answer: `Para moradores do ${b.bairro}, o ${b.hospitais[0]} é uma das opções mais próximas e completas. Planos como Amil, Bradesco e SulAmérica oferecem excelente cobertura nesta unidade.` 
      },
      { 
        question: `Posso contratar plano de saúde com MEI no ${b.bairro}?`, 
        answer: `Sim! Se você é MEI no ${b.bairro} há mais de 6 meses, pode contratar planos empresariais com valores até 40% menores que os planos de pessoa física, incluindo seus dependentes.` 
      },
      { 
        question: `Quais laboratórios atendem no ${b.bairro}?`, 
        answer: `A região do ${b.bairro} conta com unidades do ${b.clinicas.filter(c => c.includes("Laboratório")).join(" e ") || "principais laboratórios de Guarulhos"}, facilitando exames de rotina sem grandes deslocamentos.` 
      }
    ],
    whoNeeds: [
      "Famílias que buscam segurança perto de casa",
      "MEIs e autônomos que querem reduzir custos",
      "Empresas locais que desejam reter talentos",
      "Idosos que precisam de rede credenciada local forte"
    ],
    whyPatro: [
      "Especialistas em rede credenciada de Guarulhos",
      "Comparativo entre 20+ operadoras em minutos",
      "Suporte pós-venda para agendamentos e carências",
      "Consultoria gratuita e sem compromisso"
    ],
    coverages: saudeCoverages,
    realScenarios: [
      { title: "Atendimento de Urgência", description: `Morador do ${b.bairro} precisou de pronto-socorro no ${b.hospitais[0]} e foi atendido em 15 min via plano SulAmérica.` },
      { title: "Economia via MEI", description: "Autônomo da região reduziu sua mensalidade de R$ 850 para R$ 510 ao migrar para plano empresarial via Patro Seguros." }
    ],
    tips: [
      "Verifique se o plano cobre o Hospital Stella Maris, principal referência da região.",
      "Opte por coparticipação se você usa o plano apenas para rotina e emergências.",
      "MEI tem tabela diferenciada; sempre consulte essa opção primeiro."
    ],
    relatedInsurances: [
      { title: "Comparativo Planos Saúde Guarulhos", link: "/comparativo-planos-saude-guarulhos" },
      { title: "Plano de Saúde Empresarial", link: "/plano-saude-empresarial-guarulhos" },
      { title: "Plano de Saúde MEI", link: "/plano-saude-mei-guarulhos" }
    ],
    neighborhood: b.bairro,
    city: "Guarulhos"
  };
  return acc;
}, {} as Record<string, SeoLocalPageConfig>);