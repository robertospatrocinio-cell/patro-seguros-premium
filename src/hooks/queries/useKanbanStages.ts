import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type KanbanStage = Database["public"]["Tables"]["kanban_stages"]["Row"];

export const useKanbanStages = () => {
  return useQuery({
    queryKey: ["kanban-stages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kanban_stages")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return (data ?? []) as KanbanStage[];
    },
    // Os estágios mudam raramente; mantemos em cache prolongado.
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
