import { Crown, Car, Sparkles, Shield, Clock, Gem, LucideIcon } from "lucide-react";

export interface PremiumBrandConfig {
  name: string;
  slug: string;
  slogan: string;
  heroImage: string;
  accentColor: string;
  description: string;
  diferenciais: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  modelos: string[];
  depoimentos: {
    name: string;
    role: string;
    content: string;
    stars: number;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
  middleImage: string;
}

export const PREMIUM_BRANDS: Record<string, PremiumBrandConfig> = {
  mercedes: {
    name: "Mercedes-Benz",
    slug: "mercedes",
    slogan: "The Best or Nothing",
    heroImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    accentColor: "zinc-400",
    description: "Uma experiência de proteção tão sofisticada quanto a estrela de três pontas. Somos especialistas em Mercedes-Benz e oferecemos coberturas exclusivas que respeitam cada detalhe do seu veículo.",
    diferenciais: [
      { icon: Crown, title: "Cobertura Total sem Franquia", description: "Opção de franquia zero para reparos — sua Mercedes merece atendimento sem burocracia nem custos surpresa." },
      { icon: Car, title: "Carro Reserva Premium", description: "Veículo reserva de categoria equivalente à sua Mercedes, por até 30 dias." },
      { icon: Sparkles, title: "Reparo em Concessionária Oficial", description: "Garantiamas reparos exclusivamente em concessionárias autorizadas Mercedes-Benz." },
      { icon: Shield, title: "Cobertura para Blindagem", description: "Proteção completa para blindagem e acessórios originais." },
      { icon: Clock, title: "Assistência 24h Dedicada", description: "Linha exclusiva com atendimento prioritário e guincho especializado." },
      { icon: Gem, title: "Valor de Mercado Garantido", description: "Proteção total do seu investimento com base na tabela FIPE ou valor acordado." },
    ],
    modelos: ["Classe C", "Classe E", "Classe S", "GLA", "GLB", "GLC", "GLE", "GLS", "AMG GT", "Linha EQ"],
    depoimentos: [
      { name: "Carlos Ferreira", role: "Proprietário — Mercedes-Benz GLC 300", content: "Seguro que entende o valor de uma Mercedes. O atendimento da Patro foi excepcional desde a cotação.", stars: 5 },
      { name: "Ana Beatriz", role: "Empresária — Classe C 200", content: "Tive um problema com o para-brisa e a troca foi feita na concessionária com peça original em tempo recorde.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro cobre a linha elétrica EQ?", a: "Sim, temos coberturas específicas para veículos elétricos, incluindo o sistema de baterias e cabos de carregamento." },
      { q: "Posso escolher qualquer concessionária Mercedes?", a: "Sim, nosso plano premium permite a livre escolha de oficinas, com foco nas autorizadas." },
    ],
    middleImage: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop",
  },
  audi: {
    name: "Audi",
    slug: "audi",
    slogan: "Vorsprung durch Technik",
    heroImage: "https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=2070&auto=format&fit=crop",
    accentColor: "red-600",
    description: "A vanguarda da tecnologia alemã merece a melhor proteção. Somos especialistas em Audi e oferecemos coberturas que acompanham a performance do seu Quattro.",
    diferenciais: [
      { icon: Crown, title: "Franquia Reduzida", description: "Condições especiais para reparos em concessionárias Audi." },
      { icon: Car, title: "Carro Reserva Executivo", description: "Mantenha seu padrão com veículos reserva de alto nível." },
      { icon: Sparkles, title: "Tecnologia de Reparo", description: "Garantia de uso de peças originais e ferramentas de diagnóstico Audi." },
      { icon: Shield, title: "Seguro para Esportivos", description: "Cobertura específica para a linha RS e R8." },
      { icon: Clock, title: "Assistência 24h VIP", description: "Socorro mecânico e guincho prancha em qualquer lugar do Brasil." },
      { icon: Gem, title: "Indenização Integral", description: "Garantia de reposição pelo valor de mercado." },
    ],
    modelos: ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "Q8", "RS3", "RS6", "e-tron"],
    depoimentos: [
      { name: "Marcos Viana", role: "Proprietário — Audi Q5 e-tron", content: "Atendimento diferenciado para quem tem um Audi. A Patro conhece os detalhes técnicos do carro.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro cobre o sistema Quattro?", a: "Sim, a cobertura abrange todo o sistema de tração integral e componentes mecânicos avançados." },
    ],
    middleImage: "https://images.unsplash.com/photo-1621348335345-d86b9762497e?q=80&w=2070&auto=format&fit=crop",
  },
  landrover: {
    name: "Land Rover",
    slug: "land-rover",
    slogan: "Above & Beyond",
    heroImage: "https://images.unsplash.com/photo-1594976612316-aa97f0653d61?q=80&w=2070&auto=format&fit=crop",
    accentColor: "green-800",
    description: "Proteção robusta para o luxo off-road definitivo. Seguros especializados para Range Rover, Discovery e Defender.",
    diferenciais: [
      { icon: Shield, title: "Proteção Off-Road", description: "Cobertura para danos em trilhas e terrenos acidentados homologados." },
      { icon: Car, title: "Resgate Especializado", description: "Guinchos preparados para veículos de grande porte e tração 4x4." },
      { icon: Sparkles, title: "Peças Genuínas", description: "Reparos em concessionárias autorizadas com componentes originais." },
    ],
    modelos: ["Range Rover Evoque", "Range Rover Velar", "Range Rover Sport", "Discovery Sport", "Defender"],
    depoimentos: [
      { name: "Julia Lopes", role: "Proprietária — Range Rover Velar", content: "Excelente atendimento. Me sinto segura viajando com meu carro sabendo da assistência da Patro.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro cobre uso fora de estrada?", a: "Sim, temos planos que incluem cobertura para uso off-road leve e moderado." },
    ],
    middleImage: "https://images.unsplash.com/photo-1620248430635-f0cc71871239?q=80&w=2070&auto=format&fit=crop",
  },
  jaguar: {
    name: "Jaguar",
    slug: "jaguar",
    slogan: "The Art of Performance",
    heroImage: "https://images.unsplash.com/photo-1574044536224-037048a609d0?q=80&w=2070&auto=format&fit=crop",
    accentColor: "blue-900",
    description: "Design e performance britânica protegidos com exclusividade. Cuidamos do seu Jaguar com a mesma paixão que você o dirige.",
    diferenciais: [
      { icon: Crown, title: "Atendimento Exclusive", description: "Corretores especialistas em marcas de luxo britânicas." },
      { icon: Sparkles, title: "Reparo Artesanal", description: "Foco na preservação da estética e performance original." },
    ],
    modelos: ["F-PACE", "E-PACE", "I-PACE", "F-TYPE", "XE", "XF"],
    depoimentos: [
      { name: "Roberto Silveira", role: "Proprietário — Jaguar F-TYPE", content: "Acharam a melhor cobertura para o meu esportivo. Muito satisfeito.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro atende o I-PACE elétrico?", a: "Com certeza, temos planos específicos para a linha elétrica da Jaguar." },
    ],
    middleImage: "https://images.unsplash.com/photo-1621348335072-463273463991?q=80&w=2070&auto=format&fit=crop",
  },
  volvo: {
    name: "Volvo",
    slug: "volvo",
    slogan: "For Life",
    heroImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    accentColor: "blue-700",
    description: "A marca mais segura do mundo exige o seguro mais completo. Especialistas em proteção para a linha Volvo Recharge.",
    diferenciais: [
      { icon: Shield, title: "Foco em Segurança", description: "Cobertura total para todos os sistemas de segurança ativa Volvo." },
      { icon: Sparkles, title: "Reparo de Híbridos", description: "Oficinas certificadas para manutenção de sistemas elétricos." },
    ],
    modelos: ["XC40", "XC60", "XC90", "C40", "S60", "S90"],
    depoimentos: [
      { name: "Luciana Costa", role: "Proprietária — Volvo XC60 Recharge", content: "Melhor cotação para híbridos que encontrei. Atendimento nota 10.", stars: 5 },
    ],
    faqs: [
      { q: "Como funciona a cobertura da bateria?", a: "A bateria tem cobertura específica contra danos externos e curtos-circuitos acidentais." },
    ],
    middleImage: "https://images.unsplash.com/photo-1621251914299-e688849405f6?q=80&w=2071&auto=format&fit=crop",
  },
  ferrari: {
    name: "Ferrari",
    slug: "ferrari",
    slogan: "Being Ferrari",
    heroImage: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop",
    accentColor: "red-600",
    description: "O ápice do automobilismo mundial protegido por especialistas. Coberturas sob medida para o seu Cavallino Rampante.",
    diferenciais: [
      { icon: Crown, title: "Risco Especial", description: "Apólices customizadas para veículos de altíssimo valor." },
      { icon: Gem, title: "Transporte Coberto", description: "Guincho fechado (sider) para total discrição e segurança." },
    ],
    modelos: ["F8 Tributo", "SF90 Stradale", "Roma", "Portofino M", "812 Superfast", "Purosangue"],
    depoimentos: [
      { name: "Enzo Rossi", role: "Colecionador", content: "A Patro é a única que entende a logística de segurar uma Ferrari no Brasil.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro cobre eventos de pista?", a: "Oferecemos extensões de cobertura específicas para Track Days e eventos homologados." },
    ],
    middleImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
  },
  porsche: {
    name: "Porsche",
    slug: "porsche",
    slogan: "There is no substitute",
    heroImage: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
    accentColor: "red-700",
    description: "Performance e precisão protegidas com rigor alemão. Especialistas em 911, Cayenne, Macan e Taycan.",
    diferenciais: [
      { icon: Sparkles, title: "Porsche Service", description: "Reparos garantidos em centros técnicos oficiais Porsche." },
      { icon: Crown, title: "Cobertura Esportiva", description: "Planos que respeitam a vocação esportiva do seu carro." },
    ],
    modelos: ["911 Carrera", "Taycan", "Panamera", "Macan", "Cayenne", "718 Cayman", "718 Boxster"],
    depoimentos: [
      { name: "Fernando Guedes", role: "Proprietário — Porsche 911", content: "Cotação rápida e coberturas que fazem sentido para um Porsche.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro atende o Taycan elétrico?", a: "Sim, somos especialistas na linha Taycan e oferecemos coberturas completas para elétricos." },
    ],
    middleImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop",
  },
  byd: {
    name: "BYD",
    slug: "byd",
    slogan: "Build Your Dreams",
    heroImage: "https://images.unsplash.com/photo-1695661603598-f22262cc26a8?q=80&w=2070&auto=format&fit=crop",
    accentColor: "blue-500",
    description: "A revolução elétrica protegida pela Patro Seguros. Parceiros das melhores seguradoras para a linha BYD.",
    diferenciais: [
      { icon: Shield, title: "Proteção de Baterias", description: "Cobertura exclusiva para a bateria Blade e sistemas elétricos." },
      { icon: Sparkles, title: "Rede Homologada", description: "Garantia de reparo em oficinas especializadas em tecnologia elétrica." },
    ],
    modelos: ["Dolphin", "Seal", "Yuan Plus", "Song Plus", "Tan", "Han"],
    depoimentos: [
      { name: "Marcelo Andrade", role: "Proprietário — BYD Seal", content: "Fiquei surpreso com as taxas competitivas para o meu elétrico.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro cobre o carregador Wallbox?", a: "Sim, oferecemos cobertura adicional para o equipamento de carregamento residencial." },
    ],
    middleImage: "https://images.unsplash.com/photo-1691230485303-99933857597f?q=80&w=2070&auto=format&fit=crop",
  },
  gwm: {
    name: "GWM",
    slug: "gwm",
    slogan: "Hello Tomorrow",
    heroImage: "https://images.unsplash.com/photo-1702525790471-ef6652c42171?q=80&w=2070&auto=format&fit=crop",
    accentColor: "blue-600",
    description: "Sua jornada híbrida começa protegida. Seguros especializados para a linha Haval e Ora da GWM.",
    diferenciais: [
      { icon: Shield, title: "Cobertura Híbrida", description: "Proteção total para o conjunto motor a combustão e elétrico." },
      { icon: Car, title: "Tecnologia de Reparo", description: "Assistência técnica alinhada com a inovação da marca." },
    ],
    modelos: ["Haval H6 HEV", "Haval H6 PHEV", "Haval H6 GT", "Ora 03"],
    depoimentos: [
      { name: "Sandro Lima", role: "Proprietário — Haval H6 GT", content: "A Patro conseguiu a melhor aceitação para minha GWM no mercado.", stars: 5 },
    ],
    faqs: [
      { q: "A marca é bem aceita pelas seguradoras?", a: "Sim, trabalhamos com seguradoras que possuem parcerias e aceitação total para GWM." },
    ],
    middleImage: "https://images.unsplash.com/photo-1691230491321-72993857597f?q=80&w=2070&auto=format&fit=crop",
  },
  lexus: {
    name: "Lexus",
    slug: "lexus",
    slogan: "Experience Amazing",
    heroImage: "https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=2070&auto=format&fit=crop",
    accentColor: "zinc-600",
    description: "O luxo japonês e a confiabilidade híbrida protegidos pela Patro Seguros. Experiência Omotenashi em seguros.",
    diferenciais: [
      { icon: Crown, title: "Cuidado Lexus", description: "Atendimento personalizado que respeita o padrão de qualidade da marca." },
      { icon: Shield, title: "Garantia Híbrida", description: "Proteção para o sistema de tração híbrido referência mundial." },
    ],
    modelos: ["UX 250h", "NX 350h", "RX 500h", "ES 300h", "LS 500h"],
    depoimentos: [
      { name: "Keiko Tanaka", role: "Proprietária — Lexus NX 350h", content: "Atendimento impecável, digno da marca Lexus. Recomendo muito.", stars: 5 },
    ],
    faqs: [
      { q: "O seguro é similar ao da Toyota?", a: "Sim, aproveitamos a excelente aceitação da marca Toyota para oferecer condições exclusivas Lexus." },
    ],
    middleImage: "https://images.unsplash.com/photo-1629891465239-010e964b387e?q=80&w=2070&auto=format&fit=crop",
  },
};
