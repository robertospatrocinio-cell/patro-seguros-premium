import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Bike, Home, Truck, CheckCircle, TrendingUp, Shield, Clock, Users, Award, ArrowRight, HelpCircle, Phone } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20saber%20mais%20sobre%20cons%C3%B3rcio.";

const modalidades = [
  {
    icon: Car,
    title: "Consórcio de Carro",
    desc: "Realize o sonho do carro novo ou seminovo sem juros. Parcelas que cabem no seu bolso com poder de compra à vista.",
    benefits: ["Sem juros abusivos", "Parcelas acessíveis", "Poder de compra à vista", "Lance para antecipar"],
  },
  {
    icon: Bike,
    title: "Consórcio de Moto",
    desc: "A forma mais inteligente de adquirir sua moto. Ideal para trabalho ou lazer, com condições imbatíveis.",
    benefits: ["Planos a partir de 60 meses", "Sem entrada obrigatória", "Flexibilidade de crédito", "Contemplação por sorteio ou lance"],
  },
  {
    icon: Home,
    title: "Consórcio de Imóveis",
    desc: "Conquiste a casa própria, terreno ou imóvel comercial. O consórcio imobiliário é o caminho mais econômico para seu patrimônio.",
    benefits: ["Créditos de R$100 mil a R$1 milhão+", "Use o FGTS para dar lance", "Prazos de até 200 meses", "Sem juros bancários"],
  },
  {
    icon: Truck,
    title: "Consórcio de Veículos Pesados",
    desc: "Caminhões, ônibus, máquinas e implementos. Renove ou amplie sua frota com planejamento e economia.",
    benefits: ["Créditos para novos e usados", "Ideal para empresas", "Planejamento financeiro", "Sem comprometer o fluxo de caixa"],
  },
];

const porqueConsorcio = [
  { icon: TrendingUp, title: "Sem Juros", desc: "Diferente do financiamento, no consórcio você não paga juros. Apenas uma taxa de administração diluída nas parcelas." },
  { icon: Shield, title: "Segurança", desc: "Regulamentado pelo Banco Central, o consórcio é uma das formas mais seguras de investir no seu patrimônio." },
  { icon: Clock, title: "Planejamento", desc: "Parcelas fixas que permitem organizar suas finanças com previsibilidade e sem surpresas no orçamento." },
  { icon: Users, title: "Poder de Compra", desc: "Ao ser contemplado, você tem poder de compra à vista, garantindo as melhores negociações e descontos." },
  { icon: Award, title: "Flexibilidade", desc: "Lance embutido, lance livre, sorteio mensal. Diversas formas de ser contemplado e antecipar seu bem." },
  { icon: CheckCircle, title: "Sem Entrada", desc: "Diferente do financiamento, não é necessário dar entrada. Comece a pagar e aguarde sua contemplação." },
];

const faqs = [
  { q: "O que é consórcio?", a: "É uma modalidade de compra planejada onde um grupo de pessoas se une para adquirir bens ou serviços. Todos contribuem mensalmente e, a cada mês, um ou mais participantes são contemplados por sorteio ou lance." },
  { q: "Consórcio tem juros?", a: "Não! O consórcio não cobra juros. Existe apenas uma taxa de administração, que é muito menor do que os juros de um financiamento. Isso pode representar uma economia de até 40%." },
  { q: "Como funciona a contemplação?", a: "Existem duas formas: por sorteio mensal (todos os participantes concorrem) ou por lance (você oferece um valor para antecipar a contemplação). Também há o lance embutido, onde parte do próprio crédito é usado como lance." },
  { q: "Posso usar o FGTS?", a: "Sim! No consórcio de imóveis, você pode utilizar o FGTS para dar lance ou complementar o valor do crédito, acelerando sua contemplação." },
  { q: "E se eu não for contemplado?", a: "Todos os participantes são contemplados até o final do plano. Se não for sorteado ou não der lance, você receberá sua carta de crédito ao final do grupo, com todos os valores corrigidos." },
  { q: "Posso transferir meu consórcio?", a: "Sim, a cota pode ser transferida para outra pessoa mediante aprovação da administradora. Isso oferece flexibilidade caso precise." },
  { q: "Qual a diferença entre consórcio e financiamento?", a: "No financiamento você paga juros compostos (que podem dobrar o valor do bem). No consórcio, não há juros — apenas taxa de administração. A economia pode chegar a 40% do valor total pago." },
  { q: "Quanto tempo demora para ser contemplado?", a: "Depende da modalidade e do lance oferecido. Alguns clientes são contemplados logo nos primeiros meses com lance. Por sorteio, a contemplação pode ocorrer a qualquer momento durante o plano." },
];

const etapas = [
  { step: "1", title: "Escolha o Consórcio", desc: "Defina o tipo de bem e o valor do crédito ideal para você." },
  { step: "2", title: "Simulação Gratuita", desc: "Nossa equipe faz uma simulação personalizada sem compromisso." },
  { step: "3", title: "Adesão ao Grupo", desc: "Assine o contrato e comece a pagar suas parcelas mensais." },
  { step: "4", title: "Contemplação", desc: "Seja contemplado por sorteio ou lance e adquira seu bem à vista!" },
];

const Consorcio = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-blue-800 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              💰 Sem juros • Regulamentado pelo Banco Central
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Consórcio: A Forma Mais <span className="text-yellow-300">Inteligente</span> de Conquistar Seus Sonhos
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Carro, moto, imóvel ou veículo pesado — sem juros, sem entrada e com parcelas que cabem no seu bolso. Economize até 40% comparado ao financiamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="cta" className="rounded-xl text-base px-8 w-full sm:w-auto">
                  Simular Consórcio Grátis
                </Button>
              </a>
              <a href="tel:1151997500">
                <Button size="lg" variant="outline" className="rounded-xl text-base px-8 border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  <Phone className="h-4 w-4 mr-2" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Escolha o Consórcio Ideal Para Você
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temos as melhores opções para cada necessidade. Compare e escolha a modalidade que faz sentido para o seu momento.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {modalidades.map((m) => (
              <div key={m.title} className="group bg-card rounded-2xl border p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <m.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">{m.title}</h3>
                    <p className="text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {m.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-xl group-hover:bg-primary">
                    Simular {m.title} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que Consórcio */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Por Que Escolher o Consórcio?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra as vantagens que fazem do consórcio a melhor escolha para quem quer economizar e planejar.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {porqueConsorcio.map((item) => (
              <div key={item.title} className="bg-card rounded-2xl border p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Consórcio vs Financiamento
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja por que o consórcio é mais vantajoso para o seu bolso.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border overflow-hidden">
              <div className="grid grid-cols-3 bg-primary text-primary-foreground font-heading font-bold text-sm">
                <div className="p-4">Característica</div>
                <div className="p-4 text-center">Consórcio ✅</div>
                <div className="p-4 text-center">Financiamento</div>
              </div>
              {[
                ["Juros", "Sem juros", "Juros compostos"],
                ["Taxa", "Administração (menor)", "IOF + Juros + TAC"],
                ["Entrada", "Não obrigatória", "Geralmente 20-30%"],
                ["Economia total", "Até 40% mais barato", "Pode dobrar o valor"],
                ["Poder de compra", "À vista na contemplação", "Parcelado"],
                ["Regulamentação", "Banco Central", "Banco Central"],
                ["FGTS (imóvel)", "Sim, para lance", "Sim, para entrada"],
              ].map(([feat, cons, fin]) => (
                <div key={feat} className="grid grid-cols-3 border-t text-sm">
                  <div className="p-4 font-medium text-foreground">{feat}</div>
                  <div className="p-4 text-center text-green-600 font-medium bg-green-50/50">{cons}</div>
                  <div className="p-4 text-center text-muted-foreground">{fin}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Como Funciona?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em 4 passos simples você pode conquistar o seu bem.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {etapas.map((e) => (
              <div key={e.step} className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-heading font-bold mb-4 shadow-lg">
                  {e.step}
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Central */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-blue-700 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Pronto Para Realizar Seu Sonho?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Faça uma simulação gratuita agora e descubra quanto vai economizar com o consórcio. Sem compromisso!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="cta" className="rounded-xl text-base px-10">
                Simular Agora pelo WhatsApp
              </Button>
            </a>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="rounded-xl text-base px-10 border-white/30 text-white hover:bg-white/10">
                Falar com Consultor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Perguntas Frequentes
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tire todas as suas dúvidas sobre consórcio.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-card rounded-2xl border overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-heading font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.q}
                  <span className="text-primary ml-4 group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Ainda com dúvidas? Nossa equipe está pronta para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:1151997500">
              <Button variant="outline" className="rounded-xl">
                <Phone className="h-4 w-4 mr-2" />
                (11) 5199-7500
              </Button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="cta" className="rounded-xl">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consorcio;
