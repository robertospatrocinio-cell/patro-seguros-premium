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
        { question: "O seguro granja cobre aves e suínos?", answer: "Sim! O seguro pode ser contratado para granjas de galinhas (corte e postura), perus, codornas, suínos e outras criações confinadas." },
        { question: "A Patro atende granjas de outros estados?", answer: "Sim! Atendemos produtores de todos os estados do Brasil. Todo o processo é feito de forma remota — cotação, emissão e sinistro por WhatsApp, telefone ou e-mail." },
        { question: "O seguro cobre mortalidade por calor excessivo?", answer: "Sim, a mortalidade por falha no sistema de climatização e calor excessivo pode ser coberta, dependendo das condições da apólice." },
        { question: "Quanto custa o seguro para granja?", answer: "O valor depende do tipo de criação, quantidade de animais, valor das instalações e coberturas escolhidas. Solicite uma cotação personalizada." },
        { question: "O seguro cobre doenças como a gripe aviária?", answer: "Coberturas para doenças específicas variam conforme a seguradora e a apólice. Consulte-nos para entender as opções disponíveis." },
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