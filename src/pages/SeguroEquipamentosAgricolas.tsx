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
        { question: "Quais cidades e estados a Patro atende?", answer: "Atendemos produtores rurais e empresas do agronegócio em todos os 26 estados brasileiros e o Distrito Federal — capitais, interior e zona rural. Do Sul (PR, SC, RS) ao Norte (PA, TO, RO), passando por Centro-Oeste (MT, MS, GO), Sudeste (SP, MG, ES, RJ) e Nordeste (BA, PI, MA). Nossa sede é em Guarulhos/SP, mas o atendimento é 100% remoto." },
        { question: "Qual o prazo para receber a proposta?", answer: "Após o envio das informações sobre o bem ou atividade a ser segurada, retornamos com propostas comparativas de diversas seguradoras em até 24 horas úteis." },
        { question: "Como solicitar cotação se estou longe de Guarulhos?", answer: "Todo o processo é 100% remoto. Basta entrar em contato pelo WhatsApp (11) 5199-7500, telefone ou e-mail. Enviamos a documentação digitalmente e acompanhamos tudo à distância — da cotação à regulação de sinistro." },
        { question: "Como recebo a proposta de seguro?", answer: "Enviamos a proposta pelo canal de sua preferência — WhatsApp, e-mail ou ambos — com um resumo comparativo de valores e coberturas das melhores seguradoras do mercado." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroEquipamentosAgricolas;