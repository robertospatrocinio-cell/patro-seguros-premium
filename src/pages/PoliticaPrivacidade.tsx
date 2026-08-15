import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Database,
  Cog,
  Scale,
  Share2,
  Lock,
  UserCheck,
  Cookie,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "dados-coletados", n: "01", title: "Dados que coletamos", Icon: Database },
  { id: "uso-dos-dados", n: "02", title: "Como utilizamos seus dados", Icon: Cog },
  { id: "base-legal", n: "03", title: "Base legal para o tratamento", Icon: Scale },
  { id: "compartilhamento", n: "04", title: "Compartilhamento de dados", Icon: Share2 },
  { id: "seguranca", n: "05", title: "Armazenamento e segurança", Icon: Lock },
  { id: "direitos", n: "06", title: "Seus direitos (LGPD)", Icon: UserCheck },
  { id: "cookies", n: "07", title: "Cookies", Icon: Cookie },
  { id: "alteracoes", n: "08", title: "Alterações nesta política", Icon: RefreshCw },
  { id: "contato", n: "09", title: "Fale com o Encarregado (DPO)", Icon: Mail },
] as const;

const SectionHeading = ({
  n,
  title,
  Icon,
  id,
}: {
  n: string;
  title: string;
  Icon: typeof Database;
  id: string;
}) => (
  <div id={id} className="flex items-center gap-4 mb-5 scroll-mt-28">
    <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70">
        Seção {n}
      </p>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight m-0">
        {title}
      </h2>
    </div>
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3 items-start text-slate-700 leading-relaxed">
    <CheckCircle2 className="w-4 h-4 mt-1 shrink-0 text-primary/70" />
    <span>{children}</span>
  </li>
);

const PoliticaPrivacidade = () => {
  return (
    <Fragment>
      <PageMeta
        title="Política de Privacidade | Patro Seguros"
        description="Política de Privacidade da Patro Seguros — saiba como tratamos seus dados pessoais em conformidade com a LGPD."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none bg-slate-50/50">
        {/* Hero */}
        <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
          <div className="container mx-auto px-4">
            <Breadcrumb items={[{ label: "Política de Privacidade" }]} />
            <div className="max-w-3xl mt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5">
                <ShieldCheck className="w-3.5 h-3.5" /> Conformidade LGPD · Lei 13.709/2018
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-5">
                Política de <span className="text-primary italic">Privacidade</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                A <strong className="text-slate-900">Patro Corretora de Seguros</strong> (CNPJ 41.641.558/0001-33),
                com sede na Av. Salgado Filho, 2120 — Sala 219, Guarulhos/SP, está comprometida com a
                proteção dos dados pessoais de clientes, parceiros e visitantes do site, em conformidade
                com a Lei Geral de Proteção de Dados Pessoais.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 text-xs">
                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 font-medium">
                  Última atualização: Março de 2026
                </span>
                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 font-medium">
                  SUSEP 212113511
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content + Index */}
        <section className="-mt-10 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
              {/* Sticky Index */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70 mb-4">
                    Nesta página
                  </p>
                  <nav>
                    <ol className="space-y-1">
                      {SECTIONS.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            <span className="font-mono text-xs text-slate-400 w-6">{s.n}</span>
                            <span>{s.title}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>

                <div className="mt-6 bg-slate-900 text-white rounded-3xl p-6 shadow-xl shadow-slate-900/10">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
                    Encarregado de Dados
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    Quer exercer um direito LGPD ou tirar uma dúvida sobre o tratamento dos seus dados?
                    Fale direto com o nosso time.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                  >
                    <a
                      href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20tenho%20uma%20solicita%C3%A7%C3%A3o%20LGPD%20relacionada%20aos%20meus%20dados."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Falar no WhatsApp
                    </a>
                  </Button>
                </div>
              </aside>

              {/* Main column */}
              <article className="lg:col-span-8 space-y-6">
                {/* 1 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading
                    id="dados-coletados"
                    n="01"
                    title="Dados que coletamos"
                    Icon={Database}
                  />
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Podemos coletar os seguintes dados pessoais para prestar nossos serviços:
                  </p>
                  <ul className="space-y-2.5">
                    <Bullet><strong>Identificação:</strong> nome completo, CPF, RG, data de nascimento.</Bullet>
                    <Bullet><strong>Contato:</strong> e-mail, telefone, endereço.</Bullet>
                    <Bullet><strong>Profissionais:</strong> profissão, empresa, cargo.</Bullet>
                    <Bullet><strong>Navegação:</strong> endereço IP, cookies, páginas visitadas, tempo de permanência.</Bullet>
                    <Bullet><strong>Cotação:</strong> informações sobre veículos, imóveis, saúde e outros dados necessários à cotação de seguros.</Bullet>
                  </ul>
                </div>

                {/* 2 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading
                    id="uso-dos-dados"
                    n="02"
                    title="Como utilizamos seus dados"
                    Icon={Cog}
                  />
                  <ul className="space-y-2.5">
                    <Bullet>Elaborar cotações de seguros junto às seguradoras parceiras.</Bullet>
                    <Bullet>Prestar atendimento e suporte ao cliente.</Bullet>
                    <Bullet>Enviar comunicações sobre produtos, serviços e novidades (com seu consentimento).</Bullet>
                    <Bullet>Cumprir obrigações legais e regulatórias (SUSEP, Banco Central).</Bullet>
                    <Bullet>Melhorar nossos serviços e a experiência do site.</Bullet>
                  </ul>
                </div>

                {/* 3 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading
                    id="base-legal"
                    n="03"
                    title="Base legal para o tratamento"
                    Icon={Scale}
                  />
                  <p className="text-slate-600 leading-relaxed mb-4">
                    O tratamento dos seus dados pessoais se fundamenta nas seguintes bases legais previstas na LGPD:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { t: "Consentimento", d: "Ao preencher formulários ou solicitar cotações." },
                      { t: "Execução de contrato", d: "Para processar cotações e apólices de seguro." },
                      { t: "Legítimo interesse", d: "Para melhorar nossos serviços e comunicações." },
                      { t: "Obrigação legal", d: "Cumprimento de exigências regulatórias." },
                    ].map((b) => (
                      <div
                        key={b.t}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100"
                      >
                        <p className="font-bold text-slate-900 text-sm mb-1">{b.t}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{b.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading
                    id="compartilhamento"
                    n="04"
                    title="Compartilhamento de dados"
                    Icon={Share2}
                  />
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Seus dados podem ser compartilhados apenas com:
                  </p>
                  <ul className="space-y-2.5">
                    <Bullet><strong>Seguradoras e operadoras:</strong> para elaboração de cotações e emissão de apólices.</Bullet>
                    <Bullet><strong>Órgãos reguladores:</strong> SUSEP e Banco Central, quando exigido por lei.</Bullet>
                    <Bullet><strong>Prestadores de serviço:</strong> ferramentas de análise (Google Analytics), plataformas de CRM e e-mail marketing, sob acordos de confidencialidade.</Bullet>
                  </ul>
                  <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-emerald-900 font-medium leading-relaxed">
                      Nunca vendemos seus dados pessoais a terceiros.
                    </p>
                  </div>
                </div>

                {/* 5 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading
                    id="seguranca"
                    n="05"
                    title="Armazenamento e segurança"
                    Icon={Lock}
                  />
                  <p className="text-slate-600 leading-relaxed">
                    Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo
                    criptografia, controle de acesso e monitoramento contínuo. Os dados são armazenados
                    pelo tempo necessário para cumprimento das finalidades descritas ou conforme exigido por lei.
                  </p>
                </div>

                {/* 6 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading
                    id="direitos"
                    n="06"
                    title="Seus direitos (LGPD)"
                    Icon={UserCheck}
                  />
                  <p className="text-slate-600 leading-relaxed mb-4">Você tem o direito de:</p>
                  <ul className="space-y-2.5">
                    <Bullet>Confirmar a existência de tratamento de dados.</Bullet>
                    <Bullet>Acessar seus dados pessoais.</Bullet>
                    <Bullet>Corrigir dados incompletos ou desatualizados.</Bullet>
                    <Bullet>Solicitar a eliminação de dados desnecessários.</Bullet>
                    <Bullet>Revogar o consentimento a qualquer momento.</Bullet>
                    <Bullet>Solicitar a portabilidade dos dados.</Bullet>
                  </ul>
                  <p className="text-sm text-slate-600 leading-relaxed mt-5">
                    Para exercer seus direitos, envie um e-mail para{" "}
                    <a
                      href="mailto:contato@patroseguros.com.br"
                      className="text-primary font-semibold underline underline-offset-2"
                    >
                      contato@patroseguros.com.br
                    </a>{" "}
                    ou WhatsApp{" "}
                    <a
                      href="https://wa.me/551151997500"
                      className="text-primary font-semibold underline underline-offset-2"
                    >
                      (11) 5199-7500
                    </a>
                    .
                  </p>
                </div>

                {/* 7 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading id="cookies" n="07" title="Cookies" Icon={Cookie} />
                  <p className="text-slate-600 leading-relaxed mb-4">Nosso site utiliza cookies para:</p>
                  <ul className="space-y-2.5">
                    <Bullet><strong>Essenciais:</strong> garantir o funcionamento do site.</Bullet>
                    <Bullet><strong>Análise:</strong> Google Analytics, para entender como o site é utilizado.</Bullet>
                    <Bullet><strong>Marketing:</strong> Meta Pixel, para campanhas de remarketing.</Bullet>
                  </ul>
                  <p className="text-sm text-slate-500 mt-4">
                    Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
                  </p>
                </div>

                {/* 8 */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-10">
                  <SectionHeading
                    id="alteracoes"
                    n="08"
                    title="Alterações nesta política"
                    Icon={RefreshCw}
                  />
                  <p className="text-slate-600 leading-relaxed">
                    Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre
                    disponível nesta página.
                  </p>
                </div>

                {/* 9 - Contato */}
                <div
                  id="contato"
                  className="scroll-mt-28 bg-gradient-to-br from-primary to-primary/80 text-white rounded-3xl p-6 lg:p-10 shadow-xl shadow-primary/20"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                        Seção 09
                      </p>
                      <h2 className="text-2xl lg:text-3xl font-bold leading-tight m-0">
                        Fale com o Encarregado (DPO)
                      </h2>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Para dúvidas sobre esta política ou tratamento de dados, use um dos canais abaixo:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <a
                      href="mailto:contato@patroseguros.com.br"
                      className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-sm"
                    >
                      <Mail className="w-5 h-5 mb-2 text-white/70" />
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                        E-mail
                      </p>
                      <p className="text-sm font-semibold break-all">
                        contato@patroseguros.com.br
                      </p>
                    </a>
                    <a
                      href="https://wa.me/551151997500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-sm"
                    >
                      <Phone className="w-5 h-5 mb-2 text-white/70" />
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                        Telefone / WhatsApp
                      </p>
                      <p className="text-sm font-semibold">(11) 5199-7500</p>
                    </a>
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <MapPin className="w-5 h-5 mb-2 text-white/70" />
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                        Endereço
                      </p>
                      <p className="text-sm font-semibold leading-snug">
                        Av. Salgado Filho, 2120 — Sala 219 · Cidade Maia, Guarulhos/SP
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-500 pt-4">
                  Patro Corretora de Seguros · CNPJ 41.641.558/0001-33 · SUSEP 212113511 ·{" "}
                  <Link to="/termos-de-uso" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default PoliticaPrivacidade;
