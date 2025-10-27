export interface Investment {
  annualInvestment: number;
  duration: number;
  expectedReturn: number;
  initialInvestment: number;
}

export interface Result {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annualInvestment: number;
}
