import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroEstagiario = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Estagiário"
      subtitle="Proteção obrigatória para estagiários conforme a Lei do Estágio"
      icon="🎓"
      description="O Seguro Estagiário é obrigatório por lei (Lei nº 11.788/2008) e deve ser contratado pela empresa concedente do estágio. Ele garante cobertura de acidentes pessoais para estagiários durante o período de estágio, incluindo morte acidental e invalidez permanente. A Patro Seguros oferece as melhores condições do mercado com contratação simples e rápida, atendendo empresas de todos os portes."
      coverages={[
        { title: "Morte Acidental", description: "Indenização aos beneficiários do estagiário em caso de falecimento por acidente" },
        { title: "Invalidez Permanente Total", description: "Indenização integral em caso de invalidez total por acidente durante o estágio" },
        { title: "Invalidez Permanente Parcial", description: "Indenização proporcional ao grau de invalidez causada por acidente" },
        { title: "Despesas Médico-Hospitalares", description: "Reembolso de gastos médicos decorrentes de acidente no estágio" },
        { title: "Cobertura 24 Horas", description: "Proteção dentro e fora do ambiente de trabalho, dependendo da apólice" },
        { title: "Traslado e Remoção", description: "Cobertura para transporte em caso de emergência médica" },
      ]}
      whoNeeds={[
        "Empresas que contratam estagiários",
        "Escritórios de advocacia, contabilidade e consultoria",
        "Hospitais, clínicas e laboratórios com estagiários",
        "Indústrias e fábricas com programas de estágio",
        "Órgãos públicos e autarquias",
        "Instituições de ensino com estágio obrigatório",
      ]}
      whyPatro={[
        "Contratação rápida e 100% digital",
        "Atendimento consultivo para adequação à Lei do Estágio",
        "Inclusão e exclusão de estagiários com facilidade",
        "Preços competitivos para qualquer volume de estagiários",
        "Suporte completo em caso de sinistro",
        "Certificado de seguro emitido rapidamente",
      ]}
      faqs={[
        { question: "O seguro estagiário é obrigatório?", answer: "Sim! A Lei nº 11.788/2008 exige que a empresa concedente contrate seguro de acidentes pessoais para todos os estagiários, sob pena de multa e irregularidade do contrato de estágio." },
        { question: "Quem paga o seguro do estagiário?", answer: "A responsabilidade de contratação e pagamento é da empresa concedente do estágio (a empresa onde o estagiário trabalha)." },
        { question: "Qual o valor mínimo de cobertura?", answer: "A lei não define um valor mínimo, mas o mercado pratica capitais a partir de R$ 10.000. Recomendamos coberturas adequadas ao risco da atividade." },
        { question: "Como incluir ou excluir estagiários?", answer: "O processo é simples e pode ser feito a qualquer momento durante a vigência da apólice. Basta nos informar os dados do estagiário." },
        { question: "O seguro cobre acidentes fora do estágio?", answer: "Depende da apólice contratada. Algumas oferecem cobertura 24 horas, outras apenas durante o horário e trajeto do estágio." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
      ]}
    />
  );
};

export default SeguroEstagiario;
