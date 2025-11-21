import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroEmpresarial = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Empresarial"
      subtitle="Proteção completa para o patrimônio e as operações da sua empresa"
      icon="🏢"
      description="O Seguro Empresarial é essencial para proteger o patrimônio, as operações e a continuidade do seu negócio contra diversos riscos. Incêndios, roubos, danos elétricos, responsabilidade civil e interrupção de negócios podem comprometer seriamente uma empresa. Com a Patro Seguros, você tem acesso a coberturas personalizadas para cada tipo e porte de negócio, sempre com análise consultiva e as melhores condições do mercado."
      coverages={[
        {
          title: "Incêndio e Raio",
          description: "Cobertura para danos causados por fogo e descargas elétricas",
        },
        {
          title: "Roubo de Bens",
          description: "Proteção para equipamentos, estoque e valores",
        },
        {
          title: "Danos Elétricos",
          description: "Proteção de equipamentos contra variações de energia",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobre danos causados a terceiros nas operações",
        },
        {
          title: "Quebra de Vidros",
          description: "Cobertura para fachadas, vitrines e divisórias",
        },
        {
          title: "Equipamentos Eletrônicos",
          description: "Proteção para computadores, servidores e tecnologia",
        },
        {
          title: "Lucros Cessantes",
          description: "Cobertura para perda de receita após sinistro",
        },
        {
          title: "Vendaval e Fenômenos Naturais",
          description: "Proteção contra danos climáticos",
        },
      ]}
      whoNeeds={[
        "Empresas de todos os portes e segmentos",
        "Comércios, indústrias e prestadores de serviços",
        "Negócios com patrimônio e estoque significativo",
        "Empresas que dependem de equipamentos específicos",
        "Negócios que atendem público externo",
        "Empreendedores que querem garantir continuidade do negócio",
      ]}
      whyPatro={[
        "Análise de riscos específicos do seu segmento",
        "Coberturas sob medida para sua operação",
        "Avaliação correta de patrimônio e estoque",
        "Orientação sobre lucros cessantes adequados",
        "Suporte completo em sinistros para minimizar paradas",
        "Revisão anual conforme crescimento da empresa",
      ]}
      faqs={[
        {
          question: "Quanto custa um seguro empresarial?",
          answer: "O valor depende do ramo de atividade, tamanho da empresa, localização, valor do patrimônio e coberturas desejadas. Fazemos análise personalizada e cotação com múltiplas seguradoras.",
        },
        {
          question: "Quais empresas precisam de seguro?",
          answer: "Toda empresa que possui patrimônio físico, estoque, equipamentos ou atende público. É fundamental para proteção financeira e continuidade operacional.",
        },
        {
          question: "O que é lucros cessantes?",
          answer: "É a cobertura que garante indenização pela perda de receita durante o período de paralisação após um sinistro coberto. Essencial para empresas.",
        },
        {
          question: "Preciso fazer vistoria?",
          answer: "Depende do porte e risco da empresa. Muitas vezes a vistoria é exigida, mas acompanhamos todo o processo com você.",
        },
        {
          question: "Cobre funcionários?",
          answer: "Funcionários têm coberturas específicas (Seguro de Vida em Grupo, Acidentes Pessoais). Podemos estruturar um pacote completo de proteção empresarial.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
      ]}
    />
  );
};

export default SeguroEmpresarial;
