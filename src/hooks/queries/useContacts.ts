import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Contact {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  cpf_cnpj: string | null;
  client_type: 'cliente' | 'amigo' | 'não cliente' | null;
  is_client: boolean;
  notes: string | null;
  marital_status?: string | null;
  birth_date?: string | null;
  partner_name?: string | null;
  partner_birthday?: string | null;
  has_children?: boolean;
  children_count?: number;
  children_data?: any[];
  car_count?: number;
  has_motorcycle?: boolean;
  has_life_insurance?: boolean;
  life_insurance_carrier?: string | null;
  life_insurance_renewal?: string | null;
  has_home_insurance?: boolean;
  home_insurance_carrier?: string | null;
  home_insurance_renewal?: string | null;
  health_plan_type?: string | null;
  health_insurance_carrier?: string | null;
  health_insurance_renewal?: string | null;
  has_business_insurance?: boolean;
  business_insurance_carrier?: string | null;
  business_insurance_renewal?: string | null;
  has_other_insurance?: boolean;
  other_insurance_carrier?: string | null;
  other_insurance_renewal?: string | null;
  last_contact_date?: string | null;
  next_contact_date?: string | null;
  profession?: string | null;
  income_bracket?: string | null;
  home_ownership?: string | null;
  lead_source?: string | null;
  referral_contact_id?: string | null;
  salesperson_name?: string | null;
  partner_source_name?: string | null;
  satisfaction_score?: number | null;
  last_interaction_type?: string | null;
  has_consortium?: boolean;
  consortium_type?: string | null;
  consortium_carrier?: string | null;
  consortium_renewal?: string | null;
  created_at: string;
}

export const useContacts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select(`
          *,
          contact_insurances (insurance_type),
          documents (*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createContact = useMutation({
    mutationFn: async (newContact: { full_name: string } & Partial<Contact> & { insurances?: string[] }) => {
      const { insurances, ...contactData } = newContact;
      
      // Sanitize UUID fields
      if (contactData.referral_contact_id === "") {
        contactData.referral_contact_id = null;
      }

      const { data: contact, error: contactError } = await supabase
        .from("contacts")
        .insert([contactData as any])
        .select()
        .single();

      if (contactError) throw contactError;

      if (insurances && insurances.length > 0) {
        const insuranceInserts = insurances.map(type => ({
          contact_id: contact.id,
          insurance_type: type
        }));
        
        const { error: insError } = await supabase
          .from("contact_insurances")
          .insert(insuranceInserts);
          
        if (insError) throw insError;
      }

      return contact;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contato criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar contato: " + error.message);
    }
  });

  const uploadDocument = useMutation({
    mutationFn: async ({ contactId, file, category, externalLink }: { contactId: string, file?: File, category: string, externalLink?: string }) => {
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${contactId}/${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('crm_documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: docError } = await supabase
          .from('documents')
          .insert([{
            contact_id: contactId,
            file_name: file.name,
            file_path: filePath,
            file_type: file.type,
            category: category
          } as any]);

        if (docError) throw docError;
      } else if (externalLink) {
        const { error: docError } = await supabase
          .from('documents')
          .insert([{
            contact_id: contactId,
            file_name: "Google Drive Policy",
            external_drive_link: externalLink,
            category: category
          } as any]);

        if (docError) throw docError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Documento registrado com sucesso!");
    }
  });

  return {
    contacts: data,
    isLoading,
    error,
    refetch,
    createContact,
    uploadDocument
  };
};
