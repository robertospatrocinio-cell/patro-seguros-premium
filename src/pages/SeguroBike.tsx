import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroBike = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Bike"
      subtitle="Proteção completa para sua bicicleta contra roubo, furto e acidentes"
      icon="🚲"
      description="O Seguro Bike da Patro Seguros protege sua bicicleta — seja ela urbana, speed, mountain bike, gravel ou elétrica — contra roubo, furto, danos acidentais e muito mais. Com o crescimento do ciclismo no Brasil, proteger seu investimento é fundamental. Bicicletas de alta performance podem custar de R$ 5.000 a R$ 80.000, e o seguro garante tranquilidade para pedalar sem preocupação. Cotação rápida, sem burocracia e com as melhores seguradoras do mercado."
      coverages={[
        {
          title: "Roubo e Furto Qualificado",
          description: "Proteção contra roubo e furto da bicicleta em qualquer local, inclusive durante pedaladas",
        },
        {
          title: "Danos Acidentais",
          description: "Cobertura para danos causados por quedas, colisões e acidentes durante o uso",
        },
        {
          title: "Acidentes Pessoais do Ciclista",
          description: "Indenização por morte acidental, invalidez permanente e despesas médicas do ciclista",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobertura para danos causados a terceiros durante a prática do ciclismo",
        },
        {
          title: "Transporte da Bike",
          description: "Proteção durante o transporte da bicicleta em veículos, ônibus e avião",
        },
        {
          title: "Acessórios e Componentes",
          description: "Cobertura para GPS, velocímetro, capacete, sapatilhas e outros acessórios",
        },
        {
          title: "Assistência 24h",
          description: "Guincho/resgate da bike e do ciclista em caso de pane mecânica ou acidente",
        },
        {
          title: "Participação em Provas",
          description: "Cobertura durante competições, provas e eventos ciclísticos",
        },
      ]}
      whoNeeds={[
        "Ciclistas urbanos que usam bike para transporte diário",
        "Praticantes de mountain bike e trilhas",
        "Ciclistas de speed e road bike",
        "Proprietários de bicicletas elétricas (e-bikes)",
        "Atletas e competidores de ciclismo",
        "Entregadores que utilizam bicicleta",
        "Praticantes de gravel e cicloturismo",
        "Quem possui bicicletas de alto valor",
      ]}
      whyPatro={[
        "Cotação rápida e gratuita para qualquer tipo de bicicleta",
        "Coberturas personalizadas para seu perfil de uso",
        "Parceria com seguradoras especializadas em bikes",
        "Atendimento humanizado por especialistas",
        "Processo de sinistro simples e ágil",
        "Cobertura nacional para pedaladas em qualquer lugar",
        "Preços acessíveis a partir de R$ 15/mês",
      ]}
      faqs={[
        {
          question: "Quanto custa o seguro de bicicleta?",
          answer: "O valor varia de 5% a 15% do valor da bike ao ano. Para uma bicicleta de R$ 10.000, por exemplo, o seguro pode custar entre R$ 500 e R$ 1.500/ano (R$ 42 a R$ 125/mês). Faça sua cotação gratuita.",
        },
        {
          question: "O seguro cobre bicicleta elétrica?",
          answer: "Sim! Bicicletas elétricas (e-bikes) podem ser seguradas com coberturas específicas, incluindo proteção para motor e bateria elétrica.",
        },
        {
          question: "Preciso de nota fiscal para contratar o seguro?",
          answer: "Sim, a nota fiscal é necessária para comprovar a propriedade e o valor da bicicleta. Caso não tenha, algumas seguradoras aceitam laudo de avaliação.",
        },
        {
          question: "O seguro cobre roubo durante pedalada?",
          answer: "Sim. A cobertura de roubo vale tanto para a bike parada (presa com cadeado) quanto durante o uso. Algumas apólices exigem uso de cadeado/trava homologada.",
        },
        {
          question: "O seguro cobre acidentes do ciclista?",
          answer: "Sim, a cobertura de Acidentes Pessoais do Ciclista inclui despesas médicas, invalidez permanente e morte acidental durante a prática do ciclismo.",
        },
        {
          question: "Posso segurar mais de uma bicicleta?",
          answer: "Sim! Você pode segurar todas as suas bikes em uma única apólice, muitas vezes com desconto progressivo para mais de uma bicicleta.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Celular", link: "/seguro-celular" },
        { title: "Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
      ]}
    />
  );
};

export default SeguroBike;
