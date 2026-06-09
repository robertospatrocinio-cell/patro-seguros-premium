import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const FordRangerGuarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro Ford Ranger em Guarulhos"
    subtitle="Força e Raça Protegidas — Seguro completo para sua pickup 4x4"
    description="A Ford Ranger é sinônimo de versatilidade, do trabalho no campo ao lazer em Guarulhos. Com sua nova geração tecnológica, ela exige uma proteção que cubra desde a mecânica complexa até o valor de mercado. A Patro Seguros oferece consultoria para donos de Ranger que não abrem mão de segurança."
    icon="🛻"
    coverages={[
      { title: "Uso Profissional e Lazer", description: "Proteção garantida independente do uso do veículo em Guarulhos." },
      { title: "Carga e Acessórios", description: "Seguro para sua carga na caçamba e acessórios instalados." },
      { title: "Assistência de Guincho Pesado", description: "Guincho preparado para pickup 4x4 em qualquer terreno." },
      { title: "Danos de Colisão e Tombamento", description: "Garantia total de reparo com peças genuínas Ford." }
    ]}
    whoNeeds={["Proprietários de Ford Ranger", "Produtores rurais da região", "Empresários de logística e serviços"]}
    whyPatro={["Rapidez na análise de frotas e pickups", "As melhores condições nas renovações Ford", "Atendimento local especializado"]}
    faqs={[
      { question: "O seguro da Ranger aceita acessórios de caçamba?", answer: "Sim, é possível listar capotas marítimas e outros itens na apólice." },
      { question: "Como economizar na renovação?", answer: "Manter a classe de bônus e o uso de rastreadores são as chaves para o melhor preço." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=ford-ranger"
  />
);

export default FordRangerGuarulhos;