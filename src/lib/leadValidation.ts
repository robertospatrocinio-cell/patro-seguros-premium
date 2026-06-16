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

/** Retorna a primeira mensagem de erro de um `ZodError`. */
export function firstZodMessage(error: z.ZodError): string {
  return error.errors[0]?.message ?? "Verifique os campos e tente novamente.";
}