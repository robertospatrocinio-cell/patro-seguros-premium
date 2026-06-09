import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const TokioMarineGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Tokio Marine"
    accentColor="#008375"
    description="Qualidade japonesa com expertise brasileira. A Tokio Marine é uma das seguradoras preferidas dos guarulhenses pelo custo-benefício e agilidade no pagamento de indenizações."
    keywords={["TokioMarineGuarulhos", "CotaçãoTokioMarine", "SeguroAutoTokio", "TokioMarineResidencial"]}
    benefits={[
      "Agilidade recorde na liberação de sinistros",
      "Diversas opções de franquia para reduzir o valor do seguro",
      "Assistência 24h completa com guincho e chaveiro",
      "Selo de Qualidade Japonesa no atendimento",
      "Preços competitivos para diversos perfis de motoristas em Guarulhos"
    ]}
    history="A Tokio Marine Seguradora faz parte do Grupo Tokio Marine, um dos maiores conglomerados securitários do mundo. No Brasil, consolidou-se pela inovação tecnológica e por oferecer planos que se adaptam perfeitamente à realidade do trânsito de grandes cidades como Guarulhos."
    faqs={[
      {
        q: "Seguro da Tokio Marine é confiável?",
        a: "Extremamente confiável. É uma das seguradoras com melhor índice de satisfação no Reclame Aqui e reconhecida mundialmente pela solvência financeira e seriedade."
      },
      {
        q: "Como é o atendimento da Tokio Marine em Guarulhos?",
        a: "A Tokio Marine possui uma excelente rede de oficinas referenciadas em Guarulhos e prestadores de assistência 24h que conhecem bem as rotas da cidade, como a Dutra e a Fernão Dias."
      },
      {
        q: "O seguro auto da Tokio é barato em Guarulhos?",
        a: "A Tokio Marine é famosa pelo excelente custo-benefício. Em muitos perfis de condutores de Guarulhos (como motoristas de 30 a 50 anos), ela apresenta os preços mais competitivos do mercado."
      },
      {
        q: "A Tokio Marine aceita carros com rastreador?",
        a: "Sim, e inclusive oferece descontos significativos para veículos que possuem dispositivos de segurança instalados, o que é uma ótima estratégia para economizar em Guarulhos."
      }
    ]}
  />
);

export default TokioMarineGuarulhos;