import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-auto.webp";

const CentralDeSinistro = () => (
  <>
    <PrerenderText slug="central-de-sinistro" />
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Central de Sinistros | Ajuda e Assistência 24h | Patro"
      headline="O Que Fazer em Caso de Sinistro: Guia de Assistência"
      subtitle="Suporte completo para colisão, roubo, furto e assistência 24h."
      description="Nossa central de sinistros está pronta para te auxiliar nos momentos mais difíceis. Saiba como proceder e quais documentos são necessários para garantir sua indenização com agilidade."
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
    />
  </>
);

export default CentralDeSinistro;
