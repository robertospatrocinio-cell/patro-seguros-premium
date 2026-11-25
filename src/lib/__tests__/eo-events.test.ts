import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EO_PAGE, EO_WHATSAPP, trackEo } from '../eoEngenhariaContact';

describe('Mensuração de E&O', () => {
  beforeEach(() => { window.gtag = vi.fn(); window.dataLayer = []; localStorage.removeItem('patro-cookies-accepted'); });
  afterEach(() => { delete window.gtag; delete window.dataLayer; localStorage.removeItem('patro-cookies-accepted'); });
  it('não dispara sem aceite de analytics', () => { trackEo('form_start'); expect(window.gtag).not.toHaveBeenCalled(); expect(window.dataLayer).toEqual([]); });
  it('usa apenas um despachante e metadados fixos, inclusive após upload', () => {
    localStorage.setItem('patro-cookies-accepted', 'true');
    for (const event of ['page_view','whatsapp_click','form_start','form_submit','contract_upload','quote_request','phone_click'] as const) {
      trackEo(event);
      expect(window.gtag).toHaveBeenLastCalledWith('event', `eo_engenharia_${event}`, {page_location:window.location.origin+EO_PAGE});
    }
    trackEo('form_step_complete',2);
    expect(window.gtag).toHaveBeenLastCalledWith('event','eo_engenharia_form_step_complete',{page_location:window.location.origin+EO_PAGE,form_step:2});
    expect(window.gtag).toHaveBeenCalledTimes(8); expect(window.dataLayer).toEqual([]);
  });
  it('não contabiliza a navegação do guia como solicitação nem envia parâmetros da URL', () => {
    const article = '/blog/seguro-eo-engenharia-prestadores-servicos-aeroportos';
    trackEo('article_service_click', undefined, article);
    expect(window.gtag).not.toHaveBeenCalled();
    localStorage.setItem('patro-cookies-accepted', 'true');
    trackEo('article_service_click', undefined, article);
    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith('event', 'eo_engenharia_article_service_click', {page_location:window.location.origin+article});
  });
  it('usa a camada de dados quando não há gtag', () => { delete window.gtag; localStorage.setItem('patro-cookies-accepted','true'); trackEo('quote_request'); expect(window.dataLayer).toEqual([{event:'eo_engenharia_quote_request',page_location:window.location.origin+EO_PAGE}]); });
  it('o link abre o canal empresarial sem dados do solicitante', () => { const url=new URL(EO_WHATSAPP); expect(url.pathname).toBe('/551151997500'); expect([...url.searchParams.keys()]).toEqual(['text']); expect(url.searchParams.get('text')).toContain('Posso enviar as exigências do contrato?'); });
});
