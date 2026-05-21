import { useState, useMemo } from "react";
import { 
  Search, 
  Users, 
  Shield, 
  Calendar, 
  Download, 
  RefreshCw,
  LayoutDashboard,
  TrendingUp,
  UserCheck,
  Heart,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/crm/DashboardOverview";
import RelationshipModule from "@/components/crm/RelationshipModule";
import { useLeads } from "@/hooks/queries/useLeads";
import { LeadsTable } from "@/components/crm/LeadsTable";
import { exportToCSV } from "@/lib/utils/export";

const CRMPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data = [], isLoading, error, refetch, isRefetching } = useLeads();
  const leads = data || [];

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        lead.full_name?.toLowerCase().includes(searchLower) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.phone?.includes(searchTerm) ||
        lead.insurance_type?.toLowerCase().includes(searchLower)
      );
    });
  }, [leads, searchTerm]);

  const stats = useMemo(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return {
      totalLeads: leads.length,
      leads24h: leads.filter(l => new Date(l.created_at) > yesterday).length,
      conversionRate: "18.5%",
      activeCustomers: 142
    };
  }, [leads]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-3 text-red-800 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Ocorreu um problema ao carregar os dados</p>
              <p className="text-sm opacity-90">
                {error instanceof Error ? error.message : "Não foi possível estabelecer conexão com o servidor. Verifique sua internet."}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="default" 
              onClick={() => refetch()} 
              className="bg-red-600 hover:bg-red-700 text-white border-none shrink-0"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        )}
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
                onClick={() => refetch()} 
                disabled={isRefetching}
                className="bg-white border-slate-200"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
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
                  <div className={`w-2 h-2 rounded-full ${isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}></div>
                  {isLoading ? "Sincronizando..." : "Sistema Online"}
                </div>
              </div>
            </div>

            <TabsContent value="dashboard" className="mt-0">
              <DashboardOverview 
                stats={stats}
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
                <Button onClick={() => exportToCSV(leads)} variant="outline" className="bg-white border-slate-200">
                  <Download className="w-4 h-4 mr-2" /> Exportar Leads
                </Button>
              </div>

              <Card className="bg-white shadow-sm border-slate-100 min-h-[400px]">
                <CardContent className="p-0">
                  {leads.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                      <Users className="w-12 h-12 mb-4 opacity-20" />
                      <p className="font-medium">Nenhum lead encontrado no momento.</p>
                      <p className="text-sm">Os leads aparecerão aqui assim que novos formulários forem preenchidos.</p>
                    </div>
                  ) : (
                    <LeadsTable leads={filteredLeads} loading={isLoading} />
                  )}
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