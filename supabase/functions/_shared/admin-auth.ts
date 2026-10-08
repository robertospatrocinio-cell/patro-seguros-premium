import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Check authorization before using a service-role client. A valid JWT alone
// does not authorize access to administration or to other users' data.
export async function requireAdminOrService(
  req: Request,
  corsHeaders: Record<string, string>,
): Promise<Response | null> {
  const deny = (status: number, error: string) => new Response(
    JSON.stringify({ error }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );

  if (req.method !== "POST") return deny(405, "Method not allowed");

  const token = req.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) return deny(401, "Authentication required");

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return deny(503, "Authentication unavailable");

  // Preserve scheduled jobs and server-to-server calls; never trust a role
  // decoded from an unverified JWT or supplied in the request body.
  if (token === key) return null;

  try {
    const admin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await admin.auth.getUser(token);
    if (error || !data.user || data.user.is_anonymous) {
      return deny(401, "Invalid session");
    }
    const { data: role, error: roleError } = await admin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleError || !role) return deny(403, "Administrator access required");
    return null;
  } catch {
    return deny(503, "Authentication unavailable");
  }
}
