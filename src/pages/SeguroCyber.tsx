import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroCyber = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Cyber / Segurança Cibernética"
      subtitle="Proteção contra ataques cibernéticos e vazamento de dados"
      icon="🔒"
      metaDescription="Seguro Cyber contra ataques hackers, ransomware e vazamento de dados. Proteção LGPD para empresas. Cobertura de custos de recuperação. Cotação grátis Patro Seguros."
      description="O Seguro Cyber protege empresas contra riscos digitais: ataques hackers, ransomware, vazamento de dados, invasões de sistemas e violações da LGPD."
      detailedDescription={`O Brasil é o 2º país mais atacado por hackers no mundo. Só em 2023, mais de 100 bilhões de tentativas de ataque cibernético foram registradas no país. Empresas de todos os portes são alvos — e as consequências vão desde paralisação total das operações até multas milionárias pela LGPD.

Um ataque de ransomware pode criptografar todos os dados da empresa e exigir resgates de R$ 50.000 a R$ 5 milhões. Um vazamento de dados pode expor informações de clientes e gerar processos judiciais massivos. A LGPD prevê multas de até 2% do faturamento, limitadas a R$ 50 milhões por infração.

O Seguro Cyber não é luxo — é necessidade para qualquer empresa que opera digitalmente. Ele cobre desde os custos de resposta ao incidente (perícia forense, notificação de afetados, assessoria jurídica) até indenizações a terceiros e lucros cessantes pela paralisação.

Na Patro Seguros, avaliamos a maturidade de segurança da sua empresa e recomendamos coberturas adequadas ao seu nível de exposição digital.`}
      howItWorks={[
        { step: "1", title: "Avaliação de Risco Digital", description: "Mapeamos sua infraestrutura digital, volume de dados, medidas de segurança existentes e exposição" },
        { step: "2", title: "Dimensionamento da Cobertura", description: "Definimos limites para cada tipo de cobertura: resposta a incidentes, RC, lucros cessantes, etc." },
        { step: "3", title: "Cotação Especializada", description: "Buscamos propostas de seguradoras com expertise em riscos cibernéticos" },
        { step: "4", title: "Resposta a Incidentes", description: "Em caso de ataque, a seguradora aciona equipe especializada 24/7 para contenção, investigação e recuperação" },
      ]}
      coverages={[
        { title: "Vazamento de Dados (LGPD)", description: "Cobertura para custos de notificação e multas da LGPD" },
        { title: "Ransomware e Extorsão", description: "Cobertura para pagamento de resgates e negociação" },
        { title: "Interrupção de Negócios", description: "Indenização por parada de sistemas e perda de receita" },
        { title: "Recuperação de Dados", description: "Custos com restauração de sistemas e informações" },
        { title: "Responsabilidade Civil Cyber", description: "Cobre reclamações de clientes por vazamento de dados" },
        { title: "Defesa e Investigação", description: "Custos com perícia forense e advogados especializados" },
        { title: "Gestão de Crise e Reputação", description: "Suporte em comunicação e gestão de imagem" },
        { title: "Fraudes Eletrônicas", description: "Cobertura para transferências fraudulentas" },
      ]}
      coverageExclusions={[
        "Ataques com participação ou conivência de funcionários (ato doloso)",
        "Falhas conhecidas não corrigidas (patches de segurança não aplicados)",
        "Danos anteriores à vigência da apólice",
        "Perda de propriedade intelectual e segredos industriais (cobertura específica)",
        "Infraestrutura de terceiros não declarada (cloud sem notificação)",
        "Guerra cibernética entre nações (exclusão de guerra)",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Cyber depende do porte da empresa, volume de dados, faturamento e maturidade de segurança.",
        factors: [
          "Faturamento anual da empresa",
          "Volume de dados pessoais armazenados (LGPD)",
          "Setor de atuação (saúde e financeiro pagam mais)",
          "Medidas de segurança implementadas (antivírus, firewall, backup, MFA)",
          "Histórico de incidentes cibernéticos",
          "Limite de cobertura desejado",
        ],
        note: "PMEs podem contratar a partir de R$ 5.000/ano com limite de R$ 500 mil. Empresas médias: R$ 15.000 a R$ 50.000/ano com limites de R$ 1 a R$ 5 milhões. Empresas com boas práticas de segurança pagam significativamente menos.",
      }}
      realScenarios={[
        { title: "Ransomware paralisou e-commerce", description: "Um e-commerce teve todos os sistemas criptografados por ransomware. O Seguro Cyber cobriu R$ 180.000 em perícia forense, R$ 95.000 em recuperação de dados e R$ 250.000 em lucros cessantes durante 15 dias de paralisação." },
        { title: "Vazamento de dados de clientes", description: "Uma clínica médica teve dados de 15.000 pacientes vazados. O seguro cobriu R$ 120.000 em notificações obrigatórias da LGPD, R$ 80.000 em assessoria jurídica e R$ 200.000 em indenizações a pacientes afetados." },
        { title: "Fraude de CEO (BEC)", description: "Criminosos se passaram pelo CEO de uma empresa por e-mail e convenceram o financeiro a transferir R$ 350.000. O Seguro Cyber com cobertura de fraudes eletrônicas ressarciu o valor integralmente." },
      ]}
      importantDetails={[
        { title: "LGPD e obrigações legais", content: "A Lei Geral de Proteção de Dados obriga empresas a notificar a ANPD e os afetados em caso de vazamento. O não cumprimento pode resultar em multas de até R$ 50 milhões. O seguro cobre todos os custos de adequação." },
        { title: "Resposta nas primeiras horas", content: "As primeiras 24-48 horas após um ataque são críticas. O Seguro Cyber disponibiliza equipe especializada 24/7 para contenção imediata — cada hora conta para minimizar danos." },
        { title: "Segurança como pré-requisito", content: "Seguradoras avaliam suas medidas de segurança antes de cotar. Medidas básicas como MFA, backup, antivírus atualizado e firewall não são opcionais — são pré-requisitos para obter cobertura." },
      ]}
      tips={[
        "Implemente autenticação multifator (MFA) em todos os sistemas — é o controle de segurança mais impactante e reduz o prêmio",
        "Faça backup diário com cópia offsite/nuvem — sua última linha de defesa contra ransomware",
        "Treine funcionários sobre phishing e engenharia social — 90% dos ataques começam por e-mail",
        "Tenha um plano de resposta a incidentes documentado antes que o ataque aconteça",
        "Mantenha sistemas e softwares atualizados — patches de segurança pendentes podem invalidar coberturas",
      ]}
      whoNeeds={[
        "Empresas que armazenam dados de clientes",
        "E-commerces e lojas virtuais",
        "Empresas de tecnologia e software",
        "Prestadores de serviços online",
        "Instituições financeiras e fintechs",
        "Qualquer empresa com operações digitais",
      ]}
      whyPatro={[
        "Análise de vulnerabilidades e riscos cibernéticos",
        "Orientação sobre adequação à LGPD",
        "Coberturas personalizadas para seu tipo de negócio",
        "Suporte técnico 24/7 em caso de ataque",
        "Parceria com seguradoras especializadas em cyber",
        "Assessoria em plano de resposta a incidentes",
      ]}
      faqs={[
        { question: "Minha empresa realmente precisa de seguro cyber?", answer: "Se você armazena dados de clientes digitalmente, sim! Ataques cibernéticos crescem exponencialmente e podem quebrar empresas." },
        { question: "O seguro cobre multas da LGPD?", answer: "Sim! A maioria das apólices inclui cobertura para custos relacionados à LGPD, incluindo notificações obrigatórias e defesa contra autuações." },
        { question: "O que fazer se sofrer um ataque?", answer: "Entre em contato imediatamente. Acionamos especialistas em perícia forense, negociadores e advogados. Tempo de resposta é crítico." },
        { question: "Quanto custa o seguro cyber?", answer: "PMEs a partir de R$ 5.000/ano. O custo depende do porte, volume de dados e medidas de segurança existentes." },
        { question: "Preciso ter certificações de segurança?", answer: "Não obrigatoriamente, mas medidas básicas (MFA, backup, antivírus) são pré-requisitos e reduzem o prêmio." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC", link: "/seguro-rc" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
      ]}
    />
  );
};

export default SeguroCyber;
