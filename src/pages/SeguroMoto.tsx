import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroMoto = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Moto"
      subtitle="Proteção completa para motociclistas com cobertura e assistência 24h"
      icon="🏍️"
      description="O Seguro para Motos oferece proteção essencial contra roubos, furtos, acidentes e danos ao veículo. Motocicletas têm índices de sinistralidade elevados, tornando o seguro ainda mais importante. Com a Patro Seguros, você encontra coberturas completas, incluindo equipamentos de segurança, acessórios e assistência 24h especializada para motociclistas."
      coverages={[
        {
          title: "Colisão, Roubo e Furto",
          description: "Proteção contra acidentes e subtração do veículo",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobre danos materiais e corporais causados a terceiros",
        },
        {
          title: "Acessórios e Equipamentos",
          description: "Cobertura para capacete, jaqueta, baús e outros itens",
        },
        {
          title: "Assistência 24h Especializada",
          description: "Guincho para motos, socorro mecânico e elétrico",
        },
        {
          title: "Proteção a Vidros e Lanternas",
          description: "Cobertura para quebra desses componentes",
        },
        {
          title: "Despesas com Motorista",
          description: "Cobertura para despesas médicas do condutor",
        },
      ]}
      whoNeeds={[
        "Proprietários de motos novas ou usadas",
        "Motociclistas que usam a moto como meio de trabalho",
        "Pessoas que utilizam moto diariamente",
        "Quem mora em regiões com alto índice de roubo",
        "Motociclistas que fazem viagens longas",
        "Proprietários de motos de alto valor ou custom",
      ]}
      whyPatro={[
        "Cotação especializada para motos com múltiplas seguradoras",
        "Cobertura para equipamentos de segurança",
        "Assistência 24h com guincho especializado para motos",
        "Análise de perfil para reduzir valor do seguro",
        "Suporte completo em sinistros",
        "Parcelamento facilitado",
      ]}
      faqs={[
        {
          question: "Quanto custa um seguro de moto?",
          answer: "O valor varia conforme modelo, cilindrada, ano, uso da moto e perfil do condutor. Motos de maior cilindrada tendem a ter valores mais altos.",
        },
        {
          question: "Seguro de moto cobre equipamentos?",
          answer: "Sim! É possível incluir capacete, jaqueta, luvas, baú e outros equipamentos na cobertura. Recomendamos fortemente essa inclusão.",
        },
        {
          question: "Como funciona a assistência 24h para motos?",
          answer: "Inclui guincho especializado, troca de pneus, chaveiro, pequenos reparos e reboque até local seguro em caso de pane.",
        },
        {
          question: "Posso usar a moto para trabalho?",
          answer: "Sim, mas é importante declarar o uso como profissional (delivery, mototáxi, etc.) para ter a cobertura adequada.",
        },
        {
          question: "O que fazer se roubarem a moto?",
          answer: "Registre BO imediatamente e nos contate. Acompanhamos todo o processo de indenização junto à seguradora.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Saúde", link: "/seguro-saude" },
      ]}
    />
  );
};

export default SeguroMoto;
