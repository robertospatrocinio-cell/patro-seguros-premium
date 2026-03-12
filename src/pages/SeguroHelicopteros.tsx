import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroHelicopteros = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Helicópteros"
      subtitle="Proteção especializada para helicópteros e operações de asa rotativa"
      icon="🚁"
      metaDescription="Seguro de Helicópteros — proteção para aeronaves de asa rotativa. Cobertura de casco, RC e riscos operacionais. Cotação grátis Patro Seguros."
      description="O Seguro de Helicópteros oferece cobertura completa para aeronaves de asa rotativa, protegendo contra danos ao casco, responsabilidade civil e riscos operacionais. Voe com segurança e tranquilidade."
      coverages={[
        { title: "Casco e Motor", description: "Cobertura contra danos ao casco, motor, rotor e componentes do helicóptero." },
        { title: "Responsabilidade Civil", description: "Proteção por danos materiais e corporais a terceiros, passageiros e tripulação." },
        { title: "RETA Obrigatório", description: "Seguro de Responsabilidade Civil do Explorador e Transportador Aéreo conforme ANAC." },
        { title: "Acidentes em Solo", description: "Cobertura durante pouso, decolagem, taxiamento e estacionamento." },
        { title: "Operações Especiais", description: "Proteção para operações de resgate, transporte de carga externa e pulverização." },
        { title: "Danos a Helipontos", description: "Cobertura para danos causados a helipontos e áreas de pouso." },
        { title: "Roubo e Furto", description: "Indenização em caso de roubo ou furto do helicóptero." },
        { title: "Assistência 24h", description: "Suporte completo incluindo remoção e assistência técnica aeronáutica." },
      ]}
      whoNeeds={[
        "Proprietários de helicópteros",
        "Empresas de táxi aéreo",
        "Operações de resgate e salvamento",
        "Empresas com frota de helicópteros",
        "Serviços de transporte executivo aéreo",
      ]}
      whyPatro={[
        "Expertise em seguros de aviação e asa rotativa",
        "Coberturas adaptadas ao perfil de operação",
        "Parceria com seguradoras líderes em aviação",
        "Processo de sinistro ágil e especializado",
        "Consultoria completa para operadores de helicópteros",
      ]}
      faqs={[
        { question: "Qual seguro é obrigatório para helicópteros?", answer: "O RETA (Responsabilidade do Explorador e Transportador Aéreo) é obrigatório conforme regulamentação da ANAC para todas as aeronaves em operação no Brasil." },
        { question: "O seguro cobre operações de carga externa?", answer: "Sim, com cobertura específica para operações especiais como transporte de carga externa, pulverização agrícola e resgate." },
        { question: "Helicópteros de uso particular podem ser segurados?", answer: "Sim, oferecemos cobertura para helicópteros de uso particular, executivo, comercial e operações especiais." },
        { question: "O seguro cobre pousos em helipontos privados?", answer: "Sim, a cobertura inclui operações em helipontos públicos e privados, incluindo danos ao heliponto." },
      ]}
      relatedInsurances={[
        { title: "Seguro Aviões", link: "/seguro-avioes" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
      ]}
    />
  );
};

export default SeguroHelicopteros;
