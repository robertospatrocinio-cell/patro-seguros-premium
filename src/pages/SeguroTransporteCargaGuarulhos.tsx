import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroTransporteCargaGuarulhos = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Transporte de Carga em Guarulhos"
      headline="Seguro de Carga em Guarulhos para Transportadoras"
      subtitle="Proteção técnica RCTR-C e RCF-DC para o polo logístico de Cumbica e rodovias Dutra e Fernão Dias."
      metaDescription="Seguro de transporte de carga em Guarulhos especializado em RCTR-C e RCF-DC. Atendimento para transportadoras no Aeroporto de Cumbica. Cotação em até 2 horas."
      description="A Patro Seguros é especialista em soluções para o ecossistema logístico de Guarulhos. Localizada estrategicamente para atender transportadoras e embarcadores que operam no Aeroporto de Cumbica e nas rodovias que cruzam o município, oferecemos apólices técnicas que garantem a continuidade da sua operação."
      detailedDescription={`Guarulhos concentra o maior hub logístico da América Latina, o que atrai grandes oportunidades e riscos proporcionais. O Seguro de Transporte de Carga da Patro Seguros é desenhado para cobrir as particularidades da nossa região: desde o trânsito intenso na Rodovia Presidente Dutra até a movimentação de cargas sensíveis no entorno do Aeroporto Internacional de Cumbica.

Nossas apólices contemplam o RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Cargas), obrigatório por lei para proteger contra acidentes, e o RCF-DC (Seguro de Carga para Roubo), essencial para mitigar os impactos de perdas por desaparecimento de carga. Trabalhamos com gerenciamento de risco integrado para garantir que as exigências das seguradoras sejam cumpridas e a sua indenização seja sempre respeitada.`}
      icon="🚛"
      coverages={[
        { title: "RCTR-C (Acidentes)", description: "Cobertura obrigatória para colisões, tombamentos, explosões e incêndios durante o transporte." },
        { title: "RCF-DC (Roubo)", description: "Proteção contra roubo e furto qualificado, mesmo com desaparecimento do veículo transportador." },
        { title: "Carga Internacional", description: "Seguros específicos para exportação e importação via Aeroporto de Cumbica e Porto de Santos." },
        { title: "Avarias Particulares", description: "Cobertura para danos à mercadoria durante o içamento, carga e descarga." },
        { title: "Limpeza e Descontaminação", description: "Garantia de limpeza de pista e remoção de resíduos em caso de acidentes ambientais." },
      ]}
      whoNeeds={[
        "Transportadoras sediadas em Cumbica e região de Guarulhos",
        "Embarcadores que precisam de apólices avulsas para cargas spot",
        "Empresas de logística que operam no terminal de carga do aeroporto",
        "Distribuidores que realizam entregas last-mile na Grande São Paulo",
      ]}
      whyPatro={[
        "Conhecimento profundo das rotas e riscos de Guarulhos e Cumbica",
        "Assessoria em Gerenciamento de Risco (GR) para reduzir custos de apólice",
        "Emissão rápida de averbações e certificados para liberações de carga",
        "Parceria com as maiores seguradoras de carga do país",
      ]}
      pricingInfo={{
        intro: "O custo do seguro de carga varia conforme a mercadoria e a região de operação.",
        factors: [
          "Tipo de mercadoria (geral, sensível ou perigosa)",
          "Valor médio transportado por embarque",
          "Rotas percorridas e pontos de parada",
          "Histórico de sinistralidade da empresa",
        ],
        note: "Trabalhamos com taxas competitivas a partir de 0,02% sobre o valor da nota fiscal."
      }}
      faqs={[
        { question: "O que é RCTR-C?", answer: "É o Seguro de Responsabilidade Civil do Transportador Rodoviário de Carga, obrigatório por lei, que cobre danos à mercadoria causados por acidentes com o veículo." },
        { question: "O RCF-DC cobre roubo de carga?", answer: "Sim, o RCF-DC é o seguro facultativo que protege contra roubo e desaparecimento da carga." },
        { question: "A cobertura vale para carga refrigerada?", answer: "Sim, existem cláusulas específicas para danos elétricos ou mecânicos em equipamentos de refrigeração que podem ser adicionadas." },
        { question: "Como acionar o sinistro de carga?", answer: "Em caso de evento, deve-se comunicar a seguradora e a Patro Seguros imediatamente. Para roubo, o boletim de ocorrência é obrigatório." },
        { question: "Preciso de seguro se uso transportadora terceirizada?", answer: "O embarcador (dono da mercadoria) deve contratar um seguro de transporte próprio ou exigir que a transportadora emita uma DDR (Dispensa de Direito de Regresso)." },
        { question: "Atendem empresas dentro do Aeroporto de Cumbica?", answer: "Sim, temos larga experiência em apólices para empresas que operam no recinto alfandegado e no polo logístico do entorno." },
      ]}
    />
  );
};

export default SeguroTransporteCargaGuarulhos;
