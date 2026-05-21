import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface KanbanStage {
  id: string;
  name: string;
  color: string;
  order_index: number;
}

export const useKanbanStages = () => {
  return useQuery({
    queryKey: ["kanban-stages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kanban_stages")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as KanbanStage[];
    },
  });
};
