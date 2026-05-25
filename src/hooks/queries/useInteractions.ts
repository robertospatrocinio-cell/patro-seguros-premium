import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Interaction {
  id: string;
  customer_id: string;
  type: string;
  interaction_date: string;
  user_id: string | null;
  notes: string | null;
  status: string | null;
  next_contact_date: string | null;
  created_at: string;
}

export const useInteractions = (contactId?: string) => {
  const queryClient = useQueryClient();

  const { data: interactions, isLoading, error, refetch } = useQuery({
    queryKey: ["interactions", contactId],
    queryFn: async () => {
      if (!contactId) return [];
      const { data, error } = await supabase
        .from("interactions")
        .select("*")
        .eq("customer_id", contactId)
        .order("interaction_date", { ascending: false });

      if (error) throw error;
      return data as Interaction[];
    },
    enabled: !!contactId,
  });

  const createInteraction = useMutation({
    mutationFn: async (newInteraction: Partial<Interaction>) => {
      const { data, error } = await supabase
        .from("interactions")
        .insert([newInteraction])
        .select()
        .single();

      if (error) throw error;
      
      // Update contact's last and next contact dates
      if (newInteraction.customer_id) {
        const updateData: any = {
          last_contact_date: newInteraction.interaction_date,
          last_interaction_type: newInteraction.type
        };
        
        if (newInteraction.next_contact_date) {
          updateData.next_contact_date = newInteraction.next_contact_date;
        }

        const { error: contactError } = await supabase
          .from("contacts")
          .update(updateData)
          .eq("id", newInteraction.customer_id);
          
        if (contactError) console.error("Error updating contact dates:", contactError);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interactions", contactId] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Histórico registrado com sucesso!");
    },
    onError: (error: any) => {
      toast.error("Erro ao registrar histórico: " + error.message);
    }
  });

  return {
    interactions,
    isLoading,
    error,
    refetch,
    createInteraction
  };
};
