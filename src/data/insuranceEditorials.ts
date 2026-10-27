export interface InsuranceEditorial {
  path: string;
  productPath: string;
  modality: string;
  title: string;
  description: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
  checklist: string[];
}

export const INSURANCE_EDITORIALS_PATH = "/artigos-sobre-seguros";

export const insuranceEditorials: InsuranceEditorial[] = [
  {
    path: "/seguro-vida-sucessao", productPath: "/seguro-vida", modality: "Vida",
    title: "Seguro de vida como instrumento de sucessão",
    description: "Entenda como o seguro de vida pode trazer liquidez aos beneficiários, quais cuidados tomar com o capital e por que ele não substitui o planejamento jurídico.",
    intro: "Uma família pode ter imóveis e participação em empresas, mas pouco dinheiro disponível para as despesas do dia a dia. O seguro de vida pode complementar o planejamento sucessório ao prever um capital para os beneficiários em caso de morte coberta. O objetivo não é transferir todos os bens pela apólice, e sim criar uma fonte de recursos em um momento de reorganização.",
    sections: [
      { title: "Patrimônio não é o mesmo que dinheiro disponível", paragraphs: ["Imóveis e quotas societárias nem sempre podem ser vendidos rapidamente. Enquanto a sucessão é organizada, continuam existindo gastos com moradia, educação, manutenção de bens e apoio aos dependentes. O capital de um seguro pode ajudar a enfrentar esse intervalo sem uma venda apressada do patrimônio.", "A indenização depende de cobertura vigente, análise do evento e documentação. Por isso, não convém prometer uma data fixa de pagamento nem tratar o seguro como a única reserva de emergência da família."] },
      { title: "Como estimar o capital necessário", paragraphs: ["Comece pelas despesas mensais de quem depende de você e pelo período de suporte desejado. Acrescente compromissos financeiros e custos estimados de reorganização patrimonial, e desconte recursos que já estejam efetivamente disponíveis. Uma família com despesas de R$ 8 mil por mês precisaria de R$ 288 mil para 36 meses, antes de outros ajustes: é uma simulação de necessidade, não uma indicação de preço ou garantia de aceitação."] },
      { title: "Beneficiários e condições precisam acompanhar a família", paragraphs: ["Informe os beneficiários e seus percentuais conforme as regras do produto. Revise as indicações após casamento, separação, nascimento de filhos ou mudanças societárias. Quando há menores de idade ou situações familiares complexas, avalie também com orientação jurídica como os recursos serão administrados.", "Leia as condições sobre carências, riscos excluídos, declaração de saúde e manutenção da vigência. A natureza jurídica da indenização por morte é diferente da herança, mas isso não autoriza prometer ausência de qualquer discussão judicial ou aplicar automaticamente a mesma regra a resgates, previdência e outros produtos."] },
      { title: "Seguro temporário, resgatável e previdência não são equivalentes", paragraphs: ["No seguro temporário, a proteção vale pelo prazo contratado e normalmente não há resgate. Produtos resgatáveis podem prever uma reserva, sujeita às condições e aos prazos da apólice. Previdência tem outra finalidade e estrutura. A escolha exige comparar custo, duração da necessidade, reajustes e capacidade de manter os pagamentos.", "O seguro não substitui testamento, organização societária ou análise tributária. Planeje em conjunto com corretor, advogado e contador, sem usar promessas genéricas de blindagem patrimonial."] },
    ],
    checklist: ["Mapear dependentes, despesas e compromissos financeiros.", "Definir capital e prazo de proteção compatíveis com a necessidade.", "Revisar beneficiários, percentuais e declaração de saúde.", "Alinhar a contratação com o planejamento jurídico e contábil."],
  },
  {
    path: "/artigo-seguro-auto-coberturas", productPath: "/seguro-auto", modality: "Auto",
    title: "Seguro auto: como comparar proteção além do preço",
    description: "Compare casco, danos a terceiros, franquias e assistências no seguro auto e saiba quais informações declarar antes de contratar.",
    intro: "Duas propostas para o mesmo carro podem ter preços parecidos e proteções bastante diferentes. Uma comparação útil começa pelo uso do veículo e pelo prejuízo que você conseguiria absorver, não apenas pelo valor da parcela.",
    sections: [
      { title: "Casco e terceiros protegem interesses diferentes", paragraphs: ["A cobertura do próprio veículo pode abranger colisão, incêndio, roubo ou furto, conforme o produto. Já a responsabilidade civil pode amparar danos materiais e corporais causados a terceiros em eventos cobertos. Não presuma que contratar uma dessas proteções inclui automaticamente a outra.", "Verifique os limites de cada cobertura. Um acidente envolvendo vários veículos pode gerar despesas superiores ao valor do seu carro; por isso, o limite de terceiros merece uma análise própria."] },
      { title: "Franquia muda o custo de usar o seguro", paragraphs: ["A franquia é a participação do segurado nos prejuízos previstos no contrato. Uma proposta com preço anual menor pode exigir uma participação maior em um reparo. Compare franquia normal, reduzida ou majorada com base na sua reserva disponível, sem assumir que todo evento tem a mesma regra."] },
      { title: "Assistência não substitui cobertura", paragraphs: ["Guincho, carro reserva, vidros e serviços emergenciais têm condições específicas. Confira quilometragem, quantidade de utilizações, prazo de locação e regras de acionamento. Em veículos elétricos, confirme como o contrato trata bateria, recarga e remoção; acessórios e adaptações também devem ser informados."] },
      { title: "O perfil declarado precisa refletir a rotina", paragraphs: ["Informe corretamente condutor principal, endereço, uso profissional e transporte por aplicativo. Mudanças durante a vigência devem ser comunicadas para avaliação de ajuste da apólice. Guarde a proposta e confira se a apólice emitida corresponde ao que foi aceito.", "Em um sinistro, priorize a segurança, registre as informações do ocorrido e procure os canais oficiais. Antes de autorizar reparos, confirme o procedimento da seguradora."] },
    ],
    checklist: ["Comparar as mesmas coberturas e limites em todas as propostas.", "Conferir franquia e valor de referência do veículo.", "Declarar uso profissional, condutores e adaptações.", "Ler as regras de assistência e carro reserva."],
  },
  {
    path: "/artigo-seguro-residencial-patrimonio", productPath: "/seguro-residencial", modality: "Residencial",
    title: "Seguro residencial: o que protege o imóvel e o conteúdo",
    description: "Entenda a diferença entre construção e conteúdo, coberturas adicionais e assistência residencial antes de escolher uma apólice para sua casa.",
    intro: "A proteção da casa não se resume à estrutura do imóvel. Móveis, eletrodomésticos, responsabilidade perante vizinhos e gastos após um evento coberto podem exigir coberturas distintas. Separar essas necessidades evita contratar um valor que parece suficiente, mas deixa partes importantes de fora.",
    sections: [
      { title: "Reconstrução não é valor de venda", paragraphs: ["O preço de mercado do imóvel inclui localização e terreno, enquanto a estimativa de reconstrução considera a edificação. Já o conteúdo corresponde aos bens que podem ser incluídos conforme o contrato. Informe área, padrão construtivo, ocupação e valores com atenção; itens especiais podem exigir declaração e limites próprios."] },
      { title: "Coberturas adicionais precisam ser escolhidas", paragraphs: ["Danos elétricos, vendaval, roubo de bens e responsabilidade civil familiar não devem ser presumidos a partir do nome seguro residencial. Confira se estão contratados, os riscos abrangidos, limites e participações obrigatórias.", "Alagamento, infiltração gradual e falta de manutenção são situações diferentes. Uma apólice com cobertura para um evento não necessariamente ampara os demais. Leia a definição do risco antes de decidir."] },
      { title: "Assistências têm escopo limitado", paragraphs: ["Chaveiro, eletricista e encanador podem facilitar a resolução de emergências, mas costumam ter limites de serviço, materiais e utilização. Eles não equivalem a um plano de manutenção ou a uma garantia para qualquer defeito da residência."] },
      { title: "Condomínio, proprietário e inquilino", paragraphs: ["O seguro do condomínio não substitui automaticamente a proteção dos bens da unidade. Em um imóvel alugado, separe as obrigações previstas no contrato de locação das necessidades pessoais do morador. O proprietário e o inquilino podem ter interesses diferentes a proteger.", "Mantenha registros dos bens e das alterações relevantes no imóvel. Se ocorrer um dano, preserve a segurança, registre evidências e confirme os procedimentos antes de descartar itens ou iniciar reparos definitivos."] },
    ],
    checklist: ["Separar valores de construção e conteúdo.", "Confirmar coberturas para os riscos reais do endereço.", "Verificar franquias, exclusões e bens com limites especiais.", "Distinguir assistência emergencial de indenização."],
  },
  {
    path: "/artigo-seguro-empresarial-continuidade", productPath: "/seguro-empresarial", modality: "Empresarial",
    title: "Seguro empresarial e continuidade do negócio",
    description: "Saiba como avaliar patrimônio, estoques, lucros cessantes e responsabilidades ao planejar o seguro empresarial para a continuidade da operação.",
    intro: "Depois de um incêndio ou outro dano relevante, o custo não se limita à reposição de máquinas e móveis. A empresa pode continuar pagando aluguel, salários e fornecedores enquanto perde faturamento. O seguro empresarial precisa ser analisado a partir da operação real, incluindo o tempo necessário para retomar as atividades.",
    sections: [
      { title: "O endereço e a atividade definem a análise", paragraphs: ["Descreva o que é feito em cada local: atendimento ao público, produção, armazenamento ou prestação de serviços. Materiais utilizados, características da construção e medidas de prevenção influenciam a avaliação. Uma alteração de atividade ou ampliação do estoque deve ser comunicada durante a vigência."] },
      { title: "Edificação, equipamentos e mercadorias têm valores próprios", paragraphs: ["Separe os interesses que precisam de proteção e verifique como cada bem será avaliado em caso de sinistro. Bens de terceiros sob sua guarda, equipamentos alugados e mercadorias em transporte podem exigir contratação específica. Não suponha que o seguro do imóvel do locador cubra o patrimônio da sua empresa.", "Informe valores coerentes e confira se existem regras de rateio por insuficiência de importância segurada. Um capital subestimado pode comprometer a indenização conforme o contrato."] },
      { title: "Lucros cessantes não cobrem qualquer queda de receita", paragraphs: ["Essa cobertura, quando contratada, depende dos eventos e critérios previstos na apólice. Pode exigir um dano material coberto como causa da paralisação. Analise período indenitário, franquia temporal, despesas abrangidas e comprovação contábil. Queda de vendas por falta de demanda não deve ser confundida com paralisação indenizável."] },
      { title: "Responsabilidades e riscos digitais podem exigir outros seguros", paragraphs: ["Reclamações de clientes, erros profissionais e incidentes cibernéticos têm naturezas distintas. Um pacote patrimonial não necessariamente oferece a proteção adequada para cada uma delas. Mapeie as exposições com a corretora e compare coberturas específicas, inclusive os limites e as exclusões.", "Combine seguro com prevenção: manutenção, controle de acesso, cópias de segurança e um plano de resposta a incidentes continuam necessários. A apólice transfere determinados riscos; ela não elimina os problemas operacionais."] },
    ],
    checklist: ["Descrever atividades e endereços corretamente.", "Atualizar valores de equipamentos e estoque.", "Estimar o tempo de retomada após uma paralisação.", "Conferir responsabilidades e riscos não incluídos no pacote."],
  },
  {
    path: "/artigo-seguro-rc-profissional", productPath: "/seguro-rc-profissional", modality: "Responsabilidade civil profissional",
    title: "RC profissional: defesa e indenização são coisas diferentes",
    description: "Entenda limites, custos de defesa, retroatividade e comunicação de reclamações no seguro de responsabilidade civil profissional.",
    intro: "Uma reclamação pode gerar despesas de defesa mesmo antes de existir uma decisão sobre responsabilidade. O seguro de responsabilidade civil profissional pode amparar situações previstas no contrato, mas é essencial entender quando a reclamação precisa ser apresentada e quais custos estão efetivamente incluídos.",
    sections: [
      { title: "A atividade declarada deve corresponder ao trabalho realizado", paragraphs: ["Especialidade, procedimentos, faturamento, equipe e histórico de reclamações podem fazer parte da análise. Confirme se a proposta contempla apenas o profissional, a pessoa jurídica ou ambos. A proteção de um sócio não deve ser presumida como proteção automática de toda a clínica, escritório ou equipe."] },
      { title: "Custos de defesa têm regras e limites", paragraphs: ["Honorários e despesas processuais podem estar cobertos, conforme o produto e o evento. Verifique necessidade de anuência prévia, liberdade de escolha de advogado, franquia e se os custos consomem o mesmo limite destinado à indenização. A contratação não garante êxito na defesa nem pagamento de toda condenação."] },
      { title: "Retroatividade e vigência merecem atenção", paragraphs: ["Em apólices à base de reclamações, não basta olhar apenas a data do fato. A data retroativa, o período de apresentação da reclamação e as regras de comunicação também importam. Na troca de seguradora ou interrupção do contrato, confira como manter a continuidade da proteção.", "Fatos conhecidos antes da contratação podem ter tratamento específico ou exclusão. Informe circunstâncias e reclamações conforme solicitado, sem assumir que uma apólice nova resolverá um problema já existente."] },
      { title: "Comunique a reclamação antes de assumir compromissos", paragraphs: ["Ao receber uma notificação, preserve contratos, registros e comunicações. Procure a corretora e a seguradora para confirmar o procedimento. Não reconheça responsabilidade nem celebre acordo contando com reembolso sem observar as condições da apólice.", "RC profissional, RC geral e D&O atendem riscos diferentes. A escolha deve partir da atividade e da responsabilidade discutida, não apenas do nome do seguro."] },
    ],
    checklist: ["Conferir atividades e pessoas efetivamente seguradas.", "Comparar limites de defesa e de indenização.", "Verificar retroatividade e continuidade na renovação.", "Conhecer o procedimento para comunicar uma reclamação."],
  },
  {
    path: "/artigo-seguro-maquinas-equipamentos", productPath: "/seguro-maquinas", modality: "Máquinas e equipamentos",
    title: "Seguro de máquinas: operação, transporte e valor segurado",
    description: "Veja como avaliar o seguro de máquinas e equipamentos considerando identificação, uso, transporte, acessórios, franquias e riscos excluídos.",
    intro: "Uma máquina parada pode comprometer uma obra, a produção ou a entrega de um serviço. Para escolher o seguro, é preciso conhecer não apenas o valor do equipamento, mas também onde ele opera, quem o utiliza e como é deslocado entre os locais de trabalho.",
    sections: [
      { title: "Identifique o equipamento e seus acessórios", paragraphs: ["Marca, modelo, ano, número de série e valor precisam corresponder ao bem. Informe implementos, acessórios e equipamentos de terceiros que devam entrar na análise. A presença de uma máquina na proposta não significa que todos os seus componentes e usos estejam automaticamente cobertos."] },
      { title: "Operação, deslocamento e transporte são situações distintas", paragraphs: ["Confirme o âmbito territorial e as atividades declaradas. Operar em uma propriedade, circular entre frentes de trabalho e viajar sobre uma carreta são exposições diferentes. A cobertura durante transporte e as regras para carga e descarga devem ser verificadas expressamente.", "Equipamentos locados ou cedidos a terceiros também podem exigir condições próprias. Antes de disponibilizar o bem, confira se a apólice aceita esse uso e quais obrigações precisam constar no contrato de locação."] },
      { title: "Desgaste e manutenção não se confundem com acidente", paragraphs: ["Quebra por desgaste, falta de manutenção ou falha mecânica pode estar excluída de uma cobertura voltada a danos externos. Compare a descrição dos eventos cobertos, e não apenas a expressão seguro completo. Mantenha registros de revisões e siga os requisitos de operação segura."] },
      { title: "Reposição e paralisação precisam de análises separadas", paragraphs: ["Confira como o valor da máquina será apurado, quais documentos serão exigidos e se há depreciação ou participação obrigatória. A indenização do equipamento não garante, por si só, ressarcimento pela receita perdida ou pelo aluguel de um substituto. Essas necessidades devem ser discutidas antes da contratação."] },
    ],
    checklist: ["Conferir identificação, valores e acessórios.", "Declarar locais de operação e eventual locação.", "Verificar transporte e carga e descarga.", "Separar danos acidentais de desgaste e manutenção."],
  },
  {
    path: "/artigo-seguro-drone-agricola-casco-reta", productPath: "/seguro-drone-agricola", modality: "Drones agrícolas",
    title: "Drones agrícolas: por que casco e RETA não são a mesma coisa",
    description: "Entenda casco, RETA e riscos da pulverização com drones agrícolas, com cuidados para DJI Agras, XAG e outras marcas sujeitos à aceitação.",
    intro: "Uma queda pode danificar o drone e, ao mesmo tempo, atingir bens ou pessoas. São prejuízos diferentes: proteger o equipamento não significa proteger toda a responsabilidade da operação. No uso agrícola, ainda é necessário analisar os riscos específicos da aplicação de produtos.",
    sections: [
      { title: "Casco protege o bem nas situações contratadas", paragraphs: ["O seguro de casco pode contemplar danos ao equipamento conforme os eventos descritos na apólice. Verifique baterias, controles, carregadores e outros acessórios, além de transporte e armazenamento. Roubo, furto, queda e falhas operacionais podem ter tratamentos diferentes.", "Informe marca, modelo, número de série, valor e forma de utilização. DJI Agras, XAG, Eavision e Arpac são exemplos de marcas a apresentar na análise, não uma lista de aceitação automática. Modelo, estado do bem, documentação e operação influenciam a proposta."] },
      { title: "RETA trata de responsabilidade, não do conserto do drone", paragraphs: ["O RETA está relacionado à responsabilidade do explorador ou transportador aéreo, dentro das condições aplicáveis. Não substitui o casco. Confirme com a corretora e os órgãos competentes as exigências para sua operação e a adequação do certificado, sem presumir que qualquer apólice atende a qualquer atividade."] },
      { title: "Pulverização exige avaliar deriva e danos ambientais", paragraphs: ["Danos por deriva, contaminação e aplicação de produtos não devem ser considerados cobertos apenas porque o drone possui RETA. É necessário analisar as exclusões e a disponibilidade de proteção específica de responsabilidade civil e ambiental para a atividade.", "Descreva culturas, área atendida, produtos aplicados e prestação de serviços a terceiros. Uma operação própria e uma empresa que atende diversas fazendas podem apresentar exposições distintas."] },
      { title: "Documentação e segurança fazem parte do planejamento", paragraphs: ["Mantenha os cadastros, autorizações e habilitações exigíveis para o equipamento e a operação, conforme as regras vigentes. Registros de voo, manutenção e procedimentos de aplicação ajudam na gestão do risco e podem ser solicitados na análise de um evento. Seguro não dispensa o cumprimento das exigências legais."] },
    ],
    checklist: ["Separar proteção do drone e responsabilidade por terceiros.", "Informar modelo, acessórios e operação real.", "Verificar expressamente riscos da pulverização e deriva.", "Conferir documentos e exigências da atividade."],
  },
  {
    path: "/artigo-seguro-viagem-assistencia", productPath: "/seguro-viagem", modality: "Viagem",
    title: "Seguro viagem: como escolher limites e usar a assistência",
    description: "Avalie despesas médicas, preexistências, atividades e regras de assistência no seguro viagem antes de embarcar para seu destino.",
    intro: "O seguro viagem deve combinar com o destino, a duração e o perfil de quem viaja. Uma exigência mínima de entrada em um país não representa necessariamente um limite suficiente para uma internação, e serviços de assistência não funcionam todos da mesma forma.",
    sections: [
      { title: "O destino ajuda a dimensionar a proteção médica", paragraphs: ["Considere o custo de atendimento no país e os limites por evento ou por viagem, na moeda prevista no contrato. Confira despesas médicas, hospitalares e odontológicas separadamente. Observe também regras para traslado médico, retorno sanitário e acompanhamento, quando disponíveis."] },
      { title: "Declare condições de saúde e atividades previstas", paragraphs: ["Doenças preexistentes, gestação, idade e prática de esportes podem ter limites ou condições específicos. Não conclua que uma menção genérica a atendimento médico inclui qualquer tratamento. Confirme se a atividade planejada, como esqui ou mergulho, está efetivamente contemplada."] },
      { title: "Bagagem e cancelamento têm gatilhos próprios", paragraphs: ["Extravio, atraso de bagagem e cancelamento de viagem são coberturas diferentes, quando contratadas. O simples desejo de desistir da viagem não costuma equivaler a um motivo coberto. Leia quais eventos autorizam o acionamento e guarde comprovantes de passagens, reservas e despesas."] },
      { title: "Saiba quem contatar antes de precisar", paragraphs: ["Salve o certificado e os canais de assistência em local acessível, inclusive sem internet. Em uma urgência, priorize a saúde e siga as orientações da central assim que possível. Confira quando há encaminhamento à rede e quando é necessário solicitar reembolso com comprovantes; não presuma pagamento direto em qualquer estabelecimento.", "Antes de estender a viagem, consulte a possibilidade de prorrogação. Uma contratação nova durante o deslocamento pode ter restrições e não deve ser tratada como proteção retroativa para um evento já ocorrido."] },
    ],
    checklist: ["Comparar limites e moeda de cobertura no destino.", "Conferir regras para saúde, idade e esportes.", "Ler os motivos cobertos para cancelamento.", "Salvar certificado e canais oficiais de assistência."],
  },
];
