import { useState, memo, useRef, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, User, ShieldCheck, ArrowRight, Mail, MapPin, Lock } from "lucide-react";
import { expressLeadSchema, firstZodMessage } from "@/lib/leadValidation";
import { showFriendlyError, showValidationError } from "@/lib/friendlyToast";
import { trackCotacaoSubmit } from "@/lib/tracking";
import {
  QUICK_LEAD_INSURANCE_TYPES,
  QUICK_LEAD_INSURANCE_TYPE_IDS,
  resolveInsuranceTypeId,
} from "@/data/quickLeadInsuranceTypes";
import { useWebMcpTool } from "@/hooks/useWebMcpTool";
import { textResult } from "@/lib/webmcp";

/** Cotação online imediata de Seguro Auto (SmartBroker). */
const SMARTBROKER_AUTO_URL = "https://patroseguros.smartbroker.net.br";

type QuickLeadFields = {
  name: string;
  phone: string;
  email: string;
  city: string;
  insuranceType: string;
};

const FIELD_LABELS: Record<keyof QuickLeadFields, string> = {
  name: "Nome",
  phone: "WhatsApp",
  email: "E-mail",
  city: "Cidade",
  insuranceType: "Tipo de Seguro",
};

/** Nunca devolve o dado pessoal completo — apenas confirmação de que está no campo. */
function maskValue(field: keyof QuickLeadFields, value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (field === "name") return `${v.split(/\s+/)[0]} …`;
  if (field === "phone") {
    const d = v.replace(/\D/g, "");
    return `••••${d.slice(-4)}`;
  }
  if (field === "email") {
    const [, domain] = v.split("@");
    return domain ? `•••@${domain}` : "•••";
  }
  return v;
}

const QuickLeadFormImpl = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QuickLeadFields>({
    name: "",
    phone: "",
    email: "",
    city: "",
    insuranceType: "",
  });

  // Espelho do estado para leitura dentro do execute da ferramenta WebMCP.
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  useWebMcpTool(
    useMemo(
      () => ({
        name: "listar_tipos_de_seguro",
        description:
          "Lista os tipos de seguro realmente disponíveis no formulário de Cotação Express da Patro Seguros, com identificador e nome exibido. Não retorna preços, coberturas nem cálculos.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
        execute: () =>
          textResult({
            tipos: QUICK_LEAD_INSURANCE_TYPES.map((t) => ({ id: t.id, nome: t.label })),
            observacao:
              "Somente as opções do formulário atual. Preços e coberturas não são informados aqui.",
          }),
      }),
      [],
    ),
  );

  useWebMcpTool(
    useMemo(
      () => ({
        name: "preparar_solicitacao_cotacao",
        description:
          "Preenche o formulário de Cotação Express da Patro Seguros para revisão do visitante. NÃO envia a solicitação, não abre o WhatsApp nem o site de cotação online, não grava dados e não calcula cotação. O visitante precisa revisar e clicar no botão de envio do próprio formulário. Para Seguro Auto, o envio abre a cotação online imediata (SmartBroker) em vez do WhatsApp.",
        inputSchema: {
          type: "object",
          properties: {
            nome: {
              type: "string",
              description: "Nome completo do visitante (3 a 100 caracteres).",
              minLength: 3,
              maxLength: 100,
            },
            whatsapp: {
              type: "string",
              description: "WhatsApp com DDD, 10 ou 11 dígitos. Ex: (11) 99999-9999.",
              maxLength: 25,
            },
            cidade: {
              type: "string",
              description: "Cidade do visitante (obrigatório no envio, 2 a 80 caracteres).",
              minLength: 2,
              maxLength: 80,
            },
            tipo_de_seguro: {
              type: "string",
              description:
                "Identificador do tipo de seguro, conforme a ferramenta listar_tipos_de_seguro.",
              enum: [...QUICK_LEAD_INSURANCE_TYPE_IDS],
            },
            email: {
              type: "string",
              description: "E-mail do visitante (obrigatório no envio).",
              maxLength: 255,
            },
          },
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
        execute: (args: unknown, extra?: unknown) => {
          const signal = (extra as { signal?: AbortSignal } | undefined)?.signal;
          if (signal?.aborted) return textResult({ status: "cancelado" }, true);

          if (!args || typeof args !== "object" || Array.isArray(args)) {
            return textResult({ status: "erro", motivo: "Argumentos inválidos." }, true);
          }
          const raw = args as Record<string, unknown>;

          const allowed = ["nome", "whatsapp", "cidade", "tipo_de_seguro", "email"];
          const unknownKeys = Object.keys(raw).filter((k) => !allowed.includes(k));
          if (unknownKeys.length) {
            return textResult(
              { status: "erro", motivo: `Campos não suportados: ${unknownKeys.join(", ")}` },
              true,
            );
          }

          const asString = (v: unknown) => (typeof v === "string" ? v.trim() : "");
          const proposed: Partial<QuickLeadFields> = {};
          const invalid: string[] = [];

          for (const [key, field] of [
            ["nome", "name"],
            ["whatsapp", "phone"],
            ["cidade", "city"],
            ["email", "email"],
            ["tipo_de_seguro", "insuranceType"],
          ] as Array<[string, keyof QuickLeadFields]>) {
            if (raw[key] === undefined || raw[key] === null || raw[key] === "") continue;
            if (typeof raw[key] !== "string") {
              invalid.push(`${FIELD_LABELS[field]}: deve ser texto`);
              continue;
            }
            const value = asString(raw[key]);
            if (field === "insuranceType") {
              const id = resolveInsuranceTypeId(value);
              if (!id) {
                invalid.push(
                  `${FIELD_LABELS[field]}: use um dos identificadores ${QUICK_LEAD_INSURANCE_TYPE_IDS.join(", ")}`,
                );
                continue;
              }
              proposed.insuranceType = id;
              continue;
            }
            proposed[field] = value;
          }

          if (!Object.keys(proposed).length) {
            return textResult(
              { status: "erro", motivo: "Nenhum campo válido informado." },
              true,
            );
          }

          // Validação com o mesmo schema do envio manual (campos parciais permitidos).
          const current = formDataRef.current;
          const candidate = { ...current, ...proposed };
          const parsed = expressLeadSchema
            .partial()
            .safeParse(
              Object.fromEntries(
                Object.entries(candidate).filter(([, v]) => typeof v === "string" && v !== ""),
              ),
            );
          if (!parsed.success) invalid.push(firstZodMessage(parsed.error));

          if (invalid.length) {
            return textResult({ status: "erro_de_validacao", problemas: invalid }, true);
          }

          // Conflito: valor diferente já preenchido no formulário.
          const conflitos = (Object.keys(proposed) as Array<keyof QuickLeadFields>)
            .filter((f) => current[f].trim() !== "" && current[f].trim() !== proposed[f])
            .map((f) => ({
              campo: FIELD_LABELS[f],
              valor_atual: maskValue(f, current[f]),
            }));

          if (conflitos.length) {
            return textResult({
              status: "conflito",
              conflitos,
              proximo_passo:
                "O formulário já tem valores diferentes nesses campos. Peça ao visitante para revisar e ajustar manualmente; nada foi alterado.",
            });
          }

          if (signal?.aborted) return textResult({ status: "cancelado" }, true);

          setFormData((prev) => ({ ...prev, ...proposed }));

          const preenchidos = (Object.keys(proposed) as Array<keyof QuickLeadFields>).map((f) => ({
            campo: FIELD_LABELS[f],
            valor: maskValue(f, proposed[f] as string),
          }));
          const obrigatorios: Array<keyof QuickLeadFields> = ["name", "phone", "email", "city", "insuranceType"];
          const pendentes = obrigatorios
            .filter((f) => !(candidate[f] ?? "").trim())
            .map((f) => FIELD_LABELS[f]);

          return textResult({
            status: "preparado_para_revisao",
            campos_preenchidos: preenchidos,
            campos_pendentes: pendentes,
            enviado: false,
            proximo_passo:
              "Os dados estão visíveis e editáveis no formulário Cotação Express. Para Seguro Auto, o botão de envio abre a cotação online imediata; nos demais tipos, abre o WhatsApp. Nenhuma cotação foi calculada ou enviada.",
          });
        },
      }),
      [],
    ),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = expressLeadSchema.safeParse(formData);
    if (!parsed.success) {
      showValidationError(firstZodMessage(parsed.error));
      return;
    }

    setLoading(true);
    try {
      const { name, phone, email, city, insuranceType } = parsed.data;

      // Seguro Auto: cotação online imediata no SmartBroker, sem esperar 2 horas.
      if (insuranceType === "Auto") {
        trackCotacaoSubmit(insuranceType, { origin: "quick_lead_form_smartbroker" });
        const popup = window.open(SMARTBROKER_AUTO_URL, "_blank", "noopener,noreferrer");
        if (!popup) {
          toast.error("Não conseguimos abrir a cotação online automaticamente.", {
            duration: 10000,
            action: {
              label: "Abrir cotação online",
              onClick: () => window.open(SMARTBROKER_AUTO_URL, "_blank", "noopener,noreferrer"),
            },
          });
          return;
        }
        toast.success("Abrindo sua cotação online do Seguro Auto — leva poucos minutos.");
        setFormData({ name: "", phone: "", email: "", city: "", insuranceType: "" });
        return;
      }

      const msg = `Olá, meu nome é ${name} (${phone}). Sou de ${city} e gostaria de uma cotação de ${insuranceType}.\nE-mail: ${email}`;

      const popup = window.open(
        `https://wa.me/551151997500?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer",
      );
      if (!popup) {
        showFriendlyError(
          "Não conseguimos abrir o WhatsApp automaticamente. Toque no botão abaixo para falar com a gente.",
          { whatsappMessage: msg },
        );
        return;
      }

      trackCotacaoSubmit(insuranceType, { origin: "quick_lead_form_home" });
      toast.success("Recebemos seu contato! Um consultor responderá em até 2 horas.");
      setFormData({ name: "", phone: "", email: "", city: "", insuranceType: "" });
    } catch (err) {
      console.error("QuickLeadForm submit failed", err);
      showFriendlyError();
    } finally {
      setLoading(false);
    }
  };

  const cidadePreview = formData.city?.trim() || "Guarulhos";
  const whatsappMessage = `Olá, meu nome é ${formData.name || '...'}. Sou de ${cidadePreview} e gostaria de uma cotação de ${formData.insuranceType || '...'}.`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 -mt-12 relative z-20">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          <div className="text-center lg:text-left shrink-0 lg:max-w-[220px] lg:pt-1">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Cotação Express</span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">Resposta em até 2 horas</h2>
            <p className="text-sm text-slate-500 mt-2">Preencha 5 campos e receba propostas no WhatsApp.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="Seu nome"
                placeholder="Seu nome completo"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="WhatsApp com DDD"
                inputMode="tel"
                placeholder="WhatsApp (DDD)"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="Seu e-mail"
                type="email"
                placeholder="Seu e-mail"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="Cidade"
                placeholder="Cidade (ex: Guarulhos)"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="relative">
              <label
                id="tipo-seguro-label"
                htmlFor="tipo-seguro"
                className="block text-xs font-medium text-slate-600 mb-1"
              >
                Tipo de Seguro
              </label>
              <Select
                value={formData.insuranceType}
                onValueChange={(v) => setFormData({ ...formData, insuranceType: v })}
              >
                <SelectTrigger
                  id="tipo-seguro"
                  aria-labelledby="tipo-seguro-label"
                  aria-label="Selecione o tipo de seguro"
                  className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl pl-10 relative"
                >
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" aria-hidden="true" />
                  <SelectValue placeholder="Selecione o tipo de seguro" />
                </SelectTrigger>
                <SelectContent>
                  {QUICK_LEAD_INSURANCE_TYPES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full font-bold text-base bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-500/20 rounded-xl"
              >
                {loading ? "Enviando..." : (
                  <span className="flex items-center gap-2">
                    Receber Cotação em 2 Horas <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Dados protegidos pela LGPD
                </span>
                <span className="italic line-clamp-1 max-w-[60%] text-right">"{whatsappMessage}"</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ao enviar, você concorda com a nossa{" "}
                <a href="/politica-privacidade" target="_blank" rel="noreferrer" className="underline hover:text-slate-700">Política de Privacidade</a>{" "}
                e os{" "}
                <a href="/termos-de-uso" target="_blank" rel="noreferrer" className="underline hover:text-slate-700">Termos de Uso</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// memo: blindagem defensiva contra re-renders do pai (Index). O componente
// só re-renderiza quando seu próprio state muda (form fields).
export const QuickLeadForm = memo(QuickLeadFormImpl);