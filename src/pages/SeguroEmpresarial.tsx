import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroEmpresarial = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Empresarial em Guarulhos – Jardim Maia"
      subtitle="Proteção completa para o patrimônio e as operações da sua empresa"
      icon="🏢"
      metaDescription="Seguro Empresarial em Guarulhos, Jardim Maia. Cobertura contra incêndio, roubo, RC, lucros cessantes e danos elétricos. Cotação grátis Patro Seguros."
      description="Uma empresa leva anos para ser construída e pode ser destruída em poucas horas por um incêndio, roubo ou desastre natural. O Seguro Empresarial é a ferramenta que garante que seu negócio sobreviva a imprevistos que, sem proteção, poderiam significar o encerramento das atividades."
      detailedDescription={`Segundo dados da SUSEP, menos de 30% das empresas brasileiras possuem seguro adequado. Dessas que sofrem sinistros graves sem seguro, mais de 60% fecham as portas em até 2 anos. A razão é simples: além dos danos físicos (que já são enormes), a empresa perde faturamento durante a reconstrução — e os custos fixos continuam: aluguel, salários, financiamentos, impostos.

O seguro empresarial protege não apenas o patrimônio físico (prédio, equipamentos, estoque), mas também o faturamento (via lucros cessantes), a responsabilidade da empresa perante terceiros (via RC) e até equipamentos eletrônicos específicos como servidores, computadores e sistemas de CFTV.

Cada tipo de empresa tem riscos específicos: um restaurante tem risco de incêndio alto; uma loja de eletrônicos tem risco de roubo elevado; uma indústria química tem risco ambiental. Na Patro, fazemos análise de risco por segmento para garantir coberturas adequadas — nem de mais (que encarece), nem de menos (que deixa buracos na proteção).`}
      howItWorks={[
        { step: "1", title: "Análise de Risco do Negócio", description: "Visitamos (presencial ou virtualmente) sua empresa para entender a operação, o patrimônio, os riscos específicos do segmento, o histórico de sinistros e as particularidades do imóvel (próprio ou alugado, tipo de construção, vizinhança)." },
        { step: "2", title: "Dimensionamento das Coberturas", description: "Com base na análise, dimensionamos cada cobertura: valor da edificação, do conteúdo (equipamentos, móveis), do estoque, dos lucros cessantes (faturamento médio × meses de reconstrução estimados), RC e coberturas adicionais." },
        { step: "3", title: "Cotação Comparativa", description: "Enviamos para seguradoras especializadas em riscos empresariais. Cada uma avalia o risco de forma diferente — uma pode ser mais competitiva para comércio, outra para indústria. Apresentamos comparativo detalhado." },
        { step: "4", title: "Contratação e Vistoria", description: "Para empresas de menor porte, a contratação pode ser feita sem vistoria. Para riscos maiores, acompanhamos toda a vistoria técnica e negociamos condições com a seguradora." },
        { step: "5", title: "Gestão Contínua", description: "Acompanhamos alterações na empresa (ampliação, mudança de atividade, aumento de estoque) para manter o seguro atualizado. Em caso de sinistro, gerenciamos todo o processo de regulação." },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória que protege edificação, equipamentos, móveis e estoque contra fogo, descargas elétricas e explosão de qualquer natureza. Inclui danos por fumaça e pelo combate ao incêndio (água dos bombeiros)." },
        { title: "Roubo e Furto Qualificado", description: "Proteção contra subtração de equipamentos, estoque, valores em cofre e bens de terceiros sob custódia. Cobre arrombamento e furto qualificado. Importante: furto simples (sem arrombamento) geralmente não é coberto." },
        { title: "Danos Elétricos", description: "Protege máquinas, equipamentos e instalações contra curto-circuito, sobrecarga, variação de tensão e arco voltaico. Essencial para empresas com maquinário caro ou dependentes de equipamentos elétricos." },
        { title: "Responsabilidade Civil (RC)", description: "Cobre danos materiais e corporais que a empresa causar a terceiros durante suas operações: clientes que se acidentam no estabelecimento, produtos com defeito, danos a imóveis vizinhos, erro de prestação de serviço." },
        { title: "Lucros Cessantes", description: "Talvez a cobertura mais importante e subestimada. Repõe o faturamento líquido que a empresa deixa de gerar durante a paralisação por sinistro coberto. Inclui custos fixos que continuam mesmo parado: aluguel, salários, financiamentos." },
        { title: "Equipamentos Eletrônicos", description: "Cobertura específica para computadores, servidores, impressoras, sistemas de CFTV, centrais telefônicas e outros equipamentos de TI. Protege contra danos elétricos, queda, impacto e até subtração." },
        { title: "Vendaval, Granizo e Fenômenos Naturais", description: "Protege contra danos causados por ventos fortes, chuva de granizo, alagamento, inundação e desmoronamento. Especialmente importante para galpões, indústrias e empresas em regiões de risco." },
        { title: "Quebra de Vidros e Fachadas", description: "Cobertura para vidraças, vitrines, letreiros luminosos, portas de vidro e fachadas de vidro/ACM. Importante para lojas de rua, shopping centers e empresas com fachada exposta." },
      ]}
      coverageExclusions={[
        "Danos por falta de manutenção ou desgaste natural dos equipamentos",
        "Atos ilícitos praticados pelo segurado ou seus representantes",
        "Sinistros causados por guerra, terrorismo ou convulsões sociais",
        "Danos a softwares, dados e informações digitais (coberto pelo Seguro Cyber)",
        "Responsabilidade trabalhista (relações com empregados)",
        "Multas e penalidades governamentais",
        "Danos ambientais (cobertos pelo Seguro Ambiental específico)",
        "Estoque não declarado ou subdeclarado na apólice",
      ]}
      pricingInfo={{
        intro: "O custo do seguro empresarial varia enormemente conforme o tipo de negócio, patrimônio, localização e coberturas. Para um pequeno comércio, valores começam a partir de R$ 500 a R$ 2.000/ano. Para indústrias e empresas de maior porte, de R$ 3.000 a R$ 30.000+/ano.",
        factors: [
          "Atividade/segmento — restaurantes, indústrias químicas e postos de combustível são mais caros por natureza",
          "Valor do patrimônio — edificação, equipamentos, móveis e estoque",
          "Localização — CEP, vizinhança, proximidade de córregos ou áreas de risco",
          "Tipo de construção — alvenaria, metálica, madeira, mista",
          "Medidas de segurança — extintores, alarme, CFTV, brigada de incêndio",
          "Histórico de sinistros — empresas com sinistros recentes pagam mais",
          "Coberturas escolhidas — especialmente lucros cessantes e RC",
          "Faturamento (para lucros cessantes) — quanto maior o faturamento protegido, maior o custo",
        ],
        note: "Investir 0,5% a 2% do faturamento anual em seguro pode evitar a perda de 100% do negócio. Na Patro, dimensionamos cada cobertura para equilibrar proteção e custo.",
      }}
      realScenarios={[
        { title: "Incêndio destruiu restaurante em Guarulhos", description: "Um incêndio de madrugada destruiu completamente um restaurante: cozinha industrial, mobiliário, estoque e parte da estrutura. O seguro cobriu R$ 380.000 em danos materiais e mais R$ 120.000 em lucros cessantes (4 meses de reconstrução × faturamento médio). Sem seguro, o dono teria perdido 15 anos de trabalho." },
        { title: "Roubo de equipamentos em escritório", description: "Ladrões arrombaram um escritório de contabilidade e levaram 8 computadores, 2 impressoras, um servidor e um cofre. O seguro cobriu R$ 65.000 em equipamentos. A cobertura de equipamentos eletrônicos incluiu a reinstalação de sistemas e softwares." },
        { title: "Cliente escorregou e fraturou o braço na loja", description: "Uma cliente idosa escorregou no piso molhado de uma loja e fraturou o braço. Processou a empresa pedindo R$ 35.000. A Responsabilidade Civil do seguro empresarial cobriu integralmente o acordo judicial, incluindo honorários advocatícios." },
        { title: "Oscilação de energia queimou motor de refrigeração", description: "Uma variação na rede elétrica queimou o motor da câmara frigorífica de um supermercado, causando perda de R$ 22.000 em mercadorias perecíveis. O seguro cobriu o reparo do motor (R$ 8.000) e a perda do estoque (R$ 22.000) via cobertura de danos elétricos + deterioração de mercadorias em ambientes refrigerados." },
      ]}
      importantDetails={[
        { title: "Lucros Cessantes — A Cobertura que Salva Empresas", content: "Quando um sinistro paralisa a empresa, os danos vão muito além do patrimônio físico. O aluguel continua, os salários precisam ser pagos, os financiamentos vencem, os clientes migram para concorrentes e os contratos são cancelados.\n\nA cobertura de lucros cessantes repõe o faturamento líquido que a empresa deixa de gerar durante o período de reconstrução. É calculada com base no faturamento médio dos últimos 12 meses × número de meses estimados para retorno à operação normal. Sem ela, mesmo a empresa segurada pode não sobreviver ao período de paralisação." },
        { title: "Valor Adequado de Cobertura — Nem Mais, Nem Menos", content: "Subdeclarar o patrimônio para pagar menos é um erro grave. Se você declara R$ 200.000 mas o patrimônio real é R$ 400.000, em caso de sinistro parcial a indenização será proporcional (50% do prejuízo). Isso se chama 'rateio' e é aplicado por todas as seguradoras.\n\nPor outro lado, sobre declarar também é desperdício — você paga mais sem benefício. Na Patro, fazemos levantamento detalhado do patrimônio para dimensionar o valor exato de cobertura." },
        { title: "Seguro para Imóvel Alugado", content: "Se o imóvel da empresa é alugado, o seguro da edificação é responsabilidade do proprietário. Porém, o conteúdo (equipamentos, estoque, mobiliário) é responsabilidade da empresa. Muitos contratos de locação comercial já exigem que o inquilino tenha seguro.\n\nAlém disso, se um sinistro na sua empresa (ex: incêndio) danificar o imóvel do proprietário, você pode ser responsabilizado. A RC cobre essa situação." },
      ]}
      tips={[
        "Inclua sempre lucros cessantes — é a cobertura que mantém a empresa viva durante a reconstrução.",
        "Declare o valor real do patrimônio — subdeclarar causa rateio (indenização proporcional) em sinistros parciais.",
        "Invista em prevenção — extintores, alarme e CFTV reduzem o preço do seguro e o risco real.",
        "Revise o seguro quando o estoque ou patrimônio mudar significativamente.",
        "Combine seguro empresarial com RC profissional se presta serviços a terceiros.",
        "Para empresas com dados sensíveis, considere adicionar o Seguro Cyber.",
      ]}
      whoNeeds={[
        "Comércios de todos os portes — lojas, restaurantes, supermercados, farmácias",
        "Indústrias — fábricas, manufaturas, processamento de alimentos",
        "Prestadores de serviços — escritórios, clínicas, academias, salões",
        "Empresas com estoque significativo — distribuidoras, atacadistas",
        "Negócios que dependem de equipamentos específicos — gráficas, laboratórios, TI",
        "Empresas que atendem público — lojas, restaurantes, clínicas (RC é essencial)",
        "Qualquer empresa com patrimônio que levou tempo e dinheiro para construir",
      ]}
      whyPatro={[
        "Análise de risco específica para seu segmento — cada tipo de empresa tem necessidades diferentes",
        "Dimensionamento correto de coberturas — sem subdeclarar nem sobredeclarar",
        "Cotação com seguradoras especializadas em riscos empresariais",
        "Orientação sobre lucros cessantes — cálculo baseado no seu faturamento real",
        "Suporte completo em sinistros — acompanhamos da regulação à indenização",
        "Revisão anual conforme crescimento ou mudanças na empresa",
        "Pacote combinado: empresarial + frota + vida em grupo + saúde com descontos",
      ]}
      faqs={[
        { question: "Quanto custa um seguro empresarial?", answer: "Varia conforme atividade, patrimônio e coberturas. Pequenos comércios: R$ 500 a R$ 2.000/ano. Empresas médias: R$ 2.000 a R$ 10.000/ano. Indústrias e riscos maiores: R$ 10.000 a R$ 50.000+/ano. O investimento representa geralmente 0,5% a 2% do faturamento anual — uma fração do que se perderia sem proteção." },
        { question: "Quais empresas precisam de seguro empresarial?", answer: "Toda empresa com patrimônio físico, estoque, equipamentos ou que atende público precisa de seguro. Mesmo empresas home-office precisam proteger equipamentos. Para empresas em imóvel alugado, muitos contratos de locação já exigem seguro. A questão não é se sua empresa precisa, mas quanto de proteção é adequado." },
        { question: "O que é lucros cessantes e por que é tão importante?", answer: "Lucros cessantes repõem o faturamento líquido perdido durante a paralisação por sinistro. Exemplo: se seu restaurante fatura R$ 80.000/mês e um incêndio paralisa por 4 meses, são R$ 320.000 de receita perdida — além dos custos fixos que continuam. Sem lucros cessantes, mesmo a empresa segurada pode fechar por falta de caixa. É a cobertura que mantém a empresa viva." },
        { question: "O seguro empresarial cobre funcionários?", answer: "Não diretamente. Funcionários precisam de coberturas específicas: Seguro de Vida em Grupo (obrigatório em muitas convenções coletivas), Seguro de Acidentes Pessoais e Plano de Saúde. Na Patro, estruturamos pacotes completos que incluem proteção patrimonial e de pessoas." },
        { question: "Preciso fazer vistoria?", answer: "Depende do porte e risco. Pequenos comércios com patrimônio até R$ 500.000 geralmente dispensam vistoria. Empresas maiores, indústrias e riscos especiais precisam de vistoria técnica. Acompanhamos todo o processo e orientamos sobre eventuais exigências de segurança." },
        { question: "O que é rateio e como evitar?", answer: "Rateio ocorre quando o valor segurado é menor que o patrimônio real. Se você segurou R$ 300.000 mas o patrimônio real é R$ 600.000, em um sinistro parcial de R$ 100.000 a seguradora paga apenas R$ 50.000 (50%). Para evitar, declare o valor real de reposição de todo o patrimônio. Na Patro, fazemos esse levantamento detalhado." },
      ]}
      relatedInsurances={[
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
        { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
      ]}
      quoteFormFields={[
        { id: "empresa", label: "Nome da empresa", placeholder: "Razão social ou nome fantasia" },
        { id: "segmento", label: "Segmento", placeholder: "Selecione", type: "select", options: ["Comércio", "Indústria", "Serviços", "Saúde", "Tecnologia", "Outro"] },
        { id: "funcionarios", label: "Nº de funcionários", placeholder: "Selecione", type: "select", options: ["1 a 5", "6 a 20", "21 a 50", "51 a 100", "Mais de 100"] },
      ]}
    />
  );
};

export default SeguroEmpresarial;
