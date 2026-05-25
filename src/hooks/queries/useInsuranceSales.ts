import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface InsuranceSale {
  id: string;
  carrier: string;
  insurance_type: string;
  sale_date: string;
  amount: number;
  created_at: string;
}

export const useInsuranceSales = () => {
  return useQuery({
    queryKey: ["insurance-sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insurance_sales")
        .select("*")
        .order("sale_date", { ascending: false });

      if (error) throw error;
      return data as InsuranceSale[];
    },
  });
};
