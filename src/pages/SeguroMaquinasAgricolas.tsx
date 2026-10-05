import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroMaquinasAgricolas = () => {
  return (
    <InsurancePageTemplate
      localSeo={{ skip: true }}
      heroImage={heroImg}
      title="Seguro para Máquinas Agrícolas | Tratores e Colheitadeiras | Patro Seguros"
      headline="Como funciona o seguro para máquinas agrícolas?"
      subtitle="Analise a proteção de tratores, colheitadeiras, plantadeiras e equipamentos agrícolas conforme o produto e a apólice."
      description="A Patro orienta a cotação de máquinas e equipamentos agrícolas conforme o bem, o uso, a localização, a aceitação da seguradora e as coberturas contratadas."
      detailedDescription={`Como funciona o seguro para máquinas agrícolas? A corretora analisa o equipamento, o uso, a localização, o transporte e os riscos informados. Coberturas, limites, franquias, indenização e aceitação dependem do produto e da apólice.

O casco protege o próprio equipamento quando houver garantia contratada para o evento. A Responsabilidade Civil trata de danos causados a terceiros e precisa ser contratada quando disponível; RC não é cobertura automática do casco, e o casco não substitui RC.`}
      icon="🚜"
      metaDescription="Entenda como funciona o seguro para máquinas agrícolas, incluindo análise do bem, coberturas, limites, franquias, aceitação e responsabilidade civil."
      badge="Atendimento em Todo o Brasil"
      showAgrishowBanner
      coverages={[
        { title: "Incêndio, raio e explosão", description: "Podem ser contemplados conforme a cobertura contratada, os limites e as condições do produto." },
        { title: "Roubo e furto", description: "A extensão para roubo ou furto depende do produto, da aceitação e das condições contratuais; não é automática." },
        { title: "Colisão e capotamento", description: "Podem ser analisados para operação, parada ou deslocamento, conforme a cobertura contratada." },
        { title: "Danos elétricos", description: "A cobertura para danos elétricos depende da previsão contratual, do evento e dos limites aplicáveis." },
        { title: "Fenômenos naturais", description: "Vendaval, granizo, inundação e alagamento dependem das garantias e exclusões da apólice." },
        { title: "Responsabilidade Civil", description: "Danos a terceiros exigem cobertura de RC contratada; não integram automaticamente o casco da máquina." },
      ]}
      whoNeeds={[
        "Produtores rurais de pequeno, médio e grande porte em qualquer estado",
        "Cooperativas agrícolas em todo o Brasil",
        "Empresas de prestação de serviços agrícolas",
        "Proprietários de tratores e colheitadeiras em todas as regiões",
      ]}
      whyPatro={[
        "Análise do bem, do uso e da localização informados",
        "Orientação sobre casco e responsabilidade civil",
        "Atendimento em todo o Brasil",
        "Alternativas conforme produto e aceitação da seguradora",
        "Acompanhamento durante a contratação e a vigência",
      ]}
      faqs={[
        { question: "A Patro atende produtores fora de São Paulo?", answer: "Sim. Apesar de a sede ficar em Guarulhos/SP, a Patro atende clientes em todo o Brasil por canais remotos, conforme o risco e a disponibilidade das seguradoras." },
        { question: "Quanto custa o seguro de trator?", answer: "O valor depende do modelo, ano, valor de mercado e coberturas escolhidas. Solicite uma cotação gratuita e personalizada." },
        { question: "O seguro cobre colheitadeira em operação?", answer: "Pode cobrir, dependendo do produto, da declaração de uso, da cobertura contratada e das condições da apólice. Operação, parada, deslocamento e transporte não são automaticamente equivalentes." },
        { question: "Posso segurar máquinas financiadas?", answer: "A aceitação e eventual exigência dependem da operação de crédito e do contrato com a instituição financeira. Financiamento não significa, por si só, Penhor Rural nem obrigação legal universal de seguro." },
        { question: "A Patro atende clientes fora de São Paulo?", answer: "Sim. A Patro Seguros atende clientes em todo o Brasil por canais remotos, conforme as informações do risco e a disponibilidade das seguradoras." },
        { question: "Qual o prazo para receber a proposta?", answer: "O prazo depende da qualidade das informações, da análise do risco e do retorno das seguradoras. Não há promessa universal de cotação em prazo fixo." },
        { question: "Como solicitar cotação se estou longe de Guarulhos?", answer: "Entre em contato pelos canais da Patro e envie os dados disponíveis sobre a máquina. A orientação e o retorno dependem do produto, da documentação e da análise das seguradoras." },
        { question: "Como recebo a proposta de seguro?", answer: "Após a análise das informações, as alternativas disponíveis podem ser apresentadas por WhatsApp, e-mail ou outro canal de atendimento, conforme o produto e o retorno das seguradoras." },
        { question: "Como peço uma cotação de máquina agrícola?", answer: "Envie pelos canais de atendimento os dados disponíveis sobre o bem, como modelo, ano, valor, localização e uso. A análise e o retorno dependem das informações, do produto e da seguradora." },
        { question: "Quais máquinas podem ser analisadas?", answer: "Tratores, colheitadeiras, pulverizadores e equipamentos agrícolas podem ser analisados conforme o bem, o uso declarado, o produto disponível e a aceitação da seguradora. Drone agrícola permanece como categoria própria." },
        { question: "Quais documentos preciso enviar para a cotação de máquina agrícola?", answer: "Para a cotação são necessários: nota fiscal ou DUT/ficha técnica da máquina (modelo, ano e valor), CPF/CNPJ do segurado, endereço da propriedade onde a máquina opera e descrição do uso (lavoura própria, arrendada, prestação de serviços). Se houver financiamento ou penhor rural, envie também a cópia do contrato — emitimos a apólice no formato exigido pelo banco ou cooperativa." },
        { question: "Quais coberturas adicionais valem a pena contratar para máquinas agrícolas?", answer: "A análise pode incluir danos elétricos, colisão, tombamento, quebra, RC, transporte ou deslocamento, mas cada item depende do produto, do uso, da aceitação, dos limites e das exclusões. Quebra mecânica não deve ser tratada como garantia automática de seguro patrimonial." },
      ]}
      relatedInsurances={[
        { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Seguro Agro", link: "/seguro-agro" },
        { title: "Seguro de Trator Agrícola", link: "/seguro-trator-agricola" },
        { title: "Seguro de Colheitadeira", link: "/seguro-colheitadeira-graos" },
        { title: "Seguro de Pulverizador", link: "/seguro-pulverizador-agricola" },
      ]}
    />
  );
};

export default SeguroMaquinasAgricolas;
