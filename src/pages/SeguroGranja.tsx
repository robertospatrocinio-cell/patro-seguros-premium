import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-granja.webp";

const SeguroGranja = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Granja — Proteção para Aviários e Suinoculturas"
      subtitle="Proteja suas granjas de aves, suínos e outras criações contra incêndios, vendavais, doenças e outros riscos. Atendimento em todo o Brasil."
      description="O Seguro Granja da Patro Seguros oferece proteção completa para instalações avícolas e suinícolas. Cobrimos danos às estruturas (galpões, comedouros, bebedouros, climatização), mortalidade de animais por doenças, incêndios, fenômenos climáticos e falhas elétricas. Ideal para produtores integrados, granjas independentes e agroindústrias. Atendemos em todos os estados do Brasil — cotação, emissão e sinistro 100% remotos, por WhatsApp, telefone ou e-mail."
      icon="🐔"
      metaDescription="Seguro Granja para aviários e suinoculturas em todo o Brasil. Proteção contra incêndio, vendaval, mortalidade de aves e suínos. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      quoteFormFields={[
        { id: "tipo_granja", label: "Tipo de Granja", placeholder: "Selecione o tipo", type: "select", options: ["Granja de Frangos (Corte)", "Granja de Galinhas (Postura)", "Granja de Suínos", "Granja de Perus", "Granja Mista (Aves e Suínos)", "Outro"] },
        { id: "quantidade_animais", label: "Quantidade de Animais (aprox.)", placeholder: "Ex: 30.000 aves", type: "text" },
        { id: "cidade_estado", label: "Cidade / Estado", placeholder: "Ex: Toledo/PR", type: "text" },
      ]}
      coverages={[
        { title: "Incêndio", description: "Cobertura para danos causados por incêndio às instalações da granja, incluindo barracões, silos e salas de comando." },
        { title: "Raio", description: "Proteção contra danos causados por descarga elétrica atmosférica (raio) às estruturas e equipamentos." },
        { title: "Vendaval e Granizo", description: "Cobertura para danos estruturais aos barracões e instalações causados por vendaval, granizo e tornado." },
        { title: "Danos Elétricos", description: "Proteção para máquinas e implementos fixos, sistemas de ventilação, comedouros e bebedouros automáticos danificados por curto-circuito e sobrecarga." },
        { title: "Alagamento e Inundação", description: "Cobertura contra perdas causadas por alagamento nas instalações, silos e salas de comando." },
        { title: "Acidentes no Transporte", description: "Proteção contra danos aos bens segurados durante o transporte entre unidades ou para manutenção." },
        { title: "Animais da Granja (Cobertura Adicional)", description: "É possível contratar cobertura para os animais da granja — aves e suínos — contra mortalidade por doenças, calor excessivo, asfixia e outros eventos cobertos." },
      ]}
      importantDetails={[
        { title: "Bens Segurados", content: "Barracão, silo, sala de comando, máquinas e implementos fixos." },
        { title: "Conteúdo Coberto", content: "Comedouros, bebedouros e sistema de ventilação." },
        { title: "Cobertura Adicional", content: "É possível contratar cobertura para os animais da granja (aves e suínos)." },
      ]}
      whoNeeds={[
        "Produtores integrados de aves (frango de corte e poedeiras)",
        "Suinocultores de todas as regiões do Brasil",
        "Granjas independentes e cooperativas",
        "Agroindústrias com unidades de produção animal",
        "Produtores de ovos e avicultura de postura",
        "Granjas de reprodução e matrizes",
      ]}
      whyPatro={[
        "Atendemos produtores de granjas de todos os estados do Brasil",
        "Especialistas em seguros para o agronegócio",
        "Coberturas personalizadas por tipo de criação (aves ou suínos)",
        "Cotação gratuita e 100% remota — por WhatsApp, telefone ou e-mail",
        "Suporte técnico especializado na regulação de sinistros rurais",
        "Condições especiais para produtores integrados e cooperativas",
      ]}
      faqs={[
        { question: "Quais são as coberturas do seguro granja?", answer: "As coberturas incluem incêndio, raio, vendaval, granizo, danos elétricos, alagamento, inundação e acidentes no transporte de bens segurados. Os bens cobertos são barracão, silo, sala de comando, máquinas e implementos fixos, além de conteúdo como comedouros, bebedouros e sistema de ventilação." },
        { question: "O seguro granja cobre aves e suínos?", answer: "Sim! É possível contratar uma cobertura adicional para os animais da granja — aves (frangos de corte, galinhas poedeiras, perus, codornas) e suínos — contra mortalidade por doenças, calor excessivo, asfixia e outros eventos cobertos pela apólice." },
        { question: "O que NÃO é coberto pelo seguro granja?", answer: "Em geral, não são cobertos: desgaste natural das instalações, perdas por manejo inadequado, doenças preexistentes não declaradas, atos dolosos do segurado e perdas decorrentes de falta de manutenção dos equipamentos. Exclusões específicas variam conforme a seguradora — consulte-nos para detalhes." },
        { question: "O seguro cobre mortalidade por calor excessivo e falha na ventilação?", answer: "Sim, a mortalidade por falha no sistema de climatização e calor excessivo pode ser coberta pela apólice, dependendo das condições contratadas. É uma das coberturas mais importantes para aviários." },
        { question: "O seguro cobre doenças como a gripe aviária?", answer: "Coberturas para doenças específicas variam conforme a seguradora e o tipo de apólice. Algumas seguradoras oferecem cobertura para epidemias e doenças declaradas por órgãos sanitários. Consulte-nos para entender as opções disponíveis." },
        { question: "Como funciona o sinistro no seguro granja?", answer: "Em caso de sinistro, o produtor deve comunicar a seguradora imediatamente, preservar o local e reunir documentação (fotos, laudos técnicos, notas fiscais dos bens). A Patro Seguros acompanha todo o processo de regulação do sinistro, dando suporte técnico do início ao fim — tudo de forma remota." },
        { question: "Posso segurar apenas o barracão ou preciso segurar tudo?", answer: "Você pode personalizar a apólice conforme sua necessidade. É possível segurar apenas as estruturas (barracão, silo), apenas o conteúdo (equipamentos, comedouros, ventilação) ou ambos. A cobertura para animais é contratada à parte, como cobertura adicional." },
        { question: "A Patro atende granjas de outros estados?", answer: "Sim! Atendemos produtores de todos os estados do Brasil. Nossa sede é em Guarulhos/SP, mas todo o atendimento é feito de forma 100% remota — cotação, emissão e sinistro por WhatsApp, telefone ou e-mail." },
        { question: "Quanto custa o seguro para granja?", answer: "O valor depende do tipo de criação, quantidade de animais, valor das instalações, equipamentos e coberturas escolhidas. Em geral, o custo é acessível em relação ao patrimônio protegido. Solicite uma cotação personalizada e sem compromisso." },
        { question: "Como pedir uma cotação de seguro granja?", answer: "É simples e rápido! Clique no botão 'Cotação Grátis' nesta página ou entre em contato pelo WhatsApp (11) 5199-7500. Informe o tipo de granja, localização, valor estimado das instalações e coberturas desejadas. Retornamos com a melhor proposta em até 24h." },
      ]}
      relatedInsurances={[
        { title: "Seguro Pecuário", link: "/seguro-pecuario" },
        { title: "Propriedade Rural", link: "/seguro-propriedade-rural" },
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroGranja;