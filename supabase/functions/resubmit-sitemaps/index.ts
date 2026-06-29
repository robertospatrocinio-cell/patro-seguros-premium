import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SITE_URL = "https://www.patroseguros.com.br/";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/webmasters/v3";

const SITEMAPS = [
  "https://www.patroseguros.com.br/sitemap-index.xml",
  "https://www.patroseguros.com.br/sitemap.xml",
  "https://www.patroseguros.com.br/sitemap-geral.xml",
  "https://www.patroseguros.com.br/sitemap-empresarial.xml",
  "https://www.patroseguros.com.br/sitemap-vida-saude.xml",
  "https://www.patroseguros.com.br/sitemap-guarulhos.xml",
  "https://www.patroseguros.com.br/sitemap-bairros.xml",
  "https://www.patroseguros.com.br/sitemap-auto.xml",
];

serve(async (req) => {
  try {
    const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim();
    if (!token || token !== Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SEARCH_CONSOLE_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY || !GOOGLE_SEARCH_CONSOLE_API_KEY) {
      throw new Error("Missing required environment variables.");
    }

    const results: Array<{ sitemap: string; status: number; ok: boolean; error?: string }> = [];

    for (const sitemapUrl of SITEMAPS) {
      const url = `${GATEWAY}/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": GOOGLE_SEARCH_CONSOLE_API_KEY,
          },
        });
        const ok = res.status >= 200 && res.status < 300;
        let error: string | undefined;
        if (!ok) {
          try { error = (await res.text()).slice(0, 300); } catch { /* ignore */ }
        }
        results.push({ sitemap: sitemapUrl, status: res.status, ok, error });
        console.log(`[resubmit-sitemaps] ${sitemapUrl} -> ${res.status}`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        results.push({ sitemap: sitemapUrl, status: 0, ok: false, error: msg });
        console.error(`[resubmit-sitemaps] ${sitemapUrl} failed:`, msg);
      }
    }

    const summary = {
      submitted_at: new Date().toISOString(),
      total: results.length,
      ok: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
      results,
    };

    return new Response(JSON.stringify(summary), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("resubmit-sitemaps error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});