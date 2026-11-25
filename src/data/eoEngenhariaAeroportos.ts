// Conteúdo orientativo: a cláusula do contrato e a versão das condições da apólice são indispensáveis à análise de um risco concreto.
export const definicaoEo = "O Seguro E&O Engenharia para Aeroportos é um seguro de responsabilidade civil profissional voltado a empresas que prestam serviços técnicos no ambiente aeroportuário. Se um terceiro atribuir um prejuízo a uma falha involuntária em uma atividade declarada, a apólice pode amparar os custos de defesa e a indenização devida. A análise considera o serviço contratado, as datas, os limites e as exclusões previstos no seguro.";

type Itens = ReadonlyArray<readonly [titulo: string, texto: string]>;

export const requisitos: Itens = [
  ["Modalidade e atividades declaradas", "Identifique se a cláusula pede RC Profissional, RC Geral, RC Aeroportuário ou uma combinação. Compare o escopo do serviço com a descrição da atividade segurada: projetar, instalar e operar são responsabilidades distintas."],
  ["Limite máximo de indenização (LMI)", "Localize o teto de cada cobertura. Se o contrato pedir um valor por reclamação, confira como a apólice trata reclamações relacionadas: elas podem consumir um único limite."],
  ["Limite agregado e limite máximo de garantia (LMG)", "O agregado limita a soma das indenizações de uma cobertura no período definido; o LMG, quando previsto, é o teto global da apólice. Confira sublimites e saldo disponível. O valor impresso na capa não responde a todas essas perguntas."],
  ["Vigência e retroatividade", "Compare o início e o fim da vigência com o cronograma do contrato. Em apólice à base de reclamações, verifique também desde que data os atos profissionais podem ser considerados, inclusive estudos anteriores à mobilização."],
  ["Franquia ou participação do segurado", "Confira o valor ou percentual que fica a cargo da empresa, o mínimo por ocorrência e a base de aplicação. Verifique se a contratante estabeleceu algum teto para essa participação."],
  ["Prazo complementar e prazo suplementar", "Confira as hipóteses de concessão do prazo adicional para apresentação de reclamações. Se houver opção de período suplementar, verifique o prazo para solicitá-lo e o prêmio exigido. Esses períodos não prorrogam a execução dos serviços segurados."],
  ["Segurados adicionais", "Se a cláusula mencionar a contratante, peça à seguradora a redação exata da inclusão e confira para quais atos ela vale. Ser segurada adicional não equivale a ser terceira prejudicada; examine a definição de terceiro e as exclusões entre segurados."],
  ["Renúncia à sub-rogação", "A contratante pode pedir que a seguradora abra mão de buscar ressarcimento contra uma parte indicada após pagar uma indenização. Não assuma esse compromisso em nome da seguradora: confirme se ela aceita e como formaliza a renúncia."],
  ["Abrangência territorial", "Confira onde o serviço pode ser prestado e em quais jurisdições uma reclamação pode ser apresentada. A localização do escritório de engenharia, sozinha, não define o alcance da apólice."],
  ["Endossos e período após a entrega", "Quando a contratante exigir alteração da apólice, peça o endosso emitido pela seguradora. Se exigir cobertura após o recebimento da obra, compare a duração exigida com as renovações e os prazos para reclamação; um certificado não altera a apólice."],
];

export const segmentos: ReadonlyArray<{ grupo: string; itens: Itens }> = [
  { grupo: "Projetos e estudos", itens: [
    ["Engenharia civil", "Define soluções para edificações e acessos. Uma incompatibilidade entre o projeto civil e as redes existentes pode gerar despesas para a contratante."],
    ["Engenharia estrutural", "Verifica cargas, apoios e deformações. Uma hipótese de cálculo inadequada pode motivar a revisão de um reforço já encomendado."],
    ["Arquitetura", "Organiza espaços, fluxos e acessibilidade. Uma especificação incompatível com o uso previsto pode atrasar a liberação de um ambiente."],
    ["Escritórios de projetos", "Coordenam desenhos e revisões de várias disciplinas. Entregar uma prancha desatualizada pode induzir outra equipe a executar uma solução incorreta."],
    ["Engenharia ambiental", "Elabora estudos e pareceres. Omissões no diagnóstico podem gerar reclamações pelo custo de estudos adicionais; o dano ambiental em si exige análise própria."],
    ["Engenharia de segurança do trabalho", "Avalia exposições ocupacionais e recomenda controles. Uma conclusão técnica sem suporte pode ser questionada, sem que o E&O substitua a proteção para acidentes de trabalho."],
    ["Consultorias técnicas", "Emitem recomendações para decisões de investimento ou manutenção. Uma premissa não verificada pode levar o cliente a contratar uma intervenção desnecessária."],
  ] },
  { grupo: "Instalações e sistemas", itens: [
    ["Engenharia elétrica", "Calcula demanda e especifica circuitos. Um dimensionamento incompatível com a carga contratada pode exigir adequações na instalação."],
    ["Engenharia mecânica", "Seleciona equipamentos e define condições de operação. Um parâmetro de vazão incorreto pode comprometer a integração entre sistemas."],
    ["Instalações elétricas", "Detalham e implantam redes de alimentação. Uma falha na especificação técnica deve ser distinguida de um dano causado durante a montagem."],
    ["Climatização e HVAC", "Dimensiona ventilação e condicionamento de ar. Uma estimativa incorreta de ocupação pode tornar o equipamento indicado insuficiente."],
    ["Automação predial", "Integra sensores, comandos e supervisão. Uma lógica de controle mal especificada pode causar despesas com operação manual."],
    ["Telecomunicações", "Projeta redes de voz e dados. A falta de compatibilidade entre equipamentos especificados pode atrasar a entrega do sistema."],
    ["Sistemas de combate a incêndio", "Definem medidas e interfaces de proteção. Uma omissão de projeto pode exigir nova análise antes do aceite da instalação."],
    ["Instalações eletromecânicas", "Integram acionamentos, máquinas e alimentação. Uma divergência de especificação entre conjuntos pode gerar custos para o cliente."],
    ["Sistemas hidrossanitários", "Dimensionam redes de água e esgoto. Uma declividade de projeto incompatível com o espaço disponível pode exigir alteração de outras instalações."],
  ] },
  { grupo: "Coordenação e acompanhamento em campo", itens: [
    ["Infraestrutura aeroportuária", "Compatibiliza intervenções com áreas que continuam em uso. Uma sequência de obra mal definida pode gerar despesas de remobilização."],
    ["Manutenção predial", "Planeja inspeções e intervenções em edifícios. Uma recomendação técnica inadequada pode gerar reclamação distinta daquela por quebra acidental de um bem."],
    ["Gerenciamento de projetos", "Coordena entregas, interfaces e prazos. Uma dependência ausente do cronograma pode gerar custos de espera para outras equipes."],
    ["Fiscalização de obras", "Confere se a execução segue o projeto contratado. A aprovação equivocada de uma medição pode gerar cobrança pelo valor pago em excesso."],
    ["Inspeções e laudos técnicos", "Registram condições observadas dentro de um escopo definido. Omitir uma ressalva relevante pode levar o leitor a tomar uma decisão com informação incompleta."],
  ] },
];

export const coberturas: Itens = [
  ["Erros e omissões profissionais", "Um ato técnico incorreto ou uma providência omitida pode levar um terceiro a reclamar contra a empresa. É preciso identificar o ato, o serviço coberto e a relação entre a falha alegada e o prejuízo."],
  ["Erros de projeto", "Podem envolver cálculos, dimensionamentos, desenhos ou especificações que a empresa assumiu elaborar. Confira se a disciplina e a etapa do projeto constam da proposta aceita, inclusive quando outra equipe executa a obra."],
  ["Negligência, imprudência e imperícia", "Deixar de fazer uma conferência necessária, aprovar uma intervenção sem a cautela devida ou aplicar incorretamente um método são exemplos de possíveis falhas culposas. A qualificação do ato depende dos fatos; o nome dado à falha não determina a cobertura."],
  ["Prejuízos financeiros de terceiros", "O cliente pode, por exemplo, cobrar a locação temporária de um equipamento em razão de um erro técnico. Verifique se a redação admite perda financeira sem dano material ou corporal prévio e que provas do prejuízo exige."],
  ["Custos de defesa", "Honorários, perícias e despesas processuais relacionados à defesa de reclamação coberta podem ser amparados. Confira os critérios de escolha dos profissionais, a necessidade de anuência e o limite reservado a essas despesas."],
  ["Indenizações e acordos", "O seguro pode responder por valores de responsabilidade do segurado perante o terceiro, respeitados limites e franquia. Antes de assumir responsabilidade ou formalizar acordo, consulte a seguradora sobre a anuência exigida."],
  ["Danos materiais e corporais", "Se um ato profissional atingir um bem ou uma pessoa, pode ser necessária cobertura específica ou extensão expressa. Examine também quais bens, pessoas e locais estão excluídos; a simples ocorrência dentro do aeroporto não basta."],
  ["Extravio de documentos", "Alguns produtos oferecem cobertura adicional para despesas de restauração de documentos de terceiros sob guarda profissional. Confira os suportes aceitos, o sublimite aplicável e as obrigações de guarda."],
  ["Atos de colaboradores e subcontratados", "Confira quem é segurado e se a apólice ampara a responsabilidade da empresa por serviços delegados. Cobrir a responsabilidade da contratada principal não dá automaticamente ao subcontratado o direito à própria defesa."],
];
