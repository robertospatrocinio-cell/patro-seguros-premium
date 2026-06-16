import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type InsuranceSale = Database["public"]["Tables"]["insurance_sales"]["Row"];

export const useInsuranceSales = () => {
  return useQuery({
    queryKey: ["insurance-sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insurance_sales")
        .select("*")
        .order("sale_date", { ascending: false });

      if (error) throw error;
      return (data ?? []) as InsuranceSale[];
    },
  });
};
