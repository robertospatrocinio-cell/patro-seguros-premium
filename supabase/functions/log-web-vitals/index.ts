import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3'

const MetricSchema = z.object({
  name: z.enum(['LCP', 'CLS', 'INP', 'FCP', 'TTFB']),
  value: z.number().finite().nonnegative().max(600000),
  rating: z.enum(['good', 'needs-improvement', 'poor']),
  page: z.string().min(1).max(500),
  device_type: z.string().max(20).optional(),
  connection_type: z.string().max(20).optional(),
  session_id: z.string().max(80).optional(),
  metric_id: z.string().max(120).optional(),
  phase: z.string().max(30).optional(),
})

const BodySchema = z.union([
  MetricSchema,
  z.object({ metrics: z.array(MetricSchema).min(1).max(20) }),
])

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { persistSession: false } },
)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const items = 'metrics' in parsed.data ? parsed.data.metrics : [parsed.data]
  const ua = req.headers.get('user-agent')?.slice(0, 500) ?? null

  const rows = items.map((m) => ({
    metric_name: m.name,
    value: m.value,
    rating: m.rating,
    page: m.page,
    device_type: m.device_type ?? null,
    connection_type: m.connection_type ?? null,
    session_id: m.session_id ?? null,
    metric_id: m.metric_id ?? null,
    phase: m.phase ?? null,
    user_agent: ua,
  }))

  const { error } = await supabase.from('web_vitals_metrics').insert(rows)
  if (error) {
    console.error('web_vitals insert error', error)
    return new Response(JSON.stringify({ error: 'db_error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true, count: rows.length }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})