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
}

export interface BairroTestimonial {
  author: string;
  role: string;
  product: string;
  rating: 5 | 4;
  text: string;
  date: string; // YYYY-MM-DD
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
    image: imgParaventi,
    faqs: [
      ...generateLocalFAQs({ slug: "auto-pimentas", neighborhood: "Pimentas", product: "auto", riskLevel: "alto", priceRange: "R$ 3.200 a R$ 6.400/ano", reference: "próximo à Av. Pimentas e Estr. Pres. Juscelino" }),
      ...generateLocalFAQs({ slug: "saude-pimentas", neighborhood: "Pimentas", product: "saude", priceRange: "planos familiares a partir de R$ 199/vida", reference: "com rede próxima ao Hospital Municipal de Pimentas" }),
      ...generateLocalFAQs({ slug: "vida-pimentas", neighborhood: "Pimentas", product: "vida", priceRange: "a partir de R$ 35/mês", reference: "para proteção familiar e empréstimos" }),
      ...generateLocalFAQs({ slug: "residencial-pimentas", neighborhood: "Pimentas", product: "residencial", riskLevel: "alto", priceRange: "a partir de R$ 32/mês", reference: "para casas e sobrados da região" }),
    ],
  },
  {
    id: "taboao",
    nome: "Taboão",
    foco: "Auto, Residencial e Pequenos Negócios",
    subtitulo: "Seguros para a região conectada de Guarulhos",
    descricao: "O Taboão é uma região forte de acesso para a Dutra e Fernão Dias, o que aumenta o fluxo de veículos e o risco em rodovia. Combina residências, comércio local e pequenos prestadores. A Patro Seguros atende o Taboão com seguro auto que considera o trajeto, seguro residencial para casas e apartamentos e seguro empresarial sob medida para o comércio do bairro.",
    image: imgBonsucesso,
    faqs: [
      ...generateLocalFAQs({ slug: "auto-taboao", neighborhood: "Taboão", product: "auto", riskLevel: "médio-alto", priceRange: "R$ 2.900 a R$ 5.600/ano", reference: "com acesso à Rod. Pres. Dutra e Fernão Dias" }),
      ...generateLocalFAQs({ slug: "residencial-taboao", neighborhood: "Taboão", product: "residencial", riskLevel: "médio", priceRange: "a partir de R$ 30/mês", reference: "para casas e edifícios da região" }),
      ...generateLocalFAQs({ slug: "empresarial-taboao", neighborhood: "Taboão", product: "empresarial", riskLevel: "médio", priceRange: "a partir de R$ 85/mês", reference: "para o comércio local e prestadores" }),
      ...generateLocalFAQs({ slug: "vida-taboao", neighborhood: "Taboão", product: "vida", priceRange: "a partir de R$ 38/mês", reference: "para famílias e empreendedores locais" }),
    ],
  },
  {
    id: "vila-galvao",
    nome: "Vila Galvão",
    foco: "Residencial, Auto e Vida",
    subtitulo: "Seguros para um dos bairros mais tradicionais de Guarulhos",
    descricao: "Vila Galvão combina tradição residencial, comércio consolidado na Av. Emílio Ribas e proximidade com a divisa de São Paulo. É um bairro de moradores estabelecidos, com perfil familiar e demanda por seguro residencial completo, seguro auto, seguro de vida e plano de saúde. A Patro Seguros oferece pacote consultivo para quem busca proteção patrimonial sólida no Vila Galvão.",
    image: imgVilaAugusta,
    faqs: [
      ...generateLocalFAQs({ slug: "auto-vila-galvao", neighborhood: "Vila Galvão", product: "auto", riskLevel: "médio", priceRange: "R$ 2.500 a R$ 4.700/ano", reference: "próximo à Av. Emílio Ribas" }),
      ...generateLocalFAQs({ slug: "residencial-vila-galvao", neighborhood: "Vila Galvão", product: "residencial", riskLevel: "baixo", priceRange: "a partir de R$ 30/mês", reference: "para casas e apartamentos do bairro" }),
      ...generateLocalFAQs({ slug: "vida-vila-galvao", neighborhood: "Vila Galvão", product: "vida", priceRange: "a partir de R$ 40/mês", reference: "para moradores tradicionais da região" }),
      ...generateLocalFAQs({ slug: "saude-vila-galvao", neighborhood: "Vila Galvão", product: "saude", priceRange: "planos familiares e individuais", reference: "com rede próxima à divisa SP/Guarulhos" }),
    ],
  },
];