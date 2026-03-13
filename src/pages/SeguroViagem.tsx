import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroViagem = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Viagem — Viaje Protegido para Qualquer Destino"
      subtitle="Cobertura médica, extravio de bagagem e assistência 24h em português. Obrigatório na Europa e essencial em qualquer destino."
      icon="✈️"
      badge="Obrigatório na Europa"
      metaDescription="Seguro Viagem nacional e internacional com cobertura médica, extravio de bagagem e cancelamento. Obrigatório na Europa. Cotação grátis Patro Seguros Guarulhos."
      description="O Seguro Viagem é a garantia de que imprevistos não vão arruinar sua viagem. Diferente do que muitos pensam, ele vai muito além de cobrir emergências médicas: protege contra extravio de bagagem, cancelamento de voo, problemas jurídicos no exterior e até atraso de viagem. Muitos países, como os do Tratado de Schengen (Europa), exigem seguro viagem obrigatório com cobertura mínima de 30 mil euros. Nos EUA, onde uma simples ida ao pronto-socorro pode custar mais de US$ 5.000, o seguro é indispensável."
      detailedDescription="Na Patro Seguros, comparamos planos de diversas seguradoras especializadas para encontrar a cobertura ideal para o seu perfil de viagem. Seja uma viagem a lazer, negócios, intercâmbio ou cruzeiro, analisamos fatores como destino, duração, idade, condições de saúde pré-existentes e atividades planejadas (esportes radicais, mergulho, ski) para recomendar o plano com melhor custo-benefício. Nosso diferencial é a orientação consultiva: explicamos cada cobertura, alertamos sobre exigências do destino e garantimos que você viaje com a proteção adequada — sem pagar por coberturas desnecessárias."
      howItWorks={[
        {
          title: "1. Conte-nos sobre sua viagem",
          description: "Informe destino, datas, número de viajantes, idades e se há condições de saúde pré-existentes. Quanto mais detalhes, melhor a recomendação."
        },
        {
          title: "2. Receba cotações comparativas",
          description: "Comparamos planos de múltiplas seguradoras e apresentamos as melhores opções com análise detalhada de coberturas e valores."
        },
        {
          title: "3. Escolha e receba sua apólice",
          description: "Após a escolha, a apólice é emitida digitalmente em minutos. Você recebe por e-mail com todos os contatos de emergência."
        },
        {
          title: "4. Viaje com assistência 24h",
          description: "Durante toda a viagem, conte com central de atendimento 24h em português para qualquer emergência ou dúvida."
        },
      ]}
      coverages={[
        {
          title: "Despesas Médicas e Hospitalares (DMH)",
          description: "Cobertura para consultas, exames, internações, cirurgias e medicamentos em caso de doença ou acidente durante a viagem. É a cobertura mais importante do seguro."
        },
        {
          title: "Extravio e Atraso de Bagagem",
          description: "Indenização em caso de perda definitiva da bagagem pela companhia aérea. Em caso de atraso superior a 12h, reembolso para compra de itens essenciais."
        },
        {
          title: "Cancelamento e Interrupção de Viagem",
          description: "Reembolso de despesas não reembolsáveis (passagens, hospedagem) em caso de cancelamento por motivos cobertos como doença, acidente ou falecimento de familiar."
        },
        {
          title: "Regresso Sanitário",
          description: "Transporte especial de retorno ao Brasil quando o segurado não pode viajar em voo comercial comum por condição médica. Inclui UTI aérea quando necessário."
        },
        {
          title: "Traslado de Corpo",
          description: "Cobertura dos custos de repatriação em caso de falecimento durante a viagem, incluindo documentação consular e transporte."
        },
        {
          title: "Morte Acidental e Invalidez",
          description: "Indenização aos beneficiários em caso de falecimento ou invalidez permanente causada por acidente durante a viagem."
        },
        {
          title: "Assistência Jurídica",
          description: "Orientação e suporte legal em caso de problemas jurídicos no destino, como acidentes de trânsito ou detenção."
        },
        {
          title: "Atraso e Cancelamento de Voo",
          description: "Reembolso de despesas extras (alimentação, hospedagem) em caso de atraso prolongado ou cancelamento do voo pela companhia aérea."
        },
        {
          title: "Cobertura para COVID-19",
          description: "Atendimento médico e hospitalar em caso de contaminação por COVID-19 durante a viagem, incluindo quarentena quando exigida."
        },
        {
          title: "Assistência 24h em Português",
          description: "Central telefônica disponível 24 horas por dia, 7 dias por semana, com atendimento em português para orientação e acionamento de coberturas."
        },
      ]}
      coverageExclusions={[
        "Doenças pré-existentes não declaradas no momento da contratação",
        "Lesões causadas por prática de esportes radicais (salvo contratação de cobertura adicional)",
        "Tratamentos eletivos ou estéticos realizados durante a viagem",
        "Sinistros ocorridos sob efeito de álcool ou substâncias ilícitas",
        "Viagens a países com alerta de guerra ou conflito armado ativo",
        "Despesas médicas sem autorização prévia da central de atendimento (exceto emergências)",
        "Gestantes acima da semana gestacional limite da apólice (geralmente 28ª ou 32ª semana)",
        "Tentativa de suicídio ou lesões autoinfligidas",
      ]}
      pricingInfo={{
        intro: "O valor do Seguro Viagem depende de diversos fatores e costuma representar menos de 5% do custo total da viagem — um investimento pequeno diante dos riscos.",
        factors: [
          "Destino: viagens para EUA e Canadá são mais caras que América do Sul devido aos custos médicos locais",
          "Duração: quanto mais dias, maior o valor, mas o custo por dia diminui em viagens longas",
          "Idade: viajantes acima de 65 anos pagam mais devido ao maior risco de utilização",
          "Valor da cobertura DMH: planos com US$ 30 mil custam menos que planos com US$ 150 mil",
          "Coberturas adicionais: esportes radicais, gestantes, doenças pré-existentes aumentam o valor",
          "Franquia: planos com franquia (co-participação) custam menos, mas exigem pagamento parcial em caso de uso",
        ],
        note: "Para a Europa, o mínimo obrigatório é € 30.000 de DMH. Para os EUA, recomendamos no mínimo US$ 100.000 devido aos altíssimos custos hospitalares. Uma diária de UTI americana pode ultrapassar US$ 10.000."
      }}
      realScenarios={[
        {
          title: "Fratura durante ski nos Alpes",
          description: "Cliente sofreu fratura na perna durante viagem de ski na Áustria. O seguro cobriu resgate na montanha, cirurgia, internação de 3 dias e regresso sanitário ao Brasil com acompanhamento médico. Custo total coberto: € 45.000."
        },
        {
          title: "Extravio de bagagem em conexão",
          description: "Família em viagem para Orlando teve bagagem extraviada em conexão em Miami. O seguro reembolsou R$ 3.200 para compra de roupas e itens essenciais e, após confirmação de perda definitiva, indenizou o valor integral das malas."
        },
        {
          title: "Internação por intoxicação alimentar",
          description: "Viajante em lua de mel no México precisou de internação por intoxicação alimentar grave. O seguro cobriu 2 dias de internação, medicamentos e acompanhamento médico. Total coberto: US$ 8.500."
        },
        {
          title: "Cancelamento por COVID antes do embarque",
          description: "Casal testou positivo para COVID 3 dias antes da viagem à Europa. O seguro reembolsou passagens aéreas e reservas de hotel não reembolsáveis, totalizando R$ 18.000."
        },
      ]}
      importantDetails={[
        {
          title: "Tratado de Schengen — Europa exige seguro obrigatório",
          content: "Para entrar nos 27 países do espaço Schengen (incluindo Alemanha, França, Itália, Espanha, Portugal), é obrigatório apresentar seguro viagem com cobertura mínima de € 30.000 para despesas médicas. Sem o seguro, você pode ser impedido de entrar no país."
        },
        {
          title: "Rede referenciada vs. reembolso",
          content: "Alguns seguros trabalham com rede referenciada (hospitais parceiros onde você não paga nada), enquanto outros funcionam por reembolso (você paga e solicita devolução). A rede referenciada é mais prática e evita desembolso no momento da emergência."
        },
        {
          title: "Cartão de crédito não substitui seguro viagem",
          content: "Muitos cartões oferecem 'seguro viagem', mas com coberturas limitadas (geralmente apenas morte acidental), sem assistência 24h e com processo de acionamento burocrático. Um seguro viagem dedicado oferece proteção muito mais abrangente."
        },
        {
          title: "Declare condições pré-existentes",
          content: "Hipertensão, diabetes, problemas cardíacos e outras condições devem ser declaradas na contratação. Existem planos com cobertura específica para pré-existentes. Omitir informações pode resultar em negativa de cobertura quando mais precisar."
        },
      ]}
      tips={[
        "Contrate o seguro assim que comprar as passagens — a cobertura de cancelamento só vale se contratada antes do sinistro",
        "Para os EUA, nunca contrate menos de US$ 100.000 de DMH — uma apendicite pode custar US$ 30.000",
        "Se vai praticar esportes como ski, mergulho ou trilha, contrate cobertura específica para esportes",
        "Leve a apólice impressa e salva no celular, junto com os números de emergência da seguradora",
        "Em caso de emergência, ligue para a central ANTES de ir ao hospital (exceto em risco de vida) para direcionamento à rede referenciada",
        "Gestantes devem verificar a semana gestacional limite e contratar cobertura para complicações gestacionais",
        "Guarde todos os recibos e laudos médicos — são necessários para reembolso",
      ]}
      whoNeeds={[
        "Viajantes internacionais (obrigatório na Europa/Schengen)",
        "Quem viaja para países com custo médico alto (EUA, Canadá, Japão)",
        "Famílias com crianças pequenas",
        "Idosos e pessoas com condições de saúde pré-existentes",
        "Gestantes viajando antes da 32ª semana",
        "Praticantes de esportes radicais e aventura",
        "Intercambistas e estudantes no exterior",
        "Viajantes de negócios frequentes",
        "Quem faz cruzeiros marítimos",
      ]}
      whyPatro={[
        "Comparamos planos de diversas seguradoras especializadas em viagem",
        "Orientação sobre coberturas obrigatórias por país e destino",
        "Emissão rápida da apólice — até minutos antes do embarque",
        "Planos específicos para gestantes, idosos, esportes e intercâmbio",
        "Atendimento consultivo: explicamos cada cobertura para você escolher com segurança",
        "Suporte durante a viagem — se precisar acionar o seguro, estamos aqui para ajudar",
      ]}
      faqs={[
        {
          question: "Quando devo contratar o seguro viagem?",
          answer: "O ideal é contratar assim que comprar as passagens, especialmente se quiser cobertura de cancelamento de viagem. Porém, é possível contratar até poucas horas antes do embarque. Quanto antes contratar, mais protegido você estará."
        },
        {
          question: "Qual o valor de cobertura recomendado para cada destino?",
          answer: "Para Europa, o mínimo obrigatório é € 30.000 (recomendamos € 60.000). Para EUA e Canadá, no mínimo US$ 100.000. Para América do Sul, US$ 30.000 costuma ser suficiente. Para Ásia e Oceania, recomendamos US$ 60.000. Analisamos cada caso individualmente."
        },
        {
          question: "Gestantes podem contratar seguro viagem?",
          answer: "Sim! Existem planos com cobertura para gestantes até a 28ª ou 32ª semana de gestação (varia por seguradora). É importante contratar cobertura para complicações gestacionais, não apenas o seguro básico."
        },
        {
          question: "O seguro viagem cobre COVID-19?",
          answer: "Sim, a maioria dos seguros atuais inclui cobertura para COVID-19, incluindo internação, quarentena e até cancelamento de viagem por teste positivo. Confirmamos na cotação para total tranquilidade."
        },
        {
          question: "Posso estender o seguro durante a viagem?",
          answer: "Sim, é possível estender a cobertura mesmo estando no exterior, desde que a solicitação seja feita antes do vencimento da apólice original. Entre em contato conosco e providenciamos a extensão."
        },
        {
          question: "O seguro do cartão de crédito é suficiente?",
          answer: "Na maioria dos casos, não. Os seguros de cartão geralmente têm coberturas limitadas, sem assistência 24h em português e com processos burocráticos de acionamento. Para viagens internacionais, recomendamos sempre um seguro dedicado."
        },
        {
          question: "Como aciono o seguro em caso de emergência?",
          answer: "Ligue para a central de atendimento 24h (número na apólice). Em emergências com risco de vida, vá direto ao hospital mais próximo e avise a seguradora em até 24h. A central orienta sobre hospitais da rede referenciada e procedimentos."
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro Celular", link: "/seguro-celular" },
      ]}
    />
  );
};

export default SeguroViagem;
