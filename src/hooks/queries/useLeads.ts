import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

/** Tipo de linha de `leads` gerado a partir do schema Supabase. */
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];

export const useLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("kanban_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error fetching leads:", error);
          throw new Error(`Erro Supabase: ${error.message || "Erro ao conectar com o banco de dados"}`);
        }

        return (data ?? []) as Lead[];
      } catch (err) {
        console.error("Catch error fetching leads:", err);
        const message = err instanceof Error ? err.message : "Verifique sua conexão e tente novamente.";
        toast.error("Erro ao carregar leads", {
          description: message,
        });
        throw err;
      }
    },
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 2,
  });
};
