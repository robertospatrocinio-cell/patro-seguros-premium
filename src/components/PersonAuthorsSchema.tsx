/**
 * JSON-LD Person schema para os dois fundadores da Patro Seguros.
 *
 * Fortalece o Knowledge Graph e a citação por LLMs (E-E-A-T):
 * - `jobTitle`, `knowsAbout`, `hasCredential`, `worksFor`
 * - `sameAs` com perfis públicos verificáveis (LinkedIn, Instagram)
 * - `url` aponta para a página do autor no blog (perfil canônico)
 *
 * Renderiza um único bloco `@graph` com os 2 nós Person + referência
 * à Organization pai (via `@id`), evitando duplicar a InsuranceAgency.
 */

const ORG_ID = "https://www.patroseguros.com.br/#insuranceagency";

const persons = [
  {
    id: "https://www.patroseguros.com.br/sobre#roberto-patrocinio",
    name: "Roberto Patrocínio",
    givenName: "Roberto",
    familyName: "Patrocínio",
    jobTitle: "Sócio-Fundador e Diretor Comercial",
    description:
      "Corretor de seguros com mais de 15 anos de atuação em seguros empresariais, agronegócio (PSR), galpões logísticos em Cumbica/Guarulhos e responsabilidade civil. Lidera parcerias estratégicas com 16+ seguradoras e é responsável pela carteira corporativa da Patro.",
    knowsAbout: [
      "Seguro Empresarial",
      "Seguro de Galpões e Riscos Patrimoniais",
      "Seguro Agrícola (PSR)",
      "Responsabilidade Civil (RC)",
      "Seguro de Frota",
      "Gestão de Riscos Corporativos",
    ],
    image: "https://www.patroseguros.com.br/socio-roberto.webp",
    sameAs: [
      "https://www.linkedin.com/in/roberto-patrocinio",
      "https://www.instagram.com/patroseguros",
    ],
    url: "https://www.patroseguros.com.br/blog/autor/roberto-patro",
  },
  {
    id: "https://www.patroseguros.com.br/sobre#sandra-patrocinio",
    name: "Sandra Patrocínio",
    givenName: "Sandra",
    familyName: "Patrocínio",
    jobTitle: "Sócia-Fundadora e Diretora de Operações",
    description:
      "Corretora de seguros especializada em planos de saúde PME, seguros pessoais (vida, APH) e gestão de sinistros. Responsável pela operação diária da Patro e pelo relacionamento com 20+ operadoras de saúde, incluindo Bradesco Saúde, SulAmérica, Amil, Porto Seguro Saúde e Notre Dame.",
    knowsAbout: [
      "Planos de Saúde PME",
      "Seguro de Vida",
      "Seguro Pessoal e APH",
      "Gestão de Sinistros",
      "Odontologia Empresarial",
      "Atendimento ao Cliente em Seguros",
    ],
    image: "https://www.patroseguros.com.br/socia-sandra.webp",
    sameAs: [
      "https://www.linkedin.com/in/sandra-patrocinio",
      "https://www.instagram.com/patroseguros",
    ],
    url: "https://www.patroseguros.com.br/blog/autor/sandra-patro",
  },
] as const;

const buildPerson = (p: (typeof persons)[number]) => ({
  "@type": "Person",
  "@id": p.id,
  name: p.name,
  givenName: p.givenName,
  familyName: p.familyName,
  jobTitle: p.jobTitle,
  description: p.description,
  image: p.image,
  url: p.url,
  worksFor: { "@id": ORG_ID },
  affiliation: { "@id": ORG_ID },
  knowsAbout: p.knowsAbout,
  sameAs: p.sameAs,
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Corretor(a) de Seguros habilitado(a) pela SUSEP",
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "Superintendência de Seguros Privados (SUSEP)",
        url: "https://www.gov.br/susep",
      },
      identifier: "SUSEP 212113511",
      url: "https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp",
    },
  ],
});

const PersonAuthorsSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": persons.map(buildPerson),
  };

  return (
    <script
      type="application/ld+json"
      data-authors-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default PersonAuthorsSchema;