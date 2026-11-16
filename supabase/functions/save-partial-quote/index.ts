import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALLOWED_ORIGINS = [
  "https://www.patroseguros.com.br",
  "https://www.patroseguros.com.br",
  "https://patroseguros.lovable.app",
];
const ALLOWED_ORIGIN_SUFFIXES = [".lovable.app", ".lovableproject.com"];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_ORIGIN_SUFFIXES.some((s) => host.endsWith(s));
  } catch {
    return false;
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// A draft ID is not proof of ownership. Issue a server-signed capability
// only when creating the draft; never return it for an existing ID.
async function draftSignature(id: string): Promise<ArrayBuffer> {
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!secret) throw new Error("Draft signing unavailable");
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  return crypto.subtle.sign("HMAC", key, encoder.encode(`partial-quote-update:v1:${id}`));
}

async function issueDraftToken(id: string): Promise<string> {
  return Array.from(new Uint8Array(await draftSignature(id)))
    .map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function ownsDraft(id: string, token: unknown): Promise<boolean> {
  if (typeof token !== "string" || !/^[0-9a-f]{64}$/.test(token)) return false;
  const expected = new Uint8Array(await draftSignature(id));
  const supplied = new Uint8Array(token.match(/../g)!.map((hex) => parseInt(hex, 16)));
  let difference = 0;
  for (let i = 0; i < expected.length; i++) difference |= expected[i] ^ supplied[i];
  return difference === 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json", Allow: "POST, OPTIONS" },
    });
  }

  try {
    const origin = req.headers.get("origin");
    if (!isAllowedOrigin(origin)) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const jwt = authHeader.replace("Bearer ", "").trim();
    // Public forms must remain available without login. A public key only
    // admits submission; it never grants ownership of an existing draft.
    const publicKeys = [
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      ...(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "").split(","),
    ].map((key) => key.trim()).filter(Boolean);
    let authorized = publicKeys.includes(jwt);
    if (!authorized) {
      const supabaseAuthClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      );
      const { data: userData, error: userError } = await supabaseAuthClient.auth.getUser(jwt);
      authorized = !userError && !!userData.user;
    }
    if (!authorized) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "unknown";

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: isAllowed } = await supabaseAdmin.rpc("check_rate_limit", {
      p_key: `save-partial-quote:${ip}`,
      p_window_seconds: 60,
      p_max_requests: 30,
    });
    if (!isAllowed) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const id = typeof body.id === "string" && UUID_RE.test(body.id) ? body.id : null;
    if (id && !(await ownsDraft(id, body.update_token))) {
      return new Response(JSON.stringify({ error: "Draft authorization required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Whitelist + size-bound fields
    const name = typeof body.name === "string" ? body.name.slice(0, 200) : null;
    const email = typeof body.email === "string" ? body.email.slice(0, 200) : null;
    const phone = typeof body.phone === "string" ? body.phone.slice(0, 30) : null;
    const insurance_type =
      typeof body.insurance_type === "string" ? body.insurance_type.slice(0, 100) : null;
    const current_step = Number.isFinite(body.current_step) ? Number(body.current_step) : null;
    const data = body.data && typeof body.data === "object" ? body.data : null;

    const serialized = data ? JSON.stringify(data) : "";
    if (serialized.length > 50_000) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = {
      name,
      email,
      phone,
      insurance_type,
      current_step,
      data,
      last_activity: new Date().toISOString(),
    };

    if (id) {
      const { error } = await supabaseAdmin
        .from("partial_quotes")
        .update(payload)
        .eq("id", id);
      if (error) {
        console.error("save-partial-quote update error:", error);
        return new Response(JSON.stringify({ error: "Update failed" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ success: true, id }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!name && !email && !phone) {
      return new Response(JSON.stringify({ error: "No contact data" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("partial_quotes")
      .insert(payload)
      .select("id")
      .single();
    if (error || !inserted) {
      console.error("save-partial-quote insert error:", error);
      return new Response(JSON.stringify({ error: "Insert failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const updateToken = await issueDraftToken(inserted.id);
    return new Response(JSON.stringify({ success: true, id: inserted.id, update_token: updateToken }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("save-partial-quote error:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});