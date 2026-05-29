import { lazy, Suspense, useEffect, useMemo } from "react";
import { setUserContext } from "@/lib/monitoring";
import { supabase } from "@/integrations/supabase/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import PageSkeleton from "@/components/PageSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ServiceWorkerCheck } from "@/components/ServiceWorkerCheck";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SkipLink from "@/components/SkipLink";

import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Cotacao from "./pages/Cotacao";

const ComparativoPlanosSaude = lazy(() => import("./pages/ComparativoPlanosSaude"));
const CRM = lazy(() => import("./pages/CRM"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Parceiros = lazy(() => import("./pages/Parceiros"));
const Contato = lazy(() => import("./pages/Contato"));
const SeguroAuto = lazy(() => import("./pages/SeguroAuto"));
const SeguroVida = lazy(() => import("./pages/SeguroVida"));
const SeguroResidencial = lazy(() => import("./pages/SeguroResidencial"));
const SeguroViagem = lazy(() => import("./pages/SeguroViagem"));
const SeguroFianca = lazy(() => import("./pages/SeguroFianca"));
const PrevidenciaPrivada = lazy(() => import("./pages/PrevidenciaPrivada"));
const Investimentos = lazy(() => import("./pages/Investimentos"));
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
const SeguroMaquinasAgricolas = lazy(() => import("./pages/SeguroMaquinasAgricolas"));
const SeguroEquipamentosAgricolas = lazy(() => import("./pages/SeguroEquipamentosAgricolas"));
const SeguroGalpoesIndustriais = lazy(() => import("./pages/SeguroGalpoesIndustriais"));
const SeguroGalpao = lazy(() => import("./pages/SeguroGalpao"));
const SeguroMaquinasIndustriais = lazy(() => import("./pages/SeguroMaquinasIndustriais"));
const SeguroTratorIndustrial = lazy(() => import("./pages/SeguroTratorIndustrial"));
const SeguroMaquinasLinhaAmarela = lazy(() => import("./pages/SeguroMaquinasLinhaAmarela"));
const FormularioSeguroVida = lazy(() => import("./pages/FormularioSeguroVida"));
const SeoSeguroAutoGuarulhos = lazy(() => import("./pages/SeoSeguroAutoGuarulhos"));
const SeoSeguroAutoPorModeloGuarulhos = lazy(() => import("./pages/SeoSeguroAutoPorModeloGuarulhos"));
const AvaliarNoGoogle = lazy(() => import("./pages/AvaliarNoGoogle"));
const ParceirosLocais = lazy(() => import("./pages/ParceirosLocais"));
const Imprensa = lazy(() => import("./pages/Imprensa"));
const SeoPlanoSaudeGuarulhos = lazy(() => import("./pages/SeoPlanoSaudeGuarulhos"));
const SeoSeguroEmpresarialGuarulhos = lazy(() => import("./pages/SeoSeguroEmpresarialGuarulhos"));
const SeoCorretoraGuarulhos = lazy(() => import("./pages/SeoCorretoraGuarulhos"));
const SeoSeguroResidencialGuarulhos = lazy(() => import("./pages/SeoSeguroResidencialGuarulhos"));
const SeoSeguroVidaSaudeGuarulhos = lazy(() => import("./pages/SeoSeguroVidaSaudeGuarulhos"));
const SeoSeguroFrotaGuarulhos = lazy(() => import("./pages/SeoSeguroFrotaGuarulhos"));
const SeoSegurosPmeGuarulhos = lazy(() => import("./pages/SeoSegurosPmeGuarulhos"));
const SeoSeguroMotoGuarulhos = lazy(() => import("./pages/SeoSeguroMotoGuarulhos"));
const SeoSeguroCondominioGuarulhos = lazy(() => import("./pages/SeoSeguroCondominioGuarulhos"));
const SeoSegurosShoppingMaiaCidadeMaia = lazy(() => import("./pages/SeoSegurosShoppingMaiaCidadeMaia"));
const SeoSeguroUberGuarulhos = lazy(() => import("./pages/SeoSeguroUberGuarulhos"));
const SeoSeguroEmpresaGuarulhos = lazy(() => import("./pages/SeoSeguroEmpresaGuarulhos"));
const SeoSeguroVidaGuarulhos = lazy(() => import("./pages/SeoSeguroVidaGuarulhos"));
const SeoSeguroMotoristaAppGuarulhos = lazy(() => import("./pages/SeoSeguroMotoristaAppGuarulhos"));
const SeoLocalPage = lazy(() => import("./pages/SeoLocalPage"));
const SeguroAmbiental = lazy(() => import("./pages/SeguroAmbiental"));
const SeguroGeada = lazy(() => import("./pages/SeguroGeada"));
const SeguroPropriedadeRural = lazy(() => import("./pages/SeguroPropriedadeRural"));
const SeguroAcidentesPessoais = lazy(() => import("./pages/SeguroAcidentesPessoais"));
const SeguroEstagiario = lazy(() => import("./pages/SeguroEstagiario"));
const SeguroFiancaLocaticia = lazy(() => import("./pages/SeguroFiancaLocaticia"));
const SeguroCaminhao = lazy(() => import("./pages/SeguroCaminhao"));
const SeguroMicroOnibus = lazy(() => import("./pages/SeguroMicroOnibus"));
const SeguroVidaPME = lazy(() => import("./pages/SeguroVidaPME"));
const SeguroArmazenagem = lazy(() => import("./pages/SeguroArmazenagem"));
const SeguroPlacaSolar = lazy(() => import("./pages/SeguroPlacaSolar"));
const SeguroPecuario = lazy(() => import("./pages/SeguroPecuario"));
const SeguroCafe = lazy(() => import("./pages/SeguroCafe"));
const Consorcio = lazy(() => import("./pages/Consorcio"));
const ConsorcioCarro = lazy(() => import("./pages/ConsorcioCarro"));
const ConsorcioImoveis = lazy(() => import("./pages/ConsorcioImoveis"));
const ConsorcioVeiculosPesados = lazy(() => import("./pages/ConsorcioVeiculosPesados"));
const EbookConsorcio = lazy(() => import("./pages/EbookConsorcio"));
const SeguroLojasShopping = lazy(() => import("./pages/SeguroLojasShopping"));
const SegurosPorSegmento = lazy(() => import("./pages/SegurosPorSegmento"));
const SeguroEmpresarialSegmento = lazy(() => import("./pages/SeguroEmpresarialSegmento"));
const SeguroDroneAgricola = lazy(() => import("./pages/SeguroDroneAgricola"));
const SeguroTransporteAgro = lazy(() => import("./pages/SeguroTransporteAgro"));
const SeguroGranja = lazy(() => import("./pages/SeguroGranja"));
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
const SeguroRestaurante = lazy(() => import("./pages/SeguroRestaurante"));
const SeguroPetshop = lazy(() => import("./pages/SeguroPetshop"));
const SeguroTratorAgricola = lazy(() => import("./pages/SeguroTratorAgricola"));
const SeguroColhedoraCana = lazy(() => import("./pages/SeguroColhedoraCana"));
const SeguroColheitadeiraGraos = lazy(() => import("./pages/SeguroColheitadeiraGraos"));
const SeguroColhedoraAlgodao = lazy(() => import("./pages/SeguroColhedoraAlgodao"));
const SeguroPulverizadorAgricola = lazy(() => import("./pages/SeguroPulverizadorAgricola"));
const SeguroSiloAgricola = lazy(() => import("./pages/SeguroSiloAgricola"));
const SeguroGeradorEnergia = lazy(() => import("./pages/SeguroGeradorEnergia"));
const SeguroCondominioEmpresarial = lazy(() => import("./pages/SeguroCondominioEmpresarial"));
const SeguroCondominioResidencial = lazy(() => import("./pages/SeguroCondominioResidencial"));
const SeguroFuneral = lazy(() => import("./pages/SeguroFuneral"));
const SeguroMotoristaApp = lazy(() => import("./pages/SeguroMotoristaApp"));
const LandingPages = lazy(() => import("./pages/LandingPages"));
const LandingSeguroAuto = lazy(() => import("./pages/LandingSeguroAuto"));
const LandingSeguroAutoPremium = lazy(() => import("./pages/LandingSeguroAutoPremium"));
const LandingPlanoSaude = lazy(() => import("./pages/LandingPlanoSaude"));
const LandingSeguroEmpresarial = lazy(() => import("./pages/LandingSeguroEmpresarial"));
const LandingSeguroResidencial = lazy(() => import("./pages/LandingSeguroResidencial"));
const LandingSeguroVida = lazy(() => import("./pages/LandingSeguroVida"));
const LandingSeguroMoto = lazy(() => import("./pages/LandingSeguroMoto"));
const LandingSeguroGalpoes = lazy(() => import("./pages/LandingSeguroGalpoes"));
const LandingSeguroGalpaoAlugado = lazy(() => import("./pages/LandingSeguroGalpaoAlugado"));
const LandingConsorcio = lazy(() => import("./pages/LandingConsorcio"));
const LandingSeguroCelular = lazy(() => import("./pages/LandingSeguroCelular"));
const LandingSeguroMotoristaApp = lazy(() => import("./pages/LandingSeguroMotoristaApp"));
const LandingMedSenior = lazy(() => import("./pages/LandingMedSenior"));
const LandingAlice = lazy(() => import("./pages/LandingAlice"));
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
const SeoHubBairrosGuarulhos = lazy(() => import("./pages/SeoHubBairrosGuarulhos"));
 const HubSegurosGuarulhos = lazy(() => import("./pages/HubSegurosGuarulhos"));
 const HubVeiculos = lazy(() => import("./pages/HubVeiculos"));
 const HubEmpresarial = lazy(() => import("./pages/HubEmpresarial"));
 const HubPatrimonio = lazy(() => import("./pages/HubPatrimonio"));
 const HubRC = lazy(() => import("./pages/HubRC"));
const HubVidaSaude = lazy(() => import("./pages/HubVidaSaude"));
const PreventSenior = lazy(() => import("./pages/saude/PreventSenior"));
const SulAmericaSaude = lazy(() => import("./pages/saude/SulAmerica"));
const AmilSaude = lazy(() => import("./pages/saude/Amil"));
const PortoSaude = lazy(() => import("./pages/saude/PortoSaude"));
const Hapvida = lazy(() => import("./pages/saude/Hapvida"));
const Medsenior = lazy(() => import("./pages/saude/Medsenior"));
const BradescoSaude = lazy(() => import("./pages/saude/Bradesco"));
const Sami = lazy(() => import("./pages/saude/Sami"));
const Unimed = lazy(() => import("./pages/saude/Unimed"));
const Alice = lazy(() => import("./pages/saude/Alice"));

const PortoSeguro = lazy(() => import("./pages/seguradoras/PortoSeguro"));
const TokioMarine = lazy(() => import("./pages/seguradoras/TokioMarine"));
const Allianz = lazy(() => import("./pages/seguradoras/Allianz"));
const AzulSeguros = lazy(() => import("./pages/seguradoras/AzulSeguros"));
const Mapfre = lazy(() => import("./pages/seguradoras/Mapfre"));
const Zurich = lazy(() => import("./pages/seguradoras/Zurich"));
const Yellum = lazy(() => import("./pages/seguradoras/Yellum"));
const Suhai = lazy(() => import("./pages/seguradoras/Suhai"));
const HDI = lazy(() => import("./pages/seguradoras/HDI"));
const ItauSeguros = lazy(() => import("./pages/seguradoras/Itau"));
const BradescoSeguros = lazy(() => import("./pages/seguradoras/Bradesco"));
const Mitsui = lazy(() => import("./pages/seguradoras/Mitsui"));
const SeguroBMW = lazy(() => import("./pages/SeguroBMW"));
const SeguroMarcaPremium = lazy(() => import("./pages/SeguroMarcaPremium"));




const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Fallback client-side para URLs legadas do WordPress no formato `/slug-2/`.
 * O .htaccess no servidor já faz 301 server-side, mas este componente
 * garante o redirect caso o .htaccess não esteja propagado ainda.
 */
const LegacyWpRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const match = pathname.match(/^\/([a-z0-9-]+)-2\/?$/i);
  if (match) {
    return <Navigate to={`/${match[1]}${search}${hash}`} replace />;
  }
  return <NotFound />;
};
const PurgeLogs = lazy(() => import("./pages/PurgeLogs"));
const PerformanceDiagnostico = lazy(() => import("./pages/PerformanceDiagnostico"));
const ConversionDashboard = lazy(() => import("./pages/ConversionDashboard"));
const SeoTechnicalReport = lazy(() => import("./pages/SeoTechnicalReport"));
const PagespeedHistory = lazy(() => import("./pages/PagespeedHistory"));
const DynamicLandingPage = lazy(() => import("./pages/DynamicLandingPage"));
import RequireAdmin from "@/components/RequireAdmin";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000, // Increased to 10 min
      gcTime: 30 * 60 * 1000, // Increased to 30 min
      refetchOnMount: false,
    },
  },
});

const QueryProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};


const App = () => {
  useEffect(() => {
    // Monitor auth state to provide user context to monitoring
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserContext({
          id: session.user.id,
        });
      } else {
        setUserContext({}); // Clear context on sign out
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ErrorBoundary>
      <QueryProviderWrapper>
        <TooltipProvider>
          <BrowserRouter>
            <SkipLink />
            <Toaster />
            <Sonner />
            <WhatsAppButton />
            <CookieBanner />
            <ScrollToTop />
            <ServiceWorkerCheck />
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/crm" element={<RequireAdmin><CRM /></RequireAdmin>} />
                <Route path="/" element={<Index />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/cotacao" element={<Cotacao />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/depoimentos" element={<Depoimentos />} />
            <Route path="/seguro-bmw" element={<SeguroBMW />} />
            <Route path="/seguro-mercedes" element={<SeguroMarcaPremium brand="mercedes" />} />
            <Route path="/seguro-audi" element={<SeguroMarcaPremium brand="audi" />} />
            <Route path="/seguro-land-rover" element={<SeguroMarcaPremium brand="land-rover" />} />
            <Route path="/seguro-jaguar" element={<SeguroMarcaPremium brand="jaguar" />} />
            <Route path="/seguro-volvo" element={<SeguroMarcaPremium brand="volvo" />} />
            <Route path="/seguro-ferrari" element={<SeguroMarcaPremium brand="ferrari" />} />
            <Route path="/seguro-porsche" element={<SeguroMarcaPremium brand="porsche" />} />
            <Route path="/seguro-byd" element={<SeguroMarcaPremium brand="byd" />} />
            <Route path="/seguro-gwm" element={<SeguroMarcaPremium brand="gwm" />} />
            <Route path="/seguro-lexus" element={<SeguroMarcaPremium brand="lexus" />} />
            {/* Adicionando variantes com parametro para o componente genérico */}
            <Route path="/seguro/:brand" element={<SeguroMarcaPremium />} />

            <Route path="/avaliar-no-google" element={<AvaliarNoGoogle />} />
            <Route path="/parceiros-locais" element={<ParceirosLocais />} />
            <Route path="/imprensa" element={<Imprensa />} />
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
            <Route path="/seguro-petshop" element={<SeguroPetshop />} />
            <Route path="/seguro-restaurante" element={<SeguroRestaurante />} />
            <Route path="/seguro-empresarial/segmentos" element={<SegurosPorSegmento />} />
            <Route path="/seguro-empresarial/:segmento" element={<SeguroEmpresarialSegmento />} />
            <Route path="/seguro-frota" element={<SeguroFrota />} />
            <Route path="/seguro-transporte" element={<SeguroTransporte />} />
            <Route path="/seguro-rural" element={<SeguroRural />} />
            <Route path="/seguro-maquinas" element={<SeguroMaquinas />} />
            <Route path="/seguro-rc" element={<SeguroRC />} />
            <Route path="/seguro-rc-profissional" element={<SeguroRCProfissional />} />
            <Route path="/seguro-condominio" element={<SeguroCondominio />} />
            <Route path="/seguro-gerador-energia" element={<SeguroGeradorEnergia />} />
            <Route path="/seguro-condominio-residencial" element={<SeguroCondominioResidencial />} />
            <Route path="/seguro-condominio-empresarial" element={<SeguroCondominioEmpresarial />} />
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
            <Route path="/seguro-trator-industrial" element={<SeguroTratorIndustrial />} />
            <Route path="/seguro-galpao" element={<SeguroGalpao />} />
            <Route path="/seguro-maquinas-industriais" element={<SeguroMaquinasIndustriais />} />
            <Route path="/seguro-maquinas-linha-amarela" element={<SeguroMaquinasLinhaAmarela />} />
             
             <Route path="/lp/:slug" element={<DynamicLandingPage />} />
             <Route path="/seguro-saude-guarulhos" element={<SeoPlanoSaudeGuarulhos />} />
             <Route path="/seguro-empresarial-guarulhos" element={<SeoSeguroEmpresarialGuarulhos />} />
            <Route path="/corretora-seguros-guarulhos" element={<SeoCorretoraGuarulhos />} />
             <Route path="/seguro-residencial-guarulhos" element={<SeoSeguroResidencialGuarulhos />} />
            <Route path="/seguro-vida-saude-guarulhos" element={<SeoSeguroVidaSaudeGuarulhos />} />
             <Route path="/seguro-frota-guarulhos" element={<SeoSeguroFrotaGuarulhos />} />
            <Route path="/seguros-empresariais-pme-guarulhos" element={<SeoSegurosPmeGuarulhos />} />
            <Route path="/seguro-moto-guarulhos" element={<SeoSeguroMotoGuarulhos />} />
            <Route path="/seguro-condominio-guarulhos" element={<SeoSeguroCondominioGuarulhos />} />
            <Route path="/seguros-shopping-maia-cidade-maia-guarulhos" element={<SeoSegurosShoppingMaiaCidadeMaia />} />
            <Route path="/seguro-uber-guarulhos" element={<SeoSeguroUberGuarulhos />} />
            <Route path="/seguro-empresa-guarulhos" element={<SeoSeguroEmpresaGuarulhos />} />
              <Route path="/seguro-vida-guarulhos" element={<SeoSeguroVidaGuarulhos />} />
              <Route path="/planos-de-saude/prevent-senior-guarulhos" element={<PreventSenior />} />
              <Route path="/planos-de-saude/sulamerica-saude-guarulhos" element={<SulAmericaSaude />} />
              <Route path="/planos-de-saude/amil-saude-guarulhos" element={<AmilSaude />} />
              <Route path="/planos-de-saude/porto-saude-guarulhos" element={<PortoSaude />} />
              <Route path="/planos-de-saude/hapvida-guarulhos" element={<Hapvida />} />
              <Route path="/planos-de-saude/medsenior-guarulhos" element={<Medsenior />} />
              <Route path="/planos-de-saude/bradesco-saude-guarulhos" element={<BradescoSaude />} />
              <Route path="/planos-de-saude/sami-guarulhos" element={<Sami />} />
              <Route path="/planos-de-saude/unimed-guarulhos" element={<Unimed />} />
              <Route path="/planos-de-saude/alice-guarulhos" element={<Alice />} />

              <Route path="/seguradoras/porto-seguro-guarulhos" element={<PortoSeguro />} />
              <Route path="/seguradoras/tokio-marine-guarulhos" element={<TokioMarine />} />
              <Route path="/seguradoras/allianz-guarulhos" element={<Allianz />} />
              <Route path="/seguradoras/azul-seguros-guarulhos" element={<AzulSeguros />} />
              <Route path="/seguradoras/mapfre-guarulhos" element={<Mapfre />} />
              <Route path="/seguradoras/zurich-guarulhos" element={<Zurich />} />
              <Route path="/seguradoras/yellum-guarulhos" element={<Yellum />} />
              <Route path="/seguradoras/suhai-guarulhos" element={<Suhai />} />
              <Route path="/seguradoras/hdi-guarulhos" element={<HDI />} />
              <Route path="/seguradoras/itau-seguros-guarulhos" element={<ItauSeguros />} />
              <Route path="/seguradoras/bradesco-seguros-guarulhos" element={<BradescoSeguros />} />
              <Route path="/seguradoras/mitsui-guarulhos" element={<Mitsui />} />
            <Route path="/seguro-para-motorista-app-guarulhos" element={<SeoSeguroMotoristaAppGuarulhos />} />
            <Route path="/seguros-em-guarulhos-bairros" element={<SeoHubBairrosGuarulhos />} />
            {/* SEO local — bairros e páginas comerciais (data-driven) */}
            <Route path="/cotacao-seguro-auto-guarulhos" element={<SeoLocalPage slug="cotacao-seguro-auto-guarulhos" />} />
            <Route path="/melhor-corretora-de-seguros-guarulhos" element={<SeoLocalPage slug="melhor-corretora-de-seguros-guarulhos" />} />
            <Route path="/plano-saude-mei-guarulhos" element={<SeoLocalPage slug="plano-saude-mei-guarulhos" />} />
             <Route path="/seguro-empresarial-cumbica" element={<SeoLocalPage slug="seguro-empresarial-cumbica" />} />
             <Route path="/seguro-empresarial-bonsucesso" element={<SeoLocalPage slug="seguro-empresarial-bonsucesso" />} />
             <Route path="/seguro-empresarial-pimentas" element={<SeoLocalPage slug="seguro-empresarial-pimentas" />} />
             <Route path="/seguro-residencial-centro-guarulhos" element={<SeoLocalPage slug="seguro-residencial-centro-guarulhos" />} />
             <Route path="/seguro-residencial-vila-augusta" element={<SeoLocalPage slug="seguro-residencial-vila-augusta" />} />
             <Route path="/seguro-residencial-jardim-maia" element={<SeoLocalPage slug="seguro-residencial-jardim-maia" />} />
             <Route path="/plano-saude-taboao-guarulhos" element={<SeoLocalPage slug="plano-saude-taboao-guarulhos" />} />
             <Route path="/plano-saude-macedo-guarulhos" element={<SeoLocalPage slug="plano-saude-macedo-guarulhos" />} />
             <Route path="/plano-saude-gopouva-guarulhos" element={<SeoLocalPage slug="plano-saude-gopouva-guarulhos" />} />
             <Route path="/seguro-residencial-taboao-guarulhos" element={<SeoLocalPage slug="seguro-residencial-taboao-guarulhos" />} />
             <Route path="/seguro-residencial-gopouva-guarulhos" element={<SeoLocalPage slug="seguro-residencial-gopouva-guarulhos" />} />
             <Route path="/seguro-empresarial-taboao-guarulhos" element={<SeoLocalPage slug="seguro-empresarial-taboao-guarulhos" />} />
             <Route path="/seguro-empresarial-macedo-guarulhos" element={<SeoLocalPage slug="seguro-empresarial-macedo-guarulhos" />} />
             <Route path="/seguro-empresarial-gopouva-guarulhos" element={<SeoLocalPage slug="seguro-empresarial-gopouva-guarulhos" />} />
            <Route path="/seguro-transportadora-guarulhos" element={<SeoLocalPage slug="seguro-transportadora-guarulhos" />} />
            <Route path="/seguro-99-guarulhos" element={<SeoLocalPage slug="seguro-99-guarulhos" />} />
            <Route path="/plano-saude-empresarial-guarulhos" element={<SeoLocalPage slug="plano-saude-empresarial-guarulhos" />} />
            <Route path="/plano-saude-pme-guarulhos" element={<SeoLocalPage slug="plano-saude-pme-guarulhos" />} />
            <Route path="/plano-saude-familia-guarulhos" element={<SeoLocalPage slug="plano-saude-familia-guarulhos" />} />
            <Route path="/plano-odontologico-guarulhos" element={<SeoLocalPage slug="plano-odontologico-guarulhos" />} />
            <Route path="/seguro-auto-barato-guarulhos" element={<SeoLocalPage slug="seguro-auto-barato-guarulhos" />} />
            <Route path="/seguro-restaurante-guarulhos" element={<SeoLocalPage slug="seguro-restaurante-guarulhos" />} />
            <Route path="/seguro-loja-guarulhos" element={<SeoLocalPage slug="seguro-loja-guarulhos" />} />
            <Route path="/seguro-frota-pequena-guarulhos" element={<SeoLocalPage slug="seguro-frota-pequena-guarulhos" />} />
            <Route path="/seguro-galpao-guarulhos" element={<SeoLocalPage slug="seguro-galpao-guarulhos" />} />
            <Route path="/seguro-galpao-cumbica" element={<SeoLocalPage slug="seguro-galpao-cumbica" />} />
           <Route path="/seguro-carro-eletrico-guarulhos" element={<SeoLocalPage slug="seguro-carro-eletrico-guarulhos" />} />
            <Route path="/seguro-logistica-guarulhos" element={<SeoLocalPage slug="seguro-logistica-guarulhos" />} />
            <Route path="/seguro-auto-vila-galvao" element={<SeoLocalPage slug="seguro-auto-vila-galvao" />} />
            <Route path="/seguro-auto-bonsucesso-guarulhos" element={<SeoLocalPage slug="seguro-auto-bonsucesso-guarulhos" />} />
            <Route path="/seguro-auto-cumbica" element={<SeoLocalPage slug="seguro-auto-cumbica" />} />
            <Route path="/seguro-auto-pimentas" element={<SeoLocalPage slug="seguro-auto-pimentas" />} />
            <Route path="/seguro-auto-maia-guarulhos" element={<SeoLocalPage slug="seguro-auto-maia-guarulhos" />} />
            <Route path="/seguro-auto-jardim-sao-joao" element={<SeoLocalPage slug="seguro-auto-jardim-sao-joao" />} />
            <Route path="/seguro-auto-taboao-guarulhos" element={<SeoLocalPage slug="seguro-auto-taboao-guarulhos" />} />
            <Route path="/seguro-auto-centro-guarulhos" element={<SeoLocalPage slug="seguro-auto-centro-guarulhos" />} />
            <Route path="/seguro-auto-vila-augusta" element={<SeoLocalPage slug="seguro-auto-vila-augusta" />} />
            <Route path="/seguro-auto-cidade-maia" element={<SeoLocalPage slug="seguro-auto-cidade-maia" />} />
            {/* Programmatic SEO — modelos de carro em Guarulhos */}
            <Route path="/seguro-massey-ferguson-guarulhos" element={<SeoLocalPage slug="seguro-massey-ferguson-guarulhos" />} />
            <Route path="/seguro-auto-land-rover-guarulhos" element={<SeoLocalPage slug="seguro-auto-land-rover-guarulhos" />} />
            <Route path="/seguro-auto-jaguar-guarulhos" element={<SeoLocalPage slug="seguro-auto-jaguar-guarulhos" />} />
            <Route path="/seguro-auto-lexus-guarulhos" element={<SeoLocalPage slug="seguro-auto-lexus-guarulhos" />} />
            <Route path="/seguro-auto-toyota-guarulhos" element={<SeoLocalPage slug="seguro-auto-toyota-guarulhos" />} />

            <Route path="/seguro-auto-jeep-guarulhos" element={<SeoLocalPage slug="seguro-auto-jeep-guarulhos" />} />
            <Route path="/seguro-moto-estradeira-guarulhos" element={<SeoLocalPage slug="seguro-moto-estradeira-guarulhos" />} />
            <Route path="/seguro-auto-gac-guarulhos" element={<SeoLocalPage slug="seguro-auto-gac-guarulhos" />} />
            <Route path="/seguro-volkswagen-guarulhos" element={<SeoLocalPage slug="seguro-volkswagen-guarulhos" />} />
            <Route path="/seguro-fiat-guarulhos" element={<SeoLocalPage slug="seguro-fiat-guarulhos" />} />
            <Route path="/seguro-chevrolet-guarulhos" element={<SeoLocalPage slug="seguro-chevrolet-guarulhos" />} />
            <Route path="/seguro-auto-chevrolet-guarulhos" element={<SeoLocalPage slug="seguro-chevrolet-guarulhos" />} />
            <Route path="/seguro-auto-hyundai-guarulhos" element={<SeoLocalPage slug="seguro-auto-hyundai-guarulhos" />} />
            <Route path="/seguro-auto-ford-guarulhos" element={<SeoLocalPage slug="seguro-auto-ford-guarulhos" />} />
            <Route path="/seguro-auto-honda-guarulhos" element={<SeoLocalPage slug="seguro-auto-honda-guarulhos" />} />
            <Route path="/seguro-auto-peugeot-guarulhos" element={<SeoLocalPage slug="seguro-auto-peugeot-guarulhos" />} />
            <Route path="/seguro-auto-citroen-guarulhos" element={<SeoLocalPage slug="seguro-auto-citroen-guarulhos" />} />
            <Route path="/seguro-carro-antigo-guarulhos" element={<SeoLocalPage slug="seguro-carro-antigo-guarulhos" />} />
            <Route path="/seguro-auto-ferrari-guarulhos" element={<SeoLocalPage slug="seguro-auto-ferrari-guarulhos" />} />
            <Route path="/seguro-jacto-guarulhos" element={<SeoLocalPage slug="seguro-jacto-guarulhos" />} />
            <Route path="/seguro-mahindra-guarulhos" element={<SeoLocalPage slug="seguro-mahindra-guarulhos" />} />
            <Route path="/seguro-moto-royal-enfield-guarulhos" element={<SeoLocalPage slug="seguro-moto-royal-enfield-guarulhos" />} />
            <Route path="/seguro-new-holland-guarulhos" element={<SeoLocalPage slug="seguro-new-holland-guarulhos" />} />
            <Route path="/seguro-case-ih-guarulhos" element={<SeoLocalPage slug="seguro-case-ih-guarulhos" />} />
            <Route path="/seguro-valtra-guarulhos" element={<SeoLocalPage slug="seguro-valtra-guarulhos" />} />
            <Route path="/seguro-john-deere-guarulhos" element={<SeoLocalPage slug="seguro-john-deere-guarulhos" />} />
            <Route path="/seguro-caminhonete-premium-guarulhos" element={<SeoLocalPage slug="seguro-caminhonete-premium-guarulhos" />} />
            <Route path="/seguro-moto-triumph-guarulhos" element={<SeoLocalPage slug="seguro-moto-triumph-guarulhos" />} />
            <Route path="/seguro-moto-suzuki-guarulhos" element={<SeoLocalPage slug="seguro-moto-suzuki-guarulhos" />} />
            <Route path="/seguro-moto-kawasaki-guarulhos" element={<SeoLocalPage slug="seguro-moto-kawasaki-guarulhos" />} />
            <Route path="/seguro-moto-dafra-guarulhos" element={<SeoLocalPage slug="seguro-moto-dafra-guarulhos" />} />
            <Route path="/seguro-moto-yamaha-guarulhos" element={<SeoLocalPage slug="seguro-moto-yamaha-guarulhos" />} />
            <Route path="/seguro-moto-honda-guarulhos" element={<SeoLocalPage slug="seguro-moto-honda-guarulhos" />} />
            <Route path="/seguro-moto-harley-guarulhos" element={<SeoLocalPage slug="seguro-moto-harley-guarulhos" />} />
            <Route path="/seguro-moto-ducati-guarulhos" element={<SeoLocalPage slug="seguro-moto-ducati-guarulhos" />} />
            <Route path="/seguro-moto-bmw-guarulhos" element={<SeoLocalPage slug="seguro-moto-bmw-guarulhos" />} />
            <Route path="/seguro-auto-audi-guarulhos" element={<SeoLocalPage slug="seguro-auto-audi-guarulhos" />} />
            <Route path="/seguro-auto-byd-guarulhos" element={<SeoLocalPage slug="seguro-auto-byd-guarulhos" />} />
            <Route path="/seguro-auto-geely-guarulhos" element={<SeoLocalPage slug="seguro-auto-geely-guarulhos" />} />
            <Route path="/seguro-auto-gwm-guarulhos" element={<SeoLocalPage slug="seguro-auto-gwm-guarulhos" />} />
            <Route path="/seguro-auto-bmw-guarulhos" element={<SeoLocalPage slug="seguro-auto-bmw-guarulhos" />} />
            <Route path="/seguro-auto-mercedes-guarulhos" element={<SeoLocalPage slug="seguro-auto-mercedes-guarulhos" />} />
            <Route path="/seguro-auto-porsche-guarulhos" element={<SeoLocalPage slug="seguro-auto-porsche-guarulhos" />} />
            <Route path="/seguro-auto-mitsubishi-guarulhos" element={<SeoLocalPage slug="seguro-auto-mitsubishi-guarulhos" />} />
            <Route path="/seguro-auto-nissan-guarulhos" element={<SeoLocalPage slug="seguro-auto-nissan-guarulhos" />} />
            <Route path="/seguro-auto-renault-guarulhos" element={<SeoLocalPage slug="seguro-auto-renault-guarulhos" />} />
            <Route path="/seguro-auto-caoa-chery-guarulhos" element={<SeoLocalPage slug="seguro-auto-caoa-chery-guarulhos" />} />
            <Route path="/seguro-auto-volvo-guarulhos" element={<SeoLocalPage slug="seguro-auto-volvo-guarulhos" />} />
            <Route path="/seguro-corolla-guarulhos" element={<SeoLocalPage slug="seguro-corolla-guarulhos" />} />
            <Route path="/seguro-civic-guarulhos" element={<SeoLocalPage slug="seguro-civic-guarulhos" />} />
            <Route path="/seguro-hb20-guarulhos" element={<SeoLocalPage slug="seguro-hb20-guarulhos" />} />
            <Route path="/seguro-onix-guarulhos" element={<SeoLocalPage slug="seguro-onix-guarulhos" />} />
            <Route path="/seguro-tcross-guarulhos" element={<SeoLocalPage slug="seguro-tcross-guarulhos" />} />
            <Route path="/seguro-compass-guarulhos" element={<SeoLocalPage slug="seguro-compass-guarulhos" />} />
            <Route path="/seguro-hilux-guarulhos" element={<SeoLocalPage slug="seguro-hilux-guarulhos" />} />
            <Route path="/seguro-strada-guarulhos" element={<SeoLocalPage slug="seguro-strada-guarulhos" />} />
            <Route path="/seguro-renegade-guarulhos" element={<SeoLocalPage slug="seguro-renegade-guarulhos" />} />
            <Route path="/seguro-mobi-guarulhos" element={<SeoLocalPage slug="seguro-mobi-guarulhos" />} />
            <Route path="/seguro-auto-por-modelo-guarulhos" element={<SeoSeguroAutoPorModeloGuarulhos />} />
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
            <Route path="/ebook-consorcio" element={<EbookConsorcio />} />
            <Route path="/seguro-lojas-shopping" element={<SeguroLojasShopping />} />
            <Route path="/seguro-drone-agricola" element={<SeguroDroneAgricola />} />
            <Route path="/seguro-transporte-agro" element={<SeguroTransporteAgro />} />
            <Route path="/seguro-granja" element={<SeguroGranja />} />
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
            <Route path="/seguro-trator-agricola" element={<SeguroTratorAgricola />} />
            <Route path="/seguro-colhedora-cana" element={<SeguroColhedoraCana />} />
            <Route path="/seguro-colheitadeira-graos" element={<SeguroColheitadeiraGraos />} />
            <Route path="/seguro-colhedora-algodao" element={<SeguroColhedoraAlgodao />} />
            <Route path="/seguro-pulverizador-agricola" element={<SeguroPulverizadorAgricola />} />
            <Route path="/seguro-silo-agricola" element={<SeguroSiloAgricola />} />
            <Route path="/seguro-imobiliario" element={<SeguroImobiliario />} />
            <Route path="/seguro-bmw" element={<SeguroBMW />} />
            <Route path="/seguro-funeral" element={<SeguroFuneral />} />
            <Route path="/seguro-micro-onibus" element={<SeguroMicroOnibus />} />
            <Route path="/seguro-motorista-app" element={<SeguroMotoristaApp />} />
            <Route path="/landing-pages" element={<LandingPages />} />
            <Route path="/lp/seguro-auto" element={<LandingSeguroAuto />} />
            <Route path="/lp/seguro-auto-premium" element={<LandingSeguroAutoPremium />} />
            <Route path="/lp/plano-de-saude" element={<LandingPlanoSaude />} />
            <Route path="/lp/seguro-empresarial" element={<LandingSeguroEmpresarial />} />
            <Route path="/lp/seguro-residencial" element={<LandingSeguroResidencial />} />
            <Route path="/lp/seguro-vida" element={<LandingSeguroVida />} />
            <Route path="/lp/seguro-moto" element={<LandingSeguroMoto />} />
            <Route path="/lp/seguro-galpoes" element={<LandingSeguroGalpoes />} />
            <Route path="/lp/seguro-galpao-alugado" element={<LandingSeguroGalpaoAlugado />} />
            <Route path="/lp/consorcio" element={<LandingConsorcio />} />
            <Route path="/lp/seguro-celular" element={<LandingSeguroCelular />} />
            <Route path="/lp/seguro-motorista-app" element={<LandingSeguroMotoristaApp />} />
            <Route path="/lp/medsenior" element={<LandingMedSenior />} />
             <Route path="/lp/alice" element={<LandingAlice />} />
             <Route path="/comparativo-planos-saude-guarulhos" element={<ComparativoPlanosSaude />} />
             {/* SEO Local Planos de Saúde */}
             <Route path="/plano-saude-centro-guarulhos" element={<SeoLocalPage slug="plano-saude-centro-guarulhos" />} />
             <Route path="/plano-saude-cidade-maia" element={<SeoLocalPage slug="plano-saude-cidade-maia" />} />
             <Route path="/plano-saude-picanco" element={<SeoLocalPage slug="plano-saude-picanco" />} />
             <Route path="/plano-saude-vila-augusta" element={<SeoLocalPage slug="plano-saude-vila-augusta" />} />
             <Route path="/faq" element={<FAQ />} />
            <Route path="/sobre-guarulhos" element={<SobreGuarulhos />} />
            <Route path="/seguros-guarulhos-bairros" element={<SegurosGuarulhosBairros />} />
            <Route path="/seguros-guarulhos" element={<SegurosGuarulhosBairros />} />
             <Route path="/seguros-em-guarulhos" element={<HubSegurosGuarulhos />} />
             <Route path="/seguros-de-veiculos" element={<HubVeiculos />} />
             <Route path="/seguros-empresariais" element={<HubEmpresarial />} />
             <Route path="/seguros-de-patrimonio" element={<HubPatrimonio />} />
             <Route path="/seguros-responsabilidade-civil" element={<HubRC />} />
             <Route path="/vida-e-saude" element={<HubVidaSaude />} />
            <Route path="/seguros-guarulhos/:bairro" element={<SegurosGuarulhosBairros />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/seguros/medicos-e-clinicas" element={<NichoMedicos />} />
            <Route path="/seguros/transportadoras" element={<NichoTransportadoras />} />
            <Route path="/seguros/empresarios" element={<NichoEmpresarios />} />
            <Route path="/seguros/profissionais-liberais" element={<NichoProfissionaisLiberais />} />
            <Route path="/seguros/motoristas-app" element={<NichoMotoristasApp />} />
            <Route path="/seguros/:tipo" element={<SegurosQuotePage />} />
            <Route path="/admin/purge-logs" element={<RequireAdmin><PurgeLogs /></RequireAdmin>} />
            <Route path="/admin/performance" element={<RequireAdmin><PerformanceDiagnostico /></RequireAdmin>} />
            <Route path="/admin/seo-tecnico" element={<RequireAdmin><SeoTechnicalReport /></RequireAdmin>} />
             <Route path="/admin/conversoes" element={<RequireAdmin><ConversionDashboard /></RequireAdmin>} />
            <Route path="/admin/pagespeed" element={<RequireAdmin><PagespeedHistory /></RequireAdmin>} />
            <Route path="/investimentos" element={<Investimentos />} />
            <Route path="/planejamento-patrimonial" element={<Investimentos />} />
            <Route path="*" element={<LegacyWpRedirect />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryProviderWrapper>
    </ErrorBoundary>
  );
};

export default App;
