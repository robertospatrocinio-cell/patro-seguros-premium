import React from "react";
import { EMPRESA } from "@/config/empresa";

/**
 * JSON-LD Person schema para os dois fundadores da Patro Seguros.
 */

const ORG_ID = `${EMPRESA.dominioCanonico}/#insurance-agency`;

const persons = [
  {
    id: `${EMPRESA.dominioCanonico}/sobre#roberto-patrocinio`,
    name: "Roberto Patrocínio",
    givenName: "Roberto",
    familyName: "Patrocínio",
    jobTitle: "Sócio-Fundador e Diretor Comercial",
    description:
      `Especialista em Seguros de Transportes e Riscos Corporativos com mais de ${EMPRESA.metricas.experienciaAnos} de atuação no mercado segurador brasileiro. Lidera a estratégia de expansão nacional da Patro Seguros focada em Agronegócio e Logística.`,
    knowsAbout: [
      "Seguro de Transportes (RCTR-C, RCF-DC)",
      "Seguro de Carga",
      "Seguro para Agronegócio",
      "Responsabilidade Civil Profissional",
      "Gestão de Riscos Corporativos",
      "Logística e Supply Chain",
    ],
    image: `${EMPRESA.dominioCanonico}/socio-roberto.webp`,
    url: `${EMPRESA.dominioCanonico}/blog/autor/roberto-patrocinio`,
    sameAs: [
      "https://www.linkedin.com/in/robertopatrocinio/",
      EMPRESA.redesSociais.instagram,
    ],
    worksFor: { "@id": ORG_ID },
  },
  {
    id: `${EMPRESA.dominioCanonico}/sobre#sandra-patrocinio`,
    name: "Sandra Patrocínio",
    givenName: "Sandra",
    familyName: "Patrocínio",
    jobTitle: "Sócia-Fundadora e Diretora de Operações",
    description:
      `Corretora de seguros especializada em planos de saúde PME, seguros pessoais (vida, APH) e gestão de sinistros. Responsável pela operação diária da Patro e pelo relacionamento com ${EMPRESA.metricas.operadorasSaude} operadoras de saúde, incluindo Bradesco Saúde, SulAmérica, Amil, Porto Seguro Saúde e Notre Dame.`,
    knowsAbout: [
      "Planos de Saúde PME",
      "Seguro de Vida",
      "Seguro Pessoal e APH",
      "Gestão de Sinistros",
      "Odontologia Empresarial",
      "Atendimento ao Cliente em Seguros",
    ],
    image: `${EMPRESA.dominioCanonico}/socia-sandra.webp`,
    url: `${EMPRESA.dominioCanonico}/blog/autor/sandra-patrocinio`,
    sameAs: [
      "https://www.linkedin.com/in/sandra-patrocinio-b7b51b32/",
      EMPRESA.redesSociais.instagram,
    ],
    worksFor: { "@id": ORG_ID },
  },
];

const PersonAuthorsSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": persons.map((p) => ({
      "@type": "Person",
      "@id": p.id,
      name: p.name,
      givenName: p.givenName,
      familyName: p.familyName,
      jobTitle: p.jobTitle,
      description: p.description,
      image: p.image,
      url: p.url,
      sameAs: p.sameAs,
      knowsAbout: p.knowsAbout.map((topic) => ({
        "@type": "Thing",
        name: topic,
      })),
      worksFor: p.worksFor,
    })),
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
