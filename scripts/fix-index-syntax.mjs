import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX_HTML = path.join(ROOT, "index.html");

function fixIndex() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error("index.html not found");
    return;
  }

  let html = fs.readFileSync(INDEX_HTML, "utf-8");

  // O schema InsuranceAgency no index.html começa na linha 149
  // Queremos garantir que ele esteja sintaticamente correto.
  // O erro reportado era falta de fechamento ou vírgula em hasOfferCatalog ou sameAs.
  
  // Vamos substituir o bloco inteiro por uma versão limpa e validada.
  const cleanAgencySchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": "https://www.patroseguros.com.br/#insurance-agency",
    "name": "Patro Seguros",
    "alternateName": "Patro Corretora de Seguros LTDA",
    "url": "https://www.patroseguros.com.br",
    "logo": "https://www.patroseguros.com.br/images/logo-full.webp",
    "image": "https://www.patroseguros.com.br/images/hero-home-960.webp",
    "description": "Corretora de seguros em Guarulhos com atendimento consultivo e comparação em 16+ seguradoras. Especialista em seguro auto, vida, saúde, residencial e empresarial em Guarulhos e região.",
    "slogan": "Corretora de seguros em Guarulhos com atendimento consultivo",
    "foundingDate": "2021",
    "taxID": "41.641.558/0001-33",
    "telephone": "+551151997500",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+551151997500",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": "Portuguese",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:30",
            "closes": "18:00"
          }
        ]
      }
    ],
    "email": "contato@patroseguros.com.br",
    "legalName": "Patro Corretora de Seguros LTDA",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Salgado Filho, 2120 - Sala 219",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "postalCode": "07115-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.4460,
      "longitude": -46.5220
    },
    "hasMap": "https://www.google.com/maps?cid=273879799324962533",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Guarulhos",
        "sameAs": "https://pt.wikipedia.org/wiki/Guarulhos"
      },
      {
        "@type": "AdministrativeArea",
        "name": "São Paulo"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "67",
      "bestRating": "5",
      "worstRating": "1"
    },
    "founder": [
      {
        "@type": "Person",
        "name": "Roberto Patrocínio"
      },
      {
        "@type": "Person",
        "name": "Sandra Patrocínio"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo de Seguros",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Seguro Automóvel em Guarulhos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Seguro Residencial e Condomínio"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Seguro Carga e Logística (RCTR-C)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Seguro Empresarial e Frotas"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/patroseguros",
      "https://www.facebook.com/patroseguros",
      "https://www.linkedin.com/company/patroseguros",
      "https://www.youtube.com/@patroseguros"
    ]
  };

  const scriptTag = `<script type="application/ld+json">\n    ${JSON.stringify(cleanAgencySchema, null, 2)}\n    </script>`;

  // Regex para encontrar o script que contém @type: InsuranceAgency
  const regex = /<script type="application\/ld\+json">[\s\S]*?"@type":\s*"InsuranceAgency"[\s\S]*?<\/script>/;
  
  if (regex.test(html)) {
    html = html.replace(regex, scriptTag);
    fs.writeFileSync(INDEX_HTML, html, "utf-8");
    console.log("✅ index.html InsuranceAgency schema fixed.");
  } else {
    console.error("❌ Could not find InsuranceAgency schema in index.html");
  }
}

fixIndex();
