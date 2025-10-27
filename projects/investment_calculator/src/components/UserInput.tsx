import type { Investment } from "@/types";
import type { ChangeEvent } from "react";

type PropData = {
  onInvestmentChange: (event: ChangeEvent<HTMLInputElement>) => void;
  investment: Investment;
}

const UserInput = ({ onInvestmentChange, investment }: PropData) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initialInvestment">Initial Investment</label>
          <input
            name="initialInvestment"
            type="number"
            required
            value={investment.initialInvestment}
            onChange={(event) => onInvestmentChange(event)}
          />
        </p>
        <p>
          <label htmlFor="annualInvestment">Annual Investment</label>
          <input
            name="annualInvestment"
            type="number"
            required
            value={investment.annualInvestment}
            onChange={(event) => onInvestmentChange(event)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expectedReturn">
            Expected Rate of Return
          </label>
          <input
            name="expectedReturn"
            type="number"
            required
            value={investment.expectedReturn}
            onChange={(event) => onInvestmentChange(event)}
          />
        </p>
        <p>
          <label htmlFor="duration">Duration of Investment</label>
          <input
            name="duration"
            type="number"
            required
            value={investment.duration}
            onChange={(event) => onInvestmentChange(event)}
          />
        </p>
      </div>
    </section>
  );
};

export default UserInput;
