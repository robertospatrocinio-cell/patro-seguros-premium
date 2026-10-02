import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroEquipamentosAgricolas = () => {
  return (
    <InsurancePageTemplate
      localSeo={{ skip: true }}
      heroImage={heroImg}
      title="Seguro de Equipamentos Agrícolas"
      subtitle="Proteção para implementos, pulverizadores, irrigação e equipamentos de precisão conforme o produto e a apólice."
      description="A Patro orienta a contratação de seguro para equipamentos agrícolas conforme o bem, a tecnologia embarcada, o uso, a aceitação e as coberturas efetivamente contratadas."
      icon="⚙️"
      metaDescription="Seguro de Equipamentos Agrícolas: implementos, pulverizadores, irrigação e GPS agrícola. Proteção completa para o campo. Cotação grátis."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Incêndio e raio", description: "Podem ser contemplados conforme a cobertura, os limites e as condições do produto." },
        { title: "Roubo e furto", description: "A extensão depende do produto, da aceitação e das condições contratuais; não é automática." },
        { title: "Danos acidentais", description: "Operação e transporte devem ser avaliados conforme coberturas específicas e a forma de movimentação do bem." },
        { title: "Vendaval e granizo", description: "Fenômenos naturais dependem das garantias e exclusões previstas na apólice." },
      ]}
      whoNeeds={[
        "Produtores rurais que utilizam tecnologia no campo em qualquer estado",
        "Empresas de agricultura de precisão em todo o Brasil",
        "Cooperativas e associações rurais de todas as regiões",
        "Prestadores de serviços agrícolas",
      ]}
      whyPatro={[
        "Especialista em seguros de máquinas e equipamentos",
        "Parceria com fabricantes e concessionárias pelo Brasil",
        "Atendemos produtores de todos os estados do Brasil",
        "Conhecimento profundo do setor agrícola",
        "Coberturas específicas para cada tipo de equipamento",
        "Cotação e sinistro 100% remotos — por WhatsApp, telefone ou e-mail",
        "Comparação de alternativas conforme o perfil e as condições do produto",
      ]}
      faqs={[
        { question: "A Patro atende produtores de outros estados?", answer: "Sim! Atendemos produtores rurais de todos os estados do Brasil. Todo o processo é feito de forma remota — cotação, emissão e acompanhamento de sinistro." },
        { question: "O seguro cobre drones agrícolas?", answer: "Drones exigem análise específica do produto, do equipamento, do uso e das regras aplicáveis; não há inclusão automática em seguro de equipamentos agrícolas." },
        { question: "Equipamentos alugados podem ser segurados?", answer: "Sim, equipamentos alugados ou em comodato podem ser incluídos na cobertura." },
        { question: "Quais cidades e estados a Patro atende?", answer: "Atendemos produtores rurais e empresas do agronegócio em todos os 26 estados brasileiros e o Distrito Federal — capitais, interior e zona rural. Do Sul (PR, SC, RS) ao Norte (PA, TO, RO), passando por Centro-Oeste (MT, MS, GO), Sudeste (SP, MG, ES, RJ) e Nordeste (BA, PI, MA). Nossa sede é em Guarulhos/SP, mas o atendimento é 100% remoto." },
        { question: "Qual o prazo para receber a proposta?", answer: "O prazo depende das informações, da análise do risco e do retorno das seguradoras. Não há promessa universal de cotação em prazo fixo." },
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
