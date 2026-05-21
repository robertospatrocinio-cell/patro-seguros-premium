import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Lead {
  id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  insurance_type: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  raw_data: any;
  lead_status: string | null;
  kanban_stage_id: string | null;
  kanban_order: number;
  client_type: string | null;
  cpf_cnpj: string | null;
  city: string | null;
  state: string | null;
  responsible_name: string | null;
}

export const useLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      try {
        console.log("Fetching leads from Supabase...");
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("kanban_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error fetching leads:", error);
          throw new Error(`Erro Supabase: ${error.message || "Erro ao conectar com o banco de dados"}`);
        }
        
        return (data || []) as Lead[];
      } catch (err: any) {
        console.error("Catch error fetching leads:", err);
        toast.error("Erro ao carregar leads", {
          description: err.message || "Verifique sua conexão e tente novamente.",
        });
        throw err;
      }
    },
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 2,
  });
};
