// Edge Function: domain-drift-check
//
// Verifica o estado real dos hostnames oficiais (DNS via DoH + resposta HTTP)
// e grava cada verificação em `domain_health_checks`, com o motivo exato do
// drift. O histórico permite ver QUANDO e POR QUE o domínio saiu do padrão.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const EXPECTED_IP = "185.158.133.1";
const HOSTS = ["patroseguros.com.br", "www.patroseguros.com.br"];
const CANONICAL_HOST = "www.patroseguros.com.br";

type DohAnswer = { name: string; type: number; data: string };

async function doh(name: string, type: "A" | "TXT" | "CNAME"): Promise<string[]> {
  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`,
      { headers: { accept: "application/dns-json" } },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { Answer?: DohAnswer[] };
    const wanted = type === "A" ? 1 : type === "CNAME" ? 5 : 16;
    return (json.Answer ?? [])
      .filter((a) => a.type === wanted)
      .map((a) => a.data.replace(/^"|"$/g, ""));
  } catch {
    return [];
  }
}

async function probe(host: string) {
  const chain: { url: string; status: number; location: string | null }[] = [];
  let url = `https://${host}/`;
  let status = 0;
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { redirect: "manual" });
    const location = res.headers.get("location");
    chain.push({ url, status: res.status, location });
    status = res.status;
    if (res.status >= 300 && res.status < 400 && location) {
      url = new URL(location, url).toString();
      continue;
    }
    break;
  }
  return { chain, status, finalUrl: url };
}

async function checkHost(host: string) {
  const reasons: string[] = [];
  const [a, cname, txt] = await Promise.all([
    doh(host, "A"),
    doh(host, "CNAME"),
    doh(`_lovable.${host}`, "TXT"),
  ]);

  if (a.length === 0 && cname.length === 0) {
    reasons.push("Nenhum registro A ou CNAME público encontrado para o hostname.");
  } else if (a.length > 0 && !a.includes(EXPECTED_IP) && cname.length === 0) {
    reasons.push(`Registro A aponta para ${a.join(", ")} em vez de ${EXPECTED_IP}.`);
  }
  if (a.length > 1) {
    reasons.push(`Múltiplos registros A (${a.join(", ")}) — mantenha apenas ${EXPECTED_IP}.`);
  }
  if (txt.length === 0) {
    reasons.push(`TXT de verificação _lovable.${host} ausente — a validação de propriedade falha.`);
  }

  let http_status: number | null = null;
  let final_url: string | null = null;
  let redirect_chain: unknown[] = [];
  try {
    const p = await probe(host);
    http_status = p.status;
    final_url = p.finalUrl;
    redirect_chain = p.chain;

    if (host === CANONICAL_HOST) {
      if (p.status !== 200) reasons.push(`Host canônico respondeu HTTP ${p.status} (esperado 200).`);
    } else {
      const first = p.chain[0];
      if (!first || first.status !== 301) {
        reasons.push(`Apex deveria responder 301 para www — respondeu ${first?.status ?? "sem resposta"}.`);
      } else if (!first.location?.includes(CANONICAL_HOST)) {
        reasons.push(`Apex redireciona para ${first.location ?? "destino desconhecido"} em vez de ${CANONICAL_HOST}.`);
      }
      if (p.chain.length > 2) reasons.push("Mais de um salto de redirecionamento entre apex e www.");
    }
    if (p.status === 421) reasons.push("HTTP 421 Misdirected Request — hostname não reconhecido pela origem (TLS/SNI).");
    if (p.status === 404) reasons.push("HTTP 404 — a origem não associa este hostname a um projeto publicado.");
  } catch (e) {
    reasons.push(`Falha ao conectar via HTTPS: ${e instanceof Error ? e.message : String(e)}`);
  }

  const status = reasons.length === 0 ? "ok" : http_status == null ? "error" : "drifted";

  return {
    hostname: host,
    status,
    reasons,
    dns_a: a,
    dns_cname: cname,
    txt_lovable: txt,
    expected_ip: EXPECTED_IP,
    http_status,
    final_url,
    redirect_chain,
    details: { canonical_host: CANONICAL_HOST },
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const results = await Promise.all(HOSTS.map(checkHost));
    const { error } = await supabase.from("domain_health_checks").insert(results);
    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
