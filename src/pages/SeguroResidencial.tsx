import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroResidencial = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Residencial"
      subtitle="Proteção completa para seu lar e sua tranquilidade"
      icon="🏠"
      description="O Seguro Residencial protege o patrimônio que você construiu ao longo da vida. Mais do que apenas cobrir danos à estrutura, oferece proteção para seus bens, responsabilidade civil e diversas assistências que facilitam seu dia a dia. Com a Patro Seguros, você tem acesso às melhores coberturas do mercado, com valores acessíveis e atendimento humanizado."
      coverages={[
        {
          title: "Incêndio e Raio",
          description: "Cobertura para danos causados por fogo, raios e explosões",
        },
        {
          title: "Roubo e Furto de Bens",
          description: "Proteção dos seus pertences contra roubo e furto qualificado",
        },
        {
          title: "Danos Elétricos",
          description: "Cobertura para curto-circuito e variação de energia",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobre danos causados a terceiros (vizinhos, visitantes)",
        },
        {
          title: "Vendaval e Granizo",
          description: "Proteção contra danos de fenômenos climáticos",
        },
        {
          title: "Assistência 24h",
          description: "Encanador, eletricista, chaveiro e mais",
        },
        {
          title: "Quebra de Vidros",
          description: "Cobertura para vidros, espelhos e mármores",
        },
        {
          title: "Desmoronamento",
          description: "Cobertura para danos estruturais graves",
        },
      ]}
      whoNeeds={[
        "Proprietários de casas e apartamentos",
        "Inquilinos que querem proteger seus bens",
        "Quem mora em regiões sujeitas a enchentes ou vendavais",
        "Proprietários com imóveis alugados",
        "Pessoas com bens de alto valor no imóvel",
        "Famílias que buscam tranquilidade e proteção",
      ]}
      whyPatro={[
        "Análise precisa do valor dos seus bens para evitar sub ou sobre seguro",
        "Coberturas sob medida para seu tipo de imóvel",
        "Assistências domiciliares incluídas",
        "Processo de sinistro simplificado e acompanhado",
        "Revisão anual das coberturas e valores",
        "Atendimento emergencial 24/7",
      ]}
      faqs={[
        {
          question: "Quanto custa um seguro residencial?",
          answer: "O valor varia conforme o tipo de imóvel (casa ou apartamento), localização, valor dos bens e coberturas escolhidas. Temos opções a partir de valores bem acessíveis.",
        },
        {
          question: "Inquilino pode contratar seguro residencial?",
          answer: "Sim! O seguro residencial para inquilinos protege os bens dentro do imóvel e oferece responsabilidade civil. O proprietário deve ter seguro para a estrutura.",
        },
        {
          question: "O que não é coberto?",
          answer: "Geralmente não são cobertos: danos estéticos, desgaste natural, danos por falta de manutenção e bens não declarados. Analisamos tudo detalhadamente com você.",
        },
        {
          question: "Preciso fazer vistoria?",
          answer: "Na maioria dos casos não. Vistorias são solicitadas apenas para imóveis de alto valor ou com características especiais.",
        },
        {
          question: "Como declarar os bens?",
          answer: "Você informa o valor estimado de móveis, eletrodomésticos, eletrônicos e objetos de valor. Orientamos sobre a forma correta de declarar.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Condomínio", link: "/seguro-condominio" },
        { title: "Seguro Fiança", link: "/seguro-fianca" },
        { title: "Seguro Auto", link: "/seguro-auto" },
      ]}
    />
  );
};

export default SeguroResidencial;
