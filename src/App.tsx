import { lazy, Suspense, useEffect, useMemo, Component, ReactNode, memo } from "react";

// Helper for type-safe property passing to memoized components in lazy loading
const withProps = <T extends object>(Component: React.ComponentType<T>, props: T) => {
  return memo(() => <Component {...props} />);
};

// Helper function to create lazy components with retry logic
const lazyWithRetry = (componentImport: () => Promise<{ default: any }>, routeName: string = "default") => {
  return lazy(async () => {
    const MAX_RETRIES = routeName === "Index" || routeName === "Cotacao" ? 8 : 5;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      try {
        return await componentImport();
      } catch (error: any) {
        attempt++;
        const isNetworkError = 
          error.message?.toLowerCase().includes("failed to fetch") || 
          error.message?.toLowerCase().includes("load failed") ||
          error.message?.toLowerCase().includes("connection refused") ||
          error.name === "ChunkLoadError";

        if (!isNetworkError || attempt >= MAX_RETRIES) {
          throw error;
        }

        // Exponential backoff: 1s, 2s, 4s, 8s... capped at 10s
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        console.warn(`[Retry] Failed to load route "${routeName}". Attempt ${attempt}/${MAX_RETRIES}. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    return componentImport(); // Should not reach here due to throw above
  });
};

const NichoLojistasGuarulhos = lazyWithRetry(() => import("./pages/NichoLojistasGuarulhos"), "NichoLojistasGuarulhos");
const SeoVistoriaVeicularGuarulhos = lazyWithRetry(() => import("./pages/SeoVistoriaVeicularGuarulhos"), "SeoVistoriaVeicularGuarulhos");
const SeoECVGuarulhos = lazyWithRetry(() => import("./pages/SeoECVGuarulhos"), "SeoECVGuarulhos");
const SeoInspecaoVeicularGuarulhos = lazyWithRetry(() => import("./pages/SeoInspecaoVeicularGuarulhos"), "SeoInspecaoVeicularGuarulhos");
const SeoVistoriaCautelarGuarulhos = lazyWithRetry(() => import("./pages/SeoVistoriaCautelarGuarulhos"), "SeoVistoriaCautelarGuarulhos");
const SeoTransferenciaVeicularGuarulhos = lazyWithRetry(() => import("./pages/SeoTransferenciaVeicularGuarulhos"), "SeoTransferenciaVeicularGuarulhos");
const SeoDespachantesVistoriasGuarulhos = lazyWithRetry(() => import("./pages/SeoDespachantesVistoriasGuarulhos"), "SeoDespachantesVistoriasGuarulhos");
const SeoParceriaVistoriaGuarulhos = lazyWithRetry(() => import("./pages/SeoParceriaVistoriaGuarulhos"), "SeoParceriaVistoriaGuarulhos");
const SeoAutoPosVistoriaGuarulhos = lazyWithRetry(() => import("./pages/SeoAutoPosVistoriaGuarulhos"), "SeoAutoPosVistoriaGuarulhos");
const BlogVistoriaVeicular = lazyWithRetry(() => import("./pages/BlogVistoriaVeicular"), "BlogVistoriaVeicular");
const NichoClinicasOdontologicas = lazyWithRetry(() => import("./pages/NichoClinicasOdontologicas"), "NichoClinicasOdontologicas");
const ParceriasClinicasOdontologicas = lazyWithRetry(() => import("./pages/ParceriasClinicasOdontologicas"), "ParceriasClinicasOdontologicas");
const BlogOdontologia = lazyWithRetry(() => import("./pages/BlogOdontologia"), "BlogOdontologia");
const SeguroParaDentistas = lazyWithRetry(() => import("./pages/SeguroParaDentistas"), "SeguroParaDentistas");
const SeguroConsultorioOdontologico = lazyWithRetry(() => import("./pages/SeguroConsultorioOdontologico"), "SeguroConsultorioOdontologico");
const SeguroClinicaOdontologica = lazyWithRetry(() => import("./pages/SeguroClinicaOdontologica"), "SeguroClinicaOdontologica");
const SeguroEquipamentosOdontologicos = lazyWithRetry(() => import("./pages/SeguroEquipamentosOdontologicos"), "SeguroEquipamentosOdontologicos");
const PlanoSaudeClinicasOdontologicas = lazyWithRetry(() => import("./pages/PlanoSaudeClinicasOdontologicas"), "PlanoSaudeClinicasOdontologicas");
const SeguroVidaClinicasOdontologicas = lazyWithRetry(() => import("./pages/SeguroVidaClinicasOdontologicas"), "SeguroVidaClinicasOdontologicas");
const NichoClinicasVeterinarias = lazyWithRetry(() => import("./pages/NichoClinicasVeterinarias"), "NichoClinicasVeterinarias");
const ParceriasClinicasVeterinarias = lazyWithRetry(() => import("./pages/ParceriasClinicasVeterinarias"), "ParceriasClinicasVeterinarias");
const BlogClinicasVeterinarias = lazyWithRetry(() => import("./pages/BlogClinicasVeterinarias"), "BlogClinicasVeterinarias");
const ProtecaoPetPremium = lazyWithRetry(() => import("./pages/ProtecaoPetPremium"), "ProtecaoPetPremium");
const SeguroParaVeterinarios = lazyWithRetry(() => import("./pages/SeguroParaVeterinarios"), "SeguroParaVeterinarios");
const SeguroClinicaVeterinaria = lazyWithRetry(() => import("./pages/SeguroClinicaVeterinaria"), "SeguroClinicaVeterinaria");
const SeguroHospitalVeterinario = lazyWithRetry(() => import("./pages/SeguroHospitalVeterinario"), "SeguroHospitalVeterinario");
const SeguroEquipamentosVeterinarios = lazyWithRetry(() => import("./pages/SeguroEquipamentosVeterinarios"), "SeguroEquipamentosVeterinarios");
const PlanoSaudeClinicasVeterinarias = lazyWithRetry(() => import("./pages/PlanoSaudeClinicasVeterinarias"), "PlanoSaudeClinicasVeterinarias");
const SeguroVidaClinicasVeterinarias = lazyWithRetry(() => import("./pages/SeguroVidaClinicasVeterinarias"), "SeguroVidaClinicasVeterinarias");
import { HelmetProvider } from "react-helmet-async";
import { setUserContext } from "@/lib/monitoring";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SkipLink from "@/components/SkipLink";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";


const Index = lazyWithRetry(() => import("./pages/Index"), "Index");
const Blog = lazyWithRetry(() => import("./pages/Blog"), "Blog");
const BlogArticle = lazyWithRetry(() => import("./pages/BlogArticle"), "BlogArticle");
const Cotacao = lazyWithRetry(() => import("./pages/Cotacao"), "Cotacao");

const ComparativoPlanosSaude = lazyWithRetry(() => import("./pages/ComparativoPlanosSaude"), "ComparativoPlanosSaude");
const CRM = lazyWithRetry(() => import("./pages/CRM"), "CRM");
const AdminLogin = lazyWithRetry(() => import("./pages/AdminLogin"), "AdminLogin");
const Sobre = lazyWithRetry(() => import("./pages/Sobre"), "Sobre");
const Parceiros = lazyWithRetry(() => import("./pages/Parceiros"), "Parceiros");
const Contato = lazyWithRetry(() => import("./pages/Contato"), "Contato");
const SeguroAuto = lazyWithRetry(() => import("./pages/SeguroAuto"), "SeguroAuto");
const SeguroVida = lazyWithRetry(() => import("./pages/SeguroVida"), "SeguroVida");
const SeguroResidencial = lazyWithRetry(() => import("./pages/SeguroResidencial"), "SeguroResidencial");
const SeguroViagem = lazyWithRetry(() => import("./pages/SeguroViagem"), "SeguroViagem");
const SeguroFianca = lazyWithRetry(() => import("./pages/SeguroFianca"), "SeguroFianca");
const PrevidenciaPrivada = lazyWithRetry(() => import("./pages/PrevidenciaPrivada"), "PrevidenciaPrivada");
const Investimentos = lazyWithRetry(() => import("./pages/Investimentos"), "Investimentos");
const SeguroMoto = lazyWithRetry(() => import("./pages/SeguroMoto"), "SeguroMoto");
const SeguroSaude = lazyWithRetry(() => import("./pages/SeguroSaude"), "SeguroSaude");
const SeguroOdonto = lazyWithRetry(() => import("./pages/SeguroOdonto"), "SeguroOdonto");
const SeguroEmpresarial = lazyWithRetry(() => import("./pages/SeguroEmpresarial"), "SeguroEmpresarial");
const SeguroFrota = lazyWithRetry(() => import("./pages/SeguroFrota"), "SeguroFrota");
const SeguroTransporte = lazyWithRetry(() => import("./pages/SeguroTransporte"), "SeguroTransporte");
const SeguroRural = lazyWithRetry(() => import("./pages/SeguroRural"), "SeguroRural");
const SeguroMaquinas = lazyWithRetry(() => import("./pages/SeguroMaquinas"), "SeguroMaquinas");
const SeguroRC = lazyWithRetry(() => import("./pages/SeguroRC"), "SeguroRC");
const SeguroRCProfissional = lazyWithRetry(() => import("./pages/SeguroRCProfissional"), "SeguroRCProfissional");
const SeguroCondominio = lazyWithRetry(() => import("./pages/SeguroCondominio"), "SeguroCondominio");
const SeguroEngenharia = lazyWithRetry(() => import("./pages/SeguroEngenharia"), "SeguroEngenharia");
const SeguroCyber = lazyWithRetry(() => import("./pages/SeguroCyber"), "SeguroCyber");
const SeguroCelular = lazyWithRetry(() => import("./pages/SeguroCelular"), "SeguroCelular");
const PlanosDeSaude = lazyWithRetry(() => import("./pages/PlanosDeSaude"), "PlanosDeSaude");
const IndiqueAmigo = lazyWithRetry(() => import("./pages/IndiqueAmigo"), "IndiqueAmigo");
const CotacaoSeguroAuto = lazyWithRetry(() => import("./pages/CotacaoSeguroAuto"), "CotacaoSeguroAuto");
const SeguroMaquinasAgricolas = lazyWithRetry(() => import("./pages/SeguroMaquinasAgricolas"), "SeguroMaquinasAgricolas");
const SeguroEquipamentosAgricolas = lazyWithRetry(() => import("./pages/SeguroEquipamentosAgricolas"), "SeguroEquipamentosAgricolas");
const SeguroGalpoesIndustriais = lazyWithRetry(() => import("./pages/SeguroGalpoesIndustriais"), "SeguroGalpoesIndustriais");
const SeguroGalpao = lazyWithRetry(() => import("./pages/SeguroGalpao"), "SeguroGalpao");
const SeguroMaquinasIndustriais = lazyWithRetry(() => import("./pages/SeguroMaquinasIndustriais"), "SeguroMaquinasIndustriais");
const SeguroTratorIndustrial = lazyWithRetry(() => import("./pages/SeguroTratorIndustrial"), "SeguroTratorIndustrial");
const SeguroMaquinasLinhaAmarela = lazyWithRetry(() => import("./pages/SeguroMaquinasLinhaAmarela"), "SeguroMaquinasLinhaAmarela");
const FormularioSeguroVida = lazyWithRetry(() => import("./pages/FormularioSeguroVida"), "FormularioSeguroVida");
const SeoSeguroAutoGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroAutoGuarulhos"), "SeoSeguroAutoGuarulhos");
const SeoSeguroAutoPorModeloGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroAutoPorModeloGuarulhos"), "SeoSeguroAutoPorModeloGuarulhos");
const AvaliarNoGoogle = lazyWithRetry(() => import("./pages/AvaliarNoGoogle"), "AvaliarNoGoogle");
const ParceirosLocais = lazyWithRetry(() => import("./pages/ParceirosLocais"), "ParceirosLocais");
const Imprensa = lazyWithRetry(() => import("./pages/Imprensa"), "Imprensa");
const SeoPlanoSaudeGuarulhos = lazyWithRetry(() => import("./pages/SeoPlanoSaudeGuarulhos"), "SeoPlanoSaudeGuarulhos");
const SeoSeguroEmpresarialGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroEmpresarialGuarulhos"), "SeoSeguroEmpresarialGuarulhos");
const SeoCorretoraGuarulhos = lazyWithRetry(() => import("./pages/SeoCorretoraGuarulhos"), "SeoCorretoraGuarulhos");
const SeoSeguroResidencialGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroResidencialGuarulhos"), "SeoSeguroResidencialGuarulhos");
const SeoSeguroVidaSaudeGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroVidaSaudeGuarulhos"), "SeoSeguroVidaSaudeGuarulhos");
const SeoSeguroFrotaGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroFrotaGuarulhos"), "SeoSeguroFrotaGuarulhos");
const SeoSegurosPmeGuarulhos = lazyWithRetry(() => import("./pages/SeoSegurosPmeGuarulhos"), "SeoSegurosPmeGuarulhos");
const SeoSeguroMotoGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroMotoGuarulhos"), "SeoSeguroMotoGuarulhos");
const SeoSeguroCondominioGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroCondominioGuarulhos"), "SeoSeguroCondominioGuarulhos");
const SeoSegurosShoppingMaiaCidadeMaia = lazyWithRetry(() => import("./pages/SeoSegurosShoppingMaiaCidadeMaia"), "SeoSegurosShoppingMaiaCidadeMaia");
const SeoSeguroUberGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroUberGuarulhos"), "SeoSeguroUberGuarulhos");
const SeoSeguroEmpresaGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroEmpresaGuarulhos"), "SeoSeguroEmpresaGuarulhos");
const SeoSeguroVidaGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroVidaGuarulhos"), "SeoSeguroVidaGuarulhos");
const SeoSeguroMotoristaAppGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroMotoristaAppGuarulhos"), "SeoSeguroMotoristaAppGuarulhos");
const SeoLocalPage = lazyWithRetry(() => import("./pages/SeoLocalPage"), "SeoLocalPage");

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
        const message = error?.message?.toLowerCase() || "";
        const isNetworkFailure = 
          message.includes("failed to fetch") || 
          message.includes("networkerror") || 
          message.includes("connection refused") ||
          message.includes("load failed") ||
          message.includes("refused");

        if (isNetworkFailure) {
          return failureCount < 8; // Aumentado para mais resiliência em falhas de rede
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
      refetchOnWindowFocus: true, // Reativado para ajudar na recuperação automática
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
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const timer = globalThis.setTimeout(() => {
      import("@/integrations/supabase/client").then(({ supabase }) => {
        if (cancelled) return;
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            setUserContext({ id: session.user.id });
          } else {
            setUserContext({});
          }
        });
        cleanup = () => subscription.unsubscribe();
      });
    }, 1500);

    return () => {
      cancelled = true;
      globalThis.clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const timer = globalThis.setTimeout(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => registration.unregister());
        });
      }

      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
    }, 5000);

    return () => globalThis.clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryProviderWrapper>
          <TooltipProvider>
            <BrowserRouter>
              <Suspense fallback={<PageSkeleton />}>
                <BreadcrumbSchema />
                <LocalBusinessSchema />
                <OrganizationSchema />
                <WebSiteSchema />
                <SkipLink />
                <Toaster />
                <Sonner position="top-right" closeButton richColors />
                <WhatsAppButton />
                <CookieBanner />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/crm" element={<RequireAdmin><CRM /></RequireAdmin>} />
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
                  <Route path="/seguro-auto-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-maia-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-vila-augusta-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-bonsucesso" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-bonsucesso-guarulhos-v2" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-pimentas" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-pimentas-guarulhos" }); return <Comp />; })()} />
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