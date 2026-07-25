/**
 * Fonte única da verdade dos dados institucionais da Patro Seguros.
 * NENHUM outro arquivo do projeto deve conter telefone, endereço, CNPJ ou
 * razão social escritos manualmente — importe daqui.
 *
 * Ao atualizar qualquer valor, o site inteiro é propagado automaticamente
 * (Footer, LP, WhatsApp, JSON-LD, formulários, e-mails).
 */
export const EMPRESA = {
  nomeFantasia: "Patro Seguros",
  razaoSocial: "Patro Corretora de Seguros LTDA",
  cnpj: "41.641.558/0001-33",
  susep: "212113511",
  fundacao: "2021",
  telefone: "(11) 5199-7500",
  telefoneE164: "+551151997500",
  whatsapp: "+551151997500",
  email: "contato@patroseguros.com.br",
  endereco: {
    logradouro: "Avenida Salgado Filho",
    numero: "2120",
    complemento: "Sala 219 — Edifício Via Alameda",
    bairro: "Maia",
    cidade: "Guarulhos",
    estado: "SP",
    estadoSigla: "SP",
    // TODO: confirmar CEP exato do Edifício Via Alameda com um comprovante recente.
    cep: "07115-000",
    pais: "BR",
  },
  geo: {
    // TODO: confirmar coordenadas exatas no Google Maps.
    latitude: -23.4611,
    longitude: -46.5334,
  },
  dominioCanonico: "https://www.patroseguros.com.br",
  horario: "Segunda a sexta, das 9h às 18h",
  posicionamento:
    "Fundada em 2021 por profissionais com mais de 20 anos de experiência no mercado segurador",
} as const;

/** Somente dígitos do WhatsApp (formato wa.me). Ex.: "551151997500". */
export const WHATSAPP_DIGITS = EMPRESA.whatsapp.replace(/\D/g, "");

/** Somente dígitos do telefone (para href="tel:"). Ex.: "1151997500". */
export const TELEFONE_DIGITS = EMPRESA.telefone.replace(/\D/g, "");

/** Endereço em uma linha (footer, JSON-LD). */
export const ENDERECO_LINHA = `${EMPRESA.endereco.logradouro}, ${EMPRESA.endereco.numero} — ${EMPRESA.endereco.complemento} — ${EMPRESA.endereco.bairro}, ${EMPRESA.endereco.cidade}/${EMPRESA.endereco.estadoSigla}`;

export default EMPRESA;