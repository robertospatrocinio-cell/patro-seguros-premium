import React, { useState } from "react";
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
  ExternalLink
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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const RelationshipModule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const customers = [
    { 
      id: "1", 
      name: "João Silva", 
      profile: "premium", 
      score: 95, 
      lastInteraction: "2024-05-15", 
      consultant: "Carlos M.",
      attendant: "Ana J.",
      status: "active"
    },
    { 
      id: "2", 
      name: "Maria Oliveira", 
      profile: "common", 
      score: 65, 
      lastInteraction: "2024-04-10", 
      consultant: "Carlos M.",
      attendant: "Bia R.",
      status: "warning"
    },
    { 
      id: "3", 
      name: "Empresa XPTO", 
      profile: "business", 
      score: 30, 
      lastInteraction: "2024-03-01", 
      consultant: "Roberto F.",
      attendant: "Ana J.",
      status: "risk"
    },
    { 
      id: "4", 
      name: "Pedro Souza", 
      profile: "high_risk", 
      score: 80, 
      lastInteraction: "2024-05-18", 
      consultant: "Carlos M.",
      attendant: "Bia R.",
      status: "active"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Ativo</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none">Atenção</Badge>;
      case 'risk': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Risco</Badge>;
      default: return null;
    }
  };

  const getProfileLabel = (profile: string) => {
    switch (profile) {
      case 'premium': return <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">Premium</Badge>;
      case 'business': return <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Empresarial</Badge>;
      case 'high_risk': return <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">Alto Risco</Badge>;
      default: return <Badge variant="outline">Comum</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 will-change-transform">
      {/* Google Drive Connection Info */}
      <Card className="bg-blue-50 border-blue-100 shadow-none border">
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Conexão com Google Drive Ativa
          </CardTitle>
          <CardDescription className="text-blue-700/80">
            As apólices estão sendo sincronizadas das pastas mensais. Você pode vincular os links diretamente aos documentos dos contatos.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resumo de Relacionamento (Dashboard Relacionamento) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-600">12</span>
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
              <span className="text-2xl font-bold text-blue-600">78%</span>
              <Zap className="w-5 h-5 text-blue-500 opacity-20" />
            </div>
            <Progress value={78} className="h-1.5 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interações / Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">342</span>
              <MessageSquare className="w-5 h-5 text-green-500 opacity-20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">+15% vs mês passado</p>
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
                    <TableHead>Responsáveis</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Últ. Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{customer.name}</span>
                          {getProfileLabel(customer.profile)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <div className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> {customer.consultant}</div>
                          <div className="flex items-center gap-1"><UsersRound className="w-3 h-3" /> {customer.attendant}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getScoreColor(customer.score)}`} />
                          <span className="font-semibold">{customer.score}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(customer.lastInteraction), "dd MMM", { locale: ptBR })}
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
                  ))}
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
                { type: 'whatsapp', text: 'WhatsApp enviado para João Silva', time: '10 min atrás', user: 'Ana J.' },
                { type: 'call', text: 'Ligação realizada: Empresa XPTO', time: '2h atrás', user: 'Carlos M.' },
                { type: 'meeting', text: 'Reunião agendada com Pedro Souza', time: 'Amanhã 14h', user: 'Carlos M.' }
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
                <p className="text-sm text-red-900 mt-1 font-medium">Empresa XPTO está há 82 dias sem qualquer interação.</p>
                <Button size="sm" className="w-full mt-2 bg-red-600 hover:bg-red-700 text-xs h-7">Agendar Contato</Button>
              </div>
              
              <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                <p className="text-xs font-bold text-orange-800 uppercase">Renovação Próxima</p>
                <p className="text-sm text-orange-900 mt-1 font-medium">João Silva (Auto) vence em 15 dias. Iniciar negociação.</p>
                <Button variant="outline" size="sm" className="w-full mt-2 border-orange-200 text-orange-700 hover:bg-orange-100 text-xs h-7">Ver Detalhes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RelationshipModule;
