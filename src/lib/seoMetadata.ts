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

export function getMetadataForRoute(pathname: string): Metadata | null {
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  const slug = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;

  // 1. Home
  if (cleanPath === "/") {
    return {
      title: "Patro Seguros | Corretora de Seguros em Guarulhos",
      description: "Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. Compare 16+ seguradoras. Cotação grátis em 2h. Patro Seguros (11) 5199-7500.",
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

  // 2. Local Pages (Auto, Saúde, Modelos)
  const localConfig = seoLocalPages[slug] || seoLocalSaudePages[slug] || seoModeloAutoPages[slug];
  if (localConfig) {
    const title = localConfig.title.includes("Patro Seguros") ? localConfig.title : `${localConfig.title} | Patro Seguros`;
    return {
      title,
      description: localConfig.metaDescription,
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
          "name": "Patro Seguros"
        },
        "areaServed": {
          "@type": "City",
          "name": localConfig.city || "Guarulhos"
        }
      }
    };
  }

  // 3. Landing Pages / Commercial Pages
  const lpConfig = landingPagesData[slug];
  if (lpConfig) {
    return {
      title: `${lpConfig.title} | Patro Seguros`,
      description: lpConfig.metaDescription || lpConfig.description,
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

  // 4. Service Content Pages
  const serviceContent = (servicePagesContent as any)[slug];
  if (serviceContent) {
    const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      title: `${title} | Patro Seguros Guarulhos`,
      description: serviceContent.content.slice(0, 160),
      canonical: `${DOMAIN}${cleanPath}`,
      h1: title,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
      detailedDescription: serviceContent.content,
    };
  }

  // 5. Blog Posts
  if (cleanPath.startsWith("/blog/")) {
    const blogSlug = cleanPath.replace("/blog/", "");
    const post = blogArticles.find(p => p.slug === blogSlug);
    if (post) {
      return {
        title: `${post.title} | Blog Patro Seguros`,
        description: post.excerpt,
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

  // 6. Static Pages Mapping
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
    }
  };

  const staticPage = staticPages[cleanPath];
  if (staticPage) {
    return {
      title: staticPage.title,
      description: staticPage.description,
      canonical: `${DOMAIN}${cleanPath}`,
      h1: staticPage.h1,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
    };
  }

  // 7. Generic Fallback for all other sitemap routes to avoid duplicate home metadata
  // Generates metadata based on the slug to ensure uniqueness
  if (slug && slug !== "/") {
    const titleParts = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1));
    const pageTitle = titleParts.join(" ");
    const isGuarulhos = slug.includes("guarulhos");
    
    return {
      title: `${pageTitle}${isGuarulhos ? "" : " em Guarulhos"} | Patro Seguros`,
      description: `Procurando por ${pageTitle.toLowerCase()}? A Patro Seguros é especialista em soluções de proteção em Guarulhos. Cotação rápida e atendimento local.`,
      canonical: `${DOMAIN}${cleanPath}`,
      h1: pageTitle,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
    };
  }

  return null;
}


    const blogSlug = cleanPath.replace("/blog/", "");
    const post = blogArticles.find(p => p.slug === blogSlug);
    if (post) {
      return {
        title: `${post.title} | Blog Patro Seguros`,
        description: post.excerpt,
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

  // 4. Static Pages (Manual Mapping)
  const staticPages: Record<string, { title: string; description: string; h1: string }> = {
    "/blog": {
      title: "Blog Patro Seguros | Notícias e Dicas sobre Seguros",
      description: "Acompanhe as últimas notícias, dicas e novidades sobre o mercado de seguros em Guarulhos e no Brasil. Informação de qualidade para sua proteção.",
      h1: "Blog Patro Seguros",
    },
    "/cotacao": {
      title: "Cotação de Seguro em Guarulhos | Patro Seguros",
      description: "Solicite uma cotação de seguro auto, residencial, vida ou saúde em Guarulhos. Receba comparativo entre as melhores seguradoras em até 2h.",
      h1: "Solicitar Cotação de Seguro",
    },
    "/sobre": {
      title: "Sobre a Patro Seguros | Sua Corretora em Guarulhos",
      description: "Conheça a história da Patro Seguros, uma corretora especializada em oferecer as melhores soluções em seguros para você e sua empresa em Guarulhos.",
      h1: "Sobre a Patro Seguros",
    },
    "/contato": {
      title: "Contato Patro Seguros | Atendimento em Guarulhos",
      description: "Fale com nossos especialistas em seguros. Atendimento via WhatsApp, telefone ou presencial em nosso escritório no Cidade Maia, Guarulhos.",
      h1: "Fale Conosco",
    },
    "/politica-privacidade": {
      title: "Política de Privacidade | Patro Seguros",
      description: "Saiba como a Patro Seguros trata e protege seus dados pessoais. Transparência e segurança em conformidade com a LGPD.",
      h1: "Política de Privacidade",
    },
    "/termos-de-uso": {
      title: "Termos de Uso | Patro Seguros",
      description: "Termos e condições de uso do site da Patro Seguros. Regras para navegação e utilização de nossos serviços online.",
      h1: "Termos de Uso",
    },
    "/seguro-auto": {
        title: "Seguro Auto em Guarulhos | Proteção para seu Veículo",
        description: "Compare seguro auto em Guarulhos com a Patro Seguros. Coberturas contra roubo, furto, colisão e assistência 24h. Cotação grátis.",
        h1: "Seguro Auto em Guarulhos",
    },
    "/seguro-vida": {
        title: "Seguro de Vida em Guarulhos | Patro Seguros",
        description: "Proteja o futuro de sua família com o seguro de vida da Patro Seguros. Coberturas personalizadas para cada perfil.",
        h1: "Seguro de Vida em Guarulhos",
    },
    "/seguro-residencial": {
        title: "Seguro Residencial em Guarulhos | Patro Seguros",
        description: "Proteção para sua casa ou apartamento em Guarulhos. Coberturas contra incêndio, roubo e danos elétricos.",
        h1: "Seguro Residencial em Guarulhos",
    },
    "/seguro-viagem": {
        title: "Seguro Viagem | Viaje Tranquilo com a Patro Seguros",
        description: "Cobertura completa para suas viagens nacionais e internacionais. Assistência médica, odontológica e extravio de bagagem.",
        h1: "Seguro Viagem",
    },
    "/seguro-fianca": {
        title: "Seguro Fiança Locatícia | Alugue sem Fiador em Guarulhos",
        description: "A melhor alternativa ao fiador ou caução. Rapidez para o inquilino e segurança total para o proprietário.",
        h1: "Seguro Fiança Locatícia",
    },
    "/seguro-moto": {
        title: "Seguro de Moto em Guarulhos | Proteção Duas Rodas",
        description: "Seguro especializado para motos em Guarulhos. Coberturas contra roubo, furto e colisão com assistência 24h.",
        h1: "Seguro de Moto em Guarulhos",
    },
    "/seguro-saude": {
        title: "Seguro Saúde em Guarulhos | Sua Saúde em Primeiro Lugar",
        description: "Os melhores planos e seguros saúde em Guarulhos. Rede credenciada de qualidade e atendimento ágil.",
        h1: "Seguro Saúde em Guarulhos",
    },
    "/seguro-odonto": {
        title: "Seguro Odontológico em Guarulhos | Sorriso Protegido",
        description: "Planos odontológicos para você e sua família em Guarulhos. Ampla rede de dentistas e coberturas completas.",
        h1: "Seguro Odontológico em Guarulhos",
    },
    "/seguro-empresarial": {
        title: "Seguro Empresarial em Guarulhos | Proteja seu Negócio",
        description: "Soluções completas de seguro para empresas em Guarulhos. Proteção para patrimônio, responsabilidade civil e mais.",
        h1: "Seguro Empresarial em Guarulhos",
    },
    "/seguro-frota": {
        title: "Seguro de Frota em Guarulhos | Gestão e Proteção",
        description: "Seguro para frotas de veículos em Guarulhos. Reduza custos e proteja o patrimônio da sua empresa.",
        h1: "Seguro de Frota em Guarulhos",
    },
    "/planos-de-saude": {
        title: "Planos de Saúde em Guarulhos | Compare Operadoras",
        description: "Encontre o melhor plano de saúde em Guarulhos para você, sua família ou empresa. Compare Amil, SulAmérica, Bradesco e mais.",
        h1: "Planos de Saúde em Guarulhos",
    },
    "/parceiros": {
        title: "Nossos Parceiros | Patro Seguros",
        description: "Conheça as principais seguradoras e operadoras de saúde que são parceiras da Patro Seguros em Guarulhos.",
        h1: "Nossos Parceiros",
    },
    "/depoimentos": {
        title: "Depoimentos de Clientes | Patro Seguros",
        description: "Veja o que nossos clientes dizem sobre o atendimento e as soluções da Patro Seguros em Guarulhos.",
        h1: "O que nossos clientes dizem",
    },
    "/imprensa": {
        title: "Imprensa e Notícias | Patro Seguros",
        description: "Fique por dentro das novidades da Patro Seguros na mídia e notícias do mercado de seguros.",
        h1: "Imprensa",
    },
    "/faq": {
        title: "Perguntas Frequentes (FAQ) | Patro Seguros",
        description: "Tire suas dúvidas sobre seguros auto, residenciais, vida e saúde com nosso guia de perguntas frequentes.",
        h1: "Perguntas Frequentes",
    },
    "/sobre-guarulhos": {
        title: "Sobre Guarulhos | Patro Seguros na Cidade",
        description: "Nossa história e compromisso com a cidade de Guarulhos. Conheça a corretora local que entende suas necessidades.",
        h1: "Patro Seguros em Guarulhos",
    }
  };

  const staticPage = staticPages[cleanPath];
  if (staticPage) {
    return {
      title: staticPage.title,
      description: staticPage.description,
      canonical: `${DOMAIN}${cleanPath}`,
      h1: staticPage.h1,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
    };
  }

  return null;
}
