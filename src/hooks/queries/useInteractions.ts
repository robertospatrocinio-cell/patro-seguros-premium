import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

export type Interaction = Database["public"]["Tables"]["interactions"]["Row"];
export type InteractionInsert = Database["public"]["Tables"]["interactions"]["Insert"];
type ContactsUpdate = Database["public"]["Tables"]["contacts"]["Update"];

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
    mutationFn: async (newInteraction: Omit<InteractionInsert, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("interactions")
        .insert([newInteraction])
        .select()
        .single();

      if (error) throw error;

      // Update contact's last and next contact dates
      if (newInteraction.customer_id) {
        const updateData: ContactsUpdate = {
          last_contact_date: newInteraction.interaction_date,
          last_interaction_type: newInteraction.type,
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
    onError: (error: Error) => {
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
