/**
 * Banco central de FAQs do cluster Seguro de Galpão organizadas por
 * intenção de busca (Search Intent). Usado por:
 *   - /seguro-galpao (hub nacional)
 *   - /seguro-galpoes-industriais
 *   - /seguro-galpao-guarulhos (página local)
 *   - /seguro-galpao-cumbica (página local)
 *
 * Cada bloco mapeia uma intenção:
 *   - informational: "o que é", "como funciona", "o que cobre"
 *   - transactional: "quanto custa", "como contratar", "cotar"
 *   - comparison: "qual a melhor", "X vs Y", "diferença entre"
 *   - technical: long-tail técnico (LMI, AVCB, sprinkler, RC armazenagem, cadeia de frio)
 *   - localGuarulhos / localCumbica: hiperlocais por bairro/CEP
 *   - navigational: "Patro Seguros galpão", contato, regulação de sinistro
 *
 * Os textos aqui são únicos para cada Q&A e são consumidos pelo
 * FAQSchema (FAQPage JSON-LD) em InsurancePageTemplate ou pelo
 * LocalAreaSchema em LocalPageTemplate.
 */

export interface FAQ {
  question: string;
  answer: string;
}

export type GalpaoFAQIntent =
  | "informational"
  | "transactional"
  | "comparison"
  | "technical"
  | "localGuarulhos"
  | "localCumbica"
  | "navigational";

export const galpaoClusterFAQs: Record<GalpaoFAQIntent, FAQ[]> = {
  informational: [
    {
      question: "O que é seguro de galpão e qual a diferença para seguro empresarial comum?",
      answer:
        "Seguro de galpão é uma modalidade do seguro empresarial (Riscos Patrimoniais) com coberturas, cláusulas e LMI dimensionados para a operação de armazenagem em larga escala: incêndio em estrutura metálica, roubo qualificado de mercadoria, RC armazenagem, equipamentos eletrônicos (WMS, CFTV, empilhadeiras) e lucros cessantes proporcionais ao tempo de reconstrução. Um seguro empresarial 'comum' (loja, escritório) não contempla o risco patrimonial pesado de um galpão e gera subseguro grave em sinistro.",
    },
    {
      question: "Quais coberturas básicas todo seguro de galpão precisa ter?",
      answer:
        "Quatro coberturas mínimas: (1) Incêndio, raio e explosão (cobertura básica obrigatória), (2) Roubo e furto qualificado de mercadoria, (3) Danos elétricos para equipamentos e (4) RC operações para danos a terceiros dentro do galpão. Para operações com mercadoria de terceiros, adicione obrigatoriamente RC Armazenagem. Para operações que param a empresa em caso de sinistro, adicione Lucros Cessantes (até 12 meses).",
    },
    {
      question: "Seguro de galpão cobre o estoque (mercadoria) ou só o imóvel?",
      answer:
        "Cobre os dois, desde que declarados na apólice. O imóvel entra no LMI de Estrutura/Conteúdo Próprio e o estoque entra no LMI de Mercadoria, com sublimites para roubo, danos elétricos e equipamentos. Para mercadoria de clientes (3PL, fulfillment), use a cobertura específica de RC Armazenagem — sem ela, mercadoria de terceiros fica descoberta e a operadora responde com patrimônio próprio.",
    },
    {
      question: "O que NÃO está coberto no seguro de galpão (principais exclusões)?",
      answer:
        "Exclusões comuns: desgaste natural, vícios construtivos, AVCB vencido (em algumas seguradoras), guerra/terrorismo, ato doloso do segurado, mercadoria sem declaração no inventário, carga em trânsito (essa exige RCTR-C separado), produtos químicos/perigosos sem RC ambiental específica e furto simples (sem vestígios de arrombamento). Toda exclusão precisa estar destacada na apólice — a Patro audita o contrato cláusula a cláusula antes da assinatura.",
    },
  ],

  transactional: [
    {
      question: "Como contratar seguro de galpão pela Patro Seguros?",
      answer:
        "Em 4 passos: (1) Você envia área, atividade, valor de mercadoria média e endereço pelo WhatsApp ou formulário; (2) A Patro pré-cota em até 4h úteis com 9 seguradoras; (3) Para galpões acima de R$ 5 mi de LMI, agendamos vistoria técnica gratuita em até 48h; (4) Apresentamos quadro comparativo de coberturas, franquias e prêmios e fechamos com a seguradora vencedora. Apólice emitida em 2-5 dias úteis após o aceite.",
    },
    {
      question: "Quanto tempo leva para emitir uma apólice de seguro de galpão?",
      answer:
        "Galpões pequenos (até R$ 2 mi de LMI) sem vistoria: 24 a 48h após aceite da proposta. Galpões médios (R$ 2 mi a R$ 10 mi) com vistoria: 5 a 7 dias úteis. Galpões grandes (acima de R$ 10 mi) com cosseguro entre seguradoras: 10 a 15 dias úteis. A Patro emite cobertura provisória (binder) em casos urgentes — útil quando o contrato de locação ou o cliente exige seguro vigente.",
    },
    {
      question: "É possível parcelar o seguro de galpão? Em quantas vezes?",
      answer:
        "Sim. As 9 seguradoras parceiras parcelam em até 6x sem juros via boleto bancário e até 10x no cartão de crédito (com juros). Para apólices acima de R$ 100 mil/ano, algumas seguradoras aceitam parcelamento em 12x sem juros mediante análise de crédito. A Patro negocia a melhor condição de parcelamento como parte do quadro comparativo.",
    },
    {
      question: "Posso trocar de seguradora no meio do contrato sem perder cobertura?",
      answer:
        "Sim, com endosso de cancelamento e devolução proporcional do prêmio não consumido. Antes de cancelar a apólice antiga, a Patro emite a nova com vigência sobreposta de 1-3 dias para garantir que não há lacuna de cobertura. Em galpões com sinistro pendente, recomendamos aguardar o encerramento da regulação para trocar de seguradora.",
    },
  ],

  comparison: [
    {
      question: "Qual a melhor seguradora para galpão no Brasil em 2026?",
      answer:
        "Não existe a 'melhor' universal — depende do perfil. Porto Seguro Empresarial e Allianz Empresas são fortes em galpões de até R$ 20 mi de LMI com atendimento ágil. HDI Empresarial e Tokio Marine se destacam em risco industrial pesado. Bradesco Riscos Patrimoniais, Sompo e Zurich dominam galpões de grande porte (acima de R$ 50 mi). Mapfre e Liberty têm bom custo-benefício em galpões médios. A Patro cota com as 9 e apresenta o melhor por perfil.",
    },
    {
      question: "Vale mais a pena seguro de galpão único ou pacote galpão + transporte (RCTR-C)?",
      answer:
        "Pacote integrado quase sempre vale mais. Combinar seguro empresarial do galpão (armazenagem) com RCTR-C/RCF-DC (carga em trânsito) na mesma seguradora gera desconto de 12 a 18% no prêmio total e elimina a 'zona cinzenta' onde uma seguradora aponta para outra em sinistro de mercadoria carregada/descarregada. Indispensável para 3PLs, transportadoras e e-commerces com frota própria.",
    },
    {
      question: "Seguro de galpão é a mesma coisa que seguro de armazém ou de centro de distribuição?",
      answer:
        "Tecnicamente sim — todos são modalidades do seguro empresarial para Riscos Patrimoniais aplicado a edificação industrial/logística. A diferença está na intensidade da operação: um centro de distribuição (CD) costuma ter LMI mais alto, fluxo maior de mercadoria de terceiros e exigência contratual de RC armazenagem. A Patro adapta as coberturas ao perfil real, independente do nome usado no contrato de locação.",
    },
    {
      question: "Vale a pena contratar seguro de galpão direto na seguradora ou via corretora especializada?",
      answer:
        "Via corretora especializada quase sempre. Na seguradora direta, você só vê uma cotação e a precificação tende a ser conservadora (mais cara). Uma corretora especializada como a Patro cota com 9 seguradoras simultaneamente, identifica subseguro, negocia franquias e faz acompanhamento de regulação no sinistro — o serviço da corretora não é cobrado do cliente (é remunerado pela seguradora) e historicamente reduz o prêmio em 15-30%.",
    },
  ],

  technical: [
    {
      question: "O que é LMI no seguro de galpão e como ele é calculado?",
      answer:
        "LMI (Limite Máximo de Indenização) é o teto que a seguradora paga em cada cobertura. Para galpão, deve ser dimensionado pela soma: 100% do valor de reconstrução do imóvel + estoque máximo no pico (não a média) + 100% dos equipamentos + 6 a 12 meses de lucros cessantes. Subseguro (LMI menor que valor real) é a causa #1 de indenização parcial — em sinistro grave, a indenização é reduzida proporcionalmente (regra do rateio).",
    },
    {
      question: "Como a cláusula de exoneração de rateio protege o galpão?",
      answer:
        "A cláusula de exoneração (ou 'isenção') de rateio impede que a seguradora aplique a regra proporcional em caso de subseguro. Sem ela, se o LMI cobre 70% do valor real, a indenização é paga em 70%. Com a cláusula, a indenização é integral até o limite do LMI. É uma das negociações mais importantes em galpão — a Patro inclui sempre que possível, especialmente em galpões com mercadoria sazonal.",
    },
    {
      question: "Sprinklers, hidrantes e CFTV reduzem mesmo o prêmio do seguro de galpão?",
      answer:
        "Sim, e em níveis significativos. Hidrantes prediais conforme NBR 13.714 reduzem 8-15%; sprinklers automáticos homologados FM-Global ou NFPA reduzem 15-25%; CFTV monitorado 24h por empresa especializada reduz 5-10%; brigada certificada e controle de acesso eletrônico somam mais 5-12%. Combinados, podem reduzir o prêmio total em até 45% — em galpões grandes, isso paga o investimento em proteção em 3-5 anos.",
    },
    {
      question: "AVCB vencido pode anular o seguro de galpão em caso de incêndio?",
      answer:
        "Pode reduzir ou negar a indenização — depende da cláusula da apólice. Algumas seguradoras tratam AVCB como condição contratual: vencido, indenização reduzida ou negada em sinistro de incêndio. Outras aceitam AVCB em renovação desde que protocolado. A Patro mantém pasta digital de risco do cliente com calendário de AVCB, brigada e inspeção elétrica para evitar surpresas em regulação de sinistro.",
    },
    {
      question: "Como funciona a cláusula de pico sazonal para galpão de e-commerce e fulfillment?",
      answer:
        "Para operações com pico sazonal (Black Friday, Cyber Week, fim de ano, Dia das Mães), a apólice pode incluir cláusula de pico que multiplica o LMI de mercadoria por 2-5x durante a janela declarada (geralmente outubro a janeiro) sem multiplicar o prêmio anual proporcionalmente. Cláusula essencial para operadores logísticos e fulfillment — evita subseguro grave justamente no período de maior exposição.",
    },
    {
      question: "RC Armazenagem é obrigatória para 3PL, fulfillment ou armazém geral?",
      answer:
        "Não é obrigatória por lei, mas é exigida contratualmente por praticamente todos os clientes (embarcadores, marketplaces, indústrias que terceirizam logística). Sem RC armazenagem, em sinistro com mercadoria de clientes, a operadora responde com patrimônio próprio — o que costuma liquidar a operação. É cobertura indispensável em todo contrato de 3PL, fulfillment de marketplace e armazém geral alfandegado.",
    },
    {
      question: "O que cobre a cobertura de Quebra de Equipamento Frigorífico em galpão?",
      answer:
        "Cobre duas coisas: (1) o conserto/substituição do equipamento de refrigeração (câmaras frias, freezers industriais, chillers) por quebra mecânica ou elétrica e (2) a indenização da mercadoria refrigerada perdida pela quebra de cadeia de frio acima do tempo crítico (geralmente 4-6h para farmacêuticos sensíveis e alimentos). Indispensável para distribuidoras farmacêuticas, imunobiológicos, frigoríficos e dark stores de alimentos perecíveis.",
    },
  ],

  localGuarulhos: [
    {
      question: "A Patro Seguros atende galpão em qualquer bairro de Guarulhos?",
      answer:
        "Sim. Atendemos galpões em Cumbica, Vila Endres, Bonsucesso, Pimentas, Vila Galvão Industrial, Cabuçu, Aracília, Cidade Soimco, ao longo da Rodovia Presidente Dutra e da Rodovia Hélio Smidt. Escritório no Cidade Maia permite vistoria técnica presencial em até 48h em qualquer endereço de Guarulhos.",
    },
    {
      question: "Galpão em Guarulhos paga mais caro de seguro do que galpão no interior de SP?",
      answer:
        "Em média, sim — entre 8% e 18% mais caro, dependendo do bairro e da atividade. A diferença vem da concentração logística (mais sinistros propagados), do valor médio de mercadoria mais alto e da estatística de roubo qualificado da região. Mas com proteção adequada (sprinklers, CFTV 24h, brigada, controle de acesso), boa parte do agravamento é neutralizado.",
    },
    {
      question: "Galpão em Guarulhos com mercadoria importada tem cobertura específica?",
      answer:
        "Sim. Mercadoria importada (especialmente eletrônicos e perfumaria) precisa de cláusula de valor de reposição em moeda estrangeira ou de inventário FIFO atualizado mensalmente para evitar subseguro por variação cambial. A Patro também recomenda cobertura adicional de roubo qualificado com sublimite ampliado para galpões em Cumbica e Vila Endres.",
    },
  ],

  localCumbica: [
    {
      question: "Por que Cumbica é considerada o maior polo logístico do Brasil para fins de seguro?",
      answer:
        "Pela combinação única de: (1) entorno do GRU Airport (maior aeroporto de carga da América do Sul), (2) acesso direto à Rodovia Presidente Dutra e Hélio Smidt, (3) concentração de 3PLs, fulfillment de marketplaces (Mercado Livre, Amazon, Magalu, Shopee), distribuidoras farmacêuticas e ground handlers e (4) proximidade do CEAGESP e da maior base de e-commerce do país. Essa densidade torna o risco específico — e exige seguradoras especializadas em risco logístico/aeroportuário.",
    },
    {
      question: "Galpão em Cumbica próximo à pista do GRU Airport precisa de cobertura de impacto aeronáutico?",
      answer:
        "Sim, é altamente recomendado. Galpões e edificações em rota de aproximação ou pouso do GRU Airport têm exposição residual a queda de aeronave, peças e fragmentos. A cobertura de Impacto Aeronáutico e Queda de Objetos é barata (poucos pontos no prêmio) e cobre cenário catastrófico raro. Disponível nas seguradoras especializadas (Porto, Allianz, Zurich, Tokio Marine).",
    },
    {
      question: "Operações de carga aérea em Cumbica precisam de RC operações aeroportuárias específica?",
      answer:
        "Sim, para ground handlers, operadores de armazém alfandegado (REDEX) e empresas com pátio de manuseio de carga aérea. A RC operações aeroportuárias cobre danos a aeronaves, equipamentos de pista, GSE (Ground Support Equipment) e responsabilidade por carga em pátio aeroportuário — produto especializado oferecido apenas por Porto Seguro, Allianz e Zurich no mercado brasileiro.",
    },
  ],

  navigational: [
    {
      question: "Como falar com um especialista em seguro de galpão da Patro Seguros?",
      answer:
        "Três canais com resposta em até 4h úteis: (1) WhatsApp direto com o atendimento técnico de Riscos Patrimoniais (botão flutuante no site), (2) formulário de cotação na página do produto e (3) telefone do escritório no Cidade Maia, Guarulhos. Para sinistros graves, plantão 24/7 com a sócia-fundadora Sandra Patrocínio acompanhando regulação até a indenização final.",
    },
    {
      question: "Como a Patro acompanha um sinistro grave de galpão (incêndio, alagamento, roubo)?",
      answer:
        "Rotina padrão da Patro em sinistro grave: (1) acionamento por WhatsApp ou telefone 24/7; (2) abertura imediata do aviso de sinistro junto à seguradora; (3) acompanhamento presencial da perícia e do regulador; (4) defesa técnica do laudo e revisão de cláusulas para evitar negativa indevida; (5) negociação de adiantamento e liberação parcial; (6) acompanhamento até indenização final. Em mais de 140 apólices ativas, taxa de indenização integral foi de 92% nos últimos 5 anos.",
    },
  ],
};

/**
 * Mescla um conjunto-base de FAQs (já específicas da página) com FAQs
 * adicionais escolhidas por intenção, removendo duplicatas pelo texto da
 * pergunta (case-insensitive). Mantém a ordem: base primeiro, depois cada
 * intenção na ordem informada.
 */
export function mergeGalpaoFAQs(
  baseFAQs: FAQ[],
  intents: GalpaoFAQIntent[],
): FAQ[] {
  const seen = new Set<string>();
  const result: FAQ[] = [];
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

  for (const faq of baseFAQs) {
    const key = norm(faq.question);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(faq);
  }

  for (const intent of intents) {
    for (const faq of galpaoClusterFAQs[intent]) {
      const key = norm(faq.question);
      if (seen.has(key)) continue;
      seen.add(key);
      result.push(faq);
    }
  }

  return result;
}