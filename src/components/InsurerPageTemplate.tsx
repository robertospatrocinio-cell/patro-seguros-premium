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
  const WHATSAPP_URL = `https://wa.me/551151997500?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20da%20${insurer}%20em%20Guarulhos.`;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const comparisonData = [
    { name: "Porto Seguro", cost: "Premium", coverage: "Máxima", support: "5 Estrelas", franchise: "Flexível" },
    { name: "Tokio Marine", cost: "Equilibrado", coverage: "Alta", support: "5 Estrelas", franchise: "Competitiva" },
    { name: "Allianz", cost: "Específico", coverage: "Alta", support: "4 Estrelas", franchise: "Padronizada" },
    { name: "Azul Seguros", cost: "Econômico", coverage: "Essencial", support: "4 Estrelas", franchise: "Baixa" },
    { name: "Suhai", cost: "Mínimo", coverage: "Roubo/Furto", support: "3 Estrelas", franchise: "Isenta (Indenização)" },
    { name: "HDI Seguros", cost: "Equilibrado", coverage: "Média-Alta", support: "5 Estrelas", franchise: "Bate-Pronto" },
  ];


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
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">
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