# Implementation Plan - Phases 1 & 2: Architecture & Home Evolution

Transform the Patro Seguros website into a robust digital platform while maintaining its local expertise in Guarulhos.

## Phase 1: Architecture & Navigation
Reorganize the main menu and footer to improve discovery and alignment with industry best practices.

### 1.1 Header Restructuring
- **Para você**: Auto, Moto, Residencial, Vida, Saúde, Viagem, Celular, Motorista App, Consórcio.
- **Para sua empresa**: Empresarial, Frota, Transporte, Transportadoras, Galpões, RC, Cyber, Saúde PME, Vida Grupo, Máquinas.
- **Agronegócio**: Rural, Máquinas Agrícolas, Equipamentos, Propriedade Rural, Pecuário, Transporte Agro.
- **Atendimento**: Solicitar Cotação, Renovar Seguro, Acionar Sinistro, Assistência 24h, Segunda Via, Falar com Consultor, Área do Cliente.
- **Conteúdo**: Blog, Guias, Calculadoras, Perguntas Frequentes.

### 1.2 Footer Realignment
- Group links according to the new architecture.
- Ensure all essential links (About, Contact, Legal) remain easily accessible.

## Phase 2: New Home Oriented to Conversion
Redesign the homepage to focus on user intent and clear calls to action.

### 2.1 Hero Section Evolution
- Update H1: "Corretora de Seguros em Guarulhos".
- Update Support Text: Focused on comparison and consulting.
- Primary CTAs: "Solicitar cotação" and "Falar no WhatsApp".

### 2.2 Product Selector ("O que você quer proteger?")
- Implement a prominent selector component after the hero.
- Options: Car, Moto, House, Family, Health, Company, Fleet, Cargo, Heritage, Machines.
- Direct users to relevant quote paths.

### 2.3 Section Reorganization
1. Product Selector.
2. Main Insurance Products.
3. How it Works (Process).
4. Partner Insurers.
5. Proposal Comparison (Placeholder for Phase 4).
6. Real Reviews.
7. B2B Solutions (Patro Empresas).
8. Local Authority (Guarulhos focus).
9. Tools & Content.
10. FAQ.
11. Final CTA.

## Technical Details
- **Components**: Create `HomeSelector.tsx`, update `Header.tsx`, `Footer.tsx`, and `Index.tsx`.
- **SEO**: Preserve `PageMeta`, `LocalBusinessSchema`, and existing canonical tags.
- **Icons**: Use `Lucide-React`.
- **Responsive**: Mobile-first design for all new elements.
