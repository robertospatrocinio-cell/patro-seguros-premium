import { lazy, Suspense, useMemo, Component, ReactNode, memo } from "react";
import {
  B2B_HUB_PATH,
  GARANTIA_HUB_PATH,
  GARANTIA_LOCAL_PATH,
  CREDITO_HUB_PATH,
  CREDITO_LOCAL_PATH,
  GARANTIA_INTENT_ROUTES as GARANTIA_INTENT_PAGES,
  CREDITO_INTENT_ROUTES as CREDITO_INTENT_PAGES,
  B2B_INSURER_ROUTES as B2B_INSURER_PAGES,
} from "@/data/b2bRoutes";
import { CIDADES_REGIAO_HUB_PATH } from "@/data/cidadesRegiao";


// Helper for type-safe property passing to memoized components in lazy loading
const withProps = < T extends object>(Component: React.ComponentType< T >, props: T) => {
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

// Conteúdo público e comercial disponível sem uma segunda espera por rota.
import NichoLojistasGuarulhos from "./pages/NichoLojistasGuarulhos";
import SeoVistoriaVeicularGuarulhos from "./pages/SeoVistoriaVeicularGuarulhos";
import SeguroVistoriadoraVeicular from "./pages/SeguroVistoriadoraVeicular";
import CentralDeGuias from "./pages/CentralDeGuias";
import CentralDePerguntas from "./pages/CentralDePerguntas";
import CentralDeMateriais from "./pages/CentralDeMateriais";
import MaterialDetalhe from "./pages/MaterialDetalhe";
import PerguntasCategoria from "./pages/PerguntasCategoria";
import GuiaPilar from "./pages/GuiaPilar";
import ComparativosSegurosHub from "./pages/ComparativosSegurosHub";
import ComparativoCategoria from "./pages/ComparativoCategoria";
import SeoECVGuarulhos from "./pages/SeoECVGuarulhos";
import SeoInspecaoVeicularGuarulhos from "./pages/SeoInspecaoVeicularGuarulhos";
import SeoVistoriaCautelarGuarulhos from "./pages/SeoVistoriaCautelarGuarulhos";
import SeoTransferenciaVeicularGuarulhos from "./pages/SeoTransferenciaVeicularGuarulhos";
import SeoDespachantesVistoriasGuarulhos from "./pages/SeoDespachantesVistoriasGuarulhos";
import SeoParceriaVistoriaGuarulhos from "./pages/SeoParceriaVistoriaGuarulhos";
import SeoAutoPosVistoriaGuarulhos from "./pages/SeoAutoPosVistoriaGuarulhos";
import BlogVistoriaVeicular from "./pages/BlogVistoriaVeicular";
import NichoClinicasOdontologicas from "./pages/NichoClinicasOdontologicas";
import ParceriasClinicasOdontologicas from "./pages/ParceriasClinicasOdontologicas";
import BlogOdontologia from "./pages/BlogOdontologia";
import SeguroParaDentistas from "./pages/SeguroParaDentistas";
import SeguroConsultorioOdontologico from "./pages/SeguroConsultorioOdontologico";
import SeguroClinicaOdontologica from "./pages/SeguroClinicaOdontologica";
import SeguroConsultorioGuarulhos from "./pages/SeguroConsultorioGuarulhos";
import SeguroConsultorioOdontologicoGuarulhos from "./pages/SeguroConsultorioOdontologicoGuarulhos";
import SeguroConsultorioMedicoGuarulhos from "./pages/SeguroConsultorioMedicoGuarulhos";
import SeguroConsultorioVeterinarioGuarulhos from "./pages/SeguroConsultorioVeterinarioGuarulhos";
import SeguroClinicaEsteticaGuarulhos from "./pages/SeguroClinicaEsteticaGuarulhos";
import SeguroClinicaPequenaGuarulhos from "./pages/SeguroClinicaPequenaGuarulhos";
import SeguroEquipamentosConsultorioGuarulhos from "./pages/SeguroEquipamentosConsultorioGuarulhos";
import SeguroFlatGuarulhos from "./pages/SeguroFlatGuarulhos";
import SeguroSalaComercialGuarulhos from "./pages/SeguroSalaComercialGuarulhos";
import SeguroEquipamentosOdontologicos from "./pages/SeguroEquipamentosOdontologicos";
import PlanoSaudeClinicasOdontologicas from "./pages/PlanoSaudeClinicasOdontologicas";
import SeguroVidaClinicasOdontologicas from "./pages/SeguroVidaClinicasOdontologicas";
import NichoClinicasVeterinarias from "./pages/NichoClinicasVeterinarias";
import ParceriasClinicasVeterinarias from "./pages/ParceriasClinicasVeterinarias";
import BlogClinicasVeterinarias from "./pages/BlogClinicasVeterinarias";
import ProtecaoPetPremium from "./pages/ProtecaoPetPremium";
import SeguroParaVeterinarios from "./pages/SeguroParaVeterinarios";
import SeguroClinicaVeterinaria from "./pages/SeguroClinicaVeterinaria";
import SeguroHospitalVeterinario from "./pages/SeguroHospitalVeterinario";
import SeguroEquipamentosVeterinarios from "./pages/SeguroEquipamentosVeterinarios";
import PlanoSaudeClinicasVeterinarias from "./pages/PlanoSaudeClinicasVeterinarias";
import SeguroVidaClinicasVeterinarias from "./pages/SeguroVidaClinicasVeterinarias";

// === Patro Private (camada premium) ===
import PatroPrivate from "./pages/PatroPrivate";
import Patro from "./pages/Patro";
import SeguroAutoPremiumGuarulhos from "./pages/premium/SeguroAutoPremiumGuarulhos";
import SeguroCarrosLuxoGuarulhos from "./pages/premium/SeguroCarrosLuxoGuarulhos";
import SeguroResidencialAltoPadraoGuarulhos from "./pages/premium/SeguroResidencialAltoPadraoGuarulhos";
import SegurosParaEmpresariosGuarulhos from "./pages/premium/SegurosParaEmpresariosGuarulhos";
import SeguroCarroBlindadoGuarulhos from "./pages/premium/SeguroCarroBlindadoGuarulhos";
import ProtecaoPatrimonialFamiliarGuarulhos from "./pages/premium/ProtecaoPatrimonialFamiliarGuarulhos";
import { HelmetProvider } from "react-helmet-async";
import { setUserContext } from "@/lib/monitoring";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import { resolveRoute, normalizePath, CANONICAL_ORIGIN } from "@/lib/redirects";

import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
// Toasters saem do bundle de entrada: nenhum toast existe na primeira
// pintura, então radix-toast + sonner viram chunks carregados após o mount.
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);
import PageSkeleton from "@/components/PageSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SkipLink from "@/components/SkipLink";
import { scheduleIdle } from "@/lib/prefetch";
import { LEGACY_BAIRRO_REDIRECTS } from "@/lib/legacyBairroRedirects";

const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));
const DroneAgricolaPreview = lazy(() => import("@/pages/DroneAgricolaPreview"));
import { DRONE_PREVIEW_PATH, RETA_PREVIEW_PATH, isDronePreviewHost } from "@/data/droneAgricolaPreview";


import InsuranceEditorial from "./pages/InsuranceEditorial";
import Blog from "./pages/Blog";
const BlogArticle = lazyWithRetry(() => import("./pages/BlogArticle"), "BlogArticle");
const BlogCategory = lazyWithRetry(() => import("./pages/BlogCategory"), "BlogCategory");
const BlogAuthor = lazyWithRetry(() => import("./pages/BlogAuthor"), "BlogAuthor");
const BlogCalendario90Dias = lazyWithRetry(() => import("./pages/BlogCalendario90Dias"), "BlogCalendario90Dias");
const BlogCluster = lazyWithRetry(() => import("./pages/BlogCluster"), "BlogCluster");
const Cotacao = lazyWithRetry(() => import("./pages/Cotacao"), "Cotacao");
const CotacaoObrigado = lazyWithRetry(() => import("./pages/CotacaoObrigado"), "CotacaoObrigado");

import ComparativoPlanosSaude from "./pages/ComparativoPlanosSaude";
const CRM = lazyWithRetry(() => import("./pages/CRM"), "CRM");
const AdminLogin = lazyWithRetry(() => import("./pages/AdminLogin"), "AdminLogin");
const Sobre = lazyWithRetry(() => import("./pages/Sobre"), "Sobre");
const VerificarSusep = lazyWithRetry(() => import("./pages/VerificarSusep"), "VerificarSusep");
const Parceiros = lazyWithRetry(() => import("./pages/Parceiros"), "Parceiros");
const Contato = lazyWithRetry(() => import("./pages/Contato"), "Contato");
import TodosOsSeguros from "./pages/TodosOsSeguros";
import Servicos from "./pages/Servicos";
import SeguroAuto from "./pages/SeguroAuto";
import SeguroVida from "./pages/SeguroVida";
import SeguroResidencial from "./pages/SeguroResidencial";
import SeguroViagem from "./pages/SeguroViagem";
import SeguroFianca from "./pages/SeguroFianca";
import PrevidenciaPrivada from "./pages/PrevidenciaPrivada";
import Investimentos from "./pages/Investimentos";
import SeguroMoto from "./pages/SeguroMoto";
import SeguroSaude from "./pages/SeguroSaude";
import SeguroOdonto from "./pages/SeguroOdonto";
import SeguroEmpresarial from "./pages/SeguroEmpresarial";
import SeguroFrota from "./pages/SeguroFrota";
import SeguroTransporte from "./pages/SeguroTransporte";
import SeguroRural from "./pages/SeguroRural";
import SeguroMaquinas from "./pages/SeguroMaquinas";
import SeguroRC from "./pages/SeguroRC";
import SeguroRCProfissional from "./pages/SeguroRCProfissional";
import SeguroCondominio from "./pages/SeguroCondominio";
import SeguroEngenharia from "./pages/SeguroEngenharia";
import SeguroCyber from "./pages/SeguroCyber";
import SeguroCelular from "./pages/SeguroCelular";
import PlanosDeSaude from "./pages/PlanosDeSaude";
const IndiqueAmigo = lazyWithRetry(() => import("./pages/IndiqueAmigo"), "IndiqueAmigo");
const CotacaoSeguroAuto = lazyWithRetry(() => import("./pages/CotacaoSeguroAuto"), "CotacaoSeguroAuto");
const CotacaoAutoRedirect = lazyWithRetry(() => import("./pages/CotacaoAutoRedirect"), "CotacaoAutoRedirect");
import SeguroMaquinasAgricolas from "./pages/SeguroMaquinasAgricolas";
import SeguroEquipamentosAgricolas from "./pages/SeguroEquipamentosAgricolas";
import SeguroGalpoesIndustriais from "./pages/SeguroGalpoesIndustriais";
import SeguroGalpao from "./pages/SeguroGalpao";
import SeguroMaquinasIndustriais from "./pages/SeguroMaquinasIndustriais";
import SeguroTratorIndustrial from "./pages/SeguroTratorIndustrial";
import SeguroMaquinasLinhaAmarela from "./pages/SeguroMaquinasLinhaAmarela";
const FormularioSeguroVida = lazyWithRetry(() => import("./pages/FormularioSeguroVida"), "FormularioSeguroVida");
import SeoSeguroAutoGuarulhos from "./pages/SeoSeguroAutoGuarulhos";
import SeoSeguroAutoPorModeloGuarulhos from "./pages/SeoSeguroAutoPorModeloGuarulhos";
import SeguroAutoMarcas from "./pages/SeguroAutoMarcas";
import SeguroAutoComparativoCoberturas from "./pages/SeguroAutoComparativoCoberturas";
import SeguroAgro from "./pages/SeguroAgro";
import SeguroPenhorRural from "./pages/SeguroPenhorRural";
const GlossarioSeguros = lazyWithRetry(() => import("./pages/GlossarioSeguros"), "GlossarioSeguros");
const GlossarioLetra = lazyWithRetry(() => import("./pages/GlossarioLetra"), "GlossarioLetra");
const AvaliarNoGoogle = lazyWithRetry(() => import("./pages/AvaliarNoGoogle"), "AvaliarNoGoogle");
const AvaliacoesClientes = lazyWithRetry(() => import("./pages/AvaliacoesClientes"), "AvaliacoesClientes");
const ParceirosLocais = lazyWithRetry(() => import("./pages/ParceirosLocais"), "ParceirosLocais");
const Imprensa = lazyWithRetry(() => import("./pages/Imprensa"), "Imprensa");
import SeoPlanoSaudeGuarulhos from "./pages/SeoPlanoSaudeGuarulhos";
import PlanoDeSaudeGuarulhosHub from "./pages/PlanoDeSaudeGuarulhosHub";
import PlanoSaudeIndividualGuarulhos from "./pages/PlanoSaudeIndividualGuarulhos";
import PlanoSaudeFamiliarGuarulhos from "./pages/PlanoSaudeFamiliarGuarulhos";
import PlanoSaudeMeiGuarulhos from "./pages/PlanoSaudeMeiGuarulhos";
import PlanoSaudePmeGuarulhos from "./pages/PlanoSaudePmeGuarulhos";
import PlanoSaudeEmpresarialGuarulhosCanonical from "./pages/PlanoSaudeEmpresarialGuarulhosCanonical";
import PlanoSaudeIdososGuarulhos from "./pages/PlanoSaudeIdososGuarulhos";
import PlanoOdontologicoGuarulhosCanonical from "./pages/PlanoOdontologicoGuarulhosCanonical";
import SeoSeguroEmpresarialGuarulhos from "./pages/SeoSeguroEmpresarialGuarulhos";
import CorretoraDeSegurosEmGuarulhos from "./pages/CorretoraDeSegurosEmGuarulhos";
import SeoSeguroResidencialGuarulhos from "./pages/SeoSeguroResidencialGuarulhos";
import SegurosEmGuarulhosHub from "./pages/local-guarulhos/SegurosEmGuarulhos";
import SeoSeguroVidaSaudeGuarulhos from "./pages/SeoSeguroVidaSaudeGuarulhos";
import SeoSeguroFrotaGuarulhos from "./pages/SeoSeguroFrotaGuarulhos";
import SeoSegurosPmeGuarulhos from "./pages/SeoSegurosPmeGuarulhos";
import SeoSeguroMotoGuarulhos from "./pages/SeoSeguroMotoGuarulhos";
import LandingSeguroMotoEntregador from "./pages/LandingSeguroMotoEntregador";
import SeoSeguroCondominioGuarulhos from "./pages/SeoSeguroCondominioGuarulhos";
import SeoSegurosShoppingMaiaCidadeMaia from "./pages/SeoSegurosShoppingMaiaCidadeMaia";
import HubSegurosGuarulhosDefinitivo from "./pages/HubSegurosGuarulhos";
import SeguroTransporteCargaGuarulhos from "./pages/SeguroTransporteCargaGuarulhos";
import ComparativoSeguradorasGuarulhos from "./pages/ComparativoSeguradorasGuarulhos";
const SiteMap = lazyWithRetry(() => import("./pages/SiteMap"), "SiteMap");

import SeoSeguroUberGuarulhos from "./pages/SeoSeguroUberGuarulhos";
import SeoSeguroEmpresaGuarulhos from "./pages/SeoSeguroEmpresaGuarulhos";
import SeoSeguroVidaGuarulhos from "./pages/SeoSeguroVidaGuarulhos";
import SeoSeguroMotoristaAppGuarulhos from "./pages/SeoSeguroMotoristaAppGuarulhos";
import LongtailPlanosSaudeGuarulhosComparativo from "./pages/LongtailPlanosSaudeGuarulhosComparativo";
import LongtailValorSeguroBydDolphin from "./pages/LongtailValorSeguroBydDolphin";
import LongtailMelhorSeguroUberGuarulhos from "./pages/LongtailMelhorSeguroUberGuarulhos";
import LongtailCotacaoSeguroResidencialOnline from "./pages/LongtailCotacaoSeguroResidencialOnline";
const GuiaClusterLongtail = lazyWithRetry(() => import("./pages/GuiaClusterLongtail"), "GuiaClusterLongtail");
import SeoLocalPage from "./pages/SeoLocalPage";
import CidadesRegiaoHub from "./pages/CidadesRegiaoHub";
import CidadeRegiaoPage from "./pages/CidadeRegiaoPage";
import PlanoSaudeEmpresarialGuarulhos from "./pages/PlanoSaudeEmpresarialGuarulhos";
import PlanosSaudeSeniorGuarulhos from "./pages/PlanosSaudeSeniorGuarulhos";
import PlanoOdontologicoGuarulhos from "./pages/PlanoOdontologicoGuarulhos";

import Index from "./pages/Index";
import LpMaquinasEquipamentos from "./pages/LpMaquinasEquipamentos";
import LpTransportes360 from "./pages/LpTransportes360";
import SolucoesEmpresariais from "./pages/SolucoesEmpresariais";
import LpSeguroLocadorasEquipamentos from "./pages/lp/SeguroLocadorasEquipamentos";
import LpSeguroGalpoesCentrosDistribuicao from "./pages/lp/SeguroGalpoesCentrosDistribuicao";
import LpSeguroCiberneticoEmpresas from "./pages/lp/SeguroCiberneticoEmpresas";
import LpResponsabilidadeAdminProf from "./pages/lp/ResponsabilidadeAdministradoresProfissionais";

import CentralDeSinistro from "./pages/CentralDeSinistro";
import TelefonesSeguradoras from "./pages/TelefonesSeguradoras";
const ConsultaTabelaFipe = lazy(() => import("./pages/ConsultaTabelaFipe"));
import SeguroAmbiental from "./pages/SeguroAmbiental";

import SeguroGeada from "./pages/SeguroGeada";
import SeguroPropriedadeRural from "./pages/SeguroPropriedadeRural";
import SeguroAcidentesPessoais from "./pages/SeguroAcidentesPessoais";
import SeguroEstagiario from "./pages/SeguroEstagiario";
import SeguroFiancaLocaticia from "./pages/SeguroFiancaLocaticia";
import SeguroFiancaGuarulhos from "./pages/SeguroFiancaGuarulhos";
import SeguroGalpaoCumbica from "./pages/SeguroGalpaoCumbica";
import SeguroTaxiGuarulhos from "./pages/SeguroTaxiGuarulhos";
import SeguroCaminhao from "./pages/SeguroCaminhao";
import SeguroMicroOnibus from "./pages/SeguroMicroOnibus";
import SeguroVidaPME from "./pages/SeguroVidaPME";
import SeguroArmazenagem from "./pages/SeguroArmazenagem";
import SeguroPlacaSolar from "./pages/SeguroPlacaSolar";
import SeguroPecuario from "./pages/SeguroPecuario";
import SeguroCafe from "./pages/SeguroCafe";
import SpecializedVerticalPage from "./pages/SpecializedVerticalPage";
import PlanoSaudeGuarulhosVertical from "./pages/PlanoSaudeGuarulhosVertical";
import ConsorcioGuarulhosVertical from "./pages/ConsorcioGuarulhosVertical";
import Consorcio from "./pages/Consorcio";
import ConsorcioCarro from "./pages/ConsorcioCarro";
import ConsorcioImoveis from "./pages/ConsorcioImoveis";
import ConsorcioVeiculosPesados from "./pages/ConsorcioVeiculosPesados";
const EbookConsorcio = lazy(() => import("./pages/EbookConsorcio"));
import SeguroLojasShopping from "./pages/SeguroLojasShopping";
import SegurosPorSegmento from "./pages/SegurosPorSegmento";
import SeguroEmpresarialSegmento from "./pages/SeguroEmpresarialSegmento";
import SeguroDroneAgricola from "./pages/SeguroDroneAgricola";
import SeguroRetaDrone from "./pages/SeguroRetaDrone";
import SeguroDrone from "./pages/SeguroDrone";
import SeguroTransporteAgro from "./pages/SeguroTransporteAgro";
import SeguroGranja from "./pages/SeguroGranja";
import SeguroBike from "./pages/SeguroBike";
import SeguroJetSki from "./pages/SeguroJetSki";
import SeguroEmbarcacoes from "./pages/SeguroEmbarcacoes";
import SeguroAvioes from "./pages/SeguroAvioes";
import SeguroHelicopteros from "./pages/SeguroHelicopteros";
import SeguroAutoEzzeCorinthians from "./pages/SeguroAutoEzzeCorinthians";
import SeguroCartaVerde from "./pages/SeguroCartaVerde";
import GrandeSaoPaulo from "./pages/GrandeSaoPaulo";
import AtendimentoDigital from "./pages/AtendimentoDigital";
const CotacaoComparativaBairros = lazy(() => import("./pages/CotacaoComparativaBairros"));
import SeguroAutoBairroSp from "./pages/SeguroAutoBairroSp";
import SeguroRegiaoEstado from "./pages/SeguroRegiaoEstado";
import AtendimentoNacional from "./pages/AtendimentoNacional";
import BairroHubSp from "./pages/BairroHubSp";
import SeguroResidencialBairroSp from "./pages/SeguroResidencialBairroSp";
import SeguroEmpresarialBairroSp from "./pages/SeguroEmpresarialBairroSp";

const IndiqueEGanhe = lazy(() => import("./pages/IndiqueEGanhe"));
const ObrigadoIndicacao = lazy(() => import("./pages/ObrigadoIndicacao"));
import SeguroDecesso from "./pages/SeguroDecesso";
import SeguroGarantia from "./pages/SeguroGarantia";
import SegurosEmpresariaisEspecializados from "./pages/SegurosEmpresariaisEspecializados";
import SeguroGarantiaGuarulhos from "./pages/SeguroGarantiaGuarulhos";
import SeguroDeCredito from "./pages/SeguroDeCredito";
import SeguroDeCreditoGuarulhos from "./pages/SeguroDeCreditoGuarulhos";
import B2bIntentRoute from "./pages/b2b/B2bIntentRoute";
import B2bInsurerRoute from "./pages/b2b/B2bInsurerRoute";
import SeguroRCMedicos from "./pages/SeguroRCMedicos";
import SeguroRCVeterinarios from "./pages/SeguroRCVeterinarios";
import SeguroRCAdvogados from "./pages/SeguroRCAdvogados";
import SeguroRCDentistas from "./pages/SeguroRCDentistas";
import SeguroRCEngenheiros from "./pages/SeguroRCEngenheiros";
import SeguroRCExecutivos from "./pages/SeguroRCExecutivos";
import SeguroRCObras from "./pages/SeguroRCObras";
import SeguroRCPrestacaoServicos from "./pages/SeguroRCPrestacaoServicos";
import SeguroRCEventos from "./pages/SeguroRCEventos";
import PlanoPet from "./pages/PlanoPet";
import PlanoSaudeEmpresarial from "./pages/PlanoSaudeEmpresarial";
import SeguroImobiliario from "./pages/SeguroImobiliario";
import SeguroRestaurante from "./pages/SeguroRestaurante";
import SeguroPetshop from "./pages/SeguroPetshop";
import SeguroTratorAgricola from "./pages/SeguroTratorAgricola";
import SeguroColhedoraCana from "./pages/SeguroColhedoraCana";
import SeguroColheitadeiraGraos from "./pages/SeguroColheitadeiraGraos";
import SeguroColhedoraAlgodao from "./pages/SeguroColhedoraAlgodao";
import SeguroPulverizadorAgricola from "./pages/SeguroPulverizadorAgricola";
import SeguroSiloAgricola from "./pages/SeguroSiloAgricola";
import SeguroGeradorEnergia from "./pages/SeguroGeradorEnergia";
import SeguroCondominioEmpresarial from "./pages/SeguroCondominioEmpresarial";
import SeguroCondominioResidencial from "./pages/SeguroCondominioResidencial";
import SeguroFuneral from "./pages/SeguroFuneral";
import SeguroMotoristaApp from "./pages/SeguroMotoristaApp";
import SeguroAcidentesPessoaisPassageiros from "./pages/SeguroAcidentesPessoaisPassageiros";
import SeguroAppMotoristaAplicativo from "./pages/SeguroAppMotoristaAplicativo";
import SeguroAppTaxiExecutivo from "./pages/SeguroAppTaxiExecutivo";
import SeguroAppOnibusVansFrotas from "./pages/SeguroAppOnibusVansFrotas";

import LandingPages from "./pages/LandingPages";
import LandingSeguroAuto from "./pages/LandingSeguroAuto";
import LandingSeguroAutoPremium from "./pages/LandingSeguroAutoPremium";
import LandingPlanoSaude from "./pages/LandingPlanoSaude";
import LandingSeguroEmpresarial from "./pages/LandingSeguroEmpresarial";
import LandingSeguroResidencial from "./pages/LandingSeguroResidencial";
import LandingSeguroVida from "./pages/LandingSeguroVida";
import LandingSeguroMoto from "./pages/LandingSeguroMoto";
import LandingSeguroGalpoes from "./pages/LandingSeguroGalpoes";
import LandingSeguroGalpaoAlugado from "./pages/LandingSeguroGalpaoAlugado";
import LandingConsorcio from "./pages/LandingConsorcio";
import LandingSeguroCelular from "./pages/LandingSeguroCelular";
import LandingSeguroMotoristaApp from "./pages/LandingSeguroMotoristaApp";
import LandingMedSenior from "./pages/LandingMedSenior";
import LandingAlice from "./pages/LandingAlice";
import LandingSeguroAcidentesPessoais from "./pages/LandingSeguroAcidentesPessoais";
import FAQ from "./pages/FAQ";
const SobreGuarulhos = lazy(() => import("./pages/SobreGuarulhos"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
import NichoMedicos from "./pages/NichoMedicos";
import NichoTransportadoras from "./pages/NichoTransportadoras";
import NichoEmpresarios from "./pages/NichoEmpresarios";
import NichoProfissionaisLiberais from "./pages/NichoProfissionaisLiberais";
import NichoMotoristasApp from "./pages/NichoMotoristasApp";
import Depoimentos from "./pages/Depoimentos";
const SegurosQuotePage = lazy(() => import("./pages/SegurosQuotePage"));
import SegurosGuarulhosBairros from "./pages/SegurosGuarulhosBairros";
import SeoHubBairrosGuarulhos from "./pages/SeoHubBairrosGuarulhos";
import HubSegurosGuarulhos from "./pages/HubSegurosGuarulhos";
import HubVeiculos from "./pages/HubVeiculos";
import HubEmpresarial from "./pages/HubEmpresarial";
import HubPatrimonio from "./pages/HubPatrimonio";
import HubRC from "./pages/HubRC";
import HubVidaSaude from "./pages/HubVidaSaude";
import PreventSenior from "./pages/saude/PreventSenior";
import SulAmericaSaude from "./pages/saude/SulAmerica";
import AmilSaude from "./pages/saude/Amil";
import PortoSaude from "./pages/saude/PortoSaude";
import Hapvida from "./pages/saude/Hapvida";
import Medsenior from "./pages/saude/Medsenior";
import BradescoSaude from "./pages/saude/Bradesco";
import Sami from "./pages/saude/Sami";
import Unimed from "./pages/saude/Unimed";
import Alice from "./pages/saude/Alice";
import Omint from "./pages/saude/Omint";
import CarePlus from "./pages/saude/CarePlus";

import PortoSeguro from "./pages/seguradoras/PortoSeguro";
import TokioMarine from "./pages/seguradoras/TokioMarine";
import Allianz from "./pages/seguradoras/Allianz";
import AzulSeguros from "./pages/seguradoras/AzulSeguros";
import Mapfre from "./pages/seguradoras/Mapfre";
import Zurich from "./pages/seguradoras/Zurich";
import Yellum from "./pages/seguradoras/Yellum";
import Suhai from "./pages/seguradoras/Suhai";
import HDI from "./pages/seguradoras/HDI";
import ItauSeguros from "./pages/seguradoras/Itau";
import BradescoSeguros from "./pages/seguradoras/Bradesco";
import Mitsui from "./pages/seguradoras/Mitsui";
import SeguradorasHub from "./pages/seguradoras/SeguradorasHub";
import PartnerInsurerPage from "./components/PartnerInsurerPage";
import SeguradorasParceirasHub from "./pages/SeguradorasParceirasHub";
import SeguradoraParceiraSeoPage from "./pages/SeguradoraParceiraSeoPage";
import ComoCompararSeguradorasGuarulhos from "./pages/ComoCompararSeguradorasGuarulhos";
import SeguroBMW from "./pages/SeguroBMW";
import SeguroMarcaPremium from "./pages/SeguroMarcaPremium";




const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Fallback client-side para URLs desconhecidas.
 *
 * Consulta a camada central `src/lib/redirects.ts` (mesma fonte usada pelo
 * .htaccess e pelos stubs estáticos): 301 quando existe substituto
 * equivalente, 410 (tombstone noindex) para conteúdo removido sem
 * substituto, e 404 real nos demais casos. Nunca serve a homepage.
 */
const LegacyWpRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const resolved = resolveRoute(pathname);
  if (resolved.kind === "redirect") {
    return <Navigate to={`${resolved.to}${search}${hash}`} replace />;
  }
  if (resolved.kind === "gone") {
    return <NotFound gone />;
  }
  return <NotFound />;
};

/** `/artigos/:slug` → `/blog/:slug` em um único salto, preservando o slug. */
const ArtigosToBlogRedirect = () => {
  const { slug } = useParams();
  const { search, hash } = useLocation();
  if (!slug) return <Navigate to="/blog" replace />;
  return <Navigate to={`/blog/${slug}${search}${hash}`} replace />;
};

const PerformanceDiagnostico = lazy(() => import("./pages/PerformanceDiagnostico"));
const ConversionDashboard = lazy(() => import("./pages/ConversionDashboard"));
const SeoTechnicalReport = lazy(() => import("./pages/SeoTechnicalReport"));
const PagespeedHistory = lazy(() => import("./pages/PagespeedHistory"));
const DynamicLandingPage = lazy(() => import("./pages/DynamicLandingPage"));
const SchemaDashboard = lazy(() => import("./pages/SchemaDashboard"));
const SeoScanSummary = lazy(() => import("./pages/SeoScanSummary"));
const AdminSeoMonitor = lazy(() => import("./pages/AdminSeoMonitor"));
const Diagnostico = lazy(() => import("./pages/Diagnostico"));
const PurgeLogs = lazy(() => import("./pages/PurgeLogs"));
const WebVitalsCorrelation = lazy(() => import("./pages/admin/WebVitalsCorrelation"));
const MonitorIndexacao = lazy(() => import("./pages/admin/MonitorIndexacao"));
const GscWebVitals = lazy(() => import("./pages/admin/GscWebVitals"));
const FaqUnderfilled = lazy(() => import("./pages/admin/FaqUnderfilled"));
const GscKeywordPerformance = lazy(() => import("./pages/admin/GscKeywordPerformance"));
const InternalLinkCorrelation = lazy(() => import("./pages/admin/InternalLinkCorrelation"));
const NextSectionCtaReport = lazy(() => import("./pages/admin/NextSectionCtaReport"));
const BreadcrumbsAdmin = lazy(() => import("./pages/admin/BreadcrumbsAdmin"));
const AnchorAlerts = lazy(() => import("./pages/admin/AnchorAlerts"));
const DomainDrift = lazy(() => import("./pages/admin/DomainDrift"));

// RequireAdmin puxa `@/integrations/supabase/client` estaticamente (~50 KB).
// Como só é usado em rotas /admin/* e /crm (todas lazy), carregamos sob demanda
// para manter o bundle do entry livre do Supabase.
const RequireAdmin = lazy(
  () => import("@/components/RequireAdmin"),
) as React.LazyExoticComponent<React.ComponentType<{ children: React.ReactNode }>>;

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
          return failureCount < 3;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 8000),
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

const DeferredGlobalUi = () => {
  const { pathname } = useLocation();
  const dronePreview = (pathname === DRONE_PREVIEW_PATH || pathname === RETA_PREVIEW_PATH) &&
    typeof window !== "undefined" && isDronePreviewHost(window.location.hostname);
  // Drones usam consentimento no fluxo e ações locais, sem sobrepor o formulário.
  if (dronePreview || pathname === "/seguro-drone-agricola" || pathname === "/seguro-reta-drone") return null;
  return (
    <Suspense fallback={null}>
      <WhatsAppButton />
      <CookieBanner />
    </Suspense>
  );
};

const App = () => {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    // Adia o warm-up do Supabase auth para requestIdleCallback (fallback
    // para setTimeout via scheduleIdle) — assim o import do client (~50 KB
    // gz) não compete com o LCP em devices lentos.
    scheduleIdle(() => {
      if (cancelled) return;
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
    }, 3000);

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const cleanupKey = "patro_legacy_cache_cleanup_v2";
    const safeStorage = {
      get: () => {
        try { return localStorage.getItem(cleanupKey); } catch { return "done"; }
      },
      done: () => {
        try { localStorage.setItem(cleanupKey, "done"); } catch { /* storage unavailable */ }
      },
    };
    if (safeStorage.get() === "done") return;

    const timer = globalThis.setTimeout(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => registration.unregister());
        });
      }

      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
          safeStorage.done();
        });
      } else {
        safeStorage.done();
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
              <SkipLink />
              {/* WebSite + SiteNavigationElement agora vivem estaticamente em
                  index.html para sobreviver ao prerender (ex.: validador de
                  rich snippets). Não emitir via Helmet aqui para evitar
                  duplicidade após hidratação. */}
              <Suspense fallback={null}>
                <Toaster />
                <Sonner position="top-right" closeButton richColors />
              </Suspense>
              <DeferredGlobalUi />
              <ScrollToTop />
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path={DRONE_PREVIEW_PATH} element={<DroneAgricolaPreview />} />
                  <Route path={RETA_PREVIEW_PATH} element={<DroneAgricolaPreview />} />
                <Route path={B2B_HUB_PATH} element={<SegurosEmpresariaisEspecializados />} />
                <Route path={GARANTIA_LOCAL_PATH} element={<SeguroGarantiaGuarulhos />} />
                <Route path={CREDITO_HUB_PATH} element={<SeguroDeCredito />} />
                <Route path={CREDITO_LOCAL_PATH} element={<SeguroDeCreditoGuarulhos />} />
                {[...GARANTIA_INTENT_PAGES, ...CREDITO_INTENT_PAGES].map((p) => (
                  <Route key={p.slug} path={p.path} element={<B2bIntentRoute slug={p.slug} />} />
                ))}
                {B2B_INSURER_PAGES.map((p) => (
                  <Route key={p.slug} path={p.path} element={<B2bInsurerRoute slug={p.slug} />} />
                ))}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/crm" element={<RequireAdmin><CRM /></RequireAdmin>} />
                  <Route path="/sobre" element={<Sobre />} />
                  <Route path="/verificar-susep" element={<VerificarSusep />} />
                  <Route path="/parceiros" element={<Parceiros />} />
                  <Route path="/cotacao" element={<Cotacao />} />
                  <Route path="/cotacao/obrigado" element={<CotacaoObrigado />} />
                  <Route path="/indique-e-ganhe" element={<IndiqueEGanhe />} />
                  <Route path="/obrigado-indicacao" element={<ObrigadoIndicacao />} />
                  <Route path="/cotacao/auto" element={<Navigate to="/cotacao-seguro-auto" replace />} />
                  <Route path="/cotacao/empresarial" element={<Navigate to="/solucoes-empresariais" replace />} />
                  <Route path="/cotacao/saude" element={<Navigate to="/seguro-saude" replace />} />
                  <Route path="/cotacao/consorcio" element={<Navigate to="/consorcio" replace />} />
                  <Route path="/contato" element={<Contato />} />
                  <Route path="/servicos" element={<Servicos />} />
                  <Route path="/todos-os-seguros" element={<TodosOsSeguros />} />
                  <Route path="/artigos-sobre-seguros" element={<InsuranceEditorial />} />
                  <Route path="/seguro-vida-sucessao" element={<InsuranceEditorial />} />
                  <Route path="/artigo-seguro-auto-coberturas" element={<InsuranceEditorial />} />
                  <Route path="/artigo-seguro-residencial-patrimonio" element={<InsuranceEditorial />} />
                  <Route path="/artigo-seguro-empresarial-continuidade" element={<InsuranceEditorial />} />
                  <Route path="/artigo-seguro-rc-profissional" element={<InsuranceEditorial />} />
                  <Route path="/artigo-seguro-maquinas-equipamentos" element={<InsuranceEditorial />} />
                  <Route path="/artigo-seguro-drone-agricola-casco-reta" element={<InsuranceEditorial />} />
                  <Route path="/artigo-seguro-viagem-assistencia" element={<InsuranceEditorial />} />
                  <Route path="/depoimentos" element={<Depoimentos />} />
                  <Route path="/avaliacoes-clientes" element={<AvaliacoesClientes />} />
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
                  <Route path="/cotacao-auto" element={<CotacaoAutoRedirect />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/calendario-90-dias" element={<BlogCalendario90Dias />} />
                  <Route path="/blog/cluster/:cluster" element={<BlogCluster />} />
                  <Route path="/blog/categoria/:categoria" element={<BlogCategory />} />
                  <Route path="/blog/autor/:slug" element={<BlogAuthor />} />
                  <Route path="/artigos" element={<Navigate to="/blog" replace />} />
                  <Route path="/artigos/:slug" element={<ArtigosToBlogRedirect />} />
                  <Route path="/blog/:slug" element={<BlogArticle />} />
                  <Route path="/seguro-maquinas-agricolas" element={<SeguroMaquinasAgricolas />} />
                  {/* Expansão regional — hub Grande São Paulo + bairros piloto da capital */}
                  <Route path="/grande-sao-paulo" element={<GrandeSaoPaulo />} />
                  <Route path="/atendimento-digital" element={<AtendimentoDigital />} />
                  <Route path="/cotacao-seguro-auto-por-bairro" element={<CotacaoComparativaBairros />} />
                  {[
                    "seguro-auto-itaim-bibi",
                    "seguro-auto-moema",
                    "seguro-auto-vila-nova-conceicao",
                    "seguro-auto-jardim-paulista",
                    "seguro-auto-vila-olimpia",
                    "seguro-auto-pinheiros",
                    "seguro-auto-brooklin",
                    "seguro-auto-vila-mariana",
                    "seguro-auto-campo-belo",
                    "seguro-auto-perdizes",
                  ].map((s) => (
                    <Route key={s} path={`/${s}`} element={<SeguroAutoBairroSp slug={s} />} />
                  ))}
                  {/* Hubs de bairro Grupo A — rotas literais para o prerender (Fase 3) */}
                  <Route path="/atendimento-nacional/estado/parana" element={<SeguroRegiaoEstado estadoSlug="parana" />} />
                  <Route path="/atendimento-nacional/estado/santa-catarina" element={<SeguroRegiaoEstado estadoSlug="santa-catarina" />} />
                  <Route path="/atendimento-nacional/estado/rio-grande-do-sul" element={<SeguroRegiaoEstado estadoSlug="rio-grande-do-sul" />} />
                  <Route path="/atendimento-nacional/estado/sao-paulo-interior" element={<SeguroRegiaoEstado estadoSlug="sao-paulo-interior" />} />
                  <Route path="/atendimento-nacional/estado/minas-gerais" element={<SeguroRegiaoEstado estadoSlug="minas-gerais" />} />
                  <Route path="/atendimento-nacional/estado/rio-de-janeiro" element={<SeguroRegiaoEstado estadoSlug="rio-de-janeiro" />} />
                  <Route path="/atendimento-nacional/estado/espirito-santo" element={<SeguroRegiaoEstado estadoSlug="espirito-santo" />} />
                  <Route path="/atendimento-nacional/estado/mato-grosso" element={<SeguroRegiaoEstado estadoSlug="mato-grosso" />} />
                  <Route path="/atendimento-nacional/estado/mato-grosso-do-sul" element={<SeguroRegiaoEstado estadoSlug="mato-grosso-do-sul" />} />
                  <Route path="/atendimento-nacional/estado/goias" element={<SeguroRegiaoEstado estadoSlug="goias" />} />
                  <Route path="/atendimento-nacional/estado/distrito-federal" element={<SeguroRegiaoEstado estadoSlug="distrito-federal" />} />
                  <Route path="/atendimento-nacional/estado/bahia" element={<SeguroRegiaoEstado estadoSlug="bahia" />} />
                  <Route path="/atendimento-nacional/estado/maranhao" element={<SeguroRegiaoEstado estadoSlug="maranhao" />} />
                  <Route path="/atendimento-nacional/estado/piaui" element={<SeguroRegiaoEstado estadoSlug="piaui" />} />
                  <Route path="/atendimento-nacional/estado/pernambuco" element={<SeguroRegiaoEstado estadoSlug="pernambuco" />} />
                  <Route path="/atendimento-nacional/estado/ceara" element={<SeguroRegiaoEstado estadoSlug="ceara" />} />
                  <Route path="/atendimento-nacional/estado/rio-grande-do-norte" element={<SeguroRegiaoEstado estadoSlug="rio-grande-do-norte" />} />
                  <Route path="/atendimento-nacional/estado/paraiba" element={<SeguroRegiaoEstado estadoSlug="paraiba" />} />
                  <Route path="/atendimento-nacional/estado/alagoas" element={<SeguroRegiaoEstado estadoSlug="alagoas" />} />
                  <Route path="/atendimento-nacional/estado/sergipe" element={<SeguroRegiaoEstado estadoSlug="sergipe" />} />
                  <Route path="/atendimento-nacional/estado/tocantins" element={<SeguroRegiaoEstado estadoSlug="tocantins" />} />
                  <Route path="/atendimento-nacional/estado/para" element={<SeguroRegiaoEstado estadoSlug="para" />} />
                  <Route path="/atendimento-nacional/estado/rondonia" element={<SeguroRegiaoEstado estadoSlug="rondonia" />} />
                  <Route path="/atendimento-nacional/estado/amazonas" element={<SeguroRegiaoEstado estadoSlug="amazonas" />} />
                  <Route path="/atendimento-nacional/estado/acre" element={<SeguroRegiaoEstado estadoSlug="acre" />} />
                  <Route path="/atendimento-nacional/estado/roraima" element={<SeguroRegiaoEstado estadoSlug="roraima" />} />
                  <Route path="/atendimento-nacional/estado/amapa" element={<SeguroRegiaoEstado estadoSlug="amapa" />} />
                  <Route path="/atendimento-nacional/cidade/curitiba-pr" element={<SeguroRegiaoEstado cidadeSlug="curitiba-pr" />} />
                  <Route path="/atendimento-nacional/cidade/londrina-pr" element={<SeguroRegiaoEstado cidadeSlug="londrina-pr" />} />
                  <Route path="/atendimento-nacional/cidade/maringa-pr" element={<SeguroRegiaoEstado cidadeSlug="maringa-pr" />} />
                  <Route path="/atendimento-nacional/cidade/cascavel-pr" element={<SeguroRegiaoEstado cidadeSlug="cascavel-pr" />} />
                  <Route path="/atendimento-nacional/cidade/ponta-grossa-pr" element={<SeguroRegiaoEstado cidadeSlug="ponta-grossa-pr" />} />
                  <Route path="/atendimento-nacional/cidade/toledo-pr" element={<SeguroRegiaoEstado cidadeSlug="toledo-pr" />} />
                  <Route path="/atendimento-nacional/cidade/florianopolis-sc" element={<SeguroRegiaoEstado cidadeSlug="florianopolis-sc" />} />
                  <Route path="/atendimento-nacional/cidade/joinville-sc" element={<SeguroRegiaoEstado cidadeSlug="joinville-sc" />} />
                  <Route path="/atendimento-nacional/cidade/blumenau-sc" element={<SeguroRegiaoEstado cidadeSlug="blumenau-sc" />} />
                  <Route path="/atendimento-nacional/cidade/chapeco-sc" element={<SeguroRegiaoEstado cidadeSlug="chapeco-sc" />} />
                  <Route path="/atendimento-nacional/cidade/itajai-sc" element={<SeguroRegiaoEstado cidadeSlug="itajai-sc" />} />
                  <Route path="/atendimento-nacional/cidade/porto-alegre-rs" element={<SeguroRegiaoEstado cidadeSlug="porto-alegre-rs" />} />
                  <Route path="/atendimento-nacional/cidade/caxias-do-sul-rs" element={<SeguroRegiaoEstado cidadeSlug="caxias-do-sul-rs" />} />
                  <Route path="/atendimento-nacional/cidade/passo-fundo-rs" element={<SeguroRegiaoEstado cidadeSlug="passo-fundo-rs" />} />
                  <Route path="/atendimento-nacional/cidade/santa-maria-rs" element={<SeguroRegiaoEstado cidadeSlug="santa-maria-rs" />} />
                  <Route path="/atendimento-nacional/cidade/cruz-alta-rs" element={<SeguroRegiaoEstado cidadeSlug="cruz-alta-rs" />} />
                  <Route path="/atendimento-nacional/cidade/campinas-sp" element={<SeguroRegiaoEstado cidadeSlug="campinas-sp" />} />
                  <Route path="/atendimento-nacional/cidade/ribeirao-preto-sp" element={<SeguroRegiaoEstado cidadeSlug="ribeirao-preto-sp" />} />
                  <Route path="/atendimento-nacional/cidade/sorocaba-sp" element={<SeguroRegiaoEstado cidadeSlug="sorocaba-sp" />} />
                  <Route path="/atendimento-nacional/cidade/sao-jose-dos-campos-sp" element={<SeguroRegiaoEstado cidadeSlug="sao-jose-dos-campos-sp" />} />
                  <Route path="/atendimento-nacional/cidade/piracicaba-sp" element={<SeguroRegiaoEstado cidadeSlug="piracicaba-sp" />} />
                  <Route path="/atendimento-nacional/cidade/bauru-sp" element={<SeguroRegiaoEstado cidadeSlug="bauru-sp" />} />
                  <Route path="/atendimento-nacional/cidade/santos-sp" element={<SeguroRegiaoEstado cidadeSlug="santos-sp" />} />
                  <Route path="/atendimento-nacional/cidade/belo-horizonte-mg" element={<SeguroRegiaoEstado cidadeSlug="belo-horizonte-mg" />} />
                  <Route path="/atendimento-nacional/cidade/uberlandia-mg" element={<SeguroRegiaoEstado cidadeSlug="uberlandia-mg" />} />
                  <Route path="/atendimento-nacional/cidade/uberaba-mg" element={<SeguroRegiaoEstado cidadeSlug="uberaba-mg" />} />
                  <Route path="/atendimento-nacional/cidade/patos-de-minas-mg" element={<SeguroRegiaoEstado cidadeSlug="patos-de-minas-mg" />} />
                  <Route path="/atendimento-nacional/cidade/montes-claros-mg" element={<SeguroRegiaoEstado cidadeSlug="montes-claros-mg" />} />
                  <Route path="/atendimento-nacional/cidade/rio-de-janeiro-rj" element={<SeguroRegiaoEstado cidadeSlug="rio-de-janeiro-rj" />} />
                  <Route path="/atendimento-nacional/cidade/niteroi-rj" element={<SeguroRegiaoEstado cidadeSlug="niteroi-rj" />} />
                  <Route path="/atendimento-nacional/cidade/campos-dos-goytacazes-rj" element={<SeguroRegiaoEstado cidadeSlug="campos-dos-goytacazes-rj" />} />
                  <Route path="/atendimento-nacional/cidade/volta-redonda-rj" element={<SeguroRegiaoEstado cidadeSlug="volta-redonda-rj" />} />
                  <Route path="/atendimento-nacional/cidade/vitoria-es" element={<SeguroRegiaoEstado cidadeSlug="vitoria-es" />} />
                  <Route path="/atendimento-nacional/cidade/serra-es" element={<SeguroRegiaoEstado cidadeSlug="serra-es" />} />
                  <Route path="/atendimento-nacional/cidade/linhares-es" element={<SeguroRegiaoEstado cidadeSlug="linhares-es" />} />
                  <Route path="/atendimento-nacional/cidade/cachoeiro-de-itapemirim-es" element={<SeguroRegiaoEstado cidadeSlug="cachoeiro-de-itapemirim-es" />} />
                  <Route path="/atendimento-nacional/cidade/cuiaba-mt" element={<SeguroRegiaoEstado cidadeSlug="cuiaba-mt" />} />
                  <Route path="/atendimento-nacional/cidade/rondonopolis-mt" element={<SeguroRegiaoEstado cidadeSlug="rondonopolis-mt" />} />
                  <Route path="/atendimento-nacional/cidade/sinop-mt" element={<SeguroRegiaoEstado cidadeSlug="sinop-mt" />} />
                  <Route path="/atendimento-nacional/cidade/sorriso-mt" element={<SeguroRegiaoEstado cidadeSlug="sorriso-mt" />} />
                  <Route path="/atendimento-nacional/cidade/lucas-do-rio-verde-mt" element={<SeguroRegiaoEstado cidadeSlug="lucas-do-rio-verde-mt" />} />
                  <Route path="/atendimento-nacional/cidade/primavera-do-leste-mt" element={<SeguroRegiaoEstado cidadeSlug="primavera-do-leste-mt" />} />
                  <Route path="/atendimento-nacional/cidade/campo-grande-ms" element={<SeguroRegiaoEstado cidadeSlug="campo-grande-ms" />} />
                  <Route path="/atendimento-nacional/cidade/dourados-ms" element={<SeguroRegiaoEstado cidadeSlug="dourados-ms" />} />
                  <Route path="/atendimento-nacional/cidade/tres-lagoas-ms" element={<SeguroRegiaoEstado cidadeSlug="tres-lagoas-ms" />} />
                  <Route path="/atendimento-nacional/cidade/maracaju-ms" element={<SeguroRegiaoEstado cidadeSlug="maracaju-ms" />} />
                  <Route path="/atendimento-nacional/cidade/goiania-go" element={<SeguroRegiaoEstado cidadeSlug="goiania-go" />} />
                  <Route path="/atendimento-nacional/cidade/rio-verde-go" element={<SeguroRegiaoEstado cidadeSlug="rio-verde-go" />} />
                  <Route path="/atendimento-nacional/cidade/jatai-go" element={<SeguroRegiaoEstado cidadeSlug="jatai-go" />} />
                  <Route path="/atendimento-nacional/cidade/anapolis-go" element={<SeguroRegiaoEstado cidadeSlug="anapolis-go" />} />
                  <Route path="/atendimento-nacional/cidade/cristalina-go" element={<SeguroRegiaoEstado cidadeSlug="cristalina-go" />} />
                  <Route path="/atendimento-nacional/cidade/brasilia-df" element={<SeguroRegiaoEstado cidadeSlug="brasilia-df" />} />
                  <Route path="/atendimento-nacional/cidade/salvador-ba" element={<SeguroRegiaoEstado cidadeSlug="salvador-ba" />} />
                  <Route path="/atendimento-nacional/cidade/luis-eduardo-magalhaes-ba" element={<SeguroRegiaoEstado cidadeSlug="luis-eduardo-magalhaes-ba" />} />
                  <Route path="/atendimento-nacional/cidade/barreiras-ba" element={<SeguroRegiaoEstado cidadeSlug="barreiras-ba" />} />
                  <Route path="/atendimento-nacional/cidade/feira-de-santana-ba" element={<SeguroRegiaoEstado cidadeSlug="feira-de-santana-ba" />} />
                  <Route path="/atendimento-nacional/cidade/juazeiro-ba" element={<SeguroRegiaoEstado cidadeSlug="juazeiro-ba" />} />
                  <Route path="/atendimento-nacional/cidade/sao-luis-ma" element={<SeguroRegiaoEstado cidadeSlug="sao-luis-ma" />} />
                  <Route path="/atendimento-nacional/cidade/balsas-ma" element={<SeguroRegiaoEstado cidadeSlug="balsas-ma" />} />
                  <Route path="/atendimento-nacional/cidade/imperatriz-ma" element={<SeguroRegiaoEstado cidadeSlug="imperatriz-ma" />} />
                  <Route path="/atendimento-nacional/cidade/teresina-pi" element={<SeguroRegiaoEstado cidadeSlug="teresina-pi" />} />
                  <Route path="/atendimento-nacional/cidade/urucui-pi" element={<SeguroRegiaoEstado cidadeSlug="urucui-pi" />} />
                  <Route path="/atendimento-nacional/cidade/bom-jesus-pi" element={<SeguroRegiaoEstado cidadeSlug="bom-jesus-pi" />} />
                  <Route path="/atendimento-nacional/cidade/recife-pe" element={<SeguroRegiaoEstado cidadeSlug="recife-pe" />} />
                  <Route path="/atendimento-nacional/cidade/petrolina-pe" element={<SeguroRegiaoEstado cidadeSlug="petrolina-pe" />} />
                  <Route path="/atendimento-nacional/cidade/caruaru-pe" element={<SeguroRegiaoEstado cidadeSlug="caruaru-pe" />} />
                  <Route path="/atendimento-nacional/cidade/fortaleza-ce" element={<SeguroRegiaoEstado cidadeSlug="fortaleza-ce" />} />
                  <Route path="/atendimento-nacional/cidade/juazeiro-do-norte-ce" element={<SeguroRegiaoEstado cidadeSlug="juazeiro-do-norte-ce" />} />
                  <Route path="/atendimento-nacional/cidade/sobral-ce" element={<SeguroRegiaoEstado cidadeSlug="sobral-ce" />} />
                  <Route path="/atendimento-nacional/cidade/natal-rn" element={<SeguroRegiaoEstado cidadeSlug="natal-rn" />} />
                  <Route path="/atendimento-nacional/cidade/mossoro-rn" element={<SeguroRegiaoEstado cidadeSlug="mossoro-rn" />} />
                  <Route path="/atendimento-nacional/cidade/joao-pessoa-pb" element={<SeguroRegiaoEstado cidadeSlug="joao-pessoa-pb" />} />
                  <Route path="/atendimento-nacional/cidade/campina-grande-pb" element={<SeguroRegiaoEstado cidadeSlug="campina-grande-pb" />} />
                  <Route path="/atendimento-nacional/cidade/maceio-al" element={<SeguroRegiaoEstado cidadeSlug="maceio-al" />} />
                  <Route path="/atendimento-nacional/cidade/arapiraca-al" element={<SeguroRegiaoEstado cidadeSlug="arapiraca-al" />} />
                  <Route path="/atendimento-nacional/cidade/aracaju-se" element={<SeguroRegiaoEstado cidadeSlug="aracaju-se" />} />
                  <Route path="/atendimento-nacional/cidade/itabaiana-se" element={<SeguroRegiaoEstado cidadeSlug="itabaiana-se" />} />
                  <Route path="/atendimento-nacional/cidade/palmas-to" element={<SeguroRegiaoEstado cidadeSlug="palmas-to" />} />
                  <Route path="/atendimento-nacional/cidade/araguaina-to" element={<SeguroRegiaoEstado cidadeSlug="araguaina-to" />} />
                  <Route path="/atendimento-nacional/cidade/gurupi-to" element={<SeguroRegiaoEstado cidadeSlug="gurupi-to" />} />
                  <Route path="/atendimento-nacional/cidade/porto-nacional-to" element={<SeguroRegiaoEstado cidadeSlug="porto-nacional-to" />} />
                  <Route path="/atendimento-nacional/cidade/belem-pa" element={<SeguroRegiaoEstado cidadeSlug="belem-pa" />} />
                  <Route path="/atendimento-nacional/cidade/paragominas-pa" element={<SeguroRegiaoEstado cidadeSlug="paragominas-pa" />} />
                  <Route path="/atendimento-nacional/cidade/maraba-pa" element={<SeguroRegiaoEstado cidadeSlug="maraba-pa" />} />
                  <Route path="/atendimento-nacional/cidade/santarem-pa" element={<SeguroRegiaoEstado cidadeSlug="santarem-pa" />} />
                  <Route path="/atendimento-nacional/cidade/porto-velho-ro" element={<SeguroRegiaoEstado cidadeSlug="porto-velho-ro" />} />
                  <Route path="/atendimento-nacional/cidade/vilhena-ro" element={<SeguroRegiaoEstado cidadeSlug="vilhena-ro" />} />
                  <Route path="/atendimento-nacional/cidade/ji-parana-ro" element={<SeguroRegiaoEstado cidadeSlug="ji-parana-ro" />} />
                  <Route path="/atendimento-nacional/cidade/manaus-am" element={<SeguroRegiaoEstado cidadeSlug="manaus-am" />} />
                  <Route path="/atendimento-nacional/cidade/rio-branco-ac" element={<SeguroRegiaoEstado cidadeSlug="rio-branco-ac" />} />
                  <Route path="/atendimento-nacional/cidade/boa-vista-rr" element={<SeguroRegiaoEstado cidadeSlug="boa-vista-rr" />} />
                  <Route path="/atendimento-nacional/cidade/macapa-ap" element={<SeguroRegiaoEstado cidadeSlug="macapa-ap" />} />
                  <Route path="/atendimento-nacional" element={<AtendimentoNacional />} />
                  <Route path="/atendimento-nacional/sul" element={<SeguroRegiaoEstado regiaoSlug="sul" />} />
                  <Route path="/atendimento-nacional/sudeste" element={<SeguroRegiaoEstado regiaoSlug="sudeste" />} />
                  <Route path="/atendimento-nacional/centro-oeste" element={<SeguroRegiaoEstado regiaoSlug="centro-oeste" />} />
                  <Route path="/atendimento-nacional/nordeste" element={<SeguroRegiaoEstado regiaoSlug="nordeste" />} />
                  <Route path="/atendimento-nacional/norte" element={<SeguroRegiaoEstado regiaoSlug="norte" />} />
                  <Route path="/itaim-bibi" element={<BairroHubSp bairroKey="itaim-bibi" />} />
                  <Route path="/moema" element={<BairroHubSp bairroKey="moema" />} />
                  <Route path="/vila-nova-conceicao" element={<BairroHubSp bairroKey="vila-nova-conceicao" />} />
                  <Route path="/jardim-paulista" element={<BairroHubSp bairroKey="jardim-paulista" />} />
                  <Route path="/vila-olimpia" element={<BairroHubSp bairroKey="vila-olimpia" />} />
                  <Route path="/pinheiros" element={<BairroHubSp bairroKey="pinheiros" />} />
                  <Route path="/brooklin" element={<BairroHubSp bairroKey="brooklin" />} />
                  <Route path="/vila-mariana" element={<BairroHubSp bairroKey="vila-mariana" />} />
                  <Route path="/campo-belo" element={<BairroHubSp bairroKey="campo-belo" />} />
                  <Route path="/perdizes" element={<BairroHubSp bairroKey="perdizes" />} />
                  {/* Seguro Residencial por bairro */}
                  <Route path="/seguro-residencial-itaim-bibi" element={<SeguroResidencialBairroSp bairroKey="itaim-bibi" />} />
                  <Route path="/seguro-residencial-moema" element={<SeguroResidencialBairroSp bairroKey="moema" />} />
                  <Route path="/seguro-residencial-vila-nova-conceicao" element={<SeguroResidencialBairroSp bairroKey="vila-nova-conceicao" />} />
                  <Route path="/seguro-residencial-jardim-paulista" element={<SeguroResidencialBairroSp bairroKey="jardim-paulista" />} />
                  <Route path="/seguro-residencial-vila-olimpia" element={<SeguroResidencialBairroSp bairroKey="vila-olimpia" />} />
                  <Route path="/seguro-residencial-pinheiros" element={<SeguroResidencialBairroSp bairroKey="pinheiros" />} />
                  <Route path="/seguro-residencial-brooklin" element={<SeguroResidencialBairroSp bairroKey="brooklin" />} />
                  <Route path="/seguro-residencial-vila-mariana" element={<SeguroResidencialBairroSp bairroKey="vila-mariana" />} />
                  <Route path="/seguro-residencial-campo-belo" element={<SeguroResidencialBairroSp bairroKey="campo-belo" />} />
                  <Route path="/seguro-residencial-perdizes" element={<SeguroResidencialBairroSp bairroKey="perdizes" />} />
                  {/* Seguro Empresarial por bairro */}
                  <Route path="/seguro-empresarial-itaim-bibi" element={<SeguroEmpresarialBairroSp bairroKey="itaim-bibi" />} />
                  <Route path="/seguro-empresarial-moema" element={<SeguroEmpresarialBairroSp bairroKey="moema" />} />
                  <Route path="/seguro-empresarial-vila-nova-conceicao" element={<SeguroEmpresarialBairroSp bairroKey="vila-nova-conceicao" />} />
                  <Route path="/seguro-empresarial-jardim-paulista" element={<SeguroEmpresarialBairroSp bairroKey="jardim-paulista" />} />
                  <Route path="/seguro-empresarial-vila-olimpia" element={<SeguroEmpresarialBairroSp bairroKey="vila-olimpia" />} />
                  <Route path="/seguro-empresarial-pinheiros" element={<SeguroEmpresarialBairroSp bairroKey="pinheiros" />} />
                  <Route path="/seguro-empresarial-brooklin" element={<SeguroEmpresarialBairroSp bairroKey="brooklin" />} />
                  <Route path="/seguro-empresarial-vila-mariana" element={<SeguroEmpresarialBairroSp bairroKey="vila-mariana" />} />
                  <Route path="/seguro-empresarial-campo-belo" element={<SeguroEmpresarialBairroSp bairroKey="campo-belo" />} />
                  <Route path="/seguro-empresarial-perdizes" element={<SeguroEmpresarialBairroSp bairroKey="perdizes" />} />
                  <Route path="/seguro-auto-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-maia-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-vila-augusta-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-bonsucesso" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-bonsucesso-guarulhos-v2" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-pimentas" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-pimentas-guarulhos" }); return <Comp />; })()} />
                  <Route path="/lp/seguro-acidentes-pessoais" element={<LandingSeguroAcidentesPessoais />} />
                  <Route path="/seguro-moto-entregadores-guarulhos" element={<LandingSeguroMotoEntregador />} />
                  <Route path="/lp/consorcio" element={<Consorcio />} />
                  <Route path="/lp/:slug" element={<DynamicLandingPage />} />
                  <Route path="/lp-maquinas-equipamentos" element={<LpMaquinasEquipamentos />} />
                  <Route path="/lp-transportes-360" element={<LpTransportes360 />} />
                  <Route path="/solucoes-empresariais" element={<SolucoesEmpresariais />} />
                  <Route path="/seguro-locadoras-equipamentos" element={<LpSeguroLocadorasEquipamentos />} />
                  <Route path="/seguro-galpoes-centros-distribuicao" element={<LpSeguroGalpoesCentrosDistribuicao />} />
                  <Route path="/seguro-cibernetico-empresas" element={<LpSeguroCiberneticoEmpresas />} />
                  <Route path="/responsabilidade-administradores-profissionais" element={<LpResponsabilidadeAdminProf />} />
                  <Route path="/diagnostico" element={<Diagnostico />} />

                  {/* ... other specific routes ... */}
                  <Route path="/admin/purge-logs" element={<RequireAdmin><PurgeLogs /></RequireAdmin>} />
                  <Route path="/admin/performance" element={<RequireAdmin><PerformanceDiagnostico /></RequireAdmin>} />
                  <Route path="/admin/seo-tecnico" element={<RequireAdmin><SeoTechnicalReport /></RequireAdmin>} />
                  <Route path="/admin/conversoes" element={<RequireAdmin><ConversionDashboard /></RequireAdmin>} />
                  <Route path="/admin/web-vitals-correlacao" element={<RequireAdmin><WebVitalsCorrelation /></RequireAdmin>} />
                  <Route path="/admin/monitor-indexacao" element={<RequireAdmin><MonitorIndexacao /></RequireAdmin>} />
                  <Route path="/admin/gsc-web-vitals" element={<RequireAdmin><GscWebVitals /></RequireAdmin>} />
                  <Route path="/admin/faq-underfilled" element={<RequireAdmin><FaqUnderfilled /></RequireAdmin>} />
                  <Route path="/admin/gsc-keywords" element={<RequireAdmin><GscKeywordPerformance /></RequireAdmin>} />
                  <Route path="/admin/links-internos" element={<RequireAdmin><InternalLinkCorrelation /></RequireAdmin>} />
                  <Route path="/admin/alertas-ancoras" element={<RequireAdmin><AnchorAlerts /></RequireAdmin>} />
                  <Route path="/admin/next-section-cta" element={<RequireAdmin><NextSectionCtaReport /></RequireAdmin>} />
                  <Route path="/admin/breadcrumbs" element={<RequireAdmin><BreadcrumbsAdmin /></RequireAdmin>} />
                  <Route path="/admin/dominios" element={<RequireAdmin><DomainDrift /></RequireAdmin>} />
                  <Route path="/admin/pagespeed" element={<RequireAdmin><PagespeedHistory /></RequireAdmin>} />
                  <Route path="/admin/schemas" element={<RequireAdmin><SchemaDashboard /></RequireAdmin>} />
                  <Route path="/admin/seo-resumo" element={<RequireAdmin><SeoScanSummary /></RequireAdmin>} />
                  <Route path="/admin/seo-monitor" element={<RequireAdmin><AdminSeoMonitor /></RequireAdmin>} />
                  <Route path="/investimentos" element={<Investimentos />} />
                  {/* === Rotas restauradas (Fase 1: correção de 73 links quebrados no menu/hubs) === */}
                  <Route path="/central-de-sinistro" element={<CentralDeSinistro />} />
                  <Route path="/telefones-seguradoras" element={<TelefonesSeguradoras />} />
                  <Route path="/consulta-tabela-fipe" element={<ConsultaTabelaFipe />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                  {/* Alias legado/typo — evita 404 */}
                  <Route path="/politica-de-privacidade" element={<Navigate to="/politica-privacidade" replace />} />
                  <Route path="/termos-de-uso" element={<TermosDeUso />} />
                  <Route path="/sobre-guarulhos" element={<SobreGuarulhos />} />
                  {/* Hub municipal único; o alias é redirecionado abaixo. */}
                  <Route path="/seguros-guarulhos" element={<HubSegurosGuarulhos />} />
                  <Route path="/seguros-guarulhos/:bairro" element={<SegurosGuarulhosBairros />} />
                  <Route path="/seguros-shopping-maia-cidade-maia-guarulhos" element={<SeoSegurosShoppingMaiaCidadeMaia />} />
                  <Route path="/comparativo-planos-saude-guarulhos" element={<ComparativoPlanosSaude />} />
                  <Route path="/seguro-auto-guarulhos" element={<SeoSeguroAutoGuarulhos />} />
                  {/* Consórcio */}
                  <Route path="/consorcio" element={<Consorcio />} />
                  <Route path="/consorcio-guarulhos" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/consorcio-imoveis-guarulhos" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/consorcio-veiculos-guarulhos" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/consorcio-caminhoes-guarulhos" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/consorcio-empresarial-guarulhos" element={<ConsorcioGuarulhosVertical />} />
                  
                  <Route path="/consorcio-carro" element={<Navigate to="/consorcio-veiculos" replace />} />
                  <Route path="/consorcio-veiculos-pesados" element={<Navigate to="/consorcio-pesados-maquinas" replace />} />
                  <Route path="/consorcio-imoveis" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/consorcio-veiculos" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/consorcio-pesados-maquinas" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/consorcio-servicos" element={<ConsorcioGuarulhosVertical />} />
                  <Route path="/ebook-consorcio" element={<EbookConsorcio />} />
                  {/* RC */}
                  <Route path="/seguro-rc-medicos" element={<SeguroRCMedicos />} />
                  <Route path="/seguro-rc-dentistas" element={<SeguroRCDentistas />} />
                  <Route path="/seguro-rc-advogados" element={<SeguroRCAdvogados />} />
                  <Route path="/seguro-rc-engenheiros" element={<SeguroRCEngenheiros />} />
                  <Route path="/seguro-rc-veterinarios" element={<SeguroRCVeterinarios />} />
                  <Route path="/seguro-rc-executivos" element={<SeguroRCExecutivos />} />
                  <Route path="/seguro-rc-obras" element={<SeguroRCObras />} />
                  <Route path="/seguro-rc-prestacao-servicos" element={<SeguroRCPrestacaoServicos />} />
                  <Route path="/seguro-rc-eventos" element={<SeguroRCEventos />} />
                  {/* Patrimônio / Empresarial */}
                  <Route path="/seguro-galpao" element={<SeguroGalpao />} />
                  <Route path="/seguro-galpoes-industriais" element={<SeguroGalpoesIndustriais />} />
                  <Route path="/seguro-armazenagem" element={<SeguroArmazenagem />} />
                  <Route path="/seguro-condominio-empresarial" element={<SeguroCondominioEmpresarial />} />
                  <Route path="/seguro-condominio-residencial" element={<SeguroCondominioResidencial />} />
                  <Route path="/seguro-lojas-shopping" element={<SeguroLojasShopping />} />
                  <Route path="/seguro-restaurante" element={<SeguroRestaurante />} />
                  <Route path="/seguro-imobiliario" element={<SeguroImobiliario />} />
                  <Route path="/seguro-placa-solar" element={<SeguroPlacaSolar />} />
                  <Route path="/seguro-ambiental" element={<SeguroAmbiental />} />
                  <Route path="/seguro-garantia" element={<SeguroGarantia />} />
                  <Route path="/seguro-garantia-judicial-guarulhos" element={<SpecializedVerticalPage />} />
                  <Route path="/seguro-credito-empresarial-guarulhos" element={<SpecializedVerticalPage />} />
                  <Route path="/seguro-carro-eletrico-guarulhos" element={<SpecializedVerticalPage />} />
                  <Route path="/seguro-maquinas-industriais" element={<SeguroMaquinasIndustriais />} />
                  <Route path="/seguro-maquinas-linha-amarela" element={<SeguroMaquinasLinhaAmarela />} />
                  <Route path="/seguro-trator-industrial" element={<SeguroTratorIndustrial />} />
                  {/* Agro */}
                  <Route path="/seguro-pecuario" element={<SeguroPecuario />} />
                  <Route path="/seguro-cafe" element={<SeguroCafe />} />
                  <Route path="/seguro-geada" element={<SeguroGeada />} />
                  <Route path="/seguro-granja" element={<SeguroGranja />} />
                  <Route path="/seguro-propriedade-rural" element={<SeguroPropriedadeRural />} />
                  <Route path="/seguro-equipamentos-agricolas" element={<SeguroEquipamentosAgricolas />} />
                  <Route path="/seguro-drone-agricola" element={<SeguroDroneAgricola />} />
                   <Route path="/seguro-reta-drone" element={<SeguroRetaDrone />} />
                   <Route path="/seguro-drone" element={<SeguroDrone />} />
                  <Route path="/seguro-transporte-agro" element={<SeguroTransporteAgro />} />
                  <Route path="/seguro-trator-agricola" element={<SeguroTratorAgricola />} />
                  <Route path="/seguro-colhedora-cana" element={<SeguroColhedoraCana />} />
                  <Route path="/seguro-colhedora-algodao" element={<SeguroColhedoraAlgodao />} />
                  <Route path="/seguro-colheitadeira-graos" element={<SeguroColheitadeiraGraos />} />
                  <Route path="/seguro-pulverizador-agricola" element={<SeguroPulverizadorAgricola />} />
                  <Route path="/seguro-silo-agricola" element={<SeguroSiloAgricola />} />
                  {/* Veículos / Transporte */}
                  <Route path="/seguro-caminhao" element={<SeguroCaminhao />} />
                  <Route path="/seguro-micro-onibus" element={<SeguroMicroOnibus />} />
                  <Route path="/seguro-motorista-app" element={<SeguroMotoristaApp />} />
                  <Route path="/seguro-app-motoristas-passageiros" element={<Navigate to="/seguro-acidentes-pessoais-passageiros" replace />} />
                  <Route path="/seguro-acidentes-pessoais-passageiros" element={<SeguroAcidentesPessoaisPassageiros />} />
                  <Route path="/seguro-app-motorista-aplicativo" element={<SeguroAppMotoristaAplicativo />} />
                  <Route path="/seguro-app-taxi-transporte-executivo" element={<SeguroAppTaxiExecutivo />} />
                  <Route path="/seguro-app-onibus-vans-frotas" element={<SeguroAppOnibusVansFrotas />} />

                  <Route path="/seguro-bike" element={<SeguroBike />} />
                  <Route path="/seguro-embarcacoes" element={<SeguroEmbarcacoes />} />
                  <Route path="/seguro-avioes" element={<SeguroAvioes />} />
                  <Route path="/seguro-helicopteros" element={<SeguroHelicopteros />} />
            <Route path="/seguro-auto-ezze-corinthians" element={<SeguroAutoEzzeCorinthians />} />
            <Route path="/seguro-carta-verde" element={<SeguroCartaVerde />} />
                  {/* Vida / Saúde / Pet */}
                  <Route path="/seguro-vida-pme" element={<SeguroVidaPME />} />
                  <Route path="/seguro-acidentes-pessoais" element={<SeguroAcidentesPessoais />} />
                  <Route path="/seguro-estagiario" element={<SeguroEstagiario />} />
                  <Route path="/seguro-funeral" element={<SeguroFuneral />} />
                  <Route path="/seguro-decesso" element={<SeguroDecesso />} />
                  <Route path="/seguro-fianca-locaticia" element={<SeguroFiancaLocaticia />} />
                  <Route path="/plano-pet" element={<PlanoPet />} />
                  <Route path="/plano-de-saude-empresarial-guarulhos" element={<PlanoSaudeGuarulhosVertical />} />
                  <Route path="/plano-de-saude-para-mei-guarulhos" element={<PlanoSaudeGuarulhosVertical />} />
                  <Route path="/plano-saude-empresarial" element={<PlanoSaudeEmpresarial />} />
                  <Route path="/protecao-pet-premium" element={<ProtecaoPetPremium />} />
                  <Route path="/seguro-petshop" element={<SeguroPetshop />} />
                  {/* Nichos / Parcerias / Odonto / Vet */}
                  <Route path="/nicho-transportadoras" element={<NichoTransportadoras />} />
                  {/* Página já existente cujo canonical/breadcrumb declara esta URL. */}
                  <Route path="/seguros-para-lojistas-guarulhos" element={<NichoLojistasGuarulhos />} />
                  <Route path="/parcerias-clinicas-odontologicas" element={<ParceriasClinicasOdontologicas />} />
                  <Route path="/parcerias-clinicas-veterinarias" element={<ParceriasClinicasVeterinarias />} />
                  <Route path="/seguro-clinica-odontologica" element={<SeguroClinicaOdontologica />} />
                  <Route path="/seguro-para-dentistas" element={<SeguroParaDentistas />} />
                  <Route path="/seguro-para-veterinarios" element={<SeguroParaVeterinarios />} />
                  <Route path="/seguro-clinica-veterinaria" element={<SeguroClinicaVeterinaria />} />
                  <Route path="/seguro-hospital-veterinario" element={<SeguroHospitalVeterinario />} />
                  <Route path="/seguro-equipamentos-veterinarios" element={<SeguroEquipamentosVeterinarios />} />
                  <Route path="/plano-saude-clinicas-veterinarias" element={<PlanoSaudeClinicasVeterinarias />} />
                  <Route path="/seguro-vida-clinicas-veterinarias" element={<SeguroVidaClinicasVeterinarias />} />
                  <Route path="/seguro-consultorio-odontologico" element={<SeguroConsultorioOdontologico />} />
                  <Route path="/seguro-equipamentos-odontologicos" element={<SeguroEquipamentosOdontologicos />} />
                  {/* === Vertical: Consultórios e Clínicas === */}
                  <Route path="/seguro-consultorio-guarulhos" element={<SeguroConsultorioGuarulhos />} />
                  <Route path="/seguro-consultorio-odontologico-guarulhos" element={<SeguroConsultorioOdontologicoGuarulhos />} />
                  <Route path="/seguro-consultorio-medico-guarulhos" element={<SeguroConsultorioMedicoGuarulhos />} />
                  <Route path="/seguro-consultorio-veterinario-guarulhos" element={<SeguroConsultorioVeterinarioGuarulhos />} />
                  <Route path="/seguro-clinica-estetica-guarulhos" element={<SeguroClinicaEsteticaGuarulhos />} />
                  <Route path="/seguro-clinica-pequena-guarulhos" element={<SeguroClinicaPequenaGuarulhos />} />
                  <Route path="/seguro-equipamentos-consultorio-guarulhos" element={<SeguroEquipamentosConsultorioGuarulhos />} />
                  <Route path="/seguro-flat-guarulhos" element={<SeguroFlatGuarulhos />} />
                  <Route path="/seguro-sala-comercial-guarulhos" element={<SeguroSalaComercialGuarulhos />} />
                  <Route path="/plano-saude-clinicas-odontologicas" element={<PlanoSaudeClinicasOdontologicas />} />
                  <Route path="/seguro-vida-clinicas-odontologicas" element={<SeguroVidaClinicasOdontologicas />} />
                  {/* === Patro Private === */}
                  <Route path="/patro-private" element={<PatroPrivate />} />
                  <Route path="/patro" element={<Patro />} />
                  <Route path="/seguro-auto-premium-guarulhos" element={<SeguroAutoPremiumGuarulhos />} />
                  <Route path="/seguro-carros-luxo-guarulhos" element={<SeguroCarrosLuxoGuarulhos />} />
                  <Route path="/seguro-residencial-alto-padrao-guarulhos" element={<SeguroResidencialAltoPadraoGuarulhos />} />
                  <Route path="/seguros-para-empresarios-guarulhos" element={<SegurosParaEmpresariosGuarulhos />} />
                  <Route path="/seguro-carro-blindado-guarulhos" element={<SeguroCarroBlindadoGuarulhos />} />
                  <Route path="/protecao-patrimonial-familiar-guarulhos" element={<ProtecaoPatrimonialFamiliarGuarulhos />} />
                  {/* === Fase 2: rotas faltantes + redirecionamentos para eliminar 404 em links internos === */}
                  <Route path="/seguro-jetski" element={<SeguroJetSki />} />
                  <Route path="/seguro-jet-ski" element={<Navigate to="/seguro-jetski" replace />} />
                  <Route path="/seguro-de-jet-ski" element={<Navigate to="/seguro-jetski" replace />} />
                  <Route path="/seguro-moto-aquatica" element={<Navigate to="/seguro-jetski" replace />} />
                  <Route path="/hub-empresarial" element={<HubEmpresarial />} />
                  <Route path="/seguros-empresariais" element={<HubEmpresarial />} />
                  <Route path="/seguro-empresarial/segmentos" element={<SegurosPorSegmento />} />
                  <Route path="/seguros-empresariais-pme-guarulhos" element={<SeoSegurosPmeGuarulhos />} />
                  <Route path="/seguro-residencial-guarulhos" element={<SeoSeguroResidencialGuarulhos />} />
                  <Route path="/seguro-vida-saude-guarulhos" element={<SeoSeguroVidaSaudeGuarulhos />} />
                  <Route path="/seguro-vida-guarulhos" element={<SeoSeguroVidaSaudeGuarulhos />} />
                  <Route path="/seguro-uber-guarulhos" element={<SeoSeguroUberGuarulhos />} />
                  <Route path="/seguro-frota-empresas-guarulhos" element={<SeoSeguroFrotaGuarulhos />} />
                  <Route path="/seguro-frota-guarulhos" element={<SeoSeguroFrotaGuarulhos />} />
                  <Route path="/seguro-moto-guarulhos" element={<SeoSeguroMotoGuarulhos />} />
                  <Route path="/seguro-para-motorista-app-guarulhos" element={<SeoSeguroMotoristaAppGuarulhos />} />
                  {/* Segmentos / nichos */}
                  <Route path="/seguros/transportadoras" element={<NichoTransportadoras />} />
                  <Route path="/seguros/motoristas-app" element={<NichoMotoristasApp />} />
                  <Route path="/seguros/empresarios" element={<NichoEmpresarios />} />
                  <Route path="/seguros/profissionais-liberais" element={<NichoProfissionaisLiberais />} />
                  <Route path="/seguros/medicos-e-clinicas" element={<NichoMedicos />} />
                  {/* Redirecionamentos canônicos */}
                  <Route path="/formulario-seguro-vida" element={<Navigate to="/seguro-vida/formulario" replace />} />
                  <Route path="/indique-amigo" element={<Navigate to="/indique-um-amigo" replace />} />
                  <Route path="/planejamento-patrimonial" element={<Navigate to="/investimentos" replace />} />
                  <Route path="/responsabilidade-civil-dentistas" element={<Navigate to="/seguro-rc-dentistas" replace />} />
                  <Route path="/seguro-responsabilidade-civil" element={<Navigate to="/seguro-rc" replace />} />
                  {/* Redirecionamentos de URLs antigas que retornavam 404 (removidas do sitemap) */}
                   <Route path="/seguro-empresa-guarulhos" element={<Navigate to="/seguro-empresarial" replace />} />
                   <Route path="/seguros-em-guarulhos" element={<Navigate to="/seguros-guarulhos" replace />} />
                   <Route path="/seguros-em-guarulhos-bairros" element={<Navigate to="/seguros-guarulhos" replace />} />
                   <Route path="/seguros-guarulhos-bairros" element={<Navigate to="/seguros-guarulhos" replace />} />
                   <Route path={CIDADES_REGIAO_HUB_PATH} element={<CidadesRegiaoHub />} />
                   <Route path="/corretora-de-seguros/:cidade" element={<CidadeRegiaoPage />} />

                   <Route path="/corretora-de-seguros-em-:bairro-guarulhos" element={<SeoLocalPage />} />
                   <Route path="/seguros-em-:bairro-guarulhos" element={<SeoLocalPage />} />
                   <Route path="/seguro-auto-:bairro-guarulhos" element={<SeoLocalPage />} />
                   <Route path="/seguro-residencial-:bairro-guarulhos" element={<SeoLocalPage />} />


                  <Route path="/planos-de-saude/prevent-senior-guarulhos" element={<Navigate to="/planos-de-saude" replace />} />
                  <Route path="/planos-de-saude/sulamerica-saude-guarulhos" element={<Navigate to="/planos-de-saude" replace />} />
                  {/* Pilar SEO: corretora de seguros em Guarulhos */}
                  <Route path="/corretora-de-seguros-em-guarulhos" element={<CorretoraDeSegurosEmGuarulhos />} />
                  {/* Redirecionamos variantes mais curtas para a URL canônica (full phrase match). */}
                  <Route path="/corretora-de-seguros-guarulhos" element={<Navigate to="/corretora-de-seguros-em-guarulhos" replace />} />
                  <Route path="/corretora-seguros-guarulhos" element={<Navigate to="/corretora-de-seguros-em-guarulhos" replace />} />
                  {/* Pilar SEO: consórcio em Guarulhos (rota canônica declarada acima) */}
                  <Route path="/consorcio-em-guarulhos" element={<Navigate to="/consorcio-guarulhos" replace />} />
                  {/* Variantes locais por bairro (pilar corretora + bairro) -> páginas regionais existentes */}
                  <Route path="/corretora-de-seguros-centro-guarulhos" element={<Navigate to="/seguros-guarulhos/centro" replace />} />
                  <Route path="/corretora-de-seguros-cumbica" element={<Navigate to="/seguros-guarulhos/cumbica" replace />} />
                  <Route path="/corretora-de-seguros-pimentas" element={<Navigate to="/seguros-guarulhos/pimentas" replace />} />
                  <Route path="/corretora-de-seguros-bonsucesso" element={<Navigate to="/seguros-guarulhos/bonsucesso" replace />} />
                  <Route path="/corretora-de-seguros-tabao-guarulhos" element={<Navigate to="/seguros-guarulhos/taboao" replace />} />
                  <Route path="/corretora-de-seguros-taboao-guarulhos" element={<Navigate to="/seguros-guarulhos/taboao" replace />} />
                  <Route path="/corretora-de-seguros-vila-galvao" element={<Navigate to="/seguros-guarulhos/vila-galvao" replace />} />
                  <Route path="/cotacao-seguro-auto-guarulhos" element={<Navigate to="/cotacao-seguro-auto" replace />} />
                  <Route path="/seguros-para-clinicas-odontologicas" element={<Navigate to="/parcerias-clinicas-odontologicas" replace />} />
                  <Route path="/seguros-para-clinicas-veterinarias" element={<Navigate to="/parcerias-clinicas-veterinarias" replace />} />
                  {/* Planos de saúde — hub canônico + subpáginas */}
                  <Route path="/plano-de-saude-guarulhos" element={<PlanoDeSaudeGuarulhosHub />} />
                  <Route path="/plano-saude-guarulhos" element={<Navigate to="/plano-de-saude-guarulhos" replace />} />
                  {/* 301 client-side: variantes legadas sem sufixo local caem no hub canônico. */}
                  <Route path="/plano-de-saude" element={<Navigate to="/plano-de-saude-guarulhos" replace />} />
                  <Route path="/plano-de-saude/" element={<Navigate to="/plano-de-saude-guarulhos" replace />} />
                  <Route path="/plano-de-saude-individual-guarulhos" element={<PlanoSaudeIndividualGuarulhos />} />
                  <Route path="/plano-de-saude-familiar-guarulhos" element={<PlanoSaudeFamiliarGuarulhos />} />
                  <Route path="/plano-de-saude-mei-guarulhos" element={<PlanoSaudeMeiGuarulhos />} />
                  <Route path="/plano-de-saude-pme-guarulhos" element={<PlanoSaudePmeGuarulhos />} />
                  <Route path="/plano-de-saude-empresarial-guarulhos" element={<PlanoSaudeEmpresarialGuarulhosCanonical />} />
                  <Route path="/plano-de-saude-idosos-guarulhos" element={<PlanoSaudeIdososGuarulhos />} />
                  <Route path="/plano-odontologico-guarulhos" element={<PlanoOdontologicoGuarulhosCanonical />} />
                  {/* Redirects legados de subpáginas de saúde */}
                  <Route path="/plano-saude-empresarial-guarulhos" element={<Navigate to="/plano-de-saude-empresarial-guarulhos" replace />} />
                  <Route path="/plano-saude-familia-guarulhos" element={<Navigate to="/plano-de-saude-familiar-guarulhos" replace />} />
                  <Route path="/plano-saude-mei-guarulhos" element={<Navigate to="/plano-de-saude-mei-guarulhos" replace />} />
                  <Route path="/plano-saude-pme-guarulhos" element={<Navigate to="/plano-de-saude-pme-guarulhos" replace />} />
                  <Route path="/planos-saude-senior-guarulhos" element={<Navigate to="/plano-de-saude-idosos-guarulhos" replace />} />
                  {/* Operadoras — páginas canônicas */}
                  <Route path="/bradesco-saude-guarulhos" element={<BradescoSaude />} />
                  <Route path="/sulamerica-saude-guarulhos" element={<SulAmericaSaude />} />
                  <Route path="/amil-guarulhos" element={<AmilSaude />} />
                  <Route path="/porto-saude-guarulhos" element={<PortoSaude />} />
                  <Route path="/hapvida-notredame-guarulhos" element={<Hapvida />} />
                  <Route path="/prevent-senior-guarulhos" element={<PreventSenior />} />
                  <Route path="/unimed-guarulhos" element={<Unimed />} />
                  <Route path="/medsenior-guarulhos" element={<Medsenior />} />
                  <Route path="/sami-guarulhos" element={<Sami />} />
                  <Route path="/alice-saude-guarulhos" element={<Alice />} />
                  <Route path="/omint-guarulhos" element={<Omint />} />
                  <Route path="/care-plus-guarulhos" element={<CarePlus />} />
                  {/* Long-tail SEO pages — linkam forte para o hub de bairros /seguros-guarulhos */}
                  <Route path="/planos-de-saude-guarulhos-comparativo" element={<LongtailPlanosSaudeGuarulhosComparativo />} />
                  <Route path="/valor-seguro-byd-dolphin" element={<LongtailValorSeguroBydDolphin />} />
                  <Route path="/melhor-seguro-para-uber-guarulhos" element={<LongtailMelhorSeguroUberGuarulhos />} />
                  <Route path="/cotacao-seguro-residencial-online" element={<LongtailCotacaoSeguroResidencialOnline />} />
                  <Route path="/guia-cluster-longtail" element={<GuiaClusterLongtail />} />
                  {/* Patrimônio / empresas — variantes */}
                  <Route path="/seguro-galpao-guarulhos" element={<Navigate to="/seguro-galpao" replace />} />
                  <Route path="/seguro-galpao-cumbica" element={<SeguroGalpaoCumbica />} />
                  <Route path="/seguro-taxi-guarulhos" element={<SeguroTaxiGuarulhos />} />
                  <Route path="/seguro-logistica-guarulhos" element={<Navigate to="/seguro-galpao" replace />} />
                  <Route path="/seguro-transportadora-guarulhos" element={<Navigate to="/seguro-transporte" replace />} />
                  <Route path="/seguro-transporte-carga-guarulhos" element={<SeguroTransporteCargaGuarulhos />} />
                  <Route path="/comparativo-seguradoras-guarulhos" element={<ComparativoSeguradorasGuarulhos />} />
                  <Route path="/mapa-do-site" element={<SiteMap />} />

                  <Route path="/seguro-carga-guarulhos" element={<Navigate to="/seguro-transporte-carga-guarulhos" replace />} />
                  <Route path="/seguro-loja-guarulhos" element={<Navigate to="/seguro-lojas-shopping" replace />} />
                  <Route path="/seguro-restaurante-guarulhos" element={<Navigate to="/seguro-restaurante" replace />} />
                  {/* Auto — variantes e modelos */}
                  <Route path="/seguro-auto-barato-guarulhos" element={<Navigate to="/seguro-auto-guarulhos" replace />} />
                  <Route path="/seguro-auto-premium" element={<Navigate to="/seguro-auto-premium-guarulhos" replace />} />
                  <Route path="/seguro-auto-pos-vistoria" element={<Navigate to="/seguro-auto" replace />} />
                  <Route path="/seguro-auto-por-modelo-guarulhos" element={<Navigate to="/seguro-auto-guarulhos" replace />} />
                  {/* Hubs Auto (modelos / marcas / comparativo) */}
                  <Route path="/seguro-auto/modelos" element={<SeoSeguroAutoPorModeloGuarulhos />} />
                  <Route path="/seguro-auto/marcas" element={<SeguroAutoMarcas />} />
                  <Route path="/seguro-auto/comparativo-coberturas" element={<SeguroAutoComparativoCoberturas />} />
                  {/* Hub Agro + Glossário */}
                  <Route path="/seguro-agro" element={<SeguroAgro />} />
                  <Route path="/seguro-penhor-rural" element={<SeguroPenhorRural />} />
                  <Route path="/glossario-seguros" element={<GlossarioSeguros />} />
                  <Route path="/glossario-seguros/letra/:letra" element={<GlossarioLetra />} />
                  <Route path="/seguro-hb20-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-hyundai-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-hilux-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-toyota-sw4-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-mobi-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-fiat-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-onix-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-chevrolet-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-strada-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-fiat-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-tcross-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-volkswagen-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-renegade-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-jeep-guarulhos" }); return <Comp />; })()} />
                  {/* Auto — bairros (vão ao hub de bairros) */}
                  <Route path="/seguro-auto-bonsucesso-guarulhos" element={<Navigate to="/seguro-auto-bonsucesso" replace />} />
                  <Route path="/seguro-auto-centro-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-centro-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-cumbica" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-cumbica" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-jardim-sao-joao" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-jardim-sao-joao" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-maia-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-maia-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-taboao-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-taboao-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-vila-galvao" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-vila-galvao" }); return <Comp />; })()} />
                  {/* Residencial / Saúde / Empresarial por bairro → hub de bairros */}
                  <Route path="/plano-saude-cidade-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "plano-saude-cidade-maia" }); return <Comp />; })()} />
                  <Route path="/plano-saude-gopouva-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "plano-saude-gopouva-guarulhos" }); return <Comp />; })()} />
                  <Route path="/plano-saude-macedo-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "plano-saude-macedo-guarulhos" }); return <Comp />; })()} />
                  <Route path="/plano-saude-taboao-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "plano-saude-taboao-guarulhos" }); return <Comp />; })()} />
                  {/* 301 legados de bairros e produto×bairro (variações com/sem sufixo -guarulhos).
                      Fonte única: src/lib/legacyBairroRedirects.ts — espelhado em public/.htaccess. */}
                  {LEGACY_BAIRRO_REDIRECTS.map((r) => (
                    <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
                  ))}
                  {/* Produto × bairro — subpáginas SEO dedicadas (cauda longa) */}
                  <Route path="/seguro-residencial-centro-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-centro-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-gopouva-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-gopouva-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-jardim-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-jardim-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-taboao-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-taboao-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-vila-augusta" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-cidade-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-cidade-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-cumbica" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-cumbica" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-bonsucesso" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-bonsucesso" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-pimentas" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-pimentas" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-macedo-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-macedo-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-residencial-picanco-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-residencial-picanco-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-pimentas" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-pimentas" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-macedo-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-macedo-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-taboao-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-taboao-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-cidade-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-cidade-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-centro-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-centro-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-vila-augusta" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-jardim-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-jardim-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-picanco-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-picanco-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-cidade-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-cidade-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-cumbica" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-cumbica" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-centro-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-centro-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-gopouva-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-gopouva-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-jardim-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-jardim-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-taboao-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-taboao-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-vila-augusta" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-cidade-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-cidade-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-centro-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-centro-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-gopouva-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-gopouva-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-jardim-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-jardim-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-taboao-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-taboao-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-vila-augusta" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-cidade-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-cidade-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-vila-augusta" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-jardim-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-jardim-maia" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-bonsucesso" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-bonsucesso" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-pimentas" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-pimentas" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-taboao-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-taboao-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-macedo-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-macedo-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-gopouva-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-gopouva-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-vida-picanco-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-vida-picanco-guarulhos" }); return <Comp />; })()} />
                  {/* Tratores por marca → trator agrícola */}
                  <Route path="/seguro-jacto-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-jacto-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-john-deere-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-john-deere-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-mahindra-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-mahindra-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-massey-ferguson-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-massey-ferguson-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-new-holland-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-new-holland-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-valtra-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-valtra-guarulhos" }); return <Comp />; })()} />
                  {/* Vistoria — empresas */}
                  <Route path="/seguro-para-empresas-de-vistoria-veicular" element={<Navigate to="/seguro-vistoriadora-veicular" replace />} />
                  <Route path="/seguro-vistoriadora-veicular" element={<SeguroVistoriadoraVeicular />} />
                  <Route path="/guias-seguros" element={<CentralDeGuias />} />
                  <Route path="/perguntas-frequentes-seguros" element={<CentralDePerguntas />} />
                  <Route path="/materiais-gratuitos-seguros" element={<CentralDeMateriais />} />
                  <Route path="/materiais/:slug" element={<MaterialDetalhe />} />
                  <Route path="/perguntas-frequentes-seguros/:categoria" element={<PerguntasCategoria />} />
                  <Route path="/comparativos-seguros" element={<ComparativosSegurosHub />} />
                  <Route path="/comparativos-seguros/:slug" element={<ComparativoCategoria />} />
                  <Route path="/guias/:slug" element={<GuiaPilar />} />
                  {/* Fase 3: últimos resíduos */}
                  <Route path="/seguro-empresarial-guarulhos" element={<SeoSeguroEmpresaGuarulhos />} />
                  <Route path="/seguro-despachantes-e-vistorias" element={<SeoDespachantesVistoriasGuarulhos />} />
                  <Route path="/seguro-condominio-guarulhos" element={<SeoSeguroCondominioGuarulhos />} />
                  <Route path="/seguro-fianca-guarulhos" element={<SeguroFiancaGuarulhos />} />
                  
                  <Route path="/seguro-civic-guarulhos" element={<Navigate to="/seguro-auto-guarulhos" replace />} />
                  <Route path="/seguro-compass-guarulhos" element={<Navigate to="/seguro-auto-guarulhos" replace />} />
                  <Route path="/seguro-corolla-guarulhos" element={<Navigate to="/seguro-auto-guarulhos" replace />} />
                  <Route path="/seguro-case-ih-guarulhos" element={<Navigate to="/seguro-trator-agricola" replace />} />
                  <Route path="/seguro-empresarial-bonsucesso" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-bonsucesso" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-cumbica" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-cumbica" }); return <Comp />; })()} />
                  <Route path="/seguro-empresarial-gopouva-guarulhos" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-empresarial-gopouva-guarulhos" }); return <Comp />; })()} />
                  {/* Hub de Seguradoras Parceiras */}
                  <Route path="/seguradoras" element={<SeguradorasHub />} />
                  <Route path="/seguradoras/:slug" element={<PartnerInsurerPage />} />
                  {/* Nova área SEO — Seguradoras Parceiras (páginas top-level /<slug>-guarulhos) */}
                  <Route path="/seguradoras-parceiras" element={<SeguradorasParceirasHub />} />
                  <Route path="/como-comparar-seguradoras-guarulhos" element={<ComoCompararSeguradorasGuarulhos />} />
                  <Route path="/porto-seguro-guarulhos" element={<SeguradoraParceiraSeoPage slug="porto-seguro-guarulhos" />} />
                  <Route path="/mapfre-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="mapfre-seguros-guarulhos" />} />
                  <Route path="/allianz-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="allianz-seguros-guarulhos" />} />
                  <Route path="/tokio-marine-guarulhos" element={<SeguradoraParceiraSeoPage slug="tokio-marine-guarulhos" />} />
                  <Route path="/azul-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="azul-seguros-guarulhos" />} />
                  <Route path="/suhai-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="suhai-seguros-guarulhos" />} />
                  <Route path="/bradesco-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="bradesco-seguros-guarulhos" />} />
                  <Route path="/sulamerica-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="sulamerica-seguros-guarulhos" />} />
                  <Route path="/hdi-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="hdi-seguros-guarulhos" />} />
                  <Route path="/liberty-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="liberty-seguros-guarulhos" />} />
                  <Route path="/mitsui-sumitomo-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="mitsui-sumitomo-seguros-guarulhos" />} />
                  <Route path="/sompo-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="sompo-seguros-guarulhos" />} />
                  <Route path="/zurich-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="zurich-seguros-guarulhos" />} />
                  <Route path="/pottencial-seguradora-guarulhos" element={<SeguradoraParceiraSeoPage slug="pottencial-seguradora-guarulhos" />} />
                  <Route path="/akad-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="akad-seguros-guarulhos" />} />
                  <Route path="/ezze-seguros-guarulhos" element={<SeguradoraParceiraSeoPage slug="ezze-seguros-guarulhos" />} />
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