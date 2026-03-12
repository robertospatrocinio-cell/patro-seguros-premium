import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroSaude = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Saúde / Plano de Saúde"
      subtitle="Acesso a atendimento médico de qualidade quando você mais precisa"
      icon="🏥"
      metaDescription="Plano de Saúde e Seguro Saúde. Compare Bradesco, Amil, SulAmérica, Porto Saúde e mais. Individual, familiar e empresarial. Cotação grátis Patro Seguros."
      description="O Seguro Saúde (Plano de Saúde) garante acesso a consultas, exames, internações e procedimentos médicos com qualidade e rapidez. É fundamental para evitar comprometer suas economias em situações de emergência e garantir atendimento adequado para você e sua família. Com a Patro Seguros, você encontra as melhores operadoras, planos sob medida e condições especiais."
      coverages={[
        {
          title: "Consultas Médicas",
          description: "Acesso a clínicos gerais e especialistas",
        },
        {
          title: "Exames e Diagnósticos",
          description: "Cobertura para exames laboratoriais e de imagem",
        },
        {
          title: "Internações Hospitalares",
          description: "Cobertura para internações clínicas e cirúrgicas",
        },
        {
          title: "Cirurgias",
          description: "Procedimentos cirúrgicos de pequeno, médio e grande porte",
        },
        {
          title: "Urgência e Emergência",
          description: "Atendimento imediato em situações críticas",
        },
        {
          title: "Tratamentos",
          description: "Quimioterapia, radioterapia, hemodiálise e mais",
        },
        {
          title: "Parto e Obstetrícia",
          description: "Acompanhamento gestacional e parto",
        },
        {
          title: "Reembolso",
          description: "Opção de reembolso em alguns planos",
        },
      ]}
      whoNeeds={[
        "Pessoas que querem evitar filas do SUS",
        "Famílias que buscam atendimento rápido e qualidade",
        "Profissionais autônomos sem plano corporativo",
        "Idosos que precisam de acompanhamento médico regular",
        "Gestantes que querem pré-natal e parto particular",
        "Qualquer pessoa que valorize saúde preventiva",
      ]}
      whyPatro={[
        "Análise comparativa entre diversas operadoras e planos",
        "Orientação sobre coparticipação vs mensalidade fixa",
        "Verificação de rede credenciada na sua região",
        "Auxílio em carências e portabilidade",
        "Negociação de condições especiais",
        "Suporte em caso de negativas de cobertura",
      ]}
      faqs={[
        {
          question: "Qual a diferença entre coparticipação e mensalidade fixa?",
          answer: "Na coparticipação você paga uma mensalidade menor, mas paga um valor por cada uso. Na mensalidade fixa, você paga um valor fixo e usa sem custos adicionais (exceto materiais específicos).",
        },
        {
          question: "O que são carências?",
          answer: "São períodos de espera para usar determinados serviços após a contratação. Urgências têm carência de 24h, partos de 300 dias. Doenças preexistentes podem ter carências especiais.",
        },
        {
          question: "Posso incluir meus pais?",
          answer: "Sim! É possível incluir pais, cônjuge, filhos e dependentes legais. Analisamos a melhor configuração familiar para você.",
        },
        {
          question: "Como funciona portabilidade de carências?",
          answer: "Se você já tem plano e quer trocar, pode levar as carências cumpridas. Orientamos sobre regras e prazos para portabilidade.",
        },
        {
          question: "Posso usar em qualquer lugar do Brasil?",
          answer: "Depende do plano. Alguns têm abrangência nacional, outros regional ou municipal. Analisamos suas necessidades de deslocamento.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Odonto", link: "/seguro-odonto" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
      ]}
    />
  );
};

export default SeguroSaude;
