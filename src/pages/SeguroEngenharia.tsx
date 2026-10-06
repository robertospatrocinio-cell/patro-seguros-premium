import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-engenharia.webp";

const engenhariaFormFields = [
  { id: "empresa", label: "Nome da empresa", placeholder: "Razão social ou nome fantasia", type: "text" as const },
  {
    id: "tipo_projeto",
    label: "Tipo de projeto",
    placeholder: "Selecione",
    type: "select" as const,
    options: [
      "Obra civil",
      "Instalação e montagem",
      "Obra civil + instalação e montagem",
      "Quebra de máquinas",
      "Equipamentos eletrônicos",
      "Danos na fabricação",
      "Outro",
    ],
  },
  { id: "local_risco", label: "Descrição e endereço do local de risco", placeholder: "Ex: galpão industrial, Rua..., Cidade/UF", type: "text" as const },
  { id: "datas", label: "Datas previstas de início e término", placeholder: "Ex: 03/2027 a 12/2027", type: "text" as const },
  { id: "valor_risco", label: "Valor total do contrato e/ou valor em risco", placeholder: "Ex: R$ 2 milhões", type: "text" as const },
  { id: "etapa_atual", label: "Etapa atual do projeto", placeholder: "Ex: fundações, estrutura, montagem", type: "text" as const },
  {
    id: "fase_testes",
    label: "Há fase de testes ou comissionamento?",
    placeholder: "Selecione",
    type: "select" as const,
    options: ["Sim", "Não", "Não sei informar"],
  },
  {
    id: "atividades_especiais",
    label: "Há fundações, escavações, túneis, perfuração ou trabalho sobre água?",
    placeholder: "Selecione",
    type: "select" as const,
    options: ["Sim", "Não", "Não sei informar"],
  },
  { id: "equipamentos", label: "Máquinas, equipamentos ou ferramentas a considerar", placeholder: "Ex: guindaste, gerador, ferramentas", type: "text" as const },
  {
    id: "bens_preexistentes",
    label: "Há bens preexistentes ou imóveis vizinhos expostos?",
    placeholder: "Selecione",
    type: "select" as const,
    options: ["Sim", "Não", "Não sei informar"],
  },
  {
    id: "interesse_rc",
    label: "Interesse em cobertura de Responsabilidade Civil?",
    placeholder: "Selecione",
    type: "select" as const,
    options: ["Sim", "Não", "Quero entender melhor"],
  },
];

const SeguroEngenharia = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Engenharia: Riscos de Engenharia, Obras Civis e Instalação e Montagem"
      headline="Sua obra e seus equipamentos merecem proteção pensada para cada etapa"
      subtitle="Obras e montagens expõem bens, materiais, estruturas e máquinas a acidentes. O Seguro de Engenharia pode amparar prejuízos materiais aos bens descritos na apólice, quando decorrentes de riscos cobertos, observados os limites, franquias e condições contratados."
      icon="🏗️"
      metaDescription="Seguro de Engenharia e Riscos de Engenharia para obras civis, instalação e montagem, quebra de máquinas e equipamentos eletrônicos. Solicite cotação com a Patro Seguros."
      description="O Seguro de Riscos de Engenharia é voltado a construtoras, incorporadoras, indústrias, instaladores, montadores e proprietários de empreendimentos. Ele pode proteger bens e trabalhos segurados contra danos materiais decorrentes de acidentes cobertos, conforme o projeto, as garantias contratadas e as condições da apólice."
      detailedDescription={`Cada projeto de engenharia tem etapas, bens e riscos próprios. Por isso, o seguro é estruturado a partir da descrição da obra ou da montagem: o que será construído ou instalado, onde, em que prazo e com quais máquinas, materiais e etapas.

A cobertura básica de Obras Civis em Construção e/ou Instalação e Montagem (OCC/IM) pode amparar danos materiais aos bens descritos na apólice, causados por acidentes de origem externa, súbita, imprevista e involuntária durante as etapas seguradas. Podem ser incluídos a obra descrita, os materiais destinados a ela e máquinas, equipamentos ou estruturas instalados ou montados de forma permanente, quando especificados na apólice.

As condições consultadas também tratam da remoção de entulho necessária para reparar ou repor bens danificados por evento coberto, dentro dos percentuais ou limites definidos. A remoção de entulho também pode ser reforçada por cobertura adicional.

Exemplo hipotético: um evento súbito danifica parte da estrutura e dos materiais segurados no canteiro. A eventual indenização depende de o bem, o local, a etapa e o evento estarem cobertos.

Essa modalidade protege principalmente os bens do próprio projeto. Danos a terceiros dependem da contratação das coberturas de Responsabilidade Civil correspondentes.

A Patro Seguros ajuda a reunir os dados técnicos do projeto, comparar alternativas entre seguradoras parceiras e estruturar limites e franquias coerentes com o risco. Modalidades, bens elegíveis e coberturas variam conforme o projeto e a análise da seguradora.`}
      howItWorks={[
        { step: "1", title: "Dados do projeto", description: "Você informa tipo de projeto, local, prazo, valor em risco, etapas, máquinas e equipamentos envolvidos." },
        { step: "2", title: "Estrutura da proteção", description: "Definimos com você a modalidade e as coberturas adicionais que fazem sentido para o projeto." },
        { step: "3", title: "Análise da seguradora", description: "A proposta é enviada para análise e aceitação do risco, que define condições, limites e franquias." },
        { step: "4", title: "Acompanhamento", description: "Acompanhamos mudanças de cronograma, valor ou escopo e o atendimento em caso de sinistro." },
      ]}
      coverages={[
        { title: "Cobertura básica OCC/IM", description: "Obras Civis em Construção e/ou Instalação e Montagem: pode amparar danos materiais aos bens descritos na apólice, causados por acidentes de origem externa, súbita, imprevista e involuntária durante as etapas seguradas." },
        { title: "Obras Civis", description: "Proteção para riscos de engenharia durante a implantação de projetos de construção civil. Bens e etapas precisam estar descritos e aceitos na apólice." },
        { title: "Instalação e Montagem", description: "Para riscos dos processos de instalação, montagem, testes e manutenção de equipamentos em prédios, obras, infraestrutura ou indústrias. Nem todas as fases ou períodos de teste estão incluídos automaticamente." },
        { title: "Obras Civis + Instalação e Montagem", description: "Pode reunir as duas soluções em um único programa ou apólice, para projetos que combinam essas etapas, conforme contratação e aceitação." },
        { title: "Quebra de Máquinas e Equipamentos", description: "Voltada a danos internos acidentais em máquinas e equipamentos importantes para a operação. É diferente da cobertura de danos durante instalação ou montagem." },
        { title: "Equipamentos Eletrônicos", description: "Para danos de natureza interna ou externa a equipamentos eletrônicos e tecnológicos, conforme o produto contratado e os bens descritos." },
        { title: "Danos na Fabricação", description: "Pode se aplicar a bens de alto valor individual em processamento, sujeitos a eventos externos cobertos, observadas as condições contratuais." },
        { title: "Responsabilidade Civil (adicional)", description: "RC Geral, RC Cruzada e RC do Empregador para riscos de engenharia, com limites próprios. Protegem terceiros, não a obra. Dependem de contratação." },
      ]}
      coverageExclusions={[
        "Bens, locais, períodos ou etapas não descritos e aceitos na apólice",
        "Desgaste, deterioração gradual e defeitos de fabricação ou material, conforme as condições",
        "Custos para corrigir erro de projeto ou defeito original",
        "Paralisação da obra e perdas financeiras não previstas na apólice",
        "Fase de testes, comissionamento ou operação não informada e aceita",
        "Obrigações contratuais (tratadas pelo Seguro Garantia, que é outro produto)",
      ]}
      realScenarios={[
        { title: "Exemplo hipotético: dano no canteiro", description: "Um evento súbito danifica parte da estrutura e dos materiais segurados. O caso pode ser analisado na cobertura básica, se o bem, o local, a etapa e o evento estiverem cobertos." },
        { title: "Exemplo hipotético: equipamento durante a montagem", description: "Um equipamento novo sofre dano acidental enquanto é montado. A análise depende de o equipamento estar descrito e de a etapa estar segurada." },
        { title: "Exemplo hipotético: dano ao vizinho", description: "Uma escavação atinge o muro de um imóvel vizinho. Esse caso depende de cobertura de Responsabilidade Civil contratada, não da cobertura dos bens da obra." },
      ]}
      importantDetails={[
        { title: "Coberturas adicionais: ferramentas, máquinas e equipamentos de apoio", content: "Ferramentas de pequeno e médio porte (roubo ou furto mediante arrombamento, com requisitos de guarda e vigilância); equipamentos móveis e/ou estacionários usados na obra e não incorporados a ela; equipamentos de informática e de escritório usados no local de risco; armazenagem fora do canteiro, nos locais informados. Todas dependem de elegibilidade, contratação expressa, prêmio correspondente, aceitação e limites específicos." },
        { title: "Coberturas adicionais: obra, etapas e bens relacionados", content: "Danos em consequência de erro de projeto (os custos para corrigir o erro original podem estar excluídos); riscos do fabricante para máquinas e equipamentos novos; tumultos, greves e lockout; despesas de desentulho; despesas extraordinárias; propriedades preexistentes no canteiro; manutenção simples e manutenção ampla; afretamento de aeronaves; obras concluídas usadas como apoio; honorários de peritos; fase de testes de instalação e montagem; incêndio até 30 dias após o término da obra; obras temporárias; obras aceitas ou colocadas em operação; recomposição de documentos; perfuração de poços de água; pesquisa de vazamento na colocação de tubulações. A disponibilidade varia por modalidade e seguradora — confirme na cotação e na apólice." },
        { title: "Responsabilidade Civil dentro do Seguro de Engenharia", content: "Apresentada separadamente da proteção dos bens da obra: RC Geral – Riscos de Engenharia (danos materiais e/ou corporais a terceiros); RC Cruzada (reclamações entre empreiteiros, subempreiteiros e demais participantes); RC do Empregador (acidentes corporais com trabalhadores, com critérios próprios); danos morais decorrentes dessas coberturas; e defesa em juízo civil, conforme previsto nas condições. As coberturas de RC têm limites próprios, que podem não se somar a outros limites da apólice." },
        { title: "Benefícios para sua empresa", content: "Proteção financeira para prejuízos materiais a bens e etapas segurados em eventos cobertos; apólice adequada às características do projeto; opções adicionais para exposições específicas; possibilidade de reunir etapas ou tipos de risco em uma única estrutura; mais previsibilidade nos custos de um acidente coberto; apoio do corretor na escolha de limites e franquias; e possibilidade de incluir RC para danos a terceiros, quando contratada." },
        { title: "O que entender antes de contratar", content: "A apólice cobre somente riscos, bens, locais, períodos e etapas especificados e aceitos. Cada cobertura pode ter Limite Máximo de Indenização (LMI), Limite Máximo de Garantia (LMG), limite agregado, franquia e requisitos próprios. Coberturas adicionais não são automáticas e podem exigir prêmio adicional. Valores declarados incorretamente, etapas omitidas, alterações no risco e falta de medidas de segurança podem afetar a cobertura. Riscos de Engenharia não se confunde com Seguro Garantia nem com RC Geral contratado isoladamente." },
        { title: "Aviso contratual", content: "Conteúdo informativo. A contratação depende de análise e aceitação do risco. As coberturas, bens, locais, períodos, limites, franquias, exclusões e obrigações aplicáveis são aqueles indicados na proposta aceita, na apólice e nas condições gerais e especiais vigentes. Este conteúdo não substitui os documentos contratuais nem garante indenização." },
      ]}
      tips={[
        "Contrate antes do início das atividades no local",
        "Descreva todos os bens, etapas, máquinas e equipamentos que precisam de proteção",
        "Informe fase de testes, comissionamento e entrada em operação",
        "Comunique à seguradora mudanças de cronograma, valor ou escopo",
        "Em caso de sinistro, comunique a Patro Seguros e a seguradora o quanto antes e preserve fotos e documentos",
      ]}
      whoNeeds={[
        "Construtoras e incorporadoras com obras civis em andamento",
        "Reformas, ampliações e implantação de infraestrutura",
        "Indústrias, instaladores e montadores de máquinas, equipamentos e estruturas",
        "Projetos que combinam construção civil e montagem",
        "Empresas com máquinas e equipamentos essenciais à operação",
        "Proprietários de equipamentos eletrônicos técnicos, industriais, hospitalares ou laboratoriais, conforme aceitação",
      ]}
      whyPatro={[
        "Levantamento dos dados técnicos necessários para a cotação",
        "Comparação de alternativas entre seguradoras parceiras",
        "Orientação sobre limites, franquias e coberturas adicionais",
        "Acompanhamento de alterações do projeto e de sinistros",
      ]}
      quoteFormFields={engenhariaFormFields}
      quoteCtaText="Solicite uma cotação para o seu projeto"
      faqs={[
        { question: "O que é o Seguro de Riscos de Engenharia?", answer: "É um seguro que pode proteger bens e trabalhos de obras e montagens contra danos materiais causados por acidentes cobertos, conforme a apólice e as condições contratadas." },
        { question: "Qual a diferença entre Obras Civis e Instalação e Montagem?", answer: "Obras Civis trata da construção. Instalação e Montagem trata da instalação, montagem e testes de máquinas, equipamentos e estruturas. As duas podem ser reunidas em uma única apólice, conforme aceitação." },
        { question: "O seguro cobre danos à própria obra?", answer: "Pode cobrir danos materiais aos bens da obra descritos na apólice, quando causados por evento coberto, durante as etapas seguradas." },
        { question: "Materiais de construção podem ser incluídos?", answer: "Sim, materiais destinados à obra podem ser incluídos quando especificados na apólice. Confira na proposta quais bens estão descritos." },
        { question: "Máquinas e equipamentos usados na obra estão automaticamente cobertos?", answer: "Não. Equipamentos de apoio que não são incorporados à obra dependem de cobertura adicional e precisam estar discriminados na apólice." },
        { question: "A fase de testes e comissionamento está coberta?", answer: "Não automaticamente. A fase de testes precisa ser informada e aceita, dentro do prazo e dos requisitos descritos na apólice." },
        { question: "Erro de projeto está coberto?", answer: "Pode haver cobertura adicional para danos materiais causados por erro de projeto. Os custos para corrigir o erro original podem estar excluídos. Confira as condições aplicáveis." },
        { question: "O seguro cobre defeitos de fabricação ou execução?", answer: "Defeitos de fabricação, de material ou de execução podem estar excluídos ou ter tratamento específico. A cobertura de riscos do fabricante, quando disponível, tem condições próprias." },
        { question: "Danos a imóveis vizinhos estão cobertos?", answer: "Danos a terceiros, como imóveis vizinhos, dependem da contratação de Responsabilidade Civil. Propriedades preexistentes no canteiro têm cobertura adicional própria." },
        { question: "Como funciona a cobertura de Responsabilidade Civil?", answer: "É contratada à parte da proteção dos bens, com limites próprios. Pode incluir RC Geral, RC Cruzada e RC do Empregador, conforme as condições contratadas." },
        { question: "Como são definidos LMI, LMG, franquia e rateio?", answer: "São definidos na proposta e na apólice, a partir dos valores declarados e da análise da seguradora. Valores declarados abaixo do real podem levar a rateio. Peça ao corretor que explique cada item antes de contratar." },
        { question: "O que acontece se o cronograma da obra mudar?", answer: "Mudanças de prazo, valor ou escopo devem ser comunicadas à seguradora para avaliação e eventual ajuste da apólice. Alterações não informadas podem afetar a cobertura." },
        { question: "Que informações preciso para cotar?", answer: "Tipo de projeto, local de risco, datas previstas, valor do contrato ou valor em risco, etapas, fase de testes, atividades especiais, máquinas e equipamentos, bens vizinhos expostos e interesse em RC." },
        { question: "O que devo fazer em caso de sinistro?", answer: "Tome medidas para evitar o agravamento dos danos, registre o ocorrido com fotos e documentos e comunique a Patro Seguros e a seguradora o quanto antes, seguindo o que a apólice determina." },
      ]}
      relatedInsurances={[
        { title: "RC Obras e Montagem", link: "/seguro-rc-obras" },
        { title: "Seguro RC Engenheiros", link: "/seguro-rc-engenheiros" },
        { title: "Seguro de Máquinas", link: "/seguro-maquinas" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroEngenharia;
