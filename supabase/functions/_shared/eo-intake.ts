import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const PAGE = "/seguro-eo-engenharia-aeroportos";
const PRODUCT = "E&O Engenharia";
const MAX_PDF = 2 * 1024 * 1024;
const motives = ["Preciso contratar um novo seguro", "Preciso renovar minha apólice", "Preciso adequar uma apólice existente", "Estou participando de uma concorrência", "Preciso esclarecer uma exigência contratual"];
const phases = ["Contrato aprovado", "Contrato em negociação", "Exigência identificada", "Exigência em definição", "Pesquisa inicial ou projeto futuro"];
const limits = { name: 120, company: 180, email: 200, phone: 24, service: 250, airport: 160, deadline: 10, motive: 80, phase: 80, cnpj: 18, client: 160, limit: 80, value: 80, notes: 1200 };

// Called only after origin, gateway credential and rate-limit checks in submit-lead.
export async function receiveEo(req: Request, admin: SupabaseClient, ip: string, headers: Record<string,string>) {
  const reply = (status: number, code: string) => new Response(JSON.stringify(status === 200 ? { success: true, intake: "eo-v1" } : { error: code }), { status, headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" } });
  const max = MAX_PDF + 24 * 1024;
  if (!req.body || Number(req.headers.get("content-length")) > max) return reply(413, "size");
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > max) { await reader.cancel(); return reply(413, "size"); }
    chunks.push(value);
  }
  let form: FormData, payload;
  try {
    form = await new Response(new Blob(chunks), { headers: { "Content-Type": req.headers.get("content-type")! } }).formData();
    payload = JSON.parse(String(form.get("request")));
  } catch { return reply(400, "format"); }
  if (!payload || typeof payload !== 'object' || !payload.consent || payload.consent !== true || payload.website !== "") return reply(400, "request");
  const id = payload.requestId;
  if (typeof id !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(id)) return reply(400, "request");
  const fields = {} as Record<keyof typeof limits,string>;
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    const v = payload[key] ?? "";
    if (typeof v !== 'string' || v.length > limits[key]) return reply(400, "fields");
    fields[key] = v.trim();
  }
  const f = fields;
  if (f.name.length < 3 || f.company.length < 3 || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(f.email) || !/^(55)?\d{10,11}$/.test(f.phone.replace(/[\s()+-]/g, "")) || (f.cnpj && !/^\d{14}$/.test(f.cnpj.replace(/[./-]/g,"")))) return reply(400, "contact");
  const day = Date.parse(`${f.deadline}T00:00:00Z`);
  if ((f.motive && !motives.includes(f.motive)) || (f.phase && !phases.includes(f.phase)) || (f.deadline && (!/^\d{4}-\d{2}-\d{2}$/.test(f.deadline) || !Number.isFinite(day) || new Date(day).toISOString().slice(0,10) !== f.deadline))) return reply(400, "context");
  const file = form.get("clause");
  if (file !== null && (!(file instanceof File) || file.type !== "application/pdf" || !/\.pdf$/i.test(file.name) || file.size < 12 || file.size > MAX_PDF || !(await file.slice(0,5).text()).startsWith("%PDF-") || !(await file.slice(-1024).text()).includes("%%EOF"))) return reply(422, "pdf");
  const { data: prior, error: lookup } = await admin.from('leads').select('id').eq('id',id).eq('insurance_type',PRODUCT).maybeSingle();
  if (lookup) return reply(503, "crm");
  if (prior) return reply(200, "ok");
  const bucket = admin.storage.from('crm_documents');
  const objectPath = file instanceof File ? `eo/${id}/${crypto.randomUUID()}.pdf` : null;
  if (file instanceof File && objectPath) {
    const { error } = await bucket.upload(objectPath, file, { contentType: 'application/pdf', upsert: false });
    if (error) return reply(503, "storage");
  }
  const days = (day - Date.parse(new Date().toISOString().slice(0,10) + 'T00:00:00Z')) / 86400000;
  const high = [phases[0], phases[2]].includes(f.phase) || (days >= 0 && days <= 14) || !!objectPath;
  const medium = [phases[1], phases[3]].includes(f.phase) || motives.slice(0,4).includes(f.motive);
  const priority = high ? 'Alta' : medium ? 'Média' : 'Desenvolvimento';
  const attr = payload.attribution ?? {};
  const campaign = (v: unknown) => typeof v === 'string' && /^[\p{L}\p{N}_. ()+\-]{1,100}$/u.test(v) && !/\d{8,}/.test(v) ? v : null;
  const utms = Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].map(k => [k, campaign(attr[k])]));
  const { error } = await admin.from('leads').insert({ id, full_name: f.company, client_type: 'pessoa_juridica', phone: f.phone, email: f.email, cpf_cnpj: f.cnpj || null, insurance_type: PRODUCT, source_page: PAGE, source_origin: 'site', ip_address: ip, lead_score: high ? 90 : medium ? 55 : 20, notes: f.notes || null, utm_source: utms.utm_source, utm_medium: utms.utm_medium, utm_campaign: utms.utm_campaign, raw_data: { segment: 'Riscos aeroportuários', channel: 'Formulário', company: f.company, contact: f.name, service: f.service, airport: f.airport, deadline: f.deadline, motive: f.motive, phase: f.phase, client: f.client, limit: f.limit, value: f.value, priority, clause_path: objectPath, contact_consent: true, attribution: utms } });
  if (error) {
    if (objectPath) { const { error: cleanup } = await bucket.remove([objectPath]); if (cleanup) console.error('eo: private object cleanup failed'); }
    if (error.code === '23505') { const { data } = await admin.from('leads').select('id').eq('id',id).eq('insurance_type',PRODUCT).maybeSingle(); if (data) return reply(200,'ok'); }
    return /Muitas solicitações/i.test(error.message) ? reply(429,'rate') : reply(503,'crm');
  }
  return reply(200, 'ok');
}
