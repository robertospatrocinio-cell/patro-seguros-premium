import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useInteractions } from "@/hooks/queries/useInteractions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  History, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  Clock,
  User,
  PlusCircle,
  Loader2
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ContactInteractionDialogProps {
  contact: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactInteractionDialog = ({ contact, open, onOpenChange }: ContactInteractionDialogProps) => {
  const { interactions, isLoading, createInteraction } = useInteractions(contact?.id);
  const [newNote, setNewNote] = useState("");
  const [interactionType, setInteractionType] = useState("WhatsApp");
  const [nextContactDate, setNextContactDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newNote.trim()) return;

    setIsSubmitting(true);
    try {
      await createInteraction.mutateAsync({
        customer_id: contact.id,
        type: interactionType,
        notes: newNote,
        interaction_date: new Date().toISOString(),
        next_contact_date: nextContactDate || null,
        status: "completed",
        user_id: null // Should be the current user ID if available
      });
      setNewNote("");
      setNextContactDate("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "WhatsApp": return <MessageSquare className="w-4 h-4 text-green-500" />;
      case "Ligação": return <Phone className="w-4 h-4 text-blue-500" />;
      case "Email": return <Mail className="w-4 h-4 text-purple-500" />;
      default: return <History className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full">
              <User className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">{contact?.full_name}</DialogTitle>
              <DialogDescription>
                Histórico de conversas e novos registros
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-0">
          {/* Histórico Column */}
          <div className="flex-1 p-6 overflow-hidden flex flex-col border-r border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4" /> Histórico
              </h3>
              <Badge variant="secondary" className="text-[10px]">
                {interactions?.length || 0} registros
              </Badge>
            </div>
            
            <ScrollArea className="flex-1 pr-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              ) : interactions && interactions.length > 0 ? (
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <div key={interaction.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100 relative group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getIcon(interaction.type)}
                          <span className="text-xs font-bold text-slate-700">{interaction.type}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {format(new Date(interaction.interaction_date), "dd/MM/yy HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 whitespace-pre-wrap">{interaction.notes}</p>
                      {interaction.next_contact_date && (
                        <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
                          <Calendar className="w-3 h-3" />
                          Retornar em: {format(new Date(interaction.next_contact_date), "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 opacity-40">
                  <History className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Nenhum histórico encontrado</p>
                </div>
              )}
            </ScrollArea>
          </div>

          {/* New Note Column */}
          <div className="w-full md:w-[240px] p-6 bg-slate-50/50 flex flex-col gap-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Novo Registro
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-xs">Tipo de Contato</Label>
                <Select value={interactionType} onValueChange={setInteractionType}>
                  <SelectTrigger id="type" className="h-8 text-xs bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Ligação">Ligação</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs">O que foi conversado?</Label>
                <Textarea 
                  id="notes"
                  placeholder="Resumo da conversa..." 
                  className="min-h-[100px] text-xs bg-white resize-none"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="next-date" className="text-xs">Agendar Retorno (Opcional)</Label>
                <Input 
                  id="next-date"
                  type="date" 
                  className="h-8 text-xs bg-white"
                  value={nextContactDate}
                  onChange={(e) => setNextContactDate(e.target.value)}
                />
              </div>

              <Button 
                className="w-full h-9 text-xs" 
                onClick={handleSubmit}
                disabled={isSubmitting || !newNote.trim()}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
                Salvar Histórico
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInteractionDialog;
