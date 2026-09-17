import { z } from "zod";

/**
 * Schemas zod compartilhados para formulários de captura de leads.
 * Mensagens em português, tom acolhedor.
 */

export const nameSchema = z
  .string()
  .trim()
  .min(3, "Por favor, digite seu nome completo")
  .max(100, "Nome muito longo (máx. 100 caracteres)");

export const emailSchema = z
  .string()
  .trim()
  .email("Formato de e-mail inválido. Ex: nome@email.com")
  .max(255, "E-mail muito longo");

/** Aceita 10 ou 11 dígitos (com ou sem máscara). */
export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 11;
  }, "Informe o DDD e o número completo. Ex: (11) 99999-9999");

/** WhatsApp celular brasileiro: DDD + 9 + 8 dígitos. */
export const whatsappSchema = z
  .string()
  .trim()
  .refine((v) => {
    const d = v.replace(/\D/g, "");
    return d.length === 11 && d[2] === "9";
  }, "WhatsApp inválido. Use o formato (11) 9xxxx-xxxx");

export const insuranceTypeSchema = z
  .string()
  .trim()
  .min(1, "Escolha o tipo de seguro que você precisa");

export const messageSchema = z
  .string()
  .trim()
  .max(1000, "Mensagem muito longa (máx. 1000 caracteres)")
  .optional()
  .or(z.literal(""));

export const quickLeadSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  insuranceType: insuranceTypeSchema,
});

export type QuickLeadInput = z.infer<typeof quickLeadSchema>;

/** Cotação Express na home — nome completo, WhatsApp, e-mail, cidade e tipo de seguro são obrigatórios. */
export const expressLeadSchema = z.object({
  name: nameSchema.refine(
    (v) => v.trim().split(/\s+/).length >= 2,
    "Informe seu nome e sobrenome",
  ),
  phone: phoneSchema,
  email: emailSchema,
  city: z.string().trim().min(2, "Informe sua cidade").max(80, "Cidade muito longa"),
  insuranceType: insuranceTypeSchema,
});
export type ExpressLeadInput = z.infer<typeof expressLeadSchema>;

/** Cotação completa (página /cotacao). */
export const cotacaoSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  insuranceType: insuranceTypeSchema,
  message: z.string().trim().max(1000, "Mensagem muito longa (máx. 1000 caracteres)"),
});
export type CotacaoInput = z.infer<typeof cotacaoSchema>;

/** Indique um amigo. */
export const referralSchema = z.object({
  nomeCliente: nameSchema,
  telefoneCliente: phoneSchema,
  nomeIndicado: nameSchema,
  telefoneIndicado: phoneSchema,
  tipoSeguro: insuranceTypeSchema,
  mensagem: z.string().trim().max(500, "Mensagem muito longa (máx. 500 caracteres)").optional().default(""),
});
export type ReferralInput = z.infer<typeof referralSchema>;

/** E-book / lead magnet com e-mail + WhatsApp formatado. */
export const ebookLeadSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  whatsapp: whatsappSchema,
});
export type EbookLeadInput = z.infer<typeof ebookLeadSchema>;

/** Retorna a primeira mensagem de erro de um `ZodError`. */
export function firstZodMessage(error: z.ZodError): string {
  return error.errors[0]?.message ?? "Verifique os campos e tente novamente.";
}