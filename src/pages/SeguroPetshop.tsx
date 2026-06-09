import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-plano-pet.webp";

const SeguroPetshop = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Pet Shops"
      subtitle="Proteção completa para lojas, banho, tosa e estética animal"
      icon="🐈"
      badge="Especialista em Negócios Pet"
      metaDescription="Seguro para Pet Shops em Guarulhos: proteção contra incêndio, roubo, acidentes no banho e tosa e RC sob custódia. Cotação grátis Patro Seguros."
      description="Gerenciar um pet shop envolve cuidar do patrimônio e dos animais sob sua guarda. Nosso seguro protege sua loja e sua reputação contra imprevistos no dia a dia."
      detailedDescription={`Pet shops possuem riscos operacionais muito específicos na área de estética e banho e tosa. Acidentes com lâminas, quedas da mesa ou fugas podem gerar grandes transtornos e processos.

O seguro da Patro Seguros para pet shops contempla a Responsabilidade Civil Animais sob Custódia, garantindo indenizações e suporte em caso de incidentes com os pets dos seus clientes.

Além disso, protegemos seu estoque de rações, acessórios e medicamentos contra incêndio, roubo e danos elétricos em secadores e sopradores industriais.`}
      quoteFormFields={veterinariaFormFields}
      coverages={[
        { title: "RC Animais sob Custódia", description: "Cobre acidentes, fugas e óbitos durante banho, tosa ou hotel." },
        { title: "Roubo e Furto de Estoque", description: "Segurança para medicamentos, acessórios premium e rações." },
        { title: "Danos Elétricos (Estética)", description: "Proteção para sopradores, secadores e máquinas de tosa." },
        { title: "Incêndio e Danos à Loja", description: "Cobre a estrutura do imóvel e as benfeitorias instaladas." },
      ]}
      whoNeeds={["Pet Shops de Bairro", "Grandes Magazines Pet", "Daycares e Hotéis para Cães", "Banho e Tosa Móvel"]}
      whyPatro={["Consultoria para correta verba de RC", "Comparativo entre seguradoras pet", "Foco no pequeno empreendedor de Guarulhos"]}
      faqs={[
        { question: "Cobre se o animal fugir da guia na porta da loja?", answer: "Sim, desde que esteja sob sua responsabilidade no momento." }
      ]}
    />
  );
};

export default SeguroPetshop;
