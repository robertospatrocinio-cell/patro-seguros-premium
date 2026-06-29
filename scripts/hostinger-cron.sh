#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Wrapper para cron da Hostinger: renova lastmod dos sitemaps no public_html
# e dispara "ping" para o Google (legacy) + Bing reindexar o sitemap-index.
#
# Instalação na Hostinger (hPanel → Avançado → Cron Jobs):
#   1) Faça upload deste arquivo e de scripts/refresh-sitemaps.mjs para
#      /home/USER/public_html/scripts/ (ajuste USER).
#   2) chmod +x /home/USER/public_html/scripts/hostinger-cron.sh
#   3) Crie o cron com periodicidade semanal (ex.: segunda 04:00):
#        0 4 * * 1 /home/USER/public_html/scripts/hostinger-cron.sh
# ---------------------------------------------------------------------------
set -euo pipefail

SITE_DIR="${SITE_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
SITE_URL="${SITE_URL:-https://www.patroseguros.com.br}"
SITEMAP_URL="${SITEMAP_URL:-$SITE_URL/sitemap-index.xml}"
NODE_BIN="${NODE_BIN:-/usr/bin/node}"
LOG_DIR="${LOG_DIR:-$SITE_DIR/logs}"
# Opcionais para reindex automático:
#   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  → dispara edge function resubmit-sitemaps (GSC)
#   INDEXNOW_KEY                             → dispara IndexNow (Bing/Yandex/Seznam)
export SITE_URL SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY INDEXNOW_KEY

mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/sitemap-refresh-$(date +%Y%m%d).log"

{
  echo "==== $(date -u +%FT%TZ) refresh-sitemaps start ===="
  echo "SITE_DIR=$SITE_DIR  SITEMAP=$SITEMAP_URL"

  # 1) Atualiza <lastmod>, regrava robots.txt e dispara reindex (GSC + Bing)
  #    O próprio script faz o ping/notify quando há alterações.
  "$NODE_BIN" "$SITE_DIR/scripts/refresh-sitemaps.mjs" --dir "$SITE_DIR"

  echo "==== $(date -u +%FT%TZ) done ===="
} >> "$LOG_FILE" 2>&1