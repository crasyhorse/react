import type { Investment } from "@/types";
import type { ChangeEvent } from "react";

type InvestmentState =
  | "annualInvestment"
  | "duration"
  | "expectedReturn"
  | "initialInvestment";

export const useSetState = () => {
  const setState = (
    oldInvestment: Investment,
    event: ChangeEvent<HTMLInputElement>,
    stateAttribute: InvestmentState
  ): Investment => {
    const newInvestment: Investment = { ...oldInvestment };
    newInvestment[stateAttribute] = Number(event.target.value);

    return newInvestment;
  };

  return { setState };
};
