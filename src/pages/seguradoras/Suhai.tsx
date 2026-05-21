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
  />
);

export default SuhaiGuarulhos;