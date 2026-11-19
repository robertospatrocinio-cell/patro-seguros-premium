/** Dados oficiais informados pela Patro Seguros; fonte única para NAP e identidade. */
export const COMPANY = {
  nomeFantasia: "Patro Seguros",
  razaoSocial: "Patro Corretora de Seguros Ltda",
  cnpj: "41.641.558/0001-33",
  susep: "212113511",
  fundacao: "2021",
  dominioCanonico: "https://www.patroseguros.com.br",
  logoPath: "/images/logo-full.webp",
  telefone: "(11) 5199-7500",
  telefoneE164: "+551151997500",
  telefoneSchema: "+55-11-5199-7500",
  whatsapp: "+551151997500",
  email: "contato@patroseguros.com.br",
  endereco: {
    logradouro: "Av. Salgado Filho",
    numero: "2120",
    complemento: "Sl 219",
    bairro: "Cidade Maia",
    cidade: "Guarulhos",
    estado: "São Paulo",
    estadoSigla: "SP",
    cep: "07115-000",
    pais: "Brasil",
  },
  enderecoCompleto: "Av. Salgado Filho, 2120 - Sl 219 - Cidade Maia, Guarulhos - SP, 07115-000",
  horario: "Segunda a Sexta, das 08h30 às 18h00 (Sábado e Domingo: Fechado)",
  horarioSchema: {
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    abre: "08:30",
    fecha: "18:00",
  },
  slaRetorno: "Retorno em até 2 horas úteis",
  posicionamento:
    "A Patro Seguros é uma corretora sediada em Guarulhos, fundada em 2021 por profissionais com mais de 20 anos de experiência no mercado de seguros, com registro SUSEP 212113511. A empresa atende pessoas e empresas em Guarulhos, na Grande São Paulo e em outras regiões do Brasil. Comparamos cotações em 16+ seguradoras para buscar a combinação mais adequada entre cobertura, assistência e preço.",
  // Dados legados preservados para os consumidores existentes. Não são publicados
  // no InsuranceAgency: as coordenadas e redes não foram revalidadas neste trabalho.
  geo: { latitude: -23.4460, longitude: -46.5220 },
  redesSociais: {
    google: "https://www.google.com/maps?cid=273879799324962533",
    instagram: "https://www.instagram.com/patroseguros",
    facebook: "https://www.facebook.com/patroseguros",
    linkedin: "https://www.linkedin.com/company/patro-seguros",
    youtube: "https://www.youtube.com/@patroseguros",
  },
  socios: {
    roberto: { nome: "Roberto Patrocínio", linkedin: "https://www.linkedin.com/in/roberto-patrocinio" },
    sandra: { nome: "Sandra Patrocínio", linkedin: "https://www.linkedin.com/in/sandra-patrocinio" },
  },
  // Avaliação e quantidade confirmadas pelo responsável neste pedido; sem consulta automática ao Google.
  metricas: {
    googleRating: 4.9,
    googleReviews: 70,
    clientesAtendidos: "2.500+",
    experienciaAnos: "20+",
    seguradorasParceiras: "16+",
    operadorasSaude: "20+",
  },
} as const;

/** Compatibilidade com os consumidores anteriores, sem uma segunda cópia dos dados. */
export const EMPRESA = COMPANY;
export const WHATSAPP_DIGITS = COMPANY.whatsapp.replace(/\D/g, "");
export const WHATSAPP_URL_BASE = `https://wa.me/${WHATSAPP_DIGITS}`;
export const TELEFONE_DIGITS = COMPANY.telefone.replace(/\D/g, "");
export const NAP_LINHA_1 = `${COMPANY.endereco.logradouro}, ${COMPANY.endereco.numero} - ${COMPANY.endereco.complemento}`;
export const NAP_LINHA_2 = `${COMPANY.endereco.bairro}, ${COMPANY.endereco.cidade} - ${COMPANY.endereco.estadoSigla}, ${COMPANY.endereco.cep}`;
export const NAP_STREET_ADDRESS = `${NAP_LINHA_1} - ${COMPANY.endereco.bairro}`;
export const ENDERECO_LINHA = COMPANY.enderecoCompleto;
export const GOOGLE_MAPS_URL = COMPANY.redesSociais.google;

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": `${COMPANY.dominioCanonico}/#organization`,
  name: COMPANY.nomeFantasia,
  legalName: COMPANY.razaoSocial,
  url: COMPANY.dominioCanonico,
  logo: `${COMPANY.dominioCanonico}${COMPANY.logoPath}`,
  telephone: COMPANY.telefoneSchema,
  email: COMPANY.email,
  taxID: COMPANY.cnpj,
  identifier: { "@type": "PropertyValue", name: "Registro SUSEP", value: COMPANY.susep },
  address: {
    "@type": "PostalAddress",
    streetAddress: NAP_STREET_ADDRESS,
    addressLocality: COMPANY.endereco.cidade,
    addressRegion: COMPANY.endereco.estadoSigla,
    postalCode: COMPANY.endereco.cep,
    addressCountry: "BR",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: COMPANY.horarioSchema.dias,
    opens: COMPANY.horarioSchema.abre,
    closes: COMPANY.horarioSchema.fecha,
  }],
  areaServed: [
    { "@type": "City", name: COMPANY.endereco.cidade },
    { "@type": "State", name: COMPANY.endereco.estado },
    { "@type": "Country", name: COMPANY.endereco.pais },
  ],
};

export default COMPANY;
