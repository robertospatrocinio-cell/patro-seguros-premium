export const EO_PAGE = "/seguro-eo-engenharia-aeroportos";
export const EO_PHONE = "+551151997500";
export const EO_MESSAGE = "Olá! Minha empresa precisa contratar um Seguro E&O Engenharia para prestar serviços em um aeroporto. Gostaria de receber orientação e uma cotação. Posso enviar as exigências do contrato?";
export const EO_WHATSAPP = `https://wa.me/${EO_PHONE.slice(1)}?text=${encodeURIComponent(EO_MESSAGE)}`;

type EoEvent = "page_view" | "whatsapp_click" | "form_start" | "form_step_complete" | "form_submit" | "contract_upload" | "quote_request" | "phone_click";
// One delivery path: the site's gtag dispatcher, or a GTM event if only the data layer is present.
// No URL query, user input, file metadata or CRM identifier is accepted here.
export const EO_ARTICLE = "/blog/seguro-eo-engenharia-prestadores-servicos-aeroportos";
export function trackEo(event: EoEvent | "article_service_click", step?: 1 | 2 | 3, page: typeof EO_PAGE | typeof EO_ARTICLE = EO_PAGE) {
  try {
    if (localStorage.getItem("patro-cookies-accepted") !== "true") return;
    window.activateAnalytics?.("consent_given");
    const name = `eo_engenharia_${event}`;
    const params = { page_location: `${window.location.origin}${page}`, ...(step ? { form_step: step } : {}) };
    if (window.gtag) window.gtag("event", name, params);
    else (window.dataLayer ??= []).push({ event: name, ...params });
  } catch { /* Recusar cookies não impede a solicitação comercial. */ }
}
