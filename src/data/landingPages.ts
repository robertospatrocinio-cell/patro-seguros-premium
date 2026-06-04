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
    title: "Cotação Seguro Auto Online",
    description: "Compare seguro auto em 16+ seguradoras e receba sua cotação online em até 2h.",
    metaDescription: "Compare seguro auto em 16+ seguradoras e receba sua cotação online em até 2h com a Patro Seguros.",
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
    title: "Cotação Seguro Empresarial",
    description: "Solicite cotação de seguro empresarial e proteja sua empresa com coberturas sob medida.",
    metaDescription: "Solicite cotação de seguro empresarial e proteja sua empresa com coberturas sob medida contra incêndio, roubo e lucros cessantes.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "empresarial",
    icon: "🏢",
    detailedDescription: "O seguro empresarial é fundamental para a sobrevivência do seu negócio. Protegemos sua sede, estoque e equipamentos contra os principais riscos, como incêndio, explosão, roubo e danos elétricos.\n\nOferecemos coberturas para lucros cessantes, responsabilidade civil e riscos operacionais. Nossos consultores realizam análise de risco na sua empresa para estruturar a apólice ideal para sua operação.",
  },
  "seguro-residencial": {
    title: "Cotação Seguro Residencial Online",
    description: "Proteja sua casa com seguro residencial completo. Compare opções e receba cotação personalizada.",
    metaDescription: "Proteja sua casa com seguro residencial completo. Compare opções e receba cotação personalizada da Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "residencial",
    icon: "🏠",
    detailedDescription: "Sua casa é seu bem mais precioso. Nosso seguro residencial protege sua casa ou apartamento contra os imprevistos mais comuns, garantindo que você não tenha custos inesperados com reparos ou perdas.\n\nInclui serviços de assistência 24h, como chaveiro, encanador e eletricista, que trazem conveniência para o dia a dia, além da proteção financeira em casos graves.",
  },
  "seguro-vida": {
    title: "Cotação Seguro de Vida",
    description: "Simule seguro de vida com coberturas para sua família e receba orientação personalizada.",
    metaDescription: "Simule seguro de vida com coberturas para sua família e receba orientação personalizada da Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "vida",
    icon: "❤️",
    detailedDescription: "O seguro de vida é um ato de cuidado e responsabilidade. Garanta a proteção financeira da sua família caso algo inesperado aconteça. Além da proteção em caso de falecimento, nossas apólices incluem coberturas para invalidez e diagnóstico de doenças graves.\n\nNossos consultores ajudam a definir o capital segurado ideal para suas necessidades e momento de vida.",
  },
  "seguro-moto": {
    title: "Cotação Seguro Moto Online",
    description: "Compare seguro moto online com a Patro Seguros e encontre proteção para roubo, furto e colisão.",
    metaDescription: "Compare seguro moto online com a Patro Seguros e encontre proteção para roubo, furto, colisão e assistência 24h.",
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
    title: "Simulação de Consórcio Online",
    description: "Simule consórcio para carro, imóvel ou caminhão com a Patro Seguros e planeje sua conquista sem juros.",
    metaDescription: "Simule consórcio para carro, imóvel ou caminhão com a Patro Seguros e planeje sua conquista sem juros bancários. Cotação rápida online.",
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
  "seguro-galpao-alugado": {
    title: "Seguro para Galpão Alugado",
    description: "Proteção específica para inquilinos de galpões comerciais e industriais.",
    metaDescription: "Seguro para galpão alugado: proteção contra incêndio, danos elétricos e responsabilidade civil para o locatário. Garanta seu contrato de aluguel.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "empresarial",
    icon: "🏭",
    detailedDescription: "A maioria dos contratos de locação de galpões exige um seguro contra incêndio. Nossa apólice para galpão alugado garante o cumprimento do contrato e protege o seu negócio contra imprevistos.\n\nAlém da cobertura básica, incluímos proteção para benfeitorias, mercadorias e responsabilidade civil, garantindo que você e o proprietário estejam seguros.",
  },
  "seguro-celular": {
    title: "Cotação de Seguro Celular Online",
    description: "Proteja seu smartphone com seguro celular. Solicite cotação online e compare opções para roubo, furto e quebra.",
    metaDescription: "Proteja seu smartphone com seguro celular. Solicite cotação online e compare opções para roubo, furto e quebra de tela. Proteção nacional e internacional.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "residencial",
    icon: "📱",
    detailedDescription: "Seu celular é essencial no dia a dia. Oferecemos proteção contra roubo, furto qualificado e danos acidentais, como quebra de tela ou derramamento de líquidos.\n\nCom o seguro de celular da Patro, você garante que não ficará desconectado e terá o suporte necessário para reposição ou reparo do seu aparelho.",
  },
  "seguro-motorista-app": {
    title: "Cotação Seguro Motorista de App",
    description: "Motorista de Uber ou 99? Solicite cotação de seguro auto para aplicativo com cobertura adequada ao seu perfil.",
    metaDescription: "Motorista de Uber ou 99? Solicite cotação de seguro auto para aplicativo com cobertura adequada ao seu perfil e passageiros (APP). Receba em até 2h.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "auto",
    icon: "🚗",
    detailedDescription: "Quem trabalha no volante precisa de proteção extra. Nosso seguro para motorista de aplicativo inclui a cobertura APP (Acidentes Pessoais a Passageiros), essencial para operar nas plataformas.\n\nOferecemos coberturas para roubo, colisão, danos a terceiros e assistência 24h com guincho e carro reserva, garantindo que seu instrumento de trabalho esteja sempre protegido.",
  },
  "seguro-de-vida-para-socios": {
    title: "Seguro de Vida para Sócios (Buy-Sell)",
    description: "Seguro de vida societário (buy-sell) para sócios de empresas. Protege a continuidade do negócio garantindo capital para recompra de quotas em caso de falecimento ou invalidez de um sócio.",
    metaDescription: "Seguro de vida para sócios em Guarulhos: capital para recompra de quotas (buy-sell), continuidade societária e proteção patrimonial. Cotação Patro Seguros.",
    heroImage: "/images/hero-home.webp",
    insuranceType: "vida",
    icon: "🤝",
    detailedDescription: "O seguro de vida para sócios — conhecido no mercado como apólice buy-sell ou key-person — é o instrumento financeiro que garante a continuidade da sociedade quando um dos sócios falece ou se torna inválido permanentemente. Sem essa apólice, os herdeiros ingressam automaticamente na empresa, o que costuma gerar conflitos de gestão, paralisação de decisões estratégicas e, no limite, dissolução da sociedade.\n\nNa estrutura buy-sell, o capital segurado é dimensionado pelo valor justo de cada quota societária (avaliação contábil + ágio de mercado). Em caso de sinistro, a indenização é direcionada aos sócios remanescentes, que utilizam o capital para recomprar formalmente a participação do sócio falecido junto aos herdeiros — preservando o controle, o caixa e a operação.\n\nA Patro Seguros estrutura apólices de vida societária para PMEs de Guarulhos e região, combinando capital por morte, capital por invalidez total e permanente, doenças graves e, opcionalmente, despesas médicas hospitalares. A modelagem é feita junto ao contador e ao advogado da empresa para garantir aderência ao contrato social e ao acordo de sócios.",
    whoNeeds: [
      "Sociedades limitadas (Ltda) com 2 ou mais sócios ativos",
      "Sociedades por ações (S.A.) de capital fechado",
      "Empresas familiares onde a saída de um sócio comprometeria a gestão",
      "Holdings patrimoniais e empresas com cláusulas de acordo de sócios",
      "PMEs com sócios-chave responsáveis por receita ou know-how operacional",
    ],
    whyPatro: [
      "Estruturação técnica em parceria com contador e advogado da empresa",
      "Comparativo entre Prudential, Icatu, MetLife, Bradesco Vida, Mongeral e Porto Vida",
      "Análise atuarial do capital segurado por sócio",
      "Cláusula buy-sell sincronizada com o contrato social",
      "Revisão anual da apólice conforme valuation da empresa",
    ],
    coverages: [
      { title: "Morte por Qualquer Causa", description: "Capital integral pago aos sócios remanescentes (ou à empresa, conforme estrutura) para recompra das quotas do sócio falecido." },
      { title: "Invalidez Total e Permanente (IPA/IPD)", description: "Antecipação do capital em caso de invalidez permanente que impeça o sócio de exercer atividades empresariais." },
      { title: "Doenças Graves", description: "Adiantamento de parte do capital em caso de diagnóstico de câncer, AVC, infarto e outras doenças graves cobertas." },
      { title: "Capital Indexado por Sócio", description: "Cada sócio tem capital proporcional à sua participação societária e ao valor justo das quotas." },
      { title: "Renovação Anual com Revisão de Valuation", description: "Atualização do capital segurado conforme novo valuation da empresa, mantendo a apólice aderente à realidade societária." },
    ],
    faqs: [
      { question: "O que é seguro de vida para sócios (buy-sell)?", answer: "É uma apólice de vida em grupo contratada pela empresa em nome dos sócios, com capital dimensionado para recompra das quotas em caso de morte ou invalidez. Garante que a empresa não precise vender ativos ou se endividar para honrar a saída do sócio." },
      { question: "Quem recebe a indenização: a empresa ou os herdeiros?", answer: "Depende da modelagem. No formato 'cross-purchase', cada sócio é beneficiário dos demais e usa o capital para recomprar as quotas. No formato 'entity redemption', a empresa é beneficiária e recompra as quotas diretamente. A Patro orienta qual estrutura faz mais sentido para o contrato social." },
      { question: "Como é calculado o capital segurado?", answer: "Pelo valor justo das quotas de cada sócio: valuation contábil (patrimônio líquido) ajustado por múltiplos de mercado (EBITDA, faturamento) e ágio do negócio. Recomenda-se revisão anual junto ao contador da empresa." },
      { question: "A apólice precisa estar prevista no contrato social?", answer: "Não é obrigatório, mas é altamente recomendado. O acordo de sócios deve mencionar a apólice buy-sell e o procedimento de recompra, evitando disputas com herdeiros e dando força jurídica à operação." },
      { question: "Tem benefício fiscal para a empresa?", answer: "O prêmio pode ser deduzido como despesa operacional quando a empresa é a contratante e beneficiária (entity redemption), respeitando os limites da legislação. A Patro orienta o enquadramento junto ao contador." },
      { question: "Quais seguradoras a Patro compara para apólices de sócios?", answer: "Prudential, Icatu, MetLife, Bradesco Vida e Previdência, Mongeral Aegon, Porto Vida e SulAmérica Vida. Cada uma tem apetite e precificação diferente para capital elevado e perfis de sócios — o comparativo costuma encontrar variação superior a 30%." },
    ],
  },
};


