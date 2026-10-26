import { Navigate, useLocation } from "react-router-dom";

// O HTTP 301 é configurado na infraestrutura; este é o fallback de navegação SPA.
export default function SeguroDrone() {
  const { search, hash } = useLocation();
  return <Navigate to={`/seguro-drone-agricola${search}${hash}`} replace />;
}
