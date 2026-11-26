import { airportEditorial } from "../data/airportEditorial";
import { COMPANY, WHATSAPP_DIGITS } from "../config/company";
import { AIRPORT_HUB, AIRPORT_EO, isAirportProduct, type AirportProduct } from "../../supabase/functions/_shared/airport-qualification";

type AirportEvent = "hub_view" | "article_view" | "whatsapp_click" | "quote_request" | "form_start" | "form_submit" | "contract_upload" | "needs_assessment_start" | "needs_assessment_complete" | "internal_link_click";
const articleProducts = new Map<string, AirportProduct | undefined>(Object.values(airportEditorial).map(article => [article.path, article.path === airportEditorial.eoGuide.path ? "eo" : article.path === airportEditorial.guarantee.path ? "garantia" : undefined] as const));
const relatedProducts = new Map<string, AirportProduct>([
  ["/seguro-rc", "rc_geral"], ["/seguro-engenharia", "engenharia"], ["/seguro-garantia", "garantia"], ["/seguro-ambiental", "ambiental"], ["/seguro-maquinas", "equipamentos"],
]);
const relatedPages = new Set(["/seguros-empresariais", "/corretora-de-seguros-em-guarulhos", "/verificar-susep", "/seguro-empresarial", "/seguro-vida-pme", "/plano-saude-empresarial"]);
const apPage = "/seguro-acidentes-pessoais-aeroportos";
export const airportPage = (path: string) => path === AIRPORT_HUB || path === AIRPORT_EO || path === apPage || articleProducts.has(path);
export function trackAirport(event: AirportEvent, page: string, product?: AirportProduct, target?: string) {
  if (!airportPage(page)) return;
  try {
    if (localStorage.getItem("patro-cookies-accepted") !== "true") return;
    window.activateAnalytics?.("consent_given");
    const name = `airport_${event}`;
    const mode = isAirportProduct(product) ? product : page === AIRPORT_EO ? "eo" : articleProducts.get(page);
    const safeTarget = target && (airportPage(target) || relatedProducts.has(target) || relatedPages.has(target)) ? target : undefined;
    const params = { page_location: `${COMPANY.dominioCanonico}${page}`, page_referrer: "", page_title: "Seguros aeroportuários", ...(mode ? { modality: mode } : {}), ...(safeTarget ? { link_path: safeTarget } : {}) };
    if (window.gtag) window.gtag("event", name, params);
    else (window.dataLayer ??= []).push({ event: name, ...params });
  } catch { /* A medição não interfere no atendimento. */ }
}

export function observeAirportPage(pathname: string) {
  const page = pathname.replace(/\/$/, "");
  if (!airportPage(page)) return;
  function click(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!anchor) return;
    const url = new URL(anchor.href, window.location.origin);
    if (url.origin === "https://wa.me" && url.pathname === `/${WHATSAPP_DIGITS}`) {
      trackAirport("whatsapp_click", page);
      return;
    }
    const target = url.pathname.replace(/\/$/, "");
    if (url.origin !== window.location.origin || target === page) return;
    if (anchor.closest("main") && (airportPage(target) || relatedProducts.has(target) || relatedPages.has(target))) {
      trackAirport("internal_link_click", page, target === AIRPORT_EO ? "eo" : relatedProducts.get(target) ?? articleProducts.get(target), target);
    }
  }
  document.addEventListener("click", click, true);
  return () => document.removeEventListener("click", click, true);
}

export function trackAirportView(pathname: string) {
  const page = pathname.replace(/\/$/, "");
  if (page === AIRPORT_HUB) trackAirport("hub_view", page);
  else if (articleProducts.has(page)) trackAirport("article_view", page);
}
