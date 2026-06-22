import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle, PartyPopper, ArrowLeft, ShieldCheck, Clock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { trackQuoteSubmitted } from "@/lib/tracking";

const STORAGE_KEY = "patro_cotacao_success";

type SuccessPayload = {
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
  message: string;
  assetLines: string[];
  waUrl: string;
  leadId?: string | null;
  submittedAt: number;
};

const CotacaoObrigado = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SuccessPayload | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        navigate("/cotacao", { replace: true });
        return;
      }
      const parsed = JSON.parse(raw) as SuccessPayload;
      // Expire after 30 minutes to avoid stale state on direct revisits.
      if (Date.now() - (parsed.submittedAt ?? 0) > 30 * 60 * 1000) {
        sessionStorage.removeItem(STORAGE_KEY);
        navigate("/cotacao", { replace: true });
        return;
      }
      setData(parsed);
      trackQuoteSubmitted(parsed.insuranceType, { origin: "cotacao_obrigado" });
    } catch {
      navigate("/cotacao", { replace: true });
    }
  }, [navigate]);

  const firstName = useMemo(() => data?.name?.split(" ")[0] || "", [data]);

  if (!data) return null;

  return (
    <Fragment>
      <PageMeta
        title="Cotação enviada com sucesso | Patro Seguros"
        description="Sua solicitação de cotação foi recebida. Em até 2 horas úteis um especialista da Patro Seguros entra em contato."
        noindex
      />
      <Header />
      <main id="main-content" className="outline-none bg-slate-50/50 min-h-screen pb-20">
        <section className="relative pt-12 pb-10 lg:pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5 -skew-y-3 origin-top-left -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6 shadow-lg shadow-emerald-200/40">
                <PartyPopper className="w-12 h-12 text-emerald-600" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                Pedido enviado, <span className="text-emerald-600">{firstName}!</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                Recebemos sua solicitação e um especialista da Patro Seguros entra em contato em
                até <strong className="text-slate-900">2 horas úteis</strong>. Uma cópia foi enviada para o seu e-mail.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 lg:p-10">
            <Button
              asChild
              size="lg"
              className="w-full h-14 text-lg font-bold shadow-xl shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 mb-6"
            >
              <a href={data.waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar agora no WhatsApp
              </a>
            </Button>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Resumo da sua solicitação
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Tipo de seguro</dt>
                  <dd className="font-semibold text-slate-900 capitalize text-right">{data.insuranceType}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Nome</dt>
                  <dd className="font-semibold text-slate-900 text-right">{data.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">WhatsApp</dt>
                  <dd className="font-semibold text-slate-900 text-right">{data.phone}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">E-mail</dt>
                  <dd className="font-semibold text-slate-900 truncate text-right">{data.email}</dd>
                </div>
                {data.assetLines.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-slate-200">
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Dados informados
                    </dt>
                    <ul className="space-y-1">
                      {data.assetLines.map((l, i) => (
                        <li key={i} className="text-slate-700">{l.replace(/^- /, "")}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.message && (
                  <div className="pt-3 mt-3 border-t border-slate-200">
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Observações
                    </dt>
                    <dd className="text-slate-700 whitespace-pre-wrap">{data.message}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { icon: <Clock className="w-4 h-4" />, label: "Resposta em até 2h úteis" },
                { icon: <ShieldCheck className="w-4 h-4" />, label: "16+ seguradoras comparadas" },
                { icon: <Phone className="w-4 h-4" />, label: "Atendimento humano" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2"
                >
                  <span className="text-emerald-600">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="h-12">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao início
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12"
                onClick={() => sessionStorage.removeItem(STORAGE_KEY)}
              >
                <Link to="/cotacao">Nova cotação</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default CotacaoObrigado;