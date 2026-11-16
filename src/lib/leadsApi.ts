import { safeInvoke } from "@/lib/supabase-helpers";
import { getLeadAttribution, safeAttributionPath } from "@/lib/leadAttribution";

export interface SubmitLeadInput {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  insurance_type?: string | null;
  source_page?: string | null;
  raw_data?: Record<string, unknown> | null;
}

export async function submitLead(input: SubmitLeadInput) {
  const attribution = getLeadAttribution();
  return safeInvoke("submit-lead", {
    ...input,
    source_page: safeAttributionPath(input.source_page) ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
    ...attribution,
    raw_data: { ...input.raw_data, attribution },
  });
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

interface DraftAccess { id: string; token: string }
const draftAccess = new Map<string, DraftAccess>();
const draftStorageKey = (id: string) => `patro:draft-access:${id}`;

function readDraftAccess(id: string): DraftAccess | undefined {
  if (draftAccess.has(id)) return draftAccess.get(id);
  try {
    const saved = localStorage.getItem(draftStorageKey(id));
    if (!saved) return undefined;
    const value = JSON.parse(saved) as DraftAccess;
    if (typeof value.id === "string" && typeof value.token === "string") return value;
  } catch { /* Private browsing must not prevent saving a quote. */ }
  return undefined;
}

export async function savePartialQuote(
  input: SavePartialQuoteInput
): Promise<{ id: string | null; error: unknown }> {
  const access = input.id ? readDraftAccess(input.id) : undefined;
  // Old drafts have no ownership proof. Keep their data intact and start a
  // protected draft instead; the visitor can continue without signing in.
  const { data, error } = await safeInvoke("save-partial-quote", {
    ...input,
    id: access?.id,
    update_token: access?.token,
  });
  if (error) return { id: null, error };
  const response = data as { id?: string; update_token?: string } | null;
  const responseId = response?.id ?? null;
  if (responseId && response?.update_token) {
    const value = { id: responseId, token: response.update_token };
    for (const id of new Set([responseId, ...(input.id ? [input.id] : [])])) {
      draftAccess.set(id, value);
      try { localStorage.setItem(draftStorageKey(id), JSON.stringify(value)); } catch { /* Memory fallback. */ }
    }
  }
  return { id: responseId, error: null };
}