import { useImperativeHandle } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

import type { ReactEventHandler, RefObject } from "react";
import type { DialogHandle } from "@/types";

export interface PropData {
  targetTime: number;
  dialogRef: RefObject<DialogHandle>;
  remainingTime: number;
  onReset?: ReactEventHandler<HTMLButtonElement | HTMLDialogElement>;
}

const ResultModal = ({
  targetTime,
  dialogRef,
  remainingTime,
  onReset,
}: PropData) => {
  const innerDialogRef = useRef<HTMLDialogElement>(null);

  const userLost = remainingTime <= 0;
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  useImperativeHandle(dialogRef, () => {
    return {
      open(): void {
        if (innerDialogRef.current) {
          innerDialogRef.current.showModal();
        }
      },
    };
  });

  return createPortal(
    <dialog ref={innerDialogRef} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost!</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog">
        <button onClick={onReset}>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default ResultModal;
