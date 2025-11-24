import { useState, useCallback, useMemo } from "react";

import IconButton from "@/components/UI/IconButton";
import MinusIcon from "@/components/UI/Icons/MinusIcon";
import PlusIcon from "@/components/UI/Icons/PlusIcon";
import CounterOutput from "@/components/Counter/CounterOutput";
import CounterHistory from "@/components/Counter/CounterHistory";

import { log } from "@/log";

function isPrime(number: number): boolean {
  log("Calculating if is prime number", 2, "other");

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

namespace Counter {
  export type Props = {
    initialCount: number;
  };
}

export default function Counter({ initialCount }: Counter.Props) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), []);

  const [counter, setCounter] = useState([
    { value: initialCount, id: crypto.randomUUID() },
  ]);

  const handleDecrement = useCallback((): void => {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounter((oldcounter) => [
      { value: -1, id: crypto.randomUUID() },
      ...oldcounter,
    ]);
  }, []);

  const handleIncrement = useCallback((): void => {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounter((oldCounter) => [
      { value: 1, id: crypto.randomUUID() },
      ...oldCounter,
    ]);
  }, []);

  const counterValue = counter.reduce(
    (oldCounter, newCounter) => oldCounter + newCounter.value,
    0
  );

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton Icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counterValue} />
        <IconButton Icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counter} />
    </section>
  );
}
