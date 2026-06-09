### Analysis
The user wants to create a new "Odontology Hub" for Patro Seguros, similar to the previously implemented "Lojistas" and "Vistoria Veicular" hubs. This includes a main hub page, several specific product pages, a partnership page, a blog category, and a set of SEO articles.

### Implementation Strategy

#### 1. Page Creation
- **Main Hub:** `/seguros-para-clinicas-odontologicas` (using `NichoClinicasOdontologicas.tsx`)
- **Specific Pages (using `InsurancePageTemplate`):**
    - `/seguro-para-dentistas`
    - `/seguro-consultorio-odontologico`
    - `/seguro-clinica-odontologica`
    - `/responsabilidade-civil-dentistas` (Redirect or update existing `SeguroRCDentistas.tsx`)
    - `/seguro-equipamentos-odontologicos`
    - `/plano-saude-clinicas-odontologicas`
    - `/seguro-vida-clinicas-odontologicas`
- **Partnership Page:** `/parcerias-clinicas-odontologicas`
- **Blog Category:** `/blog/odontologia`

#### 2. Blog & SEO Content
- Create `src/data/blogOdontologiaData.ts` and add the 1 main article + 15 SEO articles.
- Update `src/lib/blogData.ts` to export these new articles.
- Update `src/App.tsx` with all new routes.

#### 3. Navigation & Components
- Add "Clínicas Odontológicas" to `Header.tsx` (Mobile and Desktop menus).
- Add to `Footer.tsx` in the local hubs/segments section.
- Implement Local Business and FAQ schemas for the hub page.

#### 4. Lead Capture
- Use the existing `InsuranceQuoteForm` or a specialized one for the odontology niche with the requested fields (CRO, clinic name, etc.).

### Technical Details
- **Tech Stack:** React, TypeScript, Tailwind CSS, Lucide Icons, React Router.
- **Components:** `InsurancePageTemplate` will be reused for product pages.
- **Routing:** New routes in `App.tsx` mapped to the new components.
- **SEO:** Meta tags, canonical URLs, and JSON-LD schemas (FAQ, LocalBusiness) will be included.

### User Questions
- Do you have specific images for the odontology niche, or should I use generic high-quality placeholders?
- For the "Responsabilidade Civil para Dentistas", should I replace the existing `/seguro-rc-dentistas` route or create a new one with a redirect?
