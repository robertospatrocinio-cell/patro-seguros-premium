import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/hero-seguro-auto.webp";

const SeoAutoPosVistoriaGuarulhos = () => (
  <LandingPageTemplate
    slug="seguro-auto-pos-vistoria"
    title="Seguro Auto Pós-Vistoria | Patro Seguros"
    subtitle="Acabou de comprar ou transferir um veículo? Garanta a proteção agora."
    metaDescription="Cote seu seguro auto após a vistoria em Guarulhos. Comparamos 16 seguradoras para veículos novos, seminovos e recém-transferidos. Cotação em 2h."
    description="Realizou a vistoria de transferência ou cautelar? Esse é o momento vital para proteger seu novo patrimônio. A Patro Seguros oferece cotações expressas para quem acabou de passar pela ECV."
    detailedDescription="Muitos proprietários esperam dias após a transferência para cotar o seguro, ficando expostos ao risco desnecessariamente. Na Patro Seguros, facilitamos o processo para quem já está com o laudo em mãos.\n\nOferecemos coberturas completas (compreensiva), apenas roubo e furto ou responsabilidade civil para terceiros. Seja um carro popular, SUV premium, moto ou caminhão, nós encontramos a melhor taxa entre as 16 maiores seguradoras do país."
    icon="🚗"
    pricing={{
      intro: "Cotações personalizadas com base no laudo de vistoria e perfil do condutor.",
      factors: [
        "Ano e modelo do veículo",
        "Resultado da vistoria cautelar",
        "CEP de pernoite em Guarulhos",
        "Uso do veículo (particular/app)"
      ],
      note: "Veículos com laudo cautelar aprovado costumam ter maior aceitação e melhores taxas nas seguradoras."
    }}
    faqs={[
      { question: "Fiz a vistoria hoje, já posso cotar?", answer: "Sim! Com os dados do laudo ou CRLV, já fazemos a cotação imediata em 16 seguradoras." },
      { question: "Aceitam carros com histórico de leilão?", answer: "Sim, trabalhamos com seguradoras especialistas (como a Suhai) que aceitam veículos com restrições e leilão com ótimas taxas." },
      { question: "Preciso levar o carro na corretora?", answer: "Não, o processo é 100% online. Se precisar de vistoria prévia da seguradora, agendamos no local de sua preferência em Guarulhos." },
      { question: "O seguro cobre motorista de aplicativo?", answer: "Sim, temos cláusulas específicas para quem vai rodar na Uber ou 99 logo após a transferência." },
      { question: "Quanto tempo demora para ativar o seguro?", answer: "Após o pagamento da primeira parcela ou aprovação da proposta, a cobertura pode ser imediata (conforme regras da seguradora)." }
    ]}
    insurers={[
      { name: "Porto Seguro", highlight: "Líder de mercado" },
      { name: "Tokio Marine", highlight: "Excelente custo-benefício" },
      { name: "Suhai Seguros", highlight: "Especialista em Roubo/Furto" },
      { name: "Allianz", highlight: "Cobertura completa e ágil" }
    ]}
    testimonials={[
      { author: "João P.", neighborhood: "Vila Galvão", quote: "Cotei logo após sair da ECV. Em 1 hora já estava com o carro segurado e tranquilo.", rating: 5 },
      { author: "Marcela S.", neighborhood: "Macedo", quote: "Ótimo preço e atendimento. Compararam tudo pra mim pelo WhatsApp.", rating: 5 }
    ]}
    realScenarios={[
      { title: "Proteção Imediata após Compra", description: "O cliente comprou o carro no Centro de Guarulhos, fez a vistoria e saiu com a apólice digital ativa no mesmo dia." },
      { title: "Seguro para Veículo de Leilão", description: "Após vistoria, o cliente conseguiu seguro de Roubo e Furto para seu carro de leilão com valor de mercado justo." }
    ]}
    coverages={[
      { title: "Seguro Auto Total", description: "Roubo, colisão e incêndio." },
      { title: "Seguro Moto", description: "Cotações para todas as cilindradas." },
      { title: "Seguro Caminhão", description: "Proteção para frotas e autônomos." },
      { title: "Assistência 24h", description: "Guincho e socorro em Guarulhos." }
    ]}
    whoNeeds={["Compradores de Veículos", "Novos Proprietários", "Motoristas de App", "Motociclistas"]}
    whyPatro={["Cotação Expressa em 2h", "Nota 4.9 no Google", "Consultoria Local", "Zero Burocracia"]}
    tips={["Informe se o veículo possui rastreador para baixar o preço.", "Compare sempre a franquia reduzida vs. normal.", "Tenha o laudo cautelar em mãos para agilizar a aceitação."]}
    relatedInsurances={[
      { title: "Seguro Vistoria Veicular", link: "/seguro-para-empresas-de-vistoria-veicular" },
      { title: "Seguro de Moto", link: "/seguro-moto" }
    ]}
    heroImage={heroImg}
  />
);

export default SeoAutoPosVistoriaGuarulhos;
