import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import nodemailer from "npm:nodemailer@6.9.8";

const SITE_URL = "https://www.patroseguros.com.br/";

// Fallback caso a tabela `monitored_urls` esteja vazia (bootstrap ou primeiro deploy).
// A lista oficial vive no banco e é editada em /admin/monitor-indexacao.
const FALLBACK_URLS: string[] = [
  "https://www.patroseguros.com.br/planos-saude-senior-guarulhos",
  "https://www.patroseguros.com.br/seguradoras-parceiras",
  "https://www.patroseguros.com.br/lp/seguro-acidentes-pessoais",
  "https://www.patroseguros.com.br/seguro-carta-verde",
  "https://www.patroseguros.com.br/como-comparar-seguradoras-guarulhos",
  "https://www.patroseguros.com.br/seguradoras-parceiras/porto-seguro",
  "https://www.patroseguros.com.br/seguradoras-parceiras/mapfre",
  "https://www.patroseguros.com.br/seguradoras-parceiras/allianz",
  "https://www.patroseguros.com.br/seguradoras-parceiras/bradesco-seguros",
  "https://www.patroseguros.com.br/seguradoras-parceiras/hdi",
];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

async function inspectUrl(url: string, lovableKey: string, gscKey: string) {
  const r = await fetch(
    "https://connector-gateway.lovable.dev/google_search_console/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gscKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
    },
  );
  if (!r.ok) throw new Error(`URL Inspection ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

// coverageState exemplos: "Submitted and indexed", "Discovered - currently not indexed",
// "Crawled - currently not indexed", "URL is unknown to Google", "Duplicate without user-selected canonical"
function isIndexed(coverage?: string | null) {
  if (!coverage) return false;
  const c = coverage.toLowerCase();
  return c.includes("submitted and indexed") || c.includes("indexed, not submitted") || c === "indexed";
}
function isDiscoveredNotIndexed(coverage?: string | null) {
  if (!coverage) return false;
  const c = coverage.toLowerCase();
  return c.includes("discovered") || c.includes("crawled - currently not indexed") || c.includes("unknown to google");
}

serve(async (req) => {
  try {
    const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim();
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!token || token !== serviceKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GSC_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY || !GSC_API_KEY) throw new Error("Missing GSC credentials");

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey);

    // Carrega URLs ativas do banco; usa o fallback se a tabela estiver vazia/inacessível.
    let urls: string[] = FALLBACK_URLS;
    try {
      const { data: rows, error } = await admin
        .from("monitored_urls")
        .select("url")
        .eq("active", true)
        .order("created_at", { ascending: true });
      if (error) throw error;
      if (rows && rows.length > 0) urls = rows.map((r: { url: string }) => r.url);
    } catch (e) {
      console.warn("monitor-gsc-indexation: usando FALLBACK_URLS:", e);
    }

    const transitions: Array<{ url: string; previous: string | null; current: string; type: string }> = [];
    const results: Array<{ url: string; coverage: string | null; verdict: string | null }> = [];

    for (const url of urls) {
      try {
        const data = await inspectUrl(url, LOVABLE_API_KEY, GSC_API_KEY);
        const result = data?.inspectionResult ?? {};
        const idx = result.indexStatusResult ?? {};
        const coverage: string | null = idx.coverageState ?? null;
        const verdict: string | null = idx.verdict ?? null;

        // buscar último status conhecido
        const { data: prev } = await admin
          .from("gsc_indexation_status")
          .select("coverage_state")
          .eq("url", url)
          .order("checked_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const previous = prev?.coverage_state ?? null;

        await admin.from("gsc_indexation_status").insert({
          url,
          coverage_state: coverage,
          indexing_state: idx.indexingState ?? null,
          verdict,
          last_crawl_time: idx.lastCrawlTime ?? null,
          google_canonical: idx.googleCanonical ?? null,
          user_canonical: idx.userCanonical ?? null,
          page_fetch_state: idx.pageFetchState ?? null,
          robots_txt_state: idx.robotsTxtState ?? null,
          raw: result,
        });

        // detectar transição relevante
        if (previous && coverage && previous !== coverage) {
          let type: string | null = null;
          if (!isIndexed(previous) && isIndexed(coverage)) type = "discovered_to_indexed";
          else if (isIndexed(previous) && !isIndexed(coverage)) type = "deindexed";
          else if (isDiscoveredNotIndexed(previous) !== isDiscoveredNotIndexed(coverage)) type = "state_change";

          if (type) {
            transitions.push({ url, previous, current: coverage, type });
            await admin.from("gsc_indexation_alerts").insert({
              url, previous_state: previous, new_state: coverage, transition_type: type,
            });
          }
        }
        results.push({ url, coverage, verdict });
      } catch (err) {
        console.error(`inspect failed for ${url}:`, err);
        results.push({ url, coverage: "INSPECTION_FAILED", verdict: null });
      }
    }

    // e-mail apenas se houver transições
    if (transitions.length > 0) {
      const smtpHost = (Deno.env.get("SMTP_HOST") === "webmail.patroseguros.com.br" ? "smtp.hostinger.com" : Deno.env.get("SMTP_HOST"));
      const smtpUser = Deno.env.get("SMTP_USER");
      const smtpPass = Deno.env.get("SMTP_PASS");
      if (smtpHost && smtpUser && smtpPass) {
        const indexed = transitions.filter((t) => t.type === "discovered_to_indexed");
        const deindexed = transitions.filter((t) => t.type === "deindexed");
        const other = transitions.filter((t) => t.type === "state_change");
        const row = (t: typeof transitions[number]) =>
          `<tr><td>${escapeHtml(t.url)}</td><td>${escapeHtml(t.previous ?? "-")}</td><td>${escapeHtml(t.current)}</td></tr>`;
        const section = (title: string, arr: typeof transitions) =>
          arr.length
            ? `<h3>${title}</h3><table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>URL</th><th>Antes</th><th>Agora</th></tr></thead><tbody>${arr.map(row).join("")}</tbody></table>`
            : "";
        const html = `
          <h2>Patro Seguros · Alerta de Indexação (GSC)</h2>
          <p>${transitions.length} transição(ões) detectada(s) desde a última verificação.</p>
          ${section("✅ Descoberta → Indexada", indexed)}
          ${section("⚠️ Desindexadas", deindexed)}
          ${section("ℹ️ Outras mudanças de status", other)}
          <p style="margin-top:16px;color:#666">Verificação automática diária via GSC URL Inspection API.</p>
        `;
        const transporter = nodemailer.createTransport({
          host: smtpHost, port: 465, secure: true, auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: `"Patro SEO Monitor" <${smtpUser}>`,
          to: "contato@patroseguros.com.br",
          subject: `📈 Indexação: ${indexed.length} nova(s) indexada(s), ${deindexed.length} desindexada(s)`,
          html,
        });
      }
    }

    return new Response(
      JSON.stringify({
        status: transitions.length > 0 ? "alert" : "ok",
        checked: urls.length,
        transitions,
        results,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("monitor-gsc-indexation error:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
});