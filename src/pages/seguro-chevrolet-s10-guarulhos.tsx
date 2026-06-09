import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const ChevroletS10Guarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro Chevrolet S10 em Guarulhos"
    subtitle="Confiabilidade GM nas Estradas — Proteção robusta para sua S10"
    description="A Chevrolet S10 é uma das pickups mais tradicionais das ruas e rodovias de Guarulhos. Sua mecânica robusta e valorização no mercado exigem um seguro que acompanhe sua tradição. Na Patro Seguros, garantimos que sua S10 tenha a melhor cobertura contra roubo, colisão e imprevistos na estrada."
    icon="🏁"
    coverages={[
      { title: "Indenização Integral (Roubo/Furto)", description: "Garantia de reposição do valor FIPE em tempo recorde." },
      { title: "Assistência 24h Ilimitada", description: "Guincho e socorro mecânico em toda a Grande São Paulo e rodovias." },
      { title: "Danos Elétricos e Vidros", description: "Proteção completa para faróis, retrovisores e sistema elétrico." },
      { title: "Responsabilidade Civil para Terceiros", description: "Cobertura de danos materiais e corporais em acidentes." }
    ]}
    whoNeeds={["Proprietários de Chevrolet S10", "Motoristas que transportam cargas leves", "Público agro de Guarulhos e região"]}
    whyPatro={["Especialistas em seguros Chevrolet", "Análise de perfil para o melhor preço do CEP", "Suporte no momento do sinistro"]}
    faqs={[
      { question: "A S10 é muito visada para roubo?", answer: "Sim, por isso trabalhamos com as seguradoras que oferecem os melhores sistemas de monitoramento." },
      { question: "Como funciona a assistência na Dutra?", answer: "Atendimento prioritário nas principais rodovias que cortam Guarulhos." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=chevrolet-s10"
  />
);

export default ChevroletS10Guarulhos;