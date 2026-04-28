import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-solar.webp";

const SeguroPlacaSolar = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Placas Solares — Proteção para Energia Solar no Campo"
      subtitle="Proteja seu investimento em energia solar fotovoltaica contra danos, furto e fenômenos naturais. Atendemos produtores de todos os estados do Brasil."
      description="O Seguro de Placas Solares da Patro Seguros oferece proteção completa para sistemas fotovoltaicos instalados em propriedades rurais e empresas do agronegócio. Cobrimos painéis solares, inversores e toda a estrutura de geração de energia contra os principais riscos, garantindo a continuidade da sua economia energética. Atendemos produtores rurais em todos os estados — cotação, emissão e sinistro de forma 100% remota."
      icon="☀️"
      metaDescription="Seguro para Placas Solares e sistemas fotovoltaicos. Proteção contra granizo, furto, danos elétricos e fenômenos naturais. Cotação grátis."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Danos aos Painéis", description: "Proteção contra quebra, trinca e danos físicos aos módulos fotovoltaicos." },
        { title: "Fenômenos Naturais", description: "Cobertura contra granizo, vendaval, raio e inundação." },
        { title: "Roubo e Furto", description: "Proteção contra roubo e furto dos painéis e equipamentos." },
        { title: "Danos Elétricos", description: "Cobertura para curto-circuito e sobrecarga nos inversores e sistemas." },
        { title: "Incêndio", description: "Proteção contra incêndio e explosão no sistema fotovoltaico." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros pela instalação." },
      ]}
      whoNeeds={[
        "Produtores rurais com energia solar em qualquer estado",
        "Empresas do agronegócio com painéis fotovoltaicos em todo o Brasil",
        "Cooperativas com usinas solares",
        "Proprietários rurais investindo em sustentabilidade",
      ]}
      whyPatro={[
        "Atendemos produtores de todos os estados do Brasil",
        "Conhecimento do setor rural e energético",
        "Coberturas específicas para sistemas fotovoltaicos",
        "Cotação e sinistro 100% remotos — por WhatsApp, telefone ou e-mail",
        "Suporte completo na regulação de sinistros",
      ]}
      faqs={[
        { question: "A Patro Seguros atende produtores com placas solares fora de São Paulo?", answer: "Sim! Atendemos produtores rurais de todos os estados do Brasil. O processo é 100% remoto." },
        { question: "O seguro cobre placas solares no campo?", answer: "Sim, cobrimos sistemas fotovoltaicos instalados em propriedades rurais contra diversos riscos." },
        { question: "Granizo é coberto?", answer: "Sim, danos causados por granizo aos painéis solares são cobertos pelo seguro." },
        { question: "Quanto custa o seguro de placas solares?", answer: "O valor depende da potência do sistema, localização e coberturas escolhidas. Solicite uma cotação gratuita." },
        { question: "Quais cidades e estados a Patro atende?", answer: "Atendemos produtores rurais e empresas do agronegócio em todos os 26 estados brasileiros e o Distrito Federal — capitais, interior e zona rural. Do Sul (PR, SC, RS) ao Norte (PA, TO, RO), passando por Centro-Oeste (MT, MS, GO), Sudeste (SP, MG, ES, RJ) e Nordeste (BA, PI, MA). Nossa sede é em Guarulhos/SP, mas o atendimento é 100% remoto." },
        { question: "Qual o prazo para receber a proposta?", answer: "Após o envio das informações sobre o bem ou atividade a ser segurada, retornamos com propostas comparativas de diversas seguradoras em até 24 horas úteis." },
        { question: "Como solicitar cotação se estou longe de Guarulhos?", answer: "Todo o processo é 100% remoto. Basta entrar em contato pelo WhatsApp (11) 5199-7500, telefone ou e-mail. Enviamos a documentação digitalmente e acompanhamos tudo à distância — da cotação à regulação de sinistro." },
        { question: "Como recebo a proposta de seguro?", answer: "Enviamos a proposta pelo canal de sua preferência — WhatsApp, e-mail ou ambos — com um resumo comparativo de valores e coberturas das melhores seguradoras do mercado." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroPlacaSolar;