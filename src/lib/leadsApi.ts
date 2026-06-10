import { safeInvoke } from "@/lib/supabase-helpers";

export interface SubmitLeadInput {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  insurance_type?: string | null;
  source_page?: string | null;
  raw_data?: Record<string, unknown> | null;
}

export async function submitLead(input: SubmitLeadInput) {
  return safeInvoke("submit-lead", input);
}

export interface SavePartialQuoteInput {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  insurance_type?: string | null;
  current_step?: number | null;
  data?: Record<string, unknown> | null;
}

export async function savePartialQuote(
  input: SavePartialQuoteInput
): Promise<{ id: string | null; error: unknown }> {
  const { data, error } = await safeInvoke("save-partial-quote", input);
  if (error) return { id: null, error };
  const responseId = (data as { id?: string } | null)?.id ?? null;
  return { id: responseId, error: null };
}