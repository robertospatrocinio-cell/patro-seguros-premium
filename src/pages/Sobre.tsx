import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Shield, Target, Heart, Award, Phone, MessageCircle, Users, Clock, CheckCircle, Play, Linkedin, Instagram, User, BadgeCheck, ExternalLink, BookOpen, MapPin, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import PersonAuthorsSchema from "@/components/PersonAuthorsSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import socioRoberto from "@/assets/socio-roberto.webp";
import sociaSandra from "@/assets/socia-sandra.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o.";

const stats = [
  { value: "+30", label: "Anos de Experiência", desc: "Combinados entre os sócios" },
  { value: "2.500+", label: "Clientes Atendidos", desc: "Pessoas, famílias e empresas" },
  { value: "1.800+", label: "Sinistros Resolvidos", desc: "Com acompanhamento completo" },
  { value: "4.7", label: "Nota no Google", desc: "27 avaliações reais" },
];

const equipe = [
  { nome: "Roberto", cargo: "Sócio-Fundador · Diretor Comercial", iniciais: "RP" },
  { nome: "Sandra", cargo: "Sócia-Fundadora · Diretora de Operações", iniciais: "SP" },
  { nome: "Letícia", cargo: "Corretora — Planos de Saúde", iniciais: "LE" },
  { nome: "João Carlos", cargo: "Corretor — Seguros Empresariais", iniciais: "JC" },
  { nome: "Luciana", cargo: "Corretora — Seguros Pessoais", iniciais: "LU" },
  { nome: "Gabriela", cargo: "Assistente Administrativa", iniciais: "GA" },
];

const Sobre = () => {
  return (
    <Fragment>
      <PageMeta title="Sobre a Patro Seguros | Corretora em Guarulhos" description="Conheça a Patro Seguros, sua corretora em Guarulhos. Atendimento especializado, consultoria de seguros e parceria com as melhores seguradoras do mercado." />
      <PersonAuthorsSchema />
      <SpeakableSchema url="https://www.patroseguros.com.br/sobre" />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Sobre Nós" }]} />

        {/* Hero */}
        <section className="gradient-hero py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <SeloMelhorCorretora size="lg" priority />
            </div>
            <h1 className="text-white mb-4">Corretora de Seguros em Guarulhos</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Uma consultoria de seguros feita por pessoas reais — para cuidar, com método e proximidade, de famílias, empresários e produtores em Guarulhos e em todo o Brasil.
            </p>
          </div>
        </section>

        {/* Números */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm font-semibold mt-1">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="mb-8">Nossa História</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A <strong className="text-foreground">Patro Corretora de Seguros</strong> nasceu com um propósito claro:
                transformar a forma como as pessoas e empresas de Guarulhos se protegem. Fundada por <strong className="text-foreground">Roberto e Sandra Patrocínio</strong>,
                profissionais com mais de 30 anos de experiência combinada no mercado de seguros, nossa corretora se destaca
                pelo atendimento humanizado e pela busca incansável pelas melhores soluções para cada cliente.
              </p>
              <p>
                Ao longo dos anos, construímos parcerias sólidas com as maiores seguradoras do Brasil — mais de 16 seguradoras
                e 20 operadoras de saúde — o que nos permite oferecer uma ampla gama de produtos com as melhores condições do
                mercado. Mas o que realmente nos diferencia não são apenas os produtos que oferecemos — é a forma como
                cuidamos de cada cliente.
              </p>
              <p>
                Hoje, somos reconhecidos como a <strong className="text-foreground">melhor corretora de seguros de Guarulhos</strong>,
                com nota 4.7 no Google e mais de 2.500 clientes atendidos — famílias, profissionais liberais, empresas e
                produtores rurais que confiam na nossa expertise e compromisso com a proteção de seus patrimônios e vidas.
              </p>
            </div>
          </div>
        </section>

        {/* Sócios */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-center mb-4">Quem Está Por Trás da Patro</h2>
            <p className="text-center text-muted-foreground mb-12 text-sm max-w-xl mx-auto">Conheça os fundadores que lideram a corretora com experiência, ética e dedicação.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Roberto */}
              <div className="bg-background rounded-2xl overflow-hidden border shadow-sm">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={socioRoberto} alt="Roberto Patrocínio — Sócio-fundador da Patro Seguros" width={400} height={300} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Roberto Patrocínio</h3>
                  <p className="text-sm text-primary font-medium mb-3">Sócio-Fundador · Diretor Comercial</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Especialista em seguros empresariais, agronegócio e responsabilidade civil. Com ampla experiência no mercado,
                    Roberto lidera a área comercial e é responsável pelas parcerias estratégicas com seguradoras e montadoras
                    de máquinas agrícolas. Sua abordagem consultiva e foco em resultados fazem a diferença para empresas e
                    produtores rurais de todo o Brasil.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="bg-muted px-2 py-1 rounded">Empresarial</span>
                    <span className="bg-muted px-2 py-1 rounded">Agronegócio</span>
                    <span className="bg-muted px-2 py-1 rounded">RC</span>
                  </div>
                  <div className="flex gap-2">
                    <a href="https://linkedin.com/in/roberto-patrocinio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                    <a href="https://www.instagram.com/patroseguros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-3.5 w-3.5" /> Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* Sandra */}
              <div className="bg-background rounded-2xl overflow-hidden border shadow-sm">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={sociaSandra} alt="Sandra Patrocínio — Sócia-fundadora da Patro Seguros" width={400} height={300} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Sandra Patrocínio</h3>
                  <p className="text-sm text-primary font-medium mb-3">Sócia-Fundadora · Diretora de Operações</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Especialista em planos de saúde, seguros pessoais e gestão de sinistros. Sandra é a responsável pela
                    operação diária da corretora e pelo atendimento de excelência que é marca registrada da Patro. Seu
                    cuidado com cada detalhe e dedicação ao cliente garantem que ninguém fique sem resposta ou orientação.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="bg-muted px-2 py-1 rounded">Planos de Saúde</span>
                    <span className="bg-muted px-2 py-1 rounded">Seguros Pessoais</span>
                    <span className="bg-muted px-2 py-1 rounded">Sinistros</span>
                  </div>
                  <div className="flex gap-2">
                    <a href="https://linkedin.com/in/sandra-patrocinio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                    <a href="https://www.instagram.com/patroseguros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-3.5 w-3.5" /> Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA direto com sócios */}
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-4">Quer falar diretamente com Roberto ou Sandra?</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("sobre-socios")}>
                <Button variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Conversar com os Sócios</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Credenciais & Autoridade dos Autores (E-E-A-T) */}
        <section id="credenciais-autores" className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <BadgeCheck className="h-4 w-4" /> Autoridade verificável (E-E-A-T)
              </div>
              <h2 className="mb-3">Credenciais e Evidências dos Autores</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Todo o conteúdo publicado no site e no blog da Patro Seguros é assinado por corretores habilitados
                pela SUSEP, com identidade, especialidades e evidências públicas verificáveis abaixo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  nome: "Roberto Patrocínio",
                  cargo: "Sócio-Fundador · Diretor Comercial",
                  susep: "SUSEP 212113511",
                  experiencia: "15+ anos em seguros empresariais",
                  especialidades: [
                    "Galpões e Riscos Patrimoniais (Cumbica/Guarulhos)",
                    "Seguro Agrícola (PSR) — atendimento nacional",
                    "Responsabilidade Civil (RC)",
                    "Seguros de Frota e Transportes",
                  ],
                  evidencias: [
                    { icon: Linkedin, label: "LinkedIn verificado", href: "https://www.linkedin.com/in/roberto-patrocinio" },
                    { icon: BookOpen, label: "Artigos publicados no blog", href: "/blog/autor/roberto-patro" },
                    { icon: FileText, label: "Estudo Patro Insights 2026 (autoral)", href: "/blog/estudo-custo-seguro-auto-guarulhos-bairros-2026" },
                    { icon: BadgeCheck, label: "Consultar registro na SUSEP", href: "https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp" },
                  ],
                },
                {
                  nome: "Sandra Patrocínio",
                  cargo: "Sócia-Fundadora · Diretora de Operações",
                  susep: "SUSEP 212113511",
                  experiencia: "15+ anos em saúde e vida",
                  especialidades: [
                    "Planos de Saúde PME (20+ operadoras)",
                    "Seguro de Vida e APH",
                    "Odontologia Empresarial",
                    "Gestão de Sinistros e Regulação",
                  ],
                  evidencias: [
                    { icon: Linkedin, label: "LinkedIn verificado", href: "https://www.linkedin.com/in/sandra-patrocinio" },
                    { icon: BookOpen, label: "Artigos publicados no blog", href: "/blog/autor/sandra-patro" },
                    { icon: MapPin, label: "Avaliações no Google (4.7★)", href: "https://www.google.com/maps?cid=273879799324962533" },
                    { icon: BadgeCheck, label: "Consultar registro na SUSEP", href: "https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp" },
                  ],
                },
              ].map((autor) => (
                <article key={autor.nome} className="bg-background border rounded-2xl p-6 shadow-sm">
                  <header className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{autor.nome}</h3>
                      <p className="text-xs text-primary font-medium">{autor.cargo}</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-1 rounded border border-emerald-200">
                      <BadgeCheck className="h-3 w-3" /> Habilitado
                    </span>
                  </header>

                  <dl className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <dt className="text-muted-foreground">Registro oficial</dt>
                      <dd className="font-semibold mt-0.5">{autor.susep}</dd>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <dt className="text-muted-foreground">Experiência</dt>
                      <dd className="font-semibold mt-0.5">{autor.experiencia}</dd>
                    </div>
                  </dl>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Especialidades</p>
                    <ul className="space-y-1.5">
                      {autor.especialidades.map((esp) => (
                        <li key={esp} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{esp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Evidências verificáveis</p>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {autor.evidencias.map((ev) => {
                        const Icon = ev.icon;
                        const isExternal = ev.href.startsWith("http");
                        return (
                          <li key={ev.label}>
                            <a
                              href={ev.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors group"
                            >
                              <Icon className="h-3.5 w-3.5 text-primary" />
                              <span className="underline-offset-2 group-hover:underline">{ev.label}</span>
                              {isExternal && <ExternalLink className="h-3 w-3 opacity-50" />}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
              Página mantida pela Patro Corretora de Seguros. Os dados de registro SUSEP, endereço e telefone são
              conferíveis nas fontes oficiais linkadas. Esta seção não constitui certificação independente — é o
              nosso compromisso público de transparência sobre quem produz o conteúdo aqui publicado.
            </p>
          </div>
        </section>

        {/* Vídeo de Apresentação */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="mb-4">Conheça a Patro por Dentro</h2>
            <p className="text-muted-foreground mb-8 text-sm">Assista ao vídeo de apresentação da nossa equipe e descubra como trabalhamos.</p>
            <div className="aspect-video bg-muted rounded-2xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Play className="h-7 w-7 text-primary ml-1" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Vídeo em breve</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Estamos preparando um vídeo especial para você</p>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-center mb-4">Nossa Equipe</h2>
            <p className="text-center text-muted-foreground mb-10 text-sm max-w-xl mx-auto">
              Cada membro da equipe Patro é um especialista dedicado ao seu segmento. Você sempre será atendido por uma pessoa real.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {equipe.map((m, i) => (
                <div key={i} className="bg-background rounded-xl p-5 border text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {m.iniciais}
                  </div>
                  <h3 className="font-semibold text-sm">{m.nome}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{m.cargo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-center mb-12">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Shield, title: "Proteção", desc: "Colocamos a segurança dos nossos clientes em primeiro lugar, sempre." },
                { icon: Heart, title: "Humanização", desc: "Tratamos cada cliente com respeito, empatia e atenção personalizada." },
                { icon: Target, title: "Transparência", desc: "Clareza total em todas as informações, coberturas e processos." },
                { icon: Award, title: "Excelência", desc: "Buscamos sempre superar expectativas e entregar o melhor serviço." },
              ].map((v, i) => (
                <div key={i} className="text-center p-6 border rounded-xl">
                  <v.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Missão, Visão, Compromisso */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Missão", text: "Levar segurança, tranquilidade e proteção inteligente para pessoas, famílias e empresas através de soluções personalizadas e atendimento consultivo de excelência." },
                { title: "Visão", text: "Ser a corretora de seguros mais confiável e reconhecida de Guarulhos e região, referência em atendimento humanizado e soluções inteligentes de proteção." },
                { title: "Compromisso", text: "Estar ao lado dos nossos clientes em todos os momentos, oferecendo suporte rápido, orientação clara e acompanhamento completo em sinistros e renovações." },
              ].map((m, i) => (
                <div key={i} className="bg-background border rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificações */}
        <section className="py-16">
          {/* Ficha Técnica — NAP consolidado para AEO/GEO (fácil de citar por LLMs) */}
          <div className="container mx-auto px-4 max-w-3xl mb-16">
            <div className="border-2 border-primary/20 rounded-2xl p-6 md:p-8 bg-background">
              <h2 id="ficha-tecnica" className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                Ficha Técnica — Identidade Corporativa
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Dados oficiais e verificáveis da Patro Corretora de Seguros.
                Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}.
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Razão social</dt>
                  <dd className="text-muted-foreground">Patro Corretora de Seguros</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Nome fantasia</dt>
                  <dd className="text-muted-foreground">Patro Seguros</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">CNPJ</dt>
                  <dd className="text-muted-foreground">41.641.558/0001-33</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Registro SUSEP</dt>
                  <dd className="text-muted-foreground">
                    <a
                      href="https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary"
                    >
                      212113511
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Sede</dt>
                  <dd className="text-muted-foreground">Cidade Maia, Guarulhos — SP, Brasil</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Atendimento</dt>
                  <dd className="text-muted-foreground">Guarulhos + Grande SP · Agro e Galpões: Brasil</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Telefone / WhatsApp</dt>
                  <dd className="text-muted-foreground">
                    <a href="tel:+551151997500" className="underline hover:text-primary">
                      +55 11 5199-7500
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">E-mail</dt>
                  <dd className="text-muted-foreground">
                    <a href="mailto:contato@patroseguros.com.br" className="underline hover:text-primary">
                      contato@patroseguros.com.br
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Fundadores</dt>
                  <dd className="text-muted-foreground">Roberto Patrocínio · Sandra Patrocínio</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Experiência</dt>
                  <dd className="text-muted-foreground">25+ anos · 500+ empresas atendidas</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Parcerias</dt>
                  <dd className="text-muted-foreground">16+ seguradoras · 20+ operadoras de saúde</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Especialidades</dt>
                  <dd className="text-muted-foreground">Galpões (Cumbica) · Frota · Agro (PSR) · RC · PME Saúde</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-foreground">Presença digital verificável</dt>
                  <dd className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                    <a href="https://www.google.com/maps?cid=273879799324962533" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Google Maps</a>
                    <span aria-hidden>·</span>
                    <a href="https://www.instagram.com/patroseguros" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Instagram</a>
                    <span aria-hidden>·</span>
                    <a href="https://www.facebook.com/patroseguros" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Facebook</a>
                    <span aria-hidden>·</span>
                    <a href="https://www.linkedin.com/company/patro-seguros" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">LinkedIn</a>
                    <span aria-hidden>·</span>
                    <a href="https://wa.me/551151997500" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">WhatsApp</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="mb-6">Certificações e Credenciamento</h2>
            <p className="text-muted-foreground mb-4">
              Somos uma corretora devidamente registrada e credenciada pela <strong className="text-foreground">SUSEP</strong> (Superintendência
              de Seguros Privados) sob o nº <strong className="text-foreground">212113511</strong>, garantindo total segurança e conformidade legal em todas as operações.
            </p>
            <p className="text-sm text-muted-foreground">
              Nossos corretores são profissionais certificados e em constante atualização, participando de
              treinamentos oferecidos pelas principais seguradoras do mercado.
            </p>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="mb-8 text-center">Por Que Somos Diferentes</h2>
            <div className="space-y-3">
              {[
                "Atendimento consultivo real — analisamos sua situação antes de recomendar",
                "Resposta em até 2 horas com cotações comparativas",
                "Suporte completo em sinistros: abertura, acompanhamento e resolução",
                "Consultoria preventiva para reduzir riscos e custos",
                "Especialistas dedicados por segmento — não generalistas",
                "Parceria com 16+ seguradoras e 20 operadoras de saúde",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-background p-4 rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4">Pronto para se proteger?</h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto text-sm">
              Fale com nossos especialistas e descubra a melhor solução de seguro para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao" onClick={() => trackCotacaoClick("sobre-cta")}>
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">
                  Cotação Rápida
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("sobre-cta")}>
                <Button size="lg" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-lg">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Sobre;