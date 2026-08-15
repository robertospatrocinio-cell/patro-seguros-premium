import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MessageCircle, CheckCircle, ArrowLeft, ShieldCheck, Clock, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";

const ContatoObrigado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [waUrl, setWaUrl] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const url = params.get("wa");
    
    // If no WhatsApp URL, redirect to contact page to avoid empty success page
    if (!url) {
      navigate("/contato", { replace: true });
      return;
    }
    
    setWaUrl(decodeURIComponent(url));
    
    // Track conversion
    try {
      window.fbq?.("track", "Lead", {
        content_name: "contato-sucesso",
        content_category: "contato",
      });
      window.gtag?.("event", "conversion", {
        send_to: "AW-CONVERSION_ID", // Placeholder, adjust if specific ID is known
        event_category: "contato",
        event_label: "sucesso",
      });
    } catch (e) {
      console.warn("Tracking failed", e);
    }
  }, [location, navigate]);

  if (!waUrl) return null;

  return (
    <Fragment>
      <PageMeta
        title="Mensagem enviada com sucesso | Patro Seguros"
        description="Sua mensagem foi recebida. Em até 2 horas úteis um especialista da Patro Seguros entra em contato via WhatsApp ou e-mail."
        noindex
      />
      <Header />
      <main id="main-content" className="bg-slate-50/50 min-h-screen pb-20">
        <section className="relative pt-12 pb-10 lg:pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-lg shadow-primary/5">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                Mensagem enviada!
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                Obrigado pelo contato. Um consultor especializado da Patro Seguros responderá sua mensagem em
                até <strong className="text-slate-900">2 horas úteis</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 lg:p-10">
            <div className="text-center mb-8">
              <p className="text-slate-500 mb-6">
                Para um atendimento ainda mais rápido, clique no botão abaixo e inicie a conversa no WhatsApp agora mesmo.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full h-14 text-lg font-bold shadow-xl shadow-green-600/20 bg-[#25D366] hover:bg-[#1ebd5e] text-white border-none"
              >
                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("contato-sucesso-btn", { origin: "contato_obrigado" })}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Iniciar Conversa no WhatsApp
                </a>
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: <Clock className="w-4 h-4" />, label: "Resposta em até 2h" },
                { icon: <ShieldCheck className="w-4 h-4" />, label: "Dados Protegidos" },
                { icon: <Phone className="w-4 h-4" />, label: "Suporte Consultivo" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2"
                >
                  <span className="text-primary">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <Button asChild variant="ghost" className="h-12 text-slate-500 hover:text-primary">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* SEO Local Info */}
        <section className="container mx-auto px-4 mt-12">
            <div className="max-w-2xl mx-auto text-center text-[10px] text-slate-400 uppercase tracking-widest">
                Patro Seguros — Cidade Maia, Guarulhos/SP — Atendimento Nacional
            </div>
        </section>
      </main>
      <Footer />
      
      {/* Floating WhatsApp for conversion persistence */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <a 
          href={waUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </Fragment>
  );
};

export default ContatoObrigado;
