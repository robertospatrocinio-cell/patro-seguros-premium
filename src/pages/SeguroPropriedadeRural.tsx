import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroPropriedadeRural = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Propriedade Rural — Proteção Completa para sua Fazenda"
      subtitle="Proteja as estruturas, benfeitorias e instalações da sua propriedade rural contra incêndio, vendaval, raio e outros riscos. Atendimento em todo o Brasil."
      description="O Seguro Propriedade Rural da Patro Seguros garante proteção para as edificações e benfeitorias da sua fazenda, sítio ou chácara. Cobrimos sedes, galpões, currais, silos, cercas, instalações elétricas, painéis solares e demais estruturas contra incêndio, raio, vendaval, granizo, alagamento, roubo e danos elétricos. Ideal para produtores rurais que investiram em infraestrutura e precisam proteger seu patrimônio. Trabalhamos com as principais seguradoras do agronegócio e garantimos as melhores condições do mercado, com atendimento 100% remoto para produtores de todo o Brasil."
      icon="🏡"
      metaDescription="Seguro Propriedade Rural — proteção para fazendas, sítios e chácaras contra incêndio, vendaval, raio, roubo e mais. Cotação grátis para todo o Brasil. Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção contra incêndio, explosão e fumaça nas edificações e benfeitorias da propriedade." },
        { title: "Vendaval e Granizo", description: "Cobertura contra danos causados por vendaval, granizo, ciclone, tornado e furacão." },
        { title: "Raio e Danos Elétricos", description: "Proteção contra quedas de raio e danos elétricos em instalações e equipamentos fixos." },
        { title: "Alagamento e Inundação", description: "Cobertura contra danos causados por alagamento, inundação e transbordamento de rios." },
        { title: "Roubo e Furto Qualificado", description: "Proteção contra roubo e furto qualificado de bens no interior das edificações." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros dentro da propriedade rural." },
      ]}
      whoNeeds={[
        "Fazendeiros e produtores rurais com estruturas de alto valor",
        "Proprietários de sítios e chácaras com benfeitorias",
        "Produtores com galpões, silos e armazéns na propriedade",
        "Propriedades com instalações de energia solar e equipamentos fixos",
        "Cooperativas e associações rurais",
      ]}
      whyPatro={[
        "Atendimento remoto para produtores de todo o Brasil",
        "Trabalhamos com as principais seguradoras do agronegócio",
        "Análise personalizada de riscos para cada tipo de propriedade",
        "Experiência em sinistros rurais — vendaval, incêndio, raio",
        "Cotação 100% gratuita por WhatsApp, telefone ou e-mail",
        "Suporte completo na regulação de sinistros",
      ]}
      faqs={[
        { question: "O que o seguro propriedade rural cobre?", answer: "Cobre as edificações e benfeitorias da propriedade — sede, galpões, currais, silos, cercas e instalações — contra incêndio, raio, vendaval, granizo, alagamento, roubo e danos elétricos." },
        { question: "Cobre máquinas e equipamentos?", answer: "O seguro propriedade rural foca nas estruturas fixas. Para máquinas e equipamentos móveis, recomendamos o Seguro de Máquinas Agrícolas ou Equipamentos Agrícolas." },
        { question: "Tem subsídio do governo?", answer: "O seguro de benfeitorias e instalações rurais pode contar com subsídio federal pelo Programa de Subvenção ao Prêmio do Seguro Rural (PSR), conforme disponibilidade." },
        { question: "Quanto custa o seguro propriedade rural?", answer: "O valor varia conforme o tipo de propriedade, valor das benfeitorias, localização e coberturas escolhidas. Solicite uma cotação gratuita para receber uma proposta personalizada." },
        { question: "Posso segurar apenas parte da propriedade?", answer: "Sim, você pode escolher quais estruturas deseja segurar — por exemplo, apenas os galpões e silos, ou toda a propriedade incluindo a sede." },
        { question: "Quais cidades e estados a Patro atende?", answer: "Atendemos produtores rurais e empresas do agronegócio em todos os 26 estados brasileiros e o Distrito Federal — capitais, interior e zona rural. Do Sul (PR, SC, RS) ao Norte (PA, TO, RO), passando por Centro-Oeste (MT, MS, GO), Sudeste (SP, MG, ES, RJ) e Nordeste (BA, PI, MA). Nossa sede é em Guarulhos/SP, mas o atendimento é 100% remoto." },
        { question: "Qual o prazo para receber a proposta?", answer: "Após o envio das informações sobre o bem ou atividade a ser segurada, retornamos com propostas comparativas de diversas seguradoras em até 24 horas úteis." },
        { question: "Como solicitar cotação se estou longe de Guarulhos?", answer: "Todo o processo é 100% remoto. Basta entrar em contato pelo WhatsApp (11) 5199-7500, telefone ou e-mail. Enviamos a documentação digitalmente e acompanhamos tudo à distância — da cotação à regulação de sinistro." },
        { question: "Como recebo a proposta de seguro?", answer: "Enviamos a proposta pelo canal de sua preferência — WhatsApp, e-mail ou ambos — com um resumo comparativo de valores e coberturas das melhores seguradoras do mercado." },
      ]}
      relatedInsurances={[
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Seguro Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Armazenagem", link: "/seguro-armazenagem" },
        { title: "Seguro Placa Solar", link: "/seguro-placa-solar" },
      ]}
    />
  );
};

export default SeguroPropriedadeRural;
