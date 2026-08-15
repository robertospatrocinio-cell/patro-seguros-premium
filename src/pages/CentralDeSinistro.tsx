import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-auto.webp";

const CentralDeSinistro = () => (
  <>
    <PrerenderText slug="central-de-sinistro" />
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Central de Sinistros"
      headline="O que fazer em caso de sinistro: guia de assistência"
      subtitle="Suporte completo para colisão, roubo, furto e assistência 24h."
      description="Nossa Central de Sinistros está pronta para te atender nos momentos mais difíceis. Saiba como proceder e quais documentos são necessários para garantir sua indenização com agilidade. Você fala com a Patro pelo WhatsApp ou telefone (11) 5199-7500, e nossa equipe abre o aviso na seguradora, orienta sobre a documentação e acompanha cada etapa — da vistoria à liberação do veículo ou pagamento da indenização."
      icon="🆘"
      metaDescription="Central de Sinistro Patro Seguros: saiba como proceder em caso de colisão, roubo ou furto. Assistência 24h e suporte completo em Guarulhos."
      coverages={[
        { title: "Atendimento Colisão", description: "Orientação para registro de ocorrência e remoção do veículo." },
        { title: "Roubo ou Furto", description: "Passo a passo para bloqueio e acionamento da seguradora." },
        { title: "Assistência 24h", description: "Guincho, chaveiro e auxílio pane em qualquer lugar do Brasil." },
        { title: "Danos a Terceiros", description: "Como proceder quando houver envolvimento de outros veículos." },
      ]}
      whoNeeds={[
        "Clientes com sinistro em andamento",
        "Pessoas que precisam de guincho agora",
        "Quem quer saber como funciona o pós-venda da Patro",
      ]}
      whyPatro={[
        "Acompanhamento dedicado do início ao fim do processo",
        "Canal direto de WhatsApp para sinistros",
        "Intermediação técnica com a seguradora",
      ]}
      faqs={[
        { question: "O que fazer logo após uma batida?", answer: "Sinalize o local, verifique se há feridos e, se possível, tire fotos dos danos e da posição dos veículos antes de removê-los da via." },
        { question: "Como aciono o guincho?", answer: "Você pode ligar diretamente para o 0800 da sua seguradora ou entrar em contato com nosso suporte para que façamos o acionamento para você." },
      ]}
      pricingInfo={{
        intro: "O atendimento da Central de Sinistros é um benefício exclusivo para clientes da Patro Seguros.",
        factors: ["Consultoria técnica", "Abertura de aviso", "Acompanhamento de vistoria"]
      }}
      importantDetails={[
        { title: "Como funciona a Central de Sinistros", content: "Nosso suporte é humanizado e técnico." },
        { title: "O que a Central de Sinistros cobre", content: "Orientação em todas as coberturas da sua apólice." },
        { title: "Quem deve usar a Central de Sinistros", content: "Todo cliente Patro com sinistro ativo." },
        { title: "Por que acionar a Central pela Patro", content: "Agilidade e defesa dos seus direitos." }
      ]}
      sectionCtas={{
        "faq-heading": { label: "Dúvidas sobre sinistro?", description: "Fale com um especialista agora", href: "https://wa.me/551151997500?text=Olá! Vim pelo site da Patro Seguros e gostaria de ajuda com um sinistro." }
      }}
    />
  </>
);

export default CentralDeSinistro;
