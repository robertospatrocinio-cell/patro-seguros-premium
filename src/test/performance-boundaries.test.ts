import { describe, expect, it } from "vitest";
import crmSource from "../pages/CRM.tsx?raw";
import quoteFormSource from "../components/InsuranceQuoteForm.tsx?raw";

// Guardas de arquitetura: não substituem testes de navegação ou medições
// no navegador, mas impedem a volta destes carregamentos desnecessários.
describe("limites de carregamento do CRM", () => {
  it.each([
    "RelationshipModule",
    "ContactsModule",
    "OpportunitiesModule",
    "PerformanceReports",
    "ClaimsModule",
    "KanbanBoard",
  ])("mantém %s fora dos imports imediatos da página", (moduleName) => {
    expect(crmSource).toContain(`const ${moduleName} = lazy(`);
    expect(crmSource).not.toMatch(
      new RegExp(`import[^;\\n]*from ["']@/components/crm/${moduleName}["']`),
    );
  });

  it("mantém o dashboard imediato e limita a espera às abas secundárias", () => {
    expect(crmSource).toContain(
      'import { DashboardOverview } from "@/components/crm/DashboardOverview";',
    );
    const suspenseStart = crmSource.indexOf("<Suspense fallback=");
    const suspenseEnd = crmSource.indexOf("</Suspense>", suspenseStart);
    expect(suspenseStart).toBeGreaterThan(
      crmSource.indexOf('<TabsContent value="dashboard"'),
    );
    for (const tab of ["pipeline", "relationship", "opportunities", "performance", "contacts", "claims"]) {
      const tabPosition = crmSource.indexOf(`<TabsContent value="${tab}"`);
      expect(tabPosition).toBeGreaterThan(suspenseStart);
      expect(tabPosition).toBeLessThan(suspenseEnd);
    }
    expect(crmSource).not.toContain("forceMount");
  });
});

describe("envio do formulário de seguros", () => {
  it("inicia CRM e e-mail no mesmo grupo paralelo e preserva o tratamento de falhas", () => {
    const parallelStart = quoteFormSource.indexOf(
      "const [{ error: crmError }, { data, error }] = await Promise.all([",
    );
    expect(parallelStart).toBeGreaterThan(-1);
    const parallelEnd = quoteFormSource.indexOf("    ]);", parallelStart);
    const requests = quoteFormSource.slice(parallelStart, parallelEnd);
    expect(requests).toContain("submitLead({");
    expect(requests).toContain('safeInvoke<{ success?: boolean }>("send-form-email"');
    expect(quoteFormSource.indexOf("if (crmError)", parallelStart)).toBeGreaterThan(parallelEnd);
    expect(quoteFormSource.indexOf("if (error || !data?.success)", parallelStart)).toBeGreaterThan(parallelEnd);
  });
});
