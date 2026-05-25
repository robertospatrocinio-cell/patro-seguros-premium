import type { SeoLocalPageConfig } from "@/data/seoLocalAutoPages";
import type { LocalInsurer, LocalTestimonial } from "@/components/LocalPageTemplate";

type Categoria = "popular" | "sedan" | "suv" | "premium";

interface ModeloSeed {
  slug: string;
  modelo: string;
  modeloShort: string;
  categoria: Categoria;
  fipeRange: string;
  priceRange: { min: number; max: number; label: string };
  theftProfile: "baixo" | "médio" | "médio-alto" | "alto";
  pros: string[];
  cons: string[];
  bestInsurers: { name: string; reason: string }[];
  context: string;
}

const MODELOS: ModeloSeed[] = [
  {
    slug: "seguro-auto-audi-guarulhos",
    modelo: "Audi",
    modeloShort: "Audi",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 1.800.000+",
    priceRange: { min: 4200, max: 28000, label: "R$ 4.200 a R$ 28.000/ano" },
    theftProfile: "médio",
    pros: [
      "Vanguarda tecnológica com o sistema de tração Quattro",
      "Design progressivo e acabamento interno de referência premium",
      "Sistemas de segurança ativa avançados e alto valor de revenda",
    ],
    cons: [
      "Manutenção especializada e custos de eletrônica embarcada",
      "Peças de reposição importadas que podem elevar o prêmio",
      "Exigência de rastreadores em modelos de performance (RS)",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "cobertura premium com serviço de concierge e assistência 24h exclusiva" },
      { name: "Allianz", reason: "excelente custo-benefício para modelos SUV da linha Q (Q3, Q5, Q7)" },
      { name: "SulAmérica", reason: "rede de oficinas referenciadas de alto padrão para modelos importados" },
      { name: "Tokio Marine", reason: "preço competitivo para modelos de entrada como A3 e Q3" },
    ],
    context:
      "A Audi representa o equilíbrio perfeito entre luxo, tecnologia e performance. Em Guarulhos, proprietários de modelos como A3, A4, Q3 e a linha de alta performance RS buscam uma proteção que acompanhe a sofisticação da marca das quatro argolas. A Patro Seguros oferece consultoria especializada para garantir reparos com peças genuínas e atendimento em rede autorizada, preservando a garantia e a segurança do seu Audi.",
  },
  {
    slug: "seguro-auto-porsche-guarulhos",
    modelo: "Porsche",
    modeloShort: "Porsche",
    categoria: "premium",
    fipeRange: "R$ 350.000 a R$ 2.500.000+",
    priceRange: { min: 8500, max: 45000, label: "R$ 8.500 a R$ 45.000/ano" },
    theftProfile: "baixo",
    pros: [
      "Engenharia de alta performance e sistemas de segurança ativos",
      "Modelos com altíssima valorização e desejo de mercado",
      "Assistência 24h exclusiva para veículos de luxo",
    ],
    cons: [
      "Peças de reposição extremamente caras e importação demorada",
      "Exigência de vistorias técnicas rigorosas e dispositivos de segurança",
      "Limitação de oficinas aptas a realizar reparos estruturais",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "cobertura premium com serviço de transporte em plataforma fechada" },
      { name: "Allianz", reason: "excelente para modelos SUV como Macan e Cayenne" },
      { name: "SulAmérica", reason: "atendimento exclusivo para a linha 911 e esportivos" },
      { name: "Sompo", reason: "especialista em seguros de alto valor e riscos diferenciados" },
    ],
    context:
      "Possuir um Porsche é uma experiência única de engenharia e performance. Em Guarulhos, proprietários de modelos como 911, Boxster, Macan e Cayenne necessitam de um seguro que entenda que cada detalhe importa. A Patro Seguros oferece consultoria especializada para garantir que seu Porsche tenha cobertura total, com reparo exclusivo em centros técnicos autorizados e garantia de peças genuínas vindas da Alemanha.",
  },
  {
    slug: "seguro-auto-mercedes-guarulhos",
    modelo: "Mercedes-Benz",
    modeloShort: "Mercedes",
    categoria: "premium",
    fipeRange: "R$ 190.000 a R$ 1.200.000+",
    priceRange: { min: 4800, max: 22000, label: "R$ 4.800 a R$ 22.000/ano" },
    theftProfile: "médio",
    pros: [
      "Referência mundial em luxo, segurança e durabilidade",
      "Sistemas de assistência ao condutor que reduzem o risco de colisão",
      "Valor de revenda sólido e alta aceitação em seguradoras premium",
    ],
    cons: [
      "Manutenção especializada e peças de alto custo",
      "Variação de prêmio conforme o modelo (Classe A vs Classe S)",
      "Exigência de dispositivos de rastreamento avançados",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "serviço de concierge e rede de oficinas Star (Mercedes) certificadas" },
      { name: "Allianz", reason: "condições exclusivas para modelos Classe C e GLA" },
      { name: "SulAmérica", reason: "atendimento VIP e cobertura para acessórios originais" },
      { name: "Liberty", reason: "boa aceitação para modelos seminovos e importação direta" },
    ],
    context:
      "A Mercedes-Benz é o símbolo máximo de prestígio automotivo. Em Guarulhos, proprietários de modelos como Classe C, GLC, GLE e a icônica Classe G buscam uma proteção que preserve a integridade e o valor do veículo. A Patro Seguros entende as particularidades da marca alemã e oferece apólices com garantia de reposição de peças originais e atendimento em rede autorizada.",
  },
  {
    slug: "seguro-auto-bmw-guarulhos",
    modelo: "BMW",
    modeloShort: "BMW",
    categoria: "premium",
    fipeRange: "R$ 180.000 a R$ 950.000+",
    priceRange: { min: 4500, max: 18500, label: "R$ 4.500 a R$ 18.500/ano" },
    theftProfile: "médio-alto",
    pros: [
      "Veículos com tecnologia de ponta e sistemas de segurança ativos",
      "Rede de concessionárias premium em Guarulhos e São Paulo",
      "Alta liquidez para modelos Série 3 e X1",
    ],
    cons: [
      "Alto custo de peças importadas e eletrônica embarcada",
      "Exigência de rastreador e oficina premium na maioria das apólices",
      "Sinistros de colisão leve podem ter prêmio elevado pela peças",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "líder em seguro premium com serviço de concierge e guincho especializado" },
      { name: "Allianz", reason: "excelente precificação para SUVs como X1, X3 e X5" },
      { name: "SulAmérica", reason: "forte em veículos importados com oficinas de alto padrão" },
      { name: "Tokio Marine", reason: "preço competitivo para Série 3 e modelos seminovos" },
    ],
    context:
      "Proprietários de BMW em Guarulhos (concentrados em bairros como Cidade Maia e Jardim Maia) exigem um seguro que acompanhe o nível de sofisticação da marca. A Patro Seguros oferece consultoria exclusiva para modelos como 320i, X1, X5 e a linha esportiva M, garantindo reparos em concessionárias autorizadas e peças 100% originais.",
  },
  {
    slug: "seguro-corolla-guarulhos",
    modelo: "Toyota Corolla",
    modeloShort: "Corolla",
    categoria: "sedan",
    fipeRange: "R$ 95.000 a R$ 175.000",
    priceRange: { min: 2400, max: 4800, label: "R$ 2.400 a R$ 4.800/ano" },
    theftProfile: "médio",
    pros: [
      "Modelo nacional com peças amplamente disponíveis em Guarulhos",
      "Baixa sinistralidade média no perfil de condutor adulto",
      "Rede de oficinas referenciadas extensa em todas as seguradoras",
    ],
    cons: [
      "Modelo desejado por quadrilhas — exige rastreador em CEPs de risco",
      "Versão híbrida (Altis Hybrid) tem custo de reparo mais alto",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "rede referenciada Toyota e cobertura premium para Altis" },
      { name: "Tokio Marine", reason: "preço competitivo para versão XEi 2.0 flex" },
      { name: "Allianz", reason: "boa precificação para condutores acima de 30 anos" },
      { name: "Bradesco Seguros", reason: "parcelamento facilitado e rede integrada" },
    ],
    context:
      "O Corolla é o sedã mais vendido do Brasil há mais de uma década e representa cerca de 6% da frota de sedãs em Guarulhos. Sua popularidade combinada ao alto valor FIPE (especialmente nas versões Altis e GR-Sport) faz com que o modelo seja alvo recorrente de furto e roubo em Cumbica, Pimentas e Bonsucesso.",
  },
  {
    slug: "seguro-civic-guarulhos",
    modelo: "Honda Civic",
    modeloShort: "Civic",
    categoria: "sedan",
    fipeRange: "R$ 95.000 a R$ 195.000",
    priceRange: { min: 2700, max: 5400, label: "R$ 2.700 a R$ 5.400/ano" },
    theftProfile: "médio-alto",
    pros: [
      "Excelente histórico de durabilidade — atrai perfil de condutor responsável",
      "Boa rede Honda em Guarulhos e Grande SP",
      "Versão Touring com itens de série reduzem custo de reparo",
    ],
    cons: [
      "Alto índice de furto e roubo para versões SI e Touring",
      "Versão Hybrid (e:HEV) demanda apólice específica para sistema híbrido",
      "Peças importadas geram aumento de prêmio em algumas seguradoras",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "tradicional para o modelo, rede ampla em Guarulhos" },
      { name: "Allianz", reason: "competitiva para Civic 1.5 Turbo Touring" },
      { name: "HDI", reason: "boa franquia para versões 2018-2020" },
      { name: "Liberty", reason: "perfil jovem com franquia reduzida" },
    ],
    context:
      "O Civic é referência entre sedãs médios premium e tem forte presença em condomínios de Guarulhos como Cidade Maia e Vila Augusta. As versões SI e Touring estão entre as mais visadas pelo crime organizado da região metropolitana — exigindo rastreador e garagem coberta na maioria das apólices.",
  },
  {
    slug: "seguro-hb20-guarulhos",
    modelo: "Hyundai HB20",
    modeloShort: "HB20",
    categoria: "popular",
    fipeRange: "R$ 55.000 a R$ 105.000",
    priceRange: { min: 1900, max: 3600, label: "R$ 1.900 a R$ 3.600/ano" },
    theftProfile: "médio",
    pros: [
      "Um dos compactos mais vendidos no Brasil — peças baratas",
      "Custo de reparo baixo, o que reduz o prêmio do seguro",
      "Versão Sense (entrada) tem prêmio até 25% menor que versões topo",
    ],
    cons: [
      "Versão Platinum tem mais itens visados (multimídia, rodas)",
      "Modelo popular para uso em apps — exige cláusula expressa para Uber/99",
    ],
    bestInsurers: [
      { name: "HDI", reason: "muito competitiva para HB20 1.0 Sense e Vision" },
      { name: "Azul Seguros", reason: "preço agressivo em CEPs de baixo risco" },
      { name: "Mapfre", reason: "boa cobertura para uso misto particular/aplicativo" },
      { name: "Tokio Marine", reason: "histórico sólido para HB20 Comfort Plus" },
    ],
    context:
      "O HB20 é um dos veículos mais populares em Guarulhos e o segundo mais usado por motoristas de aplicativo na cidade. Por isso, é fundamental contratar apólice com cláusula expressa para uso profissional — apólices padrão recusam o sinistro se o veículo estava em corrida.",
  },
  {
    slug: "seguro-onix-guarulhos",
    modelo: "Chevrolet Onix",
    modeloShort: "Onix",
    categoria: "popular",
    fipeRange: "R$ 60.000 a R$ 115.000",
    priceRange: { min: 2000, max: 3900, label: "R$ 2.000 a R$ 3.900/ano" },
    theftProfile: "médio-alto",
    pros: [
      "Carro mais vendido do Brasil — mercado de peças extremamente líquido",
      "Versão LT tem ótimo custo-benefício no seguro",
      "Boa rede Chevrolet em Guarulhos e ABC",
    ],
    cons: [
      "Alto índice de furto pela popularidade — exige rastreador em CEPs de risco",
      "Versão Premier tem itens cobiçados (multimídia, rodas 16)",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "rede ampla e cobertura premium para Onix Premier" },
      { name: "Allianz", reason: "preço competitivo para Onix LT 1.0 Turbo" },
      { name: "Bradesco Seguros", reason: "parcelamento em 12x sem juros" },
      { name: "HDI", reason: "boa franquia para Onix Joy e LS" },
    ],
    context:
      "O Onix lidera o ranking de vendas no Brasil há vários anos e é um dos modelos mais visados por quadrilhas na região metropolitana de São Paulo. Em Pimentas, Cumbica e Bonsucesso, a maioria das seguradoras exige rastreador para aceitar a apólice — versões Premier costumam ter prêmio 18% mais alto que LT.",
  },
  {
    slug: "seguro-tcross-guarulhos",
    modelo: "Volkswagen T-Cross",
    modeloShort: "T-Cross",
    categoria: "suv",
    fipeRange: "R$ 105.000 a R$ 170.000",
    priceRange: { min: 2800, max: 5200, label: "R$ 2.800 a R$ 5.200/ano" },
    theftProfile: "médio-alto",
    pros: [
      "SUV compacto líder de vendas — boa liquidez de mercado",
      "Estrutura robusta reduz custo de reparo em sinistros leves",
      "Versão Highline tem bom histórico de cobertura premium",
    ],
    cons: [
      "Modelo bastante visado para furto — rastreador praticamente obrigatório",
      "Versão Highline e Sense Plus têm prêmio mais alto pelo valor FIPE",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "líder em apólices T-Cross em Guarulhos" },
      { name: "Allianz", reason: "boa cobertura para versão Highline 1.4 TSI" },
      { name: "Tokio Marine", reason: "preço competitivo para T-Cross Sense" },
      { name: "SulAmérica", reason: "forte em SUVs premium" },
    ],
    context:
      "O T-Cross é o SUV compacto mais vendido do Brasil e tem forte presença em condomínios fechados de Guarulhos. Versão Highline costuma ser ~22% mais cara para segurar do que a versão Sense de entrada.",
  },
  {
    slug: "seguro-compass-guarulhos",
    modelo: "Jeep Compass",
    modeloShort: "Compass",
    categoria: "suv",
    fipeRange: "R$ 145.000 a R$ 250.000",
    priceRange: { min: 3400, max: 6500, label: "R$ 3.400 a R$ 6.500/ano" },
    theftProfile: "médio-alto",
    pros: [
      "SUV médio com forte presença em Guarulhos — boa rede de oficinas",
      "Versão Limited e Trailhawk com itens de segurança que reduzem prêmio",
      "Histórico de boa indenização integral em perda total",
    ],
    cons: [
      "Alto valor FIPE eleva o prêmio absoluto",
      "Versão Trailhawk (4x4) demanda apólice específica para uso off-road",
      "Modelo cobiçado para roubo — exige rastreador na maioria dos casos",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "tradicional para Compass Limited" },
      { name: "Allianz", reason: "boa cobertura para Compass Sport 1.3 Turbo" },
      { name: "Bradesco Seguros", reason: "rede integrada e parcelamento estendido" },
      { name: "SulAmérica", reason: "forte em SUVs premium e versões 4x4" },
    ],
    context:
      "O Compass é o SUV médio mais vendido no Brasil e tem alta concentração de proprietários nos bairros nobres de Guarulhos (Cidade Maia, Vila Augusta, Vila Galvão). Por ser de FIPE elevado, o impacto percentual do CEP é menor que em compactos.",
  },
  {
    slug: "seguro-hilux-guarulhos",
    modelo: "Toyota Hilux",
    modeloShort: "Hilux",
    categoria: "premium",
    fipeRange: "R$ 195.000 a R$ 360.000",
    priceRange: { min: 4200, max: 8500, label: "R$ 4.200 a R$ 8.500/ano" },
    theftProfile: "alto",
    pros: [
      "Modelo extremamente durável — baixíssima sinistralidade por defeito",
      "Versões SRX e GR-Sport com ótima retenção de valor",
      "Cobertura de uso misto (urbano + estrada) bem precificada",
    ],
    cons: [
      "Picape mais visada para roubo no Brasil — rastreador obrigatório",
      "Versão SRX tem alto valor FIPE — prêmio absoluto elevado",
      "Necessita cobertura específica para uso comercial/agro",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "líder em apólices Hilux com cobertura premium" },
      { name: "Tokio Marine", reason: "tradicional para Hilux SRV e SRX" },
      { name: "Allianz", reason: "competitiva para versões 4x4" },
      { name: "Mapfre", reason: "boa para uso misto urbano + agro" },
    ],
    context:
      "A Hilux é a picape mais cobiçada por quadrilhas no Brasil — exige rastreador, garagem coberta e, em muitos casos, cláusula de uso restrito. Em Guarulhos, é comum em frotas de empresas de Cumbica e Bonsucesso (logística próxima ao GRU Airport).",
  },
  {
    slug: "seguro-strada-guarulhos",
    modelo: "Fiat Strada",
    modeloShort: "Strada",
    categoria: "popular",
    fipeRange: "R$ 75.000 a R$ 140.000",
    priceRange: { min: 2300, max: 4400, label: "R$ 2.300 a R$ 4.400/ano" },
    theftProfile: "médio-alto",
    pros: [
      "Picape mais vendida do Brasil — peças baratas e mecânica simples",
      "Versões Endurance e Freedom têm bom custo-benefício no seguro",
      "Boa cobertura para uso misto (pessoal + pequenas cargas)",
    ],
    cons: [
      "Picapes leves têm índice de furto acima da média de hatches",
      "Carga descoberta exige cobertura adicional para mercadorias",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "tradicional para picapes leves PJ e PF" },
      { name: "HDI", reason: "competitiva para Strada Endurance" },
      { name: "Mapfre", reason: "boa para autônomos e pequenos transportadores" },
      { name: "Tokio Marine", reason: "histórico sólido para uso misto" },
    ],
    context:
      "A Strada lidera o ranking de picapes leves no Brasil e é amplamente usada por autônomos e MEIs em Guarulhos para entrega e construção civil. Para esse perfil, a apólice precisa contemplar uso comercial — caso contrário, sinistros em uso profissional podem ser negados.",
  },
  {
    slug: "seguro-renegade-guarulhos",
    modelo: "Jeep Renegade",
    modeloShort: "Renegade",
    categoria: "suv",
    fipeRange: "R$ 105.000 a R$ 175.000",
    priceRange: { min: 2900, max: 5400, label: "R$ 2.900 a R$ 5.400/ano" },
    theftProfile: "médio-alto",
    pros: [
      "SUV compacto com boa estrutura — reduz custo de reparo em sinistros leves",
      "Versão Sport tem ótimo custo-benefício no seguro",
      "Rede Jeep robusta em Guarulhos e Grande SP",
    ],
    cons: [
      "Modelo desejado para furto — rastreador recomendado em CEPs de risco",
      "Versão Trailhawk (4x4) tem prêmio mais elevado",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "tradicional para Renegade Sport e Longitude" },
      { name: "Allianz", reason: "boa cobertura para versão Limited" },
      { name: "HDI", reason: "competitiva para Renegade 1.3 Turbo flex" },
      { name: "Bradesco Seguros", reason: "parcelamento facilitado" },
    ],
    context:
      "O Renegade é um dos SUVs compactos preferidos em Guarulhos por combinar design robusto e tamanho urbano. Tem ótima aceitação em condomínios e perfil familiar.",
  },
  {
    slug: "seguro-mobi-guarulhos",
    modelo: "Fiat Mobi",
    modeloShort: "Mobi",
    categoria: "popular",
    fipeRange: "R$ 45.000 a R$ 75.000",
    priceRange: { min: 1700, max: 3200, label: "R$ 1.700 a R$ 3.200/ano" },
    theftProfile: "médio",
    pros: [
      "Carro mais barato do Brasil — prêmio absoluto baixo",
      "Mecânica simples e peças baratas",
      "Ótimo para condutores iniciantes (CNH recente)",
    ],
    cons: [
      "Estrutura compacta — reparos de colisão podem se aproximar do valor de indenização",
      "Modelo popular entre motoristas de aplicativo — exige cláusula expressa",
    ],
    bestInsurers: [
      { name: "HDI", reason: "muito competitiva para Mobi Like e Easy" },
      { name: "Azul Seguros", reason: "preço agressivo em CEPs de baixo risco" },
      { name: "Mapfre", reason: "boa para uso misto particular/aplicativo" },
      { name: "Tokio Marine", reason: "perfil flexível para condutores iniciantes" },
    ],
    context:
      "O Mobi é um dos veículos mais escolhidos por novos motoristas e por motoristas de aplicativo iniciantes em Guarulhos. Por ser compacto, vale atenção especial à franquia.",
  },
];

const baseRelated = [
  { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
  { title: "Cotação Seguro Auto Guarulhos", link: "/cotacao-seguro-auto-guarulhos" },
  { title: "Corretora de Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
  { title: "Seguro Uber Guarulhos", link: "/seguro-uber-guarulhos" },
];

const baseCoverages = [
  { title: "Roubo e Furto", description: "Indenização integral conforme tabela FIPE em caso de roubo ou furto qualificado, válida em todo o território nacional." },
  { title: "Colisão", description: "Reparo do veículo em oficina referenciada ou indenização integral em caso de perda total." },
  { title: "Terceiros (RCF-V)", description: "Cobertura para danos materiais e corporais causados a terceiros, com limites a partir de R$ 100 mil." },
  { title: "Assistência 24h", description: "Guincho ilimitado em Guarulhos e região, chaveiro, troca de pneu e socorro mecânico." },
  { title: "Carro Reserva", description: "Veículo substituto por 7, 15 ou 30 dias em caso de sinistro com indenização." },
  { title: "Vidros, Faróis e Retrovisores", description: "Cobertura adicional sem franquia ou com franquia reduzida." },
];

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const buildModeloConfig = (m: ModeloSeed): SeoLocalPageConfig => {
  const insurers: LocalInsurer[] = m.bestInsurers.map((i) => ({
    name: i.name,
    highlight: i.reason,
  }));

  const testimonials: LocalTestimonial[] = [
    {
      author: `Cliente Patro — proprietário de ${m.modeloShort}`,
      neighborhood: "Guarulhos/SP",
      quote: `A Patro comparou seguradoras pro meu ${m.modeloShort} e fechei R$ 800 mais barato que a renovação direta. Atendimento rápido pelo WhatsApp e tudo resolvido sem burocracia.`,
      rating: 5,
    },
    {
      author: `Família segurada — ${m.modeloShort} 0km`,
      neighborhood: "Cidade Maia, Guarulhos",
      quote: `Comprei meu ${m.modeloShort} 0km e a Patro fez a cotação no mesmo dia. Apólice ativada antes da retirada da concessionária, sem complicação.`,
      rating: 5,
    },
  ];

  return {
    slug: m.slug,
    title: `Seguro Auto ${m.modelo} em Guarulhos — Cotação 2026`,
    subtitle: `Cotação de seguro para ${m.modelo} em Guarulhos com a Patro Seguros. Comparamos Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco e mais para encontrar o melhor preço para seu ${m.modeloShort}.`,
    description: `Procurando seguro para ${m.modelo} em Guarulhos? A Patro Seguros é especialista em cotações por modelo e compara as 9 maiores seguradoras do país em uma única solicitação. Para o ${m.modeloShort}, o prêmio anual fica em média ${m.priceRange.label} para cobertura compreensiva, considerando perfil de risco ${m.theftProfile} de furto/roubo. Faixa FIPE: ${m.fipeRange}.`,
    detailedDescription: `${m.context}\n\nCada seguradora precifica modelos específicos de forma diferente. Para o ${m.modelo}, a Patro identifica quais companhias entregam melhor preço, melhor franquia e melhor cobertura adicional. ${m.bestInsurers[0].name}: ${m.bestInsurers[0].reason}. ${m.bestInsurers[1].name}: ${m.bestInsurers[1].reason}. Em vez de cotar em 9 sites diferentes, fazemos uma única cotação padronizada e devolvemos comparativo claro em até 2 horas úteis.\n\nPontos fortes do ${m.modeloShort} para o seguro: ${m.pros.join("; ")}. Pontos de atenção: ${m.cons.join("; ")}. Nossa orientação combina perfil do veículo, CEP de pernoite em Guarulhos, idade do condutor e uso (particular, profissional ou aplicativo) para entregar a apólice mais adequada e mais barata possível.`,
    metaDescription: `Seguro ${m.modelo} Guarulhos: cotação online e comparativo entre 9 seguradoras. Patro Seguros — ${m.priceRange.label}.`,
    icon: m.categoria === "suv" ? "🚙" : m.categoria === "premium" ? "🛻" : "🚗",
    pricingIntro: `O seguro do ${m.modelo} em Guarulhos custa em média ${m.priceRange.label} para cobertura compreensiva (roubo, furto, colisão e terceiros). Versões de entrada ficam na faixa inferior; versões topo de linha, na superior. CEP de pernoite, idade do condutor e uso do veículo também alteram significativamente o preço.`,
    pricingFactors: [
      `Versão e ano do ${m.modeloShort} (FIPE: ${m.fipeRange})`,
      "CEP de pernoite em Guarulhos — variável de maior peso",
      "Idade, sexo e tempo de habilitação do condutor principal",
      "Uso: particular, profissional ou aplicativo (Uber/99)",
      "Garagem coberta em residência e local de trabalho",
      "Rastreador e dispositivos antifurto homologados",
      "Histórico de sinistros e classe de bônus",
    ],
    pricingNote: `Dica Patro: para o ${m.modeloShort}, instalar rastreador reduz o prêmio entre 8% e 18% e, em CEPs de risco ${m.theftProfile}, costuma ser obrigatório acima de R$ 80 mil de FIPE.`,
    faqs: [
      {
        question: `Quanto custa seguro de ${m.modelo} em Guarulhos?`,
        answer: `O seguro do ${m.modelo} em Guarulhos fica entre ${m.priceRange.label} para cobertura compreensiva. O valor exato depende da versão (faixa FIPE ${m.fipeRange}), CEP de pernoite, idade do condutor e dispositivos de segurança. Solicite cotação grátis com a Patro para receber comparativo entre 9 seguradoras.`,
      },
      {
        question: `Qual a melhor seguradora para ${m.modelo} em Guarulhos?`,
        answer: `Não existe "a melhor" — cada seguradora trata o ${m.modeloShort} de forma diferente. ${m.bestInsurers[0].name}: ${m.bestInsurers[0].reason}. ${m.bestInsurers[1].name}: ${m.bestInsurers[1].reason}. ${m.bestInsurers[2].name}: ${m.bestInsurers[2].reason}. A Patro compara todas em uma única cotação e mostra o comparativo lado a lado.`,
      },
      {
        question: `Preciso de rastreador para segurar meu ${m.modeloShort} em Guarulhos?`,
        answer:
          m.theftProfile === "alto" || m.theftProfile === "médio-alto"
            ? `Sim, na maioria dos casos. O ${m.modeloShort} tem perfil de risco ${m.theftProfile} de furto/roubo, e a maioria das seguradoras exige rastreador para versões acima de R$ 80 mil de FIPE em Guarulhos.`
            : `Geralmente não é obrigatório, mas instalar rastreador no ${m.modeloShort} reduz o prêmio entre 8% e 15% e libera coberturas adicionais. Para versões topo de linha, costuma compensar.`,
      },
      {
        question: `O seguro do ${m.modeloShort} cobre uso em aplicativo (Uber/99) em Guarulhos?`,
        answer: `Apenas se a apólice tiver cláusula expressa para uso profissional. Apólices padrão recusam o sinistro se o veículo estava em corrida no momento do acidente. A Patro trabalha com seguradoras que oferecem essa cláusula para o ${m.modeloShort} — informe na cotação que você usa o veículo em apps.`,
      },
      {
        question: `Vale a pena fazer seguro só para terceiros (RCF-V) no ${m.modeloShort}?`,
        answer: `Depende do valor FIPE e do uso. Para ${m.modeloShort} com FIPE acima de R$ 80 mil, recomendamos cobertura compreensiva — o risco de roubo/furto em Guarulhos é alto e o custo da apólice é proporcionalmente menor que a perda. Para versões antigas com FIPE abaixo de R$ 50 mil, RCF-V pode ser uma opção econômica.`,
      },
      {
        question: `Quanto tempo demora para receber a cotação do ${m.modeloShort} pela Patro?`,
        answer: `Em até 2 horas úteis enviamos comparativo entre 9 seguradoras. Em casos simples (versão popular, sem agravantes), a cotação fica pronta em 30 minutos. Cotação 100% gratuita e sem compromisso.`,
      },
      {
        question: `A Patro atende renovação de apólice do ${m.modeloShort} contratada em outra corretora?`,
        answer: `Sim. Basta enviar a apólice atual ou a renovação proposta por WhatsApp (11 5199-7500). Em até 2 horas devolvemos comparativo entre 9 seguradoras. Em mais de 60% dos casos conseguimos preço melhor do que a renovação automática.`,
      },
    ],
    whoNeeds: [
      `Proprietários de ${m.modelo} ano-modelo 2018 em diante`,
      `Quem comprou ${m.modeloShort} 0km e precisa de cotação rápida antes da retirada`,
      `Quem recebeu renovação com aumento abusivo no seguro do ${m.modeloShort}`,
      `Motoristas Uber/99 que dirigem ${m.modeloShort} e precisam de cláusula para apps`,
      `Empresas com ${m.modeloShort} em frota PJ`,
    ],
    whyPatro: [
      `Especialistas em cotação de ${m.modeloShort} em Guarulhos`,
      "Comparativo entre 9 seguradoras em até 2 horas úteis",
      "Atendimento presencial no Cidade Maia ou 100% por WhatsApp",
      "Mais de 500 apólices de seguro auto ativas em Guarulhos",
      "Suporte em sinistro com argumentação técnica",
      "Renovação anual otimizada — recotamos automaticamente todo ano",
    ],
    coverages: baseCoverages,
    realScenarios: [
      {
        title: `Economia de 24% para proprietário de ${m.modeloShort}`,
        description: `Cliente da Patro pagava ${fmtBRL(m.priceRange.max)}/ano em seguro do ${m.modeloShort} contratado direto pelo site da seguradora. Após cotação comparando 9 seguradoras, migrou para apólice equivalente em outra companhia por aproximadamente 24% menos — mantendo cobertura compreensiva e franquia normal.`,
      },
      {
        title: `Cotação de ${m.modeloShort} 0km em 47 minutos`,
        description: `Cliente comprou ${m.modeloShort} 0km na concessionária e precisava do seguro antes da retirada. Pedido enviado às 9h12, comparativo entregue às 9h59, apólice ativada no mesmo dia.`,
      },
      {
        title: `Renovação com aumento de 38% revertida`,
        description: `Cliente com ${m.modeloShort} recebeu renovação automática com aumento de 38% sem ter sofrido sinistro. Recotação da Patro encontrou apólice equivalente em outra companhia, com aumento real de apenas 7% sobre o ano anterior.`,
      },
    ],
    tips: [
      `Sempre informe a versão correta do ${m.modeloShort} (Sport, LT, Limited, etc.) — versões diferentes têm prêmios bem distintos.`,
      "Garagem coberta no trabalho também conta — informe à seguradora para reduzir o prêmio.",
      `Para o ${m.modeloShort}, vale instalar rastreador mesmo quando não obrigatório — reduz prêmio entre 8% e 15%.`,
      "Compare anualmente: aumentos acima de 15% sem agravamento de risco geralmente podem ser revertidos.",
      "Avalie franquia reduzida se você usa muito o veículo — o custo extra anual costuma compensar no primeiro sinistro.",
    ],
    relatedInsurances: baseRelated,
    city: "Guarulhos",
    geo: { latitude: -23.4628, longitude: -46.5333 },
    priceRange: { min: m.priceRange.min, max: m.priceRange.max },
    insurers,
    testimonials,
  };
};

export const seoModeloAutoPages: Record<string, SeoLocalPageConfig> = Object.fromEntries(
  MODELOS.map((m) => [m.slug, buildModeloConfig(m)]),
);

export const seoModeloAutoSlugs = Object.keys(seoModeloAutoPages);

export const MODELO_LIST = MODELOS.map((m) => ({
  slug: m.slug,
  modelo: m.modelo,
  modeloShort: m.modeloShort,
  categoria: m.categoria,
  priceRange: m.priceRange.label,
}));
