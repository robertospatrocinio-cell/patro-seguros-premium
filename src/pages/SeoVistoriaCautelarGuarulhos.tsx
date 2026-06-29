import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoVistoriaCautelarGuarulhos = () => (
  <LocalPageTemplate
    slug="seguro-vistoria-cautelar"
    title="Seguro para Empresa de Vistoria Cautelar em Guarulhos"
    subtitle="Proteção para empresas de perícia cautelar e avaliação de procedência."
    metaDescription="Seguro para empresas de vistoria cautelar em Guarulhos. Proteja seus equipamentos de análise e garanta cobertura contra erros de laudo. Cote agora."
    icon="🔍"
    city="Guarulhos"
    description="A vistoria cautelar exige precisão e segurança jurídica. Proteja sua empresa de perícia automotiva com apólices exclusivas da Patro Seguros."
    detailedDescription="Empresas que realizam vistoria cautelar são o 'selo de confiança' na compra e venda de seminovos. Uma falha ao não identificar uma batida estrutural ou leilão pode resultar em prejuízos altíssimos e danos à reputação.\n\nA Patro Seguros entende esse risco e oferece seguros que cobrem desde o roubo de tablets e scanners de diagnóstico até a responsabilidade civil por laudos imprecisos. Atendemos diversas franquias e empresas independentes de perícia em Guarulhos."
    pricing={{
      intro: "Preços moldados para o varejo de vistorias, com opções para unidades individuais ou redes de franquias.",
      factors: [
        "Volume de vistorias por mês",
        "Valor de tablets e scanners",
        "Limites de responsabilidade civil",
        "Sistemas de segurança do pátio"
      ],
      note: "Oferecemos descontos para empresas com certificação de qualidade ou processos auditados."
    }}
    faqs={[
      { question: "O seguro cobre erro em laudo cautelar?", answer: "Sim, através da cobertura de Responsabilidade Civil Profissional para peritos e vistoriadores." },
      { question: "Tablets e scanners estão protegidos?", answer: "Sim, cobrimos roubo, furto qualificado e danos elétricos em equipamentos portáteis." },
      { question: "Preciso de seguro para o pátio?", answer: "Sim, o seguro empresarial protege os veículos de clientes enquanto estiverem sob sua responsabilidade para a vistoria." },
      { question: "Atendem redes de franquia de vistoria?", answer: "Sim, estruturamos apólices guarda-chuva para redes com múltiplas unidades em Guarulhos e SP." },
      { question: "O que é cobertura de danos morais?", answer: "Garante indenização caso um erro de laudo resulte em processos por danos à imagem ou moral do cliente." }
    ]}
    insurers={[
      { name: "Porto Seguro", highlight: "Referência em automóveis e serviços" },
      { name: "Tokio Marine", highlight: "Melhor custo em RC Profissional" },
      { name: "Liberty Seguros", highlight: "Flexibilidade para PMEs" },
      { name: "Bradesco Seguros", highlight: "Solidez e rapidez no pagamento" }
    ]}
    testimonials={[
      { author: "Fernando G.", neighborhood: "Jardim Maia", quote: "Excelente atendimento para nossa unidade de perícia. Seguro sob medida.", rating: 5 },
      { author: "Patrícia K.", neighborhood: "Centro", quote: "A Patro nos ajudou a entender os riscos que nem sabíamos que tínhamos.", rating: 5 }
    ]}
    realScenarios={[
      { title: "Indenização por Batida Oculta", description: "Um carro foi aprovado, mas tinha batida estrutural não detectada. O seguro cobriu a indenização ao comprador final." },
      { title: "Roubo de Scanner", description: "Um equipamento de diagnóstico de R$ 8 mil foi furtado. O seguro empresarial pagou 100% do valor de mercado." }
    ]}
    coverages={[
      { title: "RC por Laudos", description: "Erros de perícia e avaliação." },
      { title: "Equipamentos Portáteis", description: "Tablets, scanners e câmeras." },
      { title: "Responsabilidade Civil Pátio", description: "Danos aos veículos de clientes." },
      { title: "Danos Elétricos", description: "Proteção contra picos de energia." }
    ]}
    whoNeeds={["Peritos Automotivos", "Empresas de Perícia Cautelar", "Franquias de Vistoria", "Avaliadores de Veículos"]}
    whyPatro={["Líder em Guarulhos", "Atendimento no Cidade Maia", "Especialistas no Setor", "Nota 4.7 no Google"]}
    tips={["Sempre fotografe o estado do veículo antes de iniciar a perícia.", "Mantenha o backup dos laudos em nuvem segura.", "Avalie a cobertura de Lucros Cessantes para pátios."]}
    relatedInsurances={[
      { title: "Seguro Vistoria Veicular", link: "/seguro-para-empresas-de-vistoria-veicular" },
      { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" }
    ]}
    heroImage={heroImg}
  />
);

export default SeoVistoriaCautelarGuarulhos;
