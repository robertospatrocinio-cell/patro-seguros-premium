import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-drone.webp";

const SeguroDroneAgricola = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Drone Agrícola"
      subtitle="Proteção completa para drones utilizados na agricultura de precisão. Atendemos operadores de todos os estados do Brasil."
      icon="🚁"
      metaDescription="Seguro para Drone Agrícola em todo o Brasil — proteção contra quedas, colisões e falhas técnicas em drones de pulverização e mapeamento. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      description="Os drones agrícolas revolucionaram o campo, mas são equipamentos de alto valor sujeitos a quedas, colisões e falhas técnicas. Proteja seu investimento."
      detailedDescription={`A agricultura de precisão transformou o agronegócio brasileiro, e os drones estão no centro dessa revolução. Drones de pulverização como o DJI Agras T40 custam de R$ 150.000 a R$ 500.000. Um único equipamento pode cobrir centenas de hectares por dia, gerando economia de insumos e mão de obra.

Porém, drones agrícolas operam em condições extremas: voos baixos sobre lavouras, exposição a ventos, chuva repentina, interferência eletromagnética e obstáculos como linhas de transmissão e árvores. Quedas, colisões e falhas de GPS são riscos reais que podem destruir um equipamento caro em segundos.

O Seguro Drone Agrícola protege contra danos físicos, roubo, falhas técnicas, responsabilidade civil por danos a terceiros e lavouras vizinhas, e até lucros cessantes pela parada do equipamento. Algumas seguradoras também cobrem equipamentos embarcados como câmeras multiespectrais e tanques de pulverização.

Na Patro Seguros, atendemos operadores de drones agrícolas em todos os estados do Brasil — de Mato Grosso ao Rio Grande do Sul. Todo o processo é 100% remoto.`}
      howItWorks={[
        { step: "1", title: "Dados do Drone", description: "Informamos marca, modelo, série, valor, acessórios embarcados e região de operação" },
        { step: "2", title: "Análise de Uso", description: "Avaliamos tipo de operação (pulverização, mapeamento), frequência de voo e qualificação do operador" },
        { step: "3", title: "Cotação Especializada", description: "Buscamos propostas de seguradoras que operam com drones agrícolas para as melhores condições" },
        { step: "4", title: "Proteção no Campo", description: "Em caso de sinistro, orientamos todo o processo de regulação para reparo ou substituição rápida" },
      ]}
      coverages={[
        { title: "Danos Físicos ao Drone", description: "Cobertura para danos causados por quedas, colisões, pousos forçados e acidentes operacionais" },
        { title: "Roubo e Furto", description: "Proteção contra roubo e furto qualificado do drone, controle remoto e acessórios" },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros, lavouras vizinhas, animais e propriedades durante o voo" },
        { title: "Falhas Técnicas e Mecânicas", description: "Proteção contra defeitos de fabricação, falha de GPS, perda de sinal e pane elétrica" },
        { title: "Danos por Condições Climáticas", description: "Cobertura para danos causados por ventos fortes, chuva, granizo e tempestades durante operação" },
        { title: "Equipamentos Embarcados", description: "Proteção para câmeras, sensores multiespectrais, tanques de pulverização e baterias" },
        { title: "Transporte do Drone", description: "Cobertura durante o transporte terrestre do drone entre propriedades e bases de operação" },
        { title: "Lucros Cessantes", description: "Indenização pela perda de receita durante o período de reparo ou substituição do equipamento" },
      ]}
      coverageExclusions={[
        "Desgaste natural e manutenção preventiva (baterias, hélices, etc.)",
        "Operação sem certificação/registro exigido pela ANAC",
        "Voo em áreas proibidas ou restritas sem autorização",
        "Danos causados por operador não qualificado",
        "Uso de peças não originais ou modificações não autorizadas pelo fabricante",
        "Danos por software/firmware desatualizado",
      ]}
      pricingInfo={{
        intro: "O custo do seguro de drone agrícola varia de 3% a 8% do valor do equipamento ao ano.",
        factors: [
          "Marca, modelo e valor do drone (DJI Agras, etc.)",
          "Valor dos equipamentos embarcados (sensores, tanques, câmeras)",
          "Tipo de operação (pulverização é maior risco que mapeamento)",
          "Região de operação e frequência de voos",
          "Qualificação e experiência do operador",
          "Número de drones na frota (desconto progressivo)",
        ],
        note: "Um DJI Agras T40 de R$ 250.000 pode custar de R$ 7.500 a R$ 20.000/ano de seguro. Com bom histórico e operador qualificado, fica na faixa inferior. Frotas de 3+ drones têm condições especiais.",
      }}
      realScenarios={[
        { title: "Queda durante pulverização", description: "Um drone DJI Agras T30 perdeu sinal GPS durante pulverização em Mato Grosso e caiu sobre a lavoura. O reparo custou R$ 85.000. O seguro cobriu integralmente, e o produtor recebeu R$ 12.000 em lucros cessantes pelos 10 dias de parada." },
        { title: "Colisão com linha de transmissão", description: "Um drone de mapeamento colidiu com linha de transmissão em Goiás, resultando em perda total do equipamento de R$ 180.000. O seguro indenizou o valor integral em 20 dias úteis." },
        { title: "Roubo durante transporte", description: "Um drone agrícola foi roubado do veículo durante transporte entre fazendas no Paraná. O seguro cobriu R$ 220.000 do equipamento e R$ 35.000 em acessórios." },
      ]}
      importantDetails={[
        { title: "Registro na ANAC", content: "Drones acima de 250g devem ser registrados na ANAC (SISANT). Operar sem registro pode invalidar a cobertura do seguro e resultar em multas administrativas." },
        { title: "Qualificação do operador", content: "Seguradoras podem exigir que o operador tenha certificação ou treinamento formal. Operadores certificados pelo fabricante (ex: DJI) geralmente obtêm melhores condições de seguro." },
        { title: "Baterias e componentes de desgaste", content: "Baterias LiPo são componentes de desgaste natural e geralmente não são cobertos por defeito ou perda de capacidade. Porém, danos acidentais às baterias (queda, incêndio) são cobertos." },
      ]}
      tips={[
        "Mantenha o firmware do drone sempre atualizado — versões desatualizadas podem ser motivo de negativa de sinistro",
        "Registre o drone na ANAC e mantenha as licenças em dia — é requisito legal e de seguro",
        "Faça checklist pré-voo documentado — demonstra operação responsável e fortalece sinistros",
        "Para frotas de drones, negocie condições especiais com desconto progressivo",
        "Inclua cobertura de lucros cessantes se o drone é sua principal fonte de renda",
      ]}
      whoNeeds={[
        "Produtores rurais que utilizam drones para pulverização em qualquer estado",
        "Empresas de aviação agrícola com frota de drones em todo o Brasil",
        "Cooperativas e associações agrícolas de todas as regiões",
        "Prestadores de serviço de mapeamento e sensoriamento",
        "Agrônomos e consultores que usam drones para monitoramento",
        "Empresas de agricultura de precisão",
        "Produtores de café, soja, milho, cana e algodão",
        "Operadores de drones de pulverização como DJI Agras",
      ]}
      whyPatro={[
        "Atendemos operadores de drones em todos os estados do Brasil",
        "Especialistas em seguros para o agronegócio",
        "Coberturas específicas para drones agrícolas de todos os modelos",
        "Cotação gratuita e 100% remota — por WhatsApp, telefone ou e-mail",
        "Parceria com as melhores seguradoras do mercado",
        "Atendimento consultivo com conhecimento do setor agro",
        "Agilidade na emissão e no atendimento de sinistros",
        "Condições especiais para frotas de drones",
      ]}
      faqs={[
        { question: "A Patro Seguros atende operadores de drone fora de São Paulo?", answer: "Sim! Atendemos em todos os estados do Brasil. O atendimento é 100% remoto." },
        { question: "Preciso de seguro para drone agrícola?", answer: "Sim. Além de proteger equipamento de alto valor, o seguro cobre RC por danos a terceiros e pode ser exigência da ANAC." },
        { question: "Quanto custa o seguro de drone agrícola?", answer: "De 3% a 8% do valor do equipamento ao ano. Um drone de R$ 250.000 pode custar de R$ 7.500 a R$ 20.000/ano." },
        { question: "O seguro cobre queda durante pulverização?", answer: "Sim. A cobertura de danos físicos protege contra quedas e acidentes operacionais durante voos." },
        { question: "Drones DJI Agras são cobertos?", answer: "Sim! Trabalhamos com seguros para todos os modelos, incluindo DJI Agras T10, T16, T20, T30, T40 e T50." },
        { question: "Posso segurar a frota de drones?", answer: "Sim! Condições especiais com descontos progressivos para frotas de drones agrícolas." },
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
