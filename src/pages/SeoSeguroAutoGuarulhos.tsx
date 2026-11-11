import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import NeighborhoodHub, { type NeighborhoodLink } from "@/components/NeighborhoodHub";
import ModelHub, { type ModelLink } from "@/components/ModelHub";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import heroImg from "@/assets/hero-seguro-auto.webp";

const NEIGHBORHOODS: NeighborhoodLink[] = [
  { name: "Cidade Maia", link: "/seguro-auto-maia-guarulhos" },
  { name: "Vila Galvão", link: "/seguro-auto-vila-galvao" },
  { name: "Vila Augusta", link: "/seguro-auto-vila-augusta" },
  { name: "Jardim São João", link: "/seguro-auto-jardim-sao-joao" },
  { name: "Taboão", link: "/seguro-auto-taboao-guarulhos" },
  { name: "Bonsucesso", link: "/seguro-auto-bonsucesso-guarulhos" },
  { name: "Centro de Guarulhos", link: "/seguro-auto-centro-guarulhos" },
  { name: "Cumbica", link: "/seguro-auto-cumbica" },
  { name: "Pimentas", link: "/seguro-auto-pimentas" },
];
const MODELS: ModelLink[] = [
  { name: "Toyota Corolla", link: "/seguro-corolla-guarulhos", category: "Sedã médio" },
  { name: "Honda Civic", link: "/seguro-civic-guarulhos", category: "Sedã médio" },
  { name: "Toyota Hilux", link: "/seguro-hilux-guarulhos", category: "Picape grande" },
  { name: "Hyundai HB20", link: "/seguro-hb20-guarulhos", category: "Hatch" },
  { name: "Chevrolet Onix", link: "/seguro-onix-guarulhos", category: "Hatch" },
  { name: "Fiat Mobi", link: "/seguro-mobi-guarulhos", category: "Hatch" },
  { name: "Fiat Strada", link: "/seguro-strada-guarulhos", category: "Picape leve" },
  { name: "VW T-Cross", link: "/seguro-tcross-guarulhos", category: "SUV compacto" },
  { name: "Jeep Compass", link: "/seguro-compass-guarulhos", category: "SUV médio" },
  { name: "Jeep Renegade", link: "/seguro-renegade-guarulhos", category: "SUV compacto" },
];

const SeoSeguroAutoGuarulhos = () => (
  <>
    <PrerenderText slug="seguro-auto-guarulhos" />
    <InsurancePageTemplate
      heroImage={heroImg}
      mobileHeroImage={heroImg}
      title="Seguro Auto em Guarulhos: Compare Propostas | Patro Seguros"
      subtitle="Seguro Auto em Guarulhos — Cotação Personalizada"
      description="Compare seguro auto conforme seu veículo, uso e perfil. A Patro orienta a análise de coberturas, franquias, assistências e condições de aceitação."
      detailedDescription={`Para cotar seguro auto em Guarulhos, informe o CEP exato de pernoite, os condutores e o uso real do veículo. Circular pela Dutra, Fernão Dias ou em outros municípios não substitui essas informações. O bairro, sozinho, não define o preço nem uma exigência de rastreador.

A comparação deve considerar propostas equivalentes. Verifique os eventos cobertos no casco, o critério de indenização, a franquia para reparos e os limites de responsabilidade civil para terceiros. Vidros, acessórios, carro reserva e assistência podem exigir contratação própria.

Quem transporta passageiros por aplicativo, faz entregas ou usa o veículo profissionalmente precisa declarar a atividade e confirmar sua aceitação por escrito. Uma proposta para uso particular não deve ser presumida adequada a essas atividades.

A Patro atende clientes de Guarulhos por seus contatos oficiais e na sede, mediante combinação. As páginas de bairros representam áreas atendidas, não filiais. Solicitar uma cotação não confirma cobertura: confira aceitação, eventuais exigências e início da vigência antes de utilizar o seguro.`}
      icon="🚗"
      metaDescription="Seguro auto em Guarulhos: compare coberturas, franquias e assistências conforme seu perfil. Solicite cotação personalizada à Patro Seguros."
      coverages={[
        { title: "Casco do Veículo", description: "Colisão, roubo, furto e outros eventos dependem do produto contratado. Confira critérios de indenização, limites, franquias e exclusões." },
        { title: "Responsabilidade Civil", description: "Danos materiais e corporais a terceiros dependem de contratação e limites próprios. Danos morais podem exigir cobertura adicional." },
        { title: "Assistência", description: "Confira os serviços, horários, área de atendimento, quilometragem de guincho e limite de utilizações. Não presuma assistência ilimitada." },
        { title: "Carro Reserva", description: "Sujeito à contratação, ao evento coberto, às diárias previstas e às exigências da locadora e da seguradora." },
        { title: "Vidros e Faróis", description: "Verifique as peças incluídas, os prestadores disponíveis e as franquias específicas. As regras de bônus dependem do contrato." },
        { title: "Acessórios e Modificações", description: "Informe blindagem, kit gás e acessórios. A inclusão depende de aceitação expressa e dos itens e valores declarados na apólice." },
      ]}
      howItWorks={[
        { step: "1", title: "Informe seu perfil", description: "Envie os dados do veículo, condutores, CEP de pernoite e utilização pelos canais oficiais." },
        { step: "2", title: "Compare as condições", description: "Analisamos as propostas disponíveis para seu perfil, incluindo preço total, franquias e limites." },
        { step: "3", title: "Confira as propostas", description: "O prazo e a quantidade de opções dependem dos sistemas e da análise de cada seguradora. Consulte a previsão no atendimento." },
        { step: "4", title: "Revise antes de contratar", description: "Confirme aceitação, documentação, eventual vistoria ou rastreador e data de início da vigência." },
        { step: "5", title: "Conte com orientação", description: "A Patro orienta a comunicação de sinistros e a documentação. A seguradora analisa a cobertura e a indenização conforme o contrato." },
      ]}
      pricingInfo={{
        intro: "Não há uma tabela única de seguro auto para Guarulhos. O preço é calculado para o veículo, os condutores, a utilização e as condições solicitadas. Peça uma proposta atualizada para conhecer o valor aplicável ao seu caso.",
        factors: ["CEP exato de pernoite", "Modelo, ano, versão e valor do veículo", "Condutores e tempo de habilitação", "Histórico de seguro e classe de bônus", "Uso particular, profissional ou por aplicativo", "Coberturas, limites, franquias e dispositivos exigidos"],
        note: "Compare propostas com condições equivalentes. Garagem, rastreador e bônus podem ser considerados pela seguradora, mas não garantem desconto, aceitação ou menor preço.",
      }}
      realScenarios={[]}
      coverageExclusions={["Confira as exclusões e os riscos não contratados nas condições da apólice.", "Desgaste e manutenção não devem ser confundidos com danos cobertos.", "Uso profissional e alterações no veículo devem ser declarados e aceitos."]}
      tips={["Declare corretamente condutores, utilização e CEP de pernoite.", "Confira o custo total e as franquias, não apenas a parcela.", "Verifique limites de guincho e condições de carro reserva.", "Confirme as regras de bônus na renovação e ao mudar de seguradora.", "Não cancele a apólice vigente sem confirmar a continuidade da proteção."]}
      whoNeeds={["Moradores de Guarulhos e região", "Quem vai contratar ou renovar o seguro", "Condutores que circulam pelas rodovias da região", "Motoristas que precisam declarar uso profissional", "Proprietários de veículos novos, usados ou financiados"]}
      whyPatro={["Atendimento pelos contatos oficiais e na sede em Guarulhos", "Orientação para comparar propostas disponíveis", "Apoio na leitura de franquias, limites e exclusões", "Orientação na comunicação de sinistros"]}
      faqs={[
        { question: "Quanto custa seguro auto em Guarulhos?", answer: "O valor depende do veículo, do perfil dos condutores, do CEP de pernoite, do uso e das coberturas. Não publicamos média por bairro sem amostra e condições verificáveis. Solicite cotação atualizada." },
        { question: "Qual seguradora devo escolher?", answer: "Compare as propostas disponíveis para seu perfil. Preço, franquias, limites, assistências e atendimento precisam ser avaliados em conjunto; não existe uma opção ideal para todos." },
        { question: "Como solicitar cotação?", answer: "Utilize o formulário ou os contatos oficiais da Patro. A disponibilidade de propostas e o prazo dependem dos dados enviados e da análise das seguradoras." },
        { question: "O seguro atende motorista de aplicativo?", answer: "A utilização precisa ser declarada e aceita expressamente. Verifique as coberturas contratadas para veículo, terceiros e passageiros, além das exigências legais da atividade." },
        { question: "Como funciona o sinistro?", answer: "Comunique o evento pelos canais indicados e reúna a documentação solicitada. A Patro orienta o acompanhamento; a análise e o pagamento dependem da seguradora e do contrato, sem prazo de resolução garantido pela corretora." },
        { question: "O seguro cobre enchente?", answer: "Confira se alagamento ou inundação estão entre os eventos cobertos no seu produto, além de limites e exclusões. O nome comercial do pacote não substitui a leitura da apólice." },
      ]}
      relatedInsurances={[
        { title: "Seguro Moto Guarulhos", link: "/seguro-moto-guarulhos" },
        { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
        { title: "Seguro Frota Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
        { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
        { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
        { title: "Corretora Seguros Guarulhos", link: "/" },
        { title: "Seguro Auto por Modelo", link: "/seguro-auto-por-modelo-guarulhos" },
      ]}
      extraSections={<><NeighborhoodHub source="seguro-auto-guarulhos:hub-bairros" neighborhoods={NEIGHBORHOODS} subtitle="Consulte as orientações para cotar no seu bairro. O atendimento é feito pela Patro em Guarulhos; não há tabela de preço ou classificação de risco definida apenas pelo bairro." /><ModelHub source="seguro-auto-guarulhos:hub-modelos" models={MODELS} subtitle="Consulte orientações por modelo e solicite uma proposta para o ano, versão, utilização e condutores do seu veículo." /></>}
    />
    <StickyQuoteBar source="seguro-auto-guarulhos" quoteHref="/cotacao?tipo=auto" whatsappMessage="Olá! Vim pela página Seguro Auto Guarulhos e gostaria de falar com um especialista sobre meu seguro." ctaLabel="Solicitar cotação" />
  </>
);

export default SeoSeguroAutoGuarulhos;
