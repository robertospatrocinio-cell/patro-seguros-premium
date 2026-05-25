import { useState, useEffect, useRef } from "react";
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
  History as HistoryIcon,
  Calendar,
  Baby,
  Car,
  Bike,
  HeartPulse,
  Home,
  Briefcase,
  ShieldAlert,
  Bell,
  Clock,
  ExternalLink,
  Download,
  Filter,
  Pencil,
  RefreshCw,
  Smartphone,
  FileSpreadsheet
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useContacts } from "@/hooks/queries/useContacts";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import * as XLSX from "xlsx";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatContactDate, parseContactDate } from "@/lib/crmDates";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { parseCSV, parseExcel, parseVCF, ImportedContact, deduplicateContacts } from "@/lib/contactImport";
import ContactInteractionDialog from "./ContactInteractionDialog";



const INSURANCE_TYPES = [
  "Auto", "Vida", "Saúde", "Residencial", "Empresarial", "RC Profissional", "Previdência", "Consórcio"
];

const INITIAL_CONTACT_STATE = {
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
  property_type: "",
  lead_source: "",
  referral_contact_id: "",
  salesperson_name: "",
  partner_source_name: "",
  satisfaction_score: 5,
  last_interaction_type: "WhatsApp",
  has_consortium: false,
  consortium_type: "Auto",
  consortium_carrier: "",
  consortium_renewal: "",
  responsible_name: ""
};

const ContactsModule = ({ initialEditContact }: { initialEditContact?: any }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const vcfInputRef = useRef<HTMLInputElement>(null);
  const [selectedContactForHistory, setSelectedContactForHistory] = useState<any>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  useEffect(() => {
    if (initialEditContact) {
      handleEditClick(initialEditContact);
    }
  }, [initialEditContact]);
  const [importProgress, setImportProgress] = useState<{ current: number; total: number } | null>(null);
  const [importPreview, setImportPreview] = useState<{ contacts: ImportedContact[], type: 'excel' | 'vcf', duplicates: number } | null>(null);
  const abortImportRef = useRef(false);
  
  const handleOpenHistory = (contact: any) => {
    setSelectedContactForHistory(contact);
    setIsHistoryOpen(true);
  };

  
  // Export filters
  const [exportFilters, setExportFilters] = useState({
    startDate: "",
    endDate: "",
    insuranceType: "all",
    carrier: ""
  });

  const { contacts, isLoading, createContact, updateContact, uploadDocument, forceRefetch, isRefetching } = useContacts();

  
  // New contact form state
  const [newContact, setNewContact] = useState(INITIAL_CONTACT_STATE);
  
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

  const handleSaveContact = async () => {
    if (!newContact.full_name) {
      toast.error("O nome completo é obrigatório");
      return;
    }
    
    try {
      const dateFields = [
        'birth_date','partner_birthday','last_contact_date','next_contact_date',
        'life_insurance_renewal','home_insurance_renewal','health_insurance_renewal',
        'business_insurance_renewal','other_insurance_renewal','consortium_renewal'
      ];
      const sanitized: any = { ...newContact };
      for (const f of dateFields) {
        if (sanitized[f] === "" || sanitized[f] === undefined) sanitized[f] = null;
      }

      if (editingContactId) {
        await updateContact.mutateAsync({
          ...sanitized,
          id: editingContactId,
          insurances: selectedInsurances
        });
      } else {
        await createContact.mutateAsync({
          ...sanitized,
          insurances: selectedInsurances
        });
      }

      setIsAddModalOpen(false);
      setEditingContactId(null);
      setNewContact(INITIAL_CONTACT_STATE);
      setSelectedInsurances([]);
    } catch (e) {
      // toast handled in hook
    }
  };

  const handleEditClick = (contact: any) => {
    setEditingContactId(contact.id);
    
    // Fill the form with contact data
    const contactData = { ...INITIAL_CONTACT_STATE };
    Object.keys(INITIAL_CONTACT_STATE).forEach(key => {
      if (contact[key] !== undefined && contact[key] !== null) {
        // @ts-ignore
        contactData[key] = contact[key];
      }
    });
    
    setNewContact(contactData);
    
    // Set selected insurances
    if (contact.contact_insurances) {
      setSelectedInsurances(contact.contact_insurances.map((ci: any) => ci.insurance_type));
    } else {
      setSelectedInsurances([]);
    }
    
    setIsAddModalOpen(true);
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

  const handleExportExcel = () => {
    if (!contacts || contacts.length === 0) {
      toast.error("Nenhum dado para exportar");
      return;
    }

    setIsExporting(true);
    try {
      // Apply export filters
      let filteredData = [...contacts];

      if (exportFilters.startDate) {
        const start = new Date(exportFilters.startDate);
        filteredData = filteredData.filter(c => new Date(c.created_at) >= start);
      }
      if (exportFilters.endDate) {
        const end = new Date(exportFilters.endDate);
        end.setHours(23, 59, 59, 999);
        filteredData = filteredData.filter(c => new Date(c.created_at) <= end);
      }
      
      if (exportFilters.insuranceType !== "all") {
        const type = exportFilters.insuranceType.toLowerCase();
        filteredData = filteredData.filter(c => {
          if (type === "auto") return c.car_count > 0 || c.has_motorcycle;
          if (type === "vida") return c.has_life_insurance;
          if (type === "residencial") return c.has_home_insurance;
          if (type === "saúde") return c.health_plan_type || c.health_insurance_carrier;
          if (type === "empresarial") return c.has_business_insurance;
          if (type === "consórcio") return c.has_consortium;
          return false;
        });
      }

      if (exportFilters.carrier) {
        const carrier = exportFilters.carrier.toLowerCase();
        filteredData = filteredData.filter(c => 
          (c.life_insurance_carrier?.toLowerCase().includes(carrier)) ||
          (c.home_insurance_carrier?.toLowerCase().includes(carrier)) ||
          (c.health_insurance_carrier?.toLowerCase().includes(carrier)) ||
          (c.business_insurance_carrier?.toLowerCase().includes(carrier)) ||
          (c.other_insurance_carrier?.toLowerCase().includes(carrier)) ||
          (c.consortium_carrier?.toLowerCase().includes(carrier))
        );
      }

      if (filteredData.length === 0) {
        toast.error("Nenhum contato encontrado com os filtros selecionados");
        setIsExporting(false);
        return;
      }

      // Map to export format
      const exportRows = filteredData.map(c => ({
        "Nome Completo": c.full_name,
        "Email": c.email || "",
        "Telefone": c.phone || "",
        "CPF/CNPJ": c.cpf_cnpj || "",
        "Data Nascimento": c.birth_date || "",
        "Tipo": c.client_type,
        "É Cliente": c.is_client ? "Sim" : "Não",
        "Profissão": c.profession || "",
        "Renda": c.income_bracket || "",
        "Origem": c.lead_source || "",
        "Satisfação": c.satisfaction_score || "",
        "Data Cadastro": new Date(c.created_at).toLocaleDateString('pt-BR'),
        "Seguro Vida": c.has_life_insurance ? `Sim (${c.life_insurance_carrier || "N/A"})` : "Não",
        "Seguro Residencial": c.has_home_insurance ? `Sim (${c.home_insurance_carrier || "N/A"})` : "Não",
        "Plano Saúde": c.health_plan_type ? `Sim (${c.health_insurance_carrier || "N/A"})` : "Não",
        "Seguro Empresarial": c.has_business_insurance ? `Sim (${c.business_insurance_carrier || "N/A"})` : "Não",
        "Consórcio": c.has_consortium ? `Sim (${c.consortium_type} - ${c.consortium_carrier || "N/A"})` : "Não",
        "Responsável": c.responsible_name || "",
        "Notas": c.notes || ""
      }));

      const ws = XLSX.utils.json_to_sheet(exportRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contatos CRM");
      XLSX.writeFile(wb, `crm_contatos_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast.success("Exportação concluída com sucesso!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Erro ao exportar banco de dados");
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'excel' | 'vcf') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const loadingToastId = "import-parse-toast";
    toast.loading(`Lendo arquivo...`, { id: loadingToastId });

    try {
      let rawImported: ImportedContact[] = [];
      if (type === 'excel') {
        if (file.name.endsWith('.csv')) {
          rawImported = await parseCSV(file);
        } else {
          rawImported = await parseExcel(file);
        }
      } else {
        rawImported = await parseVCF(file);
      }

      const { toImport: imported, duplicates } = deduplicateContacts(rawImported, contacts || []);

      if (imported.length === 0 && duplicates === 0) {
        toast.dismiss(loadingToastId);
        toast.error("Nenhum contato válido encontrado no arquivo.");
        setIsImporting(false);
        return;
      }

      toast.dismiss(loadingToastId);
      setImportPreview({ contacts: imported, type, duplicates });
    } catch (error: any) {
      console.error("Parse error:", error);
      toast.dismiss(loadingToastId);
      toast.error(error.message || "Erro ao ler arquivo.");
      setIsImporting(false);
    } finally {
      if (e.target) e.target.value = '';
    }
  };

  const processImport = async (imported: ImportedContact[], duplicates: number) => {
    setIsImporting(true);
    setImportPreview(null);
    abortImportRef.current = false;
    const loadingToastId = "import-loading-toast";
    toast.loading(`Iniciando importação...`, { id: loadingToastId });

    try {
      setImportProgress({ current: 0, total: imported.length });
      
      const BATCH_SIZE = 3; 
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < imported.length; i += BATCH_SIZE) {
        if (abortImportRef.current) {
          toast.dismiss(loadingToastId);
          toast.warning(`Importação cancelada. ${successCount} contatos importados.`);
          break;
        }

        const batch = imported.slice(i, i + BATCH_SIZE);
        
        await Promise.all(batch.map(async (contact) => {
          try {
            await createContact.mutateAsync({
              full_name: contact.full_name,
              email: contact.email || null,
              phone: contact.phone || null,
              birth_date: contact.birth_date || null,
              notes: contact.notes || "Importado",
              is_client: contact.is_client ?? false,
              client_type: "lead"
            });
            successCount++;
          } catch (err) {
            console.error("Error importing single contact:", err);
            errorCount++;
          }
        }));

        const currentProgress = Math.min(i + BATCH_SIZE, imported.length);
        setImportProgress({ current: currentProgress, total: imported.length });
        
        toast.loading(
          <div className="flex flex-col gap-2">
            <span>Importando: {currentProgress} de {imported.length}</span>
            <Button 
              size="sm" 
              variant="destructive" 
              className="h-7 text-xs"
              onClick={() => { abortImportRef.current = true; }}
            >
              Cancelar
            </Button>
          </div>, 
          { id: loadingToastId }
        );
      }

      toast.dismiss(loadingToastId);
      
      if (!abortImportRef.current) {
        let finalMsg = `${successCount} contatos importados com sucesso!`;
        if (duplicates > 0) {
          finalMsg += ` (${duplicates} duplicados ignorados)`;
        }

        if (errorCount > 0) {
          toast.warning(`${successCount} importados, ${errorCount} falharam.${duplicates > 0 ? ` ${duplicates} duplicados ignorados.` : ""}`);
        } else {
          toast.success(finalMsg);
        }
      }
      forceRefetch();
    } catch (error: any) {
      console.error("Import error:", error);
      toast.dismiss(loadingToastId);
      const errorMessage = error.message || "Erro ao processar arquivo de importação.";
      toast.error(errorMessage, {
        duration: 5000
      });
    } finally {
      setIsImporting(false);
      setImportProgress(null);
    }
  };


  const getContactAlert = (nextDate: string | null) => {
    if (!nextDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const alertDate = parseContactDate(nextDate);
    if (!alertDate) return null;
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
    const date = parseContactDate(lastDate);
    if (!date) return "";
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
        
        <div className="flex flex-wrap gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => handleImportFile(e, 'excel')}
          />
          <input
            type="file"
            ref={vcfInputRef}
            className="hidden"
            accept=".vcf"
            onChange={(e) => handleImportFile(e, 'vcf')}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-slate-200" disabled={isImporting}>
                <Upload className="w-4 h-4 mr-2" />
                Importar Contatos
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Excel ou CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => vcfInputRef.current?.click()}>
                <Smartphone className="w-4 h-4 mr-2" />
                iPhone / Android (VCF)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            className="border-slate-200"
            onClick={() => forceRefetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
            Sincronizar Banco
          </Button>


          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-slate-200">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Exportação
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Exportar Banco de Dados</h4>
                  <p className="text-sm text-muted-foreground">
                    Filtre os dados antes de baixar o Excel.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">De:</Label>
                      <Input 
                        type="date" 
                        className="h-8 text-xs" 
                        value={exportFilters.startDate}
                        onChange={e => setExportFilters({...exportFilters, startDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Até:</Label>
                      <Input 
                        type="date" 
                        className="h-8 text-xs" 
                        value={exportFilters.endDate}
                        onChange={e => setExportFilters({...exportFilters, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Tipo de Seguro</Label>
                    <Select 
                      value={exportFilters.insuranceType}
                      onValueChange={val => setExportFilters({...exportFilters, insuranceType: val})}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="auto">Auto/Moto</SelectItem>
                        <SelectItem value="vida">Vida</SelectItem>
                        <SelectItem value="residencial">Residencial</SelectItem>
                        <SelectItem value="saúde">Saúde</SelectItem>
                        <SelectItem value="empresarial">Empresarial</SelectItem>
                        <SelectItem value="consórcio">Consórcio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Seguradora/Administradora</Label>
                    <Input 
                      placeholder="Nome da seguradora..." 
                      className="h-8 text-xs"
                      value={exportFilters.carrier}
                      onChange={e => setExportFilters({...exportFilters, carrier: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  onClick={handleExportExcel}
                  disabled={isExporting}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? "Exportando..." : "Baixar Excel"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog open={isAddModalOpen} onOpenChange={(open) => {
            setIsAddModalOpen(open);
            if (!open) {
              setEditingContactId(null);
              setNewContact(INITIAL_CONTACT_STATE);
              setSelectedInsurances([]);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Transferir/Adicionar Contato
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingContactId ? "Editar Contato" : "Novo Contato"}</DialogTitle>
                <DialogDescription>
                  {editingContactId ? "Atualize as informações do contato." : "Cadastre informações do contato, seguros e anexe documentos."}
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
                    value={(newContact as any).property_type || ""} 
                    onValueChange={(val) => setNewContact({...newContact, property_type: val} as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartamento">Apartamento</SelectItem>
                      <SelectItem value="Casa de Rua">Casa de Rua</SelectItem>
                      <SelectItem value="Condomínio">Condomínio</SelectItem>
                      <SelectItem value="Veraneio">Veraneio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Posse do Imóvel</Label>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nota de Satisfação (0 a 5)</Label>
                  <Select 
                    value={String(newContact.satisfaction_score)} 
                    onValueChange={(val) => setNewContact({...newContact, satisfaction_score: parseInt(val)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 - Muito Insatisfeito</SelectItem>
                      <SelectItem value="1">1 - Insatisfeito</SelectItem>
                      <SelectItem value="2">2 - Regular</SelectItem>
                      <SelectItem value="3">3 - Bom</SelectItem>
                      <SelectItem value="4">4 - Muito Bom</SelectItem>
                      <SelectItem value="5">5 - Excelente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="Linkedin">Linkedin</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Mala Direta">Mala Direta</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Responsável pelo Lead</Label>
                  <Select 
                    value={['Sandra', 'Roberto', 'Leticia'].includes(newContact.responsible_name) ? newContact.responsible_name : (newContact.responsible_name ? 'Outros' : '')} 
                    onValueChange={(val) => {
                      if (val === 'Outros') {
                        setNewContact({...newContact, responsible_name: ' '}); // Space to trigger "Outros" mode
                      } else {
                        setNewContact({...newContact, responsible_name: val});
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sandra">Sandra</SelectItem>
                      <SelectItem value="Roberto">Roberto</SelectItem>
                      <SelectItem value="Leticia">Leticia</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  {(!['Sandra', 'Roberto', 'Leticia'].includes(newContact.responsible_name) && newContact.responsible_name !== '') && (
                    <Input 
                      className="mt-2"
                      placeholder="Nome do responsável"
                      value={newContact.responsible_name === ' ' ? '' : newContact.responsible_name}
                      onChange={e => setNewContact({...newContact, responsible_name: e.target.value})}
                    />
                  )}
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

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has_consortium" 
                        checked={newContact.has_consortium}
                        onCheckedChange={(checked) => setNewContact({...newContact, has_consortium: !!checked})}
                      />
                      <Label htmlFor="has_consortium" className="text-sm">Consórcio</Label>
                    </div>
                    {newContact.has_consortium && (
                      <div className="space-y-2 pl-6">
                        <Select 
                          value={newContact.consortium_type || "Auto"} 
                          onValueChange={(val) => setNewContact({...newContact, consortium_type: val})}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Auto">Automóveis</SelectItem>
                            <SelectItem value="Imóveis">Imóveis</SelectItem>
                            <SelectItem value="Pesados">Pesados</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="grid grid-cols-2 gap-2">
                          <Input 
                            placeholder="Administradora"
                            className="h-8 text-xs"
                            value={newContact.consortium_carrier}
                            onChange={e => setNewContact({...newContact, consortium_carrier: e.target.value})}
                          />
                          <Input 
                            type="date"
                            className="h-8 text-xs"
                            value={newContact.consortium_renewal}
                            onChange={e => setNewContact({...newContact, consortium_renewal: e.target.value})}
                          />
                        </div>
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
                    Alerta agendado para: {formatContactDate(newContact.next_contact_date, "dd/MM/yyyy")}
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
              <Button onClick={handleSaveContact} disabled={createContact.isPending || updateContact.isPending}>
                {(createContact.isPending || updateContact.isPending) ? "Salvando..." : "Salvar Contato"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>


      <Card className="bg-white shadow-sm border-slate-100">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Relacionamento</TableHead>
                <TableHead>Seguros</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">Carregando contatos...</TableCell>

                </TableRow>
              ) : filteredContacts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    Nenhum contato encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts?.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-slate-900 cursor-pointer hover:text-primary transition-colors" onClick={() => handleOpenHistory(contact)}>{contact.full_name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {contact.phone}
                        </div>
                        {contact.last_contact_date && (
                          <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 
                            Último contato: {formatContactDate(contact.last_contact_date, "dd/MM/yyyy")}
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
                      {contact.responsible_name ? (
                        <Badge variant="outline" className="text-[10px] bg-slate-50 border-slate-200">
                          {contact.responsible_name}
                        </Badge>
                      ) : (
                        <span className="text-[10px] text-muted-foreground italic">Não atribuído</span>
                      )}
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              const url = prompt("Insira o link da apólice no Google Drive:");
                              if (url) {
                                uploadDocument.mutate({
                                  contactId: contact.id,
                                  externalLink: url,
                                  category: 'apólice'
                                });
                              }
                            }}
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mt-1">
                        {contact.documents?.filter((d: any) => d.external_drive_link).map((doc: any) => (
                          <a 
                            key={doc.id}
                            href={doc.external_drive_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-2.5 h-2.5" /> Google Drive Link
                          </a>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {contact.phone && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-green-600 hover:bg-green-50"
                            asChild
                          >
                            <a
                              href={getWhatsAppUrl(contact.phone)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Abrir WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClick(contact)}>
                              <Pencil className="w-4 h-4 mr-2" />
                              Editar Contato
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenHistory(contact)}>
                              <HistoryIcon className="w-4 h-4 mr-2" />
                              Histórico de Conversas
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ContactInteractionDialog 
        contact={selectedContactForHistory} 
        open={isHistoryOpen} 
        onOpenChange={setIsHistoryOpen} 
      />

      <Dialog open={!!importPreview} onOpenChange={(open) => !open && setImportPreview(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Prévia da Importação</DialogTitle>
            <DialogDescription>
              Revise os contatos antes de salvar. {importPreview?.duplicates ? `${importPreview.duplicates} duplicados foram ocultados.` : ""}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto my-4 border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importPreview?.contacts.map((contact, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Input 
                        value={contact.full_name} 
                        onChange={(e) => {
                          if (!importPreview) return;
                          const newContacts = [...importPreview.contacts];
                          newContacts[idx] = { ...newContacts[idx], full_name: e.target.value };
                          setImportPreview({ ...importPreview, contacts: newContacts });
                        }}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={contact.email || ""} 
                        onChange={(e) => {
                          if (!importPreview) return;
                          const newContacts = [...importPreview.contacts];
                          newContacts[idx] = { ...newContacts[idx], email: e.target.value };
                          setImportPreview({ ...importPreview, contacts: newContacts });
                        }}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={contact.phone || ""} 
                        onChange={(e) => {
                          if (!importPreview) return;
                          const newContacts = [...importPreview.contacts];
                          newContacts[idx] = { ...newContacts[idx], phone: e.target.value };
                          setImportPreview({ ...importPreview, contacts: newContacts });
                        }}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          if (!importPreview) return;
                          const newContacts = importPreview.contacts.filter((_, i) => i !== idx);
                          setImportPreview({ ...importPreview, contacts: newContacts });
                        }}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setImportPreview(null)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => importPreview && processImport(importPreview.contacts, importPreview.duplicates)}
              disabled={!importPreview?.contacts.length}
            >
              Confirmar Importação ({importPreview?.contacts.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsModule;
