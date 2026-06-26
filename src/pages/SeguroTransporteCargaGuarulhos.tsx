import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-transporte.webp";

/**
 * Seguro de Transporte e Carga em Guarulhos — variante local SEO da
 * página /seguro-transporte, com foco no polo logístico de Cumbica,
 * Aeroporto e nas rodovias Dutra, Fernão Dias e Ayrton Senna.
 */
const SeguroTransporteCargaGuarulhos = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Carga e Transporte em Guarulhos | Patro Seguros"
      headline="Seguro de carga e transporte em Guarulhos, Cumbica e região"
      subtitle="Proteção completa para mercadorias e responsabilidade civil do transportador (RCTR-C e RCF-DC)"
      icon="📦"
      metaDescription="Seguro de carga em Guarulhos para transportadoras, embarcadores e operadores logísticos de Cumbica. RCTR-C, RCF-DC, apólice anual ou por viagem."
      description="Seguro de carga em Guarulhos para proteger mercadorias em trânsito rodoviário, aéreo ou marítimo. Cobre roubo, acidentes, avarias, carga e descarga. Atendemos transportadoras, embarcadores e operadores logísticos do polo de Cumbica."
      detailedDescription={`Guarulhos é o segundo maior polo logístico do estado de São Paulo. O Aeroporto Internacional de Cumbica concentra grande parte da carga aérea do país, e as rodovias Dutra (BR-116), Fernão Dias (BR-381) e Ayrton Senna cruzam a cidade em direção a portos, capital e Mercosul. Esse fluxo intenso traz uma realidade dura: alto índice de roubo de cargas e sinistros rodoviários.

O seguro de carga existe em diversas modalidades complementares. O RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Cargas) é obrigatório por lei para todo transportador. O RCF-DC (Responsabilidade Civil Facultativa por Desaparecimento de Carga) protege contra roubo. Já o seguro do embarcador (dono da mercadoria) garante o valor da carga, independente de quem transporta.

A Patro Seguros é uma corretora de seguros em Guarulhos especializada em logística. Atendemos transportadoras de Cumbica, Bonsucesso e Pimentas, operadores logísticos do entorno do aeroporto e embarcadores com sede em Guarulhos. Cotamos com seguradoras especializadas em transporte — Porto Seguro, Tokio Marine, Allianz, HDI, Mitsui e Mapfre — em apólice anual aberta ou por viagem.`}
      howItWorks={[
        { step: "1", title: "Diagnóstico da operação", description: "Mapeamos tipos de carga, rotas (Dutra, Fernão Dias, Ayrton Senna, portos), volumes e valores." },
        { step: "2", title: "Definição das coberturas", description: "Combinamos RCTR-C, RCF-DC, seguro do embarcador, gerenciamento de risco e escolta quando necessário." },
        { step: "3", title: "Cotação multisseguradora", description: "Comparamos seguradoras especializadas em transporte com tarifas e cláusulas adequadas ao seu perfil." },
        { step: "4", title: "Gestão de sinistros", description: "Atuamos junto à seguradora em caso de roubo ou avaria, da abertura do B.O. à indenização." },
      ]}
      coverages={[
        { title: "RCTR-C (obrigatório)", description: "Responsabilidade civil do transportador rodoviário de cargas" },
        { title: "RCF-DC", description: "Cobertura contra roubo e desaparecimento de carga" },
        { title: "Seguro do embarcador", description: "Valor da mercadoria garantido independente do transportador" },
        { title: "Acidentes de trânsito", description: "Colisões, capotamentos e tombamentos" },
        { title: "Incêndio e explosão", description: "Sinistros com fogo durante o transporte" },
        { title: "Operações de carga e descarga", description: "Cobertura no embarque e desembarque" },
        { title: "Transporte aéreo e internacional", description: "Cargas embarcadas em Cumbica para o Brasil e exterior" },
        { title: "Gerenciamento de risco", description: "Monitoramento, escolta e rastreamento para cargas de alto valor" },
      ]}
      coverageExclusions={[
        "Mercadorias sem nota fiscal ou documentação irregular",
        "Desvio de rota sem justificativa aceita pela seguradora",
        "Vício próprio (deterioração natural)",
        "Embalagem inadequada para o tipo de carga",
        "Contrabando ou mercadorias ilegais",
        "Transporte em veículos fora de condições mínimas exigidas",
      ]}
      pricingInfo={{
        intro: "O custo do seguro de carga é calculado como percentual do valor transportado, conforme o tipo de mercadoria e a rota.",
        factors: [
          "Valor da mercadoria por viagem",
          "Tipo de produto (eletrônicos, alimentos, químicos, etc.)",
          "Rotas operadas (com ou sem áreas de risco)",
          "Modal: rodoviário, aéreo, marítimo ou multimodal",
          "Histórico de sinistralidade da empresa",
          "Gerenciamento de risco contratado",
        ],
        note: "Para operações em Guarulhos, apólices anuais abertas costumam ser mais econômicas que seguros por viagem. Transportadoras com rastreamento e plano de gerenciamento de risco recebem descontos significativos.",
      }}
      tips={[
        "Tenha sempre nota fiscal e CT-e atualizados — sem eles a seguradora pode negar indenização",
        "Combine RCTR-C + RCF-DC; o RCTR-C sozinho não cobre roubo",
        "Cargas de alto valor exigem gerenciamento de risco (escolta, rastreamento, paradas)",
        "Evite desvios de rota não justificados — é a maior causa de negativa de sinistro",
        "Reavalie sua apólice anualmente: novas rotas, novos clientes e novos volumes mudam o prêmio",
      ]}
      whoNeeds={[
        "Transportadoras com base em Cumbica, Bonsucesso, Pimentas ou Centro de Guarulhos",
        "Operadores logísticos (3PL) no entorno do Aeroporto",
        "Importadores e exportadores que operam pelo aeroporto e Porto de Santos",
        "Indústrias e distribuidoras com frota terceirizada",
        "E-commerces com fulfillment em Guarulhos",
      ]}
      whyPatro={[
        "Corretora local em Guarulhos com expertise em galpões e logística de Cumbica",
        "Cotação multisseguradora (Porto, Tokio, Allianz, HDI, Mitsui, Mapfre)",
        "Estruturação de apólices abertas para alto volume",
        "Gestão ativa de sinistros — atuamos com a seguradora pela transportadora",
        "Análise de gerenciamento de risco para reduzir prêmio",
      ]}
      faqs={[
        { question: "Qual a diferença entre RCTR-C e RCF-DC?", answer: "O RCTR-C é obrigatório por lei e cobre a responsabilidade do transportador por avarias e acidentes. O RCF-DC é facultativo, mas essencial: cobre roubo e desaparecimento de carga, que o RCTR-C não cobre." },
        { question: "Transportadora em Guarulhos precisa de seguro além do RCTR-C?", answer: "Sim, na prática sim. Considerando o alto índice de roubo de cargas nas rodovias que cortam Guarulhos (Dutra, Fernão Dias, Ayrton Senna), o RCF-DC é praticamente obrigatório para operar com segurança financeira." },
        { question: "Quem deve contratar o seguro: transportadora ou dono da carga?", answer: "Ambos podem e devem proteger o que é seu. A transportadora contrata RCTR-C e RCF-DC para sua responsabilidade; o embarcador (dono da carga) pode contratar seguro próprio para garantir o valor da mercadoria, especialmente em operações de alto valor." },
        { question: "Apólice anual ou seguro por viagem é melhor?", answer: "Depende do volume. Quem transporta com regularidade economiza na apólice anual aberta. Embarcadores ocasionais ou cargas pontuais de alto valor podem optar pelo seguro por viagem." },
        { question: "O seguro cobre cargas que saem do Aeroporto de Cumbica?", answer: "Sim. Existem coberturas específicas para transporte aéreo nacional e internacional, com seguradoras especializadas em operações no aeroporto de Guarulhos." },
        { question: "Como a Patro Seguros ajuda em caso de roubo de carga?", answer: "Acionamos a seguradora, validamos documentação (CT-e, nota fiscal, B.O.), acompanhamos a perícia e cobramos a indenização. Você foca na operação enquanto cuidamos do processo." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Frota em Guarulhos", link: "/seguro-frota-guarulhos" },
        { title: "Seguro de Galpão em Cumbica", link: "/seguro-galpao" },
        { title: "Seguro Empresarial em Guarulhos", link: "/seguro-empresarial-guarulhos" },
        { title: "Seguro de Transporte Nacional", link: "/seguro-transporte" },
      ]}
    />
  );
};

export default SeguroTransporteCargaGuarulhos;