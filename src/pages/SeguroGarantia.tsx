import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroGarantia = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Garantia"
      subtitle="A alternativa inteligente à fiança bancária e ao depósito judicial"
      icon="🔒"
      metaDescription="Seguro Garantia para licitações, contratos, execução fiscal e judicial. Substitui fiança bancária com menor custo. Cotação grátis Patro Seguros."
      description="O Seguro Garantia é um instrumento que substitui garantias tradicionais — como fiança bancária, depósito caução e penhor — em contratos públicos, privados e processos judiciais. Ele libera o capital de giro da empresa, custa menos que as alternativas e é aceito em licitações, contratos administrativos e ações judiciais em todo o Brasil."
      detailedDescription={`Previsto na Lei de Licitações (Lei 14.133/2021) e no Código de Processo Civil, o Seguro Garantia ganhou protagonismo nos últimos anos como a forma mais eficiente de apresentar garantias sem comprometer o caixa da empresa.

Enquanto uma fiança bancária consome o limite de crédito do empresário junto ao banco e um depósito caução imobiliza capital que poderia estar gerando receita, o Seguro Garantia exige apenas o pagamento de um prêmio — geralmente entre 0,5% e 3% do valor garantido por ano.

Para empresas que participam de licitações públicas, o Seguro Garantia é praticamente obrigatório. Para empresas com execuções fiscais ou ações judiciais, é a forma mais inteligente de garantir o juízo sem descapitalizar o negócio.

Na Patro Seguros, somos especialistas em Seguro Garantia para todos os segmentos: construção civil, engenharia, indústria, comércio, agronegócio e serviços. Trabalhamos com as principais seguradoras do mercado para encontrar a melhor condição para cada operação.`}
      howItWorks={[
        { step: "1", title: "Identificação da Necessidade", description: "Entendemos o tipo de garantia necessária: licitação, contrato, judicial, fiscal ou aduaneira. Cada modalidade tem regras e condições específicas." },
        { step: "2", title: "Análise de Crédito da Empresa", description: "A seguradora analisa o balanço patrimonial, faturamento e saúde financeira da empresa. Quanto melhor a situação, melhores as condições e menor o custo." },
        { step: "3", title: "Cotação com Múltiplas Seguradoras", description: "Cotamos com seguradoras especializadas em Seguro Garantia. Cada uma tem critérios e taxas diferentes — a comparação gera economia real." },
        { step: "4", title: "Emissão da Apólice", description: "Após aprovação, a apólice é emitida com todos os dados do contrato, licitação ou processo judicial. A entrega é rápida — muitas vezes no mesmo dia." },
        { step: "5", title: "Gestão e Renovação", description: "Acompanhamos prazos de vigência, necessidade de endossos (alterações) e renovações. Em caso de sinistro, damos suporte total ao segurado." },
      ]}
      coverages={[
        { title: "Garantia do Licitante (Bid Bond)", description: "Garante que a empresa vencedora da licitação assinará o contrato. Exigida no edital, geralmente entre 1% e 5% do valor estimado da contratação. Substitui caução em dinheiro ou fiança bancária." },
        { title: "Garantia do Executante (Performance Bond)", description: "Garante a execução do contrato conforme os termos pactuados. Cobre inadimplência do contratado em obras, fornecimentos e serviços. Geralmente de 5% a 30% do valor do contrato." },
        { title: "Garantia de Pagamento (Payment Bond)", description: "Garante o pagamento de subcontratados, fornecedores e mão de obra vinculados ao contrato principal. Comum em grandes obras de engenharia e infraestrutura." },
        { title: "Garantia Judicial", description: "Substitui o depósito judicial em ações cíveis, trabalhistas e tributárias. Permite que a empresa recorra ou garanta a execução sem imobilizar capital. Aceita em todos os tribunais do país." },
        { title: "Garantia Fiscal (Execução Fiscal)", description: "Garante o juízo em execuções fiscais federais, estaduais e municipais. Substitui penhora de bens, depósito em dinheiro e fiança bancária. Libera patrimônio que seria bloqueado." },
        { title: "Garantia Aduaneira", description: "Exigida pela Receita Federal em regimes aduaneiros especiais: admissão temporária, trânsito aduaneiro e drawback. Viabiliza operações de comércio exterior sem imobilizar capital." },
        { title: "Garantia para Concessões e PPPs", description: "Garante obrigações em contratos de concessão, permissão e parcerias público-privadas. Exigida em licitações de infraestrutura, saneamento, energia e transportes." },
        { title: "Garantia de Retenção de Pagamento (Maintenance Bond)", description: "Substitui a retenção contratual que o contratante faz sobre as medições. Libera o fluxo de caixa da empresa durante a execução da obra." },
      ]}
      coverageExclusions={[
        "Descumprimento contratual doloso (intencional) pelo tomador",
        "Obrigações não previstas no contrato ou edital garantido",
        "Multas de trânsito, ambientais ou regulatórias não vinculadas ao contrato",
        "Garantias retroativas (sinistros ocorridos antes da contratação do seguro)",
        "Obrigações trabalhistas diretas do tomador (salários, FGTS) — exceto quando previsto na apólice",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Garantia é significativamente menor que alternativas como fiança bancária ou depósito judicial. As taxas variam conforme modalidade, prazo, valor garantido e perfil da empresa.",
        factors: [
          "Modalidade — garantia judicial e fiscal costumam ter taxas menores que performance bond",
          "Valor da garantia — quanto maior o valor, menor tende a ser a taxa percentual",
          "Prazo — garantias de longo prazo (acima de 2 anos) têm custo proporcionalmente maior",
          "Saúde financeira da empresa — balanço sólido e bom faturamento reduzem a taxa",
          "Histórico de sinistros — empresas sem acionamentos anteriores pagam menos",
          "Segmento de atuação — construção civil e engenharia têm taxas específicas",
          "Contragarantias exigidas — menor exigência de contragarantia = menor custo total",
        ],
        note: "Em geral, o Seguro Garantia custa entre 0,5% e 3% do valor garantido por ano — contra 2% a 5% da fiança bancária. Para garantias judiciais, as taxas podem ser ainda menores (a partir de 0,4%/ano). Na Patro, negociamos as melhores condições com múltiplas seguradoras.",
      }}
      realScenarios={[
        { title: "Construtora garantiu licitação de R$ 12 milhões", description: "Uma construtora de Guarulhos precisava de garantia de 5% (R$ 600.000) para participar de licitação pública. Com fiança bancária, pagaria R$ 30.000/ano e comprometeria limite de crédito. Com Seguro Garantia pela Patro, pagou R$ 7.200/ano (1,2%) sem afetar o crédito bancário." },
        { title: "Indústria substituiu depósito judicial de R$ 2,5 milhões", description: "Uma indústria tinha R$ 2,5 milhões bloqueados em depósito judicial por execução fiscal. Com o Seguro Garantia Judicial, liberou o valor integral para capital de giro e pagou apenas R$ 15.000/ano de prêmio (0,6%). O dinheiro liberado gerou receita que cobriu várias vezes o custo do seguro." },
        { title: "Empresa de TI garantiu contrato com órgão federal", description: "Uma empresa de tecnologia venceu pregão de R$ 3 milhões para fornecimento de serviços ao governo. O contrato exigia garantia de 10% (R$ 300.000). O Seguro Garantia custou R$ 4.500/ano — contra R$ 15.000 que pagaria em fiança bancária." },
        { title: "Transportadora liberou caminhões penhorados", description: "Uma transportadora teve 3 caminhões penhorados em execução fiscal de R$ 800.000. Com Seguro Garantia Fiscal, substituiu a penhora dos veículos, que voltaram a operar e gerar receita. O custo do seguro foi de R$ 5.600/ano." },
      ]}
      importantDetails={[
        { title: "Seguro Garantia vs. Fiança Bancária — Comparativo", content: "A fiança bancária exige que a empresa tenha limite de crédito disponível no banco, compromete a capacidade de financiamento e custa entre 2% e 5% ao ano do valor garantido. O Seguro Garantia não consome limite bancário, custa de 0,5% a 3% ao ano e é aceito em todas as situações onde a fiança bancária é aceita.\n\nAlém disso, a emissão do Seguro Garantia é mais ágil — enquanto a fiança bancária pode levar semanas para aprovação, o Seguro Garantia pode ser emitido em dias." },
        { title: "Nova Lei de Licitações e o Seguro Garantia", content: "A Lei 14.133/2021 trouxe mudanças importantes para o Seguro Garantia. O artigo 102 permite que a Administração exija seguro garantia com cláusula de retomada — o que significa que, em caso de inadimplência do contratado, a seguradora pode assumir a execução do contrato, contratando nova empresa para concluir a obra ou serviço.\n\nIsso aumentou a relevância do Seguro Garantia em grandes obras públicas e tornou essencial contar com uma corretora especializada para negociar as melhores condições." },
        { title: "Contragarantias — O Que São e Como Funcionam", content: "Para emitir o Seguro Garantia, a seguradora pode exigir contragarantias do tomador: nota promissória, aval dos sócios, alienação fiduciária de bens ou carta de fiança de outra empresa do grupo. A necessidade e o tipo de contragarantia dependem do porte da operação e da saúde financeira da empresa.\n\nEmpresas com balanço sólido e bom histórico podem conseguir emissão com contragarantias simplificadas (apenas nota promissória). Na Patro, negociamos as melhores condições de contragarantia com as seguradoras." },
      ]}
      tips={[
        "Compare Seguro Garantia com fiança bancária — a economia pode chegar a 60% do custo anual.",
        "Mantenha o balanço patrimonial atualizado — balanços defasados atrasam a análise de crédito.",
        "Solicite a cotação com antecedência — especialmente para licitações com prazos curtos.",
        "Considere substituir depósitos judiciais antigos por Seguro Garantia para liberar capital.",
        "Negocie contragarantias — nem sempre é necessário oferecer garantias reais.",
        "Avise sobre alterações no contrato — aditivos precisam ser refletidos na apólice via endosso.",
      ]}
      whoNeeds={[
        "Empresas que participam de licitações públicas — municipais, estaduais e federais",
        "Construtoras e empresas de engenharia — obras públicas e privadas",
        "Empresas com execuções fiscais — federais, estaduais e municipais",
        "Empresas com ações judiciais — cíveis, trabalhistas e tributárias",
        "Fornecedores do governo — contratos administrativos de qualquer porte",
        "Empresas de comércio exterior — regimes aduaneiros especiais",
        "Concessionárias de serviços públicos — energia, saneamento, transportes",
        "Qualquer empresa que precise apresentar garantia sem descapitalizar",
      ]}
      whyPatro={[
        "Especialistas em Seguro Garantia para todas as modalidades — licitação, contrato, judicial, fiscal e aduaneiro",
        "Cotação com múltiplas seguradoras especializadas — garantia do melhor custo-benefício",
        "Agilidade na emissão — processos internos otimizados para entrega rápida",
        "Negociação de contragarantias — buscamos as condições mais favoráveis para sua empresa",
        "Acompanhamento de vigência e renovações — sem risco de vencimento sem aviso",
        "Suporte em sinistros — orientação completa caso a garantia seja acionada",
        "Experiência em grandes operações — licitações, obras públicas e execuções fiscais de alto valor",
      ]}
      faqs={[
        { question: "O que é Seguro Garantia?", answer: "É uma modalidade de seguro que funciona como garantia financeira. Substitui a fiança bancária, o depósito caução e outras formas tradicionais de garantia em contratos, licitações e processos judiciais. A seguradora garante ao beneficiário (contratante/juízo) que a obrigação será cumprida ou indenizada." },
        { question: "Quanto custa o Seguro Garantia?", answer: "Em geral, entre 0,5% e 3% do valor garantido por ano. Para uma garantia de R$ 1 milhão, o custo anual fica entre R$ 5.000 e R$ 30.000 — significativamente menos que a fiança bancária (2% a 5%) e sem comprometer limite de crédito bancário." },
        { question: "O Seguro Garantia substitui a fiança bancária?", answer: "Sim, em praticamente todas as situações: licitações, contratos públicos e privados, depósitos judiciais e execuções fiscais. A Lei de Licitações (14.133/2021) e o CPC expressamente preveem o Seguro Garantia como alternativa à fiança bancária." },
        { question: "Qualquer empresa pode contratar Seguro Garantia?", answer: "Em princípio, sim, mas a seguradora faz análise de crédito. Empresas com balanço patrimonial saudável, bom faturamento e histórico limpo conseguem melhores condições. Empresas em recuperação judicial podem ter dificuldade, mas há seguradoras especializadas." },
        { question: "Quanto tempo leva para emitir o Seguro Garantia?", answer: "Depende da complexidade. Garantias de licitação (bid bond) podem ser emitidas em 1 a 3 dias úteis. Garantias de execução (performance bond) e judiciais costumam levar de 3 a 7 dias úteis, dependendo da análise de crédito e documentação." },
        { question: "O que acontece se o seguro for acionado?", answer: "Se o tomador descumprir a obrigação garantida, o beneficiário aciona a seguradora, que indeniza até o limite da apólice. Depois, a seguradora cobra do tomador (direito de regresso). Por isso, o Seguro Garantia não é um 'fundo perdido' — o tomador continua responsável pela obrigação." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Engenharia", link: "/seguro-engenharia" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
      ]}
    />
  );
};

export default SeguroGarantia;
