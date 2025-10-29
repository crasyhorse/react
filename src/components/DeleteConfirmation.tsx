import { useEffect, useRef, useState } from "react";

namespace DeleteConfirmation {
  export type Props = {
    onConfirm: () => void;
    onCancel: () => void;
  };
}

const TIMER = 3000;
export default function DeleteConfirmation({
  onConfirm,
  onCancel,
}: DeleteConfirmation.Props) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const remainingTimeInterval = setInterval(() => {
      setRemainingTime((oldRemainingTime) => {
        return oldRemainingTime - 10;
      });
    }, 10);

    return () => {
      clearInterval(remainingTimeInterval);
    };
  }, [remainingTime]);

  useEffect(() => {
    const dialogTimer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(dialogTimer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
