import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, ExternalLink } from "lucide-react";
import { Lead } from "@/hooks/queries/useLeads";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
}

export const LeadsTable = ({ leads, loading }: LeadsTableProps) => {
  const getInsuranceBadge = (type: string | null) => {
    if (!type) return <Badge variant="secondary">N/A</Badge>;
    
    const types: Record<string, string> = {
      'auto': 'Automóvel',
      'vida': 'Vida',
      'residencial': 'Residencial',
      'saude': 'Saúde',
      'frota': 'Frota',
      'empresarial': 'Empresarial'
    };

    return <Badge className="bg-primary hover:bg-primary/90">{types[type.toLowerCase()] || type}</Badge>;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-[150px]">Data</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Seguro</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6} className="h-12 animate-pulse bg-slate-50/50"></TableCell>
              </TableRow>
            ))
          ) : leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                Nenhum lead encontrado.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-slate-50/50">
                <TableCell className="text-sm">
                  <span className="font-medium">{format(new Date(lead.created_at), "dd/MM", { locale: ptBR })}</span>
                  <span className="text-muted-foreground ml-2">{format(new Date(lead.created_at), "HH:mm")}</span>
                </TableCell>
                <TableCell className="font-semibold text-slate-900">{lead.full_name || "—"}</TableCell>
                <TableCell>
                  <div className="text-xs space-y-0.5">
                    <div className="flex items-center gap-1.5 text-slate-600"><Phone className="w-3 h-3" /> {lead.phone || "—"}</div>
                    <div className="flex items-center gap-1.5 text-slate-600"><Mail className="w-3 h-3" /> {lead.email || "—"}</div>
                  </div>
                </TableCell>
                <TableCell>{getInsuranceBadge(lead.insurance_type)}</TableCell>
                <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">Novo</Badge></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {lead.phone && (
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50" asChild>
                        <a href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"><Phone className="w-4 h-4" /></a>
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400"><ExternalLink className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
