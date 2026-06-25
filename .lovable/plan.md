## Contexto

O site já é grande: ~60 páginas (`src/pages`), 8 sitemaps, schemas (Organization, InsuranceAgency, FAQ, Breadcrumb, Service), header/footer prontos, blog com 60+ artigos, formulários com `react-hook-form`+`zod`, edge functions, monitor de Rich Results semanal (acabei de configurar). Não é um site novo — é um refino de algo já avançado.

A lista de 19 itens é grande demais para uma única passada sem perder qualidade. Quero entregar em **fases pequenas, auditáveis, com diff revisável**. Pacotão único quebra coisa.

## Fases propostas (cada uma é uma entrega independente)

### Fase 1 — Auditoria técnica + correções rápidas (1 turno)
- Rodar build, scan SEO, varrer todas as páginas para detectar: H1 duplicado/oculto, title/description duplicados, canonical errado, refs ao domínio `*.lovable.app` ou `*.lovable.dev`, console errors.
- Consolidar **8 sitemaps → 1 índice limpo**, validar `robots.txt`, remover entradas mortas.
- Relatório do que está OK vs. o que precisa correção, com lista nominal das páginas afetadas.
- **Não muda visual.** Só corrige metadata, schemas, sitemap, robots.

### Fase 2 — Metadados da Home + estrutura de headings (1 turno)
- Aplicar title/description/H1 exatos que você passou na Home.
- Garantir og:image próprio 1200×630 (gerar se não houver).
- Auditar e corrigir hierarquia H1/H2/H3 nas **14 páginas-chave** que você listou (Home, Auto, Saúde, Vida, Empresarial, Residencial, Viagem, Moto, Aluguel, Consórcio, Sobre, Blog, Contato, Cotação).
- Schemas: Organization/InsuranceAgency/LocalBusiness/WebSite na Home; Service+FAQPage+BreadcrumbList nas páginas de produto.

### Fase 3 — Design premium + header/footer (1 turno)
- Reduzir `letter-spacing` negativo nos títulos serifados, capar peso em 700, mais respiro no hero, contraste em textos sobre imagens.
- Header: menu reorganizado conforme sugestão, CTA "Cotação grátis" mais limpo, telefone discreto, mobile sem sobreposição.
- Footer: CNPJ, SUSEP, endereço, telefone, e-mail, WhatsApp, links produtos, política, redes — todos visíveis.
- Cards/botões/formulários padronizados.

### Fase 4 — Conversão (1 turno)
- Seção **Cotação Express** na Home: form de 5 campos (Nome, WhatsApp, tipo, cidade, melhor horário) → 2ª etapa com detalhes.
- CTAs padronizados ("Cotar agora", "Falar com consultor", "Comparar seguradoras", "Receber pelo WhatsApp").
- Eventos GA4/Meta em clique WhatsApp/telefone/form/email (já existe `src/lib/tracking.ts`).

### Fase 5 — Páginas locais novas para Guarulhos (1–2 turnos)
- Auditar quais das 12 páginas locais que você listou já existem (algumas existem como bairros via `LocalPageTemplate`).
- Criar as faltantes com conteúdo único 700–1200 palavras, FAQ, schema Service+LocalBusiness, links internos.
- **Não vou inventar conteúdo:** vou usar o gerador `generateLocalFAQs` que já existe + estrutura `LocalPageTemplate`.

### Fase 6 — Performance + Core Web Vitals + checklist final (1 turno)
- LCP/CLS/INP nas 5 páginas mais acessadas.
- Lazy-load abaixo da dobra, preload hero, font-display swap, imagens em WebP via `OptimizedImage` (padrão já existente).
- Página 404 com identidade, links de retorno.
- Checklist final dos 18 itens + relatório de entrega.

## Itens fora do escopo desta otimização

- **Não vou criar avaliações, selos, notas, depoimentos ou números fake** — você foi explícito.
- **Configuração de GA4/GTM/Search Console no painel externo** — código já está pronto; ativação depende de você.
- **Verificação dos Rich Results no Google** — depende do recrawl do Google (1–7 dias após deploy).

## Detalhes técnicos

- Schemas centralizados em `src/components/*Schema.tsx` e `src/lib/seoMetadata.ts` — não vou duplicar.
- Sitemap consolidado: vou unificar via plugin Vite no build (`scripts/generate-sitemap.ts` se necessário) preservando `sitemap-bairros.xml` auto-gerado.
- Memória do projeto já guarda paleta (#003366 navy, #F2994A laranja), fontes (Instrument Serif + Work Sans), padrões de schema/form — vou respeitar.

## Como quero proceder

Confirme qual fase começamos. Recomendo **Fase 1 primeiro** — sem ela, qualquer mudança visual pode mascarar problema técnico que o Google já está vendo. Depois Fase 2 (metadados/headings) que dá o maior ganho de SEO por menor esforço.

Se preferir, posso fazer **Fase 1 + Fase 2 num único turno** (são as duas mais "mecânicas"), e abrir a Fase 3 (design) numa segunda rodada com prints de antes/depois.