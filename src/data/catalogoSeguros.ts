// Catálogo "Todos os seguros". Só lista rotas que existem no site.
export interface CatalogoItem {
  label: string;
  to: string;
  short: string;
}

export interface CatalogoPerfil {
  id: "pessoas" | "empresas" | "agro";
  title: string;
  description: string;
  items: CatalogoItem[];
}

export const CATALOGO_PATH = "/todos-os-seguros";

export const catalogoSeguros: CatalogoPerfil[] = [
  {
    id: "pessoas",
    title: "Pessoas e famílias",
    description: "Proteção para o carro, a casa, a saúde e o futuro da sua família.",
    items: [
      { label: "Seguro Auto", to: "/seguro-auto", short: "Carro protegido contra colisão, roubo e danos a terceiros." },
      { label: "Seguro Moto", to: "/seguro-moto", short: "Proteção para motos de uso pessoal ou trabalho." },
      { label: "Seguro Residencial", to: "/seguro-residencial", short: "Casa ou apartamento protegidos, com assistências." },
      { label: "Seguro de Vida", to: "/seguro-vida", short: "Amparo financeiro para você e sua família." },
      { label: "Plano de Saúde", to: "/planos-de-saude", short: "Planos individuais, familiares e por adesão." },
      { label: "Seguro Viagem", to: "/seguro-viagem", short: "Assistência médica e bagagem em viagens." },
      { label: "Acidentes Pessoais", to: "/seguro-acidentes-pessoais", short: "Indenização em caso de acidente pessoal coberto." },
      { label: "Consórcio", to: "/consorcio", short: "Carro, moto ou imóvel planejados, sem juros." },
    ],
  },
  {
    id: "empresas",
    title: "Empresas",
    description: "Proteção para patrimônio, operação, obras, contratos e responsabilidades.",
    items: [
      { label: "Seguro Empresarial", to: "/seguro-empresarial", short: "Imóvel, conteúdo e operação da empresa." },
      { label: "Seguro Frota", to: "/seguro-frota", short: "Veículos da empresa em uma única gestão." },
      { label: "Seguro Condomínio", to: "/seguro-condominio", short: "Áreas comuns e responsabilidades do condomínio." },
      { label: "Responsabilidade Civil", to: "/seguro-rc", short: "Danos causados a terceiros pela atividade." },
      { label: "Seguro de Engenharia", to: "/seguro-engenharia", short: "Bens da obra e da montagem contra acidentes." },
      { label: "Seguro Garantia", to: "/seguro-garantia", short: "Garantia de obrigações em contratos e licitações." },
      { label: "Seguro de Crédito", to: "/seguro-credito-empresarial-guarulhos", short: "Proteção contra inadimplência de clientes." },
      { label: "Seguro Cyber", to: "/seguro-cyber", short: "Incidentes digitais e vazamento de dados." },
      { label: "Máquinas e Equipamentos", to: "/seguro-maquinas", short: "Máquinas e equipamentos da operação." },
      { label: "Transporte de Cargas", to: "/seguro-transporte", short: "Mercadorias durante o transporte." },
    ],
  },
  {
    id: "agro",
    title: "Agronegócio",
    description: "Proteção para a lavoura, os animais, as máquinas e a propriedade rural.",
    items: [
      { label: "Seguro Rural / Agrícola", to: "/seguro-rural", short: "Lavouras e produção agrícola." },
      { label: "Seguro Pecuário", to: "/seguro-pecuario", short: "Rebanhos e animais de produção." },
      { label: "Máquinas Agrícolas", to: "/seguro-maquinas-agricolas", short: "Tratores, colheitadeiras e implementos." },
      { label: "Propriedade Rural e Benfeitorias", to: "/seguro-propriedade-rural", short: "Sede, galpões, silos e benfeitorias." },
      { label: "Seguro Drone", to: "/seguro-drone", short: "Drones agrícolas: casco e responsabilidade civil." },
      { label: "Transporte Agro", to: "/seguro-transporte-agro", short: "Safra e insumos durante o transporte." },
      { label: "Seguro Café", to: "/seguro-cafe", short: "Proteção específica para a cafeicultura." },
      { label: "Seguro Agro (visão geral)", to: "/seguro-agro", short: "Todas as soluções da Patro para o campo." },
    ],
  },
];
