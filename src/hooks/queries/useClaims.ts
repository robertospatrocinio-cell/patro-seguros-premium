import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Claim {
  id: string;
  client_id: string;
  description: string;
  claim_date: string;
  status: string;
  has_third_party: boolean;
  third_party_count: number;
  third_party_name: string;
  third_party_phone: string;
  tracking_notes: string;
  created_at: string;
  updated_at: string;
  contacts?: {
    full_name: string;
    phone: string;
  };
}

export const useClaims = () => {
  const queryClient = useQueryClient();

  const { data: claims = [], isLoading, error } = useQuery({
    queryKey: ["claims"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("claims")
        .select(`
          *,
          contacts:client_id (
            full_name,
            phone
          )
        `)
        .order("claim_date", { ascending: false });

      if (error) throw error;
      return data as Claim[];
    },
  });

  const createClaim = useMutation({
    mutationFn: async (newClaim: Partial<Claim>) => {
      const { data, error } = await supabase
        .from("claims")
        .insert([newClaim])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      toast.success("Sinistro registrado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao registrar sinistro: ${error.message}`);
    },
  });

  const updateClaim = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Claim> & { id: string }) => {
      // Remove 'contacts' from updates to avoid TS errors and Postgres errors
      const { contacts, ...dbUpdates } = updates as any;
      
      const { data, error } = await supabase
        .from("claims")
        .update(dbUpdates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      toast.success("Sinistro atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar sinistro: ${error.message}`);
    },
  });

  return {
    claims,
    isLoading,
    error,
    createClaim,
    updateClaim,
  };
};
