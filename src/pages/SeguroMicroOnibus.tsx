import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-frota.webp";

const SeguroMicroOnibus = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Micro-ônibus"
      subtitle="Proteção especializada para transporte de passageiros, turismo e fretamento escolar"
      icon="🚐"
      badge="Especialista em Transporte de Passageiros"
      metaDescription="Seguro de Micro-ônibus: proteção completa para turismo, transporte escolar e fretamento. Cobertura para passageiros (APP) e terceiros. Cotação Patro Seguros."
      description="O Seguro de Micro-ônibus é essencial para quem atua no transporte de pessoas. Oferecemos coberturas que garantem a segurança dos passageiros, do veículo e a continuidade da sua operação em Guarulhos e todo o Brasil."
      detailedDescription={`Transportar pessoas exige uma responsabilidade superior. Seja no transporte escolar, turismo, fretamento empresarial ou linhas executivas, um micro-ônibus é um ativo de alto valor que demanda proteção contra os riscos do trânsito urbano e rodoviário.

O grande diferencial deste seguro é a cobertura de APP (Acidentes Pessoais por Passageiro), obrigatória em diversas modalidades de transporte e fundamental para resguardar o proprietário contra processos judiciais em caso de acidentes. Além disso, trabalhamos com coberturas de Responsabilidade Civil com limites elevados, considerando o potencial de danos corporais a terceiros e ocupantes.

Na Patro Seguros, entendemos que o micro-ônibus parado é prejuízo no faturamento. Por isso, oferecemos assistência 24h com guincho pesado e agilidade na regulação de sinistros para que você retome suas rotas o mais rápido possível.`}
      howItWorks={[
        { step: "1", title: "Perfil do Transporte", description: "Identificamos o uso: Escolar, Turismo, Fretamento Empresarial ou Executivo." },
        { step: "2", title: "Análise do Veículo", description: "Avaliamos marca, modelo, ano, quantidade de assentos e equipamentos adicionais (ar-condicionado, multimídia)." },
        { step: "3", title: "Dimensionamento de APP", description: "Definimos os limites de indenização por passageiro para morte, invalidez e despesas médicas." },
        { step: "4", title: "Emissão e Suporte", description: "Entrega da apólice com certificação para órgãos fiscalizadores (ANTT, ARTESP, EMTU) e suporte 24h." },
      ]}
      coverages={[
        { title: "Colisão, Roubo e Furto", description: "Proteção completa para o patrimônio do veículo." },
        { title: "APP (Acidentes de Passageiros)", description: "Cobertura para morte, invalidez e despesas médicas dos ocupantes." },
        { title: "RC (Danos a Terceiros)", description: "Limites elevados para danos materiais e corporais causados a outros." },
        { title: "Incêndio e Explosão", description: "Segurança contra danos térmicos de qualquer natureza." },
        { title: "Assistência 24h Pesada", description: "Guincho especializado, socorro mecânico e troca de pneus." },
        { title: "Vidros e Parabrisas", description: "Cobertura para a grande área envidraçada dos micro-ônibus." },
        { title: "Acessórios e TV/Som", description: "Proteção para equipamentos de entretenimento instalados no veículo." },
      ]}
      coverageExclusions={[
        "Danos causados por excesso de lotação (passageiros acima da capacidade)",
        "Motorista sem habilitação categoria D ou E",
        "Uso em trajetos de linha regular não declarados",
        "Danos mecânicos por falta de manutenção preventiva",
        "Multas de órgãos de trânsito ou fiscalização",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado com base no uso do veículo e no limite de passageiros transportados.",
        factors: [
          "Ano e modelo do micro-ônibus (FIPE)",
          "Tipo de atividade (Escolar costuma ter taxas diferenciadas)",
          "Quantidade de assentos cadastrados",
          "Região principal de circulação (urbana vs rodoviária)",
          "Histórico de bônus do proprietário ou empresa",
        ],
        note: "Para empresas com 3 ou mais unidades, é possível contratar a modalidade Frota com descontos progressivos.",
      }}
      realScenarios={[
        { title: "Colisão em Fretamento", description: "Um micro-ônibus colidiu na traseira de um caminhão em rodovia. O seguro cobriu R$ 45.000 de danos no veículo e R$ 12.000 em despesas médicas de passageiros via APP." },
        { title: "Pane Elétrica com Passageiros", description: "O veículo parou por falha no alternador durante viagem de turismo. O guincho pesado removeu o micro-ônibus e a seguradora custeou o transporte dos passageiros até o destino." },
        { title: "Quebra de Parabrisa", description: "Uma pedra atingiu o parabrisa na estrada. A substituição do vidro, que custaria R$ 3.800, foi feita pagando apenas a franquia reduzida de vidros." },
      ]}
      importantDetails={[
        { title: "Exigências de Órgãos Reguladores", content: "Muitas prefeituras e órgãos como ANTT e EMTU exigem limites mínimos de APP para renovação de alvará. A Patro garante que sua apólice atenda a todos os requisitos legais." },
        { title: "Assistência 24h Nacional", content: "Para quem faz turismo, a cobertura nacional com guincho sem limite de KM é o item mais importante para não deixar o grupo de passageiros desamparado." },
      ]}
      tips={[
        "Mantenha o curso de transporte de passageiros do motorista sempre em dia",
        "Verifique trimestralmente o estado dos pneus; pneus carecas anulam a cobertura de colisão",
        "Inclua a cobertura de Danos Morais na Responsabilidade Civil; processos de passageiros costumam incluir esse pedido",
        "Sempre declare se o veículo possui elevador para cadeirantes ou adaptações de acessibilidade",
      ]}
      whoNeeds={[
        "Empresas de Transporte Escolar",
        "Agências de Turismo e Receptivo",
        "Empresas de Fretamento Corporativo",
        "Hotéis com serviço de Transfer/Shuttle",
        "Associações de Moradores com transporte próprio",
        "Clubes Esportivos e Igrejas",
      ]}
      whyPatro={[
        "Especialistas em Seguros de Veículos Pesados e Passageiros",
        "Consultoria para limites de APP exigidos por lei",
        "Comparativo entre seguradoras líderes do segmento de transporte",
        "Suporte ágil em sinistros com passageiros envolvidos",
        "Atendimento personalizado em Guarulhos para frotas e autônomos",
      ]}
      faqs={[
        { question: "O seguro de micro-ônibus cobre os passageiros?", answer: "Sim, através da cobertura de APP (Acidentes Pessoais por Passageiro), que garante indenização para todos os ocupantes em caso de acidente." },
        { question: "O seguro é obrigatório para transporte escolar?", answer: "Sim, as prefeituras e órgãos de trânsito exigem a apólice com coberturas mínimas para liberar o alvará de transporte escolar." },
        { question: "Cobre se o veículo for furtado no pátio?", answer: "Sim, a cobertura de Roubo e Furto garante indenização integral em caso de subtração do veículo em qualquer local." },
        { question: "Posso segurar veículos com mais de 10 anos?", answer: "Sim, temos seguradoras parceiras que aceitam veículos com maior idade, com foco em coberturas de Roubo, Furto e Terceiros." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro de Caminhão", link: "/seguro-caminhao" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Seguro de Responsabilidade Civil", link: "/seguro-rc" },
      ]}
    />
  );
};

export default SeguroMicroOnibus;
