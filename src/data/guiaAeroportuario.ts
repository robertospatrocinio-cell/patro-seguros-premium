export const guiaMetaTitle = "Seguros para fornecedores aeroportuários: guia completo";
export const guiaDescription = "Entenda as exigências de seguros para fornecedores aeroportuários. Compare modalidades por atividade e use o checklist antes de enviar a apólice.";
export const guiaImage = "/images/guia-seguros-fornecedores-aeroportuarios.jpg";
export const guiaImageAlt = "Profissionais de engenharia conferem uma planta em um terminal com uma aeronave ao fundo";
export const guiaSummary = "Não existe uma apólice única para todo fornecedor aeroportuário. Comece pelo contrato e pela atividade real: identifique o local de trabalho, quem projeta, quem executa e quais danos a operação pode causar. Compare os requisitos com as condições da apólice e confirme o aceite documental antes da mobilização.";

export const guiaChapters = [
  ["riscos", "Entendendo os riscos aeroportuários"],
  ["exigencias", "De onde vêm as exigências de seguros"],
  ["modalidades", "Principais modalidades de seguros"],
  ["atividades", "Seguros por atividade"],
  ["guia-checklist", "Como analisar o contrato"],
  ["documentos", "Documentos necessários"],
  ["propostas", "Como comparar propostas"],
  ["exemplos", "Exemplos práticos"],
  ["erros", "Erros frequentes"],
  ["atendimento", "Como contratar com a Patro"],
  ["glossario", "Glossário de seguros aeroportuários"],
  ["faq", "Perguntas frequentes"],
] as const;

export const riscos = [
  "Um aeroporto reúne equipes de diferentes empresas ao redor de instalações em funcionamento. A mesma troca de uma peça pode ser um serviço rotineiro em um escritório ou uma intervenção crítica quando exige isolar um subsistema que atende passageiros. Registre a área exata, a janela de trabalho, o trânsito de pessoas e equipamentos e as interfaces com serviços que precisam continuar operando.",
  "Separe o que pode falhar. Um cálculo incorreto ou uma especificação incompatível são exposições profissionais. Uma ferramenta que atinge um terceiro, ou uma manobra que danifica patrimônio alheio, são exposições da execução. A obra e os materiais que serão incorporados também podem sofrer danos próprios. Não presuma que a mesma apólice trate esses três cenários ou que o prejuízo indireto de uma paralisação acompanhe automaticamente o dano físico.",
  "Na instalação e na manutenção, descreva desmontagem, transporte, testes e comissionamento. Identifique quem detém a guarda de cada equipamento e quando a responsabilidade passa de uma empresa a outra. Se houver manuseio de combustível, produtos químicos ou resíduos, mapeie as etapas com potencial de contaminação, inclusive armazenamento temporário e destinação.",
  "O risco contratual é outra coluna: entregar uma etapa em atraso, ter de refazer um serviço ou não comprovar um seguro pode gerar consequências mesmo sem um acidente. O time de contratos registra as obrigações; a engenharia identifica cenários; a operação confirma as áreas e a forma de trabalho. Esse levantamento ajuda a separar o que depende de seguro do que depende de controles próprios, como autorização de acesso, isolamento e supervisão.",
];

export const exigencias = [
  ["Lei", "Verifique se existe dispositivo aplicável à atividade, ao contratante ou ao procedimento. Nas contratações regidas pela Lei nº 14.133/2021, por exemplo, os arts. 96 a 102 tratam da garantia contratual. A lei não transforma toda contratação em aeroporto em licitação pública nem impõe uma única modalidade a todos os fornecedores."],
  ["Regulamento", "Confirme o destinatário e o alcance da norma. A ANAC publica regulamentos de aviação civil; o RBAC nº 153 trata de operação, manutenção e resposta à emergência em aeródromos civis públicos dentro de seu escopo. Uma regra dirigida ao operador não deve ser tratada como exigência direta de apólice para qualquer fornecedor."],
  ["Credenciamento", "Peça as instruções do responsável por conceder o acesso no aeroporto. Identifique a versão do documento, a área autorizada e se os comprovantes se referem à empresa, à equipe ou aos veículos. Credenciamento e cobertura são decisões distintas."],
  ["Contrato ou edital", "Leia cláusulas, anexos e retificações. Identifique quem deve contratar, os comprovantes solicitados e o prazo de entrega. Se o edital disser uma coisa e a minuta outra, solicite esclarecimento formal em vez de adotar a interpretação mais conveniente."],
  ["Gestão de riscos", "A empresa pode avaliar seguros além do mínimo contratual para preservar caixa ou proteger ativos próprios. Decida a partir dos cenários, do impacto que o negócio consegue absorver e das medidas preventivas já implantadas."],
];

export const modalidades = [
  ["E&O Engenharia", "Exposição por erro ou omissão na prestação de serviços profissionais, por exemplo em projeto ou supervisão declarados.", "Especialidades aceitas, definição de serviço profissional, exclusões e, em produtos à base de reclamações, retroatividade e prazos."],
  ["RC Geral", "Responsabilidade civil perante terceiros em cenários da operação, como danos corporais ou materiais nos termos contratados.", "Locais, atividades, bens sob guarda, terceiros e exclusões relativas a aviação ou a trabalhos específicos."],
  ["RC Aeroportuário", "Responsabilidades selecionadas ligadas a operações no ambiente aeroportuário, conforme a atividade e o produto aceitos.", "Áreas autorizadas, interação com aeronaves, equipamentos de solo, definição de terceiro e limites aplicáveis."],
  ["Riscos de Engenharia", "Danos materiais à obra ou à instalação e montagem durante o período segurado, nos termos da apólice.", "Bens existentes, testes, comissionamento, cronograma e extensões que precisam ser contratadas."],
  ["Seguro Garantia", "Obrigações do tomador perante o segurado, para o objeto e as condições descritos na garantia.", "Modalidade, valor, prazo, condições de caracterização do sinistro e aceitação cadastral. Não substitui RC."],
  ["RC Ambiental", "Responsabilidades ligadas a eventos de poluição, conforme o evento, o local e as despesas previstos.", "Operações e locais declarados, tratamento de poluição súbita ou gradual e despesas de contenção, se previstas."],
  ["Seguro Empresarial", "Proteção patrimonial para bens próprios em locais aceitos, com coberturas selecionadas.", "Endereços, valores em risco, estoques e exclusões. A cobertura de um escritório não migra automaticamente para um terminal."],
  ["Seguro de Equipamentos", "Danos a equipamentos declarados, conforme bens, locais e eventos contratados.", "Propriedade ou locação, relação dos bens, local de uso, movimentação e cobertura fora do endereço, se necessária."],
  ["Seguro de Vida em Grupo", "Proteção de pessoas para eventos previstos nas coberturas contratadas.", "Elegibilidade, capitais e condições do grupo. Não responde à obrigação contratual do prestador perante terceiros."],
  ["Plano de Saúde Empresarial", "Benefício corporativo de assistência à saúde, distinto do seguro de responsabilidade.", "Elegibilidade, rede, abrangência e condições da operadora. Não é comprovante de RC, E&O ou garantia."],
];

export const atividades = [
  ["Engenharia civil", "E&O, RC Geral e Riscos de Engenharia", "A empresa assina cálculos, fiscaliza ou também executa a intervenção?"],
  ["Engenharia elétrica", "E&O, RC Geral e Riscos de Engenharia", "Há projeto, teste com energização ou trabalho em instalação existente?"],
  ["Engenharia mecânica", "E&O, RC Geral e Seguro de Equipamentos", "Quem responde por dimensionamento, montagem e movimentação de máquinas?"],
  ["Engenharia ambiental", "E&O e RC Ambiental", "A contratada entrega laudos ou também coleta, armazena ou transporta resíduos?"],
  ["Automação", "E&O, RC Geral e Riscos de Engenharia", "A entrega inclui integração de sistemas e testes em ambiente operacional?"],
  ["Climatização", "E&O, RC Geral e Riscos de Engenharia", "É manutenção periódica ou projeto e montagem com comissionamento?"],
  ["Facilities", "RC Geral, RC Aeroportuário e Seguro Garantia", "Quais atividades são próprias, quais são delegadas e existe obrigação garantível?"],
  ["Manutenção", "RC Geral, RC Aeroportuário e Seguro de Equipamentos", "A equipe intervém em bens de terceiros e em quais áreas?"],
  ["Limpeza", "RC Geral e RC Ambiental", "Há circulação pública, trabalho em altura ou uso e guarda de produtos químicos?"],
  ["Segurança", "RC Geral ou modalidade específica compatível com a atividade", "O serviço é monitoramento, controle de acesso ou vigilância?"],
  ["Obras", "Riscos de Engenharia, RC Geral e Seguro Garantia", "Quais etapas incluem bens preexistentes e quais entregas podem exigir garantia?"],
  ["Instalações", "Riscos de Engenharia, RC Geral e E&O", "Há projeto próprio, desmontagem, testes e entrega por fases?"],
  ["Logística", "RC Aeroportuário, RC Geral e soluções específicas de transporte", "A empresa transporta, manuseia ou guarda carga em trânsito?"],
  ["Telecomunicações", "E&O, RC Geral e Seguro de Equipamentos", "Há projeto de rede, instalação física ou responsabilidade por disponibilidade?"],
  ["Consultorias", "E&O compatível com a profissão e RC Geral, conforme a operação", "O parecer orienta uma decisão crítica ou o contrato inclui supervisão em campo?"],
];

export const checklist = [
  "Registrei versão do contrato, cláusula, anexos e prazo de entrega dos comprovantes.",
  "Identifiquei segurado, tomador ou beneficiário, quando aplicável, e conferi nomes e CNPJs.",
  "Descrevi atividades reais, área exata, interfaces com terceiros e subcontratação.",
  "Conferi modalidades, coberturas exigidas, limites por evento, agregados e sublimites.",
  "Conferi franquias ou participações, exclusões e condições específicas para o ambiente aeroportuário.",
  "Comparei vigência, retroatividade quando aplicável e períodos de teste, entrega e renovação.",
  "Identifiquei a redação de endossos, documentos de entrega e formato do comprovante.",
  "Registrei divergências e responsáveis e solicitei a manifestação escrita da contratante.",
  "Conferi o documento emitido e agendei o controle de mudanças, prorrogações e vencimentos.",
];
