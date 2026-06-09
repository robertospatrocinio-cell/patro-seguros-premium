import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const BydSealGuarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro BYD Seal em Guarulhos"
    subtitle="Performance e Luxo Protegidos — Seguro completo para o esportivo elétrico"
    description="O BYD Seal é o ápice da esportividade elétrica. Com aceleração de tirar o fôlego e tecnologia CTB (Cell-to-Body), o seguro para este modelo deve ser desenhado sob medida. Na Patro Seguros, oferecemos coberturas premium que acompanham o nível de sofisticação e valor de mercado do Seal em Guarulhos."
    icon="🏎️"
    coverages={[
      { title: "Indenização 100% FIPE", description: "Garantia total do valor de mercado em caso de roubo ou perda total." },
      { title: "Danos Estéticos e Pintura", description: "Proteção para a lataria e acabamento refinado do Seal." },
      { title: "Vidros e Teto Panorâmico", description: "Cobertura completa para o teto de vidro e vidros laterais." },
      { title: "Responsabilidade Civil Majorada", description: "Altos limites para danos a terceiros, condizente com veículos de alta performance." }
    ]}
    whoNeeds={["Amantes de velocidade elétrica", "Proprietários de BYD Seal", "Público Premium de Guarulhos"]}
    whyPatro={["Atendimento personalizado VIP", "Especialistas em carros elétricos de alto padrão", "As melhores taxas para modelos esportivos"]}
    faqs={[
      { question: "O Seal exige rastreador?", answer: "Devido à tecnologia embarcada, algumas seguradoras dispensam o rastreador, mas a análise depende do CEP em Guarulhos." },
      { question: "Como funciona a garantia de concessionária?", answer: "Trabalhamos com apólices que garantem o reparo na rede autorizada BYD para manter sua garantia de fábrica." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=byd-seal"
  />
);

export default BydSealGuarulhos;