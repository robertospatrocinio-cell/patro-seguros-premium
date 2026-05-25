import type { SeoLocalPageConfig } from "@/data/seoLocalAutoPages";
import type { LocalInsurer, LocalTestimonial } from "@/components/LocalPageTemplate";

type Categoria = "popular" | "sedan" | "suv" | "premium";

interface ModeloSeed {
  slug: string;
  modelo: string;
  modeloShort: string;
  categoria: Categoria;
  heroImg?: string;
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
  {
    slug: "seguro-auto-bmw-guarulhos",
    modelo: "BMW",
    modeloShort: "BMW",
    categoria: "premium",
    fipeRange: "R$ 180.000 a R$ 1.500.000+",
    priceRange: { min: 4200, max: 28000, label: "R$ 4.200 a R$ 28.000/ano" },
    theftProfile: "médio-alto",
    pros: [
      "Engenharia alemã de alta performance",
      "Alta tecnologia embarcada e segurança ativa",
      "Valorização de mercado e prestígio da marca"
    ],
    cons: [
      "Custo elevado de manutenção e peças genuínas",
      "Modelos M e SUVs X5/X6 são altamente visados",
      "Exigência de rastreador e vistorias rigorosas"
    ],
    bestInsurers: [
      { name: "Porto Seguro", reason: "melhor rede de concessionárias e serviços premium" },
      { name: "Allianz", reason: "excelente precificação para SUVs e linha iPerformance" },
      { name: "Tokio Marine", reason: "assistência 24h VIP e guincho prancha" },
      { name: "Liberty", reason: "condições exclusivas para veículos de alto padrão" }
    ],
    context:
      "A BMW é a definição do prazer de dirigir. Em Guarulhos, proprietários de Série 3, X1, X5 e da linha M buscam uma proteção que acompanhe a sofisticação de seu veículo. A Patro Seguros oferece consultoria premium para garantir que sua BMW esteja protegida contra roubo, furto e danos elétricos, com garantia de reparo em concessionária autorizada e peças originais."
  },
  {
    slug: "seguro-auto-toyota-guarulhos",
    modelo: "Toyota",
    modeloShort: "Corolla Cross",
    categoria: "suv",
    heroImg: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop",
    fipeRange: "R$ 60.000 a R$ 350.000",
    priceRange: { min: 2200, max: 7500, label: "R$ 2.200 a R$ 7.500/ano" },
    theftProfile: "médio",
    pros: ["Alta confiabilidade", "Valor de revenda"],
    cons: ["Seguro pode ser caro para Corolla"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Excelente aceitação" },
      { name: "Tokio Marine", reason: "Preços competitivos" },
      { name: "Allianz", reason: "Ótima cobertura" },
      { name: "HDI", reason: "Boa opção para Hilux" }
    ],
    context: "A Toyota é sinônimo de robustez e confiança em Guarulhos."
  },
  {
    slug: "seguro-auto-honda-guarulhos",
    modelo: "Honda",
    modeloShort: "Honda HR-V",
    imageUrl: "https://images.unsplash.com/photo-1707172798935-773a4b910e97?q=80&w=2070&auto=format&fit=crop",
    categoria: "popular",
    fipeRange: "R$ 65.000 a R$ 280.000",
    priceRange: { min: 2400, max: 8000, label: "R$ 2.400 a R$ 8.000/ano" },
    theftProfile: "médio-alto",
    pros: ["Mecânica confiável", "Conforto"],
    cons: ["Civic é muito visado"],
    bestInsurers: [
      { name: "Tokio Marine", reason: "Referência para Honda" },
      { name: "Porto Seguro", reason: "Serviços premium" },
      { name: "Allianz", reason: "Bom custo-benefício" },
      { name: "Liberty", reason: "Aceitação facilitada" }
    ],
    context: "Veículos Honda são extremamente populares e valorizados em Guarulhos."
  },
  {
    slug: "seguro-auto-jeep-guarulhos",
    modelo: "Jeep",
    modeloShort: "Jeep Compass",
    categoria: "suv",
    fipeRange: "R$ 90.000 a R$ 450.000",
    priceRange: { min: 3200, max: 12000, label: "R$ 3.200 a R$ 12.000/ano" },
    theftProfile: "alto",
    pros: ["Presença de mercado", "Tecnologia"],
    cons: ["Índice de roubo de Compass/Renegade"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Líder em SUVs" },
      { name: "Allianz", reason: "Preços agressivos" },
      { name: "Tokio Marine", reason: "Ótima assistência" },
      { name: "Bradesco", reason: "Forte aceitação" }
    ],
    context: "A Jeep domina o segmento de SUVs em Guarulhos com Compass e Renegade."
  },
  {
    slug: "seguro-auto-peugeot-guarulhos",
    modelo: "Peugeot",
    modeloShort: "Peugeot",
    categoria: "popular",
    fipeRange: "R$ 50.000 a R$ 220.000",
    priceRange: { min: 2100, max: 6500, label: "R$ 2.100 a R$ 6.500/ano" },
    theftProfile: "baixo",
    pros: ["Design moderno", "Tecnologia embarcada"],
    cons: ["Desvalorização histórica"],
    bestInsurers: [
      { name: "Azul Seguros", reason: "Excelente custo" },
      { name: "Porto Seguro", reason: "Aceitação total" },
      { name: "HDI", reason: "Preços competitivos" },
      { name: "Tokio Marine", reason: "Boa assistência" }
    ],
    context: "A Peugeot vive um novo momento no Brasil com modelos como o 208 e 2008."
  },
  {
    slug: "seguro-auto-citroen-guarulhos",
    modelo: "Citroën",
    modeloShort: "Citroën",
    categoria: "popular",
    fipeRange: "R$ 45.000 a R$ 200.000",
    priceRange: { min: 2000, max: 6000, label: "R$ 2.000 a R$ 6.000/ano" },
    theftProfile: "baixo",
    pros: ["Conforto de suspensão", "Estilo"],
    cons: ["Rede de assistência menor"],
    bestInsurers: [
      { name: "Azul Seguros", reason: "Foco em custo-benefício" },
      { name: "Porto Seguro", reason: "Segurança e tradição" },
      { name: "Allianz", reason: "Ótimas taxas" },
      { name: "Tokio Marine", reason: "Suporte eficiente" }
    ],
    context: "Os veículos Citroën são conhecidos pelo conforto e design diferenciado."
  },
  {
    slug: "seguro-auto-mitsubishi-guarulhos",
    modelo: "Mitsubishi",
    modeloShort: "Mitsubishi",
    categoria: "suv",
    fipeRange: "R$ 80.000 a R$ 450.000",
    priceRange: { min: 2800, max: 11000, label: "R$ 2.800 a R$ 11.000/ano" },
    theftProfile: "baixo",
    pros: ["Robustez 4x4", "Durabilidade"],
    cons: ["Peças caras", "Consumo"],
    bestInsurers: [
      { name: "Tokio Marine", reason: "Excelente aceitação 4x4" },
      { name: "Porto Seguro", reason: "Assistência completa" },
      { name: "Allianz", reason: "Preços competitivos para SUVs" },
      { name: "Mapfre", reason: "Foco em veículos robustos" }
    ],
    context: "A Mitsubishi é a escolha de quem busca aventura e robustez em Guarulhos."
  },
  {
    slug: "seguro-auto-nissan-guarulhos",
    modelo: "Nissan",
    modeloShort: "Nissan",
    categoria: "popular",
    fipeRange: "R$ 50.000 a R$ 250.000",
    priceRange: { min: 2100, max: 6800, label: "R$ 2.100 a R$ 6.800/ano" },
    theftProfile: "médio",
    pros: ["Tecnologia japonesa", "Conforto"],
    cons: ["Revenda um pouco mais lenta"],
    bestInsurers: [
      { name: "Tokio Marine", reason: "Referência japonesa" },
      { name: "Porto Seguro", reason: "Serviços premium" },
      { name: "Allianz", reason: "Ótimas taxas" },
      { name: "Azul Seguros", reason: "Custo-benefício" }
    ],
    context: "A Nissan oferece tecnologia e confiabilidade com modelos como Kicks e Versa."
  },
  {
    slug: "seguro-auto-renault-guarulhos",
    modelo: "Renault",
    modeloShort: "Renault",
    categoria: "popular",
    fipeRange: "R$ 40.000 a R$ 180.000",
    priceRange: { min: 1800, max: 5500, label: "R$ 1.800 a R$ 5.500/ano" },
    theftProfile: "médio",
    pros: ["Custo de manutenção", "Espaço interno"],
    cons: ["Acabamento simples"],
    bestInsurers: [
      { name: "Azul Seguros", reason: "Melhor custo-benefício" },
      { name: "HDI", reason: "Preços agressivos" },
      { name: "Porto Seguro", reason: "Aceitação ampla" },
      { name: "Tokio Marine", reason: "Boa assistência" }
    ],
    context: "A Renault é conhecida pela praticidade e baixo custo de manutenção."
  },
  {
    slug: "seguro-auto-caoa-chery-guarulhos",
    modelo: "Caoa Chery",
    modeloShort: "Chery",
    categoria: "suv",
    fipeRange: "R$ 60.000 a R$ 220.000",
    priceRange: { min: 2500, max: 8500, label: "R$ 2.500 a R$ 8.500/ano" },
    theftProfile: "baixo",
    pros: ["Custo-benefício imbatível", "Tecnologia"],
    cons: ["Desvalorização", "Rede em expansão"],
    bestInsurers: [
      { name: "Allianz", reason: "Ótima aceitação da marca" },
      { name: "Tokio Marine", reason: "Preços competitivos" },
      { name: "Porto Seguro", reason: "Garantia de serviços" },
      { name: "Liberty", reason: "Boas condições" }
    ],
    context: "A Caoa Chery revolucionou o mercado de SUVs com a linha Tiggo."
  },
  {
    slug: "seguro-auto-volvo-guarulhos",
    modelo: "Volvo",
    modeloShort: "Volvo XC60",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 800.000",
    priceRange: { min: 3800, max: 15000, label: "R$ 3.800 a R$ 15.000/ano" },
    theftProfile: "baixo",
    pros: ["Segurança máxima", "Tecnologia híbrida"],
    cons: ["Manutenção caríssima"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Especialista em premium" },
      { name: "Allianz", reason: "Referência em híbridos" },
      { name: "Tokio Marine", reason: "Atendimento VIP" },
      { name: "Liberty", reason: "Produtos exclusivos" }
    ],
    context: "Volvo é o padrão mundial em segurança veicular, agora líder em eletrificados."
  },
  {
    slug: "seguro-auto-land-rover-guarulhos",
    modelo: "Land Rover",
    modeloShort: "Land Rover",
    categoria: "premium",
    fipeRange: "R$ 180.000 a R$ 1.200.000",
    priceRange: { min: 5500, max: 25000, label: "R$ 5.500 a R$ 25.000/ano" },
    theftProfile: "alto",
    pros: ["Status", "Capacidade Off-road"],
    cons: ["Seguro caro", "Visado para roubo"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Melhor rede premium" },
      { name: "Tokio Marine", reason: "Assistência especializada" },
      { name: "Allianz", reason: "Cobertura robusta" },
      { name: "Liberty", reason: "Aceitação de alto valor" }
    ],
    context: "Land Rover une o luxo britânico à capacidade off-road extrema."
  },
  {
    slug: "seguro-auto-audi-guarulhos",
    modelo: "Audi",
    modeloShort: "Audi",
    categoria: "premium",
    fipeRange: "R$ 120.000 a R$ 900.000",
    priceRange: { min: 4000, max: 18000, label: "R$ 4.000 a R$ 18.000/ano" },
    theftProfile: "médio-alto",
    pros: ["Tecnologia Quattro", "Performance"],
    cons: ["Manutenção especializada"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Rede referenciada" },
      { name: "Tokio Marine", reason: "Agilidade no suporte" },
      { name: "Allianz", reason: "Preços competitivos" },
      { name: "Liberty", reason: "Condições premium" }
    ],
    context: "Vorsprung durch Technik: a Audi é a vanguarda da tecnologia alemã."
  },
  {
    slug: "seguro-auto-mercedes-guarulhos",
    modelo: "Mercedes-Benz",
    modeloShort: "Mercedes",
    categoria: "premium",
    fipeRange: "R$ 130.000 a R$ 1.500.000",
    priceRange: { min: 4200, max: 22000, label: "R$ 4.200 a R$ 22.000/ano" },
    theftProfile: "médio",
    pros: ["Conforto absoluto", "Prestígio"],
    cons: ["Custo de peças"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Tradição em luxo" },
      { name: "Tokio Marine", reason: "VIP Service" },
      { name: "Allianz", reason: "Ótimas coberturas" },
      { name: "Liberty", reason: "Foco no cliente premium" }
    ],
    context: "Mercedes-Benz é o símbolo máximo de sofisticação e engenharia automotiva."
  },
  {
    slug: "seguro-auto-porsche-guarulhos",
    modelo: "Porsche",
    modeloShort: "Porsche",
    categoria: "premium",
    fipeRange: "R$ 350.000 a R$ 2.500.000+",
    priceRange: { min: 8000, max: 45000, label: "R$ 8.000 a R$ 45.000/ano" },
    theftProfile: "baixo",
    pros: ["Performance lendária", "Exclusividade"],
    cons: ["Aceitação restrita", "Preço do seguro"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Líder em superesportivos" },
      { name: "Liberty", reason: "Produto sob medida" },
      { name: "Tokio Marine", reason: "Atendimento diferenciado" },
      { name: "Allianz", reason: "Cobertura internacional" }
    ],
    context: "Porsche é a realização de um sonho de performance e precisão."
  },
  {
    slug: "seguro-auto-ferrari-guarulhos",
    modelo: "Ferrari",
    modeloShort: "Ferrari",
    categoria: "premium",
    fipeRange: "R$ 1.500.000 a R$ 8.000.000+",
    priceRange: { min: 25000, max: 120000, label: "R$ 25.000 a R$ 120.000/ano" },
    theftProfile: "baixo",
    pros: ["O ápice automotivo", "Valorização"],
    cons: ["Manutenção em SP capital", "Aceitação rigorosa"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Divisão de Riscos Especiais" },
      { name: "Liberty", reason: "Apólices customizadas" },
      { name: "Chubb", reason: "Especialista em alto valor" },
      { name: "Allianz", reason: "Cobertura internacional para superesportivos" }
    ],
    context: "Ferrari é mais que um carro, é uma obra de arte da engenharia italiana."
  },
  {
    slug: "seguro-auto-byd-guarulhos",
    modelo: "BYD",
    modeloShort: "BYD Seal",
    categoria: "premium",
    fipeRange: "R$ 100.000 a R$ 1.000.000",
    priceRange: { min: 3500, max: 18000, label: "R$ 3.500 a R$ 18.000/ano" },
    theftProfile: "baixo",
    pros: ["Tecnologia elétrica", "Baixo IPVA"],
    cons: ["Incerteza de revenda", "Rede nova"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Parceira oficial BYD" },
      { name: "Allianz", reason: "Expert em elétricos" },
      { name: "Tokio Marine", reason: "Condições especiais" },
      { name: "Azul Seguros", reason: "Preços competitivos" }
    ],
    context: "A BYD lidera a revolução elétrica com tecnologia de baterias Blade."
  },
  {
    slug: "seguro-auto-gwm-guarulhos",
    modelo: "GWM",
    modeloShort: "Haval",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 350.000",
    priceRange: { min: 4500, max: 12000, label: "R$ 4.500 a R$ 12.000/ano" },
    theftProfile: "baixo",
    pros: ["Híbridos potentes", "Equipamentos"],
    cons: ["Marca nova no país"],
    bestInsurers: [
      { name: "Allianz", reason: "Líder em tecnologia híbrida" },
      { name: "Porto Seguro", reason: "Assistência completa" },
      { name: "Tokio Marine", reason: "Ótima aceitação" },
      { name: "Bradesco", reason: "Parcerias locais" }
    ],
    context: "GWM chegou ao Brasil para dominar o segmento de híbridos premium."
  },
  {
    slug: "seguro-auto-gac-guarulhos",
    modelo: "GAC",
    modeloShort: "GAC",
    categoria: "premium",
    fipeRange: "R$ 180.000 a R$ 400.000",
    priceRange: { min: 5000, max: 15000, label: "R$ 5.000 a R$ 15.000/ano" },
    theftProfile: "baixo",
    pros: ["Luxo chinês", "Design"],
    cons: ["Marca estreante"],
    bestInsurers: [
      { name: "Allianz", reason: "Global Partner" },
      { name: "Porto Seguro", reason: "Segurança na cotação" },
      { name: "Tokio Marine", reason: "Suporte especializado" },
      { name: "Liberty", reason: "Condições para marcas premium chinesas" }
    ],
    context: "A GAC traz luxo e tecnologia de ponta para o mercado brasileiro."
  },
  {
    slug: "seguro-auto-jaguar-guarulhos",
    modelo: "Jaguar",
    modeloShort: "Jaguar",
    categoria: "premium",
    fipeRange: "R$ 160.000 a R$ 1.200.000",
    priceRange: { min: 4800, max: 24000, label: "R$ 4.800 a R$ 24.000/ano" },
    theftProfile: "baixo",
    pros: ["Design britânico icônico", "Performance dinâmica"],
    cons: ["Desvalorização", "Custo de manutenção"],
    bestInsurers: [
      { name: "Porto Seguro", reason: "Excelente rede premium" },
      { name: "Tokio Marine", reason: "Atendimento especializado" },
      { name: "Allianz", reason: "Cobertura robusta" },
      { name: "Liberty", reason: "Condições exclusivas" }
    ],
    context: "Jaguar combina luxo, beleza e poder em uma experiência de direção única."
  },
  {
    slug: "seguro-auto-lexus-guarulhos",
    modelo: "Lexus",
    modeloShort: "Lexus RX 500h",
    categoria: "premium",
    fipeRange: "R$ 150.000 a R$ 800.000",
    priceRange: { min: 3500, max: 15000, label: "R$ 3.500 a R$ 15.000/ano" },
    theftProfile: "baixo",
    pros: ["Confiabilidade extrema", "Tecnologia híbrida"],
    cons: ["Rede menor que concorrentes alemãs"],
    bestInsurers: [
      { name: "Tokio Marine", reason: "Referência japonesa" },
      { name: "Porto Seguro", reason: "Serviços premium" },
      { name: "Allianz", reason: "Expert em híbridos" },
      { name: "Mitsui", reason: "Forte aceitação da marca" }
    ],
    context: "Lexus é a perfeição em hospitalidade e engenharia japonesa (Omotenashi)."
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
  heroImg: m.heroImg,
}));
