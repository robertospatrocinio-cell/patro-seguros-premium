import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
}

export const useLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      console.log("Fetching leads from Supabase...");
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Lead[];
    },
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000, // Data is fresh for 30 seconds
  });
};
