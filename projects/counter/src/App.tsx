import { useState } from "react";

import Counter from "@/components/Counter/Counter";
import Header from "@/components/Header";
import ConfigureCounter from "@/components/Counter/ConfigureCounter";
import { log } from "@/log.ts";

function App() {
  const [chosenCount, setChosenCount] = useState(0);
  log("<App /> rendered");

  const handleConfigureCounter = (value: number): void => {
    setChosenCount(value);
  };

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleConfigureCounter} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
