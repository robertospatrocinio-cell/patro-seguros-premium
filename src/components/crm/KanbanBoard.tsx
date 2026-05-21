import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  User,
  Plus
} from "lucide-react";
import { Lead } from "@/hooks/queries/useLeads";
import { KanbanStage, useKanbanStages } from "@/hooks/queries/useKanbanStages";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface KanbanBoardProps {
  leads: Lead[];
}

export const KanbanBoard = ({ leads }: KanbanBoardProps) => {
  const { data: stages = [] } = useKanbanStages();
  const [boardData, setBoardData] = useState<{ [key: string]: Lead[] }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (stages.length > 0) {
      const initialData: { [key: string]: Lead[] } = {};
      stages.forEach(stage => {
        initialData[stage.id] = leads
          .filter(lead => lead.kanban_stage_id === stage.id)
          .sort((a, b) => (a.kanban_order || 0) - (b.kanban_order || 0));
      });
      
      // Handle leads without a stage (put them in the first stage or a default one)
      const leadsWithoutStage = leads.filter(lead => !lead.kanban_stage_id);
      if (leadsWithoutStage.length > 0 && stages[0]) {
        initialData[stages[0].id] = [...(initialData[stages[0].id] || []), ...leadsWithoutStage];
      }
      
      setBoardData(initialData);
    }
  }, [leads, stages]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startStageId = source.droppableId;
    const finishStageId = destination.droppableId;
    const leadId = draggableId;

    // Local update for immediate feedback
    const newBoardData = { ...boardData };
    const startLeads = [...(newBoardData[startStageId] || [])];
    const [movedLead] = startLeads.splice(source.index, 1);
    
    if (startStageId === finishStageId) {
      startLeads.splice(destination.index, 0, movedLead);
      newBoardData[startStageId] = startLeads;
    } else {
      const finishLeads = [...(newBoardData[finishStageId] || [])];
      finishLeads.splice(destination.index, 0, movedLead);
      newBoardData[startStageId] = startLeads;
      newBoardData[finishStageId] = finishLeads;
    }
    
    setBoardData(newBoardData);

    // Persist to database
    try {
      const { error } = await supabase
        .from("leads")
        .update({ 
          kanban_stage_id: finishStageId,
          kanban_order: destination.index
        })
        .eq("id", leadId);

      if (error) throw error;
      
      // Optionally update others' order in the same column
      // This is a bit more complex, for now we just refresh
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    } catch (error) {
      console.error("Error updating lead stage:", error);
      toast.error("Erro ao mover lead");
      // Revert if error
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  };

  const openWhatsApp = (phone: string | null) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${cleanPhone}`, "_blank");
  };

  return (
    <div className="h-[calc(100vh-280px)] overflow-x-auto pb-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 h-full min-w-max px-1">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col w-80 bg-slate-50/50 rounded-xl border border-slate-200/60">
              <div className="p-3 flex items-center justify-between border-b border-slate-200/60 bg-white/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 rounded-full" style={{ backgroundColor: stage.color }}></div>
                  <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
                    {stage.name}
                  </h3>
                  <Badge variant="secondary" className="bg-slate-200/50 text-slate-600 font-bold ml-1">
                    {boardData[stage.id]?.length || 0}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${
                      snapshot.isDraggingOver ? "bg-slate-100/50" : ""
                    }`}
                  >
                    {boardData[stage.id]?.map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`group transition-all ${snapshot.isDragging ? "z-50" : ""}`}
                          >
                            <Card className={`border-slate-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing ${
                              snapshot.isDragging ? "shadow-xl ring-2 ring-primary/20 rotate-1" : "shadow-sm"
                            }`}>
                              <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                    <h4 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                                      {lead.full_name || "Sem Nome"}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                      <Badge variant="outline" className="text-[10px] font-medium py-0 h-5 border-slate-200 bg-slate-50">
                                        {lead.insurance_type || "Geral"}
                                      </Badge>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="h-4 w-4 text-slate-400" />
                                  </Button>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                                  {lead.phone && (
                                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                                      <Phone className="h-3 w-3 text-slate-400" />
                                      {lead.phone}
                                    </div>
                                  )}
                                </div>

                                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                                  <div className="flex -space-x-2">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary">
                                      <User className="h-3 w-3" />
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openWhatsApp(lead.phone);
                                      }}
                                    >
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
