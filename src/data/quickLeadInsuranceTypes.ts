/**
 * Fonte única das opções do campo "Tipo de Seguro" do formulário
 * Cotação Express (src/components/QuickLeadForm.tsx).
 * Usada tanto pelo <Select> quanto pelas ferramentas WebMCP.
 */
export interface QuickLeadInsuranceType {
  /** Identificador enviado no formulário. */
  id: string;
  /** Rótulo exibido ao visitante. */
  label: string;
}

export const QUICK_LEAD_INSURANCE_TYPES: readonly QuickLeadInsuranceType[] = [
  { id: "Auto", label: "Seguro Auto" },
  { id: "Uber", label: "Seguro Uber / APP" },
  { id: "Saude", label: "Plano de Saúde" },
  { id: "Vida", label: "Seguro de Vida" },
  { id: "Residencial", label: "Seguro Residencial" },
  { id: "Empresarial", label: "Seguro Empresa" },
] as const;

export const QUICK_LEAD_INSURANCE_TYPE_IDS = QUICK_LEAD_INSURANCE_TYPES.map((t) => t.id);

/** Resolve um id ou rótulo (case-insensitive) para um id válido do formulário. */
export function resolveInsuranceTypeId(input: string): string | null {
  const v = input.trim().toLowerCase();
  if (!v) return null;
  const found = QUICK_LEAD_INSURANCE_TYPES.find(
    (t) => t.id.toLowerCase() === v || t.label.toLowerCase() === v,
  );
  return found ? found.id : null;
}
