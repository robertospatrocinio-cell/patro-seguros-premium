import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroViagem = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Viagem Nacional e Internacional — Viaje Protegido para Qualquer Destino"
      subtitle="Cobertura médica, extravio de bagagem e assistência 24h em português. Proteção completa para viagens dentro do Brasil e para o exterior — obrigatório na Europa e essencial em qualquer destino."
      icon="✈️"
      badge="Nacional e Internacional"
      metaDescription="Seguro Viagem nacional e internacional com cobertura médica, extravio de bagagem e cancelamento. Obrigatório na Europa. Cotação grátis Patro Seguros Guarulhos."
      description="O Seguro Viagem é a garantia de que imprevistos não vão arruinar sua viagem — seja dentro do Brasil ou no exterior. Diferente do que muitos pensam, ele vai muito além de cobrir emergências médicas: protege contra extravio de bagagem, cancelamento de voo, problemas jurídicos e até atraso de viagem. Existem duas modalidades principais: o Seguro Viagem Nacional, para deslocamentos dentro do território brasileiro, e o Seguro Viagem Internacional, para destinos no exterior. Cada um possui coberturas, exigências e valores distintos, e é fundamental escolher o plano adequado ao seu tipo de viagem."
      detailedDescription="**Seguro Viagem Nacional** — Muitos brasileiros desconhecem, mas o seguro viagem nacional é altamente recomendado mesmo para viagens dentro do Brasil. O SUS pode ter longas filas e nem sempre está disponível em regiões turísticas remotas (como Fernando de Noronha, Chapada dos Veadeiros ou Lençóis Maranhenses). O seguro nacional garante atendimento médico particular imediato, cobertura para extravio de bagagem em voos domésticos, assistência em caso de cancelamento de viagem e até indenização por atraso de voo. É especialmente importante para idosos, gestantes, praticantes de ecoturismo e famílias com crianças. Os planos nacionais costumam ser mais acessíveis — a partir de R$ 5 por dia — e oferecem coberturas como despesas médicas de R$ 10.000 a R$ 50.000, traslado médico e hospedagem por atraso de voo.

**Seguro Viagem Internacional** — Para viagens ao exterior, o seguro é ainda mais crítico. Muitos países, como os 27 do Tratado de Schengen (Europa), exigem seguro viagem obrigatório com cobertura mínima de € 30.000 para despesas médicas. Nos EUA, onde uma simples ida ao pronto-socorro pode custar mais de US$ 5.000 e uma diária de UTI ultrapassa US$ 10.000, o seguro é indispensável. O seguro internacional inclui coberturas que não existem no nacional, como regresso sanitário (transporte especial ao Brasil), traslado de corpo, assistência jurídica no exterior e cobertura para COVID-19. Além disso, a assistência 24h em português faz toda a diferença quando se está em um país estrangeiro sem dominar o idioma local.

Na Patro Seguros, comparamos planos de diversas seguradoras especializadas para encontrar a cobertura ideal — nacional ou internacional — para o seu perfil de viagem. Analisamos destino, duração, idade, condições de saúde pré-existentes e atividades planejadas (esportes radicais, mergulho, ski) para recomendar o plano com melhor custo-benefício."
      howItWorks={[
        {
          step: "1",
          title: "Conte-nos sobre sua viagem",
          description: "Informe se a viagem é nacional ou internacional, destino, datas, número de viajantes, idades e se há condições de saúde pré-existentes. Quanto mais detalhes, melhor a recomendação."
        },
        {
          step: "2",
          title: "Receba cotações comparativas",
          description: "Comparamos planos nacionais e internacionais de múltiplas seguradoras e apresentamos as melhores opções com análise detalhada de coberturas e valores."
        },
        {
          step: "3",
          title: "Escolha e receba sua apólice",
          description: "Após a escolha, a apólice é emitida digitalmente em minutos. Você recebe por e-mail com todos os contatos de emergência."
        },
        {
          step: "4",
          title: "Viaje com assistência 24h",
          description: "Durante toda a viagem — no Brasil ou no exterior — conte com central de atendimento 24h em português para qualquer emergência ou dúvida."
        },
      ]}
      coverages={[
        {
          title: "Despesas Médicas e Hospitalares (DMH)",
          description: "Cobertura para consultas, exames, internações, cirurgias e medicamentos em caso de doença ou acidente. No plano nacional, garante atendimento particular sem depender do SUS. No internacional, cobre custos hospitalares no exterior."
        },
        {
          title: "Extravio e Atraso de Bagagem",
          description: "Indenização em caso de perda definitiva da bagagem pela companhia aérea — válido para voos domésticos e internacionais. Em atraso superior a 12h, reembolso para compra de itens essenciais."
        },
        {
          title: "Cancelamento e Interrupção de Viagem",
          description: "Reembolso de despesas não reembolsáveis (passagens, hospedagem) em caso de cancelamento por motivos cobertos como doença, acidente ou falecimento de familiar. Disponível em planos nacionais e internacionais."
        },
        {
          title: "Regresso Sanitário (Internacional)",
          description: "Transporte especial de retorno ao Brasil quando o segurado não pode viajar em voo comercial comum por condição médica. Inclui UTI aérea quando necessário. Cobertura exclusiva do seguro internacional."
        },
        {
          title: "Traslado de Corpo (Internacional)",
          description: "Cobertura dos custos de repatriação em caso de falecimento durante viagem ao exterior, incluindo documentação consular e transporte."
        },
        {
          title: "Traslado Médico (Nacional e Internacional)",
          description: "Remoção do segurado até o hospital ou clínica mais próxima em caso de emergência, por ambulância terrestre ou aérea conforme a gravidade."
        },
        {
          title: "Morte Acidental e Invalidez",
          description: "Indenização aos beneficiários em caso de falecimento ou invalidez permanente causada por acidente durante a viagem, nacional ou internacional."
        },
        {
          title: "Assistência Jurídica (Internacional)",
          description: "Orientação e suporte legal em caso de problemas jurídicos no destino, como acidentes de trânsito ou detenção. Fundamental em países com leis diferentes das brasileiras."
        },
        {
          title: "Atraso e Cancelamento de Voo",
          description: "Reembolso de despesas extras (alimentação, hospedagem) em caso de atraso prolongado ou cancelamento do voo pela companhia aérea — válido para voos domésticos e internacionais."
        },
        {
          title: "Cobertura para COVID-19 (Internacional)",
          description: "Atendimento médico e hospitalar em caso de contaminação por COVID-19 durante a viagem, incluindo quarentena quando exigida pelo país de destino."
        },
        {
          title: "Hospedagem por Atraso de Voo (Nacional)",
          description: "Em viagens nacionais, cobertura de hospedagem e alimentação quando o voo sofre atraso superior a 12 horas, garantindo conforto até o próximo embarque."
        },
        {
          title: "Assistência 24h em Português",
          description: "Central telefônica disponível 24 horas por dia, 7 dias por semana, com atendimento em português para orientação e acionamento de coberturas — no Brasil e no exterior."
        },
      ]}
      coverageExclusions={[
        "Doenças pré-existentes não declaradas no momento da contratação",
        "Lesões causadas por prática de esportes radicais (salvo contratação de cobertura adicional)",
        "Tratamentos eletivos ou estéticos realizados durante a viagem",
        "Sinistros ocorridos sob efeito de álcool ou substâncias ilícitas",
        "Viagens a países com alerta de guerra ou conflito armado ativo (internacional)",
        "Despesas médicas sem autorização prévia da central de atendimento (exceto emergências)",
        "Gestantes acima da semana gestacional limite da apólice (geralmente 28ª ou 32ª semana)",
        "Tentativa de suicídio ou lesões autoinfligidas",
      ]}
      pricingInfo={{
        intro: "O valor do Seguro Viagem depende de diversos fatores e costuma representar menos de 5% do custo total da viagem — um investimento pequeno diante dos riscos. Planos nacionais são significativamente mais acessíveis que internacionais.",
        factors: [
          "Tipo de viagem: planos nacionais custam a partir de R$ 5/dia, enquanto internacionais partem de R$ 15/dia",
          "Destino internacional: viagens para EUA e Canadá são mais caras que América do Sul devido aos custos médicos locais",
          "Destino nacional: viagens para regiões remotas (Fernando de Noronha, Amazônia) podem ter valores ligeiramente maiores",
          "Duração: quanto mais dias, maior o valor, mas o custo por dia diminui em viagens longas",
          "Idade: viajantes acima de 65 anos pagam mais devido ao maior risco de utilização",
          "Valor da cobertura DMH: planos com US$ 30 mil custam menos que planos com US$ 150 mil (internacional) ou R$ 10 mil vs R$ 50 mil (nacional)",
          "Coberturas adicionais: esportes radicais, gestantes, doenças pré-existentes aumentam o valor",
          "Franquia: planos com franquia (co-participação) custam menos, mas exigem pagamento parcial em caso de uso",
        ],
        note: "Para a Europa, o mínimo obrigatório é € 30.000 de DMH. Para os EUA, recomendamos no mínimo US$ 100.000. Para viagens nacionais, recomendamos no mínimo R$ 15.000 de DMH para garantir atendimento particular de qualidade."
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
