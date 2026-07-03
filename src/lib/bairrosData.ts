 import { generateLocalFAQs } from "@/data/localFAQGenerator";
 import imgJardimMaia from "@/assets/bairros/jardim-maia.webp";
import imgVilaAugusta from "@/assets/bairros/vila-augusta.webp";
import imgCumbica from "@/assets/bairros/cumbica.webp";
import imgCentro from "@/assets/bairros/centro.webp";
import imgPicanco from "@/assets/bairros/picanco.webp";
import imgMacedo from "@/assets/bairros/macedo.webp";
import imgGopouva from "@/assets/bairros/gopouva.webp";
import imgBonsucesso from "@/assets/bairros/bonsucesso.webp";
import imgParaventi from "@/assets/bairros/paraventi.webp";
import imgContinental from "@/assets/bairros/continental.webp";
import imgPimentas from "@/assets/bairros/pimentas.webp";
import imgTaboao from "@/assets/bairros/taboao.webp";
import imgVilaGalvao from "@/assets/bairros/vila-galvao.webp";
import imgAeroporto from "@/assets/bairros/aeroporto-guarulhos.webp";
import imgCidadeIndustrial from "@/assets/bairros/cidade-industrial-satelite.webp";
import imgJardimCumbica from "@/assets/bairros/jardim-cumbica.webp";

export interface BairroFAQ {
  question: string;
  answer: string;
}

export interface BairroData {
  id: string;
  nome: string;
  foco: string;
  subtitulo: string;
  descricao: string;
  image: string;
  faqs: BairroFAQ[];
  testimonials?: BairroTestimonial[];
  geo?: { latitude: number; longitude: number };
  intel?: BairroLocalIntel;
}

export interface BairroTestimonial {
  author: string;
  role: string;
  product: string;
  rating: 5 | 4;
  text: string;
  date: string; // YYYY-MM-DD
}

/**
 * Inteligência Local por bairro — Fase 2 SEO (diferenciação de páginas locais).
 * Todos os campos são opcionais. Nunca inventar números — deixar em branco
 * se o dado não for verificável.
 */
export interface BairroLocalIntel {
  /** Perfil socioeconômico curto (1 frase, ≤ 160 chars) */
  demographics?: string;
  /** Marcos e referências reais do bairro */
  landmarks?: {
    hospitals?: string[];
    malls?: string[];
    streets?: string[];
    schools?: string[];
    business?: string[];
  };
  /** Perfil qualitativo de risco baseado em experiência de subscrição */
  riskProfile?: {
    auto?: "baixo" | "médio" | "médio-alto" | "alto";
    residencial?: "baixo" | "médio" | "médio-alto" | "alto";
    empresarial?: "baixo" | "médio" | "médio-alto" | "alto";
    notes?: string;
  };
  /** Caso real anonimizado (sem dados identificáveis) */
  localCase?: { title: string; description: string };
}

export const bairros: BairroData[] = [
   {
     id: "jardim-maia",
     nome: "Cidade Maia",
     foco: "Seguros de Alto Padrão e Vida",
     subtitulo: "Proteção premium para quem vive no coração verde de Guarulhos",
     descricao: "No Cidade Maia, onde o Bosque Maia e a Av. Paulo Faccini atraem moradores de alto padrão e valorizam imóveis, a Patro Seguros oferece soluções sob medida: seguro residencial completo para apartamentos de luxo, seguro auto para veículos premium e proteção patrimonial à altura do bairro mais nobre de Guarulhos. Nossa equipe conhece a região e atende com a agilidade que você merece.",
     image: imgJardimMaia,
     faqs: [
       ...generateLocalFAQs({ slug: "auto-cidade-maia", neighborhood: "Cidade Maia", product: "auto", riskLevel: "baixo", priceRange: "R$ 1.950 a R$ 3.800/ano", reference: "próximo ao Shopping Maia" }),
       ...generateLocalFAQs({ slug: "vida-cidade-maia", neighborhood: "Cidade Maia", product: "vida", priceRange: "a partir de R$ 45/mês", reference: "na região da Av. Paulo Faccini" }),
       ...generateLocalFAQs({ slug: "residencial-cidade-maia", neighborhood: "Cidade Maia", product: "residencial", riskLevel: "baixo", priceRange: "a partir de R$ 35/mês", reference: "no entorno do Bosque Maia" }),
       ...generateLocalFAQs({ slug: "empresarial-cidade-maia", neighborhood: "Cidade Maia", product: "empresarial", riskLevel: "baixo", priceRange: "a partir de R$ 89/mês", reference: "próximo ao Centro de Guarulhos" }),
     ],
   },
   {
     id: "vila-augusta",
     nome: "Vila Augusta",
     foco: "Seguro Auto e Apartamentos",
     subtitulo: "Seguros para o bairro que mais cresce em Guarulhos",
     descricao: "A Vila Augusta vive um verdadeiro boom imobiliário. Entre o Parque Fracalanza, o acesso rápido à Dutra e a proximidade do Shopping Internacional, novos moradores e investidores chegam todos os dias. A Patro Seguros acompanha essa transformação com seguros auto competitivos, seguro residencial para novos empreendimentos e proteção completa para quem está construindo vida na Vila Augusta.",
     image: imgVilaAugusta,
     faqs: [
       ...generateLocalFAQs({ slug: "auto-vila-augusta", neighborhood: "Vila Augusta", product: "auto", riskLevel: "baixo", priceRange: "R$ 2.100 a R$ 4.000/ano", reference: "próximo ao Shopping Internacional" }),
       ...generateLocalFAQs({ slug: "residencial-vila-augusta", neighborhood: "Vila Augusta", product: "residencial", riskLevel: "baixo", priceRange: "a partir de R$ 30/mês", reference: "na região do Parque Fracalanza" }),
       ...generateLocalFAQs({ slug: "vida-vila-augusta", neighborhood: "Vila Augusta", product: "vida", priceRange: "a partir de R$ 40/mês", reference: "com fácil acesso à Via Dutra" }),
       ...generateLocalFAQs({ slug: "empresarial-vila-augusta", neighborhood: "Vila Augusta", product: "empresarial", riskLevel: "baixo", priceRange: "a partir de R$ 95/mês", reference: "próximo ao Centro" }),
     ],
   },
   {
     id: "cumbica",
     nome: "Cumbica",
     foco: "Logística, Carga e Frota",
     subtitulo: "Proteção especializada para o polo logístico de Guarulhos",
     descricao: "Cumbica é sinônimo de logística. Com o Aeroporto Internacional de Guarulhos e o maior Polo Industrial do estado, a região demanda seguros empresariais robustos. A Patro Seguros é referência em seguro de carga, seguro de galpões, RC para transportadoras e proteção patrimonial para empresas que operam no coração logístico do Brasil.",
     image: imgCumbica,
    geo: { latitude: -23.4356, longitude: -46.4731 },
    testimonials: [
      { author: "Marcelo R.", role: "Gerente de logística — Cumbica", product: "Seguro de Carga", rating: 5, date: "2026-04-12", text: "Operamos transporte de eletrônicos perto do aeroporto. A Patro reestruturou nossa apólice de RCTR-C e baixamos 18% o custo mantendo cobertura ampliada. Atendimento em sinistro foi resolvido em 48h." },
      { author: "Patrícia M.", role: "Sócia de transportadora — Cumbica", product: "Frota + RC", rating: 5, date: "2026-03-05", text: "Tínhamos seguro direto com a seguradora. A Patro renegociou frota de 22 veículos e incluiu RC Facultativa robusta. Reduziu prêmio anual em R$ 38 mil." },
    ],
     faqs: [
       ...generateLocalFAQs({ slug: "empresarial-cumbica", neighborhood: "Cumbica", product: "empresarial", riskLevel: "médio-alto", priceRange: "conforme porte da logística", reference: "no entorno do Aeroporto de Guarulhos" }),
       ...generateLocalFAQs({ slug: "auto-cumbica", neighborhood: "Cumbica", product: "auto", riskLevel: "médio-alto", priceRange: "R$ 3.100 a R$ 6.200/ano", reference: "próximo à Rodovia Hélio Smidt" }),
       ...generateLocalFAQs({ slug: "vida-cumbica", neighborhood: "Cumbica", product: "vida", priceRange: "a partir de R$ 50/mês", reference: "para profissionais do setor logístico" }),
       ...generateLocalFAQs({ slug: "residencial-cumbica", neighborhood: "Cumbica", product: "residencial", riskLevel: "médio-alto", priceRange: "a partir de R$ 40/mês", reference: "nas áreas residenciais do bairro" }),
     ],
   },
   {
     id: "centro",
     nome: "Centro",
     foco: "RC Profissional e Comércio",
     subtitulo: "Sua corretora no coração comercial de Guarulhos",
     descricao: "O Centro de Guarulhos pulsa com comércio e serviços. Na Av. Salgado Filho — onde fica nossa sede — e nas imediações do Poli Shopping, advogados, dentistas, médicos e comerciantes precisam de proteção profissional. A Patro Seguros oferece RC Profissional, seguro empresarial para lojas e consultórios, além de planos de saúde corporativos, tudo com atendimento presencial a poucos passos de você.",
     image: imgCentro,
    geo: { latitude: -23.4628, longitude: -46.5333 },
    testimonials: [
      { author: "Dra. Camila L.", role: "Dentista — Centro de Guarulhos", product: "RC Profissional + Empresarial", rating: 5, date: "2026-05-18", text: "Atendimento presencial fez a diferença. Visitei o escritório no Cidade Maia, fechei RC Profissional e seguro do consultório no mesmo dia. Já indiquei para 3 colegas da Av. Salgado Filho." },
      { author: "Eduardo P.", role: "Comerciante — Poli Shopping", product: "Seguro Empresarial", rating: 5, date: "2026-02-22", text: "Tive sinistro de incêndio em loja vizinha que afetou meu estoque. A Patro acompanhou tudo, vistoria veio em 24h e indenização saiu em 28 dias. Profissionalismo raro." },
    ],
     faqs: [
       ...generateLocalFAQs({ slug: "empresarial-centro", neighborhood: "Centro", product: "empresarial", riskLevel: "médio-alto", priceRange: "a partir de R$ 99/mês", reference: "próximo ao Poli Shopping e Av. Salgado Filho" }),
       ...generateLocalFAQs({ slug: "auto-centro", neighborhood: "Centro", product: "auto", riskLevel: "médio-alto", priceRange: "R$ 2.900 a R$ 5.500/ano", reference: "na região da Praça Tereza Cristina" }),
       ...generateLocalFAQs({ slug: "vida-centro", neighborhood: "Centro", product: "vida", priceRange: "a partir de R$ 45/mês", reference: "para profissionais liberais e comerciantes" }),
       ...generateLocalFAQs({ slug: "residencial-centro", neighborhood: "Centro", product: "residencial", riskLevel: "médio-alto", priceRange: "a partir de R$ 38/mês", reference: "nos edifícios residenciais centrais" }),
     ],
   },
   {
     id: "picanco",
     nome: "Picanço",
     foco: "Seguro Auto Familiar",
     subtitulo: "Proteção para famílias no coração residencial de Guarulhos",
     descricao: "O Picanço é um bairro de famílias. Com acesso fácil pela Avenida Transguarulhense e vizinhança tranquila, quem mora aqui busca segurança no dia a dia. A Patro Seguros entende essa necessidade: seguro auto com assistência 24h, seguro residencial com cobertura ampla e seguro de vida para proteger quem você ama. Atendimento rápido e humano para a família do Picanço.",
     image: imgPicanco,
     faqs: [
       ...generateLocalFAQs({ slug: "auto-picanco", neighborhood: "Picanço", product: "auto", riskLevel: "médio", priceRange: "R$ 2.400 a R$ 4.500/ano", reference: "próximo à Av. Transguarulhense" }),
       ...generateLocalFAQs({ slug: "residencial-picanco", neighborhood: "Picanço", product: "residencial", riskLevel: "médio", priceRange: "a partir de R$ 28/mês", reference: "na região da Vila Rosália" }),
       ...generateLocalFAQs({ slug: "vida-picanco", neighborhood: "Picanço", product: "vida", priceRange: "a partir de R$ 35/mês", reference: "para proteção de famílias e casais" }),
       ...generateLocalFAQs({ slug: "empresarial-picanco", neighborhood: "Picanço", product: "empresarial", riskLevel: "médio", priceRange: "a partir de R$ 75/mês", reference: "para o comércio local do bairro" }),
     ],
   },
   {
     id: "macedo",
     nome: "Macedo",
     foco: "Saúde PME e Clínicas",
     subtitulo: "Planos de saúde e seguros empresariais para o Macedo",
     descricao: "Próximo ao Hospital Bom Clima e com forte presença de pequenas e médias empresas, o Macedo é um bairro que une saúde e empreendedorismo. A Patro Seguros é especialista em planos de saúde empresariais para PMEs da região, seguro empresarial sob medida e seguro de vida em grupo para equipes. Proteja sua empresa e seus colaboradores com quem conhece o Macedo.",
     image: imgMacedo,
     faqs: [
       ...generateLocalFAQs({ slug: "saude-macedo", neighborhood: "Macedo", product: "saude", priceRange: "conforme faixa etária e rede", reference: "próximo ao Hospital Bom Clima" }),
       ...generateLocalFAQs({ slug: "empresarial-macedo", neighborhood: "Macedo", product: "empresarial", riskLevel: "médio", priceRange: "a partir de R$ 85/mês", reference: "para clínicas e escritórios locais" }),
       ...generateLocalFAQs({ slug: "vida-macedo", neighborhood: "Macedo", product: "vida", priceRange: "a partir de R$ 40/mês", reference: "para sócios e colaboradores de PMEs" }),
       ...generateLocalFAQs({ slug: "auto-macedo", neighborhood: "Macedo", product: "auto", riskLevel: "médio", priceRange: "R$ 2.500 a R$ 4.800/ano", reference: "na região da Av. Tiradentes" }),
     ],
   },
   {
     id: "gopouva",
     nome: "Gopouva",
     foco: "Seguros de Vida e Tradição",
     subtitulo: "Seguros com a tradição que Gopouva merece",
     descricao: "Gopouva é tradição. Desde a histórica Igreja de Santo Antônio até o comércio consolidado, o bairro respira comunidade. A Patro Seguros honra essa tradição com atendimento personalizado, seguro residencial para casas e apartamentos do bairro, seguro auto e planos de saúde individuais e familiares. Confiança construída ao longo dos anos, assim como Gopouva.",
     image: imgGopouva,
     faqs: [
       ...generateLocalFAQs({ slug: "vida-gopouva", neighborhood: "Gopouva", product: "vida", priceRange: "a partir de R$ 38/mês", reference: "próximo à Igreja de Santo Antônio" }),
       ...generateLocalFAQs({ slug: "residencial-gopouva", neighborhood: "Gopouva", product: "residencial", riskLevel: "médio", priceRange: "a partir de R$ 32/mês", reference: "nas áreas residenciais tradicionais" }),
       ...generateLocalFAQs({ slug: "auto-gopouva", neighborhood: "Gopouva", product: "auto", riskLevel: "médio", priceRange: "R$ 2.450 a R$ 4.700/ano", reference: "com fácil acesso ao Centro" }),
       ...generateLocalFAQs({ slug: "saude-gopouva", neighborhood: "Gopouva", product: "saude", priceRange: "consultas e exames completos", reference: "com ampla rede em Guarulhos" }),
     ],
   },
   {
     id: "bonsucesso",
     nome: "Bonsucesso",
     foco: "Empresarial e Logística",
     subtitulo: "Seguros para o bairro em expansão de Guarulhos",
     descricao: "Bonsucesso cresce com o Shopping Bonsucesso como âncora e acesso direto à Dutra, com novos empreendimentos surgindo a cada mês. A região combina logística, comércio e residências. A Patro Seguros acompanha essa expansão com seguro empresarial para novos negócios, seguro auto para moradores e proteção patrimonial para investidores que apostam no futuro de Bonsucesso.",
     image: imgBonsucesso,
    geo: { latitude: -23.4128, longitude: -46.4214 },
    testimonials: [
      { author: "André S.", role: "Lojista — Shopping Bonsucesso", product: "Seguro Empresarial", rating: 5, date: "2026-05-02", text: "Inauguração de loja exigiu certificado pela administração do shopping. A Patro entregou apólice em 2 dias úteis, com RC operações e lucros cessantes — exatamente como o regulamento pedia." },
      { author: "Joana T.", role: "Moradora — Bonsucesso", product: "Seguro Auto", rating: 5, date: "2026-04-19", text: "Comparei 3 corretoras antes de fechar. A Patro trouxe Porto e HDI lado a lado com R$ 540 de diferença anual. Ainda incluiu rastreador sem custo extra." },
    ],
     faqs: [
       ...generateLocalFAQs({ slug: "empresarial-bonsucesso", neighborhood: "Bonsucesso", product: "empresarial", riskLevel: "médio", priceRange: "a partir de R$ 90/mês", reference: "próximo ao Shopping Bonsucesso" }),
       ...generateLocalFAQs({ slug: "auto-bonsucesso", neighborhood: "Bonsucesso", product: "auto", riskLevel: "médio", priceRange: "R$ 2.700 a R$ 5.100/ano", reference: "com acesso à Rodovia Pres. Dutra" }),
       ...generateLocalFAQs({ slug: "vida-bonsucesso", neighborhood: "Bonsucesso", product: "vida", priceRange: "a partir de R$ 42/mês", reference: "para empreendedores e famílias locais" }),
       ...generateLocalFAQs({ slug: "residencial-bonsucesso", neighborhood: "Bonsucesso", product: "residencial", riskLevel: "médio", priceRange: "a partir de R$ 35/mês", reference: "nas novas expansões do bairro" }),
     ],
   },
   {
     id: "paraventi",
     nome: "Paraventi",
     foco: "Auto e Saúde Individual",
     subtitulo: "Proteção acessível para moradores do Paraventi",
     descricao: "O Paraventi, com a região do SESI como referência local, reúne famílias trabalhadoras que buscam proteção inteligente. A Patro Seguros oferece seguro auto com excelente custo-benefício, planos de saúde individuais acessíveis e seguro residencial completo. Atendimento ágil via WhatsApp e presencial para toda a comunidade do Paraventi.",
     image: imgParaventi,
     faqs: [
       ...generateLocalFAQs({ slug: "auto-paraventi", neighborhood: "Paraventi", product: "auto", riskLevel: "médio", priceRange: "R$ 2.400 a R$ 4.400/ano", reference: "próximo ao SESI Guarulhos" }),
       ...generateLocalFAQs({ slug: "saude-paraventi", neighborhood: "Paraventi", product: "saude", priceRange: "planos individuais a partir de R$ 189", reference: "com rede próxima ao bairro" }),
       ...generateLocalFAQs({ slug: "residencial-paraventi", neighborhood: "Paraventi", product: "residencial", riskLevel: "médio", priceRange: "a partir de R$ 25/mês", reference: "nas ruas residenciais do Paraventi" }),
       ...generateLocalFAQs({ slug: "vida-paraventi", neighborhood: "Paraventi", product: "vida", priceRange: "a partir de R$ 30/mês", reference: "para proteção familiar básica" }),
     ],
   },
   {
     id: "continental",
     nome: "Continental",
     foco: "Residencial e Proteção Familiar",
     subtitulo: "Seguros para a maior densidade populacional de Guarulhos",
     descricao: "O Continental é um dos bairros mais populosos de Guarulhos. Com alta densidade de condomínios e apartamentos, a demanda por seguro residencial, seguro de condomínio e seguro auto é enorme. A Patro Seguros atende o Continental com agilidade: cotações rápidas, sinistros resolvidos com prioridade e planos que cabem no bolso de quem vive nesta região vibrante.",
     image: imgContinental,
     faqs: [
       ...generateLocalFAQs({ slug: "residencial-continental", neighborhood: "Continental", product: "residencial", riskLevel: "médio", priceRange: "a partir de R$ 25/mês", reference: "específico para apartamentos e condomínios" }),
       ...generateLocalFAQs({ slug: "auto-continental", neighborhood: "Continental", product: "auto", riskLevel: "médio", priceRange: "R$ 2.600 a R$ 4.900/ano", reference: "com garagem coberta nos edifícios" }),
       ...generateLocalFAQs({ slug: "vida-continental", neighborhood: "Continental", product: "vida", priceRange: "a partir de R$ 35/mês", reference: "para moradores de condomínios verticais" }),
       ...generateLocalFAQs({ slug: "saude-continental", neighborhood: "Continental", product: "saude", priceRange: "ampla rede de atendimento local", reference: "próximo à região central" }),
     ],
   },
  {
    id: "pimentas",
    nome: "Pimentas",
    foco: "Seguro Auto, Moto e Saúde Familiar",
    subtitulo: "Proteção acessível para a maior região populacional de Guarulhos",
    descricao: "Pimentas é uma das regiões mais populosas de Guarulhos, com forte demanda por seguro auto, seguro moto e planos de saúde familiares. O índice de roubo/furto na região exige seguros bem calibrados — com rastreador, garagem e franquia ajustada ao perfil. A Patro Seguros compara as 16+ seguradoras parceiras para encontrar o melhor preço para o morador de Pimentas, sem abrir mão de assistência 24h e atendimento humano em sinistro.",
    image: imgPimentas,
    geo: { latitude: -23.4631, longitude: -46.3814 },
    testimonials: [
      { author: "Luís F.", role: "Motorista de aplicativo — Pimentas", product: "Seguro Auto com EAR", rating: 5, date: "2026-06-05", text: "Era impossível achar seguro com cobertura para Uber em Pimentas. A Patro encontrou apólice 22% mais barata que a anterior, com assistência 24h e carro reserva. Atende rápido pelo WhatsApp." },
      { author: "Renata C.", role: "Mãe de família — Pimentas", product: "Plano de Saúde Familiar", rating: 5, date: "2026-05-20", text: "Plano antigo subia 25% por ano. A Sandra comparou 4 operadoras e migrou a família para um plano coletivo com a mesma rede e R$ 380 a menos por mês." },
    ],
    faqs: [
      { question: "Quanto custa seguro auto em Pimentas em 2026?", answer: "Em Pimentas o prêmio anual para cobertura compreensiva costuma ficar entre R$ 3.200 e R$ 6.400/ano para veículos populares com perfil entre 30–50 anos. O CEP do bairro tem sinistralidade de roubo/furto até 40% acima da média de Guarulhos, então a maioria das seguradoras exige rastreador para FIPE acima de R$ 50 mil. A Patro compara 16+ seguradoras e calibra franquia e bônus para reduzir o impacto do CEP." },
      { question: "Seguradoras aceitam motorista de aplicativo (Uber/99) em Pimentas?", answer: "Sim, mas com cláusula EAR (Exercício de Atividade Remunerada). Trabalhamos com Porto, Tokio Marine, HDI e Allianz que aceitam motoristas de app em Pimentas. O prêmio sobe em média 18–28% versus uso particular, mas evita recusa de sinistro. Sem EAR, a seguradora pode negar pagamento se o roubo acontecer durante corrida." },
      { question: "Vale a pena seguro de moto em Pimentas?", answer: "Vale, principalmente para motoboys e moradores que usam Av. Pimentas e Estrada Pres. Juscelino. Pimentas concentra alto índice de furto de motos populares (CG, Fan, Factor). Cobertura básica (RCF + roubo/furto) sai a partir de R$ 78/mês para motos até 160cc com rastreador. Sem rastreador, várias seguradoras recusam o risco no CEP." },
      { question: "Como funciona plano de saúde familiar para moradores de Pimentas?", answer: "A maioria das famílias de Pimentas opta por planos coletivos por adesão (via CNPJ ou entidade de classe), que custam 25–40% menos que individuais. Faixas comuns: R$ 199–320/vida para enfermaria e R$ 320–550/vida para apartamento, com rede credenciada incluindo Hospital Municipal de Pimentas, Stella Maris e rede ampliada em São Paulo. Reajustes coletivos costumam ficar 4–8 p.p. abaixo dos individuais." },
      { question: "Tem hospital credenciado próximo a Pimentas?", answer: "Sim. Dependendo da operadora (Bradesco, SulAmérica, Amil, Hapvida, Notre Dame Intermédica), a rede em Pimentas e arredores inclui Hospital Stella Maris, Hospital Padre Bento, clínicas em Bonsucesso e pronto-atendimentos próximos à Av. Pimentas. Em uma cotação real comparamos qual operadora cobre melhor o seu bairro específico." },
      { question: "Seguro residencial em Pimentas cobre roubo de eletrônicos?", answer: "Sim. A cobertura básica obrigatória é incêndio, mas a contratação típica em Pimentas inclui adicional de roubo/furto qualificado de bens, danos elétricos e RC familiar. Para uma casa avaliada em R$ 250 mil com R$ 30 mil em bens, o prêmio fica em torno de R$ 32–55/mês. Indicamos cobertura de roubo qualificada porque furto simples (sem arrombamento) não é coberto por padrão." },
    ],
  },
  {
    id: "taboao",
    nome: "Taboão",
    foco: "Auto, Residencial e Pequenos Negócios",
    subtitulo: "Seguros para a região conectada de Guarulhos",
    descricao: "O Taboão é uma região forte de acesso para a Dutra e Fernão Dias, o que aumenta o fluxo de veículos e o risco em rodovia. Combina residências, comércio local e pequenos prestadores. A Patro Seguros atende o Taboão com seguro auto que considera o trajeto, seguro residencial para casas e apartamentos e seguro empresarial sob medida para o comércio do bairro.",
    image: imgTaboao,
    geo: { latitude: -23.3997, longitude: -46.4717 },
    testimonials: [
      { author: "Cláudio M.", role: "Engenheiro — Taboão", product: "Seguro Auto + Residencial", rating: 5, date: "2026-05-28", text: "Pego a Dutra todo dia. A Patro montou cobertura compreensiva com rastreador e ainda fechou seguro da casa no combo, com 12% de desconto. Recomendo para quem pega rodovia diariamente." },
      { author: "Marina B.", role: "Comerciante — Taboão", product: "Seguro Empresarial PME", rating: 5, date: "2026-04-10", text: "Loja de cosméticos pequena, achei que seguro empresarial era só para grandes. A Patro fez apólice de R$ 89/mês com incêndio, roubo e RC. Tranquilidade total." },
    ],
    faqs: [
      { question: "Quanto custa seguro auto no Taboão em 2026?", answer: "No Taboão o prêmio compreensivo fica entre R$ 2.900 e R$ 5.600/ano para perfis comuns. O bairro tem trânsito intenso pela proximidade de Dutra e Fernão Dias, o que pesa no cálculo: rodovia eleva risco de colisão e quebra de para-brisa. Motoristas que declaram uso pendular diário pagam ~10% a mais, mas evitam recusa de sinistro." },
      { question: "Quem pega a Dutra todo dia precisa de cobertura especial?", answer: "Sim — recomendamos cobertura compreensiva (colisão + roubo + incêndio + terceiros) com franquia reduzida e assistência 24h com guincho ilimitado em rodovia. Vidros e faróis blindados a parte saem por R$ 12–20/mês adicionais e cobrem o estrago mais comum de quem roda na Dutra. Sem isso, troca de para-brisa fora da apólice custa R$ 1.200–2.800 do bolso." },
      { question: "Seguro residencial no Taboão cobre casa e apartamento?", answer: "Sim. Para casas no Taboão (mais comuns no bairro), o prêmio com incêndio + roubo qualificado + danos elétricos + RC fica a partir de R$ 30/mês para imóveis até R$ 350 mil. Para apartamentos no entorno do Pq. Cecap, o seguro é até 25% mais barato porque o risco de roubo é menor em edifícios com portaria 24h." },
      { question: "Vale a pena seguro empresarial para pequeno comércio no Taboão?", answer: "Vale e custa menos do que parece. Lojas pequenas (até 80 m², estoque até R$ 80 mil) no Taboão contratam pacote PME com incêndio, roubo, RC operação e equipamentos eletrônicos a partir de R$ 85/mês. Para prestadores autônomos (estética, pet shop, oficina) há produtos modulares ainda mais baratos. Em sinistro de incêndio, sem seguro, o pequeno comerciante normalmente fecha as portas." },
      { question: "Atendem comércio na Av. Monteiro Lobato e entorno?", answer: "Sim, atendemos todo o eixo comercial do Taboão (Av. Monteiro Lobato, Rua Antônio Nunes da Cunha, entorno do Cecap e acesso à Marginal). Fazemos visita técnica gratuita para vistoria do imóvel comercial antes da contratação, o que ajuda a evitar problemas em sinistro." },
      { question: "Como funciona seguro de vida para autônomos do Taboão?", answer: "Comerciantes e prestadores autônomos do Taboão geralmente contratam seguro de vida individual com cobertura de morte + invalidez + DIT (Diária por Incapacidade Temporária). Para R$ 100 mil de capital, sai a partir de R$ 38/mês na faixa de 30–45 anos. A DIT é essencial: paga uma diária se você ficar afastado do trabalho por acidente ou doença, o que para autônomo equivale a manter a renda durante a recuperação." },
    ],
  },
  {
    id: "vila-galvao",
    nome: "Vila Galvão",
    foco: "Residencial, Auto e Vida",
    subtitulo: "Seguros para um dos bairros mais tradicionais de Guarulhos",
    descricao: "Vila Galvão combina tradição residencial, comércio consolidado na Av. Emílio Ribas e proximidade com a divisa de São Paulo. É um bairro de moradores estabelecidos, com perfil familiar e demanda por seguro residencial completo, seguro auto, seguro de vida e plano de saúde. A Patro Seguros oferece pacote consultivo para quem busca proteção patrimonial sólida no Vila Galvão.",
    image: imgVilaGalvao,
    geo: { latitude: -23.4408, longitude: -46.5567 },
    testimonials: [
      { author: "Sr. Antônio N.", role: "Aposentado — Vila Galvão", product: "Seguro de Vida + Residencial", rating: 5, date: "2026-03-30", text: "Procurava uma corretora séria, sem pressão de venda. A Patro explicou cobertura por cobertura, comparou 3 seguradoras de vida e me deixou decidir com calma. Atendimento de antigamente." },
      { author: "Família Oliveira", role: "Moradores — Vila Galvão", product: "Auto + Saúde Familiar", rating: 5, date: "2026-02-14", text: "Mudamos os 2 carros e o plano de saúde da família para a Patro no mesmo mês. Economia somada de R$ 4.200/ano comparado ao que pagávamos separado. Acompanhamento mensal por WhatsApp." },
    ],
    faqs: [
      { question: "Quanto custa seguro auto no Vila Galvão em 2026?", answer: "Vila Galvão tem perfil de risco médio em Guarulhos. O prêmio compreensivo costuma ficar entre R$ 2.500 e R$ 4.700/ano para carros nacionais. Moradores tradicionais com bônus 8–10 e garagem em casa fechada chegam a 30–40% de desconto comparado ao morador novo. Vale revisar a apólice a cada renovação porque o bônus se perde se ficar 2 anos sem seguro." },
      { question: "Atendem apartamentos novos na Av. Emílio Ribas?", answer: "Sim. Atendemos apartamentos novos e antigos em todo o eixo da Av. Emílio Ribas e ruas adjacentes. Seguro residencial para apartamento até R$ 600 mil com incêndio + roubo + danos elétricos + vendaval + RC familiar sai a partir de R$ 32/mês. Para imóveis acima de R$ 800 mil oferecemos seguro premium com cobertura para joias, obras de arte e equipamentos eletrônicos." },
      { question: "Seguro de vida vale a pena para aposentado em Vila Galvão?", answer: "Depende do objetivo. Para aposentados com patrimônio quitado, faz sentido seguro de vida com cobertura de doenças graves e despesas médicas, mais do que cobertura de morte. Para quem ainda tem dependentes ou financiamentos, o seguro de vida tradicional segue sendo crucial. Estudamos cada caso com consultor — sem pressão de venda — e fechamos só o que realmente protege a família." },
      { question: "Qual plano de saúde atende bem em Vila Galvão?", answer: "Vila Galvão tem boa cobertura de operadoras pela proximidade com a divisa SP/Guarulhos. Bradesco Saúde, SulAmérica, Amil e Notre Dame Intermédica oferecem rede ampla próxima ao bairro. Para famílias com filhos, Hapvida e Amil costumam ter os melhores preços; para quem prioriza rede premium (Albert Einstein, HCor), Bradesco TOP e SulAmérica Especial são as opções. Comparamos as 20+ operadoras parceiras em cada cotação." },
      { question: "Posso combinar auto + residencial + vida na mesma corretora?", answer: "Sim, e recomendamos. Concentrar as apólices na Patro permite descontos de combo (em média 8–15% sobre o total), uma única gestão de renovações e atendimento unificado em sinistro. Famílias do Vila Galvão que migram 3+ apólices para a Patro economizam, em média, R$ 1.800 a R$ 4.500/ano somando todos os produtos." },
      { question: "Vocês fazem atendimento presencial em Vila Galvão?", answer: "Fazemos. O escritório fica no Cidade Maia (Av. Salgado Filho, 2120), a poucos minutos do Vila Galvão. Para clientes de alto patrimônio ou casos complexos (vida com declaração de saúde, imóveis acima de R$ 1 milhão, frota), agendamos visita no endereço do cliente sem custo." },
    ],
  },
  {
    id: "aeroporto-guarulhos",
    nome: "Aeroporto de Guarulhos",
    foco: "Seguros B2B para Logística, Carga e Aviação",
    subtitulo: "Proteção para empresas que operam dentro e ao redor do GRU Airport",
    descricao: "O entorno do Aeroporto Internacional de Guarulhos (GRU/Cumbica) concentra transportadoras, operadores logísticos, despachantes aduaneiros, hotéis, locadoras e prestadores que atendem o maior hub aéreo da América Latina. A Patro Seguros é especialista em apólices B2B para esse ecossistema: RCTR-C e RCF-DC para transportadoras, seguro de carga aérea e doméstica, seguro de galpões e armazéns alfandegados, RC operacional para serviços em pista e proteção patrimonial para escritórios na Rod. Hélio Smidt. Atendimento técnico que entende SLAs do aeroporto e prazos de regulação compatíveis com a operação 24/7.",
    image: imgAeroporto,
    geo: { latitude: -23.4356, longitude: -46.4731 },
    testimonials: [
      { author: "Rodrigo M.", role: "Diretor de operações — Operador logístico GRU", product: "RCTR-C + RCF-DC + Carga aérea", rating: 5, date: "2026-05-22", text: "Operamos cargas perecíveis e farma dentro do TECA. A Patro estruturou apólice com cláusula de temperatura controlada e franquia escalonada por modal. Quando tivemos sinistro de avaria de paletes, a regulação saiu em 11 dias úteis." },
      { author: "Carolina F.", role: "Sócia — Transportadora rodoaérea Cumbica", product: "Frota + RC Operacional", rating: 5, date: "2026-04-08", text: "Trocamos de corretora depois de 8 anos. A Patro renegociou apólice da frota de 34 cavalos mecânicos e incluiu RC Operacional para serviços em pátio do GRU. Reduzimos R$ 71 mil/ano e ganhamos relatório mensal de sinistralidade." },
    ],
    faqs: [
      { question: "Quais seguros são exigidos para operar dentro do GRU Airport?", answer: "Empresas com acesso operacional ao GRU geralmente precisam comprovar RC Operacional (Responsabilidade Civil de operações em pátio/pista), RC Empregador (acidentes com colaboradores em área restrita) e, para transportadoras, RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Cargas) e RCF-DC (Desaparecimento de Carga). Valores mínimos de cobertura variam conforme contrato com a GRU Airport e a tomadora do serviço — costumam pedir R$ 1 a 5 milhões de LMI. Estruturamos o pacote completo com a documentação que a administração aeroportuária aceita." },
      { question: "Atendem seguro de carga aérea importada/exportada?", answer: "Sim. Operamos com apólices de transporte internacional (ITT — Institute Cargo Clauses A/B/C), carga aérea doméstica e armazenagem em terminal alfandegado (TECA). Para fluxo recorrente, fazemos apólice averbada com prêmio variável por embarque, reduzindo até 40% o custo comparado a apólices avulsas. Conseguimos cobertura para eletrônicos, farma, perecíveis e cargas de alto valor com 16+ seguradoras parceiras." },
      { question: "Quanto custa seguro empresarial para galpão logístico no entorno do aeroporto?", answer: "Galpões na região da Rod. Hélio Smidt, Av. Monteiro Lobato e bairros Cumbica/Bonsucesso/Aeroporto têm prêmio anual entre R$ 0,18 e R$ 0,55 por R$ 1.000 de capital segurado, dependendo de classe de ocupação, sistema de combate a incêndio (sprinkler/hidrantes), CFTV e brigada. Galpão de R$ 8 milhões com mercadorias de R$ 4 milhões fica entre R$ 18 mil e R$ 38 mil/ano para incêndio + roubo + RCG + lucros cessantes. Fazemos vistoria técnica gratuita antes da cotação." },
      { question: "Vocês atendem despachantes aduaneiros e comissárias?", answer: "Sim. Comissárias e despachantes operando no entorno do GRU precisam de RC Profissional (erro/omissão em classificação fiscal e processos), seguro de garantia aduaneira (em alguns casos), seguro empresarial do escritório e plano de saúde corporativo. Montamos pacote consolidado com gestão única e descontos por volume." },
      { question: "Como funciona seguro de RC Operacional para serviços em pista?", answer: "RC Operacional cobre danos causados pela sua empresa a aeronaves, equipamentos de solo (GSE), instalações do aeroporto e terceiros durante a operação. Indispensável para handling, abastecimento, limpeza de aeronaves, transporte de tripulação e manutenção de equipamentos. Trabalhamos com seguradoras especializadas em aviation (Allianz, AIG, Tokio, Zurich) e dimensionamos LMI conforme contrato com a tomadora (geralmente R$ 5 a 50 milhões)." },
      { question: "Atendem motoristas de aplicativo e taxistas que operam no GRU?", answer: "Sim. Motoristas de Uber, 99, taxistas e transfer privado que rodam intensamente entre o GRU e a Grande SP têm perfil de risco diferenciado — alta quilometragem, presença em área de risco e exposição em fila do desembarque. Trabalhamos com Porto Conecta, Mobi7 e seguradoras que oferecem cobertura específica para motorista de app, com franquia ajustada e assistência 24h compatível com a operação." },
    ],
  },
  {
    id: "cidade-industrial-satelite",
    nome: "Cidade Industrial Satélite",
    foco: "Seguros para Indústrias, Galpões e Frota Pesada",
    subtitulo: "Especialistas em seguros industriais para o segundo maior polo de SP",
    descricao: "A Cidade Industrial Satélite (CIS) e o entorno da Via Dutra/Rod. Pres. Dutra concentram indústrias químicas, metalúrgicas, distribuidoras farmacêuticas, autopeças e centros de distribuição que fazem de Guarulhos o segundo maior polo industrial de São Paulo. A Patro Seguros opera apólices técnicas para esse perfil: seguro patrimonial industrial com cobertura de equipamentos, seguro de máquinas e quebra de máquinas (BME), riscos operacionais, RC produto, RC poluição súbita, seguro de frota pesada e plano de saúde empresarial para o chão de fábrica. Trabalhamos com seguradoras especializadas (Allianz, Tokio Marine, Zurich, AIG) e fazemos vistoria técnica conjunta com engenharia de risco.",
    image: imgCidadeIndustrial,
    geo: { latitude: -23.4205, longitude: -46.4925 },
    testimonials: [
      { author: "Engº. Fernando T.", role: "Gerente industrial — Indústria química CIS", product: "Patrimonial + BME + RC Produto", rating: 5, date: "2026-05-14", text: "Apólice de R$ 42 milhões em ativos + estoque químico. A Patro coordenou vistoria com engenharia da seguradora, ajustou tarifa de classe de ocupação e baixou o prêmio em 22% mantendo cobertura ampliada para danos elétricos e BME." },
      { author: "Maurício A.", role: "Diretor — Distribuidora farmacêutica", product: "Frota pesada + Carga", rating: 5, date: "2026-03-19", text: "Frota de 18 caminhões refrigerados + cargas farmacêuticas controladas. A Patro estruturou apólice integrada com cláusula de temperatura, rastreamento e escolta. Sinistro de avaria foi liquidado em 9 dias úteis. Atendimento técnico de outro nível." },
    ],
    faqs: [
      { question: "Quanto custa seguro patrimonial para uma indústria na CIS?", answer: "Indústrias na Cidade Industrial Satélite têm prêmio anual entre R$ 0,25 e R$ 1,20 por R$ 1.000 de capital segurado, dependendo de classe de ocupação (química, metalúrgica, plástica, alimentícia), sistema de combate a incêndio, brigada própria, distância de hidrantes e histórico de sinistros. Indústria de R$ 25 milhões em ativos fica entre R$ 42 mil e R$ 180 mil/ano para incêndio + roubo + RCG + lucros cessantes + BME. Fazemos vistoria de engenharia gratuita antes da cotação para reduzir tarifa." },
      { question: "Vocês trabalham com seguro de quebra de máquinas (BME)?", answer: "Sim. BME (Breakdown of Machinery and Equipment) cobre danos súbitos e imprevistos em máquinas e equipamentos por falha mecânica, elétrica ou eletrônica. Indispensável para linhas de produção, geradores, prensas, injetoras, equipamentos de frio, transformadores e CNC. Trabalhamos com Allianz, Tokio Marine, HDI e Zurich, com franquias a partir de 10% do prejuízo ou R$ 25 mil (o que for maior)." },
      { question: "Atendem RC Produto para indústrias da CIS?", answer: "Sim. RC Produto cobre danos causados a terceiros por produtos fabricados pela sua indústria após a entrega — defeitos, contaminação, falhas. Crucial para químicas, farmacêuticas, alimentícias e autopeças. LMI usual entre R$ 1 e R$ 20 milhões, com cláusulas adicionais de recall, danos morais e perdas financeiras puras. Estruturamos com seguradoras especializadas em D&O e RC Produto." },
      { question: "Como funciona o seguro de frota pesada para CDs e distribuidoras?", answer: "Frotas de caminhões e cavalos mecânicos com 5+ veículos têm apólice coletiva com prêmio reduzido (3 a 8% sobre Tabela FIPE/ano) versus apólice individual. Combinamos casco + RCF-V (responsabilidade civil para veículos) + APP (acidentes pessoais para passageiros) + assistência 24h nacional. Para distribuidoras farma, agregamos RCTR-C, RCF-DC e cláusulas de temperatura controlada e roubo agravado." },
      { question: "Plano de saúde para chão de fábrica é viável?", answer: "Sim, e é cada vez mais comum como ferramenta de retenção. Para indústrias com 30+ colaboradores oferecemos planos coletivos empresariais com Hapvida NotreDame, Unimed, Amil, SulAmérica e Bradesco. Mensalidade média de R$ 230 a R$ 480 por colaborador (faixa etária 18–58, padrão enfermaria ou apartamento). Coparticipação reduz custo da empresa em até 25%." },
      { question: "Atendem indústrias com risco ambiental?", answer: "Sim. Indústrias com risco de poluição (químicas, galvânicas, tratamento de efluentes) precisam de RC Poluição Súbita (cobertura padrão das apólices empresariais limitada) e idealmente Seguro Ambiental específico (EIA — Environmental Impairment Liability). Trabalhamos com AIG, Chubb e Zurich em apólices ambientais com LMI de R$ 5 a R$ 100 milhões, cobrindo contaminação súbita, gradual, custos de descontaminação e defesa em ações ambientais." },
    ],
  },
  {
    id: "jardim-cumbica",
    nome: "Jardim Cumbica",
    foco: "Auto, Moto e Saúde para Trabalhadores do Aeroporto",
    subtitulo: "Proteção acessível para quem mora perto do GRU",
    descricao: "O Jardim Cumbica é o bairro residencial dos trabalhadores do Aeroporto de Guarulhos, do polo logístico e das indústrias do entorno. Concentra famílias, motoristas de aplicativo, motoboys, comissários de bordo, mecânicos e equipes de handling que precisam de seguro auto e seguro moto bem precificados (a região tem índice de roubo/furto elevado), planos de saúde acessíveis e seguro residencial enxuto. A Patro Seguros entende esse perfil de cliente trabalhador: comparamos as 16+ seguradoras parceiras para entregar o melhor preço com proteção real, sem inflar coberturas que você não precisa.",
    image: imgJardimCumbica,
    geo: { latitude: -23.4514, longitude: -46.4561 },
    testimonials: [
      { author: "Wesley P.", role: "Motorista de aplicativo — Jardim Cumbica", product: "Seguro Auto + Assistência 24h", rating: 5, date: "2026-04-26", text: "Rodava sem seguro porque achava caro. A Patro estruturou apólice com franquia adequada para meu HB20 considerando que rodo 5 mil km/mês no GRU. R$ 2.480/ano com rastreador. Quando bati em um Uber, indenização e oficina foram resolvidos em 7 dias." },
      { author: "Cláudia R.", role: "Comissária de bordo — Jardim Cumbica", product: "Plano de Saúde + Vida", rating: 5, date: "2026-02-28", text: "Comparei plano da minha empresa com o que a Patro montou (Hapvida + seguro de vida individual). Saiu R$ 320/mês mais barato com a mesma rede que eu usava. Atendimento por WhatsApp resolve qualquer dúvida em minutos." },
    ],
    faqs: [
      { question: "Quanto custa seguro auto no Jardim Cumbica em 2026?", answer: "Jardim Cumbica tem perfil de risco médio-alto pela proximidade com o aeroporto e estatísticas de roubo na região. O prêmio compreensivo costuma ficar entre R$ 2.800 e R$ 5.400/ano para carros nacionais (HB20, Onix, Mobi, Argo). Carros mais visados (Civic, Corolla, Compass) podem ultrapassar R$ 6.200/ano. Com rastreador e garagem em casa, o desconto chega a 25%. Comparamos sempre 3+ seguradoras antes de fechar." },
      { question: "Atendem motorista de aplicativo (Uber/99) com cobertura específica?", answer: "Sim. Para motoristas que rodam intensamente no GRU oferecemos Porto Conecta, HDI Motorista App e Tokio Mobi — apólices com cobertura EAR (Extensão de Atividade Remunerada) já embutida, franquia ajustada para alta quilometragem e assistência 24h compatível com a operação. Preço a partir de R$ 2.350/ano para HB20 modelo 2022. Sem essa cobertura, sinistro em corrida pode ser negado." },
      { question: "Seguro moto no Jardim Cumbica é caro?", answer: "Motos com até 300cc no Jardim Cumbica têm prêmio entre R$ 980 e R$ 1.850/ano para roubo/furto + RCF + assistência. Modelos mais visados (Honda CG 160, Fan, Pop, Biz) ficam na faixa intermediária. Para motoboys que trabalham com entregas, a cobertura EAR é obrigatória — sem ela, sinistro em trabalho é negado. Trabalhamos com Porto, HDI, Mapfre, Tokio e Bradesco para moto." },
      { question: "Qual plano de saúde tem melhor rede no Jardim Cumbica?", answer: "Hapvida NotreDame Intermédica é a operadora com maior rede própria na região (Hospital Stella Maris fica a poucos minutos). SulAmérica, Bradesco Saúde e Amil também atendem com rede credenciada local. Para famílias, planos coletivos empresariais via MEI ou adesão ficam entre R$ 230 e R$ 450/mês por vida. Comparamos as 20+ operadoras parceiras para seu perfil específico." },
      { question: "Posso contratar plano de saúde sem CNPJ morando no Jardim Cumbica?", answer: "Sim. Planos individuais e familiares são mais caros que coletivos, mas existem opções acessíveis: Hapvida individual a partir de R$ 189/mês (faixa 0–18), Notre Dame Intermédica e Amil One Saúde também têm planos individuais. Para reduzir custo, abrimos MEI gratuito (atividade compatível com seu trabalho) e enquadramos no plano coletivo empresarial — economia média de 35% versus individual." },
      { question: "Vocês atendem presencial ou só por WhatsApp?", answer: "Atendemos das duas formas. Para quem prefere presencial, o escritório fica no Cidade Maia (Av. Salgado Filho, 2120) — fácil acesso pela Av. Monteiro Lobato e Av. Otávio Braga de Mesquita. Para quem tem rotina apertada (motoristas, comissários, motoboys), resolvemos 100% por WhatsApp, com envio de proposta, contrato e boleto digital. Apólice ativada em 24h." },
    ],
  },
];