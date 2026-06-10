import { lazy } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  ShieldCheck, 
  AlertCircle, 
  Camera, 
  Users, 
  FileText, 
  PhoneCall,
  Car,
  Ghost,
  CloudRain,
  UserPlus,
  Truck,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá,%20preciso%20de%20ajuda%20com%20um%20sinistro.";

const CentralDeSinistro = () => {
  const steps = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Verifique se todos estão bem",
      description: "A segurança em primeiro lugar. Em caso de vítimas, acione o SAMU (192) ou Bombeiros (193)."
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-primary" />,
      title: "Não assuma culpa no local",
      description: "Evite discussões sobre responsabilidades. Deixe que a perícia e as seguradoras analisem o ocorrido."
    },
    {
      icon: <Camera className="h-6 w-6 text-primary" />,
      title: "Tire fotos e vídeos",
      description: "Registre os danos de todos os veículos, a posição deles na via e placas, além de sinalizações próximas."
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Pegue os dados dos envolvidos",
      description: "Anote nome, telefone, CPF e placa dos veículos de todos os terceiros envolvidos no evento."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Faça o boletim de ocorrência",
      description: "O B.O. é essencial em casos de roubo, furto ou quando há feridos e danos a terceiros."
    },
    {
      icon: <PhoneCall className="h-6 w-6 text-primary" />,
      title: "Acione a Patro Seguros",
      description: "Entre em contato conosco para que possamos orientar a abertura do sinistro da forma correta."
    }
  ];

  const types = [
    {
      icon: <Car className="h-8 w-8 text-orange-500" />,
      title: "Colisão",
      description: "Batidas leves ou graves. Se o carro não puder rodar, solicite o guincho imediatamente.",
      whatsappMessage: "Olá, preciso de ajuda com um sinistro de *Colisão*."
    },
    {
      icon: <Ghost className="h-8 w-8 text-orange-500" />,
      title: "Roubo ou furto",
      description: "Em caso de roubo (com ameaça) ou furto, registre o B.O. antes de qualquer outro passo.",
      whatsappMessage: "Olá, preciso de ajuda com um sinistro de *Roubo ou Furto*."
    },
    {
      icon: <CloudRain className="h-8 w-8 text-orange-500" />,
      title: "Enchente ou alagamento",
      description: "Não tente dar partida se o veículo foi submerso. Isso pode agravar os danos ao motor.",
      whatsappMessage: "Olá, preciso de ajuda com um sinistro de *Enchente ou Alagamento*."
    },
    {
      icon: <UserPlus className="h-8 w-8 text-orange-500" />,
      title: "Danos a terceiros",
      description: "Se você atingiu outro veículo ou propriedade, o seu seguro pode cobrir os reparos dele.",
      whatsappMessage: "Olá, preciso de ajuda com um sinistro de *Danos a Terceiros*."
    },
    {
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      title: "Guincho ou assistência 24h",
      description: "Para panes elétricas, mecânicas, troca de pneus ou falta de combustível (pane seca).",
      whatsappMessage: "Olá, preciso de *Assistência 24h / Guincho*."
    }
  ];

  const documents = [
    "CNH do condutor no momento do ocorrido",
    "Documento do veículo (CRLV)",
    "Apólice ou número do seguro (se tiver em mãos)",
    "Fotos e vídeos do ocorrido",
    "Boletim de ocorrência (obrigatório em alguns casos)",
    "Dados dos terceiros envolvidos (Nome, Fone, CPF, Placa)",
    "Comprovante de endereço",
    "Relato por escrito detalhando o ocorrido"
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Central de Sinistro | Patro Seguros Guarulhos"
        description="Sofreu um sinistro? Veja o que fazer em caso de colisão, roubo, furto, enchente ou danos a terceiros. Fale com a Patro Seguros pelo WhatsApp."
      />
      <Header />
      
      <main id="main-content">
        <Breadcrumb items={[{ label: "Central de Sinistro" }]} />

        {/* Hero Section */}
        <section className="relative bg-primary py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-6 animate-fade-up">
              Sofreu um sinistro? <br className="hidden md:block" />
              A Patro Seguros te ajuda agora.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-10 animate-fade-up-delay-1 leading-relaxed">
              Se aconteceu uma colisão, roubo, furto, enchente, dano ao veículo, pane ou qualquer outro imprevisto, mantenha a calma. A Patro Seguros orienta você nos primeiros passos e ajuda no acionamento junto à seguradora.
            </p>
            <div className="flex justify-center animate-fade-up-delay-2">
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("central-sinistro-hero")}
              >
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Falar com a Patro no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Immediate Steps Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">Passo a Passo</span>
              <h2 className="text-3xl font-bold mt-2 text-primary">O que fazer imediatamente após um sinistro?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sinistro Types Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-primary">Orientações por tipo de ocorrência</h2>
              
              <div className="space-y-6">
                {types.map((type, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
                    <div className="flex-shrink-0 w-16 h-16 bg-orange-50 flex items-center justify-center rounded-2xl">
                      {type.icon}
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold text-primary mb-2">{type.title}</h3>
                      <p className="text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-20 bg-primary text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none">
            <FileText className="w-full h-full" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Documentos que podem ser solicitados</h2>
                <p className="text-white/70 mb-8 text-lg">
                  Ter essa lista em mãos agiliza muito o processo de indenização ou reparo. A seguradora precisará dessas informações para validar o ocorrido.
                </p>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                      <span className="text-white/90">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <HelpCircle className="h-12 w-12 text-orange-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Dúvida sobre a documentação?</h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Cada seguradora possui processos específicos. Não se preocupe se não tiver tudo agora, a Patro Seguros vai te guiar em cada etapa para garantir que nada falte.
                </p>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-400 font-bold hover:text-orange-300 transition-colors"
                >
                  Tirar dúvidas no WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-slate-50 border border-slate-100 p-12 md:p-20 rounded-[40px]">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Precisa de ajuda agora?</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                A Patro Seguros está pronta para orientar você no momento em que mais precisa. Não tome decisões precipitadas sem nos consultar.
              </p>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("central-sinistro-cta-final")}
              >
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-16 px-10 rounded-2xl shadow-xl shadow-orange-500/20 transition-all hover:scale-105">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Falar com a Patro agora
                </Button>
              </a>
              <p className="mt-8 text-sm text-muted-foreground font-medium">Atendimento humanizado em Guarulhos e região</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CentralDeSinistro;
