/**
 * ArticleSchema (BlogPosting)
 *
 * Reusable JSON-LD for blog articles. Strengthens E-E-A-T by exposing author,
 * datePublished, dateModified, image, publisher, articleSection, keywords and
 * speakable selectors.
 *
 * Spec: https://developers.google.com/search/docs/appearance/structured-data/article
 */

interface ArticleSchemaProps {
  url: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO, defaults to datePublished
  authorName: string;
  authorUrl?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
  readTimeMinutes?: number;
}

const ArticleSchema = ({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl = "https://patroseguros.com.br/sobre",
  category,
  tags = [],
  wordCount,
  readTimeMinutes,
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline,
    description,
    image: [image],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
      jobTitle: "Corretor(a) de Seguros — SUSEP",
      worksFor: {
        "@type": "Organization",
        name: "Patro Seguros",
        url: "https://patroseguros.com.br",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.patroseguros.com.br/#organization",
      name: "Patro Seguros",
      logo: {
        "@type": "ImageObject",
        url: "https://patroseguros.com.br/logo-full.webp",
        width: 512,
        height: 512,
      },
    },
    ...(category ? { articleSection: category } : {}),
    ...(tags.length ? { keywords: tags.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
    ...(readTimeMinutes ? { timeRequired: `PT${readTimeMinutes}M` } : {}),
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "h3"],
    },
    ...(tags.length
      ? { about: tags.slice(0, 5).map((t) => ({ "@type": "Thing", name: t })) }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      data-article-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ArticleSchema;