import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeoSeguroAutoGuarulhos = () => (
  <InsurancePageTemplate
    title="Seguro Auto em Guarulhos — A Melhor Cotação da Região"
    subtitle="Proteja seu carro em Guarulhos com as melhores seguradoras. Cotação gratuita e atendimento local."
    description="Procurando seguro auto em Guarulhos? A Patro Seguros é a corretora de seguros referência em Guarulhos e região. Comparamos Porto Seguro, Tokio Marine, Allianz, HDI e outras seguradoras para garantir o melhor preço e cobertura para o seu veículo. Atendimento presencial e online."
    icon="🚗"
    coverages={[
      { title: "Cobertura Compreensiva", description: "Proteção contra roubo, furto, colisão, incêndio e fenômenos naturais." },
      { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais causados a terceiros." },
      { title: "Assistência 24h", description: "Guincho, chaveiro, troca de pneu e socorro mecânico em Guarulhos." },
      { title: "Carro Reserva", description: "Veículo substituto enquanto o seu está no conserto." },
    ]}
    whoNeeds={[
      "Moradores de Guarulhos e região metropolitana",
      "Motoristas que circulam pela Dutra e Fernão Dias",
      "Proprietários de veículos novos e seminovos",
      "Motoristas de aplicativo em Guarulhos",
    ]}
    whyPatro={[
      "Corretora local em Guarulhos com atendimento presencial",
      "Comparação entre todas as principais seguradoras",
      "Cotação em até 2 horas",
      "Suporte completo em sinistros na região",
    ]}
    faqs={[
      { question: "Quanto custa seguro auto em Guarulhos?", answer: "O valor varia conforme o veículo e perfil do motorista. Guarulhos tem índices específicos que influenciam o preço. Solicite cotação gratuita." },
      { question: "Qual a melhor seguradora em Guarulhos?", answer: "Depende do perfil. Comparamos Porto, Tokio Marine, Allianz, HDI e outras para encontrar a melhor opção." },
    ]}
    relatedInsurances={[
      { title: "Seguro Moto", link: "/seguro-moto" },
      { title: "Seguro Residencial", link: "/seguro-residencial" },
    ]}
  />
);

export default SeoSeguroAutoGuarulhos;
