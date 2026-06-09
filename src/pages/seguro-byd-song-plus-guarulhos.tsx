import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const BydSongPlusGuarulhos = () => (
  <InsurancePageTemplate 
    title="Seguro BYD Song Plus em Guarulhos"
    subtitle="Segurança para seu Híbrido Plug-in — Cobertura contra incêndio e colisão"
    description="O BYD Song Plus DM-i é o SUV híbrido plug-in favorito de Guarulhos. Combinando o melhor dos dois mundos (combustão e elétrico), ele exige uma apólice versátil que cubra ambos os sistemas. A Patro Seguros oferece análise técnica para garantir que seu Song Plus esteja 100% protegido contra imprevistos."
    icon="🔋"
    coverages={[
      { title: "Sistemas Híbridos", description: "Proteção completa para o motor a combustão e o sistema de tração elétrica." },
      { title: "Danos por Enchente", description: "Proteção vital para os componentes eletrônicos sensíveis em áreas de risco de Guarulhos." },
      { title: "Carro Reserva Híbrido", description: "Garantia de mobilidade com veículos de categoria similar." },
      { title: "Peças Originais", description: "Garantia de reparo em concessionária com peças genuínas BYD." }
    ]}
    whoNeeds={["Famílias de Guarulhos com Song Plus", "Empresários que buscam economia e tecnologia", "Usuários de SUV Híbrido"]}
    whyPatro={["Parceria com seguradoras focadas em tecnologia", "Rapidez no atendimento de sinistros híbridos", "Consultoria local no Cidade Maia"]}
    faqs={[
      { question: "O seguro cobre danos no cabo de recarga?", answer: "Sim, oferecemos coberturas opcionais para acessórios e equipamentos de recarga." },
      { question: "Como funciona a assistência para híbridos?", answer: "Assistência 24h preparada para lidar com as particularidades técnicas do motor DM-i." }
    ]}
    quoteUrl="/cotacao?tipo=auto&modelo=byd-song-plus"
  />
);

export default BydSongPlusGuarulhos;