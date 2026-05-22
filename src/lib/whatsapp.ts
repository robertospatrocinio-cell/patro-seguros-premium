export const normalizeWhatsAppPhone = (phone?: string | null) => {
  let digits = phone?.replace(/\D/g, "") ?? "";

  if (!digits) return "";

  if (digits.startsWith("0") && (digits.length === 11 || digits.length === 12)) {
    digits = digits.slice(1);
  }

  if (digits.startsWith("55") && digits.length >= 12) {
    return digits;
  }

  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }

  return digits;
};

export const getWhatsAppUrl = (phone?: string | null) => {
  const normalizedPhone = normalizeWhatsAppPhone(phone);
  return normalizedPhone ? `https://api.whatsapp.com/send?phone=${normalizedPhone}` : "";
};