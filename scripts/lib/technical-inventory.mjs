import ts from "typescript";

// Static evidence only: do not evaluate application code or invent dynamic URLs.
export function extractRouteDeclarations(source, file = "src/App.tsx") {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const routes = [];
  function visit(node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(ast) === "Route") {
      const attr = node.attributes.properties.find((p) => ts.isJsxAttribute(p) && p.name.getText(ast) === "path");
      if (attr?.initializer) {
        const value = attr.initializer;
        const expression = ts.isJsxExpression(value) ? value.expression : value;
        const literal = expression && (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression));
        const element = node.attributes.properties.find((p) => ts.isJsxAttribute(p) && p.name.getText(ast) === "element");
        routes.push({
          path: literal ? expression.text : null,
          expression: literal ? null : value.getText(ast),
          line: ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1,
          element: element?.initializer?.getText(ast) ?? null,
          evidence: literal ? "literal-source" : "dynamic-unresolved",
        });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return routes;
}

export function duplicateRoutes(routes) {
  const groups = new Map();
  for (const route of routes) {
    if (route.path === null) continue;
    const key = route.path === "/" ? "/" : route.path.replace(/\/+$/, "");
    groups.set(key, [...(groups.get(key) ?? []), route]);
  }
  return [...groups].filter(([, declarations]) => declarations.length > 1)
    .map(([path, declarations]) => ({ path, declarations }));
}

export function classifyPage(pathname) {
  if (/^\/blog(?:\/|$)/.test(pathname)) return "blog";
  if (/^\/lp(?:\/|$)/.test(pathname)) return "landing-page";
  if (/^\/seguros-guarulhos\//.test(pathname)) return "bairro";
  if (/^\/(?:admin(?:\/|$)|crm$)/.test(pathname)) return "administrativa";
  if (/^\/(?:seguro|plano|consorcio|protecao|previdencia)/.test(pathname)) return "produto-ou-vertical";
  return "institucional-hub-ou-utilidade";
}

export function collectTemplateImports(source, file) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return ast.statements.filter(ts.isImportDeclaration)
    .filter((node) => ts.isStringLiteral(node.moduleSpecifier) && /Template$/.test(node.moduleSpecifier.text))
    .map((node) => ({ file, module: node.moduleSpecifier.text }));
}
