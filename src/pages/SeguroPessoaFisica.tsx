import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ServiceSchema from "@/components/ServiceSchema";
import { Shield, User, Heart, Car, Home, Plane, Umbrella } from "lucide-react";
import heroImg from "@/assets/hero-seguro-vida.webp"; // Using as placeholder

const SeguroPessoaFisica = () => {
  return (
    <>
      <ServiceSchema
        name="Seguros para Pessoa Física"
        description="Soluções completas de seguros para você em Guarulhos: Auto, Residencial, Vida, Saúde e muito mais. Proteção individual com cotação em 16 seguradoras e consultoria especializada da Patro Seguros."
        serviceType="InsuranceAgency"
      />
      <InsurancePageTemplate
        heroImage={heroImg}
        title="Seguros para Pessoa Física em Guarulhos | Proteção Individual | Patro"
        headline="Seguros completos para você e seu patrimônio em Guarulhos"
        subtitle="Consultoria individual para proteger o que você conquistou: do carro à sua própria saúde"
        icon="👤"
        metaDescription="Seguros para pessoa física em Guarulhos: auto, residencial, vida, saúde, viagem e mais. Compare 16 seguradoras e economize com a Patro Seguros."
        description="Para a pessoa física, o seguro não é apenas um custo, mas a garantia de que um imprevisto não destruirá o patrimônio de uma vida inteira. Na Patro Seguros, tratamos cada CPF com a exclusividade que ele merece, comparando preços em 16 seguradoras para encontrar a melhor proteção para o seu momento de vida."
        detailedDescription={`O mercado de seguros para pessoa física evoluiu. Hoje, não se trata apenas de 'fazer o seguro do carro'. Trata-se de estruturar uma rede de proteção que cubra sua mobilidade (Auto/Moto), sua moradia (Residencial), sua saúde e a segurança financeira de quem você ama (Vida/Previdência).

Em Guarulhos, onde os riscos urbanos são reais, ter uma corretora local faz a diferença na hora do sinistro. Nós conhecemos os melhores hospitais da região, as oficinas de confiança e os bairros com maior incidência de roubo — o que nos permite cotar com precisão e defender seu interesse junto à seguradora.`}
        coverages={[
          { title: "Seguro Auto & Moto", description: "Proteção completa contra colisão, roubo, furto e danos a terceiros. Inclui assistência 24h com guincho e carro reserva." },
          { title: "Seguro Residencial", description: "Protege sua casa ou apartamento contra incêndio, roubo, danos elétricos e vendaval. Assistência para pequenos reparos inclusa." },
          { title: "Seguro de Vida", description: "Garante a estabilidade financeira da sua família em caso de morte ou invalidez, além de cobertura para doenças graves." },
          { title: "Plano de Saúde & Odonto", description: "Acesso aos melhores hospitais de Guarulhos e SP (Stella Maris, Carlos Chagas, Ipiranga) com rede credenciada ampla." },
          { title: "Seguro Viagem", description: "Tranquilidade em viagens nacionais e internacionais com cobertura médica, extravio de bagagem e cancelamento." },
          { title: "Previdência Privada", description: "Planejamento para sua aposentadoria com benefícios fiscais e rentabilidade superior à poupança." },
        ]}
        whoNeeds={[
          "Proprietários de veículos (carros, motos, caminhonetes)",
          "Dona(o)s de casa e proprietários de apartamentos",
          "Pessoas com dependentes financeiros",
          "Viajantes frequentes a lazer ou trabalho",
          "Quem busca atendimento de saúde de qualidade em Guarulhos",
          "Planejadores financeiros de longo prazo",
        ]}
        pricingInfo={{
          intro: "Os valores variam conforme o perfil, mas aqui estão estimativas médias para o mercado de Guarulhos:",
          factors: [
            "Seguro Auto: a partir de R$ 120/mês (conforme veículo e perfil)",
            "Seguro Residencial: a partir de R$ 15/mês (proteção de R$ 100k)",
            "Seguro de Vida: a partir de R$ 30/mês (conforme idade)",
            "Plano de Saúde: a partir de R$ 280/mês (individual jovem)",
            "Seguro Celular: a partir de R$ 25/mês",
          ],
          note: "Cotações personalizadas levam em conta seu CEP em Guarulhos, idade e histórico. Comparamos em 16 seguradoras em até 2 horas.",
        }}
        faqs={[
          { question: "A Patro atende qualquer bairro de Guarulhos?", answer: "Sim! Atendemos Centro, Maia, Vila Augusta, Cumbica, Pimentas, Bonsucesso e todos os demais bairros com consultoria local." },
          { question: "Posso unificar meus seguros na Patro?", answer: "Com certeza. Muitos clientes ganham descontos progressivos ao contratar o 'Combo Família' (Auto + Residencial + Vida)." },
          { question: "Vocês cobram pela consultoria?", answer: "Não. A consultoria e a cotação são 100% gratuitas. Recebemos das seguradoras, e você paga o preço oficial (muitas vezes menor que no banco)." },
        ]}
        relatedInsurances={[
          { title: "Seguro Auto", link: "/seguro-auto" },
          { title: "Seguro Residencial", link: "/seguro-residencial" },
          { title: "Seguro de Vida", link: "/seguro-vida" },
          { title: "Planos de Saúde", link: "/planos-de-saude" },
        ]}
        quoteUrl="/cotacao"
        canonicalUrl="https://www.patroseguros.com.br/seguro-pessoa-fisica"
      />
    </>
  );
};

export default SeguroPessoaFisica;