import { Link } from "react-router-dom";
import { CheckCircle, Shield, Users, Building2, Truck, Heart, MessageCircle, Phone, ArrowRight, Star, TrendingUp, Award } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguros%20para%20minha%20empresa.";

const faqs = [
  { question: "Quais seguros uma PME em Guarulhos precisa?", answer: "Os mais importantes são: seguro empresarial (patrimônio), seguro de vida em grupo, plano de saúde empresarial, seguro de frota (se aplicável) e RC profissional. A Patro analisa seu negócio e recomenda o pacote ideal com base na atividade, porte e riscos específicos da sua operação em Guarulhos." },
  { question: "Quanto custa seguro empresarial para PME em Guarulhos?", answer: "Depende do tipo de negócio, localização e coberturas. Comércios pagam a partir de R$ 500/ano. Escritórios a partir de R$ 300/ano. Indústrias e galpões variam conforme o risco. A Patro compara 6+ seguradoras para encontrar o melhor preço." },
  { question: "A Patro atende empresas de todos os portes?", answer: "Sim. Atendemos MEIs, micro e pequenas empresas, médias empresas e grandes corporações em Guarulhos e região. Mais de 200 empresas confiam na Patro para proteger seus negócios." },
  { question: "Seguro empresarial cobre roubo de mercadoria?", answer: "Sim. A cobertura de roubo protege mercadorias, equipamentos, móveis e dinheiro em cofre. Para transporte de mercadorias, é necessário seguro de transporte complementar." },
  { question: "Minha empresa precisa de seguro cyber em Guarulhos?", answer: "Se sua empresa lida com dados de clientes, processa pagamentos online ou depende de sistemas digitais, o seguro cyber é essencial. Ataques cibernéticos cresceram 300% nos últimos 3 anos no Brasil. A Patro oferece coberturas a partir de R$ 1.200/ano." },
];

const segurosEmpresariais = [
  { icon: Building2, title: "Seguro Empresarial", desc: "Proteção patrimonial para comércios, escritórios e indústrias contra incêndio, roubo e RC.", link: "/seguro-empresarial-guarulhos" },
  { icon: Truck, title: "Seguro de Frota", desc: "Gestão de risco para frotas corporativas e logísticas com desconto por volume.", link: "/seguro-frota-empresas-guarulhos" },
  { icon: Heart, title: "Plano de Saúde PME", desc: "Planos empresariais com preços até 40% menores, a partir de 2 vidas.", link: "/plano-saude-empresarial" },
  { icon: Shield, title: "Seguro de Vida Grupo", desc: "Benefício para colaboradores com condições especiais e assistência funeral.", link: "/seguro-vida-pme" },
  { icon: Users, title: "RC Profissional", desc: "Proteção contra erros e omissões profissionais para empresas de serviços.", link: "/seguro-rc-profissional" },
  { icon: Building2, title: "Seguro Cyber", desc: "Proteção contra ataques cibernéticos, vazamento de dados e LGPD.", link: "/seguro-cyber" },
];

const casesReais = [
  {
    empresa: "Distribuidora de alimentos — Cumbica",
    problema: "Incêndio destruiu 40% do estoque avaliado em R$ 350.000",
    solucao: "Seguro empresarial cobriu 100% do prejuízo. Indenização paga em 25 dias.",
    economia: "R$ 350.000 em indenização",
  },
  {
    empresa: "Escritório de contabilidade — Cidade Maia",
    problema: "Processo de R$ 200.000 por erro em declaração fiscal de cliente",
    solucao: "Seguro RC Profissional cobriu custos de defesa e indenização ao cliente.",
    economia: "R$ 200.000 protegidos pelo RC",
  },
  {
    empresa: "E-commerce de moda — Vila Augusta",
    problema: "Ataque hacker expôs dados de 5.000 clientes, gerando risco LGPD",
    solucao: "Seguro Cyber cobriu notificações, assessoria jurídica e multa regulatória.",
    economia: "R$ 150.000 em custos cobertos",
  },
];

const estatisticas = [
  { numero: "200+", label: "Empresas protegidas em Guarulhos" },
  { numero: "4.9★", label: "Avaliação Google (150+ reviews)" },
  { numero: "R$ 2M+", label: "Em sinistros empresariais resolvidos" },
  { numero: "40%", label: "Economia média na primeira cotação" },
];

const SeoSegurosPmeGuarulhos = () => (
  <>
    <PageMeta
      title="Seguros para PMEs em Guarulhos"
      description="Pacote completo de seguros para PMEs em Guarulhos: empresarial, frota, vida grupo, saúde e RC. Cotação gratuita e consultoria personalizada. Patro Seguros."
    />
    <FAQSchema faqs={faqs} />
    <LocalBusinessSchema />
    <BreadcrumbSchema items={[
      { name: "Início", url: "https://www.patroseguros.com.br" },
      { name: "Seguros para Empresas", url: "https://www.patroseguros.com.br/seguros-empresariais-pme-guarulhos" },
    ]} />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Seguros PME Guarulhos" }]} />

      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-white mb-6">Seguros para PMEs e Empresas em Guarulhos</h1>
          <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto">
            Guarulhos é o segundo maior polo empresarial do estado de São Paulo, com mais de 80 mil empresas ativas. A Patro Seguros oferece consultoria especializada em seguros corporativos para proteger seu patrimônio, sua equipe e sua operação.
          </p>
          <p className="text-sm text-white/60 mb-8">
            Mais de 200 empresas em Guarulhos confiam na Patro. Atendimento presencial no Cidade Maia e online para toda a região.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("seo-pme-guarulhos")}>
              <Button size="lg" className="text-lg px-8"><Shield className="mr-2 h-5 w-5" /> Cotação para Empresas</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("seo-pme-guarulhos")}>
              <Button size="lg" variant="cta" className="text-lg px-8"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Empresarial</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {estatisticas.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.numero}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contexto E-E-A-T */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Por que Empresas de Guarulhos Precisam de Seguros Especializados?</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
            <p>
              Guarulhos concentra o segundo maior PIB do estado de São Paulo, com forte presença nos setores de logística, comércio, indústria e serviços. A proximidade com o Aeroporto Internacional de Cumbica e as rodovias Dutra e Fernão Dias torna a cidade um hub estratégico — mas também expõe as empresas a riscos específicos como roubo de carga, acidentes de trânsito e incêndios industriais.
            </p>
            <p>
              Segundo dados do Corpo de Bombeiros, Guarulhos registra centenas de ocorrências de incêndio comercial e industrial por ano. Além disso, a região está entre as mais afetadas por roubos e furtos a estabelecimentos comerciais no estado. Empresas sem seguro adequado ficam vulneráveis a prejuízos que podem inviabilizar a continuidade do negócio.
            </p>
            <p>
              A Patro Seguros atua como consultora de risco para empresas de todos os portes em Guarulhos. Nossa abordagem vai além da venda de apólices: analisamos o perfil de risco da empresa, identificamos vulnerabilidades e montamos um pacote de proteção que equilibra cobertura adequada com custo acessível. Desde 2020, já atendemos mais de 200 empresas na região e resolvemos mais de R$ 2 milhões em sinistros empresariais.
            </p>
          </div>
        </div>
      </section>

      {/* Soluções */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">Soluções de Seguros para Empresas de Guarulhos</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Cada empresa tem riscos específicos. A Patro analisa seu negócio e monta o pacote ideal de proteção corporativa.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {segurosEmpresariais.map((item, i) => (
              <Link key={i} to={item.link}>
                <Card className="h-full hover:shadow-lg transition-all group">
                  <CardContent className="pt-6">
                    <item.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <span className="text-sm text-primary font-medium mt-3 flex items-center">
                      Saiba mais <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Reais */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-xs uppercase tracking-wider mb-4">
              <Award className="h-3.5 w-3.5" /> Cases Reais
            </span>
            <h2>Como a Patro Protegeu Empresas de Guarulhos</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Histórias reais de empresas que contaram com a Patro em momentos críticos.
            </p>
          </div>
          <div className="space-y-6">
            {casesReais.map((caso, i) => (
              <div key={i} className="bg-muted/50 border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{caso.empresa}</h3>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Problema:</strong> {caso.problema}</p>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Solução Patro:</strong> {caso.solucao}</p>
                    <p className="text-sm font-semibold text-primary"><CheckCircle className="inline h-4 w-4 mr-1" />{caso.economia}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Erros Comuns */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">5 Erros Comuns de Empresários ao Contratar Seguros em Guarulhos</h2>
          <div className="space-y-6">
            {[
              { title: "1. Contratar apenas pelo menor preço", desc: "O seguro mais barato pode ter exclusões que deixam sua empresa vulnerável. A Patro compara coberturas, não só preços — garantindo proteção real." },
              { title: "2. Não revisar o seguro anualmente", desc: "Seu negócio muda, e o seguro precisa acompanhar. Expansão, novos equipamentos e mudança de endereço exigem atualização. Fazemos revisão gratuita a cada renovação." },
              { title: "3. Ignorar o seguro de responsabilidade civil", desc: "Um acidente com cliente, terceiro ou erro profissional pode gerar processos de centenas de milhares de reais. O RC protege o patrimônio pessoal do sócio." },
              { title: "4. Não contratar seguro de vida para sócios", desc: "Se um sócio falece ou fica inválido, a empresa pode ficar inviável. O seguro de vida com cláusula de key person garante a continuidade do negócio." },
              { title: "5. Esquecer do seguro cyber e LGPD", desc: "Empresas que processam dados de clientes estão sujeitas a multas da LGPD de até 2% do faturamento. O seguro cyber cobre multas, notificações e defesa jurídica." },
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-xl p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">O que Empresários de Guarulhos Dizem</h2>
          <div className="space-y-6">
            {[
              { nome: "Carlos M.", empresa: "Distribuidora de alimentos, Cumbica", texto: "A Patro nos ajudou a montar um pacote completo de seguros que cobriu exatamente o que precisávamos. Quando tivemos um sinistro grave, a resolução foi rápida e profissional. Recomendo para toda empresa de Guarulhos." },
              { nome: "Ana P.", empresa: "Escritório de advocacia, Cidade Maia", texto: "Contratamos RC profissional e plano de saúde PME pela Patro. O atendimento é diferenciado — eles conhecem as necessidades de profissionais liberais e encontraram opções que não sabíamos que existiam." },
              { nome: "Roberto S.", empresa: "Transportadora, Bonsucesso", texto: "Nossa frota de 25 veículos estava com seguro caro e sinistralidade alta. A Patro implementou gestão de risco, trocamos de seguradora e economizamos R$ 60.000/ano. Parceria de verdade." },
            ].map((dep, i) => (
              <div key={i} className="bg-muted/50 border rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic mb-3">"{dep.texto}"</p>
                <p className="text-sm font-semibold">{dep.nome}</p>
                <p className="text-xs text-muted-foreground">{dep.empresa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Como Contratar Seguros para sua Empresa com a Patro</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Solicite uma análise gratuita", desc: "Envie os dados da empresa pelo formulário ou WhatsApp. Analisamos o perfil de risco sem compromisso." },
              { step: "2", title: "Receba o diagnóstico de risco", desc: "Nossa equipe identifica vulnerabilidades e recomenda as coberturas essenciais para seu tipo de negócio." },
              { step: "3", title: "Compare propostas", desc: "Cotamos com 6+ seguradoras e apresentamos um comparativo detalhado com preços, coberturas e condições." },
              { step: "4", title: "Contrate e fique protegido", desc: "Escolha a melhor opção. Cuidamos de toda a documentação e sua empresa fica protegida imediatamente." },
              { step: "5", title: "Gestão contínua", desc: "Revisão anual, acompanhamento de sinistros e ajustes no pacote conforme seu negócio evolui." },
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-xl p-5 flex gap-4 items-start">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links internos */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-6 text-lg">Veja Também</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "Seguro Auto Guarulhos", href: "/seguro-auto-guarulhos" },
              { label: "Seguro Residencial Guarulhos", href: "/seguro-residencial-guarulhos" },
              { label: "Seguro Vida e Saúde Guarulhos", href: "/seguro-vida-saude-guarulhos" },
              { label: "Seguro Frota Guarulhos", href: "/seguro-frota-empresas-guarulhos" },
              { label: "Corretora Seguros Guarulhos", href: "/" },
            ].map((link, i) => (
              <Link key={i} to={link.href} className="text-sm text-primary hover:underline bg-primary/5 px-4 py-2 rounded-full">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Perguntas Frequentes sobre Seguros PME em Guarulhos</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border rounded-xl p-4 bg-background">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-white">Proteja Sua Empresa em Guarulhos — Cotação Gratuita</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Mais de 200 empresas em Guarulhos confiam na Patro. Cotação gratuita, sem compromisso. Atendimento presencial no Cidade Maia ou online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao"><Button size="lg" variant="secondary">Solicitar Cotação</Button></Link>
            <a href="tel:1151997500"><Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"><Phone className="mr-2 h-5 w-5" /> (11) 5199-7500</Button></a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SeoSegurosPmeGuarulhos;
