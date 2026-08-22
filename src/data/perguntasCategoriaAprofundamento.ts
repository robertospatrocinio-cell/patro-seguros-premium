// Fase 4 — Aprofundamento por categoria de perguntas.
// Perguntas adicionais + guia rápido + termos relacionados, para dar corpo
// às páginas /perguntas-frequentes-seguros/:categoria.

export interface CategoriaAprofundamento {
  intro: string;
  quickGuide: { title: string; content: string }[];
  perguntasExtras: { q: string; a: string }[];
  termosRelacionados: { term: string; hint: string }[];
  ctaLine: string;
  whatsappMsg: string;
}

const c = (
  intro: string,
  quickGuide: { title: string; content: string }[],
  perguntasExtras: { q: string; a: string }[],
  termosRelacionados: { term: string; hint: string }[],
  ctaLine: string,
  whatsappMsg: string,
): CategoriaAprofundamento => ({ intro, quickGuide, perguntasExtras, termosRelacionados, ctaLine, whatsappMsg });

export const perguntasCategoriaAprofundamento: Record<string, CategoriaAprofundamento> = {
  auto: c(
    "Seguro auto reúne as dúvidas mais frequentes de todo o site: franquia, bônus, CEP, uso profissional, veículo elétrico e o que muda em Guarulhos e região. Este guia responde as perguntas que mais aparecem no atendimento da Patro Seguros.",
    [
      { title: "Como o prêmio é calculado", content: "Perfil do condutor (idade, estado civil, uso profissional), CEP de pernoite, valor FIPE, coberturas e franquia. Cada seguradora tem uma leitura diferente do mesmo perfil — por isso comparar 3+ propostas é fundamental." },
      { title: "Bônus e renovação", content: "O bônus (classe) é transferível entre seguradoras. Basta apresentar a apólice anterior sem sinistros. Nunca deixe a apólice vencer — perde-se a classe." },
      { title: "Uso profissional (Uber, 99, entregas)", content: "Precisa ser declarado. Sem essa comunicação, a seguradora pode negar indenização em sinistro. A Patro cota com seguradoras que aceitam uso app." },
    ],
    [
      { q: "Vale a pena rastreador?", a: "Sim, especialmente para carros com valor acima de R$ 80k ou em bairros com maior índice de furto. Pode reduzir o prêmio em até 25%." },
      { q: "Posso incluir condutor jovem?", a: "Sim, mas o prêmio aumenta significativamente. Alternativamente, você pode declarar apenas condutor principal e reduzir cobertura." },
      { q: "Seguro cobre danos por chuva de granizo?", a: "Na cobertura compreensiva, sim. Não confunda com apenas RCF-V." },
      { q: "Como funciona o carro reserva?", a: "É um serviço adicional que garante veículo por 7, 15 ou 30 dias em caso de sinistro coberto. Verifique dias e categoria na apólice." },
      { q: "Franquia reduzida vale a pena?", a: "Depende. Se você raramente sinistrou nos últimos 3 anos, franquia normal costuma ser mais econômica." },
    ],
    [
      { term: "Franquia", hint: "Valor pago pelo segurado em sinistro parcial" },
      { term: "Bônus", hint: "Classe de desconto por tempo sem sinistro" },
      { term: "RCF-V", hint: "Responsabilidade Civil por danos a terceiros" },
      { term: "APP", hint: "Cobertura de acidentes pessoais aos passageiros" },
    ],
    "Peça sua cotação de seguro auto agora mesmo",
    "Olá, quero cotar seguro auto com a Patro. Tenho dúvidas específicas.",
  ),
  empresarial: c(
    "Seguro empresarial envolve leitura fina de CNAE, valor de estoque, RC e cobertura de lucros cessantes. A Patro Seguros atende PMEs em Guarulhos e São Paulo — aqui estão as perguntas que mais aparecem.",
    [
      { title: "O que compõe uma apólice empresarial", content: "Incêndio, raio e explosão (básico), roubo/furto qualificado, danos elétricos, vendaval, equipamentos, RC Operações e, opcionalmente, lucros cessantes." },
      { title: "Erros comuns na contratação", content: "Subestimar valor do estoque (gera rateio em sinistro), esquecer melhorias e benfeitorias, e contratar apenas cobertura básica sem RC." },
      { title: "Multi-locais e franquias", content: "Empresas com múltiplos endereços podem ter apólice única, reduzindo custo administrativo e centralizando gestão." },
    ],
    [
      { q: "MEI pode contratar seguro empresarial?", a: "Sim. Existem produtos específicos para MEI com prêmio reduzido." },
      { q: "Como funciona a cobertura de equipamentos?", a: "Inclui computadores, máquinas e ferramentas, com base em valor de reposição." },
      { q: "Preciso de vistoria prévia?", a: "Depende do valor segurado. Acima de determinado LMI, é obrigatória para algumas seguradoras." },
      { q: "Cobertura contra pandemia existe?", a: "Não como cobertura padrão. Cyber e RC podem contemplar cenários específicos." },
      { q: "Contrato B2B exige seguro. Como comprovar?", a: "A seguradora emite certificado com beneficiário — a Patro faz esse trâmite em 24-48h." },
    ],
    [
      { term: "LMI", hint: "Limite Máximo de Indenização por cobertura" },
      { term: "RC Operações", hint: "Danos a terceiros durante a atividade" },
      { term: "Lucros Cessantes", hint: "Indeniza faturamento perdido por sinistro" },
      { term: "Verba", hint: "Cobertura ajustável (ex.: estoque variável)" },
    ],
    "Cote seu seguro empresarial com quem entende de PME",
    "Olá, quero cotar seguro empresarial. Tenho dúvidas específicas sobre coberturas.",
  ),
  saude: c(
    "Plano de saúde é o produto com mais dúvidas contratuais: carência, portabilidade, coparticipação, reajuste e rede. A Patro Seguros trabalha com 20+ operadoras e responde aqui as perguntas mais frequentes.",
    [
      { title: "Individual, PME ou empresarial", content: "Individual custa mais, mas tem reajuste regulado. PME (2-29 vidas) e empresarial (30+) têm reajuste técnico e financeiro — mais volátil, porém preço inicial menor." },
      { title: "Coparticipação", content: "Você paga um percentual sobre uso (consultas, exames). Em troca, mensalidade menor. Vale a pena quando o uso é moderado." },
      { title: "Portabilidade", content: "Permite trocar de operadora sem cumprir carência, respeitando prazos mínimos e regras da ANS." },
    ],
    [
      { q: "Quanto custa um plano PME em Guarulhos?", a: "Depende de idade, cidade e rede. A partir de R$ 200 por vida em planos regionais." },
      { q: "Odontológico já vem incluso?", a: "Não. É contratação separada, geralmente com prêmio muito menor." },
      { q: "Posso incluir dependentes depois?", a: "Sim, respeitando janelas de inclusão (nascimento, casamento, adoção) ou reabertura anual." },
      { q: "Rede nacional vale mais que regional?", a: "Se você viaja ou tem família em outro estado, sim. Caso contrário, regional pode ser mais custo-efetivo." },
      { q: "Reajuste por faixa etária tem limite?", a: "Sim, regulado pela ANS. A Patro simula reajuste dos próximos 5 anos antes da contratação." },
    ],
    [
      { term: "Carência", hint: "Prazo até poder usar coberturas" },
      { term: "Coparticipação", hint: "Percentual pago por uso" },
      { term: "Portabilidade", hint: "Troca de operadora sem carência" },
      { term: "Rol da ANS", hint: "Lista mínima de coberturas obrigatórias" },
    ],
    "Cote seu plano de saúde com 20+ operadoras",
    "Olá, quero cotar plano de saúde. Tenho dúvidas sobre carência e portabilidade.",
  ),
  consorcio: c(
    "Consórcio virou alternativa forte ao financiamento — mas exige leitura precisa de taxa de administração, fundo de reserva e regras do grupo. Este guia responde as perguntas mais comuns.",
    [
      { title: "Como funciona a contemplação", content: "Por sorteio (mensal) ou lance (livre, fixo, embutido). Não há juros; há taxa de administração e fundo de reserva." },
      { title: "Custo efetivo total", content: "Compare a taxa TOTAL (não a mensal). Administradoras usam prazos diferentes — o CET é o único parâmetro comparável." },
      { title: "Uso da carta", content: "Você pode comprar novo, usado, à vista ou negociar melhor preço com o dinheiro em mãos." },
    ],
    [
      { q: "Posso usar FGTS no lance?", a: "Sim, para consórcio de imóvel residencial nas regras do SFH." },
      { q: "Consórcio de serviços existe?", a: "Sim: reforma, viagem, cirurgia, festa, ensino. Regulado pelo Banco Central." },
      { q: "Posso transferir a cota?", a: "Sim, com aprovação da administradora e regras específicas." },
      { q: "O que acontece se eu parar de pagar?", a: "Perde direito à contemplação e recebe valores ao final do grupo, com deduções." },
      { q: "Vale a pena consórcio de moto?", a: "Sim, para quem tem planejamento de médio prazo. A taxa costuma ser competitiva vs. financiamento." },
    ],
    [
      { term: "Carta de crédito", hint: "Valor liberado na contemplação" },
      { term: "Lance", hint: "Antecipação de parcelas para contemplar" },
      { term: "Fundo de reserva", hint: "Garantia coletiva do grupo" },
      { term: "Taxa de administração", hint: "Remuneração da administradora" },
    ],
    "Simule seu consórcio com 4+ administradoras",
    "Olá, quero simular consórcio. Tenho dúvidas sobre taxa e regras.",
  ),
  residencial: c(
    "Seguro residencial é o mais acessível e o mais subutilizado do mercado. Aqui as dúvidas mais frequentes sobre coberturas, RC familiar, aluguel de temporada e assistência 24h.",
    [
      { title: "Coberturas essenciais", content: "Incêndio, raio, explosão (obrigatório em condomínio), danos elétricos, vendaval e roubo/furto qualificado de bens." },
      { title: "RC familiar", content: "Cobre danos causados a terceiros por você ou familiares, dentro ou fora de casa." },
      { title: "Assistência 24h", content: "Chaveiro, encanador, eletricista, vidraceiro, desentupimento — geralmente com franquia zero em serviços emergenciais." },
    ],
    [
      { q: "Locatário precisa de seguro?", a: "Sim. Cobre conteúdo, RC e emergências. O do proprietário cobre estrutura." },
      { q: "Aluguel de temporada tem cobertura específica?", a: "Sim, com produtos para hosts (Airbnb, Booking) e danos causados por hóspedes." },
      { q: "Bike guardada em casa está coberta?", a: "Se declarada, sim. Fora de casa exige cobertura de bike específica." },
      { q: "Vale contratar cobertura de piscina?", a: "Se você tem, sim. RC familiar cobre acidentes de terceiros." },
      { q: "Seguro cobre danos por infiltração?", a: "Não. Manutenção do imóvel é responsabilidade do proprietário." },
    ],
    [
      { term: "RC Familiar", hint: "Danos a terceiros causados pela família" },
      { term: "Conteúdo", hint: "Móveis, eletrodomésticos e pertences" },
      { term: "Danos elétricos", hint: "Queima por variação de tensão" },
      { term: "Vendaval", hint: "Danos por vento forte, chuva ou granizo" },
    ],
    "Cote seu seguro residencial em minutos",
    "Olá, quero cotar seguro residencial. Tenho dúvidas sobre coberturas.",
  ),
  vida: c(
    "Seguro de vida é um dos temas com mais mitos. Aqui reunimos as perguntas frequentes sobre exclusões, capital, morte natural, invalidez e resgate.",
    [
      { title: "Vida vs. previdência", content: "Vida indeniza em morte ou invalidez. Previdência acumula reserva para aposentadoria — são produtos complementares." },
      { title: "Capital adequado", content: "Regra clássica: 5 a 10 anos de renda familiar. Ajuste por dependentes, dívidas e escola dos filhos." },
      { title: "Exclusões comuns", content: "Suicídio nos 2 primeiros anos, prática de esportes de alto risco (sem cobertura extra), atos ilícitos." },
    ],
    [
      { q: "Seguro de vida cobre morte natural?", a: "Sim, na maioria dos produtos. Confirme a cláusula específica." },
      { q: "Como funciona a invalidez por doença?", a: "Depende do produto. Alguns cobrem por doença grave, outros só por acidente." },
      { q: "Doenças preexistentes são cobertas?", a: "Precisam ser declaradas na contratação. Omissão pode gerar negativa em sinistro." },
      { q: "Posso incluir cônjuge e filhos?", a: "Sim, como dependentes. Cada um com capital próprio." },
      { q: "Vida em grupo empresarial é obrigatório?", a: "Depende da CCT do sindicato. Muitas categorias exigem." },
    ],
    [
      { term: "Capital segurado", hint: "Valor pago em caso de sinistro" },
      { term: "Morte natural", hint: "Falecimento por causa não acidental" },
      { term: "IPA", hint: "Invalidez Permanente por Acidente" },
      { term: "Doenças graves", hint: "Câncer, AVC, infarto — cobertura extra" },
    ],
    "Cote seguro de vida com capital adequado ao seu perfil",
    "Olá, quero cotar seguro de vida. Tenho dúvidas sobre coberturas.",
  ),
  garantia: c(
    "Seguro garantia substitui caução em dinheiro e carta bancária. Este guia responde dúvidas de licitantes, contratantes e importadores.",
    [
      { title: "Modalidades", content: "Contratual (público e privado), judicial, aduaneiro, imobiliário. Cada uma exige análise específica." },
      { title: "Prêmio e IS", content: "Prêmio calculado sobre percentual do valor garantido. Franquia inexistente na maioria dos casos." },
      { title: "Aceitação", content: "Órgãos públicos aceitam por lei; contratos privados dependem de cláusula." },
    ],
    [
      { q: "Prazo para emitir garantia?", a: "De 2 a 5 dias úteis após aprovação da análise de crédito." },
      { q: "Garantia judicial substitui depósito?", a: "Sim, com aprovação do juiz. Reduz muito o custo processual." },
      { q: "Preciso de contragarantias?", a: "Depende do valor e do rating. A Patro estrutura a operação para reduzir exigências." },
      { q: "Multa contratual é coberta?", a: "Sim, dentro do limite da apólice e das cláusulas do contrato principal." },
      { q: "Garantia aduaneira substitui caução na Receita?", a: "Sim, para importações e regimes especiais." },
    ],
    [
      { term: "Tomador", hint: "Quem contrata a garantia (fornecedor)" },
      { term: "Segurado", hint: "Beneficiário da garantia (contratante)" },
      { term: "IS", hint: "Importância Segurada" },
      { term: "Contragarantia", hint: "Garantia adicional exigida pela seguradora" },
    ],
    "Estruture seu seguro garantia com a Patro Seguros",
    "Olá, quero cotar seguro garantia. Tenho dúvidas sobre modalidades.",
  ),
  credito: c(
    "Seguro de crédito protege contas a receber contra inadimplência de clientes. Este guia responde as perguntas de empresas exportadoras e do mercado interno.",
    [
      { title: "Interno vs. exportação", content: "Crédito interno cobre inadimplência doméstica; exportação cobre risco político e comercial no exterior." },
      { title: "Limite por comprador", content: "Cada cliente tem análise de crédito individual. A seguradora define limite máximo por comprador." },
      { title: "Indenização", content: "Após período de carência (60-180 dias), a seguradora indeniza percentual do valor não pago." },
    ],
    [
      { q: "Todas as vendas precisam estar seguradas?", a: "Não. Você pode segurar apenas os clientes de maior risco ou concentração." },
      { q: "E se meu cliente entrar em recuperação judicial?", a: "É evento coberto. A seguradora indeniza dentro dos prazos contratuais." },
      { q: "Quanto custa em média?", a: "0,2% a 0,8% sobre o faturamento coberto, dependendo do perfil de risco da carteira." },
      { q: "Preciso repassar aviso de atraso?", a: "Sim, dentro dos prazos contratuais. Atraso na comunicação pode reduzir indenização." },
      { q: "Vale para PME?", a: "Sim. Existem produtos simplificados para PMEs a partir de R$ 500k de faturamento anual." },
    ],
    [
      { term: "Comprador", hint: "Cliente devedor coberto pela apólice" },
      { term: "Carência", hint: "Prazo mínimo antes de indenização" },
      { term: "Franquia", hint: "Percentual não indenizado por sinistro" },
      { term: "Cobertura política", hint: "Risco de moratória ou câmbio em exportação" },
    ],
    "Proteja seu contas a receber com seguro de crédito",
    "Olá, quero cotar seguro de crédito. Tenho dúvidas sobre cobertura.",
  ),
  cyber: c(
    "Seguro cyber virou item essencial após a LGPD. Este guia responde dúvidas sobre cobertura de ransomware, multa e resposta a incidente.",
    [
      { title: "O que o cyber cobre", content: "Resposta a incidente, custos legais, comunicação de crise, extorsão cibernética, perda de receita e multa LGPD (quando aplicável)." },
      { title: "Quem precisa", content: "Toda empresa que trata dados pessoais, aceita pagamento digital ou tem sistemas críticos online — ou seja, praticamente todas." },
      { title: "Controles que reduzem o prêmio", content: "MFA, backups offline, treinamento anti-phishing, política de senha, DPO nomeado." },
    ],
    [
      { q: "Ransomware está coberto?", a: "Sim, incluindo negociação e pagamento (quando permitido por lei)." },
      { q: "Multa da LGPD é coberta?", a: "Sim, dentro do limite e nos casos permitidos pela legislação." },
      { q: "Preciso ter área de TI?", a: "Não. Mas ter controles básicos (MFA, backup) reduz muito o prêmio." },
      { q: "Cobertura para vazamento de dados de clientes?", a: "Sim, incluindo custo de notificação e call center." },
      { q: "Vale para PME?", a: "Sim. PMEs são o alvo mais frequente de ransomware." },
    ],
    [
      { term: "MFA", hint: "Autenticação em dois fatores" },
      { term: "Ransomware", hint: "Sequestro de dados por criptografia" },
      { term: "DPO", hint: "Encarregado pela LGPD" },
      { term: "Incidente", hint: "Evento de segurança que aciona a apólice" },
    ],
    "Cote seguro cyber e adequação LGPD",
    "Olá, quero cotar seguro cyber. Tenho dúvidas sobre coberturas LGPD.",
  ),
  consultorios: c(
    "Consultórios e clínicas concentram equipamentos caros, dados sensíveis e responsabilidade profissional. Este guia responde as dúvidas frequentes de médicos, dentistas, psicólogos e fisioterapeutas.",
    [
      { title: "Coberturas essenciais", content: "Equipamentos, RC Profissional, cyber (LGPD), lucros cessantes e assistência 24h." },
      { title: "RC Profissional", content: "Cobre erro profissional. É contratada por CRM, CRO, CRP ou CREFITO com limite adequado." },
      { title: "Cyber e LGPD", content: "Prontuários eletrônicos e dados de saúde exigem cobertura específica." },
    ],
    [
      { q: "Cadeira odontológica está coberta?", a: "Sim, com valor de reposição. Deve ser declarada com nota fiscal." },
      { q: "Procedimento estético gera cobertura de RC?", a: "Sim, mas RC específica com limite adequado é obrigatória." },
      { q: "Clínica em condomínio precisa de seguro próprio?", a: "Sim. O do condomínio cobre estrutura comum, não os bens da clínica." },
      { q: "Lucros cessantes vale a pena?", a: "Para consultórios com faturamento acima de R$ 30k/mês, sim." },
      { q: "Vale contratar assistência 24h?", a: "Sim. Vidraceiro, eletricista e chaveiro emergenciais reduzem paralisação." },
    ],
    [
      { term: "RC Profissional", hint: "Cobre erro profissional do médico/dentista/psicólogo" },
      { term: "Prontuário eletrônico", hint: "Dados de saúde protegidos pela LGPD" },
      { term: "Lucros cessantes", hint: "Indeniza faturamento em paralisação" },
      { term: "Assistência 24h", hint: "Serviços emergenciais para o consultório" },
    ],
    "Proteja seu consultório com a Patro Seguros",
    "Olá, quero cotar seguro para consultório/clínica.",
  ),
  salas: c(
    "Sala comercial exige atenção redobrada com contrato de locação, exigências do condomínio e coberturas específicas para escritório. Este guia responde dúvidas frequentes.",
    [
      { title: "Contrato de locação", content: "Locatário geralmente é obrigado a contratar seguro incêndio. Complementar com conteúdo e RC é altamente recomendado." },
      { title: "Coberturas comuns", content: "Incêndio, roubo, danos elétricos, equipamentos eletrônicos, RC Operações." },
      { title: "Assistência 24h", content: "Serviços emergenciais (chaveiro, elétrica, hidráulica) — essencial para não paralisar." },
    ],
    [
      { q: "Preciso segurar as benfeitorias?", a: "Sim, se você fez reformas. Não estão no seguro do proprietário." },
      { q: "Home office está coberto pelo residencial?", a: "Depende. Para uso profissional intenso, é recomendado contratar seguro comercial dedicado." },
      { q: "Coworking já vem com seguro?", a: "Espaço comum sim, seus equipamentos não. Contrate cobertura própria." },
      { q: "Sinistro fora do horário comercial é coberto?", a: "Sim, se o risco não foi excluído contratualmente." },
      { q: "RC cobre cliente que se machucou na minha sala?", a: "Sim, na cobertura de RC Operações." },
    ],
    [
      { term: "Benfeitorias", hint: "Reformas e melhorias feitas pelo locatário" },
      { term: "RC Operações", hint: "Danos a terceiros na sua sala" },
      { term: "Conteúdo", hint: "Móveis, equipamentos e utensílios" },
      { term: "Danos elétricos", hint: "Queima por variação de tensão" },
    ],
    "Cote seguro para sua sala comercial",
    "Olá, quero cotar seguro para sala comercial ou escritório.",
  ),
  eletricos: c(
    "Carros elétricos e híbridos têm particularidades importantes: bateria, oficinas credenciadas, valor de reposição e coberturas específicas. Este guia responde as principais dúvidas.",
    [
      { title: "O que muda no seguro elétrico", content: "Bateria (item mais caro), carregador residencial, oficinas especializadas e valor de reposição mais alto." },
      { title: "Seguradoras que aceitam", content: "Nem todas trabalham com todos os modelos. A Patro cota com as que aceitam BYD, Volvo, BMW, Porsche e outras marcas." },
      { title: "Assistência 24h específica", content: "Guincho para elétricos exige equipamento próprio. Verifique cobertura." },
    ],
    [
      { q: "Cobertura de bateria existe?", a: "Sim, incluída no casco em algumas apólices. Confirme antes de contratar." },
      { q: "Carregador residencial está coberto?", a: "Sim, com cobertura específica de danos elétricos + roubo." },
      { q: "Assistência 24h atende elétrico?", a: "Sim, mas com guincho e serviço especializados." },
      { q: "Valor FIPE atualiza corretamente?", a: "Depende do modelo. Para veículos importados, use valor referenciado no contrato." },
      { q: "Vale rastreador em elétrico?", a: "Sim. Reduz prêmio e é altamente recomendado." },
    ],
    [
      { term: "Bateria", hint: "Item mais caro do veículo elétrico" },
      { term: "Carregador residencial", hint: "Equipamento de recarga em casa" },
      { term: "Wallbox", hint: "Carregador de parede residencial" },
      { term: "Oficina credenciada", hint: "Rede específica para elétricos" },
    ],
    "Cote seguro para seu carro elétrico ou híbrido",
    "Olá, quero cotar seguro para carro elétrico/híbrido.",
  ),
};
