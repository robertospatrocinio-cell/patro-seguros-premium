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
  // For slugs, we handle /lp/ prefix separately to match landingPagesData keys
  let slug = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;
  
  if (slug.startsWith("lp/")) {
    slug = slug.replace("lp/", "");
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

  // 2. Local Pages (Auto, Saúde, Modelos)
  const localConfig = seoLocalPages[slug] || seoLocalSaudePages[slug] || seoModeloAutoPages[slug];
  if (localConfig) {
    const rawTitle = localConfig.title.includes("Patro Seguros") ? localConfig.title : `${localConfig.title} | Patro Seguros`;
    const title = rawTitle.length > 60 ? rawTitle.slice(0, 57).trim() + "..." : rawTitle;
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
    const rawTitle = `${lpConfig.title} | Patro Seguros`;
    const title = rawTitle.length > 60 ? rawTitle.slice(0, 57).trim() + "..." : rawTitle;
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

  // 4. Service Content Pages
  const serviceContent = (servicePagesContent as any)[slug];
  if (serviceContent) {
    const baseTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const rawTitle = `${baseTitle} | Patro Seguros Guarulhos`;
    const title = rawTitle.length > 60 ? rawTitle.slice(0, 57).trim() + "..." : rawTitle;
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
      title: "Seguro Auto em Guarulhos | Proteção para seu Veículo",
      description: "Compare seguro auto em Guarulhos com a Patro Seguros. Coberturas contra roubo, furto, colisão e assistência 24h.",
      h1: "Seguro Auto em Guarulhos",
    },
    "/planos-de-saude": {
      title: "Planos de Saúde em Guarulhos | Compare Operadoras",
      description: "Encontre o melhor plano de saúde em Guarulhos para você, sua família ou empresa.",
      h1: "Planos de Saúde em Guarulhos",
    }
  };

  const staticPage = staticPages[cleanPath];
  if (staticPage) {
    return {
      title: staticPage.title.slice(0, 57) + (staticPage.title.length > 60 ? "..." : ""),
      description: staticPage.description.slice(0, 157) + (staticPage.description.length > 160 ? "..." : ""),
      canonical: `${DOMAIN}${cleanPath}`,
      h1: staticPage.h1,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
    };
  }

  // 7. Generic Fallback for all other sitemap routes
  if (slug && slug !== "/") {
    const titleParts = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1));
    const pageTitle = titleParts.join(" ");
    const isGuarulhos = slug.includes("guarulhos");
    
    const rawTitle = `${pageTitle}${isGuarulhos ? "" : " em Guarulhos"} | Patro Seguros`;
    const title = rawTitle.length > 60 ? rawTitle.slice(0, 57) + "..." : rawTitle;

    return {
      title,
      description: `Procurando por ${pageTitle.toLowerCase()}? A Patro Seguros é especialista em soluções de proteção em Guarulhos.`.slice(0, 160),
      canonical: `${DOMAIN}${cleanPath}`,
      h1: pageTitle,
      ogUrl: `${DOMAIN}${cleanPath}`,
      ogType: "website",
    };
  }


  return null;
}
