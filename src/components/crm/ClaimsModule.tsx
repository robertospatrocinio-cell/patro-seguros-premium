import { useState } from "react";
import { 
  Plus, 
  Search, 
  AlertTriangle, 
  User, 
  Phone, 
  Calendar, 
  Clock,
  CheckCircle2,
  FileText,
  UserPlus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useClaims, Claim } from "@/hooks/queries/useClaims";
import { useContacts } from "@/hooks/queries/useContacts";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ClaimsModule = () => {
  const { claims, isLoading, createClaim, updateClaim } = useClaims();
  const { contacts } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const [formData, setFormData] = useState({
    client_id: "",
    description: "",
    claim_date: format(new Date(), "yyyy-MM-dd"),
    status: "Aberto",
    has_third_party: false,
    third_party_count: 0,
    third_party_name: "",
    third_party_phone: "",
    tracking_notes: "",
    claim_number: "",
    carrier: "",
    policy_number: "",
    location: "",
    workshop: "",
    notification_date: "",
    deductible_amount: 0
  });

  const filteredClaims = claims.filter(claim => 
    claim.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.contacts?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.third_party_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createClaim.mutateAsync(formData);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClaim) {
      await updateClaim.mutateAsync({ id: selectedClaim.id, ...formData });
      setSelectedClaim(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      client_id: "",
      description: "",
      claim_date: format(new Date(), "yyyy-MM-dd"),
      status: "Aberto",
      has_third_party: false,
      third_party_count: 0,
      third_party_name: "",
      third_party_phone: "",
      tracking_notes: "",
      claim_number: "",
      carrier: "",
      policy_number: "",
      location: "",
      workshop: "",
      notification_date: "",
      deductible_amount: 0
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberto": return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Aberto</Badge>;
      case "Em Análise": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Em Análise</Badge>;
      case "Concluído": return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Concluído</Badge>;
      case "Cancelado": return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelado</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por cliente, descrição ou terceiro..." 
            className="pl-9 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Novo Sinistro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Novo Sinistro</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cliente Envolvido</Label>
                  <Select onValueChange={(val) => setFormData({...formData, client_id: val})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.filter(c => c.is_client).map(contact => (
                        <SelectItem key={contact.id} value={contact.id}>{contact.full_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data do Sinistro</Label>
                  <Input 
                    type="date" 
                    value={formData.claim_date} 
                    onChange={(e) => setFormData({...formData, claim_date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição do Ocorrido</Label>
                <Input 
                  placeholder="Ex: Colisão traseira, Danos elétricos..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Checkbox 
                  id="has_third_party" 
                  checked={formData.has_third_party}
                  onCheckedChange={(checked) => setFormData({...formData, has_third_party: !!checked})}
                />
                <Label htmlFor="has_third_party" className="cursor-pointer font-medium">Houve terceiros envolvidos?</Label>
              </div>

              {formData.has_third_party && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-blue-50/30 border-blue-100 animate-in fade-in zoom-in duration-200">
                  <div className="space-y-2">
                    <Label>Quantidade de Terceiros</Label>
                    <Input 
                      type="number" 
                      min="0"
                      value={formData.third_party_count}
                      onChange={(e) => setFormData({...formData, third_party_count: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Nome do Terceiro (Principal)</Label>
                    <Input 
                      placeholder="Nome completo"
                      value={formData.third_party_name}
                      onChange={(e) => setFormData({...formData, third_party_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label>Telefone do Terceiro</Label>
                    <Input 
                      placeholder="(00) 00000-0000"
                      value={formData.third_party_phone}
                      onChange={(e) => setFormData({...formData, third_party_phone: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número do Sinistro (Processo)</Label>
                  <Input 
                    placeholder="Ex: 2024000123" 
                    value={formData.claim_number}
                    onChange={(e) => setFormData({...formData, claim_number: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Seguradora</Label>
                  <Input 
                    placeholder="Nome da Seguradora" 
                    value={formData.carrier}
                    onChange={(e) => setFormData({...formData, carrier: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número da Apólice</Label>
                  <Input 
                    placeholder="Ex: 01.02.000345" 
                    value={formData.policy_number}
                    onChange={(e) => setFormData({...formData, policy_number: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data de Aviso</Label>
                  <Input 
                    type="date" 
                    value={formData.notification_date} 
                    onChange={(e) => setFormData({...formData, notification_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Local do Ocorrido</Label>
                  <Input 
                    placeholder="Rua, Cidade, Estado..." 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Oficina / Local de Reparo</Label>
                  <Input 
                    placeholder="Nome da oficina ou local" 
                    value={formData.workshop}
                    onChange={(e) => setFormData({...formData, workshop: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor da Franquia (R$)</Label>
                  <Input 
                    type="number" 
                    placeholder="0,00" 
                    value={formData.deductible_amount}
                    onChange={(e) => setFormData({...formData, deductible_amount: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Acompanhamento na Seguradora / Notas de Rastreio</Label>
                <textarea 
                  className="w-full min-h-[100px] p-3 text-sm rounded-md border border-input bg-background"
                  placeholder="Status detalhado, pendências, documentos solicitados..."
                  value={formData.tracking_notes}
                  onChange={(e) => setFormData({...formData, tracking_notes: e.target.value})}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
                <Button type="submit">Salvar Sinistro</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white shadow-sm border-slate-100">
        <CardHeader className="pb-3 border-b border-slate-50">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Lista de Sinistros Registrados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terceiros</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Carregando sinistros...</TableCell>
                </TableRow>
              ) : filteredClaims.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum sinistro encontrado.</TableCell>
                </TableRow>
              ) : (
                filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">
                      {format(new Date(claim.claim_date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{claim.contacts?.full_name}</span>
                        <span className="text-xs text-muted-foreground">{claim.carrier || "Seguradora não inf."}</span>
                        <span className="text-[10px] text-muted-foreground">Proc: {claim.claim_number || "S/N"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {claim.description}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(claim.status)}
                    </TableCell>
                    <TableCell>
                      {claim.has_third_party ? (
                        <div className="flex items-center gap-1 text-xs">
                          <Badge variant="secondary" className="font-normal">{claim.third_party_count} envolvidos</Badge>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Nenhum</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedClaim(claim);
                          setFormData({
                            client_id: claim.client_id,
                            description: claim.description,
                            claim_date: claim.claim_date,
                            status: claim.status,
                            has_third_party: claim.has_third_party,
                            third_party_count: claim.third_party_count,
                            third_party_name: claim.third_party_name || "",
                            third_party_phone: claim.third_party_phone || "",
                            tracking_notes: claim.tracking_notes || "",
                            claim_number: claim.claim_number || "",
                            carrier: claim.carrier || "",
                            policy_number: claim.policy_number || "",
                            location: claim.location || "",
                            workshop: claim.workshop || "",
                            notification_date: claim.notification_date || "",
                            deductible_amount: claim.deductible_amount || 0
                          });
                        }}
                      >
                        Visualizar / Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!selectedClaim} onOpenChange={(open) => !open && setSelectedClaim(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes e Acompanhamento do Sinistro</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status na Seguradora</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(val) => setFormData({...formData, status: val})}
                >
                  <SelectTrigger className="bg-slate-50 border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aberto">Aberto</SelectItem>
                    <SelectItem value="Em Análise">Em Análise</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data do Ocorrido</Label>
                <Input 
                  type="date" 
                  value={formData.claim_date} 
                  onChange={(e) => setFormData({...formData, claim_date: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número do Sinistro (Processo)</Label>
                <Input 
                  value={formData.claim_number}
                  onChange={(e) => setFormData({...formData, claim_number: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Seguradora</Label>
                <Input 
                  value={formData.carrier}
                  onChange={(e) => setFormData({...formData, carrier: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número da Apólice</Label>
                <Input 
                  value={formData.policy_number}
                  onChange={(e) => setFormData({...formData, policy_number: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Data de Aviso</Label>
                <Input 
                  type="date" 
                  value={formData.notification_date} 
                  onChange={(e) => setFormData({...formData, notification_date: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Local do Ocorrido</Label>
                <Input 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Oficina / Local de Reparo</Label>
                <Input 
                  value={formData.workshop}
                  onChange={(e) => setFormData({...formData, workshop: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Valor da Franquia</Label>
                <Input 
                  type="number"
                  value={formData.deductible_amount}
                  onChange={(e) => setFormData({...formData, deductible_amount: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="p-4 border rounded-lg bg-slate-50 space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Dados de Terceiros
              </h3>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit_has_third_party" 
                  checked={formData.has_third_party}
                  onCheckedChange={(checked) => setFormData({...formData, has_third_party: !!checked})}
                />
                <Label htmlFor="edit_has_third_party">Possui Terceiros</Label>
              </div>

              {formData.has_third_party && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                   <div className="space-y-2">
                    <Label>Nome do Terceiro</Label>
                    <Input 
                      value={formData.third_party_name}
                      onChange={(e) => setFormData({...formData, third_party_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input 
                      value={formData.third_party_phone}
                      onChange={(e) => setFormData({...formData, third_party_phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantidade Envolvidos</Label>
                    <Input 
                      type="number"
                      value={formData.third_party_count}
                      onChange={(e) => setFormData({...formData, third_party_count: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Acompanhamento / Histórico de Interações</Label>
              <textarea 
                className="w-full min-h-[100px] p-3 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Anote aqui cada atualização feita com a seguradora ou cliente..."
                value={formData.tracking_notes}
                onChange={(e) => setFormData({...formData, tracking_notes: e.target.value})}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setSelectedClaim(null)}>Fechar</Button>
              <Button type="submit">Atualizar Sinistro</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClaimsModule;
