export interface LandingPageContent {
  title: string;
  description: string;
  metaDescription?: string;
  heroImage: string;
  mobileHeroImage?: string;
  insuranceType: string;
  icon?: string;
  location?: string;
  coverages?: { title: string; description: string }[];
  whoNeeds?: string[];
  whyPatro?: string[];
  faqs?: { question: string; answer: string }[];
  detailedDescription?: string;
}

export const landingPagesData: Record<string, LandingPageContent> = {
  "seguro-auto-guarulhos": {
    title: "Seguro Auto em Guarulhos",
    description: "Compare cotações de 16+ seguradoras e economize no seu seguro auto em Guarulhos. A Patro Seguros oferece consultoria personalizada com atendimento local e suporte 24h.",
    metaDescription: "Procurando seguro auto em Guarulhos? A Patro Seguros compara Porto, Tokio, Allianz e +16 seguradoras. Cotação grátis em 2h. Economize agora!",
    heroImage: "/images/hero-home.webp",
    insuranceType: "auto",
    icon: "🚗",
    location: "Guarulhos",
    detailedDescription: "Guarulhos possui um dos trânsitos mais intensos do Brasil, com as rodovias Dutra e Fernão Dias. Isso afeta o custo do seguro. Nossa consultoria analisa perfil e CEP de pernoite para encontrar o melhor preço em Guarulhos, seja no Centro, Vila Augusta ou Pimentas.\n\nA Patro Seguros atua em Guarulhos desde 2008. Fazemos o comparativo completo entre Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco, SulAmérica, Liberty, Mapfre e Azul. Você recebe a tabela comparativa em 2h, sem compromisso.",
    whoNeeds: ["Proprietários de veículos em Guarulhos", "Motoristas de aplicativo", "Frotas locais"],
    whyPatro: ["Atendimento local no Cidade Maia", "Especialistas em Guarulhos", "Suporte em sinistro"],
  },
  "seguro-auto": {
    title: "Seguro Auto Completo",
    description: "Proteção total para seu veículo com as melhores seguradoras do mercado. Cobertura completa, assistência 24h e cotação rápida.",
    metaDescription: "Seguro auto com cobertura completa: colisão, roubo, furto e assistência 24h. Compare seguradoras e contrate com a Patro Seguros. Cotação online grátis.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "auto",
    icon: "🚗",
    detailedDescription: "O seguro auto é essencial para garantir sua tranquilidade. Nossa proteção inclui cobertura para colisão, incêndio, roubo e furto. Além disso, oferecemos assistência 24h com guincho, socorro mecânico e chaveiro em todo o Brasil.\n\nNa Patro Seguros, você compara diferentes apólices para encontrar a que melhor se adapta ao seu perfil e orçamento. Nossos consultores garantem que todas as coberturas adicionais, como carro reserva, vidros e danos a terceiros, sejam explicadas de forma simples.",
  },
  "seguro-auto-premium": {
    title: "Seguro Auto Premium",
    description: "Proteção exclusiva para veículos de alto padrão com serviços diferenciados e coberturas ampliadas.",
    metaDescription: "Seguro auto para veículos de alto padrão. Coberturas ampliadas, carro reserva especial e atendimento VIP com a Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "auto",
    icon: "💎",
    detailedDescription: "Para veículos de alto padrão, o seguro precisa ir além do básico. Oferecemos coberturas exclusivas, como carro reserva de luxo, cobertura para blindagem, atendimento VIP em caso de sinistro e limites diferenciados para danos a terceiros.\n\nNossa consultoria para carros premium foca na proteção do valor de mercado e na exclusividade dos serviços oferecidos pelas seguradoras de ponta.",
  },
  "plano-de-saude": {
    title: "Planos de Saúde",
    description: "Encontre o plano de saúde ideal para você, sua família ou sua empresa. Compare redes credenciadas e preços.",
    metaDescription: "Planos de saúde individuais, familiares e empresariais. Compare redes credenciadas, preços e carências. Consultoria especializada Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "saude",
    icon: "🏥",
    detailedDescription: "Saúde é o ativo mais importante. Ajudamos você a navegar pelas opções de planos de saúde para encontrar a rede credenciada que atende seus hospitais e médicos de confiança.\n\nTrabalhamos com Bradesco, Amil, SulAmérica, Porto e mais. Oferecemos consultoria para escolher o plano certo, explicando carências e benefícios para que você não tenha surpresas.",
  },
  "seguro-empresarial": {
    title: "Seguro Empresarial",
    description: "Proteja sua empresa contra riscos operacionais, patrimoniais e de responsabilidade civil.",
    metaDescription: "Seguro empresarial para garantir a continuidade do seu negócio. Proteção contra incêndio, roubo, lucros cessantes e responsabilidade civil.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "empresarial",
    icon: "🏢",
    detailedDescription: "O seguro empresarial é fundamental para a sobrevivência do seu negócio. Protegemos sua sede, estoque e equipamentos contra os principais riscos, como incêndio, explosão, roubo e danos elétricos.\n\nOferecemos coberturas para lucros cessantes, responsabilidade civil e riscos operacionais. Nossos consultores realizam análise de risco na sua empresa para estruturar a apólice ideal para sua operação.",
  },
  "seguro-residencial": {
    title: "Seguro Residencial",
    description: "Segurança para seu lar com coberturas contra incêndio, roubo, danos elétricos e assistência 24h.",
    metaDescription: "Seguro residencial com assistência 24h e proteção contra incêndio, roubo e danos elétricos. Cuide da sua casa com a Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "residencial",
    icon: "🏠",
    detailedDescription: "Sua casa é seu bem mais precioso. Nosso seguro residencial protege sua casa ou apartamento contra os imprevistos mais comuns, garantindo que você não tenha custos inesperados com reparos ou perdas.\n\nInclui serviços de assistência 24h, como chaveiro, encanador e eletricista, que trazem conveniência para o dia a dia, além da proteção financeira em casos graves.",
  },
  "seguro-vida": {
    title: "Seguro de Vida",
    description: "Proteção financeira para você e sua família, com coberturas para invalidez e doenças graves.",
    metaDescription: "Seguro de vida individual ou familiar. Garanta proteção financeira para quem você ama. Coberturas para invalidez e doenças graves.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "vida",
    icon: "❤️",
    detailedDescription: "O seguro de vida é um ato de cuidado e responsabilidade. Garanta a proteção financeira da sua família caso algo inesperado aconteça. Além da proteção em caso de falecimento, nossas apólices incluem coberturas para invalidez e diagnóstico de doenças graves.\n\nNossos consultores ajudam a definir o capital segurado ideal para suas necessidades e momento de vida.",
  },
  "seguro-moto": {
    title: "Seguro de Moto",
    description: "Proteção completa para sua moto, seja para uso diário, lazer ou trabalho.",
    metaDescription: "Seguro de moto com cobertura para roubo, furto, colisão e assistência 24h. Cotação rápida e sem compromisso.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "auto",
    icon: "🏍️",
    detailedDescription: "Motociclistas precisam de proteção ágil. Nosso seguro de moto cobre roubo, furto, colisão e danos a terceiros. Incluímos assistência 24h com guincho especializado para motocicletas.\n\nSe você usa a moto para lazer ou trabalho, temos a solução ideal para garantir que você não fique na mão.",
  },
  "seguro-galpoes": {
    title: "Seguro para Galpões",
    description: "Seguro especializado para galpões industriais e logísticos, com coberturas de risco de engenharia e patrimonial.",
    metaDescription: "Seguro especializado para galpões logísticos e industriais. Proteção total contra riscos patrimoniais e operacionais.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "empresarial",
    icon: "🏭",
    detailedDescription: "Galpões logísticos são centros críticos de operação. Nosso seguro protege o imóvel, as estruturas e os bens estocados contra os maiores riscos do setor, como incêndio, desmoronamento e eventos climáticos.\n\nAtuamos como consultores na análise de riscos para garantir que a apólice atenda exigências específicas do setor logístico e de armazenagem.",
  },
  "consorcio": {
    title: "Consórcio",
    description: "Planeje a conquista de seus objetivos com as melhores opções de consórcio para imóveis e veículos.",
    metaDescription: "Consórcio para imóveis, veículos e caminhões. Planeje sua conquista com economia e flexibilidade. Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "consorcio",
    icon: "🏦",
    detailedDescription: "O consórcio é uma excelente ferramenta de planejamento financeiro para quem deseja conquistar bens com economia. Seja para a casa própria, um carro novo ou ampliar sua frota com caminhões.\n\nNossa equipe analisa as melhores administradoras do mercado para oferecer planos com parcelas que cabem no seu orçamento e prazos flexíveis.",
  },
  "medsenior": {
    title: "Plano MedSenior",
    description: "Planos de saúde especializados na terceira idade, com foco em prevenção e qualidade de vida.",
    metaDescription: "Plano de saúde MedSenior: atendimento especializado para terceira idade. Prevenção, rede própria e qualidade de vida.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "saude",
    icon: "🏥",
    detailedDescription: "O MedSenior é referência em planos de saúde para a terceira idade, com unidades próprias e um modelo de cuidado baseado na prevenção e acompanhamento contínuo.\n\nNossa consultoria ajuda você a entender os diferenciais da rede MedSenior e como aproveitar ao máximo os centros de prevenção e os programas de saúde exclusivos para seus beneficiários.",
  },
  "alice": {
    title: "Plano Alice",
    description: "A Alice redefine a experiência de plano de saúde com foco em tecnologia e cuidado integral.",
    metaDescription: "Conheça o plano de saúde Alice: tecnologia, cuidado integral e gestão da sua saúde. Consultoria Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "saude",
    icon: "🩺",
    detailedDescription: "A Alice traz um modelo inovador de saúde, com acompanhamento de uma equipe dedicada (Time de Saúde) que centraliza o cuidado e facilita o acesso a especialistas de ponta.\n\nAvaliamos se a Alice é o plano que melhor atende suas expectativas de cuidado tecnológico e personalizado, facilitando sua adesão com nossa consultoria.",
  },
  "cotacao-seguro-auto": {
    title: "Cotação de Seguro Auto",
    description: "Receba uma cotação rápida e sem compromisso para o seu seguro auto.",
    metaDescription: "Cotação de seguro auto online e sem compromisso. Compare 16+ seguradoras com a Patro Seguros e receba seu comparativo em até 2 horas úteis.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "auto",
    icon: "📋",
    detailedDescription: "Economize tempo e dinheiro comparando as melhores seguradoras do mercado em um único lugar. Nossa cotação é rápida, gratuita e sem compromisso.\n\nPreencha os dados e, em até 2 horas úteis, enviamos um quadro comparativo entre Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco, SulAmérica, Liberty, Mapfre e Azul, para que você escolha com clareza a melhor proteção.",
  },
};

