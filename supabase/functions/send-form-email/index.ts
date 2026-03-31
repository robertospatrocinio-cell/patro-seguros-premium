import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
    const body = await req.json();
    const { subject, htmlBody, textBody } = body;

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

    if (htmlBody && typeof htmlBody !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid htmlBody" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Limit body sizes
    const textStr = typeof textBody === "string" ? textBody : textBody.join("\n");
    if (textStr.length > 10000 || (htmlBody && htmlBody.length > 50000)) {
      return new Response(
        JSON.stringify({ error: "Request body too large" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
      html: htmlBody || undefined,
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
