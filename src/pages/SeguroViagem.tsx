import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroViagem = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Viagem"
      subtitle="Viaje tranquilo com proteção completa nacional e internacional"
      icon="✈️"
      metaDescription="Seguro Viagem nacional e internacional. Cobertura médica, extravio de bagagem e cancelamento. Obrigatório na Europa. Cotação grátis Patro Seguros Guarulhos."
      description="O Seguro Viagem é fundamental para garantir tranquilidade durante suas viagens, seja a lazer ou negócios. Oferece cobertura para emergências médicas, extravio de bagagem, cancelamento de viagem e muito mais. Muitos países exigem seguro viagem obrigatório. Com a Patro Seguros, você viaja protegido com as melhores seguradoras e valores competitivos."
      coverages={[
        {
          title: "Despesas Médicas e Hospitalares",
          description: "Cobertura para atendimento médico, exames e internações",
        },
        {
          title: "Extravio de Bagagem",
          description: "Indenização em caso de perda ou atraso da bagagem",
        },
        {
          title: "Cancelamento de Viagem",
          description: "Reembolso em caso de cancelamento por motivos cobertos",
        },
        {
          title: "Regresso Sanitário",
          description: "Retorno antecipado por motivos médicos",
        },
        {
          title: "Seguro Morte e Invalidez",
          description: "Indenização em caso de acidente durante a viagem",
        },
        {
          title: "Assistência Jurídica",
          description: "Suporte legal em caso de problemas no destino",
        },
        {
          title: "Traslado de Corpo",
          description: "Cobertura para traslado em caso de falecimento",
        },
        {
          title: "Assistência 24h em Português",
          description: "Central de atendimento disponível a qualquer momento",
        },
      ]}
      whoNeeds={[
        "Viajantes internacionais (Europa exige obrigatoriamente)",
        "Pessoas com viagens nacionais frequentes",
        "Turistas a lazer ou negócios",
        "Idosos que viajam e precisam de assistência médica",
        "Famílias com crianças",
        "Praticantes de esportes radicais durante viagens",
      ]}
      whyPatro={[
        "Cotação comparativa com várias seguradoras especializadas",
        "Orientação sobre coberturas obrigatórias por país",
        "Emissão rápida da apólice (até minutos antes da viagem)",
        "Coberturas específicas para gestantes, idosos e esportes",
        "Valores acessíveis e formas de pagamento flexíveis",
        "Suporte em português 24h durante toda a viagem",
      ]}
      faqs={[
        {
          question: "Quando devo contratar o seguro viagem?",
          answer: "O ideal é contratar assim que comprar as passagens, pois alguns planos cobrem cancelamento de viagem. Mas é possível contratar até poucos dias antes da viagem.",
        },
        {
          question: "Qual o valor de cobertura recomendado?",
          answer: "Para Europa, o mínimo obrigatório é 30 mil euros. Para EUA e Canadá, recomendamos no mínimo USD 100 mil devido aos altos custos médicos. Para outros destinos, analisamos caso a caso.",
        },
        {
          question: "Gestantes podem contratar?",
          answer: "Sim! Há coberturas específicas para gestantes até determinada semana de gestação. Orientamos sobre as melhores opções.",
        },
        {
          question: "Cobre COVID-19?",
          answer: "Sim, a maioria dos seguros atuais inclui cobertura para COVID-19. Confirmamos isso na cotação para você.",
        },
        {
          question: "E se eu prolongar a viagem?",
          answer: "É possível estender a cobertura mesmo estando no exterior. Entre em contato conosco e providenciamos a extensão.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Auto", link: "/seguro-auto" },
      ]}
    />
  );
};

export default SeguroViagem;
