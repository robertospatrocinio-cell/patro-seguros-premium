import { Link } from "react-router-dom";
import { Star, MapPin, ExternalLink as ExternalLinkIcon, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import ExternalLink from "@/components/ExternalLink";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { trackInternalLinkClick, trackWhatsAppClick } from "@/lib/tracking";
import { EMPRESA, GOOGLE_MAPS_URL, NAP_LINHA_1, NAP_LINHA_2, WHATSAPP_URL_BASE } from "@/config/empresa";

const STEPS = [
  { title: "Abra o perfil no Google Maps", description: "Confira o nome e o endereço da Patro Seguros. Na seção de avaliações, procure a opção de escrever uma avaliação." },
  { title: "Entre na sua conta Google", description: "O Google pode pedir seu login. Não envie sua senha ou códigos de acesso à Patro ou a terceiros." },
  { title: "Escolha livremente sua nota", description: "Use a nota que representa sua experiência real. Se quiser comentar, escreva com suas próprias palavras, incluindo pontos positivos ou o que pode melhorar." },
  { title: "Revise antes de publicar", description: "Não inclua CPF, número de apólice, dados de saúde ou de terceiros. A exibição e o prazo de publicação dependem das regras e da moderação do Google." },
];

const FAQS = [
  { question: "Preciso dar uma nota positiva?", answer: "Não. A nota e o comentário são de sua livre escolha. Não oferecemos desconto, brinde ou qualquer vantagem por uma avaliação, e ela não altera seu atendimento." },
  { question: "Posso avaliar sem ter contratado um seguro?", answer: "Você pode relatar um atendimento real que recebeu, inclusive durante uma cotação. Descreva apenas o que vivenciou, sem afirmar que contratou um produto se isso não aconteceu." },
  { question: "Preciso mencionar um bairro ou tipo de seguro?", answer: "Não. Não é necessário usar palavras-chave, citar bairros ou seguir um modelo. Se decidir escrever, relate somente detalhes verdadeiros que considere úteis, sem expor informações pessoais." },
  { question: "Como encontro a opção de avaliar?", answer: "Abra o perfil pelo botão desta página e procure a seção de avaliações no Google Maps. A posição dos controles pode variar entre celular e computador; pode ser necessário entrar na sua conta Google." },
  { question: "Posso editar ou excluir minha avaliação?", answer: "Sim. No Google Maps, acesse suas contribuições e avaliações para localizar as opções de edição ou exclusão. Esses controles e a publicação são administrados pelo Google." },
  { question: "Posso falar com a equipe antes ou depois de avaliar?", answer: "Sim. Nossos canais de contato estão disponíveis para elogios, dúvidas e reclamações, independentemente de sua nota. Você não precisa entrar em contato antes de publicar uma avaliação." },
];

const AvaliarNoGoogle = () => {
  const trackProfile = (source: string) => trackInternalLinkClick({
    source: `avaliar-no-google:${source}`, destination: GOOGLE_MAPS_URL, label: "Abrir perfil no Google Maps",
  });

  return (
    <>
      <PageMeta
        title="Avaliar Patro Seguros no Google — Corretora em Guarulhos"
        description="Conte sua experiência real com a Patro Seguros no Google. Escolha livremente sua nota, sem incentivos ou modelos de elogio. Acesse o perfil oficial."
      />
      <FAQSchema faqs={FAQS} />
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-background outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: "Sobre", href: "/sobre" }, { label: "Avaliar no Google", href: "/avaliar-no-google" }]} />
        </div>
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="section-label">Sua experiência importa</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">Avalie a Patro Seguros no Google</h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Se você recebeu atendimento da Patro, compartilhe sua experiência real. A nota é sua escolha, seja positiva, neutra ou negativa. Avaliar é opcional e não interfere no seu atendimento.
            </p>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackProfile("hero")}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <Star className="h-5 w-5" aria-hidden="true" /> Abrir perfil no Google Maps
              <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground">No perfil, procure a seção de avaliações. O botão não abre diretamente o formulário.</p>
          </div>
        </section>
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Como compartilhar sua opinião</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map((step, idx) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
                  <div aria-hidden="true" className="h-9 w-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-3">{idx + 1}</div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="py-14 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">Uma avaliação livre, sem texto pronto</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <MessageSquare className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
                <h3 className="font-bold text-foreground">O que você pode contar</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Como foi o atendimento? Suas dúvidas foram esclarecidas? Houve algo que poderia ter sido melhor? São perguntas opcionais, não um roteiro para sua avaliação.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-bold text-foreground">Sem recompensa ou pressão</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Não pedimos uma nota específica nem oferecemos vantagens. Não copie relatos de outras pessoas e não publique dados de contratos, documentos, sinistros ou saúde.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Dúvidas sobre avaliações</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-border bg-card p-5">
                  <summary className="cursor-pointer font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{faq.question}</summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="py-14 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-foreground">Contato da Patro Seguros</h2>
            <p className="mt-3 text-muted-foreground">Nossos canais atendem elogios, dúvidas e reclamações, sem exigir uma avaliação prévia.</p>
            <address className="mt-5 not-italic text-sm text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">{EMPRESA.nomeFantasia}</p>
              <p>{NAP_LINHA_1}</p><p>{NAP_LINHA_2}</p>
              <p><a href={`tel:${EMPRESA.telefoneE164}`} className="underline underline-offset-4">{EMPRESA.telefone}</a></p>
              <p><a href={`mailto:${EMPRESA.email}`} className="underline underline-offset-4">{EMPRESA.email}</a></p>
              <p>{EMPRESA.horario}</p>
            </address>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <ExternalLink href={GOOGLE_MAPS_URL} onClick={() => trackProfile("contato")} className="inline-flex min-h-11 items-center gap-2 text-primary underline underline-offset-4"><MapPin className="h-4 w-4" aria-hidden="true" />Ver no Google Maps</ExternalLink>
              <a href={WHATSAPP_URL_BASE} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("avaliar-no-google:contato")} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Falar no WhatsApp<span className="sr-only"> (abre em nova aba)</span></a>
              <Link to="/contato" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Outras formas de contato</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AvaliarNoGoogle;
