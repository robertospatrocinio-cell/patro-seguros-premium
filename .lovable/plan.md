## Painel: Web Vitals × Conversões × Leads

Painel admin correlacionando performance (LCP/CLS/INP) com resultados de negócio, agrupado por página e dispositivo.

### Fontes de dados (já existentes)
- `web_vitals_metrics` — `metric_name`, `value`, `rating`, `page`, `device_type`, `session_id`, `created_at`
- `conversion_click_events` — `event_type`, `page_path`, `session_id`, `user_agent`, `created_at`
- `leads` — `source_page`, `created_at`

Chave de correlação principal: `session_id` (Web Vitals ↔ Conversion Clicks). Leads não têm `session_id`, então são agregados por `source_page`.

### Backend (1 migration)
Cria função `public.get_web_vitals_correlation(p_days int, p_device text)` — `SECURITY DEFINER`, restrita a `has_role(auth.uid(),'admin')` — que retorna, por `page` × `device_type` no período:

- `sessions` (distintos)
- `p75_lcp`, `p75_cls`, `p75_inp` (via `percentile_cont`)
- `good_lcp_pct`, `good_cls_pct`, `good_inp_pct` (a partir de `rating='good'`)
- `conversions` (contagem de `conversion_click_events` da mesma page/device via `session_id`)
- `leads_count` (contagem de `leads` com `source_page = page`)
- `conversion_rate` = conversions / sessions
- `lead_rate` = leads / sessions

Também cria `get_web_vitals_timeseries(p_metric, p_page, p_device, p_days)` para o gráfico diário.

Sem novas tabelas. Sem alteração de RLS existente. Grants: `EXECUTE` para `authenticated`; o próprio corpo checa `has_role`.

### Frontend
Nova rota `/admin/web-vitals-correlacao` (dentro de `RequireAdmin`, já lazy):

`src/pages/admin/WebVitalsCorrelation.tsx`
- Filtros: período (7/30/90 dias), dispositivo (todos / mobile / desktop / tablet)
- Cards de topo: p75 global de LCP/CLS/INP + total de conversões e leads
- Tabela ordenável por página: p75 LCP, p75 CLS, p75 INP, % good, sessões, conversões, taxa de conversão, leads, taxa de lead — com destaque visual quando `good_pct < 75%` ou vitals no vermelho
- Scatter (recharts) LCP × Conversion rate por página, com raio = sessões — mostra visualmente se páginas lentas convertem menos
- Linha temporal do vital selecionado para a página escolhida

Reutiliza `supabase.functions` diretamente via `supabase.rpc(...)`; shadcn `Table`, `Card`, `Select`; recharts já no bundle. Rota carregada via `React.lazy` para não pesar no bundle inicial.

Link discreto no header admin existente (se houver) — caso contrário apenas via URL direta.

### Fora do escopo
- Não altera coleta de Web Vitals (`src/lib/webVitals.ts` continua igual)
- Não altera CookieBanner nem GTM
- Não cria nova tabela — apenas leitura agregada