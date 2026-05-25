import { useState, useMemo } from "react";
import { 
  Briefcase, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  MessageCircle, 
  Phone,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  User
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useContacts, Contact } from "@/hooks/queries/useContacts";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { getWhatsAppUrl } from "@/lib/whatsapp";

import CarriersModule from "./CarriersModule";

const INSURANCE_TYPES = [
  "Auto", "Vida", "Saúde", "Residencial", "Empresarial", "RC Profissional", "Previdência", "Consórcio"
];

const OpportunitiesModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [insuranceFilter, setInsuranceFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("opportunities");
  const { contacts = [], isLoading } = useContacts();

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      // Must have at least one opportunity
      const hasOpportunities = contact.opportunities && contact.opportunities.length > 0;
      if (!hasOpportunities) return false;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        contact.full_name.toLowerCase().includes(searchLower) ||
        (contact.email?.toLowerCase().includes(searchLower)) ||
        (contact.phone?.includes(searchTerm));
      
      const matchesInsurance = insuranceFilter === "all" || 
        (contact.opportunities && contact.opportunities.includes(insuranceFilter));

      return matchesSearch && matchesInsurance;
    });
  }, [contacts, searchTerm, insuranceFilter]);

  const handleExportExcel = () => {
    if (filteredContacts.length === 0) {
      toast.error("Nenhuma oportunidade para exportar");
      return;
    }

    try {
      const exportRows = filteredContacts.map(c => ({
        "Nome Completo": c.full_name,
        "Telefone": c.phone || "",
        "Email": c.email || "",
        "Oportunidades": (c.opportunities || []).join(", "),
        "Notas Comercial": c.opportunity_notes || "",
        "Última Interação": c.last_interaction_type || "",
        "Responsável": c.responsible_name || ""
      }));

      const ws = XLSX.utils.json_to_sheet(exportRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Oportunidades");
      const filename = `oportunidades_${insuranceFilter === "all" ? "geral" : insuranceFilter.toLowerCase()}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, filename);
      
      toast.success("Relatório exportado com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar relatório");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex border-b border-slate-200">
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === "opportunities" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("opportunities")}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Oportunidades
          </div>
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === "carriers" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("carriers")}
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Seguradoras
          </div>
        </button>
      </div>

      {activeTab === "opportunities" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">{filteredContacts.length}</span>
              <TrendingUp className="w-5 h-5 text-primary opacity-20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Clientes com potencial de venda</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm border-none">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Gestão de Oportunidades
              </CardTitle>
              <CardDescription>Clientes com interesse em novos produtos de seguro</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar cliente..." 
                  className="pl-8 h-9 w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={insuranceFilter} onValueChange={setInsuranceFilter}>
                <SelectTrigger className="h-9 w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tipo de Seguro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Oportunidades</SelectItem>
                  {INSURANCE_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9" onClick={handleExportExcel}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Relatório
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-100">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Oportunidades</TableHead>
                  <TableHead className="hidden md:table-cell">Notas Comercial</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{contact.full_name}</span>
                          <span className="text-xs text-muted-foreground">{contact.phone || contact.email || 'Sem contato'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {contact.opportunities?.map((opp, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 text-[10px]">
                              {opp}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate text-xs text-slate-600">
                        {contact.opportunity_notes || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {contact.phone && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" asChild>
                              <a href={getWhatsAppUrl(contact.phone)} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Briefcase className="w-8 h-8 mb-2 opacity-20" />
                        <p>Nenhuma oportunidade encontrada com esses filtros.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        </Card>
        </>
      ) : (
        <CarriersModule />
      )}
    </div>
  );
};

export default OpportunitiesModule;
