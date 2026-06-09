import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const GwmHavalH6Guarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro GWM Haval H6 em Guarulhos"
    subtitle="Tranquilidade para seu Smart SUV — Cobertura completa para a linha Haval"
    description="O GWM Haval H6 conquistou Guarulhos com seu design imponente e tecnologias semiautônomas. Proteger um veículo com tantos sensores e radares (ADAS) exige uma seguradora que tenha know-how em tecnologia chinesa de ponta. A Patro Seguros compara as melhores opções do mercado para o seu GWM."
    icon="🛡️"
    coverages={[
      { title: "Sensores e Radares (ADAS)", description: "Proteção para os sistemas de auxílio à condução em caso de pequenas batidas." },
      { title: "Bateria do Sistema Híbrido", description: "Cobertura específica para a bateria de tração do seu HEV ou PHEV." },
      { title: "Assistência 24h Exclusiva", description: "Atendimento ágil em qualquer ponto de Guarulhos e rodovias." },
      { title: "Danos por Colisão", description: "Reparo garantido com peças originais e tecnologia de ponta." }
    ]}
    whoNeeds={["Proprietários de GWM Haval H6", "Quem busca SUV com alta tecnologia", "Clientes que valorizam custo-benefício em elétricos/híbridos"]}
    whyPatro={["Parceria oficial com as seguradoras que mais aceitam GWM", "Análise de preços em tempo real em Guarulhos", "Suporte completo no Cidade Maia"]}
    faqs={[
      { question: "O Haval H6 tem seguro caro?", answer: "Atualmente as taxas estão muito competitivas, muitas vezes abaixo da média de SUVs a combustão tradicionais." },
      { question: "Como funciona a vistoria?", answer: "Pode ser feita 100% online através de fotos e aplicativos, com total comodidade." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=gwm-haval-h6"
  />
);

export default GwmHavalH6Guarulhos;