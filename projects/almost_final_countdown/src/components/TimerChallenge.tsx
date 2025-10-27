import { useRef, useState } from "react";
import ResultModal from "@/components/ResultModal";
import type { DialogHandle } from "@/types";
import type { MouseEventHandler, ReactEventHandler } from "react";

interface PropData {
  title: string;
  targetTime: number;
}

const TimerChallenge = ({ title, targetTime }: PropData) => {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  
  const timerId = useRef<number>();
  const dialog = useRef<DialogHandle>(null);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timerId.current);

    if (dialog.current) {
      dialog.current.open();
    }
  }

  const handleReset: ReactEventHandler<HTMLElement> = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart: MouseEventHandler<HTMLButtonElement> = () => {
    timerId.current = setInterval(() => {
      setTimeRemaining((oldTimeRemaining) => oldTimeRemaining - 10);
    }, 10);
  };

  const handleStop: MouseEventHandler<HTMLButtonElement> = () => {
    if (dialog.current) {
      dialog.current.open();
    }
    clearInterval(timerId.current);
  };

  return (
    <>
      <ResultModal
        targetTime={targetTime}
        dialogRef={dialog}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challeenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
