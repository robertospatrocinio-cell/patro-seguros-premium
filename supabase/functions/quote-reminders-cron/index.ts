import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Find partial quotes that haven't been completed, are older than 30 minutes, 
    // haven't received a reminder yet, and have an email.
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    
    const { data: candidates, error: findError } = await supabase
      .from("partial_quotes")
      .select("*")
      .lt("last_activity", thirtyMinutesAgo)
      .eq("reminder_sent_count", 0)
      .not("email", "is", null);

    if (findError) throw findError;

    const results = [];

    for (const candidate of (candidates || [])) {
      if (!candidate.email) continue;

      const payload = { 
        values: candidate.data, 
        step: candidate.current_step, 
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substring(7) 
      };
      const resumeLink = `${Deno.env.get("PUBLIC_URL") || 'https://patroseguros.com.br'}/cotacao?resume=${btoa(JSON.stringify(payload))}`;

      // Call the existing email sending function or use a direct mailer
      // For this demo, we'll use a mocked call to send-form-email or similar
      try {
        const emailResponse = await fetch(
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-form-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
            },
            body: JSON.stringify({
              to: candidate.email,
              subject: "Patro Seguros: Vamos finalizar sua cotação?",
              textBody: `Olá ${candidate.name || 'cliente'},\n\nNotamos que você iniciou uma cotação de ${candidate.insurance_type || 'seguro'} mas não finalizou.\n\nClique aqui para continuar de onde parou: ${resumeLink}\n\nAtenciosamente,\nEquipe Patro Seguros`,
              htmlBody: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h2 style="color: #00468c;">Ficou alguma dúvida, ${candidate.name || 'cliente'}?</h2>
                  <p>Notamos que você iniciou uma simulação de <strong>${candidate.insurance_type || 'seguro'}</strong> mas não chegou a finalizar.</p>
                  <p>Salvamos seu progresso! Você pode continuar exatamente de onde parou clicando no botão abaixo:</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${resumeLink}" style="background-color: #00468c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Continuar Minha Cotação</a>
                  </div>
                  <p style="font-size: 12px; color: #666;">Este link é seguro e expira em 24 horas.</p>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                  <p style="font-size: 14px; color: #999; text-align: center;">Patro Seguros - Especialistas em Proteção em Guarulhos</p>
                </div>
              `
            }),
          }
        );

        if (emailResponse.ok) {
          await supabase
            .from("partial_quotes")
            .update({ reminder_sent_count: 1 })
            .eq("id", candidate.id);
          results.push({ id: candidate.id, status: "sent" });
        } else {
          results.push({ id: candidate.id, status: "failed", error: await emailResponse.text() });
        }
      } catch (e) {
        results.push({ id: candidate.id, status: "error", error: e.message });
      }
    }

    return new Response(JSON.stringify({ processed: results.length, details: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
