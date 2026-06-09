import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const BmwX1Guarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro BMW X1 em Guarulhos"
    subtitle="O Prazer de Dirigir Protegido — Seguro Premium para sua BMW"
    description="A BMW X1 é o símbolo de sofisticação nas ruas de Guarulhos. Um veículo desta categoria exige um atendimento exclusivo, com garantia de reparo em concessionária e peças 100% originais. Na Patro Seguros, desenhamos o seguro para sua BMW focando no seu estilo de vida e na preservação do seu patrimônio de alto luxo."
    icon="💎"
    coverages={[
      { title: "Oficinas Autorizadas BMW", description: "Garantia de que seu veículo será reparado na rede BMW para manter a garantia de fábrica." },
      { title: "Peças Genuínas", description: "Substituição de componentes apenas por peças originais alemãs." },
      { title: "Cobertura Internacional", description: "Proteção garantida em viagens pelo Mercosul." },
      { title: "Concierge e Assistência VIP", description: "Serviços diferenciados de assistência 24h para o público premium." }
    ]}
    whoNeeds={["Proprietários de BMW X1", "Público Premium de Guarulhos", "Clientes que não abrem mão de qualidade"]}
    whyPatro={["Atendimento VIP personalizado", "Análise rigorosa de coberturas premium", "As melhores taxas para veículos de luxo"]}
    faqs={[
      { question: "O seguro BMW aceita blindagem?", answer: "Sim, oferecemos opções específicas para BMW X1 blindada com reparo especializado." },
      { question: "Como funciona o carro reserva premium?", answer: "Garantimos veículos de categoria similar para que sua rotina não mude." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=bmw-x1"
  />
);

export default BmwX1Guarulhos;