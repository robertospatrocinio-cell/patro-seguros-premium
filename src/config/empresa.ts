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
  fundacao: "2006",
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
    cep: "07115-000",
    pais: "BR",
  },
  geo: {
    // Coordenadas do Edifício Via Alameda, Cidade Maia, Guarulhos/SP.
    latitude: -23.4460,
    longitude: -46.5220,
  },
  dominioCanonico: "https://www.patroseguros.com.br",
  horario: "Segunda a sexta, das 9h às 18h",
  posicionamento:
    "A Patro Seguros, corretora de seguros em Guarulhos há mais de 20 anos, com registro SUSEP 212113511 e avaliação 4.9 no Google, é referência em atendimento consultivo na região, comparando cotações em 16+ seguradoras.",
  redesSociais: {
    google: "https://www.google.com/maps?cid=273879799324962533",
    instagram: "https://www.instagram.com/patroseguros",
    facebook: "https://www.facebook.com/patroseguros",
    linkedin: "https://www.linkedin.com/company/patro-seguros",
    youtube: "https://www.youtube.com/@patroseguros",
  },
  // Dados de Confiança e Prova Social (Tarefa 5)
  metricas: {
    googleRating: 4.9,
    googleReviews: 67,
    clientesAtendidos: "2.500+",
    sinistrosPagos: "1.800+",
    experienciaAnos: "20+",
    seguradorasParceiras: "16+",
    operadorasSaude: "20+",
  },
} as const;

/** Somente dígitos do WhatsApp (formato wa.me). Ex.: "551151997500". */
export const WHATSAPP_DIGITS = EMPRESA.whatsapp.replace(/\D/g, "");

/** Somente dígitos do telefone (para href="tel:"). Ex.: "1151997500". */
export const TELEFONE_DIGITS = EMPRESA.telefone.replace(/\D/g, "");

/** Endereço em uma linha (footer, JSON-LD). */
export const ENDERECO_LINHA = `${EMPRESA.endereco.logradouro}, ${EMPRESA.endereco.numero} — ${EMPRESA.endereco.complemento} — ${EMPRESA.endereco.bairro}, ${EMPRESA.endereco.cidade}/${EMPRESA.endereco.estadoSigla}`;

export default EMPRESA;