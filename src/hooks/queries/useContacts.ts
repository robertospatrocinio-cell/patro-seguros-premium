import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type ContactRow = Database["public"]["Tables"]["contacts"]["Row"];
type ContactInsert = Database["public"]["Tables"]["contacts"]["Insert"];
type ContactUpdate = Database["public"]["Tables"]["contacts"]["Update"];
type DocumentRow = Database["public"]["Tables"]["documents"]["Row"];
type DocumentInsert = Database["public"]["Tables"]["documents"]["Insert"];

/** `Contact` enriquecido com os joins de seguros e documentos. */
export type Contact = ContactRow & {
  contact_insurances?: Array<{ insurance_type: string }> | null;
  documents?: DocumentRow[] | null;
};

export type { ContactInsert, ContactUpdate };

/** Colunas de data: string vazia precisa virar NULL para o Postgres aceitar. */
const DATE_FIELDS = [
  "birth_date",
  "partner_birthday",
  "life_insurance_renewal",
  "home_insurance_renewal",
  "health_insurance_renewal",
  "business_insurance_renewal",
  "other_insurance_renewal",
  "last_contact_date",
  "next_contact_date",
  "consortium_renewal",
] as const satisfies ReadonlyArray<keyof ContactUpdate>;

function sanitizeContact<T extends ContactInsert | ContactUpdate>(input: T): T {
  const out = { ...input } as Record<string, unknown>;
  if (out.referral_contact_id === "") out.referral_contact_id = null;
  for (const field of DATE_FIELDS) {
    if (out[field] === "") out[field] = null;
  }
  return out as T;
}

export const useContacts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
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

      if (error) {
        console.error("Supabase error fetching contacts:", error);
        throw new Error(`Erro Supabase (Contatos): ${error.message}`);
      }
      return data;
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  const createContact = useMutation({
    mutationFn: async (
      newContact: { full_name: string } & Partial<ContactInsert> & { insurances?: string[] },
    ) => {
      const { insurances, ...contactData } = newContact;
      const sanitizedData = sanitizeContact(contactData as ContactInsert);

      const { data: contact, error: contactError } = await supabase
        .from("contacts")
        .insert([sanitizedData])
        .select()
        .single();

      if (contactError) {
        console.error("Error creating contact:", contactError);
        throw contactError;
      }

      if (insurances && insurances.length > 0) {
        const insuranceInserts = insurances.map((type) => ({
          contact_id: contact.id,
          insurance_type: type,
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
    onError: (error: Error) => {
      toast.error("Erro ao criar contato: " + error.message);
    }
  });

  const uploadDocument = useMutation({
    mutationFn: async ({
      contactId,
      file,
      category,
      externalLink,
    }: { contactId: string; file?: File; category: string; externalLink?: string }) => {
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${contactId}/${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('crm_documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const docPayload: DocumentInsert = {
          contact_id: contactId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          category,
        };
        const { error: docError } = await supabase
          .from('documents')
          .insert([docPayload]);

        if (docError) throw docError;
      } else if (externalLink) {
        const docPayload: DocumentInsert = {
          contact_id: contactId,
          file_name: "Google Drive Policy",
          file_path: externalLink,
          external_drive_link: externalLink,
          category,
        };
        const { error: docError } = await supabase
          .from('documents')
          .insert([docPayload]);

        if (docError) throw docError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Documento registrado com sucesso!");
    }
  });

  const updateContact = useMutation({
    mutationFn: async (
      updatedContact: Partial<ContactUpdate> & { id: string; insurances?: string[] },
    ) => {
      const { insurances, id, ...contactData } = updatedContact;
      const sanitizedData = sanitizeContact(contactData as ContactUpdate);

      const { data: contact, error: contactError } = await supabase
        .from("contacts")
        .update(sanitizedData)
        .eq("id", id)
        .select()
        .single();

      if (contactError) throw contactError;

      if (insurances) {
        // First delete existing insurances
        await supabase
          .from("contact_insurances")
          .delete()
          .eq("contact_id", id);

        if (insurances.length > 0) {
          const insuranceInserts = insurances.map((type) => ({
            contact_id: id,
            insurance_type: type,
          }));

          const { error: insError } = await supabase
            .from("contact_insurances")
            .insert(insuranceInserts);

          if (insError) throw insError;
        }
      }

      return contact;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contato atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error("Erro ao atualizar contato: " + error.message);
    }
  });

  const forceRefetch = async () => {
    try {
      // Invalidate the cache and refetch. Avoid `removeQueries` because it
      // forces a hard re-mount that doubles the round-trip.
      await queryClient.invalidateQueries({ queryKey: ["contacts"] });
      await refetch();
      toast.success("Agenda e contatos sincronizados com o servidor.");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error("Erro ao sincronizar dados: " + msg);
      throw error;
    }
  };

  return {
    contacts: data,
    isLoading,
    error,
    refetch,
    isRefetching,
    forceRefetch,
    createContact,
    updateContact,
    uploadDocument
  };
};
