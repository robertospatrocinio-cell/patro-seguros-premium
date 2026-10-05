import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-cyber.webp";

const SeguroCyber = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Cyber / Segurança Cibernética"
      subtitle="Proteção contra ataques cibernéticos e vazamento de dados"
      icon="🔒"
      metaDescription="Seguro Cyber para riscos cibernéticos, incidentes e dados pessoais. Coberturas dependem do produto, da apólice e da análise da seguradora."
      description="O Seguro Cyber pode ajudar a transferir impactos financeiros de determinados incidentes cibernéticos, conforme o produto, as coberturas contratadas, os limites e as exclusões da apólice."
      detailedDescription={`Empresas de diferentes portes podem estar expostas a incidentes cibernéticos. As consequências variam conforme o evento e podem envolver paralisação, recuperação de sistemas, reclamações de terceiros e obrigações regulatórias, sempre de acordo com o caso concreto e a legislação aplicável.

Um ataque de ransomware pode comprometer sistemas e gerar extorsão, mas resposta, investigação, restauração e eventual pagamento relacionado ao resgate possuem regras, limites e exclusões próprios. Um incidente envolvendo dados pessoais pode exigir análise regulatória conforme a LGPD e a Resolução CD/ANPD nº 15/2024. A LGPD prevê sanções administrativas dentro das condições do art. 52; o teto legal não representa multa automática.

O Seguro Cyber não substitui governança, segurança da informação ou conformidade com a LGPD. Dependendo do produto e das coberturas contratadas, pode contemplar custos de resposta a incidentes, investigação, restauração, responsabilidade perante terceiros, interrupção de negócios e outras garantias, sempre dentro da apólice.

Na Patro Seguros, avaliamos a maturidade de segurança da sua empresa e recomendamos coberturas adequadas ao seu nível de exposição digital.`}
      howItWorks={[
        { step: "1", title: "Avaliação de Risco Digital", description: "Mapeamos sua infraestrutura digital, volume de dados, medidas de segurança existentes e exposição" },
        { step: "2", title: "Dimensionamento da Cobertura", description: "Definimos limites para cada tipo de cobertura: resposta a incidentes, RC, lucros cessantes, etc." },
        { step: "3", title: "Cotação Especializada", description: "Buscamos propostas de seguradoras com expertise em riscos cibernéticos" },
        { step: "4", title: "Resposta a Incidentes", description: "Em caso de ataque, a seguradora aciona equipe especializada 24/7 para contenção, investigação e recuperação" },
      ]}
      coverages={[
        { title: "Incidentes e dados pessoais", description: "Pode contemplar resposta, notificação e custos relacionados, conforme coberturas, limites e condições contratadas." },
        { title: "Ransomware e extorsão", description: "Resposta, investigação, restauração e eventual extorsão possuem regras e exclusões próprias; não há cobertura automática de resgate." },
        { title: "Interrupção de negócios", description: "Pode contemplar perdas decorrentes de paralisação quando contratada e observados os requisitos da apólice." },
        { title: "Recuperação de dados", description: "Custos de restauração podem ser cobertos quando previstos no produto e dentro dos limites contratados." },
        { title: "Responsabilidade Civil Cyber", description: "Pode atender reclamações de terceiros relacionadas a incidentes cibernéticos, conforme o contrato." },
        { title: "Defesa e investigação", description: "Perícia, honorários e resposta a incidentes dependem da cobertura, dos profissionais previstos e dos procedimentos da apólice." },
        { title: "Gestão de crise", description: "Serviços de comunicação e gerenciamento de crise podem ser oferecidos conforme o produto contratado." },
        { title: "Fraudes eletrônicas", description: "Ataques de engenharia social e transferências fraudulentas exigem cobertura específica, quando disponível." },
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
        { title: "LGPD e obrigações legais", content: "A LGPD e a Resolução CD/ANPD nº 15/2024 tratam da comunicação de incidentes de segurança com dados pessoais que possam acarretar risco ou dano relevante. A obrigação é analisada conforme o caso e recai sobre o controlador nos termos da regulamentação. Seguro Cyber não substitui medidas de conformidade e não cobre automaticamente multas ou custos de adequação." },
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
        { question: "Minha empresa fica em conformidade com a LGPD ao contratar Cyber?", answer: "Não. O Seguro Cyber pode transferir parte dos impactos financeiros de determinados incidentes, conforme a apólice, mas não substitui medidas jurídicas, organizacionais, técnicas e administrativas de conformidade." },
        { question: "O seguro cobre multas da LGPD?", answer: "Depende da cobertura contratada, da natureza da penalidade, dos limites, das exclusões e da permissibilidade jurídica. Não há cobertura automática para multas da LGPD." },
        { question: "O que fazer se sofrer um ataque?", answer: "Entre em contato imediatamente. Acionamos especialistas em perícia forense, negociadores e advogados. Tempo de resposta é crítico." },
        { question: "Quanto custa o seguro cyber?", answer: "PMEs a partir de R$ 5.000/ano. O custo depende do porte, volume de dados e medidas de segurança existentes." },
        { question: "Preciso ter certificações de segurança?", answer: "A exigência depende do produto e da análise da seguradora. Medidas como MFA, backup e controles de acesso podem ser avaliadas no questionário de risco, mas não constituem uma regra universal para todos os produtos." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC", link: "/seguro-rc" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro para Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
        { title: "Consultório Médico", link: "/seguro-consultorio-medico-guarulhos" },
        { title: "Seguro para Sala Comercial (escritórios e clínicas)", link: "/seguro-sala-comercial-guarulhos" },
      ]}
    />
  );
};

export default SeguroCyber;
