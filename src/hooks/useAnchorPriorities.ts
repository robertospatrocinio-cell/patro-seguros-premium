import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AnchorPriorityRow {
  anchor: string;
  score: number;
  conversion_rate: number;
  sessions: number;
  converting_sessions: number;
  clicks: number;
  impressions: number;
  position: number | null;
  updated_at: string;
  top_pathname: string | null;
  whatsapp_conversions: number;
  cotacao_conversions: number;
}

export type AnchorPriorityMap = Record<string, AnchorPriorityRow>;

async function fetchAnchorPriorities(): Promise<AnchorPriorityMap> {
  const { data, error } = await supabase
    .from("anchor_priorities")
    .select(
      "anchor, score, conversion_rate, sessions, converting_sessions, clicks, impressions, position, updated_at, top_pathname, whatsapp_conversions, cotacao_conversions",
    );
  if (error) throw error;
  const map: AnchorPriorityMap = {};
  for (const row of (data ?? []) as AnchorPriorityRow[]) {
    map[row.anchor] = row;
  }
  return map;
}

/**
 * Extrai o fragment (parte após "#") de um href de cluster.
 * Ex.: "/valor-seguro-byd-dolphin#preco-heading" → "preco-heading".
 */
export const extractAnchor = (href: string): string | null => {
  const idx = href.indexOf("#");
  return idx >= 0 ? href.slice(idx + 1) : null;
};

/**
 * Score final por âncora: combina o score de potencial (peso) com a
 * taxa de conversão medida (bônus multiplicativo). Fórmula intencional-
 * mente simples e monotônica: `score * (1 + rate * 10)`.
 *  - rate 0%  → mantém o score de potencial puro
 *  - rate 5%  → 1.5x
 *  - rate 10% → 2x
 */
export const priorityWeight = (row: AnchorPriorityRow | undefined): number => {
  if (!row) return 0;
  const base = Number(row.score) || 0;
  const rate = Math.max(0, Math.min(1, Number(row.conversion_rate) || 0));
  return base * (1 + rate * 10);
};

/**
 * `anchor_priorities` é uma tabela administrativa: a leitura é restrita a
 * usuários autenticados com papel admin. Visitantes anônimos recebiam
 * "permission denied" a cada página pública. Por isso a query só roda
 * quando existe sessão — sem sessão, os componentes públicos simplesmente
 * mantêm a ordem original dos clusters.
 */
export const useAnchorPriorities = () => {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setHasSession(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return useQuery({
    queryKey: ["anchor-priorities"],
    queryFn: fetchAnchorPriorities,
    enabled: hasSession,
    retry: false,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};