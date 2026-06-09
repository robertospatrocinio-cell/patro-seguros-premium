import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const BydDolphinGuarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro BYD Dolphin em Guarulhos"
    subtitle="Proteção especializada para seu elétrico — Cobertura para bateria e Wallbox"
    description="O BYD Dolphin revolucionou a mobilidade elétrica em Guarulhos. Com tecnologia de ponta e bateria de alta performance, este veículo exige um seguro que entenda a complexidade de um carro 100% elétrico. Na Patro Seguros, temos condições especiais para elétricos da BYD, cobrindo não apenas a colisão, mas também a bateria e equipamentos de recarga."
    icon="⚡"
    coverages={[
      { title: "Cobertura de Bateria", description: "Proteção contra danos decorrentes de colisão ou curtos-circuitos no sistema de alta voltagem." },
      { title: "Equipamentos de Recarga", description: "Seguro para seu Wallbox ou carregador portátil contra danos, furto ou roubo." },
      { title: "Assistência Elétrica 24h", description: "Guincho especializado (plataforma) para carros elétricos em toda Guarulhos." },
      { title: "Responsabilidade Civil", description: "Cobertura completa para danos causados a terceiros." }
    ]}
    whoNeeds={["Proprietários de BYD Dolphin", "Quem busca proteção para elétricos", "Motoristas urbanos de Guarulhos"]}
    whyPatro={["Expertise em veículos elétricos", "Comparação entre as principais seguradoras para elétricos", "Suporte local especializado em Guarulhos"]}
    faqs={[
      { question: "O seguro do Dolphin é mais caro?", answer: "Não necessariamente. Devido aos sistemas de segurança avançados, muitas seguradoras oferecem prêmios competitivos." },
      { question: "O que acontece se a bateria for danificada?", answer: "Com a cobertura específica para elétricos, o conserto da bateria está contemplado." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=byd-dolphin"
  />
);

export default BydDolphinGuarulhos;