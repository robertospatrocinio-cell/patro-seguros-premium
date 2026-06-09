
export const veterinariaFormFields: { id: string; label: string; placeholder?: string; type: "text" | "select"; options?: string[] }[] = [
  { id: "nome_clinica", label: "Nome da Clínica", placeholder: "Nome fantasia da empresa", type: "text" },
  { id: "crmv", label: "CRMV (opcional)", placeholder: "Seu registro profissional", type: "text" },
  { id: "cidade", label: "Cidade", placeholder: "Ex: Guarulhos", type: "text" },
  { 
    id: "tipo_atividade", 
    label: "Tipo de Atividade", 
    type: "select", 
    options: ["Clínica Veterinária", "Hospital Veterinário", "Consultório", "Pet Shop", "Banho e Tosa", "Centro de Diagnóstico", "Veterinário Autônomo"] 
  },
  { 
    id: "colaboradores", 
    label: "Quantidade de Colaboradores", 
    type: "select", 
    options: ["1-3", "4-10", "11-30", "31+"] 
  },
  { 
    id: "possui_seguro", 
    label: "Possui seguro atualmente?", 
    type: "select", 
    options: ["Sim", "Não"] 
  },
  { 
    id: "horario_contato", 
    label: "Melhor horário para contato", 
    type: "select", 
    options: ["Manhã", "Tarde", "Noite", "Qualquer horário"] 
  }
];
