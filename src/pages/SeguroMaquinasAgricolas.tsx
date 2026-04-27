import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroMaquinasAgricolas = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Máquinas Agrícolas"
      subtitle="Proteja tratores, colheitadeiras, plantadeiras e todo seu maquinário agrícola. Atendemos produtores de todos os estados do Brasil."
      description="O Seguro de Máquinas Agrícolas da Patro Seguros é a solução completa para proteger o patrimônio do produtor rural. Cobrimos tratores, colheitadeiras, plantadeiras, pulverizadores e outros equipamentos essenciais para a produção agrícola. Com a Patro, você conta com a expertise de quem entende do agronegócio e oferece as melhores condições do mercado. Atendemos produtores em todos os estados — de Mato Grosso ao Paraná, de Goiás à Bahia. Todo o processo de cotação e sinistro é feito de forma remota, com a mesma agilidade e qualidade."
      icon="🚜"
      metaDescription="Seguro de Máquinas Agrícolas em todo o Brasil — tratores, colheitadeiras, plantadeiras e pulverizadores. Proteção contra incêndio, roubo e tombamento. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      showAgrishowBanner
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção contra danos causados por incêndio, raio e explosão nas máquinas agrícolas." },
        { title: "Roubo e Furto", description: "Cobertura contra roubo e furto qualificado de tratores e colheitadeiras." },
        { title: "Colisão e Capotamento", description: "Proteção contra acidentes durante operação e transporte das máquinas." },
        { title: "Danos Elétricos", description: "Cobertura para danos causados por curto-circuito e oscilação de energia." },
        { title: "Fenômenos Naturais", description: "Proteção contra vendaval, granizo, inundação e alagamento." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros durante a operação." },
      ]}
      whoNeeds={[
        "Produtores rurais de pequeno, médio e grande porte em qualquer estado",
        "Cooperativas agrícolas em todo o Brasil",
        "Empresas de prestação de serviços agrícolas",
        "Proprietários de tratores e colheitadeiras em todas as regiões",
      ]}
      whyPatro={[
        "Atendemos produtores de todos os estados do Brasil",
        "Especialistas em seguros para o agronegócio",
        "Parceria com seguradoras líderes no segmento rural",
        "Coberturas personalizadas para cada tipo de máquina",
        "Cotação e sinistro 100% remotos — por WhatsApp, telefone ou e-mail",
        "Agilidade na regulação de sinistros no campo",
      ]}
      faqs={[
        { question: "A Patro atende produtores fora de São Paulo?", answer: "Sim! Apesar de nossa sede ser em Guarulhos/SP, atendemos produtores rurais de todos os estados do Brasil. Cotação, emissão e sinistro são feitos de forma remota com total suporte." },
        { question: "Quanto custa o seguro de trator?", answer: "O valor depende do modelo, ano, valor de mercado e coberturas escolhidas. Solicite uma cotação gratuita e personalizada." },
        { question: "O seguro cobre colheitadeira em operação?", answer: "Sim, o seguro pode cobrir danos durante a operação no campo, incluindo colisão e capotamento." },
        { question: "Posso segurar máquinas financiadas?", answer: "Sim, máquinas financiadas podem e devem ser seguradas. O seguro protege tanto o proprietário quanto a instituição financeira." },
        { question: "Quais cidades e estados a Patro atende?", answer: "Atendemos produtores rurais e empresas do agronegócio em todos os 26 estados brasileiros e o Distrito Federal — capitais, interior e zona rural. Do Sul (PR, SC, RS) ao Norte (PA, TO, RO), passando por Centro-Oeste (MT, MS, GO), Sudeste (SP, MG, ES, RJ) e Nordeste (BA, PI, MA). Nossa sede é em Guarulhos/SP, mas o atendimento é 100% remoto." },
        { question: "Qual o prazo para receber a proposta?", answer: "Após o envio das informações sobre o bem ou atividade a ser segurada, retornamos com propostas comparativas de diversas seguradoras em até 24 horas úteis." },
        { question: "Como solicitar cotação se estou longe de Guarulhos?", answer: "Todo o processo é 100% remoto. Basta entrar em contato pelo WhatsApp (11) 5199-7500, telefone ou e-mail. Enviamos a documentação digitalmente e acompanhamos tudo à distância — da cotação à regulação de sinistro." },
        { question: "Como recebo a proposta de seguro?", answer: "Enviamos a proposta pelo canal de sua preferência — WhatsApp, e-mail ou ambos — com um resumo comparativo de valores e coberturas das melhores seguradoras do mercado." },
      ]}
      relatedInsurances={[
        { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Máquinas Industriais", link: "/seguro-maquinas-industriais" },
      ]}
    />
  );
};

export default SeguroMaquinasAgricolas;