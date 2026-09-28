import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroTransporteCargaGuarulhos = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Transporte de Carga em Guarulhos | Patro Seguros"
      headline="Proteja sua carga no polo logístico de Guarulhos e Cumbica."
      subtitle="Seguro de transporte e responsabilidades do transportador, com análise de RCTR-C, RC-DC e demais produtos aplicáveis."
      metaDescription="Seguro de transporte de carga em Guarulhos para transportadoras e embarcadores. Entenda RCTR-C, RC-DC e proteção da carga conforme o contrato."
      description="Localizada estrategicamente próxima ao Aeroporto de Cumbica e às margens das rodovias Dutra e Fernão Dias, a Patro Seguros é especialista em proteger o fluxo logístico de Guarulhos. Oferecemos consultoria completa para transportadoras de todos os portes."
      detailedDescription={`Guarulhos é o maior polo logístico da América Latina. Com o Aeroporto Internacional de Cumbica e a proximidade com as principais rodovias do país, os riscos de transporte na região exigem uma apólice técnica e bem estruturada.

O Seguro de Transporte de Carga deve distinguir a proteção do interesse sobre a mercadoria dos seguros de responsabilidade civil do transportador. O RCTR-C trata dos acidentes previstos na legislação; o RC-DC trata dos eventos de desaparecimento de carga previstos na Lei nº 11.442/2007. As coberturas efetivas dependem da apólice, dos limites, do PGR e das circunstâncias do evento.

Nossa equipe conhece os desafios locais: desde a segurança no entorno do aeroporto até as exigências das gerenciadoras de risco para trânsito nas rodovias que cortam Guarulhos.`}
      icon="🚛"
      coverages={[
        { title: "RCTR-C", description: "Seguro de responsabilidade civil do transportador para perdas ou danos à carga decorrentes dos acidentes previstos na legislação, conforme o contrato." },
        { title: "RC-DC", description: "Seguro de responsabilidade civil do transportador para eventos de desaparecimento de carga especificados na legislação, conforme o contrato." },
        { title: "Transporte Internacional", description: "Soluções para importação e exportação via Aeroporto de Cumbica." },
        { title: "Avarias e Limpeza", description: "Cobertura para danos à carga durante carga/descarga e limpeza de pista." },
      ]}
      whoNeeds={[
        "Transportadoras situadas em Cumbica e região",
        "Empresas de logística que operam no Aeroporto de Guarulhos",
        "Embarcadores que precisam de apólices avulsas ou mensais",
        "Autônomos que prestam serviço para grandes transportadoras",
      ]}
      whyPatro={[
        "Especialistas em logística no polo de Cumbica/Guarulhos",
        "Emissão de certificados de seguro em tempo recorde",
        "Suporte em sinistros 24h com acompanhamento técnico",
        "Parceria com as maiores seguradoras de carga do Brasil",
      ]}
      faqs={[
        { question: "Quais seguros podem ser obrigatórios?", answer: "A Lei nº 11.442/2007 prevê RCTR-C, RC-DC e RC-V para os transportadores e prestadores do serviço de transporte rodoviário de cargas enquadrados na obrigação legal. O alcance depende da atividade, do sujeito obrigado e da regulamentação vigente." },
        { question: "Vocês atendem empresas dentro do Aeroporto de Cumbica?", answer: "Sim, temos larga experiência em apólices para empresas que operam no recinto alfandegado e entorno." },
        { question: "Como funciona o gerenciamento de risco?", answer: "O PGR do RCTR-C e do RC-DC é estabelecido entre transportador e seguradora, dentro das regras aplicáveis. Medidas como rastreamento, escolta e paradas podem variar conforme a operação, o contrato e eventuais exigências adicionais do contratante." },
        { question: "Posso contratar seguro para uma carga única?", answer: "Sim, oferecemos a modalidade de seguro avulso para embarques pontuais." },
        { question: "Qual o prazo para cotação de seguro de carga?", answer: "O prazo depende dos dados da operação, da complexidade do risco e da disponibilidade das seguradoras. Não há prazo universal para toda carga." },
      ]}
    />
  );
};

export default SeguroTransporteCargaGuarulhos;
