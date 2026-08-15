import { useState, useMemo, memo, useEffect, useCallback, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, MapPin, Building2, Car, HeartPulse, ShieldCheck, Award, Users, Star, Home, Truck } from "lucide-react";
import { EMPRESA } from "@/config/empresa";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

// Lazy components
const QuickLeadForm = lazy(() => import("@/components/QuickLeadForm").then(m => ({ default: m.QuickLeadForm })));
const LocalTestimonials = lazy(() => import("@/components/LocalTestimonials"));

const WHATSAPP_URL = `https://wa.me/551151997500?text=${encodeURIComponent("Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de seguro.")}`;

const PRODUCT_CARDS = [
  { icon: Car, title: "Seguro Auto", desc: "Proteção completa para seu veículo.", path: "/seguro-auto-guarulhos" },
  { icon: Home, title: "Residencial", desc: "Segurança para casa ou apartamento.", path: "/seguro-residencial" },
  { icon: HeartPulse, title: "Vida", desc: "Planejamento e proteção familiar.", path: "/seguro-vida-guarulhos" },
  { icon: HeartPulse, title: "Saúde", desc: "Planos PME e familiares.", path: "/planos-de-saude" },
  { icon: Building2, title: "Empresarial", desc: "Cobertura robusta para o seu negócio.", path: "/seguro-empresarial-guarulhos" },
  { icon: Truck, title: "Frota", desc: "Gestão completa para empresas.", path: "/seguro-frota-empresas-guarulhos" },
];

const BairrosChips = [
  { name: "Cidade Maia", path: "/seguros-guarulhos/seguros-cidade-maia-guarulhos" },
  { name: "Vila Galvão", path: "/seguros-guarulhos/seguros-vila-galvao-guarulhos" },
  { name: "Cumbica", path: "/seguros-guarulhos/seguros-cumbica-guarulhos" },
  { name: "Bonsucesso", path: "/seguros-guarulhos/seguros-bonsucesso-guarulhos" },
  { name: "Pimentas", path: "/seguros-guarulhos/seguros-pimentas-guarulhos" },
];

const Index = () => {
  return (
    <>
      <PageMeta
        title="Seguros em Guarulhos | Patro Seguros — Compare 16 Seguradoras"
        description="Corretora de seguros em Guarulhos com nota 4.9 no Google. Compare 16+ seguradoras em auto, residencial, vida, saúde e empresarial. Cotação em até 2h."
      />
      <Header />
      <main id="main-content">
        {/* HERO SECTION */}
        <section className="relative py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Seguros em Guarulhos — Compare 16 seguradoras e economize</h1>
                <p className="text-xl text-white/90 mb-8">Atendimento consultivo, registro SUSEP e nota 4.9 no Google. Cotação comparativa em até 2 horas úteis.</p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button size="lg" asChild className="bg-[#F2994A] hover:bg-[#d98842] text-white">
                    <Link to="/cotacao" onClick={() => trackCotacaoClick("hero")}>Cotar agora com especialistas</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-white border-white/20">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hero")}>Falar no WhatsApp</a>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                   <Star className="text-yellow-400 fill-current w-4 h-4" /> 4.9 · 67 avaliações no Google
                </div>
              </div>
              <div className="lg:ml-auto">
                <Suspense fallback={<div className="h-[400px] w-full bg-slate-800 rounded-2xl animate-pulse" />}>
                    <QuickLeadForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* Confiança */}
        <section className="py-8 bg-slate-50 border-b">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-700">
             <span>SUSEP 212113511</span>
             <span>2.500+ clientes</span>
             <span>16+ seguradoras</span>
             <span>Nota 4.9 no Google</span>
          </div>
        </section>

        {/* Produtos */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O que você quer proteger?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PRODUCT_CARDS.map(p => (
              <Link key={p.title} to={p.path} className="flex flex-col items-center text-center p-6 bg-white border rounded-xl hover:shadow-lg transition group">
                <p.icon className="w-10 h-10 text-[#003366] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-slate-500">{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 bg-white container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como funciona a cotação</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                    <h3 className="font-bold mb-2">Você envia os dados</h3>
                    <p className="text-slate-600">Preencha nosso formulário rápido ou nos chame no WhatsApp.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                    <h3 className="font-bold mb-2">Comparamos em 16+ seguradoras</h3>
                    <p className="text-slate-600">Analisamos as melhores taxas e coberturas para o seu perfil.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                    <h3 className="font-bold mb-2">Você recebe a proposta em até 2h</h3>
                    <p className="text-slate-600">Propostas claras e detalhadas enviadas direto no seu celular.</p>
                </div>
            </div>
        </section>

        {/* Avaliações */}
        <section className="py-16 bg-slate-50 container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
            <Suspense fallback={<div>Carregando avaliações...</div>}>
                <LocalTestimonials />
            </Suspense>
        </section>

        {/* Empresas */}
        <section className="py-16 bg-white container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Proteção especializada para empresas em Guarulhos</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Frota", path: "/seguro-frota" },
                    { title: "Transporte e Carga", path: "/seguro-transporte" },
                    { title: "Saúde PME", path: "/plano-saude-empresarial" },
                    { title: "Responsabilidade Civil", path: "/seguro-rc" }
                ].map(e => (
                    <Link key={e.title} to={e.path} className="p-6 border rounded-xl hover:bg-slate-50 transition flex items-center justify-between group">
                        <span className="font-bold">{e.title}</span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Button variant="link" asChild>
                    <Link to="/seguro-empresa">Conhecer Patro Empresas →</Link>
                </Button>
            </div>
        </section>

        {/* Seção Local */}
        <section className="py-16 bg-slate-50 container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Corretora de seguros em Guarulhos e região</h2>
            <div className="flex flex-wrap gap-3 justify-center">
                {BairrosChips.map(b => (
                    <Button key={b.name} variant="outline" asChild>
                        <Link to={b.path}>{b.name}</Link>
                    </Button>
                ))}
            </div>
        </section>
        
        {/* Mapa + NAP */}
        <section className="py-16 container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa sede em Guarulhos</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.626387083049!2d-46.52423982464134!3d-23.44577887884841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8b9a2c1f9d55%3A0x17b8f95c52c29015!2sAv.%20Salgado%20Filho%2C%202120%20-%20Vila%20Rio%20de%20Janeiro%2C%20Guarulhos%20-%20SP!5e0!3m2!1sen!2sbr!4v1700000000000!5m2!1sen!2sbr" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                        title="Localização Patro Seguros no Google Maps"
                    ></iframe>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-2xl text-[#003366]">Patro Corretora de Seguros LTDA</h3>
                    <div className="space-y-2 text-slate-600">
                        <p className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>Av. Salgado Filho, 2120 — Sala 219 — Ed. Via Alameda<br/>Cidade Maia, Guarulhos/SP — CEP 07115-000</span>
                        </p>
                        <p>Telefone: (11) 5199-7500</p>
                        <p>Horário: Seg–Sex 8h30–18h</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;