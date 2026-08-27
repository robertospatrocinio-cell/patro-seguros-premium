import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-auto.webp";

const CentralDeSinistro = () => (
  <>
    <PrerenderText slug="central-de-sinistro" />
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Central de Sinistros | Ajuda e Assistência 24h | Patro"
      headline="O que fazer em caso de sinistro: atendimento e orientação"
      subtitle="Atendimento humano para colisão, roubo, furto e assistência 24h. Você não precisa passar por isso sozinho."
      description="Nossa central de sinistros existe para orientar você nos momentos mais difíceis. Explicamos como proceder, quais documentos reunir e como acionar a seguradora com calma e segurança. Aqui não se vende seguro: oferecemos suporte real para que você tome as decisões certas."
      icon="🆘"
      metaDescription="Central de Sinistros Patro Seguros: atendimento e orientação em caso de colisão, roubo ou furto. Assistência 24h e suporte humano em Guarulhos."
      supportMode
      supportCtaText="Falar com Atendimento"
      coverages={[
        { title: "Orientação em Colisão", description: "Passo a passo para registro de ocorrência, fotos e remoção do veículo sem perder direitos." },
        { title: "Roubo ou Furto", description: "Como fazer o bloqueio, registrar o BO e acionar a seguradora da forma correta." },
        { title: "Assistência 24h", description: "Guincho, chaveiro, pane seca e outros serviços em qualquer lugar do Brasil." },
        { title: "Danos a Terceiros", description: "Orientação quando há envolvimento de outros veículos, pedestres ou propriedades." },
      ]}
      whoNeeds={[
        "Quem sofreu um sinistro e não sabe por onde começar",
        "Clientes que precisam de guincho ou assistência urgente",
        "Quem quer entender o passo a passo da indenização",
      ]}
      whyPatro={[
        "Atendimento humano do início ao fim do processo",
        "Canal direto de WhatsApp para sinistros",
        "Intermediação técnica e transparente com a seguradora",
      ]}
      howItWorks={[
        { step: "1", title: "Mantenha a calma", description: "Garanta sua segurança e a de terceiros. Não mova o veículo antes de registrar a cena, se for seguro." },
        { step: "2", title: "Registre a ocorrência", description: "Em colisões, chame a polícia quando necessário. Em roubo/furto, faça o Boletim de Ocorrência." },
        { step: "3", title: "Entre em contato conosco", description: "Fale com nosso atendimento pelo WhatsApp ou telefone. Nós orientamos você na comunicação com a seguradora." },
        { step: "4", title: "Acompanhe a indenização", description: "Nossa equipe acompanha cada etapa até a conclusão do sinistro, esclarecendo dúvidas ao longo do caminho." },
      ]}
      importantDetails={[
        { title: "Documentos úteis em caso de sinistro", content: "Tenha em mãos a apólice, CNH, CRLV, BO (quando aplicável), fotos do local e dos danos, e dados dos terceiros envolvidos." },
        { title: "Horário de atendimento", content: "Nosso canal de sinistros funciona durante o horário comercial. Para emergências fora desse horário, acione diretamente a seguradora pelo 0800 da apólice." },
      ]}
      faqs={[
        { question: "O que fazer logo após uma batida?", answer: "Sinalize o local, verifique se há feridos e, se possível, tire fotos dos danos e da posição dos veículos antes de removê-los da via. Depois, entre em contato conosco para orientação." },
        { question: "Como aciono o guincho?", answer: "Você pode ligar diretamente para o 0800 da sua seguradora ou falar com nosso atendimento para que orientemos o acionamento." },
        { question: "A Patro vende seguro na central de sinistros?", answer: "Não. A central de sinistros é exclusiva para atendimento e orientação. Nosso objetivo é ajudar você a resolver a situação com calma e suporte técnico." },
        { question: "Quais documentos preciso para abrir o sinistro?", answer: "Geralmente são necessários apólice, CNH, CRLV, Boletim de Ocorrência (quando houver), fotos do local e dados de terceiros envolvidos. Cada caso pode exigir documentos adicionais." },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro Moto", link: "/seguro-moto" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  </>
);

export default CentralDeSinistro;
