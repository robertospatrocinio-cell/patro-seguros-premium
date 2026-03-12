import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroMaquinas = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Máquinas e Equipamentos"
      subtitle="Proteção para o maquinário essencial da sua operação"
      icon="⚙️"
      metaDescription="Seguro de Máquinas e Equipamentos industriais e agrícolas. Cobertura contra quebra, incêndio e lucros cessantes. Cotação grátis Patro Seguros."
      description="O Seguro de Máquinas e Equipamentos protege contra danos, quebras e paralisações de maquinário industrial, agrícola, de construção e equipamentos especializados. Uma quebra inesperada pode custar caro em reparos e lucros cessantes. Com a Patro Seguros, você protege seu investimento em equipamentos e garante a continuidade operacional do seu negócio."
      coverages={[
        {
          title: "Quebra Acidental",
          description: "Cobertura para danos súbitos e imprevistos ao equipamento",
        },
        {
          title: "Danos Elétricos",
          description: "Proteção contra curto-circuito e variação de energia",
        },
        {
          title: "Incêndio e Raio",
          description: "Cobertura para danos causados por fogo e descargas elétricas",
        },
        {
          title: "Roubo e Furto",
          description: "Proteção contra subtração de máquinas e equipamentos",
        },
        {
          title: "Erro de Operação",
          description: "Cobertura para danos causados por imperícia do operador",
        },
        {
          title: "Despesas Extraordinárias",
          description: "Cobre custos de horas extras e frete expresso para reparos",
        },
        {
          title: "Lucros Cessantes",
          description: "Indenização por paralisação da produção",
        },
        {
          title: "Equipamentos Móveis",
          description: "Cobertura durante transporte e movimentação",
        },
      ]}
      whoNeeds={[
        "Indústrias com maquinário de produção",
        "Construtoras com equipamentos de construção",
        "Gráficas e empresas com impressoras industriais",
        "Metalúrgicas e fabricantes",
        "Hospitais com equipamentos médicos",
        "Empresas com servidores e equipamentos de TI",
      ]}
      whyPatro={[
        "Avaliação correta do valor de reposição dos equipamentos",
        "Análise de riscos específicos da operação",
        "Orientação sobre lucros cessantes adequados",
        "Suporte técnico em caso de sinistro",
        "Parcerias com seguradoras especializadas",
        "Revisão periódica conforme expansão do parque",
      ]}
      faqs={[
        {
          question: "Quais tipos de máquinas podem ser seguradas?",
          answer: "Praticamente qualquer equipamento: máquinas industriais, agrícolas, de construção, equipamentos médicos, de TI, gráficos, de mineração e mais.",
        },
        {
          question: "Como é definido o valor do seguro?",
          answer: "Baseado no valor de reposição da máquina nova ou no valor atual do equipamento usado, conforme escolha. Orientamos sobre a melhor opção.",
        },
        {
          question: "Cobre peças de reposição?",
          answer: "Sim! Geralmente cobre peças novas necessárias para o reparo. Alguns casos podem incluir depreciação conforme política da apólice.",
        },
        {
          question: "E se a máquina parar a produção?",
          answer: "Por isso existe a cobertura de lucros cessantes, que indeniza pela paralisação durante o período de reparo.",
        },
        {
          question: "Preciso fazer manutenção preventiva?",
          answer: "Sim! A falta de manutenção pode ser motivo de perda de cobertura. É importante seguir as recomendações do fabricante.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
      ]}
    />
  );
};

export default SeguroMaquinas;
