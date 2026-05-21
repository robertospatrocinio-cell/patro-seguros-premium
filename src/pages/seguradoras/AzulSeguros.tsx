import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const AzulSegurosGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Azul Seguros"
    accentColor="#005ea8"
    description="Pertencente ao Grupo Porto, a Azul Seguros é a opção ideal para quem busca a qualidade Porto Seguro com um preço mais acessível e focado no essencial em Guarulhos."
    keywords={["AzulSegurosGuarulhos", "SeguroAutoBaratoGuarulhos", "AzulSegurosCotação", "SeguroPopularGuarulhos"]}
    benefits={[
      "A melhor relação custo-benefício para veículos seminovos",
      "Qualidade e garantia de atendimento do Grupo Porto",
      "Opção de Seguro Auto Popular com peças de reuso garantidas",
      "Facilidade de parcelamento e contratação simplificada",
      "Assistência 24h eficiente em toda a região metropolitana"
    ]}
    history="A Azul Seguros foca no atendimento ao cliente que busca eficiência e preço justo. É amplamente utilizada em Guarulhos por motoristas que desejam proteção contra roubo e furto sem abrir mão de uma assistência 24h confiável, mas com um orçamento mais controlado."
  />
);

export default AzulSegurosGuarulhos;