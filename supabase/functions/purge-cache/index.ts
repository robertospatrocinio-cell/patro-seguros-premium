import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { requireAdminOrService } from '../_shared/admin-auth.ts'
import { parsePurgeRequest } from '../_shared/purge-request.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Cache-Control': 'no-store',
}

// Tag → URL prefix mapping for cache purging
const TAG_URL_MAP: Record<string, string[]> = {
  seguros: [
    "/seguro-auto", "/seguro-moto", "/seguro-vida", "/seguro-residencial",
    "/seguro-saude", "/seguro-empresarial", "/seguro-frota", "/seguro-viagem",
    "/seguro-celular", "/seguro-odonto", "/seguro-motorista-app",
    "/seguro-acidentes-pessoais", "/seguro-condominio", "/seguro-transporte",
    "/seguro-rc", "/seguro-cyber", "/seguro-engenharia", "/seguro-fianca",
    "/seguro-caminhao", "/seguro-vida-pme", "/seguro-galpoes-industriais",
    "/seguro-maquinas", "/seguro-rural", "/seguro-bike", "/seguro-funeral",
    "/seguro-decesso", "/seguro-garantia", "/seguro-estagiario",
    "/seguro-imobiliario", "/seguro-ambiental", "/seguro-jetski",
    "/seguro-embarcacoes", "/seguro-avioes", "/seguro-helicopteros",
    "/seguro-placa-solar", "/seguro-drone-agricola", "/seguro-pecuario",
    "/seguro-cafe", "/seguro-geada", "/seguro-granja",
    "/seguro-propriedade-rural", "/seguro-armazenagem",
    "/seguro-equipamentos-agricolas", "/seguro-maquinas-agricolas",
    "/seguro-maquinas-industriais", "/seguro-maquinas-linha-amarela",
    "/seguro-transporte-agro", "/seguro-lojas-shopping",
    "/seguro-carta-verde", "/seguro-fianca-locaticia",
  ],
  saude: [
    "/planos-de-saude", "/seguro-saude", "/plano-saude-empresarial",
    "/plano-pet", "/seguro-odonto",
  ],
  consorcio: [
    "/consorcio", "/consorcio-carro", "/consorcio-imoveis",
    "/consorcio-veiculos-pesados",
  ],
  agro: [
    "/seguro-rural", "/seguro-maquinas-agricolas", "/seguro-granja",
    "/seguro-pecuario", "/seguro-cafe", "/seguro-geada",
    "/seguro-propriedade-rural", "/seguro-armazenagem",
    "/seguro-equipamentos-agricolas", "/seguro-drone-agricola",
    "/seguro-transporte-agro", "/seguro-placa-solar",
  ],
  rc: [
    "/seguro-rc", "/seguro-rc-profissional", "/seguro-rc-medicos",
    "/seguro-rc-dentistas", "/seguro-rc-advogados", "/seguro-rc-engenheiros",
    "/seguro-rc-veterinarios", "/seguro-rc-executivos", "/seguro-rc-obras",
    "/seguro-rc-prestacao-servicos", "/seguro-rc-eventos",
  ],
  nichos: [
    "/seguros/medicos-e-clinicas", "/seguros/transportadoras",
    "/seguros/empresarios", "/seguros/profissionais-liberais",
    "/seguros/motoristas-app",
  ],
  landing: [
    "/lp/seguro-auto", "/lp/seguro-auto-premium", "/lp/seguro-moto",
    "/lp/seguro-vida", "/lp/seguro-celular", "/lp/seguro-empresarial",
    "/lp/seguro-residencial", "/lp/seguro-galpoes", "/lp/seguro-motorista-app",
    "/lp/plano-saude", "/lp/consorcio", "/lp/alice", "/lp/med-senior",
  ],
  seo: [
    "/seguro-auto-guarulhos", "/seguro-moto-guarulhos",
    "/seguro-residencial-guarulhos", "/seguro-vida-saude-guarulhos",
    "/seguro-empresarial-guarulhos", "/seguro-frota-empresas-guarulhos",
    "/seguros-empresariais-pme-guarulhos", "/plano-saude-guarulhos",
    "/corretora-seguros-guarulhos", "/seguro-condominio-guarulhos",
    "/seguros-guarulhos", "/sobre-guarulhos",
  ],
  blog: ["/blog"],
  home: ["/"],
  all: ["/"],
}

const DOMAIN = "https://www.patroseguros.com.br"

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (!["GET", "POST"].includes(req.method)) {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, Allow: "GET, POST, OPTIONS", "Content-Type": "application/json" },
    })
  }

  // Keep the existing server automation credential; browsers use an admin session.
  const token = req.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1]
  const automationSecret = Deno.env.get("PURGE_SECRET")
  if (!automationSecret || token !== automationSecret) {
    const denied = await requireAdminOrService(req, corsHeaders, ["GET", "POST"])
    if (denied) return denied
  }

  // Supabase client for logging
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("purge_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      return new Response(JSON.stringify({ error: "Unable to load purge logs" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ logs: data || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const CF_API_TOKEN = Deno.env.get("CLOUDFLARE_API_TOKEN")
  const CF_ZONE_ID = Deno.env.get("CLOUDFLARE_ZONE_ID")
  if (!CF_API_TOKEN || !CF_ZONE_ID) {
    return new Response(JSON.stringify({ error: "Cloudflare credentials not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  let body: ReturnType<typeof parsePurgeRequest>
  try {
    body = parsePurgeRequest(await req.json(), Object.keys(TAG_URL_MAP))
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Invalid request" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // Collect URLs from tags
  const urlSet = new Set<string>()

  if (body.tags && Array.isArray(body.tags)) {
    for (const tag of body.tags) {
      const paths = TAG_URL_MAP[tag.toLowerCase()]
      if (paths) {
        for (const p of paths) {
          urlSet.add(`${DOMAIN}${p}`)
        }
      }
    }
  }

  // Also allow explicit URLs
  if (body.urls && Array.isArray(body.urls)) {
    for (const u of body.urls) {
      urlSet.add(u.startsWith("http") ? u : `${DOMAIN}${u}`)
    }
  }

  // A full purge is an explicit administrator/automation decision, never a
  // fallback for invalid tags. It takes precedence over individual URLs.
  if (body.purgeEverything) urlSet.clear()

  if (urlSet.size === 0) {
    // Only an explicit full-purge request may invalidate the entire site.
    const purgeAll = body.purgeEverything === true || body.tags?.some((tag) => tag.toLowerCase() === "all")
    if (purgeAll) {
      const cfRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ purge_everything: true }),
        }
      )
      const cfData = await cfRes.json()
      await supabase.from("purge_logs").insert({
        action: "purge_all",
        tags: body.tags || [],
        total_urls: 0,
        purged_urls: [],
        results: cfData,
        success: cfData.success,
      })
      return new Response(JSON.stringify({ action: "purge_all", success: cfData.success }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    await supabase.from("purge_logs").insert({
      action: "error",
      tags: body.tags || [],
      total_urls: 0,
      purged_urls: [],
      results: null,
      success: false,
      error_message: "No valid tags or URLs provided",
    })
    return new Response(JSON.stringify({ error: "No valid tags or URLs provided", available_tags: Object.keys(TAG_URL_MAP) }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const urls = Array.from(urlSet)

  // Cloudflare limits to 30 URLs per request
  const results: { batch: number; success: boolean }[] = []
  for (let i = 0; i < urls.length; i += 30) {
    const batch = urls.slice(i, i + 30)
    const cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: batch }),
      }
    )
    const cfData = await cfRes.json()
    results.push({ batch: Math.floor(i / 30) + 1, success: cfData.success })
  }

  const allSuccess = results.every(r => r.success)
  await supabase.from("purge_logs").insert({
    action: body.tags && body.tags.length > 0 ? "purge_by_tag" : "purge_by_url",
    tags: body.tags || [],
    total_urls: urls.length,
    purged_urls: urls,
    results,
    success: allSuccess,
    error_message: allSuccess ? null : "Some batches failed",
  })

  return new Response(
    JSON.stringify({
      action: "purge_by_tag",
      tags: body.tags,
      total_urls: urls.length,
      results,
      purged_urls: urls,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  )
})