import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Allowed origins for browser-based callers (defense in depth).
const ALLOWED_ORIGINS = [
  "https://www.patroseguros.com.br",
  "https://patroseguros.com.br",
  "https://patroseguros.lovable.app",
];
const ALLOWED_ORIGIN_SUFFIXES = [".lovable.app", ".lovableproject.com"];

function isAllowedOrigin(origin: string | null): boolean {
  // Reject requests without an Origin header — only browsers from allowed
  // sites should be calling this relay. Server-side / cURL callers must
  // be blocked to prevent inbox flooding.
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_ORIGIN_SUFFIXES.some((s) => host.endsWith(s));
  } catch {
    return false;
  }
}

const resolveSmtpTlsServername = (host: string) => {
  if (host === "webmail.patroseguros.com.br") return "hostgator.com.br";
  return host;
};

/** Escape HTML special characters to prevent injection in email bodies */
const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const origin = req.headers.get("origin");
    if (!isAllowedOrigin(origin)) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "unknown";

    // Initialize Supabase client with service role for rate limiting
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check global rate limit (5 requests per 60 seconds)
    const { data: isAllowed, error: rateLimitError } = await supabaseAdmin.rpc(
      "check_rate_limit",
      {
        p_key: `send-form-email:${ip}`,
        p_window_seconds: 60,
        p_max_requests: 5,
      }
    );

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }

    if (!isAllowed) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { subject, textBody } = body;

    // Basic validation to prevent empty spam emails
    if (textBody && textBody.length < 10) {
      return new Response(JSON.stringify({ error: "Content too short" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input validation
    if (!subject || typeof subject !== "string" || subject.length > 500) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing subject" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!textBody || (typeof textBody !== "string" && !Array.isArray(textBody))) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing textBody" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Limit body sizes
    const textStr = typeof textBody === "string" ? textBody : textBody.join("\n");
    if (textStr.length > 10000) {
      return new Response(
        JSON.stringify({ error: "Request body too large" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build a safe HTML body server-side from the (escaped) plain text.
    const safeHtmlBody = `<pre style="font-family:Arial,sans-serif;white-space:pre-wrap;word-wrap:break-word;">${escapeHtml(textStr)}</pre>`;

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Missing SMTP config:", { smtpHost: !!smtpHost, smtpUser: !!smtpUser, smtpPass: !!smtpPass });
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Connecting to SMTP:", smtpHost);

    const tlsServername = resolveSmtpTlsServername(smtpHost);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        servername: tlsServername,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Patro Seguros" <${smtpUser}>`,
      to: "contato@patroseguros.com.br, sandra@patroseguros.com.br",
      subject: escapeHtml(subject),
      text: textStr,
      html: safeHtmlBody,
    });

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
