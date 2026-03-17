import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroEstagiario = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Estagiário"
      subtitle="Proteção obrigatória para estagiários conforme a Lei do Estágio"
      icon="🎓"
      metaDescription="Seguro Estagiário obrigatório pela Lei 11.788/2008. Contratação simples para empresas de todos os portes. Cobertura de acidentes pessoais. Cotação grátis Patro Seguros."
      description="O Seguro Estagiário é obrigatório por lei (Lei nº 11.788/2008) e garante cobertura de acidentes pessoais para estagiários durante o estágio."
      detailedDescription={`A Lei do Estágio (nº 11.788/2008) é clara: toda empresa que recebe estagiários é obrigada a contratar seguro de acidentes pessoais em favor do estagiário. A não contratação pode resultar em irregularidade do contrato de estágio, multas e responsabilização direta da empresa por acidentes.

O seguro estagiário é simples e acessível: cobre morte acidental, invalidez permanente total e parcial, e, em muitas apólices, despesas médico-hospitalares decorrentes de acidentes durante o estágio. Algumas apólices oferecem cobertura 24 horas (dentro e fora do estágio).

A gestão do seguro é flexível: estagiários podem ser incluídos e excluídos a qualquer momento durante a vigência da apólice, sem burocracia. O custo é muito baixo — geralmente de R$ 5 a R$ 15 por estagiário/mês.

Na Patro Seguros, oferecemos contratação 100% digital, emissão rápida de certificados individuais e gestão simplificada para empresas de todos os portes — de escritórios com 1 estagiário a grandes corporações com centenas.`}
      howItWorks={[
        { step: "1", title: "Dados da Empresa", description: "Informe dados da empresa, número de estagiários e tipo de atividade" },
        { step: "2", title: "Escolha do Plano", description: "Selecione coberturas (morte acidental, invalidez, DMH) e capitais segurados" },
        { step: "3", title: "Emissão Rápida", description: "Apólice e certificados individuais emitidos rapidamente, prontos para o RH" },
        { step: "4", title: "Gestão Flexível", description: "Inclua ou exclua estagiários a qualquer momento por e-mail ou WhatsApp" },
      ]}
      coverages={[
        { title: "Morte Acidental", description: "Indenização aos beneficiários do estagiário em caso de falecimento por acidente" },
        { title: "Invalidez Permanente Total", description: "Indenização integral em caso de invalidez total por acidente durante o estágio" },
        { title: "Invalidez Permanente Parcial", description: "Indenização proporcional ao grau de invalidez causada por acidente" },
        { title: "Despesas Médico-Hospitalares", description: "Reembolso de gastos médicos decorrentes de acidente no estágio" },
        { title: "Cobertura 24 Horas", description: "Proteção dentro e fora do ambiente de trabalho, dependendo da apólice" },
        { title: "Traslado e Remoção", description: "Cobertura para transporte em caso de emergência médica" },
      ]}
      coverageExclusions={[
        "Doenças (o seguro cobre apenas acidentes)",
        "Acidentes fora do período e local de estágio (em apólices sem cobertura 24h)",
        "Atos intencionais do estagiário",
        "Prática de esportes radicais ou atividades não relacionadas ao estágio",
        "Acidentes sob efeito de álcool ou drogas",
      ]}
      pricingInfo={{
        intro: "O seguro estagiário é extremamente acessível — um dos seguros mais baratos do mercado.",
        factors: [
          "Número de estagiários na empresa",
          "Capital segurado escolhido (R$ 10.000 a R$ 50.000)",
          "Coberturas incluídas (morte, invalidez, DMH, 24h)",
          "Tipo de atividade do estágio (risco da função)",
          "Cobertura durante horário de estágio ou 24 horas",
        ],
        note: "O custo médio é de R$ 5 a R$ 15 por estagiário/mês. Uma empresa com 10 estagiários paga de R$ 600 a R$ 1.800/ano. Valores muito baixos comparados ao risco de não ter o seguro.",
      }}
      realScenarios={[
        { title: "Acidente de trajeto", description: "Um estagiário sofreu acidente de bicicleta no trajeto casa-empresa, resultando em fratura no braço. O seguro cobriu R$ 8.000 em despesas médicas e R$ 3.000 de indenização por invalidez parcial." },
        { title: "Queda no local de estágio", description: "Uma estagiária caiu de escada no escritório e teve lesão no tornozelo. O seguro reembolsou R$ 5.000 em consultas, exames e fisioterapia." },
        { title: "Empresa multada sem seguro", description: "Uma empresa foi autuada por manter 5 estagiários sem seguro obrigatório. Além da multa, todos os contratos de estágio foram considerados irregulares. Após contratar o seguro via Patro, a situação foi regularizada." },
      ]}
      importantDetails={[
        { title: "Obrigatoriedade legal", content: "A Lei nº 11.788/2008 exige que a empresa concedente contrate seguro de acidentes pessoais para TODOS os estagiários. A falta do seguro torna o contrato de estágio irregular e pode gerar vínculo empregatício." },
        { title: "Quem paga", content: "A responsabilidade é da empresa concedente (onde o estagiário trabalha). O custo não pode ser repassado ao estagiário. Agentes de integração podem intermediar, mas a obrigação é da empresa." },
        { title: "Certificado individual", content: "Cada estagiário deve receber um certificado individual do seguro. A Patro emite e entrega esses certificados rapidamente para seu RH." },
      ]}
      tips={[
        "Contrate o seguro ANTES do início do estágio — o estagiário só deve começar com o seguro vigente",
        "Opte por cobertura 24 horas quando possível — o custo adicional é muito baixo e a proteção é muito maior",
        "Mantenha controle atualizado de inclusões e exclusões — estagiários que saíram devem ser excluídos para evitar custo desnecessário",
        "Guarde os certificados individuais no dossiê de cada estagiário — é prova de regularidade em fiscalizações",
        "Avalie capitais segurados superiores ao mínimo — R$ 10.000 pode ser insuficiente para acidentes graves",
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
        { question: "O seguro estagiário é obrigatório?", answer: "Sim! A Lei nº 11.788/2008 exige seguro de acidentes pessoais para todos os estagiários, sob pena de multa e irregularidade do contrato." },
        { question: "Quem paga o seguro do estagiário?", answer: "A empresa concedente do estágio. O custo não pode ser repassado ao estagiário." },
        { question: "Qual o valor mínimo de cobertura?", answer: "A lei não define mínimo, mas o mercado pratica capitais a partir de R$ 10.000. Recomendamos coberturas adequadas ao risco." },
        { question: "Como incluir ou excluir estagiários?", answer: "É simples e pode ser feito a qualquer momento por e-mail ou WhatsApp." },
        { question: "Quanto custa?", answer: "De R$ 5 a R$ 15 por estagiário/mês. Um dos seguros mais acessíveis do mercado." },
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
