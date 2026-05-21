import { useState } from "react";
import { 
  Search, 
  UserPlus, 
  Upload, 
  Phone, 
  Mail, 
  FileText, 
  MoreVertical,
  MessageCircle,
  CheckCircle2,
  Users,
  X,
  Plus,
  Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useContacts } from "@/hooks/queries/useContacts";
import { toast } from "sonner";

const INSURANCE_TYPES = [
  "Auto", "Vida", "Saúde", "Residencial", "Empresarial", "RC Profissional", "Previdência", "Consórcio"
];

const ContactsModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { contacts, isLoading, createContact, uploadDocument } = useContacts();
  
  // New contact form state
  const [newContact, setNewContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    cpf_cnpj: "",
    client_type: "cliente" as any,
    is_client: true,
    notes: ""
  });
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleCreateContact = async () => {
    if (!newContact.full_name) {
      toast.error("O nome completo é obrigatório");
      return;
    }
    
    try {
      await createContact.mutateAsync({
        ...newContact,
        insurances: selectedInsurances
      });
      setIsAddModalOpen(false);
      setNewContact({
        full_name: "",
        email: "",
        phone: "",
        cpf_cnpj: "",
        client_type: "cliente",
        is_client: true,
        notes: ""
      });
      setSelectedInsurances([]);
    } catch (e) {
      // toast handled in hook
    }
  };

  const handleFileUpload = async (contactId: string, e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadDocument.mutateAsync({ contactId, file, category });
    } catch (e) {
      toast.error("Erro ao enviar arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredContacts = contacts?.filter(contact => 
    contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone?.includes(searchTerm) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${cleanPhone}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar contatos..." 
            className="pl-9 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="w-4 h-4 mr-2" />
              Transferir/Adicionar Contato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Contato</DialogTitle>
              <DialogDescription>
                Cadastre informações do contato, seguros e anexe documentos.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name" 
                    value={newContact.full_name}
                    onChange={e => setNewContact({...newContact, full_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone (Celular)</Label>
                  <Input 
                    id="phone" 
                    placeholder="(11) 99999-9999"
                    value={newContact.phone}
                    onChange={e => setNewContact({...newContact, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={newContact.email}
                    onChange={e => setNewContact({...newContact, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF/CNPJ</Label>
                  <Input 
                    id="cpf" 
                    value={newContact.cpf_cnpj}
                    onChange={e => setNewContact({...newContact, cpf_cnpj: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Relacionamento</Label>
                  <Select 
                    value={newContact.client_type} 
                    onValueChange={(val) => setNewContact({...newContact, client_type: val as any, is_client: val === 'cliente'})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cliente">Cliente</SelectItem>
                      <SelectItem value="amigo">Amigo</SelectItem>
                      <SelectItem value="não cliente">Não Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox 
                    id="is_client" 
                    checked={newContact.is_client}
                    onCheckedChange={(checked) => setNewContact({...newContact, is_client: !!checked})}
                  />
                  <Label htmlFor="is_client">Já é cliente ativo?</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Seguros que possui</Label>
                <div className="grid grid-cols-3 gap-2">
                  {INSURANCE_TYPES.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`ins-${type}`}
                        checked={selectedInsurances.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedInsurances([...selectedInsurances, type]);
                          else setSelectedInsurances(selectedInsurances.filter(i => i !== type));
                        }}
                      />
                      <label htmlFor={`ins-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Input 
                  id="notes" 
                  value={newContact.notes}
                  onChange={e => setNewContact({...newContact, notes: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreateContact} disabled={createContact.isPending}>
                {createContact.isPending ? "Salvando..." : "Salvar Contato"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white shadow-sm border-slate-100">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Relacionamento</TableHead>
                <TableHead>Seguros</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">Carregando contatos...</TableCell>
                </TableRow>
              ) : filteredContacts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    Nenhum contato encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts?.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <div className="font-medium text-slate-900">{contact.full_name}</div>
                      <div className="text-xs text-muted-foreground">{contact.phone}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={contact.is_client ? "default" : "outline"} className={contact.is_client ? "bg-green-100 text-green-700 hover:bg-green-100 border-none" : ""}>
                        {contact.client_type || (contact.is_client ? "Cliente" : "Lead")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.contact_insurances?.map((ci: any, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 h-5">
                            {ci.insurance_type}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {contact.documents?.length || 0} docs
                        </span>
                        <div className="flex items-center gap-1">
                          <Label htmlFor={`file-${contact.id}`} className="cursor-pointer">
                            <div className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                              <Plus className="w-3.5 h-3.5 text-primary" />
                            </div>
                          </Label>
                          <Input 
                            id={`file-${contact.id}`} 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(contact.id, e, 'apólice')}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {contact.phone && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-green-600 hover:bg-green-50"
                            onClick={() => openWhatsApp(contact.phone!)}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsModule;
