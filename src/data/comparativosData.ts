export interface ComparativoColuna {
  key: string;
  label: string;
  description?: string;
}

export interface ComparativoLinha {
  criterio: string;
  detalhe?: string;
  valores: Record<string, string>;
}

export interface ComparativoCategoria {
  slug: string;
  category: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  colunas: ComparativoColuna[];
  linhas: ComparativoLinha[];
  recomendacao: string;
  relatedHref: string;
  relatedLabel: string;
  faqs: { q: string; a: string }[];
}

export const comparativos: ComparativoCategoria[] = [
  {
    slug: "seguro-auto-basico-intermediario-completo",
    category: "Auto",
    title: "Comparativo Seguro Auto: Básico, Intermediário e Completo",
    h1: "Seguro Auto: qual plano vale mais a pena?",
    description: "Compare coberturas, franquia, assistência e valores médios entre os planos Básico, Intermediário e Completo de seguro auto em Guarulhos e SP.",
    intro: "Escolher o plano certo depende de uso do veículo, valor do carro, região onde circula e perfil do condutor. Este comparativo ajuda a entender o que muda entre os três níveis mais contratados.",
    colunas: [
      { key: "basico", label: "Básico" },
      { key: "intermediario", label: "Intermediário" },
      { key: "completo", label: "Completo" },
    ],
    linhas: [
      { criterio: "Colisão, incêndio e roubo", valores: { basico: "Sim", intermediario: "Sim", completo: "Sim" } },
      { criterio: "Cobertura para terceiros (RCF)", valores: { basico: "R$ 50 mil", intermediario: "R$ 100 mil", completo: "R$ 200 mil+" } },
      { criterio: "Assistência 24h", valores: { basico: "Guincho até 100km", intermediario: "Guincho até 400km", completo: "Ilimitado + carro reserva" } },
      { criterio: "Carro reserva", valores: { basico: "Não", intermediario: "7 dias", completo: "15 a 30 dias" } },
      { criterio: "Vidros, faróis e retrovisores", valores: { basico: "Opcional", intermediario: "Incluso (vidros)", completo: "Vidros + faróis + retros" } },
      { criterio: "Danos por enchente e granizo", valores: { basico: "Não", intermediario: "Sim", completo: "Sim" } },
      { criterio: "APP (acidentes pessoais)", valores: { basico: "R$ 5 mil", intermediario: "R$ 10 mil", completo: "R$ 20 mil+" } },
      { criterio: "Franquia média", valores: { basico: "Alta", intermediario: "Normal", completo: "Reduzida" } },
      { criterio: "Indicado para", detalhe: "Perfil típico", valores: { basico: "Carros populares, uso leve", intermediario: "Uso urbano diário", completo: "Carros novos, financiados ou premium" } },
    ],
    recomendacao: "Para carros com menos de 5 anos, financiados ou usados profissionalmente (Uber, 99), o plano Completo costuma compensar. Para veículos populares quitados, o Intermediário oferece o melhor equilíbrio custo x proteção.",
    relatedHref: "/seguro-auto",
    relatedLabel: "Ver Seguro Auto",
    faqs: [
      { q: "Qual a diferença prática entre RCF de R$ 100 mil e R$ 200 mil?", a: "RCF cobre danos que você causa a terceiros. R$ 100 mil resolve batidas comuns, mas se você bater em um carro de luxo ou causar lesão corporal grave, R$ 200 mil (ou mais) evita que o excedente saia do seu bolso." },
      { q: "Vale a pena pagar franquia reduzida?", a: "Sim para quem usa muito o carro (Uber, entregas, deslocamento diário). A franquia reduzida costuma custar 10-15% a mais no prêmio, mas paga a diferença já no primeiro sinistro." },
      { q: "Consigo montar um plano personalizado?", a: "Sim. A Patro Seguros monta a apólice a partir das coberturas que fazem sentido para o seu perfil, sem pacotes engessados." },
    ],
  },
  {
    slug: "seguro-empresarial-pme-media-grande",
    category: "Empresarial",
    title: "Comparativo Seguro Empresarial: PME, Média e Grande empresa",
    h1: "Seguro Empresarial: PME, Média Empresa ou Grande Risco?",
    description: "Diferenças de cobertura, LMI, RC e assistência entre seguros empresariais para pequenas, médias e grandes empresas em Guarulhos e região.",
    intro: "O porte da empresa muda tudo: LMI, exigência de vistoria, coberturas obrigatórias e valor final. Compare abaixo as três modalidades mais contratadas.",
    colunas: [
      { key: "pme", label: "PME" },
      { key: "media", label: "Média Empresa" },
      { key: "grande", label: "Grande Risco" },
    ],
    linhas: [
      { criterio: "Faturamento típico", valores: { pme: "Até R$ 4,8 mi", media: "R$ 4,8 mi a R$ 300 mi", grande: "Acima de R$ 300 mi" } },
      { criterio: "Incêndio, raio e explosão", valores: { pme: "Básico", media: "LMI ampliado", grande: "Multirrisco customizado" } },
      { criterio: "Roubo e furto qualificado", valores: { pme: "Sim (LMI padrão)", media: "Sim (LMI negociado)", grande: "Sim + transporte de valores" } },
      { criterio: "Lucros cessantes", valores: { pme: "Opcional", media: "Recomendado", grande: "Essencial" } },
      { criterio: "Responsabilidade Civil (RC)", valores: { pme: "R$ 100 mil", media: "R$ 500 mil - R$ 2 mi", grande: "R$ 5 mi - R$ 50 mi+" } },
      { criterio: "D&O (executivos)", valores: { pme: "Raramente", media: "Recomendado", grande: "Padrão" } },
      { criterio: "Cyber", valores: { pme: "Opcional", media: "Recomendado", grande: "Padrão" } },
      { criterio: "Vistoria prévia", valores: { pme: "Fotos e questionário", media: "Vistoria técnica", grande: "Engenharia de risco" } },
      { criterio: "Prazo médio de emissão", valores: { pme: "24-48h", media: "5-10 dias", grande: "15-30 dias" } },
    ],
    recomendacao: "PMEs se beneficiam de pacotes multirrisco prontos com bom custo. A partir de R$ 5 milhões em ativos ou faturamento, vale contratar cobertura sob medida com engenharia de risco.",
    relatedHref: "/seguro-empresarial",
    relatedLabel: "Ver Seguro Empresarial",
    faqs: [
      { q: "Minha empresa fatura R$ 2 milhões. Qual modalidade escolher?", a: "Enquadra-se em PME. Um multirrisco empresarial com LMI adequado ao valor do estoque, equipamentos e faturamento resolve. Vale incluir RC e cyber se lida com dados de clientes." },
      { q: "Preciso de engenharia de risco?", a: "Sim quando o LMI ultrapassa R$ 10 milhões, quando há atividade industrial ou armazenagem de risco especial. A vistoria técnica reduz o prêmio e evita recusa de sinistro." },
      { q: "Posso somar coberturas de diferentes seguradoras?", a: "Sim. Grandes riscos costumam ter cosseguro (várias seguradoras dividindo). A Patro Seguros estrutura essas apólices coordenadas." },
    ],
  },
  {
    slug: "plano-saude-individual-familiar-empresarial",
    category: "Saúde",
    title: "Comparativo Planos de Saúde: Individual, Familiar e Empresarial",
    h1: "Plano de Saúde: Individual, Familiar ou Empresarial?",
    description: "Compare preço, reajuste, carência, rede e portabilidade entre planos de saúde individual, familiar e empresarial em Guarulhos/SP.",
    intro: "A modalidade certa impacta reajuste anual, acesso à rede e valor mensal. Confira o comparativo dos três formatos mais procurados.",
    colunas: [
      { key: "individual", label: "Individual" },
      { key: "familiar", label: "Familiar" },
      { key: "empresarial", label: "Empresarial (PME/Grande)" },
    ],
    linhas: [
      { criterio: "Contratação", valores: { individual: "Direto pessoa física", familiar: "Titular + dependentes", empresarial: "CNPJ (a partir de 2 vidas)" } },
      { criterio: "Reajuste anual", valores: { individual: "Definido pela ANS", familiar: "Definido pela ANS", empresarial: "Livre negociação por sinistralidade" } },
      { criterio: "Carência", valores: { individual: "Padrão ANS", familiar: "Padrão ANS", empresarial: "Reduzida ou zerada (com portabilidade)" } },
      { criterio: "Preço médio", valores: { individual: "Mais alto", familiar: "Médio (por vida)", empresarial: "Menor por vida" } },
      { criterio: "Coparticipação", valores: { individual: "Opcional", familiar: "Opcional", empresarial: "Comum (reduz mensalidade)" } },
      { criterio: "Rede disponível", valores: { individual: "Ampla", familiar: "Ampla", empresarial: "Todas as opções (executivo, master)" } },
      { criterio: "Portabilidade", valores: { individual: "Sim (após 2 anos)", familiar: "Sim (após 2 anos)", empresarial: "Sim, com regras específicas" } },
      { criterio: "Reembolso", valores: { individual: "Depende do plano", familiar: "Depende do plano", empresarial: "Comum em planos executivos" } },
    ],
    recomendacao: "Para famílias, o plano familiar tende a ser mais barato por vida. Empresas com CNPJ (mesmo MEI com 2 vidas) conseguem preço 30-50% menor via empresarial. Individual só compensa em nichos muito específicos.",
    relatedHref: "/plano-de-saude-guarulhos",
    relatedLabel: "Ver Planos de Saúde",
    faqs: [
      { q: "MEI pode contratar plano empresarial?", a: "Sim, desde que tenha ao menos 2 vidas (titular + 1 dependente/sócio). É a forma mais econômica para autônomos." },
      { q: "O reajuste do empresarial é sempre maior?", a: "Não. Empresas com boa sinistralidade conseguem reajustes menores que a ANS. A Patro Seguros negocia essa revisão anualmente." },
      { q: "Vale pagar coparticipação?", a: "Sim para quem usa pouco o plano. Reduz mensalidade em 20-40% e você paga só quando usar consulta, exame ou terapia." },
    ],
  },
  {
    slug: "seguro-residencial-basico-completo-locacao",
    category: "Residencial",
    title: "Comparativo Seguro Residencial: Básico, Completo e para Locação",
    h1: "Seguro Residencial: qual perfil de cobertura escolher?",
    description: "Compare coberturas, assistências e valor entre seguro residencial básico, completo e voltado para imóveis alugados ou de temporada.",
    intro: "Casa própria, apartamento, imóvel financiado ou para aluguel? Cada situação pede um pacote diferente. Veja o que muda entre as três modalidades mais contratadas.",
    colunas: [
      { key: "basico", label: "Básico" },
      { key: "completo", label: "Completo" },
      { key: "locacao", label: "Locação/Temporada" },
    ],
    linhas: [
      { criterio: "Incêndio, raio e explosão", valores: { basico: "Sim", completo: "Sim", locacao: "Sim" } },
      { criterio: "Roubo e furto de bens", valores: { basico: "Não", completo: "Sim", locacao: "Sim" } },
      { criterio: "Danos elétricos", valores: { basico: "Não", completo: "Sim", locacao: "Sim" } },
      { criterio: "Vendaval, granizo e alagamento", valores: { basico: "Não", completo: "Sim", locacao: "Sim" } },
      { criterio: "RC familiar", valores: { basico: "Opcional", completo: "Sim", locacao: "Sim (inquilino/proprietário)" } },
      { criterio: "Assistência 24h", valores: { basico: "Emergências (chaveiro)", completo: "Encanador + eletricista + limpeza", locacao: "Rede completa + turismo" } },
      { criterio: "Conteúdo/mobília", valores: { basico: "Não", completo: "Sim", locacao: "Cobertura para o mobiliado" } },
      { criterio: "Perda de aluguel", valores: { basico: "Não", completo: "Opcional", locacao: "Sim (essencial)" } },
    ],
    recomendacao: "Casa própria ou financiada: plano Completo. Imóvel de investimento ou temporada (Airbnb): plano Locação com perda de aluguel. Básico só se o imóvel está vazio e sem bens de valor.",
    relatedHref: "/seguro-residencial",
    relatedLabel: "Ver Seguro Residencial",
    faqs: [
      { q: "Financiei o imóvel pela Caixa. Preciso de outro seguro?", a: "O seguro habitacional do financiamento cobre só a estrutura (incêndio) e o saldo devedor. Ele NÃO cobre roubo, conteúdo, danos elétricos ou RC. Um residencial completo se soma a ele." },
      { q: "Meu imóvel é alugado por temporada. Preciso de seguro específico?", a: "Sim. O seguro de locação/temporada cobre mobília, danos causados por hóspedes e perda de aluguel. É diferente do residencial comum." },
      { q: "Vale contratar RC familiar?", a: "Sim. Cobre danos a vizinhos (vazamento que atinge o apartamento de baixo, cachorro que morde um visitante). Custa pouco e evita brigas judiciais." },
    ],
  },
  {
    slug: "consorcio-vs-financiamento-vs-a-vista",
    category: "Consórcio",
    title: "Comparativo: Consórcio, Financiamento e Compra à Vista",
    h1: "Consórcio, financiamento ou à vista: qual vale mais a pena?",
    description: "Compare custo total, juros, prazo, contemplação e liquidez entre consórcio, financiamento bancário e compra à vista para veículos ou imóveis.",
    intro: "As três formas mais comuns de adquirir um bem têm perfis muito diferentes. Veja o que cada uma entrega e quando faz sentido escolher.",
    colunas: [
      { key: "consorcio", label: "Consórcio" },
      { key: "financ", label: "Financiamento" },
      { key: "vista", label: "À Vista" },
    ],
    linhas: [
      { criterio: "Juros", valores: { consorcio: "Não tem (só taxa adm.)", financ: "1% a 2,5% ao mês", vista: "Zero" } },
      { criterio: "Custo total (aproximado)", valores: { consorcio: "15-20% acima do bem", financ: "70-140% acima do bem", vista: "Preço do bem" } },
      { criterio: "Liberação do bem", valores: { consorcio: "Contemplação (sorteio ou lance)", financ: "Imediata", vista: "Imediata" } },
      { criterio: "Prazo", valores: { consorcio: "60 a 240 meses", financ: "60 a 420 meses", vista: "N/A" } },
      { criterio: "Análise de crédito", valores: { consorcio: "Necessária (aprovação flexível)", financ: "Necessária (rigorosa)", vista: "Não" } },
      { criterio: "Entrada obrigatória", valores: { consorcio: "Não", financ: "Sim (10-30%)", vista: "100%" } },
      { criterio: "Uso do FGTS", valores: { consorcio: "Sim (imóveis)", financ: "Sim (imóveis)", vista: "Sim (imóveis)" } },
      { criterio: "Melhor para", valores: { consorcio: "Quem pode esperar e planeja", financ: "Quem precisa agora e tem renda alta", vista: "Quem tem o valor disponível" } },
    ],
    recomendacao: "Consórcio é o meio-termo ideal para quem não tem pressa e não quer pagar juros. Financiamento resolve urgência mas cobra caro. À vista é imbatível quando o dinheiro não está aplicado rendendo mais que o custo do financiamento.",
    relatedHref: "/consorcio",
    relatedLabel: "Ver Consórcio",
    faqs: [
      { q: "Consigo dar lance no consórcio?", a: "Sim. Lance embutido usa parte do próprio crédito. Lance livre usa recursos próprios. Ambos aumentam a chance de contemplação antecipada." },
      { q: "Posso quitar o consórcio antes do prazo?", a: "Sim, com o próprio crédito contemplado ou com recursos próprios. A quitação antecipada gera desconto proporcional na taxa administrativa." },
      { q: "E se eu desistir?", a: "Você recebe o valor pago corrigido, mas só ao final do grupo (ou por sorteio de desistentes). Por isso o consórcio exige planejamento." },
    ],
  },
  {
    slug: "seguro-vida-individual-empresarial-prestamista",
    category: "Vida",
    title: "Comparativo Seguro de Vida: Individual, Empresarial e Prestamista",
    h1: "Seguro de Vida: Individual, Empresarial ou Prestamista?",
    description: "Compare coberturas, indicações, prêmio e uso entre seguro de vida individual, em grupo (empresarial) e prestamista de financiamento.",
    intro: "O mesmo nome, três produtos bem distintos. Veja qual atende sua realidade — proteção familiar, benefício corporativo ou garantia de dívida.",
    colunas: [
      { key: "ind", label: "Individual" },
      { key: "emp", label: "Empresarial (Grupo)" },
      { key: "prest", label: "Prestamista" },
    ],
    linhas: [
      { criterio: "Contratante", valores: { ind: "Pessoa física", emp: "Empresa (CNPJ)", prest: "Banco/financeira (embutido no contrato)" } },
      { criterio: "Beneficiários", valores: { ind: "Livre escolha", emp: "Livre (dentro de regras)", prest: "Credor (banco)" } },
      { criterio: "Capital contratado", valores: { ind: "Livre (até R$ 3 mi+)", emp: "Múltiplos do salário", prest: "Valor da dívida" } },
      { criterio: "Morte por qualquer causa", valores: { ind: "Sim", emp: "Sim", prest: "Sim" } },
      { criterio: "Invalidez permanente", valores: { ind: "Opcional", emp: "Comum", prest: "Comum" } },
      { criterio: "Doenças graves", valores: { ind: "Opcional", emp: "Opcional", prest: "Não" } },
      { criterio: "Assistência funeral", valores: { ind: "Opcional", emp: "Comum", prest: "Não" } },
      { criterio: "Prêmio médio", valores: { ind: "Sob medida (varia por idade)", emp: "Diluído no grupo (barato)", prest: "Embutido na parcela" } },
      { criterio: "Vantagens", valores: { ind: "Personalização total, portabilidade", emp: "Custo baixo, benefício de RH", prest: "Prático (contratado junto com crédito)" } },
    ],
    recomendacao: "Individual: proteção familiar de longo prazo. Empresarial: benefício estratégico de retenção. Prestamista: só quando exigido pelo banco — cotar por fora costuma ser mais barato.",
    relatedHref: "/seguro-vida",
    relatedLabel: "Ver Seguro de Vida",
    faqs: [
      { q: "Posso ter os três ao mesmo tempo?", a: "Sim, cada um cobre um risco diferente. É comum ter individual (família) + empresarial (empresa) + prestamista (financiamento imobiliário)." },
      { q: "O empresarial cobre demissão?", a: "A cobertura padrão termina ao desligar. Alguns planos permitem portabilidade para individual sem nova carência." },
      { q: "Vale substituir o prestamista do banco?", a: "Sim quando o banco exige apólice atrelada. Você cota por fora, contrata com o mesmo capital e apresenta ao banco — geralmente sai 30-60% mais barato." },
    ],
  },
];

export const comparativosBySlug = new Map(comparativos.map((c) => [c.slug, c]));
export const COMPARATIVOS_SLUGS = comparativos.map((c) => c.slug);