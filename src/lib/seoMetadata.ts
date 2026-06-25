import { seoLocalPages } from "@/data/seoLocalAutoPages";
import { seoLocalSaudePages } from "@/data/seoLocalSaudePages";
import { seoModeloAutoPages } from "@/data/seoModelosAutoPages";
import { articles as blogArticles } from "@/lib/blogData";
import { landingPagesData } from "@/data/landingPages";
import { servicePagesContent } from "@/data/seoServiceContent";

export interface Metadata {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  ogUrl: string;
  ogType: "website" | "article";
  schema?: any;
  detailedDescription?: string;
  faqs?: { question: string; answer: string }[];
  whoNeeds?: string[];
  whyPatro?: string[];
}

const DOMAIN = "https://www.patroseguros.com.br";

/**
 * Premium metadata para rotas restauradas na Fase 1.
 * Title ≤65, description ≤160, schema dedicado (Service/FAQPage/CollectionPage).
 * Fica antes do fallback genérico para evitar títulos do tipo "Seguro Rc Medicos | Patro".
 */
interface PremiumMeta {
  title: string;
  description: string;
  h1: string;
  serviceType?: string;
  faqs?: { question: string; answer: string }[];
  collection?: boolean;
}

const premiumPages: Record<string, PremiumMeta> = {
  // ===== Responsabilidade Civil Profissional (foco do pedido) =====
  "/seguro-rc-medicos": {
    title: "Seguro RC Médicos | Erro Médico e Processos | Patro",
    description: "Seguro de Responsabilidade Civil para médicos: cobertura para erro médico, processos judiciais, custos de defesa e danos a pacientes. Cotação em 24h.",
    h1: "Seguro RC Profissional para Médicos",
    serviceType: "Seguro de Responsabilidade Civil Profissional Médica",
    faqs: [
      { question: "O que cobre o seguro RC para médicos?", answer: "Cobre indenizações por erro médico, custos de defesa judicial, perícias e danos morais/materiais causados a pacientes no exercício da profissão." },
      { question: "Residentes e plantonistas têm cobertura?", answer: "Sim. A apólice pode ser estruturada por CPF (autônomo) ou por instituição, contemplando residentes, plantonistas e cooperativas médicas." },
      { question: "Cobre processos por atendimento via telemedicina?", answer: "Sim, desde que a modalidade esteja declarada na proposta. A Patro estrutura coberturas específicas para teleconsulta conforme a CFM 2.314/2022." },
    ],
  },
  "/seguro-rc-dentistas": {
    title: "Seguro RC Dentistas e Cirurgiões-Dentistas | Patro",
    description: "Responsabilidade Civil para cirurgiões-dentistas: cobertura para erro odontológico, implantes, ortodontia, estética e defesa em processos no CRO e judicial.",
    h1: "Seguro RC Profissional para Dentistas",
    serviceType: "Seguro de Responsabilidade Civil Profissional Odontológica",
    faqs: [
      { question: "O seguro cobre tratamentos estéticos e implantes?", answer: "Sim. A cobertura contempla implantodontia, ortodontia, harmonização orofacial e procedimentos estéticos, desde que declarados na proposta." },
      { question: "Cobre processos no CRO?", answer: "Sim. Inclui custos de defesa em processos éticos no Conselho Regional de Odontologia e ações cíveis de pacientes." },
      { question: "Vale para clínica com vários dentistas?", answer: "Sim. É possível contratar apólice PJ para a clínica + apólices individuais por CRO dos profissionais." },
    ],
  },
  "/seguro-rc-advogados": {
    title: "Seguro RC Advogados | Erro Profissional e OAB | Patro",
    description: "Seguro de Responsabilidade Civil para advogados e escritórios: cobertura para perda de prazo, erro profissional, processos disciplinares na OAB e defesa judicial.",
    h1: "Seguro RC Profissional para Advogados",
    serviceType: "Seguro de Responsabilidade Civil Profissional Advocatícia",
    faqs: [
      { question: "O seguro cobre perda de prazo processual?", answer: "Sim. A perda de prazo é o sinistro mais comum em RC Advogados e está coberta, incluindo indenização ao cliente e custos de defesa." },
      { question: "Vale para escritório de advocacia (PJ)?", answer: "Sim. A apólice pode ser contratada por escritório/sociedade, cobrindo todos os advogados associados sob o CNPJ." },
      { question: "Cobre processos disciplinares na OAB?", answer: "Sim, inclui custos de defesa em representações no Tribunal de Ética da OAB e ações cíveis movidas por clientes." },
    ],
  },

  // ===== Galpões e Patrimônio =====
  "/seguro-galpao": {
    title: "Seguro Galpão Industrial e Logístico | Patro Seguros",
    description: "Seguro para galpões em Guarulhos, Cumbica e todo o Brasil: incêndio, roubo, vendaval, lucros cessantes e RC operações. Apólices a partir de R$ 2M até R$ 500M.",
    h1: "Seguro Galpão Industrial e Logístico",
    serviceType: "Seguro Patrimonial para Galpões",
  },
  "/seguro-galpoes-industriais": {
    title: "Seguro Galpões Industriais | Riscos Patrimoniais | Patro",
    description: "Cobertura completa para galpões industriais: incêndio, danos elétricos, vendaval, alagamento, roubo de mercadoria e lucros cessantes. Especialista em Cumbica/SP.",
    h1: "Seguro para Galpões Industriais",
    serviceType: "Seguro de Riscos Patrimoniais Industriais",
  },
  "/seguro-armazenagem": {
    title: "Seguro Armazenagem e Estoques | Operador Logístico",
    description: "Seguro para operadores logísticos e armazéns gerais: cobertura para mercadorias de terceiros, RC depositário, incêndio e desvio de carga estática.",
    h1: "Seguro de Armazenagem e Operação Logística",
    serviceType: "Seguro para Operador Logístico",
  },
  "/seguro-condominio-empresarial": {
    title: "Seguro Condomínio Empresarial e Comercial | Patro",
    description: "Seguro obrigatório para condomínios empresariais: incêndio, RC síndico, danos a terceiros, equipamentos e áreas comuns. Cotação com 8+ seguradoras.",
    h1: "Seguro para Condomínio Empresarial",
    serviceType: "Seguro de Condomínio Comercial",
  },
  "/seguro-condominio-residencial": {
    title: "Seguro Condomínio Residencial Obrigatório | Patro",
    description: "Seguro condomínio residencial conforme Lei 4.591/64 e Código Civil: incêndio, RC síndico, danos elétricos, vendaval e equipamentos. Cotação rápida.",
    h1: "Seguro Obrigatório para Condomínio Residencial",
    serviceType: "Seguro de Condomínio Residencial",
  },

  // ===== Agro =====
  "/seguro-trator-agricola": {
    title: "Seguro Trator Agrícola | Cobertura Nacional | Patro",
    description: "Seguro para tratores agrícolas John Deere, Massey, New Holland, Valtra e Case: roubo, colisão, tombamento, incêndio e RC. Atendimento em todo o Brasil.",
    h1: "Seguro para Tratores Agrícolas",
    serviceType: "Seguro de Máquinas Agrícolas",
  },
  "/seguro-colheitadeira-graos": {
    title: "Seguro Colheitadeira de Grãos | Soja, Milho e Trigo",
    description: "Seguro para colheitadeiras de soja, milho, trigo e sorgo: cobertura para incêndio na lavoura, tombamento, colisão e quebra de plataforma. Cotação nacional.",
    h1: "Seguro para Colheitadeira de Grãos",
    serviceType: "Seguro de Colheitadeira",
  },
  "/seguro-pulverizador-agricola": {
    title: "Seguro Pulverizador Agrícola Autopropelido | Patro",
    description: "Seguro para pulverizadores autopropelidos Jacto, John Deere, Stara e Case: cobertura para tombamento, colisão, incêndio e deriva. Atendimento nacional.",
    h1: "Seguro para Pulverizador Agrícola",
    serviceType: "Seguro de Pulverizador Autopropelido",
  },
  "/seguro-silo-agricola": {
    title: "Seguro Silo e Armazenagem de Grãos | Patro",
    description: "Seguro para silos, armazéns e secadores de grãos: cobertura para incêndio, explosão, combustão espontânea, vendaval e perda de produto armazenado.",
    h1: "Seguro para Silos e Armazenagem de Grãos",
    serviceType: "Seguro de Silos e Armazenagem Agrícola",
  },
  "/seguro-equipamentos-agricolas": {
    title: "Seguro Equipamentos Agrícolas | Implementos | Patro",
    description: "Seguro para implementos agrícolas, plantadeiras, plataformas, grades e arados. Cobertura nacional para máquinas paradas e em operação na lavoura.",
    h1: "Seguro para Equipamentos e Implementos Agrícolas",
    serviceType: "Seguro de Equipamentos Agrícolas",
  },

  // ===== Consórcio =====
  "/consorcio-carro": {
    title: "Consórcio de Carro | Sem Juros, Lance e Parcelas",
    description: "Consórcio de carro 0km ou seminovo sem juros: parcelas a partir de R$ 350, contemplação por sorteio ou lance. Simulação com administradoras autorizadas.",
    h1: "Consórcio de Carro",
    serviceType: "Consórcio de Veículos Leves",
  },
  "/consorcio-imoveis": {
    title: "Consórcio de Imóveis | Casa, Apto e Terreno",
    description: "Consórcio imobiliário para compra, construção, reforma ou quitação de financiamento. Crédito de R$ 100k a R$ 2M sem juros, com administradoras Top 5.",
    h1: "Consórcio de Imóveis",
    serviceType: "Consórcio Imobiliário",
  },
  "/consorcio-veiculos-pesados": {
    title: "Consórcio Caminhão e Veículos Pesados | Patro",
    description: "Consórcio para caminhão, carreta, ônibus, micro-ônibus e implementos rodoviários. Crédito sem juros para frotistas e transportadores autônomos.",
    h1: "Consórcio de Veículos Pesados e Caminhões",
    serviceType: "Consórcio de Veículos Pesados",
  },

  // ===== Atendimento / Outros =====
  "/central-de-sinistro": {
    title: "Central de Sinistros | Aviso 24h | Patro Seguros",
    description: "Acionou um sinistro? Comunique online ou via WhatsApp (11) 5199-7500. Equipe Patro acompanha vistoria, regulação e indenização até a quitação.",
    h1: "Central de Sinistros Patro Seguros",
    serviceType: "Atendimento e Regulação de Sinistros",
  },
  "/seguro-petshop": {
    title: "Seguro Petshop | Clínicas e Banho & Tosa | Patro",
    description: "Seguro empresarial para petshops, clínicas veterinárias e banho & tosa: incêndio, roubo, equipamentos, RC custódia de animais e perda de receita.",
    h1: "Seguro para Petshop e Clínicas Veterinárias",
    serviceType: "Seguro Empresarial para Petshop",
  },
  "/seguro-motorista-app": {
    title: "Seguro Motorista de App | Uber, 99 e iFood | Patro",
    description: "Seguro com cobertura específica para motoristas de aplicativo (Uber, 99, InDriver) e entregadores: terceiros, passageiros, APP e furto qualificado.",
    h1: "Seguro para Motorista de Aplicativo",
    serviceType: "Seguro Auto para Motorista de App",
  },

  // ===== Hubs (CollectionPage) =====
  "/hub-rc": {
    title: "Seguros de Responsabilidade Civil (RC) | Patro",
    description: "Hub de seguros RC: profissional liberal, empresarial, D&O, eventos, condomínio, construção, transportador. Compare coberturas e cote em 24h.",
    h1: "Hub de Seguros de Responsabilidade Civil",
    collection: true,
  },
  "/hub-empresarial": {
    title: "Seguros Empresariais | PME e Grandes Riscos | Patro",
    description: "Hub de seguros empresariais: galpão, escritório, frota, RC, D&O, cyber, lucros cessantes e benefícios. Mais de 500 empresas atendidas em Guarulhos/SP.",
    h1: "Hub de Seguros Empresariais",
    collection: true,
  },
  "/hub-patrimonio": {
    title: "Seguros Patrimoniais | Galpão, Casa e Condomínio",
    description: "Hub de seguros patrimoniais: residencial, condomínio, galpão, armazém, equipamentos e obras civis. Cobertura para todos os portes em todo o Brasil.",
    h1: "Hub de Seguros Patrimoniais",
    collection: true,
  },
  "/hub-veiculos": {
    title: "Seguros de Veículos | Auto, Moto, Frota e Pesados",
    description: "Hub de seguros para veículos: auto, moto, caminhão, frota, motorista de app, micro-ônibus e implementos. Compare 12+ seguradoras em uma cotação.",
    h1: "Hub de Seguros de Veículos",
    collection: true,
  },
  "/hub-vida-saude": {
    title: "Seguros de Vida e Saúde | Planos e Previdência",
    description: "Hub de vida, saúde e previdência: vida individual, vida empresarial, plano de saúde PME, odontológico e previdência privada (PGBL/VGBL).",
    h1: "Hub de Seguros de Vida, Saúde e Previdência",
    collection: true,
  },

  // ===== Patro Private (camada premium) =====
  "/patro-private": {
    title: "Patro Private | Seguros Premium em Guarulhos",
    description: "Consultoria em seguros premium para veículos de alto valor, residências, empresários e proteção patrimonial em Guarulhos.",
    h1: "Patro Private: Proteção Patrimonial e Seguros Premium",
    serviceType: "Consultoria em Seguros Premium e Proteção Patrimonial",
    faqs: [
      { question: "O que é a Patro Private?", answer: "É uma vertical consultiva da Patro Seguros dedicada a clientes com patrimônio relevante: análise técnica, comparação entre seguradoras e estrutura de proteção sob medida." },
      { question: "Atende clientes fora de Guarulhos?", answer: "Sim. A sede é em Guarulhos/SP, mas o atendimento Patro Private cobre todo o Brasil para clientes premium." },
      { question: "É preciso ter patrimônio mínimo?", answer: "Não há um valor mínimo declarado. A análise é apropriada para quem busca cobertura técnica e atendimento consultivo, não decisão exclusiva por preço." },
    ],
  },
  "/seguro-auto-premium-guarulhos": {
    title: "Seguro Auto Premium em Guarulhos | Patro",
    description: "Seguro para veículos premium, importados e blindados em Guarulhos. Compare coberturas completas com atendimento consultivo.",
    h1: "Seguro Auto Premium em Guarulhos",
    serviceType: "Seguro Auto para Veículos Premium",
    faqs: [
      { question: "O seguro auto premium é muito mais caro?", answer: "Não necessariamente. O prêmio depende do perfil do condutor, CEP, uso e cobertura. Ajustar cláusulas (em vez de comprar a apólice mais cara) costuma gerar proteção melhor com prêmio equivalente ao convencional." },
      { question: "Vocês trabalham com oficinas autorizadas das montadoras premium?", answer: "Sim. Validamos com cada seguradora a rede referenciada para a marca específica do seu veículo antes de fechar a apólice." },
      { question: "Posso ter cobertura para uso eventual de outro condutor?", answer: "Sim. Pode ser estruturada com condutores nomeados ou cobertura ampla para eventuais." },
    ],
  },
  "/seguro-carros-luxo-guarulhos": {
    title: "Seguro Para Carros de Luxo em Guarulhos | Patro",
    description: "Proteção para Porsche, BMW, Mercedes, Audi, Volvo, Land Rover e veículos de alto valor em Guarulhos.",
    h1: "Seguro para Carros de Luxo em Guarulhos",
    serviceType: "Seguro para Carros de Luxo",
    faqs: [
      { question: "Vocês trabalham com Porsche e Range Rover?", answer: "Sim. Estruturamos apólices para essas e outras marcas premium com seguradoras que possuem rede e regulação compatível." },
      { question: "É possível segurar veículo importado sem FIPE clara?", answer: "Sim, por meio de apólice por valor determinado, com laudo técnico e documentação adequada." },
    ],
  },
  "/seguro-residencial-alto-padrao-guarulhos": {
    title: "Seguro Residencial Alto Padrão | Patro",
    description: "Seguro para casas, apartamentos e condomínios de alto padrão em Guarulhos, com cobertura sob medida e assistência.",
    h1: "Seguro Residencial Alto Padrão em Guarulhos",
    serviceType: "Seguro Residencial para Imóveis de Alto Padrão",
    faqs: [
      { question: "Casa em condomínio fechado precisa de seguro próprio?", answer: "Sim. O seguro do condomínio cobre áreas comuns e estrutura coletiva, não o conteúdo nem a estrutura privativa da sua residência." },
      { question: "Posso incluir obras de arte e joias?", answer: "Sim, mediante laudo e declaração de itens, com cobertura específica e franquia adequada." },
    ],
  },
  "/seguros-para-empresarios-guarulhos": {
    title: "Seguros Para Empresários em Guarulhos | Patro",
    description: "Proteção para empresários, sócios e executivos: vida, saúde, D&O, RC, cyber, frota, patrimônio e sucessão.",
    h1: "Seguros para Empresários em Guarulhos",
    serviceType: "Consultoria em Seguros para Empresários e Executivos",
    faqs: [
      { question: "Quando D&O passa a fazer sentido?", answer: "Geralmente quando a empresa cresce e o sócio ou administrador toma decisões com impacto financeiro relevante para terceiros, conselheiros ou investidores. Avaliamos caso a caso." },
      { question: "Vocês atendem indústrias em Cumbica?", answer: "Sim. Temos atuação consolidada em galpões e indústrias na região de Cumbica e arredores do Aeroporto de Guarulhos." },
    ],
  },
  "/seguro-carro-blindado-guarulhos": {
    title: "Seguro Para Carro Blindado em Guarulhos | Patro",
    description: "Seguro para veículos blindados em Guarulhos, com análise de perfil, cobertura completa e seguradoras especializadas.",
    h1: "Seguro para Carro Blindado em Guarulhos",
    serviceType: "Seguro para Veículos Blindados",
    faqs: [
      { question: "Qualquer seguradora aceita blindado?", answer: "Não. Algumas seguradoras restringem por região, perfil ou modelo. A Patro consulta as que efetivamente operam essa categoria." },
      { question: "Posso blindar um carro já segurado?", answer: "Sim, mas é necessário comunicar a seguradora, apresentar nota fiscal da blindagem e atualizar a soma segurada e o sublimite de vidros." },
    ],
  },
  "/protecao-patrimonial-familiar-guarulhos": {
    title: "Proteção Patrimonial Familiar | Patro",
    description: "Planejamento de seguros para proteger família, patrimônio, imóveis, veículos, vida e continuidade financeira.",
    h1: "Proteção Patrimonial Familiar em Guarulhos",
    serviceType: "Planejamento Integrado de Proteção Patrimonial Familiar",
    faqs: [
      { question: "Como vocês calculam a soma segurada do seguro de vida?", answer: "A partir de variáveis: dívidas, padrão de vida, tempo de dependência dos filhos, renda do cônjuge e objetivos sucessórios. É uma análise consultiva." },
      { question: "Com que frequência a apólice deve ser revisada?", answer: "Recomendamos revisão anual ou sempre que houver evento relevante: novo filho, mudança de imóvel, novo veículo, mudança de cargo ou de renda." },
    ],
  },
};

function buildPremiumMetadata(cleanPath: string, p: PremiumMeta): Metadata {
  const schema = p.collection
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": p.h1,
        "description": p.description,
        "url": `${DOMAIN}${cleanPath}`,
        "isPartOf": { "@type": "WebSite", "name": "Patro Seguros", "url": DOMAIN },
        "provider": { "@type": "InsuranceAgency", "name": "Patro Seguros", "url": DOMAIN, "image": `${DOMAIN}/images/logo-full.webp`, "priceRange": "$$" },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": p.h1,
        "serviceType": p.serviceType || p.h1,
        "description": p.description,
        "url": `${DOMAIN}${cleanPath}`,
        "provider": {
          "@type": "InsuranceAgency",
          "name": "Patro Seguros",
          "url": DOMAIN,
          "telephone": "+55-11-5199-7500",
          "image": `${DOMAIN}/images/logo-full.webp`,
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Guarulhos",
            "addressRegion": "SP",
            "addressCountry": "BR",
          },
        },
        "areaServed": { "@type": "Country", "name": "Brasil" },
      };

  return {
    title: p.title,
    description: p.description,
    canonical: `${DOMAIN}${cleanPath}`,
    h1: p.h1,
    ogUrl: `${DOMAIN}${cleanPath}`,
    ogType: "website",
    faqs: p.faqs,
    schema: p.faqs
      ? [
          schema,
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": p.faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          },
        ]
      : schema,
  };
}

export function getMetadataForRoute(pathname: string): Metadata | null {
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  let slug = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;
  
  const isLP = slug.startsWith("lp/");
  if (isLP) {
    slug = slug.replace("lp/", "");
  }

  // Premium overrides para rotas restauradas (RC, galpões, agro, consórcio, hubs)
  if (!isLP) {
    const premium = premiumPages[cleanPath];
    if (premium) return buildPremiumMetadata(cleanPath, premium);
  }

  // 1. Home
  if (cleanPath === "/") {
    return {
      title: "Patro Seguros | Corretora de Seguros em Guarulhos",
      description: "Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. Compare 16+ seguradoras. Cotação em 2h. Patro Seguros (11) 5199-7500.",
      canonical: DOMAIN,
      h1: "Patro Seguros: Corretora de Seguros em Guarulhos",
      ogUrl: DOMAIN,
      ogType: "website",
      schema: {
        "@context": "https://schema.org",
        "@type": ["InsuranceAgency", "LocalBusiness"],
        "name": "Patro Seguros",
        "description": "Corretora de seguros em Guarulhos especializada em seguros auto, residenciais e empresariais.",
        "url": DOMAIN,
        "telephone": "+55-11-5199-7500",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Guarulhos",
          "addressRegion": "SP",
          "addressCountry": "BR"
        }
      }
    };
  }

  // 2. Static Pages Mapping (Commercial/Informative focus) - Only if NOT an LP route
  if (!isLP) {
    const staticPages: Record<string, { title: string; description: string; h1: string }> = {
      "/blog": {
        title: "Blog Patro Seguros | Notícias e Dicas sobre Seguros",
        description: "Acompanhe as últimas notícias, dicas e novidades sobre o mercado de seguros em Guarulhos e no Brasil.",
        h1: "Blog Patro Seguros",
      },
      "/cotacao": {
        title: "Cotação de Seguro em Guarulhos | Patro Seguros",
        description: "Solicite uma cotação de seguro auto, residencial, vida ou saúde em Guarulhos. Receba comparativo em até 2h.",
        h1: "Solicitar Cotação de Seguro",
      },
      "/sobre": {
        title: "Sobre a Patro Seguros | Sua Corretora em Guarulhos",
        description: "Conheça a história da Patro Seguros, uma corretora especializada em oferecer as melhores soluções em seguros.",
        h1: "Sobre a Patro Seguros",
      },
      "/contato": {
        title: "Contato Patro Seguros | Atendimento em Guarulhos",
        description: "Fale com nossos especialistas em seguros via WhatsApp, telefone ou presencial no Cidade Maia.",
        h1: "Fale Conosco",
      },
      "/politica-privacidade": {
        title: "Política de Privacidade | Patro Seguros",
        description: "Saiba como a Patro Seguros trata e protege seus dados pessoais conforme a LGPD.",
        h1: "Política de Privacidade",
      },
      "/termos-de-uso": {
        title: "Termos de Uso | Patro Seguros",
        description: "Termos e condições de uso do site da Patro Seguros.",
        h1: "Termos de Uso",
      },
      "/seguro-auto": {
        title: "Seguro Auto Completo | Patro Seguros",
        description: "Conheça coberturas, assistências e vantagens do seguro auto completo com a Patro Seguros.",
        h1: "Seguro Auto Completo",
      },
      "/seguro-moto": {
        title: "Seguro de Moto | Coberturas e Assistência",
        description: "Conheça as coberturas do seguro de moto, proteção contra roubo, furto, colisão e assistência 24h.",
        h1: "Seguro de Moto",
      },
      "/seguro-vida": {
        title: "Seguro de Vida | Proteção Familiar",
        description: "Entenda como o seguro de vida protege sua família em caso de morte, invalidez ou doenças graves.",
        h1: "Seguro de Vida",
      },
      "/seguro-residencial": {
        title: "Seguro Residencial | Proteção Para Sua Casa",
        description: "Conheça coberturas do seguro residencial contra incêndio, roubo, danos elétricos e assistência 24h.",
        h1: "Seguro Residencial",
      },
      "/seguro-empresarial": {
        title: "Seguro Empresarial | Proteção Para Empresas",
        description: "Conheça coberturas para proteger empresas contra incêndio, roubo, danos, lucros cessantes e RC.",
        h1: "Seguro Empresarial",
      },
      "/planos-de-saude": {
        title: "Planos de Saúde em Guarulhos | Compare Operadoras",
        description: "Encontre o melhor plano de saúde em Guarulhos para você, sua família ou empresa.",
        h1: "Planos de Saúde em Guarulhos",
      },
      "/seguro-celular": {
        title: "Seguro de Celular | Coberturas e Proteção",
        description: "Conheça o seguro de celular contra roubo, furto qualificado e danos acidentais. Veja coberturas e como contratar com a Patro.",
        h1: "Seguro de Celular",
      },
      "/seguro-motorista-app": {
        title: "Seguro Para Motorista de App | Guia Completo",
        description: "Entenda como funciona o seguro para Uber, 99 e motoristas de aplicativo, com cobertura para veículo, terceiros e passageiros.",
        h1: "Seguro Para Motorista de App",
      },
      "/consorcio": {
        title: "Consórcio | Como Funciona e Vantagens",
        description: "Entenda como funciona o consórcio para carro, imóvel e caminhão, suas vantagens, regras e quando vale a pena contratar.",
        h1: "Consórcio: Como Funciona",
      }
    };

    const staticPage = staticPages[cleanPath];
    if (staticPage) {
      return {
        title: staticPage.title.length > 65 ? staticPage.title.slice(0, 62).trim() + "..." : staticPage.title,
        description: staticPage.description.length > 160 ? staticPage.description.slice(0, 157).trim() + "..." : staticPage.description,
        canonical: `${DOMAIN}${cleanPath}`,
        h1: staticPage.h1,
        ogUrl: `${DOMAIN}${cleanPath}`,
        ogType: "website",
      };
    }
  }

  // 3. Local Pages (Auto, Saúde, Modelos)
  const localConfig = seoLocalPages[slug] || seoLocalSaudePages[slug] || seoModeloAutoPages[slug];
  if (localConfig) {
    const rawTitle = localConfig.title.includes("Patro") ? localConfig.title : `${localConfig.title} | Patro`;
    const title = rawTitle.length > 65 ? rawTitle.slice(0, 62).trim() + "..." : rawTitle;
    const rawDesc = localConfig.metaDescription || localConfig.description;
    const description = rawDesc.length > 160 ? rawDesc.slice(0, 157).trim() + "..." : rawDesc;
    
    return {
      title,
      description,
      canonical: `${DOMAIN}${cleanPath}`,
      h1: localConfig.title,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
      detailedDescription: localConfig.detailedDescription,
      faqs: localConfig.faqs,
      whoNeeds: localConfig.whoNeeds,
      whyPatro: localConfig.whyPatro,

      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": localConfig.title,
        "provider": {
          "@type": "InsuranceAgency",
          "name": "Patro Seguros",
          "url": DOMAIN,
          "image": `${DOMAIN}/images/logo-full.webp`,
          "priceRange": "$$"
        },
        "areaServed": {
          "@type": "City",
          "name": localConfig.city || "Guarulhos"
        }
      }
    };
  }

  // 4. Landing Pages / LP focus (Conversion/Quote focus)
  const lpConfig = landingPagesData[slug];
  if (lpConfig) {
    const rawTitle = `${lpConfig.title} | Patro`;
    const title = rawTitle.length > 65 ? rawTitle.slice(0, 62).trim() + "..." : rawTitle;
    const rawDesc = lpConfig.metaDescription || lpConfig.description;
    const description = rawDesc.length > 160 ? rawDesc.slice(0, 157).trim() + "..." : rawDesc;

    return {
      title,
      description,
      canonical: `${DOMAIN}${cleanPath}`,
      h1: lpConfig.title,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
      detailedDescription: lpConfig.detailedDescription,
      faqs: lpConfig.faqs,
      whoNeeds: lpConfig.whoNeeds,
      whyPatro: lpConfig.whyPatro,
    };
  }

  // 5. Service Content Pages
  const serviceContent = (servicePagesContent as any)[slug];
  if (serviceContent) {
    const baseTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const rawTitle = `${baseTitle} | Patro`;
    const title = rawTitle.length > 65 ? rawTitle.slice(0, 62).trim() + "..." : rawTitle;
    const description = serviceContent.content.length > 160 ? serviceContent.content.slice(0, 157).trim() + "..." : serviceContent.content;

    return {
      title,
      description,
      canonical: `${DOMAIN}${cleanPath}`,
      h1: baseTitle,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
      detailedDescription: serviceContent.content,
    };
  }

  // 6. Blog Posts
  if (cleanPath.startsWith("/blog/")) {
    const blogSlug = cleanPath.replace("/blog/", "");
    const post = blogArticles.find(p => p.slug === blogSlug);
    if (post) {
      return {
        title: `${post.title.length > 50 ? post.title.slice(0, 47) + "..." : post.title} | Patro`,
        description: post.excerpt.length > 160 ? post.excerpt.slice(0, 157).trim() + "..." : post.excerpt,
        canonical: `${DOMAIN}${cleanPath}`,
        h1: post.title,
        ogUrl: `${DOMAIN}${cleanPath}`,
        ogType: "article",
        schema: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          }
        }
      };
    }
  }

  // 7. Generic Fallback for all other sitemap routes
  if (slug && slug !== "/") {
    const titleParts = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1));
    const pageTitle = titleParts.join(" ");
    const isGuarulhos = slug.includes("guarulhos");
    
    const rawTitle = `${pageTitle}${isGuarulhos ? "" : " em Guarulhos"} | Patro`;
    const title = rawTitle.length > 65 ? rawTitle.slice(0, 62).trim() + "..." : rawTitle;
    const rawDesc = `Procurando por ${pageTitle.toLowerCase()}? A Patro Seguros é especialista em soluções de proteção em Guarulhos.`;
    const description = rawDesc.length > 160 ? rawDesc.slice(0, 157).trim() + "..." : rawDesc;

    return {
      title,
      description,
      canonical: `${DOMAIN}${cleanPath}`,
      h1: pageTitle,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
    };
  }

  return null;
}
