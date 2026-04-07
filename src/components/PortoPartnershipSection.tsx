import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Handshake } from "lucide-react";

const PortoPartnershipSection = () => {
  return (
    <section
      className="py-16 md:py-24 bg-background border-t border-border/40"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}
      aria-labelledby="crescimento-patrimonial-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Parceria Estratégica</span>
            <h2
              id="crescimento-patrimonial-heading"
              className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight"
            >
              Crescimento Patrimonial com Porto Seguro e Patro Seguros
            </h2>
            <p className="text-[14px] text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              A parceria entre a <strong>Porto Seguro</strong> — uma das maiores seguradoras do Brasil — e a{" "}
              <strong>Patro Seguros</strong> em Guarulhos oferece soluções integradas para quem busca{" "}
              <strong>alavancagem de patrimônio</strong>, proteção financeira e crescimento sustentável.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <article className="bg-card rounded-xl border p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/[0.06] flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-[15px] font-semibold mb-2 tracking-tight">
                Proteção Patrimonial Completa
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Seguros auto, residencial, empresarial e vida da Porto Seguro com condições exclusivas
                negociadas pela Patro para famílias e PMEs de Guarulhos.
              </p>
            </article>

            <article className="bg-card rounded-xl border p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/[0.06] flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-[15px] font-semibold mb-2 tracking-tight">
                Consórcio Porto — Investimento Inteligente
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Consórcio de imóveis e veículos Porto Seguro sem juros, ideal para quem planeja{" "}
                <strong>crescimento patrimonial</strong> de forma organizada e sem dívidas.
              </p>
            </article>

            <article className="bg-card rounded-xl border p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/[0.06] flex items-center justify-center mx-auto mb-4">
                <Shield className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-[15px] font-semibold mb-2 tracking-tight">
                Previdência e Vida — Futuro Seguro
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Planos de previdência privada e seguro de vida Porto Seguro para garantir o futuro
                financeiro da sua família com benefício fiscal e gestão profissional.
              </p>
            </article>
          </div>

          <div className="bg-muted rounded-xl p-6 md:p-8">
            <h3 className="text-[16px] font-bold mb-3 tracking-tight">
              Por que a Parceria Porto × Patro é Diferente?
            </h3>
            <ul className="space-y-2 text-[13px] text-muted-foreground leading-relaxed mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>
                  <strong>Atendimento local e personalizado</strong> — consultores especializados no
                  Cidade Maia, Guarulhos, que conhecem as necessidades da região.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>
                  <strong>Condições exclusivas</strong> — descontos e benefícios negociados diretamente
                  com a Porto Seguro para clientes Patro.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>
                  <strong>Visão 360° do patrimônio</strong> — integramos seguro, consórcio e previdência
                  em um planejamento único para maximizar seu crescimento patrimonial.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>
                  <strong>Suporte completo no sinistro</strong> — rede Porto com mais de 10.000 oficinas
                  e assistência 24h em todo o Brasil.
                </span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/cotacao">
                <Button className="rounded-lg text-[13px] h-10 px-6">
                  Simular Crescimento Patrimonial
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/consorcio">
                <Button variant="outline" className="rounded-lg text-[13px] h-10 px-6">
                  Ver Consórcio Porto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortoPartnershipSection;
