import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import nodemailer from "npm:nodemailer@6.9.8";

const SITE_HOST = "https://www.patroseguros.com.br";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const shortUrl = (u: string) => u.replace(SITE_HOST, "") || "/";

type AlertRow = {
  url: string;
  previous_state: string | null;
  new_state: string;
  transition_type: string;
  notified_at: string;
};

type StatusRow = {
  url: string;
  coverage_state: string | null;
  checked_at: string;
};

function classify(coverage: string | null | undefined): "indexed" | "discovered" | "failed" | "other" {
  if (!coverage) return "other";
  const c = coverage.toLowerCase();
  if (c.includes("submitted and indexed") || c.includes("indexed, not submitted") || c === "indexed") return "indexed";
  if (c.includes("discovered") || c.includes("crawled - currently not indexed") || c.includes("unknown to google")) return "discovered";
  if (c.includes("failed") || c.includes("error") || c === "inspection_failed") return "failed";
  return "other";
}

function bucketLabel(t: string): { label: string; emoji: string } {
  if (t === "discovered_to_indexed") return { label: "Indexadas", emoji: "✅" };
  if (t === "deindexed") return { label: "Desindexadas", emoji: "⚠️" };
  return { label: "Outras mudanças", emoji: "ℹ️" };
}

serve(async (req) => {
  try {
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim();
    if (!token || token !== serviceKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey);
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // 1) Todas as transições da última semana
    const { data: alerts, error: alertsErr } = await admin
      .from("gsc_indexation_alerts")
      .select("url,previous_state,new_state,transition_type,notified_at")
      .gte("notified_at", since)
      .order("notified_at", { ascending: false });
    if (alertsErr) throw alertsErr;
    const week = (alerts ?? []) as AlertRow[];

    // 2) Snapshot atual (última leitura por URL) para o "status agora"
    const { data: statusRaw } = await admin
      .from("gsc_indexation_status")
      .select("url,coverage_state,checked_at")
      .order("checked_at", { ascending: false })
      .limit(1000);
    const latest = new Map<string, StatusRow>();
    ((statusRaw ?? []) as StatusRow[]).forEach((r) => {
      if (!latest.has(r.url)) latest.set(r.url, r);
    });

    // 3) Agregados por status atual
    const statusCounts = { indexed: 0, discovered: 0, failed: 0, other: 0 } as Record<string, number>;
    latest.forEach((r) => { statusCounts[classify(r.coverage_state)]++; });

    // 4) Agregados por tipo de transição
    const byType = { discovered_to_indexed: [] as AlertRow[], deindexed: [] as AlertRow[], state_change: [] as AlertRow[] };
    week.forEach((a) => {
      const bucket = (byType as Record<string, AlertRow[]>)[a.transition_type] ?? byType.state_change;
      bucket.push(a);
    });

    // 5) Agregados por URL (contagem de transições no período)
    const perUrl = new Map<string, { url: string; count: number; last: AlertRow }>();
    week.forEach((a) => {
      const cur = perUrl.get(a.url);
      if (!cur) perUrl.set(a.url, { url: a.url, count: 1, last: a });
      else { cur.count++; if (a.notified_at > cur.last.notified_at) cur.last = a; }
    });
    const perUrlList = Array.from(perUrl.values()).sort((a, b) => b.count - a.count);

    // 6) Alertas do dia (últimas 24h) — reforço dos "imediatos"
    const dayCut = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const today = week.filter((a) => a.notified_at >= dayCut);

    // ---- Montagem do HTML ----
    const rowHtml = (a: AlertRow) =>
      `<tr><td style="padding:6px 8px;border:1px solid #eee"><a href="${escapeHtml(a.url)}" style="color:#003366;text-decoration:none">${escapeHtml(shortUrl(a.url))}</a></td>` +
      `<td style="padding:6px 8px;border:1px solid #eee;font-size:12px;color:#666">${escapeHtml(a.previous_state ?? "—")}</td>` +
      `<td style="padding:6px 8px;border:1px solid #eee;font-size:12px">${escapeHtml(a.new_state)}</td>` +
      `<td style="padding:6px 8px;border:1px solid #eee;font-size:12px;color:#888">${new Date(a.notified_at).toLocaleString("pt-BR")}</td></tr>`;

    const transitionTable = (title: string, arr: AlertRow[]) => {
      const { emoji } = bucketLabel(arr[0]?.transition_type ?? "state_change");
      if (!arr.length) return "";
      return `
        <h3 style="margin:24px 0 8px;color:#003366">${emoji} ${escapeHtml(title)} <span style="color:#888;font-weight:normal">(${arr.length})</span></h3>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">
          <thead><tr style="background:#f5f7fa">
            <th style="text-align:left;padding:6px 8px;border:1px solid #eee">URL</th>
            <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Antes</th>
            <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Agora</th>
            <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Quando</th>
          </tr></thead>
          <tbody>${arr.map(rowHtml).join("")}</tbody>
        </table>`;
    };

    const perUrlTable = perUrlList.length
      ? `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;margin-top:8px">
          <thead><tr style="background:#f5f7fa">
            <th style="text-align:left;padding:6px 8px;border:1px solid #eee">URL</th>
            <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Transições (7d)</th>
            <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Último status</th>
          </tr></thead>
          <tbody>${perUrlList.map((u) =>
            `<tr><td style="padding:6px 8px;border:1px solid #eee"><a href="${escapeHtml(u.url)}" style="color:#003366;text-decoration:none">${escapeHtml(shortUrl(u.url))}</a></td>` +
            `<td style="padding:6px 8px;border:1px solid #eee;text-align:center"><strong>${u.count}</strong></td>` +
            `<td style="padding:6px 8px;border:1px solid #eee;font-size:12px">${escapeHtml(u.last.new_state)}</td></tr>`
          ).join("")}</tbody>
        </table>`
      : `<p style="color:#666">Nenhuma transição registrada nos últimos 7 dias.</p>`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;color:#222">
        <h2 style="color:#003366;margin:0 0 4px">Patro Seguros · Resumo Semanal de Indexação</h2>
        <p style="color:#666;margin:0 0 20px">Período: últimos 7 dias · gerado em ${new Date().toLocaleString("pt-BR")}</p>

        <h3 style="margin:0 0 8px;color:#003366">📊 Status atual das URLs monitoradas</h3>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-family:Arial,sans-serif">
          <tr>
            <td style="padding:12px 18px;border:1px solid #eee;background:#eaf7ee"><strong style="color:#137333;font-size:20px">${statusCounts.indexed}</strong><br><span style="color:#137333">Indexadas</span></td>
            <td style="padding:12px 18px;border:1px solid #eee;background:#fff4e5"><strong style="color:#a05a00;font-size:20px">${statusCounts.discovered}</strong><br><span style="color:#a05a00">Descobertas</span></td>
            <td style="padding:12px 18px;border:1px solid #eee;background:#fdecec"><strong style="color:#a30000;font-size:20px">${statusCounts.failed}</strong><br><span style="color:#a30000">Falhou</span></td>
            <td style="padding:12px 18px;border:1px solid #eee;background:#f5f7fa"><strong style="color:#333;font-size:20px">${statusCounts.other}</strong><br><span style="color:#333">Outros</span></td>
          </tr>
        </table>

        <h3 style="margin:24px 0 8px;color:#003366">🔄 Transições por URL (7 dias)</h3>
        ${perUrlTable}

        ${transitionTable("Descoberta → Indexada", byType.discovered_to_indexed)}
        ${transitionTable("Desindexadas", byType.deindexed)}
        ${transitionTable("Outras mudanças de status", byType.state_change)}

        <h3 style="margin:24px 0 8px;color:#003366">🕐 Alertas das últimas 24h <span style="color:#888;font-weight:normal">(${today.length})</span></h3>
        ${today.length
          ? `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">
              <thead><tr style="background:#f5f7fa">
                <th style="text-align:left;padding:6px 8px;border:1px solid #eee">URL</th>
                <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Antes</th>
                <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Agora</th>
                <th style="text-align:left;padding:6px 8px;border:1px solid #eee">Quando</th>
              </tr></thead>
              <tbody>${today.map(rowHtml).join("")}</tbody>
            </table>`
          : `<p style="color:#666">Nenhum alerta registrado nas últimas 24h.</p>`}

        <p style="margin-top:28px;color:#888;font-size:12px">
          Painel completo: <a href="${SITE_HOST}/admin/monitor-indexacao" style="color:#003366">/admin/monitor-indexacao</a><br>
          Este e-mail é enviado semanalmente. Alertas críticos (Descoberta→Indexada, Desindexadas) continuam sendo enviados no mesmo dia da detecção.
        </p>
      </div>`;

    // Envio (só quando há SMTP + houve atividade OU dry_run=false)
    let payload: Record<string, unknown> = { alerts: week.length, urls: perUrl.size, today: today.length };
    try {
      const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
      const dryRun = body?.dry_run === true;
      if (dryRun) {
        return new Response(JSON.stringify({ ...payload, dry_run: true, html_bytes: html.length }), {
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (_) { /* ignore */ }

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    if (!smtpHost || !smtpUser || !smtpPass) {
      return new Response(JSON.stringify({ ...payload, skipped: "smtp_not_configured" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost, port: 465, secure: true, auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from: `"Patro SEO Monitor" <${smtpUser}>`,
      to: "contato@patroseguros.com.br",
      subject: `📊 Resumo semanal · ${week.length} transição(ões), ${statusCounts.indexed} indexadas / ${statusCounts.discovered} descobertas / ${statusCounts.failed} falhou`,
      html,
    });

    return new Response(JSON.stringify({ ...payload, sent: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("weekly-indexation-summary error:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
});