import robertoImg from "@/assets/socio-roberto.webp";
import sandraImg from "@/assets/socia-sandra.webp";

export interface BlogAuthor {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  bio: string[];
  image: string;
  susep?: string;
  email?: string;
  whatsapp?: string;
  expertise: string[];
}

export const blogAuthors: BlogAuthor[] = [
  {
    slug: "roberto-patro",
    name: "Roberto Patro",
    role: "Sócio-fundador e Corretor de Seguros — SUSEP",
    shortBio:
      "Especialista em seguros patrimoniais, frota, agro e responsabilidade civil, com mais de 25 anos de mercado em Guarulhos/SP.",
    bio: [
      "Roberto Patrocínio é sócio-fundador da Patro Corretora de Seguros, com sede em Guarulhos/SP, e atua há mais de 25 anos no mercado segurador brasileiro.",
      "Como corretor habilitado pela SUSEP, é especialista em proteção patrimonial para galpões em Cumbica, seguros de frota, agronegócio (com atendimento nacional) e responsabilidade civil para empresas.",
      "Lidera negociações com mais de 16 seguradoras e 20 operadoras de saúde, conduzindo análises técnicas de risco para mais de 500 empresas atendidas.",
    ],
    image: robertoImg,
    expertise: [
      "Seguro de Galpões e Riscos Patrimoniais",
      "Seguro Frota e Transporte",
      "Agronegócio (atendimento nacional)",
      "Responsabilidade Civil (RC)",
    ],
  },
  {
    slug: "sandra-patro",
    name: "Sandra Patro",
    role: "Sócia-fundadora e Corretora de Seguros — SUSEP",
    shortBio:
      "Especialista em planos de saúde empresariais, seguros de pessoas e consórcios, com foco em atendimento humanizado.",
    bio: [
      "Sandra Patrocínio é sócia-fundadora da Patro Corretora de Seguros e referência em planos de saúde empresariais, seguros de vida e consórcios na região de Guarulhos.",
      "Com habilitação SUSEP, conduz pessoalmente o atendimento consultivo a famílias e empresas, comparando coberturas entre as principais operadoras do mercado.",
      "É responsável pelas áreas de saúde, odontológico e seguros de pessoas, garantindo análise técnica e relacionamento de longo prazo com cada cliente.",
    ],
    image: sandraImg,
    expertise: [
      "Planos de Saúde Empresariais e PME",
      "Seguro de Vida e Previdência",
      "Plano Odontológico",
      "Consórcio (4 modalidades)",
    ],
  },
];

const slugify = (name: string): string =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Resolve a display author name (e.g. "Roberto Patro") to its slug. */
export const getAuthorSlugByName = (name: string): string => {
  const match = blogAuthors.find(
    a => a.name.toLowerCase() === name.toLowerCase() || a.slug === slugify(name)
  );
  return match ? match.slug : slugify(name);
};

export const getAuthorBySlug = (slug: string): BlogAuthor | undefined =>
  blogAuthors.find(a => a.slug === slug);

export const getAuthorByName = (name: string): BlogAuthor | undefined =>
  blogAuthors.find(a => a.name.toLowerCase() === name.toLowerCase());

/** Absolute URL for an author profile page. */
export const getAuthorUrl = (
  nameOrSlug: string,
  origin = "https://www.patroseguros.com.br"
): string => {
  const slug = getAuthorBySlug(nameOrSlug)
    ? nameOrSlug
    : getAuthorSlugByName(nameOrSlug);
  return `${origin}/blog/autor/${slug}`;
};