import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const PortoSeguroGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Porto Seguro"
    accentColor="#004691"
    description="A maior seguradora do Brasil com atendimento de excelência em Guarulhos. A Patro Seguros é o principal canal de cotação Porto na região do Alto Tietê."
    keywords={["PortoSeguroGuarulhos", "SeguroAutoPorto", "CentroAutomotivoPorto", "Assistência24h"]}
    benefits={[
      "Acesso aos Centros Automotivos Porto em Guarulhos",
      "Guincho ilimitado e socorro residencial incluso",
      "Desconto em estacionamentos e serviços",
      "O melhor atendimento em sinistros do mercado",
      "Opção de seguro com rastreador incluso"
    ]}
    history="Com mais de 70 anos de história, a Porto Seguro é referência em confiança. Em Guarulhos, a marca possui forte presença com centros automotivos e uma rede de prestadores que garante rapidez no atendimento, seja no Centro ou em bairros mais afastados."
  />
);

export default PortoSeguroGuarulhos;