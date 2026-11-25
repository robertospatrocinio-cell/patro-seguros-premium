export { APOLICE_CONTRATOS_PATH } from "./apoliceContratosRoute";
export const apoliceTitle = "Como evitar que uma apólice de seguro inadequada comprometa seu contrato de prestação de serviços?";
export const apoliceMetaTitle = "Como evitar apólices inadequadas em contratos empresariais";
export const apoliceDescription = "Veja 15 erros na contratação de seguros empresariais e use a matriz de riscos e o checklist para conferir a apólice antes de contratar ou renovar.";
export const apoliceSummary = "Compare a cláusula de seguros e seus anexos com a proposta e, depois da emissão, com a apólice e os endossos. Confira modalidade, atividades, locais, limites, franquias e datas. Registre as divergências e encaminhe a documentação para o aceite previsto no contrato antes do início dos serviços, quando exigido.";

type Erro = { title: string; occurrence: string; consequence: string; prevention: string; assistance: string };

export const apoliceErros: readonly Erro[] = [
  {
    title: "Contratar apenas pelo menor preço",
    occurrence: "Compras compara o prêmio anual de cotações que usam limites, franquias e coberturas diferentes.",
    consequence: "A proposta mais barata pode respeitar o orçamento e ainda deixar de fora uma etapa relevante do serviço ou exigir que a empresa retenha uma parcela maior do prejuízo.",
    prevention: "Use os mesmos requisitos para pedir todas as cotações. Elimine as opções incompatíveis ou registre as ressalvas antes de comparar o custo.",
    assistance: "Organizar as propostas em uma base comum e destacar quanto muda no desembolso previsto e nas condições do seguro.",
  },
  {
    title: "Não verificar a modalidade exigida",
    occurrence: "A cláusula pede garantia de execução e a equipe entrega uma apólice de responsabilidade civil por já ter uma vigente.",
    consequence: "A documentação pode ser devolvida mesmo se a apólice entregue tiver um limite nominal superior ao solicitado.",
    prevention: "Registre cada modalidade por extenso e a obrigação correspondente. Se a redação for ambígua, peça esclarecimento formal à contratante.",
    assistance: "Identificar exigências que precisam de instrumentos distintos e preparar os dados para consultar cada modalidade.",
  },
  {
    title: "Ignorar o escopo contratual",
    occurrence: "A cotação se baseia no primeiro anexo e deixa de fora testes, comissionamento ou manutenção incluídos na versão assinada.",
    consequence: "A divergência pode atrasar a mobilização ou levantar dúvida de cobertura em uma etapa que ficou fora da proposta.",
    prevention: "Use a versão vigente do contrato e faça um inventário de entregáveis, fases e locais. Confira cada elemento na documentação do seguro.",
    assistance: "Cruzar as fases do serviço com a descrição do risco e listar as lacunas para consulta à seguradora.",
  },
  {
    title: "Contratar limite inferior ao solicitado",
    occurrence: "A empresa olha apenas o limite global, embora o contrato peça um limite por evento ou a cobertura relevante tenha sublimite próprio.",
    consequence: "O documento pode não cumprir a cláusula, e o valor disponível para aquele evento pode ser menor do que a empresa pressupôs.",
    prevention: "Compare a mesma unidade: por evento, por reclamação ou agregado, conforme a exigência. Confira sublimites e possível redução do agregado por pagamentos anteriores.",
    assistance: "Montar um quadro por cobertura com os valores exigidos, os ofertados e as diferenças a negociar.",
  },
  {
    title: "Não verificar franquias",
    occurrence: "A equipe registra o limite, mas não percebe que uma cobertura tem participação percentual sujeita a um mínimo em reais.",
    consequence: "A empresa precisa arcar com uma parcela acima do que previa ou entrega uma franquia superior à admitida pelo contrato, se houver teto.",
    prevention: "Leia a regra por cobertura e simule a parcela da empresa em um cenário ilustrativo. Confirme com o financeiro se o valor é suportável.",
    assistance: "Traduzir as regras de franquia e participação em cenários comparáveis, sem antecipar o cálculo de um sinistro real.",
  },
  {
    title: "Declarar atividades de maneira incompleta",
    occurrence: "O questionário informa apenas o CNAE ou a descrição ‘manutenção’, embora o trabalho envolva intervenções elétricas e testes em operação.",
    consequence: "A seguradora pode precisar reavaliar o risco quando a atividade real aparecer, e uma reclamação pode gerar discussão sobre a aderência da apólice.",
    prevention: "Descreva o que a equipe faz de fato, onde, com quais equipamentos e em que condições. Confira a descrição aceita na proposta e no documento emitido.",
    assistance: "Ajudar a transformar o memorial de serviços em uma descrição que a seguradora possa analisar e pedir confirmação para pontos ambíguos.",
  },
  {
    title: "Ignorar exclusões aeroportuárias",
    occurrence: "O prestador lê apenas o quadro de coberturas e presume que o seguro vale em áreas operacionais ou próximo de aeronaves.",
    consequence: "Uma exclusão ou restrição territorial pode tornar a proposta insuficiente para o local em que o contrato será executado.",
    prevention: "Identifique as áreas de trabalho e a exposição real. Verifique exclusões para aeroportos, aeronaves ou operações específicas, quando presentes, e peça análise escrita de qualquer ajuste.",
    assistance: "Apresentar os locais e as atividades à seguradora e consultar se existe possibilidade de tratamento específico na apólice.",
  },
  {
    title: "Confundir E&O com RC Geral",
    occurrence: "A equipe usa o nome genérico ‘responsabilidade civil’ para comparar uma apólice voltada à falha profissional com outra voltada a danos associados à operação.",
    consequence: "Uma cláusula de seguro profissional pode ficar sem atendimento, ou um dano a terceiro durante a operação pode exigir análise de outra cobertura.",
    prevention: "Separe erros de projeto, especificação ou supervisão dos danos decorrentes da execução. Leia o objeto, as exclusões e as extensões de cada oferta.",
    assistance: "Relacionar os cenários de falha profissional e dano a terceiros às modalidades que merecem análise, conforme o contrato.",
  },
  {
    title: "Não verificar retroatividade",
    occurrence: "Em uma troca de seguradora, compras confere a data de início da nova vigência, mas não compara a data de retroatividade de uma apólice à base de reclamações.",
    consequence: "Uma reclamação por ato anterior pode ficar fora da janela prevista, ainda que chegue durante a nova vigência.",
    prevention: "Compare as datas de retroatividade, os critérios de comunicação e os prazos para reclamações. Confira também o tratamento de fatos já conhecidos e evite presumir continuidade.",
    assistance: "Comparar a apólice anterior com a proposta de renovação e pedir esclarecimentos sobre a transição, inclusive sobre notificações pendentes.",
  },
  {
    title: "Não avaliar subcontratados",
    occurrence: "A prestadora delega parte das instalações e presume que a apólice principal transforma todo subcontratado em segurado.",
    consequence: "Uma responsabilidade da prestadora e a responsabilidade própria do subcontratado podem ter tratamentos diferentes, além de requisitos documentais distintos.",
    prevention: "Liste as empresas, seus serviços e quem precisa apresentar seguro próprio. Confira a definição de segurado e como a apólice trata atos de subcontratados.",
    assistance: "Separar as exigências por empresa e consultar a seguradora sobre o alcance da cobertura ou a necessidade de documentação adicional.",
  },
  {
    title: "Ignorar exigências de endossos",
    occurrence: "O contrato pede uma identificação específica ou alteração formal e a empresa entrega apenas um certificado ou um e-mail de intenção.",
    consequence: "O documento pode ser recusado e a alteração esperada pode não constar da apólice.",
    prevention: "Transcreva a exigência, confirme a viabilidade com a seguradora e confira o endosso emitido, sua redação e a data em que produz efeito.",
    assistance: "Encaminhar a redação solicitada à seguradora e comparar o documento emitido com o requisito, sem presumir que todo pedido será aceito.",
  },
  {
    title: "Não verificar vigência",
    occurrence: "A apólice termina antes da entrega final, ou um aditivo prolonga o serviço sem que a data do seguro seja revista.",
    consequence: "Pode haver intervalo sem o seguro exigido ou restrição de acesso à operação, conforme o contrato.",
    prevention: "Cruze início, término, mobilização, testes e eventual período posterior exigido. Registre alertas de renovação e confirme como se dá eventual extensão.",
    assistance: "Montar a linha do tempo dos documentos e consultar a seguradora sobre renovação ou ajuste de vigência antes do vencimento.",
  },
  {
    title: "Deixar de comunicar alterações relevantes no risco",
    occurrence: "Durante a execução, a empresa passa de inspeção visual a intervenção em equipamentos energizados e só registra a mudança na ordem de serviço.",
    consequence: "O novo escopo pode exceder o risco originalmente aceito e exigir revisão das condições de cobertura.",
    prevention: "Tenha um fluxo para encaminhar mudanças à corretora e à seguradora pelos canais previstos. Sempre que possível, faça a consulta antes de iniciar a nova atividade e registre a resposta.",
    assistance: "Documentar a mudança para análise da seguradora e acompanhar a orientação sobre condições, comunicação e eventual endosso.",
  },
  {
    title: "Aguardar a última hora para contratar",
    occurrence: "O seguro só entra na pauta quando a data de credenciamento ou início da atividade já está próxima.",
    consequence: "Pode faltar tempo para esclarecer a cláusula, reunir dados, obter proposta e encaminhar os documentos para aceite.",
    prevention: "Abra a análise assim que tiver a minuta e planeje etapas separadas para cotação, emissão, conferência e resposta da contratante. Não conte com emissão imediata.",
    assistance: "Organizar as pendências por prioridade e orientar quais informações reunir primeiro para submeter o risco.",
  },
  {
    title: "Presumir que a apólice será aceita pela contratante",
    occurrence: "A empresa trata a emissão pela seguradora como se ela também liberasse a documentação no portal ou no processo de credenciamento da contratante.",
    consequence: "Uma pendência de formato, conteúdo ou assinatura pode impedir a liberação, mesmo com a apólice vigente.",
    prevention: "Siga o fluxo de envio do contrato, solicite o aceite pelo canal previsto e guarde o protocolo. Registre ajustes ou dispensas por escrito com quem tem autoridade para concedê-los.",
    assistance: "Apoiar a conferência e montar a lista de ajustes solicitados. O aceite é da contratante; o alcance da cobertura é definido pela apólice e legislação aplicável.",
  },
];

export const apoliceMatriz = [
  { requirement: "Modalidade e escopo", finding: "A minuta exige RC profissional para projeto; a proposta descreve apenas instalação.", impact: "A fase de projeto pode ficar sem a proteção exigida.", action: "Engenharia documenta quem projeta e quem executa; Compras solicita novas condições." },
  { requirement: "Limites e franquias", finding: "O limite agregado atende ao valor nominal, mas o limite por evento é menor que o contratual.", impact: "A proposta pode ser recusada e o valor disponível por evento ser insuficiente.", action: "Compras pede quadro por cobertura; Financeiro confere a franquia e a retenção." },
  { requirement: "Local e exclusões", finding: "A ordem de serviço prevê área operacional, mas a proposta não esclarece a restrição aeroportuária.", impact: "A atividade pode ficar fora do risco aceito.", action: "Operações identifica a área; a corretora submete local e atividade para confirmação escrita." },
  { requirement: "Datas e continuidade", finding: "O aditivo estende o serviço e a proposta de renovação traz data de retroatividade mais recente.", impact: "Pode haver lacuna de vigência ou de cobertura para atos anteriores.", action: "Gestão de contratos verifica o cronograma; a corretora compara datas e condições de comunicação." },
  { requirement: "Subcontratados, endossos e aceite", finding: "Há equipe terceirizada em campo, mas faltam os comprovantes previstos e o endosso solicitado.", impact: "A contratante pode manter a documentação pendente.", action: "Gestão de contratos cobra comprovantes, confere o endosso que for emitido e protocola o conjunto." },
];

export const apoliceChecklist = [
  "Usei a versão vigente do contrato, dos anexos, dos aditivos e do procedimento de credenciamento, se aplicável.",
  "Identifiquei quais empresas devem constar dos documentos e quais precisam apresentar seguro próprio.",
  "Conferi modalidades, coberturas, atividades declaradas, locais, fases e exclusões na apólice e nos endossos.",
  "Comparei limites e sublimites na unidade exigida; conferi franquias, mínimos e percentuais por cobertura.",
  "Conferi vigência e, quando a apólice é à base de reclamações, retroatividade, prazos e regras de comunicação.",
  "Conferi a redação e a vigência dos endossos exigidos contra os documentos emitidos.",
  "Registrei divergências, responsáveis e prazos; encaminhei os documentos para o aceite previsto no contrato.",
  "Agendei a renovação e combinei como comunicar aditivos, mudanças no risco ou de subcontratado.",
];

export const apoliceFaqs = [
  { question: "O que devo comparar primeiro na cláusula e na proposta?", answer: "Comece pela modalidade exigida e pelo que a empresa realmente faz. Depois confirme locais, limites, franquias, vigência, exclusões e os documentos que a contratante exige para o aceite." },
  { question: "Uma apólice já emitida serve para um novo contrato?", answer: "Ela pode ser avaliada, mas compare o novo trabalho com as atividades, locais, limites e condições aceitos. Se houver diferença, consulte a seguradora sobre ajuste e confirme o procedimento com a contratante." },
  { question: "Retroatividade e vigência são a mesma coisa?", answer: "Não. Em apólices à base de reclamações, a retroatividade, quando prevista, ajuda a delimitar os fatos anteriores que podem ser considerados. A vigência e as regras de apresentação ou notificação delimitam quando e como a reclamação deve ser comunicada." },
  { question: "O aceite da contratante confirma cobertura em caso de sinistro?", answer: "Não. O aceite trata do cumprimento documental do contrato de serviços. A cobertura de um evento é apurada de acordo com a apólice, os fatos, os limites e as demais condições aplicáveis." },
  { question: "Existe uma lista de seguros que vale para todo serviço no Aeroporto de Guarulhos?", answer: "Este guia não estabelece uma lista universal. Consulte a contratante sobre as exigências em vigor para o seu objeto, o local de trabalho e o credenciamento. A aceitação pela seguradora é uma análise distinta." },
];

export const apoliceReferences = [
  { label: "Lei nº 15.040/2024 (Planalto)", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l15040.htm", detail: "Marco legal dos contratos de seguro. A aplicação ao caso concreto depende da data e dos documentos da contratação." },
  { label: "Portal da SUSEP: normas de responsabilidade civil", url: "https://www.gov.br/susep/pt-br", detail: "Localize a Circular SUSEP nº 637/2021, sobre seguros do grupo responsabilidades, e confira a redação vigente e eventuais alterações." },
  { label: "SUSEP: consulta pública de produtos", url: "https://www2.susep.gov.br/safe/menumercado/REP2/Produto.aspx", detail: "Use o número de processo do produto informado pela seguradora e confira a versão aplicável das condições com a proposta e os endossos." },
  { label: "Portal da ANAC", url: "https://www.gov.br/anac/pt-br", detail: "Consulte as normas da aviação civil pertinentes à atividade. O portal não substitui a cláusula de seguros nem o procedimento de credenciamento informado pela contratante." },
  { label: "Portal oficial do GRU Airport", url: "https://www.gru.com.br/pt", detail: "Consulte orientações públicas para prestadores, quando disponíveis. Para confirmar requisitos, use a documentação vigente da sua contratação; o portal institucional não estabelece uma exigência universal." },
];
