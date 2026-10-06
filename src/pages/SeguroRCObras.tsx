import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const rcObrasFormFields = [
  { id: "empresa", label: "Nome da empresa", placeholder: "Razão social ou nome fantasia", type: "text" as const },
  {
    id: "tipo_obra",
    label: "Tipo de obra ou serviço",
    placeholder: "Selecione",
    type: "select" as const,
    options: ["Obra civil / construção", "Reforma", "Instalação e montagem", "Desmontagem", "Outro serviço relacionado"],
  },
  { id: "cidade_obra", label: "Endereço ou cidade da obra", placeholder: "Ex: Guarulhos/SP", type: "text" as const },
  { id: "prazo", label: "Prazo previsto da obra", placeholder: "Ex: 6 meses", type: "text" as const },
  { id: "valor_contrato", label: "Valor estimado do contrato", placeholder: "Ex: R$ 500 mil", type: "text" as const },
  {
    id: "atividades_especiais",
    label: "Há fundações, escavações ou atividades especiais?",
    placeholder: "Selecione",
    type: "select" as const,
    options: ["Sim", "Não", "Não sei informar"],
  },
  {
    id: "subempreiteiros",
    label: "Usa empreiteiros ou subempreiteiros?",
    placeholder: "Selecione",
    type: "select" as const,
    options: ["Sim", "Não", "Ainda não definido"],
  },
];

const SeguroRCObras = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Responsabilidade Civil para Obras Civis e Serviços de Montagem"
      headline="Proteja sua empresa dos imprevistos durante a obra"
      subtitle="Obras, reformas e serviços de instalação e montagem podem causar danos a clientes, vizinhos, visitantes, prestadores ou propriedades de terceiros. O seguro pode amparar a responsabilidade civil da sua empresa por acidentes cobertos, conforme as garantias contratadas e as condições da apólice."
      icon="🏗️"
      metaDescription="Seguro de Responsabilidade Civil para Obras Civis e Serviços de Montagem: proteção para danos a terceiros durante a obra, com coberturas adicionais. Solicite cotação."
      description="O Seguro de Responsabilidade Civil para Obras Civis e Serviços de Montagem é voltado a empresas e profissionais que executam obras, reformas, instalações e montagens. O foco é amparar a responsabilidade civil da empresa por danos materiais e corporais causados a terceiros em acidentes cobertos, conforme as condições da apólice."
      detailedDescription={`Todo canteiro de obras envolve riscos para quem está ao redor: vizinhos, clientes, visitantes, pedestres e outros prestadores. Um acidente durante a execução pode gerar reclamações de terceiros e impacto financeiro relevante para a empresa responsável pela obra ou pelo serviço.

A base do produto é a Responsabilidade Civil Básica, obrigatória para a contratação das coberturas adicionais. Ela pode amparar danos materiais e corporais causados a terceiros em decorrência de acidentes durante a execução da obra ou do serviço declarado na apólice.

A partir dela, a empresa pode escolher coberturas adicionais conforme a atividade, o local e os riscos envolvidos. Cada cobertura depende de contratação expressa, com limites, franquias e exclusões definidos na apólice.

A Patro Seguros analisa o tipo de obra, o local, o prazo e a forma de execução para ajudar sua empresa a montar a proposta adequada e enviá-la para análise e aceitação da seguradora.`}
      howItWorks={[
        { step: "1", title: "Envio das informações", description: "Você informa tipo de obra ou serviço, local, prazo, valor estimado do contrato e uso de empreiteiros ou subempreiteiros." },
        { step: "2", title: "Escolha das coberturas", description: "Definimos com você a cobertura básica e as coberturas adicionais adequadas à atividade e aos riscos da obra." },
        { step: "3", title: "Análise da seguradora", description: "A proposta é enviada para análise e aceitação do risco, que define condições, limites e franquias." },
        { step: "4", title: "Acompanhamento", description: "Acompanhamos a vigência, eventuais alterações da obra e o atendimento em caso de acidente." },
      ]}
      coverages={[
        { title: "Responsabilidade Civil Básica (obrigatória)", description: "Pode amparar danos materiais e corporais causados a terceiros em acidentes durante a execução da obra ou serviço declarado na apólice. É obrigatória para contratar as coberturas adicionais." },
        { title: "Danos Morais e/ou Estéticos", description: "Pode reembolsar indenizações por danos morais ou estéticos a terceiros, quando decorram diretamente de danos materiais ou corporais cobertos. Exemplo hipotético: lesão em visitante que gera também pedido de dano moral. Depende de contratação e dos termos da apólice." },
        { title: "Erro de Projeto", description: "Pode amparar danos materiais ou corporais causados a terceiros por erro de projeto relacionado à obra ou serviço segurado. Não é garantia para retrabalho, correção do próprio projeto ou defeitos da própria obra. Depende de contratação e dos termos da apólice." },
        { title: "Lucros Cessantes decorrentes de RC", description: "Pode cobrir perdas financeiras diretas de terceiros que decorram de danos materiais ou corporais cobertos. Exemplo hipotético: comércio vizinho que precisa fechar após dano coberto. Não cobre queda de faturamento da própria empresa segurada." },
        { title: "Objetos Pessoais de Empregados", description: "Pode amparar danos a objetos pessoais de empregados sob a guarda da empresa segurada. Veículos, extravio, furto ou roubo podem estar excluídos conforme as condições aplicáveis." },
        { title: "Danos Materiais ao Proprietário da Obra", description: "Pode amparar danos acidentais a prédios ou instalações preexistentes, ou já concluídas e entregues, enquanto outros serviços continuam no local. Bens que estejam sendo trabalhados, manipulados ou transportados podem ser excluídos." },
        { title: "Derramamento, Infiltração e/ou Descarga de Água", description: "Pode amparar danos materiais a terceiros, como imóveis vizinhos e seus conteúdos, por eventos de água ligados à obra. Não há cobertura automática para mofo, umidade, danos graduais, falha profissional ou execução defeituosa." },
        { title: "Responsabilidade Civil Cruzada", description: "Pode amparar danos materiais ou corporais causados a empreiteiros, subempreiteiros ou outros terceiros que atuem na obra. As empresas envolvidas e os limites devem estar corretamente declarados." },
        { title: "RC Riscos Contingentes de Veículos", description: "Pode amparar a responsabilidade da empresa por danos a terceiros causados por veículo de empregado usado eventualmente a serviço. Não substitui o seguro auto e exclui, entre outros, veículos da própria empresa ou uso inerente à função." },
      ]}
      coverageExclusions={[
        "Danos à própria obra",
        "Materiais, ferramentas, máquinas e equipamentos da empresa",
        "Retrabalho, correção de defeitos ou garantia de desempenho da obra",
        "Qualquer acidente, independentemente das coberturas contratadas",
        "Obrigações trabalhistas, previdenciárias ou seguros obrigatórios",
      ]}
      realScenarios={[
        { title: "Exemplo hipotético: queda de material", description: "Durante a obra, um material cai acidentalmente e danifica o carro de um vizinho. A situação pode ser analisada na cobertura básica, conforme as condições da apólice." },
        { title: "Exemplo hipotético: lesão em visitante", description: "Uma pessoa que passava pelo local sofre lesão corporal em um acidente ligado ao serviço. O caso pode ser analisado pela seguradora, sem garantia de indenização automática." },
        { title: "Exemplo hipotético: vazamento para o vizinho", description: "Uma tubulação rompe durante uma reforma e a água atinge o apartamento de baixo. Se contratada a cobertura de água, o evento pode ser analisado nos termos da apólice." },
      ]}
      importantDetails={[
        { title: "Não confunda com seguro da obra", content: "Esta modalidade é de Responsabilidade Civil e tem foco em danos a terceiros. A proteção da própria obra, dos materiais e dos equipamentos pode exigir outro produto, como o seguro de Riscos de Engenharia." },
        { title: "Benefícios para a empresa", content: "Ajuda a administrar o impacto financeiro de reclamações de terceiros por acidentes cobertos, permite escolher coberturas adicionais conforme a atividade, pode considerar danos causados por empreiteiros e subempreiteiros conforme o contrato, pode prever despesas emergenciais para evitar ou reduzir danos cobertos e traz mais previsibilidade à gestão de riscos." },
        { title: "Aviso contratual", content: "Conteúdo informativo. As coberturas dependem de análise e aceitação do risco, contratação expressa, limites, franquias, exclusões e demais condições da apólice. Este conteúdo não substitui a proposta, a apólice nem as condições gerais e especiais vigentes." },
      ]}
      tips={[
        "Contrate antes do início das atividades no local",
        "Declare corretamente empreiteiros e subempreiteiros envolvidos",
        "Informe à seguradora mudanças de prazo, valor ou escopo da obra",
        "Registre com fotos a situação de imóveis vizinhos antes de começar",
        "Após um acidente, comunique a corretora e a seguradora o quanto antes e não assuma responsabilidade sem orientação",
      ]}
      whoNeeds={[
        "Empresas que executam obras civis e reformas em locais de terceiros",
        "Empresas de instalação, montagem e desmontagem",
        "Atividades de construção e serviços relacionados, conforme aceitação do risco",
        "Empresas que trabalham com empreiteiros e subempreiteiros, quando declarados na apólice",
      ]}
      whyPatro={[
        "Análise do tipo de obra, local e riscos antes da proposta",
        "Orientação na escolha da cobertura básica e das adicionais",
        "Comparação entre seguradoras parceiras",
        "Apoio na comunicação e acompanhamento de sinistros",
      ]}
      quoteFormFields={rcObrasFormFields}
      quoteCtaText="Solicite uma cotação para sua obra"
      faqs={[
        { question: "O seguro cobre a própria obra e os materiais?", answer: "Não. Esta modalidade é de Responsabilidade Civil e foca em danos a terceiros. A obra, materiais e equipamentos podem ser protegidos por outro produto, como Riscos de Engenharia, conforme análise da seguradora." },
        { question: "A cobertura básica é obrigatória?", answer: "Sim. A Responsabilidade Civil Básica é obrigatória para contratar as coberturas adicionais." },
        { question: "As coberturas adicionais são automáticas?", answer: "Não. Cada cobertura adicional depende de contratação expressa e tem limites e condições próprios definidos na apólice." },
        { question: "Qualquer dano ocorrido no canteiro será indenizado?", answer: "Não. A indenização depende de o evento estar coberto, das garantias contratadas, dos limites, franquias e exclusões, e da análise da seguradora." },
        { question: "O seguro cobre danos ao proprietário do imóvel?", answer: "Pode cobrir, com a cobertura adicional de Danos Materiais ao Proprietário da Obra, para instalações preexistentes ou já entregues. Bens que estejam sendo trabalhados ou manipulados podem ser excluídos." },
        { question: "Empreiteiros e subempreiteiros podem estar contemplados?", answer: "Sim, quando declarados e aceitos nos termos da apólice. A cobertura de RC Cruzada pode amparar danos causados a eles, conforme contratação." },
        { question: "Erro de projeto cobre retrabalho?", answer: "Não. A cobertura de Erro de Projeto pode amparar danos a terceiros causados pelo erro, mas não cobre retrabalho, correção do projeto ou defeitos da própria obra." },
        { question: "Como funcionam limites, sublimites e franquias?", answer: "O limite é o valor máximo da indenização por cobertura; sublimites restringem valores em situações específicas; a franquia é a parte do prejuízo que fica com a empresa. Todos são definidos na apólice." },
        { question: "O que devo fazer depois de um acidente?", answer: "Preste socorro se necessário, registre o ocorrido com fotos e documentos, comunique a Patro Seguros e a seguradora o quanto antes e evite assumir responsabilidade ou fazer acordos sem orientação." },
        { question: "Como solicitar uma cotação?", answer: "Preencha o formulário desta página com dados da empresa e da obra. A análise final depende da proposta, da apólice, das condições gerais e especiais e da avaliação da seguradora." },
      ]}
      relatedInsurances={[
        { title: "Seguro Engenharia (Riscos de Engenharia)", link: "/seguro-engenharia" },
        { title: "Seguro RC Geral", link: "/seguro-rc" },
        { title: "Seguro RC Engenheiros", link: "/seguro-rc-engenheiros" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroRCObras;
