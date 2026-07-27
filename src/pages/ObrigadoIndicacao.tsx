import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PartyPopper, MessageCircle, Heart, ArrowLeft, ShieldCheck, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";

const STORAGE_KEY = "patro_indicacao_success";

type SuccessPayload = {
  referrerName: string;
  referredName: string;
  insuranceType: string;
  waFriendUrl: string;
  submittedAt: number;
};

const ObrigadoIndicacao = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SuccessPayload | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        navigate("/indique-e-ganhe", { replace: true });
        return;
      }
      const parsed = JSON.parse(raw) as SuccessPayload;
      if (Date.now() - (parsed.submittedAt ?? 0) > 30 * 60 * 1000) {
        sessionStorage.removeItem(STORAGE_KEY);
        navigate("/indique-e-ganhe", { replace: true });
        return;
      }
      setData(parsed);
    } catch {
      navigate("/indique-e-ganhe", { replace: true });
    }
  }, [navigate]);

  const referrerFirst = useMemo(() => data?.referrerName?.split(" ")[0] || "", [data]);
  const referredFirst = useMemo(() => data?.referredName?.split(" ")[0] || "", [data]);

  if (!data) return null;

  return (
    <Fragment>
      <PageMeta
        title="Obrigado pela sua indicação | Patro Seguros"
        description="Recebemos sua indicação. Nossa equipe entra em contato com o indicado em até 24 horas úteis."
        noindex
        canonicalPath="/obrigado-indicacao"
      />
      <Header />

      <main className="bg-slate-50 min-h-[70vh]">
        <section className="bg-gradient-to-br from-[#003366] to-[#00509d] text-white">
          <div className="container mx-auto px-4 py-16 lg:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F2994A] rounded-full mb-6">
              <PartyPopper className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Obrigado, {referrerFirst}!
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Sua indicação de <strong>{referredFirst}</strong> foi registrada com sucesso.
              Nossa equipe entra em contato em até <strong>24 horas úteis</strong>, com atendimento consultivo e respeitoso.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 -mt-10 pb-16">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex items-center gap-2 text-[#F2994A] mb-4">
              <Heart className="h-5 w-5 fill-current" />
              <span className="text-sm font-bold uppercase tracking-wider">Sugestão amiga</span>
            </div>
            <h2 className="text-2xl font-bold text-[#003366] mb-3">
              Quer avisar {referredFirst} agora mesmo?
            </h2>
            <p className="text-muted-foreground mb-6">
              A gente já preparou uma mensagem pronta para você mandar no WhatsApp. Assim ela sabe da indicação e nosso contato não chega frio.
            </p>
            <a
              href={data.waFriendUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("obrigado-indicacao-avisar-amigo", { origin: "indique_obrigado" })}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold h-12 px-6 rounded-lg transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Avisar {referredFirst} pelo WhatsApp
            </a>

            <div className="grid sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-100 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-[#003366] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#003366]">Até 24h úteis</p>
                  <p className="text-muted-foreground">Retorno com contato humano.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-[#003366] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#003366]">LGPD respeitada</p>
                  <p className="text-muted-foreground">Dados usados só para este contato.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="h-5 w-5 text-[#003366] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#003366]">Você é lembrado</p>
                  <p className="text-muted-foreground">Cada indicação é registrada em seu nome.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/indique-e-ganhe">
              <Button variant="outline" className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" /> Fazer outra indicação
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">Voltar para a página inicial</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </Fragment>
  );
};

export default ObrigadoIndicacao;
