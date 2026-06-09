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
    faqs={[
      {
        q: "Seguro Porto Seguro é bom?",
        a: "Sim, é amplamente considerada a melhor seguradora do Brasil. Além das coberturas robustas, o grande diferencial é a rede de serviços (Porto Serviços) e a agilidade inigualável no pagamento de sinistros."
      },
      {
        q: "A Porto Seguro tem atendimento presencial em Guarulhos?",
        a: "Sim! Guarulhos conta com Centros Automotivos Porto (CAP) e uma ampla rede de oficinas referenciadas. Além disso, a Patro Seguros, como parceira oficial, oferece suporte presencial na região da Cidade Maia."
      },
      {
        q: "Quais os benefícios extras da Porto em Guarulhos?",
        a: "Clientes Porto em Guarulhos têm descontos em diversos estabelecimentos locais, além de serviços gratuitos para a casa (chaveiro, encanador, eletricista) e check-ups gratuitos nos Centros Automotivos."
      },
      {
        q: "O seguro da Porto é o mais caro?",
        a: "Nem sempre. Embora seja uma seguradora premium, a Porto possui diversas modalidades (como a Porto Seguro Auto Jovem ou Sênior) que podem ser muito competitivas. Na Patro, comparamos todas as categorias para você."
      }
    ]}
    claimChannels={[
      { type: 'whatsapp', value: '11 3003-9303', label: 'WhatsApp' },
      { type: 'phone', value: '333-PORTO (76786)', label: 'Central 24h' },
      { type: 'app', value: 'App Porto Seguro', label: 'Aplicativo' },
      { type: 'web', value: 'portoseguro.com.br', label: 'Portal do Cliente' }
    ]}
  />
);

export default PortoSeguroGuarulhos;