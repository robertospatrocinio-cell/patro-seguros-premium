import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroMaquinas = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Máquinas e Equipamentos"
      subtitle="Proteção para o maquinário essencial da sua operação"
      icon="⚙️"
      metaDescription="Seguro de Máquinas e Equipamentos industriais e agrícolas. Cobertura contra quebra, incêndio e lucros cessantes. Cotação grátis Patro Seguros."
      description="O Seguro de Máquinas e Equipamentos protege contra danos, quebras e paralisações de maquinário industrial, agrícola e de construção."
      detailedDescription={`Máquinas e equipamentos são o coração de qualquer operação industrial. Um torno CNC pode custar R$ 500.000. Uma impressora industrial, R$ 800.000. Uma linha de produção completa, milhões. Quando uma máquina crítica quebra, os prejuízos vão muito além do reparo: parada de produção, pedidos não atendidos, multas contratuais e perda de clientes.

O Seguro de Máquinas cobre danos súbitos e imprevistos: quebra mecânica, curto-circuito, erro de operação, queda de objetos, tentativa de roubo e muito mais. A cobertura de lucros cessantes é igualmente importante — indeniza a perda de receita durante o período de reparo ou substituição.

Uma peculiaridade importante: o seguro de máquinas geralmente cobre danos ao equipamento por causas internas (defeito, quebra), enquanto o seguro empresarial cobre causas externas (incêndio, roubo). Idealmente, ambos devem ser contratados para proteção completa.

Na Patro Seguros, avaliamos seu parque de máquinas, identificamos os equipamentos críticos e dimensionamos coberturas adequadas ao valor de reposição e ao impacto operacional de cada máquina.`}
      howItWorks={[
        { step: "1", title: "Inventário de Máquinas", description: "Mapeamos todas as máquinas e equipamentos, com marca, modelo, ano e valor de reposição" },
        { step: "2", title: "Análise de Criticidade", description: "Identificamos quais equipamentos são mais críticos para a operação e dimensionamos coberturas" },
        { step: "3", title: "Cotação Técnica", description: "Obtemos propostas de seguradoras especializadas em quebra de máquinas" },
        { step: "4", title: "Gestão do Seguro", description: "Acompanhamos sinistros e atualizamos coberturas conforme expansão ou substituição de equipamentos" },
      ]}
      coverages={[
        { title: "Quebra Acidental", description: "Cobertura para danos súbitos e imprevistos ao equipamento" },
        { title: "Danos Elétricos", description: "Proteção contra curto-circuito e variação de energia" },
        { title: "Incêndio e Raio", description: "Cobertura para danos causados por fogo e descargas elétricas" },
        { title: "Roubo e Furto", description: "Proteção contra subtração de máquinas e equipamentos" },
        { title: "Erro de Operação", description: "Cobertura para danos causados por imperícia do operador" },
        { title: "Despesas Extraordinárias", description: "Cobre custos de horas extras e frete expresso para reparos" },
        { title: "Lucros Cessantes", description: "Indenização por paralisação da produção" },
        { title: "Equipamentos Móveis", description: "Cobertura durante transporte e movimentação" },
      ]}
      coverageExclusions={[
        "Desgaste natural e manutenção preventiva",
        "Peças consumíveis (ferramentas de corte, abrasivos, filtros)",
        "Danos por falta de manutenção comprovada",
        "Máquinas em teste ou período experimental",
        "Danos cosméticos que não afetem a funcionalidade",
        "Vícios de fabricação cobertos pela garantia do fabricante",
      ]}
      pricingInfo={{
        intro: "O custo do seguro de máquinas é calculado como percentual do valor de reposição dos equipamentos.",
        factors: [
          "Valor de reposição (novo) dos equipamentos",
          "Tipo de máquina e tecnologia (CNC paga diferente de prensa)",
          "Idade e estado de conservação do maquinário",
          "Programa de manutenção preventiva da empresa",
          "Histórico de sinistros com máquinas",
          "Cobertura de lucros cessantes inclusa ou não",
        ],
        note: "A taxa varia de 0,3% a 1,5% do valor dos equipamentos ao ano. Uma máquina de R$ 500.000 pode custar de R$ 1.500 a R$ 7.500/ano de seguro. Com lucros cessantes, adicione 20% a 40% ao prêmio.",
      }}
      realScenarios={[
        { title: "Quebra de CNC na produção", description: "Um centro de usinagem CNC de R$ 600.000 apresentou defeito no eixo principal, paralisando a linha de produção. O seguro cobriu R$ 120.000 em reparos e R$ 80.000 em lucros cessantes durante 30 dias de parada." },
        { title: "Curto-circuito em impressora industrial", description: "Uma impressora offset industrial sofreu curto-circuito que danificou o painel eletrônico e a unidade de impressão. Reparo: R$ 95.000. O seguro de danos elétricos cobriu integralmente." },
        { title: "Erro de operação em prensa", description: "Um operador cometeu erro no setup de uma prensa hidráulica, causando R$ 45.000 em danos. O seguro cobriu o reparo sem questionar, pois a cobertura de erro de operação estava contratada." },
      ]}
      importantDetails={[
        { title: "Valor de reposição vs valor atual", content: "O seguro pode ser contratado pelo valor de reposição (máquina nova) ou pelo valor atual (depreciado). O valor de reposição garante indenização suficiente para comprar máquina nova equivalente." },
        { title: "Manutenção preventiva obrigatória", content: "A maioria das seguradoras exige que a empresa siga o programa de manutenção preventiva recomendado pelo fabricante. A falta de manutenção pode ser motivo de recusa de sinistro." },
        { title: "Lucros cessantes", content: "A cobertura de lucros cessantes é tão importante quanto a cobertura física. Uma máquina parada pode custar mais em produção perdida do que o próprio valor do reparo." },
      ]}
      tips={[
        "Siga rigorosamente o programa de manutenção preventiva — é requisito da maioria das seguradoras",
        "Contrate valor de reposição (novo) para máquinas críticas — garante indenização suficiente para comprar equivalente",
        "Inclua cobertura de lucros cessantes para equipamentos que paralisam a produção se quebrarem",
        "Mantenha registros de manutenção organizados e acessíveis — são prova fundamental em sinistros",
        "Atualize o seguro ao adquirir novos equipamentos — máquinas não declaradas não têm cobertura",
      ]}
      whoNeeds={[
        "Indústrias com maquinário de produção",
        "Construtoras com equipamentos de construção",
        "Gráficas e empresas com impressoras industriais",
        "Metalúrgicas e fabricantes",
        "Hospitais com equipamentos médicos",
        "Empresas com servidores e equipamentos de TI",
      ]}
      whyPatro={[
        "Avaliação correta do valor de reposição dos equipamentos",
        "Análise de riscos específicos da operação",
        "Orientação sobre lucros cessantes adequados",
        "Suporte técnico em caso de sinistro",
        "Parcerias com seguradoras especializadas",
        "Revisão periódica conforme expansão do parque",
      ]}
      faqs={[
        { question: "Quais tipos de máquinas podem ser seguradas?", answer: "Praticamente qualquer equipamento: máquinas industriais, agrícolas, de construção, médicas, de TI, gráficos e mais." },
        { question: "Como é definido o valor do seguro?", answer: "Baseado no valor de reposição ou valor atual. Orientamos sobre a melhor opção para cada equipamento." },
        { question: "Cobre peças de reposição?", answer: "Sim! Geralmente cobre peças novas necessárias para o reparo." },
        { question: "E se a máquina parar a produção?", answer: "A cobertura de lucros cessantes indeniza pela paralisação durante o período de reparo." },
        { question: "Preciso fazer manutenção preventiva?", answer: "Sim! A falta de manutenção pode ser motivo de perda de cobertura." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
      ]}
    />
  );
};

export default SeguroMaquinas;
