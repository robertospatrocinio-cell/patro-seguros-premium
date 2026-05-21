import { useState, useEffect } from "react";
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
  Paperclip,
  User,
  Calendar,
  Baby,
  Car,
  Bike,
  HeartPulse,
  Home,
  Briefcase,
  ShieldAlert,
  Bell,
  Clock
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
import { Separator } from "@/components/ui/separator";

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
    birth_date: "",
    client_type: "cliente" as any,
    is_client: true,
    notes: "",
    marital_status: "Solteiro",
    partner_name: "",
    partner_birthday: "",
    has_children: false,
    children_count: 0,
    children_data: [] as { name: string, birthday: string }[],
    car_count: 0,
    has_motorcycle: false,
    has_life_insurance: false,
    life_insurance_carrier: "",
    life_insurance_renewal: "",
    has_home_insurance: false,
    home_insurance_carrier: "",
    home_insurance_renewal: "",
    health_plan_type: "",
    health_insurance_carrier: "",
    health_insurance_renewal: "",
    has_business_insurance: false,
    business_insurance_carrier: "",
    business_insurance_renewal: "",
    has_other_insurance: false,
    other_insurance_carrier: "",
    other_insurance_renewal: "",
    last_contact_date: "",
    next_contact_date: "",
    profession: "",
    income_bracket: "",
    home_ownership: "Própria",
    lead_source: "",
    referral_contact_id: "",
    salesperson_name: "",
    partner_source_name: "",
    satisfaction_score: 10,
    last_interaction_type: "WhatsApp"
  });
  
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Sync children_data when children_count changes
  useEffect(() => {
    const count = Number(newContact.children_count) || 0;
    setNewContact(prev => {
      const currentData = [...prev.children_data];
      if (currentData.length < count) {
        for (let i = currentData.length; i < count; i++) {
          currentData.push({ name: "", birthday: "" });
        }
      } else if (currentData.length > count) {
        currentData.splice(count);
      }
      return { ...prev, children_data: currentData };
    });
  }, [newContact.children_count]);

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
        birth_date: "",
        client_type: "cliente",
        is_client: true,
        notes: "",
        marital_status: "Solteiro",
        partner_name: "",
        partner_birthday: "",
        has_children: false,
        children_count: 0,
        children_data: [],
        car_count: 0,
        has_motorcycle: false,
        has_life_insurance: false,
        life_insurance_carrier: "",
        life_insurance_renewal: "",
        has_home_insurance: false,
        home_insurance_carrier: "",
        home_insurance_renewal: "",
        health_plan_type: "",
        health_insurance_carrier: "",
        health_insurance_renewal: "",
        has_business_insurance: false,
        business_insurance_carrier: "",
        business_insurance_renewal: "",
        has_other_insurance: false,
        other_insurance_carrier: "",
        other_insurance_renewal: "",
        last_contact_date: "",
        next_contact_date: "",
        profession: "",
        income_bracket: "",
        home_ownership: "Própria",
        lead_source: "",
        referral_contact_id: "",
        salesperson_name: "",
        partner_source_name: "",
        satisfaction_score: 10,
        last_interaction_type: "WhatsApp"
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

  const getContactAlert = (nextDate: string | null) => {
    if (!nextDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const alertDate = new Date(nextDate);
    alertDate.setHours(0, 0, 0, 0);

    if (alertDate <= today) {
      return { 
        color: "text-red-600 bg-red-50 border-red-100", 
        label: "Entrar em contato HOJE" 
      };
    }
    return null;
  };

  const calculateNextContactDate = (lastDate: string, days: number) => {
    if (!lastDate) return "";
    const date = new Date(lastDate);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
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
                  <Label htmlFor="birth_date">Data de Nascimento</Label>
                  <Input 
                    id="birth_date" 
                    type="date"
                    value={newContact.birth_date}
                    onChange={e => setNewContact({...newContact, birth_date: e.target.value})}
                  />
                </div>
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
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_client" 
                  checked={newContact.is_client}
                  onCheckedChange={(checked) => setNewContact({...newContact, is_client: !!checked})}
                />
                <Label htmlFor="is_client">Já é cliente ativo?</Label>
              </div>

              <Separator className="my-2" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Estado Civil</Label>
                  <Select 
                    value={newContact.marital_status} 
                    onValueChange={(val) => setNewContact({...newContact, marital_status: val})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Solteiro">Solteiro</SelectItem>
                      <SelectItem value="Casado">Casado</SelectItem>
                      <SelectItem value="Divorciado">Divorciado</SelectItem>
                      <SelectItem value="Viúvo">Viúvo</SelectItem>
                      <SelectItem value="União Estável">União Estável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newContact.marital_status === "Casado" && (
                  <div className="space-y-2">
                    <Label>Nome do Cônjuge</Label>
                    <Input 
                      placeholder="Nome completo"
                      value={newContact.partner_name}
                      onChange={e => setNewContact({...newContact, partner_name: e.target.value})}
                    />
                  </div>
                )}
                {newContact.marital_status === "Casado" && (
                  <div className="space-y-2">
                    <Label>Data Nasc. Cônjuge</Label>
                    <Input 
                      type="date"
                      value={newContact.partner_birthday}
                      onChange={e => setNewContact({...newContact, partner_birthday: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="has_children" 
                    checked={newContact.has_children}
                    onCheckedChange={(checked) => setNewContact({...newContact, has_children: !!checked, children_count: checked ? newContact.children_count : 0})}
                  />
                  <Label htmlFor="has_children">Tem filhos?</Label>
                </div>

                {newContact.has_children && (
                  <div className="space-y-4 pl-6 border-l-2 border-slate-100">
                    <div className="space-y-2">
                      <Label>Quantidade de Filhos</Label>
                      <Input 
                        type="number" 
                        min="0"
                        value={newContact.children_count}
                        onChange={e => setNewContact({...newContact, children_count: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    
                    {newContact.children_data.map((child, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg">
                        <div className="space-y-2">
                          <Label className="text-xs">Nome do Filho {index + 1}</Label>
                          <Input 
                            placeholder="Nome"
                            value={child.name}
                            onChange={e => {
                              const newData = [...newContact.children_data];
                              newData[index].name = e.target.value;
                              setNewContact({...newContact, children_data: newData});
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Data de Nascimento</Label>
                          <Input 
                            type="date"
                            value={child.birthday}
                            onChange={e => {
                              const newData = [...newContact.children_data];
                              newData[index].birthday = e.target.value;
                              setNewContact({...newContact, children_data: newData});
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="my-2" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profissão</Label>
                  <Input 
                    id="profession" 
                    placeholder="Ex: Advogado, Médico..."
                    value={newContact.profession}
                    onChange={e => setNewContact({...newContact, profession: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Renda Estimada</Label>
                  <Select 
                    value={newContact.income_bracket} 
                    onValueChange={(val) => setNewContact({...newContact, income_bracket: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a faixa..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Até 5k">Até R$ 5.000</SelectItem>
                      <SelectItem value="5k-10k">R$ 5.000 - R$ 10.000</SelectItem>
                      <SelectItem value="10k-20k">R$ 10.000 - R$ 20.000</SelectItem>
                      <SelectItem value="Acima 20k">Acima de R$ 20.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Imóvel</Label>
                  <Select 
                    value={newContact.home_ownership} 
                    onValueChange={(val) => setNewContact({...newContact, home_ownership: val})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Própria">Própria</SelectItem>
                      <SelectItem value="Alugada">Alugada</SelectItem>
                      <SelectItem value="Financiada">Financiada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Origem do Lead</Label>
                  <Select 
                    value={newContact.lead_source} 
                    onValueChange={(val) => setNewContact({
                      ...newContact, 
                      lead_source: val,
                      referral_contact_id: val === 'Indicação' ? newContact.referral_contact_id : "",
                      salesperson_name: val === 'Vendedor' ? newContact.salesperson_name : "",
                      partner_source_name: val === 'Parceiro' ? newContact.partner_source_name : ""
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Como nos conheceu?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Site">Site</SelectItem>
                      <SelectItem value="Indicação">Indicação</SelectItem>
                      <SelectItem value="Vendedor">Vendedor</SelectItem>
                      <SelectItem value="Parceiro">Parceiro</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newContact.lead_source === "Indicação" && (
                <div className="space-y-2">
                  <Label>Quem indicou?</Label>
                  <Select 
                    value={newContact.referral_contact_id} 
                    onValueChange={(val) => setNewContact({...newContact, referral_contact_id: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o contato..." />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts && contacts.length > 0 ? (
                        contacts.map(contact => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.full_name} {contact.phone ? `(${contact.phone})` : ""}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Nenhum contato cadastrado
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {newContact.lead_source === "Vendedor" && (
                <div className="space-y-2">
                  <Label>Nome do Vendedor</Label>
                  <Input 
                    placeholder="Nome do vendedor"
                    value={newContact.salesperson_name}
                    onChange={e => setNewContact({...newContact, salesperson_name: e.target.value})}
                  />
                </div>
              )}

              {newContact.lead_source === "Parceiro" && (
                <div className="space-y-2">
                  <Label>Nome do Parceiro</Label>
                  <Input 
                    placeholder="Nome do parceiro"
                    value={newContact.partner_source_name}
                    onChange={e => setNewContact({...newContact, partner_source_name: e.target.value})}
                  />
                </div>
              )}

              <Separator className="my-2" />


              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Quantos carros na casa?</Label>
                  <Input 
                    type="number" 
                    min="0"
                    value={newContact.car_count}
                    onChange={e => setNewContact({...newContact, car_count: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox 
                    id="has_motorcycle" 
                    checked={newContact.has_motorcycle}
                    onCheckedChange={(checked) => setNewContact({...newContact, has_motorcycle: !!checked})}
                  />
                  <Label htmlFor="has_motorcycle">Tem moto?</Label>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Outros Seguros/Planos</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has_life" 
                        checked={newContact.has_life_insurance}
                        onCheckedChange={(checked) => setNewContact({...newContact, has_life_insurance: !!checked})}
                      />
                      <Label htmlFor="has_life" className="text-sm">Seguro de Vida</Label>
                    </div>
                    {newContact.has_life_insurance && (
                      <div className="grid grid-cols-2 gap-2 pl-6">
                        <Input 
                          placeholder="Seguradora"
                          className="h-8 text-xs"
                          value={newContact.life_insurance_carrier}
                          onChange={e => setNewContact({...newContact, life_insurance_carrier: e.target.value})}
                        />
                        <Input 
                          type="date"
                          className="h-8 text-xs"
                          value={newContact.life_insurance_renewal}
                          onChange={e => setNewContact({...newContact, life_insurance_renewal: e.target.value})}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has_home" 
                        checked={newContact.has_home_insurance}
                        onCheckedChange={(checked) => setNewContact({...newContact, has_home_insurance: !!checked})}
                      />
                      <Label htmlFor="has_home" className="text-sm">Seguro Residencial</Label>
                    </div>
                    {newContact.has_home_insurance && (
                      <div className="grid grid-cols-2 gap-2 pl-6">
                        <Input 
                          placeholder="Seguradora"
                          className="h-8 text-xs"
                          value={newContact.home_insurance_carrier}
                          onChange={e => setNewContact({...newContact, home_insurance_carrier: e.target.value})}
                        />
                        <Input 
                          type="date"
                          className="h-8 text-xs"
                          value={newContact.home_insurance_renewal}
                          onChange={e => setNewContact({...newContact, home_insurance_renewal: e.target.value})}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has_business" 
                        checked={newContact.has_business_insurance}
                        onCheckedChange={(checked) => setNewContact({...newContact, has_business_insurance: !!checked})}
                      />
                      <Label htmlFor="has_business" className="text-sm">Seguro Empresarial</Label>
                    </div>
                    {newContact.has_business_insurance && (
                      <div className="grid grid-cols-2 gap-2 pl-6">
                        <Input 
                          placeholder="Seguradora"
                          className="h-8 text-xs"
                          value={newContact.business_insurance_carrier}
                          onChange={e => setNewContact({...newContact, business_insurance_carrier: e.target.value})}
                        />
                        <Input 
                          type="date"
                          className="h-8 text-xs"
                          value={newContact.business_insurance_renewal}
                          onChange={e => setNewContact({...newContact, business_insurance_renewal: e.target.value})}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has_other" 
                        checked={newContact.has_other_insurance}
                        onCheckedChange={(checked) => setNewContact({...newContact, has_other_insurance: !!checked})}
                      />
                      <Label htmlFor="has_other" className="text-sm">Outros</Label>
                    </div>
                    {newContact.has_other_insurance && (
                      <div className="grid grid-cols-2 gap-2 pl-6">
                        <Input 
                          placeholder="Seguradora"
                          className="h-8 text-xs"
                          value={newContact.other_insurance_carrier}
                          onChange={e => setNewContact({...newContact, other_insurance_carrier: e.target.value})}
                        />
                        <Input 
                          type="date"
                          className="h-8 text-xs"
                          value={newContact.other_insurance_renewal}
                          onChange={e => setNewContact({...newContact, other_insurance_renewal: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Plano de Saúde (Se tiver)</Label>
                  <Input 
                    placeholder="Ex: Bradesco, SulAmérica..."
                    value={newContact.health_plan_type}
                    onChange={e => setNewContact({...newContact, health_plan_type: e.target.value})}
                  />
                  {newContact.health_plan_type && (
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Seguradora/Operadora"
                        className="h-8 text-xs"
                        value={newContact.health_insurance_carrier}
                        onChange={e => setNewContact({...newContact, health_insurance_carrier: e.target.value})}
                      />
                      <Input 
                        type="date"
                        className="h-8 text-xs"
                        value={newContact.health_insurance_renewal}
                        onChange={e => setNewContact({...newContact, health_insurance_renewal: e.target.value})}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-2" />

              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="space-y-2">
                  <Label>Último Contato Realizado</Label>
                  <Input 
                    type="date"
                    value={newContact.last_contact_date}
                    onChange={e => {
                      const lastDate = e.target.value;
                      setNewContact({
                        ...newContact, 
                        last_contact_date: lastDate,
                        // Reset next date if last contact changes
                        next_contact_date: ""
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Próximo contato em:</Label>
                  <Select 
                    onValueChange={(val) => {
                      if (!newContact.last_contact_date) {
                        toast.error("Preencha a data do último contato primeiro");
                        return;
                      }
                      const nextDate = calculateNextContactDate(newContact.last_contact_date, parseInt(val));
                      setNewContact({...newContact, next_contact_date: nextDate});
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolher intervalo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="10">10 dias</SelectItem>
                      <SelectItem value="15">15 dias</SelectItem>
                      <SelectItem value="20">20 dias</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="60">60 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newContact.next_contact_date && (
                  <div className="col-span-2 text-sm text-primary font-medium flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Alerta agendado para: {new Date(newContact.next_contact_date).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </div>

              <Separator className="my-2" />

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
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-slate-900">{contact.full_name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {contact.phone}
                        </div>
                        {contact.last_contact_date && (
                          <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 
                            Último contato: {new Date(contact.last_contact_date).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                        {getContactAlert(contact.next_contact_date) && (
                          <div className={`text-[10px] mt-1 px-2 py-0.5 rounded-full border w-fit flex items-center gap-1 font-semibold ${getContactAlert(contact.next_contact_date)?.color}`}>
                            <Bell className="w-3 h-3" />
                            {getContactAlert(contact.next_contact_date)?.label}
                          </div>
                        )}
                      </div>
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
