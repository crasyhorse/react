import { useState, useEffect } from "react";

namespace ProgressBar {
  export type Props = {
    timer: number;
  };
}

export default function ProgressBar({ timer }: ProgressBar.Props) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}
