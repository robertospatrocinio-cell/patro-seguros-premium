import { seoLocalPages } from "@/data/seoLocalAutoPages";
import { seoLocalSaudePages } from "@/data/seoLocalSaudePages";
import { seoModeloAutoPages } from "@/data/seoModelosAutoPages";
import { articles as blogArticles } from "@/lib/blogData";

export interface Metadata {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  ogUrl: string;
  ogType: "website" | "article";
  schema?: any;
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

  // 3. Blog Posts
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
    "/planos-de-saude": {
        title: "Planos de Saúde em Guarulhos | Compare Operadoras",
        description: "Encontre o melhor plano de saúde em Guarulhos para você, sua família ou empresa. Compare Amil, SulAmérica, Bradesco e mais.",
        h1: "Planos de Saúde em Guarulhos",
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
