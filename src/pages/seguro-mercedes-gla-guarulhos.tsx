import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const MercedesGlaGuarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro Mercedes-Benz GLA em Guarulhos"
    subtitle="A Estrela de Três Pontas Protegida — Segurança Premium Mercedes"
    description="O Mercedes-Benz GLA é o SUV de entrada para o mundo do luxo alemão em Guarulhos. Proteger esta estrela exige uma apólice que respeite o prestígio da marca Mercedes-Benz. Na Patro Seguros, garantimos que seu GLA tenha assistência VIP e reparos realizados apenas por quem entende de engenharia Mercedes."
    icon="⭐"
    coverages={[
      { title: "Rede Autorizada Mercedes-Benz", description: "Reparos executados em concessionárias para garantir a originalidade do seu GLA." },
      { title: "Peças Importadas Genuínas", description: "Logística ágil para peças originais em caso de necessidade." },
      { title: "Assistência 24h Premium", description: "Serviço de guincho e hotelaria diferenciado para donos de Mercedes." },
      { title: "Vidros e Retrovisores Cromados", description: "Cobertura total para os componentes externos de luxo." }
    ]}
    whoNeeds={["Donos de Mercedes-Benz GLA", "Público Premium da região", "Clientes que exigem o melhor atendimento"]}
    whyPatro={["Liderança em seguros para veículos importados", "Especialistas em regulação de sinistros Mercedes", "Atendimento exclusivo no Cidade Maia"]}
    faqs={[
      { question: "O seguro Mercedes exige rastreador?", answer: "Geralmente não é obrigatório para o modelo GLA em condomínios fechados, mas avaliamos cada caso." },
      { question: "Como funciona a assistência no aeroporto?", answer: "Atendimento prioritário em toda a região do aeroporto de Cumbica e acessos." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=mercedes-gla"
  />
);

export default MercedesGlaGuarulhos;