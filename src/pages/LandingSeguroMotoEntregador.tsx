import React, { useState, useEffect } from "react";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { Shield, Smartphone, Zap, Hammer, AlertTriangle, Fuel, Star, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";
import { buildLpWhatsAppUrl } from "@/lib/whatsapp";
import { EMPRESA, ENDERECO_LINHA, WHATSAPP_DIGITS } from "@/config/empresa";
import { highlightBrands, BrandText } from "@/components/BrandText";

const LandingSeguroMotoEntregador = () => {
  const source = "lp-seguro-moto-entregadores";
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const faqs = [
    {
      question: highlightBrands("Quem trabalha no iFood pode fazer Seguro de Moto?"),
      answer: highlightBrands("Sim! Trabalhamos com seguradoras que aceitam especificamente entregadores do iFood e outros aplicativos. É fundamental declarar o uso profissional para garantir a indenização em caso de sinistro.")
    },
    {
      question: highlightBrands("Quem trabalha na Keeta consegue contratar seguro?"),
      answer: highlightBrands("Com certeza. A Patro Seguros tem parcerias com seguradoras que já incluíram a Keeta e novos apps de delivery em suas tabelas de aceitação para motociclistas.")
    },
    {
      question: "Como funciona a franquia para entregadores?",
      answer: "A franquia é o valor que você paga apenas em caso de danos parciais à sua moto. Para roubo, furto total ou perda total, você NÃO paga franquia e recebe o valor integral da Tabela FIPE."
    },
    {
      question: "O seguro cobre roubo e furto na rua?",
      answer: "Sim. Nossas apólices para entregadores focam no que mais importa: proteção total contra roubo e furto qualificado, inclusive enquanto você está aguardando pedidos na calçada."
    },
    {
      question: "O que fazer em caso de sinistro (roubo ou acidente)?",
      answer: "Mantenha a calma, faça o Boletim de Ocorrência e entre em contato conosco imediatamente pelo WhatsApp. A Patro Seguros cuida de toda a burocracia com a seguradora para você focar em voltar a rodar."
    },
    {
      question: "Motoboy paga mais caro no seguro?",
      answer: "O valor é um pouco superior ao seguro de lazer devido à maior exposição ao risco, mas o custo-benefício é imbatível. Temos opções para CG 160 a partir de R$ 49/mês."
    },
    {
      question: "Quais são as coberturas básicas incluídas?",
      answer: "Nossos planos padrão incluem cobertura contra Roubo, Furto, Incêndio e Assistência 24h completa (guincho, socorro mecânico e pane seca). Você também pode adicionar cobertura para terceiros e acessórios."
    }
  ];

  return (
    <LandingPageTemplate
      title="Seguro de Moto para Entregadores em Guarulhos | Melhor Preço iFood e 99"
      headline={highlightBrands("Seguro de Moto para Entregadores em Guarulhos: Proteja seu Ganha-Pão")}
      subheadline={highlightBrands("Cotação rápida para iFood, Keeta, 99 e Motoboy Profissional. Planos de Seguro de Moto com cobertura total contra roubo e furto em Guarulhos e São Paulo.")}
      metaDescription="Garanta o melhor Seguro de Moto para entregadores em Guarulhos. Proteção aceita por iFood e 99 contra roubo e furto. Cote em 16+ seguradoras com planos a partir de R$ 49/mês."
      heroEmoji="🏍️"
      indexable={true}
      ctaText="Solicitar Cotação"
      ctaUrl="/cotacao-auto"
      urgencyText="A cada 15 minutos uma moto é roubada em SP — não seja a próxima vítima"
      priceAnchor="Planos para CG, Fazer e Titan a partir de R$ 49/mês"
      guaranteeText="Consultoria humana especializada: não vendemos apenas apólices, protegemos seu ganha-pão com quem conhece o dia a dia das ruas de Guarulhos."
      painPoints={[
        "Você trabalha sob pressão e sabe que o risco de acidentes e quedas é real a cada entrega.",
        "Sua moto fica exposta na rua enquanto você retira pedidos em restaurantes visados.",
        "O trabalho noturno e em áreas de risco em Guarulhos e ZL aumenta a chance de abordagens.",
        "Ficar sem moto hoje significa ficar sem renda amanhã. Você tem reserva para comprar outra à vista?",
      ]}
      stats={[
        { value: "16+", label: "Seguradoras" },
        { value: "2h", label: "Resposta" },
        { value: "R$49", label: "A partir de" },
        { value: "24h", label: "Assistência" },
      ]}
      benefits={[
        { icon: "🛡️", title: "Roubo e Furto Total", description: "Receba 100% da Tabela FIPE se sua moto for levada. Proteção real para o seu maior patrimônio." },
        { icon: "⛽", title: "Assistência 24h", description: "Pane seca, guincho, troca de pneus e chaveiro. Onde você estiver em Guarulhos ou SP, nós chegamos." },
        { icon: "👤", title: "Danos a Terceiros", description: "Bateu no carro de alguém? O seguro cobre o prejuízo do outro, evitando que você perca suas economias." },
        { icon: "📱", title: "Foco em Aplicativos", description: highlightBrands("Cobertura aceita por iFood, Keeta, Rappi e 99. Sem letras miúdas sobre o uso profissional.") },
        { icon: "🏥", title: "Acidentes Pessoais", description: "Proteção financeira para você em caso de hospitalização ou invalidez por acidente de trânsito." },
        { icon: "💰", title: "Custo de Manutenção", description: "Opções com cobertura de faróis e retrovisores para manter sua ferramenta sempre em dia." },
      ]}
      testimonials={[
        { name: "Carlos J.", role: highlightBrands("Entregador iFood - Guarulhos"), stars: 5, content: "Tive minha CG 160 levada no Pimentas. Se não fosse o seguro da Patro, eu estava parado até hoje. Recebi o dinheiro e já tô com moto nova." },
        { name: "Roberto M.", role: highlightBrands("Motoboy Keeta - Vila Augusta"), stars: 5, content: "O guincho da assistência 24h já me salvou duas vezes de madrugada. Por R$ 55 por mês, durmo tranquilo sabendo que a moto tá protegida." },
        { name: "Tiago S.", role: "Entregador Rappi - ZL", stars: 5, content: "A maioria das corretoras não queria fazer seguro pra entrega. Na Patro foi rápido e direto no WhatsApp. Recomendo pra galera do corre." },
      ]}
      objections={faqs}
      extraSections={
        <div className="space-y-20">
          <ServiceSchema 
            name="Seguro de Moto para Entregadores" 
            description="Consultoria especializada em seguros para motociclistas profissionais e entregadores de aplicativos em Guarulhos e região."
            serviceType="InsuranceBusiness"
          />
          <FAQSchema faqs={faqs} />
          
          {/* BreadcrumbList Schema for Rich Results */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": EMPRESA.dominioCanonico
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Seguros em Guarulhos",
                  "item": `${EMPRESA.dominioCanonico}/seguros-guarulhos`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Seguro Moto Entregador",
                  "item": `${EMPRESA.dominioCanonico}/seguro-moto-entregadores-guarulhos`
                }
              ]
            })}
          </script>

          {/* LocalBusiness Schema for Rich Results */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              "@id": `${EMPRESA.dominioCanonico}/seguro-moto-entregadores-guarulhos#local-business`,
              "name": `${EMPRESA.nomeFantasia} - Seguro de Moto Entregador`,
              "description": "Corretora de seguros especializada em seguro de moto para entregadores de aplicativos (iFood, 99, Keeta) em Guarulhos.",
              "url": `${EMPRESA.dominioCanonico}/seguro-moto-entregadores-guarulhos`,
              "telephone": EMPRESA.telefone,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": `${EMPRESA.endereco.logradouro}, ${EMPRESA.endereco.numero} ${EMPRESA.endereco.complemento}`,
                "addressLocality": EMPRESA.endereco.cidade,
                "addressRegion": EMPRESA.endereco.estadoSigla,
                "postalCode": EMPRESA.endereco.cep,
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": EMPRESA.geo.latitude,
                "longitude": EMPRESA.geo.longitude
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:30",
                "closes": "18:00"
              },
              "areaServed": [
                { "@type": "City", "name": "Guarulhos" },
                { "@type": "City", "name": "São Paulo" },
                { "@type": "Neighborhood", "name": "Pimentas" },
                { "@type": "Neighborhood", "name": "Bonsucesso" },
                { "@type": "Neighborhood", "name": "Cidade Maia" },
                { "@type": "Neighborhood", "name": "Vila Augusta" }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": EMPRESA.telefone,
                "contactType": "customer service",
                "areaServed": "BR",
                "availableLanguage": "Portuguese"
              },
              "sameAs": [
                EMPRESA.redesSociais.instagram,
                EMPRESA.redesSociais.facebook,
                EMPRESA.redesSociais.linkedin
              ]
            })}
          </script>

          {/* Article Schema for Rich Results */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Seguro de Moto para Entregadores em Guarulhos: Preço e Coberturas iFood, 99 e Keeta",
              "description": "Guia especializado em seguro de moto para entregadores de aplicativos em Guarulhos e SP. Saiba como proteger sua moto contra roubo e furto com planos profissionais.",
              "image": `${EMPRESA.dominioCanonico}/images/hero-home.webp`,
              "author": {
                "@type": "Organization",
                "name": "Patro Seguros",
                "url": EMPRESA.dominioCanonico
              },
              "publisher": {
                "@id": `${EMPRESA.dominioCanonico}/#insurance-agency`
              },
              "datePublished": "2026-08-12",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${EMPRESA.dominioCanonico}/seguro-moto-entregadores-guarulhos`
              }
            })}
          </script>

          {/* Dica do Corretor Section */}
          <section className="py-12 bg-primary/5 rounded-3xl container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shrink-0">
                <Shield className="h-12 w-12" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500 fill-amber-500" /> Dica do Corretor Patro
                </h3>
                <p className="text-muted-foreground leading-relaxed italic">
                  {highlightBrands("\"Um erro comum é contratar seguro 'normal' e não avisar que usa para entregas. Se houver um roubo enquanto você está logado no app, a seguradora pode recusar o pagamento. Na Patro, garantimos que sua apólice tenha a cláusula de uso profissional correta para sua segurança jurídica.\"")}
                </p>
              </div>
            </div>
          </section>

          {/* Objeções Comuns / Tabela Comparativa */}
          <section className="py-16 bg-white container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Por que não fazer um seguro comum?</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Muitos entregadores tentam economizar contratando seguros de passeio, mas o barato sai caro no momento do sinistro.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border shadow-lg mb-12">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 font-bold border-b">Característica</th>
                    <th className="p-4 font-bold border-b text-red-600">Seguro "Passeio"</th>
                    <th className="p-4 font-bold border-b text-primary">Seguro Patro Entregador</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b font-medium">Uso no {highlightBrands("iFood")}/Apps</td>
                    <td className="p-4 border-b text-red-500 font-bold">Risco de Recusa</td>
                    <td className="p-4 border-b text-green-600 font-bold">100% Garantido</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b font-medium">Assistência 24h</td>
                    <td className="p-4 border-b">Limitada</td>
                    <td className="p-4 border-b">Foco Profissional</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b font-medium">Cobertura de Baú</td>
                    <td className="p-4 border-b text-red-500 font-bold">Não Aceita</td>
                    <td className="p-4 border-b text-green-600 font-bold">Opcional Aceito</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b font-medium">Indenização (FIPE)</td>
                    <td className="p-4 border-b">Pode ser bloqueada</td>
                    <td className="p-4 border-b font-bold">Garantia Contratual</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" /> "O seguro é muito caro"
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nossos planos começam em R$ 49/mês. Isso é menos que uma entrega por dia. É o preço da sua paz de espírito.
                </p>
              </div>
              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> "Dá muita burocracia"
                </h4>
                <p className="text-sm text-muted-foreground">
                  Fazemos tudo pelo WhatsApp. Você envia as fotos, nós cotamos e a apólice sai digital no mesmo dia.
                </p>
              </div>
            </div>
          </section>

          {/* Geo Focus Section */}
          <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Seguro de Moto para Entregadores em Guarulhos e Grande São Paulo</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Conhecemos os pontos de maior risco e as necessidades de quem roda no Centro, Vila Augusta, Pimentas, Bonsucesso e em toda a Grande SP.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {["Centro", "Pimentas", "Bonsucesso", "Cidade Maia", "Vila Augusta", "Tatuapé", "Itaquera", "São Miguel"].map(bairro => (
                <div key={bairro} className="p-4 border rounded-xl hover:border-primary/50 transition-colors">
                  <span className="font-semibold text-sm">{bairro}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Data Prep Section (Future expansion) */}
          <section className="py-12 border-t border-dashed">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 opacity-60">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Info className="h-3 w-3" /> Estatísticas 2026
                  </h4>
                  <p className="text-sm">Área reservada: Top 5 motos mais seguradas em Guarulhos.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" /> Cotações Realizadas
                  </h4>
                  <p className="text-sm">Área reservada: Volume de atendimento mensal para entregadores.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3" /> Alerta de Risco
                  </h4>
                  <p className="text-sm">Área reservada: Mapa de calor de roubos de moto em tempo real.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Linking / Blog Suggestions */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h3 className="text-xl font-bold mb-8">Artigos recomendados para entregadores</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Vale a pena Seguro para Moto de Aplicativo?", link: "/blog/seguro-moto-aplicativo-vale-a-pena" },
                  { title: "Como economizar no Seguro da Honda CG?", link: "/blog/como-economizar-seguro-honda-cg" },
                  { title: "Seguro cobre baú de entrega?", link: "/blog/seguro-moto-cobertura-bau-entrega" },
                ].map(art => (
                  <Link key={art.title} to={art.link} className="premium-card p-6 hover:scale-[1.02] transition-transform">
                    <h4 className="font-semibold text-sm mb-3">{art.title}</h4>
                    <span className="text-xs text-primary font-bold flex items-center gap-1">Ler artigo <Zap className="h-3 w-3" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTAs Estratégicos e Conversão */}
          <section className="py-16 container mx-auto px-4 text-center">
            <div className="bg-primary text-white p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 bg-white/10 w-32 h-32 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Não rode mais um dia sem proteção!</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Cotação rápida, sem burocracia e com a segurança que só quem conhece o asfalto de Guarulhos oferece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-primary font-bold px-8 py-7 text-lg rounded-full" asChild>
                  <a href="/cotacao-auto">
                    Cote Agora no Site
                  </a>
                </Button>
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-7 text-lg rounded-full flex items-center gap-2 border-none" asChild>
                  <a 
                    href="/cotacao-auto"
                    onClick={() => trackWhatsAppClick(source)}
                  >
                    Cote Agora no WhatsApp <Smartphone className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Persistent WhatsApp & Sticky Scroll CTA */}
          <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
             {/* Sticky Scroll CTA */}
             <div className={`transition-all duration-500 transform ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
               <Button className="bg-primary text-white font-bold shadow-2xl rounded-full pr-6 pl-2 py-6 flex items-center gap-3 border-2 border-white/20 hover:scale-105 transition-transform" asChild>
                 <a href="/cotacao-auto">
                   <div className="bg-white text-primary rounded-full p-2">
                     <ArrowRight className="h-4 w-4" />
                   </div>
                   Cote em 16+ Seguradoras
                  </a>
               </Button>
             </div>

             {/* WhatsApp Floating Button */}
              <a 
                href="/cotacao-auto"
                onClick={() => trackWhatsAppClick(source)}
               className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group animate-pulse hover:animate-none"
             >
               <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold pl-0 group-hover:pl-2">
                 Cotação Rápida
               </span>
               <Smartphone className="h-6 w-6" />
             </a>
          </div>
        </div>
      }
    />
  );
};

export default LandingSeguroMotoEntregador;
