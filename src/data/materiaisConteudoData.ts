// Conteúdo aprofundado por material (Fase 3) — Central de Materiais.
// Cada material recebe: introdução, itens de checklist, dicas, blocos de conteúdo
// e FAQs específicas para dar corpo à página de detalhe /materiais/:slug.

export interface MaterialConteudo {
  intro: string;
  benefits: string[];
  checklist: { title: string; items: string[] }[];
  tips: string[];
  faqs: { q: string; a: string }[];
  ctaHeadline: string;
  ctaSubline: string;
}

const c = (
  intro: string,
  benefits: string[],
  checklist: { title: string; items: string[] }[],
  tips: string[],
  faqs: { q: string; a: string }[],
  ctaHeadline: string,
  ctaSubline: string,
): MaterialConteudo => ({ intro, benefits, checklist, tips, faqs, ctaHeadline, ctaSubline });

export const materiaisConteudo: Record<string, MaterialConteudo> = {
  "checklist-renovar-seguro-auto": c(
    "Renovar o seguro auto sem revisar coberturas, franquia e perfil é o principal motivo de sinistros mal indenizados. Este checklist reúne o passo a passo que a Patro Seguros usa para preparar renovações e reduzir prêmio sem abrir mão de proteção.",
    [
      "Reveja coberturas, franquia e assistência 24h antes de renovar",
      "Compare 3+ seguradoras com o mesmo perfil e valor de mercado atualizado",
      "Ajuste condutores, CEP de pernoite e uso do veículo para evitar recusa",
    ],
    [
      {
        title: "Dados do veículo",
        items: [
          "Chassi, placa, Renavam e ano/modelo confirmados",
          "Blindagem, kit gás, som e acessórios declarados",
          "Tabela FIPE atualizada no mês da renovação",
        ],
      },
      {
        title: "Perfil do condutor",
        items: [
          "Condutor principal correto (quem mais usa o carro)",
          "Idade, estado civil e uso profissional atualizados",
          "CEP de pernoite (garagem em casa/trabalho) declarado",
        ],
      },
      {
        title: "Coberturas e serviços",
        items: [
          "Casco, RCF-V (danos a terceiros) e APP revisados",
          "Franquia reduzida/normal comparada em 3 seguradoras",
          "Assistência 24h, carro reserva e vidros conferidos",
        ],
      },
    ],
    [
      "Renove com 15 dias de antecedência para evitar perda de bônus.",
      "Se mudou de bairro em Guarulhos, o CEP pode alterar o prêmio em até 20%.",
      "Peça sempre 3 cotações comparáveis antes de aceitar a renovação automática.",
    ],
    [
      { q: "Perco o bônus se trocar de seguradora?", a: "Não. O bônus (classe) é transferível entre seguradoras. Basta apresentar a apólice anterior sem sinistros." },
      { q: "Vale a pena reduzir franquia?", a: "Depende da diferença de prêmio. A Patro Seguros compara os dois cenários e mostra o retorno real." },
      { q: "Quando renovar o seguro auto?", a: "Idealmente 15 dias antes do vencimento, para negociar coberturas sem pressão." },
    ],
    "Peça sua cotação de renovação em minutos",
    "Envie o checklist preenchido e a Patro Seguros compara as principais seguradoras para você.",
  ),
  "checklist-seguro-empresarial": c(
    "Contratar seguro empresarial sem reunir os dados corretos gera propostas imprecisas e coberturas insuficientes. Este checklist organiza o que sua empresa precisa entregar para uma cotação técnica e comparável.",
    [
      "Cotações mais precisas e comparáveis entre seguradoras",
      "Coberturas alinhadas ao real risco da atividade",
      "Menos surpresas em caso de sinistro (LMI e franquias corretos)",
    ],
    [
      {
        title: "Dados da empresa",
        items: [
          "CNPJ, razão social e CNAE principal e secundários",
          "Endereço, m², tipo de construção e uso do imóvel",
          "Faturamento anual e número de funcionários",
        ],
      },
      {
        title: "Valores em risco",
        items: [
          "Valor de estoque médio e máximo do ano",
          "Equipamentos, máquinas e mobiliário (com nota fiscal quando possível)",
          "Valor de conteúdo e melhorias/benfeitorias no imóvel",
        ],
      },
      {
        title: "Coberturas essenciais",
        items: [
          "Incêndio, raio e explosão (cobertura básica)",
          "Roubo/furto qualificado de bens e valores",
          "Responsabilidade Civil Operações",
          "Lucros cessantes (para operações críticas)",
        ],
      },
    ],
    [
      "Empresas em Guarulhos/Cumbica devem detalhar proximidade com galpões vizinhos.",
      "Fotos do imóvel e do estoque agilizam a cotação em até 48h.",
      "Contratos com clientes podem exigir RC específica — separe-os antes de cotar.",
    ],
    [
      { q: "Meu CNAE influencia no prêmio?", a: "Sim. Cada atividade tem uma tabela própria de risco. A Patro Seguros ajusta a classificação para reduzir o custo quando possível." },
      { q: "Preciso ter alarme e CFTV?", a: "Não é obrigatório, mas reduz o prêmio e amplia o limite de roubo/furto." },
      { q: "Posso cobrir múltiplos endereços?", a: "Sim, com apólice multi-risco. É o mais indicado para redes e franquias." },
    ],
    "Cote seu seguro empresarial com quem entende de PMEs",
    "500+ empresas atendidas em Guarulhos e São Paulo. Envie o checklist e receba 3 propostas comparáveis.",
  ),
  "checklist-plano-saude-empresarial": c(
    "A escolha do plano de saúde empresarial vai muito além do preço por vida. Reajuste, coparticipação, rede e portabilidade impactam a retenção da equipe e o custo em 3 anos. Use este checklist para levar informação precisa à mesa.",
    [
      "Redução de até 30% no custo por vida com o desenho correto",
      "Menor rotatividade e mais retenção de talentos",
      "Previsibilidade de reajuste anual",
    ],
    [
      {
        title: "Perfil da empresa",
        items: [
          "Número total de vidas (titulares + dependentes)",
          "Distribuição por faixa etária",
          "Cidades onde os colaboradores moram e trabalham",
        ],
      },
      {
        title: "Modelo desejado",
        items: [
          "Enfermaria ou apartamento",
          "Com ou sem coparticipação",
          "Rede regional, nacional ou específica (ex.: Einstein, Sírio)",
        ],
      },
      {
        title: "Regras contratuais",
        items: [
          "Prazo de carência aceitável",
          "Reajuste técnico e financeiro dos últimos 3 anos",
          "Regras de portabilidade e inclusão de novos colaboradores",
        ],
      },
    ],
    [
      "PMEs (2 a 29 vidas) têm regras diferentes de reajuste — a Patro faz a leitura do contrato.",
      "Coparticipação de 20-30% reduz muito o custo mensal quando o uso é baixo.",
      "Sempre compare 3+ operadoras (Bradesco, SulAmérica, Amil, NotreDame, Porto).",
    ],
    [
      { q: "Qual o mínimo de vidas para plano PME?", a: "A partir de 2 vidas em várias operadoras, com carência reduzida ou zerada em promoções." },
      { q: "Coparticipação vale a pena?", a: "Sim, quando o uso é moderado. A Patro simula os dois cenários com base no seu histórico." },
      { q: "Posso trocar de operadora sem carência?", a: "Sim, via portabilidade de carências (regras da ANS). Analisamos elegibilidade caso a caso." },
    ],
    "Cote plano de saúde empresarial com 20+ operadoras",
    "A Patro Seguros compara Bradesco, SulAmérica, Amil, NotreDame, Porto e outras. Envie o checklist agora.",
  ),
  "checklist-anual-seguros-empresa": c(
    "Toda empresa deveria fazer uma revisão anual completa dos seus seguros. Coberturas ficam defasadas, o faturamento muda, novos riscos aparecem (cyber, RC ampliada, D&O). Este checklist é o guia que a Patro Seguros aplica em clientes recorrentes.",
    [
      "Identifica coberturas obsoletas ou duplicadas",
      "Alinha LMI e franquias ao faturamento real",
      "Reduz custo total com renegociação simultânea",
    ],
    [
      {
        title: "Patrimonial",
        items: [
          "Revisão de LMI de conteúdo, edificação e estoque",
          "Atualização de melhorias e benfeitorias",
          "Cobertura de equipamentos eletrônicos",
        ],
      },
      {
        title: "Responsabilidade e pessoas",
        items: [
          "RC Operações + RC Produtos + RC Empregador",
          "Vida em grupo com capital atualizado",
          "D&O para diretores (se aplicável)",
        ],
      },
      {
        title: "Novos riscos",
        items: [
          "Cyber (obrigatório para quem trata dados)",
          "Frota (revisão de sinistralidade)",
          "Seguro Garantia (contratual, judicial, aduaneiro)",
        ],
      },
    ],
    [
      "Faça a revisão 60 dias antes da renovação principal.",
      "Consolide vencimentos numa única data — reduz custo administrativo.",
      "Peça um relatório de sinistralidade da corretora antes de renegociar.",
    ],
    [
      { q: "Quanto tempo leva uma revisão anual?", a: "Entre 5 e 15 dias úteis, dependendo do porte. A Patro entrega diagnóstico e plano de ação." },
      { q: "Posso trocar todas as apólices ao mesmo tempo?", a: "Sim, com planejamento. Consolidamos vencimentos e simplificamos a gestão." },
      { q: "Vale contratar D&O?", a: "Empresas com decisões de risco (M&A, exportação, litígios) se beneficiam muito." },
    ],
    "Agende sua revisão anual de seguros com a Patro",
    "Auditamos suas apólices, identificamos gaps e propomos economia sem reduzir proteção.",
  ),
  "checklist-seguro-consultorio": c(
    "Consultórios e clínicas concentram equipamentos caros, dados sensíveis e responsabilidade profissional. Um único sinistro pode paralisar o atendimento por semanas. Este checklist cobre o que a Patro Seguros avalia em consultórios em Guarulhos e São Paulo.",
    [
      "Protege equipamentos, dados e responsabilidade profissional",
      "Evita paralisação por sinistro (lucros cessantes)",
      "Adequação à LGPD via cobertura cyber",
    ],
    [
      {
        title: "Estrutura física",
        items: [
          "Valor dos equipamentos (odontológico, imagem, laser, laboratorial)",
          "Melhorias e benfeitorias no imóvel",
          "Estoque de materiais e insumos",
        ],
      },
      {
        title: "Responsabilidade",
        items: [
          "RC Profissional por CRM/CRO/CRP com limite adequado",
          "RC Operações do estabelecimento",
          "Cobertura para prontuários e cyber",
        ],
      },
      {
        title: "Continuidade",
        items: [
          "Lucros cessantes por sinistro coberto",
          "Assistência 24h para consertos emergenciais",
          "Cobertura para eventos climáticos (chuvas fortes em Guarulhos)",
        ],
      },
    ],
    [
      "Odontologia: cobertura específica para cadeira odontológica e Rx.",
      "Estética: RC ampliada para procedimentos com laser e injetáveis.",
      "Fisioterapia e psicologia: cyber é essencial pelo tratamento de dados sensíveis.",
    ],
    [
      { q: "RC Profissional já vem no seguro do consultório?", a: "Não. É uma cobertura adicional específica, geralmente contratada em conjunto." },
      { q: "Vale a pena contratar Lucros Cessantes?", a: "Para consultórios com faturamento acima de R$ 30k/mês, sim. Cobre custo fixo em caso de paralisação." },
      { q: "Preciso de cyber mesmo sendo pequeno?", a: "Sim, LGPD se aplica a qualquer clínica que trata dados de saúde." },
    ],
    "Proteja seu consultório com a Patro Seguros",
    "Especialistas em clínicas médicas, odontológicas e estéticas em Guarulhos/SP. Envie o checklist.",
  ),
  "checklist-consorcio": c(
    "Consórcio é planejamento de longo prazo — mas exige leitura fina de taxa de administração, fundo de reserva, seguro embutido e regras do grupo. Este checklist evita a maior armadilha: entrar num grupo caro por falta de comparação.",
    [
      "Escolhe a administradora com melhor custo total (não só taxa)",
      "Alinha prazo e valor da carta à realidade financeira",
      "Reduz risco de desistência com regras claras",
    ],
    [
      {
        title: "Objetivo",
        items: [
          "Bem visado: carro, imóvel, veículos pesados, serviços",
          "Valor da carta necessário (com margem)",
          "Prazo desejado (curto contemplação vs. parcela menor)",
        ],
      },
      {
        title: "Custos",
        items: [
          "Taxa de administração total (não a mensal)",
          "Fundo de reserva",
          "Seguro prestamista embutido",
        ],
      },
      {
        title: "Regras do grupo",
        items: [
          "Frequência de assembleias e sorteios",
          "Modalidades de lance (livre, fixo, embutido)",
          "Regras de transferência da carta",
        ],
      },
    ],
    [
      "Compare taxa TOTAL, não a mensal — administradoras usam prazos diferentes.",
      "Simule contemplação por lance e por sorteio antes de assinar.",
      "Consórcio de imóvel aceita usar FGTS no lance — confirme antes.",
    ],
    [
      { q: "Consórcio ou financiamento?", a: "Consórcio custa menos, mas exige planejamento. A Patro compara o custo efetivo total." },
      { q: "Posso desistir?", a: "Sim, mas com regras de restituição definidas no contrato. Ler antes é fundamental." },
      { q: "Qual administradora escolher?", a: "Trabalhamos com as principais (Porto, Yamaha, HS, entre outras). Comparamos custo e histórico." },
    ],
    "Simule seu consórcio com quem compara 4+ administradoras",
    "Auto, imóvel, veículos pesados ou serviços. Envie o checklist e receba propostas comparáveis.",
  ),
  "checklist-seguro-galpao": c(
    "Guarulhos e Cumbica concentram uma das maiores malhas logísticas do país. Segurar um galpão exige leitura precisa de atividade, valor de estoque, proteção contra incêndio e RC. Este checklist é o mesmo que a Patro Seguros aplica em operações de e-commerce, distribuição e transporte.",
    [
      "Cobertura correta para incêndio, roubo e queda de aeronave",
      "LMI ajustado ao valor real de estoque (evita rateio)",
      "RC para clientes e transportadoras que exigem prova de seguro",
    ],
    [
      {
        title: "Imóvel",
        items: [
          "Endereço, m², pé-direito, tipo de cobertura e piso",
          "Distância de outros galpões e de rodovias/aeroporto",
          "Sistemas de combate a incêndio (sprinklers, hidrantes)",
        ],
      },
      {
        title: "Operação",
        items: [
          "Atividade principal e produtos armazenados",
          "Valor médio e máximo de estoque",
          "Movimentação (24h, 12h, dias úteis)",
        ],
      },
      {
        title: "Segurança",
        items: [
          "Alarme, CFTV com gravação e monitoramento",
          "Vigilância patrimonial",
          "Portaria e controle de acesso",
        ],
      },
    ],
    [
      "Cumbica: proximidade com o aeroporto exige cobertura de queda de aeronave.",
      "Estoque de eletrônicos ou cosméticos: LMI de roubo precisa ser proporcional.",
      "Contratos B2B exigem RC ampliada e certificado de seguro para o cliente.",
    ],
    [
      { q: "Preciso de cobertura para inundação?", a: "Em Guarulhos, sim. Áreas próximas a córregos e vias baixas exigem cobertura de alagamento." },
      { q: "Valor de estoque muda mensalmente. Como cobrir?", a: "Com apólice ajustada + declaração mensal (verba estoque) para não sobrecarregar prêmio." },
      { q: "Vale a pena cobrir mercadorias em trânsito?", a: "Se você tem transporte próprio ou contratado, sim. É uma cobertura complementar essencial." },
    ],
    "Cote seu seguro de galpão em Guarulhos e Cumbica",
    "Especialistas em logística e patrimonial. Envie o checklist e receba propostas em 48h.",
  ),
  "checklist-seguro-frota": c(
    "Frotas exigem tratamento diferente de seguros individuais: sinistralidade histórica, uso, tipo de carga e condutores mudam totalmente o prêmio. Este checklist prepara sua empresa para cotar frota com precisão.",
    [
      "Redução de custo com política de sinistralidade",
      "Coberturas ampliadas para uso profissional",
      "Gestão centralizada e relatórios mensais",
    ],
    [
      {
        title: "Composição da frota",
        items: [
          "Quantidade e tipo de veículos (leves, utilitários, pesados)",
          "Ano/modelo e valor FIPE de cada um",
          "Uso: comercial, transporte de passageiros, cargas",
        ],
      },
      {
        title: "Histórico",
        items: [
          "Sinistralidade dos últimos 3 anos",
          "Rotas principais e cidades de circulação",
          "Perfil dos condutores (idade média, tempo de CNH)",
        ],
      },
      {
        title: "Coberturas",
        items: [
          "Casco + RCF-V ampliado",
          "APP + Assistência 24h para toda a frota",
          "Carro reserva conforme criticidade",
        ],
      },
    ],
    [
      "A partir de 4 veículos já vale apólice de frota (prêmio menor).",
      "Instalação de rastreadores reduz prêmio em até 25%.",
      "Frotas com sinistralidade acima de 70% precisam de plano de ação antes da renovação.",
    ],
    [
      { q: "Frota mista (leves + pesados) na mesma apólice?", a: "Sim, é possível e recomendado para reduzir custo administrativo." },
      { q: "Uber e apps na frota?", a: "Precisa de cobertura específica de uso profissional. Não segure sem declarar." },
      { q: "Vale contratar gerenciamento de risco?", a: "Para frotas com 10+ veículos, sim. Reduz sinistralidade e prêmio ao mesmo tempo." },
    ],
    "Cote sua frota com quem entende de gestão",
    "500+ empresas atendidas. Envie o checklist e receba diagnóstico + propostas comparáveis.",
  ),
  "checklist-seguro-cyber": c(
    "O seguro cyber é a única proteção real contra ataques, vazamentos e sanções da LGPD. Mas antes de contratar, é preciso mapear a superfície de risco. Este checklist é o que a Patro Seguros aplica em empresas de todos os portes.",
    [
      "Cobertura para incidente, resposta e multa LGPD",
      "Custos legais e comunicação de crise cobertos",
      "Prêmio compatível com maturidade em segurança",
    ],
    [
      {
        title: "Superfície de risco",
        items: [
          "Volume de dados pessoais tratados",
          "Sistemas críticos (ERP, CRM, e-commerce)",
          "Integrações com terceiros (APIs, fornecedores)",
        ],
      },
      {
        title: "Controles",
        items: [
          "MFA em todos os acessos administrativos",
          "Backups offline e testados",
          "Política de senha e treinamento anti-phishing",
        ],
      },
      {
        title: "Governança",
        items: [
          "DPO ou responsável pela LGPD nomeado",
          "Política de privacidade publicada",
          "Plano de resposta a incidente documentado",
        ],
      },
    ],
    [
      "Empresas com MFA e backup pagam até 40% menos.",
      "Seguros cyber não cobrem multa por dolo — precisa demonstrar boa-fé.",
      "Inclua cobertura de extorsão cibernética (ransomware).",
    ],
    [
      { q: "Preciso ter área de TI para contratar cyber?", a: "Não. Mas ter controles básicos (MFA, backup) reduz muito o prêmio." },
      { q: "Cyber cobre multa da LGPD?", a: "Sim, dentro do limite contratado e nos casos em que a lei permite indenização." },
      { q: "Vale para pequena empresa?", a: "Sim. PMEs são os alvos mais frequentes de ransomware." },
    ],
    "Cote seguro cyber com quem entende de LGPD",
    "Envie o checklist e receba propostas com franquia adequada ao seu porte.",
  ),
  "checklist-imoveis-investimento": c(
    "Imóveis de investimento (locação anual, temporada, mobiliados) exigem coberturas específicas e RC para o proprietário. Este checklist é o guia da Patro Seguros para investidores que querem proteger patrimônio e renda.",
    [
      "Protege imóvel, conteúdo e responsabilidade do proprietário",
      "Cobertura de aluguéis (perda de renda por sinistro)",
      "Facilita adequação a plataformas (Airbnb, Booking)",
    ],
    [
      {
        title: "Imóvel",
        items: [
          "Valor de reconstrução (não de mercado) do imóvel",
          "Valor do conteúdo (mobiliado x sem móveis)",
          "Uso: locação anual, temporada, mista",
        ],
      },
      {
        title: "Perfil de uso",
        items: [
          "Plataformas usadas (Airbnb, Booking, imobiliária)",
          "Ocupação média mensal",
          "Regras da administradora ou condomínio",
        ],
      },
      {
        title: "Coberturas",
        items: [
          "Incêndio + Danos elétricos + Vendaval",
          "RC do proprietário (danos a terceiros no imóvel)",
          "Perda de aluguel por sinistro coberto",
        ],
      },
    ],
    [
      "Temporada: peça cobertura para danos causados por hóspedes.",
      "Mobiliado: fotografe e faça inventário para agilizar sinistro.",
      "Vários imóveis: apólice múltipla reduz custo administrativo.",
    ],
    [
      { q: "Meu inquilino já tem seguro. Preciso do meu?", a: "Sim. O seu cobre a estrutura, o dele cobre o conteúdo dele. São complementares." },
      { q: "Vale a pena para Airbnb?", a: "Sim, e algumas seguradoras já têm produtos específicos para hosts." },
      { q: "Como cobrir vários imóveis?", a: "Com apólice única (multi-locais) — reduz custo e centraliza a gestão." },
    ],
    "Proteja seu portfólio de imóveis com a Patro Seguros",
    "Investidores atendidos em Guarulhos, São Paulo e litoral. Envie o checklist agora.",
  ),
};
