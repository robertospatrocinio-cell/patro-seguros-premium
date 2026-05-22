import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  UsersRound, 
  UserPlus,
  RefreshCw,
  MoreVertical,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  History,
  FileText,
  UserCheck,
  Zap,
  ExternalLink,
  PhoneCall,
  CalendarIcon
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { format, isSameDay, parseISO, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContacts } from "@/hooks/queries/useContacts";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AUTO_REFRESH_OPTIONS = [
  { value: "0", label: "Desligado" },
  { value: "60", label: "1 min" },
  { value: "300", label: "5 min" },
  { value: "600", label: "10 min" },
  { value: "1800", label: "30 min" },
];

const RelationshipModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { contacts = [], isLoading, refetch } = useContacts();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [autoRefreshSeconds, setAutoRefreshSeconds] = useState<string>("300");

  const handleRefreshAgenda = async (silent = false) => {
    setIsRefreshing(true);
    try {
      await refetch();
      if (!silent) toast.success("Agenda atualizada com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao atualizar agenda: " + (err?.message || "tente novamente"));
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Auto-refresh interval
  useEffect(() => {
    const seconds = parseInt(autoRefreshSeconds, 10);
    if (!seconds || seconds <= 0) return;
    const id = setInterval(() => {
      handleRefreshAgenda(true);
    }, seconds * 1000);
    return () => clearInterval(id);
  }, [autoRefreshSeconds]);

  const isToday = isSameDay(selectedDate, new Date());

  const scheduledToday = useMemo(() => {
    return contacts.filter(contact => {
      if (!contact.next_contact_date) return false;
      const contactDate = parseISO(contact.next_contact_date);
      if (isSameDay(contactDate, selectedDate)) return true;
      if (isToday && isPast(contactDate)) return true;
      return false;
    });
  }, [contacts, selectedDate, isToday]);

  const stats = useMemo(() => {
    const clients = contacts.filter(c => c.is_client);
    const inRisk = contacts.filter(c => c.satisfaction_score && c.satisfaction_score < 40).length;
    
    const scores = contacts.filter(c => c.satisfaction_score !== null).map(c => c.satisfaction_score || 0);
    const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0) : 0;

    return {
      inRisk,
      avgScore: Number(avgScore),
      totalScheduled: scheduledToday.length,
      totalContacts: contacts.length
    };
  }, [contacts, scheduledToday]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const searchLower = searchTerm.toLowerCase();
      return (
        contact.full_name.toLowerCase().includes(searchLower) ||
        (contact.email?.toLowerCase().includes(searchLower)) ||
        (contact.phone?.includes(searchTerm))
      );
    });
  }, [contacts, searchTerm]);

  const getScoreColor = (score: number | null) => {
    if (!score) return "bg-slate-300";
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getProfileLabel = (profile: string | null) => {
    switch (profile) {
      case 'premium': return <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">Premium</Badge>;
      case 'business': return <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Empresarial</Badge>;
      case 'high_risk': return <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">Alto Risco</Badge>;
      default: return <Badge variant="outline">Comum</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 will-change-transform">
      {/* Contatos Agendados para Hoje */}
      <Card className="bg-emerald-50 border-emerald-100 shadow-sm border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <Calendar className="w-5 h-5" />
              <CardTitle className="text-lg font-bold">
                Agenda de Contatos - {isToday ? "Hoje" : format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-600">{scheduledToday.length} agendados</Badge>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-100"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 mr-2" />
                    {format(selectedDate, "dd/MM/yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => d && setSelectedDate(d)}
                    initialFocus
                    locale={ptBR}
                    className={cn("p-3 pointer-events-auto")}
                  />
                  {!isToday && (
                    <div className="p-2 border-t">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full h-8 text-xs"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        Voltar para Hoje
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              <Select value={autoRefreshSeconds} onValueChange={setAutoRefreshSeconds}>
                <SelectTrigger className="h-8 w-[140px] bg-white border-emerald-200 text-emerald-800 text-xs">
                  <SelectValue placeholder="Auto-atualizar" />
                </SelectTrigger>
                <SelectContent>
                  {AUTO_REFRESH_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      Auto: {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={() => handleRefreshAgenda(false)}
                disabled={isRefreshing || isLoading}
                className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>
          </div>
          <CardDescription className="text-emerald-700/80">
            {isToday
              ? "Clientes a contatar hoje (inclui agendamentos em atraso)."
              : `Clientes agendados para ${format(selectedDate, "dd/MM/yyyy")}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scheduledToday.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledToday.map(contact => (
                <div key={contact.id} className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex flex-col justify-between group hover:border-emerald-300 transition-colors">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900">{contact.full_name}</h4>
                      {isPast(parseISO(contact.next_contact_date!)) && !isSameDay(parseISO(contact.next_contact_date!), new Date()) && (
                        <Badge variant="destructive" className="text-[10px] h-5">Atrasado</Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-500 space-y-1 mb-4">
                      <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {contact.phone || 'Sem telefone'}</div>
                      <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {contact.last_contact_date ? `Último em: ${format(parseISO(contact.last_contact_date), "dd/MM")}` : 'Sem contato anterior'}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-8">
                      <PhoneCall className="w-3.5 h-3.5 mr-2" /> Ligar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 h-8">
                      <MessageSquare className="w-3.5 h-3.5 mr-2" /> WhatsApp
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-emerald-100/30 rounded-lg border border-dashed border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-50" />
              <p className="text-emerald-800 font-medium">Nenhum contato agendado para hoje!</p>
              <p className="text-xs text-emerald-700/70">Mantenha sua carteira aquecida prospectando novos leads.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo de Relacionamento (Dashboard Relacionamento) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-600">{stats.inRisk}</span>
              <AlertTriangle className="w-5 h-5 text-red-500 opacity-20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Interação necessária imediata</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Média Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">{stats.avgScore}%</span>
              <Zap className="w-5 h-5 text-blue-500 opacity-20" />
            </div>
            <Progress value={stats.avgScore} className="h-1.5 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Contatos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">{stats.totalContacts}</span>
              <UsersRound className="w-5 h-5 text-green-500 opacity-20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Base total cadastrada</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio s/ Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-700">14 dias</span>
              <Clock className="w-5 h-5 text-slate-500 opacity-20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Meta: abaixo de 30 dias</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gestão de Carteira e Clientes */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-sm border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestão de Relacionamento</CardTitle>
                  <CardDescription>Acompanhe a saúde da sua carteira de clientes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar cliente..." 
                      className="pl-8 h-9 w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button size="sm" className="h-9">
                    <Plus className="w-4 h-4 mr-2" /> Novo Registro
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Próx. Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.slice(0, 10).map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900">{contact.full_name}</span>
                            <div className="flex gap-1">
                              {getProfileLabel(null)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-muted-foreground space-y-0.5">
                            <div className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> {contact.responsible_name || 'N/A'}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getScoreColor(contact.satisfaction_score)}`} />
                            <span className="font-semibold">{contact.satisfaction_score || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {contact.next_contact_date ? format(parseISO(contact.next_contact_date), "dd MMM", { locale: ptBR }) : 'Não agendado'}
                        </TableCell>
                        <TableCell>
                           {contact.is_client ? (
                             <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Ativo</Badge>
                           ) : (
                             <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none">Lead</Badge>
                           )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><MessageSquare className="w-4 h-4 mr-2" /> Nova Interação</DropdownMenuItem>
                              <DropdownMenuItem><UserPlus className="w-4 h-4 mr-2" /> Trocar Responsável</DropdownMenuItem>
                              <DropdownMenuItem><History className="w-4 h-4 mr-2" /> Ver Timeline</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        Nenhum cliente encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Timeline e Alertas Laterais */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { type: 'whatsapp', text: 'Sincronização com Google Drive concluída', time: 'Agora', user: 'SISTEMA' },
                { type: 'whatsapp', text: 'WhatsApp enviado para cliente', time: '10 min atrás', user: 'Ana J.' },
                { type: 'call', text: 'Ligação realizada', time: '2h atrás', user: 'Carlos M.' }
              ].map((activity, i) => (
                <div key={i} className="flex gap-3 border-l-2 border-slate-100 pl-4 pb-2 relative">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white border-2 border-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.text}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <span className="text-[10px] bg-slate-100 px-1.5 rounded text-slate-500 uppercase">{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-primary" size="sm">
                Ver Histórico Completo
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Alertas Automáticos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-xs font-bold text-red-800 uppercase">Risco de Evasão</p>
                <p className="text-sm text-red-900 mt-1 font-medium">Existem {stats.inRisk} clientes com baixo score de satisfação.</p>
                <Button size="sm" className="w-full mt-2 bg-red-600 hover:bg-red-700 text-xs h-7">Ver Detalhes</Button>
              </div>
              
              <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                <p className="text-xs font-bold text-orange-800 uppercase">Próximos Agendamentos</p>
                <p className="text-sm text-orange-900 mt-1 font-medium">Você tem {scheduledToday.length} contatos pendentes para hoje.</p>
                <Button variant="outline" size="sm" className="w-full mt-2 border-orange-200 text-orange-700 hover:bg-orange-100 text-xs h-7">Ver Agenda</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RelationshipModule;
