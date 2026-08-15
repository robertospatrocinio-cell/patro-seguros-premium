---
name: Project Rodada 3 Plan
description: Final cleanup of SEO, JSON-LD, redirects, and missing content for Patro Seguros.
type: feature
---

# Finalization Plan (Rodada 3)

## 1. Schema JSON-LD & Infrastructure
- **Global Schema**: Ensure `InsuranceAgencySchema.tsx` is correctly injected in `src/App.tsx`.
- **Product/Service Schema**: Verify `InsurancePageTemplate.tsx` handles `Service`, `FAQPage`, and `BreadcrumbList`.
- **Blog Schema**: Add `Article` and `FAQPage` to `BlogArticle.tsx`.
- **Review Schema**: Add to `Depoimentos.tsx`.

## 2. Redirects & Canonical
- **Middleware**: Implement/Update redirects in `src/lib/redirects.ts` for `/seguros-cidade-maia-guarulhos` and `/seguros-guarulhos`.
- **Canonical**: Ensure `PageMeta.tsx` uses `www.patroseguros.com.br` consistently.

## 3. Content Expansion
- **Seguro Transporte**: Expand `src/pages/SeguroTransporteCargaGuarulhos.tsx` with full content (RCTR-C, Cumbica context, technical FAQ).
- **Comparativo**: Create/Update `/comparativo-seguradoras-guarulhos`.
- **Models & Neighborhoods**: Generate missing niche pages/articles.

## 4. NAP & Global Scrubber
- **Global Scrub**: Batch replace old hours ("9h–18h", "Sáb") and isolated "Parque Renato Maia" with "Cidade Maia".
- **Asset Cleanup**: Fix malformed image URLs (pipes, spaces, encoded quotes).
- **WhatsApp**: Standardize messages to be clean and product-aware.

## 5. UX & Verification
- **Quote Forms**: Ensure `?tipo=` parameter is correct on all pages.
- **SUSEP/CNPJ**: Verify visibility and links in `Footer.tsx`.
- **Audit**: Final validation of all 70+ URLs.
