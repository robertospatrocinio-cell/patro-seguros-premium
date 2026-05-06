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
