import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroAmbiental = () => (
  <InsurancePageTemplate
    title="Seguro Ambiental"
    subtitle="Proteção contra riscos de danos ambientais e responsabilidade por poluição"
    icon="🌿"
    badge="Especialistas no Agro"
    description="O Seguro Ambiental oferece cobertura para empresas contra custos de remediação, danos a terceiros e responsabilidade civil decorrentes de eventos de poluição e contaminação ambiental. Essencial para indústrias, transportadoras de produtos perigosos, postos de combustível e qualquer atividade com potencial impacto ao meio ambiente."
    coverages={[
      { title: "Poluição Súbita e Acidental", description: "Cobertura para eventos inesperados de contaminação do solo, água ou ar." },
      { title: "Poluição Gradual", description: "Proteção contra vazamentos lentos e contaminação progressiva ao longo do tempo." },
      { title: "Custos de Remediação", description: "Reembolso de despesas com limpeza, descontaminação e recuperação ambiental." },
      { title: "Responsabilidade Civil Ambiental", description: "Cobertura para indenizações a terceiros afetados por danos ambientais." },
      { title: "Danos Corporais e Materiais", description: "Proteção contra lesões e prejuízos materiais causados pela poluição." },
      { title: "Defesa Jurídica", description: "Custos com honorários advocatícios e processos judiciais ambientais." },
      { title: "Transporte de Resíduos", description: "Cobertura para incidentes durante o transporte de materiais perigosos." },
      { title: "Multas e Penalidades", description: "Proteção contra sanções administrativas de órgãos ambientais, quando segurável." },
    ]}
    whoNeeds={[
      "Indústrias e fábricas com potencial poluidor",
      "Postos de combustível e distribuidoras",
      "Transportadoras de produtos químicos e perigosos",
      "Empresas de mineração e extração",
      "Construtoras e incorporadoras",
      "Empresas de saneamento e tratamento de resíduos",
      "Agronegócios com uso de defensivos agrícolas",
      "Operadores de aterros sanitários",
    ]}
    whyPatro={[
      "Especialistas em seguros para setores industriais e rurais",
      "Análise personalizada do risco ambiental da sua operação",
      "Cotação com as principais seguradoras do mercado",
      "Suporte completo em caso de sinistro ambiental",
      "Consultoria para adequação às normas ambientais",
      "Atendimento ágil e especializado",
    ]}
    faqs={[
      { question: "O que é o Seguro Ambiental?", answer: "É uma apólice que protege empresas contra custos financeiros decorrentes de danos ao meio ambiente, incluindo poluição, contaminação e responsabilidade civil ambiental." },
      { question: "Quem precisa contratar o Seguro Ambiental?", answer: "Qualquer empresa cuja atividade apresente risco de causar danos ambientais, como indústrias, transportadoras de produtos perigosos, postos de combustível e mineradoras." },
      { question: "O seguro cobre poluição gradual?", answer: "Sim, a maioria das apólices cobre tanto a poluição súbita e acidental quanto a gradual, dependendo das condições contratadas." },
      { question: "O Seguro Ambiental é obrigatório?", answer: "Em alguns setores e atividades, sim. A legislação ambiental brasileira pode exigir garantias financeiras para operações com alto potencial poluidor." },
      { question: "Qual o custo do Seguro Ambiental?", answer: "O valor varia conforme o tipo de atividade, localização, histórico ambiental e coberturas desejadas. Solicite uma cotação personalizada." },
    ]}
    relatedInsurances={[
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      { title: "Seguro RC", link: "/seguro-rc" },
      { title: "Seguro Engenharia", link: "/seguro-engenharia" },
      { title: "Seguro Transporte", link: "/seguro-transporte" },
      { title: "Seguro Rural", link: "/seguro-rural" },
    ]}
  />
);

export default SeguroAmbiental;
