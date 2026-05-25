import { useState, useMemo, useEffect } from "react";
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
  AlertCircle,
  Contact2,
  MessageSquare,
  Briefcase,
  BarChart3
} from "lucide-react";
import { subMonths, isAfter, isThisMonth } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/crm/DashboardOverview";
import RelationshipModule from "@/components/crm/RelationshipModule";
import ContactsModule from "@/components/crm/ContactsModule";
import OpportunitiesModule from "@/components/crm/OpportunitiesModule";
import PerformanceReports from "@/components/crm/PerformanceReports";
import { useLeads } from "@/hooks/queries/useLeads";
import { LeadsTable } from "@/components/crm/LeadsTable";
import { KanbanBoard } from "@/components/crm/KanbanBoard";
import { exportToCSV } from "@/lib/utils/export";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useContacts } from "@/hooks/queries/useContacts";
import { toast } from "sonner";

const CRMPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [opportunitySubTab, setOpportunitySubTab] = useState("opportunities");
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const { data = [], isLoading: isLoadingLeads, error: errorLeads, refetch: refetchLeads, isRefetching: isRefetchingLeads } = useLeads();
  const { 
    contacts = [], 
    isLoading: isLoadingContacts, 
    error: errorContacts, 
    refetch: refetchContacts, 
    isRefetching: isRefetchingContacts,
    forceRefetch: forceRefetchContacts
  } = useContacts();
  
  const leads = data || [];
  const isLoading = isLoadingLeads || isLoadingContacts;
  const error = errorLeads || errorContacts;
  const isRefetching = isRefetchingLeads || isRefetchingContacts;

  const refetch = () => {
    return Promise.all([refetchLeads(), refetchContacts()]);
  };

  const refreshRelationshipAgenda = async () => {
    await forceRefetchContacts();
  };

  useEffect(() => {
    // Configura o intervalo para 2 minutos (120000ms)
    // Usamos forceRefetchContacts para garantir que limpe o cache e pegue dados frescos
    const id = window.setInterval(() => {
      console.log("Auto-refresh: Sincronizando agenda e contatos...");
      forceRefetchContacts();
    }, 2 * 60 * 1000);
    
    return () => window.clearInterval(id);
  }, [forceRefetchContacts]);

  useEffect(() => {
    console.log("CRMPage: Componente montado. Leads carregados:", leads.length);
  }, [leads.length]);

  const filteredLeads = useMemo(() => {
    if (!Array.isArray(leads)) return [];
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
    
    // Satisfaction stats
    const contactsWithScore = contacts.filter(c => c.satisfaction_score !== null && c.satisfaction_score !== undefined);
    const avgScore = contactsWithScore.length > 0 
      ? (contactsWithScore.reduce((acc, c) => acc + (c.satisfaction_score || 0), 0) / contactsWithScore.length).toFixed(1)
      : "0.0";

    const oneYearAgo = subMonths(new Date(), 12);
    const surveyLastYear = contacts.filter(c => 
      c.satisfaction_score !== null && 
      c.satisfaction_score !== undefined && 
      c.updated_at && 
      isAfter(new Date(c.updated_at), oneYearAgo)
    ).length;

    // Renewal stats for this month
    const renewalsThisMonth = contacts.filter(c => {
      const renewalDates = [
        c.life_insurance_renewal,
        c.home_insurance_renewal,
        c.health_insurance_renewal,
        c.business_insurance_renewal,
        c.other_insurance_renewal,
        c.consortium_renewal
      ].filter(Boolean);
      
      return renewalDates.some(date => isThisMonth(new Date(date!)));
    });

    const renewedThisMonth = renewalsThisMonth.filter(c => {
      // Logic for "renewed": if updated_at is this month and it was a client? 
      // Or maybe check if they have a next_contact_date set?
      // A simple proxy: if the renewal date was updated to a future year within this month?
      // For now, let's use a simpler check: if last_contact_date is this month
      return c.last_contact_date && isThisMonth(new Date(c.last_contact_date));
    });

    return {
      totalLeads: leads.length,
      leads24h: leads.filter(l => l.created_at && new Date(l.created_at) > yesterday).length,
      conversionRate: "18.5%",
      activeCustomers: contacts.filter(c => c.is_client).length || 142,
      avgSatisfactionScore: avgScore,
      surveyResponsesLastYear: surveyLastYear,
      renewalsThisMonthCount: renewalsThisMonth.length,
      renewedThisMonthCount: renewedThisMonth.length
    };
  }, [leads, contacts]);

  const birthdays = useMemo(() => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    
    const results: any[] = [];
    
    contacts.forEach(contact => {
      // Check contact birthday
      if (contact.birth_date) {
        const bd = new Date(contact.birth_date);
        if (bd.getDate() === todayDay && (bd.getMonth() + 1) === todayMonth) {
          results.push({
            id: contact.id,
            name: contact.full_name,
            phone: contact.phone
          });
        }
      }
      
      // Check partner birthday
      if (contact.partner_birthday) {
        const pbd = new Date(contact.partner_birthday);
        if (pbd.getDate() === todayDay && (pbd.getMonth() + 1) === todayMonth) {
          results.push({
            id: `${contact.id}-partner`,
            name: contact.partner_name || `Cônjuge de ${contact.full_name}`,
            phone: contact.phone,
            relation: "Cônjuge"
          });
        }
      }
      
      // Check children birthdays
      if (contact.children_data && Array.isArray(contact.children_data)) {
        contact.children_data.forEach((child: any, idx: number) => {
          if (child.birthday) {
            const cbd = new Date(child.birthday);
            if (cbd.getDate() === todayDay && (cbd.getMonth() + 1) === todayMonth) {
              results.push({
                id: `${contact.id}-child-${idx}`,
                name: child.name || `Filho(a) de ${contact.full_name}`,
                phone: contact.phone,
                relation: "Filho(a)"
              });
            }
          }
        });
      }
    });
    
    return results;
  }, [contacts]);

  const renewals = useMemo(() => [
    { id: 'r1', clientName: 'Empresa ABC Ltda', insuranceType: 'Empresarial', dueDate: '22/05', isCompleted: false },
    { id: 'r2', clientName: 'João Silva', insuranceType: 'Auto', dueDate: '23/05', isCompleted: true },
    { id: 'r3', clientName: 'Ana Paula', insuranceType: 'Vida', dueDate: '25/05', isCompleted: false }
  ], []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Carregando dados do CRM...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 text-red-800 animate-in slide-in-from-top-4 duration-300">
              <div className="bg-red-100 p-2 rounded-full shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">Falha na sincronização</p>
                <p className="text-sm opacity-90">
                  {error instanceof Error ? `Erro: ${error.message}` : "Não foi possível estabelecer conexão com o banco de dados. Verifique seu acesso ou internet."}
                </p>
              </div>
              <Button 
                size="sm" 
                variant="default" 
                onClick={() => refetch()} 
                className="bg-red-600 hover:bg-red-700 text-white border-none shadow-md"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tentar Sincronizar
              </Button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                <TabsTrigger value="contacts" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <Contact2 className="w-4 h-4 mr-2" /> Contatos
                </TabsTrigger>
                <TabsTrigger value="customers" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <UserCheck className="w-4 h-4 mr-2" /> Clientes
                </TabsTrigger>
                <TabsTrigger value="renewals" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <RefreshCw className="w-4 h-4 mr-2" /> Renovações
                </TabsTrigger>
                <TabsTrigger value="opportunities" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <Briefcase className="w-4 h-4 mr-2" /> Oportunidades
                </TabsTrigger>
                <TabsTrigger value="relationship" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <Heart className="w-4 h-4 mr-2" /> Relacionamento
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none h-9 px-6 rounded-lg">
                  <BarChart3 className="w-4 h-4 mr-2" /> Desempenho
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
                birthdays={birthdays}
                renewals={renewals}
                contacts={contacts}
                onRefreshAgenda={refreshRelationshipAgenda}
                isRefreshingAgenda={isRefetchingContacts}
                onContactClick={(contact) => {
                  setSelectedContact(contact);
                  setActiveTab("contacts");
                }}
                onCarriersClick={() => {
                  setOpportunitySubTab("carriers");
                  setActiveTab("opportunities");
                }}
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
              <KanbanBoard leads={leads} />
            </TabsContent>

            <TabsContent value="relationship" className="mt-0">
              <RelationshipModule />
            </TabsContent>

            <TabsContent value="opportunities" className="mt-0">
              <OpportunitiesModule initialTab={opportunitySubTab} />
            </TabsContent>

            <TabsContent value="performance" className="mt-0">
              <PerformanceReports />
            </TabsContent>

            <TabsContent value="contacts" className="mt-0">
              <ContactsModule initialEditContact={selectedContact} />
            </TabsContent>
          </Tabs>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default CRMPage;