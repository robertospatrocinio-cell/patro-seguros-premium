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
          full_name: row.Nome || row["Nome Completo"] || row.Name || row.full_name || "",
          email: row.Email || row.email || "",
          phone: row.Telefone || row.Phone || row.phone || row.Mobile || "",
          birth_date: row["Data Nascimento"] || row.Birthday || row.birth_date || "",
          notes: row.Notas || row.Notes || row.notes || "",
          profession: row["Profissão"] || row.Profession || row.profession || "",
        })).filter(c => c.full_name);
        resolve(mapped);
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
    // Use a more robust regex to split individual VCARDs if parse fails
    const vcards = text.split(/END:VCARD/i).filter(v => v.trim().length > 0).map(v => v + "END:VCARD");
    
    const results: ImportedContact[] = [];
    
    for (const vcard of vcards) {
      try {
        const parsed = parse(vcard);
        if (parsed && parsed.length > 0) {
          const entry = parsed[0];
          const fullName = entry.fn?.[0]?.value || 
                         (entry.n?.[0]?.value ? `${entry.n[0].value.givenName || ""} ${entry.n[0].value.surname || ""}`.trim() : "");
          const email = entry.email?.[0]?.value || "";
          const phone = entry.tel?.[0]?.value || "";
          const bday = entry.bday?.[0]?.value || "";
          
          if (fullName || phone || email) {
            results.push({
              full_name: fullName || "Contato Sem Nome",
              email,
              phone,
              birth_date: bday,
              notes: "Importado via VCF",
              is_client: false
            });
          }
        }
      } catch (err) {
        console.warn("Failed to parse individual VCARD:", err);
      }
    }
    
    return results;
  } catch (error) {
    console.error("VCF Import error:", error);
    throw new Error("Não foi possível ler o arquivo VCF. Verifique o formato.");
  }
};
