// Build-time validator for local SEO pages.
// Bundles `src/data/seoLocalAutoPages.ts` with esbuild, imports the resulting
// ESM module, then asserts that every page in `seoLocalPages` meets the
// editorial rules required by the LocalPageTemplate contract:
//
//   1. faqs.length        >= 5
//   2. effective insurers >= 4   (config.insurers ?? DEFAULT_INSURERS)
//   3. effective testim.  >= 2   (config.testimonials ?? DEFAULT_TESTIMONIALS)
//   4. realScenarios      >= 2
//   5. detailedDescription has >= 2 paragraphs and is unique across pages
//   6. description / title are unique across pages (no duplicate doorway pages)
//   7. metaDescription <= 160 chars
//
// Throws (non-zero exit / Vite build failure) when any rule is violated.

import path from "path";
import { fileURLToPath } from "url";
import { loadDataModule } from "./load-data-module.mjs";

function effective(value, fallback) {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
}

export async function validateLocalPages() {
  const [pagesMod, defaultsMod] = await Promise.all([
    loadDataModule("src/data/seoLocalAutoPages.ts"),
    loadDataModule("src/data/localDefaults.ts"),
  ]);

  const seoLocalPages = pagesMod.seoLocalPages || pagesMod.seoLocalSaudePages || pagesMod.seoModeloAutoPages;
  const DEFAULT_INSURERS = defaultsMod.DEFAULT_INSURERS;
  const DEFAULT_TESTIMONIALS = defaultsMod.DEFAULT_TESTIMONIALS;

  if (!seoLocalPages || typeof seoLocalPages !== "object") {
    throw new Error("validate-local-pages: `seoLocalPages` export not found.");
  }

  const errors = [];
  const seenDescriptions = new Map();
  const seenDetailed = new Map();
  const seenTitles = new Map();

  const slugs = Object.keys(seoLocalPages);
  if (slugs.length === 0) {
    throw new Error("validate-local-pages: no local pages found.");
  }

  for (const slug of slugs) {
    const page = seoLocalPages[slug];
    const tag = `[${slug}]`;

    if (!page) {
      errors.push(`${tag} entry is empty.`);
      continue;
    }

    const faqs = Array.isArray(page.faqs) ? page.faqs : [];
    if (faqs.length < 5) {
      errors.push(`${tag} faqs precisa ter ≥ 5 (atual: ${faqs.length}).`);
    }

    const insurers = effective(page.insurers, DEFAULT_INSURERS);
    if (insurers.length < 4) {
      errors.push(`${tag} seguradoras precisa ter ≥ 4 (atual: ${insurers.length}).`);
    }

    const testimonials = effective(page.testimonials, DEFAULT_TESTIMONIALS);
    if (testimonials.length < 2) {
      errors.push(`${tag} depoimentos precisa ter ≥ 2 (atual: ${testimonials.length}).`);
    }

    const scenarios = Array.isArray(page.realScenarios) ? page.realScenarios : [];
    if (scenarios.length < 2) {
      errors.push(`${tag} realScenarios precisa ter ≥ 2 (atual: ${scenarios.length}).`);
    }

    const detailed = String(page.detailedDescription ?? "");
    if (!detailed.includes("\n\n")) {
      errors.push(`${tag} detailedDescription deve ter ≥ 2 parágrafos separados por linha em branco.`);
    }
    if (detailed.trim().length < 280) {
      errors.push(`${tag} detailedDescription muito curto (${detailed.trim().length} chars, mínimo 280).`);
    }

    const meta = String(page.metaDescription ?? "");
    if (meta.length === 0) {
      errors.push(`${tag} metaDescription ausente.`);
    } else if (meta.length > 160) {
      errors.push(`${tag} metaDescription > 160 chars (atual: ${meta.length}).`);
    }

    const title = String(page.title ?? "").trim();
    if (!title) errors.push(`${tag} title ausente.`);
    const description = String(page.description ?? "").trim();
    if (!description) errors.push(`${tag} description ausente.`);

    // Uniqueness checks
    const dKey = description.toLowerCase();
    if (dKey) {
      if (seenDescriptions.has(dKey)) {
        errors.push(`${tag} description duplica conteúdo de [${seenDescriptions.get(dKey)}].`);
      } else {
        seenDescriptions.set(dKey, slug);
      }
    }
    const ddKey = detailed.trim().toLowerCase();
    if (ddKey) {
      if (seenDetailed.has(ddKey)) {
        errors.push(`${tag} detailedDescription duplica conteúdo de [${seenDetailed.get(ddKey)}].`);
      } else {
        seenDetailed.set(ddKey, slug);
      }
    }
    const tKey = title.toLowerCase();
    if (tKey) {
      if (seenTitles.has(tKey)) {
        errors.push(`${tag} title duplica [${seenTitles.get(tKey)}].`);
      } else {
        seenTitles.set(tKey, slug);
      }
    }
  }

  if (errors.length) {
    const header = `\n❌ validate-local-pages: ${errors.length} erro(s) em ${slugs.length} página(s) locais.\n`;
    throw new Error(header + errors.map((e) => "  • " + e).join("\n") + "\n");
  }

  console.log(`✅ validate-local-pages: ${slugs.length} páginas locais OK (FAQ≥5, seguradoras≥4, depoimentos≥2, cenários≥2, conteúdo único).`);
}

// Allow `node scripts/validate-local-pages.mjs` for local debugging.
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  validateLocalPages().catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
  });
}