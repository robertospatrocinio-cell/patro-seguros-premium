import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroTransporte = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Transporte"
      subtitle="Proteção completa para cargas nacionais e internacionais"
      icon="📦"
      description="O Seguro de Transporte protege mercadorias durante o trajeto rodoviário, aéreo, marítimo ou ferroviário contra roubo, acidentes, avarias e diversos outros riscos. É fundamental para empresas que transportam ou recebem cargas, garantindo o valor da mercadoria em caso de sinistro. Com a Patro Seguros, você tem acesso a coberturas nacionais e internacionais com as principais seguradoras especializadas."
      coverages={[
        {
          title: "Roubo e Furto de Cargas",
          description: "Proteção contra subtração da mercadoria durante transporte",
        },
        {
          title: "Acidentes de Trânsito",
          description: "Cobertura para danos em colisões e tombamentos",
        },
        {
          title: "Incêndio e Explosão",
          description: "Proteção contra sinistros com fogo durante transporte",
        },
        {
          title: "Avarias de Carga",
          description: "Cobertura para danos e quebras da mercadoria",
        },
        {
          title: "Fenômenos Naturais",
          description: "Proteção contra chuvas, enchentes e outros eventos",
        },
        {
          title: "Operações de Carga e Descarga",
          description: "Cobertura durante embarque e desembarque",
        },
        {
          title: "Transporte Internacional",
          description: "Proteção para importações e exportações",
        },
        {
          title: "Gerenciamento de Risco",
          description: "Escolta e monitoramento para cargas de alto valor",
        },
      ]}
      whoNeeds={[
        "Transportadoras e empresas de logística",
        "Indústrias que transportam produtos",
        "Importadores e exportadores",
        "E-commerces que enviam produtos",
        "Distribuidores e atacadistas",
        "Empresas com operações de alta movimentação de cargas",
      ]}
      whyPatro={[
        "Análise de rotas e riscos específicos",
        "Seguro por viagem ou apólice aberta (anual)",
        "Orientação sobre responsabilidades e indenizações",
        "Suporte em casos de sinistro com agilidade",
        "Parcerias com seguradoras especializadas em transporte",
        "Gerenciamento de riscos e redução de sinistros",
      ]}
      faqs={[
        {
          question: "Qual a diferença entre RCF-DC e seguro de transporte?",
          answer: "RCF-DC (Responsabilidade Civil Facultativa do Transportador) cobre a responsabilidade da transportadora. O Seguro de Transporte é contratado pelo dono da carga. Ambos são importantes e complementares.",
        },
        {
          question: "Como é calculado o valor do seguro?",
          answer: "Baseado no valor da mercadoria (nota fiscal), tipo de produto, distância, rota e modalidade de transporte. Fazemos cotação por viagem ou anual.",
        },
        {
          question: "Cobre transporte internacional?",
          answer: "Sim! Temos seguros específicos para importação e exportação, cobrindo desde a origem até o destino final.",
        },
        {
          question: "E se a mercadoria chegar avariada?",
          answer: "Documente imediatamente com fotos, laudos e boletim de ocorrência se necessário. Orientamos todo o processo de regulação.",
        },
        {
          question: "Preciso declarar o conteúdo da carga?",
          answer: "Sim, é obrigatório declarar corretamente o tipo de mercadoria e valor para garantir cobertura adequada.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroTransporte;
