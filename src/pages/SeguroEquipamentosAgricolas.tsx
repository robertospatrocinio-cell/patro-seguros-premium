import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroEquipamentosAgricolas = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Equipamentos Agrícolas"
      subtitle="Proteção completa para implementos, pulverizadores, irrigação e equipamentos de precisão. Atendemos produtores de todos os estados do Brasil."
      description="O Seguro de Equipamentos Agrícolas protege seus implementos e ferramentas essenciais para a produção. Desde sistemas de irrigação até GPS agrícola e drones, oferecemos coberturas sob medida para garantir a continuidade da sua operação no campo. Atendemos produtores rurais em todos os estados — cotação, emissão e sinistro são feitos de forma 100% remota, com a mesma agilidade e qualidade."
      icon="⚙️"
      metaDescription="Seguro de Equipamentos Agrícolas em todo o Brasil — implementos, pulverizadores, irrigação e GPS agrícola. Proteção completa para o campo. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Incêndio e Raio", description: "Proteção contra incêndio, raio e explosão nos equipamentos." },
        { title: "Roubo e Furto", description: "Cobertura contra roubo e furto qualificado." },
        { title: "Danos Acidentais", description: "Proteção contra danos durante transporte e operação." },
        { title: "Vendaval e Granizo", description: "Cobertura para fenômenos naturais." },
      ]}
      whoNeeds={[
        "Produtores rurais que utilizam tecnologia no campo em qualquer estado",
        "Empresas de agricultura de precisão em todo o Brasil",
        "Cooperativas e associações rurais de todas as regiões",
        "Prestadores de serviços agrícolas",
      ]}
      whyPatro={[
        "Atendemos produtores de todos os estados do Brasil",
        "Conhecimento profundo do setor agrícola",
        "Coberturas específicas para cada tipo de equipamento",
        "Cotação e sinistro 100% remotos — por WhatsApp, telefone ou e-mail",
        "Melhores condições com seguradoras especializadas",
      ]}
      faqs={[
        { question: "A Patro atende produtores de outros estados?", answer: "Sim! Atendemos produtores rurais de todos os estados do Brasil. Todo o processo é feito de forma remota — cotação, emissão e acompanhamento de sinistro." },
        { question: "O seguro cobre drones agrícolas?", answer: "Sim, é possível incluir drones e equipamentos de agricultura de precisão na apólice." },
        { question: "Equipamentos alugados podem ser segurados?", answer: "Sim, equipamentos alugados ou em comodato podem ser incluídos na cobertura." },
        { question: "Quais cidades e estados a Patro atende?", answer: "Atendemos produtores de todos os 26 estados brasileiros e o DF — capitais, interior e zona rural." },
        { question: "Qual o prazo para receber a proposta?", answer: "Retornamos com propostas comparativas em até 24 horas úteis após o envio das informações." },
        { question: "Como solicitar cotação remotamente?", answer: "100% remoto — WhatsApp (11) 5199-7500, telefone ou e-mail. Documentação digital e acompanhamento à distância." },
        { question: "A proposta é enviada por e-mail ou WhatsApp?", answer: "Enviamos pelo canal de sua preferência — WhatsApp, e-mail ou ambos — com resumo comparativo de valores e coberturas." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroEquipamentosAgricolas;