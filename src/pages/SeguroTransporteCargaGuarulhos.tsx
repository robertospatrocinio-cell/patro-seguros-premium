import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroTransporteCargaGuarulhos = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Transporte de Carga em Guarulhos | Patro Seguros"
      headline="Proteja sua carga no polo logístico de Guarulhos e Cumbica."
      subtitle="Seguro RCTR-C e RCF-DC com emissão rápida e suporte especializado para transportadoras."
      metaDescription="Seguro de transporte de carga em Guarulhos para transportadoras e embarcadores. Cobertura para roubo, acidente e avarias. Cotação em 2h."
      description="Localizada estrategicamente próxima ao Aeroporto de Cumbica e às margens das rodovias Dutra e Fernão Dias, a Patro Seguros é especialista em proteger o fluxo logístico de Guarulhos. Oferecemos consultoria completa para transportadoras de todos os portes."
      detailedDescription={`Guarulhos é o maior polo logístico da América Latina. Com o Aeroporto Internacional de Cumbica e a proximidade com as principais rodovias do país, os riscos de transporte na região exigem uma apólice técnica e bem estruturada.

O Seguro de Transporte de Carga da Patro Seguros cobre desde o RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Carga - obrigatório) até o RCF-DC (Seguro de Carga para Roubo). Protegemos mercadorias diversas, eletrônicos, fármacos e cargas de alto valor agregado com gerenciamento de risco integrado.

Nossa equipe conhece os desafios locais: desde a segurança no entorno do aeroporto até as exigências das gerenciadoras de risco para trânsito nas rodovias que cortam Guarulhos.`}
      icon="🚛"
      coverages={[
        { title: "RCTR-C (Obrigatório)", description: "Cobertura para acidentes, colisões e capotagens durante o transporte." },
        { title: "RCF-DC (Roubo)", description: "Proteção contra roubo e furto qualificado de mercadorias em trânsito." },
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
        { question: "O seguro de carga é obrigatório?", answer: "Sim, o RCTR-C é obrigatório para todo transportador rodoviário de carga no Brasil." },
        { question: "Vocês atendem empresas dentro do Aeroporto de Cumbica?", answer: "Sim, temos larga experiência em apólices para empresas que operam no recinto alfandegado e entorno." },
        { question: "Como funciona o gerenciamento de risco?", answer: "Avaliamos as exigências da seguradora quanto a rastreadores, escoltas e paradas para garantir que sua indenização nunca seja negada." },
        { question: "Posso contratar seguro para uma carga única?", answer: "Sim, oferecemos a modalidade de seguro avulso para embarques pontuais." },
        { question: "Qual o prazo para cotação de seguro de carga?", answer: "Para a maioria das cargas, entregamos a proposta técnica em até 2 horas comerciais." },
      ]}
    />
  );
};

export default SeguroTransporteCargaGuarulhos;
