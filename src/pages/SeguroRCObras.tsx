import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroRCObras = () => {
  return (
    <InsurancePageTemplate
      title="Seguro RC Obras"
      subtitle="Proteção contra danos a terceiros em canteiros de obras e construções"
      icon="🏗️"
      metaDescription="Seguro RC Obras para construtoras e empreiteiras. Cobertura contra danos a terceiros em canteiros de obra. A Patro Seguros é especialista em RC. Cotação grátis."
      description="O Seguro de Responsabilidade Civil para Obras protege construtoras, empreiteiras e incorporadoras contra reclamações por danos materiais, corporais e morais causados a terceiros durante a execução de obras civis. A Patro Seguros é especialista neste tipo de seguro, oferecendo análise de riscos personalizada para cada projeto."
      detailedDescription={`Canteiros de obras são ambientes de alto risco: queda de materiais, movimentação de máquinas pesadas, escavações, demolições, vibração excessiva e poeira podem causar danos significativos a vizinhos, pedestres, veículos e imóveis adjacentes. Um único acidente pode gerar processos milionários que comprometem a saúde financeira de toda a empresa.

O Seguro RC Obras é projetado especificamente para cobrir esses riscos. Diferente do RC Geral, que protege operações cotidianas, o RC Obras foca nos riscos inerentes à atividade de construção civil — desde pequenas reformas até grandes empreendimentos.

Muitos contratos públicos e privados já exigem a contratação de RC Obras como condição para início dos trabalhos. É também uma exigência comum de órgãos reguladores e prefeituras para liberação de alvarás.

Na Patro Seguros, somos especialistas em seguros de Responsabilidade Civil e entendemos as particularidades do setor de construção civil. Analisamos o projeto, o entorno, os métodos construtivos e os riscos específicos para recomendar coberturas e limites adequados, sempre com as melhores seguradoras do mercado.`}
      howItWorks={[
        { step: "1", title: "Análise do Projeto", description: "Avaliamos o tipo de obra, métodos construtivos, localização, vizinhança e riscos específicos do canteiro" },
        { step: "2", title: "Definição de Coberturas", description: "Recomendamos as coberturas necessárias e limites de indenização compatíveis com o porte e risco da obra" },
        { step: "3", title: "Cotação Especializada", description: "Negociamos com seguradoras especializadas em construção civil para obter as melhores condições" },
        { step: "4", title: "Proteção Durante Toda a Obra", description: "Em caso de dano a terceiros, a seguradora assume defesa jurídica e indenizações até o limite da apólice" },
      ]}
      coverages={[
        { title: "Danos a Imóveis Vizinhos", description: "Trincas, rachaduras e danos estruturais causados por vibração, escavação ou movimentação de terra" },
        { title: "Queda de Materiais", description: "Danos a pessoas, veículos ou propriedades causados por queda de materiais do canteiro" },
        { title: "Danos a Pedestres e Veículos", description: "Lesões corporais a transeuntes e danos a veículos nas proximidades da obra" },
        { title: "Danos por Vibração e Escavação", description: "Prejuízos a edificações vizinhas causados por vibrações de máquinas e escavações profundas" },
        { title: "Poluição Acidental", description: "Danos ambientais súbitos como vazamento de combustível ou contaminação do solo" },
        { title: "Danos a Redes Subterrâneas", description: "Ruptura de tubulações de água, gás, esgoto e cabos elétricos/telefônicos durante escavações" },
        { title: "RC Empregador", description: "Cobertura complementar para acidentes com funcionários da obra" },
        { title: "Despesas de Defesa Judicial", description: "Custos com advogados, perícias e custas processuais em reclamações de terceiros" },
      ]}
      coverageExclusions={[
        "Danos à própria obra em construção (cobertos pelo Seguro de Riscos de Engenharia)",
        "Danos causados intencionalmente pelo segurado",
        "Defeitos de projeto, cálculo ou especificação técnica (cobertura do RC Profissional)",
        "Multas e penalidades administrativas",
        "Danos decorrentes de poluição gradual e preexistente",
        "Danos a equipamentos e ferramentas da própria obra",
        "Atraso na entrega da obra ou descumprimento contratual",
        "Atos de guerra, terrorismo e eventos nucleares",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro RC Obras varia conforme o tipo de obra, valor do contrato, métodos construtivos e localização.",
        factors: [
          "Tipo de obra (residencial, comercial, industrial, infraestrutura)",
          "Valor total do contrato da obra",
          "Métodos construtivos utilizados (escavação profunda, demolição, etc.)",
          "Proximidade de imóveis vizinhos e vias públicas",
          "Prazo de execução da obra",
          "Histórico de sinistros da construtora",
        ],
        note: "Uma reforma residencial pode ter RC Obras a partir de R$ 2.000. Uma construção de edifício residencial de médio porte investe de R$ 10.000 a R$ 40.000. Grandes obras de infraestrutura podem exigir investimentos maiores com limites de R$ 10 milhões ou mais.",
      }}
      realScenarios={[
        { title: "Escavação danificou imóvel vizinho", description: "Uma escavação para fundação causou recalque no terreno vizinho, gerando trincas graves na edificação. O RC Obras cobriu R$ 350.000 em reparos estruturais e indenização por danos morais aos moradores." },
        { title: "Queda de andaime sobre veículo", description: "Um andaime cedeu e materiais caíram sobre um carro estacionado na rua, além de ferir um pedestre. O seguro cobriu R$ 120.000 entre reparos no veículo, despesas médicas e indenizações." },
        { title: "Ruptura de tubulação de água", description: "Durante escavação, a equipe rompeu uma tubulação de água da concessionária, causando inundação em comércios vizinhos. O RC Obras cobriu R$ 200.000 em danos materiais e lucros cessantes dos estabelecimentos afetados." },
      ]}
      importantDetails={[
        { title: "RC Obras vs Seguro de Engenharia", content: "São seguros complementares. O RC Obras cobre danos a terceiros causados pela obra. O Seguro de Riscos de Engenharia cobre danos à própria obra (incêndio, desmoronamento, etc.). Para proteção completa, contrate os dois." },
        { title: "Exigência Contratual", content: "Muitos contratos públicos (licitações) e privados exigem a apresentação de apólice de RC Obras como condição para início dos trabalhos. A Patro Seguros emite apólices rapidamente para atender esses prazos." },
        { title: "Período de Manutenção", content: "Algumas apólices podem ser estendidas para cobrir o período de manutenção pós-entrega da obra, geralmente de 12 a 24 meses. Consulte nossos especialistas sobre essa extensão." },
      ]}
      tips={[
        "Contrate o RC Obras antes do início de qualquer atividade no canteiro — inclusive demolição e terraplanagem",
        "Realize vistoria cautelar nos imóveis vizinhos antes de iniciar a obra — isso protege contra reclamações infundadas",
        "Combine RC Obras com Seguro de Riscos de Engenharia para proteção completa do projeto",
        "Mantenha os limites de indenização atualizados conforme o andamento e complexidade da obra",
        "Documente todas as medidas de segurança adotadas — isso fortalece a defesa em caso de reclamações",
        "Comunique imediatamente à seguradora qualquer incidente, mesmo que pareça de pequena monta",
      ]}
      whoNeeds={[
        "Construtoras e empreiteiras de todos os portes",
        "Incorporadoras imobiliárias",
        "Empresas de demolição e terraplanagem",
        "Empresas de reformas e manutenção predial",
        "Empresas de infraestrutura e obras públicas",
        "Subempreiteiras e prestadores de serviços em obras",
      ]}
      whyPatro={[
        "Especialistas reconhecidos em seguros de Responsabilidade Civil",
        "Conhecimento profundo do setor de construção civil",
        "Análise técnica do projeto e riscos específicos da obra",
        "Parcerias com seguradoras líderes em seguros de engenharia",
        "Emissão rápida para atender exigências contratuais e licitatórias",
        "Suporte integral em caso de sinistros e reclamações de vizinhos",
      ]}
      faqs={[
        { question: "Qual a diferença entre RC Obras e Seguro de Engenharia?", answer: "O RC Obras cobre danos causados a terceiros durante a execução da obra (vizinhos, pedestres, veículos). O Seguro de Engenharia cobre danos à própria obra em construção. São complementares e recomendamos contratar os dois." },
        { question: "RC Obras é obrigatório?", answer: "Não é obrigatório por lei, mas é exigido em praticamente todos os contratos públicos (licitações) e em muitos contratos privados. Além disso, algumas prefeituras exigem para liberação de alvará de construção." },
        { question: "O RC Obras cobre acidentes com funcionários?", answer: "Sim, através da cobertura de RC Empregador, que complementa o seguro obrigatório de acidentes de trabalho, especialmente quando há responsabilidade da empresa no acidente." },
        { question: "Reformas pequenas precisam de RC Obras?", answer: "Sim! Mesmo reformas menores podem causar danos a vizinhos (trincas, barulho excessivo, queda de materiais). O custo do RC para reformas é acessível e evita dores de cabeça enormes." },
        { question: "A cobertura vale durante toda a obra?", answer: "Sim. A apólice é contratada pelo prazo de execução da obra e pode ser estendida se houver atrasos. Também é possível incluir o período de manutenção pós-entrega." },
        { question: "Por que contratar RC Obras com a Patro Seguros?", answer: "Somos especialistas em RC com profundo conhecimento do setor de construção civil. Analisamos cada projeto individualmente, negociamos condições diferenciadas e oferecemos suporte completo em sinistros." },
      ]}
      relatedInsurances={[
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
        { title: "Seguro RC Geral", link: "/seguro-rc" },
        { title: "Seguro RC Engenheiros", link: "/seguro-rc-engenheiros" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroRCObras;
