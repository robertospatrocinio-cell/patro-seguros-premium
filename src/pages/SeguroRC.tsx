import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRC = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Responsabilidade Civil Geral"
      subtitle="Proteção completa contra danos causados a terceiros nas suas operações"
      icon="⚖️"
      metaDescription="Seguro Responsabilidade Civil Geral para empresas. Proteção contra danos a terceiros, processos judiciais e indenizações. A Patro Seguros é especialista em RC. Cotação grátis."
      description="O Seguro de Responsabilidade Civil Geral (RCG) protege sua empresa contra reclamações por danos materiais, corporais ou morais causados a terceiros durante suas operações. A Patro Seguros é especialista neste tipo de seguro, oferecendo análise de riscos personalizada e coberturas sob medida para garantir a proteção completa do seu patrimônio empresarial."
      detailedDescription={`A Responsabilidade Civil é um dos pilares jurídicos do direito brasileiro: quem causa dano a outrem tem o dever de reparar. Para empresas, isso significa que qualquer acidente envolvendo clientes, fornecedores, visitantes ou até transeuntes pode resultar em processos judiciais com indenizações que comprometem seriamente o patrimônio empresarial.

O Seguro RC Geral funciona como um escudo financeiro abrangente: quando sua empresa é responsabilizada por causar danos a terceiros — sejam materiais, corporais ou morais — a seguradora assume os custos de defesa e eventuais indenizações, até o limite contratado. É uma proteção indispensável em um ambiente cada vez mais litigioso, onde um único processo pode custar centenas de milhares de reais.

Diferente das modalidades específicas (RC Profissional, RC Médicos, RC Executivos), o RC Geral abrange as operações cotidianas da empresa como um todo: atividades no estabelecimento, execução de serviços, danos causados por produtos fabricados ou comercializados e acidentes com funcionários envolvendo terceiros.

Na Patro Seguros, somos referência em seguros de Responsabilidade Civil. Analisamos detalhadamente sua operação para identificar os riscos específicos do seu negócio e recomendar as modalidades e limites adequados. Trabalhamos com as melhores seguradoras especializadas para garantir coberturas sob medida e o melhor custo-benefício do mercado.`}
      howItWorks={[
        { step: "1", title: "Análise de Riscos Completa", description: "Nossos especialistas avaliam sua atividade empresarial, mapeando todos os riscos de danos a terceiros da sua operação" },
        { step: "2", title: "Escolha das Coberturas", description: "Definimos as modalidades de RC necessárias (Operações, Empregador, Produtos, Cruzada) e os limites adequados ao seu porte" },
        { step: "3", title: "Cotação Comparativa", description: "Comparamos propostas de seguradoras especializadas em Responsabilidade Civil para garantir o melhor custo-benefício" },
        { step: "4", title: "Proteção Ativa", description: "Em caso de reclamação ou processo, a seguradora assume a defesa jurídica e paga indenizações até o limite da apólice" },
      ]}
      coverages={[
        { title: "RC Operações", description: "Cobertura para danos causados a terceiros durante a execução das atividades cotidianas da empresa" },
        { title: "RC Empregador", description: "Proteção contra reclamações de funcionários por acidentes de trabalho além do seguro obrigatório" },
        { title: "RC Produtos", description: "Cobertura para danos causados por produtos fabricados, comercializados ou distribuídos pela empresa" },
        { title: "RC Cruzada", description: "Proteção entre empresas do mesmo grupo econômico ou participantes de um mesmo projeto" },
        { title: "Danos Materiais a Terceiros", description: "Prejuízos materiais causados a bens de outras pessoas durante suas operações" },
        { title: "Danos Corporais a Terceiros", description: "Lesões físicas causadas a terceiros decorrentes das atividades da empresa" },
        { title: "Danos Morais", description: "Cobertura para indenizações por danos à honra, imagem e dignidade de terceiros" },
        { title: "Despesas de Defesa Judicial", description: "Custos com advogados, perícias, custas processuais e honorários em processos judiciais" },
      ]}
      coverageExclusions={[
        "Danos causados intencionalmente pelo segurado (atos dolosos)",
        "Multas e penalidades administrativas ou criminais",
        "Danos decorrentes de poluição gradual (cobertura ambiental específica necessária)",
        "Responsabilidade assumida contratualmente além da responsabilidade legal",
        "Danos a bens sob guarda ou custódia do segurado (sem cobertura adicional)",
        "Recalls de produtos (cobertura específica necessária)",
        "Atos de guerra, terrorismo e eventos nucleares",
        "Danos causados por veículos automotores (cobertos pelo seguro auto)",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro RC Geral varia conforme a atividade, porte da empresa, faturamento e limites de cobertura escolhidos.",
        factors: [
          "Ramo de atividade e nível de risco da operação",
          "Faturamento anual da empresa",
          "Limite de indenização desejado (R$ 500 mil a R$ 50 milhões+)",
          "Modalidades contratadas (Operações, Empregador, Produtos, Cruzada)",
          "Histórico de sinistros e reclamações anteriores",
          "Número de funcionários e extensão geográfica das operações",
        ],
        note: "Um restaurante pode pagar a partir de R$ 1.500/ano por RC Operações com limite de R$ 500 mil. Uma construtora de médio porte pode investir de R$ 15.000 a R$ 50.000/ano com limites maiores. A Patro Seguros negocia as melhores condições para cada perfil.",
      }}
      realScenarios={[
        { title: "Queda de cliente em estabelecimento", description: "Uma cliente escorregou no piso molhado de uma loja e fraturou o braço. O RC Operações cobriu R$ 85.000 em despesas médicas, cirurgia e indenização por danos morais, além dos custos advocatícios." },
        { title: "Produto defeituoso causou incêndio", description: "Um equipamento eletrônico fabricado por uma empresa apresentou defeito e causou incêndio na residência do comprador. O RC Produtos cobriu R$ 250.000 em danos materiais e corporais à família afetada." },
        { title: "Acidente em obra com veículo de terceiro", description: "Durante uma obra, um pedaço de concreto caiu sobre um veículo estacionado na rua. O RC Operações cobriu R$ 45.000 em reparos ao veículo e indenização ao proprietário, evitando processo judicial." },
        { title: "Funcionário causou dano em cliente", description: "Um funcionário de uma empresa de manutenção danificou equipamentos caros de um cliente durante um serviço. O RC cobriu R$ 120.000 em reposição dos equipamentos e lucros cessantes." },
      ]}
      importantDetails={[
        { title: "Limite de Indenização", content: "É o valor máximo que a seguradora pagará por sinistro ou no agregado anual. Escolher limites adequados é fundamental — um limite muito baixo pode deixar sua empresa exposta a valores excedentes que saem do próprio bolso." },
        { title: "Franquia (Participação)", content: "A maioria das apólices de RC possui franquia. Franquias maiores reduzem o prêmio, mas exigem reserva financeira para sinistros menores. Nossos especialistas ajudam a encontrar o equilíbrio ideal." },
        { title: "Retroatividade", content: "Verifique a data de retroatividade da apólice. Fatos ocorridos antes dessa data, mesmo que reclamados durante a vigência, podem não ter cobertura. A Patro Seguros orienta sobre a melhor configuração." },
        { title: "Diferença entre RC Geral e RC Profissional", content: "O RC Geral cobre danos decorrentes das operações da empresa. O RC Profissional (E&O) cobre erros e omissões na prestação de serviços especializados. São coberturas complementares que podem ser contratadas juntas." },
      ]}
      tips={[
        "Contrate limites de indenização compatíveis com o porte e risco da sua operação — o barato pode sair muito caro em caso de sinistro",
        "Mantenha a apólice sempre atualizada: mudanças na atividade, novos produtos ou expansão de operações exigem revisão das coberturas",
        "Documente seus processos de segurança e prevenção — isso pode reduzir o prêmio e fortalecer sua defesa em processos",
        "Avise a seguradora imediatamente ao tomar conhecimento de qualquer incidente, mesmo que pareça pequeno",
        "Considere combinar RC Operações + RC Empregador + RC Produtos para proteção completa e abrangente",
        "Consulte os especialistas da Patro Seguros para avaliar se coberturas específicas (RC Profissional, D&O, Ambiental) são necessárias",
      ]}
      whoNeeds={[
        "Empresas de construção civil e reformas",
        "Prestadores de serviços em geral",
        "Indústrias e fabricantes de produtos",
        "Comércios varejistas e atacadistas",
        "Empresas de eventos e entretenimento",
        "Restaurantes, bares e estabelecimentos alimentícios",
        "Qualquer empresa que interage com público ou terceiros",
      ]}
      whyPatro={[
        "Especialistas reconhecidos em seguros de Responsabilidade Civil",
        "Análise de riscos específicos do seu segmento de atuação",
        "Recomendação de limites de indenização adequados à sua operação",
        "Orientação completa sobre todas as modalidades de RC disponíveis",
        "Parcerias com as melhores seguradoras especializadas em RC",
        "Suporte dedicado em caso de reclamações e sinistros",
        "Revisão contínua conforme crescimento e mudanças na empresa",
      ]}
      faqs={[
        { question: "Quando o Seguro RC Geral é acionado?", answer: "Quando terceiros (clientes, fornecedores, visitantes, público em geral) sofrem danos materiais, corporais ou morais decorrentes das suas operações e fazem reclamação formal ou processo judicial." },
        { question: "Qual limite de cobertura devo contratar?", answer: "Depende do ramo de atividade, porte da operação e riscos envolvidos. Os especialistas da Patro Seguros analisam sua exposição e recomendam limites adequados para cada situação." },
        { question: "RC Empregador substitui o seguro de acidentes de trabalho?", answer: "Não. O RC Empregador complementa, cobrindo situações não contempladas pelo seguro obrigatório de acidentes de trabalho, especialmente quando há negligência comprovada do empregador." },
        { question: "O seguro cobre danos causados por funcionários?", answer: "Sim! Se um funcionário causar danos a terceiros durante o exercício de suas funções, a RC da empresa é acionada para cobrir indenizações e custos de defesa." },
        { question: "E se eu receber um processo judicial?", answer: "Entre em contato imediatamente com a Patro Seguros. A seguradora assume a defesa jurídica e cobre as indenizações até o limite da apólice, protegendo o patrimônio da sua empresa." },
        { question: "Qual a diferença entre RC Operações e RC Produtos?", answer: "RC Operações cobre danos durante a execução dos serviços. RC Produtos cobre danos causados por produtos após a entrega ao consumidor. São coberturas complementares que recomendamos contratar juntas." },
        { question: "Por que escolher a Patro Seguros para meu RC?", answer: "Somos especialistas em Responsabilidade Civil com anos de experiência no mercado. Oferecemos análise personalizada de riscos, cotações comparativas com as melhores seguradoras e suporte completo em sinistros." },
      ]}
      relatedInsurances={[
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro RC Médicos", link: "/seguro-rc-medicos" },
        { title: "Seguro RC Executivos (D&O)", link: "/seguro-rc-executivos" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroRC;
