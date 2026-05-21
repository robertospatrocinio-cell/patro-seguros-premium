import { format } from "date-fns";
import { toast } from "sonner";
import { Lead } from "@/hooks/queries/useLeads";

export const exportToCSV = (leads: Lead[]) => {
  if (leads.length === 0) {
    toast.error("Não há dados para exportar.");
    return;
  }

  const headers = ["Data", "Nome", "E-mail", "Telefone", "Tipo de Seguro", "Página de Origem"];
  const csvContent = [
    headers.join(","),
    ...leads.map((lead) => [
      format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
      `"${lead.full_name || ""}"`,
      lead.email || "",
      lead.phone || "",
      `"${lead.insurance_type || ""}"`,
      lead.source_page || ""
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `leads_patro_seguros_${format(new Date(), "yyyy-MM-dd")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("CSV exportado com sucesso!");
};
