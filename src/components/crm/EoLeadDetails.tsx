import { useState } from "react";
import type { Lead } from "@/hooks/queries/useLeads";
import { supabase } from "@/integrations/supabase/client";

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
  return <details className="mt-2 max-w-sm text-xs"><summary className="cursor-pointer font-semibold">Triagem · {get('priority') || 'A revisar'}</summary><dl className="my-3 grid gap-2">{Object.entries({contact:'Contato na empresa',segment:'Segmento',channel:'Canal',service:'Serviço',airport:'Aeroporto',deadline:'Prazo',phase:'Fase',motive:'Necessidade',client:'Contratante',limit:'Limite',value:'Valor do contrato'}).map(([k,label])=>get(k) && <div key={k}><dt className="font-semibold">{label}</dt><dd className="break-words">{get(k)}</dd></div>)}{lead.notes && <div><dt className="font-semibold">Observações</dt><dd className="break-words">{lead.notes}</dd></div>}</dl>{privatePdf && <button type="button" className="min-h-11 underline" disabled={busy} onClick={download}>{busy?'Baixando…':'Baixar cláusula privada (PDF)'}</button>}{error && <p role="alert">Não foi possível baixar o PDF. Confira sua sessão e tente novamente.</p>}</details>;
}
