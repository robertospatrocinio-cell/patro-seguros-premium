import LandingPageTemplate from "@/components/LandingPageTemplate";
import { Building2, UserCircle, CheckCircle2, ShieldAlert, ShieldCheck, HelpCircle, MapPin, Zap, TrendingUp } from "lucide-react";
import heroImg from "@/assets/lp-seguro-galpoes.webp";
import LocalMapSection from "@/components/LocalMapSection";

const LocalAuthorityStats = () => (
  <section className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="section-label">Presença Regional</span>
        <h2 className="mt-3">Autoridade em Guarulhos: Cumbica e Bonsucesso</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Nossa proximidade com os principais eixos logísticos do país nos permite oferecer uma consultoria de risco que nenhuma corretora digital consegue igualar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Case Cumbica */}
        <div className="premium-card p-8 bg-background border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-bold">Hub Cumbica</h3>
          </div>
          <div className="mb-6">
            <p className="text-3xl font-extrabold text-foreground mb-1">120+</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Galpões Protegidos</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Atendemos transportadoras e operadores logísticos no entorno do Aeroporto. Conhecemos as exigências específicas de segurança da região.
          </p>
        </div>

        {/* Case Bonsucesso */}
        <div className="premium-card p-8 bg-background border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-bold">Polo Bonsucesso</h3>
          </div>
          <div className="mb-6">
            <p className="text-3xl font-extrabold text-foreground mb-1">2h</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Tempo médio de vistoria</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Agilidade crítica para indústrias e centros de distribuição na Rodovia Presidente Dutra. Análise técnica presencial no mesmo dia.
          </p>
        </div>

        {/* Geral Guarulhos */}
        <div className="premium-card p-8 bg-background border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-bold">Resultados Locais</h3>
          </div>
          <div className="mb-6">
            <p className="text-3xl font-extrabold text-foreground mb-1">R$ 450M+</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Capital Segurado na Região</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Liderança em seguros patrimoniais em Guarulhos, com foco em redução de custos de apólice através de análise de risco precisa.
          </p>
        </div>
      </div>

      <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/10 max-w-4xl mx-auto text-center">
        <blockquote className="text-lg font-medium text-foreground italic mb-4">
          "A Patro entende a dinâmica de Guarulhos. Em Cumbica, onde o risco de roubo é sensível, eles desenharam uma apólice que nenhuma outra corretora conseguiu, com custos 20% menores."
        </blockquote>
        <cite className="text-sm text-muted-foreground not-italic font-bold">
          — Diretor de Operações, Transportadora Multinacional (Guarulhos-SP)
        </cite>
      </div>
    </div>
  </section>
);

const RiscosNomeadosVsAllRisks = () => (
  <section className="py-20 bg-background overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="section-label">Consultoria Técnica</span>
        <h2 className="mt-3">Riscos Nomeados vs. All-Risks (Riscos Operacionais)</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Para galpões Classe A e operações logísticas complexas, a escolha da modalidade define o sucesso da indenização.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Riscos Nomeados */}
        <div className="relative p-8 rounded-3xl border border-border bg-muted/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Riscos Nomeados</h3>
              <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mt-1">Modalidade Tradicional</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Cobre apenas os eventos explicitamente listados na apólice. Se o risco não estiver "nomeado", não há cobertura. Ideal para galpões menores ou depósitos simples.
          </p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> Coberturas Comuns
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Incêndio", "Raio", "Explosão", "Vendaval", "Danos Elétricos"].map(item => (
                  <span key={item} className="text-[11px] px-2.5 py-1 rounded-full bg-background border border-border text-muted-foreground">{item}</span>
                ))}
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <h4 className="text-sm font-bold mb-2 text-amber-700 flex items-center gap-2">
                <HelpCircle className="h-4 w-4" /> Limitações Críticas
              </h4>
              <p className="text-xs text-amber-700/80 leading-relaxed">
                Qualquer evento não listado (como um erro de engenharia ou colapso estrutural por causa não especificada) é automaticamente excluído.
              </p>
            </div>
          </div>
        </div>

        {/* All-Risks */}
        <div className="relative p-8 rounded-3xl border-2 border-primary bg-primary/[0.02] shadow-xl shadow-primary/5">
          <div className="absolute top-4 right-8 px-3 py-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground uppercase tracking-widest">
            Recomendado Classe A
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">All-Risks (Riscos Operacionais)</h3>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Proteção de Alta Performance</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Inverte a lógica: <span className="text-foreground font-semibold">Tudo está coberto</span>, exceto o que estiver expressamente excluído. É a blindagem máxima para ativos de alto valor.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-4 w-4" /> Vantagens Exclusivas
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {["Danos Acidentais", "Impacto de Veículos", "Quebra de Vidros", "Derrame de Sprinklers", "Queda de Aeronaves", "Alagamento"].map(item => (
                  <li key={item} className="text-[11px] flex items-center gap-1.5 text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <h4 className="text-sm font-bold mb-2 text-primary">Por que All-Risks?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ideal para condomínios logísticos e indústrias onde um sinistro complexo pode envolver múltiplas causas. Garante a continuidade do negócio com menos "letras miúdas".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

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
    subheadline="Em hubs como Guarulhos, um sinistro de galpão não para apenas a sua operação — compromete toda uma cadeia de suprimentos. Vamos analisar, juntos, se a sua apólice atual sustentaria esse cenário."
    metaDescription="Seguro de Galpão Logístico em Guarulhos. Blindagem estratégica contra incêndio, roubo, danos elétricos e lucros cessantes. Solicite análise de risco."
    ctaText="Solicitar Análise Técnica de Risco"
    urgencyText="Incêndios em galpões causam prejuízos milionários"
    priceAnchor="Valores sob medida para seu patrimônio"
    guaranteeText="Quando necessário, vamos até o seu galpão, mapeamos os riscos reais e apresentamos no mínimo 3 propostas comparativas — sem custo e sem compromisso."
    extraSections={
      <>
        <LocadorVsLocatario />
        <RiscosNomeadosVsAllRisks />
        <LocalAuthorityStats />
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
