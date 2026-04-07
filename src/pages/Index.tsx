import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Phone, MessageCircle, ArrowRight, Zap, Headphones } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import InsuranceHeroSelector from "@/components/InsuranceHeroSelector";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticleImage } from "@/lib/blogImages";
import GoogleBusinessWidget from "@/components/GoogleBusinessWidget";
import { articles as allBlogArticles, formatDate } from "@/lib/blogData";
import { Calendar, Clock, User } from "lucide-react";
const seloMelhorCorretora = "/images/selo-melhor-corretora.webp";

// 3 most recent articles for homepage
const blogDestaques = [...allBlogArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

// Lazy load below-fold decorative images
const shieldHero3d = new URL("@/assets/3d-shield-hero.webp", import.meta.url).href;
const insuranceGroup3d = new URL("@/assets/3d-insurance-group.webp", import.meta.url).href;
const cotacaoOnline3d = new URL("@/assets/3d-cotacao-online.webp", import.meta.url).href;
import heroHomeBg from "@/assets/hero-home.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const parceiros = ["AKAD", "ALLIANZ", "AMIL", "AXA", "AZOS", "AZUL", "BRADESCO", "DARWIN", "HAPVIDA/NOTREDAME", "HDI", "ITAÚ", "ITURAN", "JUSTOS", "LIBERTY", "MAPFRE", "MEDSENIOR", "OMINT", "PORTO", "PREVENT SENIOR", "SOMPO", "SUHAI", "SULAMERICA", "SURA", "TOKIO MARINE", "UNIMED", "ZURICH"];


const stats = [
  { value: "16+", label: "Seguradoras" },
  { value: "20", label: "Operadoras de Saúde" },
  { value: "2h", label: "Tempo de Resposta" },
  { value: "100%", label: "Cotação Gratuita" },
];

const diferenciais = [
  { icon: Zap, title: "Cotação em até 2 horas", desc: "Propostas comparativas de várias seguradoras entregues rapidamente." },
  { icon: Users, title: "Consultor dedicado", desc: "Especialista analisa seu perfil e recomenda exatamente o que faz sentido." },
  { icon: Shield, title: "16+ seguradoras", desc: "Porto, Tokio Marine, Allianz, HDI e mais — comparamos todas." },
  { icon: Headphones, title: "Suporte em sinistro", desc: "Cuidamos de todo o processo: abertura, acompanhamento e resolução." },
];




const faqs = [
  { question: "Quanto tempo leva para receber uma cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas de múltiplas seguradoras." },
  { question: "A cotação é realmente gratuita?", answer: "Sim. Todas as nossas cotações são 100% gratuitas e sem compromisso." },
  { question: "Vocês atendem empresas?", answer: "Sim. Atendemos empresas de todos os portes com seguros empresariais, frota, RC e muito mais." },
  { question: "Como funciona o suporte em caso de sinistro?", answer: "A Patro cuida de todo o processo junto à seguradora: abertura, documentação, acompanhamento e resolução." },
];

const Index = () => {

  return (
    <>
      <PageMeta title="Corretora de Seguros em Guarulhos – Cotação Online" description="Corretora de seguros em Guarulhos especializada em seguro auto, residencial, vida e empresarial. Compare cotações das melhores seguradoras e economize. Cotação grátis – Patro Seguros, Cidade Maia." />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden" aria-label="Início">
          <div className="absolute inset-0">
            <img src={heroHomeBg} alt="" className="w-full h-full object-cover opacity-15" loading="eager" aria-hidden="true" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="py-20 md:py-40 max-w-[680px] mx-auto text-center">
              <div className="mb-6 md:mb-8">
                <img src={seloMelhorCorretora} alt="Melhor Corretora de Guarulhos" width={112} height={112} fetchPriority="high" className="w-28 h-28 md:w-36 md:h-36 object-contain mx-auto" />
              </div>
            <h1 className="text-white text-balance mb-4 md:mb-6 font-extrabold">
                Proteção inteligente para você, sua família e sua empresa.
              </h1>
              <p className="text-[15px] md:text-lg text-white/90 mb-1.5 font-medium">
                Sua Corretora de Seguros em Guarulhos
              </p>
              <p className="text-[14px] md:text-base text-white/70 mb-8 md:mb-10 text-balance max-w-[520px] mx-auto leading-relaxed">
                Comparamos os melhores custos-benefícios entre as melhores seguradoras do mercado.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/cotacao" className="w-full sm:w-auto" onClick={() => trackCotacaoClick("homepage")}>
                  <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg bg-white text-foreground hover:bg-white/90 h-11 font-semibold tracking-tight">
                    Solicitar Cotação Grátis
                    <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("homepage-hero")}>
                  <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white/[0.08] border border-white/[0.1] text-white/80 hover:bg-white/[0.12] hover:text-white font-medium tracking-tight">
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Hero Selector */}
        <InsuranceHeroSelector />

        {/* Stats strip */}
        <section className="border-b bg-background" aria-label="Números da Patro">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.label} className="py-8 md:py-10 text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.1em] font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Parceiros marquee */}
        <section className="py-8 border-b bg-background overflow-hidden" aria-label="Seguradoras e operadoras parceiras">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...parceiros, ...parceiros].map((name, i) => (
                <span key={i} className="mx-6 text-[12px] font-medium text-muted-foreground/70 whitespace-nowrap select-none">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 md:py-32 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }} aria-labelledby="diferenciais-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="section-label">Por que a Patro</span>
              <h2 id="diferenciais-heading" className="mt-3">Você será atendido por especialistas,<br className="hidden sm:block" /> não por robô!</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
              {diferenciais.map((item, i) => (
                <div key={i} className="bg-card p-8 text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/[0.05] flex items-center justify-center mx-auto mb-5">
                    <item.icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA — Cotação Auto */}
        <section className="py-16 md:py-24 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }} aria-labelledby="cotacao-auto-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl gradient-hero relative overflow-hidden p-8 md:p-16">
              <img src={cotacaoOnline3d} alt="" width={192} height={192} className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 object-contain opacity-80" aria-hidden="true" loading="lazy" decoding="async" />
              <div className="relative md:max-w-[60%]">
                <h2 id="cotacao-auto-heading" className="text-white mb-3 text-2xl md:text-3xl">Cotação de Seguro Auto Online</h2>
                <p className="text-white/70 mb-8 text-[14px] max-w-md mx-auto">
                  Auto, moto, caminhão e vans — resultado em minutos pelo nosso sistema.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="text-[13px] px-7 rounded-lg h-11 bg-white text-foreground hover:bg-white/90 font-semibold">
                      Fazer Cotação Online <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </a>
                  <Link to="/planos-de-saude">
                    <Button size="lg" className="text-[13px] px-7 rounded-lg h-11 bg-white/[0.08] border border-white/[0.1] text-white/80 hover:bg-white/[0.12] font-medium">
                      Simular Plano de Saúde
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Sobre */}
        <section className="py-16 md:py-32 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }} aria-labelledby="sobre-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <span className="section-label">Quem somos</span>
              <h2 id="sobre-heading" className="mt-3 mb-6">Corretora com atendimento<br className="hidden sm:block" /> de gente, não de máquina.</h2>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                Registrada na SUSEP (nº 212113511), com sede em Guarulhos/SP. Atendemos pessoas físicas, famílias, empresas e produtores rurais em todo o Brasil.
              </p>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-10">
                Cada cliente conversa direto com um especialista, recebe propostas comparativas e tem suporte completo — da cotação ao sinistro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sobre"><Button variant="outline" className="rounded-lg text-[13px] h-10">Conheça a Patro</Button></Link>
                <Link to="/indique-um-amigo"><Button variant="ghost" className="rounded-lg text-primary text-[13px] h-10">Indique um amigo <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Google Meu Negócio */}
        <section className="py-16 md:py-24 gradient-surface" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }} aria-labelledby="google-business-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="section-label">Google Meu Negócio</span>
              <h2 id="google-business-heading" className="mt-3">Avaliações reais de clientes reais</h2>
            </div>
            <div className="max-w-md mx-auto">
              <GoogleBusinessWidget />
            </div>
          </div>
        </section>

        {/* Últimos Artigos do Blog */}
        <section className="py-16 md:py-32 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }} aria-labelledby="blog-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="section-label">Blog</span>
              <h2 id="blog-heading" className="mt-3">Últimos artigos</h2>
              <p className="text-[14px] text-muted-foreground mt-4">Conteúdo de autoridade sobre seguros, proteção patrimonial e dicas para você e sua empresa.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {blogDestaques.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-base h-full overflow-hidden group">
                    <div className="aspect-video w-full overflow-hidden">
                      <OptimizedImage
                        src={getArticleImage(article.slug)}
                        alt={article.title}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">{article.category}</span>
                      <h3 className="text-[15px] font-semibold mt-3 mb-2 tracking-tight">{article.title}</h3>
                      <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><User className="h-3 w-3" />{article.author}</span>
                        <span className="text-[13px] font-medium text-primary flex items-center">
                          Ler mais <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/blog">
                <Button variant="outline" className="rounded-lg text-[13px] h-10">Ver todos os artigos <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" /></Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 md:py-36 gradient-hero relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 350px' }} aria-label="Solicitar cotação">
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4 font-extrabold">Peça sua cotação agora.</h2>
            <p className="text-[14px] text-white/70 mb-12 max-w-md mx-auto">
              Gratuita, sem compromisso. Resposta em até 2 horas com propostas comparativas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white text-foreground hover:bg-white/90 font-semibold">
                  Pedir Cotação Gratuita
                </Button>
              </Link>
              <a href="tel:1151997500" aria-label="Ligar para (11) 5199-7500" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white/[0.08] border border-white/[0.1] text-white/80 hover:bg-white/[0.12] hover:text-white font-medium">
                  <Phone className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-32 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }} aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-16">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas frequentes</h2>
            </div>
            <div className="divide-y divide-border">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-5" open={i === 0}>
                  <summary className="flex items-center justify-between cursor-pointer text-[14px] font-semibold text-foreground hover:text-primary transition-base select-none list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-muted-foreground/30 ml-4 group-open:rotate-45 transition-transform text-base font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="pt-3">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
