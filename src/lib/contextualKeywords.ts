/**
 * Contextual keyword → route map.
 *
 * Used by <SmartText/> to convert the FIRST occurrence of each keyword in the
 * narrative content of an insurance page into an internal <Link>. Goal: deeper
 * topical interlinking and improved relevance signals for Google.
 *
 * Matching rules (applied in <SmartText/>):
 *  - case-insensitive, whole-word match
 *  - keep the original capitalization in the rendered text
 *  - longest keywords matched first to avoid partial overlaps
 *  - skip if the link target equals the current page (no self-links)
 *  - each keyword is linked at most ONCE per content block
 */

export interface KeywordLink {
  keyword: string;
  href: string;
  title?: string;
}

export const CONTEXTUAL_KEYWORDS: KeywordLink[] = [
  // Veículos
  { keyword: "seguro auto", href: "/seguro-auto", title: "Seguro Auto" },
  { keyword: "seguro de carro", href: "/seguro-auto", title: "Seguro Auto" },
  { keyword: "seguro do carro", href: "/seguro-auto", title: "Seguro Auto" },
  { keyword: "seguro para carro", href: "/seguro-auto", title: "Seguro Auto" },
  { keyword: "seguro automotivo", href: "/seguro-auto", title: "Seguro Auto" },
  { keyword: "seguro de moto", href: "/seguro-moto", title: "Seguro Moto" },
  { keyword: "seguro moto", href: "/seguro-moto", title: "Seguro Moto" },
  { keyword: "seguro caminhão", href: "/seguro-caminhao", title: "Seguro Caminhão" },
  { keyword: "seguro de caminhão", href: "/seguro-caminhao", title: "Seguro Caminhão" },
  { keyword: "seguro frota", href: "/seguro-frota", title: "Seguro Frota" },
  { keyword: "seguro de frota", href: "/seguro-frota", title: "Seguro Frota" },
  { keyword: "motorista de app", href: "/seguro-motorista-app", title: "Seguro Motorista de App" },
  { keyword: "seguro bike", href: "/seguro-bike", title: "Seguro Bike" },
  { keyword: "seguro de bike", href: "/seguro-bike", title: "Seguro Bike" },
  { keyword: "carta verde", href: "/seguro-carta-verde", title: "Seguro Carta Verde" },
  { keyword: "seguro embarcações", href: "/seguro-embarcacoes", title: "Seguro Embarcações" },
  { keyword: "seguro de embarcações", href: "/seguro-embarcacoes", title: "Seguro Embarcações" },
  { keyword: "seguro jet ski", href: "/seguro-jetski", title: "Seguro Jet Ski" },
  { keyword: "seguro aviões", href: "/seguro-avioes", title: "Seguro Aviões" },
  { keyword: "seguro helicópteros", href: "/seguro-helicopteros", title: "Seguro Helicópteros" },

  // Pessoa, Vida e Saúde
  { keyword: "seguro de vida", href: "/seguro-vida", title: "Seguro de Vida" },
  { keyword: "seguro vida pme", href: "/seguro-vida-pme", title: "Seguro Vida PME" },
  { keyword: "seguro de vida em grupo", href: "/seguro-vida-pme", title: "Seguro Vida em Grupo" },
  { keyword: "plano de saúde empresarial", href: "/plano-saude-empresarial", title: "Plano de Saúde Empresarial" },
  { keyword: "planos de saúde", href: "/planos-de-saude", title: "Planos de Saúde" },
  { keyword: "plano de saúde", href: "/planos-de-saude", title: "Plano de Saúde" },
  { keyword: "seguro saúde", href: "/seguro-saude", title: "Seguro Saúde" },
  { keyword: "seguro odontológico", href: "/seguro-odonto", title: "Seguro Odontológico" },
  { keyword: "plano odontológico", href: "/seguro-odonto", title: "Plano Odontológico" },
  { keyword: "acidentes pessoais", href: "/seguro-acidentes-pessoais", title: "Seguro Acidentes Pessoais" },
  { keyword: "seguro funeral", href: "/seguro-funeral", title: "Seguro Funeral" },
  { keyword: "seguro decesso", href: "/seguro-decesso", title: "Seguro Decesso" },
  { keyword: "plano pet", href: "/plano-pet", title: "Plano Pet" },
  { keyword: "seguro viagem", href: "/seguro-viagem", title: "Seguro Viagem" },
  { keyword: "seguro de viagem", href: "/seguro-viagem", title: "Seguro Viagem" },
  { keyword: "previdência privada", href: "/previdencia-privada", title: "Previdência Privada" },

  // Patrimônio
  { keyword: "seguro residencial", href: "/seguro-residencial", title: "Seguro Residencial" },
  { keyword: "seguro de residência", href: "/seguro-residencial", title: "Seguro Residencial" },
  { keyword: "seguro condomínio", href: "/seguro-condominio", title: "Seguro Condomínio" },
  { keyword: "seguro de condomínio", href: "/seguro-condominio", title: "Seguro Condomínio" },
  { keyword: "fiança locatícia", href: "/seguro-fianca-locaticia", title: "Seguro Fiança Locatícia" },
  { keyword: "seguro fiança", href: "/seguro-fianca", title: "Seguro Fiança" },
  { keyword: "seguro imobiliário", href: "/seguro-imobiliario", title: "Seguro Imobiliário" },
  { keyword: "placa solar", href: "/seguro-placa-solar", title: "Seguro Placa Solar" },
  { keyword: "painel solar", href: "/seguro-placa-solar", title: "Seguro Placa Solar" },
  { keyword: "seguro celular", href: "/seguro-celular", title: "Seguro Celular" },
  { keyword: "seguro de celular", href: "/seguro-celular", title: "Seguro Celular" },

  // Empresarial
  { keyword: "seguro empresarial", href: "/seguro-empresarial", title: "Seguro Empresarial" },
  { keyword: "galpões industriais", href: "/seguro-galpoes-industriais", title: "Seguro de Galpões Industriais" },
  { keyword: "seguro de galpão", href: "/seguro-galpoes-industriais", title: "Seguro de Galpões Industriais" },
  { keyword: "lojas em shopping", href: "/seguro-lojas-shopping", title: "Seguro Lojas em Shopping" },
  { keyword: "máquinas industriais", href: "/seguro-maquinas-industriais", title: "Seguro de Máquinas Industriais" },
  { keyword: "linha amarela", href: "/seguro-maquinas-linha-amarela", title: "Seguro Linha Amarela" },
  { keyword: "seguro de máquinas", href: "/seguro-maquinas", title: "Seguro de Máquinas" },
  { keyword: "seguro de transporte", href: "/seguro-transporte", title: "Seguro de Transporte" },
  { keyword: "seguro transporte", href: "/seguro-transporte", title: "Seguro de Transporte" },
  { keyword: "seguro de armazenagem", href: "/seguro-armazenagem", title: "Seguro de Armazenagem" },
  { keyword: "seguro engenharia", href: "/seguro-engenharia", title: "Seguro Engenharia" },
  { keyword: "riscos de engenharia", href: "/seguro-engenharia", title: "Seguro Engenharia" },
  { keyword: "seguro garantia", href: "/seguro-garantia", title: "Seguro Garantia" },
  { keyword: "seguro cyber", href: "/seguro-cyber", title: "Seguro Cyber" },
  { keyword: "seguro cibernético", href: "/seguro-cyber", title: "Seguro Cyber" },
  { keyword: "seguro estagiário", href: "/seguro-estagiario", title: "Seguro Estagiário" },
  { keyword: "seguro ambiental", href: "/seguro-ambiental", title: "Seguro Ambiental" },

  // Agro
  { keyword: "seguro rural", href: "/seguro-rural", title: "Seguro Rural" },
  { keyword: "propriedade rural", href: "/seguro-propriedade-rural", title: "Seguro Propriedade Rural" },
  { keyword: "seguro pecuário", href: "/seguro-pecuario", title: "Seguro Pecuário" },
  { keyword: "seguro granja", href: "/seguro-granja", title: "Seguro Granja" },
  { keyword: "seguro café", href: "/seguro-cafe", title: "Seguro Café" },
  { keyword: "seguro geada", href: "/seguro-geada", title: "Seguro Geada" },
  { keyword: "drone agrícola", href: "/seguro-drone-agricola", title: "Seguro Drone Agrícola" },
  { keyword: "máquinas agrícolas", href: "/seguro-maquinas-agricolas", title: "Seguro Máquinas Agrícolas" },
  { keyword: "equipamentos agrícolas", href: "/seguro-equipamentos-agricolas", title: "Seguro Equipamentos Agrícolas" },
  { keyword: "transporte agro", href: "/seguro-transporte-agro", title: "Seguro Transporte Agro" },

  // Responsabilidade Civil
  { keyword: "responsabilidade civil profissional", href: "/seguro-rc-profissional", title: "RC Profissional" },
  { keyword: "rc profissional", href: "/seguro-rc-profissional", title: "RC Profissional" },
  { keyword: "rc médicos", href: "/seguro-rc-medicos", title: "RC Médicos" },
  { keyword: "responsabilidade civil médica", href: "/seguro-rc-medicos", title: "RC Médicos" },
  { keyword: "rc dentistas", href: "/seguro-rc-dentistas", title: "RC Dentistas" },
  { keyword: "rc veterinários", href: "/seguro-rc-veterinarios", title: "RC Veterinários" },
  { keyword: "rc advogados", href: "/seguro-rc-advogados", title: "RC Advogados" },
  { keyword: "rc engenheiros", href: "/seguro-rc-engenheiros", title: "RC Engenheiros" },
  { keyword: "d&o", href: "/seguro-rc-executivos", title: "Seguro D&O Executivos" },
  { keyword: "rc executivos", href: "/seguro-rc-executivos", title: "RC Executivos" },
  { keyword: "rc obras", href: "/seguro-rc-obras", title: "RC Obras" },
  { keyword: "rc eventos", href: "/seguro-rc-eventos", title: "RC Eventos" },
  { keyword: "responsabilidade civil", href: "/seguro-rc", title: "Seguro RC Geral" },

  // Consórcio
  { keyword: "consórcio de carro", href: "/consorcio-carro", title: "Consórcio de Carro" },
  { keyword: "consórcio de imóveis", href: "/consorcio-imoveis", title: "Consórcio de Imóveis" },
  { keyword: "consórcio de imóvel", href: "/consorcio-imoveis", title: "Consórcio de Imóveis" },
  { keyword: "veículos pesados", href: "/consorcio-veiculos-pesados", title: "Consórcio Veículos Pesados" },
  { keyword: "consórcio", href: "/consorcio", title: "Consórcio" },

  // Local Guarulhos
  { keyword: "corretora de seguros em guarulhos", href: "/corretora-seguros-guarulhos", title: "Corretora de Seguros em Guarulhos" },
  { keyword: "corretora em guarulhos", href: "/corretora-seguros-guarulhos", title: "Corretora em Guarulhos" },
  { keyword: "seguros em guarulhos", href: "/seguros-em-guarulhos", title: "Seguros em Guarulhos" },
  { keyword: "cidade maia", href: "/seguros-shopping-maia-cidade-maia-guarulhos", title: "Seguros Cidade Maia" },
  { keyword: "shopping maia", href: "/seguros-shopping-maia-cidade-maia-guarulhos", title: "Seguros Shopping Maia" },
  { keyword: "vila augusta", href: "/seguro-auto-vila-augusta", title: "Seguros Vila Augusta" },
  { keyword: "cumbica", href: "/seguro-empresarial-cumbica", title: "Seguros Cumbica" },
  { keyword: "jardim maia", href: "/seguro-residencial-jardim-maia", title: "Seguros Jardim Maia" },
  { keyword: "bonsucesso", href: "/seguro-empresarial-bonsucesso", title: "Seguros Bonsucesso" },
  { keyword: "pimentas", href: "/seguro-empresarial-pimentas", title: "Seguros Pimentas" },
  { keyword: "gopouva", href: "/seguro-residencial-gopouva-guarulhos", title: "Seguros Gopouva" },
  { keyword: "macedo", href: "/plano-saude-macedo-guarulhos", title: "Seguros Macedo" },
  { keyword: "taboão", href: "/plano-saude-taboao-guarulhos", title: "Seguros Taboão" },
];
