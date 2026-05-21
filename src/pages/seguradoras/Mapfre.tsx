import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const MapfreGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Mapfre"
    accentColor="#d3122c"
    description="Multinacional espanhola de confiança. A Mapfre oferece em Guarulhos seguros auto completos com forte foco em assistência 24h e coberturas para terceiros."
    keywords={["MapfreGuarulhos", "SeguroAutoMapfre", "MapfreSegurosTelefone", "CotaçãoMapfre"]}
    benefits={[
      "Coberturas flexíveis que se adaptam ao seu bolso",
      "Rede de oficinas referenciadas de alta qualidade",
      "Assistência 24h completa (Guincho, Chaveiro, Pneus)",
      "Descontos progressivos na renovação",
      "Selo de sustentabilidade e responsabilidade social"
    ]}
    history="A Mapfre é um dos maiores grupos seguradores do mundo, com presença em mais de 40 países. No Brasil, destaca-se pela transparência e pela variedade de produtos, sendo uma escolha sólida para famílias e empresas de Guarulhos que não abrem mão de uma marca global."
  />
);

export default MapfreGuarulhos;