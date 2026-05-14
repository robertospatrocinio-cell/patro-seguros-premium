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
 
   /**
    * Standard error handler for Supabase/Edge Function failures.
    * Maps common error codes to friendly Portuguese messages.
    */
   export function handleSupabaseError(error: any, customMessage?: string) {
     console.error("Supabase error:", error);
     
     // Don't report "user cancelled" or "offline" as critical exceptions to monitoring
     const isNetworkError = !navigator.onLine || error.message?.includes("fetch");
     if (!isNetworkError) {
       captureException(error, { context: "supabase-error", customMessage });
     }
 
     let friendlyTitle = customMessage || "Erro na comunicação";
     let friendlyDesc = "Verifique sua conexão e tente novamente.";
 
     // Code-specific friendly messages
     if (error.code === "PGRST116") {
       friendlyDesc = "O registro solicitado não foi encontrado.";
     } else if (error.status === 429) {
       friendlyDesc = "Muitas solicitações em pouco tempo. Por favor, aguarde um minuto.";
     } else if (isNetworkError) {
       friendlyTitle = "Sem conexão";
       friendlyDesc = "Você parece estar offline ou o servidor está demorando para responder.";
     } else if (error.message?.includes("JWT")) {
       friendlyDesc = "Sua sessão expirou. Por favor, recarregue a página.";
     }
 
     toast.error(friendlyTitle, {
       description: friendlyDesc,
       duration: 5000,
     });
   }