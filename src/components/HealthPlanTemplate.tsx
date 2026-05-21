import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

interface PlanPageProps {
  operator: string;
  description: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
  accentColor: string;
}

const HealthPlanTemplate = ({ operator, description, benefits, faqs, accentColor }: PlanPageProps) => {
  const WHATSAPP_URL = `https://wa.me/551151997500?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20do%20plano%20de%20sa%C3%BAde%20${operator}%20em%20Guarulhos.`;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={`${operator} Guarulhos | Planos de Saúde e Preços | Patro Seguros`}
        description={`Confira preços e rede credenciada do plano de saúde ${operator} em Guarulhos. Cotação online gratuita em 2h com especialistas em saúde local.`}
      />
      <BreadcrumbSchema items={[
        { name: "Início", url: CANONICAL_BASE_URL },
        { name: "Planos de Saúde", url: `${CANONICAL_BASE_URL}/planos-de-saude` },
        { name: operator, url: window.location.href },
      ]} />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className={`py-16 md:py-24 relative overflow-hidden`} style={{ background: `linear-gradient(135deg, ${accentColor}10 0%, white 100%)` }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600">
                Operadora Parceira em Guarulhos
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
                Plano de Saúde <span style={{ color: accentColor }}>{operator}</span> em Guarulhos
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl" style={{ backgroundColor: accentColor }}>
                  Solicitar Tabela de Preços
                </Button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold border-2">
                    <MessageCircle className="mr-2 h-5 w-5 text-green-500" />
                    Falar com Especialista
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits & Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Por que escolher {operator} em Guarulhos?</h2>
                <div className="grid grid-cols-1 gap-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="h-6 w-6 mt-0.5" style={{ color: accentColor }} />
                      <p className="font-medium text-slate-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="border-none shadow-2xl bg-slate-900 text-white overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-2xl font-bold">Cote agora e economize</h3>
                  <p className="text-slate-400 text-sm">
                    Nossa equipe analisa sua necessidade e envia o comparativo completo em até 2 horas.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Rede credenciada atualizada em Guarulhos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Opções para MEI e Empresas
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Redução de carência de outros planos
                    </li>
                  </ul>
                  <Button className="w-full h-12 font-bold text-black bg-white hover:bg-slate-100">
                    Ver Preços de {operator}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <Info className="h-10 w-10 mx-auto mb-4" style={{ color: accentColor }} />
              <h2 className="text-3xl font-bold">Dúvidas Frequentes</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-lg mb-2 text-slate-900">{faq.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthPlanTemplate;