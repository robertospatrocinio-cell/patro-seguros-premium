import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoParceriaVistoriaGuarulhos = () => (
  <LandingPageTemplate
    slug="parceria-vistorias-veiculares"
    title="Programa Parceiro Patro Vistorias | Patro Seguros"
    subtitle="Transforme sua ECV em um canal de faturamento recorrente com seguro auto."
    metaDescription="Seja parceiro da Patro Seguros em sua empresa de vistoria. Indique seguros auto e ganhe comissões. Cadastro gratuito para ECVs em Guarulhos."
    description="O Programa Parceiro Patro Vistorias foi criado para empresas de vistoria veicular e ECVs que desejam agregar valor ao cliente e gerar uma nova fonte de receita através da indicação de seguro auto."
    detailedDescription="Muitos clientes realizam a vistoria exatamente no momento da compra ou transferência do veículo. Esse é o momento ideal para oferecer o seguro auto. Como parceiro da Patro Seguros, sua empresa indica o cliente e nossa equipe cuida de toda a cotação e fechamento.\n\nOferecemos comissões agressivas sobre cada negócio fechado, treinamento para sua equipe e suporte total. Sua ECV foca no laudo, nós focamos na proteção do veículo, e ambos crescem juntos em Guarulhos."
    icon="🤝"
    pricing={{
      intro: "O cadastro no programa de parceria é 100% gratuito e não exige exclusividade.",
      factors: [
        "Comissão por fechamento",
        "Treinamento de vendas incluso",
        "Materiais de divulgação gratuitos",
        "Plataforma de indicação online"
      ],
      note: "Receba seus repasses mensalmente direto na conta da sua empresa."
    }}
    faqs={[
      { question: "Como funciona o processo de indicação?", answer: "Sua equipe envia os dados básicos do cliente pelo nosso portal ou WhatsApp. Nós fazemos a cotação com 16 seguradoras e retornamos para o cliente." },
      { question: "Qual a comissão do parceiro?", answer: "Oferecemos percentuais competitivos sobre a comissão líquida do seguro fechado. Consulte nossa tabela atualizada." },
      { question: "Preciso vender o seguro?", answer: "Não. Sua equipe apenas identifica a oportunidade e indica. A venda técnica e o suporte pós-venda são feitos pela Patro Seguros." },
      { question: "Atendem ECVs de fora de Guarulhos?", answer: "Sim, o programa está aberto para empresas de vistoria de toda a região metropolitana de São Paulo." },
      { question: "Existe meta de vendas?", answer: "Não temos metas mínimas. Você indica conforme o fluxo da sua empresa e ganha sobre o que converter." }
    ]}
    insurers={[
      { name: "Patro Seguros", highlight: "Hub de 16+ seguradoras" },
      { name: "Porto Seguro", highlight: "Preferida dos clientes" },
      { name: "Tokio Marine", highlight: "Líder em custo-benefício" },
      { name: "Suhai Seguros", highlight: "Aceitação 100% (Roubo/Furto)" }
    ]}
    testimonials={[
      { author: "Ricardo (ECV Cumbica)", neighborhood: "Cumbica", quote: "A parceria com a Patro aumentou nosso faturamento mensal em 20% apenas com indicações.", rating: 5 },
      { author: "Sandra (Vistoria Centro)", neighborhood: "Centro", quote: "É muito simples indicar. O cliente sai satisfeito com o laudo e com o seguro.", rating: 5 }
    ]}
    realScenarios={[
      { title: "Indicação Convertida em 2h", description: "O cliente fez a vistoria, foi indicado e em 2 horas já estava com a apólice ativa antes de sair da loja." },
      { title: "Renda Extra para a Equipe", description: "O bônus de parceria ajudou a ECV a premiar seus vistoriadores, aumentando a motivação interna." }
    ]}
    coverages={[
      { title: "Seguro Auto", description: "O carro sai do pátio protegido." },
      { title: "Seguro Moto", description: "Cotações rápidas para motociclistas." },
      { title: "Seguro Caminhão", description: "Foco no polo logístico de Guarulhos." },
      { title: "Frotas", description: "Cotações para empresas compradoras." }
    ]}
    whoNeeds={["Donos de ECV", "Gerentes de Vistoria", "Vistoriadores", "Despachantes"]}
    whyPatro={["Processo 100% Digital", "Pagamento Pontual", "Suporte ao Cliente", "Marca de Confiança"]}
    tips={["Aborde o cliente logo após a aprovação do laudo.", "Destaque que a Patro compara 16 seguradoras em uma única vez.", "Mantenha o material de divulgação visível na recepção."]}
    relatedInsurances={[
      { title: "Seguro Vistoria Veicular", link: "/seguro-para-empresas-de-vistoria-veicular" },
      { title: "Seguro Auto (Indicação)", link: "/seguro-auto-pos-vistoria" }
    ]}
    heroImage={heroImg}
  />
);

export default SeoParceriaVistoriaGuarulhos;
