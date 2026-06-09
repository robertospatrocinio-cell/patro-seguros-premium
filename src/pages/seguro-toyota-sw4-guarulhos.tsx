import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const ToyotaSw4Guarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro Toyota SW4 em Guarulhos"
    subtitle="Proteção para o Rei do Off-road — Cobertura contra roubo e furto 24h"
    description="A Toyota SW4 é um dos veículos mais desejados e, infelizmente, um dos mais visados em Guarulhos e rodovias como a Fernão Dias. Proteger este SUV de luxo requer uma apólice robusta que inclua rastreamento obrigatório e indenização rápida. A Patro Seguros é especialista na linha Toyota, oferecendo as melhores condições para o seu patrimônio."
    icon="🚙"
    coverages={[
      { title: "Roubo e Furto Qualificado", description: "Indenização de até 100% FIPE com rapidez garantida pela rede Patro." },
      { title: "Rastreador Obrigatório", description: "Instalação de dispositivos de segurança homologados pelas seguradoras." },
      { title: "Off-road e Natureza", description: "Proteção contra danos em terrenos acidentados ou fenômenos naturais." },
      { title: "Vidros e Blindagem", description: "Opções para veículos blindados com reposição de peças específicas." }
    ]}
    whoNeeds={["Famílias com SW4 em Guarulhos", "Executivos e Empresários", "Quem viaja com frequência por rodovias"]}
    whyPatro={["Liderança em seguros Toyota em Guarulhos", "Rede de apoio em caso de roubo e furto", "As menores taxas para motoristas experientes"]}
    faqs={[
      { question: "O seguro da SW4 é muito caro?", answer: "Devido ao alto índice de roubo, o valor é superior à média, mas com rastreadores conseguimos reduções agressivas." },
      { question: "Aceita SW4 com blindagem?", answer: "Sim, trabalhamos com seguradoras especializadas em veículos blindados." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=toyota-sw4"
  />
);

export default ToyotaSw4Guarulhos;