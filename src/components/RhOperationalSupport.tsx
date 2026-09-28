import { Link } from "react-router-dom";
import { ClipboardList, Headphones, TrendingUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExternalLink from "@/components/ExternalLink";
import { WHATSAPP_URL_BASE } from "@/config/empresa";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

const RH_WHATSAPP_MESSAGE = "Olá! Gostaria de entender como funciona a gestão de saúde e benefícios para minha empresa.";

const benefits = [
  {
    title: "Gestão de Movimentações",
    description: "Inclusões, exclusões e alterações cadastrais de colaboradores tratadas diretamente pelo nosso time.",
    Icon: ClipboardList,
  },
  {
    title: "Canal Direto com o Colaborador",
    description: "Suporte a dúvidas sobre rede credenciada, emissão de 2ª via e autorizações sem sobrecarregar o seu RH.",
    Icon: Headphones,
  },
  {
    title: "Consultoria e Pós-Venda Ativo",
    description: "Acompanhamento de sinistralidade e negociação em renovações de apólice corporativa.",
    Icon: TrendingUp,
  },
];

interface RhOperationalSupportProps {
  trackingContext?: string;
}

const RhOperationalSupport = ({ trackingContext = "rh-operacional" }: RhOperationalSupportProps) => {
  const whatsappUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(RH_WHATSAPP_MESSAGE)}`;

  return (
    <section className="py-16 md:py-20 bg-muted/30 border-y" aria-labelledby={`${trackingContext}-heading`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="max-w-3xl mb-10">
          <span className="section-label">Benefícios corporativos</span>
          <h2 id={`${trackingContext}-heading`} className="mt-3 text-2xl md:text-3xl">
            A Patro atua como extensão operacional do RH da sua empresa (sem custo adicional)
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map(({ title, description, Icon }) => (
            <article key={title} className="premium-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/cotacao?tipo=empresarial" onClick={() => trackCotacaoClick(`${trackingContext}:cotacao`)}>
            <Button className="w-full sm:w-auto">Solicitar cotação empresarial</Button>
          </Link>
          <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick(`${trackingContext}:whatsapp`)}>
            <Button variant="outline" className="w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Entender a gestão de benefícios
            </Button>
          </ExternalLink>
        </div>
      </div>
    </section>
  );
};

export default RhOperationalSupport;