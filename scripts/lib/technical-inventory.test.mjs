// @vitest-environment node
import { test } from "vitest";
import assert from "node:assert/strict";
import { extractRouteDeclarations, duplicateRoutes, classifyPage, collectTemplateImports } from "./technical-inventory.mjs";

test("extracts literal routes, JSX expressions and line evidence", () => {
  const routes = extractRouteDeclarations(`const App = () => <Routes>
    <Route path="/seguro-auto" element={<Auto />} />
    <Route path={'/blog'} element={<Blog />} />
    <Route path={HUB_PATH} element={<Hub />} />
  </Routes>;`);
  assert.equal(routes.length, 3);
  assert.equal(routes[0].path, "/seguro-auto");
  assert.equal(routes[0].line, 2);
  assert.match(routes[0].element, /Auto/);
  assert.equal(routes[1].path, "/blog");
  assert.equal(routes[2].path, null);
  assert.equal(routes[2].evidence, "dynamic-unresolved");
});

test("does not invent concrete URLs for template expressions", () => {
  const routes = extractRouteDeclarations('const x = <Route path={`/${slug}`} element={<Page />} />;');
  assert.equal(routes[0].path, null);
  assert.match(routes[0].expression, /slug/);
});

test("ignores comments and textual examples of routes", () => {
  const routes = extractRouteDeclarations('// <Route path="/example" />\nconst x = "<Route path=\\\"/fake\\\" />";');
  assert.equal(routes.length, 0);
});

test("reports equivalent trailing-slash declarations with their elements", () => {
  const routes = extractRouteDeclarations('const x = <><Route path="/saude" element={<A />} /><Route path="/saude/" element={<B />} /></>;');
  const duplicates = duplicateRoutes(routes);
  assert.equal(duplicates.length, 1);
  assert.equal(duplicates[0].path, "/saude");
  assert.equal(duplicates[0].declarations.length, 2);
});

test("does not merge different parameter patterns or unresolved expressions", () => {
  const routes = extractRouteDeclarations('const x = <><Route path="/blog/:slug" /><Route path="/blog/categoria/:slug" /><Route path={PATH} /><Route path={OTHER} /></>;');
  assert.deepEqual(duplicateRoutes(routes), []);
});

test("classifies page families without implying indexability", () => {
  assert.equal(classifyPage("/blog/seguro-auto"), "blog");
  assert.equal(classifyPage("/lp/seguro"), "landing-page");
  assert.equal(classifyPage("/seguros-guarulhos/cumbica"), "bairro");
  assert.equal(classifyPage("/seguro-auto"), "produto-ou-vertical");
  assert.equal(classifyPage("/admin/login"), "administrativa");
  assert.equal(classifyPage("/sobre"), "institucional-hub-ou-utilidade");
});

test("records actual template imports instead of unused file names", () => {
  const imports = collectTemplateImports('import Template from "@/components/InsurancePageTemplate";\nimport Page from "@/components/PageMeta";', "src/pages/Example.tsx");
  assert.deepEqual(imports, [{ file: "src/pages/Example.tsx", module: "@/components/InsurancePageTemplate" }]);
});
