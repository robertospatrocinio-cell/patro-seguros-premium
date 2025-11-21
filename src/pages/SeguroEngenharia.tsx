import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroEngenharia = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Garantia e Riscos de Engenharia"
      subtitle="Proteção completa para obras e projetos de construção"
      icon="🏗️"
      description="Os Seguros de Engenharia protegem obras de construção civil, montagens industriais e projetos de infraestrutura contra diversos riscos durante e após a execução. Incluem Seguro Garantia, Risco de Engenharia, Responsabilidade Civil e outros. São essenciais para construtoras, incorporadoras e empresas que executam grandes projetos. Com a Patro Seguros, você tem acesso a coberturas especializadas e suporte técnico completo."
      coverages={[
        {
          title: "Riscos de Engenharia (Obras Civis)",
          description: "Cobertura para danos durante construção ou reforma",
        },
        {
          title: "Seguro Garantia",
          description: "Garantia de cumprimento de contratos e obrigações",
        },
        {
          title: "Equipamentos e Máquinas",
          description: "Proteção para maquinário utilizado na obra",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobre danos a terceiros e propriedades vizinhas",
        },
        {
          title: "Período de Manutenção",
          description: "Cobertura após entrega da obra durante garantia",
        },
        {
          title: "Tumultos e Greves",
          description: "Proteção contra danos causados por manifestações",
        },
        {
          title: "Erro de Projeto",
          description: "Cobertura para falhas no projeto executivo",
        },
        {
          title: "Instalações Provisórias",
          description: "Proteção para canteiros, escritórios e alojamentos",
        },
      ]}
      whoNeeds={[
        "Construtoras e incorporadoras",
        "Empresas de engenharia civil",
        "Empreiteiras e subempreiteiras",
        "Empresas de montagem industrial",
        "Empresas de infraestrutura",
        "Órgãos públicos que contratam obras",
      ]}
      whyPatro={[
        "Conhecimento técnico em seguros de engenharia",
        "Análise de riscos específicos de cada projeto",
        "Orientação sobre modalidades adequadas",
        "Suporte em processos licitatórios",
        "Emissão rápida de apólices",
        "Parcerias com seguradoras especializadas",
      ]}
      faqs={[
        {
          question: "O que é Seguro Garantia?",
          answer: "É a garantia exigida em contratos públicos e privados que assegura o cumprimento das obrigações contratuais. Substitui caução e fiança bancária.",
        },
        {
          question: "Quando devo contratar o seguro de obras?",
          answer: "Antes do início da obra. Muitos contratos exigem o seguro como pré-requisito para liberação do canteiro.",
        },
        {
          question: "Quanto custa o seguro de engenharia?",
          answer: "Varia conforme tipo de obra, valor do contrato, prazo de execução, localização e riscos envolvidos. Fazemos cotação técnica detalhada.",
        },
        {
          question: "Cobre erro de projeto?",
          answer: "Sim, há coberturas específicas para erro de projeto, mas geralmente com limitações e franquias. Analisamos a necessidade caso a caso.",
        },
        {
          question: "O seguro cobre a obra toda?",
          answer: "Sim! Cobre estrutura, materiais, equipamentos e até instalações provisórias, dependendo das coberturas contratadas.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC", link: "/seguro-rc" },
        { title: "Seguro de Máquinas", link: "/seguro-maquinas" },
      ]}
    />
  );
};

export default SeguroEngenharia;
