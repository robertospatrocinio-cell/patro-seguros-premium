import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const AzulSegurosGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Azul Seguros"
    accentColor="#005ea8"
    description="Pertencente ao Grupo Porto, a Azul Seguros é a option ideal para quem busca a qualidade Porto Seguro com um preço mais acessível e focado no essencial em Guarulhos."
    keywords={["AzulSegurosGuarulhos", "SeguroAutoBaratoGuarulhos", "AzulSegurosCotação", "SeguroPopularGuarulhos"]}
    benefits={[
      "A melhor relação custo-benefício para veículos seminovos",
      "Qualidade e garantia de atendimento do Grupo Porto",
      "Opção de Seguro Auto Popular com peças de reuso garantidas",
      "Facilidade de parcelamento e contratação simplificada",
      "Assistência 24h eficiente em toda a região metropolitana"
    ]}
    history="A Azul Seguros foca no atendimento ao cliente que busca eficiência e preço justo. É amplamente utilizada em Guarulhos por motoristas que desejam proteção contra roubo e furto sem abrir mão de uma assistência 24h confiável, mas com um orçamento mais controlado."
    faqs={[
      {
        q: "A Azul Seguros é da Porto Seguro?",
        a: "Sim, a Azul Seguros faz parte do Grupo Porto. Isso garante que, embora o preço seja mais acessível, o padrão de qualidade no atendimento e na liquidação de sinistros siga as diretrizes da maior seguradora do país."
      },
      {
        q: "O seguro da Azul é bom para carros antigos?",
        a: "É excelente. A Azul possui o 'Azul Seguro Auto Popular', que permite o uso de peças de reuso certificadas em reparos de colisões, o que reduz o custo do seguro em até 30%, ideal para veículos com mais de 5 anos."
      },
      {
        q: "A Azul Seguros atende bem em Guarulhos?",
        a: "Sim, os prestadores da Azul em Guarulhos são os mesmos que atendem a Porto Seguro em muitas situações, garantindo agilidade no guincho e socorro mecânico em bairros como Cumbica e Pimentas."
      },
      {
        q: "O que o seguro da Azul não cobre?",
        a: "Como é um seguro focado em custo-benefício, as coberturas de acessórios e mimos (como lavagem ou pequenos reparos residenciais) podem ser limitadas em comparação à Porto Seguro. Ele foca no que realmente importa: proteção do seu veículo."
      }
    ]}
  />
);

export default AzulSegurosGuarulhos;