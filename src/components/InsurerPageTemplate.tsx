import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, MessageCircle, Info, ShieldCheck, Zap, Award, HelpCircle, 
  ChevronDown, ChevronUp, AlertCircle, Phone, Smartphone, MapPin, Search,
  ArrowRight, Shield
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FAQItem {
  q: string;
  a: string;
}

interface ClaimChannel {
  type: 'whatsapp' | 'app' | 'phone' | 'web';
  value: string;
  label: string;
}

interface InsurerPageProps {
  insurer: string;
  description: string;
  benefits: string[];
  keywords: string[];
  accentColor: string;
  history?: string;
  faqs?: FAQItem[];
  claimChannels?: ClaimChannel[];
}



const InsurerPageTemplate = ({ insurer, description, benefits, keywords, accentColor, history, faqs, claimChannels }: InsurerPageProps) => {
  const [selectedType, setSelectedType] = useState<'auto' | 'residencial' | 'empresarial' | 'vida'>('auto');
  const [sortBy, setSortBy] = useState<'default' | 'cost' | 'support'>('default');
  
  const WHATSAPP_URL = `https://wa.me/551151997500?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20Seguro%20${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}%20da%20${insurer}%20em%20Guarulhos.`;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const rawComparisonData = [
    { name: "Porto Seguro", type: "auto", cost: 5, costLabel: "Premium", coverage: "Máxima", support: 5, supportLabel: "5 Estrelas", franchise: "Flexível" },
    { name: "Tokio Marine", type: "auto", cost: 3, costLabel: "Equilibrado", coverage: "Alta", support: 5, supportLabel: "5 Estrelas", franchise: "Competitiva" },
    { name: "Allianz", type: "auto", cost: 4, costLabel: "Específico", coverage: "Alta", support: 4, supportLabel: "4 Estrelas", franchise: "Padronizada" },
    { name: "Azul Seguros", type: "auto", cost: 2, costLabel: "Econômico", coverage: "Essencial", support: 4, supportLabel: "4 Estrelas", franchise: "Baixa" },
    { name: "Suhai", type: "auto", cost: 1, costLabel: "Mínimo", coverage: "Roubo/Furto", support: 3, supportLabel: "3 Estrelas", franchise: "Isenta" },
    { name: "HDI Seguros", type: "auto", cost: 3, costLabel: "Equilibrado", coverage: "Média-Alta", support: 5, supportLabel: "5 Estrelas", franchise: "Bate-Pronto" },
    // Adicionando outros tipos para o filtro funcionar
    { name: "Porto Seguro", type: "residencial", cost: 3, costLabel: "Competitivo", coverage: "Completa", support: 5, supportLabel: "5 Estrelas", franchise: "Fixa" },
    { name: "Tokio Marine", type: "residencial", cost: 2, costLabel: "Econômico", coverage: "Ampla", support: 4, supportLabel: "4 Estrelas", franchise: "Reduzida" },
    { name: "Porto Seguro", type: "empresarial", cost: 4, costLabel: "Premium", coverage: "Total", support: 5, supportLabel: "5 Estrelas", franchise: "Ajustável" },
    { name: "Allianz", type: "empresarial", cost: 4, costLabel: "Robustez", coverage: "Internacional", support: 5, supportLabel: "5 Estrelas", franchise: "Industrial" },
    { name: "Porto Seguro", type: "vida", cost: 3, costLabel: "Flexível", coverage: "Vitalícia", support: 5, supportLabel: "5 Estrelas", franchise: "N/A" },
    { name: "Tokio Marine", type: "vida", cost: 2, costLabel: "Acessível", coverage: "Personalizada", support: 5, supportLabel: "5 Estrelas", franchise: "N/A" },
  ];

  const comparisonData = rawComparisonData
    .filter(item => item.type === selectedType)
    .sort((a, b) => {
      if (sortBy === 'cost') return a.cost - b.cost;
      if (sortBy === 'support') return b.support - a.support;
      return 0;
    });



  return (
    <div className="min-h-screen bg-background">
      {faqs && faqs.length > 0 && (
        <FAQSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      )}

      <PageMeta 
        title={`${insurer} em Guarulhos | Seguro Auto e Preços | Patro Seguros`}
        description={`Cotação de Seguro Auto ${insurer} em Guarulhos. A Patro Seguros é parceira oficial ${insurer}. Compare preços e coberturas com especialistas locais.`}
      />
      <BreadcrumbSchema items={[
        { name: "Início", url: CANONICAL_BASE_URL },
        { name: "Seguradoras", url: `${CANONICAL_BASE_URL}/parceiros` },
        { name: insurer, url: window.location.href },
      ]} />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor}15 0%, white 100%)` }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Principal Parceira em Guarulhos</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Seguro Auto <span style={{ color: accentColor }}>{insurer}</span> em Guarulhos
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {keywords.map(kw => (
                  <span key={kw} className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] rounded-full font-medium">#{kw}</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl transition-transform hover:scale-105" style={{ backgroundColor: accentColor }} onClick={() => trackCotacaoClick(`insurer-${insurer}`)}>
                  Cote {insurer} agora
                </Button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(`insurer-${insurer}`)}>
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold border-2 hover:bg-slate-50">
                    <MessageCircle className="mr-2 h-5 w-5 text-green-500" />
                    WhatsApp Patro
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold">Cobertura Completa</h3>
                <p className="text-sm text-muted-foreground">Roubo, furto, colisão e danos a terceiros com a garantia {insurer}.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold">Assistência 24h Local</h3>
                <p className="text-sm text-muted-foreground">Guincho e socorro mecânico rápido em qualquer bairro de Guarulhos.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold">Vantagem Patro</h3>
                <p className="text-sm text-muted-foreground">Condições exclusivas por sermos o principal canal {insurer} na região.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details & Comparison */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Por que contratar {insurer} com a Patro Seguros?</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
                <Card className="relative border-none shadow-2xl bg-white overflow-hidden">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Diferencial Regional</span>
                      <h3 className="text-2xl font-bold text-slate-900">Expertise em Guarulhos</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Conhecemos o índice de risco de cada bairro, desde o **Cidade Maia** até o **Pimentas**. Isso nos permite ajustar sua cotação na **{insurer}** para obter o melhor preço possível, usando CEPs e perfis que a seguradora valoriza.
                    </p>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-sm font-medium text-slate-700 italic">
                        "A Patro é nossa parceira estratégica em Guarulhos, garantindo que o cliente final receba o melhor da tecnologia {insurer} com o calor do atendimento humano local."
                      </p>
                    </div>
                    <Button className="w-full h-12 font-bold text-white shadow-lg" style={{ backgroundColor: accentColor }}>
                      Solicitar Cotação Comparativa
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Claim Step-by-Step */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <div className="sticky top-24 space-y-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 leading-tight">Como acionar o sinistro {insurer} em Guarulhos</h2>
                  <p className="text-slate-600">Guia rápido para quando você mais precisar de agilidade e suporte.</p>
                  
                  {claimChannels && claimChannels.length > 0 && (
                    <div className="pt-6 space-y-3">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Canais Oficiais {insurer}</p>
                      {claimChannels.map((channel, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-slate-700">
                          {channel.type === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-500" />}
                          {channel.type === 'phone' && <Phone className="w-4 h-4 text-blue-500" />}
                          {channel.type === 'app' && <Smartphone className="w-4 h-4 text-purple-500" />}
                          {channel.type === 'web' && <Search className="w-4 h-4 text-orange-500" />}
                          <span className="text-sm"><strong>{channel.label}:</strong> {channel.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-2/3 space-y-12">
                <div className="relative pl-12 border-l-2 border-slate-100 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">1</div>
                    <h3 className="text-xl font-bold mb-2">Segurança e Documentação</h3>
                    <p className="text-slate-600">Garanta a segurança de todos. Se houver vítimas, chame o socorro médico. Tire fotos dos danos e placas dos veículos envolvidos e anote o contato de testemunhas.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">2</div>
                    <h3 className="text-xl font-bold mb-2">Boletim de Ocorrência (B.O.)</h3>
                    <p className="text-slate-600">Para colisões em Guarulhos ou rodovias federais, o B.O. pode ser feito online. Ele é indispensável em casos de roubo, furto ou colisões com feridos/terceiros.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">3</div>
                    <h3 className="text-xl font-bold mb-2">Comunicação à {insurer}</h3>
                    <p className="text-slate-600">Use os canais oficiais acima para abrir o aviso de sinistro. Você receberá um número de protocolo que usaremos para acompanhar seu processo.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">4</div>
                    <h3 className="text-xl font-bold mb-2">Oficina e Vistoria em Guarulhos</h3>
                    <p className="text-slate-600">Escolha uma oficina da rede referenciada da {insurer} em Guarulhos (Macedo, Centro ou Cumbica) para ganhar descontos na franquia e agilidade na vistoria.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">5</div>
                    <h3 className="text-xl font-bold mb-2">Apoio da Patro Seguros</h3>
                    <p className="text-slate-600">Após abrir o aviso, envie o número do sinistro para a Patro. Nós cuidaremos de cobrar a seguradora para que seu carro seja liberado o mais rápido possível.</p>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    Rede de Oficinas em Guarulhos
                  </h4>
                  <p className="text-sm text-slate-600">
                    A {insurer} possui oficinas credenciadas em pontos estratégicos de Guarulhos. Ao optar pela rede referenciada, você tem garantia total no reparo e condições especiais no valor da franquia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Comparativo: {insurer} vs Mercado</h2>
              <p className="text-slate-600 mt-2">Personalize o comparativo para encontrar a melhor opção para sua necessidade em Guarulhos.</p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex overflow-x-auto max-w-full">
                  {(['auto', 'residencial', 'empresarial', 'vida'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${selectedType === type ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
                
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex overflow-x-auto max-w-full">
                  <button
                    onClick={() => setSortBy('default')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${sortBy === 'default' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Padrão
                  </button>
                  <button
                    onClick={() => setSortBy('cost')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${sortBy === 'cost' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Melhor Custo
                  </button>
                  <button
                    onClick={() => setSortBy('support')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${sortBy === 'support' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Melhor Atendimento
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-nowrap">Seguradora</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-nowrap">Custo-Benefício</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-nowrap">Cobertura</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-nowrap">Atendimento</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-nowrap">Franquia</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-nowrap">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.length > 0 ? comparisonData.map((row, i) => (
                    <tr key={i} className={`hover:bg-slate-50 transition-colors ${row.name === insurer ? 'bg-primary/5' : ''}`}>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          {row.name === insurer && <Shield className="w-4 h-4 text-primary" />}
                          <span className={`font-bold whitespace-nowrap ${row.name === insurer ? 'text-primary' : 'text-slate-800'}`}>{row.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.cost <= 2 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {row.costLabel}
                        </span>
                      </td>
                      <td className="p-6 text-slate-600 text-sm">{row.coverage}</td>
                      <td className="p-6">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600 text-sm">{row.supportLabel}</span>
                        </div>
                      </td>
                      <td className="p-6 text-slate-600 text-sm">{row.franchise}</td>
                      <td className="p-6">
                        <Link to={`/cotacao?tipo=${selectedType}&seguradora=${row.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Button size="sm" variant={row.name === insurer ? 'default' : 'outline'} className="text-[10px] h-8 px-4 font-bold uppercase whitespace-nowrap">
                            Cotar {row.name}
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-slate-400 font-medium">
                        Nenhum comparativo disponível para este tipo de seguro no momento.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-medium">Análise baseada na performance de sinistros e preços médios praticados em Guarulhos em 2026.</p>
          </div>
        </section>

        {/* History/SEO Content */}
        {history && (

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
              <h2 className="text-center mb-8">Sobre a {insurer}</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {history}
              </div>
            </div>
          </section>
        )}
        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4 opacity-20" />
                <h2 className="text-3xl font-bold text-slate-900">Dúvidas Frequentes sobre a {insurer}</h2>
                <p className="text-slate-600 mt-2">Tudo o que você precisa saber antes de contratar em Guarulhos</p>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <Card key={i} className="border-slate-200 overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <CardContent className="p-0">
                      <div className="p-6 flex items-center justify-between gap-4">
                        <h3 className="font-bold text-slate-800 text-lg">{faq.q}</h3>
                        {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                      </div>
                      {openFaq === i && (
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200 text-center">
                <p className="text-slate-700 font-medium mb-4">Sua dúvida não está aqui?</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Perguntar ao Especialista Patro
                  </Button>
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      
      <Footer />
    </div>
  );
};

export default InsurerPageTemplate;