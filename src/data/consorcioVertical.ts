/**
 * Fonte única de verdade da vertical de Consórcio local (Guarulhos/SP).
 * Hub: /consorcio-guarulhos. As páginas filhas usam ConsorcioIntentPageTemplate.
 */

export interface ConsorcioFaq {
  question: string;
  answer: string;
}

export interface ConsorcioIntentPage {
  slug: string;
  path: string;
  navLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string;
  audience: string[];
  bullets: string[];
  sections: { heading: string; body: string }[];
  whatsappOrigem: string;
  whatsappMessage: string;
  faqs: ConsorcioFaq[];
}

export const CONSORCIO_HUB_PATH = "/consorcio";
export const CONSORCIO_LOCAL_PATH = "/consorcio-guarulhos";

export const CONSORCIO_TRANSPARENCY_NOTICE =
  "A Patro Seguros atua como representante de administradoras de consórcio autorizadas pelo Banco Central do Brasil. Consórcio não é investimento nem financiamento: a contemplação ocorre por sorteio ou lance, conforme o regulamento do grupo. Prazos, taxa de administração, fundo de reserva e regras de lance variam por administradora e constam no contrato de adesão.";

export const CONSORCIO_PRUDENT_LANGUAGE =
  "Valores, prazos e condições são simulações e dependem do grupo disponível na data da adesão, conforme regulamento da administradora.";

export const CONSORCIO_INTENT_PAGES: ConsorcioIntentPage[] = [
  {
    slug: "consorcio-carro-guarulhos",
    path: "/consorcio-carro-guarulhos",
    navLabel: "Consórcio de Carro",
    title: "Consórcio de Carro em Guarulhos | Patro Seguros",
    metaDescription:
      "Consórcio de carro 0km ou seminovo em Guarulhos, sem juros. Simule parcelas, prazos e estratégias de lance com administradoras autorizadas.",
    h1: "Consórcio de Carro em Guarulhos",
    subtitle:
      "Troque de carro sem juros, com parcela que cabe no orçamento e carta de crédito para negociar como pagamento à vista.",
    intro:
      "O consórcio de carro é a forma mais previsível de trocar de veículo em Guarulhos sem pagar juros de financiamento. Você entra em um grupo administrado por uma empresa autorizada pelo Banco Central, paga uma parcela mensal e concorre à contemplação por sorteio ou por lance. Quando contemplado, recebe uma carta de crédito que funciona como dinheiro à vista em qualquer concessionária ou loja da região — Dutra, Centro, Vila Galvão, Cidade Maia — ou fora da cidade. A Patro Seguros compara administradoras, prazos e taxas antes de você assinar, e ainda cuida do seguro auto do veículo contemplado.",
    audience: [
      "Quem quer trocar de carro nos próximos 12 a 48 meses e não tem pressa imediata",
      "Famílias de Guarulhos que querem fugir dos juros do financiamento",
      "Motoristas de aplicativo que planejam renovar o veículo com custo previsível",
      "Quem já tem parte do valor e pretende usar como lance para antecipar a contemplação",
    ],
    bullets: [
      "Crédito para carro 0km, seminovo ou usado dentro dos critérios da administradora",
      "Parcelas sem juros — o custo é taxa de administração e fundo de reserva",
      "Contemplação por sorteio mensal ou por lance livre, fixo ou embutido",
      "Carta de crédito com poder de compra à vista, útil para negociar desconto",
      "Possibilidade de usar o crédito em outra praça, não apenas em Guarulhos",
      "Contratação do seguro auto no mesmo atendimento, com a corretora",
    ],
    sections: [
      {
        heading: "Como funciona o consórcio de carro na prática",
        body: "Você escolhe o valor da carta de crédito e o prazo do grupo. A parcela mensal é composta pela fração do crédito, pela taxa de administração e pelo fundo de reserva. Todo mês há assembleia: um ou mais participantes são contemplados por sorteio e outros por lance. Ao ser contemplado, você apresenta a documentação, a administradora libera a carta e você compra o veículo à vista. Até a contemplação, o bem não é seu — por isso o consórcio é planejamento, não urgência.",
      },
      {
        heading: "Consórcio ou financiamento para comprar carro em Guarulhos?",
        body: "Financiamento entrega o carro imediatamente, mas cobra juros que costumam encarecer bastante o valor final. Consórcio não tem juros, porém a data da contemplação é incerta sem lance. Na prática, quem precisa do carro hoje tende ao financiamento; quem está planejando a troca, montando reserva ou quer reduzir o custo total tende ao consórcio. Também existe o caminho híbrido: entrar no consórcio e dar um lance com a venda do carro atual.",
      },
      {
        heading: "Estratégias de lance que aceleram a contemplação",
        body: "O lance livre usa recursos próprios e concorre pelo maior percentual ofertado no mês. O lance fixo tem percentual definido em regulamento e é sorteado entre quem ofertou. O lance embutido usa parte da própria carta de crédito, reduzindo o valor final disponível — útil para quem não tem caixa. Analisamos o histórico de contemplação dos grupos disponíveis para você calibrar a estratégia antes de ofertar.",
      },
      {
        heading: "Depois da contemplação: documentação e seguro",
        body: "A administradora exige comprovação de renda ou garantia para liberar a carta, além de avaliação do veículo escolhido quando for usado. O bem fica alienado à administradora até a quitação das parcelas restantes, e o seguro auto costuma ser obrigatório nesse período. A Patro Seguros cota o seguro do veículo contemplado com as seguradoras parceiras no mesmo atendimento, evitando que você fique com o carro sem cobertura.",
      },
    ],
    whatsappOrigem: "consorcio_carro_guarulhos",
    whatsappMessage: "Quero simular um consórcio de carro em Guarulhos.",
    faqs: [
      {
        question: "Qual o valor mínimo de parcela em um consórcio de carro em Guarulhos?",
        answer:
          "Depende do valor da carta de crédito e do prazo do grupo. Cartas menores em prazos longos resultam em parcelas mais baixas; cartas altas em prazos curtos elevam a parcela. Fazemos a simulação com os grupos abertos na data da consulta e mostramos o custo total, incluindo taxa de administração e fundo de reserva.",
      },
      {
        question: "Posso usar a carta de crédito para comprar carro usado?",
        answer:
          "Sim, na maioria das administradoras, respeitando limites de ano/modelo e aprovação na vistoria. Carros muito antigos ou com restrição costumam ser recusados. Confirmamos as regras da administradora escolhida antes da adesão.",
      },
      {
        question: "O que acontece se eu desistir do consórcio?",
        answer:
          "Você é excluído do grupo e recebe os valores pagos ao fundo comum de volta, com as deduções previstas em contrato, geralmente após o encerramento do grupo ou conforme sorteio de excluídos. Por isso a adesão deve ser planejada — antes de assinar, avaliamos se a parcela cabe no seu orçamento com folga.",
      },
      {
        question: "Consórcio de carro tem entrada?",
        answer:
          "Não há entrada obrigatória como no financiamento. Algumas administradoras cobram uma taxa de adesão diluída nas primeiras parcelas. Recursos próprios entram, quando você quiser, na forma de lance para antecipar a contemplação.",
      },
      {
        question: "Preciso contratar seguro auto depois de ser contemplado?",
        answer:
          "Na prática sim: enquanto houver saldo devedor, o veículo fica alienado à administradora e o seguro protege tanto você quanto a garantia do grupo. A Patro Seguros cota o seguro do carro contemplado com as seguradoras parceiras, conforme aceitação e perfil do condutor.",
      },
      {
        question: "A Patro Seguros cobra alguma taxa para intermediar o consórcio?",
        answer:
          "Não cobramos taxa do cliente. Atuamos como representante das administradoras autorizadas pelo Banco Central e somos remunerados por elas. Nosso papel é comparar grupos, explicar o regulamento e acompanhar você até a contemplação.",
      },
    ],
  },
  {
    slug: "consorcio-moto-guarulhos",
    path: "/consorcio-moto-guarulhos",
    navLabel: "Consórcio de Moto",
    title: "Consórcio de Moto em Guarulhos | Patro Seguros",
    metaDescription:
      "Consórcio de moto em Guarulhos sem juros: parcelas acessíveis para motoboys, entregadores e uso pessoal. Simulação com administradoras autorizadas.",
    h1: "Consórcio de Moto em Guarulhos",
    subtitle:
      "Parcelas baixas e sem juros para comprar sua moto — trabalho, entrega ou lazer, com planejamento e regras claras.",
    intro:
      "A moto é ferramenta de trabalho para milhares de pessoas em Guarulhos: entregadores, motoboys de farmácias e restaurantes, prestadores de serviço que circulam entre Cumbica, Bonsucesso e o Centro. O consórcio de moto permite comprar o veículo sem os juros do financiamento, com parcelas normalmente bem menores que as de um consórcio de carro. A Patro Seguros compara grupos, prazos e taxas, e orienta sobre o seguro da moto — item essencial para quem depende dela para gerar renda.",
    audience: [
      "Motoboys e entregadores que querem sair do aluguel de moto",
      "Quem usa a moto como transporte diário e busca a menor parcela possível",
      "Empresas de Guarulhos que precisam renovar frota de motos de entrega",
      "Quem quer trocar de moto sem comprometer o limite de crédito bancário",
    ],
    bullets: [
      "Cartas de crédito para motos 0km ou seminovas, conforme aceitação",
      "Parcelas sem juros — apenas taxa de administração e fundo de reserva",
      "Prazos geralmente mais curtos que os de carro e imóvel",
      "Lance livre ou embutido para antecipar a contemplação",
      "Uso da carta em concessionárias de Guarulhos ou de qualquer cidade",
      "Cotação de seguro moto e RCF-V no mesmo atendimento",
    ],
    sections: [
      {
        heading: "Por que o consórcio faz sentido para moto",
        body: "Como o valor da carta é menor, o consórcio de moto costuma ter parcelas acessíveis e prazos mais curtos, o que reduz o tempo médio até a contemplação. Para quem hoje paga aluguel de moto para trabalhar, a parcela do consórcio muitas vezes é inferior ao custo mensal do aluguel — a diferença é que ao final você fica com o bem.",
      },
      {
        heading: "Consórcio de moto para trabalho: pontos de atenção",
        body: "Se a moto é fonte de renda, avalie o intervalo até a contemplação e mantenha um plano B enquanto ela não chega. Vale também considerar o custo de manutenção, equipamentos de segurança e o seguro — que para uso profissional exige declaração correta da finalidade. Omissão de uso profissional na contratação do seguro pode gerar recusa em sinistro.",
      },
      {
        heading: "Seguro de moto em Guarulhos após a contemplação",
        body: "Guarulhos tem trânsito intenso na Dutra e nas vias de acesso ao aeroporto, com índices relevantes de roubo e furto de motos. Depois de contemplado, a cobertura contra roubo, furto, colisão e responsabilidade civil por danos a terceiros protege seu patrimônio e sua renda. Cotamos com múltiplas seguradoras parceiras, respeitando aceitação e perfil.",
      },
      {
        heading: "Como a Patro conduz a simulação",
        body: "Levantamos o valor da moto desejada, sua capacidade de parcela e o horizonte de tempo. Com isso, comparamos grupos abertos de administradoras diferentes, mostrando taxa de administração, fundo de reserva, prazo e histórico de contemplações. Você decide com números na mão, sem pressão comercial.",
      },
    ],
    whatsappOrigem: "consorcio_moto_guarulhos",
    whatsappMessage: "Quero simular um consórcio de moto em Guarulhos.",
    faqs: [
      {
        question: "Consórcio de moto é mais barato que financiamento?",
        answer:
          "Em custo total, quase sempre sim, porque não há juros — apenas taxa de administração e fundo de reserva. A contrapartida é que o financiamento entrega a moto na hora e o consórcio depende de sorteio ou lance.",
      },
      {
        question: "Posso usar a carta de crédito para comprar moto usada?",
        answer:
          "Na maioria das administradoras sim, dentro dos limites de ano/modelo e aprovação de vistoria. As regras variam e são confirmadas antes da adesão.",
      },
      {
        question: "Motoboy consegue entrar em consórcio de moto?",
        answer:
          "Sim. A análise para adesão é simples; a comprovação de renda mais detalhada costuma ser exigida no momento da contemplação, para liberação da carta de crédito. Autônomos comprovam renda com extratos, declarações e recibos.",
      },
      {
        question: "Quanto tempo demora para ser contemplado em um consórcio de moto?",
        answer:
          "Não existe prazo garantido. Sem lance, a contemplação depende do sorteio mensal e pode ocorrer a qualquer momento até o fim do grupo. Com lance competitivo, é possível antecipar bastante. Analisamos o histórico dos grupos para dar uma expectativa realista.",
      },
      {
        question: "A moto contemplada fica no meu nome?",
        answer:
          "Sim, o documento sai no seu nome, com alienação fiduciária à administradora até a quitação das parcelas restantes. Após quitar, a alienação é baixada.",
      },
    ],
  },
  {
    slug: "consorcio-imovel-guarulhos",
    path: "/consorcio-imovel-guarulhos",
    navLabel: "Consórcio de Imóvel",
    title: "Consórcio de Imóvel em Guarulhos | Patro Seguros",
    metaDescription:
      "Consórcio imobiliário em Guarulhos: carta de crédito sem juros para casa, apartamento, terreno ou construção. Compare administradoras com a Patro.",
    h1: "Consórcio de Imóvel em Guarulhos",
    subtitle:
      "Carta de crédito que funciona como dinheiro à vista para comprar, construir ou quitar imóvel em Guarulhos e região.",
    intro:
      "Comprar imóvel em Guarulhos com financiamento significa pagar juros por décadas. O consórcio imobiliário troca esse custo por uma taxa de administração e transforma você em comprador à vista no momento da contemplação — o que pesa muito na negociação em bairros disputados como Cidade Maia, Vila Galvão, Jardim Maia, Macedo, Picanço e Bonsucesso. A carta pode ser usada para imóvel novo, usado, comercial, terreno ou construção em terreno próprio.",
    audience: [
      "Quem está formando patrimônio e não tem pressa de mudar",
      "Famílias que querem sair do aluguel em Guarulhos nos próximos anos",
      "Investidores que compram para locação em bairros de alta demanda",
      "Quem pretende quitar ou substituir um financiamento imobiliário caro",
    ],
    bullets: [
      "Carta de crédito para imóvel residencial, comercial, terreno ou construção",
      "Poder de compra à vista — argumento forte para negociar desconto",
      "Sem juros: custo composto por taxa de administração e fundo de reserva",
      "Possibilidade de uso do FGTS para lance ou complemento, conforme regras vigentes",
      "Prazos longos, com parcelas menores que as de financiamento equivalente",
      "Cotação de seguro residencial após a compra, com a corretora",
    ],
    sections: [
      {
        heading: "Por que a carta de crédito vale mais em Guarulhos",
        body: "Vendedor de imóvel prefere dinheiro à vista. Quando você chega com carta de crédito liberada, elimina o risco de reprovação de crédito bancário e reduz o tempo da negociação — o que costuma abrir espaço para desconto real no preço. Em regiões com estoque grande de apartamentos, como o entorno da Cidade Maia e da Vila Augusta, essa vantagem é concreta.",
      },
      {
        heading: "FGTS, lance e antecipação",
        body: "Nas modalidades imobiliárias, o FGTS pode ser utilizado para ofertar lance, complementar a carta de crédito ou amortizar parcelas, desde que atendidas as regras do fundo e da administradora — incluindo enquadramento do imóvel e do titular. Avaliamos caso a caso antes de você contar com esse recurso na estratégia.",
      },
      {
        heading: "Construção e reforma com carta de crédito",
        body: "Se você já tem terreno em Guarulhos, a carta pode financiar a construção, liberada por etapas mediante laudos de acompanhamento da obra. É um caminho comum para quem herdou terreno ou comprou lote em bairros em expansão. As exigências documentais são maiores: projeto aprovado, cronograma e vistorias.",
      },
      {
        heading: "Depois da contemplação: garantias e seguro",
        body: "O imóvel adquirido fica alienado à administradora até a quitação. A avaliação do imóvel, a análise de crédito e a documentação (matrícula, certidões, IPTU) precisam estar em ordem para liberar a carta. Concluída a compra, o seguro residencial protege estrutura, conteúdo e responsabilidade civil — cotamos com as seguradoras parceiras da Patro.",
      },
    ],
    whatsappOrigem: "consorcio_imovel_guarulhos",
    whatsappMessage: "Quero simular um consórcio de imóvel em Guarulhos.",
    faqs: [
      {
        question: "Posso usar a carta de crédito para comprar imóvel usado em Guarulhos?",
        answer:
          "Sim. A carta serve para imóvel novo, usado, residencial ou comercial, desde que a documentação do imóvel e do vendedor esteja regular e o imóvel seja aprovado na avaliação da administradora.",
      },
      {
        question: "Dá para usar FGTS no consórcio de imóvel?",
        answer:
          "Sim, nas hipóteses previstas em regulamento: ofertar lance, complementar a carta de crédito ou amortizar e quitar parcelas. É necessário atender aos requisitos do FGTS, como tempo de contribuição, ausência de outro imóvel na mesma cidade e enquadramento do valor do bem.",
      },
      {
        question: "Consórcio de imóvel é melhor que financiamento?",
        answer:
          "Em custo total, o consórcio costuma sair mais barato porque não há juros. Em velocidade, o financiamento vence, pois entrega as chaves imediatamente. A escolha depende de quando você precisa do imóvel e de quanto está disposto a pagar por essa antecipação.",
      },
      {
        question: "Posso quitar meu financiamento imobiliário com a carta de crédito?",
        answer:
          "Sim, muitas administradoras permitem usar a carta contemplada para quitar saldo devedor de financiamento imobiliário no seu nome, dentro das regras do grupo e mediante análise documental.",
      },
      {
        question: "Quanto tempo até a contemplação em consórcio imobiliário?",
        answer:
          "É incerto sem lance — grupos imobiliários têm prazos longos e contemplações mensais por sorteio e lance. Quem tem recursos para lance costuma antecipar de forma significativa. Mostramos o histórico dos grupos disponíveis para você planejar.",
      },
      {
        question: "O imóvel fica no meu nome?",
        answer:
          "Sim, a escritura é registrada em seu nome, com alienação fiduciária à administradora até o pagamento integral das parcelas restantes.",
      },
    ],
  },
  {
    slug: "consorcio-imovel-comercial-guarulhos",
    path: "/consorcio-imovel-comercial-guarulhos",
    navLabel: "Consórcio de Imóvel Comercial",
    title: "Consórcio de Imóvel Comercial em Guarulhos | Patro",
    metaDescription:
      "Consórcio para sala comercial, loja ou galpão em Guarulhos. Carta de crédito sem juros para empresas saírem do aluguel e formarem patrimônio.",
    h1: "Consórcio de Imóvel Comercial em Guarulhos",
    subtitle:
      "Sala, loja, galpão ou ponto próprio: troque o aluguel por patrimônio da empresa, sem juros de financiamento.",
    intro:
      "Aluguel comercial é custo recorrente que nunca vira patrimônio. Em Guarulhos, onde o metro quadrado logístico próximo a Cumbica e à Dutra é valorizado, comprar o próprio imóvel muda a estrutura de custos da empresa. O consórcio de imóvel comercial permite planejar essa compra com parcelas sem juros e usar a carta de crédito como pagamento à vista — inclusive em negociações diretas com proprietários.",
    audience: [
      "Lojistas e prestadores de serviço que hoje pagam aluguel em Guarulhos",
      "Clínicas, consultórios e escritórios que querem sala própria",
      "Empresas de logística e distribuição que buscam galpão perto de Cumbica",
      "Sócios que desejam adquirir o imóvel em CNPJ para formar patrimônio",
    ],
    bullets: [
      "Cartas de crédito de valor elevado, adequadas a imóveis comerciais",
      "Adesão possível em CNPJ, com efeitos contábeis a avaliar com seu contador",
      "Uso para sala, loja, galpão, terreno comercial ou construção",
      "Sem juros: previsibilidade de fluxo de caixa para o planejamento da empresa",
      "Lance como ferramenta de antecipação quando surge uma boa oportunidade",
      "Seguro empresarial e patrimonial cotado pela Patro após a aquisição",
    ],
    sections: [
      {
        heading: "Aluguel x imóvel próprio: a conta da empresa",
        body: "O aluguel é despesa que acompanha reajustes anuais e não gera ativo. A parcela do consórcio, embora comparável em valor, constrói patrimônio para a empresa ou para os sócios. Em contrapartida, imobiliza capital e reduz a flexibilidade de mudança de endereço — decisão que deve considerar o horizonte do negócio e a dependência do ponto comercial.",
      },
      {
        heading: "Galpões e o eixo logístico de Guarulhos",
        body: "A proximidade com o Aeroporto de Cumbica, a Rodovia Presidente Dutra e a Fernão Dias faz de Guarulhos um dos polos logísticos mais disputados do país. Consórcio de imóvel comercial é uma forma de operadores logísticos e distribuidores planejarem a aquisição de galpão próprio sem comprometer capital de giro com entrada elevada.",
      },
      {
        heading: "Adesão em CNPJ e aspectos fiscais",
        body: "Empresas podem aderir ao consórcio em nome do CNPJ. O tratamento contábil das parcelas, da carta de crédito e da posterior aquisição do imóvel depende do regime tributário e deve ser discutido com o contador da empresa. Nosso papel é comparar grupos e regulamentos; o enquadramento fiscal é responsabilidade da contabilidade.",
      },
      {
        heading: "Proteção do imóvel comercial adquirido",
        body: "Depois da compra, o imóvel precisa de seguro compatível com o uso: incêndio, danos elétricos, vendaval, roubo de bens, responsabilidade civil e, no caso de galpões, coberturas específicas para estoque e operação. A Patro Seguros é especialista em riscos patrimoniais e galpões na região de Guarulhos e Cumbica.",
      },
    ],
    whatsappOrigem: "consorcio_imovel_comercial_guarulhos",
    whatsappMessage: "Quero simular um consórcio de imóvel comercial em Guarulhos.",
    faqs: [
      {
        question: "Empresa pode fazer consórcio de imóvel comercial?",
        answer:
          "Sim. A adesão pode ser feita em CNPJ, com análise cadastral da empresa. Na contemplação, a administradora avalia a capacidade de pagamento e a documentação societária e fiscal.",
      },
      {
        question: "Posso usar a carta de crédito para comprar galpão em Cumbica?",
        answer:
          "Sim, desde que o imóvel esteja regular e seja aprovado na avaliação da administradora. Galpões costumam exigir cartas de valor mais alto, o que pode ser resolvido com mais de uma cota.",
      },
      {
        question: "É possível juntar mais de uma cota para aumentar o crédito?",
        answer:
          "Sim, muitas administradoras permitem somar cartas de crédito contempladas do mesmo titular para adquirir um imóvel de maior valor, respeitando as regras de cada grupo.",
      },
      {
        question: "Dá para usar a carta para construir na área da empresa?",
        answer:
          "Sim, nas modalidades que permitem construção. A liberação é feita por etapas, com laudos de acompanhamento de obra e projeto aprovado pela prefeitura.",
      },
      {
        question: "Preciso de seguro para o imóvel comercial comprado por consórcio?",
        answer:
          "Enquanto houver saldo devedor, o imóvel fica alienado e o seguro costuma ser exigido. Independentemente disso, é a proteção do principal ativo da empresa — cotamos as coberturas adequadas ao seu tipo de operação.",
      },
    ],
  },
  {
    slug: "consorcio-caminhao-guarulhos",
    path: "/consorcio-caminhao-guarulhos",
    navLabel: "Consórcio de Caminhão",
    title: "Consórcio de Caminhão em Guarulhos | Patro Seguros",
    metaDescription:
      "Consórcio de caminhão, carreta e implementos em Guarulhos. Renove a frota sem juros, com carta de crédito e parcelas previsíveis.",
    h1: "Consórcio de Caminhão e Veículos Pesados em Guarulhos",
    subtitle:
      "Renovação de frota planejada para transportadores e autônomos que rodam pela Dutra, Fernão Dias e Cumbica.",
    intro:
      "Guarulhos concentra transportadoras, distribuidores e caminhoneiros autônomos que dependem de veículo em bom estado para manter contratos. Financiar caminhão custa caro; o consórcio permite programar a renovação da frota sem juros, com parcela previsível que não desorganiza o fluxo de caixa. A carta de crédito serve para caminhão, cavalo mecânico, carreta, implemento rodoviário, ônibus ou van, conforme a modalidade contratada.",
    audience: [
      "Caminhoneiros autônomos que querem sair do veículo antigo",
      "Transportadoras de Guarulhos que renovam frota de forma programada",
      "Distribuidores e operadores logísticos ligados ao aeroporto de Cumbica",
      "Empresas que precisam de implementos: baú, sider, tanque, prancha",
    ],
    bullets: [
      "Cartas de crédito para caminhão, cavalo mecânico, carreta e implementos",
      "Adesão em CPF ou CNPJ, conforme o perfil do transportador",
      "Parcelas sem juros, com prazos compatíveis com o ciclo de renovação da frota",
      "Uso de lance com a venda do veículo atual para antecipar a contemplação",
      "Possibilidade de múltiplas cotas para renovar mais de um veículo",
      "Seguro de frota, RCTR-C e RCF-DC cotados pela Patro Seguros",
    ],
    sections: [
      {
        heading: "Planejar a renovação em vez de reagir à quebra",
        body: "Frota antiga gera manutenção imprevisível, mais dias parados e perda de contratos por exigência de idade máxima do veículo. Entrar em um consórcio hoje significa ter carta de crédito disponível quando o veículo atual chegar ao fim do ciclo — em vez de recorrer a financiamento emergencial com taxa alta.",
      },
      {
        heading: "Lance com o veículo atual",
        body: "Uma estratégia comum entre transportadores é usar a venda do caminhão em uso como lance para antecipar a contemplação. Como a oferta compete com a dos demais participantes, avaliamos o histórico de lances vencedores dos grupos abertos antes de você definir o percentual.",
      },
      {
        heading: "Adesão em CNPJ e gestão de frota",
        body: "Transportadoras costumam aderir a várias cotas para escalonar contemplações ao longo dos anos, criando um ciclo contínuo de renovação. O tratamento contábil e tributário deve ser alinhado com o contador da empresa. Em paralelo, mantemos o seguro de frota atualizado a cada entrada e saída de veículo.",
      },
      {
        heading: "Seguros obrigatórios e recomendados para o transporte",
        body: "Além do seguro do casco do veículo, quem transporta carga de terceiros precisa avaliar RCTR-C, que é a responsabilidade civil do transportador rodoviário de carga, e RCF-DC, para desaparecimento de carga. Sem essas coberturas, um único evento pode comprometer anos de operação. A Patro atende transportadoras de Guarulhos com estruturação completa desse programa.",
      },
    ],
    whatsappOrigem: "consorcio_caminhao_guarulhos",
    whatsappMessage: "Quero simular um consórcio de caminhão em Guarulhos.",
    faqs: [
      {
        question: "Consórcio de caminhão aceita veículo usado?",
        answer:
          "Em geral sim, com limites de ano/modelo definidos pela administradora e aprovação em vistoria. Implementos rodoviários também podem ser adquiridos com a carta em várias modalidades.",
      },
      {
        question: "Posso aderir como autônomo, sem CNPJ?",
        answer:
          "Sim. A adesão pode ser feita em CPF. A comprovação de capacidade de pagamento é exigida na contemplação, e autônomos comprovam renda com extratos, contratos de frete e declarações.",
      },
      {
        question: "Dá para usar a carta em mais de um veículo?",
        answer:
          "Depende do regulamento. Algumas administradoras permitem usar a carta para adquirir cavalo mecânico e implemento, ou dividir entre bens da mesma categoria. Confirmamos essa possibilidade antes da adesão.",
      },
      {
        question: "O caminhão contemplado precisa de seguro?",
        answer:
          "Sim, enquanto houver alienação fiduciária o seguro costuma ser exigido — e mesmo depois, é essencial para proteger o ativo que gera a receita da operação.",
      },
      {
        question: "Como escalonar a renovação de vários veículos?",
        answer:
          "Com múltiplas cotas em grupos diferentes, distribuindo o risco de contemplação ao longo do tempo e combinando lances quando um veículo específico precisa ser substituído com urgência.",
      },
    ],
  },
  {
    slug: "consorcio-maquinas-agricolas-guarulhos",
    path: "/consorcio-maquinas-agricolas-guarulhos",
    navLabel: "Consórcio de Máquinas Agrícolas",
    title: "Consórcio de Máquinas Agrícolas | Patro Seguros",
    metaDescription:
      "Consórcio de trator, colheitadeira, pulverizador e implementos agrícolas. Sem juros, com atendimento nacional a partir de Guarulhos/SP.",
    h1: "Consórcio de Máquinas Agrícolas e Implementos",
    subtitle:
      "Trator, colheitadeira, pulverizador e implementos com crédito sem juros — planejamento alinhado ao ciclo da safra.",
    intro:
      "Máquina agrícola é capital imobilizado alto e decisão de longo prazo. O consórcio permite programar a compra ou a renovação de tratores, colheitadeiras, pulverizadores, plantadeiras e implementos sem os juros de uma linha de crédito, alinhando parcelas ao fluxo de caixa da safra. A Patro Seguros atende produtores em todo o Brasil a partir de Guarulhos/SP, com especialização em riscos agrícolas.",
    audience: [
      "Produtores rurais que planejam renovar máquinas nas próximas safras",
      "Pequenas e médias propriedades que não querem comprometer crédito bancário",
      "Prestadores de serviço agrícola: colheita, pulverização, plantio terceirizado",
      "Cooperados que combinam consórcio com linhas de custeio",
    ],
    bullets: [
      "Cartas para trator, colheitadeira, pulverizador, plantadeira e implementos",
      "Parcelas sem juros, com prazos longos compatíveis com o ciclo agrícola",
      "Uso de lance após a colheita, quando o caixa está mais forte",
      "Adesão em CPF do produtor ou CNPJ da fazenda",
      "Preserva limite de crédito bancário para custeio",
      "Seguro de máquinas agrícolas e benfeitorias cotado pela Patro",
    ],
    sections: [
      {
        heading: "Consórcio e o calendário da safra",
        body: "Diferente de uma linha de crédito com vencimentos rígidos, o consórcio permite planejar o lance para o período pós-colheita, quando entra a receita. Quem consegue essa sincronia costuma antecipar a contemplação sem apertar o caixa em meses de custeio.",
      },
      {
        heading: "Preservar o crédito bancário para custeio",
        body: "Comprometer limite bancário com aquisição de máquina reduz a capacidade de tomar custeio na hora certa. O consórcio funciona como um caminho paralelo de aquisição, deixando as linhas de custeio livres para insumos, sementes e defensivos.",
      },
      {
        heading: "Máquinas usadas e implementos",
        body: "Muitas administradoras permitem usar a carta em máquinas seminovas de revendas autorizadas e em implementos, respeitando limites de ano e avaliação. Para propriedades menores, essa flexibilidade é decisiva: um implemento adequado pode ter mais impacto na produtividade do que um trator novo.",
      },
      {
        heading: "Proteção da máquina contemplada",
        body: "Máquinas agrícolas estão expostas a incêndio, tombamento, colisão no transporte, roubo e danos durante a operação. O seguro específico cobre a máquina parada e em operação, e pode incluir responsabilidade civil por danos a terceiros. A Patro Seguros estrutura esse programa com seguradoras especializadas em agro.",
      },
    ],
    whatsappOrigem: "consorcio_maquinas_agricolas",
    whatsappMessage: "Quero simular um consórcio de máquinas agrícolas.",
    faqs: [
      {
        question: "O consórcio de máquinas agrícolas atende fora de Guarulhos?",
        answer:
          "Sim. A Patro Seguros atende produtores em todo o Brasil, com atendimento remoto e documentação digital. Nossa base é em Guarulhos/SP, mas a vertical agro é nacional.",
      },
      {
        question: "Posso usar a carta para comprar máquina usada?",
        answer:
          "Em geral sim, com limites de ano/modelo e avaliação da administradora. Compras em revendas autorizadas costumam ter aprovação mais simples.",
      },
      {
        question: "Consórcio substitui financiamento agrícola subsidiado?",
        answer:
          "Não necessariamente. Quando há linha subsidiada disponível e enquadramento, ela pode ser mais vantajosa. O consórcio é alternativa para quem não se enquadra, já esgotou o limite ou quer preservar crédito para custeio.",
      },
      {
        question: "Quando é o melhor momento para dar lance?",
        answer:
          "Normalmente após a comercialização da safra, quando o caixa está mais forte. Ainda assim, o lance concorre com os demais participantes; avaliamos o histórico dos grupos para calibrar o percentual.",
      },
      {
        question: "A máquina contemplada precisa de seguro?",
        answer:
          "Enquanto houver alienação, o seguro costuma ser exigido pela administradora. E, de todo modo, é a proteção de um ativo caro e essencial à operação da propriedade.",
      },
    ],
  },
  {
    slug: "consorcio-servicos-guarulhos",
    path: "/consorcio-servicos-guarulhos",
    navLabel: "Consórcio de Serviços",
    title: "Consórcio de Serviços em Guarulhos | Patro Seguros",
    metaDescription:
      "Consórcio de serviços em Guarulhos: reforma, viagem, casamento, tratamentos e educação. Crédito sem juros para planejar projetos pessoais.",
    h1: "Consórcio de Serviços em Guarulhos",
    subtitle:
      "Reforma, viagem, casamento, tratamentos e educação: planeje projetos que não são bens, sem cair no rotativo do cartão.",
    intro:
      "Nem todo projeto é um carro ou um imóvel. Reforma da casa, festa de casamento, intercâmbio, pós-graduação, tratamentos odontológicos e estéticos ou uma viagem longa costumam ser financiados por cartão de crédito e empréstimo pessoal — as formas mais caras de crédito no Brasil. O consórcio de serviços entrega uma carta de crédito sem juros para contratar esses serviços com fornecedores da sua escolha, em Guarulhos ou em qualquer lugar.",
    audience: [
      "Quem vai reformar a casa ou o apartamento sem recorrer a empréstimo pessoal",
      "Casais planejando casamento com orçamento definido",
      "Estudantes e profissionais que vão fazer pós-graduação ou intercâmbio",
      "Pacientes planejando tratamentos odontológicos, estéticos ou cirúrgicos eletivos",
    ],
    bullets: [
      "Carta de crédito para contratar prestadores de serviço formalizados",
      "Sem juros — custo é taxa de administração e fundo de reserva",
      "Parcelas normalmente menores que as de consórcio de bens",
      "Liberdade de escolha de fornecedor, dentro das regras da administradora",
      "Alternativa ao cartão de crédito parcelado e ao empréstimo pessoal",
      "Prazos curtos e médios, adequados a projetos com data prevista",
    ],
    sections: [
      {
        heading: "O que dá para contratar com consórcio de serviços",
        body: "As modalidades mais comuns cobrem reforma e decoração, festas e casamentos, viagens e intercâmbios, cursos e pós-graduação, tratamentos de saúde eletivos e procedimentos estéticos. A administradora normalmente exige comprovação de que a carta foi usada com prestadores formalizados, mediante notas fiscais e contratos.",
      },
      {
        heading: "Comparando com cartão e empréstimo pessoal",
        body: "Parcelar reforma no cartão ou tomar empréstimo pessoal costuma custar caro em juros. O consórcio troca esse custo por uma taxa de administração, com a contrapartida de que você precisa esperar a contemplação ou dar lance. Para quem tem data marcada e pouca margem no orçamento, essa espera precisa entrar no planejamento.",
      },
      {
        heading: "Planejar a data do projeto",
        body: "Casamento, obra e intercâmbio têm data. Se o prazo é curto, o consórcio só funciona com lance ou com adesão bem antecipada. Ajudamos a mapear o intervalo realista de contemplação dos grupos abertos antes de você contar com o recurso em uma data específica.",
      },
      {
        heading: "Reforma e proteção do imóvel",
        body: "Se o projeto é reformar, vale revisar o seguro residencial: obras alteram o valor em risco e algumas apólices exigem comunicação prévia de reforma estrutural. Danos a vizinhos durante a obra também podem gerar responsabilidade civil. Revisamos sua apólice junto com o planejamento do consórcio.",
      },
    ],
    whatsappOrigem: "consorcio_servicos_guarulhos",
    whatsappMessage: "Quero simular um consórcio de serviços em Guarulhos.",
    faqs: [
      {
        question: "Consórcio de serviços libera dinheiro na minha conta?",
        answer:
          "A carta é destinada ao pagamento dos prestadores contratados, com comprovação por nota fiscal ou contrato, conforme as regras da administradora. Não é um empréstimo de livre destinação.",
      },
      {
        question: "Posso usar para reforma feita por profissional autônomo?",
        answer:
          "Depende da administradora. Muitas exigem prestadores formalizados com emissão de nota fiscal. Verificamos essa regra antes da adesão para não haver surpresa na contemplação.",
      },
      {
        question: "Dá para usar consórcio de serviços para procedimento estético?",
        answer:
          "Sim, nas modalidades de saúde e estética oferecidas por algumas administradoras, para procedimentos eletivos realizados por clínicas e profissionais habilitados.",
      },
      {
        question: "Qual a diferença para o consórcio de bens?",
        answer:
          "No consórcio de bens, a carta compra um bem que fica alienado à administradora até a quitação. No de serviços, o crédito custeia a contratação de serviços; as regras de garantia costumam envolver análise de crédito ou garantias adicionais na contemplação.",
      },
      {
        question: "Preciso comprovar renda?",
        answer:
          "A adesão é simples, mas a liberação da carta na contemplação passa por análise de capacidade de pagamento, como em qualquer modalidade de consórcio.",
      },
    ],
  },
  {
    slug: "consorcio-ou-financiamento-guarulhos",
    path: "/consorcio-ou-financiamento-guarulhos",
    navLabel: "Consórcio ou Financiamento",
    title: "Consórcio ou Financiamento? Guia Guarulhos | Patro",
    metaDescription:
      "Consórcio ou financiamento em Guarulhos: compare custo total, prazo, entrada e velocidade de acesso ao bem para decidir com números na mão.",
    h1: "Consórcio ou Financiamento: Qual Vale Mais a Pena em Guarulhos?",
    subtitle:
      "A comparação honesta entre as duas formas de comprar carro, moto ou imóvel — sem promessa de milagre.",
    intro:
      "A pergunta mais comum de quem procura a Patro Seguros em Guarulhos é simples: consórcio ou financiamento? A resposta honesta é que depende de uma variável central — quando você precisa do bem. Financiamento entrega hoje e cobra juros por isso. Consórcio custa menos no total, mas a data da contemplação é incerta sem lance. Abaixo, os critérios objetivos para você decidir.",
    audience: [
      "Quem está em dúvida entre parcelar com juros ou entrar em um grupo de consórcio",
      "Compradores de primeiro carro ou primeiro imóvel em Guarulhos",
      "Quem quer reduzir o custo total da aquisição e tem flexibilidade de prazo",
      "Quem já tem uma proposta de financiamento e quer comparar cenários",
    ],
    bullets: [
      "Financiamento: acesso imediato ao bem, com juros e entrada usual",
      "Consórcio: custo total menor, sem juros, com contemplação incerta",
      "Consórcio exige disciplina de longo prazo e leitura do regulamento",
      "Financiamento depende de aprovação de crédito e score",
      "Lance no consórcio aproxima a experiência da compra à vista",
      "Em ambos os casos, o seguro do bem costuma ser exigido",
    ],
    sections: [
      {
        heading: "Critério 1: urgência",
        body: "Se você precisa do carro para trabalhar na semana que vem, ou vai se mudar em dois meses, o consórcio sem lance não resolve. Financiamento, ou cota já contemplada quando disponível de forma legítima, é o caminho. Se a compra pode acontecer em 12, 24 ou 48 meses, o consórcio entra na disputa com vantagem de custo.",
      },
      {
        heading: "Critério 2: custo total",
        body: "No financiamento, você paga juros sobre o saldo devedor durante todo o contrato, além de IOF e tarifas. No consórcio, paga taxa de administração e fundo de reserva. Em prazos longos, a diferença de custo total costuma ser expressiva a favor do consórcio — mas só faz sentido comparar os dois cenários com números reais, não com médias de internet.",
      },
      {
        heading: "Critério 3: poder de negociação",
        body: "A carta de crédito contemplada é pagamento à vista. Isso costuma render desconto na concessionária ou com o vendedor do imóvel, o que reduz ainda mais o custo efetivo. Já quem financia raramente consegue o mesmo desconto, porque o vendedor recebe via banco com prazo e trâmites.",
      },
      {
        heading: "Critério 4: disciplina e risco",
        body: "Consórcio é compromisso de longo prazo: desistir gera devolução de valores com deduções e normalmente só após o encerramento do grupo. Financiamento tem risco diferente — inadimplência pode levar à busca e apreensão do bem. Em ambos, a parcela precisa caber no orçamento com folga real, considerando também seguro, IPVA, manutenção ou condomínio e IPTU.",
      },
    ],
    whatsappOrigem: "consorcio_ou_financiamento_guarulhos",
    whatsappMessage: "Quero comparar consórcio e financiamento com um consultor.",
    faqs: [
      {
        question: "Consórcio é sempre mais barato que financiamento?",
        answer:
          "Em custo total, na maioria dos cenários sim, porque não há incidência de juros. Mas o consórcio impõe espera e, se você precisar antecipar com lance alto, parte da vantagem econômica é consumida. A comparação precisa ser feita caso a caso.",
      },
      {
        question: "Posso transformar consórcio em compra imediata?",
        answer:
          "Com lance competitivo é possível antecipar bastante, mas não há garantia de contemplação em um mês específico. Cessões de cotas já contempladas existem, sempre com anuência formal da administradora.",
      },
      {
        question: "O que pesa mais na decisão: taxa de administração ou juros?",
        answer:
          "Juros costumam pesar mais no custo total de contratos longos. A taxa de administração é diluída no prazo e não incide de forma composta como os juros do financiamento. Ainda assim, taxas de administração muito altas reduzem a vantagem do consórcio — por isso comparamos administradoras.",
      },
      {
        question: "Financiamento exige entrada e consórcio não?",
        answer:
          "Em regra, sim: o financiamento normalmente pede entrada, e quanto maior, menor o juro total. O consórcio não exige entrada, mas recursos próprios podem ser usados como lance para antecipar a contemplação.",
      },
      {
        question: "A Patro Seguros ajuda a comparar as duas opções?",
        answer:
          "Sim. Montamos o comparativo de custo total, prazo e impacto no orçamento para o seu caso concreto, mesmo quando a conclusão é que o financiamento é a melhor escolha para você.",
      },
    ],
  },
  {
    slug: "consorcio-contemplado-guarulhos",
    path: "/consorcio-contemplado-guarulhos",
    navLabel: "Consórcio Contemplado",
    title: "Consórcio Contemplado em Guarulhos | Patro Seguros",
    metaDescription:
      "Entenda como funciona a carta de crédito contemplada, os riscos do mercado paralelo e como usar o crédito com segurança em Guarulhos.",
    h1: "Consórcio Contemplado em Guarulhos: Como Funciona e Como Evitar Golpes",
    subtitle:
      "Carta contemplada é acesso rápido ao crédito — e também o tema com mais fraudes no mercado. Saiba o que checar.",
    intro:
      "Uma cota contemplada é aquela que já teve o direito à carta de crédito liberado, por sorteio ou lance. Comprar ou receber a transferência de uma cota contemplada permite acesso rápido ao crédito sem juros — e justamente por isso é alvo preferido de golpes, com anúncios de carta contemplada com desconto em redes sociais e classificados. Este guia explica o funcionamento legítimo e os sinais de alerta.",
    audience: [
      "Quem precisa do bem em prazo curto e não pode esperar o sorteio",
      "Quem recebeu uma oferta de carta contemplada e quer validar antes de pagar",
      "Consorciados que pensam em transferir a própria cota contemplada",
      "Empresas que buscam liquidez rápida para aquisição de ativo",
    ],
    bullets: [
      "Contemplação legítima acontece apenas em assembleia: sorteio ou lance",
      "Transferência de cota exige anuência formal da administradora",
      "Nunca pague em conta de pessoa física para liberar carta de crédito",
      "Administradora precisa ser autorizada pelo Banco Central do Brasil",
      "Desconto muito acima do mercado é o principal sinal de fraude",
      "Toda negociação legítima é registrada e documentada pela administradora",
    ],
    sections: [
      {
        heading: "Como a contemplação realmente acontece",
        body: "Em cada assembleia mensal, a administradora contempla participantes por sorteio e por lance. Não existe contemplação garantida na adesão nem lista de espera paga. Qualquer promessa de contemplação imediata mediante pagamento antecipado, fora das regras do grupo, é indício claro de irregularidade.",
      },
      {
        heading: "Transferência de cota contemplada: o caminho legítimo",
        body: "É possível transferir uma cota, inclusive contemplada, para outra pessoa, desde que a administradora aprove a operação, analise o crédito do cedente e do cessionário e formalize o contrato. Tudo passa pela administradora — nunca por acordo particular à parte. Se o vendedor evita envolver a administradora, encerre a negociação.",
      },
      {
        heading: "Sinais de golpe que você precisa reconhecer",
        body: "Anúncios com carta de valor alto por uma fração do preço; pressão para decidir em horas; pagamento por Pix para pessoa física; empresa sem CNPJ ativo ou sem autorização do Banco Central; contrato sem identificação de grupo e cota; recusa em fornecer o número do contrato para consulta direta na administradora. Qualquer um desses pontos, isoladamente, já justifica interromper a negociação.",
      },
      {
        heading: "Como verificar antes de pagar qualquer valor",
        body: "Confirme se a administradora consta na lista de instituições autorizadas pelo Banco Central. Ligue no canal oficial da administradora, e não no telefone passado pelo vendedor, para confirmar grupo, cota, situação de contemplação e existência da cessão. Exija que os pagamentos sejam feitos na conta institucional da administradora. Em caso de dúvida, fale com a Patro Seguros antes de assinar.",
      },
    ],
    whatsappOrigem: "consorcio_contemplado_guarulhos",
    whatsappMessage: "Quero entender como funciona uma carta de crédito contemplada.",
    faqs: [
      {
        question: "Existe carta contemplada à venda com desconto?",
        answer:
          "Existem cessões legítimas de cotas contempladas, feitas com anuência da administradora e análise de crédito. O que não existe é carta contemplada barata anunciada por terceiros desconhecidos — essa é a estrutura clássica de golpe.",
      },
      {
        question: "Como saber se a administradora é autorizada?",
        answer:
          "Consulte a relação de administradoras de consórcio autorizadas pelo Banco Central do Brasil e confira o CNPJ. Nós também confirmamos essa checagem para você antes de qualquer adesão ou transferência.",
      },
      {
        question: "Posso comprar cota contemplada de outra pessoa?",
        answer:
          "Sim, desde que a transferência seja formalizada pela administradora, com análise de crédito, atualização cadastral e assinatura do termo de cessão. Pagamento direto ao vendedor sem esse trâmite é altamente arriscado.",
      },
      {
        question: "Dei lance e fui contemplado. Quanto tempo até receber a carta?",
        answer:
          "Após a contemplação, a liberação depende da entrega da documentação, da análise de crédito e da aprovação do bem escolhido. O prazo varia por administradora e costuma ser de alguns dias a algumas semanas.",
      },
      {
        question: "Fui vítima de golpe de carta contemplada. O que fazer?",
        answer:
          "Registre boletim de ocorrência, reúna todos os comprovantes e comunicações, e procure a administradora citada e os órgãos de defesa do consumidor. Quanto mais rápido o registro, maior a chance de bloqueio dos valores.",
      },
    ],
  },
  {
    slug: "como-dar-lance-em-consorcio-guarulhos",
    path: "/como-dar-lance-em-consorcio-guarulhos",
    navLabel: "Como Dar Lance",
    title: "Como Dar Lance em Consórcio | Guia Patro Seguros",
    metaDescription:
      "Lance livre, fixo e embutido: entenda como funciona cada tipo, quando ofertar e como aumentar suas chances de contemplação no consórcio.",
    h1: "Como Dar Lance em Consórcio e Antecipar a Contemplação",
    subtitle:
      "Lance livre, fixo e embutido explicados sem jargão — com a estratégia adequada ao seu objetivo e ao seu caixa.",
    intro:
      "Lance é a forma de acelerar a contemplação sem depender apenas da sorte. Em toda assembleia, além dos contemplados por sorteio, a administradora contempla quem ofertou os melhores lances segundo as regras do grupo. Entender os tipos de lance e o histórico do grupo é o que separa uma oferta bem calibrada de um lance desperdiçado. Este guia da Patro Seguros explica cada modalidade.",
    audience: [
      "Consorciados que querem antecipar a contemplação",
      "Quem vai vender o carro ou imóvel atual e usar o valor como lance",
      "Quem tem FGTS disponível e quer usá-lo em consórcio imobiliário",
      "Quem quer entender o regulamento antes de aderir a um grupo",
    ],
    bullets: [
      "Lance livre: você define o percentual e concorre pelo maior valor",
      "Lance fixo: percentual definido em regulamento, com sorteio entre ofertantes",
      "Lance embutido: usa parte da própria carta, reduzindo o crédito final",
      "FGTS pode ser usado como lance em consórcio imobiliário, conforme regras",
      "Lance perdedor não gera custo — os valores não são debitados",
      "Histórico de lances vencedores ajuda a calibrar a oferta",
    ],
    sections: [
      {
        heading: "Lance livre: a disputa pelo maior percentual",
        body: "Você oferta um percentual do valor da carta com recursos próprios. Vence quem ofertar o maior percentual naquela assembleia. Como a competição varia mês a mês, acompanhar o histórico recente de lances vencedores do grupo é a melhor forma de estimar quanto será necessário — e evitar ofertar muito acima do preciso.",
      },
      {
        heading: "Lance fixo: percentual definido, disputa por sorteio",
        body: "Em grupos com lance fixo, o regulamento define um percentual, por exemplo 25% ou 50%. Todos que ofertarem exatamente esse percentual entram em um sorteio entre si. É mais previsível em valor, mas mantém o componente de sorte na definição do contemplado.",
      },
      {
        heading: "Lance embutido: antecipar sem dinheiro no bolso",
        body: "O lance embutido usa parte do próprio crédito para pagar a oferta, reduzindo o valor da carta que você receberá. É útil para quem não tem caixa disponível, mas exige atenção: se a carta cair abaixo do valor do bem desejado, será preciso complementar com recursos próprios na compra.",
      },
      {
        heading: "Estratégia: quando ofertar",
        body: "Ofertar cedo, nos primeiros meses do grupo, geralmente exige percentual maior porque há muitos participantes disputando. Em grupos mais maduros, a concorrência costuma diminuir. Se o objetivo é apenas reduzir o prazo, vale esperar; se há data para usar o bem, o lance precisa ser mais agressivo. Acompanhamos as assembleias com você e ajudamos a definir cada oferta.",
      },
    ],
    whatsappOrigem: "como_dar_lance_consorcio",
    whatsappMessage: "Quero orientação sobre lance em consórcio.",
    faqs: [
      {
        question: "Se meu lance perder, eu pago alguma coisa?",
        answer:
          "Não. O lance só é debitado se você for contemplado. Lances perdedores simplesmente não são efetivados, e você pode ofertar novamente na assembleia seguinte.",
      },
      {
        question: "Posso usar FGTS como lance?",
        answer:
          "Sim, em consórcio imobiliário, atendidos os requisitos do FGTS e da administradora — como tempo de contribuição, enquadramento do imóvel e ausência de outro imóvel na mesma cidade.",
      },
      {
        question: "Qual a diferença entre lance embutido e lance livre?",
        answer:
          "O lance livre usa recursos próprios e mantém integral o valor da carta. O embutido usa parte da própria carta, reduzindo o crédito disponível para a compra do bem.",
      },
      {
        question: "O lance reduz as parcelas ou o prazo?",
        answer:
          "Depende do regulamento e da sua escolha no momento da contemplação: em muitas administradoras é possível optar por reduzir o valor das parcelas restantes ou abater o prazo final.",
      },
      {
        question: "Como sei quanto ofertar para ganhar?",
        answer:
          "Analisando o histórico de lances vencedores do grupo nos meses anteriores. Não há garantia, mas o histórico dá uma referência bastante próxima. Levantamos esses dados com a administradora antes de você ofertar.",
      },
    ],
  },
  {
    slug: "consorcio-para-empresas-guarulhos",
    path: "/consorcio-para-empresas-guarulhos",
    navLabel: "Consórcio para Empresas",
    title: "Consórcio para Empresas em Guarulhos | Patro Seguros",
    metaDescription:
      "Consórcio empresarial em Guarulhos: frota, máquinas, equipamentos e imóvel comercial sem juros, preservando capital de giro e limite bancário.",
    h1: "Consórcio para Empresas e MEI em Guarulhos",
    subtitle:
      "Frota, equipamentos, máquinas e imóvel comercial adquiridos com planejamento, sem consumir capital de giro.",
    intro:
      "Para empresas de Guarulhos — do MEI que precisa de um veículo ao operador logístico que planeja um galpão — o consórcio é uma ferramenta de aquisição de ativos que preserva capital de giro e não compromete o limite de crédito bancário. Em vez de uma entrada pesada e juros mensais, a empresa assume uma parcela previsível e programa a chegada do bem. A Patro Seguros estrutura esse planejamento junto com o programa de seguros da empresa.",
    audience: [
      "MEI e pequenas empresas que precisam do primeiro veículo ou equipamento",
      "Comércios e prestadores de serviço que querem sair do aluguel comercial",
      "Transportadoras e distribuidores que renovam frota periodicamente",
      "Clínicas e consultórios que precisam de equipamentos de alto valor",
    ],
    bullets: [
      "Adesão em CNPJ, inclusive MEI, conforme análise cadastral",
      "Uso para veículos, frota, máquinas, equipamentos e imóvel comercial",
      "Preserva limite bancário para capital de giro e antecipação de recebíveis",
      "Parcela previsível, sem juros, facilitando o orçamento anual",
      "Múltiplas cotas para escalonar aquisições ao longo do tempo",
      "Integração com o programa de seguros empresariais da Patro",
    ],
    sections: [
      {
        heading: "Capital de giro é mais caro do que parece",
        body: "Quando a empresa usa caixa para comprar um ativo à vista, ela frequentemente precisa recorrer depois a antecipação de recebíveis ou capital de giro, que são linhas caras. O consórcio permite adquirir o ativo com parcela diluída, mantendo o caixa disponível para a operação e evitando esse efeito cascata.",
      },
      {
        heading: "Escalonamento de aquisições",
        body: "Empresas que precisam renovar frota ou equipamentos periodicamente costumam manter várias cotas ativas em grupos diferentes, criando um ciclo contínuo de contemplações. É um modelo de gestão de ativos que reduz picos de investimento e torna o investimento em bens mais previsível.",
      },
      {
        heading: "MEI e pequenas empresas",
        body: "O MEI pode aderir com CNPJ, respeitando a análise cadastral da administradora. Para muitos microempreendedores de Guarulhos — instaladores, prestadores de serviço, comércio de bairro — o consórcio é a alternativa realista ao crédito bancário caro para adquirir veículo, equipamento ou reformar o ponto.",
      },
      {
        heading: "Consórcio e programa de seguros andam juntos",
        body: "Todo ativo adquirido precisa de proteção: frota, equipamentos eletrônicos, máquinas, imóvel comercial, responsabilidade civil. Estruturamos o seguro empresarial em paralelo ao consórcio, para que o bem contemplado já entre em operação coberto, sem janela de exposição.",
      },
    ],
    whatsappOrigem: "consorcio_empresas_guarulhos",
    whatsappMessage: "Quero simular consórcio empresarial para a minha empresa em Guarulhos.",
    faqs: [
      {
        question: "MEI pode fazer consórcio em CNPJ?",
        answer:
          "Sim, respeitada a análise cadastral da administradora. Em alguns casos, a adesão em CPF do titular pode ser mais simples — avaliamos as duas alternativas.",
      },
      {
        question: "Consórcio empresarial tem vantagem fiscal?",
        answer:
          "O tratamento contábil e tributário das parcelas e do ativo adquirido depende do regime da empresa e deve ser confirmado com o contador. Não prestamos consultoria fiscal; nosso papel é comparar grupos, taxas e regulamentos.",
      },
      {
        question: "Quantas cotas uma empresa pode ter?",
        answer:
          "Não há um limite único; depende da capacidade de pagamento analisada pela administradora. Empresas que escalonam aquisições costumam manter várias cotas em grupos diferentes.",
      },
      {
        question: "Posso usar a carta para comprar equipamento importado?",
        answer:
          "Depende da modalidade e do regulamento. Equipamentos adquiridos de fornecedores nacionais com nota fiscal costumam ser aceitos sem dificuldade; importações diretas exigem verificação prévia.",
      },
      {
        question: "A Patro cuida do seguro dos bens contemplados?",
        answer:
          "Sim. Somos corretora de seguros com foco em riscos patrimoniais, frota e responsabilidade civil na região de Guarulhos e Cumbica, e estruturamos a proteção dos ativos adquiridos.",
      },
    ],
  },
];

export const CONSORCIO_INTENT_SLUGS = CONSORCIO_INTENT_PAGES.map((p) => p.slug);
export const CONSORCIO_INTENT_PATHS = CONSORCIO_INTENT_PAGES.map((p) => p.path);

export const getConsorcioIntentPage = (slug: string): ConsorcioIntentPage | undefined =>
  CONSORCIO_INTENT_PAGES.find((p) => p.slug === slug);