import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroAuto = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Auto"
      subtitle="Proteção completa para seu veículo com as melhores seguradoras do mercado"
      icon="🚗"
      description="O Seguro Auto é essencial para proteger seu patrimônio contra roubos, furtos, colisões, incêndios e diversos outros riscos. Com a Patro Seguros, você encontra coberturas completas, assistência 24h e atendimento ágil em sinistros. Trabalhamos com as principais seguradoras do Brasil para oferecer a melhor relação custo-benefício, sempre com análise personalizada do seu perfil e necessidades."
      coverages={[
        {
          title: "Colisão, Roubo e Furto",
          description: "Proteção contra acidentes, roubo total e furto do veículo",
        },
        {
          title: "Incêndio e Fenômenos Naturais",
          description: "Cobertura para danos causados por fogo, enchentes, raios e vendavais",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobre danos materiais e corporais causados a terceiros",
        },
        {
          title: "Assistência 24h",
          description: "Guincho, troca de pneus, chaveiro, mecânico e mais",
        },
        {
          title: "Carro Reserva",
          description: "Veículo substituto enquanto o seu está na oficina",
        },
        {
          title: "Vidros, Lanternas e Retrovisores",
          description: "Cobertura para quebra desses componentes",
        },
      ]}
      whoNeeds={[
        "Proprietários de veículos novos ou usados",
        "Motoristas que utilizam o carro diariamente",
        "Pessoas que financiaram o veículo",
        "Quem mora em regiões com alto índice de roubos",
        "Profissionais que dependem do carro para trabalhar",
        "Famílias que precisam de mobilidade garantida",
      ]}
      whyPatro={[
        "Cotação com múltiplas seguradoras para melhor preço",
        "Análise do perfil para reduzir o valor do seguro",
        "Suporte completo em caso de sinistro",
        "Renovação facilitada com revisão anual de coberturas",
        "Parcelamento flexível sem juros",
        "Atendimento rápido via WhatsApp",
      ]}
      faqs={[
        {
          question: "Quanto custa um seguro auto?",
          answer: "O valor depende de diversos fatores: modelo do carro, ano, CEP, perfil do motorista, coberturas escolhidas e histórico de sinistros. Fazemos uma cotação personalizada para encontrar o melhor preço.",
        },
        {
          question: "Posso incluir outros motoristas no seguro?",
          answer: "Sim! É possível incluir outros condutores na apólice. O valor pode variar dependendo do perfil desses motoristas.",
        },
        {
          question: "O que fazer em caso de sinistro?",
          answer: "Entre em contato imediatamente conosco pelo WhatsApp ou telefone. Faremos todo o acompanhamento do processo junto à seguradora.",
        },
        {
          question: "Posso trocar de seguradora na renovação?",
          answer: "Sim! Na renovação anual, sempre revisamos as condições e buscamos as melhores opções do mercado para você.",
        },
        {
          question: "Como funciona o bônus de renovação?",
          answer: "Se você não teve sinistros, pode ter descontos progressivos na renovação. Analisamos isso para você aproveitar o melhor bônus possível.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro de Moto", link: "/seguro-moto" },
      ]}
    />
  );
};

export default SeguroAuto;
