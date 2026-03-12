import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroDroneAgricola = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Drone Agrícola"
      subtitle="Proteção completa para drones utilizados na agricultura de precisão"
      icon="🚁"
      badge="Especialistas no Agro"
      description="Os drones agrícolas revolucionaram o campo, trazendo eficiência na pulverização, mapeamento de lavouras e monitoramento de safras. Porém, são equipamentos de alto valor e sujeitos a riscos como quedas, colisões, falhas técnicas e condições climáticas adversas. O Seguro Drone Agrícola garante a proteção do seu investimento e a continuidade das suas operações no campo. Na Patro Seguros, oferecemos coberturas especializadas para drones de pulverização, sensoriamento e mapeamento."
      coverages={[
        {
          title: "Danos Físicos ao Drone",
          description: "Cobertura para danos causados por quedas, colisões, pousos forçados e acidentes operacionais",
        },
        {
          title: "Roubo e Furto",
          description: "Proteção contra roubo e furto qualificado do drone, controle remoto e acessórios",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobertura para danos causados a terceiros, lavouras vizinhas, animais e propriedades durante o voo",
        },
        {
          title: "Falhas Técnicas e Mecânicas",
          description: "Proteção contra defeitos de fabricação, falha de GPS, perda de sinal e pane elétrica",
        },
        {
          title: "Danos por Condições Climáticas",
          description: "Cobertura para danos causados por ventos fortes, chuva, granizo e tempestades durante operação",
        },
        {
          title: "Equipamentos Embarcados",
          description: "Proteção para câmeras, sensores multiespectrais, tanques de pulverização e baterias",
        },
        {
          title: "Transporte do Drone",
          description: "Cobertura durante o transporte terrestre do drone entre propriedades e bases de operação",
        },
        {
          title: "Lucros Cessantes",
          description: "Indenização pela perda de receita durante o período de reparo ou substituição do equipamento",
        },
      ]}
      whoNeeds={[
        "Produtores rurais que utilizam drones para pulverização",
        "Empresas de aviação agrícola com frota de drones",
        "Cooperativas e associações agrícolas",
        "Prestadores de serviço de mapeamento e sensoriamento",
        "Agrônomos e consultores que usam drones para monitoramento",
        "Empresas de agricultura de precisão",
        "Produtores de café, soja, milho, cana e algodão",
        "Operadores de drones de pulverização como DJI Agras",
      ]}
      whyPatro={[
        "Especialistas em seguros para o agronegócio",
        "Coberturas específicas para drones agrícolas de todos os modelos",
        "Cotação gratuita e personalizada para sua operação",
        "Parceria com as melhores seguradoras do mercado",
        "Atendimento consultivo com conhecimento do setor agro",
        "Agilidade na emissão e no atendimento de sinistros",
        "Condições especiais para frotas de drones",
      ]}
      faqs={[
        {
          question: "Preciso de seguro para drone agrícola?",
          answer: "Sim. Além de proteger um equipamento de alto valor (drones agrícolas custam de R$ 50 mil a R$ 500 mil), o seguro é essencial para cobrir responsabilidade civil por danos a terceiros e atender exigências da ANAC para operações comerciais.",
        },
        {
          question: "Quanto custa o seguro de drone agrícola?",
          answer: "O valor varia conforme o modelo, valor do drone, coberturas e região de operação. Em média, o seguro custa entre 3% e 8% do valor do equipamento ao ano. Faça uma cotação gratuita com a Patro Seguros.",
        },
        {
          question: "O seguro cobre queda do drone durante pulverização?",
          answer: "Sim. A cobertura de danos físicos protege o drone contra quedas, colisões e acidentes operacionais durante voos de pulverização, mapeamento ou qualquer atividade agrícola.",
        },
        {
          question: "Drones DJI Agras são cobertos?",
          answer: "Sim! Trabalhamos com seguros para todos os modelos de drones agrícolas, incluindo DJI Agras T10, T16, T20, T30, T40 e T50, além de outras marcas como XAG e modelos nacionais.",
        },
        {
          question: "O seguro cobre danos a lavouras de terceiros?",
          answer: "Sim, a cobertura de Responsabilidade Civil protege contra danos causados a lavouras vizinhas, animais e propriedades de terceiros durante a operação do drone.",
        },
        {
          question: "Posso segurar a frota de drones da minha empresa?",
          answer: "Sim! A Patro Seguros oferece condições especiais para frotas de drones agrícolas, com descontos progressivos conforme o número de equipamentos segurados.",
        },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroDroneAgricola;
