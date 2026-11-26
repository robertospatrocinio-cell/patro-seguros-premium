import { COMPANY, ORGANIZATION_SCHEMA } from "../config/company";

export const apPath = "/seguro-acidentes-pessoais-aeroportos";
export const apHeading = "Seguro de Acidentes Pessoais para Trabalhadores e Prestadores de Serviços em Aeroportos";
export const apTitle = "Seguro de Acidentes Pessoais para Aeroportos | Patro Seguros";
export const apDescription = "Precisa de Seguro de Acidentes Pessoais para trabalhar no Aeroporto de Guarulhos? Proteja sua equipe e solicite uma cotação com a Patro Seguros.";
export const apImage = "/images/engenharia-aeroportuaria-projetos.jpg";
export const apDefinition = "O Seguro de Acidentes Pessoais oferece proteção financeira ao segurado ou aos seus beneficiários quando ocorre um acidente coberto pela apólice. Conforme as coberturas contratadas, pode pagar indenização por morte acidental ou invalidez permanente e reembolsar despesas de tratamento. A proteção pode ser individual ou coletiva. O pagamento depende do evento, do capital segurado, da vigência e das condições da apólice.";

export const apCoverage = [
  ["MA", "Morte Acidental", "Indeniza os beneficiários em caso de morte decorrente de acidente coberto, conforme a apólice."],
  ["IPA", "Invalidez Permanente Total ou Parcial por Acidente", "Pode indenizar perda ou redução funcional permanente. O valor considera o capital, o grau de perda e os percentuais e critérios da apólice."],
  ["DMHO", "Despesas Médicas, Hospitalares e Odontológicas", "Pode reembolsar despesas elegíveis e comprovadas para tratar um acidente coberto, dentro dos limites e prazos previstos. Não substitui plano de saúde."],
  ["DIT", "Diária por Incapacidade Temporária", "Quando disponível e contratada, pode pagar diárias por incapacidade temporária decorrente de acidente coberto, observados franquia, comprovação e limites."],
  ["DIH", "Diária por Internação Hospitalar", "Pode pagar uma diária em caso de internação elegível por acidente coberto, conforme o período, o valor e as regras do produto contratado."],
  ["Funeral", "Assistência Funeral", "Pode ser oferecida como serviço de assistência ou cobertura adicional de reembolso, conforme o produto e seus limites."],
] as const;

export const apAudiences = [
  "Empresas de engenharia", "Empresas de construção civil", "Empresas de manutenção", "Empresas de instalações elétricas",
  "Empresas de climatização", "Empresas de automação", "Empresas de telecomunicações", "Empresas de limpeza",
  "Empresas de conservação", "Empresas de segurança patrimonial", "Empresas de logística", "Empresas de facilities",
  "Empresas de montagem industrial", "Empresas terceirizadas", "Consultorias técnicas", "Técnicos de manutenção",
  "Engenheiros autônomos", "Prestadores de serviços individuais", "Profissionais temporários", "Equipes de projetos específicos",
  "MEIs elegíveis", "Sócios e administradores elegíveis que executam serviços técnicos",
];

export const apModalities = [
  ["Seguro individual", "Para um prestador ou autônomo; permite avaliar um perfil específico.", "Depende da elegibilidade e da aceitação da ocupação."],
  ["Seguro coletivo empresarial", "Reúne profissionais elegíveis sob uma apólice coletiva.", "O estipulante administra movimentações; podem existir regras de composição e tamanho do grupo."],
  ["Equipes temporárias", "Pode acompanhar uma mobilização com início e fim previstos.", "Confirme datas, substituições e prorrogações."],
  ["Contratos específicos", "Permite avaliar capital, coberturas e comprovantes exigidos.", "A contratação não altera a cláusula; alinhe divergências com o contratante."],
  ["Cobertura anual", "Pode atender operações contínuas e equipes permanentes.", "Controle a renovação e mudanças de atividade e de equipe."],
  ["Vigência determinada", "Pode se ajustar ao prazo de projeto ou intervenção.", "Disponibilidade e períodos mínimos dependem do produto."],
  ["Capital uniforme por pessoa", "Facilita a conferência quando todos precisam do mesmo capital.", "Pode não atender categorias com exigências diferentes."],
  ["Capitais diferenciados por categoria", "Permite adequar capitais a categorias distintas, quando permitido.", "É preciso enquadrar cada profissional segundo as regras da apólice."],
] as const;

export const apExamples = [
  ["Manutenção predial", "Um técnico cai durante a manutenção e sofre uma fratura.", "DMHO para tratamento; IPA se houver perda funcional permanente.", "Verificar altura, tarefa declarada e limites de reembolso."],
  ["Instalações elétricas", "Um eletricista sofre choque durante instalação, com queimaduras e afastamento.", "DMHO e DIT, se previstas para o evento.", "Verificar a atividade elétrica declarada e eventual franquia de dias."],
  ["Climatização", "Um componente cai durante a manutenção e lesa a mão do profissional.", "DMHO e IPA, se comprovada redução funcional permanente.", "Verificar critérios de reembolso e percentuais da apólice."],
  ["Obras civis", "Um trabalhador é atingido por material na obra e precisa ser internado.", "DMHO e DIH, se contratadas e se a internação for elegível.", "Verificar o enquadramento da obra e os limites da internação."],
  ["Movimentação de materiais", "Uma carga atinge um colaborador de logística, com lesão grave ou, hipoteticamente, morte.", "IPA se houver sequela permanente, ou MA se a morte acidental for coberta.", "Verificar a aceitação da operação e o nexo com o acidente."],
  ["Inspeção técnica", "Um engenheiro autônomo escorrega em uma inspeção, sofre lesão e interrompe o trabalho.", "DMHO e DIT, se contratadas e aplicáveis.", "Verificar escopo ocupacional, vigência e comprovação do afastamento."],
] as const;

export const apComparisons = [
  ["Acidentes Pessoais", "Proteção financeira associada a acidentes cobertos sofridos pelo profissional segurado."],
  ["Vida em Grupo", "Pode incluir morte natural, morte acidental e outras coberturas contratadas."],
  ["RC Empregador", "Protege a empresa diante de determinadas reclamações de responsabilidade civil por danos a empregados."],
  ["E&O Engenharia", "Trata de responsabilidade por falhas profissionais de engenharia, quando cobertas."],
  ["RC Aeroportuário", "Trata de responsabilidades específicas de operações aeroportuárias, conforme contratação."],
  ["Plano de Saúde", "Oferece assistência à saúde conforme as regras do plano, não uma indenização por acidente pessoal."],
] as const;

export const apFaq = [
  ["O que é Seguro de Acidentes Pessoais?", apDefinition],
  ["Preciso desse seguro para trabalhar no Aeroporto de Guarulhos?", "Depende do contrato, das regras de credenciamento aplicáveis à atividade e de eventual norma ou instrumento coletivo. Confirme por escrito com o contratante antes de mobilizar sua equipe no GRU Airport."],
  ["O seguro é obrigatório para todos os prestadores?", "Não presuma uma regra única. Verifique o contrato, a atividade, as normas e os instrumentos coletivos aplicáveis à equipe."],
  ["Posso contratar para apenas um trabalhador?", "Pode haver alternativa individual, se a pessoa e sua ocupação forem elegíveis e o contrato aceitar a modalidade."],
  ["Posso contratar para uma equipe?", "É possível avaliar uma opção coletiva. A aceitação depende da composição da equipe, das atividades e do produto."],
  ["Empresas MEI podem contratar?", "Depende da seguradora, da ocupação e da modalidade. Para o titular do MEI, também pode fazer sentido avaliar uma opção individual."],
  ["Profissionais autônomos podem contratar?", "Podem solicitar cotação individual. Informe a profissão, as tarefas e o local do serviço para análise."],
  ["Posso contratar para um serviço temporário?", "Pode haver opção de vigência determinada. Informe as datas previstas e verifique como a apólice trata prorrogações."],
  ["Qual capital segurado devo contratar?", "Confira o mínimo por pessoa e por cobertura no contrato ou instrumento coletivo, se houver. Se não houver valor indicado, avalie a necessidade com a corretora."],
  ["O seguro cobre morte acidental?", "A cobertura MA, quando contratada, pode indenizar beneficiários por morte decorrente de acidente coberto. Não equivale à cobertura de morte natural."],
  ["O seguro cobre invalidez permanente?", "Se houver cobertura IPA, uma perda funcional permanente após acidente coberto pode gerar indenização total ou parcial, conforme os critérios da apólice."],
  ["O seguro cobre despesas médicas?", "Quando contratada, a DMHO pode reembolsar despesas elegíveis de tratamento de acidente coberto. Não substitui plano de saúde."],
  ["O seguro cobre acidentes fora do trabalho?", "Pode cobrir se a abrangência 24 horas estiver contratada e o evento for elegível. Outras apólices limitam a proteção a atividades, locais ou períodos definidos."],
  ["O seguro cobre trabalhos em altura?", "Não automaticamente. Informe altura, tarefa e ambiente para análise de aceitação e condições pela seguradora."],
  ["O seguro cobre atividades elétricas?", "Depende da atividade declarada e aceita. Descreva o tipo de instalação, intervenção e exposição antes de contratar."],
  ["O seguro cobre atividades em áreas aeroportuárias restritas?", "Não automaticamente. Informe a área, o serviço e a proximidade de aeronaves para análise das restrições."],
  ["Posso incluir novos profissionais durante a vigência?", "Pode ser possível em apólice coletiva. Confirme o procedimento e a data de início da cobertura de cada pessoa; não presuma inclusão retroativa."],
  ["Como comprovar que os trabalhadores estão segurados?", "Confira se o contratante pede apólice, certificado individual, relação de segurados ou outro comprovante. Solicite os documentos pelos canais autorizados após a contratação."],
  ["Qual a diferença entre AP e Vida em Grupo?", "AP protege contra acidentes cobertos. Vida em Grupo pode incluir morte natural e outras coberturas, dependendo da apólice."],
  ["Qual a diferença entre AP e RC Empregador?", "O AP protege a pessoa segurada ou seus beneficiários. O RC Empregador trata de reclamações contra a empresa por responsabilidade civil, conforme a apólice."],
  ["Seguro de Acidentes Pessoais substitui obrigações trabalhistas?", "Não. A contratação não dispensa deveres trabalhistas, previdenciários, de prevenção ou de comunicação de acidente quando exigida."],
  ["Quanto custa?", "Não há preço único. Capital, coberturas, vigência, atividade e perfil da equipe influenciam o prêmio, conforme os critérios da seguradora."],
  ["Quanto tempo demora a contratação?", "Depende da ocupação, da análise e da documentação. Informe a data-limite do contratante; cotação não equivale a apólice emitida."],
  ["Quais documentos preciso enviar?", "Para começar, informe atividade, aeroporto, tamanho da equipe, vigência e exigências conhecidas. Dados individuais poderão ser solicitados depois por canal seguro."],
  ["Como contratar com a Patro?", "Envie o pedido de cotação nesta página ou fale no WhatsApp oficial (11) 5199-7500. A Patro avalia o pedido e busca opções sujeitas à aceitação da seguradora."],
].map(([question, answer]) => ({ question, answer }));

const url = COMPANY.dominioCanonico + apPath;
export const apMeta = { title: apTitle, description: apDescription, h1: apHeading, canonical: url, ogUrl: url, ogType: "website" as const, ogImage: COMPANY.dominioCanonico + apImage, ogImageAlt: "Equipe técnica em ambiente de engenharia aeroportuária" };
export const apSchema = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebPage", "@id": url, url, name: apHeading, description: apDescription, inLanguage: "pt-BR", mainEntity: { "@id": `${url}#servico` }, hasPart: { "@id": `${url}#perguntas` } },
  { "@type": "Service", "@id": `${url}#servico`, url, name: "Corretagem de Seguro de Acidentes Pessoais para aeroportos", serviceType: "Corretagem de seguros de pessoas", description: apDescription, provider: { "@type": "InsuranceAgency", "@id": ORGANIZATION_SCHEMA["@id"], name: COMPANY.nomeFantasia, url: COMPANY.dominioCanonico }, areaServed: [{ "@type": "City", name: "Guarulhos" }, { "@type": "Country", name: "Brasil" }] },
  { "@type": "FAQPage", "@id": `${url}#perguntas`, url: `${url}#perguntas`, isPartOf: { "@id": url }, inLanguage: "pt-BR", mainEntity: apFaq.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
] };
