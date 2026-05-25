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
    slug: "seguro-jacto-guarulhos",
    modelo: "Jacto",
    modeloShort: "Jacto",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 3.500.000+",
    priceRange: { min: 2800, max: 35000, label: "R$ 2.800 a R$ 35.000/ano" },
    theftProfile: "baixo",
    pros: [
      "Liderança mundial em tecnologia de pulverização e adubação",
      "Ecossistema Jacto Connect para gestão precisa da propriedade",
      "Robustez e precisão incomparáveis com assistência técnica ágil"
    ],
    cons: [
      "Alto custo de bicos eletrônicos, sensores e tecnologia embarcada",
      "Modelos autopropelidos exigem apólices com quebra de máquinas",
      "Necessidade de treinamento constante para operadores da linha Uniport"
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "excelente aceitação para marcas nacionais líderes e peças originais" },
      { name: "Allianz", reason: "condições competitivas para a linha Uniport e pulverizadores" },
      { name: "Tokio Marine", reason: "assistência 24h rural com guincho para carga pesada" },
      { name: "Sompo", reason: "especialista em agronegócio com foco em tecnologia de precisão" }
    ],
    context:
      "A Jacto é o orgulho da tecnologia agrícola brasileira presente em mais de 100 países. Dos pulverizadores de arrasto aos gigantes autopropelidos Uniport, o proprietário Jacto busca uma proteção que respeite a precisão da sua máquina. A Patro Seguros oferece consultoria exclusiva para garantir que seu Jacto esteja protegido contra incêndio, roubo e danos elétricos, garantindo que sua safra seja impecável."
  },
  {
    slug: "seguro-massey-ferguson-guarulhos",
    modelo: "Massey Ferguson",
    modeloShort: "Massey",
    categoria: "premium",
    fipeRange: "R$ 100.000 a R$ 4.800.000+",
    priceRange: { min: 2100, max: 43000, label: "R$ 2.100 a R$ 43.000/ano" },
    theftProfile: "médio",
    pros: [
      "Tradição secular e confiabilidade absoluta no campo brasileiro",
      "Alta tecnologia de transmissão Dyna-VT e motores AGCO Power",
      "Rede de concessionárias mais ampla e capilarizada do país"
    ],
    cons: [
      "Modelos de alta tecnologia exigem seguro com quebra de máquinas",
      "Valorização de usados elevada, impactando o prêmio da apólice",
      "Exigência de sistemas de telemetria em frotas corporativas"
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "parceria de longo prazo com rede AGCO e peças genuínas" },
      { name: "Allianz", reason: "referência em coberturas para a linha de tratores e colheitadeiras" },
      { name: "Tokio Marine", reason: "atendimento ágil e guincho especializado em áreas remotas" },
      { name: "Sompo", reason: "especialista em agronegócio com taxas competitivas para o produtor" }
    ],
    context:
      "A Massey Ferguson é a marca que faz parte da história do agronegócio brasileiro. De tratores compactos a colheitadeiras de alta performance, o proprietário Massey busca uma proteção que respeite a tradição e o valor do seu equipamento. A Patro Seguros oferece consultoria exclusiva para garantir que seu Massey esteja protegido contra incêndio, roubo e imprevistos mecânicos, garantindo a continuidade da sua produção."
  },
  {
    slug: "seguro-mahindra-guarulhos",
    modelo: "Mahindra",
    modeloShort: "Mahindra",
    categoria: "premium",
    fipeRange: "R$ 85.000 a R$ 350.000+",
    priceRange: { min: 1800, max: 8500, label: "R$ 1.800 a R$ 8.500/ano" },
    theftProfile: "baixo",
    pros: [
      "Líder mundial em volume de tratores com foco em economia e força",
      "Garantia de fábrica estendida e baixo custo de manutenção",
      "Simplicidade mecânica aliada a alta durabilidade no campo"
    ],
    cons: [
      "Rede de assistência técnica em plena expansão no mercado brasileiro",
      "Modelos compactos exigem vistorias para uso em prestação de serviços",
      "Custo de eletrônica embarcada em modelos de nova geração"
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "excelente aceitação para marcas globais e suporte 24h rural" },
      { name: "Allianz", reason: "referência em precificação para tratores de pequena e média potência" },
      { name: "Tokio Marine", reason: "atendimento ágil e guincho especializado em todo o Brasil" },
      { name: "Sompo", reason: "tradição em seguros rurais com foco em produtores familiares" }
    ],
    context:
      "A Mahindra é a força que move milhões de produtores ao redor do mundo e ganha cada vez mais espaço no agronegócio brasileiro. Dos tratores compactos da série 2000 aos potentes modelos da série 8000 e 9000, o proprietário Mahindra busca uma proteção que acompanhe a durabilidade de sua máquina. A Patro Seguros oferece consultoria premium para garantir que seu Mahindra esteja protegido contra incêndio, roubo e tombamento, com foco na agilidade do seu trabalho."
  },
  {
    slug: "seguro-new-holland-guarulhos",
    modelo: "New Holland",
    modeloShort: "New Holland",
    categoria: "premium",
    fipeRange: "R$ 130.000 a R$ 5.000.000+",
    priceRange: { min: 2400, max: 42000, label: "R$ 2.400 a R$ 42.000/ano" },
    theftProfile: "médio",
    pros: [
      "Inovação constante com o sistema PLM (Precision Land Management)",
      "Alta versatilidade e eficiência nos modelos T6, T7 e T8",
      "Rede de concessionárias global focada na agilidade operacional"
    ],
    cons: [
      "Alto custo de sensores de agricultura de precisão e eletrônica",
      "Modelos de alta cilindrada exigem planos de manutenção rigorosos",
      "Exigência de vistorias técnicas detalhadas para apólices corporativas"
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "rede referenciada CNH Industrial e peças originais New Holland" },
      { name: "Allianz", reason: "excelente precificação para a linha de colheitadeiras CR e tratores" },
      { name: "Tokio Marine", reason: "atendimento especializado com guincho para carga pesada" },
      { name: "Sompo", reason: "tradição em seguros para o agronegócio e riscos de engenharia" }
    ],
    context:
      "A New Holland é a marca que move o agronegócio com tecnologia azul e amarela. De tratores versáteis às gigantes colheitadeiras CR, o proprietário New Holland busca uma proteção que acompanhe a inovação e o desempenho de sua máquina. A Patro Seguros oferece consultoria premium para garantir que seu New Holland esteja protegido contra incêndio, roubo e quebra de máquinas, com garantia de reposição de peças originais e suporte técnico total."
  },
  {
    slug: "seguro-case-ih-guarulhos",
    modelo: "Case IH",
    modeloShort: "Case IH",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 5.500.000+",
    priceRange: { min: 2800, max: 48000, label: "R$ 2.800 a R$ 48.000/ano" },
    theftProfile: "médio",
    pros: [
      "Liderança em automação com a tecnologia AFS Connect",
      "Alta produtividade e eficiência nos modelos Magnum e Steiger",
      "Rede de suporte global focada na máxima disponibilidade da máquina"
    ],
    cons: [
      "Custo elevado de sensores de precisão e eletrônica avançada",
      "Modelos de grande porte exigem logística de transporte especializada",
      "Necessidade de manutenção preventiva rigorosa para evitar quebras"
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "rede referenciada e peças originais para a linha Case IH" },
      { name: "Allianz", reason: "referência mundial em cobertura para máquinas de colheita" },
      { name: "Tokio Marine", reason: "atendimento prioritário e guincho para carga pesada" },
      { name: "Mapfre", reason: "produtos exclusivos para o setor sucroenergético e grãos" }
    ],
    context:
      "A Case IH é a marca de quem busca produtividade sem limites. Dos tratores Farmall aos gigantes Steiger, passando pelas colheitadeiras Axial-Flow, o proprietário Case IH exige uma proteção que acompanhe o ritmo da safra. A Patro Seguros oferece consultoria premium para garantir que seu Case esteja protegido contra incêndio, roubo e quebra de máquinas, com garantia de reposição de peças originais e suporte técnico total."
  },
  {
    slug: "seguro-valtra-guarulhos",
    modelo: "Valtra",
    modeloShort: "Valtra",
    categoria: "premium",
    fipeRange: "R$ 120.000 a R$ 4.500.000+",
    priceRange: { min: 2200, max: 40000, label: "R$ 2.200 a R$ 40.000/ano" },
    theftProfile: "médio",
    pros: [
      "Robustez escandinava e tecnologia de precisão com motores AGCO Power",
      "Alta durabilidade em condições severas de trabalho no campo",
      "Sistemas de telemetria Valtra Connect para gestão de frota"
    ],
    cons: [
      "Custo elevado de componentes hidráulicos e eletrônica embarcada",
      "Modelos de alta cilindrada exigem vistorias técnicas rigorosas",
      "Necessidade de monitoramento preventivo contra incêndios"
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "rede referenciada AGCO e reposição de peças originais Valtra" },
      { name: "Allianz", reason: "excelente precificação para a linha de tratores e colheitadeiras" },
      { name: "Tokio Marine", reason: "atendimento VIP e guincho especializado para máquinas de grande porte" },
      { name: "Sompo", reason: "tradição em seguros para o agronegócio e riscos de engenharia" }
    ],
    context:
      "A Valtra é reconhecida pela força e tecnologia que movem as maiores safras do Brasil. De tratores da linha A a S, passando pelas colheitadeiras e pulverizadores, o proprietário Valtra busca uma proteção que acompanhe a durabilidade da sua máquina. A Patro Seguros oferece consultoria premium para garantir que seu Valtra esteja protegido contra incêndio, roubo e quebra de máquinas, preservando a integridade do seu investimento no campo."
  },
  {
    slug: "seguro-john-deere-guarulhos",
    modelo: "John Deere",
    modeloShort: "John Deere",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 5.000.000+",
    priceRange: { min: 2500, max: 45000, label: "R$ 2.500 a R$ 45.000/ano" },
    theftProfile: "médio",
    pros: [
      "Tecnologia de ponta com o ecossistema JDLink de telemetria",
      "Alta valorização e a maior rede de assistência técnica no campo",
      "Sistemas de agricultura de precisão integrados de fábrica",
    ],
    cons: [
      "Custo elevado de componentes eletrônicos e sensores de bico",
      "Desejo de mercado por quadrilhas especializadas em peças",
      "Exigência de monitoramento e vistorias técnicas rigorosas",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "excelente rede referenciada e peças genuínas John Deere" },
      { name: "Allianz", reason: "referência mundial em seguros para máquinas de alto valor" },
      { name: "Tokio Marine", reason: "atendimento VIP with guincho especializado para máquinas pesadas" },
      { name: "Sompo", reason: "especialista em agronegócio e riscos de alta tecnologia" },
    ],
    context:
      "John Deere é o padrão ouro do agronegócio mundial. Em todo o Brasil, proprietários de tratores Série 5 a 9, colheitadeiras S700 e pulverizadores buscam uma proteção que acompanhe o nível de tecnologia do cervo saltante. A Patro Seguros oferece consultoria exclusiva para garantir que seu John Deere esteja protegido contra incêndio, roubo e quebra de máquinas, garantindo peças 100% originais e suporte total na regulação de sinistros complexos.",
  },
  {
    slug: "seguro-caminhonete-premium-guarulhos",
    modelo: "Caminhonete e Pick-up Premium",
    modeloShort: "Pick-ups",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 850.000+",
    priceRange: { min: 3800, max: 18500, label: "R$ 3.800 a R$ 18.500/ano" },
    theftProfile: "alto",
    pros: [
      "Versatilidade para uso urbano, lazer e off-road pesado",
      "Alta retenção de valor de mercado e robustez mecânica",
      "Tecnologia embarcada de última geração e segurança ativa",
    ],
    cons: [
      "Índice de furto extremamente elevado para a categoria em Guarulhos",
      "Custo de reparo e peças de carroceria com valores premium",
      "Exigência rigorosa de rastreador via satélite e monitoramento",
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "rede especializada em pick-ups com guincho para carga pesada" },
      { name: "Tokio Marine", reason: "excelente precificação para a linha Hilux, S10 e Amarok" },
      { name: "Allianz", reason: "cobertura robusta para uso em estradas e transporte de carga leve" },
      { name: "Mapfre", reason: "atendimento VIP focado no setor agro e corporativo" },
    ],
    context:
      "A caminhonete premium é o símbolo de força e sucesso. Em Guarulhos, proprietários de modelos como Hilux, Amarok, Ranger, RAM e Silverado buscam uma proteção que acompanhe a grandiosidade de seu veículo. A Patro Seguros oferece consultoria exclusiva para garantir que sua pick-up esteja protegida contra roubo, furto e danos em terrenos acidentados, com assistência 24h preparada para veículos de grande porte e suporte total em todo o Brasil.",
  },
  {
    slug: "seguro-volkswagen-guarulhos",
    modelo: "Volkswagen",
    modeloShort: "VW",
    categoria: "popular",
    fipeRange: "R$ 40.000 a R$ 250.000",
    priceRange: { min: 1800, max: 5500, label: "R$ 1.800 a R$ 5.500/ano" },
    theftProfile: "médio-alto",
    pros: ["Rede ampla", "Peças acessíveis"],
    cons: ["Modelos visados"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Tradicional" },
      { name: "Allianz", reason: "Competitiva" },
      { name: "HDI", reason: "Boa aceitação" },
      { name: "Tokio Marine", reason: "Boas condições para linha Volkswagen" }
    ],
    context: "A Volkswagen é uma das marcas mais queridas no Brasil."
  },
  {
    slug: "seguro-chevrolet-guarulhos",
    modelo: "Chevrolet",
    modeloShort: "GM",
    categoria: "popular",
    fipeRange: "R$ 45.000 a R$ 280.000",
    priceRange: { min: 1900, max: 5800, label: "R$ 1.900 a R$ 5.800/ano" },
    theftProfile: "médio-alto",
    pros: ["Confiabilidade", "Manutenção simples"],
    cons: ["Modelos visados"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Tradicional" },
      { name: "Tokio Marine", reason: "Competitiva" },
      { name: "Azul Seguros", reason: "Bom custo-benefício" },
      { name: "Allianz", reason: "Boa aceitação para linha Chevrolet" }
    ],
    context: "A Chevrolet possui uma linha completa de veículos no Brasil."
  },
  {
    slug: "seguro-fiat-guarulhos",
    modelo: "Fiat",
    modeloShort: "Fiat",
    categoria: "popular",
    fipeRange: "R$ 40.000 a R$ 130.000",
    priceRange: { min: 1700, max: 4800, label: "R$ 1.700 a R$ 4.800/ano" },
    theftProfile: "médio-alto",
    pros: ["Líder de mercado", "Peças baratas"],
    cons: ["Visado"],
    bestInsurers: [
      { name: "HDI", reason: "Competitiva" },
      { name: "Azul Seguros", reason: "Bom custo" },
      { name: "Porto Seguro", reason: "Aceitação ampla para modelos Fiat" },
      { name: "Tokio Marine", reason: "Boas condições para linha Fiat" }
    ],
    context: "A Fiat é líder em diversos segmentos populares no Brasil."
  },
  {
    slug: "seguro-hyundai-guarulhos",
    modelo: "Hyundai",
    modeloShort: "Hyundai",
    categoria: "popular",
    fipeRange: "R$ 55.000 a R$ 180.000",
    priceRange: { min: 2100, max: 5500, label: "R$ 2.100 a R$ 5.500/ano" },
    theftProfile: "médio",
    pros: ["Garantia", "Design"],
    cons: ["Peças caras"],
    bestInsurers: [
      { name: "Tokio Marine", reason: "Tradicional" },
      { name: "Allianz", reason: "Bom preço" },
      { name: "Porto Seguro", reason: "Boa aceitação para HB20 e Creta" },
      { name: "HDI", reason: "Competitiva para Hyundai" }
    ],
    context: "A Hyundai se destaca pelo HB20 e Creta em Guarulhos."
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
    icon: m.slug.includes("moto") ? "🏍️" : m.categoria === "suv" ? "🚙" : m.categoria === "premium" ? "🛻" : "🚗",
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
