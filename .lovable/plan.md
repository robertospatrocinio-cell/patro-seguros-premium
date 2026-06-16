# Plano de refatoração e otimização — Patro Seguros

Cada etapa é entregável de forma independente, com critério de pronto e métrica antes/depois. Recomendo executar nesta ordem (do menor risco e maior ROI ao mais estrutural).

---

## Etapa 1 — Higiene de código e segurança (1 PR pequeno)

**Objetivo:** remover ruído operacional e fechar pontas soltas que já mapeei.

- Remover `console.log` restantes em código de produção (`PerformanceDiagnostico` e demais).
- Padronizar `console.error` cru com objeto `Error` (não `error.message`) para preservar stack no Sentry.
- Trocar `(window as any).fbq/gtag` por tipos compartilhados em `src/types/tracking.d.ts`.
- Auditar todas as rotas `/admin/*` confirmando `<RequireAdmin>` (já feito p/ `/performance`).
- Confirmar `escapeHtml` em **todo** campo dinâmico injetado em e-mail das Edge Functions.

**Pronto quando:** `rg -n "console\.(log|warn)" src/ | wc -l` ≤ 5 (apenas debug intencional) e `rg -n "as any" src/lib src/hooks | wc -l` reduzido em 50%.

---

## Etapa 2 — Tipagem forte dos hooks de dados (1 PR médio)

**Objetivo:** eliminar os ~145 `no-explicit-any` que mascaram bugs do Supabase.

- Substituir interfaces manuais `Contact`/`Lead`/`Claim` por `Database['public']['Tables']['<t>']['Row']` (gerado em `src/integrations/supabase/types.ts`).
- Tipar payloads das mutations (`Insert`/`Update`).
- Remover `as any` em `dateFields.forEach`, `uploadDocument`, etc. usando `Partial<Insert>` correto.
- Adicionar testes mínimos de tipo (compile-time) com `expectTypeOf` em `useContacts`, `useLeads`, `useClaims`.

**Pronto quando:** `npx eslint src/hooks src/lib --rule '@typescript-eslint/no-explicit-any: error'` passa sem warnings.

---

## Etapa 3 — Performance de dados do CRM (1 PR focado)

**Objetivo:** continuar o trabalho já iniciado (índices + staleTime) com paginação real.

- **`useContacts` paginado**: aceitar `{ page, pageSize, search }` e usar `.range()` + filtro server-side. Hoje traz todos os contatos numa única query.
- **Select específico em vez de `*`** em `useContacts` e `useLeads` (manter campos usados na UI).
- **Lazy join**: `documents (*)` e `contact_insurances` só quando o contato é expandido (sub-query por id, não LATERAL).
- **Infinite scroll** ou paginação no `ContactsModule`/`LeadsTable`.
- **Debounce** no campo de busca do CRM (`searchTerm`) para não filtrar 5000 leads a cada tecla.
- Cache de `kanban_stages` com `staleTime: Infinity` (raramente muda).

**Métrica:** rodar `pg_stat_statements` antes/depois — alvo é cortar `total_ms` da query de `contacts` em ≥ 70%.

---

## Etapa 4 — Bundle e Core Web Vitals (1 PR de frontend)

**Objetivo:** reduzir JS inicial e melhorar LCP/INP do site público.

- **Bundle audit** via `vite-bundle-visualizer` → identificar top 10 maiores chunks.
- **Code-split de libs pesadas**: `@hello-pangea/dnd` (Kanban), `recharts`, `embla-carousel`, `framer-motion` — todos só nas rotas que precisam.
- **Remover `lodash-es`** trocando `debounce` por implementação inline de 6 linhas (zera dependência).
- **`React.memo` + `useMemo`** em listas longas: `KanbanBoard`, `LeadsTable`, `PartnerMarquee`.
- **Imagens**: confirmar `OptimizedImage` em todo `<img>` do site público; lazy-load fora do hero; `loading="eager" fetchpriority="high"` só no LCP.
- **Preload da fonte** principal e do hero WebP via `<link rel="preload">`.
- **Service Worker**: revisar `public/sw.js` — escopo, runtime cache de fontes/imagens, evitar cachear HTML.

**Métrica:** PageSpeed mobile ≥ 90 em `/`, `/cotacao`, `/blog`. CLS = 0, LCP < 2.5s.

---

## Etapa 5 — Endurecimento de Edge Functions (1 PR backend)

**Objetivo:** robustez e observabilidade nas funções que enviam e-mail/cotação.

- **Validação zod no servidor** em todas as 8 functions (`send-form-email`, `submit-lead`, `save-partial-quote`, etc.). Hoje algumas confiam no client.
- **Rate-limit por IP** via `public.check_rate_limit` (já existe) em `send-form-email` e `submit-lead`.
- **Retry exponencial** no envio SMTP (HostGator às vezes 421/timeout).
- **DLQ** (dead-letter queue) — já há `move_to_dlq`; usar consistentemente em `process-email-queue`.
- **Logs estruturados**: JSON com `level/event/lead_id/error_code` em vez de `console.log` solto.
- **Sentry no servidor**: instrumentar Edge Functions com `@sentry/deno`.

**Pronto quando:** cada function rejeita payload inválido com 400 + JSON estruturado, e falhas SMTP aparecem no Sentry.

---

## Etapa 6 — Arquitetura e organização (refator de longo prazo)

**Objetivo:** reduzir acoplamento e tornar o codebase navegável (~200 arquivos hoje).

- **Reorganização por feature** em vez de tipo:
  ```text
  src/
    features/
      crm/        (pages, components, hooks, types)
      blog/
      seo-local/
      forms/      (QuickQuote, Cotacao, Indique)
    shared/       (ui, lib, hooks genéricos)
  ```
- **Extrair `InsuranceQuoteForm` (683 linhas)** em sub-componentes: `QuoteFields`, `QuoteSubmit`, `QuoteSuccess`.
- **Quebrar `CRM.tsx` (422 linhas)** em containers menores; mover `stats`/`filters` para hooks dedicados.
- **`PerformanceDiagnostico.tsx` (815 linhas)** → mover regras de recomendação para `src/lib/perfRules.ts` (testável).
- **Consolidar schemas zod** no novo `src/lib/leadValidation.ts` (já criado) — migrar `IndiqueAmigo`, `EbookConsorcio`, `Cotacao` para reusar.
- **Remover variantes shadcn de componentes** (`badgeVariants`, `buttonVariants`) para arquivos `.ts` separados → habilita Fast Refresh.
- **Documentação**: atualizar `README.md` com a nova árvore + guia de contribuição (onde adicionar uma página local, um post de blog, uma function).

**Pronto quando:** nenhum arquivo `src/` ultrapassa 400 linhas e a importação cruzada feature→feature é zero (lint rule `import/no-restricted-paths`).

---

## Detalhes técnicos por etapa

- **Risco**: 1 e 2 são seguros (typing/lint). 3 e 4 exigem testes manuais no CRM e Lighthouse. 5 precisa testar Edge Functions com `supabase--curl_edge_functions`. 6 é o mais invasivo — fazer por feature, 1 PR cada.
- **Dependências**: Etapa 3 se beneficia da Etapa 2 (tipos corretos evitam regressão). Etapa 4 não depende das outras. Etapa 6 deve ser última.
- **Métricas de acompanhamento**:
  - `pg_stat_statements` (top 10 queries antes/depois)
  - Lighthouse mobile (LCP, INP, CLS) em 3 rotas-chave
  - `npm run build` size report (chunk inicial + total)
  - ESLint warnings count
  - Bundle map (`rollup-plugin-visualizer`)

---

## Sequência recomendada e tempo estimado

| # | Etapa | Esforço | Risco | Ganho |
|---|---|---|---|---|
| 1 | Higiene | 1–2h | Baixo | Médio |
| 2 | Tipagem forte | 3–4h | Baixo | Alto (qualidade) |
| 3 | CRM paginado | 4–6h | Médio | Muito alto (DB) |
| 4 | Bundle + CWV | 4–6h | Médio | Muito alto (UX pública) |
| 5 | Edge Functions | 3–5h | Médio | Alto (confiabilidade) |
| 6 | Arquitetura | 8–12h | Alto | Alto (manutenção) |

**Quer que eu comece pela Etapa 1 já?** Posso emendar direto se aprovar este plano, ou ajustar prioridades (ex: começar pela 4 se a dor maior for performance pública).
