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
  { name: "Seguro de Trator Agrícola", slug: "seguro-trator-agricola", desc: "John Deere, Massey Ferguson, New Holland, Valtra, Case IH, Mahindra, Jacto e mais." },
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
  { name: "Seguro Rural (Penhor Rural)", slug: "seguro-rural", desc: "Estoque rural (grãos, insumos, defensivos) penhorado em operação de crédito." },
];

const TRANSPORTE: Item[] = [
  { name: "Seguro de Transporte Agro", slug: "seguro-transporte-agro", desc: "Transporte de grãos, insumos, fertilizantes e maquinário entre lavoura, armazém e indústria." },
];

const FAQS = [
  {
    question: "O que cobre um seguro agro completo?",
    answer:
      "Um programa agro completo cobre quatro frentes: (1) a lavoura/cultura no campo contra eventos climáticos cobertos (granizo, geada, vendaval, chuva excessiva, seca, conforme produto); (2) máquinas e implementos contra incêndio, colisão, tombamento, roubo e furto qualificado; (3) propriedade rural — sede, benfeitorias e estoque em silo/armazém; (4) transporte de grãos, insumos e maquinário. As coberturas são contratadas separadamente ou em conjunto, conforme aceitação da seguradora e perfil da operação.",
  },
  {
    question: "A Patro atende produtor de fora de São Paulo?",
    answer:
      "Sim. Apesar de a sede ficar em Guarulhos/SP, a Patro atende produtores rurais e agroindústrias em todo o Brasil de forma digital. Operamos com seguradoras de presença nacional (Porto Seguro, Allianz, Tokio Marine, HDI, Sancor, Mapfre, Essor, entre outras parceiras) — o que muda por região é o apetite técnico e a aceitação do CNAE, não o atendimento.",
  },
  {
    question: "Seguro agrícola tem PSR (Programa de Subvenção ao Prêmio)?",
    answer:
      "Sim, parte das apólices de seguro agrícola é elegível à subvenção federal do PSR, que reduz o custo do prêmio para o produtor. A elegibilidade depende da cultura, da região, do volume orçamentário liberado pelo Ministério da Agricultura no ano e da seguradora habilitada. Ajudamos a verificar enquadramento e a documentação — sujeito a disponibilidade de cota da seguradora.",
  },
  {
    question: "Qual a diferença entre Seguro Agrícola e Penhor Rural?",
    answer:
      "O Seguro Agrícola cobre a lavoura no campo (planta) contra eventos climáticos durante o ciclo da cultura. O Penhor Rural (Seguro Rural) cobre o estoque já colhido — grãos, insumos, defensivos — quando esse estoque está dado em garantia a uma instituição financeira em operação de crédito rural. São produtos complementares, não substitutos.",
  },
  {
    question: "Trator e colheitadeira têm seguro como o de carro?",
    answer:
      "A lógica é parecida, mas o produto é específico para máquinas agrícolas. Cobre incêndio, colisão, tombamento, roubo, furto qualificado e RC para danos a terceiros durante a operação. Trabalhamos com Porto Seguro, Allianz, HDI, Tokio Marine, Sancor e Essor para tratores e colheitadeiras de John Deere, Massey Ferguson, New Holland, Case IH, Valtra, Mahindra e Jacto — conforme aceitação da seguradora.",
  },
  {
    question: "Silo metálico e armazém de grãos têm seguro?",
    answer:
      "Sim. O seguro de silo agrícola cobre a estrutura metálica (incêndio, raio, explosão, vendaval, colapso), o conteúdo armazenado (grãos) e, em alguns produtos, perda de qualidade por falha de equipamento de aeração ou termometria. Valor segurado considera capacidade em sacas e cotação da commodity na data do sinistro, conforme cláusula contratada.",
  },
  {
    question: "Drone de pulverização precisa de seguro?",
    answer:
      "Sim, e é altamente recomendado. Cobre danos ao próprio drone (queda, colisão, falha mecânica) e Responsabilidade Civil do operador por danos a terceiros, lavouras vizinhas ou pessoas. Operadores certificados pela ANAC têm aceitação mais ampla nas seguradoras.",
  },
  {
    question: "Como funciona o sinistro agro?",
    answer:
      "Comunicação imediata via WhatsApp da Patro (11) 5199-7500. A seguradora envia regulador (presencial para máquinas/silo, ou peritagem por imagem em drone/satélite para lavoura). Indenização paga após apuração técnica do prejuízo, descontada franquia e cláusulas contratuais. Acompanhamos cada etapa para evitar travas comuns (subseguro, documentação incompleta, divergência de NF de máquina).",
  },
  {
    question: "Vocês cotam apólice de agroindústria e cooperativa?",
    answer:
      "Sim. Atendemos produtores individuais (PF e PJ), agroindústrias, cooperativas, revendas de insumos e tradings. Para operações grandes, montamos programa multilinha com cláusulas específicas (lucros cessantes, RC produto, transporte internacional, D&O) — sujeito a análise da seguradora e visita técnica.",
  },
  {
    question: "Preciso ir até Guarulhos para fechar a apólice?",
    answer:
      "Não. Todo o atendimento — cotação, envio de documentação, assinatura digital da proposta e regulação de sinistro — é feito remotamente por WhatsApp, e-mail e plataforma das seguradoras. Recebemos produtores do Centro-Oeste, Sul, Sudeste e Nordeste dessa forma há anos.",
  },
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
      url: "https://patroseguros.com.br/",
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
        itemOffered: { "@type": "Service", name: it.name, url: `https://patroseguros.com.br/${it.slug}` },
      })),
    },
  };

  return (
    <>
      <PageMeta
        title="Seguro Agro — Lavoura, Máquinas, Silo e Propriedade Rural | Patro Seguros"
        description="Hub completo de seguro agro: lavoura (PSR), pecuário, trator, colheitadeira, pulverizador, silo, propriedade rural e transporte agro. Atendimento nacional pela Patro Seguros."
      />
      <Helmet>
        <link rel="canonical" href="https://patroseguros.com.br/seguro-agro" />
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
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <span className="section-label">Cluster Agro</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Seguro Agro — proteção completa do plantio à porteira
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Especialistas em seguro rural, lavoura, máquinas agrícolas, silo, propriedade e
              transporte agro. Atendimento <strong>nacional</strong> via WhatsApp e e-mail, com
              cotação simultânea nas principais seguradoras do agronegócio brasileiro — conforme
              aceitação da seguradora e perfil da operação.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              Sede em Guarulhos/SP · Atendimento nacional · 500+ apólices PME emitidas
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

        {/* Trust strip */}
        <section className="py-8 border-y border-border bg-card">
          <div className="container mx-auto px-4 max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <ShieldCheck className="h-6 w-6 text-primary mx-auto" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold text-foreground">16+ seguradoras</p>
              <p className="text-xs text-muted-foreground">Cotação simultânea</p>
            </div>
            <div>
              <Sprout className="h-6 w-6 text-primary mx-auto" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold text-foreground">PSR elegível</p>
              <p className="text-xs text-muted-foreground">Subvenção federal</p>
            </div>
            <div>
              <Tractor className="h-6 w-6 text-primary mx-auto" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold text-foreground">Todas as marcas</p>
              <p className="text-xs text-muted-foreground">JD, MF, NH, Case, Valtra, Jacto</p>
            </div>
            <div>
              <MapPin className="h-6 w-6 text-primary mx-auto" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold text-foreground">Cobertura nacional</p>
              <p className="text-xs text-muted-foreground">Atendimento digital</p>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-6xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Linhas de seguro agro que cotamos
              </h2>
              <p className="mt-3 text-muted-foreground">
                Escolha a frente da sua operação. Cada produto abre a página dedicada com
                coberturas, exclusões frequentes, exigências de aceitação e exemplos de sinistro.
              </p>
            </div>

            <CategoryBlock
              title="Lavoura e culturas"
              description="Proteção do ciclo da cultura contra eventos climáticos cobertos. Elegível ao PSR conforme cultura, região e cota da seguradora."
              icon={Wheat}
              items={LAVOURA}
              source="lavoura"
            />

            <CategoryBlock
              title="Pecuária e granja"
              description="Cobertura para rebanho e instalações de produção animal — bovino, equino, ovino, suíno e avícola."
              icon={Beef}
              items={PECUARIA}
              source="pecuaria"
            />

            <CategoryBlock
              title="Máquinas e equipamentos"
              description="Tratores, colheitadeiras, pulverizadores, implementos e drones. Cobertura para operação, deslocamento e pernoite."
              icon={Tractor}
              items={MAQUINAS}
              source="maquinas"
            />

            <CategoryBlock
              title="Propriedade rural, silo e estoque"
              description="Sede, benfeitorias, silos metálicos, armazéns graneleiros e estoque dado em penhor rural."
              icon={Warehouse}
              items={PROPRIEDADE}
              source="propriedade"
            />

            <CategoryBlock
              title="Transporte agro"
              description="Movimentação de grãos, insumos, fertilizantes e maquinário entre lavoura, armazém, indústria e porto."
              icon={Truck}
              items={TRANSPORTE}
              source="transporte"
            />
          </div>
        </section>

        {/* AEO Block — Quando faz sentido */}
        <section className="py-14 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
              Quando faz sentido contratar seguro agro
            </h2>
            <div className="mt-8 grid md:grid-cols-2 gap-5">
              {[
                { title: "Tomou crédito rural (Pronaf, Pronamp, custeio)", body: "A maioria das linhas exige seguro da lavoura ou penhor rural sobre o estoque como garantia adicional." },
                { title: "Investiu em maquinário acima de R$ 300 mil", body: "Trator, colheitadeira e pulverizador novos representam patrimônio relevante — incêndio, tombamento ou roubo sem seguro inviabiliza a safra seguinte." },
                { title: "Cultura sensível a clima (café, fruta, hortaliça)", body: "Geada, granizo e vendaval em culturas de alto valor agregado justificam apólice específica e, quando possível, enquadramento no PSR." },
                { title: "Silo ou armazém próprio com grão estocado", body: "Estrutura metálica + commodity armazenada concentram risco alto de incêndio e perda por umidade — cobertura específica protege estrutura e conteúdo." },
                { title: "Transporte regular de grãos ou insumos", body: "Apólice de transporte (RCTR-C / RCF-DC / RCA-C) cobre acidente, tombamento, roubo e avaria durante o deslocamento." },
                { title: "Operação de drone de pulverização", body: "RC do operador e cobertura do equipamento — exigência cada vez mais frequente de tomadores de serviço e cooperativas." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA mid */}
        <section className="py-12 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Quer um diagnóstico da sua operação agro?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mande no WhatsApp o que você tem hoje (apólices, máquinas, hectares, cultura, silo,
              caminhões) e devolvemos em até 2 horas úteis um mapa de risco e proposta multilinha
              com as melhores seguradoras do agro — sem custo e sem compromisso.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hub-agro:mid")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Diagnóstico no WhatsApp
              </a>
              <Link
                to="/cotacao?tipo=agro"
                onClick={() => trackCotacaoClick("hub-agro:mid")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-colors"
              >
                <Calculator className="h-5 w-5" /> Formulário de cotação
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQBlock
          title="Perguntas frequentes — Seguro Agro"
          items={FAQS}
          headingId="faq-agro-heading"
          className="py-14"
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