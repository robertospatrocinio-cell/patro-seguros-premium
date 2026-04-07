import { lazy, Suspense } from "react";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import { Link } from "react-router-dom";
import { Shield, Users, Phone, MessageCircle, ArrowRight, Zap, Headphones } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import InsuranceHeroSelector from "@/components/InsuranceHeroSelector";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
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

const parceiros = ["AKAD", "ALLIANZ", "AMIL", "AXA", "AZOS", "AZUL", "BRADESCO", "DARWIN", "EZZE", "HAPVIDA/NOTREDAME", "HDI", "ITAÚ", "ITURAN", "JUSTOS", "LIBERTY", "MAG", "MAPFRE", "MEDSENIOR", "MITSUI", "OMINT", "PIER", "PORTO", "PREVENT SENIOR", "SOMPO", "SUHAI", "SULAMERICA", "SURA", "TOKIO MARINE", "UNIMED", "YOUSE", "ZURICH"];


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
  { question: "Por que escolher uma corretora de seguros em Guarulhos?", answer: "Uma corretora local em Guarulhos conhece os riscos da região — alagamentos, índices de roubo por bairro, trânsito — e recomenda coberturas adequadas. A Patro Seguros compara cotações de mais de 16 seguradoras para encontrar o melhor custo-benefício." },
  { question: "Quanto tempo leva para receber uma cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas comparativas de múltiplas seguradoras." },
  { question: "A cotação é realmente gratuita?", answer: "Sim. Todas as nossas cotações de seguro são 100% gratuitas e sem compromisso. Compare à vontade." },
  { question: "Quais tipos de seguro a Patro Seguros oferece em Guarulhos?", answer: "Seguro auto, seguro residencial, seguro de vida, seguro empresarial, seguro de frota, planos de saúde, consórcio e muito mais. Atendemos pessoas físicas, famílias e empresas de todos os portes." },
  { question: "Como funciona o suporte em caso de sinistro?", answer: "A Patro cuida de todo o processo junto à seguradora: abertura, documentação, acompanhamento e resolução. Você não precisa ligar para a seguradora — nós fazemos isso por você." },
];

const Index = () => {

  return (
    <>
      <PageMeta title="Patro Seguros | Corretora de Seguros em Guarulhos – Cotação Online" description="Corretora seguros Guarulhos: auto, residencial, vida, frotas PMEs. Cotação grátis! Experiência local Patro. (11) 5199-7500." />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: "Início", url: "https://www.patroseguros.com.br" },
        { name: "Corretora de Seguros Guarulhos", url: "https://www.patroseguros.com.br" },
      ]} />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden" aria-label="Início">
          <div className="absolute inset-0">
            <img src={heroHomeBg} alt="" width={1920} height={1080} className="w-full h-full object-cover opacity-15" loading="eager" aria-hidden="true" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="py-20 md:py-40 max-w-[680px] mx-auto text-center">
              <div className="mb-6 md:mb-8">
                <img src={seloMelhorCorretora} alt="Melhor Corretora de Guarulhos" width={112} height={112} fetchPriority="high" className="w-28 h-28 md:w-36 md:h-36 object-contain mx-auto" />
              </div>
            <h1 className="text-white text-balance mb-4 md:mb-6 font-extrabold">
                Corretora de Seguros em Guarulhos<br className="hidden sm:block" /> Patro: Cotação Rápida
              </h1>
              <p className="text-[15px] md:text-lg text-white/90 mb-1.5 font-medium">
                Atendimento personalizado · Melhores seguradoras · Cotação rápida
              </p>
              <p className="text-[14px] md:text-base text-white/70 mb-8 md:mb-10 text-balance max-w-[520px] mx-auto leading-relaxed">
                Comparamos cotações de seguro auto, residencial, vida e empresarial entre as principais seguradoras do mercado em Guarulhos e região.
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
              <span className="section-label">Por que escolher a Patro Seguros em Guarulhos</span>
              <h2 id="diferenciais-heading" className="mt-3">Atendimento especializado<br className="hidden sm:block" /> de gente, não de robô</h2>
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

        {/* E-E-A-T Content Section */}
        <section className="py-16 md:py-24 bg-muted" aria-labelledby="eeat-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="eeat-heading" className="text-center mb-8">Corretora de Seguros em Guarulhos: Guia Completo para Proteger o que Importa</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                Desde 2020, a <strong>Patro Seguros</strong> atende moradores e empresas de <strong>Guarulhos</strong> com consultoria especializada em seguros. Já atendemos <strong>500+ PMEs locais</strong> com cases reais de economia e proteção. Nossa sede no <strong>Cidade Maia</strong> (Av. Salgado Filho, 2120 – Ed. Via Alameda, Sala 219) permite atendimento presencial para clientes de toda a região metropolitana, enquanto nosso canal online atende todo o Brasil. Com uma equipe de consultores certificados e experiência em mais de 16 seguradoras e 20 operadoras de saúde, oferecemos a análise mais completa do mercado local.
              </p>
              <p>
                Guarulhos, a segunda maior cidade de São Paulo com mais de 1,4 milhão de habitantes, possui características únicas que exigem uma corretora que conheça profundamente a região. Do polo logístico de Cumbica às residências de alto padrão no Cidade Maia, cada bairro demanda uma estratégia de proteção diferente. É por isso que a Patro se especializou em entender os riscos locais — índices de roubo por região, alagamentos sazonais, perfil de trânsito nas rodovias Dutra e Fernão Dias — para recomendar exatamente as coberturas que fazem sentido para cada perfil.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Seguros Auto para Famílias em Guarulhos</h2>
              <p>
                Guarulhos registra um dos maiores volumes de circulação de veículos do estado, com trânsito intenso na Dutra, Fernão Dias e vias locais como a Av. Paulo Faccini. Bairros como Cumbica, Bonsucesso e Pimentas apresentam índices elevados de roubo e furto de veículos, tornando o <Link to="/seguro-auto-guarulhos" className="text-primary hover:underline">seguro auto em Guarulhos</Link> essencial. A Patro compara cotações de Porto Seguro, Tokio Marine, Allianz, HDI, Mapfre, Liberty e outras seguradoras para garantir a melhor relação custo-benefício. Nosso diferencial: entregamos propostas comparativas em até 2 horas.
              </p>
              <p>
                Para quem tem <Link to="/seguro-moto-guarulhos" className="text-primary hover:underline">moto em Guarulhos</Link>, também oferecemos cotações especializadas com coberturas contra roubo, colisão e assistência 24h — fundamentais para motociclistas que enfrentam o trânsito intenso da cidade diariamente.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Seguro Residencial: Proteção para Casas e Apartamentos</h2>
              <p>
                O <Link to="/seguro-residencial-guarulhos" className="text-primary hover:underline">seguro residencial em Guarulhos</Link> custa a partir de R$ 150/ano para apartamentos e R$ 300/ano para casas, incluindo cobertura contra incêndio, roubo, danos elétricos (muito comum na região devido às oscilações de energia), vendaval e responsabilidade civil familiar. Moradores da <Link to="/seguros-guarulhos/cidade-maia" className="text-primary hover:underline">Cidade Maia</Link>, <Link to="/seguros-guarulhos/vila-augusta" className="text-primary hover:underline">Vila Augusta</Link>, Picanço e Macedo já contam com a Patro para proteger seus lares. Inclui assistência 24h com chaveiro, encanador, eletricista e vidraceiro sem custo adicional.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Seguros de Frota e Empresariais para PMEs</h2>
              <p>
                Guarulhos é o segundo maior polo empresarial de São Paulo e abriga o maior aeroporto da América Latina, concentrando milhares de empresas de logística, transporte e comércio. Oferecemos <Link to="/seguros-empresariais-pme-guarulhos" className="text-primary hover:underline">seguros empresariais para PMEs em Guarulhos</Link> — incluindo patrimonial, RC profissional, cyber, seguro de <Link to="/seguro-condominio-guarulhos" className="text-primary hover:underline">condomínio</Link> e plano de saúde corporativo — com condições especiais negociadas diretamente com seguradoras.
              </p>
              <p>
                Para empresas com veículos, nosso <Link to="/seguro-frota-empresas-guarulhos" className="text-primary hover:underline">seguro de frota em Guarulhos</Link> oferece descontos de 15% a 30% em relação ao seguro individual, com gestão de sinistros ágil e análise de risco personalizada. Atendemos transportadoras, distribuidoras, locadoras e frotas corporativas de todos os portes.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Planos de Saúde e Seguro de Vida</h2>
              <p>
                Comparamos mais de 20 operadoras — Amil, SulAmérica, Bradesco Saúde, Unimed, Hapvida, Prevent Senior — para encontrar o <Link to="/seguro-vida-saude-guarulhos" className="text-primary hover:underline">plano de saúde ou seguro de vida ideal</Link> para você, sua família ou sua empresa em Guarulhos. Atendemos desde planos individuais até PMEs com condições especiais. Nosso <Link to="/plano-saude-guarulhos" className="text-primary hover:underline">guia de planos de saúde em Guarulhos</Link> ajuda a escolher com informações sobre rede credenciada local, carências e reajustes.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Como Solicitar Sua Cotação Passo a Passo</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Escolha o tipo de seguro</strong> — auto, residencial, vida, empresarial, frota ou saúde.</li>
                <li><strong>Preencha o <Link to="/cotacao" className="text-primary hover:underline">formulário de cotação online</Link></strong> ou envie uma mensagem pelo <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp (11) 5199-7500</a>.</li>
                <li><strong>Receba propostas comparativas</strong> — em até 2 horas úteis, com análise de custo-benefício entre as melhores seguradoras.</li>
                <li><strong>Feche com segurança</strong> — seu consultor Patro cuida de toda documentação e ativação da apólice.</li>
              </ol>
              <p>O serviço é 100% gratuito e sem compromisso. Você também pode ligar para <a href="tel:1151997500" className="text-primary hover:underline">(11) 5199-7500</a> ou visitar nossa sede no Cidade Maia.</p>

              <h2 className="text-foreground font-bold text-lg mt-8">5 Erros Comuns ao Contratar Seguros em Guarulhos</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Escolher apenas pelo menor preço</strong> — coberturas insuficientes podem custar caro em um sinistro. Uma franquia alta no seguro auto pode anular a economia.</li>
                <li><strong>Não declarar o perfil corretamente</strong> — informações incorretas sobre CEP de pernoite, uso do veículo ou perfil de condutores podem anular a apólice.</li>
                <li><strong>Ignorar a assistência 24h</strong> — serviços como guincho, chaveiro e troca de pneu têm valor real no dia a dia, especialmente em Guarulhos.</li>
                <li><strong>Não comparar entre seguradoras</strong> — a diferença de preço entre seguradoras pode chegar a 40% para o mesmo veículo e perfil.</li>
                <li><strong>Esquecer de avisar mudanças</strong> — troca de endereço, novo condutor ou alteração no veículo devem ser informados à seguradora para manter a cobertura válida.</li>
              </ol>

              <h2 className="text-foreground font-bold text-lg mt-8">Por que Escolher a Patro Seguros em Guarulhos?</h2>
              <p>
                Com sede no Cidade Maia e registro SUSEP nº 212113511, a Patro Seguros combina experiência local com tecnologia para oferecer o melhor serviço de corretagem em Guarulhos. Nossos clientes avaliam nosso atendimento com nota <strong>4.9/5</strong> no Google (150+ avaliações). Cada consultor é especialista em sua categoria — auto, residencial, vida, empresarial ou saúde — garantindo orientação técnica precisa para cada necessidade. <Link to="/corretora-seguros-guarulhos" className="text-primary hover:underline">Conheça mais sobre nossa corretora em Guarulhos</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Lead Magnet — E-book */}
        <LeadMagnetSection />


        {/* CTA — Cotação Auto */}
        <section className="py-16 md:py-24 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }} aria-labelledby="cotacao-auto-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl gradient-hero relative overflow-hidden p-8 md:p-16">
              <img src={cotacaoOnline3d} alt="" width={192} height={192} className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 object-contain opacity-80" aria-hidden="true" loading="lazy" decoding="async" />
              <div className="relative md:max-w-[60%]">
                <h2 id="cotacao-auto-heading" className="text-white mb-3 text-2xl md:text-3xl">Cotação de Seguro Auto em Guarulhos</h2>
                <p className="text-white/70 mb-8 text-[14px] max-w-md mx-auto">
                  Auto, moto, caminhão e vans — compare preços das melhores seguradoras em minutos.
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
              <h2 id="sobre-heading" className="mt-3 mb-6">Sua corretora de seguros<br className="hidden sm:block" /> no Cidade Maia, Guarulhos</h2>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                A Patro Seguros é uma corretora de seguros em Guarulhos registrada na SUSEP (nº 212113511), com sede no Cidade Maia. Atendemos pessoas físicas, famílias, empresas e produtores rurais em Guarulhos e em todo o Brasil.
              </p>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-10">
                Cada cliente conversa direto com um consultor especialista, recebe propostas comparativas de múltiplas seguradoras e tem suporte completo — da cotação ao sinistro.
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
            <h2 className="text-white mb-4 font-extrabold">Faça sua cotação de seguro em Guarulhos</h2>
            <p className="text-[14px] text-white/70 mb-12 max-w-md mx-auto">
              Gratuita, sem compromisso. Resposta em até 2 horas com propostas comparativas das melhores seguradoras.
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
