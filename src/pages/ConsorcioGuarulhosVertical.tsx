import { useLocation, Navigate } from "react-router-dom";
import ConsorcioIntentPageTemplate from "@/components/consorcio/ConsorcioIntentPageTemplate";
import ConsorcioNationalPage from "@/components/consorcio/ConsorcioNationalPage";
import { CONSORCIO_INTENT_PAGES } from "@/data/consorcioVertical";
import { CONSORCIO_NATIONAL_PAGES } from "@/data/consorcioNacional";
import ConsorcioServicos from "@/pages/ConsorcioServicos";

const ConsorcioGuarulhosVertical = () => {
  // As rotas são explícitas: não existe um parâmetro :slug nelas.
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, "");
  if (path === "/consorcio-servicos") return <ConsorcioServicos />;
  const national = CONSORCIO_NATIONAL_PAGES.find(page => page.path === path);
  if (national) return <ConsorcioNationalPage page={national} />;
  const local = CONSORCIO_INTENT_PAGES.find(page => page.path === path);
  if (!local) return <Navigate to="/consorcio" replace />;
  return <ConsorcioIntentPageTemplate page={local} />;
};

export default ConsorcioGuarulhosVertical;
