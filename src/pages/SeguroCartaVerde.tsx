import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroCartaVerde = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Carta Verde"
      subtitle="Proteção obrigatória para viagens de carro aos países do Mercosul"
      icon="🌎"
      metaDescription="Seguro Carta Verde obrigatório para viagens de carro ao Mercosul — Argentina, Uruguai, Paraguai e Chile. Contratação rápida e online. Cotação grátis Patro Seguros."
      description="O Seguro Carta Verde é obrigatório para todos os veículos brasileiros que cruzam as fronteiras terrestres com países do Mercosul e associados. Garanta sua viagem com tranquilidade e dentro da lei."
      coverages={[
        { title: "Responsabilidade Civil por Danos Materiais", description: "Cobertura para danos materiais causados a terceiros em acidentes no exterior." },
        { title: "Responsabilidade Civil por Danos Corporais", description: "Indenização por lesões corporais ou morte de terceiros decorrentes de acidente." },
        { title: "Despesas Médicas e Hospitalares", description: "Cobertura de despesas médicas para terceiros envolvidos no acidente." },
        { title: "Assistência 24h no Mercosul", description: "Guincho, socorro mecânico e assistência em estradas nos países cobertos." },
        { title: "Danos ao Veículo de Terceiros", description: "Reparo ou indenização do veículo de terceiros atingidos no acidente." },
        { title: "Despesas com Advogado", description: "Cobertura para honorários advocatícios e custas judiciais no país do sinistro." },
      ]}
      whoNeeds={[
        "Motoristas que viajam para a Argentina",
        "Viajantes com destino ao Uruguai e Paraguai",
        "Caminhoneiros e transportadoras internacionais",
        "Turistas que cruzam fronteiras terrestres do Mercosul",
        "Empresas com frotas que operam em países vizinhos",
      ]}
      whyPatro={[
        "Emissão rápida — receba sua Carta Verde em minutos",
        "Contratação flexível por período de viagem",
        "Atendimento em português durante toda a viagem",
        "Parceria com seguradoras especializadas em Mercosul",
        "Suporte completo em caso de sinistro no exterior",
      ]}
      faqs={[
        { question: "O Seguro Carta Verde é obrigatório?", answer: "Sim, é obrigatório por lei para todos os veículos que cruzam as fronteiras terrestres com países do Mercosul (Argentina, Uruguai, Paraguai, Venezuela) e associados (Chile, Bolívia, Peru, Colômbia e Equador)." },
        { question: "Qual o período mínimo de contratação?", answer: "O período mínimo é geralmente de 8 dias, podendo ser contratado por períodos maiores conforme a duração da viagem. É possível contratar por 15, 30, 60 ou 90 dias." },
        { question: "O seguro auto comum cobre viagens ao exterior?", answer: "Não. O seguro auto brasileiro não tem validade fora do Brasil. Para circular legalmente nos países do Mercosul, é obrigatória a contratação do Seguro Carta Verde." },
        { question: "O que acontece se eu for pego sem Carta Verde na fronteira?", answer: "O veículo pode ser impedido de entrar no país, multado e até apreendido. Além disso, em caso de acidente, o motorista responderá pessoalmente por todos os danos causados." },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Caminhão", link: "/seguro-caminhao" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
      ]}
    />
  );
};

export default SeguroCartaVerde;
