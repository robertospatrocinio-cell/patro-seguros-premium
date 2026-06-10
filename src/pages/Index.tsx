import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, AlertTriangle } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import LazySection from "@/components/LazySection";
import { HomeSelector } from "@/components/HomeSelector";
import LocalSavingsCalculator from "@/components/LocalSavingsCalculator";
import LocalTestimonials from "@/components/LocalTestimonials";
import GoogleBusinessWidget from "@/components/GoogleBusinessWidget";
import HomeBlogSection from "@/components/HomeBlogSection";
import PortoPartnershipSection from "@/components/PortoPartnershipSection";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const parceiros = ["AKAD", "ALLIANZ", "AMIL", "AXA", "AZOS", "AZUL", "BRADESCO", "DARWIN", "EZZE", "HAPVIDA/NOTREDAME", "HDI", "ITAÚ", "ITURAN", "JUSTOS", "LIBERTY", "MAG", "MAPFRE", "MEDSENIOR", "MITSUI", "OMINT", "PIER", "PORTO", "PREVENT SENIOR", "SOMPO", "SUHAI", "SULAMERICA", "SURA", "TOKIO MARINE", "UNIMED", "YOUSE", "ZURICH"];

const faqs = [
  { question: "Por que escolher uma corretora de seguros em Guarulhos?", answer: "Uma corretora local em Guarulhos conhece os riscos da região — alagamentos, índices de roubo por bairro, trânsito — e recomenda coberturas adequadas. A Patro Seguros compara cotações de mais de 16 seguradoras para encontrar o melhor custo-benefício." },
  { question: "Quanto tempo leva para receber uma cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas comparativas de múltiplas seguradoras." },
  { question: "A cotação é realmente gratuita?", answer: "Sim. Todas as nossas cotações de seguro são 100% gratuitas e sem compromisso. Compare à vontade." },
  { question: "Quais tipos de seguro a Patro Seguros oferece em Guarulhos?", answer: "Seguro auto, seguro residencial, seguro de vida, seguro empresarial, seguro de frota, planos de saúde, consórcio e muito mais. Atendemos pessoas físicas, famílias e empresas de todos os portes." },
  { question: "Como funciona o suporte em caso de sinistro?", answer: "A Patro cuida de todo o processo junto à seguradora: abertura, documentação, acompanhamento e resolução. Você não precisa ligar para a seguradora — nós fazemos isso por você." },
];

const sinistroFaqs = [
  { question: "Sofri um acidente, o que devo fazer primeiro?", answer: "Sinalize o local, verifique se há feridos (se sim, ligue 192 ou 193) e não assuma culpa. Tire fotos dos danos e da posição dos veículos antes de removê-los e chame a Patro Seguros pelo WhatsApp para orientações imediatas." },
  { question: "Como acionar o guincho 24h?", answer: "Você pode solicitar diretamente pelo aplicativo da sua seguradora ou falar com a Patro Seguros no WhatsApp. Nós localizamos sua apólice e solicitamos a assistência técnica ou mecânica para você em minutos." },
  { question: "Fui roubado, qual o procedimento?", answer: "A primeira etapa é registrar o Boletim de Ocorrência (B.O.). Com o documento em mãos, entre em contato com a Central de Sinistro da Patro para iniciarmos o processo de indenização junto à seguradora." },
  { question: "Preciso pagar franquia em caso de sinistro de terceiros?", answer: "Geralmente não. Na maioria das apólices, a cobertura de danos a terceiros (RCF-V) não possui cobrança de franquia para o segurado. A franquia só é paga quando você decide consertar o seu próprio veículo pelo seguro." },
  { question: "Quanto tempo demora o conserto do veículo pelo seguro?", answer: "O prazo depende da liberação da seguradora (normalmente até 48h após a vistoria) e da disponibilidade de peças na oficina. A Patro Seguros acompanha todo o processo para agilizar a entrega do seu carro." },
];

const Index = () => {
  return (
    <>
      <PageMeta 
        title="Corretora de Seguros em Guarulhos | Patro Seguros"
        description="A experiência digital de uma grande corretora com atendimento próximo em Guarulhos. Compare 16+ seguradoras e economize no seu seguro auto, saúde ou empresa."
        absoluteTitle={true}
      />
      <FAQSchema faqs={[...faqs, ...sinistroFaqs]} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <AggregateRatingSchema
        serviceName="Corretora de Seguros em Guarulhos"
        url={CANONICAL_BASE_URL}
        description="Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. 16+ seguradoras parceiras."
      />
      <BreadcrumbSchema items={[
        { name: "Início", url: "https://www.patroseguros.com.br" },
      ]} />
      <Header />
      <main id="main-content">
        {/* HERO SECTION */}
        <section className="relative min-h-[600px] flex items-center bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-home.webp"
              alt="Corretora de Seguros em Guarulhos"
              className="w-full h-full object-cover opacity-30"
              fetchPriority="high"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 py-20 text-center lg:text-left">
            <div className="max-w-3xl">
              <SeloMelhorCorretora size="lg" priority className="mb-8 mx-auto lg:mx-0" />
              <h1 className="text-white text-4xl md:text-6xl font-black mb-6 leading-tight">
                Corretora de Seguros em Guarulhos
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Compare seguradoras e encontre proteção para seu carro, família ou empresa com atendimento consultivo da Patro Seguros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("hero")}>
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-bold">
                    Solicitar cotação
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hero")}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
24: 
25:         {/* CHAMADA FIXA CENTRAL DE SINISTRO */}
26:         <div className="bg-orange-500 py-3 text-white">
27:           <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
28:             <div className="flex items-center gap-2">
29:               <AlertTriangle className="h-5 w-5 animate-pulse text-white" />
30:               <span className="font-bold text-sm md:text-base">Precisando de ajuda agora? Central de Sinistro 24h</span>
31:             </div>
32:             <Link to="/central-de-sinistro" className="bg-white text-orange-600 px-6 py-1.5 rounded-full font-black text-sm hover:bg-orange-50 transition-colors uppercase shadow-sm">
33:               Clique aqui
34:             </Link>
35:           </div>
36:         </div>

        {/* 1. SELETOR "O QUE VOCÊ QUER PROTEGER?" */}
        <HomeSelector />

        {/* 2. PRINCIPAIS SEGUROS (Placeholder for Phase 2 improvement) */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Soluções Completas de Proteção</h2>
              <p className="text-muted-foreground">Encontre o seguro ideal para cada momento da sua vida.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Seguro Auto", desc: "Compare as melhores seguradoras e economize.", path: "/seguro-auto" },
                { title: "Plano de Saúde", desc: "Rede credenciada completa para você e sua família.", path: "/planos-de-saude" },
                { title: "Seguro Empresarial", desc: "Proteção sob medida para o seu negócio.", path: "/seguro-empresarial" }
              ].map(s => (
                <Link key={s.title} to={s.path} className="group p-8 bg-card rounded-2xl border hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary">{s.title}</h3>
                  <p className="text-[14px] text-muted-foreground mb-4">{s.desc}</p>
                  <span className="text-primary font-bold inline-flex items-center">Saber mais <ArrowRight className="ml-1 h-4 w-4" /></span>
                </Link>
              ))}
              <Link to="/central-de-sinistro" className="group p-8 bg-primary/5 rounded-2xl border border-primary/20 hover:shadow-xl transition-all md:col-span-3 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2 text-primary">Sofreu um sinistro ou precisa de assistência?</h3>
                  <p className="text-[14px] text-muted-foreground">Saiba o que fazer em caso de roubo, colisão ou pane 24h.</p>
                </div>
                <Button variant="default" className="font-bold whitespace-nowrap">
                  Acessar Central de Sinistro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. COMO FUNCIONA A COTAÇÃO */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-16">Como funciona a cotação na Patro</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Escolha o Seguro", desc: "Selecione o que deseja proteger em nosso site." },
                { step: "02", title: "Preencha os Dados", desc: "Informe os detalhes básicos em poucos segundos." },
                { step: "03", title: "Nós Comparamos", desc: "Analisamos mais de 16 seguradoras parceiras." },
                { step: "04", title: "Você Escolhe", desc: "Apresentamos as melhores opções com consultoria." }
              ].map(s => (
                <div key={s.step} className="relative">
                  <span className="text-6xl font-black text-primary/10 absolute -top-10 left-1/2 -translate-x-1/2">{s.step}</span>
                  <h3 className="text-lg font-bold mb-2 relative z-10">{s.title}</h3>
                  <p className="text-[14px] text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SEGURADORAS PARCEIRAS */}
        <section className="py-12 border-y bg-muted/20 overflow-hidden">
          <div className="container mx-auto px-4 mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Comparamos com as melhores</p>
          </div>
          <div className="flex animate-marquee whitespace-nowrap">
            {[...parceiros, ...parceiros].map((name, i) => (
              <span key={i} className="mx-8 text-lg font-bold text-muted-foreground/50">{name}</span>
            ))}
          </div>
        </section>

        {/* 5. COMPARAÇÃO DE PROPOSTAS (Placeholder) */}
        {/* Will be detailed in Phase 4 */}

        {/* 6. AVALIAÇÕES REAIS */}
        <div className="bg-muted/10">
          <LocalTestimonials />
        </div>

        {/* 7. SOLUÇÕES PARA EMPRESAS (Patro Empresas) */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Proteção Especializada para Empresas em Guarulhos</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  De frotas a galpões logísticos em Cumbica, oferecemos gestão de riscos completa para o seu negócio crescer com segurança.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left mb-8">
                  {["Seguro Frota", "Transporte e Carga", "Saúde PME", "Responsabilidade Civil"].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/seguro-empresarial">
                  <Button size="lg" className="w-full sm:w-auto font-bold">Conhecer Patro Empresas</Button>
                </Link>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <GoogleBusinessWidget />
              </div>
            </div>
          </div>
        </section>

        {/* 8. AUTORIDADE EM GUARULHOS */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Especialistas em Guarulhos e Região</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p>
                A Patro Seguros nasceu em Guarulhos com um objetivo claro: trazer a modernidade das grandes corretoras para o atendimento consultivo que o guarulhense valoriza. Localizados no Cidade Maia, conhecemos profundamente os riscos e as necessidades de cada bairro, da Vila Augusta ao Bonsucesso.
              </p>
            </div>
          </div>
        </section>

        {/* 9. CONTEÚDOS E FERRAMENTAS */}
        <LazySection>
          <LocalSavingsCalculator />
          <HomeBlogSection />
          <PortoPartnershipSection />
        </LazySection>

        {/* 10. FAQ */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6 text-primary border-l-4 border-primary pl-4">Dúvidas Gerais</h3>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card p-6 rounded-xl border">
                    <h4 className="font-bold mb-3">{faq.question}</h4>
                    <p className="text-[14px] text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-600 border-l-4 border-orange-600 pl-4">Central de Sinistro & Ajuda</h3>
              <div className="space-y-6">
                {sinistroFaqs.map((faq, i) => (
                  <div key={i} className="bg-card p-6 rounded-xl border hover:border-orange-200 transition-colors">
                    <h4 className="font-bold mb-3">{faq.question}</h4>
                    <p className="text-[14px] text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/central-de-sinistro" className="text-primary font-bold hover:underline inline-flex items-center">
                  Ver guia completo de sinistro <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 11. CTA FINAL */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Pronto para proteger o que importa?</h2>
            <p className="text-xl mb-10 opacity-90">Compare propostas em até 2 horas úteis.</p>
            <Link to="/cotacao">
              <Button size="lg" variant="secondary" className="text-lg h-14 px-10 font-bold">
                Começar cotação agora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
