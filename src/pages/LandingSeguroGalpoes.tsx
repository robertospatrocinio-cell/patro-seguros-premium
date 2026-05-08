import LandingPageTemplate from "@/components/LandingPageTemplate";
import { Building2, UserCircle, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/lp-seguro-galpoes.webp";
import LocalMapSection from "@/components/LocalMapSection";

const LocadorVsLocatario = () => (
  <section className="py-20 bg-muted/30 border-y">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="section-label">Dualidade de Proteção</span>
        <h2 className="mt-3">Locador vs. Locatário: Quem deve contratar?</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Entenda as responsabilidades e por que ambas as partes precisam de proteção específica para evitar prejuízos catastróficos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Locador */}
        <div className="premium-card p-8 bg-background relative overflow-hidden group border-t-4 border-t-primary">
          <Building2 className="absolute -right-4 -bottom-4 h-24 w-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">O Locador (Proprietário)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Sua prioridade é proteger o <span className="text-foreground font-semibold">patrimônio físico (prédio)</span> e garantir que a renda do aluguel não seja interrompida por um sinistro.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span>Cobertura para reconstrução total da estrutura.</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span>Garantia de perda de aluguel durante reformas.</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span>Proteção contra danos causados por fenômenos naturais.</span>
            </li>
          </ul>
        </div>

        {/* Locatário */}
        <div className="premium-card p-8 bg-background relative overflow-hidden group border-t-4 border-t-blue-500">
          <UserCircle className="absolute -right-4 -bottom-4 h-24 w-24 text-blue-500/5 group-hover:text-blue-500/10 transition-colors" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <UserCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">O Locatário (Inquilino)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Sua prioridade é proteger a <span className="text-foreground font-semibold">operação (conteúdo)</span> e cumprir as cláusulas obrigatórias do contrato de locação.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
              <span>Proteção total para estoque, máquinas e móveis.</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
              <span>Responsabilidade Civil por danos ao imóvel locado.</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
              <span>Assistência 24h para manutenção emergencial.</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm font-medium text-muted-foreground italic">
          * Na maioria dos contratos em Guarulhos, o locatário é obrigado a contratar o seguro em nome do locador. Nós cuidamos dessa conformidade para você.
        </p>
      </div>
    </div>
  </section>
);

const warehouseRoutes = [
  {
    neighborhood: "Cumbica",
    distance: "12km",
    time: "15 min",
    description: "Próximo ao Aeroporto de Guarulhos e Dutra. Polo de transportadoras e logística internacional."
  },
  {
    neighborhood: "Vila Augusta",
    distance: "3.5km",
    time: "8 min",
    description: "Acesso privilegiado à Fernão Dias. Região de galpões comerciais e distribuição urbana (Last Mile)."
  },
  {
    neighborhood: "Cidade Maia",
    distance: "2.1km",
    time: "5 min",
    description: "Sede da Patro Seguros. Atendimento imediato e vistorias rápidas para comércios e depósitos locais."
  }
];

const LandingSeguroGalpoes = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro de Galpões"
    heroEmoji="🏭"
    headline="Seguro de Galpões: A Blindagem Estratégica para o Coração da sua Logística"
    subheadline="Em hubs como Guarulhos, um sinistro não interrompe apenas uma operação local, mas compromete toda uma cadeia de suprimentos. Sua operação está realmente protegida?"
    metaDescription="Seguro de Galpão Logístico em Guarulhos. Blindagem estratégica contra incêndio, roubo, danos elétricos e lucros cessantes. Solicite análise de risco."
    ctaText="Solicitar Análise de Risco"
    urgencyText="Incêndios em galpões causam prejuízos milionários"
    priceAnchor="Valores sob medida para seu patrimônio"
    guaranteeText="Visitamos seu galpão (se necessário), analisamos os riscos e apresentamos no mínimo 3 propostas comparativas. 100% gratuito."
    extraSections={
      <>
        <LocadorVsLocatario />
        <LocalMapSection 
          routes={warehouseRoutes} 
          title="Atendimento Presencial em Hubs Logísticos"
          description="Nossa proximidade com Cumbica, Vila Augusta e a sede no Maia garante agilidade na análise de risco e suporte em caso de sinistros."
        />
      </>
    }
    painPoints={[
      "Seu galpão tem estoque de milhões e não tem proteção contra incêndio ou roubo?",
      "Já viu notícias de galpões que pegaram fogo e o dono perdeu tudo da noite pro dia?",
      "Um funcionário ou visitante se machucou no seu galpão e você arcou com o processo?",
      "Teve equipamentos roubados ou danificados por problemas elétricos e pagou do próprio bolso?",
    ]}
    stats={[
      { value: "16+", label: "Seguradoras" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "R$2B+", label: "Em coberturas" },
      { value: "100%", label: "Gratuito" },
    ]}
    benefits={[
      { icon: "🔥", title: "Incêndio e explosão", description: "Proteção total para estrutura, estoque, máquinas e conteúdo. Cobre reconstrução completa do galpão." },
      { icon: "🔒", title: "Roubo de mercadorias", description: "Estoque, matéria-prima, produtos acabados — tudo protegido contra arrombamento e furto qualificado." },
      { icon: "⚡", title: "Danos elétricos", description: "Proteção crítica para galpões automatizados: esteiras, servidores, CLPs e painéis elétricos." },
      { icon: "📉", title: "Lucros cessantes", description: "Garante o pagamento de despesas fixas e o lucro que deixou de ser gerado durante o período de reparo." },
      { icon: "⚖️", title: "RC Operações", description: "Proteção contra danos a terceiros, prestadores e bens de clientes no perímetro do hub logístico." },
      { icon: "🌊", title: "Vendaval e alagamento", description: "Telhado arrancado pelo vento? Enchente danificou estoque? Coberturas específicas para riscos climáticos." },
    ]}
    testimonials={[
      { name: "Roberto C.", role: "Dono de galpão logístico", stars: 5, content: "Incêndio destruiu 40% do meu galpão. O seguro cobriu R$ 2,3 milhões entre estrutura e estoque. Salvou minha empresa." },
      { name: "Marcos A.", role: "Industrial", stars: 5, content: "Ventania arrancou parte do telhado e chuva danificou máquinas. Seguro pagou R$ 450 mil. Sem ele, teria falido." },
      { name: "Sandra P.", role: "Empresária de logística", stars: 5, content: "Fui assaltada e levaram R$ 200 mil em mercadoria. Recebi a indenização integral em 25 dias. A Patro cuidou de tudo." },
    ]}
    objections={[
      { question: "Quanto custa o seguro de galpão?", answer: "Depende do valor do imóvel, estoque e atividade. Galpões de R$ 1 milhão costumam pagar entre R$ 200 e R$ 800/mês. Cotamos grátis para você saber o valor exato." },
      { question: "Precisa de vistoria?", answer: "Para galpões de maior valor, pode ser necessária uma vistoria simples. Na maioria dos casos, o processo é digital e rápido." },
      { question: "Cobre estoque flutuante?", answer: "Sim! Trabalhamos com cobertura de estoque variável, que se ajusta automaticamente ao volume armazenado." },
      { question: "E se o galpão for alugado?", answer: "Locatários podem e devem contratar seguro. Protege seu estoque, máquinas e responsabilidade civil, independente de ser proprietário." },
      { question: "Cobre roubo de carga nos caminhões?", answer: "O seguro do galpão cobre o que está dentro dele. Para cargas em trânsito, recomendamos o Seguro Transporte, que também cotamos." },
    ]}
  />
);

export default LandingSeguroGalpoes;
