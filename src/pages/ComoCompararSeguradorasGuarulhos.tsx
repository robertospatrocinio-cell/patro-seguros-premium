import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, MessageCircle, HelpCircle, ShieldCheck, Scale, MapPin, Building2, CheckCircle2, Info,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { SEGURADORAS_PARCEIRAS } from "@/data/seguradorasParceirasSeo";
import ComparadorSeguradoras from "@/components/ComparadorSeguradoras";

const CANONICAL = `${CANONICAL_BASE_URL}/como-comparar-seguradoras-guarulhos`;

const CRITERIOS = [
  {
    icon: Scale,
    title: "Cobertura x franquia",
    body:
      "Duas apólices com o mesmo preço podem ter coberturas e franquias muito diferentes. Compare o que está incluso (colisão, roubo, terceiros, vidros, assistência 24h) e o valor da franquia obrigatória.",
  },
  {
    icon: ShieldCheck,
    title: "Serviços agregados",
    body:
      "Guincho, chaveiro, carro reserva, assistência residencial: são serviços que fazem diferença no dia a dia. Verifique quantidade de acionamentos, km cobertos e prazo de carro reserva.",
  },
  {
    icon: MapPin,
    title: "Aceitação para o seu perfil e região",
    body:
      "Nem toda seguradora aceita todo perfil de motorista, veículo, uso profissional (Uber/99) ou CEP de pernoite. Em Guarulhos, o CEP de pernoite afeta preço e aceitação.",
  },
  {
    icon: Info,
    title: "Regulação de sinistro",
    body:
      "Prazo médio para vistoria, oficina referenciada próxima, indenização integral em caso de perda total. Peça essas informações antes de fechar.",
  },
  {
    icon: Building2,
    title: "Rede referenciada em Guarulhos e Grande SP",
    body:
      "Oficinas parceiras, clínicas e prestadores próximos reduzem o tempo de reparo e o transtorno. Verifique se há rede próxima do seu bairro (Cidade Maia, Bonsucesso, Cumbica etc.).",
  },
  {
    icon: CheckCircle2,
    title: "Reputação e atendimento",
    body:
      "Avaliações de sinistro, tempo de resposta, canais de atendimento (app, telefone, WhatsApp). Uma seguradora barata que demora a pagar não vale a diferença.",
  },
];

const FAQS = [
  {
    question: "Qual é a melhor seguradora de Guarulhos?",
    answer:
      "Não existe uma única 'melhor seguradora' — a melhor é a que aceita o seu perfil, cobre o que você precisa e tem preço competitivo. Para um mesmo motorista, Porto Seguro, Tokio Marine, Allianz, Azul, Mapfre, Bradesco, HDI, Sulamérica, Liberty e outras podem trazer preços muito diferentes. A Patro Seguros compara as seguradoras parceiras compatíveis com o perfil antes de indicar.",
  },
  {
    question: "Como comparar seguradoras de forma justa?",
    answer:
      "Coloque as propostas lado a lado com as mesmas coberturas e franquias. Compare: cobertura compreensiva, valor da franquia, RCF-V (danos a terceiros), APP (acidentes pessoais), assistência 24h, carro reserva, vidros e itens acessórios. Preço só faz sentido quando a cobertura é equivalente.",
  },
  {
    question: "Vale a pena contratar direto no site da seguradora ou via corretora?",
    answer:
      "Uma corretora independente cota várias seguradoras de uma vez, orienta sobre coberturas e representa o cliente em caso de sinistro — sem custo adicional (a comissão do corretor já está no preço, com ou sem intermediário). A Patro Seguros é corretora regulada pela SUSEP e atua em Guarulhos, São Paulo e região.",
  },
  {
    question: "O CEP em Guarulhos influencia no preço do seguro?",
    answer:
      "Sim. O CEP de pernoite do veículo pesa na composição do preço e até na aceitação. Bairros com maior índice de sinistros (roubo/furto/colisão) costumam ter tarifa mais alta. Bairros como Cidade Maia, Vila Galvão, Macedo e Jardim Bela Vista têm perfis diferentes de Cumbica, Bonsucesso ou Pimentas.",
  },
  {
    question: "Franquia menor sempre é melhor?",
    answer:
      "Nem sempre. Franquia menor deixa o seguro mais caro. Franquia maior reduz o preço, mas você paga mais em caso de sinistro parcial. O ideal é dimensionar a franquia conforme o valor do carro e a sua capacidade de arcar com o pagamento em um sinistro.",
  },
  {
    question: "O que é RCF-V e por que é importante?",
    answer:
      "RCF-V (Responsabilidade Civil Facultativa Veicular) cobre danos que o segurado causa a terceiros — materiais e corporais. Um acidente com vítima pode gerar indenização de R$ 100 mil ou mais. Recomenda-se RCF-V com limites razoáveis (ex.: R$ 100 mil materiais / R$ 100 mil corporais) para não ficar exposto.",
  },
  {
    question: "Seguradora com preço muito baixo é confiável?",
    answer:
      "Preço muito abaixo do mercado costuma indicar cobertura menor, franquia mais alta, restrições de perfil ou rede referenciada limitada. Antes de fechar, revise as condições gerais e simule o cenário de sinistro. A Patro sinaliza quando uma proposta 'barata' tem cobertura enfraquecida.",
  },
  {
    question: "Posso trocar de seguradora antes de vencer a apólice atual?",
    answer:
      "Sim, mas normalmente é mais vantajoso trocar no vencimento — evita-se o cancelamento com devolução proporcional e você preserva o bônus. A Patro pode cotar antecipadamente e agendar a substituição para a data certa.",
  },
  {
    question: "O que é bônus e como ele afeta a cotação?",
    answer:
      "Bônus é a classe de bonificação por ausência de sinistros. Quanto maior o bônus, menor o preço. Ao trocar de seguradora, informe corretamente sua classe atual — a nova seguradora considera essa classe para o novo cálculo.",
  },
  {
    question: "Como funciona a cotação com a Patro Seguros?",
    answer:
      "Você envia dados básicos (veículo, CEP, perfil do condutor). A Patro cota nas seguradoras parceiras compatíveis, apresenta as opções lado a lado, explica coberturas e franquia e recomenda a que faz mais sentido para o seu caso. Sem custo e sem compromisso.",
  },
  {
    question: "A Patro atende em Guarulhos e São Paulo?",
    answer:
      "Sim. Atendimento presencial na Av. Salgado Filho, 2120 - Sala 219, Cidade Maia, Guarulhos/SP, e remoto em toda a Grande São Paulo por telefone, WhatsApp e e-mail.",
  },
];

const relacionadas = SEGURADORAS_PARCEIRAS.slice(0, 8);

const waUrl = `https://wa.me/551151997500?text=${encodeURIComponent(
  "Olá, quero ajuda para comparar seguradoras em Guarulhos pela Patro Seguros."
)}`;

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Como escolher e comparar seguradoras em Guarulhos",
  url: CANONICAL,
  inLanguage: "pt-BR",
  isPartOf: { "@type": "WebSite", name: "Patro Seguros", url: CANONICAL_BASE_URL },
};

const ComoCompararSeguradorasGuarulhos = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Como comparar seguradoras em Guarulhos"
      description="Guia prático para escolher e comparar seguradoras em Guarulhos e São Paulo: cobertura, franquia, serviços, aceitação por CEP e reputação. FAQ completo pela Patro Seguros."
      ogImage={`${CANONICAL_BASE_URL}/images/og-seguradoras-parceiras.jpg`}
      ogImageAlt="Como comparar seguradoras em Guarulhos — guia da Patro Seguros, corretora local em Guarulhos/SP."
    />
    <BreadcrumbSchema
      items={[
        { name: "Início", url: `${CANONICAL_BASE_URL}/` },
        { name: "Seguradoras Parceiras", url: `${CANONICAL_BASE_URL}/seguradoras-parceiras` },
        { name: "Como comparar seguradoras em Guarulhos", url: CANONICAL },
      ]}
    />
    <FAQSchema faqs={FAQS} />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
    </Helmet>

    <Header />

    <main>
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2 text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-1">
          <li><Link to="/" className="hover:text-primary">Início</Link></li>
          <li>/</li>
          <li><Link to="/seguradoras-parceiras" className="hover:text-primary">Seguradoras Parceiras</Link></li>
          <li>/</li>
          <li aria-current="page" className="text-foreground">Como comparar seguradoras</li>
        </ol>
      </nav>

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Scale className="h-4 w-4" /> Guia comparativo • Guarulhos/SP
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Como escolher e comparar seguradoras em Guarulhos
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Um guia prático da Patro Seguros para decidir entre Porto Seguro, Mapfre, Allianz,
            Tokio Marine, Azul, Bradesco, Sulamérica, HDI, Liberty e outras seguradoras — com
            base em cobertura, franquia, serviços, aceitação e reputação, e não só no preço.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/cotacao" onClick={() => trackCotacaoClick("comparar_seguradoras_hero")}>
                Comparar com a Patro <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("comparar_seguradoras_hero")}>
                <MessageCircle className="mr-2 h-4 w-4" /> Falar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Critérios */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">6 critérios para comparar seguradoras</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CRITERIOS.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="h-full">
              <CardContent className="p-5">
                <Icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabela comparativa interativa */}
      <section className="container mx-auto px-4 py-10" id="comparativo">
        <div className="max-w-3xl mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Tabela comparativa interativa das seguradoras
          </h2>
          <p className="text-muted-foreground">
            Selecione até 3 seguradoras parceiras e veja lado a lado como cada uma se posiciona nos
            5 critérios que mais pesam na decisão em Guarulhos e Grande SP: cobertura × franquia,
            serviços agregados, regulação de sinistro, rede referenciada local e reputação.
          </p>
        </div>
        <ComparadorSeguradoras />
      </section>

      {/* Como a Patro compara */}
      <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Como a Patro compara seguradoras para você</h2>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "Coletamos perfil, veículo/imóvel/empresa e CEP.",
            "Cotamos nas seguradoras parceiras compatíveis com o risco.",
            "Colocamos as propostas lado a lado com cobertura equivalente.",
            "Explicamos diferenças de franquia, serviços e reputação antes da contratação.",
          ].map((step, i) => (
            <li key={i} className="p-4 border rounded-lg bg-background">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-2">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Perguntas frequentes</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="p-4 bg-background rounded-lg border">
              <summary className="font-semibold cursor-pointer">{f.question}</summary>
              <p className="mt-2 text-muted-foreground leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Ver seguradoras */}
      <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Veja páginas das seguradoras parceiras</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {relacionadas.map((s) => (
            <Link
              key={s.slug}
              to={`/${s.slug}`}
              className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="font-semibold">{s.shortName}</div>
              <div className="text-xs text-muted-foreground mt-1">Ver página</div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-sm">
          <Link to="/seguradoras-parceiras" className="text-primary hover:underline">
            ← Ver todas as seguradoras parceiras
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Quer ajuda para comparar seguradoras?</h2>
          <p className="mb-6 opacity-90">
            A Patro Seguros cota nas seguradoras parceiras compatíveis com o seu perfil e explica as diferenças.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link to="/cotacao" onClick={() => trackCotacaoClick("comparar_seguradoras_footer")}>
                Solicitar cotação comparativa
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("comparar_seguradoras_footer")}>
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default ComoCompararSeguradorasGuarulhos;
