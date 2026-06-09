import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SITE_URL = "https://www.patroseguros.com.br/";
const GSC_API_BASE = "https://www.googleapis.com/webmasters/v3";

serve(async (req) => {
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SEARCH_CONSOLE_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");

    if (!LOVABLE_API_KEY || !GOOGLE_SEARCH_CONSOLE_API_KEY) {
      throw new Error("Missing required environment variables.");
    }

    // Call GSC API via Lovable Gateway
    const response = await fetch(
      `https://connector-gateway.lovable.dev/google_search_console/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps`,
      {
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": GOOGLE_SEARCH_CONSOLE_API_KEY,
        },
      }
    );

    const data = await response.json();
    const sitemaps = data.sitemap || [];
    const errors: string[] = [];

    for (const sitemap of sitemaps) {
      const errorCount = parseInt(sitemap.errors || "0");
      if (errorCount > 0) {
        errors.push(`Sitemap: ${sitemap.path} has ${errorCount} error(s). Last Downloaded: ${sitemap.lastDownloaded}`);
      }
    }

    if (errors.length > 0) {
      console.log("⚠️ SEO Errors detected:", errors);
      // Here you would integrate with an email or WhatsApp service
      // For now, we log it so it appears in Supabase Edge Function logs
      return new Response(JSON.stringify({ status: "alert", messages: errors }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "ok", message: "No sitemap errors detected." }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
