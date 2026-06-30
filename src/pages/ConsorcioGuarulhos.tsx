import { Link } from "react-router-dom";
import {
  Car,
  Home as HomeIcon,
  Truck,
  CheckCircle2,
  MessageCircle,
  Phone,
  MapPin,
  ArrowRight,
  PiggyBank,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import LocalAreaSchema from "@/components/LocalAreaSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

/**
 * Página local de consórcio em Guarulhos — disputa
 * "consórcio em Guarulhos", "consórcio de carro Guarulhos",
 * "consórcio de imóvel Guarulhos", etc.
 *
 * Conteúdo único, escrito do zero, com FAQ visível e schema Service+FAQPage.
 */

const PATH = "/consorcio-guarulhos";
const URL_ABS = `https://www.patroseguros.com.br${PATH}`;
const WHATSAPP_URL =
  "https://wa.me/551151997500?text=" +
  encodeURIComponent("Olá, quero simular um consórcio com a Patro Seguros em Guarulhos.");

const faqs = [
  {
    question: "Como funciona um consórcio em Guarulhos?",
    answer:
      "Um consórcio é um grupo de pessoas que se unem para formar uma poupança coletiva e adquirir um bem (carro, imóvel, caminhão, moto). Todo mês cada participante paga uma parcela; um ou mais participantes são contemplados por sorteio ou lance e recebem uma carta de crédito para comprar o bem. Não há juros: o custo é uma taxa de administração da administradora autorizada pelo Banco Central. A Patro Seguros, em Guarulhos, ajuda você a comparar administradoras, prazos e perfis de lance.",
  },
  {
    question: "Vale a pena fazer consórcio em Guarulhos em vez de financiamento?",
    answer:
      "Depende do seu objetivo. Consórcio costuma ser mais barato porque não tem juros, mas exige paciência: a contemplação pode demorar, salvo se você der lance. Para quem já tem o bem e quer trocar com calma, ou para quem está formando reserva para entrada de imóvel, costuma fazer sentido. Para quem precisa do bem imediatamente, financiamento ou consórcio com lance livre são mais adequados. Em todos os casos, comparamos cenários antes de você assinar.",
  },
  {
    question: "Quais tipos de consórcio a Patro oferece?",
    answer:
      "Trabalhamos com consórcio de carro (zero ou usado), motos, caminhões e veículos pesados, imóveis residenciais e comerciais, máquinas agrícolas e equipamentos. Cada modalidade tem prazos, taxas e regras de lance diferentes — apresentamos comparativos antes de você decidir.",
  },
  {
    question: "Posso usar a carta de crédito do consórcio para comprar imóvel em Guarulhos?",
    answer:
      "Sim. A carta de crédito de consórcio imobiliário funciona como dinheiro à vista na hora da compra, o que costuma ajudar na negociação de preço — em Guarulhos, em bairros como Cidade Maia, Vila Galvão, Bonsucesso, Macedo e Picanço, isso pode significar desconto real. A carta pode ser usada em imóvel novo, usado, comercial ou para construção em terreno próprio.",
  },
  {
    question: "O que acontece se eu atrasar uma parcela do consórcio?",
    answer:
      "Cada administradora tem regras próprias, mas em geral o atraso impede a participação no sorteio e no lance daquele mês, e gera multa e juros de mora. Atrasos prolongados podem levar à exclusão do grupo. A Patro orienta sobre prazos de tolerância, possibilidade de transferência da cota e como recuperar lances em andamento.",
  },
  {
    question: "É seguro fazer consórcio? Quem fiscaliza?",
    answer:
      "Sim, desde que a administradora seja autorizada pelo Banco Central do Brasil — todas as que indicamos têm essa autorização e são auditadas. O dinheiro do grupo fica em conta separada do patrimônio da administradora, com regras claras de uso.",
  },
  {
    question: "Quais administradoras a Patro trabalha em Guarulhos?",
    answer:
      "Operamos com administradoras líderes de mercado autorizadas pelo Banco Central, incluindo grandes nomes ligados a montadoras e bancos. A escolha depende do tipo de bem (carro, imóvel, caminhão), do prazo e da taxa de administração. Antes de fechar, comparamos as opções viáveis para o seu objetivo.",
  },
];

const modalidades = [
  {
    icon: Car,
    title: "Consórcio de Carro",
    desc: "Carro zero ou usado, com prazos que costumam variar entre 60 e 100 meses. Indicado para quem quer trocar de veículo sem pagar juros.",
    to: "/consorcio-carro",
    anchor: "Consórcio de Carro em Guarulhos",
  },
  {
    icon: HomeIcon,
    title: "Consórcio de Imóvel",
    desc: "Carta de crédito para imóvel novo, usado, comercial ou construção. Funciona como dinheiro à vista na negociação.",
    to: "/consorcio-imoveis",
    anchor: "Consórcio de Imóvel em Guarulhos",
  },
  {
    icon: Truck,
    title: "Consórcio de Veículos Pesados",
    desc: "Caminhões, implementos, máquinas pesadas e equipamentos. Boa alternativa para frota e empresas que querem renovar com previsibilidade.",
    to: "/consorcio-veiculos-pesados",
    anchor: "Consórcio de Caminhão em Guarulhos",
  },
];

const ConsorcioGuarulhos = () => {
  return (
    <>
      <PageMeta
        title="Consórcio em Guarulhos | Patro Seguros"
        description="Consórcio em Guarulhos: simulação de carro, imóvel e caminhão com administradoras autorizadas pelo Banco Central. Compare prazos, taxas e cenários de lance."
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Consórcio em Guarulhos", url: PATH },
        ]}
      />
      <LocalAreaSchema
        serviceName="Consórcio em Guarulhos"
        url={URL_ABS}
        description="Consórcio em Guarulhos para carro, imóvel, caminhão e veículos pesados. Comparação de administradoras autorizadas pelo Banco Central e orientação consultiva."
        city="Guarulhos"
        geo={{ latitude: -23.4628, longitude: -46.5333 }}
        faqs={faqs}
      />

      <Header />

      <main id="main-content" className="bg-background">
        {/* HERO */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-primary-foreground/80">
              <ol className="flex flex-wrap gap-2">
                <li><Link to="/" className="hover:underline">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-primary-foreground">Consórcio em Guarulhos</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Consórcio em Guarulhos
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl">
              Simulação de consórcio para carro, imóvel e caminhão com administradoras
              autorizadas pelo Banco Central. A Patro Seguros, em Guarulhos, compara
              prazos, taxas de administração e cenários de lance antes de você decidir.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/cotacao?tipo=consorcio&origem=consorcio-guarulhos"
                onClick={() => trackCotacaoClick("consorcio-guarulhos:hero")}
              >
                <Button size="lg" variant="cta" className="text-base px-8 h-12 rounded-xl font-semibold">
                  <PiggyBank className="mr-2 h-5 w-5" aria-hidden="true" />
                  Simular consórcio
                </Button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("consorcio-guarulhos:hero")}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Tirar dúvidas no WhatsApp
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
            </div>
          </div>
        </section>

        {/* O que é consórcio */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              O que é consórcio e por que considerar em Guarulhos
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                Consórcio é uma forma de aquisição planejada: um grupo de pessoas
                contribui mensalmente para formar uma poupança coletiva. A cada mês,
                um ou mais integrantes são contemplados — por sorteio ou por lance —
                e recebem uma carta de crédito para comprar o bem escolhido (carro,
                imóvel, caminhão, máquina). Diferente do financiamento, não há juros:
                o custo é uma taxa de administração cobrada pela administradora,
                autorizada e fiscalizada pelo Banco Central do Brasil.
              </p>
              <p>
                Em Guarulhos, o consórcio costuma fazer sentido em três cenários:
                troca planejada de carro a cada 4–5 anos sem pagar juros, formação
                de poupança forçada para entrada em imóvel (em bairros como Cidade
                Maia, Vila Galvão e Macedo a valorização compensa a espera) e
                renovação de frota para empresas em Cumbica e região do aeroporto.
              </p>
              <p>
                A consultoria da Patro evita a armadilha mais comum de quem entra
                em consórcio sozinho: comparar apenas a parcela e ignorar prazo,
                taxa de administração, fundo de reserva, regra de lance e
                possibilidade de transferência de cota.
              </p>
            </div>
          </div>
        </section>

        {/* Modalidades */}
        <section className="py-14 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Modalidades de consórcio disponíveis
            </h2>
            <p className="text-foreground/80 mb-8 max-w-3xl">
              Cada link leva para a página específica da modalidade, com mais
              detalhes técnicos e simulações.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {modalidades.map((m) => (
                <Card key={m.to} className="border-border/60 bg-background">
                  <CardContent className="pt-6">
                    <m.icon className="h-9 w-9 text-primary mb-3" aria-hidden="true" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{m.title}</h3>
                    <p className="text-sm text-foreground/75 mb-4">{m.desc}</p>
                    <Link
                      to={m.to}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      aria-label={`Ver detalhes de ${m.anchor}`}
                    >
                      Ver {m.anchor} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Como simular */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Como simular consórcio com a Patro
            </h2>
            <ol className="space-y-4">
              {[
                { t: "Defina o objetivo", d: "Carro, imóvel ou caminhão? Novo ou usado? Para quando você precisa do bem?" },
                { t: "Envie os dados básicos", d: "Valor da carta de crédito desejada e quanto cabe na parcela. Em 5 minutos pelo formulário ou WhatsApp." },
                { t: "Receba comparativo de administradoras", d: "Mostramos taxa de administração, prazo, fundo de reserva, seguro de vida embutido e regras de lance." },
                { t: "Decida com clareza", d: "Você assina apenas depois de entender o contrato. Acompanhamos sorteios, lances e eventual transferência de cota." },
              ].map((s, i) => (
                <li key={i} className="flex gap-4 p-5 bg-muted/40 rounded-xl border border-border/60">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{s.t}</h3>
                    <p className="text-sm text-foreground/80">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Quando NÃO faz sentido */}
        <section className="py-14 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Quando consórcio não é a melhor opção
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                "Quando o cliente precisa do bem imediatamente e não tem caixa para dar um lance competitivo.",
                "Quando o objetivo é renda fixa: consórcio não é investimento e não rende como aplicação financeira.",
                "Quando o orçamento mensal é apertado: atrasos prejudicam a participação em sorteios e geram multas.",
                "Quando não há disciplina para pagar parcelas por muitos meses: o ideal é planejar antes de aderir.",
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-foreground/70 mt-6">
              Se o consórcio não couber no seu caso, indicamos alternativas como
              financiamento bancário, seguro auto com franquia reduzida ou
              previdência privada para construção de reserva.
            </p>
          </div>
        </section>

        {/* FAQ visível */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
              Perguntas frequentes sobre consórcio em Guarulhos
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
              Solicite uma simulação de consórcio
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Em até 1 dia útil enviamos comparativo de administradoras com prazo,
              taxa e parcela para o valor de carta de crédito que você precisa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/cotacao?tipo=consorcio&origem=consorcio-guarulhos"
                onClick={() => trackCotacaoClick("consorcio-guarulhos:final")}
              >
                <Button size="lg" variant="cta" className="text-base px-8 h-12 rounded-xl font-semibold">
                  Simular agora
                </Button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("consorcio-guarulhos:final")}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 rounded-xl bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Falar no WhatsApp
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

export default ConsorcioGuarulhos;