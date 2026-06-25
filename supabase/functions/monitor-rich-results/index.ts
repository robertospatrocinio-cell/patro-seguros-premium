import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import nodemailer from "npm:nodemailer@6.9.8";

const SITE_URL = "https://www.patroseguros.com.br/";

// Páginas estratégicas para monitorar Rich Results (Reviews, FAQ, Breadcrumbs, LocalBusiness)
const URLS = [
  "https://www.patroseguros.com.br/",
  "https://www.patroseguros.com.br/seguro-auto",
  "https://www.patroseguros.com.br/seguro-saude",
  "https://www.patroseguros.com.br/seguro-vida",
  "https://www.patroseguros.com.br/seguro-empresarial",
  "https://www.patroseguros.com.br/seguro-residencial",
  "https://www.patroseguros.com.br/seguro-agro",
  "https://www.patroseguros.com.br/sobre",
  "https://www.patroseguros.com.br/faq",
  "https://www.patroseguros.com.br/blog",
];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

interface Issue {
  url: string;
  richResultType: string;
  severity: string;
  message: string;
}

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
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`URL Inspection ${r.status}: ${text.slice(0, 200)}`);
  }
  return r.json();
}

serve(async (req) => {
  try {
    // Restringe a service_role (cron) ou admin autenticado
    const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim();
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!token || token !== serviceKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GSC_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY || !GSC_API_KEY) {
      throw new Error("Missing LOVABLE_API_KEY or GOOGLE_SEARCH_CONSOLE_API_KEY");
    }

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey);

    const issues: Issue[] = [];
    const summary: Array<{
      url: string;
      index_verdict: string | null;
      rich_verdict: string | null;
      detected_types: string[];
      error_count: number;
      warning_count: number;
    }> = [];

    for (const url of URLS) {
      try {
        const data = await inspectUrl(url, LOVABLE_API_KEY, GSC_API_KEY);
        const result = data?.inspectionResult ?? {};
        const idx = result.indexStatusResult ?? {};
        const rr = result.richResultsResult ?? {};
        const detected = rr.detectedItems ?? [];
        const types: string[] = [];
        let errCount = 0;
        let warnCount = 0;
        for (const di of detected) {
          const t = di.richResultType ?? "Unknown";
          types.push(t);
          for (const it of di.items ?? []) {
            for (const iss of it.issues ?? []) {
              const sev = String(iss.severity ?? "");
              const msg = String(iss.issueMessage ?? "");
              if (sev === "ERROR") errCount++;
              else warnCount++;
              issues.push({ url, richResultType: t, severity: sev, message: msg });
            }
          }
        }
        summary.push({
          url,
          index_verdict: idx.verdict ?? null,
          rich_verdict: rr.verdict ?? null,
          detected_types: types,
          error_count: errCount,
          warning_count: warnCount,
        });
      } catch (err) {
        console.error(`inspect failed for ${url}:`, err);
        summary.push({
          url,
          index_verdict: "INSPECTION_FAILED",
          rich_verdict: null,
          detected_types: [],
          error_count: 0,
          warning_count: 0,
        });
      }
    }

    // Persistir o snapshot
    const totalErrors = summary.reduce((a, s) => a + s.error_count, 0);
    const totalWarnings = summary.reduce((a, s) => a + s.warning_count, 0);
    await admin.from("seo_rich_results_checks").insert({
      summary,
      issues,
      total_errors: totalErrors,
      total_warnings: totalWarnings,
    });

    // Enviar alerta por e-mail apenas se houver ERROS (warnings só ficam no log/relatório)
    if (totalErrors > 0) {
      const smtpHost = Deno.env.get("SMTP_HOST");
      const smtpUser = Deno.env.get("SMTP_USER");
      const smtpPass = Deno.env.get("SMTP_PASS");
      if (smtpHost && smtpUser && smtpPass) {
        const rows = issues
          .filter((i) => i.severity === "ERROR")
          .map(
            (i) =>
              `<tr><td>${escapeHtml(i.url)}</td><td>${escapeHtml(i.richResultType)}</td><td>${escapeHtml(i.message)}</td></tr>`,
          )
          .join("");
        const html = `
          <h2>Patro Seguros · Alerta de Rich Results</h2>
          <p>${totalErrors} erro(s) detectado(s) em snippets de avaliação/FAQ/Breadcrumb.</p>
          <table border="1" cellpadding="6" cellspacing="0">
            <thead><tr><th>URL</th><th>Tipo</th><th>Mensagem</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <p>Teste manual: <a href="https://search.google.com/test/rich-results">Rich Results Test</a></p>
        `;
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: 465,
          secure: true,
          auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: `"Patro SEO Monitor" <${smtpUser}>`,
          to: "contato@patroseguros.com.br",
          subject: `⚠️ Rich Results: ${totalErrors} erro(s) detectado(s)`,
          html,
        });
      }
    }

    return new Response(
      JSON.stringify({
        status: totalErrors > 0 ? "alert" : "ok",
        checked: URLS.length,
        total_errors: totalErrors,
        total_warnings: totalWarnings,
        summary,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("monitor-rich-results error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});