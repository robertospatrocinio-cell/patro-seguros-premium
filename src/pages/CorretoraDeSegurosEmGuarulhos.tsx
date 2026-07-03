import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Building2,
  HeartPulse,
  Home as HomeIcon,
  Car,
  Briefcase,
  Truck,
  Stethoscope,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SpeakableSchema from "@/components/SpeakableSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import LocalAreaSchema from "@/components/LocalAreaSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

/**
 * Página pilar de SEO local — disputa o topo para
 * "corretora de seguros em Guarulhos" e variações próximas.
 *
 * Princípios:
 *  - Conteúdo único, escrito do zero (sem copiar concorrentes).
 *  - HTML semântico-first: H1/H2/H3 reais, parágrafos em <p>, links em <a>,
 *    imagens com alt. Sem texto escondido. Sem keyword stuffing.
 *  - Schemas via componentes já existentes (LocalAreaSchema cuida do
 *    @graph Service + FAQPage; InsuranceAgency + AggregateRating já
 *    vêm do index.html via @id #insurance-agency, então não duplicamos).
 *  - CTAs visíveis em pontos estratégicos (topo, meio, fim).
 */

const WHATSAPP_URL =
  "https://wa.me/551151997500?text=" +
  encodeURIComponent(
    "Olá, quero cotar um seguro com a Patro Seguros em Guarulhos."
  );

const PATH = "/corretora-de-seguros-em-guarulhos";
const PAGE_URL = `https://www.patroseguros.com.br${PATH}`;

const faqs = [
  {
    question: "O que faz uma corretora de seguros em Guarulhos?",
    answer:
      "Uma corretora de seguros em Guarulhos compara propostas de diferentes seguradoras, explica coberturas, franquias e exclusões, e acompanha o cliente desde a cotação até o uso do seguro, incluindo suporte em sinistros. A Patro Seguros atua de forma consultiva: entendemos o perfil do cliente — pessoa física, família ou empresa — e indicamos a combinação mais adequada entre proteção e custo.",
  },
  {
    question: "Por que contratar com uma corretora em Guarulhos em vez de comprar direto com a seguradora?",
    answer:
      "A corretora não cobra do cliente — a remuneração vem da seguradora escolhida. Em troca, o cliente ganha comparação entre várias seguradoras, orientação técnica imparcial e acompanhamento em renovações, alterações e sinistros. Em Guarulhos, contar com uma corretora local também ajuda em vistorias, regulação de sinistro e atendimento presencial quando necessário.",
  },
  {
    question: "Qual o endereço da Patro Seguros em Guarulhos?",
    answer:
      "Atendemos na Avenida Salgado Filho, 2120 — Edifício Via Alameda, sala 219, Cidade Maia, Guarulhos/SP. Também atendemos por telefone (11) 5199-7500, WhatsApp e e-mail, com cobertura em todos os bairros da cidade e região metropolitana.",
  },
  {
    question: "Em quanto tempo recebo a cotação?",
    answer:
      "Para seguros pessoais (auto, residencial, vida, plano de saúde) o prazo padrão é de até 2 horas úteis. Seguros empresariais, de frota, transporte e responsabilidade civil podem levar de 24 a 72 horas porque envolvem análise de risco mais detalhada pelas seguradoras.",
  },
  {
    question: "Quais bairros de Guarulhos a Patro Seguros atende?",
    answer:
      "Atendemos todos os bairros de Guarulhos, com páginas e equipes preparadas para Cidade Maia, Centro, Cumbica, Bonsucesso, Pimentas, Taboão, Vila Galvão, Gopoúva, Macedo, Vila Augusta, Picanço, Jardim Maia, Ponte Grande e região do Aeroporto. Também atendemos toda a Grande São Paulo e seguros agro/empresariais em âmbito nacional.",
  },
  {
    question: "A corretora cobra alguma taxa para fazer a cotação?",
    answer:
      "Não. A cotação, a comparação entre seguradoras e a orientação técnica são gratuitas. O cliente paga apenas o prêmio do seguro escolhido — o mesmo valor que pagaria diretamente à seguradora — e ganha o suporte completo da corretora em renovações, ajustes de cobertura e sinistro.",
  },
  {
    question: "Quais seguradoras a Patro trabalha?",
    answer:
      "Trabalhamos com mais de 16 seguradoras de grande porte (Porto Seguro, Allianz, HDI, Bradesco Seguros, Tokio Marine, Sompo, Mapfre, Liberty, Zurich, entre outras) e mais de 20 operadoras de planos de saúde. Isso permite comparar coberturas, redes credenciadas e preços antes de o cliente decidir.",
  },
  {
    question: "Como funciona o atendimento em caso de sinistro em Guarulhos?",
    answer:
      "Em caso de sinistro, o cliente aciona a Patro pelo WhatsApp, telefone ou e-mail. Nossa equipe abre o aviso de sinistro na seguradora, orienta sobre documentos, acompanha vistoria e regulação, e cobra prazos. O objetivo é que o cliente não fique sozinho diante da seguradora em um momento difícil.",
  },
];

const bairros = [
  { name: "Cidade Maia", link: "/seguros-guarulhos/cidade-maia" },
  { name: "Centro", link: "/seguros-guarulhos/centro" },
  { name: "Cumbica", link: "/seguros-guarulhos/cumbica" },
  { name: "Bonsucesso", link: "/seguros-guarulhos/bonsucesso" },
  { name: "Pimentas", link: "/seguros-guarulhos/pimentas" },
  { name: "Taboão", link: "/seguros-guarulhos/taboao" },
  { name: "Vila Galvão", link: "/seguros-guarulhos/vila-galvao" },
  { name: "Gopoúva", link: "/seguros-guarulhos/gopouva" },
  { name: "Macedo", link: "/seguros-guarulhos/macedo" },
  { name: "Vila Augusta", link: "/seguros-guarulhos/vila-augusta" },
  { name: "Picanço", link: "/seguros-guarulhos/picanco" },
  { name: "Jardim Maia", link: "/seguros-guarulhos/jardim-maia" },
  { name: "Ponte Grande", link: "/seguros-guarulhos/ponte-grande" },
  { name: "Região do Aeroporto", link: "/seguros-guarulhos/aeroporto-cumbica" },
];

const segurosPessoais = [
  {
    icon: Car,
    title: "Seguro Auto em Guarulhos",
    href: "/seguro-auto-guarulhos",
    anchor: "Seguro Auto em Guarulhos",
    desc:
      "Cobertura para colisão, roubo, furto, incêndio, terceiros e assistência 24h, considerando o perfil de tráfego e roubo da cidade.",
  },
  {
    icon: HomeIcon,
    title: "Seguro Residencial em Guarulhos",
    href: "/seguro-residencial-guarulhos",
    anchor: "Seguro Residencial em Guarulhos",
    desc:
      "Proteção do imóvel e dos bens contra incêndio, danos elétricos, vendaval, roubo qualificado e responsabilidade civil familiar.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro de Vida em Guarulhos",
    href: "/seguro-vida-guarulhos",
    anchor: "Seguro de Vida em Guarulhos",
    desc:
      "Coberturas de morte, invalidez, doenças graves e assistência funeral para você proteger quem depende da sua renda.",
  },
  {
    icon: HeartPulse,
    title: "Plano de Saúde em Guarulhos",
    href: "/plano-saude-guarulhos",
    anchor: "Plano de Saúde em Guarulhos",
    desc:
      "Planos individuais, familiares e por adesão, com comparação de rede credenciada, carências e reajustes.",
  },
  {
    icon: Briefcase,
    title: "Consórcio em Guarulhos",
    href: "/consorcio",
    anchor: "Consórcio em Guarulhos",
    desc:
      "Alternativa para aquisição de carro, imóvel ou caminhão sem juros, com análise de fluxo de caixa e prazo adequado ao seu objetivo.",
  },
];

const segurosEmpresariais = [
  {
    icon: Building2,
    title: "Seguro Empresarial",
    href: "/seguro-empresarial-guarulhos",
    anchor: "Seguro Empresarial em Guarulhos",
    desc:
      "Para escritórios, lojas, indústrias e prestadores de serviço — incêndio, roubo, danos elétricos, lucros cessantes e responsabilidade civil.",
  },
  {
    icon: Truck,
    title: "Seguro Frota",
    href: "/seguro-frota-empresas-guarulhos",
    anchor: "Seguro Frota para Empresas em Guarulhos",
    desc:
      "Gestão de frotas de qualquer porte com franquia diferenciada, app de aviso de sinistro e relatórios de uso.",
  },
  {
    icon: Truck,
    title: "Seguro Transporte e Carga",
    href: "/seguro-transporte-carga-guarulhos",
    anchor: "Seguro Transporte de Cargas em Guarulhos",
    desc:
      "Cobertura RCTR-C, RCF-DC e cargas específicas para transportadoras e embarcadores que operam em Cumbica e na região.",
  },
  {
    icon: Stethoscope,
    title: "Plano de Saúde Empresarial",
    href: "/plano-saude-empresarial-guarulhos",
    anchor: "Plano de Saúde Empresarial em Guarulhos",
    desc:
      "Planos PME e corporativos com comparação de tabela, rede e coparticipação para reter talentos e equilibrar orçamento.",
  },
];

const diferenciais = [
  "Atendimento consultivo: o cliente entende o que está contratando antes de assinar.",
  "Acesso a 16+ seguradoras e 20+ operadoras de saúde em uma única cotação.",
  "Escritório físico no Cidade Maia para reuniões presenciais quando necessário.",
  "Acompanhamento de sinistro com responsável dedicado, do aviso à indenização.",
  "Especialização em seguros patrimoniais (galpões), agro e responsabilidade civil.",
  "Lembretes de renovação para evitar lapsos de cobertura em apólices anuais.",
];

const CorretoraDeSegurosEmGuarulhos = () => {
  return (
    <>
      <PageMeta
        title="Corretora de Seguros em Guarulhos | Patro Seguros"
        description="Corretora de seguros em Guarulhos com atendimento consultivo. Compare seguradoras para seguro auto, saúde, vida, residencial, empresarial e consórcio."
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Corretora de Seguros em Guarulhos", url: PATH },
        ]}
      />
      <LocalAreaSchema
        serviceName="Corretora de Seguros em Guarulhos"
        url={PAGE_URL}
        description="Corretora de seguros em Guarulhos com atendimento consultivo para pessoas, famílias e empresas. Comparação entre seguradoras, orientação técnica e suporte em sinistros."
        city="Guarulhos"
        geo={{ latitude: -23.4628, longitude: -46.5333 }}
        faqs={faqs}
      />

      <Header />

      <main id="main-content" className="bg-background">
        {/* HERO */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-primary-foreground/80">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link to="/" className="hover:underline">Início</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-primary-foreground">
                  Corretora de Seguros em Guarulhos
                </li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Corretora de Seguros em Guarulhos
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl">
              A Patro Seguros ajuda pessoas, famílias e empresas de Guarulhos a comparar
              seguradoras, entender coberturas e contratar seguros com orientação consultiva
              — do primeiro contato à indenização, se necessário.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/cotacao?origem=corretora-de-seguros-em-guarulhos"
                onClick={() => trackCotacaoClick("corretora-de-seguros-em-guarulhos:hero")}
              >
                <Button size="lg" variant="cta" className="text-base px-8 h-12 rounded-xl font-semibold">
                  <ShieldCheck className="mr-2 h-5 w-5" aria-hidden="true" />
                  Solicitar cotação online
                </Button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("corretora-de-seguros-em-guarulhos:hero")}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Falar com um consultor no WhatsApp
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Cidade Maia, Guarulhos/SP
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4" aria-hidden="true" /> (11) 5199-7500
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" aria-hidden="true" /> 16+ seguradoras parceiras
              </span>
            </div>
          </div>
        </section>

        {/* Por que escolher uma corretora */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Por que escolher uma corretora de seguros em Guarulhos?
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                Contratar seguro direto com uma única seguradora costuma ser rápido,
                mas limita o cliente a uma só leitura de risco, uma só tabela de
                preço e um só padrão de atendimento. Uma corretora local em Guarulhos
                funciona de outra forma: compara propostas de várias seguradoras,
                explica diferenças entre coberturas, franquias e exclusões, e
                acompanha o cliente quando algo dá errado.
              </p>
              <p>
                Guarulhos tem um perfil de risco específico — trânsito intenso nas
                avenidas que cortam Cumbica e Bonsucesso, área industrial densa
                ao redor do aeroporto, bairros residenciais consolidados como
                Cidade Maia, Vila Galvão e Macedo, e centros comerciais que
                concentram lojas e prestadores de serviço. Cada perfil pede uma
                leitura diferente de seguradora, e é nesse ponto que a consultoria
                local faz diferença.
              </p>
              <p>
                A Patro Seguros é uma corretora estabelecida no Cidade Maia que
                trabalha tanto com pessoas físicas quanto com empresas. Atendemos
                quem está comprando o primeiro seguro auto, famílias que querem
                organizar saúde e vida, e empresas que precisam estruturar
                proteção patrimonial, frota e responsabilidade civil. Em todos os
                casos, o ponto de partida é o mesmo: entender o cliente antes de
                indicar produto.
              </p>
            </div>
          </div>
        </section>

        {/* Como ajudamos a comparar */}
        <section className="py-14 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Como a Patro Seguros ajuda você a comparar seguradoras
            </h2>
            <p className="text-foreground/85 leading-relaxed mb-8">
              Comparar seguros vai além de olhar o preço final. A mesma apólice
              pode parecer barata e cobrir pouco, ou parecer cara e incluir
              assistência, vidros, carro reserva e franquia reduzida. Nosso
              trabalho é traduzir esses detalhes em uma decisão clara.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Levantamos o perfil de uso, valor do bem, histórico e objetivo da contratação.",
                "Cotamos em paralelo nas seguradoras mais aderentes ao seu caso.",
                "Apresentamos um comparativo lado a lado: coberturas, franquias, assistências e preço.",
                "Explicamos exclusões e armadilhas comuns (como reposição em valor de mercado x referenciado).",
                "Acompanhamos vistoria, emissão e prazos para pagamento.",
                "Em sinistro, abrimos o aviso, orientamos documentos e cobramos o cumprimento de prazos.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-background p-4 rounded-lg border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-foreground/85">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seguros para você e família */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Seguros para você e sua família
            </h2>
            <p className="text-foreground/80 mb-8 max-w-3xl">
              Produtos mais procurados por moradores de Guarulhos. Cada link leva
              para a página específica com coberturas, exemplos de preço e
              perguntas frequentes daquele produto.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {segurosPessoais.map((s) => (
                <Card key={s.href} className="border-border/60 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <s.icon className="h-9 w-9 text-primary mb-3" aria-hidden="true" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
                    <p className="text-sm text-foreground/75 mb-4">{s.desc}</p>
                    <Link
                      to={s.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      aria-label={`Ver detalhes de ${s.anchor}`}
                    >
                      Ver {s.anchor} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seguros para empresas */}
        <section className="py-14 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Seguros para empresas em Guarulhos
            </h2>
            <p className="text-foreground/80 mb-8 max-w-3xl">
              Guarulhos concentra indústrias, transportadoras, lojas e prestadores
              de serviço — cada perfil tem riscos próprios. A Patro estrutura
              programas de seguro que protegem patrimônio, operação e pessoas.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {segurosEmpresariais.map((s) => (
                <Card key={s.href} className="border-border/60 bg-background">
                  <CardContent className="pt-6">
                    <s.icon className="h-9 w-9 text-primary mb-3" aria-hidden="true" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
                    <p className="text-sm text-foreground/75 mb-4">{s.desc}</p>
                    <Link
                      to={s.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      aria-label={`Ver detalhes de ${s.anchor}`}
                    >
                      Ver {s.anchor} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Atendimento local */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Atendimento local no Cidade Maia e região
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                Nosso escritório fica na Avenida Salgado Filho, 2120 — Edifício
                Via Alameda, sala 219, Cidade Maia, Guarulhos/SP. É um ponto
                central da cidade, próximo ao Shopping Maia e de fácil acesso
                para quem mora em Vila Galvão, Macedo, Gopoúva, Centro,
                Picanço, Vila Augusta, Jardim Maia e bairros vizinhos.
              </p>
              <p>
                Atendemos presencialmente com hora marcada, e a maioria das
                cotações é fechada por WhatsApp e e-mail para poupar o tempo
                do cliente. Para empresas, fazemos visitas técnicas quando
                faz sentido vistoriar o local antes de estruturar a apólice
                (galpões, lojas, frotas, condomínios).
              </p>
            </div>
          </div>
        </section>

        {/* Bairros */}
        <section className="py-14 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Bairros atendidos em Guarulhos
            </h2>
            <p className="text-foreground/80 mb-6 max-w-3xl">
              Cada bairro tem uma página dedicada com contexto local, depoimentos
              e seguradoras mais usadas pelos moradores.
            </p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {bairros.map((b) => (
                <li key={b.link}>
                  <Link
                    to={b.link}
                    className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/60 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">
                      Seguros em {b.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como funciona a cotação */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Como funciona a cotação com a Patro
            </h2>
            <ol className="space-y-4">
              {[
                {
                  t: "Você nos envia os dados básicos",
                  d: "Pelo formulário, WhatsApp ou telefone. Para auto e residencial são 5 minutos; para empresarial enviamos um checklist objetivo.",
                },
                {
                  t: "Cotamos nas seguradoras mais aderentes",
                  d: "Selecionamos 3 a 5 seguradoras conforme seu perfil e pedimos cotação em paralelo, evitando que você precise repetir informações.",
                },
                {
                  t: "Você recebe um comparativo claro",
                  d: "Mostramos coberturas, franquias, assistências e preços lado a lado, com explicação do que cada item significa na prática.",
                },
                {
                  t: "Acompanhamos pós-venda e sinistro",
                  d: "Lembramos da renovação, ajustamos a apólice se algo mudar e cuidamos do aviso de sinistro quando você precisar.",
                },
              ].map((step, i) => (
                <li key={i} className="flex gap-4 p-5 bg-muted/40 rounded-xl border border-border/60">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.t}</h3>
                    <p className="text-sm text-foreground/80">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-14 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Por que escolher a Patro Seguros
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {diferenciais.map((d, i) => (
                <li key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-foreground/85">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ visível */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
              Perguntas frequentes sobre corretora de seguros
            </h2>
            <div className="space-y-6" data-speakable="faq">
              {faqs.map((f, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{f.question}</h3>
                  <p className="text-foreground/80 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-14 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground">
              Solicite sua cotação
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Conte para a gente o que você precisa proteger. Em até 2 horas
              úteis enviamos cotações comparativas das melhores seguradoras
              para o seu perfil.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/cotacao?origem=corretora-de-seguros-em-guarulhos"
                onClick={() => trackCotacaoClick("corretora-de-seguros-em-guarulhos:final")}
              >
                <Button size="lg" variant="cta" className="text-base px-8 h-12 rounded-xl font-semibold">
                  Comparar seguradoras agora
                </Button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("corretora-de-seguros-em-guarulhos:final")}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 rounded-xl bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Cotar pelo WhatsApp
                </Button>
              </a>
              <a href="tel:1151997500" aria-label="Ligar para a Patro Seguros: 11 5199-7500">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 rounded-xl bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CorretoraDeSegurosEmGuarulhos;