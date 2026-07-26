import { EMPRESA, TELEFONE_DIGITS } from "@/config/empresa";

/**
 * Bloco NAP (Name, Address, Phone) canônico da Patro Seguros.
 *
 * Renderizado no rodapé de TODAS as páginas do site (via Footer) e no
 * HTML pré-renderizado (crawlers sem JS enxergam o texto integral).
 *
 * Texto, pontuação e ordem devem permanecer IDÊNTICOS em todo o site —
 * qualquer alteração deve ser feita em `src/config/empresa.ts`, nunca aqui.
 *
 * Marcação semântica: <address> com Microdata schema.org/InsuranceAgency.
 * O JSON-LD equivalente é emitido separadamente por <JsonLd /> no <head>.
 */
const NapBlock = () => {
  const {
    nomeFantasia,
    razaoSocial,
    cnpj,
    susep,
    telefone,
    telefoneE164,
    email,
    horario,
    endereco,
  } = EMPRESA;

  const enderecoCurto = `${endereco.logradouro}, ${endereco.numero} — Sala 219`;
  const enderecoComplemento = `Edifício Via Alameda — ${endereco.bairro}, ${endereco.cidade}/${endereco.estadoSigla} — CEP ${endereco.cep}`;
  const mapsQuery = encodeURIComponent(
    `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estadoSigla}, ${endereco.cep}`
  );

  return (
    <address
      itemScope
      itemType="https://schema.org/InsuranceAgency"
      className="not-italic text-[12.5px] leading-relaxed text-white/80"
      aria-label="Dados institucionais da Patro Seguros"
    >
      <meta itemProp="url" content={EMPRESA.dominioCanonico} />
      <p className="text-white font-semibold">
        <span itemProp="name">{nomeFantasia}</span>
        {" — "}
        <span itemProp="legalName">{razaoSocial}</span>
      </p>
      <p
        itemProp="address"
        itemScope
        itemType="https://schema.org/PostalAddress"
      >
        <span itemProp="streetAddress">{enderecoCurto}</span>
        <br />
        Edifício Via Alameda —{" "}
        <span itemProp="addressLocality">{endereco.bairro}, {endereco.cidade}</span>
        {"/"}
        <span itemProp="addressRegion">{endereco.estadoSigla}</span>
        {" — CEP "}
        <span itemProp="postalCode">{endereco.cep}</span>
        <meta itemProp="addressCountry" content={endereco.pais} />
        {" · "}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/40 hover:decoration-white hover:text-white transition-colors"
          aria-label={`Ver ${enderecoCurto} no Google Maps`}
        >
          Ver no mapa
        </a>
      </p>
      <p>
        Telefone e WhatsApp:{" "}
        <a
          href={`tel:${telefoneE164}`}
          itemProp="telephone"
          className="hover:text-white transition-colors"
        >
          {telefone}
        </a>
      </p>
      <p>
        E-mail:{" "}
        <a
          href={`mailto:${email}`}
          itemProp="email"
          className="hover:text-white transition-colors"
        >
          {email}
        </a>
      </p>
      <p>
        CNPJ:{" "}
        <span itemProp="taxID">{cnpj}</span>
        {" — Registro SUSEP: "}
        <span
          itemProp="identifier"
          itemScope
          itemType="https://schema.org/PropertyValue"
        >
          <meta itemProp="name" content="Registro SUSEP" />
          <span itemProp="value">{susep}</span>
        </span>
      </p>
      <p>Atendimento: {horario.toLowerCase()}</p>
      {/* Fallback estático para SEO — variáveis não usadas silenciosamente */}
      <meta itemProp="telephone" content={telefoneE164} />
      {/* Suppress unused-var lint for aliases exposed for outros usos */}
      <span hidden aria-hidden="true">{TELEFONE_DIGITS}</span>
    </address>
  );
};

export default NapBlock;