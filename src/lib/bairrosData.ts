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
      { question: "Qual o melhor plano de saúde empresarial para PMEs do Macedo?", answer: "A Patro trabalha com as principais operadoras (Amil, Bradesco Saúde, SulAmérica, etc.) e encontra o plano ideal para PMEs do Macedo, considerando o número de colaboradores e o orçamento da empresa." },
      { question: "Seguro empresarial para pequenos negócios no Macedo vale a pena?", answer: "Sim! Protege seu patrimônio contra incêndio, roubo e responsabilidade civil. Para PMEs do Macedo, oferecemos planos acessíveis e personalizados." },
      { question: "A Patro faz seguro de vida em grupo para empresas do Macedo?", answer: "Sim! O seguro de vida em grupo é um benefício valorizado pelos colaboradores e pode ser contratado a custos acessíveis para empresas de todos os portes no Macedo." },
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
      { question: "Seguro residencial em Gopouva cobre casas antigas?", answer: "Sim! O seguro residencial cobre tanto casas quanto apartamentos, independentemente da idade do imóvel. Para casas mais antigas em Gopouva, recomendamos coberturas extras para danos elétricos e hidráulicos." },
      { question: "Plano de saúde individual em Gopouva, onde contratar?", answer: "A Patro Seguros oferece planos de saúde individuais e familiares das melhores operadoras, com atendimento próximo ao Gopouva. Compare opções e valores conosco." },
      { question: "A Patro Seguros é de confiança?", answer: "Sim! Somos uma corretora registrada na SUSEP com nota 4.9 no Google e centenas de avaliações positivas. Atendemos Gopouva e toda Guarulhos com transparência e agilidade." },
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
      { question: "Quais seguros para novas empresas em Bonsucesso?", answer: "Para novos negócios em Bonsucesso, recomendamos seguro empresarial com cobertura contra incêndio e roubo, RC, e seguro de vida para sócios. A região em expansão demanda proteção desde o primeiro dia." },
      { question: "Seguro auto em Bonsucesso é caro?", answer: "Os valores dependem do veículo e perfil do motorista. A Patro compara cotações entre diversas seguradoras para encontrar o melhor preço para moradores de Bonsucesso." },
      { question: "A Patro cobre seguro para lojas no Shopping Bonsucesso?", answer: "Sim! Oferecemos seguro empresarial específico para lojas em shopping, com cobertura contra incêndio, roubo, danos a terceiros e lucros cessantes." },
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
      { question: "Seguro auto barato no Paraventi, como encontrar?", answer: "A Patro Seguros compara cotações entre diversas seguradoras para encontrar o seguro auto mais acessível para moradores do Paraventi, sem abrir mão da qualidade de cobertura." },
      { question: "Plano de saúde individual acessível no Paraventi existe?", answer: "Sim! Trabalhamos com operadoras que oferecem planos individuais a partir de valores acessíveis, com boa rede de atendimento na região do Paraventi e Guarulhos." },
      { question: "Como contratar seguro pelo WhatsApp no Paraventi?", answer: "Basta enviar uma mensagem para nosso WhatsApp (11) 5199-7500 informando seu interesse. Respondemos em até 2 horas com uma cotação personalizada para moradores do Paraventi." },
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
      { question: "Seguro de condomínio no Continental é obrigatório?", answer: "Sim! O seguro de condomínio é obrigatório por lei (Lei 4.591/64). No Continental, com alta concentração de edifícios, a Patro ajuda síndicos a encontrar a melhor cobertura com preço justo." },
      { question: "Seguro residencial para apartamento no Continental, quanto custa?", answer: "O seguro residencial para apartamentos costuma ter valores acessíveis. No Continental, cotamos entre diversas seguradoras para encontrar o melhor preço com cobertura completa." },
      { question: "A Patro atende todo o Continental de Guarulhos?", answer: "Sim! Atendemos todas as regiões do Continental com agilidade via WhatsApp e presencialmente na nossa sede na Av. Salgado Filho, com resposta em até 2 horas." },
    ],
  },
];