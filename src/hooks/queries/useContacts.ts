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
      
      const { data: contact, error: contactError } = await supabase
        .from("contacts")
        .insert([contactData])
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
    mutationFn: async ({ contactId, file, category }: { contactId: string, file: File, category: string }) => {
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
        }]);

      if (docError) throw docError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Documento enviado com sucesso!");
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
