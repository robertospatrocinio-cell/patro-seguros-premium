/**
 * Internal-link hub
 *
 * Categorized map of all insurance product routes used by InsuranceHubLinks
 * to render a deep internal-link grid on every product page. Goal: increase
 * crawl coverage and distribute PageRank across the long tail of seguros.
 */

export interface HubLink {
  label: string;
  href: string;
}

export interface HubCategory {
  title: string;
  links: HubLink[];
}

export const INSURANCE_HUB: HubCategory[] = [
  {
    title: "Veículos",
    links: [
      { label: "Seguro Auto", href: "/seguro-auto" },
      { label: "Seguro Moto", href: "/seguro-moto" },
      { label: "Seguro Caminhão", href: "/seguro-caminhao" },
      { label: "Seguro Frota", href: "/seguro-frota" },
      { label: "Seguro Motorista de App", href: "/seguro-motorista-app" },
      { label: "Seguro Bike", href: "/seguro-bike" },
      { label: "Seguro Carta Verde", href: "/seguro-carta-verde" },
      { label: "Seguro Jet Ski", href: "/seguro-jetski" },
      { label: "Seguro Embarcações", href: "/seguro-embarcacoes" },
      { label: "Seguro Aviões", href: "/seguro-avioes" },
      { label: "Seguro Helicópteros", href: "/seguro-helicopteros" },
    ],
  },
  {
    title: "Pessoa, Vida e Saúde",
    links: [
      { label: "Seguro de Vida", href: "/seguro-vida" },
      { label: "Seguro Vida PME", href: "/seguro-vida-pme" },
      { label: "Seguro Saúde", href: "/seguro-saude" },
      { label: "Planos de Saúde", href: "/planos-de-saude" },
      { label: "Plano de Saúde Empresarial", href: "/plano-saude-empresarial" },
      { label: "Seguro Odontológico", href: "/seguro-odonto" },
      { label: "Seguro Acidentes Pessoais", href: "/seguro-acidentes-pessoais" },
      { label: "Seguro Funeral", href: "/seguro-funeral" },
      { label: "Seguro Decesso", href: "/seguro-decesso" },
      { label: "Plano Pet", href: "/plano-pet" },
      { label: "Seguro Viagem", href: "/seguro-viagem" },
      { label: "Previdência Privada", href: "/previdencia-privada" },
    ],
  },
  {
    title: "Patrimônio e Imóveis",
    links: [
      { label: "Seguro Residencial", href: "/seguro-residencial" },
      { label: "Seguro Condomínio", href: "/seguro-condominio" },
      { label: "Seguro Fiança Locatícia", href: "/seguro-fianca-locaticia" },
      { label: "Seguro Fiança", href: "/seguro-fianca" },
      { label: "Seguro Imobiliário", href: "/seguro-imobiliario" },
      { label: "Seguro Placa Solar", href: "/seguro-placa-solar" },
      { label: "Seguro Celular", href: "/seguro-celular" },
    ],
  },
  {
    title: "Empresarial e Indústria",
    links: [
      { label: "Seguro Empresarial", href: "/seguro-empresarial" },
      { label: "Seguro de Galpão (Hub Nacional)", href: "/seguro-galpao" },
      { label: "Seguro de Galpões Industriais", href: "/seguro-galpoes-industriais" },
      { label: "Seguro Lojas em Shopping", href: "/seguro-lojas-shopping" },
      { label: "Seguro de Máquinas", href: "/seguro-maquinas" },
      { label: "Seguro de Máquinas Industriais", href: "/seguro-maquinas-industriais" },
      { label: "Seguro Linha Amarela", href: "/seguro-maquinas-linha-amarela" },
      { label: "Seguro de Transporte", href: "/seguro-transporte" },
      { label: "Seguro de Armazenagem", href: "/seguro-armazenagem" },
      { label: "Seguro Engenharia", href: "/seguro-engenharia" },
      { label: "Seguro Garantia", href: "/seguro-garantia" },
      { label: "Seguro Cyber", href: "/seguro-cyber" },
      { label: "Seguro Estagiário", href: "/seguro-estagiario" },
      { label: "Seguro Ambiental", href: "/seguro-ambiental" },
    ],
  },
  {
    title: "Agro e Rural",
    links: [
      { label: "Seguro Rural", href: "/seguro-rural" },
      { label: "Seguro Propriedade Rural", href: "/seguro-propriedade-rural" },
      { label: "Seguro Pecuário", href: "/seguro-pecuario" },
      { label: "Seguro Granja", href: "/seguro-granja" },
      { label: "Seguro Café", href: "/seguro-cafe" },
      { label: "Seguro Geada", href: "/seguro-geada" },
      { label: "Seguro Drone Agrícola", href: "/seguro-drone-agricola" },
      { label: "Seguro Máquinas Agrícolas", href: "/seguro-maquinas-agricolas" },
      { label: "Seguro Equipamentos Agrícolas", href: "/seguro-equipamentos-agricolas" },
      { label: "Seguro Transporte Agro", href: "/seguro-transporte-agro" },
    ],
  },
  {
    title: "Responsabilidade Civil (RC)",
    links: [
      { label: "Seguro RC Geral", href: "/seguro-rc" },
      { label: "RC Profissional", href: "/seguro-rc-profissional" },
      { label: "RC Médicos", href: "/seguro-rc-medicos" },
      { label: "RC Dentistas", href: "/seguro-rc-dentistas" },
      { label: "RC Veterinários", href: "/seguro-rc-veterinarios" },
      { label: "RC Advogados", href: "/seguro-rc-advogados" },
      { label: "RC Engenheiros", href: "/seguro-rc-engenheiros" },
      { label: "RC Executivos (D&O)", href: "/seguro-rc-executivos" },
      { label: "RC Obras", href: "/seguro-rc-obras" },
      { label: "RC Prestação de Serviços", href: "/seguro-rc-prestacao-servicos" },
      { label: "RC Eventos", href: "/seguro-rc-eventos" },
    ],
  },
  {
    title: "Consórcio",
    links: [
      { label: "Consórcio", href: "/consorcio" },
      { label: "Consórcio de Carro", href: "/consorcio-carro" },
      { label: "Consórcio de Imóveis", href: "/consorcio-imoveis" },
      { label: "Consórcio Veículos Pesados", href: "/consorcio-veiculos-pesados" },
    ],
  },
  {
     title: "Guia Guarulhos (Topic Cluster)",
     links: [
       { label: "Guia Completo de Seguros", href: "/seguros-em-guarulhos" },
       { label: "Corretora de Seguros Guarulhos", href: "/corretora-seguros-guarulhos" },
      { label: "Seguro Auto Guarulhos", href: "/seguro-auto-guarulhos" },
      { label: "Seguro Moto Guarulhos", href: "/seguro-moto-guarulhos" },
      { label: "Seguro Residencial Guarulhos", href: "/seguro-residencial-guarulhos" },
      { label: "Seguro Vida e Saúde Guarulhos", href: "/seguro-vida-saude-guarulhos" },
      { label: "Plano de Saúde Guarulhos", href: "/plano-saude-guarulhos" },
      { label: "Seguro Empresarial Guarulhos", href: "/seguro-empresarial-guarulhos" },
      { label: "Seguro PME Guarulhos", href: "/seguros-empresariais-pme-guarulhos" },
      { label: "Seguro Frota Guarulhos", href: "/seguro-frota-empresas-guarulhos" },
      { label: "Seguro Condomínio Guarulhos", href: "/seguro-condominio-guarulhos" },
      { label: "Shopping Maia / Cidade Maia", href: "/seguros-shopping-maia-cidade-maia-guarulhos" },
      { label: "Bairros de Guarulhos", href: "/seguros-guarulhos" },
    ],
  },
  {
    title: "Soluções por Perfil",
    links: [
      { label: "Médicos e Clínicas", href: "/seguros/medicos-e-clinicas" },
      { label: "Transportadoras", href: "/seguros/transportadoras" },
      { label: "Empresários", href: "/seguros/empresarios" },
      { label: "Profissionais Liberais", href: "/seguros/profissionais-liberais" },
      { label: "Motoristas de App", href: "/seguros/motoristas-app" },
    ],
  },
];
