export interface InsurerSupportContact {
  insurer: string;
  service: string;
  phones: string[];
  hours: string;
  sourceUrl: string;
}

/** Telefones verificados em páginas oficiais das seguradoras em 23/09/2026. */
export const INSURER_SUPPORT_CONTACTS: InsurerSupportContact[] = [
  { insurer: "Porto Seguro", service: "Assistência Auto e serviços", phones: ["(11) 333-76786", "4004 76786", "0300 337 6786"], hours: "Consulte as condições do seu produto", sourceUrl: "https://www.portoseguro.com.br/fale-conosco/contatos/telefones-e-sac" },
  { insurer: "Bradesco Seguros", service: "Central de Relacionamento Auto", phones: ["4004 0237", "0800 237 0237"], hours: "24 horas", sourceUrl: "https://www.bradescoseguros.com.br/clientes/atendimento/telefones-bradesco-seguros" },
  { insurer: "Allianz", service: "Assistência Auto", phones: ["0800 130 700"], hours: "24 horas", sourceUrl: "https://www.allianz.com.br/contato.html" },
  { insurer: "Tokio Marine", service: "Assistência Auto e aviso de sinistro", phones: ["0800 31 86546"], hours: "24 horas", sourceUrl: "https://www.tokiomarine.com.br/assistencia-24h" },
  { insurer: "HDI", service: "Assistência e abertura de sinistro", phones: ["3003 5390", "0800 434 4340"], hours: "Segunda a sexta, das 8h às 19h", sourceUrl: "https://www.hdiseguros.com.br/contato/telefones-uteis" },
  { insurer: "Azul Seguros", service: "Sinistro e assistência", phones: ["4004 3700", "0300 123 2985", "0800 703 0203"], hours: "24 horas", sourceUrl: "https://www.azulseguros.com.br/fale-com-a-azul/" },
  { insurer: "Sompo", service: "Central de Atendimento", phones: ["(11) 3460-9000", "0800 77 00 179"], hours: "Consulte o horário no canal oficial", sourceUrl: "https://sompo.com.br/contato" },
  { insurer: "Suhai", service: "Assistência 24h", phones: ["0800 327 8424"], hours: "24 horas", sourceUrl: "https://suhaiseguradora.com/contato/" },
  { insurer: "Zurich", service: "Central de Atendimento", phones: ["4020 4848", "0800 285 4141"], hours: "Segunda a sexta, 8h às 20h; sábado, 8h às 14h", sourceUrl: "https://www.zurich.com.br/atendimento" },
];