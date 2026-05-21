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
  Clock,
  LayoutDashboard,
  MessageSquare,
  FileText,
  UserCheck,
  TrendingUp,
  Award,
  Heart
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DashboardOverview } from "@/components/crm/DashboardOverview";
import RelationshipModule from "@/components/crm/RelationshipModule";


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

  const fetchLeads = async (showLoading = true) => {
    try {
      if (showLoading) setIsRefreshing(true);
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
    
    // Polling interval de 1 minuto para manter os dados atualizados
    const interval = setInterval(() => {
      fetchLeads(false); // Background update
    }, 60000);
    
    return () => clearInterval(interval);
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
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col gap-8">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Patro CRM <span className="text-primary font-black">PRO</span>
                </h1>
              </div>
              <p className="text-muted-foreground ml-11">
                Gestão estratégica de seguros e relacionamento.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={fetchLeads} 
                disabled={isRefreshing}
                className="bg-white border-slate-200"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
              <Button className="bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20">
                <Calendar className="w-4 h-4 mr-2" />
                Nova Atividade
              </Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <div className="flex items-center justify-between mb-6 bg-white p-1 rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
              <TabsList className="bg-transparent h-11">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                </TabsTrigger>
                <TabsTrigger value="leads" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <Users className="w-4 h-4 mr-2" /> Leads
                </TabsTrigger>
                <TabsTrigger value="pipeline" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <TrendingUp className="w-4 h-4 mr-2" /> Pipeline
                </TabsTrigger>
                <TabsTrigger value="customers" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <UserCheck className="w-4 h-4 mr-2" /> Clientes
                </TabsTrigger>
                <TabsTrigger value="renewals" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <RefreshCw className="w-4 h-4 mr-2" /> Renovações
                </TabsTrigger>
                <TabsTrigger value="relationship" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <Heart className="w-4 h-4 mr-2" /> Relacionamento
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex px-4 gap-4 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Sistema Online
                </div>
              </div>
            </div>

            <TabsContent value="dashboard" className="mt-0">
              <DashboardOverview 
                stats={{
                  totalLeads: leads.length,
                  leads24h: leads.filter(l => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return new Date(l.created_at) > yesterday;
                  }).length,
                  conversionRate: "18.5%",
                  activeCustomers: 142
                }}
                birthdays={[
                  { id: '1', name: 'Ricardo Santos', phone: '11999999999' },
                  { id: '2', name: 'Mariana Oliveira' }
                ]}
                renewals={[
                  { id: 'r1', clientName: 'Empresa ABC Ltda', insuranceType: 'Empresarial', dueDate: '22/05', isCompleted: false },
                  { id: 'r2', clientName: 'João Silva', insuranceType: 'Auto', dueDate: '23/05', isCompleted: true },
                  { id: 'r3', clientName: 'Ana Paula', insuranceType: 'Vida', dueDate: '25/05', isCompleted: false }
                ]}
              />
            </TabsContent>

            <TabsContent value="leads" className="mt-0 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar leads..." 
                    className="pl-9 bg-white border-slate-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={exportToCSV} variant="outline" className="bg-white border-slate-200">
                  <Download className="w-4 h-4 mr-2" /> Exportar Leads
                </Button>
              </div>

              <Card className="bg-white shadow-sm border-slate-100">
                <CardContent className="p-0">
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
                        ) : filteredLeads.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                              Nenhum lead encontrado.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredLeads.map((lead) => (
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pipeline" className="mt-0">
              <div className="bg-white p-12 rounded-xl border border-dashed border-slate-200 text-center">
                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Módulo Kanban em Desenvolvimento</h3>
                <p className="text-muted-foreground">O visual estilo Pipedrive/Monday está sendo configurado.</p>
              </div>
            </TabsContent>

            <TabsContent value="relationship" className="mt-0">
              <RelationshipModule />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CRMPage;
