
# Plano de execução — SEO técnico + GEO + YMYL

Esta demanda é grande demais para um único turno. Proponho executá-la em **8 fases sequenciais**, cada uma entregue em um turno separado, com validação no final de cada uma. Cada fase abaixo já está detalhada o suficiente para eu implementar sem novas dúvidas, mas quero seu OK antes de começar — e principalmente decidir os **pontos bloqueantes** listados no fim.

---

## Fase 1 — Redirect 301 apex→www + canonical + HTTPS
- Criar `public/.htaccess` (o projeto está hospedado no HostGator — memória confirma) com:
  - `RewriteCond %{HTTPS} off` → 301 para https
  - `RewriteCond %{HTTP_HOST} ^patroseguros\.com\.br` → 301 para `www.patroseguros.com.br`
- Auditar `src/lib/canonical.ts` (já usa www e sem trailing slash — OK, só confirmar) e varrer o projeto por URLs absolutas hardcoded `https://patroseguros.com.br` (sem www) para trocar por `CANONICAL_BASE_URL` ou caminhos relativos.
- Rodar `rg` para garantir que todo `<Link>`/`<a>` interno use path relativo.

## Fase 2 — Componente `NapBlock` + inserção global no Footer
- Criar `src/components/NapBlock.tsx` com `<address itemscope itemtype="https://schema.org/InsuranceAgency">`, texto exato pedido, `tel:`, `mailto:` e link "Ver no mapa".
- Inserir dentro de `src/components/Footer.tsx` (já é global). Garantir que apareça também no HTML pré-renderizado (Footer já entra no bundle prerender).
- Todos os dados vêm de `src/config/empresa.ts` (Bloco 0 já existe).

## Fase 3 — `JsonLd.tsx` consolidado
- Criar `src/components/JsonLd.tsx` como wrapper único.
- **4.1 InsuranceAgency global**: hoje já existe `OrganizationSchema` + `LocalBusinessSchema`. Vou consolidar em um único nó `InsuranceAgency` com `@id=".../#organizacao"` no `App.tsx` (uma vez só, sitewide) e remover duplicidades. `sameAs` vai puxar Instagram/Facebook/LinkedIn de `empresa.ts` (adicionar campo `redesSociais`).
- **4.2 Service**: já existe `ServiceSchema` referenciando `#organizacao` — validar `@id` e `description` em todas as rotas de produto.
- **4.3 FAQPage**: `FAQSchema` já existe. Auditar que o texto do schema bate 1:1 com o visível.
- **4.4 BreadcrumbList**: `BreadcrumbSchema` já é auto-emitido via `PageMeta`. Adicionar breadcrumb **visual** no topo das páginas de produto que ainda não têm.
- **4.5 Review/AggregateRating**: só se depoimentos forem reais. **Pergunta bloqueante abaixo.**

## Fase 4 — Reestruturação de conteúdo das páginas de produto (formato pergunta+resposta direta)
Escopo: **13 páginas de produto** (`/seguro-auto-guarulhos`, `-moto-`, `-residencial-`, `-vida-saude-`, `-empresarial-`, `-pme-`, `-frota-empresas-`, `-condominio-`, `/plano-saude-guarulhos`, `/consorcio-guarulhos`, etc.).
- Reescrever cada página seguindo o padrão:
  - 1 H1 com termo exato + Guarulhos
  - 6–8 H2 no formato pergunta real
  - Primeira frase = resposta autocontida e citável
  - Seção FAQ com 6–10 perguntas + `FAQSchema`
  - Mínimo 1.200 palavras
  - Ancoragem local obrigatória (bairros, referências, vias, cidades vizinhas) — de forma natural
- Atualizar `scripts/seo-content-full.mjs` (já criado) para refletir esse novo texto em cada rota, para que o prerender sirva 1.200+ palavras aos crawlers sem JS.
- Resolver o bug pendente do turno anterior: `prerender-react.mjs` sobrescrevendo o output rico de `prerender.mjs` nas 14 rotas críticas (adicionar exclusão dessas rotas ou merge do texto injetado).

**Esta é a fase mais pesada — provavelmente vou dividir em Fase 4a (Pessoa Física, 5 páginas) e Fase 4b (Pessoa Jurídica, 5 páginas) + 4c (Consórcio/Saúde/Auto premium, 3 páginas).**

## Fase 5 — E-E-A-T / YMYL cleanup
- `rg` global por: `"20 anos"`, `"15 anos"`, `"duas décadas"`, `"500 apólices"`, `"mais de 500"`.
- Substituir por: *"A Patro Seguros foi fundada em 2021 por profissionais com mais de 20 anos de experiência no mercado segurador."* (frase única, cadastrada em `EMPRESA.posicionamento` — já existe).
- Auditar `AutoridadePatro.tsx`, `PremiumTrustBlock.tsx`, blog posts, dados em `src/data/*Content.ts`.
- Criar seção **"Autoridade e regulamentação"** na `/sobre`: razão social, CNPJ, SUSEP com link `https://www2.susep.gov.br/...`, biografia dos corretores responsáveis com foto, aviso CNSP 382/2020 + CDC.
- Adicionar `<meta name="author">`, `article:published_time`, `article:modified_time` em todos os blog posts (via Helmet no template do blog).

**Pergunta bloqueante:** quem é o corretor responsável a exibir na /sobre? Nome, foto (upload) e bio de 3–4 linhas.

## Fase 6 — `robots.txt` + `sitemap.xml`
- Reescrever `public/robots.txt` **exatamente** como pedido (o atual é maior, tem Disallows específicos). **Pergunta bloqueante:** preservo os `Disallow: /admin/`, `/api/`, `/ebook-consorcio/`, `/performance-diagnostico`, etc. (que existem hoje) ou faço substituição literal pela versão minimalista pedida? Recomendo **preservar** os Disallows atuais + adicionar os 8 user-agents de IA.
- Sitemap: hoje existe `sitemap-index.xml` + 4 sub-sitemaps gerados por `scripts/build-sitemap-index.mjs` e `refresh-sitemaps.mjs`. O pedido é um **`sitemap.xml` único**. Recomendo **manter o index** (é padrão Google e já funciona) — apontar `Sitemap:` do robots para `sitemap-index.xml`. Confirmar OK.
- Garantir `<lastmod>` real (não data de build — memória `sitemap-lastmod-policy`) e `<priority>` coerente (1.0 home, 0.8 produtos, 0.5 institucionais).
- Filtrar URLs 404/redirect/noindex antes de gerar.

## Fase 7 — Performance (PSI 90+ mobile)
- Auditoria com Lighthouse local em `/` e `/seguro-auto-guarulhos`.
- Ações: `OptimizedImage` já converte para WebP e força `width`/`height` (memória confirma). Verificar cobertura em todas as imagens.
- `loading="lazy"` abaixo da dobra + `fetchpriority="high"` no LCP de cada rota (já parcialmente feito via `PageMeta.preloadImage`).
- Fontes: revisar `index.html` para `font-display: swap`, remover pesos não usados.
- Code splitting por rota (Vite já faz via `React.lazy` nas rotas — auditar `App.tsx`).
- Facebook Pixel (`2108358063295698`): mover para `defer` / lazy após interação. Cuidado: `<noscript>` deve ficar no início do `<body>` (memória).
- Purgar CSS/JS não usado (Tailwind purge já ativo; auditar bundle com `rollup-plugin-visualizer`).
- Adicionar `<link rel="preconnect">` para GTM, Meta, Google Fonts, Supabase.

## Fase 8 — Silo temático + navegação interna
- Auditar `insuranceHubLinks.ts` já existente e reforçar bidirecionalidade.
- Cada pilar (Auto para PF, Empresarial para PJ) linka para todos os satélites com âncoras variadas.
- Cada satélite linka de volta ao pilar + para 1–2 irmãos temáticos.
- `TrilhaSeoRelacionados.tsx` já existe — garantir presença em todas as páginas de produto com 3–4 links contextuais.
- Rodapé de navegação: `Footer.tsx` já lista os principais produtos — expandir para cobrir 100% das rotas de produto.
- Validar profundidade ≤3 cliques da home com `scripts/check-internal-links.mjs` (já existe).

## Checklist final (Bloco 8)
Após todas as fases, rodo:
- `curl -s https://.../ | wc -w` em cada rota
- `rg "Recarregar página"` no `dist/`
- `rg "4210-5274"` no repo
- Rich Results Test via API (ou aviso manual)
- PSI mobile via API (ou aviso manual)
- Todos os itens do checklist marcados

---

## Detalhes técnicos

- **Stack**: React 18 + Vite 5 + Tailwind + Helmet Async. Hospedagem HostGator (Apache → `.htaccess`).
- **Prerender**: `scripts/prerender.mjs` + `scripts/prerender-react.mjs` (Chromium). Conflito pendente a resolver na Fase 4.
- **Config única**: `src/config/empresa.ts` já é fonte da verdade (Bloco 0 do turno anterior).
- **Testes existentes**: `scripts/validate-word-count.mjs`, `validate-rich-snippets.mjs`, `robots-http.test.ts`, `sitemap-canonical.test.ts`, `PageMeta.robots.test.tsx`, Playwright `e2e/seo-meta.spec.ts`. Vou estender, não recriar.

---

## Pontos bloqueantes — preciso da sua resposta antes de começar

1. **Depoimentos reais (Fase 3.5)**: você tem depoimentos/notas verificáveis (Google Reviews, print, autorização por escrito) para emitir `Review`/`AggregateRating`? Se não, **NÃO emito** (risco de penalização manual).
2. **Corretor responsável na /sobre (Fase 5)**: nome completo, foto (link/upload) e bio curta de quem é o(s) responsável(is) técnico(s) com os 20+ anos de experiência.
3. **robots.txt (Fase 6)**: preservo os Disallows atuais (`/admin/`, `/api/`, `/ebook-consorcio/`, dashboards internos) e apenas adiciono os 8 user-agents de IA? Recomendo sim.
4. **sitemap.xml (Fase 6)**: mantenho a estrutura atual `sitemap-index.xml` + 4 sub-sitemaps (padrão Google, já funcional) ou colapso tudo em um `sitemap.xml` único como pedido literalmente?
5. **CEP e coordenadas (Bloco 0 pendente)**: `empresa.ts` tem TODOs para CEP exato do Edifício Via Alameda e latitude/longitude. Você confirma `07115-000` e `-23.4611, -46.5334`? Sem isso, o JSON-LD do InsuranceAgency vai com valores aproximados.
6. **Redes sociais para `sameAs`**: já tenho Instagram (`patroseguros`), Facebook (`patroseguros`), LinkedIn (`patro-seguros`). Confirmar URL do **Google Business Profile** e Wikidata (docs sugerem existir).
7. **Ordem de execução**: começo pela Fase 1 (mais rápida e destravante) ou você prefere que eu ataque a Fase 4 (conteúdo — a mais impactante para GEO) primeiro?

Assim que você responder esses 7 pontos, começo pela fase que você indicar.
