import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type ClaimRow = Database["public"]["Tables"]["claims"]["Row"];
type ClaimInsert = Database["public"]["Tables"]["claims"]["Insert"];
type ClaimUpdate = Database["public"]["Tables"]["claims"]["Update"];

/** `Claim` enriquecido com o join de contatos usado na listagem. */
export type Claim = ClaimRow & {
  contacts?: { full_name: string | null; phone: string | null } | null;
};
export type { ClaimInsert, ClaimUpdate };

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
      return (data ?? []) as Claim[];
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  const createClaim = useMutation({
    mutationFn: async (newClaim: Partial<Claim>) => {
      const { contacts: _ignore, ...dbClaim } = newClaim;
      void _ignore;
      const { data, error } = await supabase
        .from("claims")
        .insert([dbClaim as ClaimInsert])
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
      // Remove join field para que o Postgres só receba colunas reais.
      const { contacts: _ignore, ...dbUpdates } = updates;
      void _ignore;

      const { data, error } = await supabase
        .from("claims")
        .update(dbUpdates as ClaimUpdate)
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
