import { useState } from "react";
import type { Lead } from "@/hooks/queries/useLeads";
import { supabase } from "@/integrations/supabase/client";
import { AIRPORT_QUESTIONS } from "../../../supabase/functions/_shared/airport-qualification";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

export default function EoLeadDetails({lead}:{lead:Lead}) {
  const [busy,setBusy]=useState(false), [error,setError]=useState(false);
  const raw = lead.raw_data;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const get = (key:string) => typeof raw[key] === 'string' ? String(raw[key]) : '';
  const path = get('clause_path');
  const privatePdf = path.startsWith(`eo/${lead.id}/`) && /^eo\/[a-f0-9-]{36}\/[a-f0-9-]{36}\.pdf$/.test(path);
  const download = async () => {
    if (!privatePdf || busy) return;
    setBusy(true);setError(false);
    try {
      // Uses the signed-in administrator's session. No public/signed link in the DOM or CRM.
      const {data,error} = await supabase.storage.from('crm_documents').download(path);
      if (error || !data) throw new Error();
      const url=URL.createObjectURL(data), a=document.createElement('a');
      a.href=url;a.download='clausula-contratual.pdf';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    } catch { setError(true); } finally { setBusy(false); }
  };
  const assessment = asRecord(raw.assessment);
  const attribution = asRecord(raw.attribution);
  const possibleProducts = Array.isArray(raw.possible_products) ? raw.possible_products.filter((item): item is string => typeof item === "string") : [];
  const fields = [
    ...Object.entries({contact:'Contato na empresa',segment:'Categoria',product:'Modalidade de interesse',channel:'Canal',service:'Serviço',airport:'Aeroporto',deadline:'Prazo',phase:'Fase',motive:'Necessidade',client:'Contratante',limit:'Limite',value:'Valor do contrato'}).map(([key, label]) => ({ key, label, value: get(key) })),
    ...(get('intake') === 'airport-ap-v1' ? [
      { key: 'profile', label: 'Perfil do contratante', value: get('profile') },
      { key: 'workers', label: 'Quantidade de profissionais', value: get('workers') },
      { key: 'term', label: 'Vigência desejada', value: get('term') },
      { key: 'coverage', label: 'Coberturas solicitadas', value: get('coverage') },
    ] : [{ key: 'possible_products', label: 'Modalidades sugeridas para avaliação', value: possibleProducts.join(', ') }]),
    ...AIRPORT_QUESTIONS.filter(({ key }) => key !== 'airport' && key !== 'service' && key !== 'deadline').map(({ key, label }) => ({ key, label, value: assessment[key] })),
    ...['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].map(key => ({ key, label: key, value: attribution[key] })),
    { key: 'notes', label: 'Observações', value: lead.notes },
  ];
  return <details className="mt-2 max-w-sm text-xs">
    <summary className="cursor-pointer font-semibold">Triagem · {get('priority') || 'A revisar'}</summary>
    <dl className="my-3 grid gap-2">{fields.map(({ key, label, value }) => typeof value === 'string' && value && <div key={key}><dt className="font-semibold">{label}</dt><dd className="break-words">{value}</dd></div>)}</dl>
    {privatePdf && <button type="button" className="min-h-11 underline" disabled={busy} onClick={download}>{busy?'Baixando…':'Baixar cláusula privada (PDF)'}</button>}
    {error && <p role="alert">Não foi possível baixar o PDF. Confira sua sessão e tente novamente.</p>}
  </details>;
}
