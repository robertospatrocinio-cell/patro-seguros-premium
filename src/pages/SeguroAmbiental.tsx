import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroAmbiental = () => (
  <InsurancePageTemplate
    title="Seguro Ambiental"
    subtitle="Proteção contra riscos de danos ambientais e responsabilidade por poluição. Atendemos empresas de todos os estados do Brasil."
    icon="🌿"
    metaDescription="Seguro Ambiental em todo o Brasil para indústrias, transportadoras e postos de combustível. Cobertura contra poluição, contaminação e remediação. Cotação grátis Patro Seguros."
    badge="Atendimento em Todo o Brasil"
    description="O Seguro Ambiental protege empresas contra custos de remediação, danos a terceiros e responsabilidade civil por eventos de poluição e contaminação ambiental."
    detailedDescription={`A legislação ambiental brasileira é uma das mais rigorosas do mundo, e a responsabilidade ambiental é objetiva: a empresa é responsável pelos danos independentemente de culpa. Multas do IBAMA podem chegar a R$ 50 milhões. Custos de remediação (limpeza e descontaminação) podem superar o valor da própria empresa. Processos judiciais por danos ambientais podem se arrastar por décadas.

O Seguro Ambiental cobre os custos que podem literalmente falir uma empresa: remediação do solo e da água, indenização a comunidades afetadas, defesa jurídica, multas administrativas (quando seguráveis) e até danos à biodiversidade. É uma proteção que vai muito além do seguro empresarial tradicional.

Uma característica importante do Seguro Ambiental é que ele cobre tanto a poluição súbita (acidental) quanto a gradual (vazamentos lentos que se acumulam ao longo do tempo). A poluição gradual é uma das maiores fontes de passivos ambientais e não é coberta por seguros empresariais convencionais.

Na Patro Seguros, atendemos empresas de todos os estados do Brasil com consultoria especializada em riscos ambientais e adequação à legislação.`}
    howItWorks={[
      { step: "1", title: "Diagnóstico Ambiental", description: "Avaliamos sua atividade, substâncias utilizadas, processos e histórico ambiental do site" },
      { step: "2", title: "Dimensionamento de Riscos", description: "Identificamos os cenários de risco ambiental e dimensionamos limites de cobertura adequados" },
      { step: "3", title: "Cotação Especializada", description: "Buscamos propostas de seguradoras com expertise em riscos ambientais" },
      { step: "4", title: "Resposta a Incidentes", description: "Em caso de sinistro ambiental, a seguradora aciona equipe de resposta para contenção e remediação imediata" },
    ]}
    coverages={[
      { title: "Poluição Súbita e Acidental", description: "Cobertura para eventos inesperados de contaminação" },
      { title: "Poluição Gradual", description: "Proteção contra vazamentos lentos e contaminação progressiva" },
      { title: "Custos de Remediação", description: "Despesas com limpeza, descontaminação e recuperação ambiental" },
      { title: "Responsabilidade Civil Ambiental", description: "Indenizações a terceiros afetados por danos ambientais" },
      { title: "Danos Corporais e Materiais", description: "Proteção contra lesões e prejuízos causados pela poluição" },
      { title: "Defesa Jurídica", description: "Custos com honorários e processos judiciais ambientais" },
      { title: "Transporte de Resíduos", description: "Cobertura para incidentes durante transporte de materiais perigosos" },
      { title: "Multas e Penalidades", description: "Proteção contra sanções de órgãos ambientais, quando segurável" },
    ]}
    coverageExclusions={[
      "Poluição intencional ou dolosa",
      "Condições ambientais preexistentes conhecidas e não declaradas",
      "Desmatamento e queimadas intencionais",
      "Danos nucleares e radioativos",
      "Descumprimento flagrante de normas ambientais vigentes",
      "Atividades ilegais de descarte de resíduos",
    ]}
    pricingInfo={{
      intro: "O custo do Seguro Ambiental varia conforme o setor de atividade, porte da operação e nível de risco ambiental.",
      factors: [
        "Tipo de atividade e substâncias utilizadas",
        "Localização (proximidade de corpos d'água, áreas de preservação)",
        "Histórico ambiental do site (passivos, autuações)",
        "Medidas de prevenção implementadas (PGRS, tratamento de efluentes)",
        "Limite de cobertura desejado",
        "Existência de licenças ambientais válidas",
      ],
      note: "Postos de combustível: R$ 8.000 a R$ 25.000/ano. Indústrias de médio porte: R$ 15.000 a R$ 80.000/ano. Transportadoras de produtos perigosos: R$ 10.000 a R$ 50.000/ano. Valores que representam uma fração do custo de uma remediação ambiental.",
    }}
    realScenarios={[
      { title: "Vazamento de tanque em posto", description: "Um posto de combustível descobriu vazamento gradual de diesel que contaminou o solo e o lençol freático. O custo de remediação foi de R$ 1,2 milhão. O Seguro Ambiental cobriu integralmente, incluindo monitoramento por 5 anos." },
      { title: "Acidente com caminhão de químicos", description: "Um caminhão de uma indústria tombou derramando produtos químicos em rio. O seguro cobriu R$ 800.000 em contenção, limpeza do rio, indenização a comunidades ribeirinhas e defesa jurídica." },
      { title: "Poluição industrial por efluentes", description: "Uma fábrica teve falha no sistema de tratamento de efluentes, contaminando córrego próximo. Multa do IBAMA: R$ 2 milhões. Remediação: R$ 500.000. O seguro cobriu R$ 2,5 milhões em custos totais." },
    ]}
    importantDetails={[
      { title: "Responsabilidade objetiva", content: "No Brasil, a responsabilidade ambiental é objetiva: a empresa responde pelos danos independentemente de culpa. Basta provar o dano e o nexo causal. O seguro é a única proteção efetiva." },
      { title: "Poluição gradual", content: "Vazamentos lentos de tanques subterrâneos, contaminação progressiva do solo por resíduos — a poluição gradual pode levar anos para ser detectada e os custos de remediação são enormes. O Seguro Ambiental cobre essa modalidade." },
      { title: "Licenciamento ambiental", content: "Empresas com licenças ambientais válidas e programas de gestão ambiental implementados obtêm melhores condições de seguro. A adequação ambiental é pré-requisito para cobertura." },
    ]}
    tips={[
      "Mantenha todas as licenças ambientais atualizadas — é pré-requisito para cobertura e reduz o prêmio",
      "Implemente programa de gestão de resíduos (PGRS) documentado — demonstra responsabilidade e melhora condições de seguro",
      "Faça análises periódicas de solo e água subterrânea em áreas de risco — detectar contaminação cedo reduz custos drasticamente",
      "Tenha plano de resposta a emergências ambientais documentado e treinado com a equipe",
      "Postos de combustível: teste os tanques subterrâneos periodicamente — vazamentos graduais são a principal causa de sinistros",
    ]}
    whoNeeds={[
      "Indústrias e fábricas com potencial poluidor em qualquer estado",
      "Postos de combustível e distribuidoras em todo o Brasil",
      "Transportadoras de produtos químicos e perigosos",
      "Empresas de mineração e extração",
      "Construtoras e incorporadoras",
      "Empresas de saneamento e tratamento de resíduos",
      "Agronegócios com uso de defensivos agrícolas em todas as regiões",
      "Operadores de aterros sanitários",
    ]}
    whyPatro={[
      "Atendemos empresas de todos os estados do Brasil",
      "Especialistas em seguros para setores industriais e rurais",
      "Análise personalizada do risco ambiental da sua operação",
      "Cotação e sinistro 100% remotos",
      "Suporte completo em caso de sinistro ambiental",
      "Consultoria para adequação às normas ambientais",
    ]}
    faqs={[
      { question: "A Patro atende empresas fora de São Paulo?", answer: "Sim! Atendemos empresas de todos os estados do Brasil com atendimento 100% remoto." },
      { question: "O que é o Seguro Ambiental?", answer: "Protege empresas contra custos financeiros de danos ao meio ambiente, incluindo poluição, contaminação e responsabilidade civil ambiental." },
      { question: "Quem precisa contratar?", answer: "Qualquer empresa cuja atividade apresente risco de danos ambientais: indústrias, postos, transportadoras, mineradoras, agronegócios." },
      { question: "O seguro cobre poluição gradual?", answer: "Sim, a maioria das apólices cobre tanto poluição súbita quanto gradual." },
      { question: "Qual o custo?", answer: "Varia conforme atividade e risco. Postos: a partir de R$ 8.000/ano. Indústrias: R$ 15.000 a R$ 80.000/ano." },
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
