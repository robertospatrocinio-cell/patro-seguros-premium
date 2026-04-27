import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles, FileText, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import FAQSchema from "@/components/FAQSchema";

interface Props {
  /** Onde o banner está sendo exibido (para tracking). Ex: 'home', 'seguro-rural'. */
  source: string;
  /** Variante visual: 'full' (destaque) ou 'compact' (faixa enxuta). Default: 'full'. */
  variant?: "full" | "compact";
}

const WA_URL =
  "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20quero%20aproveitar%20as%20condi%C3%A7%C3%B5es%20especiais%20da%20Semana%20Agrishow%202026%20para%20seguro%20de%20m%C3%A1quinas%20agr%C3%ADcolas.";

const AGRISHOW_FAQS = [
  {
    question: "Onde encontro o guia completo da Agrishow 2026?",
    answer:
      "O guia completo da Agrishow 2026 — com datas, local em Ribeirão Preto, marcas presentes (John Deere, Case IH, New Holland, Valtra, Massey Ferguson, Jacto, Stara e outras) e condições especiais da Patro Seguros — está disponível no nosso blog em /blog/agrishow-2026-ribeirao-preto-seguro-maquinas-agricolas.",
  },
  {
    question: "Como peço cotação de seguro para máquinas agrícolas durante a Agrishow?",
    answer:
      "Você pode solicitar a cotação de três formas: (1) preenchendo o formulário em /seguro-maquinas-agricolas, (2) falando direto pelo WhatsApp (11) 5199-7500 ou (3) enviando a nota fiscal e dados da máquina por e-mail para contato@patroseguros.com.br. Devolvemos a comparação entre seguradoras em até 2 horas úteis.",
  },
  {
    question: "Quais condições especiais a Patro Seguros oferece na Semana Agrishow 2026?",
    answer:
      "Durante a Semana Agrishow 2026, oferecemos cotação prioritária com retorno em até 2 horas úteis, comparação entre 6 seguradoras simultaneamente, condições diferenciadas em coberturas adicionais (quebra de máquina, danos elétricos e RC do operador), parcelamento facilitado e atendimento consultivo com análise técnica do uso real do equipamento.",
  },
  {
    question: "A Patro Seguros atende produtores rurais de outros estados além de São Paulo?",
    answer:
      "Sim. A Patro Seguros atende produtores rurais e empresas do agronegócio em todo o território brasileiro, com cotação 100% online, assinatura digital e suporte humano por WhatsApp e telefone. Já protegemos máquinas em propriedades do Sul ao Norte do país, incluindo MATOPIBA, Mato Grosso, Goiás, Minas Gerais e o cinturão canavieiro paulista.",
  },
];

const AgrishowPromoBanner = ({ source, variant = "full" }: Props) => {
  const isCompact = variant === "compact";
  return (
    <>
      {variant === "full" && <FAQSchema faqs={AGRISHOW_FAQS} />}
    <section
      aria-labelledby={`agrishow-banner-${source}`}
      className={isCompact ? "py-6 bg-primary" : "py-10 md:py-14 bg-primary"}
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto ${isCompact ? "text-left md:flex md:items-center md:justify-between md:gap-6" : "text-center"}`}>
          <div className={isCompact ? "mb-4 md:mb-0" : ""}>
            <span className="inline-flex items-center gap-1.5 bg-[hsl(var(--cta))]/20 text-[hsl(var(--cta))] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <Sparkles className="h-3 w-3" aria-hidden="true" /> Semana Agrishow 2026
            </span>
            <h2
              id={`agrishow-banner-${source}`}
              className={`text-primary-foreground font-bold ${isCompact ? "text-base md:text-lg" : "text-xl md:text-2xl mb-2"}`}
            >
              Condições especiais em Seguro de Máquinas Agrícolas
            </h2>
            {!isCompact && (
              <p className="text-primary-foreground/80 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                Cotação prioritária em até 2 horas úteis, comparação entre 6 seguradoras e atendimento em todo o Brasil. Veja o guia completo da feira em Ribeirão Preto.
              </p>
            )}
            {!isCompact && (
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-8 text-left">
                {[
                  { icon: FileText, step: "1", title: "Dados da máquina", desc: "Marca, modelo, ano, valor e uso (própria, arrendada ou prestação de serviço)." },
                  { icon: Send, step: "2", title: "Envio da NF", desc: "Mande a nota fiscal pelo WhatsApp, e-mail ou formulário." },
                  { icon: Clock, step: "3", title: "Resposta em 2h úteis", desc: "Comparativo entre 6 seguradoras com a melhor relação coberturas × preço." },
                ].map(({ icon: Icon, step, title, desc }) => (
                  <li
                    key={step}
                    className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] text-xs font-bold">
                        {step}
                      </span>
                      <Icon className="h-4 w-4 text-primary-foreground/80" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-primary-foreground">{title}</h3>
                    </div>
                    <p className="text-xs text-primary-foreground/70 leading-relaxed">{desc}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className={`flex flex-col sm:flex-row gap-3 ${isCompact ? "md:shrink-0" : "justify-center"}`}>
            <Link
              to="/blog/agrishow-2026-ribeirao-preto-seguro-maquinas-agricolas"
              className="w-full sm:w-auto"
            >
              <Button
                size={isCompact ? "default" : "lg"}
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
                Ler guia da Agrishow <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              to="/seguro-maquinas-agricolas"
              onClick={() => trackCotacaoClick(`agrishow-banner-${source}`)}
              className="w-full sm:w-auto"
            >
              <Button
                size={isCompact ? "default" : "lg"}
                variant="cta"
                className="w-full sm:w-auto font-semibold"
              >
                Pedir Cotação <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`agrishow-banner-${source}`)}
              className="w-full sm:w-auto"
            >
              <Button
                size={isCompact ? "default" : "lg"}
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AgrishowPromoBanner;
