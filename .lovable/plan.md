## Monitoramento contínuo de SEO — plano

Cron diário audita todas as ~836 rotas do sitemap, persiste resultados, compara com a rodada anterior e dispara email quando aparecem falhas novas. Um dashboard admin mostra o histórico e permite drill-down por rota.

---

### 1. Modelo de dados (migration)

Duas tabelas em `public`, com RLS restrita a admins (função `has_role` já existe):

- **`seo_audit_runs`** — uma linha por execução do cron
  - `id uuid pk`, `started_at`, `finished_at`, `total_urls`, `passed`, `warned`, `failed`, `new_failures`, `duration_ms`, `triggered_by text` (`cron`/`manual`)
- **`seo_audit_findings`** — uma linha por falha/aviso detectado numa rodada
  - `id uuid pk`, `run_id fk`, `route text`, `severity` (`error`|`warn`), `rule text` (ex.: `title_too_long`, `missing_canonical`), `message text`, `first_seen_at`, `is_new boolean`, `ignored boolean default false`

GRANT SELECT/INSERT ao `service_role`; SELECT ao `authenticated` filtrado por `has_role(auth.uid(), 'admin')` via policy.

### 2. Edge Function `seo-audit-crawler`

Percorre `sitemap-index.xml` → todos os sub-sitemaps → todas as URLs (~836). Concorrência de 10 fetches paralelos (limite HTTP do runtime). Aplica as mesmas regras já usadas em `scripts/audit-seo-runtime.mjs`:

- HTTP 200
- `<title>` único, 10–60 chars, sem "Lovable"
- description única, 50–160 chars
- canonical https absoluto único
- og:title/description/url/type/image absolutos + twitter:card
- ≥1 JSON-LD parseável, exatamente 1 `<h1>`
- robots sem `noindex` (respeitando `NOINDEX_ALLOW`)

Ao final:
1. Insere 1 linha em `seo_audit_runs`.
2. Insere N linhas em `seo_audit_findings`.
3. Compara `route+rule` com a última rodada anterior: marca `is_new=true` nas que não existiam.
4. Se `new_failures > 0`, invoca `send-form-email` (SMTP existente) com resumo consolidado + top 20 novas falhas + link do dashboard.

### 3. Agendamento (cron)

Habilita `pg_cron` e `pg_net`. Usa o padrão já presente em `trigger_monitor_rich_results` — insert via ferramenta insert (não migration, pois embute service key):

```sql
select cron.schedule(
  'seo-audit-daily', '0 6 * * *',   -- 06:00 UTC = 03:00 BRT
  $$ select net.http_post(url:='...functions/v1/seo-audit-crawler', ...) $$
);
```

### 4. Dashboard `/admin/seo-monitor`

Nova página React protegida por `<RequireAdmin>`:

- **Header:** stats da última rodada (total, passed, warned, failed, novas falhas, duração) + botão "Rodar agora".
- **Timeline:** últimas 30 rodadas em gráfico linha (failed/warned/passed).
- **Tabela de findings** da rodada selecionada: filtros por severidade, regra e busca de rota; badge `NOVO` em `is_new=true`; botão ignorar (`ignored=true`, muda a política de alerta).
- **Drill-down:** clicar numa rota abre modal com histórico da regra nas últimas 30 rodadas.

Rota adicionada em `src/App.tsx`, link no menu admin existente.

### 5. Email de alerta

Um único email por rodada quando `new_failures > 0`:

- Assunto: `[SEO Alert] N novas falhas em www.patroseguros.com.br`
- Corpo: contagem por regra + até 20 exemplos + link `/admin/seo-monitor?run={id}`.
- Remetente: `alertas@patroseguros.com.br` via SMTP HostGator já configurado.
- Destinatário: primeiro admin registrado em `user_roles` (fallback para `contato@patroseguros.com.br`).

Nenhum email quando `new_failures = 0` (evita ruído — o dashboard sempre reflete o estado atual).

---

### Detalhes técnicos

**Runtime da edge function:** timeout 400s. 836 URLs com concorrência 10 e ~500ms por fetch → ~45s. Se um sitemap crescer muito, o worker faz batching interno.

**Idempotência:** `run_id` uuid v4 gerado no início; findings inseridos em bulk via um único `insert` com array — se a função reiniciar no meio, o run fica sem `finished_at` e é ignorado pelo dashboard (marcado como "aborted").

**Segurança:** RLS permite SELECT apenas para `has_role(auth.uid(), 'admin')`. Service role usado pela edge function bypassa RLS conforme padrão. Nenhum dado sensível — só URLs públicas.

**Retrocompatibilidade:** não altera nenhum script existente (`audit-seo-runtime.mjs`, `validate-jsonld-build.mjs`, `validate-artigos-jsonld.mjs`). Este monitor é um observador em produção; os validadores de build continuam sendo o gate pré-deploy.

**Arquivos criados/modificados:**
- `supabase/migrations/<ts>_seo_monitor.sql` (novo)
- `supabase/functions/seo-audit-crawler/index.ts` (novo)
- `src/pages/AdminSeoMonitor.tsx` (novo)
- `src/App.tsx` (nova rota)
- `src/components/crm/DashboardOverview.tsx` ou header admin (link)
- Insert SQL do `cron.schedule` (via insert tool, não migration)
