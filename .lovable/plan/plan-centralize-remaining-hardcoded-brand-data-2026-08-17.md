# Plan: Centralize Remaining Hardcoded Brand Data

Unify all institutional metrics (experience, reviews, partners, phone, hours) across components and pages using `src/config/empresa.ts` as the single source of truth.

## User Review Required

> [!IMPORTANT]
> This will ensure that future updates to business data (e.g., reaching 3,000 clients or 100 reviews) only need to be changed in `src/config/empresa.ts`.

- No questions currently.

## Proposed Changes

### Configuration & Components
- **ArticleInlineCTA, BlogFormCTA, FormCTASection, HeroInsuranceCarousel, LocalSavingsCalculator**: Replace hardcoded "16+ seguradoras" with `EMPRESA.metricas.seguradorasParceiras`.
- **ErrorBoundary, FormCTASection, GoogleBusinessWidget, Header, LandingPageTemplate, PatroPrivateForm**: Replace hardcoded "(11) 5199-7500" with `EMPRESA.telefone`.
- **PersonAuthorsSchema**: Replace hardcoded "20 anos" with `EMPRESA.metricas.experienciaAnos`.
- **FooterReviewsBadge**: Ensure JSDoc and metadata references use `PATRO_SOCIAL_PROOF`.

### Pages
- **Sobre.tsx**: 
  - Update `SOBRE_FAQS` to use `EMPRESA` metrics (CNPJ, SUSEP, years, partners, phone, hours).
  - Ensure `stats` and narrative text use `EMPRESA` and `PATRO_SOCIAL_PROOF`.
- **Index.tsx**: Final sweep for any remaining hardcoded snippets.

### Data
- **blogAutoContent.ts**: Update template strings in blog content to reflect current metrics dynamically.

## Technical Details
- Import `EMPRESA` from `@/config/empresa` in all target files.
- Import `PATRO_SOCIAL_PROOF` from `@/lib/patroSocialProof` for review-related data.
- Use template literals `` `${EMPRESA.metricas.x}` `` where strings are concatenated.

## Verification Plan
- Run `grep` again to confirm zero hits for hardcoded values (except in `empresa.ts` and `patroSocialProof.ts`).
- Manually inspect `/sobre` and `/` in the preview to verify data rendering.
- Check Rich Snippets in `/admin/schema-dashboard` (if applicable) or via build logs.
