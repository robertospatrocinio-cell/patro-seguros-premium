import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const ItauSegurosGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Itaú Seguros"
    accentColor="#ec7000"
    description="A solidez do maior banco privado do Brasil no seu seguro. O Itaú oferece em Guarulhos seguros auto com a garantia da Porto Seguro e benefícios exclusivos para correntistas."
    keywords={["ItaúSegurosGuarulhos", "SeguroAutoItaú", "CorrentistaItaúSeguro", "ItaúSegurosTelefone"]}
    benefits={[
      "Descontos exclusivos para correntistas Itaú",
      "Qualidade de atendimento garantida pela parceria com a Porto",
      "Parcelamento facilitado no cartão ou débito em conta",
      "Assistência 24h completa e rede de oficinas premium",
      "Gestão do seguro direto pelo app do banco"
    ]}
    history="O Itaú Seguros une a capilaridade do banco Itaú com a expertise operacional da Porto Seguro. Essa união garante ao cliente de Guarulhos uma experiência financeira sólida com o melhor serviço de proteção veicular do país."
  />
);

export default ItauSegurosGuarulhos;