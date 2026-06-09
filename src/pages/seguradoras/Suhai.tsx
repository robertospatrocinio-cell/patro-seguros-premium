import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const SuhaiGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Suhai"
    accentColor="#003566"
    description="Especialista em Roubo e Furto. A Suhai é a solução definitiva em Guarulhos para quem não consegue seguro em outras companhias ou busca economia máxima."
    keywords={["SuhaiGuarulhos", "SeguroRouboFurtoSuhai", "SuhaiSegurosMoto", "SeguroBaratoGuarulhos"]}
    benefits={[
      "Aceitação de 100% dos modelos (Carros, Motos, Caminhões)",
      "Preço até 80% menor que o seguro total",
      "Foco em Roubo e Furto (o que mais importa em Guarulhos)",
      "Sem franquia em caso de indenização integral",
      "Assistência 24h em todo o território nacional"
    ]}
    history="A Suhai Seguradora é líder absoluta em seguros exclusivos de roubo e furto no Brasil. É a seguradora que 'diz sim' para veículos antigos, rebaixados ou de alto risco, sendo essencial para o perfil de muitos bairros de Guarulhos."
    faqs={[
      {
        q: "A Suhai Seguradora é confiável mesmo?",
        a: "Sim, a Suhai é uma seguradora autorizada pela SUSEP e é líder nacional em seu nicho. Ela é famosa por pagar as indenizações de forma muito correta e rápida em casos de roubo e furto."
      },
      {
        q: "O seguro Suhai cobre colisão?",
        a: "O foco principal da Suhai é Roubo e Furto. No entanto, você pode contratar a cobertura de 'Roubo/Furto + Colisão com Perda Total'. Ela não cobre batidas leves onde o carro pode ser consertado (perda parcial)."
      },
      {
        q: "Por que a Suhai é tão barata em Guarulhos?",
        a: "Justamente por não cobrir as pequenas batidas, o preço cai drasticamente. Para quem mora em bairros de Guarulhos com alto índice de roubo e quer apenas proteger o valor do carro, a Suhai é a melhor opção."
      },
      {
        q: "Suhai aceita qualquer carro ou moto?",
        a: "Praticamente sim. Veículos antigos, carros com modificações, motos de alta cilindrada e até caminhões que são recusados por outras seguradoras encontram aceitação na Suhai."
      }
    ]}
  />
);

export default SuhaiGuarulhos;