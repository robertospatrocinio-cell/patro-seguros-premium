import Papa from "papaparse";
import { parse } from "vcf-parser";
import * as XLSX from "xlsx";

export interface ImportedContact {
  full_name: string;
  email?: string;
  phone?: string;
  birth_date?: string;
  notes?: string;
  profession?: string;
  is_client?: boolean;
}

export const parseCSV = (file: File): Promise<ImportedContact[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const mapped = results.data.map((row: any) => ({
          full_name: 
            row.Nome || row["Nome Completo"] || row.Name || row["First Name"] || row["Last Name"] ? 
            `${row["First Name"] || ""} ${row["Last Name"] || ""}`.trim() : 
            row.full_name || row["Display Name"] || "",
          email: row.Email || row["E-mail Address"] || row["Email 1 - Value"] || row.email || "",
          phone: row.Telefone || row.Phone || row["Mobile Phone"] || row["Phone 1 - Value"] || row.phone || row.Mobile || "",
          birth_date: row["Data Nascimento"] || row.Birthday || row.birth_date || "",
          notes: row.Notas || row.Notes || row.notes || "",
          profession: row["Profissão"] || row.Profession || row.profession || row.Job || "",
        })).filter((c: any) => c.full_name || c.phone || c.email);
        
        // Handle rows where full_name was constructed but empty
        const final = mapped.map((c: any) => ({
          ...c,
          full_name: c.full_name || "Contato Sem Nome"
        }));
        
        resolve(final);
      },
      error: (error) => reject(error),
    });
  });
};

export const parseExcel = (file: File): Promise<ImportedContact[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const mapped = json.map((row: any) => ({
          full_name: row.Nome || row["Nome Completo"] || row.Name || row.full_name || "",
          email: row.Email || row.email || "",
          phone: row.Telefone || row.Phone || row.phone || row.Mobile || "",
          birth_date: row["Data Nascimento"] || row.Birthday || row.birth_date || "",
          notes: row.Notas || row.Notes || row.notes || "",
          profession: row["Profissão"] || row.Profession || row.profession || "",
        })).filter(c => c.full_name);
        resolve(mapped);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

export const parseVCF = async (file: File): Promise<ImportedContact[]> => {
  try {
    const text = await file.text();
    if (!text || text.trim().length === 0) {
      throw new Error("O arquivo VCF está vazio.");
    }

    if (!text.includes("BEGIN:VCARD")) {
      throw new Error("O arquivo não parece ser um formato de contato (VCF) válido.");
    }

    // Use a more robust regex to split individual VCARDs if parse fails
    const vcards = text.split(/END:VCARD/i).filter(v => v.trim().length > 0).map(v => v + "END:VCARD");
    
    if (vcards.length === 0) {
      throw new Error("Nenhum contato encontrado no arquivo VCF.");
    }

    const results: ImportedContact[] = [];
    const errors: string[] = [];
    
    for (let index = 0; index < vcards.length; index++) {
      const vcard = vcards[index];
      try {
        const parsed = parse(vcard);
        if (parsed && parsed.length > 0) {
          const entry = parsed[0];
          const fullName = entry.fn?.[0]?.value || 
                         (entry.n?.[0]?.value ? `${entry.n[0].value.givenName || ""} ${entry.n[0].value.surname || ""}`.trim() : "");
          // iPhone specific fields often use different property names or multiple values
          const emails = entry.email?.map((e: any) => e.value).join(", ") || "";
          const phones = entry.tel?.map((t: any) => t.value).join(", ") || "";
          const bday = entry.bday?.[0]?.value || "";
          const note = entry.note?.[0]?.value || "Importado via VCF";
          const title = entry.title?.[0]?.value || "";
          const org = entry.org?.[0]?.value?.organization || "";
          
          if (fullName || phones || emails) {
            results.push({
              full_name: fullName || "Contato Sem Nome",
              email: emails,
              phone: phones,
              birth_date: bday,
              notes: note,
              profession: [title, org].filter(Boolean).join(" - "),
              is_client: false
            });
          }
        } else {
          errors.push(`Contato #${index + 1}: Dados insuficientes.`);
        }
      } catch (err) {
        console.warn(`Failed to parse individual VCARD at index ${index}:`, err);
        errors.push(`Contato #${index + 1}: Erro de formatação.`);
      }
    }
    
    if (results.length === 0 && errors.length > 0) {
      throw new Error(`Falha ao processar contatos: ${errors.slice(0, 3).join(", ")}${errors.length > 3 ? "..." : ""}`);
    }

    return results;
  } catch (error) {
    console.error("VCF Import error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível ler o arquivo VCF. Verifique o formato.");
  }
};

export const deduplicateContacts = (imported: ImportedContact[], existingContacts: any[]): { 
  toImport: ImportedContact[], 
  duplicates: number 
} => {
  const normalize = (val: string | undefined | null) => 
    val?.toString().toLowerCase().trim().replace(/\s+/g, '') || "";
  
  const normalizePhone = (val: string | undefined | null) => 
    val?.toString().replace(/\D/g, '') || "";

  const existingMap = new Set();
  
  existingContacts.forEach(c => {
    if (c.full_name) existingMap.add(`name:${normalize(c.full_name)}`);
    if (c.email) existingMap.add(`email:${normalize(c.email)}`);
    if (c.phone) existingMap.add(`phone:${normalizePhone(c.phone)}`);
  });

  const toImport: ImportedContact[] = [];
  let duplicates = 0;
  const seenInCurrentBatch = new Set();

  for (const contact of imported) {
    const nameKey = `name:${normalize(contact.full_name)}`;
    const emailKey = contact.email ? `email:${normalize(contact.email)}` : null;
    const phoneKey = contact.phone ? `phone:${normalizePhone(contact.phone)}` : null;

    const isDuplicate = 
      existingMap.has(nameKey) || 
      (emailKey && existingMap.has(emailKey)) || 
      (phoneKey && existingMap.has(phoneKey)) ||
      seenInCurrentBatch.has(nameKey) ||
      (emailKey && seenInCurrentBatch.has(emailKey)) ||
      (phoneKey && seenInCurrentBatch.has(phoneKey));

    if (isDuplicate) {
      duplicates++;
    } else {
      toImport.push(contact);
      seenInCurrentBatch.add(nameKey);
      if (emailKey) seenInCurrentBatch.add(emailKey);
      if (phoneKey) seenInCurrentBatch.add(phoneKey);
    }
  }

  return { toImport, duplicates };
};
