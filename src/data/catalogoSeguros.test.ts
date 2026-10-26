import { describe, expect, it } from "vitest";
import appSource from "../App.tsx?raw";
import b2bSource from "./b2bRoutes.ts?raw";
import { landingPagesData } from "./landingPages";
import { catalogoSeguros, correspondeBuscaCatalogo } from "./catalogoSeguros";

const items = catalogoSeguros.flatMap((grupo) => grupo.items);

// Verifica destinos sem importar/renderizar todas as páginas do aplicativo.
const literalRoutes = new Set(
  [...appSource.matchAll(/<Route\s[^>]*path="([^"]+)"/g)].map((match) => match[1]),
);
const constantRoutes = new Set(
  [...b2bSource.matchAll(/export const (\w+_PATH) = "([^"]+)"/g)]
    .filter((match) => appSource.includes(`path={${match[1]}}`))
    .map((match) => match[2]),
);

describe("Catálogo compartilhado pelos menus", () => {
  it("não duplica categorias nem destinos", () => {
    expect(new Set(catalogoSeguros.map((grupo) => grupo.id)).size).toBe(catalogoSeguros.length);
    expect(new Set(items.map((item) => item.to)).size).toBe(items.length);
  });

  it("aponta para rotas registradas ou landing pages com conteúdo", () => {
    for (const item of items) {
      const dynamicLanding = item.to.startsWith("/lp/") &&
        literalRoutes.has("/lp/:slug") &&
        Object.prototype.hasOwnProperty.call(landingPagesData, item.to.slice(4));
      expect(literalRoutes.has(item.to) || constantRoutes.has(item.to) || dynamicLanding, item.to).toBe(true);
    }
  });

  it("inclui as especialidades, saúde e consórcio", () => {
    const paths = items.map((item) => item.to);
    for (const path of [
      "/seguro-maquinas-agricolas", "/seguro-maquinas-linha-amarela",
      "/seguro-trator-agricola", "/seguro-colheitadeira-graos",
      "/seguro-drone", "/seguro-drone-agricola", "/seguro-reta-drone",
      "/planos-de-saude", "/seguro-odonto", "/consorcio",
      "/consorcio-imoveis", "/consorcio-veiculos-pesados",
      "/seguro-clinica-veterinaria", "/seguro-hospital-veterinario",
    ]) expect(paths).toContain(path);
  });

  it("encontra termos sem acento e palavras em ordem diferente", () => {
    const item = items.find((entry) => entry.to === "/seguro-maquinas-agricolas")!;
    expect(correspondeBuscaCatalogo(item, "agricolas maquinas")).toBe(true);
    expect(correspondeBuscaCatalogo(item, "aviacao")).toBe(false);
    expect(correspondeBuscaCatalogo(item, "equipamentos", "Máquinas e equipamentos")).toBe(true);
  });
});
