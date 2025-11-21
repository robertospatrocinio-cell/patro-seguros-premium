import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroCyber = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Cyber / Segurança Cibernética"
      subtitle="Proteção contra ataques cibernéticos e vazamento de dados"
      icon="🔒"
      description="O Seguro Cyber protege empresas contra riscos digitais: ataques hackers, ransomware, vazamento de dados, invasões de sistemas e violações da LGPD. Com o aumento exponencial de crimes cibernéticos, é fundamental proteger seu negócio. O seguro cobre não apenas os danos financeiros, mas também custos de recuperação, notificações obrigatórias, defesa jurídica e danos à reputação. Com a Patro Seguros, você tem acesso às melhores coberturas de segurança cibernética."
      coverages={[
        {
          title: "Vazamento de Dados (LGPD)",
          description: "Cobertura para custos de notificação e multas da LGPD",
        },
        {
          title: "Ransomware e Extorsão",
          description: "Cobertura para pagamento de resgates e negociação",
        },
        {
          title: "Interrupção de Negócios",
          description: "Indenização por parada de sistemas e perda de receita",
        },
        {
          title: "Recuperação de Dados",
          description: "Custos com restauração de sistemas e informações",
        },
        {
          title: "Responsabilidade Civil Cyber",
          description: "Cobre reclamações de clientes por vazamento de dados",
        },
        {
          title: "Defesa e Investigação",
          description: "Custos com perícia forense e advogados especializados",
        },
        {
          title: "Gestão de Crise e Reputação",
          description: "Suporte em comunicação e gestão de imagem",
        },
        {
          title: "Fraudes Eletrônicas",
          description: "Cobertura para transferências fraudulentas",
        },
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
        {
          question: "Minha empresa realmente precisa de seguro cyber?",
          answer: "Se você armazena dados de clientes, colaboradores ou fornecedores digitalmente, sim! Ataques cibernéticos crescem exponencialmente e podem quebrar empresas.",
        },
        {
          question: "O seguro cobre multas da LGPD?",
          answer: "Sim! A maioria das apólices modernas incluem cobertura para custos relacionados à LGPD, incluindo notificações obrigatórias e defesa contra autuações.",
        },
        {
          question: "O que fazer se sofrer um ataque?",
          answer: "Entre em contato imediatamente. Acionamos especialistas em perícia forense, negociadores (se ransomware) e advogados. Tempo de resposta é crítico.",
        },
        {
          question: "Quanto custa o seguro cyber?",
          answer: "Depende do porte da empresa, volume de dados, medidas de segurança existentes e limite de cobertura desejado. Fazemos análise de risco detalhada.",
        },
        {
          question: "Preciso ter certificações de segurança?",
          answer: "Não obrigatoriamente, mas ter medidas básicas de segurança ajuda a reduzir o prêmio e demonstra comprometimento com proteção de dados.",
        },
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
