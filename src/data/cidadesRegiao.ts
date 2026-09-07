/**
 * Cidades e regiões atendidas pela Patro Seguros.
 *
 * Base das páginas `/corretora-de-seguros/:cidade` (NAP + Google Maps +
 * schema LocalBusiness). Todo dado institucional (nome, endereço, telefone)
 * vem de `src/config/empresa.ts` — aqui ficam apenas os dados geográficos
 * e o conteúdo único de cada cidade.
 */

export interface CidadeRegiao {
  /** Slug da URL: /corretora-de-seguros/{slug} */
  slug: string;
  /** Nome da cidade */
  nome: string;
  /** UF */
  uf: string;
  /** Região / recorte usado no texto */
  regiao: string;
  /** Distância aproximada do escritório (Cidade Maia, Guarulhos) */
  distancia: string;
  /** Coordenadas do centro da cidade (para o schema areaServed) */
  geo: { latitude: number; longitude: number };
  /** Frase de apoio do hero (1 linha) */
  resumo: string;
  /** Parágrafo de abertura */
  intro: string;
  /** Contexto econômico local (parágrafo único, conteúdo exclusivo) */
  contexto: string;
  /** Bairros / distritos citados no texto e no bloco de cobertura */
  bairros: string[];
  /** Vias e rodovias de acesso — usado no texto sobre risco e trânsito */
  vias: string[];
  /** Produtos com maior procura na cidade */
  destaques: { titulo: string; texto: string }[];
  /** Perguntas frequentes específicas da cidade (mínimo 4) */
  faqs: { pergunta: string; resposta: string }[];
}

export const cidadesRegiao: CidadeRegiao[] = [
  {
    slug: "guarulhos",
    nome: "Guarulhos",
    uf: "SP",
    regiao: "Região Metropolitana de São Paulo",
    distancia: "escritório próprio no Cidade Maia",
    geo: { latitude: -23.4543, longitude: -46.5337 },
    resumo: "Atendimento presencial no Cidade Maia e cobertura em toda a cidade.",
    intro:
      "Guarulhos é a cidade-sede da Patro Seguros. Nosso escritório fica no Edifício Via Alameda, no Cidade Maia, e atendemos moradores, motoristas de aplicativo, condomínios e empresas de todos os distritos da cidade — presencialmente ou de forma remota, como o cliente preferir.",
    contexto:
      "Segunda maior cidade do estado, Guarulhos concentra o maior aeroporto do país, uma malha industrial e logística intensa em Cumbica e um comércio forte no Centro e na Vila Galvão. Isso cria realidades de risco muito diferentes dentro do mesmo município: um galpão em Cumbica, um apartamento no Cidade Maia e um carro que dorme na rua nos Pimentas recebem preços e coberturas distintos. Conhecer essa diferença por CEP é o que permite negociar melhor com cada seguradora.",
    bairros: ["Cidade Maia", "Centro", "Vila Galvão", "Macedo", "Jardim Zaira", "Bom Clima", "Cumbica", "Pimentas", "Bonsucesso", "Vila Rio"],
    vias: ["Rodovia Presidente Dutra", "Rodovia Hélio Smidt", "Rodovia Fernão Dias", "Av. Salgado Filho", "Av. Paulo Faccini"],
    destaques: [
      { titulo: "Seguro auto e moto", texto: "Cotação comparada por CEP de pernoite, com atenção especial a regiões de maior índice de furto e roubo." },
      { titulo: "Seguro empresarial e de galpão", texto: "Cobertura para estoque, equipamentos, lucros cessantes e responsabilidade civil em Cumbica e no Centro." },
      { titulo: "Planos de saúde", texto: "Comparação entre operadoras com rede credenciada em hospitais de Guarulhos e da Zona Norte de São Paulo." },
    ],
    faqs: [
      { pergunta: "A Patro Seguros atende presencialmente em Guarulhos?", resposta: "Sim. Nosso escritório fica na Av. Salgado Filho, 2120, sala 219, no Cidade Maia. O atendimento presencial é feito de segunda a sexta, das 8h30 às 18h, e recomendamos combinar o horário pelo WhatsApp." },
      { pergunta: "O bairro influencia no preço do seguro em Guarulhos?", resposta: "Muito. O CEP onde o veículo dorme ou onde fica o imóvel é um dos principais fatores do cálculo. Regiões com mais registros de furto e roubo tendem a ter preço maior, e garagem fechada ou rastreador ajudam a reduzir." },
      { pergunta: "Vocês atendem empresas em Cumbica e no Centro?", resposta: "Sim. Trabalhamos com seguro empresarial, de frota, de galpão, responsabilidade civil e transporte de cargas para empresas instaladas em toda Guarulhos, incluindo a região do aeroporto." },
      { pergunta: "Consigo resolver tudo sem ir até o escritório?", resposta: "Consegue. Cotação, envio de documentos, emissão de apólice e abertura de sinistro podem ser feitos por WhatsApp, e-mail ou videochamada." },
      { pergunta: "Como funciona o atendimento em caso de sinistro?", resposta: "Você fala direto com a nossa equipe, que orienta a abertura do aviso junto à seguradora e acompanha o processo até a conclusão, sem depender apenas do call center da companhia." },
    ],
  },
  {
    slug: "aruja",
    nome: "Arujá",
    uf: "SP",
    regiao: "Alto Tietê",
    distancia: "cerca de 20 km do nosso escritório",
    geo: { latitude: -23.3966, longitude: -46.3211 },
    resumo: "Seguros para condomínios, casas e empresas às margens da Dutra.",
    intro:
      "Arujá fica a poucos minutos de Guarulhos pela Rodovia Presidente Dutra e é uma das cidades que mais atendemos fora do município-sede. O contato é feito por WhatsApp, videochamada ou visita combinada, com a mesma comparação entre seguradoras que oferecemos em Guarulhos.",
    contexto:
      "A cidade combina condomínios residenciais de alto padrão, chácaras e um polo logístico crescente ao longo da Dutra. Essa mistura muda bastante o desenho do seguro: residências em condomínio fechado costumam obter condições melhores em seguro residencial, enquanto galpões e transportadoras precisam de coberturas específicas para estoque, equipamentos e responsabilidade civil.",
    bairros: ["Centro", "Arujazinho", "Jardim Rincão", "Parque Rodrigo Barreto", "Vila Flórida", "Chácaras Guanabara"],
    vias: ["Rodovia Presidente Dutra", "Rodovia Alberto Hinoto", "Estrada Velha de Arujá"],
    destaques: [
      { titulo: "Seguro residencial e de condomínio", texto: "Coberturas para incêndio, danos elétricos, vendaval e responsabilidade civil em condomínios fechados." },
      { titulo: "Seguro empresarial e logístico", texto: "Proteção para galpões, transportadoras e empresas instaladas no eixo da Dutra." },
      { titulo: "Seguro auto", texto: "Comparação de preço considerando o trajeto diário Arujá–Guarulhos–São Paulo." },
    ],
    faqs: [
      { pergunta: "A Patro Seguros atende clientes em Arujá?", resposta: "Sim. Atendemos Arujá de forma remota por WhatsApp, telefone e videochamada, e presencialmente em visitas combinadas ou no nosso escritório em Guarulhos, a cerca de 20 km." },
      { pergunta: "Moro em condomínio fechado. Isso reduz o valor do seguro?", resposta: "Em geral sim, tanto no seguro residencial quanto no auto, porque o risco de furto e de danos diminui. É importante informar corretamente o tipo de portaria e se o veículo dorme em garagem." },
      { pergunta: "Vocês fazem seguro de galpão e transportadora em Arujá?", resposta: "Fazemos. Estruturamos coberturas de incêndio, roubo de estoque, equipamentos, lucros cessantes, RC operações e transporte de cargas conforme a operação da empresa." },
      { pergunta: "Preciso ir até Guarulhos para contratar?", resposta: "Não. Todo o processo pode ser feito à distância: cotação, análise das propostas, assinatura digital e emissão da apólice." },
      { pergunta: "Quem me atende se acontecer um sinistro em Arujá?", resposta: "A mesma equipe que fez a sua cotação. Orientamos a abertura do aviso, reunimos a documentação e acompanhamos o andamento junto à seguradora." },
    ],
  },
  {
    slug: "itaquaquecetuba",
    nome: "Itaquaquecetuba",
    uf: "SP",
    regiao: "Alto Tietê",
    distancia: "cerca de 25 km do nosso escritório",
    geo: { latitude: -23.4864, longitude: -46.3486 },
    resumo: "Cotação comparada para carro, moto, casa e comércio de bairro.",
    intro:
      "Atendemos moradores e comerciantes de Itaquaquecetuba com a mesma rotina de comparação entre seguradoras usada em Guarulhos: entendemos o perfil, cotamos em várias companhias e explicamos as diferenças de cobertura antes de qualquer contratação.",
    contexto:
      "Itaquá tem forte presença de motoristas de aplicativo, motofretistas e comércio de bairro. São perfis que precisam de atenção na hora de contratar: o uso profissional do veículo precisa ser declarado, sob risco de negativa na hora do sinistro, e o comércio costuma precisar de coberturas de vidros, equipamentos e responsabilidade civil que muitas apólices básicas não trazem.",
    bairros: ["Centro", "Jardim Odete", "Vila Virgínia", "Parque Piratininga", "Jardim Nicea", "Vila Zeferina"],
    vias: ["Rodovia Ayrton Senna", "Estrada de Itaquaquecetuba", "Av. Vereador João Fernandes da Silva"],
    destaques: [
      { titulo: "Seguro para motorista de aplicativo", texto: "Apólices que aceitam o uso profissional declarado, evitando recusa de cobertura no sinistro." },
      { titulo: "Seguro moto e motofretista", texto: "Opções com terceiros, assistência e coberturas voltadas a quem trabalha com entrega." },
      { titulo: "Seguro para comércio", texto: "Proteção de estoque, vidros, equipamentos e responsabilidade civil para lojas de bairro." },
    ],
    faqs: [
      { pergunta: "Vocês atendem Itaquaquecetuba?", resposta: "Sim. O atendimento é feito por WhatsApp, telefone e videochamada, com possibilidade de encontro presencial no nosso escritório em Guarulhos, a cerca de 25 km." },
      { pergunta: "Uso o carro para aplicativo. Posso contratar seguro normal?", resposta: "O uso profissional precisa ser declarado. Existem apólices específicas para motoristas de aplicativo, e omitir a informação pode levar a seguradora a negar a indenização em caso de sinistro." },
      { pergunta: "Seguro de moto para entregador é caro?", resposta: "Depende do modelo, do CEP e do tipo de uso. Trabalhamos com produtos de terceiros e coberturas parciais que costumam caber no orçamento de quem trabalha com entrega." },
      { pergunta: "Tenho uma loja pequena. Vale a pena o seguro empresarial?", resposta: "Vale, porque o custo costuma ser baixo diante do prejuízo de um incêndio, furto de estoque ou queima de equipamentos por oscilação de energia." },
      { pergunta: "Como recebo as cotações?", resposta: "Enviamos as propostas comparadas por WhatsApp ou e-mail, com cobertura, franquia e valor lado a lado, e explicamos as diferenças antes de você decidir." },
    ],
  },
  {
    slug: "mairipora",
    nome: "Mairiporã",
    uf: "SP",
    regiao: "Região Metropolitana de São Paulo",
    distancia: "cerca de 40 km do nosso escritório",
    geo: { latitude: -23.3192, longitude: -46.5869 },
    resumo: "Seguros para casas de campo, chácaras e condomínios de serra.",
    intro:
      "Em Mairiporã, atendemos principalmente famílias com casa de campo, chácaras e imóveis em condomínios de serra, além de empresas locais. Todo o atendimento pode ser feito à distância, com visita combinada quando necessário.",
    contexto:
      "Imóveis de uso ocasional exigem cuidado extra na contratação: seguradoras tratam de forma diferente a casa habitada o ano inteiro e a casa usada só nos fins de semana, e a cobertura de furto costuma ter regras específicas nesse cenário. Somam-se riscos típicos da região serrana, como queda de árvores, vendaval, deslizamento e danos elétricos por oscilação de energia.",
    bairros: ["Centro", "Terra Preta", "Caraguatá", "Jardim Cinco Lagos", "Serra da Cantareira", "Petrópolis"],
    vias: ["Rodovia Fernão Dias", "Estrada Santa Inês", "Rodovia Presidente Tancredo Neves"],
    destaques: [
      { titulo: "Seguro residencial para casa de campo", texto: "Coberturas para vendaval, queda de árvore, danos elétricos e responsabilidade civil familiar." },
      { titulo: "Seguro de imóvel desocupado", texto: "Análise das regras de cada seguradora para casas usadas apenas em finais de semana." },
      { titulo: "Seguro auto", texto: "Cotação considerando trajetos frequentes pela Fernão Dias e pela Serra da Cantareira." },
    ],
    faqs: [
      { pergunta: "A Patro Seguros atende Mairiporã?", resposta: "Sim, de forma remota por WhatsApp, telefone e videochamada, com visita combinada quando o caso exige vistoria ou reunião presencial." },
      { pergunta: "Casa usada só nos fins de semana tem seguro?", resposta: "Tem, mas é preciso declarar o uso ocasional. Algumas seguradoras aplicam regras específicas para furto e exigem itens mínimos de segurança nesse tipo de imóvel." },
      { pergunta: "O seguro cobre queda de árvore sobre o telhado?", resposta: "Costuma ser coberto pela garantia de vendaval, furacão, ciclone e impacto de veículos, mas o texto varia entre companhias. Conferimos essa cláusula em cada proposta." },
      { pergunta: "Danos elétricos entram na apólice?", resposta: "Sim, é uma cobertura adicional bastante recomendada na região por causa das oscilações de energia, e protege equipamentos como geladeira, bomba d'água e portão eletrônico." },
      { pergunta: "Consigo contratar sem sair de casa?", resposta: "Consegue. Cotação, envio de fotos do imóvel, assinatura e emissão da apólice são feitos digitalmente." },
    ],
  },
  {
    slug: "santa-isabel",
    nome: "Santa Isabel",
    uf: "SP",
    regiao: "Alto Tietê",
    distancia: "cerca de 35 km do nosso escritório",
    geo: { latitude: -23.3159, longitude: -46.2216 },
    resumo: "Seguros rurais, residenciais e empresariais para a região.",
    intro:
      "Santa Isabel tem um perfil misto, entre área urbana, sítios e propriedades rurais. Atendemos a cidade de forma remota e com visitas combinadas, com atenção especial a quem precisa proteger produção, maquinário e imóveis fora do perímetro urbano.",
    contexto:
      "Propriedades rurais e semirrurais raramente cabem em uma apólice residencial padrão. Benfeitorias, galpões, tratores, implementos e até o rebanho podem exigir coberturas específicas, e o cálculo do risco muda conforme a distância de hidrantes, o tipo de construção e a existência de vigilância. Também é comum a necessidade de responsabilidade civil para quem recebe visitantes ou presta serviço a terceiros.",
    bairros: ["Centro", "Cachoeira", "Aparecida", "Monte Negro", "Cruzeiro"],
    vias: ["Rodovia Presidente Dutra", "SP-56 (Estrada Santa Isabel–Igaratá)", "Estrada Santa Isabel–Arujá"],
    destaques: [
      { titulo: "Seguro rural e de maquinário", texto: "Cobertura para tratores, implementos, benfeitorias e galpões de propriedades rurais." },
      { titulo: "Seguro residencial ampliado", texto: "Proteção de casa-sede, edículas e estruturas anexas com responsabilidade civil familiar." },
      { titulo: "Seguro empresarial", texto: "Apólices para comércio, prestadores de serviço e pequenas indústrias da cidade." },
    ],
    faqs: [
      { pergunta: "Vocês trabalham com seguro rural em Santa Isabel?", resposta: "Sim. Cotamos seguro de maquinário agrícola, benfeitorias, galpões e responsabilidade civil rural com seguradoras que operam nesse segmento." },
      { pergunta: "Minha casa fica em área de sítio. O seguro residencial cobre?", resposta: "Cobre, mas a análise é diferente da urbana. Informamos à seguradora o tipo de construção, o acesso e as medidas de segurança para conseguir a melhor condição possível." },
      { pergunta: "Trator e implementos entram na mesma apólice da casa?", resposta: "Normalmente não. Maquinário costuma ser segurado em apólice própria, com coberturas de colisão, incêndio, roubo e, em alguns casos, quebra de máquina." },
      { pergunta: "Atendem presencialmente na cidade?", resposta: "Fazemos visitas combinadas quando o caso exige, além do atendimento remoto por WhatsApp e videochamada e do escritório em Guarulhos." },
      { pergunta: "Quanto tempo leva para receber uma proposta?", resposta: "Cotações simples costumam ficar prontas no mesmo dia. Casos rurais e empresariais mais complexos podem levar alguns dias úteis por exigirem análise da seguradora." },
    ],
  },
  {
    slug: "ferraz-de-vasconcelos",
    nome: "Ferraz de Vasconcelos",
    uf: "SP",
    regiao: "Alto Tietê",
    distancia: "cerca de 30 km do nosso escritório",
    geo: { latitude: -23.5411, longitude: -46.3689 },
    resumo: "Seguro auto, moto e residencial com cotação comparada.",
    intro:
      "Atendemos Ferraz de Vasconcelos de forma remota, com foco em seguro auto, moto, residencial e proteção para pequenos negócios. A cotação é sempre comparada entre várias seguradoras antes de qualquer recomendação.",
    contexto:
      "Cidade densa e com muitos deslocamentos diários para São Paulo e para o Alto Tietê, Ferraz reúne um público que depende do carro e da moto para trabalhar. Isso torna importantes coberturas como carro reserva, assistência 24 horas e proteção a terceiros, que evitam que um imprevisto pare a renda da família.",
    bairros: ["Centro", "Vila Romanópolis", "Jardim São João", "Vila Santo Antônio", "Jardim Represa"],
    vias: ["Rodovia Ayrton Senna", "Av. Cruzeiro do Sul", "Estrada Ferraz–Poá"],
    destaques: [
      { titulo: "Seguro auto com carro reserva", texto: "Coberturas pensadas para quem não pode ficar sem o veículo durante o reparo." },
      { titulo: "Seguro moto", texto: "Opções de terceiros e roubo/furto para uso pessoal e profissional." },
      { titulo: "Seguro residencial", texto: "Proteção contra incêndio, roubo, danos elétricos e responsabilidade civil familiar." },
    ],
    faqs: [
      { pergunta: "A Patro atende Ferraz de Vasconcelos?", resposta: "Sim, com atendimento remoto por WhatsApp, telefone e videochamada, e presencial no escritório em Guarulhos quando o cliente preferir." },
      { pergunta: "Carro reserva vale a pena?", resposta: "Para quem usa o carro no trabalho, costuma valer. O custo adicional é pequeno perto do transtorno de ficar sem veículo por dias durante um reparo." },
      { pergunta: "Seguro só de terceiros existe?", resposta: "Existe. É uma alternativa mais barata para quem quer proteger o patrimônio de terceiros e a própria responsabilidade civil, sem cobrir o próprio veículo." },
      { pergunta: "Como funciona a assistência 24 horas?", resposta: "Cobre guincho, chaveiro, troca de pneu e pane seca dentro dos limites contratados. Comparamos a quilometragem de reboque incluída em cada proposta." },
      { pergunta: "Posso parcelar o seguro?", resposta: "Sim. A maioria das seguradoras parcela no cartão ou no boleto, com número de parcelas que varia por companhia e por produto." },
    ],
  },
  {
    slug: "poa",
    nome: "Poá",
    uf: "SP",
    regiao: "Alto Tietê",
    distancia: "cerca de 32 km do nosso escritório",
    geo: { latitude: -23.5281, longitude: -46.3444 },
    resumo: "Cotação comparada para famílias, comércio e clínicas.",
    intro:
      "Em Poá atendemos famílias, profissionais liberais e pequenos negócios, com comparação entre seguradoras e explicação clara de cada cobertura antes da contratação.",
    contexto:
      "A cidade tem um comércio central movimentado e boa concentração de consultórios e clínicas. Esses negócios costumam precisar de coberturas específicas — equipamentos, responsabilidade civil profissional e proteção de dados — que raramente aparecem em uma apólice residencial ou empresarial genérica.",
    bairros: ["Centro", "Vila Varela", "Jardim Nova Poá", "Cidade Kemel", "Vila Marlene"],
    vias: ["Rodovia Ayrton Senna", "Av. Antônio Massa", "Estrada Poá–Suzano"],
    destaques: [
      { titulo: "Seguro para consultórios e clínicas", texto: "Equipamentos, responsabilidade civil profissional e interrupção das atividades." },
      { titulo: "Seguro empresarial para comércio", texto: "Estoque, vidros, letreiros, equipamentos e RC operações." },
      { titulo: "Planos de saúde", texto: "Comparação de operadoras com rede credenciada no Alto Tietê e em São Paulo." },
    ],
    faqs: [
      { pergunta: "Vocês atendem Poá?", resposta: "Sim. O atendimento é remoto por WhatsApp, telefone e videochamada, com opção de reunião presencial no nosso escritório em Guarulhos." },
      { pergunta: "Tenho um consultório. Que seguro preciso?", resposta: "Normalmente uma combinação de seguro empresarial para a estrutura e os equipamentos com responsabilidade civil profissional, que protege contra reclamações ligadas ao exercício da atividade." },
      { pergunta: "Equipamentos médicos e odontológicos são cobertos?", resposta: "Podem ser, tanto contra roubo e incêndio quanto contra danos elétricos. Equipamentos de maior valor costumam ser listados individualmente na apólice." },
      { pergunta: "Vocês comparam planos de saúde para empresa?", resposta: "Comparamos. Levantamos rede credenciada, coparticipação, carência e reajuste das operadoras antes de apresentar as opções." },
      { pergunta: "Quanto custa a consultoria da corretora?", resposta: "Nada além do próprio seguro. A remuneração da corretora já está incluída no prêmio pago à seguradora, igual ocorre na venda feita por qualquer outro canal." },
    ],
  },
  {
    slug: "suzano",
    nome: "Suzano",
    uf: "SP",
    regiao: "Alto Tietê",
    distancia: "cerca de 40 km do nosso escritório",
    geo: { latitude: -23.5425, longitude: -46.3108 },
    resumo: "Seguros empresariais, de frota e residenciais no Alto Tietê.",
    intro:
      "Suzano concentra indústria, logística e um comércio regional relevante. Atendemos empresas e famílias da cidade com cotação comparada e acompanhamento de sinistro feito pela nossa própria equipe.",
    contexto:
      "Operações industriais e logísticas exigem uma leitura de risco mais detalhada: valor em estoque, tipo de construção, sistema de combate a incêndio, movimentação de cargas e responsabilidade civil de operações. Frotas, por sua vez, ganham condições melhores quando o histórico de sinistralidade e a gestão de motoristas são apresentados corretamente à seguradora.",
    bairros: ["Centro", "Jardim Imperador", "Vila Amorim", "Parque Maria Helena", "Cidade Boa Vista"],
    vias: ["Rodovia Índio Tibiriçá", "Rodovia Ayrton Senna", "Av. Brasil"],
    destaques: [
      { titulo: "Seguro de frota", texto: "Gestão de apólice única para vários veículos, com controle de sinistralidade e renovação negociada." },
      { titulo: "Seguro industrial e de galpão", texto: "Incêndio, roubo de estoque, quebra de máquinas, lucros cessantes e RC operações." },
      { titulo: "Seguro de transporte de cargas", texto: "Cobertura de mercadorias em trânsito para embarcadores e transportadoras." },
    ],
    faqs: [
      { pergunta: "A Patro Seguros atende empresas em Suzano?", resposta: "Sim. Trabalhamos com seguro empresarial, industrial, de frota e de transporte de cargas para empresas do Alto Tietê, com atendimento remoto e visitas combinadas." },
      { pergunta: "Como funciona o seguro de frota?", resposta: "Os veículos ficam em uma única apólice, com gestão centralizada de inclusões, exclusões e sinistros. A renovação é negociada com base no histórico de sinistralidade da frota." },
      { pergunta: "Lucros cessantes cobre o que exatamente?", resposta: "Cobre a perda de faturamento durante o período de paralisação causado por um sinistro coberto, como um incêndio, respeitando o limite e a franquia contratados." },
      { pergunta: "Preciso de laudo ou vistoria para contratar?", resposta: "Em operações industriais, a seguradora costuma pedir vistoria prévia ou informações técnicas de proteção contra incêndio. Orientamos a empresa sobre o que preparar." },
      { pergunta: "Vocês acompanham o sinistro?", resposta: "Sim. Reunimos a documentação, abrimos o aviso e acompanhamos a regulação junto à seguradora até a conclusão." },
    ],
  },
  {
    slug: "mogi-das-cruzes",
    nome: "Mogi das Cruzes",
    uf: "SP",
    regiao: "Alto Tietê",
    distancia: "cerca de 50 km do nosso escritório",
    geo: { latitude: -23.5228, longitude: -46.1883 },
    resumo: "Seguros para famílias, produtores e empresas do Alto Tietê.",
    intro:
      "Maior cidade do Alto Tietê, Mogi das Cruzes reúne agricultura, indústria, comércio e um grande polo de serviços de saúde e educação. Atendemos a cidade de forma remota, com visitas combinadas para casos empresariais e rurais.",
    contexto:
      "A diversidade econômica da cidade se reflete nas apólices: um produtor do cinturão verde precisa proteger estufas, insumos e maquinário; uma clínica precisa de responsabilidade civil profissional e equipamentos; uma indústria precisa de análise de incêndio e lucros cessantes. Trabalhar com várias seguradoras permite escolher, para cada um desses perfis, a companhia que precifica melhor aquele risco.",
    bairros: ["Centro", "Vila Oliveira", "Mogilar", "Braz Cubas", "César de Souza", "Jundiapeba"],
    vias: ["Rodovia Ayrton Senna", "Rodovia Mogi–Dutra", "Rodovia Índio Tibiriçá"],
    destaques: [
      { titulo: "Seguro rural e de estufas", texto: "Proteção para produção, maquinário e benfeitorias do cinturão verde." },
      { titulo: "Seguro para clínicas e consultórios", texto: "Equipamentos, RC profissional e proteção de dados de pacientes." },
      { titulo: "Seguro auto e residencial", texto: "Cotação comparada por perfil e CEP, com coberturas ajustadas ao uso real." },
    ],
    faqs: [
      { pergunta: "Vocês atendem Mogi das Cruzes mesmo ficando em Guarulhos?", resposta: "Sim. O atendimento é feito por WhatsApp, telefone e videochamada, com visitas combinadas quando o caso exige. A distância não muda o preço da apólice." },
      { pergunta: "Produtor rural consegue seguro para estufas?", resposta: "Consegue. Existem produtos específicos para estufas, benfeitorias, maquinário e insumos, com análise de risco feita pela seguradora." },
      { pergunta: "Clínica precisa de seguro além do empresarial?", resposta: "Costuma precisar de responsabilidade civil profissional, que responde por reclamações ligadas ao atendimento, além do seguro patrimonial da estrutura e dos equipamentos." },
      { pergunta: "Dá para reunir vários seguros na mesma corretora?", resposta: "Dá, e costuma facilitar. Você centraliza vencimentos, renovações e o atendimento de sinistro em um único contato." },
      { pergunta: "Como peço uma cotação?", resposta: "Basta chamar no WhatsApp ou enviar os dados pelo formulário do site. Retornamos com as propostas comparadas e explicamos as diferenças." },
    ],
  },
  {
    slug: "sao-paulo-zona-norte",
    nome: "São Paulo — Zona Norte",
    uf: "SP",
    regiao: "Capital, divisa com Guarulhos",
    distancia: "cerca de 15 km do nosso escritório",
    geo: { latitude: -23.4795, longitude: -46.6206 },
    resumo: "Atendimento para Santana, Tucuruvi, Vila Maria e região.",
    intro:
      "A Zona Norte da capital faz divisa direta com Guarulhos e é uma das regiões que mais atendemos fora do município. Santana, Tucuruvi, Vila Maria, Casa Verde e Jaçanã estão a poucos minutos do nosso escritório.",
    contexto:
      "Morar na capital muda o cálculo do seguro em relação a Guarulhos: índices de furto e roubo, trânsito e tipo de estacionamento variam bairro a bairro, e as seguradoras usam tabelas distintas por CEP. Também é comum, nessa faixa da cidade, a necessidade de plano de saúde com rede credenciada que atenda tanto a capital quanto Guarulhos, algo que verificamos antes de indicar qualquer operadora.",
    bairros: ["Santana", "Tucuruvi", "Vila Maria", "Casa Verde", "Jaçanã", "Vila Guilherme", "Tremembé"],
    vias: ["Marginal Tietê", "Av. Cruzeiro do Sul", "Rodovia Fernão Dias", "Av. Braz Leme"],
    destaques: [
      { titulo: "Seguro auto na capital", texto: "Cotação por CEP de pernoite, com atenção ao tipo de garagem e ao uso diário do veículo." },
      { titulo: "Seguro residencial e de apartamento", texto: "Coberturas de incêndio, danos elétricos, vazamento e responsabilidade civil familiar." },
      { titulo: "Planos de saúde", texto: "Comparação de rede credenciada entre hospitais da Zona Norte e de Guarulhos." },
    ],
    faqs: [
      { pergunta: "Vocês atendem a Zona Norte de São Paulo?", resposta: "Sim. A região fica a cerca de 15 km do nosso escritório no Cidade Maia, em Guarulhos, e atendemos presencialmente ou de forma remota, como o cliente preferir." },
      { pergunta: "O seguro é mais caro na capital do que em Guarulhos?", resposta: "Depende do bairro. Cada CEP tem sua própria estatística de furto, roubo e colisão, e por isso cotamos sempre com o endereço exato onde o veículo dorme." },
      { pergunta: "Apartamento precisa de seguro mesmo com o do condomínio?", resposta: "Sim. O seguro obrigatório do condomínio cobre a estrutura do prédio, não o conteúdo nem a responsabilidade civil da sua unidade, como um vazamento que atinge o vizinho." },
      { pergunta: "A rede do plano de saúde atende Guarulhos e a capital?", resposta: "Varia por operadora e por plano. Conferimos a rede credenciada nas duas cidades antes de apresentar as opções, especialmente para quem mora na divisa." },
      { pergunta: "Consigo atendimento presencial?", resposta: "Consegue. Você pode nos visitar no Cidade Maia, em Guarulhos, ou combinar uma reunião online, conforme a sua agenda." },
    ],
  },
];

export const cidadesRegiaoSlugs = cidadesRegiao.map((c) => c.slug);

export const getCidadeRegiao = (slug?: string) =>
  cidadesRegiao.find((c) => c.slug === slug);

/** Caminho canônico de cada página de cidade. */
export const cidadeRegiaoPath = (slug: string) => `/corretora-de-seguros/${slug}`;

/** Caminho do hub de cidades e regiões. */
export const CIDADES_REGIAO_HUB_PATH = "/corretora-de-seguros";
