import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ServiceSchema from "@/components/ServiceSchema";
import ComparisonTableResidencial from "@/components/ComparisonTableResidencial";
import { buildCommercialLocalPage } from "@/data/localCommercialContent";
import { trilhaResidencial } from "@/lib/trilhaSeoRecomendacoes";
import heroImg from "@/assets/hero-seguro-residencial.webp";

const content = buildCommercialLocalPage("residencial", { slug: "seguro-residencial", bairro: "Guarulhos" });
const SeguroResidencial = () => (
  <>
    <ServiceSchema
      name="Seguro Residencial"
      description="Orientação para comparar seguro residencial em Guarulhos: construção, bens, responsabilidades e assistência conforme as condições da proposta."
      serviceType="HomeInsurance"
    />
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Residencial em Guarulhos | Patro Seguros"
      quoteUrl="https://www.patroseguros.com.br/cotacao?tipo=residencial"
      headline="Seguro residencial em Guarulhos para casa e apartamento"
      subtitle="Compare a proteção da construção, dos bens e das responsabilidades do morador"
      icon="🏠"
      metaDescription="Seguro residencial em Guarulhos: compare coberturas, franquias e limites para casa ou apartamento. Solicite uma proposta com a Patro Seguros."
      description={content.description}
      detailedDescription={content.detailedDescription}
      howItWorks={[
        { step: "1", title: "Informe o imóvel e seus bens", description: content.tips[0] },
        { step: "2", title: "Compare as condições", description: "Confira quais bens e eventos estão previstos, os limites por cobertura, as franquias e as exclusões. Assistência e indenização têm regras diferentes." },
        { step: "3", title: "Confirme a contratação", description: "A seguradora pode solicitar documentos e inspeção. Confira a aceitação e o início da vigência; o envio do formulário ou o pagamento não substitui essa confirmação." },
        { step: "4", title: "Guarde os canais de atendimento", description: "Use os procedimentos e canais indicados na apólice para assistência e sinistros. Prazos e serviços dependem das condições contratadas." },
      ]}
      coverages={content.coverages}
      coverageExclusions={[
        "Desgaste e falta de manutenção: confira as exclusões da proposta",
        "Joias, obras de arte e outros bens especiais podem exigir declaração e aceitação específicas",
        "Imóvel desocupado, em reforma ou com locação temporária deve ter seu uso informado e aceito",
        "Furto simples, infiltração e alagamento não devem ser presumidos como cobertos",
        "Os exemplos não substituem a lista de exclusões do produto contratado",
      ]}
      pricingInfo={{ intro: content.pricingIntro, factors: content.pricingFactors, note: content.pricingNote }}
      realScenarios={[]}
      importantDetails={[
        { title: "Assistência residencial tem limites", content: "Confira serviços, horários, área de atendimento, número de utilizações e valores de mão de obra. Materiais e reposição de peças podem não estar incluídos. Não presuma atendimento ilimitado ou prazo de chegada." },
        { title: "Proprietário, inquilino e condomínio", content: "Confira as obrigações da locação e o que já está segurado pelo proprietário ou pelo condomínio. Construção, bens do morador e responsabilidade civil precisam ser avaliados separadamente. O seguro residencial não garante automaticamente o recebimento do aluguel." },
        { title: "Valores e critérios de indenização", content: "Informe os bens e valores corretamente. Confira os critérios de reposição, depreciação, limites e eventual aplicação de rateio ou subseguro na proposta. Não há uma fórmula única válida para todas as apólices." },
      ]}
      tips={content.tips}
      whoNeeds={content.whoNeeds}
      whyPatro={content.whyPatro}
      faqs={content.faqs}
      contextualLinks={{
        heading: "Da dúvida à proposta para seu imóvel",
        paragraphs: [
          "Se está pesquisando atendimento na sua região, consulte os bairros de Guarulhos. Para imóveis mobiliados ou com locação temporária, informe esse uso antes de comparar propostas.",
          "O seguro do condomínio e o seguro fiança têm finalidades distintas do residencial. Consulte as modalidades para evitar contratar uma proteção diferente da sua necessidade.",
        ],
        links: [
          { text: "Seguros nos bairros de Guarulhos", href: "/seguros-guarulhos" },
          { text: "Seguro para flats e imóveis mobiliados", href: "/seguro-flat-guarulhos" },
          { text: "Seguro condomínio", href: "/seguro-condominio" },
          { text: "Seguro fiança locatícia", href: "/seguro-fianca-locaticia" },
          { text: "Como comparar seguradoras", href: "/como-comparar-seguradoras-guarulhos" },
          { text: "Artigos e orientações sobre seguros", href: "/blog" },
          { text: "Solicitar cotação residencial", href: "/cotacao?tipo=residencial" },
        ],
      }}
      relatedInsurances={[
        { title: "Seguros em Guarulhos", link: "/seguros-guarulhos" },
        { title: "Seguro condomínio", link: "/seguro-condominio" },
        { title: "Seguro fiança locatícia", link: "/seguro-fianca-locaticia" },
        { title: "Seguro auto", link: "/seguro-auto" },
        { title: "Seguro de vida", link: "/seguro-vida" },
        { title: "Cotação de seguro residencial online", link: "/cotacao-seguro-residencial-online" },
        { title: "Seguro para flats e imóveis mobiliados", link: "/seguro-flat-guarulhos" },
      ]}
      extraSections={<ComparisonTableResidencial />}
      quoteFormFields={[
        { id: "tipo", label: "Tipo de imóvel", placeholder: "Selecione", type: "select", options: ["Casa", "Apartamento", "Flat", "Casa em Condomínio", "Chácara / Lazer"] },
        { id: "condicao", label: "Condição de uso", placeholder: "Selecione", type: "select", options: ["Moradia Própria", "Alugado (Inquilino)", "Alugado (Proprietário)", "Temporada / Airbnb"] },
        { id: "cep", label: "CEP do imóvel", placeholder: "Ex: 07115-000", type: "text" },
        { id: "valor_bens", label: "Valor estimado dos bens", placeholder: "Selecione", type: "select", options: ["Até R$ 50 mil", "R$ 50 mil a R$ 100 mil", "R$ 100 mil a R$ 250 mil", "Acima de R$ 250 mil"] },
      ]}
      canonicalUrl="https://www.patroseguros.com.br/seguro-residencial"
      trilhaSeo={{ subtitle: "Outras proteções para avaliar conforme suas necessidades.", items: trilhaResidencial }}
    />
    <ExitIntentPopup />
  </>
);

export default SeguroResidencial;
