import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroRC = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Responsabilidade Civil"
      subtitle="Proteção contra danos causados a terceiros nas suas operações"
      icon="⚖️"
      metaDescription="Seguro Responsabilidade Civil para empresas. Proteção contra danos a terceiros, processos judiciais e indenizações. Cotação grátis Patro Seguros Guarulhos."
      description="O Seguro de Responsabilidade Civil (RC) protege sua empresa contra reclamações por danos materiais ou corporais causados a terceiros durante suas operações. Acidentes, erros e imprevistos podem gerar processos caros. Este seguro cobre indenizações e despesas judiciais, protegendo o patrimônio da empresa."
      detailedDescription={`A Responsabilidade Civil é um dos pilares jurídicos do direito brasileiro: quem causa dano a outrem tem o dever de reparar. Para empresas, isso significa que qualquer acidente envolvendo clientes, fornecedores, visitantes ou até transeuntes pode resultar em processos judiciais com indenizações que comprometem seriamente o patrimônio empresarial.

O Seguro RC funciona como um escudo financeiro: quando sua empresa é responsabilizada por causar danos a terceiros — sejam materiais, corporais ou morais — a seguradora assume os custos de defesa e eventuais indenizações, até o limite contratado. É uma proteção indispensável em um ambiente cada vez mais litigioso, onde um único processo pode custar centenas de milhares de reais.

Na Patro Seguros, analisamos detalhadamente sua operação para identificar os riscos específicos do seu negócio e recomendar as modalidades e limites adequados. Trabalhamos com seguradoras especializadas para garantir coberturas sob medida.`}
      howItWorks={[
        { step: "1", title: "Análise de Riscos", description: "Avaliamos sua atividade empresarial, identificando os riscos de danos a terceiros específicos da sua operação" },
        { step: "2", title: "Escolha das Coberturas", description: "Definimos as modalidades de RC necessárias (Operações, Empregador, Produtos, etc.) e os limites adequados" },
        { step: "3", title: "Cotação Comparativa", description: "Comparamos propostas de seguradoras especializadas em Responsabilidade Civil para o melhor custo-benefício" },
        { step: "4", title: "Proteção Ativa", description: "Em caso de reclamação ou processo, a seguradora assume a defesa jurídica e paga indenizações até o limite da apólice" },
      ]}
      coverages={[
        { title: "Danos Materiais a Terceiros", description: "Cobertura para prejuízos materiais causados a outras pessoas" },
        { title: "Danos Corporais a Terceiros", description: "Proteção para lesões físicas causadas durante operações" },
        { title: "Danos Morais", description: "Cobertura para danos à honra e imagem de terceiros" },
        { title: "Despesas de Defesa", description: "Custos com advogados e processos judiciais" },
        { title: "RC Operações", description: "Cobertura durante execução das atividades da empresa" },
        { title: "RC Empregador", description: "Proteção para acidentes com funcionários" },
        { title: "RC Produtos", description: "Cobertura para danos causados por produtos fabricados/vendidos" },
        { title: "RC Cruzada", description: "Proteção entre empresas do mesmo grupo econômico" },
      ]}
      coverageExclusions={[
        "Danos causados intencionalmente pelo segurado",
        "Multas e penalidades administrativas",
        "Danos decorrentes de poluição gradual (cobertura específica necessária)",
        "Responsabilidade assumida contratualmente além da legal",
        "Danos a bens sob guarda ou custódia do segurado (sem cobertura adicional)",
        "Recalls de produtos (cobertura específica necessária)",
        "Atos de guerra, terrorismo e eventos nucleares",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro RC varia conforme a atividade, porte da empresa, faturamento e limites de cobertura escolhidos.",
        factors: [
          "Ramo de atividade e nível de risco da operação",
          "Faturamento anual da empresa",
          "Limite de indenização desejado (R$ 500 mil a R$ 50 milhões+)",
          "Modalidades contratadas (Operações, Empregador, Produtos)",
          "Histórico de sinistros e reclamações",
          "Número de funcionários e extensão das operações",
        ],
        note: "Um restaurante pode pagar a partir de R$ 1.500/ano por RC Operações com limite de R$ 500 mil. Uma construtora de médio porte pode investir R$ 15.000 a R$ 50.000/ano com limites maiores.",
      }}
      realScenarios={[
        { title: "Queda de cliente em loja", description: "Uma cliente escorregou no piso molhado de uma loja e fraturou o braço. O RC cobriu R$ 85.000 em despesas médicas, cirurgia e indenização por danos morais, além dos custos advocatícios." },
        { title: "Produto defeituoso causou incêndio", description: "Um equipamento eletrônico fabricado por uma empresa apresentou defeito e causou incêndio na residência do comprador. O RC Produtos cobriu R$ 250.000 em danos materiais e corporais." },
        { title: "Acidente em obra com terceiro", description: "Durante uma obra, um pedaço de concreto caiu sobre um veículo estacionado na rua. O RC Operações cobriu R$ 45.000 em reparos ao veículo e indenização ao proprietário." },
      ]}
      importantDetails={[
        { title: "Limite de Indenização", content: "É o valor máximo que a seguradora pagará por sinistro ou no agregado anual. Escolher limites adequados é fundamental — um limite muito baixo pode deixar sua empresa exposta a valores excedentes." },
        { title: "Franquia", content: "A maioria das apólices de RC possui franquia (participação do segurado no sinistro). Franquias maiores reduzem o prêmio, mas exigem reserva financeira para sinistros menores." },
        { title: "Retroatividade", content: "Verifique a data de retroatividade da apólice. Fatos ocorridos antes dessa data, mesmo que reclamados durante a vigência, podem não ter cobertura." },
      ]}
      tips={[
        "Contrate limites de indenização compatíveis com o porte e risco da sua operação — o barato pode sair muito caro",
        "Mantenha a apólice atualizada: mudanças na atividade, novos produtos ou expansão de operações exigem revisão das coberturas",
        "Documente seus processos de segurança e prevenção — isso pode reduzir o prêmio e fortalecer sua defesa em processos",
        "Avise a seguradora imediatamente ao tomar conhecimento de qualquer incidente, mesmo que pareça pequeno",
        "Considere combinar RC Operações + RC Empregador + RC Produtos para proteção completa",
      ]}
      whoNeeds={[
        "Empresas de construção civil",
        "Prestadores de serviços diversos",
        "Indústrias e fabricantes",
        "Comércios varejistas",
        "Empresas de eventos",
        "Qualquer empresa que trabalha com público ou terceiros",
      ]}
      whyPatro={[
        "Análise de riscos específicos do seu segmento",
        "Limites de indenização adequados à sua operação",
        "Orientação sobre RC Empregador e outras modalidades",
        "Suporte jurídico em caso de reclamações",
        "Parcerias com seguradoras especializadas em RC",
        "Revisão conforme crescimento e mudanças na empresa",
      ]}
      faqs={[
        { question: "Quando o seguro RC é acionado?", answer: "Quando terceiros (clientes, fornecedores, visitantes, público em geral) sofrem danos materiais ou corporais decorrentes das suas operações e fazem reclamação ou processo." },
        { question: "Qual limite de cobertura devo contratar?", answer: "Depende do ramo de atividade, porte da operação e riscos envolvidos. Analisamos sua exposição e recomendamos limites adequados." },
        { question: "RC Empregador substitui o seguro de acidentes de trabalho?", answer: "Não. RC Empregador complementa, cobrindo situações não contempladas pelo seguro obrigatório de acidentes de trabalho." },
        { question: "Cobre danos causados por funcionários?", answer: "Sim! Se um funcionário causar danos a terceiros durante o trabalho, a RC da empresa é acionada." },
        { question: "E se eu receber um processo?", answer: "Entre em contato imediatamente. A seguradora assume a defesa jurídica e cobre as indenizações até o limite da apólice." },
        { question: "Qual a diferença entre RC Operações e RC Produtos?", answer: "RC Operações cobre danos durante a execução dos serviços. RC Produtos cobre danos causados por produtos após a entrega ao consumidor. São coberturas complementares." },
      ]}
      relatedInsurances={[
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroRC;
