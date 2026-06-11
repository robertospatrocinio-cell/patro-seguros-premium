import { lazy, Suspense, useEffect, useMemo } from "react";
const NichoLojistasGuarulhos = lazy(() => import("./pages/NichoLojistasGuarulhos"));
const SeoVistoriaVeicularGuarulhos = lazy(() => import("./pages/SeoVistoriaVeicularGuarulhos"));
const SeoECVGuarulhos = lazy(() => import("./pages/SeoECVGuarulhos"));
const SeoInspecaoVeicularGuarulhos = lazy(() => import("./pages/SeoInspecaoVeicularGuarulhos"));
const SeoVistoriaCautelarGuarulhos = lazy(() => import("./pages/SeoVistoriaCautelarGuarulhos"));
const SeoTransferenciaVeicularGuarulhos = lazy(() => import("./pages/SeoTransferenciaVeicularGuarulhos"));
const SeoDespachantesVistoriasGuarulhos = lazy(() => import("./pages/SeoDespachantesVistoriasGuarulhos"));
const SeoParceriaVistoriaGuarulhos = lazy(() => import("./pages/SeoParceriaVistoriaGuarulhos"));
const SeoAutoPosVistoriaGuarulhos = lazy(() => import("./pages/SeoAutoPosVistoriaGuarulhos"));
const BlogVistoriaVeicular = lazy(() => import("./pages/BlogVistoriaVeicular"));
const NichoClinicasOdontologicas = lazy(() => import("./pages/NichoClinicasOdontologicas"));
const ParceriasClinicasOdontologicas = lazy(() => import("./pages/ParceriasClinicasOdontologicas"));
const BlogOdontologia = lazy(() => import("./pages/BlogOdontologia"));
const SeguroParaDentistas = lazy(() => import("./pages/SeguroParaDentistas"));
const SeguroConsultorioOdontologico = lazy(() => import("./pages/SeguroConsultorioOdontologico"));
const SeguroClinicaOdontologica = lazy(() => import("./pages/SeguroClinicaOdontologica"));
const SeguroEquipamentosOdontologicos = lazy(() => import("./pages/SeguroEquipamentosOdontologicos"));
const PlanoSaudeClinicasOdontologicas = lazy(() => import("./pages/PlanoSaudeClinicasOdontologicas"));
const SeguroVidaClinicasOdontologicas = lazy(() => import("./pages/SeguroVidaClinicasOdontologicas"));
const NichoClinicasVeterinarias = lazy(() => import("./pages/NichoClinicasVeterinarias"));
const ParceriasClinicasVeterinarias = lazy(() => import("./pages/ParceriasClinicasVeterinarias"));
const BlogClinicasVeterinarias = lazy(() => import("./pages/BlogClinicasVeterinarias"));
const ProtecaoPetPremium = lazy(() => import("./pages/ProtecaoPetPremium"));
const SeguroParaVeterinarios = lazy(() => import("./pages/SeguroParaVeterinarios"));
const SeguroClinicaVeterinaria = lazy(() => import("./pages/SeguroClinicaVeterinaria"));
const SeguroHospitalVeterinario = lazy(() => import("./pages/SeguroHospitalVeterinario"));
const SeguroEquipamentosVeterinarios = lazy(() => import("./pages/SeguroEquipamentosVeterinarios"));
const PlanoSaudeClinicasVeterinarias = lazy(() => import("./pages/PlanoSaudeClinicasVeterinarias"));
const SeguroVidaClinicasVeterinarias = lazy(() => import("./pages/SeguroVidaClinicasVeterinarias"));
import { HelmetProvider } from "react-helmet-async";
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
import PageLoader from "@/components/PageLoader";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ServiceWorkerCheck } from "@/components/ServiceWorkerCheck";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SkipLink from "@/components/SkipLink";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";


import Index from "./pages/Index";
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Cotacao = lazy(() => import("./pages/Cotacao"));

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

const CentralDeSinistro = lazy(() => import("./pages/CentralDeSinistro"));
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

const PerformanceDiagnostico = lazy(() => import("./pages/PerformanceDiagnostico"));
const ConversionDashboard = lazy(() => import("./pages/ConversionDashboard"));
const SeoTechnicalReport = lazy(() => import("./pages/SeoTechnicalReport"));
const PagespeedHistory = lazy(() => import("./pages/PagespeedHistory"));
const DynamicLandingPage = lazy(() => import("./pages/DynamicLandingPage"));
const SchemaDashboard = lazy(() => import("./pages/SchemaDashboard"));
const Diagnostico = lazy(() => import("./pages/Diagnostico"));
const PurgeLogs = lazy(() => import("./pages/PurgeLogs"));

import RequireAdmin from "@/components/RequireAdmin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.message?.includes("Failed to fetch") || error?.message?.includes("NetworkError")) {
          return failureCount < 5;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
  },
});

const QueryProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const App = () => {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserContext({ id: session.user.id });
      } else {
        setUserContext({});
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryProviderWrapper>
          <TooltipProvider>
            <BrowserRouter>
              <Suspense fallback={null}>
                <SkipLink />
                <BreadcrumbSchema />
                <LocalBusinessSchema />
                <OrganizationSchema />
                <WebSiteSchema />
                <Toaster />
                <Sonner position="top-right" closeButton richColors />
                <WhatsAppButton />
                <CookieBanner />
                <ScrollToTop />
                <ServiceWorkerCheck />
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
                  <Route path="/seguro-frota" element={<SeguroFrota />} />
                  <Route path="/seguro-transporte" element={<SeguroTransporte />} />
                  <Route path="/seguro-rural" element={<SeguroRural />} />
                  <Route path="/seguro-maquinas" element={<SeguroMaquinas />} />
                  <Route path="/seguro-rc" element={<SeguroRC />} />
                  <Route path="/seguro-rc-profissional" element={<SeguroRCProfissional />} />
                  <Route path="/seguro-condominio" element={<SeguroCondominio />} />
                  <Route path="/seguro-gerador-energia" element={<SeguroGeradorEnergia />} />
                  <Route path="/seguro-engenharia" element={<SeguroEngenharia />} />
                  <Route path="/seguro-cyber" element={<SeguroCyber />} />
                  <Route path="/seguro-celular" element={<SeguroCelular />} />
                  <Route path="/planos-de-saude" element={<PlanosDeSaude />} />
                  <Route path="/indique-um-amigo" element={<IndiqueAmigo />} />
                  <Route path="/cotacao-seguro-auto" element={<CotacaoSeguroAuto />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogArticle />} />
                  <Route path="/seguro-maquinas-agricolas" element={<SeguroMaquinasAgricolas />} />
                  <Route path="/lp/:slug" element={<DynamicLandingPage />} />
                  <Route path="/diagnostico" element={<Diagnostico />} />
                  <Route path="/performance" element={<PerformanceDiagnostico />} />
                  
                  {/* ... other specific routes ... */}
                  <Route path="/admin/purge-logs" element={<RequireAdmin><PurgeLogs /></RequireAdmin>} />
                  <Route path="/admin/performance" element={<RequireAdmin><PerformanceDiagnostico /></RequireAdmin>} />
                  <Route path="/admin/seo-tecnico" element={<RequireAdmin><SeoTechnicalReport /></RequireAdmin>} />
                  <Route path="/admin/conversoes" element={<RequireAdmin><ConversionDashboard /></RequireAdmin>} />
                  <Route path="/admin/pagespeed" element={<RequireAdmin><PagespeedHistory /></RequireAdmin>} />
                  <Route path="/admin/schemas" element={<RequireAdmin><SchemaDashboard /></RequireAdmin>} />
                  <Route path="/investimentos" element={<Investimentos />} />
                  <Route path="*" element={<LegacyWpRedirect />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryProviderWrapper>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;