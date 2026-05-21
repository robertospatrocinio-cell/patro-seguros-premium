import { useEffect, useState } from "react";
import { 
  Search, 
  Users, 
  Phone, 
  Mail, 
  Shield, 
  Calendar, 
  ExternalLink,
  Download,
  Filter,
  RefreshCw,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Lead {
  id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  insurance_type: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  raw_data: any;
}

const CRMPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLeads = async () => {
    try {
      setIsRefreshing(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      console.error("Erro ao buscar leads:", error);
      toast.error("Não foi possível carregar os leads.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      lead.full_name?.toLowerCase().includes(searchLower) ||
      lead.email?.toLowerCase().includes(searchLower) ||
      lead.phone?.includes(searchTerm) ||
      lead.insurance_type?.toLowerCase().includes(searchLower)
    );
  });

  const exportToCSV = () => {
    if (leads.length === 0) {
      toast.error("Não há dados para exportar.");
      return;
    }

    const headers = ["Data", "Nome", "E-mail", "Telefone", "Tipo de Seguro", "Página de Origem"];
    const csvContent = [
      headers.join(","),
      ...leads.map((lead) => [
        format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
        `"${lead.full_name || ""}"`,
        lead.email || "",
        lead.phone || "",
        `"${lead.insurance_type || ""}"`,
        lead.source_page || ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_patro_seguros_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exportado com sucesso!");
  };

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                <Shield className="w-8 h-8" />
                Painel CRM de Leads
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie as solicitações de cotação recebidas pelo site.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={fetchLeads} 
                disabled={isRefreshing}
                className="bg-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
              <Button onClick={exportToCSV} className="bg-primary">
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> Total de Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{leads.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Últimas 24h
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {leads.filter(l => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return new Date(l.created_at) > yesterday;
                  }).length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Search className="w-4 h-4" /> Busca Rápida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Nome, e-mail, telefone ou seguro..." 
                    className="pl-9 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-lg">Fila de Atendimento</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[150px]">Data/Hora</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Seguro</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={6} className="h-12 animate-pulse bg-slate-50"></TableCell>
                        </TableRow>
                      ))
                    ) : filteredLeads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                          Nenhum lead encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLeads.map((lead) => (
                        <TableRow key={lead.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-sm">
                            <div className="flex flex-col">
                              <span>{format(new Date(lead.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                              <span className="text-xs text-muted-foreground">{format(new Date(lead.created_at), "HH:mm")}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-slate-900">{lead.full_name || "—"}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-sm">
                              <span className="flex items-center gap-1.5 text-slate-600">
                                <Phone className="w-3.5 h-3.5" /> {lead.phone || "—"}
                              </span>
                              <span className="flex items-center gap-1.5 text-slate-600">
                                <Mail className="w-3.5 h-3.5" /> {lead.email || "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getInsuranceBadge(lead.insurance_type)}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col text-xs max-w-[150px] truncate">
                              <span className="text-slate-600 truncate" title={lead.source_page || ""}>
                                {lead.source_page?.replace(window.location.origin, "") || "Home"}
                              </span>
                              {lead.utm_source && (
                                <span className="text-primary/70 font-medium">
                                  {lead.utm_source}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {lead.phone && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  asChild 
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <a 
                                    href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    <Phone className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast.info(`Dados brutos: ${JSON.stringify(lead.raw_data)}`, {
                                    duration: 5000
                                  });
                                }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CRMPage;
