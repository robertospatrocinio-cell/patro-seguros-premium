# SEO and Technical Restructuring Plan for Patro Seguros

## Objective
Correct technical failures, eliminate robotic content, and implement full technical SEO (schema, canonical, sitemap) and local authority pages for Guarulhos/SP.

## Phase 1: Technical & Brand Foundation
- [x] **NAP Centralization**: Updated `src/config/empresa.ts` with correct address, CID, and business hours (8:30-18:00).
- [x] **Canonical URLs**: Forced all pages to `www.patroseguros.com.br` in `PageMeta.tsx` and `index.html`.
- [x] **Robotic Headings**: Cleaned up H1/H2 structures in `LandingSeguroAuto.tsx` and `CentralDeSinistro.tsx`.
- [x] **Image Cleanup**: Fixed malformed asset URLs (removing `%20%22` encoding artifacts).

## Phase 2: Content Expansion & Authority
- [x] **Redirects**: Consolidated hub pages (`/seguros-guarulhos`) and neighborhood redirects.
- [x] **Transport Insurance**: Expanded the formerly thin `/seguro-transporte-carga-guarulhos` page into a complete guide for Cumbica.
- [x] **Comparison Guide**: Created `/comparativo-seguradoras-guarulhos` comparing Porto, Tokio, Allianz, and HDI.
- [x] **Neighborhood Hubs**: Added Pimentas, Bonsucesso, and Vila Augusta to the local SEO strategy.

## Phase 3: SEO Dominance (Upcoming)
- [ ] **Footer Refactor**: Reduce link volume and move full map to a dedicated `/mapa-do-site` page.
- [ ] **JSON-LD Deep Integration**: Ensure `AggregateRating` and `FAQPage` are valid on all service pages via build scripts.
- [ ] **Authority Blog Posts**: Create "Cost of Insurance in [Neighborhood]" data-driven articles.

## Technical Details
- Using `InsurancePageTemplate` for all new service landings.
- Canonical enforcement via `PageMeta` component.
- Local authority reinforced by CID mapping in `NapBlock` and `GoogleBusinessWidget`.
