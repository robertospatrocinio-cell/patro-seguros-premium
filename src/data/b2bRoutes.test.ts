import { describe, expect, it } from "vitest";
import appSource from "../App.tsx?raw";
import {
  GARANTIA_INTENT_ROUTES,
  CREDITO_INTENT_ROUTES,
  B2B_INSURER_ROUTES,
} from "./b2bRoutes";
import {
  GARANTIA_INTENT_PAGES,
  CREDITO_INTENT_PAGES,
  B2B_INSURER_PAGES,
} from "./b2bVertical";

const routesOnly = (pages: { slug: string; path: string }[]) =>
  pages.map(({ slug, path }) => ({ slug, path }));

describe("Rotas B2B leves", () => {
  it("preserva todos os endereços e a ordem das páginas de garantia", () => {
    expect(GARANTIA_INTENT_ROUTES).toEqual(routesOnly(GARANTIA_INTENT_PAGES));
  });

  it("preserva todos os endereços e a ordem das páginas de crédito", () => {
    expect(CREDITO_INTENT_ROUTES).toEqual(routesOnly(CREDITO_INTENT_PAGES));
  });

  it("preserva todos os endereços e a ordem das páginas por seguradora", () => {
    expect(B2B_INSURER_ROUTES).toEqual(routesOnly(B2B_INSURER_PAGES));
  });

  it("não carrega o catálogo comercial completo no roteador inicial", () => {
    expect(appSource).toContain('from "@/data/b2bRoutes"');
    expect(appSource).not.toContain('from "@/data/b2bVertical"');
  });
});
