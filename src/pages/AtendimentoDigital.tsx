import { Link } from "react-router-dom";
import { MessageCircle, Mail, Clock, MapPin, ArrowRight, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { EMPRESA, NAP_LINHA_1, NAP_LINHA_2 } from "@/config/empresa";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";
import {
  GRANDE_SP_HUB,
  GRANDE_SP_PATH,
  bairrosSaoPauloAuto,
  bairroSpSlugs,
} from "@/data/segurosSaoPauloRegional";

const EMAIL = EMPRESA.email;

const FAQS = [
  {
    question: "O atendimento digital é feito por pessoas ou por robô?",
    answer:
      "Por pessoas. O WhatsApp e o e-mail da Patro Seguros são atendidos por consultores da própria corretora, com horário comercial. Mensagens enviadas fora do horário são respondidas no dia útil seguinte, na ordem de chegada.",
  },
  {
    question: "Preciso ir até Guarulhos para contratar um seguro?",
    answer:
      "Não. Cotação, comparação de seguradoras, contratação e acompanhamento de apólice são conduzidos por WhatsApp e e-mail, com documentos enviados digitalmente. Quem preferir atendimento presencial é recebido na sede, no Cidade Maia, em Guarulhos.",
  },
  {
    question: "Quais informações devo enviar para receber uma cotação?",
    answer:
      "Para seguro auto, por exemplo: modelo e ano do veículo, CEP de pernoite e perfil do condutor principal. Para outros seguros, o consultor indica a lista mínima no primeiro contato. Com esses dados, a comparação entre as seguradoras parceiras já pode começar.",
  },
  {
    question: "O atendimento digital vale para quem mora fora de Guarulhos?",
    answer:
      "Sim. A Patro atende por canais digitais clientes em Guarulhos, na capital paulista, em toda a Grande São Paulo e, quando aplicável, em outras regiões do Brasil. A sede física continua em Guarulhos — é lá que ficam os consultores que respondem você.",
  },
];

const AtendimentoDigital = () => {
  const whatsappUrl = buildWhatsAppUrl({
    origem: "atendimento_digital",
    extraLines: ["Gostaria de atendimento digital com um consultor."],
  });

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Atendimento Digital por WhatsApp e E-mail | Patro Seguros"
        description="Fale com a Patro Seguros por WhatsApp ou e-mail: cotação, contratação e acompanhamento de seguros 100% digitais, com consultores de verdade na sede em Guarulhos."
        absoluteTitle
      />
      <FAQSchema faqs={FAQS} />
      <Header />
      <Breadcrumb items={[{ label: "Atendimento Digital" }]} />

      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3">
              Atendimento digital • Consultores de verdade
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Atendimento Digital por WhatsApp e E-mail
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Cotação, contratação e acompanhamento do seu seguro sem sair de casa — com
              atendimento humano, conduzido pela equipe da sede em Guarulhos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("atendimento-digital-hero")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <a href={`mailto:${EMAIL}?subject=Quero%20uma%20cota%C3%A7%C3%A3o%20de%20seguro`}>
                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                  {EMAIL}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Canais */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Canais oficiais de atendimento</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="bg-background rounded-lg p-6 border">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                  WhatsApp {EMPRESA.telefone}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Canal mais rápido para cotações, dúvidas de cobertura e envio de documentos.
                  As mensagens chegam com uma breve identificação de origem para agilizar o
                  atendimento.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("atendimento-digital-card")}
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  Iniciar conversa
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </article>

              <article className="bg-background rounded-lg p-6 border">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                  E-mail {EMAIL}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Indicado para envio de documentos maiores, solicitações de empresas e
                  assuntos que exigem registro formal, como endossos e acompanhamento de sinistro.
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=Atendimento%20Patro%20Seguros`}
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  Enviar e-mail
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </article>
            </div>

            <div className="mt-6 bg-muted/40 rounded-lg p-6 border flex flex-col sm:flex-row sm:items-center gap-4">
              <Clock className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <p className="text-muted-foreground">
                Atendimento em horário comercial, de segunda a sexta. Prefere falar por telefone?
                Ligue para{" "}
                <a href={`tel:${EMPRESA.telefoneE164}`} className="text-primary hover:underline font-medium">
                  <Phone className="inline h-3 w-3 mr-1" aria-hidden="true" />
                  {EMPRESA.telefone}
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Onde atendemos */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-3">Onde o atendimento digital chega</h2>
            <p className="text-muted-foreground mb-6">
              A Patro Seguros é uma corretora sediada em Guarulhos que atende clientes em toda a
              Grande São Paulo — e em outras regiões do Brasil quando aplicável — por canais
              digitais. Conheça a atuação regional:
            </p>

            <article className="bg-background rounded-lg p-6 border mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                {GRANDE_SP_HUB.h1}
              </h3>
              <p className="text-muted-foreground mb-4">{GRANDE_SP_HUB.subtitle}</p>
              <Link
                to={GRANDE_SP_PATH}
                className="text-primary font-medium hover:underline inline-flex items-center gap-1"
              >
                Ver o hub Guarulhos e Grande São Paulo
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </article>

            <h3 className="text-lg font-semibold mb-3">
              Seguro auto por bairro na capital paulista
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {bairroSpSlugs.map((slug) => {
                const b = bairrosSaoPauloAuto[slug];
                return (
                  <li key={slug}>
                    <Link
                      to={`/${slug}`}
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Seguro auto em {b.bairro}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* FAQ visível */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Perguntas frequentes sobre o atendimento digital</h2>
            <div className="space-y-4">
              {FAQS.map((f) => (
                <article key={f.question} className="bg-background rounded-lg p-6 border">
                  <h3 className="font-semibold mb-2">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* NAP */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-4">Sede da Patro Seguros</h2>
            <address className="not-italic text-muted-foreground space-y-1">
              <p>{NAP_LINHA_1}</p>
              <p>{NAP_LINHA_2}</p>
              <p>
                WhatsApp e telefone:{" "}
                <a href={`tel:${EMPRESA.telefoneE164}`} className="text-primary hover:underline">
                  {EMPRESA.telefone}
                </a>{" "}
                • E-mail:{" "}
                <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
                  {EMAIL}
                </a>
              </p>
            </address>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AtendimentoDigital;
