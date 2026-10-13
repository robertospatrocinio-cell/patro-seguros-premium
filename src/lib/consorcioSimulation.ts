export interface ConsorcioScenario {
  credit: number;
  consortiumMonths: number;
  administrationPercent: number;
  reservePercent: number;
  consortiumOtherCosts: number;
  financingMonths: number;
  downPayment: number;
  monthlyInterestPercent: number;
  financingOtherCosts: number;
}

/** Cenário nominal educativo: não prevê contemplação, reajustes ou rentabilidade. */
export function calculateConsorcioScenario(input: ConsorcioScenario) {
  if (Object.values(input).some((value) => !Number.isFinite(value) || value < 0)) return null;
  if (input.credit < 1000 || input.credit > 100000000) return null;
  if (![input.consortiumMonths, input.financingMonths].every((n) => Number.isInteger(n) && n >= 1 && n <= 480)) return null;
  if (input.downPayment > input.credit || input.administrationPercent > 100 || input.reservePercent > 100 || input.monthlyInterestPercent > 10) return null;
  if (input.consortiumOtherCosts > 100000000 || input.financingOtherCosts > 100000000) return null;

  const administration = input.credit * input.administrationPercent / 100;
  const reserve = input.credit * input.reservePercent / 100;
  const consortiumTotal = input.credit + administration + reserve + input.consortiumOtherCosts;
  const financedAmount = input.credit - input.downPayment;
  const rate = input.monthlyInterestPercent / 100;
  const financingPayment = rate === 0
    ? financedAmount / input.financingMonths
    : financedAmount * rate / -Math.expm1(-input.financingMonths * Math.log1p(rate));
  const financingTotal = input.downPayment + financingPayment * input.financingMonths + input.financingOtherCosts;

  return {
    administration,
    reserve,
    consortiumTotal,
    consortiumPayment: consortiumTotal / input.consortiumMonths,
    financedAmount,
    financingPayment,
    financingTotal,
    annualInterestPercent: (Math.pow(1 + rate, 12) - 1) * 100,
    nominalDifference: financingTotal - consortiumTotal,
  };
}

export const formatConsorcioCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(value);
