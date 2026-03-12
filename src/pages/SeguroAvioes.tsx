import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroAvioes = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Aviões"
      subtitle="Proteção completa para aeronaves de todos os portes e finalidades"
      icon="✈️"
      metaDescription="Seguro de Aviões para aeronaves particulares, executivas e comerciais. Cobertura de casco, RC e RETA. Cotação grátis Patro Seguros."
      description="O Seguro de Aviões oferece cobertura abrangente para aeronaves particulares, executivas e comerciais. Proteja seu patrimônio contra danos, responsabilidade civil e riscos da aviação."
      coverages={[
        { title: "Casco da Aeronave", description: "Cobertura contra danos ao casco, motor e componentes da aeronave em voo ou solo." },
        { title: "Responsabilidade Civil", description: "Proteção por danos materiais e corporais causados a terceiros, passageiros e tripulantes." },
        { title: "Danos a Hangares", description: "Cobertura para danos causados a hangares e instalações aeroportuárias." },
        { title: "Roubo e Furto", description: "Indenização em caso de roubo ou furto da aeronave ou de seus componentes." },
        { title: "Acidentes em Solo", description: "Proteção contra danos durante taxiamento, estacionamento e manutenção." },
        { title: "Guerra e Terrorismo", description: "Cobertura opcional contra riscos de guerra, sequestro e atos terroristas." },
        { title: "Responsabilidade do Hangar", description: "Cobertura para aeronaves sob custódia em hangares e oficinas." },
        { title: "Assistência Aeronáutica", description: "Suporte 24h incluindo remoção de aeronave e assistência técnica." },
      ]}
      whoNeeds={[
        "Proprietários de aeronaves particulares",
        "Empresas de táxi aéreo",
        "Escolas de aviação",
        "Empresas com aviação executiva",
        "Aeroclubes e hangares",
      ]}
      whyPatro={[
        "Especialistas em seguros aeronáuticos",
        "Coberturas personalizadas por tipo de aeronave e operação",
        "Parceria com seguradoras especializadas em aviação",
        "Atendimento ágil em caso de sinistro",
        "Consultoria completa para aviação particular e comercial",
      ]}
      faqs={[
        { question: "Quais tipos de aeronave podem ser segurados?", answer: "Aviões monomotor, bimotor, jatos executivos, turboélices, aeronaves experimentais e ultraleves, entre outros." },
        { question: "O seguro cobre voos internacionais?", answer: "Sim, dependendo do plano contratado, a cobertura pode ser estendida para voos internacionais conforme os limites da apólice." },
        { question: "É obrigatório ter seguro de aeronave no Brasil?", answer: "Sim, conforme regulamentação da ANAC, toda aeronave em operação no Brasil deve possuir seguro de responsabilidade civil obrigatório (RETA)." },
        { question: "O seguro cobre a aeronave durante manutenção?", answer: "Sim, a cobertura inclui a aeronave durante manutenção em solo, hangar e oficinas autorizadas." },
      ]}
      relatedInsurances={[
        { title: "Seguro Helicópteros", link: "/seguro-helicopteros" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
      ]}
    />
  );
};

export default SeguroAvioes;
