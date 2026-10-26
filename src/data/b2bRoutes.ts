/** Metadados leves de navegação; o conteúdo comercial só entra nas páginas B2B. */
export const B2B_HUB_PATH = "/seguros-empresariais-especializados";
export const GARANTIA_HUB_PATH = "/seguro-garantia";
export const GARANTIA_LOCAL_PATH = "/seguro-garantia-guarulhos";
export const CREDITO_HUB_PATH = "/seguro-de-credito";
export const CREDITO_LOCAL_PATH = "/seguro-de-credito-guarulhos";

const toRoute = (slug: string) => ({ slug, path: `/${slug}` });

export const GARANTIA_INTENT_ROUTES = [
  "seguro-garantia-licitacao",
  "seguro-garantia-contratual",
  "seguro-garantia-judicial",
  "seguro-garantia-construcao-civil",
  "seguro-garantia-fornecedores",
].map(toRoute);

export const CREDITO_INTENT_ROUTES = [
  "seguro-de-credito-vendas-a-prazo",
  "seguro-de-credito-industria",
  "seguro-de-credito-exportacao",
  "seguro-de-credito-distribuidores",
].map(toRoute);

export const B2B_INSURER_ROUTES = [
  "pottencial-seguro-garantia",
  "junto-seguro-garantia",
  "porto-seguro-garantia",
  "tokio-marine-seguro-garantia",
  "akad-seguro-garantia",
  "ezze-seguro-garantia",
  "allianz-seguro-garantia",
  "allianz-seguro-de-credito",
  "tokio-marine-seguro-de-credito",
  "porto-seguro-de-credito",
  "akad-seguro-de-credito",
  "ezze-seguro-de-credito",
].map(toRoute);
