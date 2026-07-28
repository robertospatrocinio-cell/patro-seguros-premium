export interface FaqQA { q: string; a: string; }
export interface FaqCategory {
  id: string;
  title: string;
  description: string;
  relatedHref: string;
  relatedLabel: string;
  perguntas: FaqQA[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "auto",
    title: "Seguro Auto",
    description: "Dúvidas comuns sobre cobertura, franquia, assistência e uso do carro.",
    relatedHref: "/seguro-auto",
    relatedLabel: "Ver Seguro Auto",
    perguntas: [
      { q: "Seguro auto cobre enchente?", a: "Depende da apólice. Perdas por alagamento costumam ser cobertas nas modalidades compreensivas, mas há exclusões — sempre confirme condições contratadas e franquia." },
      { q: "Como funciona a franquia?", a: "Franquia é a parte que o segurado paga em caso de sinistro parcial. Franquia reduzida encarece o prêmio; franquia normal é o padrão." },
      { q: "Posso usar meu carro para app com seguro comum?", a: "Não. É necessário informar o uso profissional para app (Uber, 99). Sem essa comunicação, a seguradora pode negar indenização." },
      { q: "Seguro para carro elétrico é diferente?", a: "Sim. Bateria, carregadores e reparos exigem oficinas especializadas — nem toda seguradora aceita todos os modelos." },
      { q: "Quanto custa em Guarulhos?", a: "Depende de perfil do condutor, veículo, CEP, uso e coberturas. A cotação é feita sob análise e aceitação da seguradora." },
    ],
  },
  {
    id: "empresarial",
    title: "Seguro Empresarial",
    description: "Coberturas para comércio, indústria, escritório, clínica e galpões.",
    relatedHref: "/seguro-empresarial",
    relatedLabel: "Ver Seguro Empresarial",
    perguntas: [
      { q: "O que cobre o seguro empresarial?", a: "Normalmente incêndio, raio, explosão, roubo/furto qualificado, danos elétricos, vendaval, equipamentos e RC — combinações variam por apólice." },
      { q: "Lucros cessantes vale a pena?", a: "Para empresas com faturamento contínuo, sim. Indeniza o lucro perdido durante paralisação por sinistro coberto." },
      { q: "Preciso de RC Operações?", a: "Sim, quando há circulação de terceiros ou risco de dano a terceiros durante a operação — comércio, clínica, escritório, galpão." },
      { q: "Sala comercial alugada precisa de seguro?", a: "Contratualmente costuma exigir seguro de incêndio; o locatário pode complementar com conteúdo, equipamentos e RC." },
      { q: "Como cotar seguro para galpão em Cumbica?", a: "Envie endereço, atividade, m², valor de estoque e conteúdo. A Patro compara seguradoras parceiras conforme aceitação." },
    ],
  },
  {
    id: "saude",
    title: "Plano de Saúde",
    description: "Individual, MEI, PME, empresarial, carência, coparticipação e portabilidade.",
    relatedHref: "/plano-de-saude-guarulhos",
    relatedLabel: "Ver Planos de Saúde",
    perguntas: [
      { q: "MEI pode contratar plano empresarial?", a: "Sim. MEI com CNPJ ativo pode contratar planos coletivos empresariais, conforme regras da operadora e da ANS." },
      { q: "Como funciona a coparticipação?", a: "O beneficiário paga um percentual sobre consultas/exames utilizados. Em troca, a mensalidade é menor." },
      { q: "O que é carência?", a: "Prazo mínimo após a contratação antes de poder utilizar coberturas específicas (consultas, exames, internação, parto)." },
      { q: "Portabilidade zera carências?", a: "Em muitos casos sim, respeitando prazos mínimos no plano de origem e regras da ANS." },
      { q: "Como comparar rede credenciada em Guarulhos?", a: "Verifique hospitais, laboratórios e especialistas por operadora — não olhe só preço." },
    ],
  },
  {
    id: "consorcio",
    title: "Consórcio",
    description: "Carta de crédito, sorteio, lance, taxa de administração e regulação do Banco Central.",
    relatedHref: "/consorcio",
    relatedLabel: "Ver Consórcios",
    perguntas: [
      { q: "Consórcio tem juros?", a: "Não há juros de financiamento. Há taxa de administração, fundo de reserva e, opcionalmente, seguro." },
      { q: "Como funciona o lance?", a: "É uma antecipação de parcelas para tentar ser contemplado antes do sorteio, conforme regras do grupo." },
      { q: "Consórcio de imóveis serve para galpão?", a: "Sim. Cartas de crédito de imóveis podem ser usadas para imóveis comerciais, respeitando regras do grupo." },
      { q: "Posso usar FGTS?", a: "Em consórcios de imóveis, o FGTS pode ser usado para lance ou complemento, conforme regras da Caixa e do grupo." },
      { q: "Consórcio é regulado?", a: "Sim, pelo Banco Central do Brasil." },
    ],
  },
  {
    id: "residencial",
    title: "Seguro Residencial",
    description: "Casa, apartamento, flat, imóvel alugado ou mobiliado.",
    relatedHref: "/seguro-residencial",
    relatedLabel: "Ver Seguro Residencial",
    perguntas: [
      { q: "Cobre danos elétricos?", a: "Sim, quando contratada a cobertura específica. Franquia costuma se aplicar." },
      { q: "Imóvel alugado precisa?", a: "Contratos costumam exigir seguro incêndio; conteúdo e RC familiar podem ser complementos do locatário." },
      { q: "Cobre roubo?", a: "Sim, geralmente sob a modalidade 'roubo/furto qualificado' — mediante vestígios." },
      { q: "Assistência 24h serve para quê?", a: "Chaveiro, encanador, eletricista, vidraceiro e outros serviços emergenciais conforme apólice." },
      { q: "Airbnb precisa de seguro específico?", a: "Sim. Uso de temporada exige comunicação à seguradora e produtos com aceite para esse uso." },
    ],
  },
  {
    id: "vida",
    title: "Seguro de Vida",
    description: "Morte, invalidez, doenças graves e planejamento familiar.",
    relatedHref: "/seguro-vida",
    relatedLabel: "Ver Seguro de Vida",
    perguntas: [
      { q: "Quanto de capital contratar?", a: "Regra prática: 10 a 15 vezes a renda anual, ajustado a dívidas, dependentes e patrimônio." },
      { q: "Cobre morte natural?", a: "Sim, na maioria das apólices individuais, após carência inicial." },
      { q: "Doenças graves entra sempre?", a: "É cobertura adicional, sujeita a análise, DPS e aceitação." },
      { q: "Beneficiário precisa ser familiar?", a: "Não. Pode ser qualquer pessoa física ou jurídica indicada pelo segurado." },
      { q: "Seguro de vida empresarial substitui o individual?", a: "Não. Complementa. O empresarial costuma ter capital menor e depender do vínculo com a empresa." },
    ],
  },
  {
    id: "garantia",
    title: "Seguro Garantia",
    description: "Licitação, contratual, judicial e substituição de fiança/caução.",
    relatedHref: "/seguro-garantia",
    relatedLabel: "Ver Seguro Garantia",
    perguntas: [
      { q: "Substitui fiança bancária?", a: "Sim, em muitos casos, com custo geralmente menor e sem consumo de limite bancário." },
      { q: "O que é garantia judicial?", a: "Substitui depósito judicial em dinheiro, liberando capital de giro." },
      { q: "Documentos necessários?", a: "Balanços, contratos, edital, comprovantes e informações societárias — variam por seguradora." },
      { q: "Aceitação é garantida?", a: "Não. Passa por análise técnica e financeira da seguradora." },
      { q: "Prazo médio de emissão?", a: "Depende da análise; casos simples saem em dias, casos complexos podem levar semanas." },
    ],
  },
  {
    id: "credito",
    title: "Seguro de Crédito",
    description: "Proteção contra inadimplência em vendas a prazo B2B.",
    relatedHref: "/seguro-de-credito",
    relatedLabel: "Ver Seguro de Crédito",
    perguntas: [
      { q: "Vale para PME?", a: "Sim. Existem apólices simplificadas para pequenas e médias empresas." },
      { q: "Cobre exportação?", a: "Sim, seguradoras específicas oferecem cobertura para riscos comerciais e políticos." },
      { q: "Precisa segurar toda a carteira?", a: "Depende do produto. Alguns exigem carteira integral; outros permitem seleção por cliente." },
      { q: "Impacta limite de crédito bancário?", a: "Pode ajudar a ampliar linhas ao demonstrar mitigação de risco." },
    ],
  },
  {
    id: "cyber",
    title: "Seguro Cyber",
    description: "Vazamento de dados, ransomware, LGPD e resposta a incidentes.",
    relatedHref: "/seguro-cyber",
    relatedLabel: "Ver Seguro Cyber",
    perguntas: [
      { q: "Cobre multa da LGPD?", a: "Multas administrativas geralmente não são indenizáveis; despesas de resposta, notificação e defesa costumam ser cobertas conforme apólice." },
      { q: "Pequenas empresas precisam?", a: "Sim, especialmente com dados de clientes, e-commerce ou integrações bancárias." },
      { q: "Cobre ransomware?", a: "Muitas apólices cobrem custos de contenção, recuperação e negociação, conforme condições contratadas." },
      { q: "Precisa de análise técnica?", a: "Sim. As seguradoras avaliam controles mínimos (MFA, backups, treinamento) antes de aceitar." },
    ],
  },
  {
    id: "consultorios",
    title: "Seguro para Consultórios",
    description: "Médico, odontológico, veterinário e estética.",
    relatedHref: "/seguro-consultorio-guarulhos",
    relatedLabel: "Ver Seguro para Consultórios",
    perguntas: [
      { q: "RC Profissional é obrigatório?", a: "Não é obrigatório por lei, mas é altamente recomendado para proteger o profissional contra reclamações técnicas." },
      { q: "Cobre equipamentos odontológicos?", a: "Sim, em modalidade equipamentos ou multirrisco, conforme apólice." },
      { q: "Consultório alugado precisa?", a: "Contrato costuma exigir incêndio; RC, conteúdo e equipamentos são complementos do locatário." },
      { q: "Clínica estética entra?", a: "Sim, com análise específica devido à atividade e equipamentos." },
    ],
  },
  {
    id: "salas",
    title: "Seguro para Salas Comerciais",
    description: "Escritórios, coworkings e prestadores em salas comerciais.",
    relatedHref: "/seguro-sala-comercial",
    relatedLabel: "Ver Seguro para Sala Comercial",
    perguntas: [
      { q: "Precisa mesmo com seguro do condomínio?", a: "Sim. O seguro condominial cobre áreas comuns; conteúdo, equipamentos e RC do ocupante ficam de fora." },
      { q: "Cobre computadores e servidores?", a: "Sim, em equipamentos eletrônicos fixos ou portáteis." },
      { q: "RC Operações vale para escritório?", a: "Sim, para danos a terceiros que possam ocorrer no local." },
    ],
  },
  {
    id: "eletricos",
    title: "Seguro para Veículos Elétricos",
    description: "BYD, Volvo, Tesla e demais híbridos/elétricos.",
    relatedHref: "/seguro-veiculos-eletricos",
    relatedLabel: "Ver Seguro para Veículos Elétricos",
    perguntas: [
      { q: "Cobre bateria?", a: "Depende da apólice — bateria é componente de alto valor e cada seguradora trata de forma específica." },
      { q: "Precisa de oficina credenciada?", a: "Sim. Reparos costumam exigir rede especializada indicada pela seguradora." },
      { q: "Assistência inclui reboque de elétrico?", a: "Sim, com procedimentos específicos para transporte seguro." },
    ],
  },
];