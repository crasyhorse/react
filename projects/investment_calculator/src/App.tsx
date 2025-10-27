import Header from "@/components/Header";
import UserInput from "@/components/UserInput";
import Results from "@/components/Results";

import type { Investment } from "@/types";
import type { ChangeEvent } from "react";

import { useState } from "react";
import { useSetState } from "@/useSetState";

const investmentState: Investment = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  const [investment, setInvestment] = useState(investmentState);
  const isValidInput = investment.duration >= 1;
  const { setState } = useSetState();

  const handleInvestmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newInvestment: Investment;

    setInvestment((oldInvestment) => {
      switch (event.target.name) {
        case "annualInvestment":
          newInvestment = setState(oldInvestment, event, "annualInvestment");
          break;
        case "duration":
          newInvestment = setState(oldInvestment, event, "duration");
          break;
        case "expectedReturn":
          newInvestment = setState(oldInvestment, event, "expectedReturn");
          break;
        case "initialInvestment":
          newInvestment = setState(oldInvestment, event, "initialInvestment");
          break;
        default:
          break;
      }

      return newInvestment;
    });
  };

  return (
    <>
      <Header />
      <UserInput
        onInvestmentChange={handleInvestmentChange}
        investment={investment}
      />
      {isValidInput && <Results investment={investment} />}
    </>
  );
}

export default App;
