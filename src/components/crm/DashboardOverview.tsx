import { 
  Users, 
  Search, 
  Shield, 
  Calendar, 
  Phone, 
  Mail, 
  ExternalLink, 
  Download, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Award,
  Bell,
  MessageSquare,
  FileText,
  LayoutDashboard,
  Filter,
  Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DashboardStats {
  totalLeads: number;
  leads24h: number;
  conversionRate: string;
  activeCustomers: number;
  avgSatisfactionScore?: string;
  surveyResponsesLastYear?: number;
  renewalsThisMonthCount?: number;
  renewedThisMonthCount?: number;
}

interface BirthdayPerson {
  id: string;
  name: string;
  phone?: string;
}

interface RenewalItem {
  id: string;
  clientName: string;
  insuranceType: string;
  dueDate: string;
  isCompleted: boolean;
}

interface DashboardOverviewProps {
  stats: DashboardStats;
  birthdays: BirthdayPerson[];
  renewals: RenewalItem[];
}

export const DashboardOverview = ({ stats, birthdays, renewals }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> Total de Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalLeads}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" /> Últimas 24h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.leads24h}</p>
            <p className="text-xs text-muted-foreground mt-1">Leads aguardando</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" /> Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.conversionRate}</p>
            <p className="text-xs text-purple-600 mt-1">Performance Alta</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" /> Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.activeCustomers}</p>
            <p className="text-xs text-green-600 mt-1">Crescimento constante</p>
          </CardContent>
        </Card>

        {/* satisfaction score cards */}
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" /> Média de Satisfação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.avgSatisfactionScore || "0.0"}/5.0</p>
            <p className="text-xs text-muted-foreground mt-1">Baseado nas pesquisas</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" /> Respostas (12m)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.surveyResponsesLastYear || 0}</p>
            <p className="text-xs text-muted-foreground mt-1">Contatos ativos no último ano</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-green-600" /> Renovações do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.renewalsThisMonthCount || 0}</p>
            <p className="text-xs text-green-600 mt-1">{stats.renewedThisMonthCount || 0} renovados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aniversariantes do Dia */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Aniversariantes do Dia
            </CardTitle>
            <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none">
              {birthdays.length} Hoje
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            {birthdays.length > 0 ? (
              <ul className="divide-y divide-slate-50">
                {birthdays.map((person) => (
                  <li key={person.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium text-sm">
                        {person.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{person.name}</p>
                        <p className="text-xs text-muted-foreground">Parabenize seu cliente!</p>
                      </div>
                    </div>
                    {person.phone && (
                      <Button size="sm" variant="outline" className="h-8 text-green-600 border-green-100 hover:bg-green-50">
                        <Phone className="w-3.5 h-3.5 mr-2" />
                        WhatsApp
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Nenhum aniversariante hoje.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Renovações da Semana */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-500" />
              Renovações da Semana
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-primary">Ver Todas</Button>
          </CardHeader>
          <CardContent className="p-0">
            {renewals.length > 0 ? (
              <ul className="divide-y divide-slate-50">
                {renewals.map((item) => (
                  <li key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${item.isCompleted ? 'bg-green-50' : 'bg-red-50'}`}>
                        {item.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.clientName}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4 font-normal border-slate-200">
                            {item.insuranceType}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Vence: {item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Shield className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Nenhuma renovação para esta semana.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
