import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const HDIGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="HDI Seguros"
    accentColor="#f6a700"
    description="Eficiência alemã em solo guarulhense. A HDI é famosa pelo HDI Bate-Pronto, o sistema de vistoria e liberação de conserto mais rápido do Brasil."
    keywords={["HDIGuarulhos", "HDISegurosAuto", "HDIBateProntoGuarulhos", "CotaçãoHDISeguros"]}
    benefits={[
      "HDI Bate-Pronto em Guarulhos para vistorias imediatas",
      "Ótimas taxas para veículos novos e zero km",
      "Clube de benefícios HDI com descontos exclusivos",
      "Opção de seguro auto sob medida (HDI Fit)",
      "Atendimento ágil via WhatsApp e aplicativo"
    ]}
    history="A HDI Seguros pertence ao grupo Talanx, o terceiro maior grupo segurador da Alemanha. No Brasil, consolidou-se pela rapidez operacional, transformando o momento do sinistro em algo resolutivo e sem complicações para o cliente."
    faqs={[
      {
        q: "O que é o HDI Bate-Pronto em Guarulhos?",
        a: "É um centro de atendimento onde você leva seu carro após uma colisão e a vistoria é feita na hora. Em Guarulhos, a HDI possui unidades que agilizam a liberação do conserto em poucos minutos."
      },
      {
        q: "Seguro HDI é confiável?",
        a: "Sim, é uma seguradora alemã com décadas de história no Brasil e nota excelente em órgãos reguladores, sendo referência em agilidade tecnológica."
      },
      {
        q: "A HDI é boa para motoristas jovens?",
        a: "Sim, a HDI costuma ter tabelas muito competitivas para o público jovem e também para veículos novos e zero quilômetro."
      },
      {
        q: "Como acionar o guincho da HDI em Guarulhos?",
        a: "O acionamento é muito simples através do aplicativo HDI ou pelo WhatsApp. Como a HDI possui muitos clientes na região, a rede de guinchos em Guarulhos é bastante densa e rápida."
      }
    ]}
    claimChannels={[
      { type: 'whatsapp', value: '11 9303-3434', label: 'WhatsApp' },
      { type: 'phone', value: '0800 701 5430', label: 'Assistência 24h' },
      { type: 'app', value: 'App HDI Seguros', label: 'Aplicativo' },
      { type: 'web', value: 'hdi.com.br', label: 'Sinistro Online' }
    ]}
  />
);

export default HDIGuarulhos;