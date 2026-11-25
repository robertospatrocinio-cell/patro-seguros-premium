import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { AIRPORT_CATEGORY, AIRPORT_EO, AIRPORT_HUB, AIRPORT_PRODUCTS, AIRPORT_QUESTIONS, airportPossibilities, airportPriority, isAirportProduct, type AirportBrief } from "./airport-qualification.ts";

const MAX_PDF = 2 * 1024 * 1024;
const motives = ["Preciso contratar um novo seguro", "Preciso renovar minha apólice", "Preciso adequar uma apólice existente", "Estou participando de uma concorrência", "Preciso esclarecer uma exigência contratual"];
const phases = ["Contrato aprovado", "Contrato em negociação", "Exigência identificada", "Exigência em definição", "Pesquisa inicial ou projeto futuro"];
const limits = { name: 120, company: 180, email: 200, phone: 24, service: 250, airport: 160, deadline: 10, motive: 80, phase: 80, cnpj: 18, client: 160, limit: 80, value: 80, notes: 1200 };
const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const campaign = (value: unknown) => typeof value === "string" && /^[\p{L}\p{N}_. ()+\-]{1,100}$/u.test(value) && !/\d{8,}/.test(value) ? value : null;

// Called only after origin, gateway credential and rate-limit checks in submit-lead.
export async function receiveEo(req: Request, admin: SupabaseClient, ip: string, headers: Record<string,string>) {
  const reply = (status: number, code: string, uploaded = false) => new Response(JSON.stringify(status === 200 ? { success: true, intake: code, uploaded } : { error: code }), { status, headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" } });
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
  let form: FormData, payload: unknown;
  try {
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    form = await new Response(bytes.buffer, { headers: { "Content-Type": req.headers.get("content-type")! } }).formData();
    if (form.getAll("request").length !== 1 || form.getAll("clause").length > 1) return reply(400, "format");
    payload = JSON.parse(String(form.get("request")));
  } catch { return reply(400, "format"); }
  if (!isRecord(payload) || payload.consent !== true || payload.website !== "") return reply(400, "request");
  if (payload.intake !== undefined && payload.intake !== "eo-v1" && payload.intake !== "airport-v1") return reply(400, "request");
  const hub = payload.intake === "airport-v1";
  const intake = hub ? "airport-v1" : "eo-v1";
  const page = hub ? AIRPORT_HUB : AIRPORT_EO;
  const id = payload.requestId;
  if (typeof id !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(id)) return reply(400, "request");
  const fields = {} as Record<keyof typeof limits,string>;
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    const v = payload[key] ?? "";
    if (typeof v !== "string" || v.length > limits[key]) return reply(400, "fields");
    fields[key] = v.trim();
  }
  const f = fields;
  if (f.name.length < 3 || f.company.length < 3 || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(f.email) || !/^(55)?\d{10,11}$/.test(f.phone.replace(/[\s()+-]/g, "")) || (f.cnpj && !/^\d{14}$/.test(f.cnpj.replace(/[./-]/g,"")))) return reply(400, "contact");
  const day = Date.parse(`${f.deadline}T00:00:00Z`);
  if ((f.motive && !motives.includes(f.motive)) || (f.phase && !phases.includes(f.phase)) || (f.deadline && (!/^\d{4}-\d{2}-\d{2}$/.test(f.deadline) || !Number.isFinite(day) || new Date(day).toISOString().slice(0,10) !== f.deadline))) return reply(400, "context");
  if (hub && payload.product && !isAirportProduct(payload.product)) return reply(400, "context");
  const product = hub ? isAirportProduct(payload.product) ? payload.product : undefined : "eo";
  const brief: AirportBrief = {};
  if (hub && payload.assessment !== undefined) {
    if (!isRecord(payload.assessment)) return reply(400, "context");
    for (const q of AIRPORT_QUESTIONS) {
      const answer = payload.assessment[q.key] ?? "";
      if (typeof answer !== "string" || ("options" in q ? !!answer && !q.options.includes(answer) : answer.length > q.max)) return reply(400, "context");
      if (answer.trim()) brief[q.key] = answer.trim();
    }
  }
  const file = form.get("clause");
  if (file !== null && (!(file instanceof File) || file.type !== "application/pdf" || !/\.pdf$/i.test(file.name) || file.size < 12 || file.size > MAX_PDF || (await file.slice(0,5).text()) !== "%PDF-" || !(await file.slice(-1024).text()).includes("%%EOF"))) return reply(422, "pdf");
  const findPrior = () => admin.from("leads").select("raw_data").eq("id", id).eq("source_page", page).eq("email", f.email).eq("phone", f.phone).maybeSingle();
  const { data: prior, error: lookup } = await findPrior();
  if (lookup) return reply(503, "crm");
  if (prior) return reply(200, intake, !!prior.raw_data?.clause_path);
  const bucket = admin.storage.from("crm_documents");
  const objectPath = file instanceof File ? `eo/${id}/${crypto.randomUUID()}.pdf` : null;
  if (file instanceof File && objectPath) {
    const { error } = await bucket.upload(objectPath, file, { contentType: "application/pdf", upsert: false });
    if (error) return reply(503, "storage");
  }
  const briefDay = brief.deadline && /^\d{4}-\d{2}-\d{2}$/.test(brief.deadline) ? Date.parse(`${brief.deadline}T00:00:00Z`) : NaN;
  const deadline = Number.isFinite(day) ? day : Number.isFinite(briefDay) && new Date(briefDay).toISOString().slice(0,10) === brief.deadline ? briefDay : NaN;
  const localDay = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const datePart = (type: Intl.DateTimeFormatPartTypes) => localDay.find(part => part.type === type)?.value;
  const today = Date.parse(`${datePart("year")}-${datePart("month")}-${datePart("day")}T00:00:00Z`);
  const priority = airportPriority(deadline, today, f.phase, !!objectPath || brief.clauseAvailable === "Sim");
  const attr = isRecord(payload.attribution) ? payload.attribution : {};
  const utms = Object.fromEntries(["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].map(k => [k, campaign(attr[k])]));
  const { error } = await admin.from("leads").insert({
    id, full_name: f.company, responsible_name: f.name, client_type: "pessoa_juridica", phone: f.phone, email: f.email, cpf_cnpj: f.cnpj || null,
    insurance_type: hub ? AIRPORT_CATEGORY : AIRPORT_PRODUCTS.eo, source_page: page, source_origin: hub ? "Hub Aeroportuário" : "site", ip_address: ip,
    lead_score: priority.score, notes: f.notes || null, utm_source: utms.utm_source, utm_medium: utms.utm_medium, utm_campaign: utms.utm_campaign,
    raw_data: { segment: AIRPORT_CATEGORY, channel: "Formulário", product: product ? AIRPORT_PRODUCTS[product] : null, company: f.company, contact: f.name,
      service: f.service || brief.service, airport: f.airport || brief.airport, deadline: f.deadline || brief.deadline, motive: f.motive, phase: f.phase,
      client: f.client, limit: f.limit, value: f.value, priority: priority.label, clause_path: objectPath, contact_consent: true, attribution: utms,
      assessment: brief, possible_products: airportPossibilities(brief).map(key => AIRPORT_PRODUCTS[key]), intake },
  });
  if (error) {
    if (objectPath) { const { error: cleanup } = await bucket.remove([objectPath]); if (cleanup) console.error("airport: private object cleanup failed"); }
    if (error.code === "23505") { const { data } = await findPrior(); if (data) return reply(200, intake, !!data.raw_data?.clause_path); }
    return /Muitas solicitações/i.test(error.message) ? reply(429,"rate") : reply(503,"crm");
  }
  return reply(200, intake, !!objectPath);
}
