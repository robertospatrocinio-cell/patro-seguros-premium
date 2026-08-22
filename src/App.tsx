import { lazy, Suspense, useMemo, Component, ReactNode, memo } from "react";
import {
  B2B_HUB_PATH,
  GARANTIA_HUB_PATH,
  GARANTIA_LOCAL_PATH,
  CREDITO_HUB_PATH,
  CREDITO_LOCAL_PATH,
  GARANTIA_INTENT_PAGES,
  CREDITO_INTENT_PAGES,
  B2B_INSURER_PAGES,
} from "@/data/b2bVertical";

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
const SeguroVistoriadoraVeicular = lazyWithRetry(() => import("./pages/SeguroVistoriadoraVeicular"), "SeguroVistoriadoraVeicular");
const CentralDeGuias = lazyWithRetry(() => import("./pages/CentralDeGuias"), "CentralDeGuias");
const CentralDePerguntas = lazyWithRetry(() => import("./pages/CentralDePerguntas"), "CentralDePerguntas");
const CentralDeMateriais = lazyWithRetry(() => import("./pages/CentralDeMateriais"), "CentralDeMateriais");
const MaterialDetalhe = lazyWithRetry(() => import("./pages/MaterialDetalhe"), "MaterialDetalhe");
const PerguntasCategoria = lazyWithRetry(() => import("./pages/PerguntasCategoria"), "PerguntasCategoria");
const GuiaPilar = lazyWithRetry(() => import("./pages/GuiaPilar"), "GuiaPilar");
const ComparativosSegurosHub = lazyWithRetry(() => import("./pages/ComparativosSegurosHub"), "ComparativosSegurosHub");
const ComparativoCategoria = lazyWithRetry(() => import("./pages/ComparativoCategoria"), "ComparativoCategoria");
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
const SeguroConsultorioGuarulhos = lazyWithRetry(() => import("./pages/SeguroConsultorioGuarulhos"), "SeguroConsultorioGuarulhos");
const SeguroConsultorioOdontologicoGuarulhos = lazyWithRetry(() => import("./pages/SeguroConsultorioOdontologicoGuarulhos"), "SeguroConsultorioOdontologicoGuarulhos");
const SeguroConsultorioMedicoGuarulhos = lazyWithRetry(() => import("./pages/SeguroConsultorioMedicoGuarulhos"), "SeguroConsultorioMedicoGuarulhos");
const SeguroConsultorioVeterinarioGuarulhos = lazyWithRetry(() => import("./pages/SeguroConsultorioVeterinarioGuarulhos"), "SeguroConsultorioVeterinarioGuarulhos");
const SeguroClinicaEsteticaGuarulhos = lazyWithRetry(() => import("./pages/SeguroClinicaEsteticaGuarulhos"), "SeguroClinicaEsteticaGuarulhos");
const SeguroClinicaPequenaGuarulhos = lazyWithRetry(() => import("./pages/SeguroClinicaPequenaGuarulhos"), "SeguroClinicaPequenaGuarulhos");
const SeguroEquipamentosConsultorioGuarulhos = lazyWithRetry(() => import("./pages/SeguroEquipamentosConsultorioGuarulhos"), "SeguroEquipamentosConsultorioGuarulhos");
const SeguroFlatGuarulhos = lazyWithRetry(() => import("./pages/SeguroFlatGuarulhos"), "SeguroFlatGuarulhos");
const SeguroSalaComercialGuarulhos = lazyWithRetry(() => import("./pages/SeguroSalaComercialGuarulhos"), "SeguroSalaComercialGuarulhos");
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

// === Patro Private (camada premium) ===
const PatroPrivate = lazyWithRetry(() => import("./pages/PatroPrivate"), "PatroPrivate");
const Patro = lazyWithRetry(() => import("./pages/Patro"), "Patro");
const SeguroAutoPremiumGuarulhos = lazyWithRetry(() => import("./pages/premium/SeguroAutoPremiumGuarulhos"), "SeguroAutoPremiumGuarulhos");
const SeguroCarrosLuxoGuarulhos = lazyWithRetry(() => import("./pages/premium/SeguroCarrosLuxoGuarulhos"), "SeguroCarrosLuxoGuarulhos");
const SeguroResidencialAltoPadraoGuarulhos = lazyWithRetry(() => import("./pages/premium/SeguroResidencialAltoPadraoGuarulhos"), "SeguroResidencialAltoPadraoGuarulhos");
const SegurosParaEmpresariosGuarulhos = lazyWithRetry(() => import("./pages/premium/SegurosParaEmpresariosGuarulhos"), "SegurosParaEmpresariosGuarulhos");
const SeguroCarroBlindadoGuarulhos = lazyWithRetry(() => import("./pages/premium/SeguroCarroBlindadoGuarulhos"), "SeguroCarroBlindadoGuarulhos");
const ProtecaoPatrimonialFamiliarGuarulhos = lazyWithRetry(() => import("./pages/premium/ProtecaoPatrimonialFamiliarGuarulhos"), "ProtecaoPatrimonialFamiliarGuarulhos");
import { HelmetProvider } from "react-helmet-async";
import { setUserContext } from "@/lib/monitoring";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import { resolveRoute, normalizePath, CANONICAL_ORIGIN } from "@/lib/redirects";

import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import PageSkeleton from "@/components/PageSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SkipLink from "@/components/SkipLink";
import { scheduleIdle } from "@/lib/prefetch";
import { LEGACY_BAIRRO_REDIRECTS } from "@/lib/legacyBairroRedirects";

const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));


const Blog = lazyWithRetry(() => import("./pages/Blog"), "Blog");
const BlogArticle = lazyWithRetry(() => import("./pages/BlogArticle"), "BlogArticle");
const BlogCategory = lazyWithRetry(() => import("./pages/BlogCategory"), "BlogCategory");
const BlogAuthor = lazyWithRetry(() => import("./pages/BlogAuthor"), "BlogAuthor");
const BlogCalendario90Dias = lazyWithRetry(() => import("./pages/BlogCalendario90Dias"), "BlogCalendario90Dias");
const BlogCluster = lazyWithRetry(() => import("./pages/BlogCluster"), "BlogCluster");
const Cotacao = lazyWithRetry(() => import("./pages/Cotacao"), "Cotacao");
const CotacaoObrigado = lazyWithRetry(() => import("./pages/CotacaoObrigado"), "CotacaoObrigado");

const ComparativoPlanosSaude = lazyWithRetry(() => import("./pages/ComparativoPlanosSaude"), "ComparativoPlanosSaude");
const CRM = lazyWithRetry(() => import("./pages/CRM"), "CRM");
const AdminLogin = lazyWithRetry(() => import("./pages/AdminLogin"), "AdminLogin");
const Sobre = lazyWithRetry(() => import("./pages/Sobre"), "Sobre");
const VerificarSusep = lazyWithRetry(() => import("./pages/VerificarSusep"), "VerificarSusep");
const Parceiros = lazyWithRetry(() => import("./pages/Parceiros"), "Parceiros");
const Contato = lazyWithRetry(() => import("./pages/Contato"), "Contato");
const Servicos = lazyWithRetry(() => import("./pages/Servicos"), "Servicos");
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
const CotacaoAutoRedirect = lazyWithRetry(() => import("./pages/CotacaoAutoRedirect"), "CotacaoAutoRedirect");
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
const SeguroAutoMarcas = lazyWithRetry(() => import("./pages/SeguroAutoMarcas"), "SeguroAutoMarcas");
const SeguroAutoComparativoCoberturas = lazyWithRetry(() => import("./pages/SeguroAutoComparativoCoberturas"), "SeguroAutoComparativoCoberturas");
const SeguroAgro = lazyWithRetry(() => import("./pages/SeguroAgro"), "SeguroAgro");
const GlossarioSeguros = lazyWithRetry(() => import("./pages/GlossarioSeguros"), "GlossarioSeguros");
const GlossarioLetra = lazyWithRetry(() => import("./pages/GlossarioLetra"), "GlossarioLetra");
const AvaliarNoGoogle = lazyWithRetry(() => import("./pages/AvaliarNoGoogle"), "AvaliarNoGoogle");
const AvaliacoesClientes = lazyWithRetry(() => import("./pages/AvaliacoesClientes"), "AvaliacoesClientes");
const ParceirosLocais = lazyWithRetry(() => import("./pages/ParceirosLocais"), "ParceirosLocais");
const Imprensa = lazyWithRetry(() => import("./pages/Imprensa"), "Imprensa");
const SeoPlanoSaudeGuarulhos = lazyWithRetry(() => import("./pages/SeoPlanoSaudeGuarulhos"), "SeoPlanoSaudeGuarulhos");
const PlanoDeSaudeGuarulhosHub = lazyWithRetry(() => import("./pages/PlanoDeSaudeGuarulhosHub"), "PlanoDeSaudeGuarulhosHub");
const PlanoSaudeIndividualGuarulhos = lazyWithRetry(() => import("./pages/PlanoSaudeIndividualGuarulhos"), "PlanoSaudeIndividualGuarulhos");
const PlanoSaudeFamiliarGuarulhos = lazyWithRetry(() => import("./pages/PlanoSaudeFamiliarGuarulhos"), "PlanoSaudeFamiliarGuarulhos");
const PlanoSaudeMeiGuarulhos = lazyWithRetry(() => import("./pages/PlanoSaudeMeiGuarulhos"), "PlanoSaudeMeiGuarulhos");
const PlanoSaudePmeGuarulhos = lazyWithRetry(() => import("./pages/PlanoSaudePmeGuarulhos"), "PlanoSaudePmeGuarulhos");
const PlanoSaudeEmpresarialGuarulhosCanonical = lazyWithRetry(() => import("./pages/PlanoSaudeEmpresarialGuarulhosCanonical"), "PlanoSaudeEmpresarialGuarulhosCanonical");
const PlanoSaudeIdososGuarulhos = lazyWithRetry(() => import("./pages/PlanoSaudeIdososGuarulhos"), "PlanoSaudeIdososGuarulhos");
const PlanoOdontologicoGuarulhosCanonical = lazyWithRetry(() => import("./pages/PlanoOdontologicoGuarulhosCanonical"), "PlanoOdontologicoGuarulhosCanonical");
const SeoSeguroEmpresarialGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroEmpresarialGuarulhos"), "SeoSeguroEmpresarialGuarulhos");
const CorretoraDeSegurosEmGuarulhos = lazyWithRetry(() => import("./pages/CorretoraDeSegurosEmGuarulhos"), "CorretoraDeSegurosEmGuarulhos");
const SeoSeguroResidencialGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroResidencialGuarulhos"), "SeoSeguroResidencialGuarulhos");
const SegurosEmGuarulhosHub = lazyWithRetry(() => import("./pages/local-guarulhos/SegurosEmGuarulhos"), "SegurosEmGuarulhosHub");

const SeoSeguroVidaSaudeGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroVidaSaudeGuarulhos"), "SeoSeguroVidaSaudeGuarulhos");
const SeoSeguroFrotaGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroFrotaGuarulhos"), "SeoSeguroFrotaGuarulhos");
const SeoSegurosPmeGuarulhos = lazyWithRetry(() => import("./pages/SeoSegurosPmeGuarulhos"), "SeoSegurosPmeGuarulhos");
const SeoSeguroMotoGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroMotoGuarulhos"), "SeoSeguroMotoGuarulhos");
const LandingSeguroMotoEntregador = lazyWithRetry(() => import("./pages/LandingSeguroMotoEntregador"), "LandingSeguroMotoEntregador");
const SeoSeguroCondominioGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroCondominioGuarulhos"), "SeoSeguroCondominioGuarulhos");
const SeoSegurosShoppingMaiaCidadeMaia = lazyWithRetry(() => import("./pages/SeoSegurosShoppingMaiaCidadeMaia"), "SeoSegurosShoppingMaiaCidadeMaia");
const HubSegurosGuarulhosDefinitivo = lazyWithRetry(() => import("./pages/HubSegurosGuarulhos"), "HubSegurosGuarulhos");
const SeguroTransporteCargaGuarulhos = lazyWithRetry(() => import("./pages/SeguroTransporteCargaGuarulhos"), "SeguroTransporteCargaGuarulhos");
const ComparativoSeguradorasGuarulhos = lazyWithRetry(() => import("./pages/ComparativoSeguradorasGuarulhos"), "ComparativoSeguradorasGuarulhos");
const SiteMap = lazyWithRetry(() => import("./pages/SiteMap"), "SiteMap");



const SeoSeguroUberGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroUberGuarulhos"), "SeoSeguroUberGuarulhos");
const SeoSeguroEmpresaGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroEmpresaGuarulhos"), "SeoSeguroEmpresaGuarulhos");
const SeoSeguroVidaGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroVidaGuarulhos"), "SeoSeguroVidaGuarulhos");
const SeoSeguroMotoristaAppGuarulhos = lazyWithRetry(() => import("./pages/SeoSeguroMotoristaAppGuarulhos"), "SeoSeguroMotoristaAppGuarulhos");
const LongtailPlanosSaudeGuarulhosComparativo = lazyWithRetry(() => import("./pages/LongtailPlanosSaudeGuarulhosComparativo"), "LongtailPlanosSaudeGuarulhosComparativo");
const LongtailValorSeguroBydDolphin = lazyWithRetry(() => import("./pages/LongtailValorSeguroBydDolphin"), "LongtailValorSeguroBydDolphin");
const LongtailMelhorSeguroUberGuarulhos = lazyWithRetry(() => import("./pages/LongtailMelhorSeguroUberGuarulhos"), "LongtailMelhorSeguroUberGuarulhos");
const LongtailCotacaoSeguroResidencialOnline = lazyWithRetry(() => import("./pages/LongtailCotacaoSeguroResidencialOnline"), "LongtailCotacaoSeguroResidencialOnline");
const GuiaClusterLongtail = lazyWithRetry(() => import("./pages/GuiaClusterLongtail"), "GuiaClusterLongtail");
const SeoLocalPage = lazyWithRetry(() => import("./pages/SeoLocalPage"), "SeoLocalPage");
const PlanoSaudeEmpresarialGuarulhos = lazyWithRetry(() => import("./pages/PlanoSaudeEmpresarialGuarulhos"), "PlanoSaudeEmpresarialGuarulhos");
const PlanosSaudeSeniorGuarulhos = lazyWithRetry(() => import("./pages/PlanosSaudeSeniorGuarulhos"), "PlanosSaudeSeniorGuarulhos");
const PlanoOdontologicoGuarulhos = lazyWithRetry(() => import("./pages/PlanoOdontologicoGuarulhos"), "PlanoOdontologicoGuarulhos");

const Index = lazyWithRetry(() => import("./pages/Index"), "Index");
const LpMaquinasEquipamentos = lazyWithRetry(() => import("./pages/LpMaquinasEquipamentos"), "LpMaquinasEquipamentos");
const LpTransportes360 = lazyWithRetry(() => import("./pages/LpTransportes360"), "LpTransportes360");
const SolucoesEmpresariais = lazyWithRetry(() => import("./pages/SolucoesEmpresariais"), "SolucoesEmpresariais");
const LpSeguroLocadorasEquipamentos = lazyWithRetry(() => import("./pages/lp/SeguroLocadorasEquipamentos"), "SeguroLocadorasEquipamentos");
const LpSeguroGalpoesCentrosDistribuicao = lazyWithRetry(() => import("./pages/lp/SeguroGalpoesCentrosDistribuicao"), "SeguroGalpoesCentrosDistribuicao");
const LpSeguroCiberneticoEmpresas = lazyWithRetry(() => import("./pages/lp/SeguroCiberneticoEmpresas"), "SeguroCiberneticoEmpresas");
const LpResponsabilidadeAdminProf = lazyWithRetry(() => import("./pages/lp/ResponsabilidadeAdministradoresProfissionais"), "ResponsabilidadeAdministradoresProfissionais");

const CentralDeSinistro = lazy(() => import("./pages/CentralDeSinistro"));
const SeguroAmbiental = lazy(() => import("./pages/SeguroAmbiental"));

const SeguroGeada = lazy(() => import("./pages/SeguroGeada"));
const SeguroPropriedadeRural = lazy(() => import("./pages/SeguroPropriedadeRural"));
const SeguroAcidentesPessoais = lazy(() => import("./pages/SeguroAcidentesPessoais"));
const SeguroEstagiario = lazy(() => import("./pages/SeguroEstagiario"));
const SeguroFiancaLocaticia = lazy(() => import("./pages/SeguroFiancaLocaticia"));
const SeguroFiancaGuarulhos = lazy(() => import("./pages/SeguroFiancaGuarulhos"));
const SeguroGalpaoCumbica = lazy(() => import("./pages/SeguroGalpaoCumbica"));
const SeguroTaxiGuarulhos = lazy(() => import("./pages/SeguroTaxiGuarulhos"));
const SeguroCaminhao = lazy(() => import("./pages/SeguroCaminhao"));
const SeguroMicroOnibus = lazy(() => import("./pages/SeguroMicroOnibus"));
const SeguroVidaPME = lazy(() => import("./pages/SeguroVidaPME"));
const SeguroArmazenagem = lazy(() => import("./pages/SeguroArmazenagem"));
const SeguroPlacaSolar = lazy(() => import("./pages/SeguroPlacaSolar"));
const SeguroPecuario = lazy(() => import("./pages/SeguroPecuario"));
const SeguroCafe = lazy(() => import("./pages/SeguroCafe"));
const SpecializedVerticalPage = lazyWithRetry(() => import("./pages/SpecializedVerticalPage"), "SpecializedVerticalPage");
const PlanoSaudeGuarulhosVertical = lazyWithRetry(() => import("./pages/PlanoSaudeGuarulhosVertical"), "PlanoSaudeGuarulhosVertical");
const ConsorcioGuarulhosVertical = lazyWithRetry(() => import("./pages/ConsorcioGuarulhosVertical"), "ConsorcioGuarulhosVertical");
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
const SeguroAutoEzzeCorinthians = lazyWithRetry(() => import("./pages/SeguroAutoEzzeCorinthians"), "SeguroAutoEzzeCorinthians");
const SeguroCartaVerde = lazy(() => import("./pages/SeguroCartaVerde"));
const IndiqueEGanhe = lazy(() => import("./pages/IndiqueEGanhe"));
const ObrigadoIndicacao = lazy(() => import("./pages/ObrigadoIndicacao"));
const SeguroDecesso = lazy(() => import("./pages/SeguroDecesso"));
const SeguroGarantia = lazy(() => import("./pages/SeguroGarantia"));
const SegurosEmpresariaisEspecializados = lazy(() => import("./pages/SegurosEmpresariaisEspecializados"));
const SeguroGarantiaGuarulhos = lazy(() => import("./pages/SeguroGarantiaGuarulhos"));
const SeguroDeCredito = lazy(() => import("./pages/SeguroDeCredito"));
const SeguroDeCreditoGuarulhos = lazy(() => import("./pages/SeguroDeCreditoGuarulhos"));
const B2bIntentRoute = lazy(() => import("./pages/b2b/B2bIntentRoute"));
const B2bInsurerRoute = lazy(() => import("./pages/b2b/B2bInsurerRoute"));
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
const LandingSeguroAcidentesPessoais = lazy(() => import("./pages/LandingSeguroAcidentesPessoais"));
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
const Omint = lazy(() => import("./pages/saude/Omint"));
const CarePlus = lazy(() => import("./pages/saude/CarePlus"));

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
const SeguradorasHub = lazy(() => import("./pages/seguradoras/SeguradorasHub"));
const PartnerInsurerPage = lazy(() => import("./components/PartnerInsurerPage"));
const SeguradorasParceirasHub = lazy(() => import("./pages/SeguradorasParceirasHub"));
const SeguradoraParceiraSeoPage = lazy(() => import("./pages/SeguradoraParceiraSeoPage"));
const ComoCompararSeguradorasGuarulhos = lazy(() => import("./pages/ComoCompararSeguradorasGuarulhos"));
const SeguroBMW = lazy(() => import("./pages/SeguroBMW"));
const SeguroMarcaPremium = lazy(() => import("./pages/SeguroMarcaPremium"));




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

const DeferredGlobalUi = () => (
  <Suspense fallback={null}>
    <WhatsAppButton />
    <CookieBanner />
  </Suspense>
);

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
              <Toaster />
              <Sonner position="top-right" closeButton richColors />
              <DeferredGlobalUi />
              <ScrollToTop />
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Index />} />
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
                  <Route path="/seguro-auto-maia" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-maia-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-vila-augusta" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-vila-augusta-guarulhos" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-bonsucesso" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-bonsucesso-guarulhos-v2" }); return <Comp />; })()} />
                  <Route path="/seguro-auto-pimentas" element={(() => { const Comp = withProps(SeoLocalPage, { slug: "seguro-auto-pimentas-guarulhos" }); return <Comp />; })()} />
                  <Route path="/lp/seguro-acidentes-pessoais" element={<LandingSeguroAcidentesPessoais />} />
                  <Route path="/seguro-moto-entregadores-guarulhos" element={<LandingSeguroMotoEntregador />} />
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
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                  {/* Alias legado/typo — evita 404 */}
                  <Route path="/politica-de-privacidade" element={<Navigate to="/politica-privacidade" replace />} />
                  <Route path="/termos-de-uso" element={<TermosDeUso />} />
                  <Route path="/sobre-guarulhos" element={<SobreGuarulhos />} />
                  {/* Hubs Guarulhos e páginas locais referenciadas em links internos */}
                  <Route path="/seguros-em-guarulhos" element={<HubSegurosGuarulhos />} />
                  <Route path="/seguros-guarulhos" element={<SegurosGuarulhosBairros />} />
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
                  
                  <Route path="/consorcio-carro" element={<ConsorcioCarro />} />
                  <Route path="/consorcio-imoveis" element={<ConsorcioImoveis />} />
                  <Route path="/consorcio-veiculos-pesados" element={<ConsorcioVeiculosPesados />} />
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
                  <Route path="/plano-de-saude-guarulhos" element={<PlanoSaudeGuarulhosVertical />} />
                  <Route path="/plano-de-saude-empresarial-guarulhos" element={<PlanoSaudeGuarulhosVertical />} />
                  <Route path="/plano-de-saude-para-mei-guarulhos" element={<PlanoSaudeGuarulhosVertical />} />
                  <Route path="/plano-saude-empresarial" element={<PlanoSaudeEmpresarial />} />
                  <Route path="/protecao-pet-premium" element={<ProtecaoPetPremium />} />
                  <Route path="/seguro-petshop" element={<SeguroPetshop />} />
                  {/* Nichos / Parcerias / Odonto / Vet */}
                  <Route path="/nicho-transportadoras" element={<NichoTransportadoras />} />
                  <Route path="/parcerias-clinicas-odontologicas" element={<ParceriasClinicasOdontologicas />} />
                  <Route path="/parcerias-clinicas-veterinarias" element={<ParceriasClinicasVeterinarias />} />
                  <Route path="/seguro-clinica-odontologica" element={<SeguroClinicaOdontologica />} />
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
                   <Route path="/seguros-guarulhos" element={<SegurosEmGuarulhosHub />} />
                   <Route path="/seguros-em-guarulhos" element={<Navigate to="/seguros-guarulhos" replace />} />
                   <Route path="/seguros-em-guarulhos-bairros" element={<Navigate to="/seguros-guarulhos" replace />} />
                   <Route path="/seguros-guarulhos-bairros" element={<Navigate to="/seguros-guarulhos" replace />} />
                   <Route path="/seguros-guarulhos/:slug" element={<SeoLocalPage />} />
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