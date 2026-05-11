  import { supabase } from "@/integrations/supabase/client";
  import { toast } from "sonner";
  import { captureException } from "./monitoring";
 
 export async function safeInvoke(functionName: string, body: any) {
   try {
     const { data, error } = await supabase.functions.invoke(functionName, { body });
     if (error) throw error;
     return { data, error: null };
    } catch (err: any) {
    console.error(`Error invoking ${functionName}:`, err);
    // Avoid leaking PII (name/email/phone) to third-party monitoring.
    const safeContext = {
      functionName,
      bodyKeys: body && typeof body === "object" ? Object.keys(body) : [],
    };
    captureException(err, safeContext);
      return { data: null, error: err };
    }
 }
 
  export function handleSupabaseError(error: any, customMessage?: string) {
    console.error("Supabase error:", error);
    captureException(error, { context: "supabase-error", customMessage });
    toast.error(customMessage || "Ocorreu um erro na comunicação com o servidor.", {
      description: "Verifique sua conexão ou tente novamente mais tarde."
    });
  }