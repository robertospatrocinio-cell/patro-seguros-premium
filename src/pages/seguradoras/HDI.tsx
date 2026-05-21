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
  />
);

export default HDIGuarulhos;