import { Link } from "react-router-dom";
import {
  ArrowRight,
  Tractor,
  Wheat,
  Warehouse,
  Truck,
  Bird,
  Beef,
  Sprout,
  MessageCircle,
  Calculator,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import FAQBlock from "@/components/FAQBlock";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
  trackInternalLinkClick,
  trackWhatsAppClick,
  trackCotacaoClick,
} from "@/lib/tracking";

const WA_MSG =
  "Olá! Quero cotar seguro agro com a Patro. Pode me passar opções de cobertura para minha operação (lavoura, máquinas, silo, propriedade)?";
const WA_URL = buildWhatsAppLink({
  origem: "hub-agro",
  produto: "Seguro Agro",
  mensagem: WA_MSG,
});

type Item = { name: string; slug: string; desc: string };

const LAVOURA: Item[] = [
  { name: "Seguro Agrícola (Lavoura)", slug: "seguro-agricola", desc: "Cobertura para o ciclo da cultura contra granizo, geada, seca, vendaval e chuva excessiva — conforme aceitação da seguradora." },
  { name: "Seguro de Geada", slug: "seguro-geada", desc: "Proteção específica contra perdas por geada em café, fruticultura e culturas sensíveis." },
  { name: "Seguro de Café", slug: "seguro-cafe", desc: "Cobertura para lavoura cafeeira (geada, granizo, vendaval) e estoque em armazém." },
];

const PECUARIA: Item[] = [
  { name: "Seguro Pecuário", slug: "seguro-pecuario", desc: "Proteção para rebanho bovino, equino, ovino e caprino contra morte por acidente e doenças cobertas." },
  { name: "Seguro de Granja (Aves/Suínos)", slug: "seguro-granja", desc: "Cobertura para galpões, plantel e equipamentos avícolas/suinícolas." },
];

const MAQUINAS: Item[] = [
  { name: "Seguro Penhor Rural", slug: "seguro-penhor-rural", desc: "Análise de máquinas e bens vinculados ao crédito rural, coberturas e exigências do credor." },
  { name: "Seguro de Máquinas Agrícolas", slug: "seguro-maquinas-agricolas", desc: "Proteção de máquinas próprias ou financiadas, conforme o uso e a aceitação da seguradora." },
  { name: "Seguro de Trator Agrícola", slug: "seguro-trator-agricola", desc: "Análise para diferentes marcas e modelos, sem vínculo exclusivo com fabricantes." },
  { name: "Seguro de Colheitadeira de Grãos", slug: "seguro-colheitadeira-graos", desc: "Soja, milho, trigo e demais grãos — cobertura para colheitadeiras de alto valor." },
  { name: "Seguro de Colhedora de Cana", slug: "seguro-colhedora-cana", desc: "Proteção para colhedoras de cana-de-açúcar em operação e em deslocamento." },
  { name: "Seguro de Colhedora de Algodão", slug: "seguro-colhedora-algodao", desc: "Cobertura específica para colhedoras de algodão e implementos atrelados." },
  { name: "Seguro de Pulverizador Agrícola", slug: "seguro-pulverizador-agricola", desc: "Autopropelidos e tratorizados — cobertura para uso pesado em lavoura." },
  { name: "Seguro de Equipamentos Agrícolas", slug: "seguro-equipamentos-agricolas", desc: "Implementos, plantadeiras, plataformas, grades e demais equipamentos." },
  { name: "Seguro de Drone Agrícola", slug: "seguro-drone-agricola", desc: "Drones de pulverização e mapeamento — RC operador e danos ao equipamento." },
];

const PROPRIEDADE: Item[] = [
  { name: "Seguro de Propriedade Rural", slug: "seguro-propriedade-rural", desc: "Sede, benfeitorias, máquinas paradas, estoque e RC contra incêndio, raio e vendaval." },
  { name: "Seguro de Silo Agrícola", slug: "seguro-silo-agricola", desc: "Silos metálicos e armazéns graneleiros — cobertura para estrutura, conteúdo e perda de qualidade do grão." },
  { name: "Seguro Rural", slug: "seguro-rural", desc: "Conheça as modalidades de proteção da atividade rural e suas diferenças." },
];

const TRANSPORTE: Item[] = [
  { name: "Seguro de Transporte Agro", slug: "seguro-transporte-agro", desc: "Transporte de grãos, insumos, fertilizantes e maquinário entre lavoura, armazém e indústria." },
];

const FAQS = [
  { question: "Qual é a especialidade da Patro no agronegócio?", answer: "Somos especialistas em seguros de máquinas e equipamentos agrícolas, drones agrícolas e Seguro Penhor Rural. Mantemos parceria com a rede de concessionárias dos principais fabricantes e atendemos produtores, cooperativas e prestadores de serviços em todo o Brasil. A análise considera o equipamento, seu uso e as exigências do financiamento, quando houver." },
  { question: "Seguro Penhor Rural é apenas para grãos armazenados?", answer: "Não. O Seguro Penhor Rural pode proteger máquinas, equipamentos, produtos e outros bens vinculados como garantia a operações de crédito rural, conforme o enquadramento e a aceitação da seguradora. O penhor é a garantia do crédito; o seguro protege o bem contra eventos contratados. Não paga automaticamente parcelas em atraso." },
  { question: "Qual a diferença entre seguro agrícola, de máquinas e penhor rural?", answer: "O seguro agrícola trata de riscos da lavoura conforme a apólice. O seguro de máquinas protege equipamentos conforme seu uso e as coberturas contratadas. No Seguro Penhor Rural, o vínculo do bem com o crédito rural e os requisitos do credor precisam ser avaliados. São necessidades diferentes, que podem se complementar." },
  { question: "A concessionária pode ajudar na cotação?", answer: "Sim. A parceria com concessionárias facilita o levantamento de informações técnicas, nota fiscal e dados do equipamento. A Patro conduz a análise do seguro com o produtor. Isso não significa representação exclusiva de uma marca, aprovação automática pela seguradora ou liberação garantida de financiamento." },
  { question: "O que informar para cotar trator, colheitadeira ou implemento?", answer: "Informe marca, modelo, ano, número de série, valor, município/UF e uso: área própria, arrendada ou prestação de serviços. Indique transporte entre propriedades, acessórios e financiamento. A seguradora pode solicitar documentos adicionais e vistoria antes da aceitação." },
  { question: "O seguro de drone agrícola inclui RETA e danos por pulverização?", answer: "Não automaticamente. O casco protege o próprio equipamento conforme os riscos contratados. A responsabilidade civil aeronáutica, como RETA quando aplicável, tem finalidade diferente. Danos por pulverização, deriva e danos ambientais exigem avaliação específica e previsão expressa. Regularidade da operação e documentação também são analisadas." },
  { question: "A Patro atende produtores fora de São Paulo?", answer: "Sim. O atendimento é nacional, incluindo Centro-Oeste, Sul, Sudeste, Norte e Nordeste. A sede fica em Guarulhos/SP, mas o risco é analisado pelo município onde o equipamento opera. A cotação e o acompanhamento podem ser digitais; vistorias e regulação seguem os procedimentos da seguradora." },
  { question: "Há subsídio do governo para qualquer seguro agro?", answer: "Não se deve presumir subvenção para qualquer produto. A elegibilidade ao Programa de Subvenção ao Prêmio do Seguro Rural depende das regras vigentes, modalidade, atividade, seguradora habilitada e recursos disponíveis. A cotação de uma máquina ou de penhor rural não implica direito automático ao benefício." },
  { question: "Como funciona o atendimento em caso de sinistro?", answer: "Comunique o evento à seguradora e à Patro assim que possível, preserve os registros e siga as orientações para evitar agravamento dos danos. Acompanhamos documentação e andamento. Cobertura, franquia, beneficiário e indenização dependem da apólice e da apuração, sem garantia de pagamento ou prazo fixo." },
];

const CategoryBlock = ({
  title,
  description,
  icon: Icon,
  items,
  source,
}: {
  title: string;
  description: string;
  icon: typeof Tractor;
  items: Item[];
  source: string;
}) => (
  <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
    <div className="flex items-start gap-3">
      <Icon className="h-7 w-7 text-primary shrink-0 mt-1" aria-hidden="true" />
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">{description}</p>
      </div>
    </div>
    <ul className="mt-6 grid sm:grid-cols-2 gap-3">
      {items.map((it) => (
        <li key={it.slug}>
          <Link
            to={`/${it.slug}`}
            onClick={() =>
              trackInternalLinkClick({
                source: `hub-agro:${source}`,
                destination: `/${it.slug}`,
                label: it.name,
              })
            }
            className="group block rounded-xl border border-border bg-background px-4 py-4 hover:border-primary hover:shadow-md transition-all h-full"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-foreground">{it.name}</span>
              <ArrowRight
                className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{it.desc}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SeguroAgro = () => {
  const agriculturalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Seguro Agro — Patro Seguros",
    serviceType: "Seguro Agrícola, Pecuário, de Máquinas, Propriedade Rural e Transporte Agro",
    provider: {
      "@type": "InsuranceAgency",
      name: "Patro Seguros",
      url: "https://www.patroseguros.com.br/",
      telephone: "+55-11-5199-7500",
      image: "https://www.patroseguros.com.br/images/logo-full.webp",
      priceRange: "$$",
      areaServed: { "@type": "Country", name: "Brasil" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Salgado Filho, 2120, Ed. Via Alameda – Sala 219",
        addressLocality: "Guarulhos",
        addressRegion: "SP",
        postalCode: "07115-000",
        addressCountry: "BR",
      },
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Produtos Agro",
      itemListElement: [
        ...LAVOURA,
        ...PECUARIA,
        ...MAQUINAS,
        ...PROPRIEDADE,
        ...TRANSPORTE,
      ].map((it) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: it.name, url: `https://www.patroseguros.com.br/${it.slug}` },
      })),
    },
  };

  return (
    <>
      <PageMeta
        title="Seguro Agro: Máquinas, Drones e Penhor Rural | Patro Seguros"
        description="Especialistas em máquinas agrícolas, drones e Seguro Penhor Rural. Parceria com concessionárias e atendimento em todo o Brasil. Consulte a Patro Seguros."
        absoluteTitle
        skipBreadcrumb
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(agriculturalServiceSchema)}</script>
      </Helmet>
      <FAQSchema faqs={FAQS} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Seguro Agro", url: "/seguro-agro" },
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: "Seguro Agro", href: "/seguro-agro" }]} />
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,51,102,0.03)_0%,transparent_100%)]" />
          <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
            <span className="section-label">Especialistas no agronegócio brasileiro</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Seguro Agro: máquinas agrícolas, drones e penhor rural
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Proteja o equipamento que mantém sua produção em movimento. A Patro é especialista
              em <strong>máquinas e equipamentos agrícolas, drones agrícolas e Seguro Penhor Rural</strong>,
              com parceria junto à rede de concessionárias dos principais fabricantes.
              Analisamos o uso no campo, as coberturas e as exigências do financiamento antes da contratação.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              Atendimento a produtores e concessionárias em todo o Brasil · Sede em Guarulhos/SP
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/cotacao?tipo=agro"
                onClick={() => trackCotacaoClick("hub-agro:hero")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity"
              >
                <Calculator className="h-5 w-5" /> Cotação rápida grátis
              </Link>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hub-agro:hero")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Falar com especialista agro
              </a>
            </div>
          </div>
        </section>

        <section className="py-8 border-y border-border bg-card" aria-label="Especialidades Patro Agro">
          <div className="container mx-auto px-4 max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { Icon: ShieldCheck, title: "Penhor rural", text: "Bens vinculados ao crédito" },
              { Icon: Sprout, title: "Concessionárias parceiras", text: "Apoio na compra e renovação" },
              { Icon: Tractor, title: "Máquinas e drones", text: "Análise do uso no campo" },
              { Icon: MapPin, title: "Atendimento nacional", text: "Produtores de todas as regiões" },
            ].map(({ Icon, title, text }) => <div key={title}><Icon className="h-6 w-6 text-primary mx-auto" aria-hidden="true" /><p className="mt-2 text-sm font-semibold text-foreground">{title}</p><p className="text-xs text-muted-foreground">{text}</p></div>)}
          </div>
        </section>

        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Máquina financiada? Comece pelo Seguro Penhor Rural</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">O Seguro Penhor Rural não é exclusivo de grãos estocados: pode proteger máquinas, equipamentos e outros bens vinculados a operações de crédito rural, conforme o enquadramento e a aceitação da seguradora. Conferimos as exigências do banco ou cooperativa, o uso do equipamento, a vigência e a cláusula beneficiária.</p>
              <Link to="/seguro-penhor-rural" onClick={() => trackInternalLinkClick({ source: "hub-agro:penhor", destination: "/seguro-penhor-rural", label: "Seguro Penhor Rural" })} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Conhecer e cotar Seguro Penhor Rural <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
            </div>
            <aside className="border-l-4 border-primary/30 pl-6">
              <h3 className="text-lg font-semibold">Da concessionária à operação no campo</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">Nossa parceria com a rede de concessionárias dos principais fabricantes facilita a coleta dos dados técnicos do bem. A recomendação considera a necessidade do produtor, sem prometer aprovação do crédito, exclusividade com marcas ou cobertura antes da aceitação.</p>
            </aside>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-6xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Encontre o seguro para sua operação agrícola</h2>
              <p className="mt-3 text-muted-foreground">Comece pelo equipamento ou pela necessidade de financiamento. As coberturas dependem do produto contratado, das condições e da aceitação da seguradora.</p>
            </div>
            <CategoryBlock title="Máquinas, equipamentos, drones e penhor rural" description="Nossa especialidade: proteger o patrimônio que trabalha no campo, com ou sem financiamento. Operação, transporte e prestação de serviços precisam ser avaliados." icon={Tractor} items={MAQUINAS} source="maquinas" />
            <CategoryBlock title="Propriedade rural, silo e estoque" description="Análise de sede, benfeitorias, silos e armazéns, com identificação de estrutura, conteúdo e riscos contratados." icon={Warehouse} items={PROPRIEDADE} source="propriedade" />
            <CategoryBlock title="Transporte agro" description="Movimentação de grãos, insumos e maquinário. A modalidade depende da carga, do trajeto e da responsabilidade do contratante." icon={Truck} items={TRANSPORTE} source="transporte" />
            <CategoryBlock title="Lavoura e culturas" description="Proteção contra eventos contratados. Eventual subvenção depende das regras vigentes, elegibilidade e recursos disponíveis." icon={Wheat} items={LAVOURA} source="lavoura" />
            <CategoryBlock title="Pecuária e granja" description="Análise dos riscos de rebanhos e instalações de produção animal, conforme modalidade e aceitação." icon={Beef} items={PECUARIA} source="pecuaria" />
          </div>
        </section>

        <section className="py-12 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-6xl grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Atendimento onde o agro produz</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">Atendemos produtores de Mato Grosso, Mato Grosso do Sul e Goiás; Paraná, Santa Catarina e Rio Grande do Sul; Minas Gerais e interior de São Paulo; Bahia, Maranhão, Piauí e Tocantins, além dos demais estados brasileiros.</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">O município de operação, os deslocamentos entre propriedades e a prestação de serviços orientam a análise. A sede em Guarulhos/SP não limita o atendimento ao produtor. Vistorias e sinistros seguem os procedimentos de cada seguradora.</p>
              <Link to="/atendimento-nacional" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Veja o atendimento nacional da Patro</Link>
            </div>
            <div>
              <h2 className="text-2xl font-bold">O que enviar para começar a cotação</h2>
              <ul className="mt-4 list-disc pl-5 space-y-3 text-muted-foreground">
                <li>Marca, modelo, ano e valor da máquina ou drone.</li>
                <li>Município/UF, tipo de uso e deslocamentos previstos.</li>
                <li>Existência de financiamento e exigências do banco ou cooperativa.</li>
                <li>Apólice atual, se for renovação; documentos adicionais serão orientados pela equipe.</li>
              </ul>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-agro:mid")} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground"><MessageCircle className="h-5 w-5" aria-hidden="true" /> Cotar com especialista agro</a>
              <p className="mt-3 text-sm text-muted-foreground">Prazo e condições dependem da documentação e da análise da seguradora.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQBlock
          title="Perguntas frequentes — Seguro Agro"
          items={FAQS}
          headingId="faq-agro-heading"
          className="py-14"
          skipSchema
        />

        {/* Cross-link */}
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Outros conteúdos úteis
            </h2>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <Link
                to="/glossario-seguros"
                onClick={() =>
                  trackInternalLinkClick({
                    source: "hub-agro",
                    destination: "/glossario-seguros",
                    label: "Glossário",
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Bird className="h-4 w-4" /> Glossário de seguros
              </Link>
              <Link
                to="/seguros-empresariais-pme-guarulhos"
                onClick={() =>
                  trackInternalLinkClick({
                    source: "hub-agro",
                    destination: "/seguros-empresariais-pme-guarulhos",
                    label: "Seguros para PME",
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <ArrowRight className="h-4 w-4" /> Seguros para PME
              </Link>
              <Link
                to="/blog"
                onClick={() =>
                  trackInternalLinkClick({
                    source: "hub-agro",
                    destination: "/blog",
                    label: "Blog",
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <ArrowRight className="h-4 w-4" /> Blog Patro
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyQuoteBar
        source="hub-agro"
        quoteHref="/cotacao?tipo=agro"
        whatsappMessage={WA_MSG}
        ctaLabel="Cotar seguro agro"
      />
    </>
  );
};

export default SeguroAgro;