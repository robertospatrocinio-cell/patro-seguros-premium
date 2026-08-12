import LandingPageTemplate from "@/components/LandingPageTemplate";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { Shield, Smartphone, Zap, Hammer, AlertTriangle, Fuel, Star, CheckCircle2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";
import { buildLpWhatsAppUrl } from "@/lib/whatsapp";

const LandingSeguroMotoEntregador = () => {
  const source = "lp-seguro-moto-entregadores";
  
  const faqs = [
    {
      question: "Quem trabalha no iFood pode fazer Seguro de Moto?",
      answer: "Sim! Trabalhamos com seguradoras que aceitam especificamente entregadores do iFood e outros aplicativos. É fundamental declarar o uso profissional para garantir a indenização em caso de sinistro."
    },
    {
      question: "Quem trabalha na Keeta consegue contratar seguro?",
      answer: "Com certeza. A Patro Seguros tem parcerias com seguradoras que já incluíram a Keeta e novos apps de delivery em suas tabelas de aceitação para motociclistas."
    },
    {
      question: "Motoboy paga mais caro no seguro?",
      answer: "O valor é um pouco superior ao seguro de lazer devido à maior exposição ao risco, mas o custo-benefício é imbatível. Temos opções para CG 160 a partir de R$ 49/mês."
    },
    {
      question: "O seguro cobre roubo e furto na rua?",
      answer: "Sim. Nossas apólices para entregadores focam no que mais importa: proteção total contra roubo e furto qualificado, inclusive enquanto você está aguardando pedidos na calçada."
    },
    {
      question: "A seguradora aceita moto de aplicativo?",
      answer: "Sim, desde que seja contratado o plano correto para 'Uso Profissional/Entrega'. Se você fizer um seguro comum e sofrer um acidente trabalhando, a seguradora pode negar o pagamento."
    },
    {
      question: "Quais documentos preciso para contratar?",
      answer: "Apenas o documento da moto (CRLV), sua CNH e um comprovante de residência. O processo é 100% digital e rápido via WhatsApp."
    }
  ];

  return (
    <LandingPageTemplate
      title="Seguro de Moto para Entregadores"
      headline="Sua moto é sua ferramenta de trabalho. Proteja quem garante sua renda todos os dias."
      subheadline="A Patro Seguros ajuda entregadores de aplicativos (iFood, Keeta, 99) a encontrar o melhor Seguro de Moto em 16+ seguradoras com foco em Guarulhos e Zona Leste."
      metaDescription="Faça sua cotação de Seguro de Moto para entregadores de aplicativos. Atendemos profissionais do iFood, Keeta, Rappi, 99 e motoboy em Guarulhos e Grande SP."
      heroEmoji="🏍️"
      indexable={true}
      ctaText="Solicitar Cotação"
      ctaUrl="/cotacao?tipo=moto-entregador"
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
        { icon: "📱", title: "Foco em Aplicativos", description: "Cobertura aceita por iFood, Keeta, Rappi e 99. Sem letras miúdas sobre o uso profissional." },
        { icon: "🏥", title: "Acidentes Pessoais", description: "Proteção financeira para você em caso de hospitalização ou invalidez por acidente de trânsito." },
        { icon: "💰", title: "Custo de Manutenção", description: "Opções com cobertura de faróis e retrovisores para manter sua ferramenta sempre em dia." },
      ]}
      testimonials={[
        { name: "Carlos J.", role: "Entregador iFood - Guarulhos", stars: 5, content: "Tive minha CG 160 levada no Pimentas. Se não fosse o seguro da Patro, eu estava parado até hoje. Recebi o dinheiro e já tô com moto nova." },
        { name: "Roberto M.", role: "Motoboy Keeta - Vila Augusta", stars: 5, content: "O guincho da assistência 24h já me salvou duas vezes de madrugada. Por R$ 55 por mês, durmo tranquilo sabendo que a moto tá protegida." },
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
          
          {/* Article Schema for Rich Results */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Seguro de Moto para Entregadores em Guarulhos: iFood, 99 e Motoboy",
              "description": "Guia completo sobre seguro de moto para motociclistas profissionais de aplicativos em Guarulhos e São Paulo. Saiba como proteger sua ferramenta de trabalho.",
              "image": "https://www.patroseguros.com.br/images/hero-home.webp",
              "author": {
                "@type": "Organization",
                "name": "Patro Seguros",
                "url": "https://www.patroseguros.com.br"
              },
              "publisher": {
                "@id": "https://www.patroseguros.com.br/#insurance-agency"
              },
              "datePublished": "2026-08-12",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.patroseguros.com.br/seguro-moto-entregadores-guarulhos"
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
                  "Um erro comum é contratar seguro 'normal' e não avisar que usa para entregas. Se houver um roubo enquanto você está logado no app, a seguradora pode recusar o pagamento. Na Patro, garantimos que sua apólice tenha a cláusula de uso profissional correta para sua segurança jurídica."
                </p>
              </div>
            </div>
          </section>

          {/* Geo Focus Section */}
          <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Especialistas em Guarulhos e Zona Leste</h2>
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

          {/* Persistent WhatsApp for Conversion */}
          <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
             <a 
               href={buildLpWhatsAppUrl(source, "cta-final")}
               onClick={() => trackWhatsAppClick(source)}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
             >
               <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold">
                 Falar com Especialista
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
