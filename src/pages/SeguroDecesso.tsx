import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroDecesso = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Decesso"
      subtitle="Assistência funeral completa para colaboradores e seus familiares"
      icon="🕊️"
      metaDescription="Seguro Decesso empresarial com assistência funeral completa para colaboradores e familiares. Cobertura para funeral, traslado e repatriação. Cotação grátis Patro Seguros."
      description="O Seguro Decesso é um benefício corporativo que garante assistência funeral completa aos colaboradores da empresa e seus dependentes. Cobre todas as despesas e providências necessárias no momento mais difícil, oferecendo suporte logístico, emocional e financeiro à família enlutada."
      detailedDescription={`A perda de um colaborador ou familiar é um momento de extrema fragilidade emocional. Além da dor, a família precisa lidar com uma série de providências burocráticas e custos elevados: documentação, preparação do corpo, velório, sepultamento ou cremação, traslado — tudo precisa ser resolvido em poucas horas.

O Seguro Decesso empresarial retira esse peso dos ombros da família e da empresa. A seguradora assume toda a logística e os custos do funeral, desde a remoção do corpo até o sepultamento ou cremação, incluindo traslado interestadual quando necessário.

Para a empresa, oferecer o Seguro Decesso é um diferencial de gestão de pessoas. Demonstra cuidado genuíno com o colaborador e sua família, contribui para a retenção de talentos e fortalece a cultura organizacional. O custo por colaborador é extremamente acessível — muitas vezes inferior a R$ 5/mês por vida — tornando-se um dos benefícios com melhor custo-benefício do mercado.

O seguro pode ser contratado para o titular (colaborador), cônjuge, filhos e pais, com diferentes planos de cobertura que vão do básico (funeral simples) ao premium (funeral completo com serviços adicionais como floricultura, coffee break, carro de acompanhamento e assistência psicológica).`}
      howItWorks={[
        { step: "1", title: "Definição do Plano", description: "Analisamos o perfil da empresa, número de colaboradores e nível de cobertura desejado. Definimos se a cobertura será apenas para o titular ou extensiva a dependentes (cônjuge, filhos, pais)." },
        { step: "2", title: "Cotação Comparativa", description: "Cotamos com seguradoras especializadas em seguro decesso, comparando coberturas, limites, serviços inclusos e valores. Apresentamos as melhores opções com custo por vida." },
        { step: "3", title: "Contratação e Cadastro", description: "Após a escolha do plano, cadastramos todos os colaboradores e dependentes elegíveis. O processo é simples e pode ser feito por planilha ou integração com o RH da empresa." },
        { step: "4", title: "Acionamento em Caso de Óbito", description: "Quando ocorre um falecimento, a empresa ou família aciona a central 24h da seguradora. A partir daí, toda a logística do funeral é coordenada pela seguradora, sem custo adicional." },
        { step: "5", title: "Gestão e Atualização", description: "Acompanhamos inclusões e exclusões de colaboradores, renovações e eventuais sinistros. Garantimos que a cobertura esteja sempre atualizada conforme o quadro de funcionários." },
      ]}
      coverages={[
        { title: "Funeral Completo", description: "Cobertura integral das despesas com funeral: urna/caixão, preparação do corpo (tanatopraxia), ornamentação, sala de velório, registro de óbito, sepultamento ou cremação. Tudo organizado e pago pela seguradora." },
        { title: "Traslado Nacional", description: "Remoção e transporte do corpo entre cidades e estados, quando o falecimento ocorre fora do domicílio. Inclui todos os custos de transporte terrestre ou aéreo e documentação necessária." },
        { title: "Cobertura para Dependentes", description: "Extensão da cobertura para cônjuge, companheiro(a), filhos e pais do colaborador. Cada dependente recebe o mesmo nível de assistência funeral do titular." },
        { title: "Assistência 24 Horas", description: "Central de atendimento disponível 24 horas, 7 dias por semana, para acionamento imediato em caso de óbito. A seguradora coordena todas as providências desde o primeiro contato." },
        { title: "Serviços Adicionais", description: "Dependendo do plano: coroa de flores, coffee break durante o velório, carro de acompanhamento para a família, paramentação religiosa e mensagem de condolências da empresa." },
        { title: "Assistência Psicológica", description: "Alguns planos incluem sessões de apoio psicológico para familiares enlutados, ajudando no processo de luto com profissionais especializados." },
      ]}
      coverageExclusions={[
        "Custos com jazigo perpétuo (terreno em cemitério) — coberto separadamente",
        "Exumação e translado posterior ao sepultamento",
        "Falecimentos ocorridos antes do período de carência (quando aplicável)",
        "Despesas com cerimônias religiosas extras não previstas no plano",
        "Custos com documentação especial para óbitos no exterior (coberto pelo Seguro Viagem)",
      ]}
      pricingInfo={{
        intro: "O Seguro Decesso é um dos benefícios mais acessíveis do mercado. Os valores variam conforme o plano escolhido, número de vidas e abrangência da cobertura. Em geral, o custo fica entre R$ 2 e R$ 15 por colaborador/mês.",
        factors: [
          "Número de colaboradores — quanto maior o grupo, menor o custo por vida",
          "Abrangência — titular apenas ou com dependentes (cônjuge, filhos, pais)",
          "Nível do plano — básico, intermediário ou premium",
          "Região de cobertura — municipal, estadual ou nacional",
          "Serviços adicionais — floricultura, coffee break, assistência psicológica",
          "Idade média do grupo — impacta marginalmente no custo",
        ],
        note: "Com investimento inferior a R$ 10/mês por colaborador, a empresa oferece um benefício que faz enorme diferença no momento mais difícil. Na Patro, encontramos o melhor plano para seu orçamento.",
      }}
      realScenarios={[
        { title: "Falecimento de colaborador em viagem a trabalho", description: "Um colaborador de uma empresa de Guarulhos faleceu durante viagem a trabalho em Minas Gerais. O Seguro Decesso cobriu todo o traslado interestadual (R$ 4.500), o funeral completo (R$ 6.800) e ainda providenciou carro de acompanhamento para a família. A empresa não precisou se preocupar com nenhuma providência logística." },
        { title: "Óbito do pai de funcionária", description: "O pai de uma colaboradora faleceu e a família não tinha recursos para o funeral. Como o seguro da empresa cobria dependentes, toda a assistência funeral foi prestada sem custo: preparação do corpo, velório, sepultamento e coroa de flores. A funcionária pôde focar no luto sem preocupação financeira." },
        { title: "Empresa sem seguro arcou com custos altíssimos", description: "Uma empresa de 50 funcionários perdeu um colaborador e, por não ter Seguro Decesso, arcou diretamente com R$ 12.000 em despesas funerais por solidariedade. Com o seguro, o custo mensal para toda a empresa seria de aproximadamente R$ 250/mês — muito menos do que o custo de um único sinistro." },
      ]}
      importantDetails={[
        { title: "Diferença entre Seguro Decesso e Seguro de Vida", content: "São produtos complementares, não substitutos. O Seguro de Vida paga uma indenização em dinheiro aos beneficiários após o falecimento — serve para reposição de renda e quitação de dívidas. O Seguro Decesso cobre especificamente as despesas e a logística do funeral.\n\nMuitas empresas contratam ambos: o Seguro de Vida para proteção financeira da família e o Seguro Decesso para que o funeral não gere custos nem preocupações logísticas." },
        { title: "Obrigatoriedade e Convenções Coletivas", content: "Diversas convenções coletivas de trabalho já incluem o Seguro Decesso como benefício obrigatório. Antes de contratar, verificamos a convenção do seu segmento para garantir que a cobertura atenda aos requisitos mínimos exigidos.\n\nMesmo quando não é obrigatório, o Seguro Decesso é recomendado como benefício de baixo custo e alto impacto na satisfação dos colaboradores." },
        { title: "Carência e Vigência", content: "A maioria dos planos de Seguro Decesso tem carência zero para morte acidental e carência de 30 a 90 dias para morte natural. Isso significa que, para acidentes, a cobertura vale desde o primeiro dia.\n\nA vigência é anual com renovação automática. Inclusões e exclusões de colaboradores podem ser feitas mensalmente, acompanhando a folha de pagamento." },
      ]}
      tips={[
        "Inclua dependentes no plano — o custo adicional é baixo e o benefício para o colaborador é enorme.",
        "Verifique a convenção coletiva do seu segmento — o Seguro Decesso pode ser obrigatório.",
        "Combine com Seguro de Vida em Grupo para proteção completa (financeira + funeral).",
        "Prefira planos com traslado nacional se a empresa tem colaboradores que viajam.",
        "Comunique o benefício aos colaboradores — muitos desconhecem que possuem essa cobertura.",
        "Mantenha o cadastro atualizado com admissões e demissões mensais.",
      ]}
      whoNeeds={[
        "Empresas de todos os portes que desejam oferecer benefício de baixo custo e alto valor percebido",
        "Empresas com obrigatoriedade por convenção coletiva de trabalho",
        "Indústrias e empresas com atividades de risco elevado",
        "Empresas que já oferecem Seguro de Vida e querem complementar com assistência funeral",
        "Organizações que valorizam gestão humanizada de pessoas",
        "Empresas com colaboradores que viajam frequentemente a trabalho",
      ]}
      whyPatro={[
        "Cotação com seguradoras especializadas em decesso — melhores condições e serviços",
        "Dimensionamento do plano ideal para o perfil e orçamento da empresa",
        "Verificação de obrigatoriedade conforme convenção coletiva",
        "Gestão mensal de inclusões e exclusões de colaboradores",
        "Suporte integral em caso de sinistro — orientamos empresa e família em todo o processo",
        "Combinação com Seguro de Vida PME e outros benefícios corporativos com descontos",
      ]}
      faqs={[
        { question: "Qual a diferença entre Seguro Decesso e Seguro de Vida?", answer: "O Seguro de Vida paga indenização financeira aos beneficiários. O Seguro Decesso cobre as despesas e a logística do funeral (urna, velório, sepultamento, traslado). São complementares: o Vida protege financeiramente a família, o Decesso garante que o funeral não gere custos." },
        { question: "Quanto custa o Seguro Decesso por colaborador?", answer: "O custo varia de R$ 2 a R$ 15 por colaborador/mês, dependendo do plano e número de vidas. Para uma empresa com 30 funcionários, o investimento mensal pode ser de R$ 60 a R$ 450 — um dos benefícios com melhor custo-benefício do mercado." },
        { question: "O Seguro Decesso cobre familiares?", answer: "Sim, dependendo do plano contratado. A cobertura pode ser estendida para cônjuge, filhos e pais do colaborador, com o mesmo nível de assistência funeral. O custo adicional por dependente é muito acessível." },
        { question: "Existe carência no Seguro Decesso?", answer: "Para morte acidental, geralmente não há carência — a cobertura vale desde o primeiro dia. Para morte natural, a carência costuma ser de 30 a 90 dias, dependendo da seguradora e do plano." },
        { question: "O Seguro Decesso é obrigatório?", answer: "Depende da convenção coletiva de trabalho do segmento da empresa. Muitas categorias já incluem o Seguro Decesso como benefício obrigatório. Verificamos a convenção do seu setor para orientar sobre a obrigatoriedade e coberturas mínimas exigidas." },
        { question: "Como acionar o Seguro Decesso?", answer: "Em caso de falecimento, a empresa ou familiar liga para a central 24h da seguradora. A partir desse contato, a seguradora assume toda a logística: remoção do corpo, preparação, velório, sepultamento ou cremação e traslado, se necessário. Não há burocracia para a família." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Planos de Saúde", link: "/planos-de-saude" },
      ]}
    />
  );
};

export default SeguroDecesso;
