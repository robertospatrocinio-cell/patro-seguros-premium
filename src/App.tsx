import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";

// Lazy-loaded pages for code splitting
const Sobre = lazy(() => import("./pages/Sobre"));
const Parceiros = lazy(() => import("./pages/Parceiros"));
const Cotacao = lazy(() => import("./pages/Cotacao"));
const Contato = lazy(() => import("./pages/Contato"));
const SeguroAuto = lazy(() => import("./pages/SeguroAuto"));
const SeguroVida = lazy(() => import("./pages/SeguroVida"));
const SeguroResidencial = lazy(() => import("./pages/SeguroResidencial"));
const SeguroViagem = lazy(() => import("./pages/SeguroViagem"));
const SeguroFianca = lazy(() => import("./pages/SeguroFianca"));
const PrevidenciaPrivada = lazy(() => import("./pages/PrevidenciaPrivada"));
const SeguroMoto = lazy(() => import("./pages/SeguroMoto"));
const SeguroSaude = lazy(() => import("./pages/SeguroSaude"));
const SeguroOdonto = lazy(() => import("./pages/SeguroOdonto"));
const SeguroEmpresarial = lazy(() => import("./pages/SeguroEmpresarial"));
const SeguroFrota = lazy(() => import("./pages/SeguroFrota"));
const SeguroTransporte = lazy(() => import("./pages/SeguroTransporte"));
const SeguroRural = lazy(() => import("./pages/SeguroRural"));
const SeguroMaquinas = lazy(() => import("./pages/SeguroMaquinas"));
const SeguroRC = lazy(() => import("./pages/SeguroRC"));
const SeguroRCProfissional = lazy(() => import("./pages/SeguroRCProfissional"));
const SeguroCondominio = lazy(() => import("./pages/SeguroCondominio"));
const SeguroEngenharia = lazy(() => import("./pages/SeguroEngenharia"));
const SeguroCyber = lazy(() => import("./pages/SeguroCyber"));
const SeguroCelular = lazy(() => import("./pages/SeguroCelular"));
const PlanosDeSaude = lazy(() => import("./pages/PlanosDeSaude"));
const IndiqueAmigo = lazy(() => import("./pages/IndiqueAmigo"));
const CotacaoSeguroAuto = lazy(() => import("./pages/CotacaoSeguroAuto"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const SeguroMaquinasAgricolas = lazy(() => import("./pages/SeguroMaquinasAgricolas"));
const SeguroEquipamentosAgricolas = lazy(() => import("./pages/SeguroEquipamentosAgricolas"));
const SeguroGalpoesIndustriais = lazy(() => import("./pages/SeguroGalpoesIndustriais"));
const SeguroMaquinasIndustriais = lazy(() => import("./pages/SeguroMaquinasIndustriais"));
const SeguroMaquinasLinhaAmarela = lazy(() => import("./pages/SeguroMaquinasLinhaAmarela"));
const FormularioSeguroVida = lazy(() => import("./pages/FormularioSeguroVida"));
const SeoSeguroAutoGuarulhos = lazy(() => import("./pages/SeoSeguroAutoGuarulhos"));
const SeoPlanoSaudeGuarulhos = lazy(() => import("./pages/SeoPlanoSaudeGuarulhos"));
const SeoSeguroEmpresarialGuarulhos = lazy(() => import("./pages/SeoSeguroEmpresarialGuarulhos"));
const SeoCorretoraGuarulhos = lazy(() => import("./pages/SeoCorretoraGuarulhos"));
const SeguroAmbiental = lazy(() => import("./pages/SeguroAmbiental"));
const SeguroGeada = lazy(() => import("./pages/SeguroGeada"));
const SeguroPropriedadeRural = lazy(() => import("./pages/SeguroPropriedadeRural"));
const SeguroAcidentesPessoais = lazy(() => import("./pages/SeguroAcidentesPessoais"));
const SeguroEstagiario = lazy(() => import("./pages/SeguroEstagiario"));
const SeguroFiancaLocaticia = lazy(() => import("./pages/SeguroFiancaLocaticia"));
const SeguroCaminhao = lazy(() => import("./pages/SeguroCaminhao"));
const SeguroVidaPME = lazy(() => import("./pages/SeguroVidaPME"));
const SeguroArmazenagem = lazy(() => import("./pages/SeguroArmazenagem"));
const SeguroPlacaSolar = lazy(() => import("./pages/SeguroPlacaSolar"));
const SeguroPecuario = lazy(() => import("./pages/SeguroPecuario"));
const SeguroCafe = lazy(() => import("./pages/SeguroCafe"));
const Consorcio = lazy(() => import("./pages/Consorcio"));
const ConsorcioCarro = lazy(() => import("./pages/ConsorcioCarro"));
const ConsorcioImoveis = lazy(() => import("./pages/ConsorcioImoveis"));
const ConsorcioVeiculosPesados = lazy(() => import("./pages/ConsorcioVeiculosPesados"));
const SeguroLojasShopping = lazy(() => import("./pages/SeguroLojasShopping"));
const SeguroDroneAgricola = lazy(() => import("./pages/SeguroDroneAgricola"));
const SeguroTransporteAgro = lazy(() => import("./pages/SeguroTransporteAgro"));
const SeguroBike = lazy(() => import("./pages/SeguroBike"));
const SeguroJetSki = lazy(() => import("./pages/SeguroJetSki"));
const SeguroEmbarcacoes = lazy(() => import("./pages/SeguroEmbarcacoes"));
const SeguroAvioes = lazy(() => import("./pages/SeguroAvioes"));
const SeguroHelicopteros = lazy(() => import("./pages/SeguroHelicopteros"));
const SeguroCartaVerde = lazy(() => import("./pages/SeguroCartaVerde"));
const SeguroDecesso = lazy(() => import("./pages/SeguroDecesso"));
const SeguroGarantia = lazy(() => import("./pages/SeguroGarantia"));
const SeguroRCMedicos = lazy(() => import("./pages/SeguroRCMedicos"));
const SeguroRCVeterinarios = lazy(() => import("./pages/SeguroRCVeterinarios"));
const SeguroRCAdvogados = lazy(() => import("./pages/SeguroRCAdvogados"));
const SeguroRCDentistas = lazy(() => import("./pages/SeguroRCDentistas"));
const SeguroRCEngenheiros = lazy(() => import("./pages/SeguroRCEngenheiros"));
const SeguroRCExecutivos = lazy(() => import("./pages/SeguroRCExecutivos"));
const SeguroRCObras = lazy(() => import("./pages/SeguroRCObras"));
const SeguroRCPrestacaoServicos = lazy(() => import("./pages/SeguroRCPrestacaoServicos"));
const SeguroRCEventos = lazy(() => import("./pages/SeguroRCEventos"));
const PlanoPet = lazy(() => import("./pages/PlanoPet"));
const PlanoSaudeEmpresarial = lazy(() => import("./pages/PlanoSaudeEmpresarial"));
const SeguroImobiliario = lazy(() => import("./pages/SeguroImobiliario"));
const SeguroFuneral = lazy(() => import("./pages/SeguroFuneral"));
const SeguroMotoristaApp = lazy(() => import("./pages/SeguroMotoristaApp"));
const LandingPages = lazy(() => import("./pages/LandingPages"));
const LandingSeguroAuto = lazy(() => import("./pages/LandingSeguroAuto"));
const LandingPlanoSaude = lazy(() => import("./pages/LandingPlanoSaude"));
const LandingSeguroEmpresarial = lazy(() => import("./pages/LandingSeguroEmpresarial"));
const LandingSeguroResidencial = lazy(() => import("./pages/LandingSeguroResidencial"));
const LandingSeguroVida = lazy(() => import("./pages/LandingSeguroVida"));
const LandingSeguroMoto = lazy(() => import("./pages/LandingSeguroMoto"));
const LandingSeguroGalpoes = lazy(() => import("./pages/LandingSeguroGalpoes"));
const LandingConsorcio = lazy(() => import("./pages/LandingConsorcio"));
const LandingSeguroCelular = lazy(() => import("./pages/LandingSeguroCelular"));
const LandingSeguroMotoristaApp = lazy(() => import("./pages/LandingSeguroMotoristaApp"));
const FAQ = lazy(() => import("./pages/FAQ"));
const SobreGuarulhos = lazy(() => import("./pages/SobreGuarulhos"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const NichoMedicos = lazy(() => import("./pages/NichoMedicos"));
const NichoTransportadoras = lazy(() => import("./pages/NichoTransportadoras"));
const NichoEmpresarios = lazy(() => import("./pages/NichoEmpresarios"));
const NichoProfissionaisLiberais = lazy(() => import("./pages/NichoProfissionaisLiberais"));
const NichoMotoristasApp = lazy(() => import("./pages/NichoMotoristasApp"));
const Depoimentos = lazy(() => import("./pages/Depoimentos"));
const SegurosQuotePage = lazy(() => import("./pages/SegurosQuotePage"));
const SegurosGuarulhosBairros = lazy(() => import("./pages/SegurosGuarulhosBairros"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/cotacao" element={<Cotacao />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/depoimentos" element={<Depoimentos />} />
            <Route path="/seguro-auto" element={<SeguroAuto />} />
            <Route path="/seguro-vida" element={<SeguroVida />} />
            <Route path="/seguro-vida/formulario" element={<FormularioSeguroVida />} />
            <Route path="/seguro-residencial" element={<SeguroResidencial />} />
            <Route path="/seguro-viagem" element={<SeguroViagem />} />
            <Route path="/seguro-fianca" element={<SeguroFianca />} />
            <Route path="/previdencia-privada" element={<PrevidenciaPrivada />} />
            <Route path="/seguro-moto" element={<SeguroMoto />} />
            <Route path="/seguro-saude" element={<SeguroSaude />} />
            <Route path="/seguro-odonto" element={<SeguroOdonto />} />
            <Route path="/seguro-empresarial" element={<SeguroEmpresarial />} />
            <Route path="/seguro-frota" element={<SeguroFrota />} />
            <Route path="/seguro-transporte" element={<SeguroTransporte />} />
            <Route path="/seguro-rural" element={<SeguroRural />} />
            <Route path="/seguro-maquinas" element={<SeguroMaquinas />} />
            <Route path="/seguro-rc" element={<SeguroRC />} />
            <Route path="/seguro-rc-profissional" element={<SeguroRCProfissional />} />
            <Route path="/seguro-condominio" element={<SeguroCondominio />} />
            <Route path="/seguro-engenharia" element={<SeguroEngenharia />} />
            <Route path="/seguro-cyber" element={<SeguroCyber />} />
            <Route path="/seguro-celular" element={<SeguroCelular />} />
            <Route path="/planos-de-saude" element={<PlanosDeSaude />} />
            <Route path="/indique-um-amigo" element={<IndiqueAmigo />} />
            <Route path="/cotacao-seguro-auto" element={<CotacaoSeguroAuto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/seguro-maquinas-agricolas" element={<SeguroMaquinasAgricolas />} />
            <Route path="/seguro-equipamentos-agricolas" element={<SeguroEquipamentosAgricolas />} />
            <Route path="/seguro-galpoes-industriais" element={<SeguroGalpoesIndustriais />} />
            <Route path="/seguro-maquinas-industriais" element={<SeguroMaquinasIndustriais />} />
            <Route path="/seguro-maquinas-linha-amarela" element={<SeguroMaquinasLinhaAmarela />} />
            <Route path="/seguro-auto-guarulhos" element={<SeoSeguroAutoGuarulhos />} />
            <Route path="/plano-saude-guarulhos" element={<SeoPlanoSaudeGuarulhos />} />
            <Route path="/seguro-empresarial-guarulhos" element={<SeoSeguroEmpresarialGuarulhos />} />
            <Route path="/corretora-seguros-guarulhos" element={<SeoCorretoraGuarulhos />} />
            <Route path="/seguro-ambiental" element={<SeguroAmbiental />} />
            <Route path="/seguro-geada" element={<SeguroGeada />} />
            <Route path="/seguro-acidentes-pessoais" element={<SeguroAcidentesPessoais />} />
            <Route path="/seguro-estagiario" element={<SeguroEstagiario />} />
            <Route path="/seguro-fianca-locaticia" element={<SeguroFiancaLocaticia />} />
            <Route path="/seguro-caminhao" element={<SeguroCaminhao />} />
            <Route path="/seguro-vida-pme" element={<SeguroVidaPME />} />
            <Route path="/seguro-armazenagem" element={<SeguroArmazenagem />} />
            <Route path="/seguro-placa-solar" element={<SeguroPlacaSolar />} />
            <Route path="/seguro-pecuario" element={<SeguroPecuario />} />
            <Route path="/seguro-cafe" element={<SeguroCafe />} />
            <Route path="/consorcio" element={<Consorcio />} />
            <Route path="/consorcio-carro" element={<ConsorcioCarro />} />
            <Route path="/consorcio-imoveis" element={<ConsorcioImoveis />} />
            <Route path="/consorcio-veiculos-pesados" element={<ConsorcioVeiculosPesados />} />
            <Route path="/seguro-lojas-shopping" element={<SeguroLojasShopping />} />
            <Route path="/seguro-drone-agricola" element={<SeguroDroneAgricola />} />
            <Route path="/seguro-transporte-agro" element={<SeguroTransporteAgro />} />
            <Route path="/seguro-bike" element={<SeguroBike />} />
            <Route path="/seguro-jetski" element={<SeguroJetSki />} />
            <Route path="/seguro-embarcacoes" element={<SeguroEmbarcacoes />} />
            <Route path="/seguro-avioes" element={<SeguroAvioes />} />
            <Route path="/seguro-helicopteros" element={<SeguroHelicopteros />} />
            <Route path="/seguro-carta-verde" element={<SeguroCartaVerde />} />
            <Route path="/seguro-decesso" element={<SeguroDecesso />} />
            <Route path="/seguro-garantia" element={<SeguroGarantia />} />
            <Route path="/seguro-rc-medicos" element={<SeguroRCMedicos />} />
            <Route path="/seguro-rc-veterinarios" element={<SeguroRCVeterinarios />} />
            <Route path="/seguro-rc-advogados" element={<SeguroRCAdvogados />} />
            <Route path="/seguro-rc-dentistas" element={<SeguroRCDentistas />} />
            <Route path="/seguro-rc-engenheiros" element={<SeguroRCEngenheiros />} />
            <Route path="/seguro-rc-executivos" element={<SeguroRCExecutivos />} />
            <Route path="/seguro-rc-obras" element={<SeguroRCObras />} />
            <Route path="/seguro-rc-prestacao-servicos" element={<SeguroRCPrestacaoServicos />} />
            <Route path="/seguro-rc-eventos" element={<SeguroRCEventos />} />
            <Route path="/plano-pet" element={<PlanoPet />} />
            <Route path="/plano-saude-empresarial" element={<PlanoSaudeEmpresarial />} />
            <Route path="/seguro-propriedade-rural" element={<SeguroPropriedadeRural />} />
            <Route path="/seguro-imobiliario" element={<SeguroImobiliario />} />
            <Route path="/seguro-funeral" element={<SeguroFuneral />} />
            <Route path="/seguro-motorista-app" element={<SeguroMotoristaApp />} />
            <Route path="/landing-pages" element={<LandingPages />} />
            <Route path="/lp/seguro-auto" element={<LandingSeguroAuto />} />
            <Route path="/lp/plano-de-saude" element={<LandingPlanoSaude />} />
            <Route path="/lp/seguro-empresarial" element={<LandingSeguroEmpresarial />} />
            <Route path="/lp/seguro-residencial" element={<LandingSeguroResidencial />} />
            <Route path="/lp/seguro-vida" element={<LandingSeguroVida />} />
            <Route path="/lp/seguro-moto" element={<LandingSeguroMoto />} />
            <Route path="/lp/seguro-galpoes" element={<LandingSeguroGalpoes />} />
            <Route path="/lp/consorcio" element={<LandingConsorcio />} />
            <Route path="/lp/seguro-celular" element={<LandingSeguroCelular />} />
            <Route path="/lp/seguro-motorista-app" element={<LandingSeguroMotoristaApp />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sobre-guarulhos" element={<SobreGuarulhos />} />
            <Route path="/seguros-guarulhos-bairros" element={<SegurosGuarulhosBairros />} />
            <Route path="/seguros-guarulhos" element={<SegurosGuarulhosBairros />} />
            <Route path="/seguros-guarulhos/:bairro" element={<SegurosGuarulhosBairros />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/seguros/medicos-e-clinicas" element={<NichoMedicos />} />
            <Route path="/seguros/transportadoras" element={<NichoTransportadoras />} />
            <Route path="/seguros/empresarios" element={<NichoEmpresarios />} />
            <Route path="/seguros/profissionais-liberais" element={<NichoProfissionaisLiberais />} />
            <Route path="/seguros/:tipo" element={<SegurosQuotePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
