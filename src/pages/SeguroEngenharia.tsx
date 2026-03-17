import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-engenharia.webp";

const SeguroEngenharia = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Garantia e Riscos de Engenharia"
      subtitle="Proteção completa para obras e projetos de construção"
      icon="🏗️"
      metaDescription="Seguro de Engenharia e Garantia para obras civis e montagens industriais. Risco de engenharia, RC e seguro garantia. Cotação grátis Patro Seguros."
      description="Os Seguros de Engenharia protegem obras de construção civil, montagens industriais e projetos de infraestrutura contra diversos riscos durante e após a execução."
      detailedDescription={`Obras de construção civil e montagens industriais envolvem investimentos milionários e riscos complexos: desmoronamentos, incêndios, erros de projeto, danos a propriedades vizinhas, acidentes com trabalhadores e fenômenos naturais podem transformar um projeto lucrativo em prejuízo catastrófico.

Os Seguros de Engenharia abrangem diversas modalidades, cada uma com finalidade específica. O Risco de Engenharia (RE) protege a obra física durante a construção. O Seguro Garantia assegura o cumprimento de obrigações contratuais. O RC Obras cobre danos a terceiros durante a execução.

Para obras públicas e licitações, o Seguro Garantia é frequentemente exigido como pré-requisito. Substituindo caução e fiança bancária, o seguro libera capital de giro da construtora, que pode ser investido na própria obra.

Na Patro Seguros, contamos com expertise técnica em seguros de engenharia e trabalhamos com seguradoras especializadas para oferecer as coberturas adequadas a cada tipo de projeto.`}
      howItWorks={[
        { step: "1", title: "Análise do Projeto", description: "Avaliamos tipo de obra, valor do contrato, prazo, localização e riscos específicos do projeto" },
        { step: "2", title: "Definição das Modalidades", description: "Identificamos quais seguros são necessários: RE, Garantia, RC Obras, Equipamentos, etc." },
        { step: "3", title: "Emissão Ágil", description: "Emitimos as apólices com rapidez para não atrasar o início da obra ou a participação em licitação" },
        { step: "4", title: "Acompanhamento da Obra", description: "Monitoramos vigências, prazos e aditivos, atualizando coberturas conforme a evolução do projeto" },
      ]}
      coverages={[
        { title: "Riscos de Engenharia (Obras Civis)", description: "Cobertura para danos durante construção ou reforma" },
        { title: "Seguro Garantia", description: "Garantia de cumprimento de contratos e obrigações" },
        { title: "Equipamentos e Máquinas", description: "Proteção para maquinário utilizado na obra" },
        { title: "Responsabilidade Civil", description: "Cobre danos a terceiros e propriedades vizinhas" },
        { title: "Período de Manutenção", description: "Cobertura após entrega da obra durante garantia" },
        { title: "Tumultos e Greves", description: "Proteção contra danos causados por manifestações" },
        { title: "Erro de Projeto", description: "Cobertura para falhas no projeto executivo" },
        { title: "Instalações Provisórias", description: "Proteção para canteiros, escritórios e alojamentos" },
      ]}
      coverageExclusions={[
        "Desgaste natural de materiais e equipamentos",
        "Defeitos preexistentes nos materiais",
        "Perdas financeiras por atrasos (sem cobertura de lucros cessantes)",
        "Danos causados por falta de manutenção preventiva",
        "Multas contratuais (cobertas pelo Seguro Garantia, não pelo RE)",
        "Projetos sem aprovação dos órgãos competentes",
      ]}
      pricingInfo={{
        intro: "O custo varia conforme o tipo de obra, valor do contrato e modalidades de seguro necessárias.",
        factors: [
          "Valor total da obra ou contrato",
          "Tipo de obra (residencial, comercial, infraestrutura)",
          "Prazo de execução",
          "Localização e condições do terreno",
          "Histórico da construtora",
          "Modalidades contratadas (RE, Garantia, RC)",
        ],
        note: "Seguro Garantia: taxa de 0,5% a 3% do valor garantido/ano. Uma obra de R$ 5 milhões pode ter Seguro Garantia por R$ 25.000 a R$ 150.000. Risco de Engenharia: 0,1% a 0,5% do valor da obra.",
      }}
      realScenarios={[
        { title: "Desabamento parcial durante obra", description: "Uma laje em construção desabou parcialmente, danificando estruturas e equipamentos. O RE cobriu R$ 800.000 em reconstrução e remoção de escombros, além de R$ 150.000 em RC por danos ao muro do vizinho." },
        { title: "Seguro Garantia em licitação", description: "Uma construtora precisava de garantia de R$ 2 milhões para participar de licitação pública. O Seguro Garantia foi emitido em 48h por R$ 30.000, liberando o capital de giro da empresa." },
        { title: "Incêndio no canteiro de obras", description: "Um incêndio destruiu o almoxarifado e instalações provisórias de uma obra. O seguro cobriu R$ 250.000 em materiais, equipamentos e reconstrução das instalações." },
      ]}
      importantDetails={[
        { title: "Seguro Garantia em licitações", content: "A Nova Lei de Licitações (14.133/2021) ampliou a exigência de Seguro Garantia em obras públicas. Ter um bom relacionamento com seguradoras é vantagem competitiva para construtoras que participam de licitações." },
        { title: "Período de manutenção", content: "A cobertura pode se estender por 12 a 24 meses após a entrega da obra, protegendo contra defeitos de construção que se manifestem durante o período de garantia." },
        { title: "Aditivos contratuais", content: "Se a obra sofrer alterações de valor ou prazo, as apólices devem ser atualizadas via endosso. Obras com aditivos não comunicados à seguradora podem ter cobertura comprometida." },
      ]}
      tips={[
        "Contrate os seguros antes do início da obra — muitos contratos exigem como pré-requisito para liberação do canteiro",
        "Informe à seguradora sobre qualquer aditivo de prazo ou valor para manter a cobertura atualizada",
        "Mantenha documentação fotográfica da evolução da obra — fundamental para sinistros",
        "Para licitações, inicie o processo de Seguro Garantia com antecedência — algumas modalidades levam 5 a 10 dias úteis",
        "Considere incluir cobertura para erro de projeto se trabalha com projetos complexos",
      ]}
      whoNeeds={[
        "Construtoras e incorporadoras",
        "Empresas de engenharia civil",
        "Empreiteiras e subempreiteiras",
        "Empresas de montagem industrial",
        "Empresas de infraestrutura",
        "Órgãos públicos que contratam obras",
      ]}
      whyPatro={[
        "Conhecimento técnico em seguros de engenharia",
        "Análise de riscos específicos de cada projeto",
        "Orientação sobre modalidades adequadas",
        "Suporte em processos licitatórios",
        "Emissão rápida de apólices",
        "Parcerias com seguradoras especializadas",
      ]}
      faqs={[
        { question: "O que é Seguro Garantia?", answer: "É a garantia exigida em contratos públicos e privados que assegura o cumprimento das obrigações contratuais. Substitui caução e fiança bancária." },
        { question: "Quando devo contratar o seguro de obras?", answer: "Antes do início da obra. Muitos contratos exigem o seguro como pré-requisito para liberação do canteiro." },
        { question: "Quanto custa o seguro de engenharia?", answer: "RE: 0,1% a 0,5% do valor da obra. Seguro Garantia: 0,5% a 3% do valor garantido ao ano." },
        { question: "Cobre erro de projeto?", answer: "Sim, há coberturas específicas para erro de projeto, mas geralmente com limitações e franquias." },
        { question: "O seguro cobre a obra toda?", answer: "Sim! Cobre estrutura, materiais, equipamentos e até instalações provisórias, dependendo das coberturas contratadas." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC", link: "/seguro-rc" },
        { title: "Seguro de Máquinas", link: "/seguro-maquinas" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroEngenharia;
