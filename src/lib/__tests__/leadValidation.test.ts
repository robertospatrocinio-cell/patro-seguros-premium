import { describe, it, expect } from "vitest";
import {
  cotacaoSchema,
  referralSchema,
  ebookLeadSchema,
  firstZodMessage,
} from "@/lib/leadValidation";

/** Helper: roda parse e retorna a primeira mensagem de erro (ou null se válido). */
const firstError = (result: { success: boolean; error?: { errors: { message: string }[] } }) =>
  result.success ? null : result.error!.errors[0]?.message ?? null;

describe("cotacaoSchema", () => {
  const valid = {
    name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 99999-9999",
    insuranceType: "Seguro Auto",
    message: "Quero cotar meu carro.",
  };

  it("aceita payload válido", () => {
    expect(cotacaoSchema.safeParse(valid).success).toBe(true);
  });

  it("nome curto retorna mensagem PT-BR padronizada", () => {
    const r = cotacaoSchema.safeParse({ ...valid, name: "Jo" });
    expect(firstError(r)).toBe("Por favor, digite seu nome completo");
  });

  it("e-mail inválido retorna mensagem PT-BR padronizada", () => {
    const r = cotacaoSchema.safeParse({ ...valid, email: "nao-e-email" });
    expect(firstError(r)).toBe("Formato de e-mail inválido. Ex: nome@email.com");
  });

  it("telefone sem DDD retorna mensagem PT-BR padronizada", () => {
    const r = cotacaoSchema.safeParse({ ...valid, phone: "99999" });
    expect(firstError(r)).toBe("Informe o DDD e o número completo. Ex: (11) 99999-9999");
  });

  it("tipo de seguro vazio retorna mensagem PT-BR padronizada", () => {
    const r = cotacaoSchema.safeParse({ ...valid, insuranceType: "" });
    expect(firstError(r)).toBe("Escolha o tipo de seguro que você precisa");
  });

  it("mensagem acima de 1000 caracteres é rejeitada", () => {
    const r = cotacaoSchema.safeParse({ ...valid, message: "a".repeat(1001) });
    expect(firstError(r)).toBe("Mensagem muito longa (máx. 1000 caracteres)");
  });
});

describe("referralSchema", () => {
  const valid = {
    nomeCliente: "Cliente Teste",
    telefoneCliente: "(11) 98888-7777",
    nomeIndicado: "Amigo Indicado",
    telefoneIndicado: "(11) 97777-6666",
    tipoSeguro: "Seguro Vida",
    mensagem: "",
  };

  it("aceita payload válido", () => {
    expect(referralSchema.safeParse(valid).success).toBe(true);
  });

  it("aceita mensagem ausente (default vazio)", () => {
    const { mensagem: _omit, ...rest } = valid;
    const r = referralSchema.safeParse(rest);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.mensagem).toBe("");
  });

  it("nome do indicado curto retorna mensagem PT-BR padronizada", () => {
    const r = referralSchema.safeParse({ ...valid, nomeIndicado: "Al" });
    expect(firstError(r)).toBe("Por favor, digite seu nome completo");
  });

  it("telefone do indicado inválido retorna mensagem PT-BR padronizada", () => {
    const r = referralSchema.safeParse({ ...valid, telefoneIndicado: "123" });
    expect(firstError(r)).toBe("Informe o DDD e o número completo. Ex: (11) 99999-9999");
  });

  it("tipo de seguro vazio retorna mensagem PT-BR padronizada", () => {
    const r = referralSchema.safeParse({ ...valid, tipoSeguro: "" });
    expect(firstError(r)).toBe("Escolha o tipo de seguro que você precisa");
  });

  it("mensagem acima de 500 caracteres é rejeitada", () => {
    const r = referralSchema.safeParse({ ...valid, mensagem: "x".repeat(501) });
    expect(firstError(r)).toBe("Mensagem muito longa (máx. 500 caracteres)");
  });
});

describe("ebookLeadSchema", () => {
  const valid = {
    name: "Joana Souza",
    email: "joana@email.com",
    whatsapp: "(11) 99999-8888",
  };

  it("aceita payload válido", () => {
    expect(ebookLeadSchema.safeParse(valid).success).toBe(true);
  });

  it("rejeita WhatsApp fixo (sem 9 na 3ª posição)", () => {
    const r = ebookLeadSchema.safeParse({ ...valid, whatsapp: "(11) 3333-4444" });
    expect(firstError(r)).toBe("WhatsApp inválido. Use o formato (11) 9xxxx-xxxx");
  });

  it("rejeita WhatsApp com menos de 11 dígitos", () => {
    const r = ebookLeadSchema.safeParse({ ...valid, whatsapp: "(11) 9999-8888" });
    expect(firstError(r)).toBe("WhatsApp inválido. Use o formato (11) 9xxxx-xxxx");
  });

  it("e-mail inválido retorna mensagem PT-BR padronizada", () => {
    const r = ebookLeadSchema.safeParse({ ...valid, email: "sem-arroba" });
    expect(firstError(r)).toBe("Formato de e-mail inválido. Ex: nome@email.com");
  });

  it("nome curto retorna mensagem PT-BR padronizada", () => {
    const r = ebookLeadSchema.safeParse({ ...valid, name: "Jo" });
    expect(firstError(r)).toBe("Por favor, digite seu nome completo");
  });
});

describe("firstZodMessage", () => {
  it("retorna a primeira mensagem de erro de um ZodError", () => {
    const r = cotacaoSchema.safeParse({
      name: "",
      email: "x",
      phone: "",
      insuranceType: "",
      message: "",
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(firstZodMessage(r.error)).toBe("Por favor, digite seu nome completo");
    }
  });

  it("retorna fallback amigável quando não há mensagens", () => {
    const fakeError = { errors: [] } as unknown as Parameters<typeof firstZodMessage>[0];
    expect(firstZodMessage(fakeError)).toBe("Verifique os campos e tente novamente.");
  });
});