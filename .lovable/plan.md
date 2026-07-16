## Objetivo
Garantir JSON-LD `BreadcrumbList` em 100% das páginas indexáveis, sem duplicidade com páginas que já emitem `BreadcrumbSchema` (ex.: `/como-comparar-seguradoras-guarulhos`, páginas de seguradora, hubs, templates de seguro).

## Situação atual
- 30 páginas + 5 templates (`InsurancePageTemplate`, `HealthPlanTemplate`, `InsurerPageTemplate`, `PartnerInsurerPage`, `InsurancePageTemplate`) já emitem `BreadcrumbSchema`.
- **Sem breadcrumb**: `LocalPageTemplate`, `LandingPageTemplate`, `PremiumPageTemplate`, `SeoLocalPage`, e ~40 páginas standalone (Blog, Cotacao, FAQ, Hubs, Landings, Investimentos, Imprensa, etc.).

## Abordagem
Injetar breadcrumb **automaticamente via `PageMeta`**, com opção de opt-out para páginas que já emitem o próprio.

### 1. Novo componente `AutoBreadcrumbSchema`
- Deriva itens a partir de `location.pathname`.
- Usa um mapa `ROUTE_LABELS` (rota → label legível em pt-BR) para trechos conhecidos (`/blog`, `/cotacao`, `/seguros-guarulhos`, `/hub-*`, etc.).
- Fallback: capitaliza segmento e troca `-` por espaço.
- Sempre começa com `Início` (`/`).
- Não renderiza nada em rotas ignoradas (raiz `/`, admin, CRM, `/404`, `/cotacao-obrigado`).

### 2. Integração em `PageMeta`
- Nova prop opcional `skipBreadcrumb?: boolean` (default `false`).
- Renderiza `<AutoBreadcrumbSchema />` sempre que `skipBreadcrumb !== true` e a rota não estiver na lista de ignorados.

### 3. Opt-out nas páginas que já emitem
Adicionar `skipBreadcrumb` em `PageMeta` das páginas/templates que já usam `BreadcrumbSchema` manualmente, evitando duplicidade:
- `InsurancePageTemplate`, `HealthPlanTemplate`, `InsurerPageTemplate`, `PartnerInsurerPage`
- Páginas standalone com breadcrumb próprio (`ComoCompararSeguradorasGuarulhos`, `SeguradorasParceirasHub`, `SeguradoraParceiraSeoPage`, `Contato`, `Sobre`, `Consorcio`, `GlossarioSeguros`, `AvaliacoesClientes`, `CorretoraDeSegurosEmGuarulhos`, `BlogAuthor`, `BlogCategory`, `NichoClinicasOdontologicas`, `NichoClinicasVeterinarias`, `NichoEmpresarios`, `NichoLojistasGuarulhos`, `ParceriasClinicasOdontologicas`, `Servicos`, `Depoimentos*` etc. — os 30 arquivos já mapeados).

### 4. Detalhes técnicos
- URLs geradas com `getCanonicalUrl(pathSoFar)` para consistência com o restante do site.
- Componente emite `<script type="application/ld+json">` via `Helmet` (mesmo padrão de `BreadcrumbSchema.tsx`).
- Rotas dinâmicas (`/blog/:slug`, `/:seguradora`, `/seguros-guarulhos/:bairro`) recebem o segmento cru humanizado — aceitável para SEO técnico e evita necessidade de conhecer o título real.

## Resultado
- 100% das rotas indexáveis passam a emitir `BreadcrumbList` válido.
- Zero duplicação (páginas com breadcrumb custom mantêm o seu via `skipBreadcrumb`).
- Consistência de URLs canônicas em todos os JSON-LD.