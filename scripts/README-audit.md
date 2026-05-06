
## audit-canonical.mjs

Crawls every product/SEO route (from `src/lib/insuranceHubLinks.ts` + `public/sitemap.xml`)
and validates host/protocol/canonical consistency:

1. `https://patroseguros.com.br/<path>` → must `301` to `https://www.patroseguros.com.br/<path>`
2. `http://www.patroseguros.com.br/<path>` → must `301` to HTTPS
3. `https://www.patroseguros.com.br/<path>` → must `200` and serve a `<link rel="canonical">` and `<meta og:url>` pointing to the exact same URL.

### Run

```bash
node scripts/audit-canonical.mjs
# or against the preview/staging:
node scripts/audit-canonical.mjs --base=https://patroseguros.lovable.app
```

Outputs CSV + JSON reports to `audit-output/canonical-audit-<timestamp>.{csv,json}`
and exits with code `1` if any URL fails — perfect for CI.
# Auditoria automatizada de AggregateRating (JSON-LD)

Script Playwright que abre cada página de produto, espera o React injetar os
blocos `<script type="application/ld+json">`, e verifica se existe um schema com
`aggregateRating.ratingValue` + `reviewCount` (consistente com `PATRO_RATING`
em `src/components/AggregateRatingSchema.tsx`).

## Uso

```bash
# 1. Instalar Playwright + Chromium (uma vez)
npm i -D playwright
npx playwright install chromium

# 2. Rodar contra produção (recomendado para auditoria final)
BASE_URL=https://www.patroseguros.com.br node scripts/audit-aggregate-rating.mjs

# 2b. Ou contra a preview do Lovable
BASE_URL=https://patroseguros.lovable.app node scripts/audit-aggregate-rating.mjs

# Variáveis opcionais
CONCURRENCY=6 TIMEOUT_MS=30000 BASE_URL=... node scripts/audit-aggregate-rating.mjs
```

## Saídas (em `audit-reports/aggregate-rating/<timestamp>/`)

- `report.json` — resultado estruturado por URL (status HTTP, schemas, rating).
- `report.csv`  — planilha para abrir no Excel/Sheets.
- `report.md`   — resumo legível com tabela ✅/❌.
- `<slug>.json` — JSON-LD bruto capturado para cada página (evidência).
- `<slug>.png`  — screenshot da página (evidência visual).

O processo retorna **exit code 1** se alguma rota não tiver AggregateRating, o
que permite plugar em CI (GitHub Actions) como gate de SEO.

---

## audit-breadcrumb-jsonld.mjs

Valida o JSON-LD `BreadcrumbList` de **todas as páginas de seguros** (102 rotas):
estrutura schema.org, `@type`, `position` sequencial, `name` não-vazio, `item`
sempre na URL canônica `https://www.patroseguros.com.br`, e item final sem
campo `item` (recomendação do Google).

```bash
# modo estático (rápido, valida o que o template gera)
node scripts/audit-breadcrumb-jsonld.mjs

# modo live (faz fetch e valida o HTML servido em produção)
node scripts/audit-breadcrumb-jsonld.mjs --live

# live contra um preview
node scripts/audit-breadcrumb-jsonld.mjs --live --base=https://patroseguros.lovable.app
```

Exit code 1 se houver qualquer rota com breadcrumb inválido — pronto para CI.
