import { corsHeaders } from '@supabase/supabase-js/cors'

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

  // Auth: require a simple bearer token
  const authHeader = req.headers.get("authorization")
  const PURGE_SECRET = Deno.env.get("PURGE_SECRET")
  if (!PURGE_SECRET) {
    return new Response(JSON.stringify({ error: "PURGE_SECRET not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
  if (authHeader !== `Bearer ${PURGE_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const CF_API_TOKEN = Deno.env.get("CLOUDFLARE_API_TOKEN")
  const CF_ZONE_ID = Deno.env.get("CLOUDFLARE_ZONE_ID")
  if (!CF_API_TOKEN || !CF_ZONE_ID) {
    return new Response(JSON.stringify({ error: "Cloudflare credentials not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  let body: { tags?: string[]; urls?: string[] }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
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

  if (urlSet.size === 0) {
    // If tag "all" or no valid tags, purge everything
    const purgeAll = body.tags?.includes("all")
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
      return new Response(JSON.stringify({ action: "purge_all", success: cfData.success }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

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