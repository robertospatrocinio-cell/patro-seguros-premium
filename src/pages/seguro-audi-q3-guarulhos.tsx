import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const AudiQ3Guarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro Audi Q3 em Guarulhos"
    subtitle="Tecnologia Alemã sob Proteção Máxima — Cobertura completa Audi"
    description="O Audi Q3 combina elegância e esportividade urbana em Guarulhos. Para manter a excelência tecnológica das quatro argolas, o seguro deve ser ágil e eficiente. A Patro Seguros oferece o equilíbrio ideal entre prêmio competitivo e coberturas robustas para donos de Audi."
    icon="🌑"
    coverages={[
      { title: "Sistemas de Infotenimento", description: "Proteção para as telas e sistemas eletrônicos internos do Q3." },
      { title: "Faróis em LED e Matriz", description: "Cobertura específica para a troca de sistemas de iluminação de alto custo." },
      { title: "Reparo em Concessionária", description: "Livre escolha de oficinas ou rede autorizada Audi em São Paulo/Guarulhos." },
      { title: "Danos por Fenômenos Naturais", description: "Proteção total contra alagamentos e tempestades." }
    ]}
    whoNeeds={["Donos de Audi Q3", "Público executivo de Guarulhos", "Amantes de tecnologia automotiva"]}
    whyPatro={["Consultoria para marcas de luxo", "Rapidez no pagamento de sinistros complexos", "As melhores seguradoras parceiras Audi"]}
    faqs={[
      { question: "O seguro Audi é caro em Guarulhos?", answer: "Para moradores de condomínios no Jardim Maia ou Vila Augusta, as taxas costumam ser muito atrativas." },
      { question: "Como funciona a cobertura de vidros?", answer: "Garantimos a reposição de vidros originais com sensor de chuva e câmeras." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=audi-q3"
  />
);

export default AudiQ3Guarulhos;