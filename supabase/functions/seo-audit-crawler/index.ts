import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://www.patroseguros.com.br";
const SITEMAP_INDEX = `${BASE_URL}/sitemap-index.xml`;
const CONCURRENCY = 10;
const FETCH_TIMEOUT_MS = 15000;
const DASHBOARD_URL = `${BASE_URL.replace("www.patroseguros.com.br", "patroseguros.lovable.app")}/admin/seo-monitor`;
const NOINDEX_ALLOW = new Set([
  "/admin", "/conversion-dashboard", "/performance-diagnostico",
  "/seo-technical-report", "/pagespeed-history", "/ebook-consorcio",
]);

type Finding = { route: string; severity: "error" | "warn"; rule: string; message: string };

function matchAll(re: RegExp, src: string) { return [...src.matchAll(re)]; }

function getMeta(html: string, attr: string, key: string) {
  const re1 = new RegExp(`<meta[^>]*\\s${attr}=["']${key}["'][^>]*\\scontent=["']([^"']*)["']`, "i");
  const m = html.match(re1); if (m) return m[1];
  const re2 = new RegExp(`<meta[^>]*\\scontent=["']([^"']*)["'][^>]*\\s${attr}=["']${key}["']`, "i");
  const m2 = html.match(re2); return m2 ? m2[1] : null;
}

function getTag(html: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi");
  return matchAll(re, html).map((m) => m[1].replace(/<[^>]+>/g, "").trim());
}

function getCanonical(html: string) {
  const m = html.match(/<link[^>]*\srel=["']canonical["'][^>]*\shref=["']([^"']+)["']/i)
    || html.match(/<link[^>]*\shref=["']([^"']+)["'][^>]*\srel=["']canonical["']/i);
  return m ? m[1] : null;
}

function auditPage(route: string, html: string, status: number): Finding[] {
  const out: Finding[] = [];
  const push = (severity: "error" | "warn", rule: string, message: string) =>
    out.push({ route, severity, rule, message });

  if (status !== 200) push("error", "http_status", `HTTP ${status}`);

  const titles = getTag(html, "title");
  if (titles.length !== 1) push("error", "title_count", `expected 1 <title>, got ${titles.length}`);
  else {
    const t = titles[0];
    if (t.length < 10) push("error", "title_too_short", `<title> too short (${t.length})`);
    if (t.length > 60) push("error", "title_too_long", `<title> too long (${t.length}): "${t}"`);
    if (/lovable/i.test(t)) push("error", "title_placeholder", `<title> contains "Lovable"`);
  }

  const desc = getMeta(html, "name", "description");
  if (!desc) push("error", "missing_description", "missing meta description");
  else {
    if (desc.length < 50) push("error", "description_too_short", `description too short (${desc.length})`);
    if (desc.length > 160) push("error", "description_too_long", `description too long (${desc.length})`);
  }

  const robots = getMeta(html, "name", "robots") || "";
  if (/noindex/i.test(robots) && !NOINDEX_ALLOW.has(route)) {
    push("error", "noindex_on_indexable", "meta robots contains noindex");
  }

  const canonical = getCanonical(html);
  if (!canonical) push("error", "missing_canonical", "missing canonical");
  else if (!/^https:\/\//.test(canonical)) push("error", "canonical_not_absolute", `canonical must be absolute https: ${canonical}`);

  for (const k of ["og:title", "og:description", "og:url", "og:type", "og:image"]) {
    const v = getMeta(html, "property", k);
    if (!v) push("error", `missing_${k.replace(":", "_")}`, `missing ${k}`);
    else if ((k === "og:url" || k === "og:image") && !/^https:\/\//.test(v)) {
      push("error", `${k.replace(":", "_")}_not_absolute`, `${k} must be absolute https: ${v}`);
    }
  }
  if (!getMeta(html, "name", "twitter:card")) push("error", "missing_twitter_card", "missing twitter:card");

  const jsonldBlocks = matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, html);
  if (jsonldBlocks.length === 0) push("error", "missing_jsonld", "no JSON-LD <script> found");
  else {
    for (const b of jsonldBlocks) {
      try { JSON.parse(b[1].trim()); }
      catch (e) { push("error", "invalid_jsonld", `invalid JSON-LD: ${(e as Error).message}`); break; }
    }
  }

  const h1 = matchAll(/<h1\b/gi, html);
  if (h1.length === 0) push("error", "missing_h1", "missing <h1>");
  else if (h1.length > 1) push("error", "multiple_h1", `multiple <h1> (${h1.length})`);

  const h2 = matchAll(/<h2\b/gi, html);
  if (h2.length === 0) push("warn", "missing_h2", "no <h2> in static HTML");

  return out;
}

async function fetchWithTimeout(url: string): Promise<{ status: number; body: string }> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": "PatroSEOMonitor/1.0" }, signal: ctrl.signal });
    return { status: res.status, body: await res.text() };
  } finally { clearTimeout(t); }
}

async function collectUrls(): Promise<string[]> {
  const idx = await fetchWithTimeout(SITEMAP_INDEX);
  const sitemaps = matchAll(/<loc>([^<]+)<\/loc>/g, idx.body).map((m) => m[1]);
  const all = new Set<string>([`${BASE_URL}/`]);
  for (const sm of sitemaps) {
    try {
      const { body } = await fetchWithTimeout(sm);
      for (const m of matchAll(/<loc>([^<]+)<\/loc>/g, body)) {
        // skip image sitemaps
        if (m[1].endsWith(".jpg") || m[1].endsWith(".png") || m[1].endsWith(".webp")) continue;
        all.add(m[1]);
      }
    } catch (e) { console.warn("sitemap fetch failed", sm, (e as Error).message); }
  }
  return [...all];
}

async function runPool<T, R>(items: T[], worker: (item: T) => Promise<R>, size: number): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(new Array(size).fill(0).map(async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      try { results[idx] = await worker(items[idx]); }
      catch (e) { results[idx] = e as R; }
    }
  }));
  return results;
}

async function sendAlertEmail(runId: string, stats: { failed: number; new_failures: number; total: number }, newFindings: Finding[]) {
  const smtpHost = Deno.env.get("SMTP_HOST");
  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPass = Deno.env.get("SMTP_PASS");
  if (!smtpHost || !smtpUser || !smtpPass) { console.warn("SMTP not configured; skipping alert"); return false; }

  const byRule = new Map<string, number>();
  for (const f of newFindings) byRule.set(f.rule, (byRule.get(f.rule) || 0) + 1);
  const ruleSummary = [...byRule.entries()].sort((a, b) => b[1] - a[1])
    .map(([r, n]) => `<li><strong>${r}</strong>: ${n}</li>`).join("");
  const examples = newFindings.slice(0, 20)
    .map((f) => `<tr><td style="padding:4px 8px;border-bottom:1px solid #eee"><code>${f.route}</code></td><td style="padding:4px 8px;border-bottom:1px solid #eee">${f.rule}</td><td style="padding:4px 8px;border-bottom:1px solid #eee">${f.message.replace(/[<>]/g, "")}</td></tr>`).join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:720px">
      <h2 style="color:#c1121f">🚨 SEO Alert: ${stats.new_failures} novas falhas detectadas</h2>
      <p>A auditoria diária de <strong>${stats.total} URLs</strong> encontrou <strong>${stats.failed} falhas totais</strong>, sendo <strong style="color:#c1121f">${stats.new_failures} regressões novas</strong> em relação à rodada anterior.</p>
      <h3>Falhas por regra</h3>
      <ul>${ruleSummary}</ul>
      <h3>Amostra (até 20)</h3>
      <table style="border-collapse:collapse;width:100%;font-size:13px"><thead><tr style="background:#f5f5f5"><th style="padding:6px 8px;text-align:left">Rota</th><th style="padding:6px 8px;text-align:left">Regra</th><th style="padding:6px 8px;text-align:left">Detalhe</th></tr></thead><tbody>${examples}</tbody></table>
      <p style="margin-top:24px"><a href="${DASHBOARD_URL}?run=${runId}" style="background:#003366;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Abrir dashboard</a></p>
    </div>`;

  const transporter = nodemailer.createTransport({
    host: smtpHost, port: 465, secure: true,
    auth: { user: smtpUser, pass: smtpPass },
    tls: { servername: smtpHost === "webmail.patroseguros.com.br" ? "hostgator.com.br" : smtpHost },
  });
  await transporter.sendMail({
    from: `"Patro SEO Monitor" <${smtpUser}>`,
    to: "contato@patroseguros.com.br",
    subject: `[SEO Alert] ${stats.new_failures} novas falhas em www.patroseguros.com.br`,
    html,
  });
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const triggeredBy = req.headers.get("x-trigger") === "manual" ? "manual" : "cron";
  const t0 = Date.now();
  const { data: runRow, error: runErr } = await supabase
    .from("seo_audit_runs")
    .insert({ triggered_by: triggeredBy })
    .select("id").single();
  if (runErr || !runRow) {
    return new Response(JSON.stringify({ error: runErr?.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const runId = runRow.id as string;

  try {
    const urls = await collectUrls();
    console.log(`SEO audit run ${runId}: ${urls.length} URLs`);

    const results = await runPool(urls, async (url) => {
      const route = new URL(url).pathname;
      try {
        const { status, body } = await fetchWithTimeout(url);
        return { route, findings: auditPage(route, body, status) };
      } catch (e) {
        return { route, findings: [{ route, severity: "error" as const, rule: "fetch_failed", message: (e as Error).message }] };
      }
    }, CONCURRENCY);

    let passed = 0, warned = 0, failed = 0;
    const allFindings: Finding[] = [];
    for (const r of results) {
      const errs = r.findings.filter((f) => f.severity === "error");
      const wrns = r.findings.filter((f) => f.severity === "warn");
      if (errs.length) failed++;
      else if (wrns.length) warned++;
      else passed++;
      allFindings.push(...r.findings);
    }

    // Compare with previous completed run to detect regressions.
    const { data: prevRun } = await supabase
      .from("seo_audit_runs")
      .select("id")
      .not("id", "eq", runId)
      .not("finished_at", "is", null)
      .order("started_at", { ascending: false })
      .limit(1).maybeSingle();

    const prevKey = new Set<string>();
    const prevFirstSeen = new Map<string, string>();
    if (prevRun?.id) {
      const { data: prevFindings } = await supabase
        .from("seo_audit_findings")
        .select("route, rule, first_seen_at, ignored")
        .eq("run_id", prevRun.id);
      for (const f of prevFindings || []) {
        const k = `${f.route}|${f.rule}`;
        prevKey.add(k);
        prevFirstSeen.set(k, f.first_seen_at);
      }
    }
    // Also inherit first_seen_at across the whole history for continuity.
    const { data: ignoredList } = await supabase
      .from("seo_audit_findings")
      .select("route, rule, ignored")
      .eq("ignored", true);
    const ignoredKey = new Set((ignoredList || []).map((f) => `${f.route}|${f.rule}`));

    const now = new Date().toISOString();
    const rows = allFindings.map((f) => {
      const k = `${f.route}|${f.rule}`;
      const isNew = f.severity === "error" && !prevKey.has(k);
      return {
        run_id: runId,
        route: f.route,
        severity: f.severity,
        rule: f.rule,
        message: f.message.slice(0, 500),
        is_new: isNew,
        ignored: ignoredKey.has(k),
        first_seen_at: prevFirstSeen.get(k) || now,
      };
    });

    // Bulk insert in chunks (avoid huge payload).
    for (let i = 0; i < rows.length; i += 500) {
      const chunk = rows.slice(i, i + 500);
      const { error } = await supabase.from("seo_audit_findings").insert(chunk);
      if (error) console.error("insert findings chunk failed", error.message);
    }

    const newErrorFindings = rows.filter((r) => r.is_new && !r.ignored);
    let alertSent = false;
    if (newErrorFindings.length > 0) {
      try {
        alertSent = await sendAlertEmail(runId, {
          failed, new_failures: newErrorFindings.length, total: urls.length,
        }, newErrorFindings as unknown as Finding[]);
      } catch (e) { console.error("alert email failed", (e as Error).message); }
    }

    await supabase.from("seo_audit_runs").update({
      finished_at: new Date().toISOString(),
      total_urls: urls.length,
      passed, warned, failed,
      new_failures: newErrorFindings.length,
      duration_ms: Date.now() - t0,
      alert_sent: alertSent,
    }).eq("id", runId);

    return new Response(JSON.stringify({
      run_id: runId, total: urls.length, passed, warned, failed,
      new_failures: newErrorFindings.length, alert_sent: alertSent,
      duration_ms: Date.now() - t0,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    await supabase.from("seo_audit_runs").update({
      finished_at: new Date().toISOString(),
      error_message: (e as Error).message,
      duration_ms: Date.now() - t0,
    }).eq("id", runId);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});