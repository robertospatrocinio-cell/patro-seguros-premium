import { describe, expect, it } from "vitest";
import { calculateConsorcioScenario, type ConsorcioScenario } from "../consorcioSimulation";

const scenario: ConsorcioScenario = {
  credit: 100000,
  consortiumMonths: 100,
  administrationPercent: 20,
  reservePercent: 2,
  consortiumOtherCosts: 1000,
  financingMonths: 100,
  downPayment: 20000,
  monthlyInterestPercent: 0,
  financingOtherCosts: 2000,
};

describe("Comparação educativa de consórcio e financiamento", () => {
  it("inclui taxas, reserva, entrada e custos uma única vez", () => {
    const result = calculateConsorcioScenario(scenario)!;
    expect(result.administration).toBe(20000);
    expect(result.reserve).toBe(2000);
    expect(result.consortiumTotal).toBe(123000);
    expect(result.consortiumPayment).toBe(1230);
    expect(result.financedAmount).toBe(80000);
    expect(result.financingPayment).toBe(800);
    expect(result.financingTotal).toBe(102000);
    expect(result.nominalDifference).toBe(-21000);
  });

  it("calcula a parcela Price sem favorecer uma modalidade", () => {
    const result = calculateConsorcioScenario({ ...scenario, monthlyInterestPercent: 1, financingMonths: 12 })!;
    const expectedPayment = 80000 * 0.01 / (1 - Math.pow(1.01, -12));
    expect(result.financingPayment).toBeCloseTo(expectedPayment, 6);
    expect(result.financingTotal).toBeCloseTo(22000 + expectedPayment * 12, 6);
  });

  it("mantém o cálculo finito com juros muito próximos de zero", () => {
    const result = calculateConsorcioScenario({ ...scenario, monthlyInterestPercent: 1e-15 })!;
    expect(result.financingPayment).toBeCloseTo(800, 6);
  });

  it("aceita entrada integral e não gera juros sobre saldo zero", () => {
    const result = calculateConsorcioScenario({ ...scenario, downPayment: 100000, monthlyInterestPercent: 1 })!;
    expect(result.financingPayment).toBe(0);
    expect(result.financingTotal).toBe(102000);
  });

  it.each([
    { credit: 0 }, { credit: NaN }, { credit: Infinity },
    { consortiumMonths: 0 }, { consortiumMonths: 1.5 },
    { financingMonths: 481 }, { administrationPercent: -1 },
    { reservePercent: 101 }, { downPayment: 100001 },
    { monthlyInterestPercent: 11 }, { financingOtherCosts: -1 },
    { consortiumOtherCosts: 100000001 },
  ])("rejeita entradas inválidas: %j", (invalid) => {
    expect(calculateConsorcioScenario({ ...scenario, ...invalid })).toBeNull();
  });
});
