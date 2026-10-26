// Fonte única dos produtos exibidos no catálogo e nos menus desktop/mobile.
// Variações por bairro, operadora e campanha ficam nas respectivas páginas-pilar.
export interface CatalogoItem {
  label: string;
  to: string;
  short: string;
}

export interface CatalogoPerfil {
  id: string;
  title: string;
  description: string;
  items: CatalogoItem[];
}

export const CATALOGO_PATH = "/todos-os-seguros";

export const catalogoSeguros: CatalogoPerfil[] = [
  {
    id: "pessoas", title: "Pessoas e famílias",
    description: "Proteção pessoal, moradia, viagens e planejamento financeiro.",
    items: [
      { label: "Seguro Residencial", to: "/seguro-residencial", short: "Casa ou apartamento, conteúdo e assistências." },
      { label: "Seguro de Vida", to: "/seguro-vida", short: "Proteção financeira para você e sua família." },
      { label: "Acidentes Pessoais", to: "/seguro-acidentes-pessoais", short: "Indenizações para acidentes cobertos." },
      { label: "Seguro Estagiário", to: "/seguro-estagiario", short: "Acidentes pessoais durante o estágio." },
      { label: "Seguro Viagem", to: "/seguro-viagem", short: "Assistência em viagens nacionais e internacionais." },
      { label: "Seguro Celular", to: "/seguro-celular", short: "Proteção para o aparelho conforme o plano contratado." },
      { label: "Seguro Fiança", to: "/seguro-fianca", short: "Garantia para contratos de aluguel." },
      { label: "Fiança Locatícia", to: "/seguro-fianca-locaticia", short: "Alternativa ao fiador para locações." },
      { label: "Seguro Funeral", to: "/seguro-funeral", short: "Amparo e assistência funeral conforme contratação." },
      { label: "Seguro Decesso", to: "/seguro-decesso", short: "Proteção para despesas relacionadas ao falecimento." },
      { label: "Plano Pet", to: "/plano-pet", short: "Cuidados e assistência para cães e gatos." },
      { label: "Proteção Pet Premium", to: "/protecao-pet-premium", short: "Conheça as opções de proteção para seu pet." },
      { label: "Previdência Privada", to: "/previdencia-privada", short: "Planejamento financeiro de longo prazo." },
    ],
  },
  {
    id: "veiculos", title: "Veículos, náutica e aviação",
    description: "Do carro de uso diário a frotas, embarcações e aeronaves.",
    items: [
      { label: "Seguro Auto", to: "/seguro-auto", short: "Compare coberturas para seu carro." },
      { label: "Seguro Moto", to: "/seguro-moto", short: "Motos de uso pessoal ou profissional." },
      { label: "Motorista de Aplicativo", to: "/seguro-motorista-app", short: "Proteção adequada ao transporte por aplicativo." },
      { label: "Moto Entregadores", to: "/seguro-moto-entregadores-guarulhos", short: "Seguro para quem trabalha com entregas." },
      { label: "Seguro Caminhão", to: "/seguro-caminhao", short: "Proteção do caminhão e responsabilidades." },
      { label: "Seguro Micro-ônibus", to: "/seguro-micro-onibus", short: "Veículos utilizados no transporte de passageiros." },
      { label: "Seguro Frota", to: "/seguro-frota", short: "Gestão da proteção dos veículos da empresa." },
      { label: "Acidentes Pessoais de Passageiros (APP)", to: "/seguro-acidentes-pessoais-passageiros", short: "Cobertura para acidentes com passageiros." },
      { label: "APP para Motorista de Aplicativo", to: "/seguro-app-motorista-aplicativo", short: "Acidentes pessoais no transporte por aplicativo." },
      { label: "APP para Táxi e Executivo", to: "/seguro-app-taxi-transporte-executivo", short: "Passageiros de táxis e transporte executivo." },
      { label: "APP para Ônibus, Vans e Frotas", to: "/seguro-app-onibus-vans-frotas", short: "Acidentes pessoais no transporte coletivo." },
      { label: "Seguro Bike", to: "/seguro-bike", short: "Proteção para bicicletas e ciclistas." },
      { label: "Seguro Embarcações", to: "/seguro-embarcacoes", short: "Proteção para embarcações conforme seu uso." },
      { label: "Seguro Jet Ski", to: "/seguro-jetski", short: "Proteção para motos aquáticas." },
      { label: "Seguro Aviões", to: "/seguro-avioes", short: "Coberturas para aeronaves e operação aérea." },
      { label: "Seguro Helicópteros", to: "/seguro-helicopteros", short: "Proteção para helicópteros e suas operações." },
      { label: "Carta Verde", to: "/seguro-carta-verde", short: "Responsabilidade civil em viagens no Mercosul." },
      { label: "Carro Elétrico", to: "/seguro-carro-eletrico-guarulhos", short: "Cuidados específicos para veículos elétricos." },
      { label: "Auto Ezze Corinthians", to: "/seguro-auto-ezze-corinthians", short: "Conheça a opção de seguro auto Ezze Corinthians." },
    ],
  },
  {
    id: "empresas", title: "Empresas e patrimônio",
    description: "Proteção de imóveis, estoques, operações, contratos e equipes.",
    items: [
      { label: "Seguro Empresarial", to: "/seguro-empresarial", short: "Proteção para o patrimônio e a operação." },
      { label: "Transporte de Cargas", to: "/seguro-transporte", short: "Mercadorias durante o transporte." },
      { label: "Transportadoras", to: "/nicho-transportadoras", short: "Soluções para operações de transporte." },
      { label: "Seguro Galpão", to: "/seguro-galpao", short: "Proteção do imóvel e do conteúdo do galpão." },
      { label: "Galpões Industriais", to: "/seguro-galpoes-industriais", short: "Riscos de instalações industriais e logísticas." },
      { label: "Armazenagem", to: "/seguro-armazenagem", short: "Mercadorias e riscos durante o armazenamento." },
      { label: "Seguro Condomínio", to: "/seguro-condominio", short: "Áreas comuns e responsabilidades do condomínio." },
      { label: "Condomínio Empresarial", to: "/seguro-condominio-empresarial", short: "Condomínios comerciais e empresariais." },
      { label: "Condomínio Residencial", to: "/seguro-condominio-residencial", short: "Edificações e áreas comuns residenciais." },
      { label: "Lojas em Shopping", to: "/seguro-lojas-shopping", short: "Instalações, estoque e riscos de lojas." },
      { label: "Restaurantes", to: "/seguro-restaurante", short: "Proteção para a operação de restaurantes." },
      { label: "Seguro Imobiliário", to: "/seguro-imobiliario", short: "Soluções para imóveis e locações." },
      { label: "Seguro de Engenharia", to: "/seguro-engenharia", short: "Riscos de obras e montagens." },
      { label: "Seguro Garantia", to: "/seguro-garantia", short: "Obrigações de contratos e licitações." },
      { label: "Garantia Judicial", to: "/seguro-garantia-judicial-guarulhos", short: "Garantias em processos judiciais." },
      { label: "Crédito Empresarial", to: "/seguro-credito-empresarial-guarulhos", short: "Proteção contra inadimplência de clientes." },
      { label: "Seguro Cyber", to: "/seguro-cyber", short: "Riscos cibernéticos e incidentes com dados." },
      { label: "Seguro Ambiental", to: "/seguro-ambiental", short: "Responsabilidades por danos ambientais." },
      { label: "Vida em Grupo / PME", to: "/seguro-vida-pme", short: "Proteção de vida para colaboradores." },
      { label: "Seguro Flat", to: "/seguro-flat-guarulhos", short: "Proteção para flats em Guarulhos." },
      { label: "Sala Comercial", to: "/seguro-sala-comercial-guarulhos", short: "Imóvel, equipamentos e conteúdo comercial." },
      { label: "Seguros por Segmento", to: "/seguro-empresarial/segmentos", short: "Encontre a solução pela atividade da empresa." },
      { label: "Seguro de Crédito", to: "/seguro-de-credito", short: "Conheça as modalidades de proteção do crédito." },
      { label: "Empresariais Especializados", to: "/seguros-empresariais-especializados", short: "Garantia, crédito e soluções empresariais por necessidade." },
      { label: "Galpões e Centros de Distribuição", to: "/seguro-galpoes-centros-distribuicao", short: "Solicite uma análise da operação logística." },
      { label: "Cibernético para Empresas", to: "/seguro-cibernetico-empresas", short: "Avalie os riscos digitais da sua empresa." },
      { label: "Administradores e Profissionais", to: "/responsabilidade-administradores-profissionais", short: "Consultoria de responsabilidade para gestores e profissionais." },
      { label: "Vida para Sócios", to: "/lp/seguro-de-vida-para-socios", short: "Proteção financeira para a continuidade da sociedade." },
    ],
  },
  {
    id: "rc", title: "Responsabilidade civil",
    description: "Proteção diante de reclamações de terceiros, conforme atividade e contrato.",
    items: [
      { label: "Responsabilidade Civil", to: "/seguro-rc", short: "Conheça os tipos de proteção contra danos a terceiros." },
      { label: "RC Profissional", to: "/seguro-rc-profissional", short: "Responsabilidade decorrente da atividade profissional." },
      { label: "RC Médicos", to: "/seguro-rc-medicos", short: "Reclamações relacionadas à prática médica." },
      { label: "RC Dentistas", to: "/seguro-rc-dentistas", short: "Responsabilidade na atividade odontológica." },
      { label: "RC Advogados", to: "/seguro-rc-advogados", short: "Riscos profissionais na advocacia." },
      { label: "RC Engenheiros", to: "/seguro-rc-engenheiros", short: "Responsabilidade de engenheiros e projetos." },
      { label: "RC Veterinários", to: "/seguro-rc-veterinarios", short: "Responsabilidade na prática veterinária." },
      { label: "D&O / Executivos", to: "/seguro-rc-executivos", short: "Responsabilidade de administradores e executivos." },
      { label: "RC Obras e Montagem", to: "/seguro-rc-obras", short: "Danos a terceiros decorrentes de obras." },
      { label: "RC Prestação de Serviços", to: "/seguro-rc-prestacao-servicos", short: "Riscos durante a prestação de serviços." },
      { label: "RC Eventos", to: "/seguro-rc-eventos", short: "Responsabilidades na organização de eventos." },
    ],
  },
  {
    id: "maquinas", title: "Máquinas, equipamentos e drones",
    description: "Especialidade Patro: máquinas agrícolas, linha amarela, equipamentos industriais e drones. Compare casco e responsabilidade civil.",
    items: [
      { label: "Máquinas e Equipamentos", to: "/seguro-maquinas", short: "Proteção para equipamentos fixos e móveis." },
      { label: "Máquinas Agrícolas", to: "/seguro-maquinas-agricolas", short: "Máquinas usadas nas atividades do campo." },
      { label: "Equipamentos Agrícolas", to: "/seguro-equipamentos-agricolas", short: "Implementos e equipamentos de uso agrícola." },
      { label: "Trator Agrícola", to: "/seguro-trator-agricola", short: "Proteção para tratores na operação rural." },
      { label: "Colheitadeira de Grãos", to: "/seguro-colheitadeira-graos", short: "Máquinas de colheita de grãos." },
      { label: "Colhedora de Cana", to: "/seguro-colhedora-cana", short: "Equipamentos para a colheita de cana." },
      { label: "Colhedora de Algodão", to: "/seguro-colhedora-algodao", short: "Proteção para colhedoras de algodão." },
      { label: "Pulverizador Agrícola", to: "/seguro-pulverizador-agricola", short: "Riscos de pulverizadores em operação." },
      { label: "Máquinas de Linha Amarela", to: "/seguro-maquinas-linha-amarela", short: "Escavadeiras, retroescavadeiras e máquinas de construção." },
      { label: "Trator Industrial", to: "/seguro-trator-industrial", short: "Tratores utilizados em operações industriais." },
      { label: "Máquinas Industriais", to: "/seguro-maquinas-industriais", short: "Proteção dos equipamentos da indústria." },
      { label: "Locadoras de Equipamentos", to: "/seguro-locadoras-equipamentos", short: "Equipamentos destinados à locação." },
      { label: "Seguro para Drones Agrícolas", to: "/seguro-drone-agricola", short: "Análise de casco, acessórios e RETA para a operação no campo." },
      { label: "RETA para Drones Agrícolas", to: "/seguro-reta-drone", short: "Responsabilidade por danos a terceiros; não substitui o casco." },
      { label: "Gerador de Energia", to: "/seguro-gerador-energia", short: "Proteção para geradores de energia." },
      { label: "Placas Solares", to: "/seguro-placa-solar", short: "Proteção de sistemas de energia fotovoltaica." },
      { label: "Equipamentos Odontológicos", to: "/seguro-equipamentos-odontologicos", short: "Equipamentos utilizados na odontologia." },
      { label: "Equipamentos de Consultório", to: "/seguro-equipamentos-consultorio-guarulhos", short: "Aparelhos e equipamentos de consultórios." },
    ],
  },
  {
    id: "agro", title: "Agronegócio",
    description: "Seguro Penhor Rural, máquinas, drones e proteção da atividade agrícola em todo o Brasil.",
    items: [
      { label: "Seguro Agro", to: "/seguro-agro", short: "Especialistas em máquinas, drones e penhor rural; atendimento nacional." },
      { label: "Seguro Penhor Rural", to: "/seguro-penhor-rural", short: "Bens vinculados ao crédito rural e análise das exigências do credor." },
      { label: "Seguro Rural", to: "/seguro-rural", short: "Proteção adaptada à atividade no campo." },
      { label: "Propriedade Rural", to: "/seguro-propriedade-rural", short: "Estruturas e patrimônio da propriedade." },
      { label: "Seguro Pecuário", to: "/seguro-pecuario", short: "Proteção para a atividade pecuária." },
      { label: "Seguro Café", to: "/seguro-cafe", short: "Riscos da produção de café." },
      { label: "Seguro Geada", to: "/seguro-geada", short: "Consulte opções para perdas por geada." },
      { label: "Seguro Granja", to: "/seguro-granja", short: "Proteção para instalações e operação de granjas." },
      { label: "Silo Agrícola", to: "/seguro-silo-agricola", short: "Estruturas de armazenamento agrícola." },
      { label: "Transporte Agro", to: "/seguro-transporte-agro", short: "Mercadorias e produtos agropecuários em trânsito." },
    ],
  },
  {
    id: "saude", title: "Saúde e odontológico",
    description: "Planos de saúde para pessoas, famílias, MEI e empresas em Guarulhos e Grande São Paulo.",
    items: [
      { label: "Planos de Saúde", to: "/planos-de-saude", short: "Compare modalidades, redes e operadoras." },
      { label: "Seguro Saúde", to: "/seguro-saude", short: "Conheça as opções de assistência à saúde." },
      { label: "Saúde Individual", to: "/plano-de-saude-individual-guarulhos", short: "Opções para contratação individual." },
      { label: "Saúde Familiar", to: "/plano-de-saude-familiar-guarulhos", short: "Avalie a rede e as necessidades da família." },
      { label: "Saúde para MEI", to: "/plano-de-saude-mei-guarulhos", short: "Condições de contratação para microempreendedores." },
      { label: "Saúde PME", to: "/plano-de-saude-pme-guarulhos", short: "Planos para pequenas e médias empresas." },
      { label: "Saúde Empresarial", to: "/plano-saude-empresarial", short: "Benefícios de saúde para colaboradores." },
      { label: "Saúde para Idosos", to: "/plano-de-saude-idosos-guarulhos", short: "Opções de atendimento para a terceira idade." },
      { label: "Seguro Odontológico", to: "/seguro-odonto", short: "Assistência odontológica conforme a rede contratada." },
      { label: "Plano Odontológico em Guarulhos", to: "/plano-odontologico-guarulhos", short: "Compare opções odontológicas para a região." },
      { label: "Saúde para Clínicas Odontológicas", to: "/plano-saude-clinicas-odontologicas", short: "Benefícios de saúde para equipes odontológicas." },
    ],
  },
  {
    id: "consorcio", title: "Consórcio",
    description: "Planeje a aquisição de veículos, imóveis e bens para sua empresa; contemplação conforme as regras do grupo.",
    items: [
      { label: "Consórcio", to: "/consorcio", short: "Entenda parcelas, taxas, lances e contemplação." },
      { label: "Consórcio de Carro", to: "/consorcio-carro", short: "Planeje a compra do seu veículo." },
      { label: "Consórcio de Imóveis", to: "/consorcio-imoveis", short: "Planejamento para a aquisição de imóveis." },
      { label: "Consórcio de Veículos Pesados", to: "/consorcio-veiculos-pesados", short: "Aquisição planejada de veículos para o trabalho." },
      { label: "Consórcio Empresarial", to: "/consorcio-empresarial-guarulhos", short: "Planejamento de bens para empresas em Guarulhos." },
    ],
  },
  {
    id: "clinicas", title: "Clínicas, consultórios e serviços",
    description: "Soluções conforme a atividade, os equipamentos e as responsabilidades do negócio.",
    items: [
      { label: "Clínica Odontológica", to: "/seguro-clinica-odontologica", short: "Proteção da estrutura e operação odontológica." },
      { label: "Consultório Odontológico", to: "/seguro-consultorio-odontologico", short: "Coberturas para o consultório do dentista." },
      { label: "Consultórios em Guarulhos", to: "/seguro-consultorio-guarulhos", short: "Opções por perfil de consultório." },
      { label: "Consultório Médico", to: "/seguro-consultorio-medico-guarulhos", short: "Proteção para consultórios médicos." },
      { label: "Consultório Veterinário", to: "/seguro-consultorio-veterinario-guarulhos", short: "Proteção da estrutura veterinária." },
      { label: "Clínica de Estética", to: "/seguro-clinica-estetica-guarulhos", short: "Patrimônio e riscos da atividade estética." },
      { label: "Clínica Pequena", to: "/seguro-clinica-pequena-guarulhos", short: "Proteção dimensionada para clínicas pequenas." },
      { label: "Vida para Clínicas Odontológicas", to: "/seguro-vida-clinicas-odontologicas", short: "Seguro de vida para equipes odontológicas." },
      { label: "Petshop", to: "/seguro-petshop", short: "Patrimônio e riscos de lojas e serviços pet." },
      { label: "Seguros para Dentistas", to: "/seguro-para-dentistas", short: "Soluções para a vida profissional e o consultório." },
      { label: "Seguros para Veterinários", to: "/seguro-para-veterinarios", short: "Proteção pessoal e profissional do veterinário." },
      { label: "Clínica Veterinária", to: "/seguro-clinica-veterinaria", short: "Proteção para a estrutura e operação da clínica." },
      { label: "Hospital Veterinário", to: "/seguro-hospital-veterinario", short: "Riscos de hospitais e atendimento veterinário." },
      { label: "Equipamentos Veterinários", to: "/seguro-equipamentos-veterinarios", short: "Proteção para aparelhos de diagnóstico e atendimento." },
      { label: "Saúde para Clínicas Veterinárias", to: "/plano-saude-clinicas-veterinarias", short: "Benefícios de saúde para equipes veterinárias." },
      { label: "Vida para Clínicas Veterinárias", to: "/seguro-vida-clinicas-veterinarias", short: "Proteção de vida para colaboradores de clínicas." },
      { label: "Vistoriadora Veicular", to: "/seguro-vistoriadora-veicular", short: "Proteção para empresas de vistoria veicular." },
      { label: "Despachantes e Vistorias", to: "/seguro-despachantes-e-vistorias", short: "Soluções para serviços de documentação e vistoria." },
    ],
  },
  {
    id: "premium", title: "Patro Private",
    description: "Consultoria para famílias, empresários e patrimônio de alto padrão.",
    items: [
      { label: "Patro Private", to: "/patro-private", short: "Conheça a consultoria patrimonial da Patro." },
      { label: "Auto Premium", to: "/seguro-auto-premium-guarulhos", short: "Proteção para veículos de alto padrão." },
      { label: "Carros de Luxo", to: "/seguro-carros-luxo-guarulhos", short: "Coberturas para veículos de luxo." },
      { label: "Carro Blindado", to: "/seguro-carro-blindado-guarulhos", short: "Cuidados específicos para veículos blindados." },
      { label: "Residencial Alto Padrão", to: "/seguro-residencial-alto-padrao-guarulhos", short: "Proteção da residência e do seu conteúdo." },
      { label: "Seguros para Empresários", to: "/seguros-para-empresarios-guarulhos", short: "Visão integrada dos riscos do empresário." },
      { label: "Proteção Patrimonial Familiar", to: "/protecao-patrimonial-familiar-guarulhos", short: "Planejamento da proteção da família." },
    ],
  },
];

export const normalizarBuscaCatalogo = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export const correspondeBuscaCatalogo = (item: CatalogoItem, busca: string, categoria = "") => {
  const texto = normalizarBuscaCatalogo(`${item.label} ${item.short} ${categoria}`);
  return normalizarBuscaCatalogo(busca).split(/\s+/).every((termo) => texto.includes(termo));
};
