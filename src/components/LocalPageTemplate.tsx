import { useEffect } from "react";
import { MessageCircle, MapPin, Star, Building2, ShieldCheck } from "lucide-react";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import LocalAreaSchema from "@/components/LocalAreaSchema";
import { trackWhatsAppClick } from "@/lib/tracking";
import { setWhatsAppOverride, clearWhatsAppOverride } from "@/lib/whatsappOverride";

/**
 * LocalPageTemplate
 * ------------------------------------------------------------------
 * Template OBRIGATÓRIO para todas as páginas locais e de bairro.
 *
 * Requisitos garantidos pelo TypeScript (compile-time):
 *   1. FAQ específico (mín. 5 perguntas locais)
 *   2. Seguradoras parceiras listadas
 *   3. Bairros atendidos (quando aplicável)
 *   4. Depoimentos locais (mín. 2)
 *   5. CTA WhatsApp visível e rastreável
 *   6. Schema local (LocalArea + InsuranceAgency + FAQ + AggregateRating)
 *   7. Conteúdo único: detailedDescription, pricingIntro e cenários reais
 *
 * NUNCA torne campos abaixo opcionais — eles existem para impedir
 * "doorway pages" e páginas finas que o Google penaliza.
 * ------------------------------------------------------------------
 */

export interface LocalFAQ {
  question: string;
  answer: string;
}

export interface LocalTestimonial {
  /** Nome ou identificador do cliente (ex.: "Marcelo R., Cidade Maia") */
  author: string;
  /** Bairro ou referência geográfica em Guarulhos */
  neighborhood: string;
  /** Texto do depoimento — referencie o produto e a região */
  quote: string;
  /** 1-5 estrelas */
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface LocalInsurer {
  /** Nome da seguradora (ex.: "Porto Seguro") */
  name: string;
  /** Diferencial naquela página específica */
  highlight: string;
}

export interface LocalPricing {
  /** Texto curto explicando faixa de preço */
  intro: string;
  /** Fatores que mais pesam no cálculo */
  factors: string[];
  /** Dica final para o leitor (opcional, mas recomendado) */
  note?: string;
  /** Faixa numérica para enriquecer Schema.org/AggregateOffer */
  range?: { min: number; max: number };
}

export interface LocalRelatedLink {
  title: string;
  link: string;
}

export interface LocalPageProps {
  /** Slug canônico (ex.: "seguro-auto-vila-galvao") */
  slug: string;
  /** Título com cidade/bairro embutido — vira H1 + <title> */
  title: string;
  /** Subtítulo do hero (1 frase) */
  subtitle: string;
  /** Meta description ≤ 160 chars */
  metaDescription: string;
  /** Emoji/ícone do hero */
  icon: string;
  /** Cidade — geralmente "Guarulhos" */
  city: string;
  /** Bairro alvo — opcional para páginas comerciais city-wide */
  neighborhood?: string;
  /** Coordenadas geográficas para schema local */
  geo?: { latitude: number; longitude: number };

  /** Conteúdo único: parágrafo de abertura */
  description: string;
  /** Conteúdo único: ≥ 2 parágrafos detalhados separados por \n\n */
  detailedDescription: string;

  /** OBRIGATÓRIO: pricing local */
  pricing: LocalPricing;

  /** OBRIGATÓRIO: ≥ 5 FAQs específicos da região/produto */
  faqs: [LocalFAQ, LocalFAQ, LocalFAQ, LocalFAQ, LocalFAQ, ...LocalFAQ[]];

  /** OBRIGATÓRIO: ≥ 4 seguradoras parceiras */
  insurers: [LocalInsurer, LocalInsurer, LocalInsurer, LocalInsurer, ...LocalInsurer[]];

  /** OBRIGATÓRIO: ≥ 2 depoimentos locais */
  testimonials: [LocalTestimonial, LocalTestimonial, ...LocalTestimonial[]];

  /** OBRIGATÓRIO: cenários reais (≥ 2) */
  realScenarios: [
    { title: string; description: string },
    { title: string; description: string },
    ...{ title: string; description: string }[]
  ];

  /** Coberturas resumidas (≥ 4) */
  coverages: { title: string; description: string }[];

  /** Para quem é (≥ 4) */
  whoNeeds: string[];

  /** Diferenciais Patro (≥ 4) */
  whyPatro: string[];

  /** Dicas práticas (≥ 3) */
  tips: string[];

  /** Bairros atendidos próximos (opcional, recomendado em páginas de bairro) */
  nearbyAreas?: { name: string; link: string }[];

  /** Páginas relacionadas para internal linking */
  relatedInsurances: LocalRelatedLink[];

  /** Imagem do hero */
  heroImage: string;

  /** Mensagem custom para o CTA WhatsApp */
  whatsappMessage?: string;
}

const WHATSAPP_BASE = "https://wa.me/551151997500?text=";

const buildWhatsAppUrl = (msg: string) => WHATSAPP_BASE + encodeURIComponent(msg);

const StarRow = ({ count }: { count: number }) => (
  <div className="flex gap-0.5" aria-label={`${count} de 5 estrelas`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const LocalPageTemplate = (props: LocalPageProps) => {
  const {
    slug,
    title,
    subtitle,
    metaDescription,
    icon,
    city,
    neighborhood,
    geo,
    description,
    detailedDescription,
    pricing,
    faqs,
    insurers,
    testimonials,
    realScenarios,
    coverages,
    whoNeeds,
    whyPatro,
    tips,
    nearbyAreas,
    relatedInsurances,
    heroImage,
    whatsappMessage,
  } = props;

  const canonicalUrl = `https://www.patroseguros.com.br/${slug}`;
  const whatsappUrl = buildWhatsAppUrl(
    whatsappMessage ?? `Olá! Vim pela página ${title} e gostaria de uma cotação.`,
  );

  // Dev guardrails (não aparecem em produção)
  useEffect(() => {
    if (import.meta.env.DEV) {
      const errors: string[] = [];
      if (faqs.length < 5) errors.push(`LocalPageTemplate[${slug}]: faqs precisa ter ≥ 5 itens`);
      if (insurers.length < 4) errors.push(`LocalPageTemplate[${slug}]: insurers precisa ter ≥ 4 itens`);
      if (testimonials.length < 2) errors.push(`LocalPageTemplate[${slug}]: testimonials precisa ter ≥ 2 itens`);
      if (realScenarios.length < 2) errors.push(`LocalPageTemplate[${slug}]: realScenarios precisa ter ≥ 2 itens`);
      if (!detailedDescription.includes("\n\n")) {
        errors.push(`LocalPageTemplate[${slug}]: detailedDescription deve ter ≥ 2 parágrafos`);
      }
      if (metaDescription.length > 160) {
        errors.push(`LocalPageTemplate[${slug}]: metaDescription > 160 chars (${metaDescription.length})`);
      }
      if (errors.length) console.warn(errors.join("\n"));
    }
  }, [slug, faqs, insurers, testimonials, realScenarios, detailedDescription, metaDescription]);

  return (
    <>
      {/* Schema local extra (Service + Place + AggregateOffer) */}
      <LocalAreaSchema
        serviceName={title}
        url={canonicalUrl}
        description={metaDescription}
        city={city}
        neighborhood={neighborhood}
        geo={geo}
        priceRange={pricing.range}
        faqs={faqs}
      />

      <InsurancePageTemplate
        heroImage={heroImage}
        title={title}
        subtitle={subtitle}
        description={description}
        detailedDescription={detailedDescription}
        metaDescription={metaDescription}
        icon={icon}
        coverages={coverages}
        whoNeeds={whoNeeds}
        whyPatro={whyPatro}
        faqs={faqs}
        // Local pages emit FAQPage + AggregateRating via LocalAreaSchema's
        // unified @graph. Skip the duplicates here to keep the structured
        // data graph consistent (single AggregateRating @id, single FAQPage).
        skipFAQSchema
        skipAggregateRating
        pricingInfo={{
          intro: pricing.intro,
          factors: pricing.factors,
          note: pricing.note,
        }}
        realScenarios={realScenarios}
        tips={tips}
        relatedInsurances={relatedInsurances}
        importantDetails={[
          /* Seguradoras parceiras */
          {
            title: `Seguradoras parceiras em ${neighborhood ? `${neighborhood}, ${city}` : city}`,
            content: insurers
              .map((i) => `${i.name} — ${i.highlight}`)
              .join("\n\n"),
          },
          /* Depoimentos locais */
          {
            title: `Depoimentos de clientes em ${city}`,
            content: testimonials
              .map((t) => `"${t.quote}"\n— ${t.author} (${t.neighborhood}) ★ ${t.rating}/5`)
              .join("\n\n"),
          },
          ...(nearbyAreas && nearbyAreas.length > 0
            ? [
                {
                  title: `Bairros próximos atendidos`,
                  content: nearbyAreas.map((a) => `• ${a.name}`).join("\n"),
                },
              ]
            : []),
        ]}
      />

      {/* Link sr-only mantido para crawlers que não executam JS, garantindo
          que cada página local exponha um WhatsApp link com mensagem
          slug-específica. O botão flutuante visível é renderizado pelo
          `WhatsAppButton` global, configurado via override abaixo. */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(`local-page:${slug}:sr-link`)}
        className="sr-only"
        aria-label={`Falar com a Patro Seguros sobre ${title} pelo WhatsApp`}
      >
        WhatsApp Patro Seguros — {title}
      </a>

      {/* Marker para QA/SEO automático: identifica páginas que usam o template */}
      <meta
        name="patro:local-template"
        content={JSON.stringify({
          slug,
          city,
          neighborhood: neighborhood ?? null,
          insurers: insurers.length,
          testimonials: testimonials.length,
          faqs: faqs.length,
        })}
      />
    </>
  );
};

export default LocalPageTemplate;

// Re-exporta tipos para o data layer
export type { LocalPageProps as LocalPageTemplateProps };

// Helpers exportados para uso em data files
export const localPageIcons = {
  car: "🚗",
  uber: "🚕",
  moto: "🏍️",
  health: "🩺",
  home: "🏠",
  business: "🏢",
  fleet: "🚚",
  quote: "📋",
  broker: "🏆",
  shield: "🛡️",
} as const;

export const LocalPageIcons = { MapPin, Building2, ShieldCheck, MessageCircle, StarRow };