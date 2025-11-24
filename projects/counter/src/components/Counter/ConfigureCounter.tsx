import { useState } from "react";
import type { ChangeEvent } from "react";

namespace ConfigureCounter {
  export type Props = {
    onSet: (value: number) => void;
  };
}
const ConfigureCounter = ({
  onSet: configureCounter,
}: ConfigureCounter.Props) => {
  const [enteredNumber, setEnteredNumber] = useState(0);
  console.log("<ConfigureCounter />");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    setEnteredNumber(Number(target.value));
  };

  const handleSetClick = (): void => {
    configureCounter(enteredNumber);
    setEnteredNumber(0);
  };

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
};

export default ConfigureCounter;
